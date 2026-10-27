# Entrées de philosophie et HLP

Les pages d’entrée présentent d’abord les possibilités de travail. Les méthodes,
programmes et références restent accessibles dans des sections dépliables natives,
utilisables sans JavaScript. Un lien vers une ancre ouvre sa section si nécessaire.

## Sources à modifier

- Explication : `scripts/build-explication-textes.js` produit `philosophie-explication.html`.
- Entraînements HLP : `scripts/build-hlp-parcours.js` produit `hlp-ecrire.html`
  et les parcours. Les contenus des réponses restent dans `scripts/hlp-parcours-data.json`.
- Accueils : `hlp.html`, `hlp-premiere.html`, `hlp-terminale.html` et
  `philosophie-dissertation-parcours.html` sont des sources HTML.
- Catalogue des dissertations : `philosophie-dissertations.html` est la source.
  Les notions figurent dans `data-notions`, séparées par `|`. La provenance n’est
  affichée que lorsqu’elle est documentée ; ne pas déduire une session du nom du fichier.

`navigation-etudes.css` contient les styles propres aux entrées.
`navigation-etudes.js` filtre les cartes déjà présentes dans le HTML et ouvre les
sections dépliables visées par une ancre. Sans JavaScript, les catalogues restent
complets et les filtres sont masqués.

Les liens HLP peuvent préciser `niveau=premiere|terminale`,
`exercice=interpretation|reflexion` et `discipline=lettres|philosophie`.
`reflexion` désigne la réflexion de Première et l’essai de Terminale. Les liens
des cartes mènent à la question correspondante, où le texte officiel reste accessible.
Les réponses écrites et leurs modèles ne sont pas modifiés par les filtres.

## Vérification

Construire dans une copie jetable selon `AGENTS.md`, puis, avec Playwright installé :

```bash
node scripts/check-browser-navigation-etudes.cjs "$BUILD_DIR"
node scripts/check-browser-explication.cjs "$BUILD_DIR"
node scripts/check-browser-hlp.cjs "$BUILD_DIR"
node scripts/check-browser-parcours.cjs "$BUILD_DIR"
```

Le premier contrôle parcourt les entrées à 390 et 1280 pixels, combine les filtres,
vérifie les destinations et les ancres, le clavier, l’agrandissement du texte à
200 % et le fonctionnement sans JavaScript. Les captures sont dans `browser-audit/`
de la copie. Si `AXE_CORE_PATH` pointe vers une installation locale de
`axe-core/axe.min.js`, il exécute aussi les règles WCAG A/AA sur le contenu principal
de ces sept pages. Ce contrôle automatisé ne constitue pas un audit complet du site.
