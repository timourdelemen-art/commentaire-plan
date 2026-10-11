# HLP : références, audit et progression

Vérification le 11 octobre 2026. PR #126, sans fusion ni déploiement. Source : `scripts/hlp-parcours-data.json` ; construction : `scripts/build-hlp-parcours.js`. Modèles originaux proposés à la relecture, sans notation authentique par un jury.

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

Six paires, douze réponses : deux en première, quatre en terminale ; les quatre orientations terminales sont présentes. Couverture partielle : toutes les entrées du programme ne disposent pas encore d’un nouveau modèle. Les annales existantes permettent de varier les supports.

| Texte officiel | Contrôle décisif |
| --- | --- |
| Molière, zéro 2 première | Appellations et argent ; plusieurs lectures de la domination restent défendables. |
| Descartes, zéro 3 première | Épreuve des jugements et distance envers les coutumes ; pas de vérité acquise automatiquement. Récit lu et voyage vécu distincts. |
| Rivière, zéro 2 terminale | Existence certaine / plénitude intermittente ; comparaison avec Artaud, toit et idées personnifiées. L’auteur écarte la seule inspiration. |
| Alain, zéro 1 terminale | Signes singuliers persistants face au pouvoir sur autrui et aux signes communs du costume. Ne pas réduire les souverains à une incapacité de refaire leur propre corps. |
| Condorcet, Métropole 2025 J1 | Pitié naturelle mais fragile ; exercice, morale et liberté. Émotion intense et sensibilité formée distinctes. |
| Sand, Centres étrangers G1 2026 J1 | Lieu, temps, attention ; retrait choisi et provisoire, liens maintenus. Pas de loi universelle de rupture sociale. |

Les PDF et localisations figurent dans le JSON. Pas de reproduction intégrale ni de reconstitution ; passages français originaux relevant du domaine public. Les références extérieures sont paraphrasées, sans citation de mémoire.

Citations confrontées aux PDF : Molière « ma femme n’est pas ma femme ? », p. 1 ; Descartes « grand livre du monde » et « ne rien croire trop fermement », p. 1 ; Rivière « toit au-dessus de moi » et « ils me regardent », p. 3 ; Sand « prison volontaire », p. 2. Les mots repris du sujet sont aussi vérifiés sur les questions.

## Progression et limites des tests

Niveau 1 : choix d’une piste, retour bref, justification écrite avec un appui. Niveau 2 : cinq tâches propres à chaque question, aides et comparaisons repliées, navigation libre. Niveau 3 : rédaction entière sans propositions ni étapes guidées. Révision : repérer une réussite, réécrire un passage ; annotations masquables sans altérer le texte. Transfert : autre sujet accessible ; commencer sans aide pour distinguer parcours effectué et autonomie.

Le générateur compte les mots sans imposer de quota. Les tests de structure et de navigation ne prouvent pas le mérite de 20. Relecture pédagogique indépendante et navigateur 390/1280 px restent requis avant fusion selon AGENTS.md.

## Raccord à reprendre dans le chantier principal de Claude

`hlp-premiere.html`, bloc d’essai à la ligne 111 sur la base actuelle, renvoie encore à `philosophie-dissertation.html`. Remplacer ce lien par `hlp-ecrire.html` et employer « question de réflexion » pour le cadre ponctuel de première. Ce fichier est laissé au chantier de Claude : la PR ajoute déjà le raccord depuis les annales, sans réécrire son travail. Relire aussi les quatre pages principales après fusion pour distinguer support historique, contrôle continu et épreuve terminale.

## Résultats techniques

`node scripts/test-hlp-parcours.js` : 12 modèles intacts, 60 tâches, navigation libre, reset non destructif, effacement limité, persistance et panne de stockage ; proposition solide seule plus longue dans 5/12 cas. Build Netlify isolé : 280 pages, contrôle global 0 erreur, 20 avertissements identiques au build antérieur ; SEO 0 erreur/avertissement, budget performance et parcours philo OK. Build combiné #125/#126/#127 : 287 pages, mêmes résultats. Nettoyage avec `NETLIFY=true` : modules publics conservés, documents internes retirés. Test navigateur non effectué : PR reste brouillon.
