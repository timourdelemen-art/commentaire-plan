# Commentaire littéraire : audit et organisation du parcours

Demande du propriétaire du 17 octobre 2026, à partir de la page `bac-mode-examen.html`.

## Constats et corrections

| Constat | Conséquence pour l’élève | Correction |
| --- | --- | --- |
| « Le concert », « les gammes », « l’échafaudage disparaît » | Le titre ne dit pas quelle tâche accomplir. | Intitulés directs : apprendre pas à pas, travailler un point précis, lire un modèle, écrire sans aide. |
| Le mode examen demande cinq éléments préparatoires mais ne donne pas le texte. | Impossible de commencer ; la tâche n’est pas un commentaire complet. | Texte de Hialmar affiché avant la rédaction ; consigne de commentaire, accès au PDF officiel, rédaction libre. |
| Le menu promet un chronomètre absent. | La fonction annoncée n’existe pas. | Chronomètre avec démarrage, pause, reprise après rechargement ; référence de quatre heures, sans effacement à l’échéance. |
| Une phrase annonce une conservation locale sans mécanisme propre à cet espace. | L’élève risque de perdre sa rédaction. | Sauvegarde par sujet, reprise après rechargement, téléchargement et effacement limité au sujet choisi. Un échec du stockage est annoncé. |
| L’accueil juxtapose cinq gestes, sept séries et un autre parcours de neuf étapes. | Plusieurs numérotations concurrentes, sans choix clair. | Quatre portes d’entrée selon le besoin ; les séries restent accessibles par tâche. L’ancien parcours redirige vers l’accueil unique. |
| « Rédiger » conduit à un questionnaire à choix multiples. | Reconnaître une réponse est présenté comme produire un texte. | Les questionnaires sont annoncés comme tels ; les tâches de rédaction conduisent aux étapes écrites des annales. |
| La page des « deux modèles » n’en présente que trois, alors que dix copies existent. | Sept modèles sont difficiles à découvrir et les nombres annoncés se contredisent. | Catalogue unique des dix modèles, identifié par auteur, œuvre et genre. URL conservée. |
| « Modèles hors annales » alors que certaines copies commentent des annales. | L’élève peut lire la correction d’un sujet qu’il voulait faire seul. | Distinction explicite entre modèles et sujets encore inconnus ; aucune promesse que tous les modèles soient hors annales. |
| La méthode des transitions exige encore un constat avant la question. | Contradiction avec les copies corrigées et la décision du propriétaire. | Question seule, brève, sans bilan imposé. La nécessité demeure distincte. |
| Quotas « cinq ou six phrases », « deux ou trois réalisations ». | Le nombre remplace le besoin de la démonstration. | Présentation fonctionnelle de l’introduction et réalisations importantes nécessaires à la preuve, sans quota. |
| « Ce texte sera bientôt affiché ici » dans le parcours d’annale. | Promesse de contenu sans échéance ni garantie. | Indication de l’emplacement réel : le PDF officiel et ses lignes. |

## Organisation retenue

`bac-commentaire.html` est le point de départ unique. Il donne accès à :

1. `commentaire-pas-a-pas.html` : quatre textes, trois niveaux d’aide ; choix, écriture partielle, plan autonome.
2. Une section d’exercices ciblés : problématique, plan, analyse, transitions, rédaction, reprise. Les questionnaires et les tâches de rédaction sont distingués.
3. `commentaire-bac-deux-modeles.html` : les dix copies annotées. Aucun texte des copies n’est modifié dans cette réorganisation.
4. `bac-mode-examen.html` : quatre sujets officiels, rédaction libre et comparaison après la fin du travail.

Les fiches de méthode et le manuel restent des références accessibles, sans lecture préalable obligatoire. Les anciennes URL sont conservées. `parcours.html` et `bac-commentaire-parcours.html` conduisent directement à l’accueil, sans chaîne de deux redirections.

## Mode examen : limites explicites

Le texte complet de Hialmar est repris du `supportText` déjà vérifié dans le catalogue des annales, avec ses notes et sa référence officielle. La génération réemploie cette source ; le mode examen ne charge ni les réponses ni le catalogue complet dans le navigateur.

Montaigne, Racine et Perec sont accessibles par les liens directs aux PDF officiels déjà identifiés dans le catalogue. Ils ne sont pas annoncés comme affichés dans la page. Aucune reproduction de Perec ni d’une adaptation moderne de Montaigne n’est ajoutée.

Le chronomètre mesure le temps écoulé, y compris après un rechargement quand il était en marche. Changer de sujet met le précédent en pause. Les copies sont indépendantes ; l’effacement d’un sujet ne touche pas les autres données du site. Le téléchargement permet de conserver une copie ailleurs. Il n’y a ni envoi de rédaction, ni correction automatique, ni note promise.

