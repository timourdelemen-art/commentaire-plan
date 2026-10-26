"""Pages de commentaire : trois onglets, Le texte · S’entraîner · Le commentaire à 20.
Le script range les blocs existants de la page (texte, copie annotée, repérage) sans les réécrire,
et insère l’onglet S’entraîner : quatre étapes, au clic sur ce texte, puis à l’écrit sur un autre texte.
Les exercices écrits d’origine (questions et corrigés) sont gardés dans ateliers.json : ils servent
d’exercice écrit à la page qui renvoie à ce texte. Relançable : python3 scripts/commentaire-sujets/onglets_commentaire.py ."""
import sys, re, html, json, importlib.util, os
R = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sp = importlib.util.spec_from_file_location('d', f'{HERE}/etapes_comm.py'); D = importlib.util.module_from_spec(sp); sp.loader.exec_module(D)
ATELIERS = f'{HERE}/ateliers.json'
AT = json.load(open(ATELIERS)) if os.path.exists(ATELIERS) else {}

WHY = {
 'xy': {'ok': 'X dit ce que le texte présente, Y ce que son écriture en fait comprendre : on voit déjà l’écart à expliquer.',
        'paraphrase': 'Y raconte encore la suite du texte : il dit ce qui arrive, pas ce que l’écriture fait comprendre ou éprouver.',
        'theme': 'X et Y sont des thèmes : ils pourraient convenir à beaucoup de textes et ne disent rien de celui-ci.',
        'faux': 'Le texte ne dit pas cela : relisez-le jusqu’au dernier vers avant de formuler X et Y.'},
 'pb': {'ok': 'La question garde ce que le texte présente et ce qu’il en fait ; elle demande comment, sans donner la réponse.',
        'description': 'La question ne garde que X : décrire ne suffit pas, il faut demander ce que l’écriture en fait.',
        'theme': 'La question porte sur un thème général : elle quitte le texte et son écriture.',
        'resout': 'La question contient déjà la réponse, et une généralité (« toujours ») : il n’y a plus rien à montrer dans ce texte.'},
 'plan': {'ok': 'Chaque partie est une réponse à la problématique, et chacune naît de ce que la précédente n’explique pas.',
          'lineaire': 'Découper le texte par vers ou par strophes, c’est le résumer : chaque partie doit être une réponse, même si elle suit l’ordre du texte.',
          'thematique': 'Trois thèmes côte à côte : aucune partie ne répond à la problématique, aucune ne rend la suivante nécessaire.',
          'procedes': 'Un plan par procédés devient un catalogue : les procédés servent de preuves dans les parties, ils ne font pas le plan.'},
 'ana': {'ok': 'Les mots du texte, le procédé nommé simplement, puis son effet ici, dans ce passage précis.',
         'paraphrase': 'La phrase redit le passage avec d’autres mots : ni procédé, ni effet.',
         'etiquette': 'Nommer les procédés ne suffit pas : sans effet ici, l’analyse ne prouve rien.',
         'general': 'L’effet est vague (« plus vivant », « frappante ») : il pourrait convenir à n’importe quel texte.'},
}
V = {'ok': 'ok', 'paraphrase': 'def', 'theme': 'no', 'faux': 'no', 'description': 'def', 'resout': 'no',
     'lineaire': 'def', 'thematique': 'no', 'procedes': 'no', 'etiquette': 'no', 'general': 'def'}
