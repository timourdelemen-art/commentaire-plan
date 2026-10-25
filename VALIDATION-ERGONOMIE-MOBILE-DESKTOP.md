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

## Audit rétrospectif obligatoire — totalité des modifications de cette conversation

Périmètre contrôlé par comparaison GitHub avec le commit initial `353d348656c3e0d8e2e359a6842eee5fe0a1e9b7`. Douze fichiers ont changé (dont documentation et tests) :
`annales-index.js`, `annales.html`, `bac-dissertation.html`, `brevet-redaction.html`, `philosophie-explication.html`, `philosophie-parcours.js`, `philosophie.html`, `scripts/audit-exercise-progression.cjs`, `scripts/check-browser-commentaire-parcours.cjs`, `scripts/check-browser-integration.cjs`, `AUDIT-ERGONOMIE-NAVIGATION-2026-10-25.md`, et ce protocole.

### Matrice rétrospective (statut : validation finale non acquise)
| Zone | Modification | Justification à confirmer | Contrôle indispensable |
|---|---|---|---|
| Annales | filtres auteur/œuvre, compteur, placement anticipé | réduire le défilement et trouver un sujet | filtres combinés, index statique, mobile, lien vers exercice |
| Français dissertation | entrée par exercice et ressources repliées | distinguer pratique et théorie | niveaux 1/2, conservation de tous les modèles, responsive |
| Philosophie accueil | raccourcis, ateliers, théorie facultative | éliminer la confusion des parcours | pas de doublon, détails accessibles, cours/exercice cliquables |
| Philosophie suivi | suppression des cases manuelles en accueil | ne pas confondre passage et maîtrise | aucun résidu ni erreur JS, progression sauvegardée sur autres pages |
| Philosophie explication | raccourcis vers textes, méthode et sources | accès immédiat aux fonctions | ancres existantes, navigation clavier et tactile |
| Brevet rédaction | raccourcis imagination, réflexion, sujets et modèles | atteindre l'activité voulue | destinations et ergonomie mobile |
| Tests et audit | contrôle des parcours, inventaire pédagogique | prévenir les régressions | exécution sur le build réel, zéro erreur non expliquée |

### Tests complémentaires à programmer
- **Parcours réel** : depuis chaque page d'entrée jusqu'à un exercice actif et un champ de réponse, en 390, 768 et 1280 px.
- **Touch** : vérifier que liens et boutons ne se chevauchent pas et restent utilisables sans survol.
- **Contenu** : ne pas confondre titre de section et bouton ; ne pas présenter un résumé de cours comme un exercice.
- **IA** : contrôle du comportement réel et de l'indisponibilité, sans appel facturé dans les tests de navigation.
- **Comparaison avant/après** : captures et vérification des contenus/URLs préservés.
- **SEO / Netlify** : reconstruire puis contrôler les redirections et la publication.

La présence d'un test dans le dépôt ne prouve pas sa réussite. Tout échec doit être diagnostiqué et corrigé avant de déclarer le périmètre validé.

## Règle impérative de conservation des contenus

**Aucun devoir, sujet, exercice, corrigé, copie annotée, référence, aide, niveau ou fonctionnalité IA existante ne peut être supprimé au nom de la simplification ergonomique.** Les interventions autorisées consistent à réordonner, regrouper, rendre repliable, filtrer ou relier des contenus, tout en garantissant leur accessibilité.

### Avant toute réorganisation
1. Inventorier les URL, les titres, les identifiants d'exercices, les étapes et les liens vers les copies.
2. Comparer les nombres et les identifiants avant/après.
3. Vérifier qu'une ressource masquée dans un accordéon reste accessible au clavier, au toucher et sans lien cassé.
4. Tester la sauvegarde, le passage des niveaux cliquables aux niveaux écrits et les retours réels.
5. En cas de disparition ou de régression, bloquer la publication et restaurer l'accès.

### Contrôles déjà ajoutés
Dans `scripts/check-browser-integration.cjs`, assertions de conservation des 13 sujets interactifs de `bac-dissertation.html`, de l'accès aux copies modèles, du script d'exercice et des quatre parcours de `bac-commentaire.html`.

**Attention :** ces assertions ne couvrent pas encore l'inventaire intégral de toutes les ressources du site. Elles constituent un premier filet de sécurité ; le recensement exhaustif reste nécessaire.
