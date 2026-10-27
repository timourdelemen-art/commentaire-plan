"""Écrit l’onglet « S’entraîner » des pages de partie du brevet à partir de etapes_parties.py.
Chaque étape : un geste, au clic sur une vraie question d’annale (proposition expliquée), puis à l’écrit sur une autre, avec son corrigé.
Usage : python3 -I scripts/brevet-sujets/gen_etapes_parties.py ."""
import sys, os, re, html, importlib.util, json, subprocess
R = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from extraits_parties import PASSAGES, extrait
sp = importlib.util.spec_from_file_location('e', os.path.join(HERE, 'etapes_parties.py')); E = importlib.util.module_from_spec(sp); sp.loader.exec_module(E)
esc = lambda s: html.escape(s, quote=True)
CAT = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.ANNALES_CATALOGUE))", os.path.join(os.path.abspath(R), 'annales/catalogue-annales.js')], capture_output=True, text=True, check=True).stdout)
DIRECT = '<button type="button" class="etape-direct" hidden>Je sais déjà faire : passer à l’écrit →</button>'

def etape(n, total, d, kind, annale, passages):
    qs = ''.join(
        f'<div class="etape-q"><div class="chaine-num">Je choisis · question {k + 1} sur {len(d["questions"])}</div><p class="quote">{esc(src)}</p>{extrait(passages[0], CAT)}<p class="chaine-q">{esc(q)}</p>'
        f'<div class="chaine-opts">' + ''.join(f'<button type="button" class="chaine-opt" data-v="{v}" data-why="{esc(w)}">{esc(t)}</button>' for t, v, w in opts)
        + '</div><div class="chaine-fb" aria-live="polite"></div></div>' for k, (src, q, opts) in enumerate(d['questions']))
    w = d['ecrit']
    ia = (f'Brevet de français, troisième. {w["question"]} Consigne : {w["consigne"]} Réponse attendue : {w["corrige"]} '
          'Dites ce qui est réussi, puis le seul manque prioritaire (idée, citation avec sa ligne, explication ; ou test, nom exact, accord). N’écrivez pas la réponse à la place de l’élève. Vouvoyez-le.')
    ecrit = (f'<div class="etape-ecrit"><div class="etape-niveau">J’écris, sur une autre question</div><p>{esc(d["geste"])}</p>'
             f'<div class="exercise"><p class="quote">{esc(w["source"])} — {esc(w["question"])}</p>{extrait(passages[1], CAT)}<p class="instruction"><strong>Consigne :</strong> {esc(w["consigne"])}</p>'
             f'<textarea class="exam-writing-area" rows="5" aria-label="{esc(w["consigne"])}" placeholder="Votre réponse…" data-feedback-kind="{kind}" data-feedback-instruction="{esc(ia)}"></textarea>'
             f'<details class="correction"><summary>Comparer avec le corrigé</summary><p>{esc(w["corrige"])}</p></details></div></div>')
    fin = (f'<div class="etape-fin"><button type="button" class="btn red small etape-suivante">Étape {n + 2} →</button></div>' if n + 1 < total else
           f'<div class="etape-fin"><a class="btn red small" href="{annale}#entrainement">Un sujet entier, question par question →</a> <a class="btn small" href="#annales">Les questions des annales →</a></div>')
    return (f'<section class="etape" id="{d["id"]}"><h3>Étape {n + 1} · {esc(d["titre"])}</h3><div class="etape-niveau">Je choisis, sur une vraie question</div>{DIRECT}{qs}{ecrit}{fin}</section>')

for f, P in E.PAGES.items():
    p = os.path.join(R, f); s = open(p, encoding='utf8').read()
    a = s.index('<section class="onglet exercise-wrap" id="entrainement">')
    b = s.index('<div class="onglet" id="annales">', a)
    n = len(P['etapes'])
    nav = ''.join(f'<button type="button" data-etape="{i}">{i + 1} · {esc(d["titre"])}</button>' for i, d in enumerate(P['etapes']))
    corps = (f'<section class="onglet exercise-wrap" id="entrainement"><p class="micro">D’abord au clic, sur une vraie question du brevet, chaque proposition expliquée ; puis à l’écrit, sur une autre question.</p>'
             f'<div data-etapes><div class="etapes-nav" role="group" aria-label="Étapes">{nav}</div>\n'
             + '\n'.join(etape(i, n, d, P['kind'], P['annale'], PASSAGES[f][i]) for i, d in enumerate(P['etapes'])) + '</div>'
             + (('<p class="micro">Les mêmes gestes avec un retour sur votre réponse : ' + ' · '.join(f'<a href="{h}">{esc(t)} →</a>' for h, t in P['retours']) + '</p>') if P.get('retours') else '')
             + '</section>\n')
    s = s[:a] + corps + s[b:]
    if 'href="brevet-exercices.css"' not in s:
        s = s.replace('</head>', '<link rel="stylesheet" href="brevet-exercices.css"></head>')
    s = re.sub(r'(aria-controls="entrainement"><b>S’entraîner</b><small>)[^<]*(</small>)', rf'\g<1>{n} étapes\g<2>', s)
    open(p, 'w', encoding='utf8').write(s)
    ok = sum(1 for d in P['etapes'] for q in d['questions'] for t, v, w in q[2] if v == 'ok' and all(len(t.split()) > len(x[0].split()) for x in q[2] if x[1] != 'ok'))
    nq = sum(len(d['questions']) for d in P['etapes'])
    print(f, n, 'étapes ; réponse solide seule la plus longue :', ok, 'sur', nq)
