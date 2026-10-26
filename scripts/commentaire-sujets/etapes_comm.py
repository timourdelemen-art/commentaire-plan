# Propositions au clic des pages de commentaire (méthode élève X / Y / comment, AGENTS.md § 2).
# La bonne réponse vient du corrigé et de la copie à 20 de la page ; les autres sont écrites ici, chacune avec son type
# (le type donne l’explication affichée, voir onglets_commentaire.py). Analyse interne : protocole du commentaire littéraire.
# xy : ce que le texte présente (X) et ce que son écriture en fait (Y) · pb : la problématique · plan · ana : une analyse
# AUTRE : le texte sur lequel l’élève refait seul la même opération (ses questions et corrigés viennent de sa page).
E, OK, LONG, AUTRE, PASSAGE = {}, {}, {}, {}, {}

E["bac-commentaire-hugo-branche-rude"] = dict(
 xy=[("X : une branche en hiver. Y : au printemps, une feuille finit par percer le bois noir.","paraphrase"),
     ("X : la nature. Y : le poème parle de l’amour et du passage des saisons.","theme"),
     ("X : un poète désespéré. Y : l’hiver annonce la fin de son amour.","faux")],
 pb=[("Comment Hugo décrit-il une branche d’arbre en hiver ?","description"),
     ("Pourquoi l’amour est-il si important dans ce poème de Hugo ?","theme"),
     ("Comment Hugo prouve-t-il que l’amour fait toujours refleurir les cœurs ?","resout")],
 plan=[("I. Les vers 1 à 6 / II. Les vers 7 à 12 / III. Les vers 13 à 18","lineaire"),
       ("I. La nature / II. L’amour / III. La poésie","thematique"),
       ("I. Les images / II. Les questions / III. L’anaphore de « C’est que »","procedes")],
 ana=[("Le poète dit qu’après l’hiver la branche va de nouveau donner des feuilles.","paraphrase"),
      ("On relève un connecteur d’opposition et un verbe au futur proche.","etiquette"),
      ("Le futur rend le passage plus vivant et montre l’espoir du poète.","general")],
)
OK["bac-commentaire-hugo-branche-rude"] = (
 "X : une branche noire sous la pluie, qui va refleurir. Y : l’analogie fait de cette renaissance une déclaration d’amour.",
 "I. La vie jaillit du bois le plus dur / II. La branche est le portrait du poète que l’amour ranime / III. Cette renaissance devient une loi",
 "Le connecteur « Mais » et le futur « tu vas voir » annoncent un retournement que l’hiver ne laissait pas prévoir.")
LONG["bac-commentaire-hugo-branche-rude"] = dict(
 paraphrase="X : une branche noire sous la pluie, en plein hiver. Y : au printemps, une feuille tendre finit par percer le bois noir et dur.",
 description="Comment Hugo décrit-il une branche d’arbre noire et nue, battue par la pluie, au cœur de l’hiver ?",
 lineaire="I. Les vers 1 à 6 : la branche en hiver / II. Les vers 7 à 12 : l’âme du poète / III. Les vers 13 à 18 : la loi du monde",
 procedes="I. Les images de la branche et de l’hiver / II. Les questions adressées à la bien-aimée / III. L’anaphore de « C’est que » dans les derniers vers",
 theme="X : la nature et ses saisons. Y : le poème parle de l’amour, du temps qui passe et du retour du printemps après l’hiver.",
 thematique="I. La nature en hiver et au printemps / II. L’amour du poète pour la jeune femme / III. La poésie et l’écriture des vers",
 general="Le futur rend le passage plus vivant et plus dynamique, et il montre que le poète garde l’espoir malgré la tristesse de l’hiver.")
PASSAGE["bac-commentaire-hugo-branche-rude"] = "« Mais attends que l’hiver s’en aille, et tu vas voir / Une feuille percer ces nœuds si durs pour elle »"

