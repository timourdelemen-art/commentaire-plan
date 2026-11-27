# HLP : références, audit et progression

Audit initial du 11 octobre 2026, mis à jour le 27 novembre 2026. La mention de PR #126 sans fusion ni déploiement décrit l’état du chantier à la date de l’audit initial, non l’état actuel du dépôt. Source : `scripts/hlp-parcours-data.json` ; construction : `scripts/build-hlp-parcours.js`. Modèles originaux proposés à la relecture, sans notation authentique par un jury.

Référence réglementaire actuelle : Bulletin officiel spécial n° 4 du 17 septembre 2026, note de service applicable à la session 2027. L’épreuve écrite dure quatre heures et comprend deux questions, chacune notée sur dix : une interprétation (littéraire ou philosophique) d’un enjeu majeur du texte et un essai (littéraire ou philosophique) répondant à une question qu’il soulève. Les deux développements doivent être d’ampleur comparable et présentés sur deux copies distinctes. La note nationale IGESR du 27 mars 2023 précise que l’interprétation n’est ni un commentaire intégral ni une explication exhaustive, et qu’un essai réussi n’a pas à suivre une introduction dissertative ou un plan dialectique.


## Cadres distincts

| Cadre | Attendus et modalités | Conséquence pour le site |
| --- | --- | --- |
| Première scolaire | Contrôle continu ; les anciens sujets E3C sont historiques. | Molière et Descartes sont étiquetés supports d’entraînement. |
| Première ponctuelle réglementaire | Deux heures, interprétation et question de réflexion de disciplines différentes, deux notes sur 10. | Maintenir le nom « réflexion », distinguer ce cadre du contrôle continu. |
| Terminale 2027 | Quatre heures, interprétation d’un enjeu et essai à partir du texte ; ampleur comparable, copies distinctes, chacune sur 10. Tout le programme terminal est évaluable. | Deux parcours indépendants ; l’objectif 20 correspond à 10 + 10. |
| Interprétation | Question ciblée, appuis précis et analyse ; pas d’exhaustivité obligatoire. | La lecture est conduite par la question, sans commentaire intégral imposé. |
| Essai | Pensée personnelle étayée, composition libre et progression raisonnée. | Ni plan dialectique ni introduction dissertative imposés ; « je » possible. |

La théorie des résolutions et le plan de dissertation du site ne deviennent pas des obligations HLP. Une conclusion répond et précise ; la question nouvelle issue du reste n’est pas une exigence de cet exercice. La brièveté ne dispense pas de développer les raisons. Les étapes ci-dessous sont une proposition pédagogique, pas un format national ni un barème.

## Références primaires consultées

