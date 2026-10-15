import { getCopy20ArgumentFunctions } from './copy20-functions.js';

/* Rédaction : économie, fonctions des phrases, connecteurs au service de la démonstration. */
export function buildWritingRules() {
  return {
    sentenceFunctions: ["installer", "justifier", "distinguer", "objecter", "répondre", "transformer", "conclure"],
    copy20ArgumentFunctions: getCopy20ArgumentFunctions(),
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
    copy20Format: `Répondez uniquement avec l’objet JSON défini par le schéma : openingComparison et phrases, sans propriété copie. openingComparison contient aporia (firstRequirement, firstResponse, firstDifficulty, contraryRequirement, contraryResponse, contraryDifficulty, problematic), exactement trois candidates de structures distinctes, chacune avec id, structure, situation et assessment, puis selectedCandidateId. Chaque assessment contient exactRelevance, concreteness, aporeticPower, structuralDiversity, argumentativeNecessity, conceptualFruitfulness et literaryQuality ; chaque critère a un score entier de 1 à 5 et une rationale précise. selectedCandidateId désigne une candidate de score total maximal. Construisez la double aporie avant d’imaginer les situations. Développez seulement la situation sélectionnée, explicitement comme expérience de pensée ou cas fictif, sans attribution ni source inventée ; la phrase dont la fonction est « scène d’ouverture » signale elle-même son caractère fictif. phrases contient, dans l’ordre fourni, toutes les étapes avec des tableaux non vides d’objets ayant exactement les propriétés phrase, fonction et operation. fonction choisit exactement un rôle argumentatif générique autorisé pour cette étape. operation décrit l’opération particulière réellement accomplie par cette phrase sur le sujet et le raisonnement en cours ; elle n’est ni un second nom de fonction ni une formule générique. Les deux informations doivent correspondre au texte. Conservez le texte et la ponctuation de chaque phrase. Les annotations restent internes : n’ajoutez dans les phrases aucun titre, numéro de partie ou préfixe de fonction ; le Worker reconstruit la copie depuis les seules phrases. Gardez les transitions dans leurs étapes dédiées et maintenez les trois parties de trois sous-parties.`,
    copy20Protocol: `PROTOCOLE OPÉRATOIRE DE RÉDACTION COPY20

Les anciennes copies COPY20 gardent intégralement leurs annotations historiques exactes. Le vocabulaire générique ci-dessous en est une analyse distincte, et non un remplacement des libellés dans la source. Pour chaque phrase, indiquez (1) une fonction argumentative générique autorisée à l’étape et (2) l’opération intellectuelle particulière réellement accomplie sur ce sujet. L’opération dit ce que le passage fait au raisonnement ; elle n’invente pas un nouveau nom de fonction. Précisez aussi intérieurement le lien avec ce qui précède et le résultat que la suite doit utiliser. Ne faites pas passer une reprise lexicale propre à une copie pour une fonction générique : si le passage reprend un mot de la transition ou de la réponse précédente, le mot exact doit être présent dans la phrase ; sinon décrivez le lien réellement établi.

MOUVEMENT D’ENSEMBLE
Introduction : faire apparaître le problème dans une situation, analyser les termes et deux réponses légitimes avec leur difficulté, formuler la problématique et rendre le parcours nécessaire sans annoncer la résolution. I : établir la première réponse et en tirer sa propre limite. La transition-question conduit à II, qui répond à cette difficulté et rencontre la limite propre de la réponse contraire. La seconde transition-question met en relation les deux limites et ouvre l’examen de ce qu’elles présupposent. III : préserver les deux acquis, démontrer une opération adaptée au sujet, l’éprouver et en tirer une réponse stabilisée ainsi qu’un reste. La conclusion répond au sujet, relit la scène et ouvre la question issue de ce reste.

INTRODUCTION
La scène contient concrètement les deux exigences et ce qui risque d’être perdu. Son analyse n’infère que ce que ses détails autorisent. L’analyse des termes précise l’opérateur du sujet, leurs sens utiles et les lectures écartées. Les deux réponses gardent chacune leur raison et leur difficulté interne. La problématique les relie sans introduire de solution ; l’annonce indique seulement pourquoi les étapes suivantes sont requises.

PARTIE I
I.1 — Départ : la première réponse légitime au sujet. Opération : avancer sa raison et, si utile, un exemple analysé. Résultat : rendre cette réponse défendable par une proposition et ses appuis. Suite nécessaire : déterminer ce que cet appui permet d’ajouter ou oblige à renforcer en I.2.
I.2 — Départ : la raison établie en I.1. Opération : mobiliser un argument de référence précisément attribué et/ou analyser une conséquence ou un exemple. Résultat : renforcer la réponse par ce que l’argument établit, non par le seul nom de l’auteur. Suite nécessaire : pousser cette justification jusqu’à la difficulté qui lui est interne.
I.3 — Départ : la justification renforcée en I.2. Opération : en déduire la limite qu’elle engendre, puis la formuler avec précision. Résultat : établir le coût propre de la première réponse. Suite nécessaire : la question de transition fait apparaître l’exigence qu’il faut maintenant examiner.

TRANSITION I-II — Hors des parties : partir de la limite formulée en I.3 et poser une question ouverte, précise, à laquelle II.1 répond effectivement. Ne pas résumer I et ne pas annoncer d’avance la réponse.

PARTIE II
II.1 — Départ : la question de transition I-II. Opération : en tirer la nouvelle exigence et justifier pourquoi elle ne peut être écartée. Résultat : établir ce que la première réponse laissait de côté. Suite nécessaire : formuler la réponse contraire qui prend cette exigence au sérieux.
II.2 — Départ : l’exigence établie en II.1. Opération : défendre la réponse contraire par son argument ; attribuer précisément toute référence et analyser tout exemple utilisé. Résultat : montrer ce que cette réponse explique effectivement. Suite nécessaire : en éprouver les implications pour dégager sa difficulté interne.
II.3 — Départ : la réponse contraire et ses raisons en II.2. Opération : tirer de celles-ci la limite propre, puis la formuler distinctement. Résultat : établir le coût de cette seconde réponse, sans caricature. Suite nécessaire : la transition met en rapport les deux limites et leur présupposé possible.
TRANSITION II-III — Hors des parties : demander comment préserver les deux acquis malgré les deux difficultés, et quel présupposé commun doit être examiné. La question ouvre une recherche ; elle ne contient pas l’opération qui sera choisie.

PARTIE III
III.1 — Départ : les limites de I.3 et II.3. Opération : nommer séparément les deux acquis que les réponses précédentes ont établis. Résultat : expliciter ce que la résolution doit préserver. Suite nécessaire : ces exigences délimitent le choix de l’opération en III.2.
III.2 — Départ : les deux acquis et la question de transition II-III. Opération : choisir pour ce sujet une opération pertinente, en examinant les ressources du Dictionnaire paradoxal sans appliquer partout la même ; montrer précisément ce qu’elle transforme et comment elle répond à chacune des deux limites. Résultat : établir une proposition résolutoire plutôt qu’annoncer une étiquette. Suite nécessaire : raison, exemple analysé ou objection mettent cette proposition à l’épreuve et déterminent ses conditions.
III.3 — Départ : l’opération éprouvée en III.2. Opération : en déduire la réponse stabilisée au sujet, préciser sa portée et ses conditions, puis établir le reste à partir de ces limites. Résultat : répondre sans effacer les deux acquis ni masquer le coût. Suite nécessaire : la conclusion peut alors répondre au libellé exact et transformer le reste en question.

CONCLUSION
Répondre précisément au sujet ; réinterpréter un détail de la scène grâce au raisonnement ; formuler une nouvelle question qui naît du reste établi.

FONCTIONS ARGUMENTATIVES GÉNÉRIQUES PAR ÉTAPE
INTRODUCTION : scène d’ouverture ; analyse de la scène ; analyse des termes ; première réponse ; réponse contraire ; problématique ; annonce du parcours.
PARTIE I : thèse directrice ; I.1 réponse directrice, raison, exemple analysé ; I.2 argument de référence, exemple analysé, conséquence, développement de l’argument ; I.3 limite interne : dérivation, formulation de la limite.
TRANSITION I-II : question de transition.
PARTIE II : thèse contraire ; II.1 exigence nouvelle, justification de l’exigence ; II.2 argument contraire, argument de référence, exemple analysé, conséquence ; II.3 limite interne : dérivation, formulation de la limite.
TRANSITION II-III : question de transition.
PARTIE III : III.1 acquis à préserver, problème commun ; III.2 opération, raison de l’opération, exemple analysé, mise à l’épreuve, objection, réponse à l’objection, conséquence ; III.3 réponse stabilisée, portée et condition, reste.
CONCLUSION : réponse au sujet, retour à la scène, question nouvelle.
Ces rôles sont les catégories contrôlées et réutilisables. Dans les références historiques, le libellé de la fonction peut préciser l’opération locale ou une reprise lexicale ; gardez ces précisions dans le champ operation uniquement lorsqu’elles décrivent réellement le passage. N’imitez jamais un mot de reprise propre à une autre copie.

FORME ET VÉRIFICATION
Rédigez une dissertation complète en français, dans des paragraphes continus. Aucun titre « INTRODUCTION », « I », « I.1 », etc., aucun préfixe de fonction, ni métadiscours comme « L’idée de cette partie est… » ou « L’opération que je propose… ». Les deux transitions, conservées dans leurs étapes extérieures aux parties, sont de véritables questions ouvertes auxquelles la partie suivante répond. Pour chaque passage, choisissez le rôle d’après le travail argumentatif réellement fait ; décrivez dans operation l’action intellectuelle singulière et le lien avec le raisonnement précédent. Toute référence doit porter un argument attribué ; tout exemple analysé doit indiquer ce qu’il établit ; toute limite doit dériver du raisonnement antérieur ; toute reprise lexicale annotée doit se lire dans le texte. Avant l’envoi, relisez ces relations comme un contrôle de rédaction philosophique. Le validateur ne juge que la structure des données et ne certifie pas leur qualité philosophique.`,
    rule: "Une phrase inutile à la démonstration doit être supprimée.",
    connectors: "Les connecteurs expriment des relations logiques réelles et non un balisage mécanique du plan."
  };
}