E["bac-commentaire-leconte-de-lisle-hialmar"] = dict(
 xy=[("X : un champ de bataille couvert de morts. Y : Hialmar, blessé, demande au corbeau d’emporter son cœur.","paraphrase"),
     ("X : la guerre. Y : le poème parle de la mort et du courage des guerriers.","theme"),
     ("X : un guerrier victorieux. Y : il célèbre sa victoire avant de rentrer chez lui.","faux")],
 pb=[("Comment Leconte de Lisle décrit-il un champ de bataille couvert de morts ?","description"),
     ("Pourquoi la guerre est-elle si cruelle dans « Le Cœur de Hialmar » ?","theme"),
     ("Comment Leconte de Lisle montre-t-il que mourir au combat est toujours glorieux ?","resout")],
 plan=[("I. Les premières strophes / II. Les strophes du milieu / III. Les dernières strophes","lineaire"),
       ("I. La guerre / II. La mort / III. L’amour","thematique"),
       ("I. Les couleurs / II. Les impératifs / III. Les apostrophes","procedes")],
 ana=[("Hialmar demande au corbeau d’ouvrir sa poitrine et aux loups de boire son sang.","paraphrase"),
      ("On relève deux impératifs et une apostrophe adressée aux loups.","etiquette"),
      ("Les impératifs rendent la scène violente et frappante.","general")],
)
OK["bac-commentaire-leconte-de-lisle-hialmar"] = (
 "X : un guerrier agonise parmi les morts et prend la parole. Y : ses paroles font de sa mort une grandeur héroïque et amoureuse.",
 "I. La défaite du corps est entière / II. Par la parole, Hialmar reprend la maîtrise / III. Sa mort devient glorieuse",
 "Les impératifs lui font ordonner lui-même ce qu’il devrait subir : le mourant reprend la maîtrise de sa mort.")
LONG["bac-commentaire-leconte-de-lisle-hialmar"] = dict(
 description="Comment Leconte de Lisle décrit-il un champ de bataille glacé, couvert de morts, où un guerrier agonise ?",
 lineaire="I. Les morts sur le champ de bataille / II. Hialmar appelle le corbeau / III. Hialmar envoie son cœur à la fille d’Ylmer",
 procedes="I. Les couleurs du champ de bataille / II. Les impératifs adressés aux animaux / III. Les apostrophes au corbeau et aux loups",
 theme="X : la guerre et ses massacres. Y : le poème parle de la mort, du courage des guerriers et de l’amour qu’ils laissent derrière eux.",
 thematique="I. La guerre et le champ de bataille / II. La mort du guerrier blessé / III. L’amour pour la fille d’Ylmer",
 general="Les impératifs rendent la scène très violente et frappante, et ils montrent la souffrance terrible du guerrier blessé.")
PASSAGE["bac-commentaire-leconte-de-lisle-hialmar"] = "« Ouvre-moi la poitrine » ; « Buvez, ô loups, mon sang vermeil »"

# Pour l’écrit : chaque page renvoie à un autre texte, dont elle reprend les questions et les corrigés.
AUTRE["bac-commentaire-hugo-branche-rude"] = "bac-commentaire-leconte-de-lisle-hialmar"
AUTRE["bac-commentaire-leconte-de-lisle-hialmar"] = "bac-commentaire-hugo-branche-rude"

def _add(k, xy, pb, plan, ana, ok, long, passage):
    E[k] = dict(xy=xy, pb=pb, plan=plan, ana=ana); OK[k] = ok; LONG[k] = long; PASSAGE[k] = passage

_add("bac-commentaire-baudelaire-joujou-du-pauvre",
 [("X : un enfant riche dans un jardin. Y : il regarde le rat vivant que l’enfant pauvre lui montre à travers la grille.","paraphrase"),
  ("X : la pauvreté. Y : le texte parle de l’injustice sociale et de l’enfance.","theme"),
  ("X : deux frères qui jouent ensemble. Y : l’enfant riche donne son jouet splendide au pauvre.","faux")],
 [("Comment Baudelaire décrit-il deux enfants de part et d’autre d’une grille ?","description"),
  ("Pourquoi l’injustice sociale est-elle si présente dans ce poème en prose ?","theme"),
  ("Comment Baudelaire prouve-t-il que les riches et les pauvres sont toujours égaux ?","resout")],
 [("I. Le conseil du narrateur / II. L’enfant riche / III. L’enfant pauvre et son rat","lineaire"),
  ("I. La richesse / II. La pauvreté / III. L’enfance","thematique"),
  ("I. Les oppositions / II. Les comparaisons / III. Les adverbes","procedes")],
 [("Les deux enfants rient ensemble en se regardant à travers la grille.","paraphrase"),
  ("On relève un adverbe en -ment et un verbe pronominal.","etiquette"),
  ("L’adverbe rend la fin du texte joyeuse et émouvante.","general")],
 ("X : deux enfants que tout sépare, de part et d’autre d’une grille. Y : le jeu et le rire font apparaître leur égalité.",
  "I. Tout sépare les deux enfants / II. Un jouet vivant les rapproche / III. Le rire final rend visible leur égalité",
  "La construction réciproque « l’un à l’autre » et l’adverbe « fraternellement » font du rire une relation d’égal à égal."),
 dict(theme="X : la pauvreté et la richesse. Y : le texte parle de l’injustice sociale, de l’enfance et du bonheur simple des jeux d’enfants.",
      thematique="I. La richesse de l’enfant du château / II. La pauvreté de l’enfant de la route / III. L’enfance et ses jeux",
      general="L’adverbe rend la fin du texte joyeuse et émouvante, et il montre que les enfants sont heureux d’être ensemble malgré tout."),
 "« se riaient l’un à l’autre fraternellement »")

