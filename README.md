# Commentaire Plan

**Commentaire Plan** est un atelier pédagogique gratuit pour apprendre à lire, problématiser, construire un plan et analyser précisément un texte littéraire.

Site : https://commentaire-plan.com/

Ressources principales :
- Méthode du commentaire : https://commentaire-plan.com/commentaire-bac-methode.html
- Laboratoire de l’effet ici : https://commentaire-plan.com/laboratoire-effet-ici.html
- Petit manuel des procédés : https://commentaire-plan.com/manuel-procedes.html
- Annales : https://commentaire-plan.com/annales.html

Principes de travail :
- donné → attente → transformation ;
- réponse → nécessité de la réponse → transition-question ;
- réalisation → élément textuel → procédé → effet ici ;
- tentative → retour ciblé → reprise → transfert.

Le dépôt contient le site statique, les corpus d’entraînement et les outils de vérification SEO/performance utilisés au déploiement.

Annales HLP :
- les données sont dans `hlp-annales-data.js` (une ligne par sujet, relevée sur le PDF) ;
- `node scripts/build-hlp.js` régénère les fiches de `hlp-annales.html` et `hlp-professeurs.html` et une page par sujet (`hlp-<année>-…html`) ; il est lancé automatiquement au déploiement ;
- `node scripts/telecharger-pdf-hlp.mjs` (à lancer sur son ordinateur) copie les PDF des sujets dans `annales/hlp/` pour ne plus dépendre des sites qui les hébergent.
