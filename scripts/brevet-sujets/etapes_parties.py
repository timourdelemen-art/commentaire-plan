"""Étapes progressives des pages de partie du brevet (onglet « S’entraîner ») : compréhension, grammaire, réécriture.
Une étape = un geste (docs/protocole-brevet.md, § 8) : au clic sur une vraie question d’annale, puis à l’écrit sur une autre.
Textes : Zola, « Une cage de bêtes féroces » (DNB 2026, centres étrangers) ; La Fontaine, « Le Lion et le Moucheron » (DNB 2022, métropole).
Option : (texte, verdict ok|def|no, pourquoi). La réponse solide n’est pas la plus longue dans plus de la moitié des questions."""

Z = 'Zola, « Une cage de bêtes féroces » (brevet 2026)'
LF = 'La Fontaine, « Le Lion et le Moucheron » (brevet 2022)'

PAGES = {
 'brevet-comprehension.html': dict(kind='brevet-comprehension', annale='brevet-2026-general-zola-cage-betes-feroces.html',
  retours=[('annales/entrainement-annale.html?id=brevet-2026-general-zola-cage-betes-feroces&amp;mode=targeted&amp;step=q3a', 'Zola, question 3a : « la cage des hommes »'),
           ('annales/entrainement-annale.html?id=brevet-2026-general-zola-cage-betes-feroces&amp;mode=targeted&amp;step=q5', 'Zola, question 5 : le point de vue des animaux'),
           ('annales/entrainement-annale.html?id=brevet-2022-metropole-general-la-fontaine-lion-moucheron&amp;mode=targeted&amp;step=q4', 'La Fontaine, question 4 : le retournement')],
  etapes=[
  dict(id='etape-rediger', titre='Rédiger une réponse complète',
   geste='Une réponse de brevet se rédige : une idée qui reprend la question, une citation courte avec sa ligne, une explication.',
   questions=[
    (f'{Z}, question 2b : « Que ressent la Hyène après cette proposition ? Justifiez par le texte. »', 'Quelle réponse obtient tous les points ?', [
     ('Elle a peur : « la Hyène avait décidément peur » (l. 24). Le mot « décidément » montre que sa crainte grandit.', 'ok', 'Une idée, une citation avec sa ligne, une explication : les trois éléments sont là.'),
     ('Peur. « avait décidément peur »', 'no', 'La réponse n’est pas rédigée, et la citation n’est ni située ni expliquée : le corrigé officiel retire des points aux réponses non rédigées.'),
     ('La Hyène ressent de la peur, car elle comprend que la ville est dangereuse et qu’ils risquent beaucoup en y allant, ce qui est logique.', 'def', 'Le sentiment est juste, mais aucune citation ne le prouve : il manque le point de la justification.')]),
   ],
   ecrit=dict(source=LF, question='Question 1b : « Quelle réaction ce propos déclenche-t-il, et pourquoi ? » (vers 1 à 8)',
    consigne='Rédigez la réponse : la réaction, une citation avec son vers, puis la raison.',
    corrige='Le Moucheron réagit en déclarant la guerre au Lion : « L’autre lui déclara la guerre » (v. 4). Il est vexé d’avoir été traité de « chétif insecte » (v. 1) et veut montrer qu’il n’a pas peur du roi.')),
  dict(id='etape-citer', titre='Choisir la citation qui prouve',
   geste='Une citation prouve quand elle contient le mot qui répond à la question. Courte, exacte, entre guillemets, avec sa ligne.',
   questions=[
    (f'{Z}, question 2a : le Lion veut aller voir les hommes. Première raison : il veut inverser les rôles.', 'Quelle citation prouve cette raison ?', [
     ('« comme des imbéciles » (l. 12)', 'def', 'Elle montre son mépris pour les visiteurs, mais pas encore l’inversion des rôles.'),
     ('« aller les regarder dans la leur » (l. 13)', 'ok', 'Les hommes, qui regardent d’habitude, deviennent ceux qu’on regarde : c’est l’inversion.'),
     ('« Le Jardin ne tarda pas à les ennuyer » (l. 8-9)', 'no', 'Cette citation prouve une autre raison, l’ennui, pas l’inversion des rôles.')]),
   ],
   ecrit=dict(source=LF, question='Question 2a : « Quel animal domine le combat ? Justifiez en relevant trois expressions. » (vers 9 à 29)',
    consigne='Répondez en une phrase, puis relevez trois expressions différentes, chacune avec son vers.',
    corrige='C’est le Moucheron qui domine le combat. Il rend le Lion « presque fou » (v. 14) ; il « en cent lieux le harcelle » (v. 19) ; « L’invisible ennemi triomphe » (v. 23).')),
  dict(id='etape-procede', titre='Nommer un procédé et dire son effet',
   geste='Le procédé se nomme simplement (comparaison, énumération, personnification…). Puis on dit son effet ici, dans ce passage.',
   questions=[
    (f'{Z}, question 4 : « Comment le narrateur retranscrit-il le bruit ? » Passage : « Paris, qui s’éveillait, se mit à rugir » (l. 16).', 'Quelle analyse convient ?', [
     ('C’est une personnification : la ville rugit comme une bête, le bruit devient une menace.', 'ok', 'Le procédé est nommé, l’effet est précis et relié à la question du bruit.'),
     ('Il y a une figure de style dans cette phrase, avec le verbe « rugir ».', 'no', 'Le procédé n’est pas nommé et l’effet manque : la réponse n’explique rien.'),
     ('C’est une personnification, puisque Paris, qui est une ville, fait une action d’être vivant en rugissant.', 'def', 'Le procédé est juste, mais l’effet sur le lecteur manque : pourquoi un rugissement ?')]),
   ],
   ecrit=dict(source=LF, question='Question 2c : « Comment le fabuliste met-il en évidence le mouvement et l’agitation du combat ? » (vers 9 à 29)',
    consigne='Choisissez un élément : nommez-le, citez-le avec son vers, puis dites son effet.',
    corrige='L’adverbe « Tantôt », répété trois fois (v. 20-21), montre des attaques rapides qui se succèdent sans fin : le Lion est piqué partout à la fois.')),
  dict(id='etape-interpreter', titre='Interpréter : dire ce que le texte fait comprendre',
   geste='Interpréter, c’est aller au-delà de ce qui est raconté, sans quitter le texte : une idée, puis la preuve.',
   questions=[
    (f'{Z}, question 5 : « Quel est l’intérêt pour l’auteur d’adopter le point de vue des animaux ? »', 'Quel argument répond à la question ?', [
     ('Les animaux sont des personnages qui parlent, comme dans une fable.', 'no', 'C’est une observation sur la forme, pas un intérêt : la question demande ce que ce choix permet.'),
     ('Faire voir les hommes autrement : vus par les animaux, ils semblent sauvages, « ils s’égorgent pour sûr dans leur cage » (l. 20).', 'ok', 'Une idée qui répond au « pourquoi », prouvée par une citation située.'),
     ('Faire rire le lecteur, car c’est drôle de voir un lion et une hyène se promener dans Paris.', 'def', 'L’idée peut se défendre, mais elle n’est pas prouvée par le texte et reste vague.')]),
   ],
   ecrit=dict(source=LF, question='Question 6 : « Comment comprenez-vous les deux enseignements que le fabuliste donne au lecteur ? » (vers 35 à 39)',
    consigne='Reformulez le premier enseignement avec vos mots, puis montrez à quel moment de la fable il correspond.',
    corrige='Premier enseignement : il ne faut pas mépriser un adversaire faible, car « Les plus à craindre sont souvent les plus petits » (v. 37). Le Lion, qui traitait le Moucheron de « chétif insecte » (v. 1), a été vaincu par lui.')),
 ]),
 'brevet-grammaire.html': dict(kind='brevet-grammaire', annale='brevet-2022-metropole-general-la-fontaine-lion-moucheron.html', etapes=[
  dict(id='etape-fonction', titre='Nature et fonction, prouvées par un test',
   geste='Une fonction se prouve par une manipulation : supprimer, déplacer, remplacer, pronominaliser.',
   questions=[
    (f'{Z}, question 7 : « Un matin, un Lion et une Hyène du Jardin des Plantes réussirent à ouvrir la porte de leur cage. » (l. 1-2)', 'Quelle réponse est complète ?', [
     ('Groupe nominal, complément circonstanciel de temps : on peut le supprimer et le déplacer.', 'ok', 'La nature, la fonction et deux tests qui la prouvent.'),
     ('Complément circonstanciel de temps, car il indique le moment où se passe l’action du récit.', 'def', 'La fonction est juste, mais la nature manque, et le sens ne remplace pas un test.'),
     ('Groupe nominal sujet, car il est placé au début de la phrase, avant le verbe.', 'no', 'Le sujet de « réussirent » est « un Lion et une Hyène » ; la place ne prouve pas la fonction.')]),
   ],
   ecrit=dict(source=LF, question='Question 8 : « L’autre lui déclara la guerre » (vers 4)',
    consigne='Donnez la fonction de « la guerre », puis nommez et effectuez deux manipulations qui la prouvent.',
    corrige='« la guerre » est complément d’objet direct du verbe « déclara ». Pronominalisation : « L’autre la lui déclara ». Passage à la voix passive : « La guerre lui fut déclarée par l’autre » ; le COD devient sujet.')),
  dict(id='etape-propositions', titre='Les propositions et leur lien',
   geste='Un verbe conjugué, une proposition. On les délimite, on les nomme, on dit comment elles sont reliées.',
   questions=[
    (f'{LF}, question 9 : « Il rugit ; on se cache » (v. 16) devient une phrase complexe avec une subordonnée.', 'Quelle transformation est juste ?', [
     ('« Il rugit et on se cache. »', 'no', 'Les deux propositions sont coordonnées par « et » : il n’y a toujours pas de subordonnée.'),
     ('« Quand il rugit, on se cache. »', 'ok', 'Une subordonnée circonstancielle de temps, introduite par « quand », dépend de « on se cache ».'),
     ('« Il rugit, ce qui fait qu’on se cache partout autour de lui. »', 'def', 'La phrase contient bien des subordonnées, mais elle ajoute du sens au texte : une transformation garde les mots du passage.')]),
   ],
   ecrit=dict(source=Z, question='« Ils se rencontrèrent au fond d’une allée, et, après les politesses d’usage, ils se mirent à marcher de compagnie. »',
    consigne='Délimitez les propositions entre crochets, dites combien il y en a, puis comment elles sont reliées.',
    corrige='[Ils se rencontrèrent au fond d’une allée], et, [après les politesses d’usage, ils se mirent à marcher de compagnie]. Deux verbes conjugués, donc deux propositions indépendantes, coordonnées par « et ».')),
  dict(id='etape-mots', titre='La formation d’un mot',
   geste='Un mot se découpe : préfixe, radical, suffixe. Chaque élément a un sens, qui donne la définition.',
   questions=[
    (f'{Z}, question 9 : « Les deux honnêtes animaux […] se promenèrent avec lenteur » (l. 5-6).', 'Comment est formé « lenteur » ?', [
     ('L’adjectif « lent » et le suffixe « -eur », qui forme un nom.', 'ok', 'Le radical et le suffixe sont nommés, avec le rôle du suffixe.'),
     ('Un préfixe « len- » et un radical « -teur ».', 'no', 'Le mot vient de « lent » : il n’y a pas de préfixe.'),
     ('C’est un nom dérivé de « lent ».', 'def', 'Juste, mais incomplet : le suffixe n’est pas nommé.')]),
   ],
   ecrit=dict(source=LF, question='Question 10 : « L’invisible ennemi » (vers 23)',
    consigne='Découpez « invisible » en éléments, nommez-les, puis donnez sa définition à partir de ces éléments.',
    corrige='Préfixe « in- » (le contraire), radical « vis- » (voir), suffixe « -ible » (que l’on peut). « invisible » : que l’on ne peut pas voir.')),
  dict(id='etape-temps', titre='Le temps d’un verbe et sa valeur',
   geste='On nomme le temps, puis on dit à quoi il sert dans ce passage : sa valeur.',
   questions=[
    (f'{Z}, question 8 : « Alors ils se demandèrent à quels amusements ils pourraient consacrer leur journée. » (l. 9-10)', 'Quelle est la valeur de « pourraient » ?', [
     ('Un futur dans le passé : le récit est au passé, et l’action est encore à venir.', 'ok', 'Le conditionnel exprime ici l’avenir vu depuis le passé.'),
     ('Un conditionnel de politesse.', 'no', 'Personne n’est poli ici : les animaux se posent une question sur leur journée.'),
     ('Une possibilité.', 'def', 'Une nuance acceptée, mais la valeur principale est le futur dans le passé.')]),
   ],
   ecrit=dict(source=LF, question='« Dans l’abord il se met au large ; / Puis prend son temps, fond sur le cou / Du Lion » (v. 12-14)',
    consigne='Donnez le temps des verbes « se met », « prend », « fond », puis leur valeur dans ce récit.',
    corrige='Ils sont au présent de l’indicatif. Dans un récit commencé au passé (« sonna », v. 10), c’est un présent de narration : il rend le combat plus vivant, comme s’il se passait sous nos yeux.')),
 ]),
 'brevet-reecriture.html': dict(kind='brevet-reecriture', annale='brevet-2026-general-zola-cage-betes-feroces.html', etapes=[
  dict(id='etape-reperer', titre='Repérer tout ce qui change',
   geste='Avant de réécrire, on entoure tous les mots qui dépendent du changement : verbes, déterminants, pronoms, adjectifs, participes.',
   questions=[
    (f'{LF}, question 11 : remplacer « Le malheureux Lion » par « Les malheureux Lions » dans « Le malheureux Lion se déchire lui-même, / Fait résonner sa queue à l’entour de ses flancs ».', 'Quels mots changent ?', [
     ('« se déchirent », « eux-mêmes », « Font », « leur queue », « leurs flancs ».', 'ok', 'Les verbes, le pronom renforcé et les possessifs suivent le nouveau sujet.'),
     ('Seulement les verbes : « se déchirent » et « Font ».', 'def', 'Les verbes sont justes, mais « lui-même » et les possessifs doivent aussi passer au pluriel.'),
     ('« Le » et « Lion » seulement : la consigne ne demande de changer que le groupe sujet du premier vers.', 'no', 'Un changement en entraîne d’autres : c’est tout l’enjeu de la réécriture.')]),
   ],
   ecrit=dict(source=Z, question='Question 10 : « La clameur de la ville montait, sourde et menaçante, et cette clameur, faite du bruit des voitures, […] ressemblait à des hurlements de fureur » (l. 17-19)',
    consigne='Réécrivez ce passage en remplaçant « la clameur » par « les clameurs » et en mettant les verbes au présent de l’indicatif.',
    corrige='« Les clameurs de la ville montent, sourdes et menaçantes, et ces clameurs, faites du bruit des voitures, […] ressemblent à des hurlements de fureur. » Les adjectifs et le participe « faite » s’accordent avec « clameurs ».')),
  dict(id='etape-pieges', titre='Les pièges : ce qui change, ce qui ne change pas',
   geste='Un participe passé ou un adjectif s’accorde avec le mot dont il dépend ; un participe présent ne s’accorde jamais.',
   questions=[
    (f'{Z} : « la Hyène s’arrêta court, écoutant avec inquiétude » (l. 16-17). Consigne : remplacer « la Hyène » par « les Hyènes ».', 'Quelle réécriture est juste ?', [
     ('« les Hyènes s’arrêtèrent court, écoutant avec inquiétude »', 'ok', 'Le verbe s’accorde ; « écoutant », participe présent, reste invariable.'),
     ('« les Hyènes s’arrêtèrent courtes, toutes deux écoutantes avec inquiétude »', 'no', '« court » est ici un adverbe (s’arrêter net) et « écoutant » un participe présent : aucun des deux ne s’accorde.'),
     ('« les Hyènes s’arrêta court, écoutant avec inquiétude »', 'def', 'Le participe présent est bien invariable, mais le verbe doit s’accorder : « s’arrêtèrent ».')]),
   ],
   ecrit=dict(source=Z, question='« Le bruit croissait et la Hyène avait décidément peur. » (l. 24)',
    consigne='Réécrivez la phrase en remplaçant « la Hyène » par « les Hyènes » et en mettant les verbes au présent.',
    corrige='« Le bruit croît et les Hyènes ont décidément peur. » « croît » garde son accent circonflexe au présent ; seul le second verbe s’accorde avec « les Hyènes ».')),
 ]),
}
