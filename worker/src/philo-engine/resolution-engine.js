import PHILOSOPHY_MATRICES from '../../../data/philosophie-matrices.json' with { type: 'json' };
import { RESOLUTION_FORMS } from './resolution-registry.js';

/*
 * Prépare les ressources et le protocole à transmettre au modèle. La
 * comparaison philosophique et le choix sont produits par le modèle dans
 * resolutionPreparation ; ce module ne les simule pas par heuristiques.
 */
export function compareResolutions(subject) {
  return {
    subject,
    sourceNote: 'Les procédures sont des adaptations opératoires des formes données, non des citations. Les matrices jointes sont un référentiel partiel, pas le Dictionnaire complet.',
    aporiaSource: 'openingComparison.aporia',
    argumentSource: 'argumentPreparation',
    forms: RESOLUTION_FORMS,
    matrices: PHILOSOPHY_MATRICES.matrices,
    procedure: [
      'Lire d’abord argumentPreparation : chaque candidate référence dans basis les identifiants des arguments, acquis et limites qu’elle conserve ou transforme, notamment I.gain, I.limit, II.gain et II.limit. Ne pas réécrire ces acquis dans une autre carte.',
      'Vérifier le problème avant de choisir une forme : les réponses portent-elles sur la même question, et les limites découlent-elles réellement de leurs raisons ? Si une opposition repose sur une équivoque ou une conséquence indue, rectifier openingComparison.aporia et argumentPreparation avant de comparer les candidates ; ne pas fabriquer une contradiction pour alimenter III.',
      'Construire trois propositions sérieuses et réellement distinctes pour le même problème ; elles peuvent combiner des formes ou relever d’une même forme si leurs transformations diffèrent.',
      'Pour chaque proposition, préciser la réponse au sujet, la difficulté transformée, les étapes, le traitement des deux difficultés, les acquis conservés et sacrifices, les hypothèses et leur justification, l’objection la plus forte et sa réponse, les conditions, le coût et le reste.',
      'Dans reasoningSteps et assumptionJustification, établir les conditions d’application des formes annoncées. Une forme dont le mécanisme n’est pas démontré doit être retravaillée ou écartée ; en expliquer la raison dans la comparaison. La distinction de sens ou de relations est recevable sans inventer deux niveaux de réalité ni forcer une étiquette du registre ; forms peut rester vide pour une opération hors des huit formes, à condition de la démontrer.',
      'Comparer sans notes selon la fidélité au sujet et à son opérateur, le traitement des deux difficultés, la conservation justifiée, les sacrifices et ajouts, la solidité face à l’objection, et la précision du reste.',
      'Choisir la proposition la plus défendable pour ce problème précis et justifier le choix contre la meilleure concurrente : identifier sa transformation exacte, ce qu’elle explique de plus et l’hypothèse supplémentaire qu’elle exige. Préférer une distinction suffisante à une contradiction proclamée ; ne pas imposer pour autant la distinction à tous les sujets. Aucun classement universel des formes.',
      'Faire gouverner III.1, III.2 et III.3 par la proposition retenue ; cette préparation doit être achevée avant la rédaction des phrases.',
      'Si aucune proposition ne convient, reprendre la comparaison dans cette même préparation ; ne pas laisser une sous-partie vide et ne pas inventer une résolution par défaut.'
    ],
    comparisonFields: [
      'basis',
      'forms',
      'answerToSubject',
      'transformedDifficulty',
      'reasoningSteps',
      'treatsFirstDifficulty',
      'treatsSecondDifficulty',
      'preserves',
      'sacrifices',
      'additionalAssumptions',
      'assumptionJustification',
      'strongestObjection',
      'responseToObjection',
      'conditions',
      'cost',
      'remainder'
    ],
    candidateIds: ['candidate-1', 'candidate-2', 'candidate-3'],
    status: 'model-comparison-required'
  };
}
