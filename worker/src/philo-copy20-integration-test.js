import assert from 'node:assert/strict';
import COPY20_DATA from '../../scripts/copies20-data.json' with { type: 'json' };
import worker from './index.js';
import { buildPhiloGenerationContext } from './philo-dissertation-generator.js';
import { generatePhilosophicalDissertation } from './philo-dissertation-route.js';
import {
  COPY20_STAGE_ORDER,
  getCopy20SentenceFunctions,
  reconstructCopy20Dissertation,
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
assert.match(writingRules.copy20Format, /sans propriété copie/);
assert.match(writingRules.copy20Format, /le Worker reconstruit la copie à partir des seules phrases/);
assert.match(writingRules.copy20Format, /aucun titre, numéro de partie ou préfixe de fonction/);
assert.match(writingRules.copy20Protocol, /opération intellectuelle déterminée/);
assert.match(writingRules.copy20Protocol, /argument de référence précisément attribué/);
assert.match(writingRules.copy20Protocol, /découle de la justification elle-même/);
assert.match(writingRules.copy20Protocol, /paragraphes rédigés sous forme de questions ouvertes/);
assert.match(writingRules.copy20Protocol, /reprises annoncées existent réellement/);
assert.match(writingRules.copy20Protocol, /ressources du Dictionnaire paradoxal/);
assert.match(generationContext.politique_dissertation, /exactement trois situations/);
assert.match(generationContext.politique_dissertation, /deux exigences/);
assert.match(generationContext.politique_dissertation, /redaction\.copy20Protocol/);
assert.doesNotMatch(generationContext.politique_dissertation, /ANNOTATION DE NÉCESSITÉ|RÉSOLUTION ET RESTE/);

const openingFunction = functionsByStage.introduction.find((label) =>
  label === 'La scène d’ouverture'
);
assert.ok(openingFunction, 'L’intitulé COPY20 exact de l’ouverture doit rester disponible.');
function phraseForStage(stage, index) {
  if (stage === 'introduction') return 'Imaginons une expérience de pensée précise.';
  if (stage === 'transitionI-II') return 'Mais cette réponse laisse une difficulté sans réponse : que devient alors cette exigence ?';
  if (stage === 'transitionII-III') return 'Pourtant, que faut-il transformer pour préserver les deux acquis ?';
  if (stage === 'I.2') return `Phrase ${index + 1} : « mot exact » !`;
  return `Phrase ${index + 1}.`;
}
const stagedPhrases = Object.fromEntries(COPY20_STAGE_ORDER.map((stage, index) => [
  stage,
  [{
    phrase: phraseForStage(stage, index),
    fonction: stage === 'introduction' ? openingFunction : functionsByStage[stage][0]
  }]
]));
const copy = reconstructCopy20Dissertation(stagedPhrases);

const validAnnotations = validateCopy20Annotations(copy, stagedPhrases);
assert.equal(validAnnotations.ok, true, validAnnotations.problems.join('; '));
assert.equal(validAnnotations.philosophicalNecessityEvaluated, false);
assert.deepEqual(validAnnotations.phrases, COPY20_STAGE_ORDER.flatMap((stage) => stagedPhrases[stage]));
assert.ok(copy.includes(stagedPhrases['I.2'][0].phrase), 'La ponctuation de chaque phrase doit être restituée sans modification.');

for (const phrase of [
  'M. X défend une idée avec précision.',
  'Il demande : « vraiment ?! »',
  'Cette proposition reste sans ponctuation terminale'
]) {
  const phraseCase = structuredClone(stagedPhrases);
  phraseCase['I.1'] = [{
    phrase,
    fonction: functionsByStage['I.1'][0]
  }];
  const reconstructed = reconstructCopy20Dissertation(phraseCase);
  assert.equal(
    validateCopy20Annotations(reconstructed, phraseCase, { compareText: false }).ok,
    true,
    `Une phrase annotée doit rester valide sans resegmentation : ${phrase}`
  );
}

const abbreviationCase = structuredClone(stagedPhrases);
abbreviationCase['I.1'] = [{
  phrase: 'M. X défend une idée avec précision.',
  fonction: functionsByStage['I.1'][0]
}];
assert.equal(
  validateCopy20Annotations(
    reconstructCopy20Dissertation(abbreviationCase),
    abbreviationCase
  ).ok,
  false,
  'La validation textuelle historique peut segmenter l’abréviation M. en trop.'
);

const unterminatedCase = structuredClone(stagedPhrases);
unterminatedCase['I.1'] = [{
  phrase: 'Cette proposition reste sans ponctuation terminale',
  fonction: functionsByStage['I.1'][0]
}];
assert.equal(
  validateCopy20Annotations(
    reconstructCopy20Dissertation(unterminatedCase),
    unterminatedCase
  ).ok,
  false,
  'La validation textuelle historique peut fusionner une phrase sans point terminal.'
);

assert.equal(
  validateCopy20Annotations('Texte divergent.', stagedPhrases).ok,
  false,
  'La comparaison textuelle reste active par défaut pour les autres parcours.'
);

assert.equal(copy.split('\n\n').length, COPY20_STAGE_ORDER.length);
assert.doesNotMatch(
  copy,
  /(?:^|\n)(?:INTRODUCTION|CONCLUSION|I{1,3}(?:\.\d+)?(?:\s|$))/u,
  'La copie finale ne contient pas de titres ni de numéros de partie.'
);
assert.match(stagedPhrases['transitionI-II'][0].phrase, /\?$/u);
assert.match(stagedPhrases['transitionII-III'][0].phrase, /\?$/u);
assert.ok(
  copy.indexOf(stagedPhrases['transitionI-II'][0].phrase) >
    copy.indexOf(stagedPhrases['I.3'][0].phrase) &&
  copy.indexOf(stagedPhrases['transitionI-II'][0].phrase) <
    copy.indexOf(stagedPhrases.partieII[0].phrase)
);
assert.ok(
  copy.indexOf(stagedPhrases['transitionII-III'][0].phrase) >
    copy.indexOf(stagedPhrases['II.3'][0].phrase) &&
  copy.indexOf(stagedPhrases['transitionII-III'][0].phrase) <
    copy.indexOf(stagedPhrases['III.1'][0].phrase)
);
let previousPhraseIndex = -1;
for (const { phrase } of validAnnotations.phrases) {
  const phraseIndex = copy.indexOf(phrase, previousPhraseIndex + 1);
  assert.ok(phraseIndex > previousPhraseIndex, `Phrase restituée dans l’ordre : ${phrase}`);
  previousPhraseIndex = phraseIndex;
}

const wrongLabel = structuredClone(stagedPhrases);
wrongLabel['I.1'][0].fonction = functionsByStage.introduction[0];
assert.equal(validateCopy20Annotations(reconstructCopy20Dissertation(wrongLabel), wrongLabel).ok, false);
assert.equal(
  validateCopy20Annotations(
    reconstructCopy20Dissertation(wrongLabel),
    wrongLabel,
    { compareText: false }
  ).ok,
  false,
  'Désactiver la comparaison du texte ne désactive pas les fonctions autorisées.'
);

const wrongOrder = structuredClone(stagedPhrases);
[wrongOrder.introduction[0], wrongOrder.partieI[0]] =
  [wrongOrder.partieI[0], wrongOrder.introduction[0]];
assert.equal(validateCopy20Annotations(reconstructCopy20Dissertation(wrongOrder), wrongOrder).ok, false);

const misorderedStages = Object.fromEntries([
  ['partieI', stagedPhrases.partieI],
  ['introduction', stagedPhrases.introduction],
  ...COPY20_STAGE_ORDER.slice(2).map((stage) => [stage, stagedPhrases[stage]])
]);
assert.equal(
  validateCopy20Annotations(
    reconstructCopy20Dissertation(misorderedStages),
    misorderedStages,
    { compareText: false }
  ).ok,
  false
);

const missingStage = structuredClone(stagedPhrases);
delete missingStage['II.2'];
assert.equal(
  validateCopy20Annotations(reconstructCopy20Dissertation(missingStage), missingStage).ok,
  false
);

const emptyStage = structuredClone(stagedPhrases);
emptyStage['III.3'] = [];
assert.equal(
  validateCopy20Annotations(reconstructCopy20Dissertation(emptyStage), emptyStage).ok,
  false
);

const multilinePhrase = structuredClone(stagedPhrases);
multilinePhrase['III.3'][0].phrase = 'Une phrase.\nUne autre phrase.';
assert.equal(
  validateCopy20Annotations(reconstructCopy20Dissertation(multilinePhrase), multilinePhrase).ok,
  false
);

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
  annotationIssues: [],
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
  assert.match(capturedPayload.instructions, /Construisez la double aporie avant d’imaginer les situations/);
  assert.match(capturedPayload.instructions, /exactRelevance/);
  assert.match(capturedPayload.instructions, /literaryQuality/);
  assert.match(capturedPayload.instructions, /cas fictif/);
  assert.match(capturedPayload.instructions, /sans propriété copie/);
  assert.equal(capturedPayload.text.format.type, 'json_schema');
  assert.equal(capturedPayload.text.format.name, 'copy20_dissertation');
  assert.equal(capturedPayload.text.format.strict, true);
  const outputSchema = capturedPayload.text.format.schema;
  assertStrictSchema(outputSchema);
  assert.equal(Object.hasOwn(outputSchema.properties, 'copie'), false);
  assert.deepEqual(
    Object.keys(outputSchema.properties).sort(),
    ['annotationIssues', 'openingComparison', 'phrases']
  );
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
  assert.equal(body.copie, copy);
  assert.deepEqual(Object.keys(body).sort(), ['audit', 'copie', 'ok', 'phrases', 'sujet']);
  assert.equal(Array.isArray(body.phrases), true);
  assert.deepEqual(body.phrases, validAnnotations.phrases);
  assert.equal(body.copie.includes(stagedPhrases['I.2'][0].phrase), true);
  assert.equal(body.copie.includes(stagedPhrases['transitionI-II'][0].phrase), true);
  assert.equal(body.copie.includes(stagedPhrases['transitionII-III'][0].phrase), true);
  assert.equal(typeof body.audit.sentenceCount, 'number');
  assert.equal(body.audit.copy20.ok, true);
  assert.equal(body.phrases.every((entry) =>
    Object.keys(entry).length === 2 &&
    typeof entry.phrase === 'string' &&
    typeof entry.fonction === 'string'
  ), true);
  assert.equal(body.audit.copy20.philosophicalNecessityEvaluated, false);

  const segmentationEdgePhrases = structuredClone(stagedPhrases);
  segmentationEdgePhrases['I.1'][0].phrase = 'M. X défend une idée avec précision.';
  segmentationEdgePhrases['I.2'][0].phrase = 'Il demande : « vraiment ?! »';
  segmentationEdgePhrases['I.3'][0].phrase = 'Cette proposition reste sans ponctuation terminale';
  nextGenerated = {
    openingComparison: validOpeningComparison,
    annotationIssues: [],
    phrases: segmentationEdgePhrases
  };
  const segmentationEdgeResponse = await requestWorkerGeneration('copy20-test-segmentation-edge-cases');
  const segmentationEdgeBody = await segmentationEdgeResponse.json();
  assert.equal(segmentationEdgeResponse.status, 200);
  assert.equal(segmentationEdgeBody.ok, true);
  for (const { phrase } of [
    segmentationEdgePhrases['I.1'][0],
    segmentationEdgePhrases['I.2'][0],
    segmentationEdgePhrases['I.3'][0]
  ]) {
    assert.ok(segmentationEdgeBody.copie.includes(phrase));
  }
  nextGenerated = {
    openingComparison: validOpeningComparison,
    annotationIssues: [],
    phrases: stagedPhrases
  };

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
    annotationIssues: [],
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

  assert.equal(modelRequestCount, 7);

  nextGenerated = {
    openingComparison: validOpeningComparison,
    annotationIssues: [{
      stage: 'III.2',
      operation: 'distinguer les usages et la valeur propre de la connaissance'
    }],
    phrases: {
      ...stagedPhrases,
      'III.2': []
    }
  };
  const catalogGapResponse = await requestWorkerGeneration('copy20-test-catalog-gap');
  const catalogGapBody = await catalogGapResponse.json();
  assert.equal(catalogGapResponse.status, 502);
  assert.match(catalogGapBody.error, /III\.2.*distinguer les usages/);
  assert.deepEqual(Object.keys(catalogGapBody).sort(), ['error', 'ok']);
  assert.equal(modelRequestCount, 8);

  nextGenerated = {
    openingComparison: {
      ...validOpeningComparison,
      candidates: validOpeningComparison.candidates.slice(0, 2)
    },
    annotationIssues: [],
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
  assert.equal(modelRequestCount, 9);

  nextGenerated = {
    openingComparison: validOpeningComparison,
    annotationIssues: [],
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
  assert.equal(modelRequestCount, 10);
} finally {
  globalThis.fetch = originalFetch;
}

console.log('OK : source COPY20, reconstruction depuis les phrases, comparaison des trois situations et contrat Worker validés.');