_add("bac-commentaire-desbordes-valmore-ville",
 [("X : une ville en flammes. Y : la poétesse voit mourir des enfants et des pères dans l’incendie.","paraphrase"),
  ("X : la guerre. Y : le poème parle de la violence et de la souffrance.","theme"),
  ("X : une fête dans une ville. Y : la poétesse célèbre la joie du peuple.","faux")],
 [("Comment Desbordes-Valmore décrit-elle l’incendie d’une ville ?","description"),
  ("Pourquoi la violence est-elle si terrible dans ce poème ?","theme"),
  ("Comment Desbordes-Valmore prouve-t-elle que toute violence est toujours lâche ?","resout")],
 [("I. Les premiers vers / II. Le milieu du poème / III. Les derniers vers","lineaire"),
  ("I. La ville / II. La mort / III. La maternité","thematique"),
  ("I. L’anaphore de « Quand » / II. Les personnifications / III. Les exclamations","procedes")],
 [("La poétesse explique qu’elle était présente pendant le massacre de la ville.","paraphrase"),
  ("On relève une anaphore et une phrase exclamative.","etiquette"),
  ("L’anaphore donne du rythme au poème et le rend émouvant.","general")],
 ("X : une voix témoin voit massacrer une ville. Y : le poème fait de ce témoignage un appel qui accuse.",
  "I. Le martyre de la ville est rendu présent / II. La poétesse le vit en témoin et en mère / III. Le témoignage devient un appel qui accuse",
  "L’anaphore de « Quand » retarde « J’étais là ! » : on traverse la catastrophe avant de rencontrer le témoin."),
 dict(theme="X : la guerre et ses massacres. Y : le poème parle de la violence, de la souffrance des victimes et de la douleur des mères.",
      thematique="I. La ville en flammes / II. La mort des enfants et des pères / III. La maternité de la poétesse",
      general="L’anaphore donne du rythme et de la force au poème, et elle le rend très émouvant pour le lecteur qui imagine la scène."),
 "Une longue phrase ouverte par « Quand », répété, jusqu’à la principale : « J’étais là ! »")

_add("bac-commentaire-musset-porte-ouverte-fermee",
 [("X : un comte rend visite à une marquise. Y : elle lui explique qu’elle déteste les compliments sur sa beauté.","paraphrase"),
  ("X : l’amour. Y : la scène parle de la séduction et des rapports entre hommes et femmes.","theme"),
  ("X : une marquise amoureuse. Y : elle supplie le comte de lui faire la cour.","faux")],
 [("Comment Musset présente-t-il une conversation entre une marquise et un comte ?","description"),
  ("Pourquoi la séduction est-elle un jeu dangereux chez Musset ?","theme"),
  ("Comment Musset prouve-t-il que les femmes refusent toujours les compliments ?","resout")],
 [("I. Le début de la conversation / II. La tirade de la Marquise / III. La fin de la scène","lineaire"),
  ("I. L’amour / II. La beauté / III. Le mariage","thematique"),
  ("I. Les questions / II. Les comparaisons / III. L’ironie","procedes")],
 [("La Marquise dit que les hommes la regardent comme une poupée dans une vitrine.","paraphrase"),
  ("On relève une comparaison introduite par « comme ».","etiquette"),
  ("La comparaison rend le passage amusant et montre le caractère de la Marquise.","general")],
 ("X : une marquise critique devant un comte les manières de faire la cour. Y : cette critique devient un jeu de séduction.",
  "I. La Marquise critique une cour qui méprise les femmes / II. Son refus apprend au Comte à lui plaire / III. Elle retient celui qui ose le compliment interdit",
  "La comparaison « comme une poupée dans un étalage » montre que ce regard réduit la femme à un objet qu’on examine."),
 dict(theme="X : l’amour et le mariage. Y : la scène parle de la séduction, des compliments et des rapports entre hommes et femmes dans le monde.",
      thematique="I. L’amour et la cour qu’on fait aux femmes / II. La beauté et les compliments / III. Le mariage",
      general="La comparaison rend le passage amusant et vivant, et elle montre bien le caractère spirituel et moqueur de la Marquise."),
 "« comme une poupée dans un étalage »")

