"""Pages d’annale du brevet (travail sur le texte), sur le modèle des pages de sujet du site : trois onglets.
Le sujet (texte s’il est du domaine public, questions et barème) · S’entraîner (une question à la fois : écrire, coup de pouce, corrigé)
· Le corrigé (toutes les réponses, au format des éléments de correction officiels : réponse rédigée, barème, autres réponses acceptées).
Sources : annales/catalogue-annales.js (questions) ; corriges_annales.py (corrigés vérifiés, prioritaires). Règles : docs/protocole-brevet.md.
Usage : python3 -I scripts/brevet-sujets/gen_brevet_annales.py ."""
import sys, os, re, json, html, subprocess, importlib.util
R = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
esc = lambda s: html.escape(str(s), quote=True)
CAT = json.loads(subprocess.run(['node', '-e', "global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.ANNALES_CATALOGUE))",
                                 os.path.join(R, 'annales/catalogue-annales.js')], capture_output=True, text=True, check=True).stdout)
sp = importlib.util.spec_from_file_location('c', os.path.join(HERE, 'corriges_annales.py')); C = importlib.util.module_from_spec(sp); sp.loader.exec_module(C)
PARTIE = {'brevet-comprehension': 'Compréhension', 'brevet-interpretation': 'Interprétation', 'brevet-analyse': 'Analyse', 'brevet-image': 'Texte et image',
          'brevet-grammaire': 'Grammaire', 'brevet-lexique': 'Lexique', 'brevet-reecriture': 'Réécriture'}

def lignes(texte, sup):
    """Prose relevée ligne à ligne dans le sujet officiel : une ligne vide sépare les paragraphes ;
    le numéro du sujet s’affiche en marge toutes les cinq lignes."""
    n, out = 0, []
    for para in texte.split('\n\n'):
        parts = []
        for ligne in para.split('\n'):
            n += 1
            parts.append((f'<span class="line-no" aria-hidden="true">{n}</span>' if n % 5 == 0 else '') + sup(ligne))
        out.append('<p>' + ' '.join(parts) + '</p>')
    return ''.join(out)

def page(k, e):
    fix = C.CORRIGES.get(k, {})
    qs = []
    for s in e['etapes']:
        f = fix.get(s['id'], {})
        qs.append(dict(s, correction=f.get('correction', s.get('correction', '')), bareme=f.get('bareme', ''), accepte=f.get('accepte', ''),
                       consigne=f.get('consigne', s['consigne'])))
    total = sum(q.get('points') or 0 for q in qs)
    manque = [q['titre'] for q in qs if not q['correction']]
    titre = f"Brevet {e['annee']} : {e['auteur']}, {e['oeuvre']}"
    lieu = e['zone']
    T = getattr(C, 'TEXTES', {}).get(k)
    if T:  # texte relevé dans le sujet officiel (corriges_annales.py)
        sup = lambda v: re.sub(r'\^(\d+)', r'<sup>\1</sup>', v)
        rows = ''.join(f'<p class="vers">' + (f'<span class="line-no" aria-hidden="true">{i + 1}</span>' if (i + 1) % 5 == 0 else '') + sup(v) + '</p>'
                       for i, v in enumerate(T['texte'].split('\n'))) if T.get('vers') else (lignes(T['texte'], sup) if T.get('lignes') else ''.join(f'<p>{sup(p)}</p>' for p in T['texte'].split('\n')))
        notes = '<br>'.join(f'<sup>{i + 1}</sup> {n}' for i, n in enumerate(T.get('notes', [])))
        texte = f'<div class="kicker">LE TEXTE</div><div class="texte-examen">{rows}</div><p class="micro">{T["source"]}</p>' + (f'<p class="micro">{notes}</p>' if notes else '')
        brut = re.sub(r'\^\d+', '', T['texte']).replace('\n\n', '\n')
    elif e.get('supportText'):
        texte = f'<div class="kicker">LE TEXTE</div><div class="texte-examen">{e["supportText"]}</div><p class="micro">{esc(e.get("supportSource", ""))}</p>'
        brut = re.sub(r'<p class=.micro.>.*$', '', e['supportText'], flags=re.S)
        brut = re.sub(r'<span class=.line-no.>\d+</span>|<sup>\d+</sup>|<[^>]+>', ' ', brut)
    else:
        texte = '<p class="texte-absent">Le texte est protégé par le droit d’auteur : lisez-le dans le sujet officiel, avec ses numéros de ligne, et gardez-le à côté des questions.</p>'
        brut = None
    if brut:  # chaque citation des corrigés doit se trouver dans le texte (coupes […] et barres de vers admises)
        norm = lambda t: re.sub(r'\s+', ' ', t.replace('’', "'")).strip()
        B = norm(brut.replace('\n', ' '))
        for q in qs:
            for cit in re.findall(r'«\s*([^»]+?)\s*»', re.sub(r'<[^>]+>', '', q['correction'] + ' ' + q['accepte'])):
                for frag in re.split(r'\s*\[…\]\s*|\s*/\s*', cit):
                    frag = frag.strip(' ,;:.')
                    if q['kind'] in ('brevet-grammaire', 'brevet-lexique', 'brevet-reecriture') or frag in fix.get(q['id'], {}).get('hors_texte', ()):
                        continue  # phrases manipulées, mots construits, titres proposés par le sujet
                    if len(frag) > 3 and norm(frag) not in B:
                        print('   citation introuvable', k, q['id'], '«', frag, '»')
    def bloc_q(q):
        return (f'<div class="brevet-q"><p><b>{esc(q["titre"])}</b> <span class="micro">({q.get("points", "?")} point{"s" if (q.get("points") or 0) > 1 else ""})</span></p>'
                f'<p>{q["consigne"]}</p></div>')
    def bloc_corr(q):
        if not q['correction']:
            return ''
        return (f'<div class="brevet-corr"><p><b>{esc(q["titre"])}</b> <span class="micro">({q.get("points", "?")} pt)</span></p><p>{q["correction"]}</p>'
                + (f'<p class="micro"><b>Points.</b> {q["bareme"]}</p>' if q['bareme'] else '')
                + (f'<p class="micro"><b>Autres réponses acceptées.</b> {q["accepte"]}</p>' if q['accepte'] else '') + '</div>')
    etapes = ''.join(
        f'<article class="exercise hlp-step"><div class="kicker">QUESTION {n + 1} SUR {len(qs)} · {PARTIE.get(q["kind"], "")} · {q.get("points", "?")} PT</div>'
        f'<h3>{esc(q["titre"])}</h3><p class="instruction">{q["consigne"]}</p>'
        f'<textarea rows="5" aria-label="{esc(q["titre"])}" data-hlp-save="{q["id"]}" data-feedback-kind="brevet" data-feedback-instruction="{esc(q["consigne"])}"></textarea>'
        f'<details class="aide"><summary>Un coup de pouce</summary><p>{q["aide"]}</p></details>'
        + (f'<details class="correction"><summary>Comparer avec le corrigé</summary><p>{q["correction"]}</p>'
           + (f'<p class="micro"><b>Points.</b> {q["bareme"]}</p>' if q['bareme'] else '')
           + (f'<p class="micro"><b>Autres réponses acceptées.</b> {q["accepte"]}</p>' if q['accepte'] else '') + '</details>' if q['correction'] else '')
        + '</article>' for n, q in enumerate(qs))
    slug = f'{k}.html'
    desc = f"Le sujet du brevet {e['annee']} ({lieu}) sur {e['auteur']}, {e['oeuvre']} : les questions une à une, avec un coup de pouce, puis le corrigé au format officiel."
    return slug, manque, f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(titre)} — sujet corrigé question par question</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="https://commentaire-plan.com/{slug}"><link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
