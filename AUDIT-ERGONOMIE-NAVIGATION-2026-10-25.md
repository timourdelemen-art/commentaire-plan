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
