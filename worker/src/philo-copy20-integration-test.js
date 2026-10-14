import assert from 'node:assert/strict';
import COPY20_DATA from '../../scripts/copies20-data.json' with { type: 'json' };
import worker from './index.js';
import { buildPhiloGenerationContext } from './philo-dissertation-generator.js';
import { generatePhilosophicalDissertation } from './philo-dissertation-route.js';
import {
  COPY20_STAGE_ORDER,
  getCopy20SentenceFunctions,
  validateCopy20Annotations
} from './philo-engine/copy20-functions.js';

const functionsByStage = getCopy20SentenceFunctions();
const sourceFunctions = new Set(
  Object.values(COPY20_DATA).flatMap((sections) =>
    sections.flatMap(([, sentences]) => sentences.map(([, functionLabel]) => functionLabel))
  )
);
const catalogFunctions = new Set(Object.values(functionsByStage).flat());

assert.deepEqual(catalogFunctions, sourceFunctions);
assert.equal(sourceFunctions.size, 144);

function assertStrictSchema(schema) {
  if (schema.type === 'object') {
    assert.equal(schema.additionalProperties, false);
    assert.deepEqual(schema.required, Object.keys(schema.properties));
    for (const property of Object.values(schema.properties)) assertStrictSchema(property);
  } else if (schema.type === 'array') {
    assertStrictSchema(schema.items);
  }
}

const writingRules = buildPhiloGenerationContext('Peut-on être libre sans être responsable ?').redaction;
const generationContext = buildPhiloGenerationContext('Peut-on être libre sans être responsable ?');
assert.equal('sceneSelection' in generationContext, false);
assert.equal('recherche_documentaire' in generationContext, false);
assert.match(generationContext.chaine_generation[0], /avant toute situation/);
assert.match(generationContext.chaine_generation[1], /trois situations fictives/);
assert.deepEqual(writingRules.sentenceFunctions, [
  'installer', 'justifier', 'distinguer', 'objecter', 'répondre', 'transformer', 'conclure'
]);
assert.deepEqual(writingRules.copy20AnnotationStages, COPY20_STAGE_ORDER);
assert.match(generationContext.politique_dissertation, /exactement trois situations/);
assert.match(generationContext.politique_dissertation, /deux exigences/);
assert.match(generationContext.politique_dissertation, /transition II-III/);
assert.match(generationContext.politique_dissertation, /matrices de paradoxes du Dictionnaire paradoxal/);

const headingByStage = {
  introduction: 'INTRODUCTION',
  partieI: 'I. Partie I',
  'I.1': 'I.1 Installer',
  'I.2': 'I.2 Renforcer',
  'I.3': 'I.3 Limite',
  'transitionI-II': '',
  partieII: 'II. Partie II',
  'II.1': 'II.1 Exigence',
  'II.2': 'II.2 Réponse',
  'II.3': 'II.3 Limite',
  'transitionII-III': '',
  'III.1': 'III.1 Revenir au problème',
  'III.2': 'III.2 Opération',
  'III.3': 'III.3 Stabiliser',
  conclusion: 'CONCLUSION'
};
const openingFunction = functionsByStage.introduction.find((label) =>
  label === 'La scène d’ouverture'
);
assert.ok(openingFunction, 'L’intitulé COPY20 exact de l’ouverture doit rester disponible.');
const stagedPhrases = Object.fromEntries(COPY20_STAGE_ORDER.map((stage, index) => [
  stage,
  [{
    phrase: stage === 'introduction'
      ? 'Imaginons une expérience de pensée précise.'
      : `Phrase ${index + 1}.`,
    fonction: stage === 'introduction' ? openingFunction : functionsByStage[stage][0]
  }]
]));
const copy = COPY20_STAGE_ORDER.map((stage) =>
  [headingByStage[stage], ...stagedPhrases[stage].map(({ phrase }) => phrase)]
    .filter(Boolean)
    .join('\n')
).join('\n\n');

const validAnnotations = validateCopy20Annotations(copy, stagedPhrases);
assert.equal(validAnnotations.ok, true, validAnnotations.problems.join('; '));
assert.equal(validAnnotations.philosophicalNecessityEvaluated, false);

const wrongLabel = structuredClone(stagedPhrases);
wrongLabel['I.1'][0].fonction = functionsByStage.introduction[0];
assert.equal(validateCopy20Annotations(copy, wrongLabel).ok, false);