- [BO HLP du 17 septembre 2026, MENE2622659N](https://www.education.gouv.fr/bo/2026/Hebdo4/MENE2622659N) : définition applicable en 2027, remplaçant celle de 2020 ; durée, programme, copies et notation. Les restrictions de programme présentes dans les sujets zéro 2020 sont historiques.
- [BO du 26 août 2021, MENE2121284N](https://www.education.gouv.fr/bo/21/Hebdo31/MENE2121284N.htm), rubrique HLP : évaluation ponctuelle de première, applicable depuis 2023.
- [BO du 29 juillet 2021, MENE2121270N](https://www.education.gouv.fr/bo/21/Hebdo30/MENE2121270N.htm) et [mémo Éduscol, septembre 2025](https://eduscol.education.fr/document/67636/download?attachment=) : contrôle continu et situations des candidats. Aucun coefficient tiré d’un sujet ancien n’est ajouté.
- [Éduscol, Attendus, 2019](https://eduscol.education.gouv.fr/sites/default/files/document/ra19lyceeg1-thlpattendus-epreuveselements-evaluation1205353pdf-83928.pdf), deux pages : qualités intellectuelles, précision et variété des formes. Le régime E3C mentionné est historique.
- [Éduscol, Questions d’évaluation, mars 2021](https://eduscol.education.gouv.fr/sites/default/files/document/ra21lyceeg1-thlpphiloquestions-evaluationexercices-travaux-epreuvespdf-70074.pdf), p. 2–5 : présence du texte dans les deux exercices, appréciation qualitative, emploi du haut de l’échelle sur 10.
- [IGÉSR, Entente nationale HLP, 2023](https://site.ac-martinique.fr/lettres/wp-content/uploads/sites/16/2023/03/HLP-Entente-Nationale-Lettres-Philosophie-2023.pdf), p. 3 : l’absence de commentaire intégral, d’introduction dissertative ou de plan dialectique ne constitue pas une faute ; 10 n’exige pas une perfection absolue. PDF lu, accès parfois intermittent.
- [Inspection Rennes, Bardyn et Belliard, janvier 2024](https://pedagogie.ac-rennes.fr/sites/pedagogie.ac-rennes.fr/IMG/pdf/compagnonnage_lettres-philosophie_en_specialite_hlp_janvier_24.pdf), p. 8 et 10 : coopération disciplinaire, distinction des exercices, références appropriées.
- [Inspection Rennes, novembre 2022](https://pedagogie.ac-rennes.fr/sites/pedagogie.ac-rennes.fr/IMG/pdf/specialite_hlp_journee_de_l_inspection_novembre_22.pdf) : pensée personnelle, non récitation.
- [PNF 2024, Grenoble, publié par Versailles](https://philosophie.ac-versailles.fr/IMG/pdf/pnf_hlp-production_grenoble2.pdf) : appropriation des références artistiques pour argumenter ; pas de catalogue obligatoire.
- [Guide de l’évaluation, novembre 2023](https://eduscol.education.fr/media/5470/download), p. 79–81 : tâches et supports variés, progressivité, juste place des exercices complets. La banque ne remplace pas lectures, oral et écritures libres.
- [Portail Éduscol HLP, septembre 2026](https://eduscol.education.gouv.fr/5805/programmes-et-ressources-en-humanites-litterature-et-philosophie-voie-g) : PNF « Interpréter, essayer », interventions de Barbarant et Mathias, travail sur l’essai.

Hiérarchie : BO actuel pour les modalités ; Éduscol et IGÉSR pour les attendus ; inspection et PNF pour la didactique. Un ancien support peut rester utile sans réactiver une règle remplacée.

## Audit et corrections

`build-hlp.js` imposait trois parties à l’étape 7 et une succession de limites dans la grille d’essai littéraire. Les nouvelles consignes demandent d’ordonner les raisons sans nombre imposé. L’étape 6 éprouve une idée sans exiger de sacrifice ni d’opposition systématique. La grille d’interprétation philosophique revient à l’enjeu demandé.

Le correcteur général de cette branche ne dispose ni d’une politique HLP spécifique ni d’un extrait exact fourni. Les zones produites par ce générateur et la nouvelle banque portent donc `data-feedback="off"`. La comparaison repose sur les grilles et modèles HLP ; pas sur une validation artificielle. Le worker et `free-response.js`, réservés par #125, restent inchangés. Réactiver un retour exige un vrai routage HLP, le type d’exercice et la connaissance vérifiée du texte.

Les pages principales HLP et la source de la banque d’annales ne sont pas réécrites pour préserver le chantier de Claude. Le raccord au nouveau module passe par les blocs que produit le générateur. Les pages générées doivent être reconstruites, pas corrigées à la main.

## Corpus, modèles et contrôles de lecture

Douze paires, vingt-quatre réponses : deux sujets zéro de Première (Molière, Descartes) et dix sujets de Terminale (Rivière, Alain, Condorcet, Sand, Voltaire, Diderot, Heredia, Weil, Barbusse, Rousseau). Les dix modèles de Terminale comprennent huit paires d’annales et deux sujets zéro (Rivière, Alain). Les deux combinaisons de Terminale (interprétation littéraire + essai philosophique ; interprétation philosophique + essai littéraire) et les deux combinaisons de Première sont représentées. La couverture des annales reste partielle : les 103 fiches de la banque comprennent 100 entrées des sessions 2021–2026 et trois sujets zéro de 2020 ; huit paires d’annales disposent actuellement d’un corrigé rédigé complet. Les autres fiches donnent le sujet officiel et un entraînement guidé, sans modèle complet.

| Texte officiel | Contrôle décisif |
| --- | --- |
| Molière, zéro 2 première | Appellations et argent ; plusieurs lectures de la domination restent défendables. |
| Descartes, zéro 3 première | Épreuve des jugements et distance envers les coutumes ; pas de vérité acquise automatiquement. Récit lu et voyage vécu distincts. |
| Rivière, zéro 2 terminale | Existence certaine / plénitude intermittente ; comparaison avec Artaud, toit et idées personnifiées. L’auteur écarte la seule inspiration. |
| Alain, zéro 1 terminale | Signes singuliers persistants face au pouvoir sur autrui et aux signes communs du costume. Ne pas réduire les souverains à une incapacité de refaire leur propre corps. |
| Condorcet, Métropole 2025 J1 | Pitié naturelle mais fragile ; exercice, morale et liberté. Émotion intense et sensibilité formée distinctes. |
| Sand, Centres étrangers G1 2026 J1 | Lieu, temps, attention ; retrait choisi et provisoire, liens maintenus. Pas de loi universelle de rupture sociale. |
| Voltaire, Centres étrangers G1 2024 J1 | Le choix de Sophronie se lit dans la syntaxe du dialogue ; l’éducation forme un jugement autonome, mais l’essai éprouve la limite sociale de cet idéal. |
| Diderot, Antilles-Guyane 2026 J2 | La sensibilité est une disposition corporelle à maîtriser, non à abolir ; l’essai distingue l’abandon de l’artiste de la sensibilité que l’œuvre met en forme. |
| Heredia, Asie 2026 J2 | Le sonnet transforme le silence de midi en réseau de lumière et en rêve capturé ; l’essai distingue l’attention sensible de l’action purement utilitaire. |
| Simone Weil, Centres étrangers G1 2021 J1, sujet 2 | La guerre détruit l’avenir et les ressources de la sortie ; l’essai examine ce que témoignage, Iliade et Dante peuvent dire sans prétendre abolir la violence. |
| Barbusse, Amérique du Nord 2023 J2 | La beauté du bombardement est une illusion qui coexiste avec l’écrasement des corps ; l’essai définit l’objectivité comme confrontation de regards situés. |
| Rousseau, Métropole 2022 J2, sujet 1 | Le retour à soi dépend davantage de la volonté que du savoir ; l’essai montre que la lecture éclaire seulement si le lecteur revient à lui-même. |

Les PDF et localisations figurent dans le JSON. Pas de reproduction intégrale ni de reconstitution ; passages français originaux relevant du domaine public. Les références extérieures sont paraphrasées, sans citation de mémoire.

Citations confrontées aux PDF : Molière « ma femme n’est pas ma femme ? », p. 1 ; Descartes « grand livre du monde » et « ne rien croire trop fermement », p. 1 ; Rivière « toit au-dessus de moi » et « ils me regardent », p. 3 ; Sand « prison volontaire », p. 2. Les mots repris du sujet sont aussi vérifiés sur les questions. Références extérieures contrôlées dans les œuvres : Bergson, Le Rire, III, I (perception et action) ; Dante, Enfer, XXVI, 119-120 ; Proust, Le Temps retrouvé, III, p. 62 (éd. Gallimard, 1927) ; Flaubert, Madame Bovary, I, VI. Les citations de ces passages sont exactes.

## Progression et limites des tests

Niveau 1 : choix d’une piste, retour bref, justification écrite avec un appui. Niveau 2 : cinq tâches propres à chaque question, aides et comparaisons repliées, navigation libre. Niveau 3 : rédaction entière sans propositions ni étapes guidées. Révision : repérer une réussite, réécrire un passage ; annotations masquables sans altérer le texte. Transfert : autre sujet accessible ; commencer sans aide pour distinguer parcours effectué et autonomie.

Le générateur compte les mots sans imposer de quota. Les tests de structure et de navigation ne prouvent pas le mérite de 20. Relecture pédagogique indépendante et navigateur 390/1280 px restent requis avant fusion selon AGENTS.md.

## Raccords HLP dans les pages

Les pages HLP renvoient désormais vers `hlp-ecrire.html` et `methode-hlp.html` pour les exercices propres à la spécialité. Les liens généraux de navigation vers la dissertation philosophique restent des liens vers les ressources générales du site ; ils ne constituent pas une consigne de méthode pour l’essai HLP. Les pages distinguent explicitement l’interprétation ciblée et l’essai argumenté.

## Résultats techniques

**État historique au 17 octobre 2026 :** les comptes de pages, tests navigateur et builds isolés consignés dans l’audit initial ne décrivent pas le dépôt après les modifications du 27 novembre.

**Revalidation des données au 27 novembre 2026 :** 12 sujets, 24 réponses modèles ; les contrôles de structure des réponses, des cinq étapes de préparation, des fonctions de phrases, des trois choix de réécriture et de la comparabilité des deux copies sont passés. Les six introductions d’essai qui annonçaient un plan en trois temps ont été réécrites ; les fonctions des paragraphes décrivent maintenant leur rôle argumentatif plutôt qu’un schéma « premier/deuxième/troisième moment ». Le générateur HLP est appelé par `netlify.toml` et régénérera les pages à partir de la base actualisée.

**Non effectué après cette révision :** exécution complète de `node scripts/test-hlp-parcours.js`, build Netlify réel et test navigateur. La validation des données ne doit pas être présentée comme une validation de l’interface ni comme une correction authentique notée par un jury.