_add("bac-commentaire-gautier-morte-amoureuse",
 [("X : Clarimonde verse un breuvage. Y : elle boit le sang de son amant pendant qu’il fait semblant de dormir.","paraphrase"),
  ("X : le fantastique. Y : le récit parle d’amour, de mort et de vampires.","theme"),
  ("X : un narrateur qui tue un vampire. Y : il délivre enfin son village de Clarimonde.","faux")],
 [("Comment Gautier décrit-il une scène de vampire ?","description"),
  ("Pourquoi l’amour est-il dangereux dans La Morte amoureuse ?","theme"),
  ("Comment Gautier prouve-t-il que l’amour tue toujours ?","resout")],
 [("I. La ruse du narrateur / II. Le sang bu / III. Les paroles de Clarimonde","lineaire"),
  ("I. L’amour / II. La mort / III. Le fantastique","thematique"),
  ("I. Les accumulations / II. Les impératifs / III. Le vocabulaire du sang","procedes")],
 [("Clarimonde dit à son amant de dormir pendant qu’elle boit son sang.","paraphrase"),
  ("On relève un impératif répété deux fois.","etiquette"),
  ("L’impératif montre que Clarimonde donne des ordres à son amant.","general")],
 ("X : un narrateur observe en secret la vampire qui partage son lit. Y : la scène rend inséparables sa tendresse et sa prédation.",
  "I. La ruse confirme la menace / II. Sa parole, qu’elle croit sans témoin, révèle un amour sincère / III. Elle ne peut aimer sans tuer",
  "L’impératif répété « Dors » ressemble à une berceuse plus qu’à un ordre : la prédatrice parle en amante."),
 dict(theme="X : le fantastique et le surnaturel. Y : le récit parle d’amour, de mort, de sang et de vampires, dans une atmosphère inquiétante.",
      thematique="I. L’amour du narrateur et de Clarimonde / II. La mort et le sang / III. Le fantastique et le surnaturel",
      general="L’impératif montre que Clarimonde donne des ordres à son amant et qu’elle domine entièrement la scène, comme une vraie prédatrice."),
 "« Dors, mon seul bien ; dors, mon dieu, mon enfant »")

_add("bac-commentaire-rousseau-voyager-a-pied",
 [("X : un voyageur part à pied. Y : il s’arrête quand il veut devant une rivière, un bois ou une grotte.","paraphrase"),
  ("X : le voyage. Y : le texte parle de la nature et de l’éducation.","theme"),
  ("X : un voyageur pressé. Y : il préfère la voiture, plus rapide et moins fatigante.","faux")],
 [("Comment Rousseau décrit-il un voyage à pied ?","description"),
  ("Pourquoi la nature est-elle importante dans l’éducation selon Rousseau ?","theme"),
  ("Comment Rousseau prouve-t-il que la marche rend toujours heureux ?","resout")],
 [("I. Le départ / II. Les découvertes du chemin / III. L’arrivée","lineaire"),
  ("I. La nature / II. L’éducation / III. Le bonheur","thematique"),
  ("I. Les parallélismes / II. Les négations / III. Les phrases brèves","procedes")],
 [("Le voyageur part et s’arrête quand il le décide.","paraphrase"),
  ("On relève deux propositions construites de la même façon.","etiquette"),
  ("Le parallélisme donne du rythme et rend la phrase agréable.","general")],
 ("X : un locuteur défend le voyage à pied. Y : la marche devient une liberté du corps et de l’esprit.",
  "I. La marche rend le voyageur libre / II. Elle fait de lui un philosophe / III. L’effort donne leur prix aux plaisirs simples",
  "Les constructions parallèles font de chaque décision, partir ou s’arrêter, celle du voyageur seul."),
 dict(theme="X : le voyage et ses plaisirs. Y : le texte parle de la nature, de l’éducation d’Émile et du bonheur de vivre simplement.",
      thematique="I. La nature et les paysages traversés / II. L’éducation d’Émile / III. Le bonheur",
      general="Le parallélisme donne du rythme et de l’harmonie à la phrase, et il la rend agréable à lire, comme une promenade."),
 "« On part à son moment, on s’arrête à sa volonté »")

