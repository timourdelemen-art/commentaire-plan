# Pages de sujet de dissertation (français) — sources

Ces scripts produisent les pages `bac-dissertation-copie-20-ponge*.html` et `-dorion*.html` ; ils ne font pas partie de la construction Netlify.

- `ponge_copies.py`, `dorion_copies.py` : les copies à 20 (`C[clé]` : titre, sujet, session, pdf, mot, preuve, why, blocks).
- `etapes_data.py` : propositions au clic des quatre étapes (`E`, `OK`, `LONG`).
- `gen_pages_sujet.py` : génère les pages à onglets. Usage : `python3 scripts/dissertation-sujets/gen_pages_sujet.py .`
- `verify2.py`, `sarraute/verify.py` : vérifient les citations mot pour mot. Ils lisent le texte intégral des œuvres (`ponge_clean.txt`, `dorion_clean.txt`, `play.txt`), qui n’est pas versé au dépôt : auteurs protégés.
- `sarraute/` : copies et ancien générateur des pages Sarraute (à passer au modèle à onglets).
- `restr_lib.py` : lecture et réécriture des pages de copie statiques.

Pour modifier une page de sujet : changer ces sources, relancer le générateur, ne pas éditer la page à la main.
