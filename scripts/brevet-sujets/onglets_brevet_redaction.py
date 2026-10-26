#!/usr/bin/env python3
"""Méthodes de rédaction du brevet (réflexion, imagination) : trois onglets.

La méthode (parcours, gestes, critères officiels) / S'entraîner (chaque exercice devient une étape :
au clic sur un autre sujet, chaque proposition expliquée, puis l'exercice écrit d'origine) / Les modèles.
Le texte des pages est repris tel quel. Script à n'exécuter qu'une fois.
Usage : python3 -I scripts/brevet-sujets/onglets_brevet_redaction.py
"""
import html, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
from onglets_brevet_langue import q, sections, DIRECT  # noqa: E402

S2019 = 'Sujet de 2019 : « Que peut vous apporter la découverte de la vie de personnages fictifs ou réels ? »'
PAGES = {
 'brevet-reflexion.html': {
  'methode': ['parcours', 'procedure-modes', 'official-scale'],
  'apres': [],
  'etapes': [
   ('ex-exemple', 'Étape 1 · L’exemple', None, [
     (f'{S2019} Argument : « Découvrir un personnage apprend à comprendre les autres. » Exemple : « Dans Les Misérables, on suit Jean Valjean, ancien forçat que tout le monde rejette. »',
      'Quelle phrase dit ce que cet exemple prouve ?', [
       ('En le suivant de près, on comprend qu’un homme rejeté peut changer : on juge moins vite.', 'ok', 'Elle relie l’exemple à l’argument : comprendre les autres.'),
       ('Jean Valjean est un personnage très attachant, qu’on n’oublie pas.', 'def', 'Elle dit l’effet du personnage, pas ce qu’il prouve pour l’argument.'),
       ('Victor Hugo a publié ce roman en 1862, après des années passées en exil.', 'no', 'Une information juste, mais sans rapport avec l’argument.')])]),
   ('ex-introduction', 'Étape 2 · L’introduction', 'introduction', [
     (S2019, 'Quelle introduction a les trois temps : une situation, la question, le chemin ?', [
       ('Une amie pleure à la fin d’un film sur une inconnue. Que peut nous apporter la vie de personnages ? D’abord un divertissement, puis une autre façon de voir les autres.', 'ok', 'Une situation concrète, la question, puis l’ordre de la réponse.'),
       ('Depuis toujours, les hommes aiment les histoires. Que peut nous apporter la découverte de personnages ? Nous verrons plusieurs réponses possibles à cette question.', 'def', 'La question est là, mais la situation est trop générale et le chemin trop vague.'),
       ('Je pense que les livres apportent beaucoup, et je vais le prouver.', 'no', 'Ni situation, ni question, ni chemin : la réponse arrive sans être préparée.')])]),
   ('ex-transition', 'Étape 3 · La transition', 'progression', [(None, 'Quelle transition placer entre le paragraphe 2 et le paragraphe 3 ?', 'QCM')]),
   ('ex-conclusion', 'Étape 4 · La conclusion', 'conclusion', [
     ('Sujet de 2026 : « Selon vous, les obstacles renforcent-ils la détermination des individus ? »', 'Quelle conclusion répond nettement, puis laisse une question ouverte ?', [
       ('Un obstacle fortifie donc la volonté, quand on sait pourquoi on se bat. Reste à savoir comment tenir avant de le savoir.', 'ok', 'Une réponse nette, avec sa condition, puis une question nouvelle.'),
       ('Les obstacles ont donc beaucoup d’effets sur la détermination des individus, dans la vie comme dans les livres.', 'def', 'Une réponse, mais vague, et aucune question ouverte.'),
       ('Pour conclure, chacun réagit à sa manière, et toutes les opinions se valent.', 'no', 'Ce n’est pas une réponse : la question du sujet reste sans réponse.')])]),
   ('refaire', 'Étape 5 · Seul, sur un autre sujet', None, None),
  ],
 },
 'brevet-imagination.html': {
  'methode': ['parcours', 'procedure-modes', 'official-scale'],
  'apres': ['redaction-imagination'],
  'etapes': [
   ('ex-contraintes', 'Étape 1 · Le contrat du sujet', None, [
     ('Consigne : « Imaginez la lettre que le narrateur écrit, le soir même, à son frère resté au village : il lui raconte sa première journée en ville et lui confie ses doutes. »',
      'Quelle liste respecte la consigne ?', [
       ('Une lettre du narrateur à son frère, ce soir-là : la journée racontée, puis ses doutes.', 'ok', 'Le genre, qui écrit, à qui, quand, et les deux choses à faire.'),
       ('Une lettre du narrateur à son frère : sa journée en ville, racontée en détail, du matin au soir.', 'def', 'Il manque les doutes, que la consigne impose.'),
       ('Un récit à la troisième personne de la journée du narrateur en ville.', 'no', 'Le genre et le narrateur ont changé : la consigne demande une lettre.')]),
     (None, 'Qu’est-ce qui reste libre ?', [
       ('Les événements de la journée, et la nature des doutes.', 'ok', 'La consigne impose de les raconter, pas de dire lesquels.'),
       ('Le ton de la lettre, à condition de rester celui d’un frère qui écrit à son frère.', 'def', 'En partie : le ton se choisit, mais il découle de la situation imposée.'),
       ('Le destinataire : on peut écrire à un ami plutôt qu’au frère.', 'no', 'Le frère est imposé par la consigne.')])]),
   ('ex-progression', 'Étape 2 · Le plan du récit', None, [
     ('La même consigne : la lettre du soir au frère resté au village.', 'Quel plan fait vraiment avancer l’histoire ?', [
       ('Arrivée perdu ; une rencontre qui aide ; le soir, un doute qui reste.', 'ok', 'À chaque étape, quelque chose change pour le narrateur.'),
       ('Le matin, le midi, l’après-midi, puis le soir : une activité différente à chaque moment.', 'def', 'L’ordre du temps est clair, mais rien ne change pour le narrateur.'),
       ('Une description de la ville, puis une description de sa chambre.', 'no', 'Rien n’arrive : ce n’est pas encore une histoire.')])]),
  ],
 },
}


