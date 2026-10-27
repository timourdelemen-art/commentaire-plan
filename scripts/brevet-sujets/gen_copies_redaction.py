"""Ajoute les copies à 20 rédigées pour le site aux pages de copies du brevet, avec le même balisage que les trois premières,
et les rattache à leur sujet dans sujets.json (champ « copie »). Idempotent : une copie déjà présente est remplacée.
- copies_reflexion_base.py + copies_reflexion.py → brevet-reflexion-copies-20.html
- copies_imagination.py → brevet-imagination-copies-20.html
Ensuite : relancer gen_brevet_sujets.py puis gen_brevet_accueil.py. Usage : python3 -I scripts/brevet-sujets/gen_copies_redaction.py ."""
import sys, os, re, json, importlib.util
R = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
SJ = os.path.join(HERE, 'sujets.json')
S = json.load(open(SJ, encoding='utf8')); by = {s['id']: s for s in S}
NOMBRES = {3: 'Trois', 9: 'Neuf', 11: 'Onze'}
TYPES = [('copies_reflexion.py', 'brevet-reflexion-copies-20.html', 'sujet de réflexion', 'réflexions', ('autre-epoque', 'embellir-le-reel', 'reves-et-ambitions')),
         ('copies_imagination.py', 'brevet-imagination-copies-20.html', 'sujet d’imagination', 'rédactions', ('nuit-du-caporal', 'lettre-de-titus', 'talkie-walkie'))]

def article(num, c, genre):
    s = by[c['sujet']]
    an, lieu = s['label'].split(' · ')[1], s['label'].split(' · ')[2]
    mots = sum(len(re.sub(r'<[^>]+>', '', t).split()) for _, b in c['blocs'] for t, _ in b)
    blocs = ''.join('<div class="c20-block">' + (f'<h3 class="c20-h">{h3}</h3>' if h3 else '') + ''.join(
        f'<p class="c20-s"><span class="c20-t">{t}</span><span class="c20-f">{f}</span></p>' for t, f in b) + '</div>' for h3, b in c['blocs'])
    val = ''.join(f'<li><b>{a}</b> : {b}</li>' for a, b in c['valorise'])
    pdf = f' <a class="official-link" href="{s["pdf"]}" target="_blank" rel="noopener">Le sujet officiel (PDF) ↗</a>' if s.get('pdf') else ''
    code = f' ({s["code"]})' if s.get('code') else ''
    ctx = f'<p class="bsr-contexte"><b>Le texte de l’épreuve.</b> {s["contexte"]}</p>' if s.get('contexte') else ''
    return (f'<article class="bc20-copy" id="{c["ancre"]}">\n<div class="bc20-head"><div class="kicker">COPIE {num} · {an} · {lieu.upper()}</div><h2>{c["titre"]}</h2>\n'
            f'<p class="dc20-badge">Copie rédigée pour le site</p>\n<p class="bc20-meta">Brevet {an}, {lieu}, série générale, {genre}{code}.{pdf}</p>\n'
            f'<blockquote class="bsr-consigne">{s["consigne"]}</blockquote>\n{ctx}</div>\n'
            f'<p><button type="button" class="philo-print bc20-toggle" aria-controls="{c["ancre"]}-texte" aria-pressed="false">Voir la fonction de chaque phrase</button> <span class="micro">Environ {round(mots, -1)} mots.</span></p>\n'
            f'<div class="c20 dc20 c20-plain bc20-texte" id="{c["ancre"]}-texte">{blocs}</div>\n'
            f'<div class="bc20-valorise"><div class="kicker">CE QUE LE CORRECTEUR VALORISE</div><ul>{val}</ul></div>\n'
            f'<p class="bc20-next"><a class="official-link" href="brevet-sujet-{s["id"]}.html#entrainement">S’entraîner sur ce sujet →</a></p>\n</article>'), mots

for mod, page, genre, nom, anciennes in TYPES:
    sp = importlib.util.spec_from_file_location('c', os.path.join(HERE, mod)); C = importlib.util.module_from_spec(sp); sp.loader.exec_module(C)
    P = os.path.join(R, page); h = open(P, encoding='utf8').read()
    modeles = C.COPIES
    n0 = len(anciennes)
    if mod == 'copies_reflexion.py':
        spb = importlib.util.spec_from_file_location('b', os.path.join(HERE, 'copies_reflexion_base.py'))
        base = importlib.util.module_from_spec(spb); spb.loader.exec_module(base)
        modeles = base.COPIES + modeles
        n0 = 0
    for i, c in enumerate(modeles):
        art, mots = article(n0 + i + 1, c, genre)
        assert (300 if 'reflexion' in mod else 330) <= mots <= 550, (c['ancre'], mots)  # repère interne, pas une conversion officielle en lignes
        m = re.search(rf'<article class="bc20-copy" id="{c["ancre"]}">.*?</article>', h, re.S)
        if m:
            h = h.replace(m.group(0), art)
        else:
            end = h.index('</section>', h.index('<section class="bc20-list">'))
            h = h[:end] + '\n' + art + '\n' + h[end:]
        by[c['sujet']]['copie'] = f'{page}#{c["ancre"]}'
    total = len(re.findall(r'<article class="bc20-copy"', h))
    N = NOMBRES.get(total, str(total))
    h = re.sub(rf'<h1>[A-Z][a-zé]+ {nom} à 20,', f'<h1>{N} {nom} à 20,', h)
    def lede(m):  # le nombre en tête de phrase prend la majuscule
        debut = m.group(1); n = N if debut.endswith('">') else N.lower()
        return f'{debut}{n} vrais sujets du brevet, {N.lower()} copies'
    h = re.sub(r'(<p class="lede">(?:[^<]*?: )?)[A-Za-zé]+ vrais sujets du brevet, [a-zé]+ copies', lede, h)
    liens = []
    for ident, body in re.findall(r'<article class="bc20-copy" id="([^"]+)">(.*?)</article>', h, re.S):
        titre = re.search(r'<h2>(.*?)</h2>', body, re.S).group(1)
        liens.append(f'<li><a href="#{ident}">{titre}</a></li>')
    sommaire = (f'<details class="bc20-sommaire" id="choisir-copie"><summary>Choisir parmi les {total} copies</summary>'
                f'<nav aria-label="Choisir une copie modèle"><ul>{"".join(liens)}</ul>'
                '<p><a href="#exercices">Passer aux exercices →</a></p></nav></details>')
    if '<details class="bc20-sommaire"' in h:
        h = re.sub(r'<details class="bc20-sommaire"[^>]*>.*?</details>', lambda _: sommaire, h, count=1, flags=re.S)
    else:
        h = re.sub(r'<nav class="offer-band bsr-sommaire"[^>]*>.*?</nav>', lambda _: sommaire, h, count=1, flags=re.S)
    if 'href="brevet-redaction-navigation.css"' not in h:
        h = h.replace('</head>', '<link rel="stylesheet" href="brevet-redaction-navigation.css"></head>')
    open(P, 'w', encoding='utf8').write(h)
    print(page, ':', total, 'copies')
json.dump(S, open(SJ, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
