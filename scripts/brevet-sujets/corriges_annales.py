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
 'brevet-2023-metropole-general-george-sand-histoire-de-ma-vie': {
  'q1': dict(
   correction='« Nous » désigne les trois enfants qui jouent ensemble : la narratrice, enfant, et ses compagnons de jeu, Hippolyte et Ursule, que le texte nomme plus loin (l. 4 et l. 15).',
   bareme='0,5 point pour « les enfants qui jouent » ; 1,5 point pour les trois enfants nommés.',
   hors_texte=('la petite fille qui raconte',),
   accepte='La narratrice peut être désignée par une périphrase (« la petite fille qui raconte »), à condition de dire qu’il s’agit d’enfants.'),
  'q2': dict(
   correction='La scène se passe à l’intérieur, dans une chambre : la rivière fait des détours « dans cette grande chambre » (l. 3). '
              'Cette rivière n’est pas réelle : elle « était dessinée sur le carreau avec de la craie » (l. 2), c’est-à-dire sur le carrelage. '
              'Ce sont les enfants qui la font exister par leur jeu : « Il s’agissait de passer la rivière » (l. 1-2) ; ils font semblant de s’y noyer et de la traverser.',
   bareme='1 point pour le lieu (sans citation exigée) ; 2 points pour la craie (1 point pour l’explication, 1 point pour la citation) ; 2 points pour la rivière imaginaire, inventée par le jeu (1 point pour l’explication, 1 point pour la citation).',
   accepte='Toute autre citation qui montre que la rivière est dessinée ou jouée, par exemple « il nageait à sec sur le carreau » (l. 6).'),
  'q3': dict(
   correction='Premier élément : la narratrice voit un paysage qui n’existe pas. Elle perdait « la notion de la réalité » et croyait voir « les arbres, les eaux, les rochers » (l. 11). '
              'Deuxième élément : elle ressent des sensations réelles : « le froid du carreau me fit l’effet de l’eau véritable » (l. 28) ; le carrelage devient de l’eau froide. '
              'Troisième élément : les enfants agissent comme si le voyage était vrai. La narratrice refuse de « mouiller nos souliers » (l. 26-27), car « nous avons encore bien du chemin à faire » (l. 27).',
   bareme='2 points par élément : 1 point pour l’élément, 1 point pour la citation qui le justifie.',
   accepte='La peur des « écrevisses » (l. 25) ; l’herbe « fine » et le sable « doux » (l. 15-16) ; Hippolyte qui verse « le pot à l’eau » pour imiter « un torrent et une cascade » (l. 30-31). '
           'Une réponse qui montre que l’illusion grandit au fil du texte est valorisée.'),
  'q4a': dict(
   correction='Le jeu des enfants est comparé à une pièce de théâtre. Le champ lexical du théâtre le prouve : « drame » et « fiction scénique » (l. 7-8), « mimodrames » (l. 18), « personnages » (l. 20), « dialogues » et « acteurs » (l. 21), « représentation » et « dénouement » (l. 38), « la toile tomba » (l. 39).',
   bareme='1 point pour le théâtre ; 2 points pour quatre mots au moins du champ lexical.',
   accepte='« rôle » (l. 6), « jouer une scène » (l. 18-19).'),
  'q4b': dict(
   correction='Premier moment : le décor est installé, la rivière « dessinée sur le carreau avec de la craie » (l. 2). '
              'Deuxième moment : chacun joue un rôle et parle comme un personnage ; les enfants se vouvoient, car « Ils ne croiraient pas jouer une scène s’ils se tutoyaient » (l. 18-19). '
              'Troisième moment : la mère arrive et met fin au jeu ; c’est le « dénouement » (l. 38), et « la toile tomba » (l. 39), comme le rideau à la fin d’une pièce.',
   bareme='1 point par moment.',
   accepte='L’idée d’Hippolyte, qui verse l’eau « Pour ajouter à l’illusion » (l. 29) ; la mère, qui devient le public de la scène (« Elle nous regarda », l. 32).'),
  'q5': dict(
   correction='Première réflexion : l’imagination des enfants est très puissante. La narratrice adulte s’exclame : « Dans quel vaste espace les enfants croient agir, quand ils vont ainsi de la table au lit » (l. 13-14) ; une simple chambre devient pour eux un pays entier. '
              'Deuxième réflexion : les enfants sont de vrais créateurs. Ils ont « des dialogues très vrais » que « des acteurs de profession seraient bien embarrassés d’improviser » (l. 21-22) : la narratrice les admire.',
   bareme='Pour chaque réflexion : 1,5 point pour l’idée, 1 point pour la justification par un passage précis.',
   accepte='La tendresse ou la nostalgie de l’adulte qui se souvient ; l’opposition entre le monde des enfants et celui des adultes, qui brise l’illusion (la mère « se fâcha tout de bon », l. 34).'),
  'q6': dict(
   correction='Premier argument : la photographie montre, comme le texte, un jeu dessiné à la craie. On y voit des flots tracés sur le sol, avec un bateau ; dans le texte, la rivière « était dessinée sur le carreau avec de la craie » (l. 2). Dans les deux cas, un simple dessin suffit à créer un paysage d’eau. '
              'Deuxième argument : les enfants de la photographie jouent ensemble un voyage et portent des costumes de marins, comme les enfants du texte, qui jouent des « personnages » (l. 20) et se préparent à la traversée : il fallait « relever un peu nos jupes et […] ôter nos chaussures » (l. 24-25). Le jeu devient une aventure.',
   bareme='4 points par argument : 2 points pour l’argument fondé sur l’observation de la photographie, 2 points pour la citation du texte qui lui correspond.',
   accepte='La joie des enfants, que l’on voit sur la photographie et que le texte fait entendre : « Nos rires et nos cris » (l. 31-32).'),
  'q7a': dict(bareme='0,5 point par fonction. La précision « de lieu » n’est pas exigée.'),
  'q7b': dict(bareme='1 point par manipulation.'),
  'q8a': dict(bareme='0,5 point pour la proposition, 0,5 point pour le subordonnant.'),
  'q8b': dict(bareme='1 point. La précision « de condition » n’est pas exigée.'),
  'q9a': dict(bareme='0,5 point par élément.'),
  'q9b': dict(bareme='1 point pour le sens construit (défaire un nœud), 0,5 point pour le sens dans le texte (la fin de la pièce).'),
  'q10': dict(bareme='1 point par forme correctement modifiée : Ils, s’étaient, noyés, les, ils, tombaient, ils, faisaient, ils, nageaient. Le groupe « le rôle du maladroit ou de l’homme ivre » ne change pas.'),
 },
}


