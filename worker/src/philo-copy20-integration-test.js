import assert from 'node:assert/strict';
import COPY20_DATA from '../../scripts/copies20-data.json' with { type: 'json' };
import worker from './index.js';
import { buildPhiloGenerationContext } from './philo-dissertation-generator.js';
import { generatePhilosophicalDissertation } from './philo-dissertation-route.js';
import {
  COPY20_STAGE_ORDER,
  getCopy20ArgumentFunctions,
  getCopy20SentenceFunctions,
  reconstructCopy20Dissertation,
  validateCopy20Annotations
} from './philo-engine/copy20-functions.js';

const historicalFunctionsByStage = getCopy20SentenceFunctions();
const argumentFunctionsByStage = getCopy20ArgumentFunctions();
const sourceFunctions = new Set(
  Object.values(COPY20_DATA).flatMap((sections) =>
    sections.flatMap(([, sentences]) => sentences.map(([, functionLabel]) => functionLabel))
  )
);
const catalogFunctions = new Set(Object.values(historicalFunctionsByStage).flat());

assert.deepEqual(catalogFunctions, sourceFunctions);
assert.equal(sourceFunctions.size, 144);
assert.equal(Object.keys(COPY20_DATA).length, 20);
assert.notDeepEqual(argumentFunctionsByStage, historicalFunctionsByStage);

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
assert.equal(writingRules.resolutionSelection.forms.length, 8);
assert.equal(writingRules.resolutionSelection.matrices.length, 4);
assert.equal(writingRules.resolutionSelection.status, 'model-comparison-required');
assert.match(writingRules.resolutionSelection.sourceNote, /pas le Dictionnaire complet/);
assert.equal('sceneSelection' in generationContext, false);
assert.equal('recherche_documentaire' in generationContext, false);
assert.match(generationContext.chaine_generation[0], /avant toute situation/);
assert.match(generationContext.chaine_generation[1], /trois situations fictives/);
assert.deepEqual(writingRules.sentenceFunctions, [
  'installer', 'justifier', 'distinguer', 'objecter', 'répondre', 'transformer', 'conclure'
]);
assert.deepEqual(writingRules.copy20AnnotationStages, COPY20_STAGE_ORDER);
assert.match(writingRules.copy20Format, /sans propriété copie/);
assert.match(writingRules.copy20Format, /le Worker reconstruit la copie depuis les seules phrases/);
assert.match(writingRules.copy20Format, /aucun titre, numéro de partie ou préfixe de fonction/);
assert.match(writingRules.copy20Format, /fonction et operation/);
assert.match(writingRules.copy20Protocol, /opération intellectuelle particulière/);
assert.match(writingRules.copy20Protocol, /AVANT LES PHRASES/);
assert.match(writingRules.copy20Protocol, /resolutionPreparation/);
assert.match(writingRules.copy20Protocol, /argument de référence précisément attribué/);
assert.match(writingRules.copy20Protocol, /difficulté qui lui est interne/);
assert.match(writingRules.copy20Protocol, /de véritables questions ouvertes auxquelles la partie suivante répond/);
assert.match(writingRules.copy20Protocol, /toute reprise lexicale annotée doit se lire dans le texte/);
assert.match(writingRules.copy20Protocol, /candidate sélectionnée/);
for (const subpart of ['I.1', 'I.2', 'I.3', 'II.1', 'II.2', 'II.3', 'III.1', 'III.2', 'III.3']) {
  assert.match(writingRules.copy20Protocol, new RegExp(`${subpart} — Départ`));
}
assert.match(writingRules.copy20Protocol, /TRANSITION I-II — Hors des parties/);
assert.match(writingRules.copy20Protocol, /TRANSITION II-III — Hors des parties/);
assert.match(generationContext.politique_dissertation, /exactement trois situations/);
assert.match(generationContext.politique_dissertation, /deux exigences/);
assert.match(generationContext.politique_dissertation, /redaction\.copy20Protocol/);
assert.match(generationContext.politique_dissertation, /trois résolutions concrètes/);
assert.doesNotMatch(generationContext.politique_dissertation, /ANNOTATION DE NÉCESSITÉ|RÉSOLUTION ET RESTE/);

