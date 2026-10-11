# Explication de texte philosophique : références, audit et banque

Vérification le 11 octobre 2026. PR #127, distincte de HLP #126 et des dissertations A20 #125. Aucun déploiement. Source : `scripts/explication-textes-data.json` ; construction : `scripts/build-explication-textes.js`, appelée par le générateur des annales.

## Exercice et modalités

L’objet est l’extrait lui-même : problème, idée principale, concepts, propositions et organisation des raisons. L’élève explique le sens et le rôle des passages significatifs dans l’ensemble du cheminement. La connaissance exhaustive de la doctrine n’est pas requise. Les connaissances éclairent le texte sans remplacer son examen.

Le plan dépend du mouvement du texte. Aucun nombre fixe de parties ni partie critique séparée n’est imposé. Une objection peut éclairer une prémisse ou une portée ; elle reste liée à la thèse expliquée. La conclusion dégage ce que le passage établit. La question issue du reste, propre à la dissertation du site, ne devient pas une obligation d’explication.

| Voie | Modalités | Banque |
| --- | --- | --- |
| Générale | Quatre heures ; choix entre deux dissertations et une explication organisée ; note globale sur 20. | Deux textes, deux rédactions libres annotées. |
| Technologique | Même durée et choix ; questions A analyse, B synthèse, C commentaire. Option 1 : réponses dans l’ordre ; option 2 : développement choisi ; option indiquée. Note globale sur 20. | Un texte, huit questions exactes, deux modèles distincts. |
| HLP | Autres consignes et notes sur 10. | Méthodes non importées ; aucune dépendance à la PR HLP. |

## Références primaires consultées

