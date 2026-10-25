# Audit ergonomique — navigation et accès aux fonctions (25 octobre 2026)

Branche de travail : audit-ergonomie-navigation-2026-10. État : diagnostic initial fondé sur la lecture du dépôt, tests navigateurs restant à exécuter. Aucune modification de production.

## Décision architecturale
Conserver les six portes principales : Français, Philosophie, HLP, Brevet, Bibliothèque, Annales. Conserver les sous-entrées Français (Commentaire, Dissertation, Oral, Méthodes et exercices) et Philosophie (Dissertation, Explication de texte). Ne pas substituer une navigation par intentions à cette classification scolaire.

## Constat P1 — deux sources concurrentes pour les menus
- `site-nav.js` définit une navigation actuelle avec « FRANÇAIS », « PHILOSOPHIE », etc.
- `bac-commentaire.html` et `philosophie.html` comportent des en-têtes HTML préremplis avec « BAC », « PHILO » et des sous-menus différents.
- Le script ne génère son en-tête que lorsque `header.innerHTML.trim()` est vide.
- Conséquence : selon la page, le visiteur ne reçoit pas nécessairement le même menu. Le HTML statique peut avoir une raison SEO : ne pas le supprimer avant d'avoir vérifié le pipeline `scripts/seo-build.js`.

**Correction proposée :** établir une source de vérité unique et synchroniser les en-têtes statiques via le build SEO, puis tester la navigation sans JavaScript, avec JavaScript, sur mobile et au clavier. Vérifier les intitulés et les destinations sur toutes les pages.

## Constat P2 — menu mobile moins précis que le bureau
Le menu mobile dans `site-nav.js` ne présente que six liens vers les portails, alors que le menu bureau propose les sous-entrées directes. Mesurer les clics réels nécessaires sur mobile ; envisager des sous-entrées repliables sans doubler visuellement tout le menu.

## Constat P2 — Bibliothèque : accès à plusieurs collections
`bibliotheque.html` distingue Lettres et Philosophie et comporte des liens secondaires vers œuvres/lectures et exercices. `bibliotheque-dissertation.html` possède déjà un moteur de recherche et des filtres (œuvre, sujet, emploi, programme). Ne pas proposer un nouveau moteur sans évaluer la découvrabilité de celui-ci et son périmètre.

## Acquis à préserver
Le document `AUDIT-PARCOURS-COMMENTAIRE-2026-10-17.md` décrit les quatre portes du commentaire, dix modèles, le mode examen, le chronomètre et la sauvegarde locale. Éviter toute régression.

## Matrice de tests à exécuter
1. Accueil → Français → Commentaire → parcours guidé / difficulté / modèles / examen.
2. Accueil → Français → Dissertation / Oral / Méthodes et exercices.
3. Accueil → Philosophie → Dissertation / Explication de texte.
4. Accueil → HLP / Brevet / Bibliothèque / Annales.
5. Répéter au clavier, en petit écran, avec et sans JavaScript.
6. Vérifier cohérence des menus, liens cassés, états actifs, retours, recherche, reprise et affichage des corrigés.

## Critères d'acceptation
- Une seule définition éditoriale de chaque intitulé et destination.
- Aucune régression du référencement, des liens historiques ou des fonctionnalités d'examen.
- Chaque destination de sous-menu atteint la fonction annoncée.
- Navigation clavier et mobile testées, résultats documentés.
- Toute modification est soumise en branche séparée avant fusion.

## Complément d'investigation : générateur SEO et tests existants

Le fichier `scripts/seo-build.js` possède déjà une fonction `staticHeader(file)` avec les six rubriques et leurs sous-menus, alignés sur la définition observée dans `site-nav.js`. Il produit des en-têtes statiques, utiles même lorsque JavaScript est désactivé. Les anciennes variantes observées dans certains HTML peuvent donc être des **artefacts non régénérés**, et non la preuve d'une architecture volontairement concurrente. Il faut vérifier si la commande de build est exécutée avant le déploiement, et comparer les fichiers générés après build. **Ne pas remplacer les en-têtes statiques par un rendu JavaScript uniquement.**

Le script `scripts/check-browser-integration.cjs` utilise Playwright et vérifie déjà, notamment, six portails bureau, six liens mobile, l'absence de troncature des intitulés et le fonctionnement clavier (flèche bas, Échap). Il faut prolonger cette couverture au lieu de recréer un dispositif parallèle.

### Correctif minimal recommandé, à valider après exécution des tests
1. Ajouter un test de parité entre les destinations et libellés du menu produit par `seo-build.js` et le menu défini par `site-nav.js`.
2. Exécuter la génération SEO et vérifier que les anciens intitulés BAC/PHILO disparaissent des HTML produits.
3. Tester les parcours complets des quatre entrées Commentaire, les deux entrées Philosophie et la navigation mobile.
4. Examiner si un sous-menu mobile repliable réduit les clics, sans compromettre la simplicité actuelle.

