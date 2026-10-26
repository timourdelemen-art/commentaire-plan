"""Pages de sujet (dissertation de français) : trois onglets, Le sujet · S’entraîner · La copie à 20.
S’entraîner : quatre étapes ; chacune au clic sur ce sujet, puis à l’écrit sur un autre sujet de la même œuvre."""
import sys, re, html, importlib.util, unicodedata
R = sys.argv[1]
HERE = __file__.rsplit('/', 1)[0]
def load(p, name='C'):
    sp = importlib.util.spec_from_file_location('m', f'{HERE}/{p}'); m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m); return getattr(m, name) if name else m
D = load('etapes_data.py', None)
OEUVRES = {
 'ponge': dict(file='ponge_copies.py', titre='<em>La rage de l’expression</em>', court='La rage de l’expression', auteur='Francis Ponge',
   parcours='« dans l’atelier du poète »', ancre='ponge',
   note='Chaque citation a été relue mot pour mot dans l’édition Gallimard de <em>La rage de l’expression</em> (1976). Les textes du recueil sont désignés par leur titre ; « Le Carnet du bois de pins » comprend son appendice (notes et lettres).'),
 'dorion': dict(file='dorion_copies.py', titre='<em>Mes forêts</em>', court='Mes forêts', auteur='Hélène Dorion',
   parcours='« la poésie, la nature, l’intime »', ancre='dorion',
   note='Chaque citation a été relue mot pour mot dans l’édition Bruno Doucey de <em>Mes forêts</em> (2021). La barre oblique sépare les vers ; les poèmes sont désignés par leur titre, ou par leurs premiers mots quand ils n’en ont pas.'),
 'douai': dict(file='douai_copies.py', racine='/', titre='<em>Cahier de Douai</em>', court='Cahier de Douai', auteur='Arthur Rimbaud',
   parcours='« émancipations créatrices »', ancre='',
   note='Les vers cités ont été vérifiés mot pour mot sur deux éditions en ligne. Quand la ponctuation d’un vers varie d’une édition à l’autre, vérifiez dans la vôtre.'),
 'sarraute': dict(file='sarraute/copies.py', var='COPIES', prefixe='pour-un-oui-ou-pour-un-non-', racine='/', titre='<em>Pour un oui ou pour un non</em>', court='Pour un oui ou pour un non', auteur='Nathalie Sarraute',
   parcours='« théâtre et dispute »', ancre='sarraute',
   note='Chaque réplique citée a été relue mot pour mot dans l’édition Gallimard du <em>Théâtre</em> de Nathalie Sarraute. La pièce n’a ni actes ni scènes : les passages sont situés par leur moment dans le dialogue. Les personnages s’y nomment H. 1, H. 2, H. 3 et F.'),
}
WHY = {
 'p1': {'ok': 'Cette remarque s’appuie sur l’œuvre et résiste à la lecture du sujet : c’est d’elle que naît le problème.',
        'redit': 'Cette remarque redit ce que le sujet affirme déjà : elle ne fait apparaître aucune difficulté.',
        'theme': 'C’est vrai, mais c’est un thème : on ne voit pas encore ce qu’il change à la lecture proposée par le sujet.',
        'faux': 'L’œuvre ne permet pas de le soutenir : c’est une opposition fabriquée, que la copie ne pourrait pas prouver.'},
 'p2': {'ok': 'On reconnaît le sujet, la lecture qu’il propose et ce que l’œuvre montre aussi ; la réponse reste à construire.',
        'reprise': 'La question reprend le sujet presque mot pour mot : elle est fidèle, mais n’indique pas encore ce qui fait difficulté.',
        'partielle': 'La question ne garde qu’un côté du problème : ce que l’œuvre montre aussi a disparu.',
        'resout': 'La question contient déjà la réponse (« concilier », « réussir à ») : il n’y a plus rien à démontrer.'},
 'plan': {'ok': 'Chaque partie répond à la question, et chacune naît de ce que la précédente n’explique pas : c’est un plan dynamique.',
          'dialectique': 'Oui, puis non, puis un peu des deux : les parties s’opposent au lieu de s’enchaîner, et la troisième coupe la poire en deux.',
          'thematique': 'Trois thèmes rangés côte à côte : aucune partie ne répond à la question, aucune ne rend la suivante nécessaire.',
          'ordre': 'Suivre l’ordre de l’œuvre, c’est la résumer au lieu de répondre au sujet.'},
 'ana': {'ok': 'Le procédé est nommé simplement, son effet ici est précis, et la phrase dit ce qu’il apporte au sujet.',
         'general': 'Le procédé et l’effet sont justes, mais la phrase s’arrête avant de dire ce qu’ils apportent au sujet.',
         'paraphrase': 'La phrase redit le passage avec d’autres mots : ni procédé, ni effet.',
         'etiquette': 'Nommer le procédé ne suffit pas : sans effet ici, l’analyse ne prouve rien.'},
}
V = {'ok': 'ok', 'redit': 'no', 'theme': 'def', 'faux': 'no', 'reprise': 'def', 'partielle': 'def', 'resout': 'no',
     'dialectique': 'def', 'thematique': 'no', 'ordre': 'no', 'general': 'def', 'paraphrase': 'no', 'etiquette': 'no'}
