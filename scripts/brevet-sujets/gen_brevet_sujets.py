#!/usr/bin/env python3
"""Pages de sujet du brevet (rédaction) : une page par sujet officiel, en trois onglets.

Le sujet (consigne, texte de l'épreuve, piège) / S'entraîner (au clic puis à l'écrit, sur un autre sujet)
/ La copie à 20 (quand le site en a une, reprise telle quelle des pages de copies).
Données : sujets.json (relevé de brevet-redaction-sujets.html) et etapes_brevet.py.
Relancer le script réécrit les pages ; il ne supprime rien.
Usage : python3 -I scripts/brevet-sujets/gen_brevet_sujets.py
"""
import html, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import etapes_brevet as D  # noqa: E402

S = json.load(open(os.path.join(HERE, 'sujets.json'), encoding='utf-8'))
V = {'ok': 'ok', 'def': 'def', 'no': 'no'}
TYPE = {'imagination': 'sujet d’imagination', 'reflexion': 'sujet de réflexion'}


def plain(s): return re.sub(r'<[^>]+>', '', s)
def attr(s): return html.escape(plain(s).replace('\n', ' '), quote=True)
def fichier(s): return f'brevet-sujet-{s["id"]}.html'


def lieu(s):
    m = re.match(r'(\d{4})-(.*)-(imagination|reflexion)$', s['id'])
    annee, centre = m.group(1), m.group(2)
    noms = {'metropole': 'Métropole', 'amerique-du-nord': 'Amérique du Nord', 'asie': 'Asie',
            'centres-etrangers': 'Centres étrangers', 'antilles-guyane': 'Antilles-Guyane', 'polynesie': 'Polynésie'}
    return annee, noms[centre]


def copie(s):
    """La copie à 20 du site pour ce sujet, reprise de sa page (même texte, mêmes fonctions)."""
    if not s['copie']:
        return None
    page, ancre = s['copie'].split('#')
    src = open(os.path.join(ROOT, page), encoding='utf-8').read()
    m = re.search(rf'<article class="bc20-copy" id="{ancre}">(.*?)</article>', src, re.S)
    a = m.group(1)
    titre = re.search(r'<h2>(.*?)</h2>', a).group(1)
    corps = a[a.index('</div>', a.index('bsr-contexte') if 'bsr-contexte' in a else a.index('bc20-meta')) + 6:]
    corps = re.sub(r'<p class="bc20-next">.*?</p>', '', corps, flags=re.S)
    corps = corps.replace(f'id="{ancre}-texte"', f'id="{ancre}-texte-sujet"').replace(f'aria-controls="{ancre}-texte"', f'aria-controls="{ancre}-texte-sujet"')
    return titre, corps, page, ancre


def question(n, total, intitule, opts):
    b = ''.join(f'<button type="button" class="chaine-opt" data-v="{V[v]}" data-why="{attr(why)}">{html.escape(t)}</button>' for t, v, why in opts)
    return (f'<div class="etape-q"><div class="chaine-num">Je choisis · question {n} sur {total}</div>'
            f'<p class="chaine-q">{intitule}</p><div class="chaine-opts">{b}</div><div class="chaine-fb" aria-live="polite"></div></div>')


def corrige(s):
    """Les réponses justes d'un sujet : elles servent de corrigé quand on le travaille par écrit."""
    q = D.QI if s['type'] == 'imagination' else D.QR
    ok = [next(t for t, v, _ in qs if v == 'ok') for qs in D.E[s['id']]]
    return '<ul>' + ''.join(f'<li><strong>{html.escape(a)}</strong> {html.escape(b)}</li>' for a, b in zip(q, ok)) + '</ul>'


def autre(s):
    meme = [x for x in S if x['type'] == s['type']]
    return meme[(meme.index(s) + 1) % len(meme)]