Sans JavaScript, les quatre sujets et leurs liens restent accessibles, ainsi que le texte de Hialmar ; l’élève rédige sur papier avec son propre chronomètre.

## Autres points repérés

Le catalogue comprend treize annales de commentaire. Seul Hialmar possède actuellement un `supportText` intégré ; les autres passent par un document externe. Huit entrées pointaient vers l’index général d’Éduscol plutôt que vers le fichier précis. Trois accès sont maintenant corrigés : Bouvier 2026, Barbey d’Aurevilly 2025 et Diderot 2023. Le sujet de Bouvier a aussi été attribué au bon centre : centres étrangers du groupe 1, code 26-FRGEG11, au lieu de l’Amérique du Nord. Son ancienne URL reste inchangée pour préserver les liens existants. Les cinq autres accès ont été vérifiés puis corrigés dans la suite de cet audit (voir ci-dessous). Les treize références de commentaire mènent désormais directement à un document identifié. Le document d’Aragon est rattaché à la session 2020 inscrite sur le PDF, et non à une session 2024 non authentifiée. Un PDF n’est pas reconstitué ni deviné à partir du nom de l’auteur.

L’audit d’organisation ne vaut pas validation de chaque réponse des questionnaires existants ni lecture philologique nouvelle de toutes les copies. Leurs contenus restent disponibles. Les corrections pédagogiques de cette branche portent sur les tâches annoncées, les chemins proposés et les contradictions de méthode relevées ci-dessus.

## Vérification pédagogique

- Débutant : l’accueil propose un départ unique au clic ; les niveaux d’aide du parcours existant restent libres.
- Difficulté précise : l’élève sait s’il va choisir une réponse, justifier ou rédiger ; la sortie vers l’écriture est visible.
- Modèle : dix textes sont proposés ; la fonction des phrases est accessible dans chaque copie.
- Autonomie : le mode examen fournit le support avant la rédaction, conserve le travail, n’affiche pas d’aide pendant l’épreuve et permet une reprise après celle-ci.

## Vérifications techniques

Le contrôle `scripts/check-browser-commentaire-parcours.cjs` est appelé par le contrôle navigateur existant. À 390 et 1280 px : liens de l’accueil, dix modèles, sélection des quatre sujets, texte de Hialmar, rédaction, chronomètre, reprise, téléchargement, comparaison après rédaction, effacement isolé, absence d’envoi au correcteur et absence de débordement. Une lecture sans JavaScript et un stockage indisponible sont également contrôlés. Les résultats et captures sont archivés par GitHub Actions.

Sources des trois accès corrigés :

- Bouvier : https://www.education.gouv.fr/sites/default/files/document/baccalaur-at-g-n-ral-2026-fran-ais---preuve-anticip-e-517082.pdf (26-FRGEG11, sujet lié sous « Centres étrangers du groupe 1 » sur la page ministérielle des examens 2026).
- Barbey : https://www.education.gouv.fr/sites/default/files/2025-06/baccalaur-at-g-n-ral-2025-fran-ais---preuve-anticip-e-440676.pdf
- Diderot : https://eduscol.education.fr/document/55707/download (23-FRGEME1, Salon de 1767).


## Suite du 17 octobre : les cinq derniers accès

Les PDF ont été ouverts et vérifiés par leur code, leur session et le texte proposé. Aucune reproduction nouvelle de texte protégé.

| Texte | Code | Document de référence |
| --- | --- | --- |
| apollinaire-mesange | 25FRGEJA1 | https://eduscol.education.gouv.fr/sites/default/files/document/25-frgeja1v1pdf-113082.pdf |
| aragon-elsa-au-miroir | 20FRGEMLR1 | https://lettres-pedagogie.web.ac-grenoble.fr/sites/default/files/Media/document/eaf_sept_20_serie_genrale.pdf |
| sylvie-germain-jours-de-colere | 22-FRGEME2 | https://eduscol.education.gouv.fr/sites/default/files/document/22-frgeme2pdf-96429.pdf |
| musset-lorenzaccio | 22-FRGEAN1 | https://eduscol.education.gouv.fr/sites/default/files/document/22-frgean1pdf-96864.pdf |
| larbaud-ancienne-gare-cahors | 21-FRGEME1BIS | https://eduscol.education.gouv.fr/sites/default/files/document/21-frgeme1bispdf-93930.pdf |

Pour Aragon, le PDF académique indique explicitement « SESSION 2020 » et 20FRGEMLR1. Sa première page porte la date du 17 juin 2020, tandis que le fichier est archivé sous un nom évoquant septembre : aucune date de passation effective ni session de remplacement n’est déduite de ce nom de fichier. La page et le catalogue parlent seulement de document officiel archivé, session 2020. L’ancienne URL et l’identifiant contenant 2024 sont conservés afin de préserver les liens et les brouillons existants ; les titres, métadonnées et indications visibles sont corrigés.
