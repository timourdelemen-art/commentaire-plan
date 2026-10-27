"""Passages à lire, repris des transcriptions officielles déjà présentes dans le dépôt.

Zola : indices des paragraphes du catalogue (borne de fin exclue).
La Fontaine : numéros de vers inclusifs. Aucun texte reconstitué.
"""
import html
import re
from html.parser import HTMLParser
from corriges_annales import TEXTES

ZOLA = 'brevet-2026-general-zola-cage-betes-feroces'
FABLE = 'brevet-2022-metropole-general-la-fontaine-lion-moucheron'
PASSAGES = {
    'brevet-comprehension.html': [
        ((ZOLA, 2, 8), (FABLE, 1, 8)),
        ((ZOLA, 1, 3), (FABLE, 9, 29)),
        ((ZOLA, 3, 4), (FABLE, 9, 29)),
        ((ZOLA, 0, 9), (FABLE, 1, 39)),
    ],
    'brevet-grammaire.html': [
        ((ZOLA, 0, 1), (FABLE, 1, 8)),
        ((FABLE, 15, 18), (ZOLA, 1, 2)),
        ((ZOLA, 1, 2), (FABLE, 19, 25)),
        ((ZOLA, 1, 2), (FABLE, 9, 18)),
    ],
    'brevet-reecriture.html': [
        ((FABLE, 26, 29), (ZOLA, 3, 4)),
        ((ZOLA, 3, 4), (ZOLA, 5, 8)),
    ],
}


class Paragraphes(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        if tag == 'p':
            self.current = self.get_starttag_text()
        elif self.current is not None:
            self.current += self.get_starttag_text()

    def handle_data(self, data):
        if self.current is not None:
            self.current += html.escape(data)

    def handle_endtag(self, tag):
        if self.current is not None:
            self.current += f'</{tag}>'
            if tag == 'p':
                self.rows.append(self.current)
                self.current = None


def extrait(ref, catalogue):
    ident, debut, fin = ref
    if ident == FABLE:
        t = TEXTES[ident]
        vers = t['texte'].splitlines()
        assert 1 <= debut <= fin <= len(vers)
        notes = set()

        def note(match):
            notes.add(int(match[1]))
            return f'<sup>{match[1]}</sup>'

        corps = ''.join(
            f'<p class="vers"><span class="line-no">{n}</span> '
            + re.sub(r'\^(\d+)', note, html.escape(vers[n - 1])) + '</p>'
            for n in range(debut, fin + 1)
        )
        corps += ''.join(f'<p class="micro"><sup>{n}</sup> {html.escape(t["notes"][n - 1])}</p>' for n in sorted(notes))
        source = t['source']
        titre = f'Le Lion et le Moucheron · vers {debut} à {fin}'
    else:
        p = Paragraphes()
        p.feed(catalogue[ident]['supportText'])
        assert 0 <= debut < fin <= 9
        corps = ''.join(p.rows[debut:fin])
        source = html.escape(catalogue[ident]['supportSource'])
        titre = 'Une cage de bêtes féroces · passage à lire'
    return (f'<figure class="brevet-extrait"><figcaption>{titre}</figcaption>'
            f'<div class="texte-examen">{corps}</div><p class="micro">{source}</p>'
            f'<a href="{ident}.html#sujet">Lire le texte entier →</a></figure>')