COMMENT = {
 1: 'Lisez ce que le sujet affirme, et le petit mot qui l’oriente (« seulement », « ne… que », une citation). Cherchez dans l’œuvre ce qui résiste à cette lecture. Dites le problème en une seule question, qui garde les deux côtés.',
 2: 'La première partie donne au sujet sa part de vérité. La deuxième part de ce que la première n’explique pas. La troisième répond à la question, souvent par la forme même de l’œuvre. Chaque transition est une question.',
 3: 'Un passage précis ; ce que fait le texte, nommé simplement ; son effet ici ; puis ce que cela apporte à la partie. Une phrase d’analyse par preuve suffit.',
 4: 'Une introduction ; trois parties de trois paragraphes ; deux transitions ; une conclusion. Brève et complète : chaque phrase a un rôle.',
}
IA = {
 'mots': 'Dissertation sur œuvre, bac de français. Évaluer si l’élève explique précisément le sens des mots du sujet cités dans la consigne et ce qu’ils supposent. Un seul conseil prioritaire, sans écrire à sa place. Vouvoyer.',
 'pb': 'Dissertation sur œuvre, bac de français. Évaluer : ce que le sujet suggère, ce que l’œuvre montre aussi (avec un élément précis de l’œuvre), puis une seule question qui garde les deux côtés sans donner la réponse. Un seul manque prioritaire, sans écrire à la place de l’élève. Vouvoyer.',
 'plan': 'Dissertation sur œuvre, bac de français. Évaluer un plan en trois réponses : I donne au sujet sa part de vérité, II naît de ce que I n’explique pas, III répond à la question sans couper la poire en deux. Refuser un plan thématique ou « oui / non / les deux ». Un seul conseil prioritaire. Vouvoyer.',
 'trans': 'Dissertation sur œuvre, bac de français. Évaluer deux transitions : chacune est une question née de la limite de la partie précédente, à laquelle la partie suivante répond. Un seul conseil prioritaire. Vouvoyer.',
 'ana': 'Dissertation sur œuvre, bac de français. Évaluer une phrase d’analyse : procédé nommé simplement, effet ici précis, portée pour le sujet. Ne pas exiger de terme technique. Un seul conseil prioritaire. Vouvoyer.',
 'copie': 'Dissertation sur œuvre, bac de français. Évaluer la copie entière : problème, plan dynamique en trois parties, transitions-questions, preuves analysées, conclusion qui répond. Citer deux réussites et un seul manque prioritaire. Vouvoyer.',
}
def plain(s): return re.sub(r'<[^>]+>', '', s)
def esc(s): return html.escape(plain(s), quote=True)
def norm(s):
    s = unicodedata.normalize('NFD', plain(s)); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]', '', s.lower())

