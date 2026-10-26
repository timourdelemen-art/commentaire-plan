# Pages de sujet de dissertation (français) — sources

Ces scripts produisent les pages `bac-dissertation-copie-20-ponge*.html`, `-dorion*.html`, `-pour-un-oui-ou-pour-un-non-*.html` et `-cahier-de-douai*.html`, `-le-menteur*.html` et `-on-ne-badine-pas-avec-l-amour*.html` ; ils ne font pas partie de la construction Netlify.

- `ponge_copies.py`, `dorion_copies.py` : les copies à 20 (`C[clé]` : titre, sujet, session, pdf, mot, preuve, why, blocks).
- `etapes_data.py` : propositions au clic des quatre étapes (`E`, `OK`, `LONG`).
- `gen_pages_sujet.py` : génère les pages à onglets. Usage : `python3 scripts/dissertation-sujets/gen_pages_sujet.py .`
- `verify2.py`, `sarraute/verify.py` : vérifient les citations mot pour mot. Ils lisent le texte intégral des œuvres (`ponge_clean.txt`, `dorion_clean.txt`, `play.txt`), qui n’est pas versé au dépôt : auteurs protégés.
- `badine_copies.py` : les deux copies de Badine (l’ancienne, extraite de sa page ; la nouvelle, sur le sujet 2025 Polynésie, écrite avec le protocole).
- `menteur_copies.py`, `menteur_histoires.py` : les deux copies du Menteur (l’ancienne, extraite de sa page ; la nouvelle, sur le sujet 2025 Asie).
- `douai_copies.py` : les deux copies du Cahier de Douai, extraites le 26 octobre 2026 des anciennes pages statiques.
- `sarraute/copies.py` : les copies Sarraute (`COPIES`, avec `mot` et `preuve` ajoutés en fin de fichier) ; la copie « agressivite » est retenue (`hold`) et n’est pas publiée. `sarraute/gen.py` est l’ancien générateur, remplacé par `gen_pages_sujet.py`.
- `restr_lib.py` : lecture et réécriture des pages de copie statiques.

Pour modifier une page de sujet : changer ces sources, relancer le générateur, ne pas éditer la page à la main.