const openingFunction = 'scène d’ouverture';
assert.ok(argumentFunctionsByStage.introduction.includes(openingFunction));
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
    fonction: stage === 'introduction' ? openingFunction : argumentFunctionsByStage[stage][0],
    operation: `Opération argumentative propre au passage de l’étape ${stage}.`
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
    fonction: argumentFunctionsByStage['I.1'][0],
    operation: 'Éprouver le format avec une phrase annotée.'
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
  fonction: argumentFunctionsByStage['I.1'][0],
  operation: 'Éprouver la segmentation sans modifier le texte.'
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
  fonction: argumentFunctionsByStage['I.1'][0],
  operation: 'Poursuivre une proposition sans ponctuation finale.'
}];
assert.equal(
  validateCopy20Annotations(
    reconstructCopy20Dissertation(unterminatedCase),
    unterminatedCase
  ).ok,
  false,
  'La validation textuelle historique peut fusionner une phrase sans point terminal.'
);

const shortOperation = structuredClone(stagedPhrases);
shortOperation['I.1'][0].operation = 'x';
assert.equal(
  validateCopy20Annotations(
    reconstructCopy20Dissertation(shortOperation),
    shortOperation,
    { compareText: false }
  ).ok,
  true,
  'Le validateur contrôle la structure sans juger la qualité de operation.'
);

const incompleteInternalAnnotation = structuredClone(stagedPhrases);
delete incompleteInternalAnnotation['III.2'][0].operation;
assert.equal(
  validateCopy20Annotations(
    reconstructCopy20Dissertation(incompleteInternalAnnotation),
    incompleteInternalAnnotation,
    { compareText: false }
  ).ok,
  false,
  'Chaque annotation interne contient structurellement une opération.'
);

const copyParagraphGroups = copy.split('\n\n').map((group) => group.split('\n'));
assert.deepEqual(
  copyParagraphGroups.map((group) => group.length),
  [1, 3, 1, 3, 1, 3, 1],
  'Les parties ont chacune trois paragraphes et les transitions restent isolées.'
);
assert.deepEqual(copyParagraphGroups, [
  [stagedPhrases.introduction[0].phrase],
  [
    `${stagedPhrases.partieI[0].phrase} ${stagedPhrases['I.1'][0].phrase}`,
    stagedPhrases['I.2'][0].phrase,
    stagedPhrases['I.3'][0].phrase
  ],
  [stagedPhrases['transitionI-II'][0].phrase],
  [
    `${stagedPhrases.partieII[0].phrase} ${stagedPhrases['II.1'][0].phrase}`,
    stagedPhrases['II.2'][0].phrase,
    stagedPhrases['II.3'][0].phrase
  ],
  [stagedPhrases['transitionII-III'][0].phrase],
  [
    stagedPhrases['III.1'][0].phrase,
    stagedPhrases['III.2'][0].phrase,
    stagedPhrases['III.3'][0].phrase
  ],
  [stagedPhrases.conclusion[0].phrase]
], 'Les phrases annotées sont conservées dans les paragraphes et l’ordre demandés.');
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
wrongLabel['I.1'][0].fonction = argumentFunctionsByStage.introduction[0];
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
const validResolutionCandidate = (forms, answer) => ({
  forms,
  answerToSubject: answer,
  transformedDifficulty: 'Transformer le présupposé qui rend les deux difficultés incompatibles.',
  reasoningSteps: ['Établir le présupposé', 'En démontrer le déplacement'],
  treatsFirstDifficulty: 'Conserver ce que la première réponse explique.',
  treatsSecondDifficulty: 'Répondre au coût révélé par la réponse contraire.',
  preserves: 'Les deux acquis établis en I et II.',
  sacrifices: 'Écarter la prétention à une résolution sans coût.',
  additionalAssumptions: 'Aucune autre que la distinction conceptuelle du sujet.',
  assumptionJustification: 'La distinction est établie par les conséquences déjà examinées.',
  strongestObjection: 'Cette proposition peut masquer un déplacement de la difficulté.',
  responseToObjection: 'Le coût est maintenu comme condition et reste.',
  conditions: 'La distinction doit être démontrée et opérante.',
  cost: 'Une difficulté reste à traiter dans les cas où cette condition échoue.',
  remainder: 'La limite de la condition ouvre une question déterminée.'
});
const validResolutionPreparation = {
  candidates: {
    'candidate-1': validResolutionCandidate(
      ['duplication-ontologique'],
      'Réponse du candidat 1.'
    ),
    'candidate-2': validResolutionCandidate(
      ['processualisation', 'metamorphose'],
      'Réponse du candidat 2.'
    ),
    'candidate-3': validResolutionCandidate(
      ['suspension-epistemique'],
      'Réponse du candidat 3.'
    )
  },
  selectedCandidateId: 'candidate-2',
  strongestCompetitorId: 'candidate-1',
  selectionReason: 'Le candidat 2 transforme les deux difficultés sans sacrifier les acquis.',
  comparisonAgainstCompetitor: 'Le candidat 1 sépare les niveaux mais explique moins leur transformation.'
};
function generatedOutput(openingComparison, phrases, resolutionPreparation = validResolutionPreparation) {
  return { openingComparison, resolutionPreparation, phrases };
}
let nextGenerated = generatedOutput(validOpeningComparison, stagedPhrases);
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

