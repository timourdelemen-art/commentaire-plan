/* Contrat interne : gestes requis, sources préparatoires et dépendances.
 * Les identifiants attestent une couverture déclarée, jamais une preuve philosophique.
 * Les textes et annotations historiques COPY20 ne sont pas modifiés.
 */
export const ARGUMENT_PREPARATION = {
  'I.answer': 'Première réponse au libellé exact.',
  'I.reason': 'Raison et appui qui rendent cette réponse défendable.',
  'I.reinforcement': 'Argument qui renforce cette raison, avant toute critique.',
  'I.gain': 'Proposition acquise grâce à ce renforcement.',
  'I.limit': 'Dérivation de la difficulté interne à partir de cette justification.',
  'I.transition': 'Difficulté à interroger pour rendre II nécessaire ; pas une transition pré-rédigée.',
  'II.requirement': 'Exigence légitime appelée par cette difficulté.',
  'II.reason': 'Justification de cette exigence, répondant à la cible de transition.',
  'II.answer': 'Réponse contraire avec sa raison et ses appuis.',
  'II.gain': 'Proposition acquise grâce à cette réponse.',
  'II.limit': 'Dérivation de sa difficulté propre, sans caricature.',
  'II.transition': 'Question à construire à partir des deux limites, sans annoncer la résolution.'
};

