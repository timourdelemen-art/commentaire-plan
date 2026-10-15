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
    copy20Format: `Répondez uniquement avec l’objet JSON défini par le schéma : openingComparison, phrases et annotationIssues, sans propriété copie. annotationIssues est un tableau vide si chaque phrase peut recevoir une fonction COPY20 exacte. Si aucune fonction autorisée ne décrit justement une opération nécessaire, ajoutez une entrée {stage, operation} qui nomme précisément l’étape et l’opération sans fonction correspondante ; laissez vide la liste phrases de cette étape. N’inventez pas d’intitulé et ne forcez pas une fonction fausse. openingComparison contient aporia (firstRequirement, firstResponse, firstDifficulty, contraryRequirement, contraryResponse, contraryDifficulty, problematic), exactement trois candidates de structures distinctes, chacune avec id, structure, situation et assessment, puis selectedCandidateId. Chaque assessment contient exactRelevance, concreteness, aporeticPower, structuralDiversity, argumentativeNecessity, conceptualFruitfulness et literaryQuality ; chaque critère a un score entier de 1 à 5 et une rationale précise. selectedCandidateId désigne une candidate de score total maximal. Construisez la double aporie avant d’imaginer les situations. Développez seulement la situation sélectionnée, explicitement comme expérience de pensée ou cas fictif, sans attribution ni source inventée ; la phrase annotée « La scène d’ouverture » signale elle-même son caractère fictif. phrases contient, dans l’ordre fourni, chaque étape avec un tableau non vide d’objets ayant exactement les propriétés phrase et fonction, sauf l’étape signalée dans annotationIssues. Associez une fonction COPY20 autorisée à chaque phrase et reprenez son intitulé exactement. Conservez le texte et la ponctuation de chaque phrase. Les étapes et fonctions restent des annotations internes : n’ajoutez dans les phrases aucun titre, numéro de partie ou préfixe de fonction ; le Worker reconstruit la copie à partir des seules phrases. Gardez les deux transitions dans leurs étapes dédiées et maintenez les trois parties et leurs trois sous-parties.`,
    copy20Protocol: `PROTOCOLE OPÉRATOIRE DE RÉDACTION COPY20

Chaque phrase annotée doit accomplir une fonction COPY20 exacte et une opération intellectuelle déterminée. Pour la construire, établissez intérieurement : l’opération effectuée ; le lien précis avec la proposition précédente ; le résultat argumentatif qui devient nécessaire à la suite. Ces relations guident le texte mais ne sont pas rendues dans le JSON. Une fonction n’est jamais une étiquette décorative : choisissez-la d’après ce que la phrase fait réellement. Si un intitulé décrit une reprise lexicale ou un connecteur, utilisez-le seulement si cette reprise ou ce connecteur apparaît réellement dans le texte. Pour un sujet nouveau, préférez un autre intitulé exact autorisé à l’étape lorsque celui-ci est plus juste ; n’inventez ni intitulé ni reprise.

INTRODUCTION
Ouvrez sur une situation singulière qui contient les éléments nécessaires aux deux exigences et aux difficultés de chacune. Analysez ce que la situation permet d’inférer, sans lui faire prouver plus qu’elle ne montre ; répartissez cette analyse sur autant d’unités que le raisonnement l’exige, sans quota artificiel. Analysez ensuite l’opérateur et les termes exacts du sujet, leurs sens pertinents et les lectures à écarter. Établissez une première réponse légitime, sa raison et la difficulté interne qui menace une exigence ; faites le même travail pour la réponse contraire et sa difficulté propre. Formulez une question qui mette en relation ces deux difficultés et reste fidèle à tous les termes du sujet. Annoncez un parcours rendu nécessaire par elles sans révéler la résolution.

PARTIE I
Faites progresser la réponse directrice dans cet ordre : énoncez-la ; explicitez la raison qui la soutient ; analysez effectivement un exemple en indiquant ce qu’il établit ; exposez un argument de référence précisément attribué et utilisez-le pour renforcer la réponse ; déduisez la conséquence de cet argument ; faites apparaître une limite qui découle de la justification elle-même ; formulez précisément cette limite ; terminez par une question ouverte, née de cette limite, à laquelle la partie II répond.

PARTIE II
Reprenez la difficulté laissée par la partie I et justifiez la nouvelle exigence qu’elle fait apparaître. Établissez la réponse contraire et son argument ; analysez un exemple si la fonction retenue l’exige. Développez sa limite interne à partir de son propre raisonnement, puis formulez-la précisément. Terminez par une question qui réunit les deux difficultés et ouvre l’examen de leur présupposé commun.

PARTIE III
Nommez les deux acquis des parties précédentes qu’il faut préserver. Choisissez une opération adaptée à ce sujet parmi les ressources du Dictionnaire paradoxal, sans appliquer partout la même opération ni en exposer le vocabulaire technique dans la copie. Démontrez ce que l’opération transforme et pourquoi elle traite chacune des deux difficultés. Éprouvez-la par une raison, un exemple analysé ou une objection à laquelle vous répondez. Déduisez une réponse stabilisée au sujet, sa portée et ses conditions ; tirez le reste des limites propres de cette réponse. Une coopération, un compromis ou une distinction simplement annoncée ne constitue pas à elle seule une opération démontrée.

CONCLUSION
Répondez précisément au sujet ; réinterprétez la scène d’ouverture à la lumière du raisonnement ; transformez le reste établi en une question nouvelle.

FORME ET VÉRIFICATION
Rédigez une dissertation complète en français, dans des paragraphes liés par un raisonnement continu. N’affichez aucun titre « INTRODUCTION », « I », « I.1 », etc., aucun préfixe COPY20, ni métadiscours comme « L’idée de cette partie est… » ou « L’opération que je propose… ». Les transitions sont des paragraphes rédigés sous forme de questions ouvertes ; la partie suivante y répond effectivement. Attribuez un argument précis à toute fonction de référence ; pour tout exemple analysé, donnez le cas et l’inférence qu’il autorise ; faites découler chaque limite du raisonnement antérieur ; vérifiez que les reprises annoncées existent réellement. Avant de rendre le JSON, contrôlez une à une ces correspondances entre fonction, opération, texte précédent et résultat nécessaire à la suite, puis corrigez toute annotation fausse. Ce contrôle est philosophique et rédactionnel ; ne le remplacez pas par une affirmation de validation automatique.`,
    rule: "Une phrase inutile à la démonstration doit être supprimée.",
    connectors: "Les connecteurs expriment des relations logiques réelles et non un balisage mécanique du plan."
  };
}