def page(s, instr):
    a, c = lieu(s)
    t = TYPE[s['type']]
    o = autre(s)
    oa, oc = lieu(o)
    cp = copie(s)
    imag = s['type'] == 'imagination'
    qs = D.QI if imag else D.QR
    methode = ('brevet-imagination.html', 'Faites le contrat du sujet : qui parle, à qui, à quel temps ; ce que la consigne oblige à faire ; ce qui reste libre. Puis choisissez trois moments, le dernier préparé par les premiers.') if imag else \
              ('brevet-reflexion.html', 'Dites ce que demande la question, avec ses mots importants. Donnez une réponse nette, avec sa limite. Chaque paragraphe : un argument, un exemple précis, ce qu’il prouve.')
    consigne_ecrit = ('Écrivez le contrat de ce sujet : qui parle, à qui, à quel temps ; ce que la consigne oblige à faire ; le déroulement en trois moments.' if imag else
                      'Écrivez ce que demande la question, votre réponse en une phrase, puis un paragraphe : un argument, un exemple précis, ce qu’il prouve.')
    ia_prep = (f'Brevet, préparation d’un {TYPE[o["type"]]} (DNB {oa}, {oc}) : {plain(o["consigne"])} '
               + ('L’élève écrit le contrat du sujet : qui parle, à qui, à quel temps ; ce que la consigne oblige à faire ; le déroulement en trois moments. Vérifiez que chaque point respecte la consigne. '
                  if o['type'] == 'imagination' else
                  'L’élève écrit ce que demande la question, sa réponse en une phrase, puis un paragraphe argument-exemple-preuve. Vérifiez que la réponse est nette et que l’exemple prouve l’argument. ')
               + 'Le texte de l’épreuve n’est pas fourni : ne l’exigez pas. Vouvoyez l’élève. Un seul point acquis et une seule priorité, sans écrire à sa place.')
    nav = '<button type="button" data-etape="0">1 · Préparer</button><button type="button" data-etape="1">2 · Rédiger</button>'
    e1 = (f'<section class="etape" id="etape-preparer"><h3>Étape 1 · Préparer</h3>'
          f'<details class="etape-comment"><summary>Comment faire ?</summary><p>{methode[1]}</p><p><a href="{methode[0]}">La méthode complète →</a></p></details>'
          f'<div class="etape-niveau">Je choisis, sur ce sujet</div><button type="button" class="etape-direct" hidden>Je sais déjà faire : passer à l’écrit →</button>'
          + ''.join(question(i + 1, 3, qs[i], D.E[s['id']][i]) for i in range(3))
          + f'<div class="etape-ecrit"><div class="etape-niveau">J’écris, sur un autre sujet</div>'
          f'<p>Refaites seul la même préparation sur un sujet que vous n’avez pas encore vu.</p>'
          f'<div class="etape-autre"><p><b>Un autre {TYPE[o["type"]]}</b> · brevet {oa}, {oc}</p><blockquote class="bsr-consigne">{o["consigne"]}</blockquote>'
          f'<p class="micro"><a href="{fichier(o)}">La page de ce sujet →</a></p></div>'
          f'<div class="exercise"><p class="instruction"><strong>La préparation.</strong> {consigne_ecrit}</p>'
          f'<textarea rows="7" aria-label="La préparation" data-feedback-kind="brevet-redaction" data-feedback-instruction="{attr(ia_prep)}" placeholder="Écrivez ici."></textarea>'
          f'<details class="etape-comment"><summary>Comparer avec le corrigé, après votre essai</summary>{corrige(o)}</details></div></div>'
          '<div class="etape-fin"><button type="button" class="btn red small etape-suivante">Étape 2 · Rédiger →</button></div></section>')
    fin = ('<div class="etape-fin"><a class="btn red small" href="#copie">Comparer avec la copie à 20 →</a></div>' if cp else
           f'<p class="micro">Pour ce sujet, le site n’a pas encore de copie à 20 : comparez avec <a href="{"brevet-imagination-copies-20.html" if imag else "brevet-reflexion-copies-20.html"}">les copies à 20 d’un sujet proche</a>.</p>')
    e2 = (f'<section class="etape" id="etape-rediger"><h3>Étape 2 · Rédiger</h3>'
          f'<p>Écrivez la rédaction entière, en une heure et demie, comme le jour du brevet.</p>'
          f'<div class="exercise"><p class="instruction"><strong>Votre rédaction.</strong> {plain(s["consigne"])}</p>'
          f'<textarea rows="16" class="exam-writing-area" aria-label="Votre rédaction" data-feedback-kind="brevet-redaction" data-feedback-instruction="{attr(instr)}" placeholder="Écrivez ici."></textarea></div>'
          f'{fin}</section>')
    contexte = f'<p class="bsr-contexte"><b>Le texte de l’épreuve.</b> {s["contexte"]}</p>' if s['contexte'] else ''
    pdf = f'<a class="official-link" href="{s["pdf"]}" target="_blank" rel="noopener">Le sujet officiel (PDF) ↗</a>' if s['pdf'] else ''
    tab3 = f'<button role="tab" aria-controls="copie"><b>La copie à 20</b><small>Phrase par phrase</small></button>' if cp else ''
    onglet3 = ''
    if cp:
        titre, corps, pg, ancre = cp
        onglet3 = (f'<section class="onglet offer-band" id="copie"><div class="kicker">LA COPIE À 20</div><h2>{titre}</h2>'
                   f'<p class="dc20-badge">Copie rédigée pour le site</p>{corps}'
                   f'<p class="micro"><a href="{pg}#{ancre}">Cette copie parmi les autres copies à 20 →</a></p></section>')
    h1 = f'Brevet {a}, {c} : {t}.'
    title = f'Brevet {a} {c} : rédaction ({"imagination" if imag else "réflexion"})'
    desc = (f'Brevet de français {a} ({c}), {t} : le sujet officiel, une préparation au clic puis à l’écrit'
            + (', et une copie à 20 annotée.' if cp else '.'))
    lede = 'Un vrai sujet du brevet, une préparation au clic puis à l’écrit' + (', et sa copie à 20.' if cp else '.')
    return f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{attr(desc)}">
