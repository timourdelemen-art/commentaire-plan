import { buildPhiloGenerationContext } from './philo-dissertation-generator.js';
import { auditPhiloCopySentences } from './philo-sentence-audit.js';
import {
  COPY20_STAGE_ORDER,
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

export async function generatePhilosophicalDissertation(sujet, env) {
  const moteur = JSON.stringify(buildPhiloGenerationContext(sujet));

  const payload = {
    model: env.OPENAI_MODEL || 'gpt-5-mini',
    instructions:
      'Tu es le générateur de dissertation philosophique du site Commentaire Plan.\n' +
      'Utilise le moteur philosophique fourni pour construire une dissertation complète.\n\n' +
      moteur,
    input: [
      {
        role: 'user',
        content: [
          { type: 'input_text', text: 'Sujet de dissertation : ' + sujet }
        ]
      }
    ],
    text: { format: { type: 'json_object' } },
    max_output_tokens: 14000,
    store: false
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
    throw new Error('Le moteur IA a refusé la génération.');
  }

  const data = await response.json();
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
