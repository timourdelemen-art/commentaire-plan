import { getCopy20SentenceFunctions } from './copy20-functions.js';

/* Rédaction : économie, fonctions des phrases, connecteurs au service de la démonstration. */
export function buildWritingRules() {
  return {
    sentenceFunctions: ["installer", "justifier", "distinguer", "objecter", "répondre", "transformer", "conclure"],
    copy20SentenceFunctions: getCopy20SentenceFunctions(),
    copy20AnnotationStages: [
      "introduction",
      "partieI",
      "I.1",
      "I.2",
      "I.3",
      "transitionI-II",
      "partieII",
      "II.1",
      "II.2",
      "II.3",
      "transitionII-III",
      "III.1",
      "III.2",
      "III.3",
      "conclusion"
    ],
    copy20Format: "Répondez uniquement par un objet JSON avec openingComparison, copie et phrases. openingComparison contient d’abord aporia (firstRequirement, firstResponse, firstDifficulty, contraryRequirement, contraryResponse, contraryDifficulty, problematic), puis exactement trois candidates de structures distinctes, chacune avec id, structure, situation et assessment. Pour chaque candidate, assessment contient exactRelevance, concreteness, aporeticPower, structuralDiversity, argumentativeNecessity, conceptualFruitfulness et literaryQuality ; chaque critère contient score entier de 1 à 5 et rationale précise. selectedCandidateId désigne une candidate de score total maximal. La double aporie doit être construite avant d’imaginer les situations. La copie développe seulement la situation sélectionnée et la présente comme expérience de pensée ou cas fictif, sans attribution ni source inventée. La phrase annotée « La scène d’ouverture » doit marquer explicitement le caractère fictif (expérience de pensée, cas fictif, situation fictive, « imaginons » ou « supposons »). copie contient le texte intégral ; phrases contient les étapes d’annotation, dans l’ordre fourni. Chaque étape est un tableau non vide d’objets ayant exactement les propriétés phrase et fonction. Associez exactement une fonction COPY20 à chaque phrase de la copie, une seule fois et dans l’ordre de lecture. Reprenez chaque intitulé à l’identique depuis les fonctions autorisées pour l’étape. Conservez la phrase mot pour mot dans copie. Placez les titres de partie et de sous-partie seuls sur leur ligne ; ne les annotez pas comme des phrases. Gardez les transitions dans leurs étapes dédiées. Maintenez trois parties de trois sous-parties. En III.1, III.2 et III.3, examinez intérieurement les matrices de résolution du Dictionnaire paradoxal comme ressources dépendant du sujet, sans imposer une matrice ni exposer son vocabulaire technique dans la copie.",
    rule: "Une phrase inutile à la démonstration doit être supprimée.",
    connectors: "Les connecteurs expriment des relations logiques réelles et non un balisage mécanique du plan."
  };
}
