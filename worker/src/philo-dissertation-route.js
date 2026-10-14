import { buildPhiloGenerationContext } from './philo-dissertation-generator.js';
import { auditPhiloCopySentences } from './philo-sentence-audit.js';
import {
  COPY20_STAGE_ORDER,
  getCopy20SentenceFunctions,
  validateCopy20Annotations
} from './philo-engine/copy20-functions.js';

const OPENING_ASSESSMENT_DIMENSIONS = [
  'exactRelevance',
  'concreteness',
  'aporeticPower',
  'structuralDiversity',
  'argumentativeNecessity',
  'conceptualFruitfulness',
  'literaryQuality'
];
const GENERATION_FORMAT_ERROR = 'La réponse du modèle ne respecte pas le format JSON COPY20.';
const GENERATION_INCOMPLETE_ERROR = 'La réponse du modèle est incomplète.';
const GENERATION_TOKEN_LIMIT_ERROR = 'La réponse du modèle est incomplète : la limite de tokens de sortie a été atteinte.';

function strictObject(properties) {
  return {
    type: 'object',
    properties,
    required: Object.keys(properties),
    additionalProperties: false
  };
}

function buildCopy20OutputSchema() {
  const assessmentProperties = Object.fromEntries(
    OPENING_ASSESSMENT_DIMENSIONS.map((dimension) => [
      dimension,
      strictObject({
        score: { type: 'integer' },
        rationale: { type: 'string' }
      })
    ])
  );
  const aporiaProperties = Object.fromEntries([
    'firstRequirement',
    'firstResponse',
    'firstDifficulty',
    'contraryRequirement',
    'contraryResponse',
    'contraryDifficulty',
    'problematic'
  ].map((field) => [field, { type: 'string' }]));
  const copy20Functions = getCopy20SentenceFunctions();
  const annotations = Object.fromEntries(COPY20_STAGE_ORDER.map((stage) => [
    stage,
    {
      type: 'array',
      items: strictObject({
        phrase: { type: 'string' },
        fonction: {
          type: 'string',
          enum: copy20Functions[stage]
        }
      })
    }
  ]));

  return strictObject({
    openingComparison: strictObject({
      aporia: strictObject(aporiaProperties),
      candidates: {
        type: 'array',
        items: strictObject({
          id: { type: 'string' },
          structure: { type: 'string' },
          situation: { type: 'string' },
          assessment: strictObject(assessmentProperties)
        })
      },
      selectedCandidateId: { type: 'string' }
    }),
    copie: { type: 'string' },
    phrases: strictObject(annotations)
  });
}

function validateOpeningComparison(comparison) {
  if (!comparison || typeof comparison !== 'object' ||
      !comparison.aporia || !Array.isArray(comparison.candidates) ||
      comparison.candidates.length !== 3 ||
      typeof comparison.selectedCandidateId !== 'string') return false;

  const aporiaFields = [
    'firstRequirement',
    'firstResponse',
    'firstDifficulty',
    'contraryRequirement',
    'contraryResponse',
    'contraryDifficulty',
    'problematic'
  ];
  if (aporiaFields.some((field) =>
    typeof comparison.aporia[field] !== 'string' ||
    comparison.aporia[field].trim().length < 8
  )) return false;

  const ids = new Set();
  const structures = new Set();
  const totals = new Map();
  for (const candidate of comparison.candidates) {
    if (!candidate || typeof candidate !== 'object' ||
        typeof candidate.id !== 'string' || !candidate.id.trim() ||
        typeof candidate.structure !== 'string' || candidate.structure.trim().length < 8 ||
        typeof candidate.situation !== 'string' || candidate.situation.trim().length < 20 ||
        !candidate.assessment || typeof candidate.assessment !== 'object' ||
        ids.has(candidate.id) ||
        structures.has(candidate.structure.trim().toLocaleLowerCase('fr'))) return false;

    ids.add(candidate.id);
    structures.add(candidate.structure.trim().toLocaleLowerCase('fr'));
    let total = 0;
    for (const dimension of OPENING_ASSESSMENT_DIMENSIONS) {
      const assessment = candidate.assessment[dimension];
      if (!assessment || !Number.isInteger(assessment.score) ||
          assessment.score < 1 || assessment.score > 5 ||
          typeof assessment.rationale !== 'string' ||
          assessment.rationale.trim().length < 12) return false;
      total += assessment.score;
    }
    totals.set(candidate.id, total);
  }

  if (!ids.has(comparison.selectedCandidateId)) return false;
  const selectedScore = totals.get(comparison.selectedCandidateId);
  return [...totals.values()].every((score) => selectedScore >= score);
}

