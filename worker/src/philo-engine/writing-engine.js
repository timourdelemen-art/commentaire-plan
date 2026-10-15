import { COPY20_STAGE_ORDER, getCopy20ArgumentFunctions } from './copy20-functions.js';
import { compareResolutions } from './resolution-engine.js';

import { ARGUMENT_PREPARATION, describeOperationContract } from './operation-contract.js';

/* Rédaction : économie, fonctions des phrases, connecteurs au service de la démonstration. */
export function buildWritingRules(subject) {
  return {
    sentenceFunctions: ["installer", "justifier", "distinguer", "objecter", "répondre", "transformer", "conclure"],
    resolutionSelection: compareResolutions(subject),
    copy20ArgumentFunctions: getCopy20ArgumentFunctions(),
    copy20AnnotationStages: COPY20_STAGE_ORDER,
    argumentPreparation: ARGUMENT_PREPARATION,
    copy20Format: `Répondez seulement avec openingComparison, argumentPreparation, resolutionPreparation et phrases, sans propriété copie. Construisez la double aporie avant d’imaginer les situations. openingComparison conserve aporia et exactement trois candidates de structures distinctes, évaluées selon exactRelevance, concreteness, aporeticPower, structuralDiversity, argumentativeNecessity, conceptualFruitfulness et literaryQuality, avec scores de 1 à 5 et raisons précises ; retenez une candidate de score total maximal. Développez seulement cette situation comme expérience de pensée ou cas fictif, signalé dans la phrase « scène d’ouverture ».
Après openingComparison, complétez argumentPreparation : une proposition concise par repère, jamais des paragraphes de copie. Les propriétés sont les identifiants littéraux (par exemple « I.gain »). Comparez ensuite trois réponses dans resolutionPreparation ; basis référence la carte, et les étapes, objection, conditions, coût et reste de la candidate sélectionnée préparent III. Dans le contrat ci-dessous, resolutionPreparation.selected désigne cette candidate, et openingComparison.selected la scène retenue ; ce sont des références, pas des objets supplémentaires à produire.
phrases contient les quinze étapes dans l’ordre fourni. Chaque passage contient phrase, fonction et operation, ainsi que operations : les identifiants des gestes réellement accomplis. Choisissez le rôle autorisé d’après le travail fait et décrivez brièvement l’opération intellectuelle particulière. Un passage peut réaliser plusieurs gestes et un geste peut s’étendre sur plusieurs passages. Réalisez tous les gestes requis du contrat, dans leur ordre logique, en utilisant leurs sources et dépendances. Les tableaux partieI et partieII peuvent être vides : si une phrase directrice est déjà dans I.1 ou II.1, ne la répétez pas. Toutes les autres étapes sont non vides.
Conservez le texte et la ponctuation ; le Worker reconstruit la copie depuis les seules phrases. N’insérez aucun titre, numéro de partie ou préfixe de fonction. Les annotations, la préparation et leurs identifiants restent internes.`,
    copy20Protocol: `PROTOCOLE OPÉRATOIRE DE RÉDACTION COPY20
AVANT LES PHRASES
Le contrat ci-dessous est la source des opérations requises, de leurs résultats et dépendances. Les variantes sont des moyens de preuve, jamais une dispense du geste. Préparez les appuis, acquis, limites et cibles de transition de I et II avant la comparaison de resolutionPreparation ; celle-ci doit répondre à ces difficultés et non à un autre problème. Les huit formes et leurs exigences propres se trouvent dans resolutionSelection ; elles peuvent se combiner, sans classement universel ni score. III réalise la candidate sélectionnée, pas une formule de compromis.
La scène vient d’abord, puis son analyse obligatoire, avant la généralisation et les termes (ces deux derniers peuvent partager un passage). Chaque réponse est accompagnée de sa raison et de son coût interne avant la problématique. Une fiction n’est pas une preuve empirique. Gardez l’opérateur exact du sujet et évitez d’opposer des propositions compatibles à des niveaux différents.

${describeOperationContract()}

RÉVISION ÉDITORIALE FINALE, DANS LE MÊME APPEL
Préparez puis rédigez le texte final une seule fois. Avant de rendre chaque passage, retirez répétitions, lourdeurs et métadiscours : « la réponse directrice », « l’opération proposée », « première étape », « la réponse stabilisée », « en réponse stricte au sujet ». Écrivez à leur place la proposition, sa raison ou l’inférence. Aucun nom technique de matrice ni identifiant dans la prose. Corrigez impropriétés et fautes ; préférez les verbes précis aux formules administratives. La révision préserve chaque justification, distinction, objection, réponse et reste ; les annotations correspondent uniquement au texte final, sans seconde version de la dissertation.
Les deux transitions sont de véritables questions ouvertes auxquelles la partie suivante répond, dans des paragraphes extérieurs aux parties. Toute référence doit mobiliser un auteur et un argument précis ; ne dites jamais « un argument de référence » à la place de cet argument. Tout exemple analysé indique ce qu’il établit ; toute reprise lexicale annotée doit se lire dans le texte. Le reste découle du coût démontré, pas d’incertitudes universelles. Le contrôle structurel ne certifie pas la qualité philosophique et ne doit pas être imité dans la rédaction.`,
    rule: "Une phrase inutile à la démonstration doit être supprimée.",
    connectors: "Les connecteurs expriment des relations logiques réelles et non un balisage mécanique du plan."
  };
}
