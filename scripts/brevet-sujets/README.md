# Brevet — sources des pages

Scripts hors construction Netlify : on modifie ces sources, on relance le script, on ne retouche pas les pages à la main. Règles de contenu : `docs/protocole-brevet.md`.

- `gen_brevet_accueil.py` : l’accueil `brevet.html` (trois onglets : choisir un sujet, travailler une partie, cours et modèles). Lit `annales/catalogue-annales.js`, `sujets.json` et `archives-dnb.html` (liens vers les banques officielles du DNB). Usage : `python3 -I scripts/brevet-sujets/gen_brevet_accueil.py .`
- `gen_brevet_sujets.py` : les pages `brevet-sujet-<id>.html` des sujets de rédaction (`sujets.json`, étapes dans `etapes_brevet.py`).
- `onglets_brevet_langue.py`, `onglets_brevet_redaction.py` : mise en onglets, faite une fois, des pages de compréhension, grammaire, réécriture, réflexion et imagination.