# Textes du domaine public relevés dans les sujets officiels (ils s’affichent dans l’onglet « Le sujet »).
# Vers : une ligne par vers ; ^n marque un appel de note.
TEXTES = {
 'brevet-2023-metropole-general-george-sand-histoire-de-ma-vie': dict(
  source='George Sand [pseudonyme d’Aurore Dupin], <em>Histoire de ma vie</em>, 2<sup>e</sup> partie, chapitre 15, 1855. Texte, lignes et notes d’après le sujet officiel du DNB 2023, série générale (Métropole).',
  lignes=True,
  texte="""Nous avions trouvé un jeu qui passionnait nos imaginations. Il s’agissait de passer
la rivière. La rivière était dessinée sur le carreau^1 avec de la craie et faisait mille détours
dans cette grande chambre. En de certains endroits elle était fort profonde, il fallait
trouver l’endroit guéable^2 et ne pas se tromper. Hippolyte s’était déjà noyé plusieurs
fois, nous l’aidions à se retirer des grands trous où il tombait toujours, car il faisait le
rôle du maladroit ou de l’homme ivre, et il nageait à sec sur le carreau en se débattant
et en se lamentant. Pour les enfants ces jeux-là sont tout un drame, toute une fiction
scénique, parfois tout un roman, tout un poème, tout un voyage, qu’ils miment et rêvent
durant des heures entières, et dont l’illusion les gagne et les saisit véritablement. Pour
mon compte, il ne me fallait pas cinq minutes pour m’y plonger de si bonne foi, que je
perdais la notion de la réalité, et je croyais voir les arbres, les eaux, les rochers, une
vaste campagne, et le ciel tantôt clair, tantôt chargé de nuages qui allaient crever et
augmenter le danger de passer la rivière. Dans quel vaste espace les enfants croient
agir, quand ils vont ainsi de la table au lit et de la cheminée à la porte !

Nous arrivâmes, Ursule et moi, au bord de notre rivière, dans un endroit où l’herbe
était fine et le sable doux. Elle le tâta d’abord, et puis elle m’appela en me disant :
« Vous pouvez vous y risquer, vous n’en aurez guère plus haut que les genoux. » Les
enfants s’appellent vous dans ces sortes de mimodrames^3. Ils ne croiraient pas jouer
une scène s’ils se tutoyaient comme à l’ordinaire. Ils représentent toujours certains
personnages qui expriment des caractères, et ils suivent très bien la première donnée.
Ils ont même des dialogues très vrais et que des acteurs de profession seraient bien
embarrassés d’improviser sur la scène avec tant d’à-propos et de fécondité^4.

Sur l’invitation d’Ursule, je lui observai que^5, puisque l’eau était basse, nous
pouvions bien passer sans nous mouiller ; il ne s’agissait que de relever un peu nos
jupes et d’ôter nos chaussures. « Mais, dit-elle, si nous rencontrons des écrevisses,
elles nous mangeront les pieds. — C’est égal, lui dis-je ; il ne faut pas mouiller nos
souliers, nous devons les ménager^6, car nous avons encore bien du chemin à faire. »
À peine fus-je déchaussée, que le froid du carreau me fit l’effet de l’eau véritable, et
nous voilà, Ursule et moi, pataugeant dans le ruisseau. Pour ajouter à l’illusion
générale, Hippolyte imagina de prendre le pot à l’eau et de le verser par terre, imitant
ainsi un torrent et une cascade. Cela nous sembla délirant d’invention. Nos rires et nos
cris attirèrent enfin l’attention de ma mère. Elle nous regarda, et nous vit tous les trois,
pieds et jambes nus, barbotant dans un cloaque^7, car le carreau avait déteint, et notre
fleuve était fort peu limpide. Alors elle se fâcha tout de bon, surtout contre moi, qui
étais déjà enrhumée ; elle me prit par le bras, m’appliqua une correction manuelle
assez accentuée, et, m’ayant rechaussée elle-même, en me grondant beaucoup, elle
chassa Hippolyte dans sa chambre, et nous mit en pénitence^8, Ursule et moi, chacune
dans un coin. Tel fut le dénouement imprévu et dramatique de notre représentation, et
la toile tomba sur des larmes et des cris véritables.""",
  notes=['sur le carreau : sur le carrelage.', 'guéable : que l’on peut traverser sans perdre pied.', 'mimodrame : pièce de théâtre sans paroles.', 'fécondité : inventivité, créativité.',
         'je lui observai que : je lui fis remarquer que.', 'nous devons les ménager : nous devons en prendre soin.', 'un cloaque : un égout.', 'elle nous mit en pénitence : elle nous punit.']),
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