def info(k, c):
    B = c['blocks']; intro = B[0][1]; rows = [(t, l) for h, b in B for t, l in b]
    reps = [next(t for t, l in b if l.startswith('Réponse')) for h, b in B if h in ('Première partie', 'Deuxième partie', 'Troisième partie')]
    trans = [b[0][0] for h, b in B if len(b) == 1 and b[0][1].startswith('Transition')]
    mq = re.search(r'«(.*)»', c['preuve'][0]); q = norm(mq.group(1) if mq else c['preuve'][0]); an = passage = None
    for i, (t, l) in enumerate(rows):
        if l.startswith('Le') and 'qui prouve' in l and q in norm(t):
            passage = t; an = rows[i + 1][0]; break
    assert an and len(reps) == 3 and len(trans) == 2 and len(B) == 13, k
    return dict(c=c, intro=intro, rows=rows, reps=reps, trans=trans, passage=passage, an=an)

def q(num, total, label, question, options, kind, extra=''):
    opts = ''.join(f'<button type="button" class="chaine-opt" data-v="{V[t]}" data-why="{html.escape(WHY[kind][t], quote=True)}">{txt}</button>' for txt, t in options)
    return (f'<div class="etape-q"><div class="chaine-num">Je choisis · question {num} sur {total} · {label}</div>{extra}'
            f'<p class="chaine-q">{question}</p><div class="chaine-opts">{opts}</div><div class="chaine-fb" aria-live="polite"></div></div>')

def zone(n, label, consigne, quote, kind, corrige, placeholder=''):
    ph = f' placeholder="{html.escape(placeholder, quote=True)}"' if placeholder else ' placeholder="Écrivez ici."'
    return (f'<div class="exercise"><p class="instruction"><strong>{label}.</strong> {consigne}</p>'
            f'<textarea rows="6" aria-label="{esc(label)}" data-feedback-kind="bac-dissertation" data-feedback-quote="{esc(quote)}" '
            f'data-feedback-instruction="{html.escape(IA[kind], quote=True)}"{ph}></textarea>'
            + (f'<details class="etape-comment"><summary>Comparer avec le corrigé, après votre essai</summary>{corrige}</details>' if corrige else '')
            + '</div>')