const step = (id, source, uses, work) => ({ id, source, uses, work });
// selected désigne la candidate identifiée par resolutionPreparation.selectedCandidateId.
export const OPERATION_CONTRACT = {
  introduction: [
    step('intro.scene', 'openingComparison.selected', [], 'Exposer la scène singulière choisie : les détails portent les deux exigences et leurs difficultés, sans supposer la solution.'),
    step('intro.sceneAnalysis', 'openingComparison.aporia', ['intro.scene'], 'Interpréter les détails pour dégager les deux tensions avant les grands mots ; limiter les inférences tirées de l’exemple.'),
    step('intro.generalization', 'openingComparison.aporia', ['intro.sceneAnalysis'], 'Passer de cette difficulté concrète à la relation générale interrogée, sans généraliser abusivement.'),
    step('intro.terms', 'sujet', ['intro.sceneAnalysis'], 'Déterminer les notions et l’opérateur exact, distinguer les sens et les niveaux ; ne pas inventer une opposition entre propositions compatibles.'),
    step('intro.firstAnswerCost', 'openingComparison.aporia', ['intro.generalization', 'intro.terms'], 'Établir ensemble première réponse, raison et difficulté interne menaçant une exigence légitime.'),
    step('intro.secondAnswerCost', 'openingComparison.aporia', ['intro.firstAnswerCost'], 'Établir ensemble réponse contraire, raison propre et difficulté interne ; conserver la légitimité des deux réponses.'),
    step('intro.problem', 'openingComparison.aporia.problematic', ['intro.firstAnswerCost', 'intro.secondAnswerCost'], 'Formuler une seule question reliant les deux apories, fidèle au sujet et sans solution anticipée ni demande de conciliation.'),
    step('intro.announcement', 'argumentPreparation', ['intro.problem'], 'Annoncer pourquoi le parcours sera nécessaire, sans exposer la résolution ni le vocabulaire de préparation.')
  ],
  partieI: [],
  'I.1': [
    step('I.answer', 'argumentPreparation.I.answer', ['intro.firstAnswerCost'], 'Établir la première réponse, une seule fois ; la phrase directrice peut se trouver dans partieI.'),
    step('I.reason', 'argumentPreparation.I.reason', ['I.answer'], 'Justifier cette réponse par un lien intelligible ; analyser un cas si utile, sans présenter une fiction comme preuve empirique.')
  ],
  'I.2': [
    step('I.reinforcement', 'argumentPreparation.I.reinforcement', ['I.reason'], 'Renforcer la réponse par une implication, un argument de référence précisément attribué, un exemple analysé ou un approfondissement ; ne pas anticiper I.3.'),
    step('I.gain', 'argumentPreparation.I.gain', ['I.reinforcement'], 'Déduire ce que cet appui établit de plus ; une répétition de I.1 ne suffit pas.')
  ],
  'I.3': [
    step('I.deriveLimit', 'argumentPreparation.I.limit', ['I.reason', 'I.gain'], 'Dériver la difficulté qui lui est interne de la justification renforcée ; ne pas attribuer à la thèse une conséquence qu’elle n’implique pas.'),
    step('I.stateLimit', 'argumentPreparation.I.limit', ['I.deriveLimit'], 'Formuler exactement le coût et l’exigence laissée insatisfaite.')
  ],
  'transitionI-II': [step('transitionI-II.question', 'argumentPreparation.I.transition', ['I.stateLimit'], 'Poser une question ouverte issue de cette limite ; ni résumé ni question qui sollicite seulement un oui. II.1 doit y répondre.')],
  partieII: [],
  'II.1': [
    step('II.answerTransition', 'argumentPreparation.II.requirement', ['transitionI-II.question'], 'Répondre substantiellement à la question en établissant l’exigence que I ne préservait pas.'),
    step('II.justifyRequirement', 'argumentPreparation.II.reason', ['II.answerTransition'], 'Justifier pourquoi cette exigence ne peut être sacrifiée ; préparer la réponse contraire.')
  ],
  'II.2': [
    step('II.defendAnswer', 'argumentPreparation.II.answer', ['II.justifyRequirement'], 'Défendre la réponse contraire avec sa raison ; tout exemple est analysé et toute référence réellement attribuée.'),
    step('II.gain', 'argumentPreparation.II.gain', ['II.defendAnswer'], 'Établir ce que cette réponse permet effectivement de comprendre.')
  ],
  'II.3': [
    step('II.deriveLimit', 'argumentPreparation.II.limit', ['II.defendAnswer', 'II.gain'], 'Dériver la limite propre de la réponse telle qu’elle vient d’être défendue, sans objection extérieure plaquée.'),
    step('II.stateLimit', 'argumentPreparation.II.limit', ['II.deriveLimit'], 'Formuler son coût tout en maintenant ses acquis.')
  ],
  'transitionII-III': [step('transitionII-III.question', 'argumentPreparation.II.transition', ['I.stateLimit', 'II.stateLimit'], 'Poser une question ouverte sur les deux difficultés et leur présupposé éventuel, sans dévoiler l’opération choisie.')],
  'III.1': [
    step('III.preserveI', 'argumentPreparation.I.gain', ['I.gain'], 'Reprendre précisément le premier acquis à préserver.'),
    step('III.preserveII', 'argumentPreparation.II.gain', ['II.gain'], 'Reprendre précisément le second acquis à préserver.'),
    step('III.commonDifficulty', 'resolutionPreparation.selected.transformedDifficulty', ['III.preserveI', 'III.preserveII', 'transitionII-III.question'], 'Établir le cadrage qui rendait ces acquis incompatibles et ce que la candidate retenue doit transformer.')
  ],
  'III.2': [
    step('III.operation', 'resolutionPreparation.selected.reasoningSteps', ['III.commonDifficulty'], 'Accomplir les étapes concrètes de la candidate sélectionnée ; ne pas seulement nommer sa matrice.'),
    step('III.justifyOperation', 'resolutionPreparation.selected.assumptionJustification', ['III.operation'], 'Démontrer le mécanisme et justifier les hypothèses : devenir réglé, inversion démontrée, identité conservée, niveaux justifiés, selon les formes retenues.'),
    step('III.treatFirstDifficulty', 'resolutionPreparation.selected.treatsFirstDifficulty', ['III.justifyOperation', 'I.stateLimit'], 'Montrer précisément comment la transformation traite la première difficulté.'),
    step('III.treatSecondDifficulty', 'resolutionPreparation.selected.treatsSecondDifficulty', ['III.justifyOperation', 'II.stateLimit'], 'Montrer précisément comment elle traite la seconde, sans substituer une liste de garanties à la preuve.'),
    step('III.objection', 'resolutionPreparation.selected.strongestObjection', ['III.operation'], 'Éprouver le mécanisme par son objection forte ; un cas précis peut porter cette objection.'),
    step('III.replyObjection', 'resolutionPreparation.selected.responseToObjection', ['III.objection'], 'Répondre sur le point attaqué et reconnaître ce qui résiste ; ne pas prétendre lever l’objection par une procédure qui ne la traite pas.')
  ],
  'III.3': [
    step('III.answer', 'resolutionPreparation.selected.answerToSubject', ['III.treatFirstDifficulty', 'III.treatSecondDifficulty', 'III.replyObjection'], 'Déduire la réponse au libellé exact ; ne pas le restreindre silencieusement.'),
    step('III.scopeCondition', 'resolutionPreparation.selected.conditions', ['III.answer'], 'Préciser la portée, les conditions et le coût établis par l’épreuve.'),
    step('III.remainder', 'resolutionPreparation.selected.remainder', ['III.scopeCondition', 'III.replyObjection'], 'Déduire un reste déterminé de cette opération et de son coût, non des incertitudes générales.')
  ],
  conclusion: [
    step('conclusion.answer', 'resolutionPreparation.selected.answerToSubject', ['III.answer'], 'Répondre nettement au sujet avec la distinction obtenue, sans recommencer la démonstration.'),
    step('conclusion.returnScene', 'openingComparison.selected', ['intro.scene', 'III.answer'], 'Réinterpréter un détail de la scène grâce au résultat, sans la raconter à nouveau.'),
    step('conclusion.newQuestion', 'resolutionPreparation.selected.remainder', ['III.remainder'], 'Transformer ce reste précis en nouvelle question, sans changer de sujet ni annuler la réponse.')
  ]
};

