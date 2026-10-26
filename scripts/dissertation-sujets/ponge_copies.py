# Copies à 20 sur La rage de l'expression (Ponge). Édition Gallimard, 1976.
# Chaque copie : introduction, trois parties de trois sous-parties, deux transitions, conclusion.
E = "<em>La rage de l’expression</em>"
C = {}

def P(*rows): return list(rows)

INTRO = ["Accroche : un passage de l’œuvre qui contient déjà le problème", "Les mots du sujet",
         "On pourrait penser : ce que le sujet éclaire", "Pourtant : ce que l’œuvre montre aussi",
         "La problématique, en une question", "L’annonce : le chemin, en une phrase"]

# ---------------------------------------------------------------- mécanicien (réécriture)
C["ponge"] = dict(
 titre="Un « mécanicien » de la langue ?",
 sujet="« Selon un critique, Francis Ponge est un « mécanicien » qui cherche à « réparer, articuler, faire fonctionner ». Cette citation éclaire-t-elle votre lecture de " + E + " ? »",
 session="Bac de français, juin 2026, voie générale (métropole, sujet 26-FRGEME1), dissertation, sujet B",
 pdf="https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-francais-epreuve-anticipee-517283.pdf",
 mot=("« réparer, articuler, faire fonctionner »", "Ces trois verbes supposent une machine en panne, des pièces à ajuster, puis un mécanisme qui marche : le poète serait un artisan, non un inspiré."),
 preuve=("« Tout cela n’est pas sérieux. »", 1),
 why=[("Un vrai problème","L’image du mécanicien dit vrai (outils, essais, montages) ; mais chez Ponge la machine tourne rarement jusqu’au bout, et l’objet refuse d’être réparé."),
      ("Un plan sur mesure","Le mécanicien au travail, puis la machine qui échoue devant l’objet, enfin l’atelier lui-même qui fonctionne : chaque partie naît de la limite de la précédente."),
      ("Des preuves analysées","La boîte à outils de « L’Œillet », le Littré du « Mimosa », le Nota bene du Carnet, l’« assassinat d’un poème », le journal de la recherche : un procédé précis par preuve.")],
 blocks=[
 ("Introduction",[
  ("« Que mon travail soit celui d’une rectification continuelle de mon expression » : dès « Berges de la Loire », texte d’ouverture de "+E+", Ponge se donne un travail d’atelier plutôt qu’une inspiration.",INTRO[0]),
  ("Un critique le compare à un « mécanicien » qui cherche à « réparer, articuler, faire fonctionner » : trois verbes d’artisan, qui supposent une machine en panne, des pièces à ajuster et un mécanisme qui finit par marcher.",INTRO[1]),
  ("On pourrait penser que l’image convient : le recueil montre un écrivain qui essaie, corrige et recommence.",INTRO[2]),
  ("Pourtant, la machine de Ponge marche rarement jusqu’au bout : ses textes s’achèvent sur des variantes, des aveux d’échec et un poème promis qui ne vient pas.",INTRO[3]),
  ("Que devient l’image du mécanicien, si ce qu’il répare ne fonctionne jamais comme une machine achevée ?",INTRO[4]),
  ("Ponge travaille bien la langue en mécanicien ; mais l’objet qu’il veut dire refuse d’être réparé, et c’est finalement l’atelier, montré au lecteur, qui fonctionne.",INTRO[5]),
 ]),
 ("Première partie",[
  ("Ponge travaille d’abord en mécanicien : il a ses outils, ses pièces et ses montages.","Réponse I : la part de vérité du sujet"),
  ("Ses outils sont nombreux.","Argument"),
  ("Dans la préface de « L’Œillet », il énumère ce à quoi l’on peut faire appel : « Au dictionnaire, à l’encyclopédie, à l’imagination, au rêve, au télescope », et jusqu’« au calembour, à la rime ».","Le passage qui prouve"),
  ("L’énumération met sur le même plan instruments de science et jeux de langue : tout ce qui sert est bon, comme dans une boîte à outils.","Ce que le passage montre"),
 ]),
 (None,[
  ("Chaque mot est ensuite vérifié, comme une pièce qu’on essaie.","Argument"),
  ("Dans « Le Mimosa », Ponge recopie le Littré, retient que « mimeux » « se dit des plantes qui, lorsqu’on les touche, se contractent », puis note : « Floribond : ce mot ne figure pas au Littré. Il figurera donc dans les éditions futures. »","Le passage qui prouve"),
  ("Le dictionnaire sert de banc d’essai : quand la pièce existe, Ponge la contrôle ; quand elle manque, il la fabrique, avec l’assurance tranquille d’un artisan.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le poème peut même se monter en série.","Argument"),
  ("Dans « Le Carnet du bois de pins », un « Nota bene » numérote des vers déclarés « indéformables » et précise : « On pourra dès lors disposer ces éléments ad libitum ».","Le passage qui prouve"),
  ("Le lexique technique et les suites de chiffres font du poème un assemblage de pièces interchangeables : ici, le mécanicien semble avoir gagné.","Ce que le passage montre"),
 ]),
 (None,[("Mais à quoi sert un montage qui peut tourner dans tous les sens ?","Transition : la question ouverte")]),
 ("Deuxième partie",[
  ("Ce montage tourne à vide, parce que l’objet n’est pas une pièce qu’on répare.","Réponse II"),
  ("Ponge le constate lui-même.","Argument"),
  ("Juste après ce montage, il écrit : « Tout cela n’est pas sérieux », et fait ses comptes : « Pas grand-chose pour la peine que je me suis donnée. »","Le passage qui prouve"),
  ("La phrase brève, puis le bilan dressé comme une facture, renversent l’image du mécanicien : le travail est fait, mais la machine ne rend pas ce qu’elle promettait.","Ce que le passage montre"),
 ]),
 (None,[
  ("C’est que l’objet commande l’ouvrier.","Argument"),
  ("« Berges de la Loire » l’avait posé : l’objet « n’a aucun devoir vis à vis de moi, c’est moi qui ai tous les devoirs à son égard ».","Le passage qui prouve"),
  ("L’antithèse entre « aucun devoir » et « tous les devoirs » inverse la hiérarchie : ce n’est pas l’artisan qui décide de la forme, c’est la chose qui juge l’ouvrage.","Ce que le passage montre"),
 ]),
 (None,[
  ("Ponge va jusqu’à saboter la machine poétique.","Argument"),
  ("Dans une lettre reproduite en appendice, il présente le Carnet comme « une tentative (bien loin d’être réussie) d’assassinat d’un poème par son objet ».","Le passage qui prouve"),
  ("La métaphore du meurtre dit le contraire de la réparation, et la parenthèse avoue que même ce sabotage échoue : on est loin d’un mécanisme qui fonctionne.","Ce que le passage montre"),
 ]),
 (None,[("Si ni le poème ni l’objet ne sortent réparés de l’atelier, qu’est-ce qui fonctionne, au bout du compte, dans "+E+" ?","Transition : la question ouverte")]),
 ("Troisième partie",[
  ("Ce qui fonctionne, c’est l’atelier lui-même : Ponge publie sa recherche, et c’est elle qui agit sur le lecteur.","Réponse III : la réponse à la problématique"),
  ("Le chantier remplace la machine finie.","Argument"),
  ("Dans « La Mounine », Ponge veut éviter la « marqueterie » en publiant non la seule formule, mais « l’histoire complète de sa recherche, le journal de son exploration ».","Le passage qui prouve"),
  ("La « marqueterie », c’est un assemblage de pièces bien polies ; le remède n’est pas une meilleure pièce, mais le journal entier : le livre devient l’histoire de la machine.","Ce que le passage montre"),
 ]),
 (None,[
  ("Articuler, c’est alors faire jouer les mots avec les choses, sous nos yeux.","Argument"),
  ("« Comme dans tamaris il y a tamis, dans mimosa il y a mima. »","Le passage qui prouve"),
  ("Le calembour, pris au sérieux, articule le nom et la plante : le mimosa « mime », comme la sensitive qui se contracte, et le jeu de mots devient un instrument de connaissance.","Ce que le passage montre"),
 ]),
 (None,[
  ("Ce qui doit enfin fonctionner, c’est l’esprit du lecteur.","Argument"),
  ("Dans « L’Œillet », Ponge veut « Faire gagner à l’esprit humain ces qualités, dont il est capable et que seule sa routine l’empêche de s’approprier ».","Le passage qui prouve"),
  ("Le mot « routine » désigne la vraie panne : le mécanicien répare notre regard usé, et l’œuvre fonctionne quand le lecteur voit mieux les choses.","Ce que le passage montre"),
 ]),
 ("Conclusion",[
  ("La citation éclaire donc "+E+", à condition de déplacer la machine : Ponge ne répare pas le poème, il répare notre manière de dire les choses.","Conclusion : la réponse"),
  ("Ponge travaille bien en mécanicien ; mais l’objet refuse d’être réparé, et c’est l’atelier publié, avec ses essais, qui finit par fonctionner.","Ce que le raisonnement a établi"),
  ("Son atelier reste ouvert, avec ses outils, ses ratés et ses pièces de rechange, et c’est ainsi que le recueil fonctionne.","Le lien avec le parcours"),
  ("Reste une question : un livre qui expose ses ratés peut-il encore être lu comme un recueil de poèmes achevés ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- vision commune (réécriture)
C["ponge-vision-commune"] = dict(
 titre="« Je ne me prétends pas poète » ?",
 sujet="« Dans « L’œillet », Francis Ponge écrit : « Je ne me prétends pas poète. Je crois ma vision fort commune ». Dans quelle mesure cette affirmation de Ponge correspond-elle à votre lecture de son œuvre ? »",
 session="Bac de français, 2024, voie générale (Polynésie, épreuve de remplacement, sujet 24-FRGEPO3), dissertation, sujet B",
 pdf="",
 mot=("« vision fort commune »", "Une vision commune est celle de tout le monde : banale, partagée, sans privilège. Ponge refuse le statut du poète qui verrait mieux que les autres."),
 preuve=("« Ne rien porter au jour que ce que je suis seul à dire. »", 2),
 why=[("Un vrai problème","Ponge refuse bien le titre de poète et choisit des objets ordinaires ; mais sa manière de voir est tout sauf commune."),
      ("Un plan sur mesure","Le refus du poète, puis une vision singulière et violente, enfin une poésie redéfinie qui rend commun ce qu’elle découvre."),
      ("Des preuves analysées","« Berges de la Loire », la guêpe « forme musicale du miel », la honte de « l’académisme », la brosserie du bois de pins, le proverbe de La Fontaine.")],
 blocks=[
 ("Introduction",[
  ("« Peu m’importe après cela que l’on veuille nommer poème ce qui va en résulter » : dans « Berges de la Loire », Ponge laisse aux autres le soin de décider s’il écrit de la poésie.",INTRO[0]),
  ("Dans « L’Œillet », il va plus loin : « Je ne me prétends pas poète. Je crois ma vision fort commune » ; une vision « commune » est celle de tout le monde, sans regard privilégié.",INTRO[1]),
  ("On pourrait penser que l’affirmation décrit bien "+E+" : le recueil parle d’une guêpe, d’un mimosa, d’un bois de pins, et refuse les grands sujets du lyrisme.",INTRO[2]),
  ("Pourtant, ces objets banals y sont vus d’une manière que personne n’aurait trouvée : une guêpe y devient une musique, un bois de pins une salle de bains.",INTRO[3]),
  ("Dans "+E+", comment une vision qui se dit « fort commune » peut-elle produire des textes si singuliers ?",INTRO[4]),
  ("Ponge refuse bien la posture du poète ; mais sa vision n’a rien de commun, et c’est en cherchant ce qui pourrait devenir commun qu’il redéfinit la poésie.",INTRO[5]),
 ]),
 ("Première partie",[
  ("Ponge refuse d’abord le rôle du poète inspiré.","Réponse I : la part de vérité du sujet"),
  ("Il se méfie de la musique poétique toute faite.","Argument"),
  ("Dans « Berges de la Loire », il écrit : « le moindre soupçon de ronron poétique m’avertit seulement que je rentre dans le manège, et provoque mon coup de reins pour en sortir ».","Le passage qui prouve"),
  ("Le « ronron » et le « manège » assimilent la poésie convenue à une routine qui tourne en rond : Ponge veut en sortir d’un « coup de reins », comme on s’arrache à un piège.","Ce que le passage montre"),
 ]),
 (None,[
  ("Il choisit des sujets sans prestige.","Argument"),
  ("La préface de « L’Œillet » annonce qu’il prend pour sujets « non des sentiments ou des aventures humaines mais des objets les plus indifférents possible ».","Le passage qui prouve"),
  ("Le superlatif « les plus indifférents possible » renverse la hiérarchie lyrique : le poème renonce au cœur du poète pour l’objet que personne ne regarde.","Ce que le passage montre"),
 ]),
 (None,[
  ("Il cherche enfin ce que tous pourraient reconnaître.","Argument"),
  ("Il veut dégager dans chaque chose des qualités telles que, « si elles étaient clairement et simplement exprimées, il y aurait opinion unanime et constante ».","Le passage qui prouve"),
  ("Les adjectifs « unanime et constante » précisent le sens de « commune » : non pas banale, mais valable pour tous ; Ponge vise un accord, pas une vision personnelle.","Ce que le passage montre"),
 ]),
 (None,[("Mais que voit vraiment Ponge, quand il regarde ces objets que tous connaissent ?","Transition : la question ouverte")]),
 ("Deuxième partie",[
  ("Ce qu’il voit n’a rien de commun : sa vision est singulière, et même violente.","Réponse II"),
  ("Ses analogies surprennent.","Argument"),
  ("Dans « La Guêpe », l’insecte « peut encore être dite la forme musicale du miel ».","Le passage qui prouve"),
  ("La métaphore unit un son, une forme et une matière que rien ne rapproche d’ordinaire : il fallait un regard très peu commun pour entendre le miel dans le vol de la guêpe.","Ce que le passage montre"),
 ]),
 (None,[
  ("Ponge refuse d’ailleurs ce que d’autres ont déjà vu.","Argument"),
  ("Dans « Le Carnet du bois de pins », relisant Apollinaire et Fargue, il a « honte de l’académisme de [sa] vision » et se fixe une règle : « Ne rien porter au jour que ce que je suis seul à dire. »","Le passage qui prouve"),
  ("La phrase à l’infinitif sonne comme une loi : ce que Ponge redoute, c’est justement la vision commune, celle que les poètes ont déjà rendue banale.","Ce que le passage montre"),
 ]),
 (None,[
  ("Cette exigence va jusqu’à la rage du titre.","Argument"),
  ("Dans « L’Œillet », écrire est pour lui « un besoin, un engagement, une colère, une affaire d’amour-propre et voilà tout ».","Le passage qui prouve"),
  ("La gradation, qui passe du besoin à la colère, puis le « et voilà tout » sec, disent une passion qui n’a rien d’ordinaire : la « rage de l’expression » est celle d’un regard qui ne se contente pas.","Ce que le passage montre"),
 ]),
 (None,[("Si sa vision est si singulière, pourquoi Ponge tient-il à la dire « commune » et à refuser le nom de poète ?","Transition : la question ouverte")]),
 ("Troisième partie",[
  ("Parce qu’il veut rendre commun ce qu’il découvre : le refus du poète redéfinit la poésie.","Réponse III : la réponse à la problématique"),
  ("Ponge ne supprime pas la poésie, il en déplace le nom.","Argument"),
  ("La même préface conclut qu’« un jour une telle recherche pourra aussi légitimement être appelée poésie ».","Le passage qui prouve"),
  ("Le futur et l’adverbe « légitimement » renvoient le titre de poète à plus tard : la poésie n’est plus un don qu’on possède, mais le nom d’une recherche réussie.","Ce que le passage montre"),
 ]),
 (None,[
  ("Il préfère la figure du savant.","Argument"),
  ("Dans « La Mounine », il écrit : « je me veux moins poète que « savant ». Je désire moins aboutir à un poème qu’à une formule ».","Le passage qui prouve"),
  ("Les guillemets autour de « savant » montrent que le mot est emprunté : Ponge cherche une vérité vérifiable par tous, comme une loi, et non une expression de soi.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le modèle de cette formule commune est le proverbe.","Argument"),
  ("Il cite La Fontaine, « Une maille rongée emporta tout l’ouvrage », et ajoute : « C’est à de pareils proverbes que j’aimerais aboutir. »","Le passage qui prouve"),
  ("Le proverbe est la forme même du commun : une phrase devenue celle de tous ; Ponge veut une vision singulière au départ, mais commune à l’arrivée.","Ce que le passage montre"),
 ]),
 ("Conclusion",[
  ("L’affirmation de Ponge correspond donc à son œuvre, mais pas au sens où on l’entend d’abord : sa vision n’est pas commune, elle veut le devenir.","Conclusion : la réponse"),
  ("Ponge refuse le rôle du poète inspiré ; sa vision des objets est pourtant singulière ; et c’est en écrivant qu’il veut rendre commun ce qu’il découvre.","Ce que le raisonnement a établi"),
  ("En refusant de se dire poète, Ponge oblige la poésie à mériter son nom : dire de la guêpe, du mimosa ou du ciel de Provence ce que chacun, après lui, pourra reconnaître.","Le lien avec le parcours"),
  ("Reste une question : une œuvre qui veut rendre sa vision commune doit-elle, pour y parvenir, rester aussi singulière ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- observateur
C["ponge-observateur"] = dict(
 titre="Le carnet d’un observateur ?",
 sujet="« Selon vous, le livre " + E + " est-il seulement le carnet d’un observateur du monde qui l’entoure ? »",
 session="Bac de français, juin 2026, voie générale (Antilles-Guyane, sujet 26-FRGEAG1), dissertation, sujet B",
 pdf="https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-francais-epreuve-anticipee-517349.pdf",
 mot=("« seulement le carnet d’un observateur »", "Un carnet note au jour le jour ; un observateur regarde sans intervenir. « Seulement » demande si le livre ne fait rien d’autre que noter ce qui l’entoure."),
 preuve=("« Ce n’est pas de la relation, du récit, de la description, mais de la conquête. »", 1),
 why=[("Un vrai problème","Le livre a bien la forme d’un carnet daté ; mais Ponge y écarte presque tout le monde qui l’entoure, en pleine guerre, pour mener une conquête de la langue."),
      ("Un plan sur mesure","Le carnet d’observation, puis un observateur qui conquiert plus qu’il ne regarde, enfin un carnet qui devient une œuvre tournée vers les hommes."),
      ("Des preuves analysées","Les dates du Carnet, l’autobus de « La Mounine », l’aveu de 1940, la « conquête », les variantes en vers, le « but poétique et politique ».")],
 blocks=[
 ("Introduction",[
  ("« 7 août 1940 », « 9 août 1940 — Le soir » : dans « Le Carnet du bois de pins », chaque note porte sa date, comme dans le cahier d’un naturaliste.",INTRO[0]),
  ("Le sujet demande si "+E+" n’est « seulement » que le carnet d’un observateur du monde qui l’entoure : un carnet note au jour le jour, un observateur regarde sans intervenir.",INTRO[1]),
  ("On pourrait penser que oui : Ponge date ses textes, regarde une guêpe, un oiseau, un bois, un ciel, et consigne ce qu’il voit.",INTRO[2]),
  ("Pourtant, ce carnet tenu pendant la guerre laisse de côté presque tout ce qui entoure son auteur, et il s’occupe moins de voir que de trouver les mots.",INTRO[3]),
  ("Que devient le carnet d’observation, quand l’observateur se détourne du monde qui l’entoure pour conquérir l’expression d’un bois de pins ?",INTRO[4]),
  ("Le livre est bien un carnet d’observation ; mais son auteur conquiert plus qu’il n’observe, et ce carnet devient une œuvre qui rend aux hommes le monde qu’elle semblait fuir.",INTRO[5]),
 ]),
 ("Première partie",[
  ("Le livre a d’abord la forme d’un carnet d’observation.","Réponse I : la part de vérité du sujet"),
  ("Les notes suivent le temps de l’observation.","Argument"),
  ("Le Carnet s’ouvre sur « Le plaisir des bois de pins », daté du « 7 août 1940 », et note : « Il règne un tapis partout. »","Le passage qui prouve"),
  ("La date et la phrase courte au présent donnent la sensation d’une prise de notes sur le motif : l’observateur est dans le bois quand il écrit.","Ce que le passage montre"),
 ]),
 (None,[
  ("L’observation est précise, presque scientifique.","Argument"),
  ("Dans « Notes prises pour un oiseau », Ponge décrit un squelette qui n’est « presque rien qu’une cage, qu’un très léger, très aérien châssis ».","Le passage qui prouve"),
  ("La correction « presque rien qu’une cage » puis la reprise « très léger, très aérien » montrent un regard qui ajuste sa mesure, comme un naturaliste devant son spécimen.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le monde extérieur entre aussi dans le carnet.","Argument"),
  ("« La Mounine » part d’un trajet réel, « entre Marseille et Aix, un matin d’avril vers huit heures, à travers les vitres de l’autobus ».","Le passage qui prouve"),
  ("Le lieu, l’heure et la vitre fixent un point de vue exact, celui d’un voyageur ordinaire qui regarde le paysage passer.","Ce que le passage montre"),
 ]),
 (None,[("Mais que laisse de côté ce voyageur, en 1940 et 1941 ?","Transition : la question ouverte")]),
 ("Deuxième partie",[
  ("Il laisse de côté une grande part du monde qui l’entoure, parce qu’il ne veut pas observer, mais conquérir.","Réponse II"),
  ("L’Histoire est volontairement laissée hors du carnet.","Argument"),
  ("Dans l’appendice du Carnet, il énumère ce qu’il aurait à écrire « si j’étais un simple écrivain » : l’exode, les gens, « mes réflexions sur la situation politique de la France et du monde » ; puis il revient « d’instinct » au « bois de pins ».","Le passage qui prouve"),
  ("L’énumération de ce qu’il n’écrira pas fait sentir, par contraste, la place de la guerre ; mais le choix final dit que le sujet essentiel est ailleurs.","Ce que le passage montre"),
 ]),
 (None,[
  ("Ce que Ponge cherche n’est pas une description.","Argument"),
  ("Il le précise aussitôt : « Ce n’est pas de la relation, du récit, de la description, mais de la conquête. »","Le passage qui prouve"),
  ("La phrase écarte en bloc trois manières d’observer et réserve le dernier mot à une image militaire : l’observateur est devenu conquérant.","Ce que le passage montre"),
 ]),
 (None,[
  ("Cette conquête se mène dans la langue plus que dans le bois.","Argument"),
  ("Le Carnet aligne des dizaines de variantes en vers, où reviennent les « épingles à cheveux odoriférantes » et « Vénus sortant de la baignoire ».","Le passage qui prouve"),
  ("La répétition presque obsessionnelle des mêmes vers montre que le combat se livre avec les mots : le carnet de l’observateur devient un cahier d’essais.","Ce que le passage montre"),
 ]),
 (None,[("Si l’observateur se détourne du monde pour conquérir une phrase, que gagne le monde à ce carnet ?","Transition : la question ouverte")]),
 ("Troisième partie",[
  ("Le carnet devient une œuvre qui rend le monde aux hommes : observer les choses, c’est préparer une autre manière d’y vivre.","Réponse III : la réponse à la problématique"),
  ("Le choix du bois de pins n’est pas une fuite.","Argument"),
  ("Dans le même appendice, Ponge comprend comment se rejoignent en lui « le poétique et le politique » et définit son but : un monde où les hommes et les choses « connaîtront des rapports harmonieux ».","Le passage qui prouve"),
  ("Le futur « connaîtront » fait du carnet un projet : la chose bien dite prépare un monde réconcilié, et l’observation devient un engagement.","Ce que le passage montre"),
 ]),
 (None,[
  ("L’humain revient d’ailleurs au cœur du paysage.","Argument"),
  ("Dans « La Mounine », l’émotion naît quand les statues apparaissent, « l’élément humain introduit par les statues me semblant d’un caractère déchirant ».","Le passage qui prouve"),
  ("L’adjectif « déchirant » change l’observation en émotion partagée : ce qui bouleverse l’observateur, c’est la trace des hommes sous un ciel écrasant.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le carnet est enfin publié pour être lu.","Argument"),
  ("Le même texte justifie l’édition des brouillons : le savant peut « décrire sa découverte par le menu, raconter ses expériences ».","Le passage qui prouve"),
  ("Le carnet change de destinataire : ce que l’observateur notait pour lui devient une expérience offerte au lecteur, qui apprend à voir avec lui.","Ce que le passage montre"),
 ]),
 ("Conclusion",[
  (E+" n’est donc pas seulement le carnet d’un observateur : c’est le carnet d’une conquête, menée dans la langue, au nom du monde qu’elle semblait laisser de côté.","Conclusion : la réponse"),
  ("Le livre a la forme d’un carnet d’observation ; mais l’observateur s’y détourne du monde pour conquérir une expression ; et c’est cette conquête, publiée avec ses essais, qui rend le monde aux hommes.","Ce que le raisonnement a établi"),
  ("En 1940, regarder un bois de pins plutôt que la guerre n’était pas se taire sur le monde, mais chercher les mots d’un monde plus habitable.","Le lien avec le parcours"),
  ("Reste une question : un carnet écrit loin de la guerre peut-il, par sa seule écriture, répondre à son époque ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- le texte ne parle que de lui-même
C["ponge-texte-lui-meme"] = dict(
 titre="Un texte qui ne parle que de lui-même ?",
 sujet="« Un critique a pu dire que, dans " + E + ", « le texte ne parle finalement que de lui-même ». Dans quelle mesure, selon vous, cette affirmation s’applique-t-elle à l’œuvre de Francis Ponge au programme ? »",
 session="Bac de français, juin 2026, voie générale (centres étrangers, groupe 1, sujet 26-FRGEG11), dissertation, sujet B",
 pdf="https://www.education.gouv.fr/sites/default/files/document/baccalaur-at-g-n-ral-2026-fran-ais---preuve-anticip-e-517082.pdf",
 mot=("« ne parle finalement que de lui-même »", "Un texte qui parle de lui-même commente sa propre écriture ; « ne… que » et « finalement » affirment qu’au bout du compte, il ne parlerait de rien d’autre."),
 preuve=("« Comme dans tamaris il y a tamis, dans mimosa il y a mima. »", 3),
 why=[("Un vrai problème","Le recueil commente sans cesse ses pages et ses échecs ; mais ce commentaire est tourné vers l’objet, qui reste le juge."),
      ("Un plan sur mesure","Le texte qui se commente, puis l’objet qui commande, enfin un texte qui parle de lui-même pour mieux parler du monde."),
      ("Des preuves analysées","« Le mimosa et moi », les « quinze pages » du Carnet, l’objet « plein de droits », le Littré, le buvard du ciel de Provence, « mima ».")],
 blocks=[
 ("Introduction",[
  ("« Qu’ai-je gagné pendant ces quinze pages (pp. 119 à 141) et ces dix jours ? » : dans « Le Carnet du bois de pins », le texte fait le bilan de ses propres pages.",INTRO[0]),
  ("Un critique affirme que, dans "+E+", « le texte ne parle finalement que de lui-même » : il ne parlerait, au bout du compte, que de sa propre écriture.",INTRO[1]),
  ("On pourrait penser qu’il a raison : le recueil commente ses brouillons, compte ses pages, juge ses vers.",INTRO[2]),
  ("Pourtant, chacun de ces textes porte le nom d’une chose, la guêpe, l’œillet, le mimosa, le bois de pins, et ne cesse d’y revenir.",INTRO[3]),
  ("Un texte qui parle sans cesse de lui-même peut-il encore parler des choses ?",INTRO[4]),
  ("Le texte de Ponge parle bien de lui-même ; mais c’est l’objet qui dirige ce commentaire, et ce retour sur soi devient la manière la plus juste de dire le monde.",INTRO[5]),
 ]),
 ("Première partie",[
  ("Le texte de Ponge parle d’abord beaucoup de lui-même.","Réponse I : la part de vérité de la citation"),
  ("Il commente son propre commencement.","Argument"),
  ("Dans « Le Mimosa », Ponge s’arrête sur ses premières lignes : « Tout ce préambule […] devrait être intitulé : « Le mimosa et moi. » »","Le passage qui prouve"),
  ("Le titre imaginaire place le « moi » à égalité avec la fleur : le texte se regarde écrire, et s’en aperçoit.","Ce que le passage montre"),
 ]),
 (None,[
  ("Il juge ses propres résultats.","Argument"),
  ("Au bout de « quinze pages », le Carnet conclut : « Tout cela n’est pas sérieux. »","Le passage qui prouve"),
  ("La phrase négative, sans complément, prend pour objet tout ce qui précède : le texte devient son propre critique.","Ce que le passage montre"),
 ]),
 (None,[
  ("Il expose même ses règles de fabrication.","Argument"),
  ("Dans le même Carnet, un « Nota bene » explique comment disposer des vers « indéformables » « ad libitum ».","Le passage qui prouve"),
  ("Ce mode d’emploi fait du poème un objet qu’on démonte devant le lecteur : le texte parle de sa propre mécanique.","Ce que le passage montre"),
 ]),
 (None,[("Mais au nom de quoi le texte se juge-t-il ainsi, sinon au nom de ce dont il voulait parler ?","Transition : la question ouverte")]),
 ("Deuxième partie",[
  ("Le texte se juge au nom de l’objet : c’est la chose qui commande son commentaire.","Réponse II"),
  ("La règle est posée dès l’ouverture.","Argument"),
  ("« Berges de la Loire » exige d’« En revenir toujours à l’objet lui-même, à ce qu’il a de brut, de différent ».","Le passage qui prouve"),
  ("L’adverbe « toujours » et le verbe « revenir » donnent le sens de tous les retours sur soi : le texte se corrige pour se rapprocher de la chose.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le préambule sur soi est d’ailleurs aussitôt écarté.","Argument"),
  ("Après « Le mimosa et moi », Ponge écrit : « Mais c’est au mimosa lui-même — douce illusion ! qu’il faut maintenant en venir ».","Le passage qui prouve"),
  ("La conjonction « Mais » coupe court au discours sur soi, et l’incise « douce illusion ! » avoue la difficulté sans renoncer : le texte se tourne vers la fleur.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le texte apprend même quelque chose sur le monde.","Argument"),
  ("Dans « La Mounine », il finit par expliquer le ciel de Provence : « le ciel bleu est-il un buvard imprégné de la nuit interstellaire ».","Le passage qui prouve"),
  ("La comparaison avec le buvard est une hypothèse sur le réel, presque une loi physique : au bout de son travail, le texte parle bien du ciel.","Ce que le passage montre"),
 ]),
 (None,[("Si le texte parle de l’objet, pourquoi Ponge garde-t-il dans son livre tout ce qu’il dit de lui-même ?","Transition : la question ouverte")]),
 ("Troisième partie",[
  ("Parce qu’en parlant de lui-même, le texte parle mieux du monde : chez Ponge, l’écriture de soi devient une méthode.","Réponse III : la réponse à la problématique"),
  ("Montrer son travail est la condition de la vérité.","Argument"),
  ("« La Mounine » juge « très légitime au savant de décrire sa découverte par le menu, de raconter ses expériences ».","Le passage qui prouve"),
  ("La comparaison avec le savant change le sens de la réflexivité : le texte ne se contemple pas, il donne ses preuves, comme on publie un protocole.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le mot lui-même devient une prise sur la chose.","Argument"),
  ("« Comme dans tamaris il y a tamis, dans mimosa il y a mima. »","Le passage qui prouve"),
  ("Le jeu sur les syllabes parle des mots, mais il dit aussi la plante : le mimosa « mime », car ses folioles se contractent quand on les touche ; parler du langage, ici, c’est connaître la fleur.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le lecteur est enfin conduit vers la chose.","Argument"),
  ("Ponge annonce : « Il faut que je prenne le lecteur par la main », pour le conduire jusqu’« au cœur du bosquet de mimosas, entre deux infinis d’azur ».","Le passage qui prouve"),
  ("Le texte qui parle de lui-même est un chemin, et ce chemin aboutit à un bosquet : l’écriture se retourne sur elle-même pour emmener quelqu’un ailleurs.","Ce que le passage montre"),
 ]),
 ("Conclusion",[
  ("L’affirmation ne s’applique donc qu’en partie : le texte de Ponge parle beaucoup de lui-même, mais jamais seulement, car c’est l’objet qui lui donne la parole.","Conclusion : la réponse"),
  ("Le texte parle beaucoup de lui-même ; il se juge pourtant au nom de l’objet ; et cette parole sur soi devient chez Ponge une méthode pour mieux dire le monde.","Ce que le raisonnement a établi"),
  ("Chez Ponge, la réflexion sur l’écriture n’éloigne pas des choses : elle est la seule manière honnête d’en approcher.","Le lien avec le parcours"),
  ("Reste une question : un lecteur peut-il aimer un texte qui lui montre ses brouillons autant que son objet ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- difficulté (Mimosa)
C["ponge-difficile"] = dict(
 titre="« Qu’il est difficile d’approcher de la caractéristique des choses ! »",
 sujet="« Dans « Le Mimosa », Francis Ponge s’exclame : « Oh ! Qu’il est difficile d’approcher de la caractéristique des choses ! » En quoi cette réflexion vous paraît-elle pouvoir éclairer la démarche poétique à l’œuvre dans La Rage de l’expression ? »",
 session="Bac de français, 2025, voie générale (Antilles-Guyane, épreuve de remplacement, sujet 25-FRGEAG3), dissertation, sujet B",
 pdf="",
 mot=("« approcher de la caractéristique des choses »", "La « caractéristique », c’est la qualité propre d’une chose, celle qui la distingue des autres ; « approcher » dit qu’on ne l’atteint pas d’un coup, et « difficile » que l’effort est long."),
 preuve=("« Je ne choisis pas les sujets les plus faciles : voilà pourquoi je choisis le mimosa. »", 1),
 why=[("Un vrai problème","La difficulté est réelle et avouée ; mais Ponge la choisit, et elle devient la forme même de son livre."),
      ("Un plan sur mesure","L’obstacle, puis la difficulté voulue comme méthode, enfin l’approche devenue œuvre : chaque partie répond à la question laissée par la précédente."),
      ("Des preuves analysées","Le nom « déjà parfait » du mimosa, le choix du sujet difficile, « tourner autour », le Littré, la parenthèse du « Mimosa », les variantes publiées.")],
 blocks=[
 ("Introduction",[
  ("« Non, hélas ! Ce n’est pas encore à propos du mimosa que je ferai la conquête de mon mode d’expression » : au milieu du « Mimosa », Ponge constate qu’il n’a pas réussi.",INTRO[0]),
  ("Un peu plus loin, il s’exclame : « Oh ! Qu’il est difficile d’approcher de la caractéristique des choses ! » ; la « caractéristique » est la qualité propre d’une chose, et « approcher » dit qu’on ne l’atteint jamais d’un coup.",INTRO[1]),
  ("On pourrait penser que cette plainte résume la démarche de "+E+" : un poète aux prises avec des choses qui résistent.",INTRO[2]),
  ("Pourtant, la phrase est placée entre parenthèses, au milieu d’une définition presque trouvée, et Ponge ne se décourage jamais : il choisit ses difficultés.",INTRO[3]),
  ("Dans "+E+", comment une difficulté sans cesse avouée peut-elle devenir le moteur d’une démarche poétique ?",INTRO[4]),
  ("La difficulté est bien un obstacle ; mais Ponge en fait une méthode, et c’est l’approche elle-même, avec ses détours, qui devient l’œuvre.",INTRO[5]),
 ]),
 ("Première partie",[
  ("La difficulté est d’abord un obstacle réel.","Réponse I : la part de vérité du sujet"),
  ("Les mots déjà existants font écran.","Argument"),
  ("Dans « Le Mimosa », Ponge remarque que « le nom du mimosa est déjà parfait ».","Le passage qui prouve"),
  ("L’adverbe « déjà » dit le paradoxe : le nom est si juste qu’il ne laisse plus rien à trouver, et l’écrivain arrive trop tard.","Ce que le passage montre"),
 ]),
 (None,[
  ("Les souvenirs brouillent aussi le regard.","Argument"),
  ("Le mimosa, « l’une de mes adorations » d’enfant, ne l’inspire plus : chaque fois qu’il apparaît, il « me rappelle tout cela et fane » aussitôt.","Le passage qui prouve"),
  ("Le verbe « fane », appliqué à l’image intérieure de la fleur, dit l’effet du souvenir : l’émotion personnelle se dépose sur la chose et l’empêche d’apparaître telle qu’elle est.","Ce que le passage montre"),
 ]),
 (None,[
  ("L’échec est enfin avoué sans détour.","Argument"),
  ("Après dix jours sur le bois de pins, Ponge reconnaît n’avoir gagné « Pas grand-chose pour la peine que je me suis donnée ».","Le passage qui prouve"),
  ("Le ton de comptable, qui compare la peine et le gain, prend la mesure de la difficulté : l’effort ne garantit pas le résultat.","Ce que le passage montre"),
 ]),
 (None,[("Mais pourquoi Ponge s’impose-t-il des sujets qui lui coûtent tant ?","Transition : la question ouverte")]),
 ("Deuxième partie",[
  ("Parce que la difficulté est voulue : elle est la méthode même de Ponge.","Réponse II"),
  ("Ponge la recherche.","Argument"),
  ("« Je ne choisis pas les sujets les plus faciles : voilà pourquoi je choisis le mimosa. »","Le passage qui prouve"),
  ("Le lien logique est inattendu : la difficulté n’est pas ce qui arrive au sujet, elle est la raison de le choisir.","Ce que le passage montre"),
 ]),
 (None,[
  ("Approcher, c’est tourner autour.","Argument"),
  ("« Plus je tourne autour de cet arbuste, plus il me paraît que j’ai choisi un sujet difficile. »","Le passage qui prouve"),
  ("La construction « plus… plus… » lie le mouvement et la difficulté : chaque tour révèle une face nouvelle, et la difficulté mesure ce qu’on découvre.","Ce que le passage montre"),
 ]),
 (None,[
  ("Chaque détour apporte une prise nouvelle.","Argument"),
  ("Ponge va consulter le Littré et considère ses trouvailles comme « un bouquet de preuves a posteriori ».","Le passage qui prouve"),
  ("La métaphore du « bouquet » ramène le dictionnaire à la fleur : le détour par les mots revient enrichir la chose, et la difficulté devient fertile.","Ce que le passage montre"),
 ]),
 (None,[("Si chaque détour rapproche de la chose, la démarche peut-elle jamais aboutir, et que reste-t-il au lecteur ?","Transition : la question ouverte")]),
 ("Troisième partie",[
  ("L’approche ne s’achève pas, et c’est elle qui devient l’œuvre : le livre publie le chemin plutôt que le but.","Réponse III : la réponse à la problématique"),
  ("La place de l’exclamation le montre.","Argument"),
  ("Elle surgit entre parenthèses, au milieu de la définition qui commence : « Chaque branche de mimosa est un perchoir à petits soleils tolérables ».","Le passage qui prouve"),
  ("La parenthèse fait entendre la difficulté au cœur même de la réussite : la caractéristique s’approche à mesure qu’on avoue ne pas la tenir.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le livre garde toutes les étapes.","Argument"),
  ("« Le Mimosa » publie plusieurs états du même poème, présentés comme des « Variante » et des « Autre ».","Le passage qui prouve"),
  ("La succession des versions transforme la difficulté en forme : le lecteur voit le poème s’approcher de la fleur, version après version.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le lecteur partage enfin le chemin.","Argument"),
  ("Ponge veut prendre « le lecteur par la main », « au risque de s’ennuyer par mes longs détours ».","Le passage qui prouve"),
  ("Les « longs détours » deviennent un parcours commun : la difficulté n’est plus celle du seul poète, elle est l’expérience offerte au lecteur.","Ce que le passage montre"),
 ]),
 ("Conclusion",[
  ("L’exclamation éclaire donc la démarche de "+E+", à condition de l’entendre comme un programme autant qu’une plainte : la difficulté est le chemin choisi.","Conclusion : la réponse"),
  ("La difficulté est un obstacle réel ; Ponge la choisit pourtant comme méthode ; et le livre fait du chemin vers la chose son œuvre même.","Ce que le raisonnement a établi"),
  ("La « rage » du titre est là : ne jamais se contenter du nom déjà trouvé, et faire de l’approche de la chose une œuvre.","Le lien avec le parcours"),
  ("Reste une question : une œuvre qui publie son chemin peut-elle jamais être achevée ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- prendre le lecteur par la main
C["ponge-lecteur"] = dict(
 titre="« Prendre le lecteur par la main » ?",
 sujet="Le sujet cite un passage de « Le Mimosa » qui commence par « Il faut que je prenne le lecteur par la main […] », puis demande : « Cette affirmation éclaire-t-elle, selon vous, le projet poétique du recueil La Rage de l’expression ? »",
 session="Bac de français, juin 2024, voie générale (Amérique du Nord, sujet 24-FRGEAN1), dissertation n° 2",
 pdf="",
 mot=("« prendre le lecteur par la main »", "Prendre quelqu’un par la main, c’est le guider pas à pas, comme un enfant ou un visiteur ; le poète promet un chemin et une récompense."),
 preuve=("« eh bien, cher lecteur, patience ! »", 1),
 why=[("Un vrai problème","Ponge guide bien son lecteur ; mais le guide se perd, la récompense se dérobe, et le lecteur devient compagnon de recherche."),
      ("Un plan sur mesure","Le guide qui promet, puis le chemin qui égare, enfin un lecteur conduit vers sa propre manière de voir."),
      ("Des preuves analysées","« cher lecteur, patience ! », « L’on apercevra », « Ce que j’aurais envie de lire », les « longs détours », le poème promis de « La Mounine », « l’esprit humain ».")],
 blocks=[
 ("Introduction",[
  ("« Embaume cette page, ombrage mon lecteur » : dans « Le Mimosa », Ponge demande à la fleur elle-même d’accueillir celui qui lit.",INTRO[0]),
  ("Plus loin, il annonce : « Il faut que je prenne le lecteur par la main » ; prendre quelqu’un par la main, c’est le guider pas à pas, et Ponge lui promet une récompense « au cœur du bosquet de mimosas ».",INTRO[1]),
  ("On pourrait penser que cette image éclaire le projet du recueil : un poète qui conduit son lecteur vers les choses.",INTRO[2]),
  ("Pourtant, la phrase vient après un aveu d’échec, et le livre multiplie les détours, les brouillons et les poèmes inachevés : le guide semble lui-même chercher son chemin.",INTRO[3]),
  ("Comment le projet de Ponge peut-il consister à guider le lecteur, si le guide ne sait pas encore où il va ?",INTRO[4]),
  ("Ponge guide bien son lecteur ; mais le chemin l’égare autant que lui, et c’est en partageant la recherche que le recueil conduit le lecteur vers sa propre manière de voir.",INTRO[5]),
 ]),
 ("Première partie",[
  ("Ponge veut d’abord guider son lecteur.","Réponse I : la part de vérité du sujet"),
  ("Il s’adresse directement à lui.","Argument"),
  ("À la fin de « La Guêpe », il lui demande d’attendre : « eh bien, cher lecteur, patience ! »","Le passage qui prouve"),
  ("L’apostrophe familière et l’exclamation créent une complicité : le lecteur est un compagnon qu’on ménage.","Ce que le passage montre"),
 ]),
 (None,[
  ("Il annonce aussi le chemin à suivre.","Argument"),
  ("La préface de « L’Œillet » prévient : « L’on apercevra par les exemples qui suivent quels importants déblais cela suppose ».","Le passage qui prouve"),
  ("Le futur et le mot « exemples » font de la préface un plan de visite : le guide montre d’avance ce qu’on va voir.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le livre est même pensé pour le plaisir de lire.","Argument"),
  ("En 1940, Ponge se fixe un titre possible : « « Ce que j’aurais envie de lire » : tel pourrait être le titre, telle la définition de ce que j’écrirai ».","Le passage qui prouve"),
  ("Le poète se met à la place du lecteur : son projet part du désir de celui qui ouvrira le livre.","Ce que le passage montre"),
 ]),
 (None,[("Mais où ce guide mène-t-il, s’il cherche encore son chemin ?","Transition : la question ouverte")]),
 ("Deuxième partie",[
  ("Il mène là où il se perd lui-même : la récompense promise se dérobe.","Réponse II"),
  ("La promesse naît d’un échec.","Argument"),
  ("Elle suit l’aveu : « Ce n’est pas encore à propos du mimosa que je ferai la conquête de mon mode d’expression », et Ponge ajoute : « Il ne me reste qu’un procédé. »","Le passage qui prouve"),
  ("Le tour restrictif « ne… qu’un » montre que guider le lecteur est un dernier recours : faute d’atteindre la chose, Ponge l’emmène avec lui.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le chemin est long et risqué.","Argument"),
  ("Ponge supplie le lecteur « de se laisser conduire au risque de s’ennuyer par mes longs détours ».","Le passage qui prouve"),
  ("Le verbe « supplier » et l’aveu de l’ennui renversent l’image du guide sûr de lui : celui qui conduit demande pardon d’avance.","Ce que le passage montre"),
 ]),
 (None,[
  ("La récompense n’arrive pas toujours.","Argument"),
  ("« La Mounine » se clôt sur un poème promis par le titre, « mais que passion trop vive, infirmité, scrupules nous n’avons pu encore nous offrir ».","Le passage qui prouve"),
  ("L’énumération des empêchements et l’adverbe « encore » laissent le lecteur au bord du bosquet : le guide n’a pas tenu sa promesse.","Ce que le passage montre"),
 ]),
 (None,[("Si la récompense se dérobe, vers quoi le lecteur est-il vraiment conduit ?","Transition : la question ouverte")]),
 ("Troisième partie",[
  ("Le lecteur est conduit vers sa propre manière de voir : le chemin lui-même est la récompense.","Réponse III : la réponse à la problématique"),
  ("Le lecteur voit la recherche se faire.","Argument"),
  ("Dans « La Mounine », Ponge veut publier « l’histoire complète de sa recherche, le journal de son exploration ».","Le passage qui prouve"),
  ("Le « journal » fait du lecteur un témoin des étapes : il ne reçoit pas un bouquet tout fait, il assiste à sa cueillette.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le lecteur apprend ainsi à regarder.","Argument"),
  ("Le but est de « Faire gagner à l’esprit humain ces qualités, dont il est capable et que seule sa routine l’empêche de s’approprier ».","Le passage qui prouve"),
  ("Le verbe « gagner » donne au lecteur le bénéfice du travail : la vraie récompense est un regard libéré de la « routine ».","Ce que le passage montre"),
 ]),
 (None,[
  ("Le lecteur peut même poursuivre seul.","Argument"),
  ("« D’autres viendront qui utiliseront mieux que moi les procédés que j’indique. »","Le passage qui prouve"),
  ("Le futur ouvre le livre sur ses successeurs : le guide lâche la main pour que d’autres continuent le chemin.","Ce que le passage montre"),
 ]),
 ("Conclusion",[
  ("L’image éclaire donc le projet du recueil, à condition de la prendre au sérieux jusqu’au bout : Ponge tient la main du lecteur, mais pour l’emmener dans sa recherche, non pour le déposer devant un bouquet.","Conclusion : la réponse"),
  ("Ponge veut guider son lecteur ; mais le guide se perd et la récompense se dérobe ; et c’est le chemin lui-même, publié avec ses détours, qui devient le don fait au lecteur.","Ce que le raisonnement a établi"),
  ("Le bosquet de mimosas « entre deux infinis d’azur » reste un horizon : ce que le lecteur gagne en chemin, c’est une autre manière de regarder les choses.","Le lien avec le parcours"),
  ("Reste une question : un lecteur qu’on emmène dans une recherche inachevée en devient-il un peu l’auteur ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- l'écriture en plein travail
C["ponge-ecriture-travail"] = dict(
 titre="« L’écriture en plein travail et se regardant travailler » ?",
 sujet="« Selon un critique, " + E + " donne à voir « l’écriture en plein travail et se regardant travailler ». Cette citation éclaire-t-elle votre lecture de l’œuvre ? »",
 session="Bac de français, juin 2024, voie générale (métropole, sujet 24-FRGEME1), dissertation, sujet B",
 pdf="",
 mot=("« en plein travail et se regardant travailler »", "« En plein travail » : l’écriture est saisie pendant qu’elle se fait, avec ses essais. « Se regardant travailler » : elle s’observe et se juge elle-même."),
 preuve=("« Ce qui importe chez moi, c’est le sérieux avec lequel j’approche de l’objet »", 2),
 why=[("Un vrai problème","Le livre montre bien ses chantiers et ses jugements sur lui-même ; mais ce regard sur soi est sans cesse corrigé par le regard sur la chose."),
      ("Un plan sur mesure","Le chantier visible, puis un regard sur soi qui obéit à l’objet, enfin ce double regard devenu la forme d’une œuvre nouvelle."),
      ("Des preuves analysées","Les dates et variantes du Carnet, le jugement « Tout cela n’est pas sérieux », la règle de « Berges de la Loire », les sanglots de « La Mounine ».")],
 blocks=[
 ("Introduction",[
  ("« Mots à chercher dans Littré : (j’en suis à ce point) » : dans « Le Carnet du bois de pins », Ponge note jusqu’à l’endroit où il est arrivé.",INTRO[0]),
  ("Un critique voit dans "+E+" « l’écriture en plein travail et se regardant travailler » : saisie pendant qu’elle se fait, et capable de se juger elle-même.",INTRO[1]),
  ("On pourrait penser que la formule décrit exactement le recueil, fait de brouillons datés, de variantes et de commentaires de l’auteur sur son travail.",INTRO[2]),
  ("Pourtant, Ponge ne cesse de se détourner de lui-même pour revenir aux choses, et il se méfie de l’écrivain qui se contemple.",INTRO[3]),
  ("Que devient une écriture qui se regarde travailler, quand c’est l’objet qui doit juger son travail ?",INTRO[4]),
  ("L’écriture de Ponge se montre bien en plein travail ; mais elle se regarde avec les yeux de l’objet, et ce double regard devient la forme d’une œuvre nouvelle.",INTRO[5]),
 ]),
 ("Première partie",[
  ("Le recueil montre d’abord l’écriture en plein travail.","Réponse I : la part de vérité de la citation"),
  ("Le temps du travail est visible.","Argument"),
  ("Les notes du Carnet passent du « 7 août 1940 » au « 9 août 1940 — Le soir », puis au « 13 août 1940 — Matin ».","Le passage qui prouve"),
  ("Les dates précises, jusqu’au moment de la journée, font entendre le rythme d’un chantier : le lecteur suit l’écriture heure par heure.","Ce que le passage montre"),
 ]),
 (None,[
  ("Les essais successifs sont conservés.","Argument"),
  ("Le même Carnet aligne des versions intitulées « Variante » et « Autre », où les mêmes vers reviennent avec de légers changements.","Le passage qui prouve"),
  ("La reprise presque identique des vers montre l’écriture au moment où elle hésite : le brouillon devient le texte.","Ce que le passage montre"),
 ]),
 (None,[
  ("L’écriture se regarde et se juge.","Argument"),
  ("Après ces variantes, Ponge écrit : « Tout cela n’est pas sérieux. Qu’ai-je gagné pendant ces quinze pages (pp. 119 à 141) et ces dix jours ? »","Le passage qui prouve"),
  ("La question, qui cite les numéros de ses propres pages, fait de l’auteur le lecteur critique de son livre.","Ce que le passage montre"),
 ]),
 (None,[("Mais ce regard que l’écriture porte sur elle-même, d’où lui vient son critère ?","Transition : la question ouverte")]),
 ("Deuxième partie",[
  ("Il lui vient de l’objet : l’écriture ne se regarde travailler que pour mieux regarder la chose.","Réponse II"),
  ("La règle est fixée dès l’ouverture.","Argument"),
  ("« Berges de la Loire » s’interdit de « sacrifier jamais l’objet de mon étude à la mise en valeur de quelque trouvaille verbale ».","Le passage qui prouve"),
  ("La « trouvaille » est précisément ce dont une écriture qui se regarde serait fière : Ponge la soumet d’avance à l’objet.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le regard sur soi est un regard sur sa manière d’approcher.","Argument"),
  ("Dans le Carnet, Ponge se juge ainsi : « Ce qui importe chez moi, c’est le sérieux avec lequel j’approche de l’objet ».","Le passage qui prouve"),
  ("Même quand il parle de lui, Ponge parle de son rapport à la chose : « approche » est le verbe d’un regard tourné vers le dehors.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le travail apprend d’ailleurs quelque chose sur le monde.","Argument"),
  ("Au terme des « quinze pages », Ponge retient une seule découverte : « du soleil à travers le bois de pins il ne reste que de la pénombre des rubans obliques, tendus et des mouches sans sommeil ».","Le passage qui prouve"),
  ("Le bilan du travail est une vérité sur la lumière : l’écriture s’est regardée, mais pour voir enfin le bois.","Ce que le passage montre"),
 ]),
 (None,[("Si ce regard sur soi sert la chose, pourquoi Ponge en fait-il le texte même de son livre ?","Transition : la question ouverte")]),
 ("Troisième partie",[
  ("Parce que ce double regard invente une forme : le livre devient le journal d’une recherche.","Réponse III : la réponse à la problématique"),
  ("Montrer son travail devient un principe.","Argument"),
  ("Dans « La Mounine », Ponge juge qu’« il est intéressant de montrer le processus de « ma pensée » » et qu’il est légitime au savant « de raconter ses expériences ».","Le passage qui prouve"),
  ("Les guillemets autour de « ma pensée » mettent le moi à distance : ce que l’écriture regarde, c’est un processus, non une personne.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le regard sur le travail fait même apparaître l’émotion qui l’a lancé.","Argument"),
  ("Ponge reconstitue l’origine de « La Mounine » : quand apparurent les statues, « mon émotion tout à coup fut décuplée : il y eut sanglot ».","Le passage qui prouve"),
  ("La phrase finale, brève et impersonnelle, saisit l’émotion comme un fait d’expérience : l’écriture se regarde pour comprendre ce qui l’a fait naître.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le livre garde enfin le poème à venir comme horizon.","Argument"),
  ("« La Mounine » s’achève sur l’espoir d’écrire un jour « d’un trait simple et aisé » le poème promis par le titre.","Le passage qui prouve"),
  ("L’opposition entre « d’un trait » et les pages laborieuses qui précèdent montre que l’œuvre est le travail lui-même, tendu vers une facilité qu’il prépare.","Ce que le passage montre"),
 ]),
 ("Conclusion",[
  ("La citation éclaire donc "+E+", à condition de préciser ce que l’écriture regarde : son travail, mais toujours à la lumière de la chose.","Conclusion : la réponse"),
  ("Le recueil montre l’écriture en plein travail ; ce regard sur soi prend pourtant son critère dans l’objet ; et ce double regard invente une forme, le journal d’une recherche.","Ce que le raisonnement a établi"),
  ("Ponge invente ainsi une œuvre où le chantier n’est plus caché derrière le poème : il est le poème.","Le lien avec le parcours"),
  ("Reste une question : un poème qui garde ses chantiers peut-il encore être lu d’une traite ?","La question qui reste ouverte"),
 ]),
 ])

# ---------------------------------------------------------------- ne donner à voir que son travail
C["ponge-donner-a-voir"] = dict(
 titre="Ne donner à voir que son travail d’écriture ?",
 sujet="« Dans " + E + ", pensez-vous que Francis Ponge ne cherche à donner à voir que son travail d’écriture ? »",
 session="Bac de français, juin 2024, voie générale (Polynésie, sujet 24-FRGEPO1), dissertation, sujet B",
 pdf="",
 mot=("« ne cherche à donner à voir que son travail d’écriture »", "« Donner à voir », c’est rendre visible ; « ne… que » restreint ce qu’on voit au seul travail d’écriture, comme si les choses passaient au second plan."),
 preuve=("la guêpe qui « semble vivre dans un état de crise continue qui la rend dangereuse »", 1),
 why=[("Un vrai problème","Ponge montre bien son travail ; mais il donne aussi à voir des choses et une manière de vivre parmi elles."),
      ("Un plan sur mesure","Le travail rendu visible, puis les choses rendues visibles, enfin un regard sur le monde offert au lecteur."),
      ("Des preuves analysées","L’essoufflement des « Notes prises pour un oiseau », la guêpe en « crise continue », le ciel « blâmé » de Provence, les aéroplanes, la « rédemption des choses ».")],
 blocks=[
 ("Introduction",[
  ("« Je croyais pouvoir écrire mille pages sur n’importe quel objet, et voici qu’à moins de cinq je suis essoufflé » : dans « Notes prises pour un oiseau », Ponge montre son travail au moment où il cale.",INTRO[0]),
  ("Le sujet demande s’il ne cherche à « donner à voir » « que » son travail d’écriture : rendre visible le seul atelier, au détriment de ce dont il parle.",INTRO[1]),
  ("On pourrait penser que oui : "+E+" expose des brouillons, des variantes et des commentaires sur la manière d’écrire.",INTRO[2]),
  ("Pourtant, le lecteur referme le livre avec des images très précises dans les yeux : une guêpe sur une prune, un bois de pins, un ciel de Provence.",INTRO[3]),
  ("Que donne vraiment à voir une œuvre qui montre son travail d’écriture ?",INTRO[4]),
  ("Ponge donne bien à voir son travail ; mais ce travail fait voir les choses, et, à travers elles, une manière d’habiter le monde.",INTRO[5]),
 ]),
 ("Première partie",[
  ("Ponge donne d’abord à voir son travail d’écriture.","Réponse I : la part de vérité du sujet"),
  ("Il montre ses difficultés.","Argument"),
  ("Dans « Notes prises pour un oiseau », l’essoufflement le pousse vers les dictionnaires, et il se tourne « vers la compilation ».","Le passage qui prouve"),
  ("L’aveu, avec le présent « je suis essoufflé », fait voir l’écrivain dans l’effort : le lecteur assiste à la panne.","Ce que le passage montre"),
 ]),
 (None,[
  ("Il montre ses outils.","Argument"),
  ("Dans « Le Mimosa », il raconte : « j’allai à la bibliothèque consulter le Littré, la Grande Encyclopédie, le Larousse ».","Le passage qui prouve"),
  ("Le passé simple fait de la recherche un petit récit : l’écriture sort de la page pour aller chercher ses matériaux.","Ce que le passage montre"),
 ]),
 (None,[
  ("Il montre ses jugements sur lui-même.","Argument"),
  ("Dans le Carnet, il a « honte de l’académisme de [sa] vision ».","Le passage qui prouve"),
  ("Le mot « honte » expose ce qu’un écrivain cache d’habitude : le travail se voit jusque dans ses défaillances.","Ce que le passage montre"),
 ]),
 (None,[("Mais ce travail, que fait-il voir d’autre que lui-même ?","Transition : la question ouverte")]),
 ("Deuxième partie",[
  ("Ce travail donne à voir les choses, mieux que ne le ferait une description.","Réponse II"),
  ("Les images rendent visible une manière d’être.","Argument"),
  ("Dans « La Guêpe », l’insecte « semble vivre dans un état de crise continue qui la rend dangereuse ».","Le passage qui prouve"),
  ("L’expression « crise continue » fait voir le vol vibrant et nerveux de la guêpe : on la reconnaît à son agitation plus qu’à ses couleurs.","Ce que le passage montre"),
 ]),
 (None,[
  ("Les choses les plus banales deviennent étranges.","Argument"),
  ("L’oiseau, posé, se replie « comme un canif à plusieurs lames et outils ».","Le passage qui prouve"),
  ("La comparaison avec un objet de poche fait voir l’ingéniosité du repli des ailes : le lecteur découvre ce qu’il n’avait jamais regardé.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le travail rend même visible ce qui échappe à la vue.","Argument"),
  ("Dans « La Mounine », le ciel limpide apparaît « tout mélangé d’ombre. Comme blâmé... Ciel blâmé ».","Le passage qui prouve"),
  ("La reprise de « blâmé », que Ponge rapproche ensuite de « blême », fait voir une couleur que personne ne nomme : un bleu chargé de nuit.","Ce que le passage montre"),
 ]),
 (None,[("Si le travail donne à voir les choses, à qui et pour quoi les donne-t-il à voir ?","Transition : la question ouverte")]),
 ("Troisième partie",[
  ("Aux hommes, pour qu’ils habitent autrement le monde : Ponge donne à voir une manière de vivre parmi les choses.","Réponse III : la réponse à la problématique"),
  ("Voir mieux, c’est agir mieux.","Argument"),
  ("« Notes prises pour un oiseau » s’achève sur un vœu : Ponge s’est appliqué à l’oiseau « pour que nous fabriquions des aéroplanes perfectionnés, que nous ayons une meilleure prise sur le monde ».","Le passage qui prouve"),
  ("Le pronom « nous » élargit le travail à toute l’humanité : ce que Ponge donne à voir sert à vivre.","Ce que le passage montre"),
 ]),
 (None,[
  ("Les choses entrent ainsi dans le monde humain.","Argument"),
  ("Dans l’appendice du Carnet, Ponge souhaite « La naissance au monde humain des choses les plus simples, leur prise de possession par l’esprit de l’homme ».","Le passage qui prouve"),
  ("La métaphore de la « naissance » donne au travail d’écriture une portée presque morale : nommer, c’est faire exister pour les hommes.","Ce que le passage montre"),
 ]),
 (None,[
  ("Le bois de pins lui-même attendait d’être vu.","Argument"),
  ("Ponge l’interpelle : « Bois de pins, sortez de la mort, de la non-remarque, de la non-conscience ! »","Le passage qui prouve"),
  ("L’apostrophe et les néologismes en « non- » montrent ce que l’écriture combat : l’invisibilité des choses ordinaires.","Ce que le passage montre"),
 ]),
 ("Conclusion",[
  ("Ponge ne cherche donc pas seulement à donner à voir son travail : il le montre pour faire voir les choses, et pour changer notre regard sur elles.","Conclusion : la réponse"),
  ("Ponge donne à voir son travail ; ce travail fait voir les choses ; et il les donne aux hommes pour changer leur regard.","Ce que le raisonnement a établi"),
  ("L’atelier ouvert de "+E+" est une fenêtre : on y voit l’écrivain travailler, et, à travers lui, la guêpe, l’oiseau et le ciel.","Le lien avec le parcours"),
  ("Reste une question : une œuvre qui ouvre son atelier fait-elle de son lecteur un apprenti ?","La question qui reste ouverte"),
 ]),
 ])