COMMENT = {
 1: 'X : ce que le texte présente (une scène, un portrait, une pensée). Y : ce que son écriture en fait comprendre ou éprouver. La problématique demande comment le texte passe de X à Y, en une seule question.',
 2: 'Chaque grande partie est une réponse à la problématique. Entre deux parties, une question ouverte dit ce que la partie précédente n’explique pas encore.',
 3: 'Ce que le texte fait (la réalisation) ; les mots qui le montrent, entre guillemets ; le procédé, nommé simplement ; son effet ici, dans ce passage. Un procédé n’a pas d’effet automatique.',
 4: 'Une introduction ; deux ou trois parties, chacune une réponse ; des transitions-questions ; une conclusion. Chaque phrase a un rôle.',
}
IA = {
 'problematique': 'Commentaire littéraire, bac de français. Évaluer X (ce que le texte présente), Y (ce que son écriture en fait comprendre ou éprouver) et une seule question qui garde X et Y sans donner la réponse. Un seul conseil prioritaire, sans écrire à la place de l’élève. Vouvoyer.',
 'plan': 'Commentaire littéraire, bac de français. Évaluer un plan dont chaque partie est une réponse à la problématique, reliées par des questions ouvertes. Refuser un plan linéaire, thématique ou par procédés. Un seul conseil prioritaire. Vouvoyer.',
 'analyse': 'Commentaire littéraire, bac de français. Évaluer une phrase d’analyse : mots du texte cités, procédé nommé simplement, effet précis dans ce passage. Ne pas exiger de terme technique. Un seul conseil prioritaire. Vouvoyer.',
 'redaction': 'Commentaire littéraire, bac de français. Évaluer le commentaire entier : problématique, parties qui répondent, transitions-questions, analyses précises, conclusion. Citer deux réussites et un seul manque prioritaire. Vouvoyer.',
}
def plain(s): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()
def esc(s): return html.escape(plain(s), quote=True)

def ateliers(k, h):
    """Exercices écrits d’origine de la page (avant transformation) : questions et corrigés."""
    if k in AT: return AT[k]
    wb = re.findall(r'<section class="workbench">(.*?)</section>', h, re.S)
    assert wb, f'{k} : aucun exercice écrit trouvé, et rien dans ateliers.json'
    AT[k] = [dict(kicker=plain(re.search(r'class="kicker">(.*?)</div>', w).group(1)),
                  html=w) for w in wb]
    return AT[k]

def q(num, total, label, question, options, kind, extra=''):
    opts = ''.join(f'<button type="button" class="chaine-opt" data-v="{V[t]}" data-why="{html.escape(WHY[kind][t], quote=True)}">{txt}</button>' for txt, t in options)
    return (f'<div class="etape-q"><div class="chaine-num">Je choisis · question {num} sur {total} · {label}</div>{extra}'
            f'<p class="chaine-q">{question}</p><div class="chaine-opts">{opts}</div><div class="chaine-fb" aria-live="polite"></div></div>')

def zone(label, consigne, kind, corrige, placeholder='Écrivez ici.'):
    return (f'<div class="exercise"><p class="instruction"><strong>{label}.</strong> {consigne}</p>'
            f'<textarea rows="6" aria-label="{esc(label)}" data-feedback-kind="{kind}" data-feedback-instruction="{html.escape(IA[kind], quote=True)}" placeholder="{html.escape(placeholder, quote=True)}"></textarea>'
            + (f'<details class="etape-comment"><summary>Comparer avec le corrigé, après votre essai</summary>{corrige}</details>' if corrige else '') + '</div>')

def corrige_de(atelier_html):
    m = re.search(r'<details class="correction">\s*<summary>.*?</summary>(.*?)</details>', atelier_html, re.S)
    return m.group(1).strip() if m else ''
def questions_de(atelier_html):
    m = re.search(r'<ol class="full-questions">.*?</ol>', atelier_html, re.S)
    return m.group(0) if m else ''

