"""Corrigés des annales du brevet, au format des éléments de correction officiels (docs/protocole-brevet.md, § 3 à 5) :
réponse rédigée (idée, citation courte avec sa ligne, explication), répartition des points, autres réponses acceptées.
Le total de chaque question est celui du sujet officiel ; sa répartition est proposée par le site, sur le modèle des corrigés officiels de 2025.
Ils remplacent, question par question, la correction du catalogue (annales/catalogue-annales.js).
Lignes : celles du sujet officiel ; une fourchette (l. 8-9) quand la citation chevauche deux lignes ou que la ligne exacte n’a pu être vérifiée."""

CORRIGES = {
 'brevet-2026-general-zola-cage-betes-feroces': {
  'q1': dict(
   correction='Lignes 1 à 15 : « La promenade des animaux évadés. » Le Lion et la Hyène sortent de leur cage, puis ils « se promenèrent avec lenteur dans le Jardin » (l. 5-6) avant que le Lion ne propose « un bout de promenade dans la cage des hommes » (l. 14-15). '
              'Lignes 16 à la fin : « Des hommes en cage qui effraient les animaux. » Le bruit de Paris, qui « se mit à rugir » (l. 16), fait peur à la Hyène : « la Hyène avait décidément peur » (l. 24).',
   bareme='1 point par titre juste, 1 point par justification appuyée sur le texte.',
   hors_texte=('La promenade des animaux évadés', 'Des hommes en cage qui effraient les animaux', 'Une matinée paisible au Jardin des Plantes', 'Les hurlements des animaux', 'Les animaux attaquent des hommes'),
   accepte='Pour la première étape, « Une matinée paisible au Jardin des Plantes » est accepté s’il est justifié par le calme de la promenade (« les fraîcheurs tièdes du printemps naissant », l. 4-5). « Les hurlements des animaux » et « Les animaux attaquent des hommes » ne conviennent pas : ce sont les hommes qui hurlent, et personne n’est attaqué.'),
  'q2a': dict(
   correction='Le caprice du Lion est d’aller regarder les hommes chez eux : il propose « un bout de promenade dans la cage des hommes » (l. 14-15). '
              'Première raison : il veut inverser les rôles, car les hommes viennent « comme des imbéciles » (l. 12) le regarder dans sa cage. '
              'Deuxième raison : les deux animaux s’ennuient, « Le Jardin ne tarda pas à les ennuyer » (l. 8-9).',
   bareme='1 point pour le caprice, 1 point par raison justifiée.'),
  'q2b': dict(
   correction='La Hyène ressent de l’inquiétude, puis de la peur. Elle s’arrête « écoutant avec inquiétude » (l. 17), puis le texte le dit nettement : « la Hyène avait décidément peur » (l. 24).',
   bareme='1 point pour le sentiment, 1 point pour la citation.',
   accepte='La méfiance ou l’hésitation, justifiées par « Croyez-vous […] qu’il soit prudent de se hasarder là-dedans ? » (l. 25).'),
  'q3a': dict(
   correction='Le Lion parle de « la cage des hommes » parce qu’il inverse les rôles : pour lui, Paris enferme les hommes comme le zoo enferme les animaux. Il veut « aller les regarder dans la leur » (l. 13) : les hommes deviennent ceux qu’on observe.',
   bareme='2 points pour l’explication de l’inversion, 1 point pour la citation.'),
  'q3b': dict(
   correction='Premier exemple : la Hyène croit qu’« ils s’égorgent pour sûr dans leur cage » (l. 20) ; les hommes sont vus comme des fauves enfermés qui se battent. '
              'Deuxième exemple : le Lion suppose que « quelque dompteur les tourmente » (l. 22-23) ; les hommes deviennent des bêtes de cirque qu’on dresse.',
   bareme='2 points par exemple : 1 point pour la citation, 1 point pour l’explication.',
   accepte='« Ils doivent se mordre d’une belle façon » (l. 26-27) ; « Entendez-vous comme ils sont en colère et comme ils pleurent ? » (l. 20-21).'),
  'q4': dict(
   correction='Premier élément : une personnification. Paris « se mit à rugir » (l. 16) comme une bête : le bruit devient le cri d’un fauve, donc une menace. '
              'Deuxième élément : une énumération, « du bruit des voitures, des cris de la rue, de nos sanglots et de nos rires » (l. 18-19) ; elle accumule tous les bruits et fait entendre un vacarme où tout se mêle.',
   bareme='2 points par élément : 1 point pour le procédé nommé et cité, 1 point pour son effet.',
   accepte='La comparaison avec « des hurlements de fureur et […] des râles d’agonie » (l. 19) ; les adjectifs « sourde et menaçante » (l. 17), qui font du bruit un danger.'),
  'q5': dict(
   correction='Premier intérêt : faire voir les hommes autrement. Les animaux sont calmes et polis, ils se promènent « en braves gens » (l. 6-7), alors que les hommes semblent violents : « ils s’égorgent pour sûr dans leur cage » (l. 20). Vue par les animaux, la ville paraît sauvage : l’auteur critique la vie des hommes. '
              'Deuxième intérêt : amuser le lecteur, puis le viser. Le Lion juge que les visiteurs viennent « comme des imbéciles » (l. 12), ce qui fait sourire ; mais le narrateur parle « de nos sanglots et de nos rires » (l. 18-19) : le lecteur fait partie de ces hommes qu’on regarde.',
   bareme='3 points par argument : 1 point pour l’idée, 1 point pour l’exemple cité, 1 point pour l’explication.',
   accepte='Le regard naïf des animaux, qui rend étrange ce qui nous paraît normal ; la critique de l’enfermement des animaux au zoo.'),
  'q6': dict(
   correction='Point commun : le texte et le film reposent sur la même inversion. Chez Zola, les animaux veulent aller regarder les hommes dans « leur cage » ; dans <em>La Planète des singes</em>, ce sont les singes qui dominent et qui enferment les hommes. '
              'Différences : le texte est une courte fable qui fait sourire, les animaux restent au bord de la ville ; l’image montre une domination réelle et inquiétante. Pour chaque élément de l’image (les personnages, la place de chacun, les barreaux ou le décor, les regards), dites ce que vous voyez, puis comparez avec un passage du texte.',
   bareme='2 points par élément d’analyse de l’image relié au texte (trois éléments attendus).',
   accepte='Toute observation précise de l’image, si elle est comparée à un passage du texte.'),
  'q7a': dict(
   correction='« Un matin » est un groupe nominal, complément circonstanciel de temps du verbe « réussirent ».',
   bareme='1 point pour la nature, 1 point pour la fonction.'),
  'q7b': dict(
   correction='Suppression : « Un lion et une hyène […] réussirent à ouvrir la porte de leur cage » ; la phrase reste correcte, le groupe est donc facultatif. '
              'Déplacement : « Un lion et une hyène […] réussirent, un matin, à ouvrir la porte de leur cage » ; le groupe se déplace. Facultatif et mobile, il est complément circonstanciel.',
   bareme='1 point par manipulation nommée et effectuée.',
   accepte='Le remplacement par un adverbe de temps (« Un jour », « Hier ») ; la question « quand ? ».'),
  'q8a': dict(correction='« pourraient » est au conditionnel présent.', bareme='1 point.'),
  'q8b': dict(
   correction='C’est un futur dans le passé : au moment où ils se posent la question, les animaux diraient « À quels amusements pourrons-nous consacrer notre journée ? » ; raconté au passé, ce futur devient un conditionnel.',
   bareme='1 point.', accepte='La possibilité, l’éventualité : rien n’est encore décidé.'),
  'q9a': dict(correction='« lenteur » est formé de l’adjectif « lent » et du suffixe « -eur », qui forme un nom.', bareme='0,5 point pour le radical, 0,5 point pour le suffixe.'),
  'q9b': dict(correction='« lent », « lentement ».', bareme='0,5 point par mot.', accepte='« ralentir », « ralentissement », « lentement ».'),
  'q10': dict(
   correction='« À ce moment, Paris, qui <b>s’éveille</b>, <b>se met</b> à rugir d’une telle force que la Hyène <b>s’arrête</b> court, écoutant avec inquiétude. <b>Les clameurs</b> de la ville <b>montent</b>, <b>sourdes et menaçantes</b>, et <b>ces clameurs</b>, <b>faites</b> du bruit des voitures, des cris de la rue, de nos sanglots et de nos rires, <b>ressemblent</b> à des hurlements de fureur et à des râles d’agonie. »',
   bareme='1 point par forme correctement modifiée (en gras) ; -0,5 point par erreur de copie.',
   accepte='Les formes à modifier : trois verbes au présent (s’éveille, se met, s’arrête) ; « La clameur » et « cette clameur » au pluriel ; les deux verbes accordés (montent, ressemblent) ; les adjectifs et le participe qui s’accordent avec « clameurs » (sourdes, menaçantes, faites). « écoutant » ne change pas : un participe présent est invariable.'),
 },
 'brevet-2022-metropole-general-la-fontaine-lion-moucheron': {
  'q1a': dict(correction='Au vers 1, c’est le Lion qui parle : il s’adresse au Moucheron, comme le disent les vers 2 et 3 : « C’est en ces mots que le Lion / Parlait un jour au Moucheron ».',
   bareme='0,5 point pour le Lion, 0,5 point pour le Moucheron.'),
  'q1b': dict(correction='Le Moucheron réagit en déclarant la guerre au Lion : « L’autre lui déclara la guerre » (v. 4). Il est vexé par les insultes « chétif insecte, excrément de la terre » (v. 1) et veut montrer qu’il n’a pas peur du roi : « Penses-tu […] que ton titre de Roi / Me fasse peur » (v. 5-6).',
   bareme='1 point pour la réaction, 1 point pour la raison justifiée.'),
  'q2a': dict(correction='C’est le Moucheron qui domine le combat. Il rend le Lion « presque fou » (v. 14) ; il « en cent lieux le harcelle » (v. 19) ; et « L’invisible ennemi triomphe » (v. 23).',
   bareme='0,5 point pour l’animal, 0,5 point par expression.',
   accepte='« L’insecte du combat se retire avec gloire » (v. 30) ; « Est l’ouvrage d’un Moucheron » (v. 18).'),
  'q2b': dict(correction='Le Moucheron harcèle le Lion. Il s’éloigne d’abord (« Dans l’abord il se met au large », v. 12), puis attaque par surprise les endroits sensibles : « Tantôt pique l’échine, et tantôt le museau, / Tantôt entre au fond du naseau » (v. 20-21). '
              'Résultat : le Lion se blesse lui-même et s’épuise : il « se déchire lui-même » (v. 26), et sa fureur « Le fatigue, l’abat » (v. 29).',
   bareme='1 point pour la tactique, 1 point pour la citation, 1 point pour le résultat.'),
  'q2c': dict(correction='Les verbes d’action s’enchaînent au présent : le Moucheron « se met au large », « prend son temps, fond sur le cou » (v. 12-13), le Lion « écume », « rugit » (v. 15-16) ; le présent rend la scène vivante, comme si elle se passait sous nos yeux. '
              'L’adverbe « Tantôt », répété trois fois (v. 20-21), fait sentir des attaques rapides et sans fin. '
              'Le rythme est haché : au vers 16, « Il rugit ; on se cache, on tremble à l’environ », les propositions courtes, séparées par la ponctuation, imitent l’agitation ; et les vers courts alternent avec des vers longs, comme les élans du combat.',
   bareme='4 points : les verbes, les adverbes et le rythme, chacun cité et expliqué ; le quatrième point pour une explication précise.',
   accepte='L’accumulation des verbes aux vers 27 à 29 (« Fait résonner », « Bat l’air », « Le fatigue, l’abat ») ; le mot « universelle » (v. 17), qui étend l’agitation à tous les animaux.'),
  'q3': dict(correction='Le Lion est désigné par « Le quadrupède » (v. 15), « la bête irritée » (v. 24) et « Le malheureux Lion » (v. 26). Ces groupes nominaux ne l’appellent plus « Roi » : il devient une simple bête, puis un être à plaindre. Le fabuliste montre ainsi sa déchéance.',
   bareme='1 point pour les groupes nominaux, 2 points pour l’effet.'),
  'q4': dict(correction='Le vainqueur est vaincu à son tour : le Moucheron, qui « se retire avec gloire » (v. 30) et va « partout l’annoncer » (v. 32), tombe dans « L’embuscade d’une araignée » (v. 33) et « Il y rencontre aussi sa fin » (v. 34). Celui qui a battu le plus fort meurt à cause d’un ennemi plus petit que le Lion.',
   bareme='1 point pour le retournement, 1 point pour la justification.'),
  'q5': dict(correction='Le Lion et le Moucheron font preuve d’orgueil. Le Lion méprise le Moucheron, qu’il traite de « chétif insecte » (v. 1) : il se croit à l’abri parce qu’il est roi. Le Moucheron, vainqueur, se vante : « il sonne la victoire, / Va partout l’annoncer » (v. 31-32) ; trop occupé de sa gloire, il ne voit pas l’araignée.',
   bareme='1 point pour le défaut, 2 points pour chaque personnage (justification et citation).',
   accepte='Le mépris ou la vanité, s’ils sont justifiés pour les deux personnages.'),
  'q6': dict(correction='Premier enseignement : « entre nos ennemis / Les plus à craindre sont souvent les plus petits » (v. 36-37) ; il ne faut pas mépriser un adversaire faible, comme l’a fait le Lion. '
              'Second enseignement : « tel a pu se soustraire » aux « grands périls », « Qui périt pour la moindre affaire » (v. 38-39) ; on peut échapper à un grand danger et mourir d’un petit, comme le Moucheron, vainqueur du Lion et tué par une araignée.',
   bareme='2 points par enseignement : 1 point pour la reformulation, 1 point pour le lien avec la fable.'),
  'q7a': dict(correction='Observez sur l’illustration du sujet : l’attitude du Lion (gueule, griffes, queue, corps), ce qui montre sa rage ou sa douleur, et la place du Moucheron. Reliez chaque détail à un vers : le Lion « écume », « rugit » (v. 15-16), « se déchire lui-même » et « Fait résonner sa queue » (v. 26-27).',
   bareme='2 points par effet observé sur l’image et relié au texte (deux effets attendus).',
   accepte='Toute observation précise de l’illustration, si elle est reliée à un vers.'),
  'q7b': dict(correction='Cherchez sur l’illustration l’élément qui annonce le danger final : la fable se termine par « L’embuscade d’une araignée » (v. 33). Dites où il se trouve sur l’image et pourquoi il prépare la fin.',
   bareme='1 point pour l’élément repéré, 1 point pour le lien avec la fin de la fable.'),
  'q11': dict(correction='« <b>Les</b> malheureux <b>Lions</b> se <b>déchirent eux-mêmes</b>, / <b>Font</b> résonner <b>leur</b> queue à l’entour de <b>leurs</b> flancs, / <b>Battent</b> l’air […] ; et <b>leur</b> fureur extrême / <b>Les</b> fatigue, <b>les</b> abat »',
   bareme='1 point par forme modifiée ; -0,5 point par erreur de copie.',
   accepte='« leurs queues » (chaque lion a sa queue). « fatigue » et « abat » restent au singulier : leur sujet est « fureur ».'),
 },
}


