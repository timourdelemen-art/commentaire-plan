# Annales — convention de nommage

Cette arborescence suit une convention unique et immuable.

## Identifiant canonique

`<examen>-<annee>-<zone>-<serie>-<epreuve>-<auteur>-<oeuvre>`

Exemples :
- `bac-2026-amerique-du-nord-general-commentaire-leconte-de-lisle-le-coeur-de-hialmar`
- `bac-2025-amerique-du-nord-general-commentaire-montaigne-essais`
- `bac-2023-amerique-du-nord-general-commentaire-racine-berenice`
- `bac-2021-metropole-general-commentaire-perec-les-choses`

## Règles

1. minuscules uniquement ;
2. mots séparés par des tirets ;
3. aucun accent, apostrophe ou espace ;
4. année sur quatre chiffres ;
5. zone explicite ;
6. série/voie explicite ;
7. type d'épreuve explicite ;
8. auteur puis œuvre ;
9. un identifiant ne change jamais après publication.

## Fichiers communs

- `catalogue-annales.js` : métadonnées, durées et étapes ;
- `entrainement-annale.html` : interface commune ;
- `entrainement-annale.js` : parcours, sauvegarde locale, chronomètre et IA.

Les anciennes pages restent accessibles pour compatibilité. Tout nouvel entraînement passe par l'identifiant canonique.