def etapes(k, titre_autre, A):
    e = D.E[k]; ok = D.OK[k]; lg = D.LONG.get(k, {}); autre = D.AUTRE[k]
    with_long = lambda lst: [((lg[t] if t in lg else d), t) for d, t in lst]
    xy = [(ok[0], 'ok')] + with_long(e['xy']); pb = [(PROB[k], 'ok')] + with_long(e['pb'])
    pl = [(ok[1], 'ok')] + with_long(e['plan']); an = [(ok[2], 'ok')] + with_long(e['ana'])
    lien = f'<a href="{autre}.html#texte">Lire ce texte →</a>'
    autre_box = f'<div class="etape-autre"><p><b>Un autre texte</b> · {titre_autre}</p><p class="micro">{lien}</p></div>'
    def comment(n): return f'<details class="etape-comment"><summary>Comment faire ?</summary><p>{COMMENT[n]}</p><p><a href="commentaire-bac-methode.html">La méthode complète →</a>' + (' · <a href="manuel-procedes.html">Le petit manuel des procédés →</a>' if n == 3 else '') + '</p></details>'
    def ecrit(inner): return (f'<div class="etape-ecrit"><div class="etape-niveau">J’écris, sur un autre texte</div>'
                              f'<p>Refaites seul la même opération sur un texte que vous n’avez pas encore travaillé. Le corrigé vient de sa copie à 20.</p>{autre_box}{inner}</div>')
    direct = '<button type="button" class="etape-direct" hidden>Je sais déjà faire : passer à l’écrit →</button>'
    suiv = lambda t: f'<div class="etape-fin"><button type="button" class="btn red small etape-suivante">{t}</button></div>'
    pick = lambda *mots: next((x for x in A if any(m in x['kicker'] for m in mots)), None)
    a1 = pick('PROBL', 'ENTRER'); a2 = pick('PLAN') or pick('ENTRER')
    e1 = (f'<section class="etape" id="etape-probleme"><h3>Étape 1 · Le problème</h3>{comment(1)}<div class="etape-niveau">Je choisis, sur ce texte</div>{direct}'
          + q(1, 2, 'X et Y', 'Que présente le texte (X), et que fait comprendre son écriture (Y) ?', xy, 'xy')
          + q(2, 2, 'une seule question', 'Quelle problématique garde X et Y, sans donner la réponse ?', pb, 'pb')
          + ecrit((f'<div class="exercise">{questions_de(a1["html"])}</div>' if a1 else '') + zone('Le problème', 'Écrivez X, puis Y, puis la problématique en une seule question.', 'problematique', corrige_de(a1['html']) if a1 else f'<p>{D.OK[autre][0]}</p><p><strong>{PROB[autre]}</strong></p>', 'X : …\nY : …\nProblématique : Comment… ?'))
          + suiv('Étape 2 · Le plan →') + '</section>')
    plan_ecrit = (('' if a2 is a1 else f'<div class="exercise">{questions_de(a2["html"])}</div>') + zone('Le plan', 'Donnez la réponse de chaque partie en une phrase, et les transitions en questions.', 'plan', corrige_de(a2['html']), 'I. …\nTransition : … ?\nII. …')) if a2 else \
                 zone('Le plan', 'Donnez la réponse de chaque partie en une phrase, et les transitions en questions.', 'plan', f'<p>{D.OK[autre][1]}</p>', 'I. …\nTransition : … ?\nII. …')
    e2 = (f'<section class="etape" id="etape-plan"><h3>Étape 2 · Le plan</h3>{comment(2)}<div class="etape-niveau">Je choisis, sur ce texte</div>{direct}'
          + q(1, 1, 'le plan', f'La problématique est : « {plain(PROB[k])} » Quel plan y répond ?', pl, 'plan')
          + ecrit(plan_ecrit) + suiv('Étape 3 · L’analyse →') + '</section>')
    e3 = (f'<section class="etape" id="etape-preuve"><h3>Étape 3 · L’analyse</h3>{comment(3)}<div class="etape-niveau">Je choisis, sur ce texte</div>{direct}'
          + q(1, 1, 'l’analyse', 'Quelle phrase analyse le mieux ce passage ?', an, 'ana', f'<p class="etape-passage">{D.PASSAGE[k]}</p>')
          + ecrit(zone('Une analyse', f'Analysez en une phrase ce passage : les mots du texte, le procédé, son effet ici. <span class="etape-passage" style="display:block">{D.PASSAGE[autre]}</span>', 'analyse', f'<p>{D.OK[autre][2]}</p>'))
          + suiv('Étape 4 · Le commentaire entier →') + '</section>')
    e4 = (f'<section class="etape" id="etape-copie"><h3>Étape 4 · Le commentaire entier</h3>{comment(4)}'
          f'<p>Rédigez maintenant le commentaire entier de ce texte. Vous pourrez ensuite le comparer au commentaire à 20.</p>'
          + zone('Votre commentaire', f'Texte : {titre_page(k)}', 'redaction', '', 'Introduction…\n\nPremière partie…')
          + '<div class="etape-fin"><a class="btn red small" href="#copie">Comparer avec le commentaire à 20 →</a></div></section>')
    nav = ''.join(f'<button type="button" data-etape="{i}">{t}</button>' for i, t in enumerate(['1 · Le problème', '2 · Le plan', '3 · L’analyse', '4 · Le commentaire entier']))
    return (f'<p class="micro">D’abord au clic, chaque proposition expliquée ; puis à l’écrit, sur un autre texte.</p>'
            f'<div data-etapes><div class="etapes-nav" role="group" aria-label="Étapes">{nav}</div>{e1}{e2}{e3}{e4}</div>')