<link rel="stylesheet" href="styles.css"><link rel="canonical" href="https://commentaire-plan.com/{fichier(s)}">
</head><body><header class="top"></header><main class="wrap bsr-page">

<section class="pagehead"><div><div class="kicker">BREVET · RÉDACTION · {t.upper()}</div><h1>{h1}</h1>
<p class="lede">{lede}</p></div></section>

<div class="onglets" data-onglets data-defaut="entrainement">
<div class="onglets-barre" role="tablist" aria-label="Ce sujet"><button role="tab" aria-controls="sujet"><b>Le sujet</b><small>Libellé officiel</small></button><button role="tab" aria-controls="entrainement"><b>S’entraîner</b><small>Deux étapes</small></button>{tab3}</div>

<section class="onglet offer-band" id="sujet"><div class="kicker">LE SUJET</div>
<blockquote class="bsr-consigne">{s["consigne"]}</blockquote>
{contexte}
<details class="etape-comment"><summary>Ce qui piège, dans ce sujet</summary><p>{s["piege"]}</p></details>
<p class="micro">{s["code"]}. {pdf}</p>
<p><a class="btn red small" href="#entrainement">Commencer l’entraînement →</a></p></section>

<section class="onglet offer-band" id="entrainement"><p class="etape-sujet"><b>Sujet.</b> {plain(s["consigne"])}</p>
<p class="micro">D’abord au clic, chaque proposition expliquée ; puis à l’écrit, sur un autre sujet ; enfin la rédaction entière.</p>
<div data-etapes><div class="etapes-nav" role="group" aria-label="Étapes">{nav}</div>
{e1}{e2}</div></section>
{onglet3}
</div>

<section class="offer-band"><div class="kicker">ET ENSUITE ?</div><h2>D’autres sujets.</h2>
<p><a href="{fichier(o)}">{TYPE[o["type"]].capitalize()} · brevet {oa}, {oc} →</a> · <a href="brevet-redaction-sujets.html">Les 22 sujets de rédaction →</a> · <a href="{methode[0]}">La méthode →</a></p></section>

</main><script src="etapes.js"></script><script src="brevet-redaction-outils.js"></script><script src="site-nav.js"></script></body></html>
'''


def main():
    src = open(os.path.join(ROOT, 'brevet-redaction-sujets.html'), encoding='utf-8').read()
    instr = json.loads(html.unescape(re.search(r'<main[^>]*data-instructions="([^"]*)"', src).group(1)))
    assert {x['id'] for x in S} == set(D.E), 'étapes manquantes'
    for s in S:
        with open(os.path.join(ROOT, fichier(s)), 'w', encoding='utf-8') as f:
            f.write(page(s, instr['s-' + s['id']]))
    print(f'Brevet : {len(S)} pages de sujet, {sum(1 for s in S if s["copie"])} avec leur copie à 20.')


if __name__ == '__main__':
    main()
