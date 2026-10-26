# Copies à 20 sur Mes forêts (Hélène Dorion). Éditions Bruno Doucey, 2021.
E = "<em>Mes forêts</em>"
C = {}
INTRO = ["Accroche : un passage de l’œuvre qui contient déjà le problème", "Les mots du sujet",
         "On pourrait penser : ce que le sujet éclaire", "Pourtant : ce que l’œuvre montre aussi",
         "La problématique, en une question", "L’annonce : le chemin, en une phrase"]
A, Pv, Ce = "Argument", "Le passage qui prouve", "Ce que le passage montre"
T = "Transition : la question ouverte"

def sp(arg, proof, an): return [(arg, A), (proof, Pv), (an, Ce)]

# ---------------------------------------------------------------- l'arbre (réécriture)
C["dorion"] = dict(
 titre="Un arbre qui « a quelque chose à dire de l’humain » ?",
 sujet="« Dans <em>Les corridors du temps</em> (1988), Hélène Dorion écrit : « L’arbre grince sous la force du vent. Je marche vers cet arbre qui a quelque chose à dire de l’humain. » Cette citation éclaire-t-elle votre lecture de " + E + " ? »",
 session="Bac de français, juin 2026, voie générale (métropole, sujet 26-FRGEME1), dissertation, sujet C",
 pdf="https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-francais-epreuve-anticipee-517283.pdf",
 mot=("« quelque chose à dire de l’humain »", "L’arbre parlerait de nous : de nos épreuves, de notre fragilité. Le verbe « marche vers » dit aussi que le poète va à sa rencontre."),
 preuve=("« il n’est rien d’autre que lui-même »", 1),
 why=[("Un vrai problème","L’arbre parle bien de l’humain ; mais Dorion le respecte aussi comme un être qui n’est que lui-même, et qui souffre de nous."),
      ("Un plan sur mesure","L’arbre miroir de nos vies, puis l’arbre autre que nous, enfin le poème qui, en l’écoutant, fait de lui la mémoire de l’humanité."),
      ("Des preuves analysées","La chute « comme on tombe / parfois dans sa propre vie », le gémissement qui secoue nos solitudes, la « maigre cicatrice », « Avant l’horizon », l’arbre qui « nous dit » le temps.")],
 blocks=[
 ("Introduction",[
  ("« les forêts grincent / et ce gémissement / secoue nos solitudes » : dans "+E+", le grincement des arbres atteint directement ceux qui l’entendent.",INTRO[0]),
  ("En 1988, Hélène Dorion écrivait déjà qu’elle marche « vers cet arbre qui a quelque chose à dire de l’humain » : l’arbre parlerait de nous, et la poète va à sa rencontre.",INTRO[1]),
  ("On pourrait penser que la phrase éclaire tout le recueil : les arbres y portent nos blessures, nos souvenirs et nos questions.",INTRO[2]),
  ("Pourtant, Dorion écrit aussi de l’arbre qu’« il n’est rien d’autre que lui-même », et ses forêts abritent d’autres vies que la nôtre.",INTRO[3]),
  ("Dans "+E+", comment l’arbre peut-il dire quelque chose de l’humain sans cesser d’être lui-même ?",INTRO[4]),
  ("L’arbre de Dorion parle bien de nos vies ; mais il reste un être autre, blessé par nous, et c’est en l’écoutant comme tel que le poème fait de lui la mémoire de l’humanité.",INTRO[5]),
 ]),
 ("Première partie",[("L’arbre parle d’abord de l’humain comme un miroir de nos vies.","Réponse I : la part de vérité de la citation")]+
  sp("Sa chute ressemble à nos chutes.","Dans « L’arbre », une pluie de tiges « tombe comme on tombe / parfois dans sa propre vie ».","La comparaison glisse de l’arbre à l’existence humaine : le verbe « tomber » passe du bois à la personne sans changer de sens.")),
 (None, sp("Il reçoit notre vie intérieure.","Dans « Le tronc », « les forêts entendent nos rêves / et nos désenchantements ».","La personnification fait de la forêt une confidente : elle recueille ce que les hommes espèrent et ce qu’ils perdent.")),
 (None, sp("La poète finit par ne plus distinguer l’arbre et soi.","Dans « Le silence », elle demande : « suis-je l’arbre suis-je la feuille / grugée par les saisons ».","La question double, sans ponctuation, efface la frontière : l’arbre ne parle plus seulement de l’humain, il en devient l’image même.")),
 (None,[("Mais que peut nous dire un arbre qui ne serait que notre miroir ?",T)]),
 ("Deuxième partie",[("L’arbre a quelque chose à dire parce qu’il est autre que nous.","Réponse II")]+
  sp("Dorion le regarde pour lui-même.","Dans « Je m’incline souvent », elle s’arrête devant « la maigre cicatrice de l’écorce » et affirme : « il n’est rien d’autre que lui-même ».","La restriction « rien d’autre que » refuse toute projection : l’arbre a sa propre souffrance, et la poète s’incline devant elle sans se l’approprier.")),
 (None, sp("La forêt abrite d’autres vies que la nôtre.","Un poème final de section énumère : « elles sont coyote ours noir orignal / sittelle geai bleu mésange ».","L’énumération sans virgules fait défiler les bêtes des forêts du Québec : la forêt est un monde peuplé, non un décor pour nos états d’âme.")),
 (None, sp("Cet autre souffre de nous.","Dans « L’onde du chaos », « les oiseaux demandent refuge / à la terre ravagée ».","Le participe « ravagée » désigne une destruction humaine : l’arbre dit l’humain, mais comme une victime parle de son agresseur.")),
 (None,[("Si l’arbre est un autre qui souffre de nous, comment la poète peut-elle entendre ce qu’il a à dire ?",T)]),
 ("Troisième partie",[("En l’écoutant, le poème fait de l’arbre la mémoire de l’humanité : marcher vers lui, c’est apprendre notre histoire.","Réponse III : la réponse à la problématique")]+
  sp("Le poème est d’abord écoute.","Dans « Je m’incline souvent », la poète s’incline « encore / pour écouter son voyage immobile ».","L’oxymore « voyage immobile » dit ce qu’entend celle qui se tait : la longue histoire d’un être qui ne bouge pas.")),
 (None, sp("Les arbres gardent l’histoire humaine.","« Avant l’horizon » commence ainsi : « La terre a commencé à recueillir nos histoires / dans les arbres et sous la couche d’humus ».","Le verbe « recueillir » fait de l’arbre une archive : ce qu’il a à dire de l’humain, c’est notre passé déposé en lui.")),
 (None, sp("La parole de l’arbre devient enfin celle du poème.","« le temps jamais ne s’arrête / nous dit l’arbre / nous dit la forêt / et sur la branche du présent / un poème murmure ».","La reprise de « nous dit » donne la parole à l’arbre, puis la passe au poème posé sur sa branche : l’arbre parle, et le poème transmet.")),
 ("Conclusion",[
  ("La citation éclaire donc "+E+", à condition de ne pas faire de l’arbre un simple miroir : il a quelque chose à dire de l’humain parce qu’il en est distinct.","Conclusion : la réponse"),
  ("L’arbre parle de nous comme un miroir ; il le fait mieux encore parce qu’il est autre que nous ; et le poème, en l’écoutant, en fait la mémoire de notre humanité.","Ce que le raisonnement a établi"),
  ("Marcher vers l’arbre, chez Dorion, c’est s’incliner devant un autre vivant, et y entendre, par le poème, l’histoire de notre humanité.","Le lien avec le parcours"),
  ("Reste une question : un poème qui écoute l’arbre peut-il lui rendre la parole sans la lui prendre ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- relation heureuse
C["dorion-relation-heureuse"] = dict(
 titre="Une relation heureuse à la nature ?",
 sujet="« Selon vous, le livre " + E + " propose-t-il l’expérience d’une relation heureuse à la nature ? »",
 session="Bac de français, juin 2026, voie générale (Antilles-Guyane, sujet 26-FRGEAG1), dissertation, sujet C",
 pdf="https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-francais-epreuve-anticipee-517349.pdf",
 mot=("« relation heureuse »", "Une relation heureuse est un lien qui apporte de la joie et de la paix ; le sujet demande si le recueil fait vivre cette expérience au lecteur."),
 preuve=("« Je marche entre mes ombres / et ma quête de joie »", 2),
 why=[("Un vrai problème","Le recueil fait bien vivre des moments de joie dans la nature ; mais cette relation est blessée, par le temps et par les hommes."),
      ("Un plan sur mesure","Les joies de la forêt, puis la relation brisée, enfin un bonheur cherché, fragile, que le poème fait exister."),
      ("Des preuves analysées","« si peu me fait vivre », « vastes alliés », « Il fait un temps », le loup qui ne vient plus, la « quête de joie », « nous dénouons nous réparons ».")],
 blocks=[
 ("Introduction",[
  ("« si peu me fait vivre / quand c’est plein d’étoiles / et que s’avance le poème » : à la fin de la première section de "+E+", la joie naît d’une nuit étoilée et d’un poème qui commence.",INTRO[0]),
  ("Le sujet demande si le recueil propose « l’expérience d’une relation heureuse à la nature » : un lien vécu, qui apporte joie et paix.",INTRO[1]),
  ("On pourrait penser que oui : Dorion marche, écoute, s’assoit parmi les arbres, et la forêt l’apaise.",INTRO[2]),
  ("Pourtant, le livre fait aussi entendre une nature ravagée, des bêtes qui se taisent, un siècle qui détruit les paysages.",INTRO[3]),
  ("Dans "+E+", le bonheur avec la nature est-il encore possible, quand la relation est blessée ?",INTRO[4]),
  ("La forêt offre bien des moments de joie ; mais la relation est brisée par le temps et par les hommes, et le bonheur devient une quête fragile, que le poème entretient.",INTRO[5]),
 ]),
 ("Première partie",[("Le recueil fait d’abord vivre des moments de vraie joie dans la nature.","Réponse I : la part de vérité du sujet")]+
  sp("Un rien suffit au bonheur.","Le premier poème de clôture s’achève sur « si peu me fait vivre / quand c’est plein d’étoiles / et que s’avance le poème ».","Le contraste entre « si peu » et « vivre » dit une joie simple et entière, offerte par le ciel et par l’écriture.")),
 (None, sp("La nature accueille la poète.","« je me suis assise / au milieu de ces vastes alliés », écrit-elle, puis : « je me laisse étreindre ».","La métaphore des « alliés » et le verbe « étreindre » font de la forêt une présence amie, presque un corps qui console.")),
 (None, sp("La forêt apaise.","Dans « Les vents », « la forêt disperse / nos fatigues ».","Le verbe « disperse » donne à la forêt le pouvoir du vent : elle emporte ce qui pèse sur les hommes.")),
 (None,[("Mais que devient cette joie devant ce que les hommes font de la nature ?",T)]),
 ("Deuxième partie",[("Elle se heurte à une relation blessée, et le recueil en fait entendre la douleur.","Réponse II")]+
  sp("Le monde est abîmé.","La section « L’onde du chaos » répète « Il fait un temps de bourrasques et de cicatrices / un temps de séisme et de chute ».","L’anaphore de « il fait un temps », tournure de la météo, transforme la crise en climat durable : la blessure est devenue l’air qu’on respire.")),
 (None, sp("La nature elle-même se tait.","« Je n’entends pas le loup / il devrait hurler à la lune », écrit Dorion, « comme si la saison était brisée ».","La négation et le conditionnel « devrait » font entendre une absence : la relation heureuse est celle que la poète ne retrouve plus.")),
 (None, sp("Les hommes en sont responsables.","« Avant l’horizon » le dit sans détour : « on a souillé notre maison / on l’a vendue au plus offrant ».","Le pronom « on » nous inclut tous, et la métaphore de la maison vendue dit une trahison : la nature n’est plus un refuge, mais un bien qu’on a sali.")),
 (None,[("Si la relation est brisée, que reste-t-il du bonheur que le recueil semblait offrir ?",T)]),
 ("Troisième partie",[("Il reste un bonheur cherché, fragile, que le poème fait exister : la relation heureuse est une quête, non un état.","Réponse III : la réponse à la problématique")]+
  sp("La joie se cherche à travers les ombres.","« Je marche entre mes ombres / et ma quête de joie ».","Le mot « quête » change la joie en chemin : elle ne se possède pas, elle se poursuit, à côté des ombres qui ne disparaissent pas.")),
 (None, sp("La fragilité devient une force.","Dans « Les brèches », celles-ci « maintiennent la vie / dans sa fragilité ».","Le paradoxe fait des blessures elles-mêmes ce qui laisse passer la vie : le bonheur n’efface pas la brèche, il naît par elle.")),
 (None, sp("Le recueil invite enfin à réparer.","Le dernier poème de « L’onde du chaos » conclut : « rien ne nous appartient / nous dénouons nous réparons / ce que nous pouvons ».","Le rythme binaire et la modestie de « ce que nous pouvons » dessinent une relation heureuse à construire, faite de soin plutôt que de possession.")),
 ("Conclusion",[
  (E+" propose donc l’expérience d’une relation heureuse à la nature, mais d’un bonheur menacé : il faut le chercher, et le réparer.","Conclusion : la réponse"),
  ("Le recueil fait vivre des moments de vraie joie ; cette relation est pourtant blessée ; et le poème fait du bonheur une quête qu’il entretient.","Ce que le raisonnement a établi"),
  ("La joie de Dorion n’ignore pas la terre ravagée ; elle s’en approche avec la lenteur d’un poème qui avance.","Le lien avec le parcours"),
  ("Reste une question : un bonheur que le poème fait exister survit-il hors du poème ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- mystère et liens
C["dorion-mystere-liens"] = dict(
 titre="« Interroger le mystère de l’être et celui du monde, et recueillir des liens » ?",
 sujet="« Dans un entretien, Hélène Dorion affirme que l’écriture poétique « consiste à interroger le mystère de l’être et celui du monde, et à recueillir des liens ». En quoi cette affirmation de l’auteure correspond-elle à votre lecture de " + E + " ? »",
 session="Bac de français, juin 2026, voie générale (centres étrangers, groupe 1, sujet 26-FRGEG11), dissertation, sujet C",
 pdf="https://www.education.gouv.fr/sites/default/files/document/baccalaur-at-g-n-ral-2026-fran-ais---preuve-anticip-e-517082.pdf",
 mot=("« interroger » et « recueillir des liens »", "Interroger, c’est poser des questions sans prétendre y répondre ; recueillir, c’est rassembler avec soin ce qui était dispersé, comme on recueille de l’eau ou des récits."),
 preuve=("« une chute de liens »", 2),
 why=[("Un vrai problème","Le recueil interroge bien sans cesse ; mais les liens qu’il voudrait recueillir sont d’abord rompus, et c’est la forme du livre qui les renoue."),
      ("Un plan sur mesure","Les questions sur l’être et le monde, puis les liens défaits, enfin le poème qui les recueille."),
      ("Des preuves analysées","« suis-je l’arbre », l’herbe et ses « autres mystères », « une chute de liens », les écrans, « choses muettes et nues / que ton chant accorde », le mot « famille ».")],
 blocks=[
 ("Introduction",[
  ("« Dehors, est-ce l’infini / ou juste la nuit ? » : l’épigraphe empruntée à Ann Lauterbach, qui ouvre la première section de "+E+", place le recueil sous le signe d’une question.",INTRO[0]),
  ("Pour Dorion, l’écriture poétique consiste à « interroger le mystère de l’être et celui du monde » et à « recueillir des liens » : questionner sans prétendre répondre, et rassembler ce qui était dispersé.",INTRO[1]),
  ("On pourrait penser que la formule décrit fidèlement le recueil, où les questions abondent et où la forêt relie la poète au monde.",INTRO[2]),
  ("Pourtant, les liens y apparaissent d’abord rompus : entre les hommes et la terre, entre les peuples, entre nous et ce que nous regardons sur des écrans.",INTRO[3]),
  ("Dans "+E+", comment recueillir des liens, quand le monde interrogé semble les défaire ?",INTRO[4]),
  ("Le recueil interroge bien le mystère de l’être et du monde ; mais il découvre des liens rompus, et c’est le poème lui-même, par sa forme, qui les recueille et les renoue.",INTRO[5]),
 ]),
 ("Première partie",[("La poésie de Dorion interroge d’abord le mystère de l’être et celui du monde.","Réponse I : la part de vérité de la citation")]+
  sp("Elle interroge l’être.","Dans « Le silence », la poète avoue : « je ne sais pas / ce qui se tait en moi ».","La négation « je ne sais pas » ne ferme pas la question : elle désigne en soi une part muette, que le poème respecte.")),
 (None, sp("Elle interroge le monde.","Dans « Les racines », elle demande : « observent-elles les nuages / pour apprendre / la langue de l’horizon ».","La question prête aux racines une curiosité semblable à la nôtre : le monde aussi semble chercher à comprendre.")),
 (None, sp("Le mystère reste entier.","« L’herbe ne va nulle part / elle devient un monde / où se terrent d’autres mystères / que le nôtre ».","Le pluriel « d’autres mystères » refuse de tout ramener à l’homme : interroger, c’est reconnaître ce qu’on ne comprendra pas.")),
 (None,[("Mais quels liens ce monde interrogé laisse-t-il encore voir ?",T)]),
 ("Deuxième partie",[("Les liens apparaissent d’abord défaits : le recueil interroge un monde qui se déchire.","Réponse II")]+
  sp("La rupture est inscrite dès le premier poème titré.","« L’horizon » s’ouvre sur « une chute de liens ».","La métaphore fait tomber les liens comme des feuilles : ce que la poète voudrait recueillir est d’abord ce qui se défait.")),
 (None, sp("Nous ne voyons plus le monde.","Les forêts sont un dessin « ignorant les écrans / sur lesquels on les regarde / sans jamais les voir ».","L’opposition entre « regarder » et « voir » dit un lien coupé par l’image : l’écran rapproche la forêt et l’éloigne à la fois.")),
 (None, sp("Les hommes eux-mêmes se sont séparés.","« Avant l’horizon » raconte que « la porte du ciel s’est refermée / sur le babil des peuples / et les peuples se sont séparés ».","L’allusion à Babel fait de la séparation des langues l’origine de tous les liens rompus : l’humanité a perdu sa parole commune.")),
 (None,[("Si les liens se défont partout, où et comment le poème peut-il les recueillir ?",T)]),
 ("Troisième partie",[("C’est le poème lui-même qui recueille les liens : sa forme rassemble ce que le monde disperse.","Réponse III : la réponse à la problématique")]+
  sp("Le chant relie les choses.","Dans « C’est le bruit du monde », la poète s’adresse à un « tu » qui réunit des « choses muettes et nues / que ton chant accorde / pour éclairer le néant ».","Le verbe « accorde », emprunté à la musique, fait du chant ce qui met ensemble des choses isolées : recueillir des liens, c’est les accorder.")),
 (None, sp("Le langage refait le lien que l’histoire a défait.","Dans « Avant l’horizon », « on a prononcé le mot famille / on l’a ouvert très grand / jusqu’à l’humanité ».","Le mot devient un espace qu’on agrandit : nommer, c’est relier, de la famille jusqu’à tous les hommes.")),
 (None, sp("La composition du recueil relie enfin ses parties.","Chacune des quatre sections se clôt sur un poème qui commence par « Mes forêts sont ».","Cette anaphore à grande échelle tisse le livre : les mêmes mots reviennent rassembler ce que chaque section a traversé.")),
 ("Conclusion",[
  ("L’affirmation de Dorion correspond donc à "+E+" : la poète interroge l’être et le monde, mais les liens qu’elle recueille, il lui faut d’abord les voir se rompre.","Conclusion : la réponse"),
  ("La poète interroge l’être et le monde ; elle y voit les liens se défaire ; et c’est la forme du poème qui les recueille.","Ce que le raisonnement a établi"),
  ("Le poème devient alors le lieu où l’on accorde ce qui était séparé : les choses, les mots et les hommes.","Le lien avec le parcours"),
  ("Reste une question : des liens que seul le poème rassemble tiennent-ils encore quand on referme le livre ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- réconciliation
C["dorion-reconciliation"] = dict(
 titre="Une voie vers la réconciliation ?",
 sujet="« Dans quelle mesure la poésie d’Hélène Dorion ouvre-t-elle une voie vers la réconciliation entre l’être humain et la nature ? »",
 session="Bac de français, 2025, voie générale (Antilles-Guyane, épreuve de remplacement, sujet 25-FRGEAG3), dissertation, sujet C",
 pdf="",
 mot=("« une voie vers la réconciliation »", "Une réconciliation suppose une rupture préalable ; « ouvrir une voie » ne dit pas que la paix est faite, mais qu’un chemin y mène."),
 preuve=("« tu écoutes le chant des racines / tu deviens la sève »", 1),
 why=[("Un vrai problème","Le recueil fait bien entrevoir l’union de l’humain et de la nature ; mais il mesure la rupture causée par les hommes, et la réconciliation reste un chemin."),
      ("Un plan sur mesure","L’union entrevue, puis la rupture et la faute, enfin la voie : un travail de réparation que le poème commence."),
      ("Des preuves analysées","« tu deviens la sève », « je suis cette branche », « on a souillé notre maison », « on ferme tout », « nous réparons », « un chemin vaste et lumineux ».")],
 blocks=[
 ("Introduction",[
  ("« tu écoutes le chant des racines / tu deviens la sève » : dans "+E+", l’être humain qui écoute l’arbre finit par se fondre en lui.",INTRO[0]),
  ("Le sujet demande dans quelle mesure la poésie de Dorion « ouvre une voie vers la réconciliation » entre l’être humain et la nature : une réconciliation suppose une rupture, et « ouvrir une voie » ne dit pas que la paix est faite.",INTRO[1]),
  ("On pourrait penser que le recueil accomplit cette réconciliation : la poète marche, écoute, devient arbre ou branche.",INTRO[2]),
  ("Pourtant, il dit aussi la rupture avec une force rare : une terre souillée, vendue, ravagée par un siècle d’indifférence.",INTRO[3]),
  ("Dans "+E+", comment ouvrir une voie vers la réconciliation, sans effacer la rupture que les hommes ont causée ?",INTRO[4]),
  ("Le recueil fait entrevoir l’union de l’humain et de la nature ; mais il regarde en face la faute humaine, et la réconciliation devient une voie à parcourir, un travail que le poème commence.",INTRO[5]),
 ]),
 ("Première partie",[("La poésie de Dorion fait d’abord entrevoir l’union de l’être humain et de la nature.","Réponse I : la part de vérité du sujet")]+
  sp("L’écoute conduit à la fusion.","« tu écoutes le chant des racines / tu deviens la sève ».","Le passage de « écouter » à « devenir », sans transition, dit une union presque immédiate : l’écoute suffit à abolir la distance.")),
 (None, sp("La poète se reconnaît dans le végétal.","« À la table du silence / je suis cette branche / qui avance comme va le vent ».","La métaphore à la première personne (« je suis ») n’est pas une comparaison : la poète se dit branche, et sa vie suit le mouvement de la nature.")),
 (None, sp("La nature devient une alliée.","« je me suis assise / au milieu de ces vastes alliés / sans voix ».","Le mot « alliés » appartient au vocabulaire de la paix : entre l’humain et les arbres, un pacte silencieux semble conclu.")),
 (None,[("Mais qu’est-ce qui a séparé l’être humain de la nature, pour qu’il faille parler de réconciliation ?",T)]),
 ("Deuxième partie",[("Ce qui a séparé, c’est une rupture que le recueil mesure, et dont il nomme les responsables : les hommes.","Réponse II")]+
  sp("La faute est collective.","« Avant l’horizon » le dit : « on a souillé notre maison / on l’a vendue au plus offrant ».","Le pronom « on » et le possessif « notre » désignent une humanité qui a trahi sa propre demeure : la rupture vient de nous.")),
 (None, sp("La destruction dure depuis longtemps.","Dans « L’onde du chaos », il fait « tout un siècle à défaire le paysage ».","Le mot « siècle » donne à la rupture l’échelle de l’Histoire : la nature n’est pas abîmée par accident, mais par un mode de vie.")),
 (None, sp("La réconciliation semble même empêchée.","« Il fait rage virale / sur nos écrans », puis : « on ferme tout / ce que l’on veut réparer ».","Le paradoxe dit l’impuissance : nous détruisons ce que nous voudrions sauver, comme si le geste de réparer se retournait contre lui-même.")),
 (None,[("Si la rupture est si profonde, quelle voie le poème peut-il encore ouvrir ?",T)]),
 ("Troisième partie",[("Il ouvre une voie modeste et active : la réconciliation devient un travail, commencé dans le poème.","Réponse III : la réponse à la problématique")]+
  sp("Il faut d’abord renoncer à posséder.","Dans « Avant l’horizon », « on a dit que le coyote l’ours blanc / nous appartenaient ».","Le verbe « appartenaient », rapporté avec distance (« on a dit »), désigne l’erreur à défaire : se réconcilier, c’est cesser de prendre la nature pour une propriété.")),
 (None, sp("Il faut ensuite réparer.","« rien ne nous appartient / nous dénouons nous réparons / ce que nous pouvons ».","Les verbes au présent et la mesure de « ce que nous pouvons » font de la réconciliation un geste quotidien, à la hauteur de chacun.")),
 (None, sp("Le poème trace enfin le chemin.","À la fin d’« Avant la nuit », « un poème murmure / un chemin vaste et lumineux / qui donne sens / à ce qu’on appelle humanité ».","L’image du « chemin » reprend exactement celle de la « voie » : le poème ne conclut pas la paix, il la rend possible et lui donne un sens.")),
 ("Conclusion",[
  ("La poésie de Dorion ouvre donc une voie vers la réconciliation, dans la mesure où elle ne la confond pas avec l’oubli : il faut reconnaître la faute pour réparer.","Conclusion : la réponse"),
  ("La poésie de Dorion fait entrevoir l’union de l’être humain et de la nature ; elle mesure pourtant la rupture ; et elle fait de la réconciliation un travail que le poème commence.","Ce que le raisonnement a établi"),
  ("Écouter les racines, renoncer à posséder, réparer ce que l’on peut : le recueil fait de la réconciliation une marche, que le lecteur peut poursuivre.","Le lien avec le parcours"),
  ("Reste une question : un poème peut-il réparer, ou seulement apprendre à son lecteur ce qu’il faudrait réparer ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- chant personnel
C["dorion-chant-personnel"] = dict(
 titre="Seulement un chant personnel ?",
 sujet="« Le recueil " + E + " est-il seulement un chant personnel ? »",
 session="Bac de français, juin 2024, voie générale (Amérique du Nord, sujet 24-FRGEAN1), dissertation n° 3",
 pdf="",
 mot=("« seulement un chant personnel »", "Un chant personnel exprime la vie et les émotions de celle qui écrit ; « seulement » demande si le recueil ne fait rien d’autre."),
 preuve=("« Le plus grand a croisé le plus petit et / d’autres histoires ont commencé »", 2),
 why=[("Un vrai problème","Le recueil est bien un chant à la première personne ; mais il fait entendre le monde, l’Histoire, et la voix de tous."),
      ("Un plan sur mesure","Le chant d’une vie, puis le chant du monde, enfin le passage de l’un à l’autre, que la forme du recueil organise."),
      ("Des preuves analysées","Le possessif « mes forêts », « Avant la nuit », « C’est le bruit du monde », « Avant l’aube », le mot « famille », Dante et Walden.")],
 blocks=[
 ("Introduction",[
  ("« la rue Summerside », « la main de ma sœur me rattrape » : dans « Avant la nuit », Hélène Dorion convoque les souvenirs précis de son enfance.",INTRO[0]),
  ("Le sujet demande si "+E+" n’est « seulement » qu’un chant personnel : un poème qui exprimerait la vie et les émotions de celle qui écrit, et rien d’autre.",INTRO[1]),
  ("On pourrait penser que oui : le titre même porte un possessif, et la poète dit « je » à chaque page.",INTRO[2]),
  ("Pourtant, le recueil fait aussi entendre « le bruit du monde », la naissance de l’univers et l’histoire violente de l’humanité.",INTRO[3]),
  ("Dans "+E+", comment un chant si personnel peut-il porter l’histoire du monde ?",INTRO[4]),
  ("Le recueil est bien le chant d’une vie ; mais il s’ouvre au monde et à l’Histoire, et sa forme fait passer de l’un à l’autre, du « je » au « nous ».",INTRO[5]),
 ]),
 ("Première partie",[("Le recueil est d’abord le chant d’une vie.","Réponse I : la part de vérité du sujet")]+
  sp("Le titre l’annonce.","Les poèmes de clôture reprennent sans cesse « mes forêts », jusqu’au dernier vers : « et quand je m’y promène / c’est pour prendre le large / vers moi-même ».","Le possessif et le pronom réfléchi encadrent le recueil : les forêts sont d’abord celles d’une personne, et le chemin mène à soi.")),
 (None, sp("La poète chante son enfance.","« Avant la nuit » énumère « la jupe à carreaux », « le cahier rose », « le château de cartes et de silence de mon père ».","L’énumération de détails concrets compose un album de souvenirs, et la métaphore du « château de cartes et de silence » dit une fragilité familiale intime.")),
 (None, sp("Elle chante ses émotions.","« Je marche entre mes ombres / et ma quête de joie ».","Les possessifs « mes » et « ma » placent la marche entre la peine et l’espoir d’une seule personne : le chant est lyrique au sens le plus strict.")),
 (None,[("Mais quelles voix entend celle qui marche entre ses ombres ?",T)]),
 ("Deuxième partie",[("Elle entend celles du monde et de l’Histoire : le recueil porte bien au-delà d’une vie.","Réponse II")]+
  sp("Le monde contemporain fait irruption.","Dans « C’est le bruit du monde », on entend « sirènes klaxons alarmes du siècle / amas de choses jetables ».","L’énumération sans virgules juxtapose les bruits de la ville : le chant personnel est envahi par le vacarme d’une époque.")),
 (None, sp("Le recueil remonte aux origines.","« Avant l’aube » commence avant toute vie : « Dans la forêt du temps / il n’y avait rien ».","La métaphore de la « forêt du temps » élargit le titre à l’univers entier : les forêts ne sont plus seulement celles de la poète.")),
 (None, sp("Il dit l’histoire des violences humaines.","« on a arraché des enfants à leur famille / on leur a inculqué nos croyances ».","Le « on » collectif et le verbe « arracher » évoquent une histoire de domination : la poète chante une faute qui engage tout un peuple.")),
 (None,[("Si le recueil chante à la fois une vie et l’histoire du monde, comment passe-t-il de l’une à l’autre ?",T)]),
 ("Troisième partie",[("Il passe de l’une à l’autre par sa forme : le chant personnel devient le lieu où chacun retrouve l’histoire de tous.","Réponse III : la réponse à la problématique")]+
  sp("Un même vers relie l’Histoire et l’enfance.","« Avant l’horizon » contient ces vers : « le plus grand a croisé le plus petit et / d’autres récits ont commencé » ; « Avant la nuit » s’ouvre presque de même : « Le plus grand a croisé le plus petit et / d’autres histoires ont commencé ».","La reprise, d’un poème à l’autre, fait de l’enfance de la poète la suite de l’histoire du monde : le personnel n’est pas à côté de l’universel, il le continue.")),
 (None, sp("Le « je » s’élargit en « nous ».","Le mot « famille », dans « Avant l’horizon », est « ouvert très grand / jusqu’à l’humanité / puis on l’a refermé sur nos intimités ».","Le mouvement d’ouverture et de fermeture décrit le recueil lui-même : il va de l’intime à l’humanité, et retour.")),
 (None, sp("Le chant personnel accueille d’autres voix.","Le poème passe par « la forêt de Dante » et « le bois de Walden », et chaque section s’ouvre sur une épigraphe empruntée à une autre écrivaine.","Les références font de sa forêt un lieu partagé avec d’autres écrivains : le chant d’une seule voix devient un chœur.")),
 ("Conclusion",[
  (E+" n’est donc pas seulement un chant personnel : c’est le chant d’une vie qui s’ouvre à l’histoire du monde, et la porte en elle.","Conclusion : la réponse"),
  ("Le recueil chante une vie ; il fait entendre le monde et l’Histoire ; et sa forme fait de ce chant personnel le lieu où chacun retrouve l’histoire de tous.","Ce que le raisonnement a établi"),
  ("Prendre « le large / vers moi-même », c’est, chez Dorion, faire le tour de l’humanité pour revenir à soi.","Le lien avec le parcours"),
  ("Reste une question : un chant qui porte l’histoire de tous peut-il rester une voix singulière ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- métaphore de l'intériorité
C["dorion-metaphore-interiorite"] = dict(
 titre="La nature, une métaphore de l’intériorité ?",
 sujet="« Dans " + E + ", la nature n’est-elle qu’une métaphore de l’intériorité ? »",
 session="Bac de français, juin 2024, voie générale (centres étrangers, groupe 1, sujet 24-FRGEG11), dissertation, sujet C",
 pdf="",
 mot=("« qu’une métaphore de l’intériorité »", "Une métaphore désigne une chose par une autre ; si la nature n’était qu’une métaphore, elle ne servirait qu’à figurer la vie intérieure de la poète, sans exister pour elle-même."),
 preuve=("« la forêt défriche / en moi tant d’années »", 3),
 why=[("Un vrai problème","La nature figure bien la vie intérieure ; mais elle existe aussi pour elle-même, réelle, peuplée et menacée."),
      ("Un plan sur mesure","La forêt intérieure, puis la forêt réelle, enfin un échange où la nature transforme l’intériorité au lieu de la représenter."),
      ("Des preuves analysées","La clairière « au-dedans de soi », « ce peu d’écorce qu’est ma vie », les bêtes nommées, la terre ravagée, la pluie qui n’est plus « à l’intérieur ».")],
 blocks=[
 ("Introduction",[
  ("« les forêts creusent / parfois une clairière / au-dedans de soi » : dans "+E+", la forêt semble se transporter à l’intérieur de la poète.",INTRO[0]),
  ("Le sujet demande si la nature n’y est « qu’une métaphore de l’intériorité » : une image qui servirait seulement à figurer la vie intérieure, sans exister pour elle-même.",INTRO[1]),
  ("On pourrait penser que oui : les forêts de Dorion portent ses souvenirs, ses peurs, ses espoirs.",INTRO[2]),
  ("Pourtant, ses forêts sont aussi peuplées d’ours et de mésanges, frappées par les tempêtes et menacées par les hommes.",INTRO[3]),
  ("Dans "+E+", comment la nature peut-elle à la fois figurer l’intériorité et rester une réalité ?",INTRO[4]),
  ("La nature est bien une image de la vie intérieure ; mais elle existe pour elle-même, et c’est par un échange réel que la forêt transforme l’intériorité au lieu de seulement la représenter.",INTRO[5]),
 ]),
 ("Première partie",[("La nature est d’abord, chez Dorion, une image de la vie intérieure.","Réponse I : la part de vérité du sujet")]+
  sp("Le paysage se transporte au-dedans.","Dans « Les feuilles », « les forêts creusent / parfois une clairière / au-dedans de soi ».","La métaphore de la clairière intérieure dit un apaisement : un espace de lumière s’ouvre dans l’esprit.")),
 (None, sp("La vie devient écorce.","« Entre mes doigts / le nom de l’arbre le nom de la chair / ce peu d’écorce qu’est ma vie ».","La métaphore « ce peu d’écorce » assimile la vie à une mince enveloppe : la fragilité de l’arbre dit celle de la poète.")),
 (None, sp("Les forêts disent les espoirs.","Le poème d’ouverture affirme : « mes forêts sont mes espoirs debout ».","La métaphore directe, avec le verbe « être », fait des arbres dressés l’image d’une volonté de tenir : la verticalité devient morale.")),
 (None,[("Mais que deviennent ces forêts, quand on les regarde hors de la poète ?",T)]),
 ("Deuxième partie",[("Hors de la poète, la nature existe pour elle-même : le recueil la montre réelle, peuplée et menacée.","Réponse II")]+
  sp("Elle est peuplée de bêtes réelles.","« elles sont coyote ours noir orignal / sittelle geai bleu mésange ».","L’énumération de noms précis, sans adjectif ni comparaison, fait exister la faune des forêts québécoises : ici, aucune métaphore.")),
 (None, sp("Elle a sa propre vie.","Dorion écrit de l’arbre : « il n’est rien d’autre que lui-même / avec la longue respiration des saisons ».","La restriction « rien d’autre que » interdit d’en faire le symbole de quoi que ce soit : l’arbre respire à son rythme, non au nôtre.")),
 (None, sp("Elle est réellement menacée.","« les oiseaux demandent refuge / à la terre ravagée ».","Le participe « ravagée » désigne une destruction concrète : la nature n’est pas un état d’âme, c’est un monde qu’on abîme.")),
 (None,[("Si la nature existe pour elle-même, quel lien entretient-elle avec la vie intérieure ?",T)]),
 ("Troisième partie",[("Un lien d’échange réel : la nature n’illustre pas l’intériorité, elle la transforme.","Réponse III : la réponse à la problématique")]+
  sp("La forêt agit sur la poète.","Dans « Les brèches », « la forêt défriche / en moi tant d’années ».","Le verbe « défriche » fait de la forêt le sujet de l’action : ce n’est plus l’esprit qui se sert de la nature, c’est la nature qui travaille en lui.")),
 (None, sp("L’intériorité s’ouvre au dehors.","« quand j’ai ouvert les yeux / ce n’était plus à l’intérieur / de moi que la pluie s’immisçait ».","La négation renverse la métaphore : la pluie cesse d’être intérieure pour redevenir réelle, et la poète s’ouvre au monde.")),
 (None, sp("L’accord des deux devient une demeure.","« mes forêts sont des rivages / accordés à mes pas la demeure / où respire ma vie ».","Le participe « accordés » dit une harmonie entre deux réalités distinctes : la forêt n’est pas l’image de la vie intérieure, elle est le lieu où elle « respire ».")),
 ("Conclusion",[
  ("Dans "+E+", la nature n’est donc pas qu’une métaphore de l’intériorité : elle la figure, mais elle existe hors d’elle, et elle la transforme.","Conclusion : la réponse"),
  ("La nature figure l’intériorité ; elle existe pourtant hors d’elle ; et l’échange entre les deux la transforme.","Ce que le raisonnement a établi"),
  ("La forêt de Dorion est à la fois dedans et dehors : un monde réel qui, à force d’être écouté, finit par défricher la vie de celle qui l’écoute.","Le lien avec le parcours"),
  ("Reste une question : une forêt qui transforme celle qui l’écoute peut-elle encore être dite « mienne » ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- racontent une histoire
C["dorion-histoire"] = dict(
 titre="« mes forêts / racontent une histoire » ?",
 sujet="« Dans " + E + ", Hélène Dorion écrit : « mes forêts / racontent une histoire ». En quoi cette citation éclaire-t-elle votre lecture de l’œuvre ? »",
 session="Bac de français, juin 2024, voie générale (métropole, sujet 24-FRGEME1), dissertation, sujet C",
 pdf="",
 mot=("« racontent une histoire »", "Raconter, c’est suivre un ordre, du commencement à la fin ; une histoire peut être un récit, mais aussi l’Histoire des hommes."),
 preuve=("« qui sauve et détruit / sauve / et détruit »", 2),
 why=[("Un vrai problème","Les forêts racontent bien une histoire, celle du monde et des hommes ; mais cette histoire sauve et détruit, et le poème la raconte autrement qu’un récit."),
      ("Un plan sur mesure","Le récit des origines, puis une histoire de violences et de ruptures, enfin une histoire chantée, qui va de l’univers à l’enfance et reste ouverte."),
      ("Des preuves analysées","« Avant l’aube », « recueillir nos histoires », « sauve et détruit », la haine qui continue, le refrain « c’est le bruit du monde », « le plus grand a croisé le plus petit ».")],
 blocks=[
 ("Introduction",[
  ("« Mes forêts sont le bois usé d’une histoire » : le poème qui clôt « L’onde du chaos » fait des arbres un livre ancien.",INTRO[0]),
  ("Quelques vers plus loin, Dorion écrit : « mes forêts / racontent une histoire » ; raconter, c’est suivre un ordre, et une histoire peut être un récit aussi bien que l’Histoire des hommes.",INTRO[1]),
  ("On pourrait penser que la citation éclaire tout le recueil, qui retrace la naissance du monde, l’aventure humaine et l’enfance de la poète.",INTRO[2]),
  ("Pourtant, la phrase se poursuit ainsi : cette histoire « sauve et détruit » ; et le recueil, fait de poèmes brefs et de refrains, n’a rien d’un récit suivi.",INTRO[3]),
  ("Dans "+E+", quelle histoire racontent des forêts dont le récit sauve et détruit à la fois ?",INTRO[4]),
  ("Les forêts racontent bien l’histoire du monde ; mais c’est une histoire de violences autant que de naissances, et le poème la raconte à sa manière, en chant, de l’univers jusqu’à l’enfance.",INTRO[5]),
 ]),
 ("Première partie",[("Les forêts racontent d’abord l’histoire du monde et des hommes.","Réponse I : la part de vérité de la citation")]+
  sp("Elles remontent aux origines.","« Avant l’aube » commence : « Dans la forêt du temps / il n’y avait rien / ni ciel ni océan ».","La métaphore de la « forêt du temps » fait de la forêt le cadre même de l’histoire, avant tout commencement.")),
 (None, sp("Elles en gardent la mémoire.","« Avant l’horizon » s’ouvre ainsi : « La terre a commencé à recueillir nos histoires / dans les arbres et sous la couche d’humus ».","Le verbe « recueillir » fait des arbres une archive : l’histoire humaine s’y dépose comme les feuilles dans l’humus.")),
 (None, sp("L’histoire suit un ordre.","Les trois derniers longs poèmes s’intitulent « Avant l’aube », « Avant l’horizon », « Avant la nuit ».","La reprise de « Avant » dessine une chronologie, du commencement du monde jusqu’au soir d’une vie : le recueil raconte vraiment.")),
 (None,[("Mais vers quoi va cette histoire que racontent les forêts ?",T)]),
 ("Deuxième partie",[("Elle ne va pas vers un progrès : c’est une histoire qui sauve et détruit, faite de violences autant que de naissances.","Réponse II")]+
  sp("La citation elle-même se dédouble.","Elle se prolonge par « qui sauve et détruit / sauve / et détruit ».","La reprise des deux verbes, isolés sur des vers de plus en plus courts, fait entendre une alternance sans fin : l’histoire hésite entre salut et ruine.")),
 (None, sp("L’art n’a pas suffi à arrêter la violence.","« l’art allait nous protéger de la haine / mais la haine a continué ».","Le futur dans le passé (« allait ») et le « mais » brisent l’espoir : l’histoire des hommes n’est pas celle d’un progrès moral.")),
 (None, sp("La forêt raconte aussi la mort.","« Mes forêts sont un champ silencieux / de naissances et de morts ».","L’antithèse et l’adjectif « silencieux » disent une histoire sans paroles, faite de cycles plus que d’événements : la forêt ne raconte pas comme un livre.")),
 (None,[("Si cette histoire n’avance pas vers un progrès, comment le poème peut-il la raconter ?",T)]),
 ("Troisième partie",[("Le poème la raconte à sa manière : en chant, du monde jusqu’à soi, et en laissant la fin ouverte.","Réponse III : la réponse à la problématique")]+
  sp("Il raconte par refrains plutôt que par épisodes.","Dans « C’est le bruit du monde », le même distique revient : « c’est le bruit du monde / l’écoulement du temps – ».","Le refrain, suspendu par un tiret, fait entendre le temps qui coule plutôt qu’il ne le découpe : l’histoire est rythme avant d’être récit.")),
 (None, sp("Il relie la grande histoire et la petite.","« Avant la nuit » s’ouvre sur « Le plus grand a croisé le plus petit et / d’autres histoires ont commencé », puis raconte l’enfance de la poète.","Le vers charnière fait entrer une vie dans l’histoire du monde : l’histoire que racontent les forêts devient aussi la sienne.")),
 (None, sp("Il laisse la fin ouverte.","Le poème de la citation s’achève sur « nous dénouons nous réparons / ce que nous pouvons ».","Le présent et le « nous » changent le récit en action : l’histoire n’est pas close, elle dépend de ce que nous ferons.")),
 ("Conclusion",[
  ("La citation éclaire donc "+E+" : les forêts racontent une histoire, celle du monde et d’une vie, mais une histoire qui sauve et détruit, et qui reste à écrire.","Conclusion : la réponse"),
  ("Les forêts racontent l’histoire du monde et des hommes ; cette histoire sauve et détruit ; et le poème la raconte en chant, sans en fermer la fin.","Ce que le raisonnement a établi"),
  ("Chez Dorion, raconter ne veut pas dire mettre en ordre : c’est faire entendre le bruit du temps, et y prendre sa part.","Le lien avec le parcours"),
  ("Reste une question : une histoire dont la fin reste ouverte appelle-t-elle son lecteur à l’écrire ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- promenades : voyage intérieur
C["dorion-promenades"] = dict(
 titre="Un voyage à l’intérieur de soi ?",
 sujet="Le sujet cite trois vers de " + E + " (« et quand je m’y promène / c’est pour prendre le large / vers moi-même »), puis demande : « Les promenades d’Hélène Dorion dans ses forêts ne sont-elles qu’un voyage à l’intérieur de soi ? »",
 session="Bac de français, juin 2024, voie générale (Polynésie, sujet 24-FRGEPO1), dissertation, sujet C",
 pdf="",
 mot=("« qu’un voyage à l’intérieur de soi »", "Un voyage intérieur est une méditation sur soi ; « ne… que » demande si les promenades ne servent qu’à cela, au lieu de faire découvrir le monde."),
 preuve=("« j’écoute le monde qui bruit / à travers les arbres seuls »", 2),
 why=[("Un vrai problème","Les promenades mènent bien à soi ; mais elles ouvrent aussi sur le monde, ses êtres et son histoire."),
      ("Un plan sur mesure","La marche vers soi, puis la marche vers le monde, enfin une promenade où « prendre le large » et revenir à soi ne font qu’un."),
      ("Des preuves analysées","« la descente / vers soi », « Je marche entre mes ombres », « vastes alliés », « le monde qui bruit », « des rivages / accordés à mes pas », « un long passage ».")],
 blocks=[
 ("Introduction",[
  ("« et quand je m’y promène / c’est pour prendre le large / vers moi-même » : ces trois vers terminent "+E+".",INTRO[0]),
  ("Le sujet demande si les promenades de la poète ne sont « qu’un voyage à l’intérieur de soi » : une méditation sur soi, plutôt qu’une découverte du monde.",INTRO[1]),
  ("On pourrait penser que oui : la poète marche avec ses ombres, ses souvenirs et ses questions, et la forêt la ramène à elle-même.",INTRO[2]),
  ("Pourtant, « prendre le large » veut d’abord dire partir au loin, et ses promenades la conduisent vers des arbres, des bêtes, et le bruit du monde.",INTRO[3]),
  ("Dans "+E+", comment une promenade peut-elle à la fois mener au loin et reconduire vers soi ?",INTRO[4]),
  ("Les promenades de Dorion sont bien un voyage intérieur ; mais elles ouvrent sur le monde, et c’est en le traversant qu’elles reconduisent à soi.",INTRO[5]),
 ]),
 ("Première partie",[("Les promenades sont d’abord un voyage vers soi.","Réponse I : la part de vérité du sujet")]+
  sp("Marcher, c’est descendre en soi.","Au début de « L’onde du chaos », le jour finit « quand s’amorce la descente / vers soi ».","Le mot « descente », placé en fin de vers, fait du crépuscule un mouvement intérieur : la promenade devient introspection.")),
 (None, sp("La marche suit les états d’âme.","« Je marche entre mes ombres / et ma quête de joie ».","La préposition « entre » place le chemin au milieu de la peine et de l’espoir : le paysage traversé est intérieur.")),
 (None, sp("Le passé accompagne la promenade.","Dans « Le silence », la poète marche « avec les ombres de ma vie / comme de lourds oiseaux / qui dévorent les promesses ».","La comparaison fait des souvenirs des compagnons pesants : on se promène avec soi-même autant que dans la forêt.")),
 (None,[("Mais que rencontre la poète, en marchant, hors de ses propres ombres ?",T)]),
 ("Deuxième partie",[("Elle rencontre le monde : ses promenades l’ouvrent, à ses êtres et à son histoire.","Réponse II")]+
  sp("Elle s’arrête devant d’autres vivants.","« je me suis assise / au milieu de ces vastes alliés / sans voix ».","Le verbe « assise » interrompt la marche : la promenade devient rencontre, et les arbres sont des « alliés », non des reflets.")),
 (None, sp("Elle écoute les arbres pour eux-mêmes.","« j’écoute le monde qui bruit / à travers les arbres seuls / comme des êtres occupés / à devenir leur forme singulière ».","La comparaison avec des « êtres » qui deviennent « leur forme singulière » tourne l’attention vers le dehors : chaque arbre a sa propre aventure.")),
 (None, sp("Le monde moderne la rattrape.","Dans « C’est le bruit du monde », la promenade croise « sirènes klaxons alarmes du siècle ».","L’énumération des bruits urbains fait entrer le siècle dans la forêt : marcher, c’est aussi entendre le monde tel qu’il va.")),
 (None,[("Si la promenade ouvre sur le monde, pourquoi la poète dit-elle qu’elle prend le large « vers moi-même » ?",T)]),
 ("Troisième partie",[("Parce que c’est en traversant le monde qu’on revient à soi : chez Dorion, prendre le large et se retrouver ne font qu’un.","Réponse III : la réponse à la problématique")]+
  sp("Le « soi » est un horizon lointain.","Les derniers vers disent « prendre le large / vers moi-même ».","L’expression maritime, appliquée à soi, est paradoxale : le moi n’est pas un refuge proche, c’est un large qu’on ne rejoint qu’en partant.")),
 (None, sp("La forêt et la marche s’accordent.","« mes forêts sont des rivages / accordés à mes pas ».","La métaphore du rivage place la promenade à la frontière de la terre et de la mer, du connu et du large : la forêt n’enferme pas, elle borde un départ.")),
 (None, sp("La promenade est enfin un passage partagé.","Le dernier poème affirme : « mes forêts sont un long passage / pour nos mots d’exil et de survie ».","Le possessif « nos » élargit le chemin à tous : la promenade d’une seule devient le passage de ceux qui cherchent leurs mots.")),
 ("Conclusion",[
  ("Les promenades de Dorion ne sont donc pas qu’un voyage intérieur : elles traversent le monde, et c’est ce détour qui reconduit à soi.","Conclusion : la réponse"),
  ("Les promenades sont un voyage vers soi ; elles ouvrent pourtant au monde ; et c’est ce détour par le monde qui reconduit à soi.","Ce que le raisonnement a établi"),
  ("Prendre le large « vers moi-même », c’est accepter que le chemin vers soi passe par les arbres, les bêtes et le bruit du siècle.","Le lien avec le parcours"),
  ("Reste une question : un recueil qui mène vers soi par le monde fait-il faire au lecteur le même chemin ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- lieu de l'intimité
C["dorion-intimite"] = dict(
 titre="Les forêts, « lieu de l’intimité » ?",
 sujet="Le sujet cite trois vers de " + E + " (« mes forêts sont des rivages / accordés à mes pas la demeure / où respire ma vie »), puis demande : « Cette définition poétique de Mes forêts comme lieu de l’intimité correspond-elle à votre lecture du recueil ? »",
 session="Bac de français, 2024, voie générale (Polynésie, épreuve de remplacement, sujet 24-FRGEPO3), dissertation, sujet C",
 pdf="",
 mot=("« la demeure / où respire ma vie »", "Une demeure est un lieu où l’on habite et où l’on se sent chez soi ; « où respire ma vie » en fait le lieu le plus intime, celui où l’on vit librement."),
 preuve=("« mes forêts sont des cages de solitude »", 2),
 why=[("Un vrai problème","Les forêts sont bien le lieu de l’intimité ; mais elles enferment aussi, et le monde y entre de toutes parts."),
      ("Un plan sur mesure","La demeure intime, puis la forêt qui enferme et que le monde envahit, enfin le rivage : une intimité ouverte, au bord du monde."),
      ("Des preuves analysées","« greniers peuplés de fantômes », « mes espoirs debout », « cages de solitude », « maisons sans famille », les écrans, « nos mots d’exil et de survie ».")],
 blocks=[
 ("Introduction",[
  ("« mes forêts sont des greniers peuplés de fantômes » : dès le poème d’ouverture, les forêts de Dorion ressemblent à une maison pleine de souvenirs.",INTRO[0]),
  ("Le sujet cite une autre définition, « mes forêts sont des rivages / accordés à mes pas la demeure / où respire ma vie », et y voit le « lieu de l’intimité » : un lieu où l’on habite, où l’on vit librement.",INTRO[1]),
  ("On pourrait penser que cette définition correspond au recueil, où la forêt accueille les souvenirs, les espoirs et les pas de la poète.",INTRO[2]),
  ("Pourtant, les forêts y sont aussi des « cages de solitude » et des « maisons sans famille », et le monde y fait irruption avec ses écrans et ses ravages.",INTRO[3]),
  ("Dans "+E+", que devient l’intimité, dans une demeure qui enferme et que le monde envahit ?",INTRO[4]),
  ("Les forêts sont bien le lieu de l’intimité ; mais cette demeure peut enfermer et n’est jamais close, et c’est comme un rivage, au bord du monde, que la forêt abrite une intimité ouverte.",INTRO[5]),
 ]),
 ("Première partie",[("Les forêts sont d’abord le lieu de l’intimité.","Réponse I : la part de vérité du sujet")]+
  sp("Elles gardent la mémoire.","Le poème d’ouverture les décrit comme « des greniers peuplés de fantômes ».","La métaphore du grenier, pièce secrète d’une maison, fait de la forêt le lieu où l’on garde ce qu’on a vécu.")),
 (None, sp("Elles abritent les espoirs.","« mes forêts sont mes espoirs debout ».","Le possessif répété et l’adjectif « debout » font des arbres la part la plus personnelle de la poète : ce qu’elle attend encore.")),
 (None, sp("On y respire.","La citation fait de la forêt « la demeure / où respire ma vie ».","Le verbe « respire » donne à l’intimité un rythme vital : la forêt n’est pas un décor, mais l’espace où la vie peut être elle-même.")),
 (None,[("Mais de quoi cette demeure protège-t-elle celle qui l’habite ?",T)]),
 ("Deuxième partie",[("Elle ne la protège pas de tout : la demeure peut enfermer, et le monde y entre de toutes parts.","Réponse II")]+
  sp("La forêt peut être une prison.","Le dernier poème affirme : « mes forêts sont des cages de solitude ».","La métaphore de la cage renverse celle de la demeure : l’intimité devient enfermement.")),
 (None, sp("Elle peut être vide.","« elles sont des maisons sans famille / des corps sans amour ».","La reprise de « sans » creuse la demeure : l’intime n’est plus le lieu des proches, mais celui de leur absence.")),
 (None, sp("Le monde l’envahit.","« Il fait rage virale / sur nos écrans / qui jamais ne dorment ».","La personnification des écrans qui « jamais ne dorment » dit une intrusion permanente : aucun lieu intime n’échappe au bruit du monde.")),
 (None,[("Si la forêt n’est ni toujours protectrice ni jamais close, quelle intimité peut-elle encore abriter ?",T)]),
 ("Troisième partie",[("Une intimité ouverte : la forêt est un rivage, au bord du monde, où l’on habite sans s’enfermer.","Réponse III : la réponse à la problématique")]+
  sp("Le rivage n’est pas une maison close.","La citation commence par « mes forêts sont des rivages » avant de dire « la demeure ».","L’ordre des métaphores compte : avant d’être une demeure, la forêt est un bord, ouvert sur le large ; l’intimité y respire parce qu’elle n’est pas fermée.")),
 (None, sp("Habiter, c’est s’accorder.","Les rivages sont « accordés à mes pas ».","Le participe « accordés » dit un ajustement entre la marche et le lieu : l’intimité naît d’une harmonie avec le monde, non d’un retrait.")),
 (None, sp("L’intime devient un lieu partagé.","Le dernier poème fait des forêts « un long passage / pour nos mots d’exil et de survie / un peu de pluie sur la blessure ».","Le passage du « mes » au « nos » élargit la demeure : l’intimité de la poète accueille les mots de tous ceux qui ont perdu leur lieu.")),
 ("Conclusion",[
  ("La définition des forêts comme lieu de l’intimité correspond donc au recueil, à condition d’entendre l’intimité comme un rivage : un lieu à soi, ouvert sur le monde.","Conclusion : la réponse"),
  ("Les forêts sont le lieu de l’intimité ; cette demeure peut pourtant enfermer, et le monde y entre ; et l’intimité devient un rivage ouvert.","Ce que le raisonnement a établi"),
  ("Dans "+E+", on n’habite vraiment chez soi qu’en restant au bord du large.","Le lien avec le parcours"),
  ("Reste une question : une intimité ouverte au monde peut-elle encore se dire avec un possessif, « mes forêts » ?","La question qui reste ouverte"),
 ]),
 ])