def page(k, I, O, other, Ib):
    c = I['c']; cb = Ib['c']; e = D.E[k]; ok = D.OK[k]; lg = D.LONG[k]
    rows = I['rows']; ns = len(rows); nw = sum(len(plain(t).split()) for t, l in rows)
    P = I['intro'][4][0]
    autre = (f'<div class="etape-autre"><p><b>Un autre sujet sur {O["titre"]}</b> · {cb["session"].split(",")[0]}</p>'
             f'<p class="sujet-libelle" style="font-size:19px;margin:8px 0 0">{cb["sujet"]}</p>'
             f'<p class="micro"><a href="{O.get("racine", "")}bac-dissertation-copie-20-{O.get("prefixe", "")}{other}.html">La page de ce sujet →</a></p></div>')
    def comment(n): return f'<details class="etape-comment"><summary>Comment faire ?</summary><p>{COMMENT[n]}</p><p><a href="bac-dissertation-methode.html">La méthode complète →</a></p></details>'
    def ecrit(inner): return (f'<div class="etape-ecrit"><div class="etape-niveau">J’écris, sur un autre sujet</div>'
                              f'<p>Refaites seul la même opération sur un sujet que vous n’avez pas encore vu. Le corrigé vient de sa copie à 20.</p>{autre}{inner}</div>')
    direct = '<button type="button" class="etape-direct" hidden>Je sais déjà faire : passer à l’écrit →</button>'
    suiv = lambda t: f'<div class="etape-fin"><button type="button" class="btn red small etape-suivante">{t}</button></div>'
    p1 = [(ok[0], 'ok')] + [((lg['theme'] if t == 'theme' else d), t) for d, t in e['p1']]
    p2 = [(P, 'ok')] + list(e['p2'])
    pl = [(ok[1], 'ok')] + [((lg['dialectique'] if t == 'dialectique' else d), t) for d, t in e['plan']]
    an = [(ok[2], 'ok')] + [((lg['general'] if t == 'general' else d), t) for d, t in e['analyse']]
    X, Y = I['intro'][2][0], I['intro'][3][0]
    e1 = (f'<section class="etape" id="etape-probleme"><h3>Étape 1 · Le problème</h3>{comment(1)}<div class="etape-niveau">Je choisis, sur ce sujet</div>{direct}'
          + q(1, 2, 'ce que l’œuvre montre aussi', f'Le sujet suggère ceci : « {plain(X).replace("On pourrait penser ", "on pourrait penser ")} » Quelle remarque sur l’œuvre fait apparaître la difficulté ?', p1, 'p1')
          + q(2, 2, 'une seule question', 'Quelle question garde tout le problème, sans donner la réponse ?', p2, 'p2')
          + ecrit(zone(1, 'Les mots du sujet', f'Que veut dire précisément {cb["mot"][0]} ?', cb['sujet'], 'mots', f'<p>{cb["mot"][1]}</p>')
                  + zone(2, 'Le problème', 'Écrivez « On pourrait penser que… », puis « Pourtant, l’œuvre montre… », puis une seule question.', cb['sujet'], 'pb',
                         f'<p>{Ib["intro"][2][0]} {Ib["intro"][3][0]}</p><p><strong>{Ib["intro"][4][0]}</strong></p>',
                         'On pourrait penser que… Pourtant, l’œuvre montre… Question : …'))
          + suiv('Étape 2 · Le plan →') + '</section>')
    e2 = (f'<section class="etape" id="etape-plan"><h3>Étape 2 · Le plan</h3>{comment(2)}<div class="etape-niveau">Je choisis, sur ce sujet</div>{direct}'
          + q(1, 1, 'le plan', f'La question est : « {plain(P)} » Quel plan y répond ?', pl, 'plan')
          + ecrit(zone(3, 'Le plan', 'Donnez la réponse de chaque partie en une phrase.', cb['sujet'], 'plan',
                       '<p>' + '<br>'.join(f'<strong>{n}.</strong> {r}' for n, r in zip(['I', 'II', 'III'], Ib['reps'])) + '</p>',
                       'I. D’abord, … (ce que le sujet a de vrai)\nII. Mais … (ce que I n’explique pas)\nIII. Alors … (la réponse à la question)')
                  + zone(4, 'Les transitions', 'Écrivez les deux transitions, chacune en une question.', cb['sujet'], 'trans',
                         f'<p><strong>I → II.</strong> {Ib["trans"][0]}<br><strong>II → III.</strong> {Ib["trans"][1]}</p>'))
          + suiv('Étape 3 · La preuve →') + '</section>')
    e3 = (f'<section class="etape" id="etape-preuve"><h3>Étape 3 · La preuve</h3>{comment(3)}<div class="etape-niveau">Je choisis, sur ce sujet</div>{direct}'
          + q(1, 1, 'l’analyse', 'Quelle phrase analyse le mieux ce passage, pour la dissertation ?', an, 'ana', f'<p class="etape-passage">{I["passage"]}</p>')
          + ecrit(zone(5, 'Une preuve analysée', f'Analysez en une phrase ce passage : <span class="etape-passage" style="display:block">{Ib["passage"]}</span>', cb['sujet'], 'ana', f'<p>{Ib["an"]}</p>'))
          + suiv('Étape 4 · La copie entière →') + '</section>')
    e4 = (f'<section class="etape" id="etape-copie"><h3>Étape 4 · La copie entière</h3>{comment(4)}'
          f'<p>Rédigez maintenant la dissertation entière sur le sujet de cette page. Vous pourrez ensuite la comparer à la copie à 20.</p>'
          + zone(6, 'Votre dissertation', f'Sujet : {c["sujet"]}', c['sujet'], 'copie', '', 'Introduction…\n\nPremière partie…')
          + '<div class="etape-fin"><a class="btn red small" href="#copie">Comparer avec la copie à 20 →</a></div></section>')
    nav = ''.join(f'<button type="button" data-etape="{i}">{t}</button>' for i, t in enumerate(['1 · Le problème', '2 · Le plan', '3 · La preuve', '4 · La copie entière']))
    blocks = ''.join('<div class="c20-block">' + (f'<h3 class="c20-h">{h}</h3>' if h else '') + ''.join(
        f'<p class="c20-s"><span class="c20-t">{t}</span><span class="c20-f">{l}</span></p>' for t, l in b) + '</div>' for h, b in c['blocks'])
    pdf = (f'<a class="official-link" href="{c["pdf"]}" rel="noopener">Le sujet officiel (PDF) →</a>' if c['pdf']
           else '<span class="micro">Libellé vérifié sur deux copies du sujet officiel.</span>')
    why = ''.join(f'<div><strong>{a}</strong><p>{b}</p></div>' for a, b in c['why'])
    slug = f'bac-dissertation-copie-20-{O.get("prefixe", "")}{k}.html'
    title = f"Dissertation sur {O['court']} ({O['auteur']}) : {plain(c['titre'])} — sujet, exercices, copie à 20"
    desc = f"Un vrai sujet du bac de français, quatre étapes d’entraînement au clic puis à l’écrit, et une copie à 20 : {esc(c['sujet'])}"
    return slug, ns, nw, f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="modeles-redaction.css"><link rel="canonical" href="https://commentaire-plan.com/{slug}">
