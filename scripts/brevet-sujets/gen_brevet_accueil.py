"""Accueil Brevet (brevet.html), sur le modèle de bac-commentaire.html : trois onglets.
Choisir un sujet (annales du travail sur le texte, sujets de rédaction) · Travailler une partie · Cours et modèles.
Source des annales : annales/catalogue-annales.js ; des rédactions : sujets.json. Usage : python3 -I scripts/brevet-sujets/gen_brevet_accueil.py ."""
import sys, os, re, json, html, subprocess
R = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
esc = lambda s: html.escape(str(s), quote=True)
CAT = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.ANNALES_CATALOGUE))",
                                 os.path.join(R, 'annales/catalogue-annales.js')], capture_output=True, text=True, check=True).stdout)
SUJETS = json.load(open(os.path.join(HERE, 'sujets.json'), encoding='utf8'))
# Les archives officielles du DNB (liens vers les banques du ministère), reprises de l’ancienne page des annales.
ARCHIVES = open(os.path.join(HERE, 'archives-dnb.html'), encoding='utf8').read()

annales = sorted(((k, e) for k, e in CAT.items() if e.get('examen') == 'Brevet'), key=lambda x: -x[1]['annee'])
def li_annale(k, e):
    lien = f'annales/entrainement-annale.html?id={k}'
    return (f'<li><a href="{lien}">{e["annee"]} · {esc(e["auteur"])}, <em>{esc(e["oeuvre"])}</em></a>'
            f'<span class="sujet-acces"><a class="badge-ok" href="{lien}">S’entraîner</a>'
            f'<a class="badge" href="{esc(e["sourceOfficielle"])}" target="_blank" rel="noopener">Le sujet officiel ↗</a></span></li>')

def court(s):
    t = re.sub(r'<[^>]+>', ' ', s['consigne']).replace('&nbsp;', ' ')
    t = re.sub(r'\s+', ' ', t).strip()
    q = re.search(r'([^.?!»]*\?)', t)  # la question du sujet de réflexion
    if s['type'] == 'reflexion' and q:
        r = q.group(1).strip()
        return t[:t.index(r) + len(r)] if len(r.split()) < 8 else r  # une question trop courte garde sa phrase d’amorce
    t = t.split('. ')[0].rstrip('.') + '.'
    return t if len(t) <= 130 else t[:t.rfind(' ', 0, 125)] + '…'

def li_redac(s):
    f = f'brevet-sujet-{s["id"]}.html'
    page = open(os.path.join(R, f), encoding='utf8').read()
    an, lieu = s['label'].split(' · ')[1], s['label'].split(' · ')[2]
    copie = f'<a class="badge" href="{f}#copie">Lire la copie à 20</a>' if 'id="copie"' in page else ''
    return (f'<li><a href="{f}">{an} · {esc(lieu)} : {esc(court(s))}</a>'
            f'<span class="sujet-acces"><a class="badge-ok" href="{f}#entrainement">S’entraîner</a>{copie}</span></li>')

refl = [s for s in SUJETS if s['type'] == 'reflexion']
imag = [s for s in SUJETS if s['type'] == 'imagination']
n_copies = sum('id="copie"' in open(os.path.join(R, f'brevet-sujet-{s["id"]}.html'), encoding='utf8').read() for s in SUJETS)

PARTIES = [
    ('Répondre à une question sur le texte', 'Une idée, une citation courte avec sa ligne, une explication.', 'brevet-comprehension.html'),
    ('Analyser la langue', 'Nature, fonction, propositions, formation des mots : la réponse et le test qui la prouve.', 'brevet-grammaire.html'),
    ('Réécrire un passage', 'Changer une donnée, puis tout ce qui en dépend, sans erreur de copie.', 'brevet-reecriture.html'),
]
def li_partie(t, d, f):
    return (f'<li><div><b><a href="{f}">{t}</a></b><p>{d}</p></div><div class="difficulte-liens">'
            f'<a href="{f}#entrainement">S’entraîner →</a><a href="{f}#annales">Les questions des annales →</a></div></li>')

