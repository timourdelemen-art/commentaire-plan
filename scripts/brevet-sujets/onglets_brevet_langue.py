#!/usr/bin/env python3
"""Compréhension, grammaire, réécriture du brevet : trois onglets (La méthode / S'entraîner / Les annales).

S'entraîner : chaque exercice devient une étape ; d'abord au clic sur une phrase, chaque proposition
expliquée (Solide, Défendable, À revoir), puis l'exercice écrit d'origine, sur une autre phrase.
Rien n'est retiré : le texte des pages est repris tel quel. Script à n'exécuter qu'une fois
(il refuse une page déjà en onglets).
Usage : python3 -I scripts/brevet-sujets/onglets_brevet_langue.py
"""
import html, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def q(n, total, quote, question, opts):
    b = ''.join(f'<button type="button" class="chaine-opt" data-v="{v}" data-why="{html.escape(w, quote=True)}">{html.escape(t)}</button>' for t, v, w in opts)
    qt = f'<p class="quote">{quote}</p>' if quote else ''
    return (f'<div class="etape-q"><div class="chaine-num">Je choisis · question {n} sur {total}</div>{qt}'
            f'<p class="chaine-q">{question}</p><div class="chaine-opts">{b}</div><div class="chaine-fb" aria-live="polite"></div></div>')


DIRECT = '<button type="button" class="etape-direct" hidden>Je sais déjà faire : passer à l’écrit →</button>'