<nav class="seo-breadcrumbs wrap" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true">›</span><a href="/brevet.html">Brevet</a><span aria-hidden="true">›</span><a href="/brevet.html#brevet-sujets">Annales</a><span aria-hidden="true">›</span><span aria-current="page">{e['annee']} · {esc(e['auteur'])}</span></nav>
<section class="pagehead"><div><div class="kicker">BREVET {e['annee']} · {esc(lieu.upper())} · TRAVAIL SUR LE TEXTE</div><h1>{esc(e['auteur'])}<br><span>{esc(e['oeuvre'])}</span></h1>
<p class="lede">{len(qs)} questions, {total} points sur 50, dans l’ordre du sujet. Répondez d’abord seul ; un coup de pouce, puis le corrigé, viennent ensuite.</p></div>
<aside class="side-note"><p><a href="{esc(e['sourceOfficielle'])}" target="_blank" rel="noopener">Le sujet officiel ↗</a></p><p class="micro">Rédigez chaque réponse : une idée, une citation courte avec sa ligne, une explication.</p></aside></section>
<div class="onglets" data-onglets data-defaut="entrainement">
<div class="onglets-barre" role="tablist" aria-label="Ce sujet"><button role="tab" aria-controls="sujet"><b>Le sujet</b><small>{"Le texte, les questions" if e.get('supportText') else "Les questions"}</small></button><button role="tab" aria-controls="entrainement"><b>S’entraîner</b><small>Une question à la fois</small></button><button role="tab" aria-controls="corrige"><b>Le corrigé</b><small>Au format officiel</small></button></div>
<section class="onglet offer-band" id="sujet">{texte}<div class="kicker" style="margin-top:28px">LES QUESTIONS</div>{''.join(bloc_q(q) for q in qs)}</section>
<section class="onglet exercise-wrap hlp-training" id="entrainement" data-hlp-id="brevet-{k}"><div class="exercise-intro"><div><div class="kicker">S’ENTRAÎNER</div><h2>Une question à la fois.</h2></div>
<p>Écrivez votre réponse, ouvrez le coup de pouce si besoin, puis comparez avec le corrigé et passez à la suivante. Vos réponses restent sur cet appareil.</p></div>
{etapes}<p><button type="button" class="btn small hlp-clear">Effacer mes réponses</button></p></section>
<section class="onglet offer-band" id="corrige"><div class="kicker">LE CORRIGÉ</div><h2>Les réponses attendues.</h2><p class="micro">D’autres réponses sont justes si elles répondent à la question et sont prouvées par le texte.</p>{''.join(bloc_corr(q) for q in qs)}
<p><a class="official-link" href="brevet.html#brevet-sujets">Tous les sujets du brevet →</a></p></section>
</div></main><script src="onglets.js"></script><script src="hlp-sujet.js"></script><script src="site-nav.js"></script></body></html>
'''

for k, e in sorted(CAT.items(), key=lambda x: -x[1].get('annee', 0)):
    if e.get('examen') != 'Brevet':
        continue
    slug, manque, h = page(k, e)
    if manque:  # une page d’annale ne paraît qu’avec tous ses corrigés
        print('en attente :', slug, '·', len(manque), 'corrigés manquants', manque if len(manque) < 3 else ''); continue
    open(os.path.join(R, slug), 'w', encoding='utf8').write(h)
    print('écrite :', slug)
