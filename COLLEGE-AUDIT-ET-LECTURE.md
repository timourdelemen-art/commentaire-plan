# Collège : audit et parcours de lecture

Audit du dépôt au 11 octobre 2026, base 8b2ec090. Le travail non publié de Claude n'est pas accessible : cette PR ajoute un parcours indépendant et évite les pages principales qu'il peut modifier.

## Résultat concret

Huit questions officielles du DNB : six de lecture (La Fontaine 2022 et George Sand 2023) et deux réécritures. Vingt-quatre tâches de préparation, trois niveaux, modèles annotés, reprise autonome, brouillons locaux isolés par question. Les réponses sont des modèles pour des questions notées sur quelques points, pas des copies garanties à 20. Les sujets officiels sont liés sur chaque exercice ; les choix de découpage et les annotations sont nos propositions pédagogiques, pas des corrigés ministériels.

Le parcours se trouve dans `brevet-lecture-parcours.html`. Sa source est `scripts/brevet-lecture-data.json` ; régénérer avec `node scripts/build-brevet-lecture.js`. Le générateur n'est pas ajouté à la chaîne Netlify : la page générée est versionnée, et le test bloque une désynchronisation. Le catalogue ciblé renvoie à ce parcours pour les huit questions ; les autres destinations restent celles du dépôt.

## Ce qui manque encore

1. Le collège visible est principalement une préparation de troisième au brevet. Il ne constitue pas une progression complète de sixième à troisième. Construire des parcours de lecture, écriture et langue par niveau avant de le présenter comme tel.
2. Les huit annales brevet du catalogue comportent 109 étapes et 54 corrections locales : 55 étapes n'ont pas de correction locale. Un seul support intégral est embarqué. Les liens officiels sont indispensables quand le support manque ; ne jamais reconstruire un texte de mémoire.
3. Ce chaînage d'annales ne comporte pas les dictées ni les rédactions. La rédaction existe ailleurs sur le site ; cela ne rend pas chaque chaîne complète dans les conditions de l'examen.
4. Certaines petites tâches des pages principales utilisent des exemples fabriqués. Les remplacer progressivement par des passages authentifiés et des questions officielles, sans confondre texte inventé d'entraînement et annale.
5. Une inférence de lecture doit accepter les interprétations réellement soutenues par les indices. Un départ précipité ne prouve pas à lui seul une émotion déterminée. Ne pas forcer une même formule de surprise pour une question de repérage, de grammaire ou de réécriture.
6. Les manipulations grammaticales doivent justifier une analyse locale. Une pronominalisation ne suffit pas toujours à établir une fonction : `en` et `y` ont plusieurs emplois.
7. Le moteur commun `annales/entrainement-annale.js` lit et écrit le stockage sans protection complète contre une donnée corrompue ou un stockage indisponible. Corriger ce moteur partagé dans une PR réservée avant de promettre une sauvegarde fiable de tous les parcours.
8. Adapter les annonces et les exercices aux règles de la session 2027 ; conserver le libellé et les points historiques des sujets de 2022/2023. La brièveté ne permet pas d'ignorer une longueur minimale lorsqu'un sujet de rédaction l'impose.

## Sources

- [Éduscol : français au cycle 4](https://eduscol.education.gouv.fr/5733/ressources-d-accompagnement-du-programme-de-francais-au-cycle-4).
- [BO : modalités du DNB à compter de 2027](https://www.education.gouv.fr/bo/2026/Hebdo4/MENE2623228N).
- PDF ministériels La Fontaine 2022, code 22GENFRQGCME1, et George Sand 2023, code 23GENFRQGCME1 : liens exacts conservés dans chaque entrée JSON.

## Vérification

`node scripts/test-brevet-lecture.js` : réussi ; huit modèles et vingt-quatre tâches, fidélité des modèles à la source JSON, IDs du catalogue, navigation, trois états motivés, sauvegarde et reprise, effacement isolé, panne de stockage. La proposition solide n'est la plus longue que dans un choix sur huit. Syntaxe JS : réussie.

Construction Netlify exacte en copie jetable : réussie. Contrôle global : 274 pages, zéro erreur et vingt avertissements préexistants. Contrôle philosophie : réussi. Budget de performance : réussi. Audit SEO : zéro erreur, un avertissement d'absence de lien HTML entrant vers le nouveau parcours, qui est actuellement atteint par le catalogue JavaScript.

Vérification pédagogique des huit réponses : lecture des questions et passages officiels, justification par indices précis, séparation constat/interprétation, réécriture des seules transformations demandées. L'image des sujets n'est pas traitée dans ces huit exercices. Les modèles doivent encore être relus indépendamment par un professeur.

Navigateur réel à 390 et 1280 px non testé dans cet environnement. PR à conserver en brouillon jusqu'à ce contrôle et à la relecture indépendante. Aucun déploiement ni fusion.