def bloc(secs, cle):
    for s in secs:
        if f'id="{cle}"' in s[:200] or re.match(rf'<section class="{cle}[" ]', s):
            return s
    raise KeyError(cle)


def transforme(name, P):
    path = os.path.join(ROOT, name)
    s = open(path, encoding='utf-8').read()
    assert 'data-onglets' not in s, f'{name} : déjà en onglets'
    m0, m1 = s.index('>', s.index('<main')) + 1, s.index('</main>')
    main = s[m0:m1]
    secs = sections(main)
    pris = set()
    def prends(cle):
        b = bloc(secs, cle); pris.add(b); return b
    head = main[:main.index(secs[1])]
    methode = ''.join(prends(k) for k in P['methode'])
    etapes = []
    for n, (ident, titre, meth, questions) in enumerate(P['etapes']):
        ex = prends(ident)
        inner = ex[ex.index('>') + 1:ex.rindex('</section>')]
        mt = prends(meth) if meth else ''
        if questions is None:
            corps = f'<section class="etape" id="{ident}"><h3>{titre}</h3>{mt}{inner}'
        else:
            qs = []
            for k, (quote, question, opts) in enumerate(questions):
                if opts == 'QCM':
                    b = re.search(r'<div class="exercise brevet-qcm">.*?</div>\s*</div>', inner, re.S).group(0)
                    inner = inner.replace(b, '')
                    found = re.findall(r'<button type="button" class="chaine-opt" data-state="(\w+)" data-why="([^"]*)">(?:[A-C]\. )?(.*?)</button>', b)
                    opts = [(html.unescape(t), v, html.unescape(w)) for v, w, t in found]
                    assert len(opts) == 3
                qs.append(q(k + 1, len(questions), quote, question, opts))
            corps = (f'<section class="etape" id="{ident}"><h3>{titre}</h3>{mt}<div class="etape-niveau">Je choisis</div>{DIRECT}{"".join(qs)}'
                     f'<div class="etape-ecrit"><div class="etape-niveau">J’écris</div>{inner}</div>')
        suiv = (f'<div class="etape-fin"><button type="button" class="btn red small etape-suivante">{P["etapes"][n + 1][1]} →</button></div>'
                if n + 1 < len(P['etapes']) else '')
        etapes.append(corps + suiv + '</section>')
    apres = ''.join(prends(k) for k in P['apres'])
    reste = [x for x in secs[1:] if x not in pris]
    nav = ''.join(f'<button type="button" data-etape="{i}">{t.replace("Étape ", "")}</button>' for i, (_, t, _, _) in enumerate(P['etapes']))
    n_et = len(P['etapes'])
    mod = 'brevet-reflexion-modele.html' if 'reflexion' in name else 'brevet-imagination-modele.html'
    cop = mod.replace('-modele', '-copies-20')
    modeles = (f'<section class="offer-band"><div class="kicker">LES MODÈLES</div><h2>Des copies à lire phrase par phrase.</h2>'
               f'<p><a href="{mod}">Deux modèles brefs, avec la fonction de chaque phrase →</a></p>'
               f'<p><a href="{cop}">Les copies à 20 sur des sujets officiels →</a></p>'
               f'<p><a href="brevet-redaction-sujets.html">Les 22 sujets officiels, chacun avec sa page d’entraînement →</a></p></section>')
    corps = (f'<div class="onglets" data-onglets data-defaut="entrainement">\n'
             f'<div class="onglets-barre" role="tablist" aria-label="Cette page"><button role="tab" aria-controls="methode"><b>La méthode</b><small>Les gestes</small></button>'
             f'<button role="tab" aria-controls="entrainement"><b>S’entraîner</b><small>{n_et} étapes</small></button>'
             f'<button role="tab" aria-controls="modeles"><b>Les modèles</b><small>Copies à 20</small></button></div>\n'
             f'<div class="onglet" id="methode">\n{methode}\n</div>\n'
             f'<section class="onglet exercise-wrap" id="entrainement"><p class="micro">Chaque étape : d’abord au clic, chaque proposition expliquée ; puis à l’écrit.</p>'
             f'<div data-etapes><div class="etapes-nav" role="group" aria-label="Étapes">{nav}</div>\n{"".join(etapes)}</div>\n{apres}</section>\n'
             f'<div class="onglet" id="modeles">\n{modeles}\n</div>\n</div>\n' + ''.join(reste))
    s = s[:m0] + head + corps + s[m1:]
    s = s.replace('<script src="site-nav.js"></script>', '<script src="etapes.js"></script><script src="site-nav.js"></script>', 1)
    open(path, 'w', encoding='utf-8').write(s)
    print(name, ':', n_et, 'étapes ;', len(reste), 'section(s) laissée(s) après les onglets')


if __name__ == '__main__':
    for name, P in PAGES.items():
        transforme(name, P)