</head><body><header class="top"></header><main class="wrap dc20-page">

<section class="pagehead"><div><div class="kicker">BAC · DISSERTATION · {html.escape(O['court'].upper())}</div><h1>{c['titre']}</h1>
<p class="lede">Un vrai sujet du bac sur {O['titre']}, quatre étapes d’entraînement et sa copie à 20.</p></div></section>

<div class="onglets" data-onglets data-defaut="entrainement">
<div class="onglets-barre" role="tablist" aria-label="Ce sujet"><button role="tab" aria-controls="sujet"><b>Le sujet</b><small>Libellé officiel</small></button><button role="tab" aria-controls="entrainement"><b>S’entraîner</b><small>Quatre étapes</small></button><button role="tab" aria-controls="copie"><b>La copie à 20</b><small>{ns} phrases</small></button></div>

<section class="onglet offer-band" id="sujet"><div class="kicker">LE SUJET</div>
<p class="sujet-libelle">{c['sujet']}</p>
<p class="dc20-meta">{c['session']}. Œuvre : {O['auteur']}, {O['titre']} ; parcours associé : {O['parcours']}.</p>
<p>{pdf}</p>
<p><a class="btn red small" href="#entrainement">Commencer l’entraînement →</a></p></section>

<section class="onglet offer-band" id="entrainement"><p class="etape-sujet"><b>Sujet.</b> {c['sujet']}</p>
<p class="micro">D’abord au clic, chaque proposition expliquée ; puis à l’écrit, sur un autre sujet.</p>
<div data-etapes><div class="etapes-nav" role="group" aria-label="Étapes">{nav}</div>
{e1}{e2}{e3}{e4}</div></section>

<section class="onglet offer-band" id="copie"><div class="kicker">LA COPIE À 20</div><h2>{c['titre']}</h2>
<p class="lede" style="font-size:18px">La copie la plus courte qui mérite 20 : {ns} phrases, environ {round(nw, -1)} mots ; une introduction, trois parties de trois paragraphes, deux transitions, une conclusion.</p>
<div class="c20 dc20" id="dc20-copie">{blocks}</div>
<p class="micro dc20-note">{O['note']}</p>
<div class="kicker" style="margin-top:28px">POURQUOI CETTE COPIE MÉRITE 20</div>
<div class="grid-3">
{why}
</div>
<p><a class="official-link" href="{O.get("racine", "")}bac-dissertation-sujets.html{'#' + O['ancre'] if O['ancre'] else ''}">Tous les vrais sujets sur {O['titre']} →</a><br><a class="official-link" href="{O.get("racine", "")}bac-dissertation.html#diss-probleme">Trouver le problème sur de vrais sujets, au clic →</a><br><a class="official-link" href="{O.get("racine", "")}bac-dissertation-methode.html">La méthode complète de la dissertation →</a></p></section>
</div>

</main><script src="onglets.js"></script><script src="etapes.js"></script><script src="modeles-redaction.js"></script><script src="site-nav.js"></script></body></html>
'''

for oe, O in OEUVRES.items():
    C = load(O['file'], O.get('var', 'C'))
    keys = [k for k in C if not C[k].get('hold')]
    I = {k: info(k, C[k]) for k in keys}
    for n, k in enumerate(keys):
        other = keys[(n + 1) % len(keys)]
        slug, ns, nw, h = page(k, I[k], O, other, I[other])
        open(f'{R}/{slug}', 'w', encoding='utf8').write(h)
        print(slug, ns, nw, '→ autre sujet :', other)