**Niveau de preuve :** constat statique sur le code source ; les tests navigateur et le pipeline de déploiement ne sont pas encore exécutés. Aucune panne de navigation en production n'est affirmée.

## Vérification du mécanisme de régénération (25 octobre)

La lecture de la boucle principale de `scripts/seo-build.js` confirme que le build **remplace** les en-têtes déjà marqués `data-seo-static-nav` par `staticHeader(file)`. Les pages `bac-commentaire.html` et `philosophie.html` observées avec des menus anciens portent ce marqueur : leur divergence devrait donc disparaître lors d'une régénération SEO correctement exécutée. Ce constat est plus précis que l'hypothèse initiale de deux architectures concurrentes permanentes.

**Risque réel à investiguer :** fichiers HTML générés non synchronisés avec le script source, ou étape de build absente du déploiement. La boucle remplace aussi certains anciens en-têtes par motif et met à jour les fils d'Ariane ; une correction manuelle page par page serait fragile.

**Test d'acceptation proposé :** après `node scripts/seo-build.js`, vérifier sur `bac-commentaire.html` et `philosophie.html` que les six libellés sont FRANÇAIS, PHILOSOPHIE, HLP, BREVET, BIBLIOTHÈQUE, ANNALES et que les sous-entrées correspondent à `site-nav.js`. Puis relancer le build et vérifier son idempotence (aucune différence supplémentaire). Tester également la présence du menu sans JavaScript.

Ce test n'a pas encore été exécuté sur une copie locale du dépôt ; résultat attendu, non résultat observé.

## Audit ciblé — annales de français, sélection « Tous », type « Tous »

Sources examinées : `annales.html`, `annales-index.js`, `annales/catalogue-annales.js`.

### Ce qui existe
- La page possède un sommaire `annales-jump` vers Bac français, Philosophie, HLP, Brevet.
- Un index HTML statique liste déjà des sujets de commentaire avec auteur, œuvre, année et lieu, mais sans filtre.
- Plus bas, `#annalesControls` et `#transformedAnnales` affichent un catalogue interactif. `annales-index.js` filtre actuellement par Tout / Bac / Brevet / Gratuit / Accès complet.
- Le catalogue fournit `examen`, `type`, `annee`, `zone`, `serie`, `epreuve`, `access`, `auteur`, `oeuvre`, `parcours`, `etapes`, `sourceOfficielle` selon les fiches.

### Diagnostic
La navigation par auteur/œuvre est absente du filtre interactif alors que les données nécessaires sont présentes. Les ressources sont réparties entre index statique et liste interactive plus basse : risque de confusion entre sujet officiel, fiche et entraînement. Le paramétrage demandé « Français / Tous / Tous » devrait présenter tous les sujets français indexés, sans supposer que chaque sujet possède un corrigé complet.

### Proposition soumise à validation
1. Placer en tête de la section Bac français un module compact « Trouver un sujet » avec filtres **Épreuve**, **Auteur**, **Œuvre**, **Année**, **Ressource disponible** (tous, exercices, corrigé vérifié). Les listes d'auteurs et d'œuvres sont générées depuis les données, pas saisies à la main.
2. En sélection « Tous », afficher tous les sujets français du périmètre indexé ; afficher un compteur de résultats et un message explicite si aucun résultat.
3. Sur chaque carte : année, auteur, œuvre, nature de l'épreuve et actions distinctes « Sujet officiel », « S'entraîner », « Lire le corrigé » **uniquement si réellement disponible**.
4. Préserver un index HTML accessible sans JavaScript, les URL historiques et les liens vers les sources ministérielles. Ne pas masquer les autres disciplines.
5. Auditer la correspondance entre l'index statique et `ANNALES_CATALOGUE` avant d'unifier les résultats : les deux collections ne sont pas automatiquement équivalentes.

### Tests à ajouter
- Français + auteur Tous + type Tous : aucun résultat du corpus français n'est perdu.
- Auteur spécifique : résultats exacts ; changement d'auteur remet à jour les œuvres possibles.
- Les badges « Corrigé » et « Exercices » ne sont visibles que si une ressource effective est liée.
- Clavier, mobile, sans JavaScript, liens officiels, recherche vide et absence de doublons.
- Aucun changement de la navigation principale.

**Statut : proposition argumentée, pas encore de modification fonctionnelle.**

## Nouveau chantier transversal — progression pédagogique obligatoire à auditer

Demande : vérifier sur **tous les devoirs** du brevet, du français et de philosophie la progression **niveau 1 : réponses cliquables avec justification → niveau 2 : rédaction dans des champs et retour adapté, éventuellement IA**. Ne pas présumer que tout champ écrit possède une correction IA effective. Le niveau cliquable doit toujours être proposé avant la rédaction autonome, tout en permettant un accès direct au niveau avancé pour les utilisateurs expérimentés.