_add("commentaire-bac-la-fontaine-animaux-malades",
 [("X : la peste frappe les animaux. Y : le Lion, le Renard puis l’Âne parlent, et l’Âne est condamné.","paraphrase"),
  ("X : les animaux. Y : la fable parle de la justice et de la religion.","theme"),
  ("X : un procès équitable. Y : le Lion, le plus coupable, est justement condamné.","faux")],
 [("Comment La Fontaine raconte-t-il les aveux des animaux pendant la peste ?","description"),
  ("Pourquoi la justice est-elle injuste dans la société ?","theme"),
  ("Comment La Fontaine prouve-t-il que les puissants gagnent toujours ?","resout")],
 [("I. La peste / II. Les aveux / III. La morale","lineaire"),
  ("I. La justice / II. La religion / III. Le pouvoir","thematique"),
  ("I. Les discours / II. Les antithèses / III. La morale","procedes")],
 [("La morale dit que la justice traite différemment les puissants et les faibles.","paraphrase"),
  ("On relève deux antithèses et un verbe au futur.","etiquette"),
  ("La morale résume la fable et donne une leçon au lecteur.","general")],
 ("X : un conseil d’animaux cherche le coupable d’une faute collective. Y : la condamnation du plus faible révèle une justice des puissants.",
  "I. La peste exige un jugement qui se dit impartial / II. Les puissants excusent les fautes graves / III. L’Âne est jugé selon son rang",
  "L’antithèse « puissant ou misérable », reprise par « blanc ou noir », fait dépendre le verdict du rang."),
 dict(theme="X : les animaux de la fable. Y : la fable parle de la justice, de la religion, de la peste et des rapports entre les forts et les faibles.",
      thematique="I. La justice et le procès des animaux / II. La religion et le sacrifice / III. Le pouvoir du Lion",
      general="La morale résume clairement la fable et donne au lecteur une leçon utile, qu’il peut appliquer à sa propre vie."),
 "« Selon que vous serez puissant ou misérable, / Les jugements de Cour vous rendront blanc ou noir »")

_add("commentaire-bac-corneille-don-diegue",
 [("X : Don Diègue vient de recevoir un soufflet. Y : il se lamente sur sa vieillesse et sur sa honte.","paraphrase"),
  ("X : l’honneur. Y : la scène parle de la vieillesse et de la vengeance.","theme"),
  ("X : un vieillard résigné. Y : il pardonne l’affront pour éviter un duel.","faux")],
 [("Comment Corneille montre-t-il la tristesse d’un vieillard ?","description"),
  ("Pourquoi l’honneur est-il si important au XVIIe siècle ?","theme"),
  ("Comment Corneille prouve-t-il que l’honneur passe toujours avant la vie ?","resout")],
 [("I. Les premiers vers / II. Le milieu du monologue / III. Les derniers vers","lineaire"),
  ("I. La vieillesse / II. L’honneur / III. La vengeance","thematique"),
  ("I. Les exclamations / II. Les antithèses / III. Les questions","procedes")],
 [("Don Diègue crie sa colère et son désespoir d’être vieux.","paraphrase"),
  ("On relève une anaphore et trois exclamations.","etiquette"),
  ("Les exclamations montrent que Don Diègue est très en colère.","general")],
 ("X : un vieillard humilié parle de son impuissance. Y : le monologue en fait une exigence de vengeance à transmettre.",
  "I. La chute de la gloire à la honte est violente / II. La parole fait de l’affront un conflit absolu / III. L’impuissance devient un devoir",
  "L’anaphore de « ô » et la suite de groupes nominaux donnent à l’émotion une forme aussitôt audible."),
 dict(theme="X : l’honneur des nobles. Y : la scène parle de la vieillesse, de la honte et de la vengeance, dans une société où l’honneur compte plus que tout.",
      thematique="I. La vieillesse de Don Diègue / II. L’honneur perdu / III. La vengeance à venir",
      general="Les exclamations montrent que Don Diègue est très en colère et très malheureux, ce qui rend le monologue émouvant pour le spectateur."),
 "« Ô rage ! ô désespoir ! ô vieillesse ennemie ! »")

