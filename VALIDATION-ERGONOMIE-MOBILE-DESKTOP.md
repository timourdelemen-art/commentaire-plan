# Critères de validation ergonomique — CommentairePlan

## Principe
Une modification de navigation doit être justifiée par écrit et vérifiée en situation réelle sur téléphone (390 px), tablette (768 px) et ordinateur portable / bureau (1280 px). La charte visuelle actuelle est conservée.

## Fiche obligatoire par modification
- **Problème observé** : description factuelle du parcours précédent.
- **Utilisateur et objectif** : ce que l'élève ou l'enseignant cherche à accomplir.
- **Intervention** : éléments déplacés, conservés, regroupés ou supprimés.
- **Justification didactique** : effet sur la progression clic → rédaction → révision, sans confondre correction modèle et retour IA.
- **Justification commerciale** : clarté de la valeur et de l'accès, sans promesse trompeuse.
- **Préservation** : contenus, URLs, SEO, sauvegardes, navigation au clavier et identité visuelle.
- **Résultats des tests** : liens, ancres, clavier, touch, débordement horizontal, largeur et capture visuelle.
- **Statut** : non testé / échec / validé ; ne jamais écrire « validé » sur la seule base d'un commit.

## Contrôles de publication
1. Build SEO et audits HTML/pédagogique.
2. Contrôles navigateur à 390, 768 et 1280 px sur les pages modifiées.
3. Liens internes et ancres, accès aux boutons, ouverture des sections repliables.
4. Pas de navigation dupliquée ni de longues listes imposées avant le premier exercice.
5. Les fonctions annoncées existent réellement, notamment les retours IA.
6. Vérification du déploiement Netlify, puis contrôle rapide sur le domaine public.

## Justifications des changements récents
### Philosophie — Dissertation
- **Problème** : cinq gestes, ateliers, méthode courte et FAQ étaient présentés comme des blocs concurrents.
- **Décision** : distinguer le parcours principal, les ateliers et la théorie facultative ; rendre explicites les accès « exercice » et « cours ».
- **Effet attendu** : réduire l'ambiguïté entre agir et lire, tout en préservant les contenus.

### Français — Dissertation
- **Problème** : raccourcis, exemple mis en avant, cinq gestes non cliquables et liens répétés précédaient l'exercice.
- **Décision** : mettre en avant l'entraînement au clic puis à l'écrit ; regrouper la méthode et les modèles en ressources secondaires.
- **Effet attendu** : réduire les décisions avant la première action. Vérifier que les modèles restent découvrables.

### Annales
- **Problème** : l'élève devait parcourir une longue page avant de pouvoir filtrer par auteur et œuvre.
- **Décision** : déplacer le catalogue interactif vers le début de la section et ajouter les filtres correspondants.
- **Effet attendu** : accès direct aux sujets sans supprimer les archives officielles.

**Ce document décrit des justifications et des tests à effectuer ; il ne constitue pas une preuve de réussite des tests.**