### Premiers constats vérifiés sur le code
- `commentaire-pas-a-pas.html` annonce déjà trois niveaux, du choix cliquable au plan autonome. Son interface est rendue par JavaScript ; le HTML seul ne suffit pas à certifier la progression réelle.
- `bac-dissertation.html` contient des boutons `data-level="1"` et `data-level="2"` dans un exercice, correspondant à « Au clic » puis « J'écris ».
- `philosophie-dissertation-entrainement.html` présente des exercices écrits et un sommaire par geste, mais aucune balise `data-level` repérée dans son HTML. Il faut examiner les scripts avant de conclure qu'aucune phase cliquable n'existe.
- `brevet-redaction.html` est une porte d'entrée vers imagination et réflexion ; l'absence de boutons de choix dans cette page ne prouve rien sur ses sous-parcours.

### Règle de conception
Unité d'audit : **l'exercice effectif**, pas seulement la page d'accueil. Chaque exercice doit documenter :
1. Un choix cliquable portant sur la même compétence que l'étape rédigée.
2. Une justification pédagogique de la réponse, et non un simple verdict vrai/faux.
3. Une transition explicite « Maintenant, écrivez vous-même ».
4. Un champ de rédaction et un retour réellement implémenté ; indiquer honnêtement « correction modèle », « retour automatisé » ou « retour IA ».
5. La conservation des réponses lorsque le mécanisme existe ; aucune promesse de sauvegarde fictive.

### Plan de déploiement sans changement esthétique
- Inventorier toutes les pages d'exercice et leurs scripts ; établir une matrice Brevet / Français / Philosophie.
- Identifier les exercices déjà conformes, partiellement conformes et dépourvus de niveau 1.
- Généraliser les mécanismes existants plutôt que remplacer les exercices.
- Préserver la charte CSS, les intitulés scolaires et les accès rapides.
- Tester la progression de bout en bout, y compris les cas de retour IA indisponible.
- Soumettre les modifications dans cette branche avant toute fusion en production.

**Statut : audit transversal engagé, conformité globale non démontrée.**

## Changements d'interface effectués sur la branche

- `bac-dissertation.html` : accès directs vers sujets par œuvre, exercice, méthode et copie annotée.
- `philosophie.html` : accès directs vers dissertation, explication, exercices et annales.
- `philosophie-explication.html` : accès directs vers textes, méthode et sources.
- `brevet-redaction.html` : accès directs vers imagination, réflexion, sujets et outils.
- `annales.html` : accès directs vers index des sujets de français, entraînements, dissertations par œuvre et mode examen.

Les raccourcis emploient la classe CSS existante `annales-jump` ; aucune nouvelle charte graphique ni nouvelle offre commerciale n'est introduite.

**Attention :** sur `annales.html`, « Choisir un auteur ou une œuvre » renvoie pour le moment à l'index statique, qui n'est pas encore filtrable. L'intitulé décrit une liste à parcourir, pas un sélecteur déjà fonctionnel. Le filtre auteur/œuvre reste à développer. L'ancre `#annalesControls` pointe sur les filtres existants en bas de page.

### Contrôles requis avant fusion
1. Lancer `node scripts/seo-build.js` et vérifier qu'il conserve les raccourcis et synchronise les menus.
2. Lancer les tests Playwright du dépôt, puis contrôler chaque nouvelle ancre.
3. Tester les raccourcis sur petit écran et au clavier.
4. Mesurer les chemins « arrivée → choix → premier exercice », sans surcharge de l'écran initial.
5. Ne pas annoncer de correction IA lorsque le mécanisme est absent.

**Aucune preuve de réussite de ces tests n'est encore enregistrée.**

## Implémentation initiale du filtre auteur / œuvre

`annales-index.js` a été modifié dans cette branche pour ajouter des listes auteur et œuvre issues du catalogue `ANNALES_CATALOGUE`, une remise à zéro, un compteur de résultats et un état vide. Le catalogue s'ouvre par défaut sur Bac, avec tous les auteurs et toutes les œuvres. Le changement vers Brevet réinitialise les filtres de français.

**Limites connues :** les filtres ne couvrent que le catalogue interactif et non la liste statique des fiches de commentaire ni les annales externes ; les catégories « exercices » et « corrigé vérifié » ne sont pas encore indexées. Aucun test navigateur ni build complet n'a été exécuté. Il reste à vérifier les CSS des contrôles et l'accessibilité mobile. Les données des œuvres ne doivent pas être confondues avec les titres de sujets de dissertation.

**Suite nécessaire :** inventaire exhaustif des pages, classification des exercices, contrôles IA et intégration d'un sélecteur commun sans doublonner les données.
