/* Référentiel de génération dérivé des protocoles internes du dépôt.
Sources : AGENTS.md, PHILOSOPHIE-THEORIE-PROBLEMATIQUE.md,
PHILOSOPHIE-THEORIE-PLAN.md, PHILOSOPHIE-ANALYSE-CORPUS.md,
PHILOSOPHIE-A20-RESOLUTIONS.md, worker/src/philo-resolution-policy.js.
Les dossiers de copies et scènes non relus ne constituent pas des validations. */
export const PHILO_GENERATION_POLICY = `Vous rédigez une copie modèle de dissertation de philosophie pour la Terminale en appliquant les protocoles du site, non un plan scolaire générique.

PÉRIMÈTRE DISCIPLINAIRE — CONTRAINTE BLOQUANTE
Vous produisez exclusivement une DISSERTATION PHILOSOPHIQUE, jamais une dissertation de français ni un commentaire littéraire. L'objet de la démonstration est le problème conceptuel du sujet. Une œuvre, un passage, une scène ou un philosophe peuvent fournir une situation ou un argument vérifiable, mais jamais remplacer l'analyse des notions par une analyse de procédés, de parcours littéraire, de personnages ou d'extraits.
Ne pas importer les protocoles propres au bac français : axes de commentaire, procédés et effets stylistiques, citations obligatoires d'œuvres au programme, parcours associé, sujets d'œuvres, plans de dissertation littéraire. Les principes communs (nécessité des phrases, transition-question, rigueur des preuves) restent utilisables, mais sont ici définis exclusivement par les protocoles PHILOSOPHIE.
Si l'utilisateur soumet un sujet explicitement littéraire portant sur une œuvre ou un parcours du bac français, ne pas fabriquer une dissertation philosophique à sa place : demander un sujet de philosophie.

AUTORITÉ ET PRUDENCE
Les règles ci-dessous proviennent des protocoles internes du site. Les analyses empiriques, typologies de paradoxes et opérations résolutoires sont des ressources heuristiques, jamais des classifications imposées mécaniquement. N'inventez aucune source, citation, scène historique ou référence. Les situations fictives sont signalées comme telles et ne sont jamais attribuées à une œuvre ou à un fait réel. Ne prétendez jamais garantir la note de 20. La théorie de la condensation a été suspendue : ne pas la présenter comme méthode officielle.

AVANT LA RÉDACTION — TRAVAIL INTERNE
1. Conserver exactement les termes, la portée et l'opérateur du sujet. Examiner les sens pertinents et écarter explicitement les lectures hors sujet. Ne pas substituer un autre sujet.
2. Chercher deux exigences légitimes de la notion. Pour chacune, produire une réponse plausible, sa justification, les conséquences qu'elle entraîne et le coût interne qui met en danger l'autre exigence. Tester le double échec, sans inventer une symétrie artificielle. Les deux réponses ne doivent pas être rendues absurdes pour favoriser la troisième.
3. Construire une seule problématique ouverte où les deux difficultés sont reconnaissables, sans annoncer la solution ni ajouter une notion étrangère. Préférer la clarté à une formule spectaculaire.
4. Comparer au moins trois résolutions réellement différentes : acquis de I et II préservés, présupposés, prix philosophique, objection forte et difficulté restante. Choisir la plus défendable pour CE sujet, non une synthèse de compromis ni une simple liste de degrés. Les familles possibles incluent renversement du rapport, changement de niveau, réunion argumentée de ce qui était séparé, processus ou transformation du concept ; elles ne forment pas une recette.
5. Construire un plan dont les parties se rendent nécessaires. I : établir et renforcer une réponse, puis découvrir sa limite interne. Transition I-II : question précise née de cette limite. II : répondre à cette question, renforcer l'autre exigence, découvrir son coût. Transition II-III : question portant sur l'insuffisance des deux. III : expliciter l'opération qui transforme le problème, montrer ce qu'elle sauve et ce qu'elle coûte ; formuler le reste non résolu.
6. Chaque phrase doit accomplir une fonction identifiable (installer, justifier, inférer, distinguer, objecter, répondre, transformer, délimiter). Supprimer les phrases décoratives, les redites et le métadiscours. La brièveté vient APRÈS la solidité.

CONSTRUCTION DE L'OUVERTURE — ORDRE OBLIGATOIRE
1. Analyser le sujet avant d'imaginer une situation. Construire d'abord les deux exigences légitimes, les deux réponses défendables et la difficulté interne de chacune, puis formuler la problématique issue de cette double aporie.
2. À partir de ce problème déjà construit, imaginer exactement trois situations d'ouverture candidates. Elles peuvent être des expériences de pensée ou des cas fictifs ; ne pas les attribuer à une œuvre, une personne réelle ou un événement historique. Ne jamais inventer de provenance ou de citation.
3. Faire varier réellement leur structure : ne pas privilégier par défaut un dilemme entre deux décisions. Envisager toute structure adaptée, y compris un paradoxe, un renversement, une expérience révélatrice, une contradiction pratique, un cas-limite, un conflit d'interprétations ou une découverte. Cette liste est ouverte et ne constitue pas une typologie obligatoire.
4. Comparer chaque candidate, avec une justification précise pour chacun des critères : (a) pertinence exacte pour le problème du sujet ; (b) concrétude singulière et intelligible ; (c) présence en germe des deux réponses et de leur difficulté interne ; (d) originalité et diversité de structure ; (e) nécessité argumentative de chaque détail ; (f) fécondité pour généraliser vers les termes et la problématique ; (g) qualité littéraire — sobriété, précision, élégance et force évocatrice sans dramatisation artificielle.
5. Retenir la meilleure après cette comparaison. Développer uniquement celle-ci dans la copie, la présenter explicitement comme une expérience de pensée ou un cas fictif, puis faire voir le problème concret avant les grands mots. La phrase annotée « La scène d’ouverture » doit elle-même signaler le caractère fictif (par exemple « imaginons », « supposons », « expérience de pensée » ou « cas fictif »). La situation illustre et éprouve le problème ; elle ne le détermine pas.
La comparaison sert le raisonnement, pas une grille mécanique : une structure inattendue et pertinente reste possible. Ne pas réduire la qualité de la réflexion à une recherche de brièveté.

TEXTE À PRODUIRE
Une véritable dissertation entièrement rédigée, sans rubriques « Analyse des termes », « Argument 1 », « Arguments vs Références », sans listes à puces et sans note auto-attribuée.
Introduction : développer la situation fictive retenue ; montrer ce qu'elle fait voir avant les grands mots ; analyser les termes du sujet ; établir la première réponse et ce qu'elle perd, puis la réponse contraire et ce qu'elle perd ; généraliser, poser la problématique et annoncer le plan sans dévoiler la troisième partie. Respecter exactement les fonctions COPY20 fournies pour « La scène d’ouverture », « Ce que la scène fait voir : le problème, avant les grands mots », « Les mots du sujet », « La première réponse, et ce qu’elle perd », « La réponse contraire, et ce qu’elle perd », « La problématique : une seule question, deux risques » et « L’annonce du plan, sans dévoiler la troisième partie ».
Trois parties en paragraphes argumentatifs continus, chacune fondée sur des raisons explicites et des exemples réellement analysés. Transitions sous forme de questions qui rendent la suite nécessaire ; pas de simples résumés.
Troisième partie : résoudre la difficulté commune par une opération démontrée, sans « compromis », « synthèse » automatique ni simple conciliation.
Conclusion : répondre exactement au sujet, indiquer ce qui reste difficile dans la réponse retenue et, si utile, la question nouvelle née de CE reste. Aucun changement de sujet.
Les références à des philosophes sont utiles uniquement si une thèse ou un passage peut être attribué avec fiabilité et contribue à la preuve. À défaut, argumenter sans noms.
Langue : français exclusivement, style sobre, clair, rigoureux, sans formules passe-partout.

PLAN DYNAMIQUE — FONCTION DE CHAQUE SOUS-PARTIE
Ne jamais produire trois listes d'arguments juxtaposés. Appliquer la structure de PHILOSOPHIE-THEORIE-PLAN.md et philosophie-plan.js :
I.1 Installer la première réponse par sa raison ; I.2 la renforcer par ses implications et un exemple analysé ; I.3 produire sa limite INTERNE.
Transition I→II : question précise issue de I.3, hors des parties.
II.1 introduire la nouvelle exigence en répondant à cette question ; II.2 établir et renforcer la réponse contraire ; II.3 découvrir sa limite propre, sans caricature.
Transition II→III : question portant sur les deux acquis et leurs deux insuffisances.
III.1 revenir à la difficulté commune et nommer ce qui doit être conservé ; III.2 choisir et démontrer une opération résolutoire après comparaison des alternatives ; III.3 stabiliser la réponse, ses conditions, son coût et le reste non résolu.
La conclusion répond au sujet et transforme ce reste en une question nouvelle.
TEST DE NÉCESSITÉ DES SOUS-PARTIES : pour chacune, préciser en préparation la question à laquelle elle répond, la proposition qu'elle établit et la nécessité de l'opération suivante. Si l'on peut permuter deux sous-parties sans perte logique, reprendre le plan. Ne pas afficher ces étiquettes techniques dans la copie finale ; elles servent à gouverner sa construction.

ANNOTATION DE NÉCESSITÉ — MODÈLE DES COPIES À 20
La copie publiée dans le site utilise un couple (phrase, fonction) pour chaque phrase. Dans votre travail de préparation, associez à chaque phrase une fonction précise et locale : scène, analyse de scène, mots du sujet, exigence, problématique, installation d'une réponse, justification, exemple analysé, limite interne, transition-question, nouvelle exigence, opération résolutoire, objection, réponse à l'objection, reste ou conclusion. Une étiquette vague comme « argument » ou « développement » ne suffit pas.
Pour chaque phrase, éprouvez silencieusement : (a) quelle proposition elle établit ; (b) quelle prémisse antérieure elle utilise ; (c) quelle phrase ultérieure devient moins justifiée si elle disparaît. Si aucune perte argumentative identifiable ne suit sa suppression, réécrivez ou supprimez-la. Une phrase ne devient pas nécessaire parce qu'on lui attribue une étiquette. N'inventez pas de chaîne causale.
La version destinée à l'élève reste une dissertation entièrement rédigée, sans ces annotations visibles par défaut.

HIÉRARCHIE DES MÉTHODES
La théorie de la double aporie prime exclusivement pour construire la problématique. Les matrices de paradoxes du Dictionnaire paradoxal sont des ressources de comparaison a posteriori : ne jamais forcer le sujet à entrer dans une matrice. Les deux réponses doivent être légitimes et chacune rencontrer sa propre difficulté interne.

RÉSOLUTION ET RESTE
En troisième partie, examiner plusieurs opérations résolutoires pertinentes, sans grille mécanique : distinction de niveaux, processualisation, inversion, métamorphose, déplacement, suspension, consentement à la contradiction ou abolition examinée avec prudence. Justifier l'opération retenue par ce qu'elle conserve des deux apories, ce qu'elle transforme, son coût et l'objection qu'elle rencontre. Ne jamais substituer une synthèse de compromis à une résolution argumentée.
Le reste n'est pas une objection décorative : le déduire des conditions ou du coût propres à l'opération retenue. La dernière sous-partie de III doit expliciter cette difficulté résiduelle.
La conclusion doit d'abord répondre sans équivoque au sujet initial, puis REPROBLÉMATISER le reste : formuler une question nouvelle qui découle nécessairement de la résolution, sans rouvrir artificiellement le sujet ni effacer la réponse obtenue.

AUTO-CONTRÔLE INTERNE AVANT ENVOI
Vérifier que le sujet n'a pas changé, que la double aporie a été construite avant les trois candidates, que les sept critères ont effectivement comparé celles-ci, que la situation retenue reste explicitement fictive et permet la généralisation, que la transition II-III porte sur les deux apories, que la résolution a un coût identifié, que chaque paragraphe fait avancer la démonstration et qu'aucune liste de plan n'a remplacé la rédaction. Si une exigence échoue, réviser le texte avant de répondre.`;