TITRES, PROB = {}, {}
def titre_page(k): return TITRES[k]

def transforme(k):
    p = f'{R}/{k}.html'; h = open(p, encoding='utf8').read()
    if 'data-onglets' in h:
        i = h.index('<!-- etapes:debut -->') + len('<!-- etapes:debut -->'); j = h.index('<!-- etapes:fin -->')
        return h[:i] + '{ETAPES}' + h[j:]
    ateliers(k, h)
    pf = re.search(r'<section class="path-free">(.*?)</section>(?=\s*<section data-premium)', h, re.S)
    assert pf, k
    texte = re.sub(r'<section class="workbench">.*?</section>', '', pf.group(1), flags=re.S).strip()
    i = pf.start(); j = h.index('</main>'); copie = h[pf.end():j].strip()
    barre = ('<div class="onglets-barre" role="tablist" aria-label="Ce texte"><button role="tab" aria-controls="texte"><b>Le texte</b><small>Et le sujet</small></button>'
             '<button role="tab" aria-controls="entrainement"><b>S’entraîner</b><small>Quatre étapes</small></button>'
             '<button role="tab" aria-controls="copie"><b>Le commentaire à 20</b><small>Phrase par phrase</small></button></div>')
    body = (f'<div class="onglets" data-onglets data-defaut="entrainement">\n{barre}\n'
            f'<section class="onglet path-free" id="texte">{texte}</section>\n'
            f'<section class="onglet offer-band" id="entrainement"><!-- etapes:debut -->{{ETAPES}}<!-- etapes:fin --></section>\n'
            f'<section class="onglet" id="copie">{copie}</section>\n</div>\n')
    h = h[:i] + body + h[j:]
    h = h.replace('<script src="site-nav.js">', '<script src="onglets.js"></script><script src="etapes.js"></script><script src="site-nav.js">', 1)
    return h

pages = list(D.E)
for k in pages:
    h = open(f'{R}/{k}.html', encoding='utf8').read()
    TITRES[k] = plain(re.search(r'<h1>(.*?)</h1>', h, re.S).group(1).replace('<br>', ', '))
    PROB[k] = re.search(r'data-f="Problématique">(?:<span[^>]*>)?(?:<strong>)?(.*?)(?:</strong>)?</span>', h, re.S).group(1)
out = {k: transforme(k) for k in pages}
json.dump(AT, open(ATELIERS, 'w'), ensure_ascii=False, indent=1)
for k in pages:
    autre = D.AUTRE[k]
    h = out[k].replace('{ETAPES}', etapes(k, TITRES[autre], AT[autre]))
    open(f'{R}/{k}.html', 'w', encoding='utf8').write(h)
    print(k, '→ autre texte :', autre)
