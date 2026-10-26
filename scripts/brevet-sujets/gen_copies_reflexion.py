"""Ajoute les copies de copies_reflexion.py à brevet-reflexion-copies-20.html (même balisage que les trois premières)
et les rattache à leur sujet dans sujets.json (champ « copie »). Idempotent : une copie déjà présente est remplacée.
Ensuite : relancer gen_brevet_sujets.py puis gen_brevet_accueil.py. Usage : python3 -I scripts/brevet-sujets/gen_copies_reflexion.py ."""
import sys, os, re, json, importlib.util
R = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sp = importlib.util.spec_from_file_location('c', os.path.join(HERE, 'copies_reflexion.py')); C = importlib.util.module_from_spec(sp); sp.loader.exec_module(C)
SJ = os.path.join(HERE, 'sujets.json')
S = json.load(open(SJ, encoding='utf8')); by = {s['id']: s for s in S}
PAGE = os.path.join(R, 'brevet-reflexion-copies-20.html')
h = open(PAGE, encoding='utf8').read()
n0 = len(re.findall(r'<article class="bc20-copy" id="copie-(?:autre-epoque|embellir-le-reel|reves-et-ambitions)"', h))

def article(num, c):
    s = by[c['sujet']]
    an, lieu = s['label'].split(' · ')[1], s['label'].split(' · ')[2]
    mots = sum(len(re.sub(r'<[^>]+>', '', t).split()) for _, b in c['blocs'] for t, _ in b)
    blocs = ''.join('<div class="c20-block">' + f'<h3 class="c20-h">{h3}</h3>' + ''.join(
        f'<p class="c20-s"><span class="c20-t">{t}</span><span class="c20-f">{f}</span></p>' for t, f in b) + '</div>' for h3, b in c['blocs'])
    val = ''.join(f'<li><b>{a}</b> : {b}</li>' for a, b in c['valorise'])
    pdf = f' <a class="official-link" href="{s["pdf"]}" target="_blank" rel="noopener">Le sujet officiel (PDF) ↗</a>' if s.get('pdf') else ''
    code = f' ({s["code"]})' if s.get('code') else ''
    return (f'<article class="bc20-copy" id="{c["ancre"]}">\n<div class="bc20-head"><div class="kicker">COPIE {num} · {an} · {lieu.upper()}</div><h2>{c["titre"]}</h2>\n'
            f'<p class="dc20-badge">Copie rédigée pour le site</p>\n<p class="bc20-meta">Brevet {an}, {lieu}, série générale, sujet de réflexion{code}.{pdf}</p>\n'
            f'<blockquote class="bsr-consigne">{s["consigne"]}</blockquote>\n</div>\n'
            f'<p><button type="button" class="philo-print bc20-toggle" aria-controls="{c["ancre"]}-texte" aria-pressed="false">Voir la fonction de chaque phrase</button> <span class="micro">Environ {round(mots, -1)} mots.</span></p>\n'
            f'<div class="c20 dc20 c20-plain bc20-texte" id="{c["ancre"]}-texte">{blocs}</div>\n'
            f'<div class="bc20-valorise"><div class="kicker">CE QUE LE CORRECTEUR VALORISE</div><ul>{val}</ul></div>\n'
            f'<p class="bc20-next"><a class="official-link" href="brevet-sujet-{s["id"]}.html#entrainement">S’entraîner sur ce sujet →</a></p>\n</article>')

for i, c in enumerate(C.COPIES):
    art = article(n0 + i + 1, c)
    m = re.search(rf'<article class="bc20-copy" id="{c["ancre"]}">.*?</article>', h, re.S)
    if m:
        h = h.replace(m.group(0), art)
    else:
        end = h.index('</section>', h.index('<section class="bc20-list">'))
        h = h[:end] + '\n' + art + '\n' + h[end:]
    by[c['sujet']]['copie'] = f'brevet-reflexion-copies-20.html#{c["ancre"]}'
total = len(re.findall(r'<article class="bc20-copy"', h))
NOMS = {3: 'Trois', 11: 'Onze'}
h = re.sub(r'<h1>[A-Z][a-zé]+ réflexions à 20,', f'<h1>{NOMS.get(total, str(total))} réflexions à 20,', h)
h = re.sub(r'<p class="lede">[A-Z][a-zé]+ vrais sujets du brevet, [a-zé]+ copies', f'<p class="lede">{NOMS.get(total, str(total))} vrais sujets du brevet, {NOMS.get(total, str(total)).lower()} copies', h)
open(PAGE, 'w', encoding='utf8').write(h)
json.dump(S, open(SJ, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print('brevet-reflexion-copies-20.html :', total, 'copies')