main = f'''<main class="wrap commentaire-hub"><nav class="seo-breadcrumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true">›</span><span aria-current="page">Brevet</span></nav>
<section class="pagehead"><div><div class="kicker">BREVET DE FRANÇAIS · ÉPREUVE 2027</div><h1>Le brevet de français,<br>partie par partie.</h1><p class="lede">Trois heures, trois parties : le travail sur le texte, la dictée, la rédaction. Choisissez un vrai sujet, ou travaillez la partie qui vous résiste.</p><p class="journey-actions"><a class="btn red" href="#brevet-sujets">Choisir un sujet →</a><a class="btn" href="#exercices-cibles">Travailler une partie →</a></p></div><aside class="side-note"><p><b>L’épreuve, à partir de 2027</b></p><p><b>1 h 10 · 50 points.</b> Travail sur le texte et l’image : compréhension et interprétation (32 points), grammaire et réécriture (18 points).</p><p><b>20 minutes · 10 points.</b> Dictée.</p><p><b>1 h 30 · 40 points.</b> Rédaction : un sujet de réflexion ou un sujet d’imagination, au choix.</p></aside></section>
<div class="onglets" data-onglets data-defaut="brevet-sujets">
<div class="onglets-barre" role="tablist" aria-label="Le brevet"><button role="tab" aria-controls="brevet-sujets"><b>Choisir un sujet</b><small>{len(annales)} annales, {len(SUJETS)} rédactions</small></button><button role="tab" aria-controls="exercices"><b>Travailler une partie</b><small>Texte, langue, rédaction</small></button><button role="tab" aria-controls="brevet-ressources"><b>Cours et modèles</b><small>Méthodes, copies à 20</small></button></div>
<section class="onglet offer-band" id="brevet-sujets"><div class="kicker">CHOISIR UN SUJET</div><h2>Un vrai sujet, une question à la fois.</h2>
<h3>Le travail sur le texte</h3><p>Pour chaque annale : les questions dans l’ordre du sujet. Vous répondez d’abord, puis vous demandez un coup de pouce ou la correction.</p>
<div class="oeuvre-choix"><ul>{"".join(li_annale(k, e) for k, e in annales)}</ul></div>
<h3>La rédaction</h3><p>Pour chaque sujet : <span class="badge-ok">S’entraîner</span> étape par étape, puis lire la copie à 20 quand elle existe ({n_copies} sujets sur {len(SUJETS)}).</p>
<details class="oeuvre-choix" open><summary>Sujets de réflexion <small>{len(refl)} SUJETS</small></summary><ul>{"".join(li_redac(s) for s in refl)}</ul></details>
<details class="oeuvre-choix"><summary>Sujets d’imagination <small>{len(imag)} SUJETS</small></summary><ul>{"".join(li_redac(s) for s in imag)}</ul></details>
<p><a class="official-link" href="anthologie-brevet.html">Toutes les annales, par année →</a><br><a class="official-link" href="brevet-redaction-sujets.html">Les sujets de rédaction et le piège de chacun →</a></p>
{ARCHIVES}</section>
<section class="onglet offer-band" id="exercices"><div class="kicker">TRAVAILLER UNE PARTIE</div><h2 id="exercices-cibles">Qu’est-ce qui vous résiste ?</h2>
<h3>Le travail sur le texte</h3><ol class="difficultes">{"".join(li_partie(*p) for p in PARTIES)}</ol>
<p><a class="official-link" href="brevet-lecture-parcours.html">Huit questions officielles, avec des aides progressives →</a></p>
<h3>La dictée</h3><p>La dictée vérifie les accords que la réécriture fait travailler : le verbe et son sujet, le groupe nominal, le participe passé. <a href="brevet-reecriture.html#entrainement">S’entraîner aux accords →</a></p>
<h3>La rédaction</h3><p><a class="official-link" href="brevet-redaction.html">Ce que la rédaction demande, et comment elle est évaluée →</a></p><ol class="difficultes">
<li><div><b>Rédiger une réflexion</b><p>Comprendre la question, trouver des arguments, développer un exemple, conclure.</p></div><div class="difficulte-liens"><a href="brevet-reflexion.html#entrainement">S’entraîner →</a><a href="brevet-reflexion-copies-20.html">Les copies à 20 →</a></div></li>
<li><div><b>Rédiger une imagination</b><p>Respecter la consigne, faire avancer le récit, mêler récit, description et dialogue.</p></div><div class="difficulte-liens"><a href="brevet-imagination.html#entrainement">S’entraîner →</a><a href="brevet-imagination-copies-20.html">Les copies à 20 →</a></div></li>
</ol></section>
<section class="onglet" id="brevet-ressources"><section class="offer-band"><div class="kicker">MÉTHODES</div><h2>Une référence quand vous en avez besoin</h2><div class="commentaire-method-links"><a href="brevet-comprehension.html#methode">Répondre à une question</a><a href="brevet-grammaire.html#methode">Grammaire</a><a href="brevet-reecriture.html#methode">Réécriture</a><a href="brevet-reflexion.html#methode">Réflexion</a><a href="brevet-imagination.html#methode">Imagination</a><a href="brevet-connecteurs.html">Connecteurs logiques</a><a href="brevet-exemples.html">Banque d’exemples</a></div></section>
<section class="offer-band"><div class="kicker">MODÈLES ANNOTÉS</div><h2>Lire une copie et comprendre sa construction</h2><div class="journey-actions"><a class="btn" href="brevet-reflexion-copies-20.html">Réflexion : trois copies à 20 →</a><a class="btn" href="brevet-imagination-copies-20.html">Imagination : trois copies à 20 →</a></div><p><a href="brevet-reflexion-modele.html">Réflexion : des exemples qui prouvent →</a><br><a href="brevet-imagination-modele.html">Imagination : chaque phrase fait avancer le texte →</a></p></section></section>
</div>
</main>'''

f = os.path.join(R, 'brevet.html'); s = open(f, encoding='utf8').read()
a, b = s.index('<main'), s.index('</main>') + len('</main>')
s = s[:a] + main + s[b:]
if 'onglets.js' not in s:
    s = s.replace('<script src="site-nav.js"></script>', '<script src="onglets.js"></script><script src="site-nav.js"></script>', 1)
s = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="Brevet de français 2027 : de vrais sujets corrigés question par question, des exercices progressifs pour le texte, la langue, la réécriture et la rédaction, des copies à 20.">', s, count=1)
open(f, 'w', encoding='utf8').write(s)
print('brevet.html :', len(annales), 'annales,', len(refl), 'réflexions,', len(imag), 'imaginations,', n_copies, 'copies à 20')