_add("bac-commentaire-cioran-spermatozoide",
 [("X : une phrase sur le spermatozoïde. Y : Cioran le compare à un bandit.","paraphrase"),
  ("X : la science. Y : l’aphorisme parle de la vie et de la naissance.","theme"),
  ("X : un éloge de la naissance. Y : Cioran célèbre la beauté de la vie qui commence.","faux")],
 [("Comment Cioran définit-il le spermatozoïde ?","description"),
  ("Pourquoi la vie est-elle violente selon Cioran ?","theme"),
  ("Comment Cioran prouve-t-il que toute vie est un crime ?","resout")],
 [("I. « Le spermatozoïde » / II. « le bandit à l’état pur »","lineaire"),
  ("I. La biologie / II. Le crime","thematique"),
  ("I. La métaphore / II. Le présent","procedes")],
 [("Cioran dit que le spermatozoïde est un vrai bandit.","paraphrase"),
  ("On relève une métaphore et un présent de vérité générale.","etiquette"),
  ("La métaphore est surprenante et fait réfléchir le lecteur.","general")],
 ("X : un aphorisme définit le spermatozoïde. Y : la définition fait de l’origine de la vie une violence.",
  "I. La formule a la force d’une définition / II. La fécondation devient une agression",
  "« Bandit » fait du biologique un crime ; « à l’état pur » ramène ironiquement ce crime vers la science."),
 dict(theme="X : la science et la biologie. Y : l’aphorisme parle de la vie, de la naissance et de ce qui pousse les êtres à exister.",
      thematique="I. La biologie et la naissance de la vie / II. Le crime et la violence",
      general="La métaphore est surprenante et un peu choquante, et elle fait réfléchir le lecteur sur la vie et sur la naissance."),
 "« Le spermatozoïde est le bandit à l’état pur. »")

# Chaîne des textes pour l’écrit : chacun renvoie au suivant.
_ORDRE = ["bac-commentaire-leconte-de-lisle-hialmar", "bac-commentaire-hugo-branche-rude", "bac-commentaire-desbordes-valmore-ville",
          "bac-commentaire-baudelaire-joujou-du-pauvre", "bac-commentaire-rousseau-voyager-a-pied", "bac-commentaire-gautier-morte-amoureuse",
          "bac-commentaire-musset-porte-ouverte-fermee", "commentaire-bac-corneille-don-diegue", "commentaire-bac-la-fontaine-animaux-malades",
          "bac-commentaire-cioran-spermatozoide"]
for _i, _k in enumerate(_ORDRE): AUTRE[_k] = _ORDRE[(_i + 1) % len(_ORDRE)]

# Versions développées des plans « linéaires », pour que la bonne réponse ne soit pas la plus longue.
LONG["bac-commentaire-cioran-spermatozoide"]["lineaire"] = "I. Le sujet de la phrase, « Le spermatozoïde » / II. Ce qu’on en dit, « le bandit à l’état pur »"
LONG["bac-commentaire-desbordes-valmore-ville"]["lineaire"] = "I. Les premiers vers, où la ville brûle / II. Le milieu du poème, où la poétesse regarde / III. Les derniers vers, adressés à son ami"
LONG["bac-commentaire-rousseau-voyager-a-pied"]["lineaire"] = "I. Le départ du voyageur, à son heure / II. Les découvertes du chemin : rivière, bois et grotte / III. La dernière phrase du texte"
LONG["commentaire-bac-la-fontaine-animaux-malades"]["lineaire"] = "I. La peste et la réunion du conseil / II. Les aveux du Lion, du Renard et des autres / III. L’aveu de l’Âne, sa condamnation et la morale"
LONG["bac-commentaire-baudelaire-joujou-du-pauvre"]["lineaire"] = "I. Le conseil du narrateur sur les petits jouets / II. Le portrait de l’enfant riche dans son jardin / III. L’enfant pauvre et son rat vivant"
LONG["bac-commentaire-gautier-morte-amoureuse"]["lineaire"] = "I. La ruse du narrateur, qui fait semblant de boire / II. Le moment où Clarimonde boit son sang / III. Les paroles tendres qu’elle lui adresse"
LONG["bac-commentaire-musset-porte-ouverte-fermee"]["lineaire"] = "I. Le début de la conversation entre le Comte et la Marquise / II. La longue tirade de la Marquise contre les compliments / III. La fin de la scène"
LONG["commentaire-bac-corneille-don-diegue"]["lineaire"] = "I. Les premiers vers, où Don Diègue crie sa colère / II. Le milieu du monologue, sur sa gloire passée / III. Les derniers vers, jusqu’à la fin"