PAGES = {
 'brevet-comprehension.html': {
  'etapes': [
   ('observation', 'Étape 1 · Observer, puis interpréter', [
     ('« Elle posa la lettre sans l’ouvrir, puis regarda longtemps par la fenêtre. »', 'Laquelle de ces phrases est une observation ?', [
       ('Elle pose la lettre fermée, puis regarde dehors un long moment.', 'ok', 'Elle dit ce que fait le personnage, sans rien ajouter.'),
       ('Elle a peur de ce que contient la lettre, alors elle évite de la lire.', 'no', 'C’est déjà une interprétation : le texte ne parle pas de peur.'),
       ('Elle ne lit pas la lettre tout de suite.', 'def', 'Exact, mais incomplet : la seconde action manque.')]),
     (None, 'Quelle interprétation est prouvée par le texte ?', [
       ('Elle hésite : « sans l’ouvrir » et « longtemps » montrent qu’elle retarde la lecture.', 'ok', 'Une idée, puis deux mots du texte qui la prouvent.'),
       ('Elle est sans doute inquiète, puisqu’elle regarde par la fenêtre.', 'def', 'Possible, mais regarder par la fenêtre ne prouve pas l’inquiétude ; « sans l’ouvrir » serait un meilleur indice.'),
       ('Elle attend le retour de son fiancé, parti depuis des mois.', 'no', 'Rien de cela n’est dans le texte : une interprétation s’appuie sur ses mots.')])],
    'Sur une autre phrase, faites seul la même chose : observer, puis interpréter avec un indice.'),
   ('exercice-pourtant', 'Étape 2 · Comprendre un point de vue', [
     ('« Les invités trouvèrent le spectacle magnifique ; au dernier rang, le petit Paul bâillait. »', 'Que montre l’opposition entre les invités et Paul ?', [
       ('Le même spectacle plaît aux adultes et ennuie l’enfant.', 'ok', 'Deux points de vue sur la même chose : c’est ce que la phrase oppose.'),
       ('Paul est fatigué, parce que le spectacle finit tard le soir.', 'def', '« bâillait » peut dire la fatigue, mais la phrase oppose surtout deux réactions au spectacle.'),
       ('Le spectacle était magnifique, et tout le monde l’a aimé.', 'no', 'Paul bâille : pour lui, le texte dit le contraire.')]),
     (None, 'Quel indice prouve le mieux cette lecture ?', [
       ('« bâillait », qui s’oppose à « magnifique ».', 'ok', 'Les deux mots mis face à face prouvent les deux points de vue.'),
       ('« au dernier rang » : Paul voit mal la scène, il se lasse vite.', 'def', 'La place peut expliquer l’ennui, mais l’indice le plus net est le verbe.'),
       ('« les invités », car ce sont eux qui comptent dans la phrase.', 'no', 'Ce mot ne dit rien de la réaction de Paul.')])],
    'Sur un autre petit texte, faites seul la même chose : un point de vue, puis l’indice qui le prouve.'),
  ],
  'methode': ['sequence', 'method-section'],
 },
 'brevet-grammaire.html': {
  'etapes': [
   ('exercice-manipulation', 'Étape 1 · Prouver une fonction par un test', [
     ('« Les élèves que le professeur interroge répondent avec précision. »', 'Comment pouvez-vous vérifier la fonction de « que » dans la proposition relative ?', 'QCM'),
     (None, 'Quelle est donc la fonction de « que » ?', [
       ('COD du verbe « interroge ».', 'ok', '« le professeur interroge les élèves » : « les élèves », donc « que », est COD.'),
       ('Complément du nom « élèves », comme toute la relative.', 'def', 'C’est la relative entière qui complète « élèves » ; à l’intérieur, « que » est COD.'),
       ('Sujet du verbe « interroge ».', 'no', 'Le sujet de « interroge » est « le professeur ».')])],
    'Sur une autre phrase, faites seul le même test.'),
  ],
  'methode': ['manip-grid', 'offer-band'],
  'ecrit': ('« Le roman que ma sœur m’a prêté est passionnant. »',
            'Quelle est la fonction de « que » ? Donnez la réponse, puis le test qui la prouve, en deux phrases.',
            'Brevet, grammaire. Phrase : « Le roman que ma sœur m’a prêté est passionnant. » Attendu : « que » est COD du verbe « a prêté » ; preuve par remplacement : « ma sœur m’a prêté le roman ». Signalez un seul manque (fonction ou test), sans donner la réponse. Vouvoyez l’élève.',
            '<p>« que » reprend « le roman ». En le remplaçant par ce nom, on obtient : « ma sœur m’a prêté le roman ». « le roman » est COD de « a prêté » : « que » est donc COD.</p>'),
 },
 'brevet-reecriture.html': {
  'etapes': [
   ('exercice-reecriture', 'Étape 1 · Un changement, plusieurs conséquences', [
     ('« Il est arrivé tard et s’est assis près de la fenêtre. » Consigne : remplacez « il » par « elles ».', 'Quels mots changent ?', [
       ('Le pronom, « s’ », les deux auxiliaires et les deux participes.', 'ok', 'Avec « être », le participe s’accorde avec le sujet : « arrivées », « assises ».'),
       ('Le pronom et les deux auxiliaires : « est » devient « sont ».', 'def', 'Vous oubliez « s’ », qui devient « se », et l’accord des deux participes.'),
       ('Seulement « il », puisque la consigne ne parle que de lui.', 'no', 'Un changement en entraîne d’autres : c’est tout l’enjeu de l’exercice.')]),
     (None, 'Quelle réécriture est juste ?', [
       ('« Elles sont arrivées tard et se sont assises près de la fenêtre. »', 'ok', 'Tous les mots liés au sujet sont accordés.'),
       ('« Elles sont arrivées tard et se sont assis près de la fenêtre. »', 'def', 'Un oubli : « assises », participe accordé avec « elles ».'),
       ('« Elles sont arrivé tard et s’est assises près de la fenêtre. »', 'no', 'Plusieurs oublis : « arrivées », « se », « sont ».')])],
    'Sur une autre phrase, faites seul la même réécriture.'),
  ],
  'methode': ['sequence', 'offer-band'],
 },
}


def sections(main):
    """Les sections de premier niveau de <main>, dans l'ordre."""
    out, i = [], 0
    while True:
        a = main.find('<section', i)
        if a < 0:
            return out
        depth, j = 0, a
        while True:
            o, c = main.find('<section', j + 1), main.find('</section>', j + 1)
            if o != -1 and o < c:
                depth += 1; j = o
            else:
                if depth == 0:
                    end = c + len('</section>'); break
                depth -= 1; j = c
        out.append(main[a:end]); i = end


def cls(sec):
    return re.match(r'<section class="([^"]+)"', sec).group(1)