const wrongOrder = structuredClone(stagedPhrases);
[wrongOrder.introduction[0], wrongOrder.partieI[0]] =
  [wrongOrder.partieI[0], wrongOrder.introduction[0]];
assert.equal(validateCopy20Annotations(copy, wrongOrder).ok, false);

const wrongSentence = structuredClone(stagedPhrases);
wrongSentence['III.3'][0].phrase = 'Phrase absente.';
assert.equal(validateCopy20Annotations(copy, wrongSentence).ok, false);

const originalFetch = globalThis.fetch;
const testAporia = {
  firstRequirement: 'Préserver une réponse possible.',
  firstResponse: 'Première réponse de test.',
  firstDifficulty: 'Difficulté de test pour la première réponse.',
  contraryRequirement: 'Préserver la réponse opposée.',
  contraryResponse: 'Réponse contraire de test.',
  contraryDifficulty: 'Difficulté de test pour la réponse contraire.',
  problematic: 'Quelle réponse peut être retenue sans perdre l’autre ?'
};
function scoreCandidate(id, score) {
  const assessment = Object.fromEntries([
    'exactRelevance',
    'concreteness',
    'aporeticPower',
    'structuralDiversity',
    'argumentativeNecessity',
    'conceptualFruitfulness',
    'literaryQuality'
  ].map((dimension) => [
    dimension,
    { score, rationale: `Justification distincte et contrôlée pour ${dimension}.` }
  ]));
  return {
    id,
    structure: `Structure philosophique singulière ${id}`,
    situation: `Situation fictive concrète et précisément développée pour ${id}.`,
    assessment
  };
}
const validOpeningComparison = {
  aporia: testAporia,
  candidates: [
    scoreCandidate('revealing-process', 3),
    scoreCandidate('practical-contradiction', 4),
    scoreCandidate('limit-case', 5)
  ],
  selectedCandidateId: 'limit-case'
};
let nextGenerated = {
  openingComparison: validOpeningComparison,
  copie: copy,
  phrases: stagedPhrases
};
let nextOpenAIResponse = null;
let capturedPayload;
let modelRequestCount = 0;
globalThis.fetch = async (input, requestOptions = {}) => {
  const url = new URL(input);
  if (url.hostname === 'api.openai.com') {
    modelRequestCount += 1;
    capturedPayload = JSON.parse(requestOptions.body);
    return new Response(JSON.stringify({
      ...(nextOpenAIResponse || { output_text: JSON.stringify(nextGenerated) })
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  throw new Error(`URL inattendue dans le test : ${url}`);
};

async function requestWorkerGeneration(clientId) {
  return worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': clientId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sujet: 'Peut-on être libre sans être responsable ?' })
    }
  ), { OPENAI_API_KEY: 'test-key' });
}

try {
  const dissertation = await generatePhilosophicalDissertation(
    'Peut-on être libre sans être responsable ?',
    { OPENAI_API_KEY: 'test-key' }
  );
  assert.equal(dissertation.copie, copy.trim());
  assert.equal(dissertation.phrases.length, COPY20_STAGE_ORDER.length);
  assert.equal(dissertation.audit.copy20.ok, true);
  assert.equal(dissertation.audit.copy20.philosophicalNecessityEvaluated, false);
  assert.match(capturedPayload.instructions, /double aporie doit être construite avant d’imaginer les situations/);
  assert.match(capturedPayload.instructions, /exactRelevance/);
  assert.match(capturedPayload.instructions, /literaryQuality/);
  assert.match(capturedPayload.instructions, /cas fictif/);
  assert.equal(capturedPayload.text.format.type, 'json_schema');
  assert.equal(capturedPayload.text.format.name, 'copy20_dissertation');
  assert.equal(capturedPayload.text.format.strict, true);
  const outputSchema = capturedPayload.text.format.schema;
  assertStrictSchema(outputSchema);
  assert.deepEqual(
    Object.keys(outputSchema.properties.phrases.properties),
    COPY20_STAGE_ORDER
  );
  for (const stage of COPY20_STAGE_ORDER) {
    const functionSchema = outputSchema.properties.phrases.properties[stage]
      .items.properties.fonction;
    assert.deepEqual(functionSchema.enum, functionsByStage[stage]);
    assert.deepEqual(
      outputSchema.properties.phrases.properties[stage].items.required,
      ['phrase', 'fonction']
    );
  }
  assert.equal(capturedPayload.max_output_tokens, 14000);
  assert.equal(capturedPayload.store, false);
  assert.equal(modelRequestCount, 1);

  const response = await worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': 'copy20-test',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sujet: 'Peut-on être libre sans être responsable ?' })
    }
  ), { OPENAI_API_KEY: 'test-key' });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.copie, copy.trim());
  assert.deepEqual(Object.keys(body).sort(), ['audit', 'copie', 'ok', 'phrases', 'sujet']);
  assert.equal(Array.isArray(body.phrases), true);
  assert.equal(typeof body.audit.sentenceCount, 'number');
  assert.equal(body.audit.copy20.ok, true);
  assert.equal(body.phrases.every((entry) =>
    Object.keys(entry).length === 2 &&
    typeof entry.phrase === 'string' &&
    typeof entry.fonction === 'string'
  ), true);
  assert.equal(body.audit.copy20.philosophicalNecessityEvaluated, false);

  nextOpenAIResponse = {
    status: 'incomplete',
    incomplete_details: { reason: 'max_output_tokens' },
    output_text: '{"partial":'
  };
  const truncatedResponse = await requestWorkerGeneration('copy20-test-truncated');
  const truncatedBody = await truncatedResponse.json();
  assert.equal(truncatedResponse.status, 502);
  assert.equal(
    truncatedBody.error,
    'La réponse du modèle est incomplète : la limite de tokens de sortie a été atteinte.'
  );

  nextOpenAIResponse = {
    status: 'incomplete',
    incomplete_details: { reason: 'content_filter' },
    output_text: ''
  };
  const incompleteResponse = await requestWorkerGeneration('copy20-test-incomplete');
  const incompleteBody = await incompleteResponse.json();
  assert.equal(incompleteResponse.status, 502);
  assert.equal(incompleteBody.error, 'La réponse du modèle est incomplète.');

  nextOpenAIResponse = {
    status: 'completed',
    output_text: `Préambule non JSON ${JSON.stringify(nextGenerated)}`
  };
  const malformedResponse = await requestWorkerGeneration('copy20-test-malformed-json');
  const malformedBody = await malformedResponse.json();
  assert.equal(malformedResponse.status, 502);
  assert.equal(
    malformedBody.error,
    'La réponse du modèle ne respecte pas le format JSON COPY20.'
  );
  nextOpenAIResponse = null;

  nextGenerated = {
    openingComparison: validOpeningComparison,
    copie: copy,
    phrases: wrongLabel
  };
  const invalidResponse = await worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': 'copy20-test-invalid',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sujet: 'Peut-on être libre sans être responsable ?' })
    }
  ), { OPENAI_API_KEY: 'test-key' });
  const invalidBody = await invalidResponse.json();
  assert.equal(invalidResponse.status, 502);
  assert.match(invalidBody.error, /annotations COPY20 ne correspondent pas/);

  assert.equal(modelRequestCount, 6);

  nextGenerated = {
    openingComparison: {
      ...validOpeningComparison,
      candidates: validOpeningComparison.candidates.slice(0, 2)
    },
    copie: copy,
    phrases: stagedPhrases
  };
  const invalidComparisonResponse = await worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': 'opening-comparison-invalid-test',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sujet: 'Peut-on être libre sans être responsable ?' })
    }
  ), { OPENAI_API_KEY: 'test-key' });
  const invalidComparisonBody = await invalidComparisonResponse.json();
  assert.equal(invalidComparisonResponse.status, 502);
  assert.match(invalidComparisonBody.error, /comparaison des trois situations/);
  assert.equal(modelRequestCount, 7);

  nextGenerated = {
    openingComparison: validOpeningComparison,
    copie: copy.replace('Imaginons une expérience de pensée précise.',
      'La liberté dépend de la responsabilité.'),
    phrases: {
      ...stagedPhrases,
      introduction: [{
        phrase: 'La liberté dépend de la responsabilité.',
        fonction: openingFunction
      }]
    }
  };
  const nonFictionalOpeningResponse = await worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': 'fiction-marker-missing-test',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sujet: 'Peut-on être libre sans être responsable ?' })
    }
  ), { OPENAI_API_KEY: 'test-key' });
  const nonFictionalOpeningBody = await nonFictionalOpeningResponse.json();
  assert.equal(nonFictionalOpeningResponse.status, 502);
  assert.match(nonFictionalOpeningBody.error, /expérience de pensée ou un cas fictif/);
  assert.equal(modelRequestCount, 8);
} finally {
  globalThis.fetch = originalFetch;
}

console.log('OK : source COPY20, comparaison structurée de trois situations, génération en un appel et contrat Worker validés.');
