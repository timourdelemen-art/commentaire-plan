# Revue transversale du site — 9 octobre 2026

## Périmètre et limites

Première passe **sur les sources GitHub de `main`**, sans prétendre à une vérification exhaustive du site déployé. Pages examinées : `index.html`, `philosophie.html`, `bac.html`, `hlp.html`, `brevet.html`, `enseignants.html`. Règles de référence : `AGENTS.md` et `docs/principe-limpidite-problematique.md`. Trois PR ouvertes au début de l'audit : #69, #84, #85 ; leurs fichiers sont réservés. Le site Netlify n'a pas été validé dans un navigateur.

## Constats étayés et décisions proposées

### Priorité 1 — Promesse commerciale et vérité pédagogique

- La page d'accueil promet « La copie la plus courte qui mérite 20. » et la philosophie répète « la copie la plus courte qui mérite 20 ». C'est une signature forte, mais une **note chiffrée ne peut pas être garantie**. Distinguer explicitement **modèle de rédaction ambitieuse** et **promesse de note**, sans affaiblir la signature. Ne pas inventer de résultats d'élèves ou de témoignages.
- La page d'accueil affirme « Chaque exercice a son corrigé ». Vérifier ce quantificateur sur l'ensemble des parcours avant de le maintenir.
- La page d'accueil annonce « Plus de cent sujets d’annales » pour HLP : vérifier le décompte dans la source officielle des données, en précisant s'il s'agit de sujets, de textes ou de questions.
- La mention « utilisée en classe » est une affirmation d'expérience : la conserver uniquement si confirmée par le propriétaire, sans lui adjoindre de statistiques fictives.

### Priorité 1 — Lisibilité philosophique

- L'accueil montre pour « S'engager, est-ce renoncer à sa liberté ? » : « La liberté est-elle de pouvoir toujours faire autrement, au risque de ne rien choisir, ou de s'engager, au risque de ne plus pouvoir revenir sur son choix ? ». Le sens se comprend, mais l'opposition « pouvoir toujours faire autrement / ne rien choisir » mérite examen : **l'absence d'engagement n'implique pas nécessairement l'absence de choix**. Revoir la nécessité conceptuelle de cette conséquence, et non simplement la longueur de la phrase.
- Dans les données structurées FAQ de `philosophie.html`, la problématique est décrite comme « la question unique qui fait voir ce double risque ». Le principe approuvé dans `docs/principe-limpidite-problematique.md` interdit précisément de transformer **la question unique** en moule obligatoire. Harmoniser ce texte avec le principe : une formulation peut prendre plusieurs formes, pourvu qu'elle fasse comprendre la difficulté.
- Faire vérifier chaque formulation d'abord par la question « Un élève peut-il reformuler les deux difficultés avec ses propres mots ? », puis par l'examen de leur rigueur.

### Priorité 2 — Parcours et découverte

- L'accueil offre six univers de navigation (bac, philo, HLP, brevet, méthode, enseignants), plus quatre grandes portes. Bonne couverture, mais risque de dispersion : tester la première décision sur mobile, sans ajouter un nouvel étage de menus.
- `philosophie.html` propose trois chemins selon le besoin (« Je débute », « Je veux progresser sur un geste », « Je veux essayer seul ») : **bonne architecture à préserver**. Le reste du site devrait être évalué avec la même exigence de choix immédiat.
- Vérifier, parcours par parcours, que le premier exercice demande réellement une action intellectuelle et non seulement de reconnaître une bonne réponse.

### Priorité 2 — Exactitude, sources, confiance

- Vérifier l'accessibilité et la provenance des PDF de commentaires de textes, le découpage des extraits officiels et chaque citation dite « vérifiée ». Un lien présent dans le HTML n'est **pas** une preuve d'accessibilité du PDF ni de fidélité de la citation.
- Les données structurées `FAQPage` de philosophie contiennent des affirmations pédagogiques : elles doivent faire l'objet de la même relecture que le texte visible.
- Contrôler sur le site publié les canoniques, les pages légales, les parcours mobiles, les formulaires, les retours automatiques et les liens externes ; aucune de ces vérifications n'est considérée comme accomplie ici.

## Méthode de validation avant correction

1. Pour chaque page : lecture d'élève, cohérence didactique, clarté des consignes, qualité des exemples et des réponses.
2. Pour chaque promesse marketing : preuve disponible, compréhension immédiate, absence de garantie implicite ou de chiffre invérifiable.
3. Pour chaque modification : intervenir dans la **source** (non dans une page générée), ouvrir une PR séparée, construire en copie jetable, lancer les contrôles, tester en navigateur à 390 et 1280 px.
4. Pour chaque citation ou texte officiel : retrouver la source primaire avant publication.
5. Ne pas fusionner une PR sans les tests requis par `AGENTS.md`.

## Tests de cette revue

Lecture statique de six pages HTML et des deux documents de méthode. **Aucun** build, test navigateur, audit de liens en direct, vérification des PDF ou déploiement Netlify réalisé dans cette passe. Ce document est un **état des lieux initial**, pas un certificat de qualité du site entier.

## État de suivi — corrections à sécuriser

- PR #95 : le remplacement d'une légende dans `scripts/copies20-data.json` a affecté 17 occurrences. Une seule, celle de la dissertation sur l'engagement, devait changer. **Bloquant avant fusion** : rétablir les 16 autres légendes et vérifier le JSON et les pages générées.
- PR #95 : `philosophie.html` conserve « La copie la plus courte qui mérite 20 » alors que l'accueil annonce « Moins de phrases. Plus de pensée. ». **Bloquant avant fusion** : harmoniser ces deux pages.
- Le sous-titre de l'accueil, centré sur les dissertations, doit être vérifié au regard des quatre publics effectivement desservis : brevet, bac français, HLP, philosophie. Une accroche générale peut rester ambitieuse sans faire croire que tous les exercices sont des dissertations.
- Les citations de Pascal et de La Rochefoucauld ne doivent être publiées qu'avec référence bibliographique exacte et vérification textuelle indépendante.
- Le build et les tests navigateur prescrits par `AGENTS.md` n'ont pas été réalisés dans cette session : aucune PR ne doit être fusionnée sur la seule base de cette revue.

## Vérifications supplémentaires sur les sources

- **HLP : décompte confirmé**. `hlp-annales-data.js` contient 103 entrées identifiées par `id` : la formule « plus de cent sujets » est donc étayée par le corpus de données (mais ne prouve pas à elle seule l'accessibilité de tous les PDF).
- **HLP : écart majeur avec `AGENTS.md` § 3**. `hlp-annales-data.js` définit la base `https://sujets-corriges-bac.fr/...` et l'emploie dans 64 champs `pdf`. Or le règlement du dépôt interdit les liens vers ce site concurrent. Il faut retrouver pour chaque entrée concernée une source officielle ou un PDF local légitime, vérifier les droits et l'accessibilité, puis reconstruire les pages générées. **Ne pas remplacer ces URL par des URL officielles inventées.**
- **Accueil : périmètre marketing**. Le premier sous-titre de la PR #95 parlait uniquement de dissertations alors que l'accueil présente aussi des exercices de langue, d'oral et de compréhension. Il a été réécrit pour évoquer l'écriture, l'argumentation et le raisonnement dans leur ensemble.
- **PR #95 : correction de portée**. Les 16 légendes d'autres copies ont été rétablies dans leur format JSON initial ; la seule légende modifiée reste celle de l'engagement. La formule ancienne de la page philosophie a également été remplacée. Les tests de génération restent nécessaires.
