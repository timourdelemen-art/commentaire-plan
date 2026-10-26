"""Copies à 20 des sujets d’imagination qui n’en avaient pas (docs/protocole-brevet.md, § 7 ; échelle descriptive du sujet d’imagination).
Chaque copie remobilise le texte de l’épreuve, respecte le genre et l’énonciation demandés, avance par étapes et mêle les types de discours.
Blocs : (titre ou None, [(phrase, fonction)]) ; une réplique de dialogue forme son propre bloc. Langue d’un excellent élève de troisième."""

COPIES = [
 dict(sujet='2026-centres-etrangers-imagination', ancre='copie-zoo-2026', titre='Deux évadés au centre commercial', blocs=[
  ('L’évasion', [
   ('Un matin de mars 2026, un soigneur distrait oublia de verrouiller l’enclos des ours, et deux pensionnaires du zoo de la ville, une vieille ourse brune et un jeune loup, se glissèrent dehors.', 'Situation de départ : comme chez Zola, deux animaux s’échappent au matin, par la négligence d’un homme'),
   ('Ils traversèrent le bois en reniflant l’herbe mouillée, puis, attirés par une grande lumière, poussèrent les portes vitrées d’un centre commercial qui venait d’ouvrir.', 'Le lieu qui étonne : on y entre par étapes'),
   ('Des escaliers montaient tout seuls, une musique sans musiciens tombait du plafond, et partout des hommes marchaient en regardant de petits rectangles lumineux qu’ils tenaient dans la main.', 'La description vue par les animaux : des objets ordinaires deviennent étranges')]),
  (None, [('— Regarde, souffla le loup, ils portent tous une lampe et ne regardent jamais devant eux. Ce sont des chasseurs ?', 'Le dialogue : le regard naïf, qui fait sourire et réfléchir')]),
  (None, [('— Je ne crois pas, répondit l’ourse. Je les observe depuis trente ans : ils viennent nous voir, puis ils regardent leur lampe au lieu de nous regarder.', 'Le dialogue : l’ourse, plus âgée, interprète ce qu’elle voit')]),
  ('La promenade', [
   ('Ils s’arrêtèrent devant une vitrine où des chaussures tournaient lentement sur un plateau, comme des proies offertes.', 'La comparaison qui garde le point de vue animal'),
   ('Le loup voulut les attraper, se cogna le museau contre la vitre et recula, vexé, sous les éclats de rire d’un enfant.', 'Une péripétie : le comique, comme chez Zola'),
   ('Personne d’autre ne s’étonnait de voir une ourse et un loup au rayon des chaussures : les adultes, penchés sur leurs écrans, passaient à côté sans lever la tête.', 'Ce qui fait réfléchir le lecteur : les hommes ne voient plus ce qui les entoure'),
   ('Plus loin, une odeur de viande grillée les attira vers des comptoirs où des hommes mangeaient debout, très vite, sans se regarder ; l’ourse, qui mettait une heure à savourer une pomme, n’en revenait pas.', 'Un deuxième lieu qui étonne : la hâte des hommes, vue par une bête patiente')]),
  (None, [('— Maman, il y a un loup ! cria une petite fille. Sa mère répondit sans lever les yeux : « Oui, ma chérie, c’est sûrement une publicité. »', 'Le dialogue : seule l’enfant voit encore ce qui est là')]),
  (None, [('— C’est étrange, murmura l’ourse : chez nous, ils ont peur ; ici, ils ne nous voient même pas.', 'Le dialogue : l’idée du texte dite par un personnage')]),
  (None, [('— Alors ce sont eux qui sont en cage, dit le loup en montrant les murs sans fenêtres, les lumières qui ne s’éteignaient jamais et les portes qui ne s’ouvraient que pour vendre.', 'Le dialogue : la « cage des hommes » de Zola, transposée en 2026')]),
  ('Le retour', [
   ('À midi, la foule devint si épaisse et si bruyante que le loup sentit son cœur battre comme pendant un orage.', 'La progression : le malaise grandit, comme la peur de la Hyène'),
   ('Les deux évadés retrouvèrent la sortie, traversèrent le bois et se couchèrent près de leur enclos, que le soigneur n’avait même pas refermé.', 'La fin du récit : le retour volontaire'),
   ('— Rentrons, dit l’ourse ; au moins, ici, on voit le ciel.', 'La chute : un mot qui renverse le zoo et la ville')])],
  valorise=[('Remobiliser le texte', 'l’évasion au matin, la négligence d’un homme, la « cage des hommes » et la peur qui grandit viennent de Zola, transposés en 2026.'),
            ('Imagination', 'le lieu choisi, un centre commercial, permet un regard naïf qui critique notre époque.'),
            ('Types de discours', 'récit, description et dialogue alternent ; chaque réplique fait avancer le sens.')]),

 dict(sujet='2025-metropole-imagination', ancre='copie-lettre-marseille', titre='Lettre de Marseille', blocs=[
  ('L’en-tête', [
   ('Marseille, le 18 octobre 1931', 'La forme de la lettre : le lieu et la date, sans anachronisme'),
   ('Chers parents,', 'La formule d’appel')]),
  ('L’arrivée', [
   ('Je vous écris enfin, après deux semaines si pleines que je n’ai pas trouvé une heure à moi.', 'L’entrée en matière : la situation de la lettre'),
   ('Vous vous souvenez de mon arrivée : en haut du grand escalier de la gare, j’ai vu la ville entière à mes pieds, ses toits, ses clochers et, tout au bout, la mer.', 'Remobiliser le texte : le moment du grand escalier'),
   ('Ce premier regard ne m’a pas quittée.', 'L’impression, en une phrase courte')]),
  ('Les lieux', [
   ('Chaque matin, je descends vers le Vieux-Port, où les pêcheurs crient le prix des sardines au milieu des odeurs de poisson, de goudron et d’oranges.', 'Les lieux explorés : une description par les sens'),
   ('Le jeudi, je pars marcher seule dans les collines : je grimpe parmi les pins et les cailloux blancs jusqu’à des criques d’un bleu que je n’avais jamais vu.', 'Les lieux explorés : la liberté de la marche, sans connaissance particulière de la ville'),
   ('Ne vous inquiétez pas : j’emporte du pain, une carte, et je rentre avant la nuit.', 'L’adresse aux parents : la lettre répond à leurs inquiétudes'),
   ('Dimanche, je suis montée jusqu’à Notre-Dame-de-la-Garde : de là-haut, la ville ressemble à un grand coquillage blanc posé au bord de l’eau, et les bateaux qui entrent au port paraissent des jouets.', 'Les lieux explorés : une image qui fait voir la ville d’en haut')]),
  ('Les personnes', [
   ('Au lycée, mes élèves sont curieuses et bavardes ; l’une d’elles m’a déjà demandé si les professeurs de Paris étaient tous aussi jeunes que moi.', 'Les personnes rencontrées : le métier d’enseignante'),
   ('Ma logeuse, une vieille dame qui parle avec un accent chantant, m’a appris à dire « bonjour » à la marchande de fleurs et à ne jamais me presser.', 'Les personnes rencontrées : un portrait en deux traits'),
   ('Hier, sur le quai, un vieux marin m’a raconté ses voyages jusqu’en Indochine ; je l’écoutais comme on lit un roman d’aventures.', 'Les personnes rencontrées : une rencontre inventée, fidèle à l’époque')]),
  ('Les impressions', [
   ('Pour la première fois de ma vie, personne ne décide de mes journées à ma place : je travaille, je marche, je lis, je choisis.', 'Les impressions : la liberté nouvelle, comme dans le texte'),
   ('Parfois, le soir, la solitude me serre un peu le cœur ; mais il suffit que j’ouvre ma fenêtre sur les lumières du port pour que l’envie de tout découvrir revienne.', 'Les impressions : la solitude, puis l’enthousiasme qui l’emporte'),
   ('Je découvre aussi que je sais me débrouiller seule : trouver mon chemin, préparer mes leçons, choisir mes repas et mes promenades.', 'Les impressions : la fierté de l’autonomie'),
   ('Je crois que cette ville et moi, nous nous sommes choisies.', 'Une image : la rencontre avec la ville')]),
  ('La fin de la lettre', [
   ('Écrivez-moi vite ; racontez-moi Paris, qui me semble déjà si loin.', 'La clôture : on attend une réponse'),
   ('Je vous embrasse tendrement,', 'La formule de politesse'),
   ('Simone', 'La signature')])],
  valorise=[('Remobiliser le texte', 'le grand escalier, la liberté nouvelle, la solitude et l’émerveillement viennent de l’extrait de Beauvoir.'),
            ('Respect de la consigne', 'les expériences, les lieux, les personnes et les impressions sont tous traités, dans une vraie lettre à des parents.'),
            ('Langue', 'descriptions sensorielles, phrases variées, aucun anachronisme (1931).')]),

 dict(sujet='2025-antilles-guyane-imagination', ancre='copie-nouveau-eleve', titre='Un nouveau dans la classe de Charles', blocs=[
  ('L’arrivée', [
   ('« Voici un élève que je vous recommande, il entre en cinquième. »', 'Le début imposé par la consigne'),
   ('Le proviseur avait parlé à demi-voix, mais nous avions tous levé la tête de nos cahiers, et Charles Bovary, au fond de la classe, avait rougi jusqu’aux oreilles.', 'Le « nous » des élèves, comme chez Flaubert ; Charles se souvient de sa propre arrivée'),
   ('La classe sentait l’encre et le poêle à bois ; dehors, on entendait le pas des surveillants dans la cour.', 'Le décor, en une phrase'),
   ('Il resta un moment près de la porte, sans savoir où poser les yeux, comme quelqu’un qui attend qu’on le juge.', 'Le point de vue : la gêne du nouveau, vue par la classe'),
   ('Le nouveau était petit et maigre, avec de grands yeux noirs et des cheveux bouclés que la pluie avait plaqués sur son front.', 'La description du nouvel élève : le visage'),
   ('Il serrait contre lui un cartable trop gros, d’où dépassaient des livres attachés par une ficelle, et ses souliers, couverts de boue, laissaient des traces sur le plancher.', 'La description : des détails qui pourraient faire rire')]),
  ('Le moment où tout peut mal tourner', [
   ('Quand le professeur lui demanda son nom, il voulut se lever, la ficelle céda, et ses livres s’éparpillèrent jusqu’au premier rang.', 'La péripétie : un accident, comme la casquette de Charles'),
   ('Je sentis le rire monter dans la classe, ce rire qui avait accueilli Charles l’année d’avant et qui écrase un nouveau dès le premier jour.', 'Remobiliser le texte : le rire de la classe chez Flaubert')]),
  (None, [('— Attends, je vais t’aider, dit alors Charles, qui s’était levé avant tout le monde.', 'Le retournement : celui dont on a ri empêche qu’on rie d’un autre')]),
  (None, [('— Merci, murmura le nouveau. Je m’appelle Paul Lemercier. Mon père est pêcheur à Dieppe.', 'Le dialogue : le nouveau ose se présenter')]),
  ('Les réactions', [
   ('Personne n’osa rire : on regardait Charles, si maladroit d’habitude, ramasser les livres un à un et les poser bien droits sur le pupitre.', 'Les réactions des élèves : la surprise remplace la moquerie'),
   ('Lucien, qui riait toujours le premier, rendit même à Paul un crayon qui avait roulé sous son banc.', 'Les réactions : même le plus moqueur change d’attitude'),
   ('Le professeur, soulagé, installa Paul à côté de lui et dit simplement : « Bien, monsieur Bovary. »', 'La réaction du professeur'),
   ('À la récréation, Paul nous raconta la mer, les filets et les tempêtes ; nous, qui n’avions jamais vu l’océan, l’écoutions bouche bée.', 'La progression : le nouveau devient intéressant'),
   ('Le soir, il savait déjà nos noms, et il s’assit au réfectoire entre Charles et moi.', 'L’intégration, en un geste')]),
  ('La fin', [
   ('Charles ne parla jamais de ce qu’il avait fait ce matin-là ; mais je crois qu’en aidant Paul, il avait enfin effacé son propre premier jour.', 'La chute : le narrateur comprend le geste de Charles')])],
  valorise=[('Respect de la consigne', 'le début imposé, une description précise du nouvel élève, les réactions des personnages, et une arrivée qui se passe bien.'),
            ('Remobiliser le texte', 'le « nous » des élèves, le proviseur, le rire de la classe et Charles lui-même viennent de Flaubert.'),
            ('Imagination', 'faire de Charles celui qui aide donne au récit un sens : on ne refait pas à un autre ce qu’on a subi.')]),
 dict(sujet='2026-asie-imagination', ancre='copie-commandante', titre='La commandante parle aux élèves', blocs=[
  ('Le début du discours', [
   ('« Bonjour à toutes et à tous, et merci de m’accueillir.', 'Le discours direct : on s’adresse à des élèves'),
   ('Il y a un an, je partais pour ma première traversée comme commandante d’un navire de commerce, et je voudrais vous raconter ce que j’y ai appris.', 'La situation : la première traversée')]),
  ('Le récit', [
   ('Le premier matin, quand je suis montée à bord, j’ai salué l’équipage ; certains m’ont répondu du bout des lèvres, d’autres ont continué à parler entre eux comme si je n’étais pas là.', 'Remobiliser le texte : l’attitude des collègues'),
   ('Un officier m’a même demandé, en souriant, si je savais lire une carte.', 'Un détail précis qui fait voir le mépris'),
   ('J’ai senti la colère, puis la honte, puis une grande solitude, au milieu de l’océan, avec vingt hommes qui doutaient de moi.', 'Ce qu’elle a ressenti : une gradation de sentiments'),
   ('Alors j’ai fait mon travail, sans élever la voix : j’étais sur le pont avant tout le monde, je vérifiais chaque calcul, je répondais à chaque question.', 'Le récit : l’autorité gagnée par le travail, comme dans le texte'),
   ('Au milieu de la traversée, nous avons affronté six jours de tempête ; je dormais deux heures par nuit, et je descendais moi-même vérifier la cargaison quand le navire roulait trop fort.', 'Le récit : une épreuve partagée avec l’équipage'),
   ('Une nuit, j’ai donné l’ordre de changer de route ; quelques heures plus tard, on a appris qu’un autre navire avait été gravement endommagé sur la route que nous avions quittée.', 'La péripétie qui retourne la situation'),
   ('Le lendemain, l’officier qui se moquait de moi est venu me demander conseil.', 'Le résultat : le regard des collègues change')]),
  ('Les arguments', [
   ('Si je vous raconte tout cela, c’est parce que je veux vous dire une chose : une femme peut commander, et elle doit pouvoir le faire.', 'Le passage à l’argumentation : la thèse, dite simplement'),
   ('D’abord, la compétence ne dépend pas du sexe : elle s’apprend, et mes études m’ont formée comme mes camarades garçons.', 'Premier argument'),
   ('Ensuite, une équipe où hommes et femmes décident ensemble voit plus de choses, parce qu’elle réunit des regards différents.', 'Deuxième argument'),
   ('Enfin, chaque femme qui occupe un poste de responsabilité ouvre la voie à celles qui suivent : moi-même, j’ai osé parce qu’une autre l’avait fait avant moi.', 'Troisième argument : l’exemple, relié au récit')]),
  ('La fin du discours', [
   ('Alors, à vous, les filles qui m’écoutez : ne laissez personne vous dire qu’un métier n’est pas pour vous.', 'L’adresse finale aux élèves'),
   ('Et à vous, les garçons : le jour où une femme sera votre chef, jugez-la sur son travail, comme on devrait juger tout le monde. »', 'La chute : un appel qui s’adresse à tous')])],
  valorise=[('Respect de la consigne', 'le récit de la traversée, les sentiments face aux collègues, puis les arguments, le tout au discours direct.'),
            ('Remobiliser le texte', 'le doute des collègues et l’autorité gagnée par le travail viennent de l’extrait de Mariette Navarro.'),
            ('Situation de communication', 'on entend une personne parler à des élèves : salutations, adresses, phrases claires.')]),

 dict(sujet='2026-amerique-du-nord-imagination', ancre='copie-ode-au-pain', titre='Ode au pain', blocs=[
  ('L’apostrophe', [
   ('Toi, pain doré, pain du matin, pain de chaque jour,', 'L’apostrophe : on s’adresse à l’aliment, comme le poète à la patate'),
   ('toi qui sors du four en chantant tout bas, la croûte craquante et le cœur chaud,', 'Le rythme : une phrase qui s’allonge comme la pâte'),
   ('je veux dire tes qualités, toi qu’on oublie parce qu’on te voit partout.', 'La raison du poème : révéler les qualités d’un aliment ordinaire')]),
  ('Ta naissance', [
   ('Tu viens du blé blond qui ondule dans les champs, du grain broyé qui devient farine, de la farine que l’eau transforme en pâte souple.', 'Une énumération qui raconte, étape par étape'),
   ('Le boulanger te pétrit dans la nuit, quand la ville dort ; il te plie, il te frappe, il te laisse respirer.', 'La personnification : le pain vit et respire'),
   ('Puis tu gonfles, lentement, comme un ventre qui rêve,', 'Une comparaison inattendue'),
   ('et le four t’habille d’or.', 'Une métaphore : la cuisson devient un vêtement précieux'),
   ('Dans ta mie blanche dorment le soleil de l’été et la patience des mains qui t’ont façonné.', 'Une image : le pain garde le travail de tous')]),
  ('Tes mille visages', [
   ('Tu as mille visages : baguette mince comme une flûte, miche ronde comme la lune, pain de campagne poudré de farine, brioche dorée des jours de fête.', 'Une énumération de comparaisons'),
   ('Le matin, ton parfum me réveille avant le réveil ;', 'L’expérience personnelle, dite en poète'),
   ('à midi, tu poses ta tranche près de chaque assiette, sans jamais te plaindre d’être second.', 'La personnification : un serviteur modeste')]),
  ('Tes qualités', [
   ('Tu es généreux : tu ne coûtes presque rien et tu nourris le monde entier.', 'Première qualité'),
   ('Tu es fidèle : tu accompagnes le fromage, la soupe, le chocolat, le pique-nique et le repas de fête.', 'Deuxième qualité : une énumération rythmée'),
   ('Tu es patient : rassis, tu deviens encore pain perdu, doré dans le beurre, sucré comme un dimanche.', 'Troisième qualité : même vieilli, il se transforme'),
   ('Croûte qui craque, mie qui fond, miettes qui volent : tu chantes sous les dents.', 'Les sonorités : les sons durs (« cr », « qu ») imitent le craquement')]),
  ('Ce que tu nous donnes', [
   ('On te partage, on te rompt, on te tend à celui qui a faim.', 'Le rythme ternaire'),
   ('Tu es l’aliment des tables pauvres et des tables riches, le premier mot de la cuisine, le dernier à manquer.', 'Une antithèse : pauvres et riches réunis'),
   ('Quand ta bonne odeur passe la porte de la boulangerie, toute la rue se retourne.', 'Une image qui élargit le poème à la ville'),
   ('Je te salue, humble roi de la table, toi qui n’as pas de couronne mais une croûte d’or.', 'Une métaphore : le roi modeste')]),
  ('La fin du poème', [
   ('Alors, pain doré, pain du matin, pain de chaque jour,', 'La reprise du premier vers, comme un refrain'),
   ('reste encore longtemps sur nos tables, simple et chaud,', 'L’adresse finale'),
   ('et que jamais personne n’oublie ton goût de lumière.', 'La chute : une image qui unit le goût et la vue')])],
  valorise=[('Respect de la consigne', 'on s’adresse à un aliment d’un bout à l’autre, pour en révéler les qualités.'),
            ('Langue poétique', 'apostrophes, comparaisons, personnifications, énumérations, sonorités, reprise du premier vers en refrain.'),
            ('Remobiliser le texte', 'comme le « Pantoum Patate » de Paul Fournel, le poème tutoie un aliment ordinaire pour le célébrer.')]),
 dict(sujet='2023-metropole-imagination', ancre='copie-jeu-naufrages', titre='Les naufragés du jardin', blocs=[
  ('Le jeu commence', [
   ('Ce mercredi-là, il pleuvait depuis le matin, et ma cousine Léa et moi tournions en rond dans la maison de ma grand-mère.', 'La situation de départ : l’ennui, avant le jeu'),
   ('Quand la pluie s’est arrêtée, Léa a proposé que nous jouions aux naufragés : la pelouse serait la mer, et le vieux cabanon au fond du jardin, une île déserte.', 'Le jeu : une règle simple, posée au départ'),
   ('Au début, nous riions en « nageant » dans l’herbe mouillée, sans y croire vraiment.', 'La première étape : le jeu n’est encore qu’un jeu')]),
  ('L’aventure s’installe', [
   ('Puis Léa s’est mise à crier qu’une vague allait nous engloutir, et j’ai senti, je ne sais comment, le sol bouger sous mes pieds.', 'La deuxième étape : les sensations entrent dans le jeu'),
   ('Le vent secouait les branches du cerisier, et les gouttes qui tombaient de ses feuilles devenaient l’écume des vagues.', 'La description transformée par l’imagination'),
   ('Quand nous avons atteint le cabanon, trempés et essoufflés, nous étions vraiment des survivants.', 'La troisième étape : le basculement dans l’aventure')]),
  (None, [('— Il faut construire un radeau avant la nuit, a dit Léa d’une voix grave que je ne lui connaissais pas.', 'Le dialogue : le jeu devient sérieux')]),
  (None, [('— Avec quoi ? ai-je demandé, et je regardais déjà les vieilles planches du cabanon comme si elles étaient notre seule chance.', 'Le dialogue : le narrateur entre tout entier dans l’aventure')]),
  ('L’aventure devient intense', [
   ('Nous avons tiré deux planches et une bâche jusqu’au bord de la « mer », en comptant les minutes comme si la marée montait.', 'L’intensité : un enjeu, même inventé'),
   ('Il fallait aussi trouver à manger : nous avons cueilli des mûres le long de la haie comme si notre vie en dépendait.', 'Une nouvelle étape de survie'),
   ('Le chat de la voisine, tapi sous une brouette, est devenu une bête sauvage, et mon cœur battait si fort que j’ai serré la main de Léa.', 'Les sentiments : la peur, éprouvée pour de bon'),
   ('Le ciel s’assombrissait, l’odeur de la terre mouillée montait, et l’île me paraissait immense et menaçante.', 'Une description par les sens : l’ombre, l’odeur, l’espace'),
   ('Sur un morceau de papier, Léa a écrit « SOS » et l’a glissé dans une bouteille vide, que j’ai lancée de toutes mes forces vers le potager.', 'Le sommet de l’aventure : un geste de naufragé')]),
  ('Le retour', [
   ('C’est alors qu’une voix a traversé la mer : « Les enfants, le goûter ! »', 'La rupture : le monde réel revient'),
   ('En une seconde, la mer est redevenue une pelouse, notre radeau deux planches pourries, et la bête sauvage un chat qui s’étirait.', 'Le retour à la réalité, en une énumération'),
   ('Pourtant, en mordant dans ma tartine, j’avais encore le goût du sel dans la bouche.', 'La chute : l’aventure laisse une trace')])],
  valorise=[('Respect de la consigne', 'un jeu, raconté à la première personne, qui devient « progressivement » une aventure, étape par étape.'),
            ('Remobiliser le texte', 'comme chez George Sand, l’imagination d’enfants transforme un lieu ordinaire au point de le rendre réel.'),
            ('Descriptions et sentiments', 'les sensations (le vent, l’odeur, le cœur qui bat) font éprouver l’intensité du jeu.')]),
]