# Textes du domaine public relevés dans les sujets officiels (ils s’affichent dans l’onglet « Le sujet »).
# Vers : une ligne par vers ; ^n marque un appel de note.
TEXTES = {
 'brevet-2022-metropole-general-la-fontaine-lion-moucheron': dict(
  source='Jean de La Fontaine, « Le Lion et le Moucheron », <em>Fables</em>, livre II, fable 9, 1668. Texte et notes d’après le sujet officiel du DNB 2022, série générale.',
  vers=True,
  texte="""« Va-t’en, chétif^1 insecte, excrément de la terre^2 ! »
C’est en ces mots que le Lion
Parlait un jour au Moucheron.
L’autre lui déclara la guerre.
« Penses-tu, lui dit-il, que ton titre de Roi
Me fasse peur ni me soucie ?
Un bœuf est plus puissant que toi :
Je le mène à ma fantaisie^3. »
À peine il achevait ces mots
Que lui-même il sonna la charge^4,
Fut le Trompette^5 et le Héros.
Dans l’abord il se met au large^6 ;
Puis prend son temps, fond^7 sur le cou
Du Lion, qu’il rend presque fou.
Le quadrupède écume, et son œil étincelle ;
Il rugit ; on se cache, on tremble à l’environ ;
Et cette alarme universelle
Est l’ouvrage d’un Moucheron.
Un avorton de Mouche en cent lieux le harcelle :
Tantôt pique l’échine^8, et tantôt le museau,
Tantôt entre au fond du naseau.
La rage alors se trouve à son faîte^9 montée.
L’invisible ennemi triomphe, et rit de voir
Qu’il n’est griffe ni dent en la bête irritée
Qui de la mettre en sang ne fasse son devoir.
Le malheureux Lion se déchire lui-même,
Fait résonner sa queue à l’entour de ses flancs,
Bat l’air, qui n’en peut mais^10 ; et sa fureur extrême
Le fatigue, l’abat : le voilà sur les dents.
L’insecte du combat se retire avec gloire :
Comme il sonna la charge, il sonne la victoire,
Va partout l’annoncer, et rencontre en chemin
L’embuscade d’une araignée ;
Il y rencontre aussi sa fin.
Quelle chose par là nous peut être enseignée ?
J’en vois deux, dont l’une est qu’entre nos ennemis
Les plus à craindre sont souvent les plus petits ;
L’autre, qu’aux grands périls tel a pu se soustraire,
Qui périt pour la moindre affaire.""",
  notes=['chétif : faible.', 'excrément de la terre : ce qui est rejeté par la terre. Il s’agit d’une insulte méprisante.', 'à ma fantaisie : comme je veux.',
         'sonna la charge : annonça l’attaque.', 'Trompette : celui qui joue de la trompette pendant une bataille.', 'Dans l’abord il se met au large : pour commencer, il s’éloigne.',
         'fond : se précipite pour attaquer.', 'l’échine : le dos de l’animal.', 'à son faîte : au plus haut.', 'qui n’en peut mais : qui n’en peut plus.']),
}