def transforme(name, P):
    path = os.path.join(ROOT, name)
    s = open(path, encoding='utf-8').read()
    assert 'data-onglets' not in s, f'{name} : déjà en onglets'
    m0, m1 = s.index('>', s.index('<main')) + 1, s.index('</main>')
    main = s[m0:m1]
    secs = sections(main)
    head = main[:main.index(secs[1])]  # tout jusqu'à la première section après l'en-tête
    by = {}
    for sec in secs[1:]:
        by.setdefault(cls(sec).split()[0], []).append(sec)
    methode = ''.join(sec for k in P['methode'] for sec in by.pop(k))
    exos = by.pop('exercise-wrap'); bank = ''.join(by.pop('brevet-bank-section'))
    assert not by, by
    etapes = []
    for n, (ident, titre, questions, consigne) in enumerate(P['etapes']):
        ex = next(e for e in exos if f'id="{ident}"' in e)
        inner = ex[ex.index('>') + 1:ex.rindex('</section>')]
        qs = []
        for k, (quote, question, opts) in enumerate(questions):
            if opts == 'QCM':  # la question au clic déjà présente dans la page, reprise telle quelle
                bloc = re.search(r'<div class="exercise brevet-qcm">.*?</div>\s*</div>', inner, re.S).group(0)
                inner = inner.replace(bloc, '')
                b = re.findall(r'<button type="button" class="chaine-opt" data-state="(\w+)" data-why="([^"]*)">(?:[A-C]\. )?(.*?)</button>', bloc)
                opts = [(html.unescape(t), v, html.unescape(w)) for v, w, t in b]
                assert len(opts) == 3
            qs.append(q(k + 1, len(questions), quote, question, opts))
        if 'ecrit' in P and n == 0:
            qt, cons, ia, corr = P['ecrit']
            inner += (f'<div class="exercise"><p class="quote">{qt}</p><p class="instruction"><strong>Question :</strong> {cons}</p>'
                      f'<textarea class="exam-writing-area" rows="4" data-feedback-kind="brevet-grammaire" data-feedback-instruction="{html.escape(ia, quote=True)}"></textarea>'
                      f'<details class="correction"><summary>Comparer avec une réponse possible</summary>{corr}</details></div>')
        suiv = (f'<div class="etape-fin"><button type="button" class="btn red small etape-suivante">{P["etapes"][n + 1][1]} →</button></div>'
                if n + 1 < len(P['etapes']) else '<div class="etape-fin"><a class="btn red small" href="#annales">Les questions des annales →</a></div>')
        etapes.append(f'<section class="etape" id="{ident}"><h3>{titre}</h3><div class="etape-niveau">Je choisis</div>{DIRECT}{"".join(qs)}'
                      f'<div class="etape-ecrit"><div class="etape-niveau">J’écris, sur une autre phrase</div><p>{consigne}</p>{inner}</div>{suiv}</section>')
    nav = ''.join(f'<button type="button" data-etape="{i}">{t.replace("Étape ", "")}</button>' for i, (_, t, _, _) in enumerate(P['etapes']))
    n_et = len(P['etapes'])
    corps = (f'<div class="onglets" data-onglets data-defaut="entrainement">\n'
             f'<div class="onglets-barre" role="tablist" aria-label="Cette page"><button role="tab" aria-controls="methode"><b>La méthode</b><small>En bref</small></button>'
             f'<button role="tab" aria-controls="entrainement"><b>S’entraîner</b><small>{"Une étape" if n_et == 1 else f"{n_et} étapes"}</small></button>'
             f'<button role="tab" aria-controls="annales"><b>Les annales</b><small>Vraies questions</small></button></div>\n'
             f'<div class="onglet" id="methode">\n{methode}\n</div>\n'
             f'<section class="onglet exercise-wrap" id="entrainement"><p class="micro">D’abord au clic, chaque proposition expliquée ; puis à l’écrit, sur une autre phrase.</p>'
             f'<div data-etapes>' + (f'<div class="etapes-nav" role="group" aria-label="Étapes">{nav}</div>' if n_et > 1 else '') + f'\n{"".join(etapes)}</div></section>\n'
             f'<div class="onglet" id="annales">\n{bank}\n</div>\n</div>')
    s = s[:m0] + head + corps + s[m1:]
    s = s.replace('<script src="brevet-targeted.js"></script>', '<script src="brevet-targeted.js"></script><script src="etapes.js"></script>', 1)
    open(path, 'w', encoding='utf-8').write(s)
    print(name, ':', n_et, 'étape(s)')


if __name__ == '__main__':
    for name, P in PAGES.items():
        transforme(name, P)