function hasExplicitFictionalOpening(phrases) {
  return phrases.some((entry) =>
    entry.fonction === 'La scène d’ouverture' &&
    /\b(?:expérience de pensée|cas fictif|situation fictive|imaginons|supposons)\b/iu
      .test(entry.phrase)
  );
}

function extractOutputText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) return data.output_text.trim();
  for (const item of data.output || []) {
    for (const part of item.content || []) {
      if (part.type === 'output_text' && typeof part.text === 'string') return part.text.trim();
    }
  }
  return '';
}

function safeDiagnosticField(value) {
  if (typeof value !== 'string') return null;
  const sanitized = value.replace(/[^a-zA-Z0-9_.:-]/g, '_').slice(0, 128);
  return sanitized || null;
}

function safeProviderErrorIdentifier(value, privateValues) {
  if (typeof value !== 'string' || !/^[a-z][a-z0-9_]{0,63}$/.test(value)) return null;
  if (privateValues.some((privateValue) =>
    typeof privateValue === 'string' && privateValue &&
    (privateValue.includes(value) || value.includes(privateValue))
  )) return null;
  return value;
}

async function logOpenAIHttpError(response, privateValues) {
  let apiError = null;
  try {
    const data = await response.clone().json();
    if (data?.error && typeof data.error === 'object') apiError = data.error;
  } catch {
    // Non-JSON upstream error bodies are intentionally not logged.
  }

  const diagnostic = {
    status: response.status,
    code: safeProviderErrorIdentifier(apiError?.code, privateValues),
    type: safeProviderErrorIdentifier(apiError?.type, privateValues)
  };
  console.error('OpenAI Responses API request failed', JSON.stringify({
    ...diagnostic,
    requestId: safeDiagnosticField(response.headers.get('x-request-id'))
  }));
  return diagnostic;
}

export async function generatePhilosophicalDissertation(sujet, env) {
  const moteur = JSON.stringify(buildPhiloGenerationContext(sujet));
  const instructions =
    'Tu es le générateur de dissertation philosophique du site Commentaire Plan.\n' +
    'Utilise le moteur philosophique fourni pour construire une dissertation complète.\n\n' +
    moteur;

  const payload = {
    model: env.OPENAI_MODEL || 'gpt-5-mini',
    instructions,
    input: [
      {
        role: 'user',
        content: [
          { type: 'input_text', text: 'Sujet de dissertation : ' + sujet }
        ]
      }
    ],
    max_output_tokens: 14000,
    store: false,
    text: {
      format: {
        type: 'json_schema',
        name: 'copy20_dissertation',
        strict: true,
        schema: buildCopy20OutputSchema()
      }
    }
  };

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + env.OPENAI_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const diagnostic = await logOpenAIHttpError(response, [
      env.OPENAI_API_KEY,
      sujet,
      instructions
    ]);
    const error = new Error('Le moteur IA a refusé la génération.');
    error.diagnostic = diagnostic;
    throw error;
  }

  const data = await response.json();
  if (data.status === 'incomplete') {
    throw new Error(data.incomplete_details?.reason === 'max_output_tokens'
      ? GENERATION_TOKEN_LIMIT_ERROR
      : GENERATION_INCOMPLETE_ERROR);
  }
  const output = extractOutputText(data);
  let generated;
  try {
    generated = JSON.parse(output);
  } catch {
    throw new Error(GENERATION_FORMAT_ERROR);
  }
  if (!generated || typeof generated !== 'object' || Array.isArray(generated)) {
    throw new Error(GENERATION_FORMAT_ERROR);
  }
  if (!validateOpeningComparison(generated.openingComparison)) {
    throw new Error('La comparaison des trois situations d’ouverture est incomplète ou invalide.');
  }
  const copie = typeof generated.copie === 'string' ? generated.copie.trim() : '';
  const copy20Audit = validateCopy20Annotations(copie, generated.phrases);
  if (!copy20Audit.ok) {
    throw new Error('Les annotations COPY20 ne correspondent pas à la copie.');
  }
  if (!hasExplicitFictionalOpening(copy20Audit.phrases)) {
    throw new Error('L’ouverture doit être explicitement présentée comme une expérience de pensée ou un cas fictif.');
  }

  return {
    copie,
    phrases: copy20Audit.phrases,
    audit: {
      ...auditPhiloCopySentences(copie),
      copy20: {
        ok: true,
        annotationCount: copy20Audit.annotationCount,
        sentenceCount: copy20Audit.sentenceCount,
        philosophicalNecessityEvaluated: false
      }
    }
  };
}
