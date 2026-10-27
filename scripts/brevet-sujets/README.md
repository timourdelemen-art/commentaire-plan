# Brevet — sources des pages

Scripts hors construction Netlify : on modifie ces sources, on relance le script, on ne retouche pas les pages à la main. Règles de contenu : `docs/protocole-brevet.md`.

- `gen_brevet_accueil.py` : l’accueil `brevet.html` (trois onglets : choisir un sujet, travailler une partie, cours et modèles). Lit `annales/catalogue-annales.js`, `sujets.json` et `archives-dnb.html` (liens vers les banques officielles du DNB). Usage : `python3 -I scripts/brevet-sujets/gen_brevet_accueil.py .`
- `gen_brevet_sujets.py` : les pages `brevet-sujet-<id>.html` des sujets de rédaction (`sujets.json`, étapes dans `etapes_brevet.py`).
- `gen_etapes_parties.py` : les entraînements de compréhension, grammaire et réécriture. Les questions sont dans `etapes_parties.py`, les sélections de passages dans `extraits_parties.py` ; les textes sont repris du catalogue et de `corriges_annales.py`, sans nouvelle transcription. Usage : `python3 -B -I scripts/brevet-sujets/gen_etapes_parties.py .` Les styles propres à ces pages sont dans `brevet-exercices.css`.
- `annales/brevet-choix.js` propose le choix entre QCM expliqué et réponse écrite sur les questions de grammaire 7a, 7b, 8a et 8b de Zola. Les autres questions conservent leur fonctionnement. Vérification sur une copie construite : `node scripts/check-browser-brevet-exercices.cjs "$BUILD_DIR"` (Playwright requis).
- `onglets_brevet_langue.py`, `onglets_brevet_redaction.py` : mise en onglets, faite une fois, des pages de compréhension, grammaire, réécriture, réflexion et imagination.