export const OPERATION_IDS = Object.values(OPERATION_CONTRACT).flat().map(({ id }) => id);

export function operationIdsFor(stage) {
  if (stage === 'partieI') return ['I.answer'];
  if (stage === 'partieII') return ['II.answerTransition', 'II.defendAnswer'];
  // Une phrase directrice peut être portée par II.1 sans anticiper son appui de II.2.
  if (stage === 'II.1') return [...OPERATION_CONTRACT[stage].map(({ id }) => id), 'II.defendAnswer'];
  return OPERATION_CONTRACT[stage].map(({ id }) => id);
}

export function describeOperationContract() {
  return Object.entries(OPERATION_CONTRACT)
    .filter(([, operations]) => operations.length)
    .map(([stage, operations]) => `${stage}\n${operations.map(({ id, source, uses, work }) =>
      `${id} | source: ${source} | reprend: ${uses.join(', ') || 'sujet'} | ${work}`
    ).join('\n')}`).join('\n\n');
}

export function preparationFor(source, generated, sujet) {
  if (source === 'sujet') return sujet;
  if (source.startsWith('argumentPreparation.')) {
    return generated.argumentPreparation?.[source.slice('argumentPreparation.'.length)];
  }
  if (source.startsWith('resolutionPreparation.selected.')) {
    const preparation = generated.resolutionPreparation;
    return preparation?.candidates?.[preparation.selectedCandidateId]?.[
      source.slice('resolutionPreparation.selected.'.length)
    ];
  }
  if (source === 'openingComparison.selected') {
    return generated.openingComparison?.candidates?.find(
      ({ id }) => id === generated.openingComparison.selectedCandidateId
    )?.situation;
  }
  return source.split('.').reduce((value, key) => value?.[key], generated);
}

export function auditPreparationLinks(generated, sujet) {
  const missingSources = Object.values(OPERATION_CONTRACT).flat()
    .filter(({ source }) => {
      const value = preparationFor(source, generated, sujet);
      return value == null || (typeof value === 'string' && !value.trim()) ||
        (Array.isArray(value) && value.length === 0);
    }).map(({ id }) => id);
  const candidates = Object.values(generated.resolutionPreparation?.candidates || {});
  let invalidBasisReferences = 0;
  let candidatesWithoutBothLimits = 0;
  for (const candidate of candidates) {
    const basis = Array.isArray(candidate?.basis) ? candidate.basis : [];
    invalidBasisReferences += basis.filter((id) => !Object.hasOwn(ARGUMENT_PREPARATION, id)).length;
    if (!['I.gain', 'I.limit', 'II.gain', 'II.limit'].every((id) => basis.includes(id))) {
      candidatesWithoutBothLimits += 1;
    }
  }
  return { complete: missingSources.length === 0 && candidates.length === 3 &&
      invalidBasisReferences === 0 && candidatesWithoutBothLimits === 0,
    missingSources, invalidBasisReferences, candidatesWithoutBothLimits };
}

// Observation non bloquante : un lien est une déclaration, pas une preuve.
export function auditOperationCoverage(stagedPhrases) {
  const covered = new Set();
  let invalidReferences = 0;
  for (const [stage, entries] of Object.entries(stagedPhrases || {})) {
    if (!Object.hasOwn(OPERATION_CONTRACT, stage) || !Array.isArray(entries)) continue;
    const allowed = operationIdsFor(stage);
    for (const entry of entries) {
      for (const id of Array.isArray(entry?.operations) ? entry.operations : []) {
        if (allowed.includes(id)) covered.add(id);
        else invalidReferences += 1;
      }
    }
  }
  const missing = OPERATION_IDS.filter((id) => !covered.has(id));
  return { complete: missing.length === 0 && invalidReferences === 0,
    coveredCount: covered.size, requiredCount: OPERATION_IDS.length, missing, invalidReferences };
}