- [BO philosophie générale du 17 septembre 2026, MENE2622661N](https://www.education.gouv.fr/bo/2026/Special4/MENE2622661N) : note applicable en 2027 ; objectifs, structure, évaluation globale des aptitudes exercées ensemble.
- [BO philosophie technologique du 17 septembre 2026, MENE2622663N](https://www.education.gouv.fr/bo/2026/Hebdo4/MENE2622663N) : rubriques A/B/C et choix des deux options. « Commentaire » nomme ici la partie C, pas l’ensemble de l’exercice.
- [Éduscol, Les exercices en classe de philosophie, mai 2020](https://eduscol.education.gouv.fr/sites/default/files/document/ra20lyceegtterphiloexercices21307357pdf-83652.pdf), p. 4 : exercice spécifique, texte comme objet, mouvement et concepts. Les références réglementaires de 2020 sont remplacées pour 2027 ; les préconisations restent publiées sur le portail actuel.
- [Éduscol, L’étude des textes et des œuvres, mai 2020](https://eduscol.education.gouv.fr/sites/default/files/document/ra20lyceegtterphiloetudestextes1294343pdf-83649.pdf) : appropriation progressive, perspectives variées, accompagnement du passage de HLP au tronc commun.
- [Éduscol, L’évaluation des travaux, mai 2020](https://eduscol.education.gouv.fr/sites/default/files/document/ra20lyceegtterphiloevaluations1318475pdf-83655.pdf) : travail apprécié globalement, indications utiles à la reprise.
- [Portail Éduscol philosophie, septembre 2026](https://eduscol.education.gouv.fr/5826/programmes-et-ressources-en-philosophie-voie-gt) : ressources actuelles et nouvelles définitions d’épreuve.
- [Guide de l’évaluation, novembre 2023](https://eduscol.education.fr/media/5470/download), rubrique philosophie : progression, travaux partiels et appréciation du travail effectif.

Modalités issues du BO actuel ; tâches du site comme transposition didactique, non prescription nationale supplémentaire. Pas de quota officiel de mots.

## Audit du site et corrections

Le parcours des annales finissait par le réemploi en dissertation. Cela peut être utile après lecture, mais ne remplace pas la rédaction de l’exercice choisi au bac. L’étape 5 devient l’explication entière. L’étape 4 fait rédiger une raison précise, au lieu de reconnaître une famille générale d’opération. Le nombre de moments n’est plus fixé à trois–cinq. Le réemploi reste un détail facultatif après l’explication. Le raccord à la nouvelle banque est produit par le générateur.

Les dissertations et leurs données A20 ne sont pas réécrites. Les zones d’explication portent `data-feedback="off"` : le correcteur général n’a pas ici l’extrait exact, et son enveloppe de critères philosophiques affirme qu’il n’y a pas de texte à analyser. Il ne peut attester la fidélité de lecture. La comparaison repose sur des repères et modèles. Worker et `free-response.js`, réservés par #125, restent inchangés.

## Corpus et contrôle des modèles

| Sujet officiel | Modèle | Contrôle décisif |
| --- | --- | --- |
| Tocqueville, Asie 2026, 26-PHGEJA1 | Libre | Condition introduite par « lorsque » ; voix des citoyens distinguée de l’auteur ; intérêt mal compris ; vide de prise en charge, sans tyran déjà installé. |
| Weil, Centres étrangers G1 2026, 26-PHGEG11 | Libre | Travail d’exécution ; équité ne supprimant pas tout ; besoin/bien, désir/effort ; boucle et comparaisons ; dernière phrase sur les meilleurs. |
| Malebranche, Antilles-Guyane 2026, 26-PHTEAG1 | Options 1 et 2 | Possibilité d’erreur / erreur effective ; ignorance / jugement ; liberté, responsabilité, précipitation. Les huit réponses A1–C2 sont dans l’ordre. |

PDF ministère ouverts et lus : [Tocqueville](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-philosophie-517430.pdf), [Weil](https://www.education.gouv.fr/sites/default/files/document/baccalaur-at-g-n-ral-2026-philosophie-517142.pdf), [Malebranche](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-technologique-2026-philosophie-517532.pdf). Chaque extrait est p. 2 ; questionnaire technologique p. 3.

Pas de reconstitution ni de reproduction intégrale ; trois textes français originaux relevant du domaine public. Citations ponctuelles confrontées aux PDF : Tocqueville « lorsque », « hors d’eux-mêmes », « comme vide » ; Weil « Mais », « surtout » ; Malebranche « Toutefois ». Questions A1–C2 recopiées de p. 3, lettres ajoutées pour classer les réponses.

La remarque sur le désir chez Weil éclaire une prémisse ; celle sur les moyens réels d’éviter une erreur chez Malebranche précise la responsabilité. Elles ne forment pas une troisième partie obligatoire. Quatre compositions du site visant 20, non copies authentiquement notées. Brièveté recherchée par suppression des répétitions, pas des arguments nécessaires.

## Progression et contrôles

Trois textes, quatre modèles, quinze tâches d’écriture partielle. Niveau 1 : thèse choisie puis justifiée par écrit. Niveau 2 : formuler et relier, avec aides repliées. Niveau 3 : rédiger l’ensemble avec le vrai texte, sans étapes guidées. Révision : réécrire un passage trop proche du résumé. Autre texte : tenter d’abord sans aide. Annotations masquables sans modifier le texte.

Les tests de structure, d’intégrité et de navigation simulée ne remplacent pas le navigateur 390/1280 px ni une relecture pédagogique indépendante, requis avant fusion selon AGENTS.md. Le module est autonome afin de permettre une fusion distincte de HLP ; une factorisation éventuelle de l’interface attendra la fin des deux chantiers.

## Résultats techniques

`node scripts/test-explication-textes.js` : quatre modèles intacts, quinze tâches, huit réponses technologiques, masquage simultané des annotations des deux options, navigation et stockage simulés. Dix pages de dissertation restent identiques octet pour octet avant SEO au générateur de la base. Build isolé : 277 pages, contrôle global 0 erreur, 20 avertissements anciens inchangés ; SEO 0 erreur/avertissement, budget performance et parcours philo OK. Build combiné #125/#126/#127 : 287 pages, mêmes résultats. Nettoyage Netlify vérifié. Test navigateur non effectué : PR reste brouillon.