async function requestWorkerGeneration(
  clientId,
  sujet = 'Peut-on être libre sans être responsable ?'
) {
  return worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': clientId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sujet })
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
  assert.match(capturedPayload.instructions, /resolutionPreparation/);
  const serializedContext = capturedPayload.instructions.slice(
    capturedPayload.instructions.indexOf('\n\n') + 2
  );
  const transmittedContext = JSON.parse(serializedContext);
  assert.equal(transmittedContext.redaction.resolutionSelection.forms.length, 8);
  assert.equal(transmittedContext.redaction.resolutionSelection.matrices.length, 4);
  assert.match(transmittedContext.redaction.resolutionSelection.sourceNote, /non exhaustif|pas le Dictionnaire complet/iu);
  assert.equal(transmittedContext.redaction.resolutionSelection.candidateIds.length, 3);
  assert.equal(capturedPayload.text.format.type, 'json_schema');
  assert.equal(capturedPayload.text.format.name, 'copy20_dissertation');
  assert.equal(capturedPayload.text.format.strict, true);
  const outputSchema = capturedPayload.text.format.schema;
  assertStrictSchema(outputSchema);
  assert.equal(Object.hasOwn(outputSchema.properties, 'copie'), false);
  assert.deepEqual(
    Object.keys(outputSchema.properties).sort(),
    ['openingComparison', 'phrases', 'resolutionPreparation']
  );
  assert.deepEqual(Object.keys(outputSchema.properties), [
    'openingComparison',
    'resolutionPreparation',
    'phrases'
  ]);
  const resolutionSchema = outputSchema.properties.resolutionPreparation;
  assert.deepEqual(
    Object.keys(resolutionSchema.properties.candidates.properties),
    ['candidate-1', 'candidate-2', 'candidate-3']
  );
  assert.deepEqual(
    resolutionSchema.properties.selectedCandidateId.enum,
    ['candidate-1', 'candidate-2', 'candidate-3']
  );
  assert.equal(Object.hasOwn(resolutionSchema.properties, 'score'), false);
  assert.deepEqual(
    resolutionSchema.properties.candidates.properties['candidate-1']
      .properties.forms.items.enum,
    generationContext.redaction.resolutionSelection.forms.map(({ id }) => id)
  );
  for (const candidate of Object.values(resolutionSchema.properties.candidates.properties)) {
    assert.deepEqual(
      Object.keys(candidate.properties),
      generationContext.redaction.resolutionSelection.comparisonFields
    );
    assert.equal(Object.hasOwn(candidate.properties, 'score'), false);
  }
  assert.equal(
    Object.hasOwn(outputSchema.properties, 'copie'),
    false
  );
  assert.deepEqual(
    Object.keys(outputSchema.properties.phrases.properties),
    COPY20_STAGE_ORDER
  );
  for (const stage of COPY20_STAGE_ORDER) {
    const phraseSchema = outputSchema.properties.phrases.properties[stage].items;
    const functionSchema = phraseSchema.properties.fonction;
    assert.deepEqual(functionSchema.enum, argumentFunctionsByStage[stage]);
    assert.deepEqual(phraseSchema.required, ['phrase', 'fonction', 'operation']);
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
  assert.equal(Object.hasOwn(body, 'resolutionPreparation'), false);
  assert.equal(Array.isArray(body.phrases), true);
  assert.deepEqual(
    body.phrases,
    validAnnotations.phrases.map(({ phrase, fonction }) => ({ phrase, fonction }))
  );
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
  nextGenerated = generatedOutput(validOpeningComparison, segmentationEdgePhrases);
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
  nextGenerated = generatedOutput(validOpeningComparison, stagedPhrases);

  const completeThirdPart = structuredClone(stagedPhrases);
  completeThirdPart['III.1'] = [{
    phrase: 'Il faut préserver à la fois les capacités que la technique rend possibles et la possibilité de discuter les fins qu’elle sert.',
    fonction: 'acquis à préserver',
    operation: 'Maintenir les deux acquis dégagés par les parties I et II.'
  }];
  completeThirdPart['III.2'] = [
    {
      phrase: 'Supposons qu’une application fictive recommande le trajet le plus rapide, mais écarte un chemin que des habitants jugent plus sûr.',
      fonction: 'exemple analysé',
      operation: 'Éprouver ensemble le gain de capacité et la limite imposée par les critères du système.'
    },
    {
      phrase: 'La liberté ne consiste donc pas seulement à choisir parmi les trajets proposés : elle suppose aussi de pouvoir discuter les critères qui les sélectionnent.',
      fonction: 'opération',
      operation: 'Déplacer la réflexion du choix des résultats vers la détermination des critères.'
    },
    {
      phrase: 'Si les usagers peuvent examiner et réviser ces critères, l’application peut étendre leur capacité d’agir sans décider seule de leurs fins.',
      fonction: 'mise à l’épreuve',
      operation: 'Tester l’opération sur le cas et établir la condition sous laquelle elle répond aux deux difficultés.'
    }
  ];
  completeThirdPart['III.3'] = [
    {
      phrase: 'La technique peut ainsi accroître la liberté lorsque ses fins et ses règles demeurent discutables et révisables.',
      fonction: 'réponse stabilisée',
      operation: 'Déduire une réponse conditionnelle au sujet à partir de l’opération éprouvée.'
    },
    {
      phrase: 'Cette réponse ne vaut toutefois que si les personnes concernées disposent d’un pouvoir effectif sur les règles.',
      fonction: 'portée et condition',
      operation: 'Délimiter la portée de la réponse par la condition d’un pouvoir réel de révision.'
    },
    {
      phrase: 'Reste à savoir qui contrôle les infrastructures lorsque les usagers ne peuvent pas eux-mêmes en modifier les critères.',
      fonction: 'reste',
      operation: 'Dégager la difficulté qui subsiste lorsque la condition d’autonomie n’est pas satisfaite.'
    }
  ];
  const technologyOpeningComparison = {
    ...validOpeningComparison,
    aporia: {
      firstRequirement: 'La technique doit accroître les capacités réelles d’agir.',
      firstResponse: 'La technique élargit les choix et les moyens disponibles.',
      firstDifficulty: 'Mais les choix proposés peuvent dépendre de fins imposées.',
      contraryRequirement: 'Les personnes doivent pouvoir décider des fins poursuivies.',
      contraryResponse: 'La liberté exige de discuter les fins inscrites dans les outils.',
      contraryDifficulty: 'Mais refuser les outils peut priver de capacités nouvelles.',
      problematic: 'Comment la technique peut-elle accroître la liberté sans fixer seule ses fins ?'
    }
  };
  const technologyResolutionPreparation = {
    ...validResolutionPreparation,
    selectedCandidateId: 'candidate-3',
    strongestCompetitorId: 'candidate-2',
    selectionReason: 'Cette proposition éprouve directement les deux difficultés du sujet technique.',
    candidates: {
      ...validResolutionPreparation.candidates,
      'candidate-3': validResolutionCandidate(
        ['inversion-indexation', 'metamorphose'],
        'La technique accroît la liberté si les personnes peuvent réviser les fins et les règles des outils.'
      )
    }
  };
  nextGenerated = generatedOutput(
    technologyOpeningComparison,
    completeThirdPart,
    technologyResolutionPreparation
  );
  const completeThirdPartResponse = await requestWorkerGeneration(
    'copy20-test-complete-new-third-part',
    'La technique nous rend-elle plus libres ?'
  );
  const completeThirdPartBody = await completeThirdPartResponse.json();
  assert.equal(completeThirdPartResponse.status, 200);
  assert.equal(completeThirdPartBody.ok, true);
  assert.equal(completeThirdPartBody.sujet, 'La technique nous rend-elle plus libres ?');
  assert.equal(Object.hasOwn(completeThirdPartBody, 'resolutionPreparation'), false);
  assert.ok(completeThirdPartBody.copie.includes(completeThirdPart['III.1'][0].phrase));
  assert.ok(completeThirdPartBody.copie.includes(completeThirdPart['III.2'][1].phrase));
  assert.ok(completeThirdPartBody.copie.includes(completeThirdPart['III.3'][2].phrase));
  assert.ok(
    completeThirdPartBody.copie.indexOf(completeThirdPart['III.1'][0].phrase) <
    completeThirdPartBody.copie.indexOf(completeThirdPart['III.2'][0].phrase)
  );
  assert.ok(
    completeThirdPartBody.copie.indexOf(completeThirdPart['III.2'][2].phrase) <
    completeThirdPartBody.copie.indexOf(completeThirdPart['III.3'][0].phrase)
  );
  assert.equal(
    completeThirdPartBody.phrases.some((entry) => Object.hasOwn(entry, 'operation')),
    false,
    'Les opérations détaillées restent internes à la réponse publique.'
  );
  assert.equal(
    completeThirdPartBody.phrases.find((entry) => entry.phrase === completeThirdPart['III.2'][1].phrase).fonction,
    'opération'
  );
  assert.equal(modelRequestCount, 4);

  nextGenerated = generatedOutput(validOpeningComparison, stagedPhrases);

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

  nextGenerated = generatedOutput(validOpeningComparison, wrongLabel);
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

  assert.equal(modelRequestCount, 8);

  nextGenerated = generatedOutput({
    ...validOpeningComparison,
    candidates: validOpeningComparison.candidates.slice(0, 2)
  }, stagedPhrases);
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

  nextGenerated = generatedOutput(validOpeningComparison, {
      ...stagedPhrases,
      introduction: [{
        phrase: 'La liberté dépend de la responsabilité.',
        fonction: openingFunction,
        operation: 'Énoncer une proposition sans la présenter comme une scène fictive.'
      }]
    });
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
