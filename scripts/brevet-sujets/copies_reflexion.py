"""Copies à 20 des sujets de réflexion qui n’en avaient pas (docs/protocole-brevet.md, § 7).
Forme du site : introduction (situation, ce qui surprend, question, annonce), trois paragraphes (argument, exemple, ce qu’il prouve),
deux transitions en question, conclusion (réponse nette, ce qui reste ouvert). Langue d’un excellent élève de troisième.
Aucune citation d’œuvre de mémoire : les œuvres sont résumées par des faits vérifiables.
Chaque copie : id du sujet, titre, blocs [(titre de bloc, [(phrase, fonction)])], valorise [(critère, texte)]."""

S, Q, A, A1, EX, PR, T, CC, CO = ('La situation concrète', 'La situation concrète : ce qui surprend (« Je m’attendais à… Pourtant… »)', 'La question', 'L’annonce',
    'Premier argument', 'L’exemple qui prouve', 'Ce que l’exemple prouve', 'Ce que le paragraphe n’a pas réglé : la question', 'Conclusion : la réponse nette')
OUV = 'Ce qui reste ouvert'
def arg(n, mot): return f'{n} argument : il reprend le mot clé de la question (« {mot} »)'

COPIES = [
 dict(sujet='2026-asie-reflexion', ancre='copie-obstacles', titre='Les obstacles et la détermination', blocs=[
  ('Introduction', [
   ('L’an dernier, notre équipe de handball a perdu tous ses matchs d’automne ; au printemps, ceux qui étaient restés s’entraînaient deux fois plus.', S),
   ('Je pensais que l’échec nous découragerait ; pourtant, il a soudé ceux qui n’avaient pas abandonné.', Q),
   ('Les obstacles renforcent-ils donc la détermination des individus ?', A),
   ('Ils peuvent la renforcer, mais ils peuvent aussi la briser ; tout dépend alors de ce qui aide à les traverser.', A1)]),
  ('Premier paragraphe', [
   ('Un obstacle peut d’abord donner une raison de se battre.', EX),
   ('Helen Keller, sourde et aveugle depuis sa petite enfance, a appris à communiquer grâce à son institutrice, Anne Sullivan, puis elle a fait des études à l’université ; le film <em>Miracle en Alabama</em> raconte ce combat.', PR),
   ('Son handicap ne l’a pas arrêtée : il a donné à chacun de ses progrès la valeur d’une victoire.', T)]),
  ('Transition', [('Mais tous ceux qui rencontrent des obstacles en sortent-ils plus forts ?', CC)]),
  ('Deuxième paragraphe', [
   ('Plus forts, certains ne le deviennent pas : quand les obstacles s’accumulent, ils peuvent écraser.', arg('Deuxième', 'plus forts')),
   ('Dans <em>Les Misérables</em>, Victor Hugo raconte comment Fantine perd son travail, vend ses cheveux, puis ses dents, pour payer la pension de sa fille, avant de mourir, malade et épuisée.', PR),
   ('Sa volonté d’aimer Cosette ne faiblit pas, mais ses forces s’épuisent : la détermination ne suffit pas quand on est seul contre tout.', T)]),
  ('Transition', [('Qu’est-ce qui fait alors la différence entre ceux que l’obstacle grandit et ceux qu’il brise ?', CC)]),
  ('Troisième paragraphe', [
   ('La différence tient souvent à un but clair et au soutien des autres.', arg('Troisième', 'la différence')),
   ('Malala Yousafzai a été gravement blessée en 2012 parce qu’elle défendait le droit des filles à aller à l’école ; soutenue par sa famille, elle a continué ce combat et reçu le prix Nobel de la paix en 2014.', PR),
   ('L’obstacle a renforcé sa détermination parce qu’il servait une cause plus grande qu’elle, et parce qu’elle n’était pas seule.', T)]),
  ('Conclusion', [
   ('Les obstacles renforcent donc la détermination de ceux qui ont un but et qui sont soutenus, mais ils peuvent briser ceux qui les affrontent seuls.', CO),
   ('Reste une question : savons-nous être, pour les autres, ce soutien qui change un obstacle en élan ?', OUV)])],
  valorise=[('Respect du sujet', 'la question reçoit une réponse nuancée : oui, non, puis ce qui fait la différence.'),
            ('Exemples variés', 'une vie réelle racontée au cinéma, un roman, une figure d’aujourd’hui ; chacun est expliqué.'),
            ('Cohérence', 'chaque paragraphe commence par le mot clé de la question qui le précède.')]),

 dict(sujet='2026-centres-etrangers-reflexion', ancre='copie-plus-humains', titre='L’art rend-il plus humain ?', blocs=[
  ('Introduction', [
   ('Devant une photographie de guerre exposée au collège, plusieurs élèves se sont tus, puis ont demandé comment aider.', S),
   ('Je croyais qu’une image ne changeait rien ; pourtant, elle avait changé notre regard, au moins un moment.', Q),
   ('La littérature et les arts peuvent-ils rendre les hommes plus humains ?', A),
   ('Ils éveillent la compassion ; mais ils ne suffisent pas toujours ; ils agissent surtout quand ils nous font vivre à la place d’un autre.', A1)]),
  ('Premier paragraphe', [
   ('Une œuvre peut d’abord éveiller la compassion.', EX),
   ('Dans <em>Le Dernier Jour d’un condamné</em>, Victor Hugo fait parler à la première personne un homme qui attend son exécution, pour montrer la cruauté de la peine de mort.', PR),
   ('Le lecteur ne juge plus un criminel abstrait : il partage l’angoisse d’un homme, et la peine de mort lui paraît inhumaine.', T)]),
  ('Transition', [('Mais suffit-il d’aimer les arts pour devenir meilleur ?', CC)]),
  ('Deuxième paragraphe', [
   ('Aimer les arts ne suffit pas, car on peut les admirer sans changer de conduite.', arg('Deuxième', 'aimer les arts')),
   ('L’histoire le montre : des responsables nazis aimaient la peinture et la musique, et ont pourtant organisé des massacres.', PR),
   ('L’art n’est donc pas une baguette magique : il propose une émotion, mais chacun reste libre de la refuser.', T)]),
  ('Transition', [('À quelle condition une œuvre peut-elle alors nous rendre plus humains ?', CC)]),
  ('Troisième paragraphe', [
   ('Une œuvre nous rend plus humains quand elle nous fait voir le monde avec les yeux d’un autre.', arg('Troisième', 'plus humains')),
   ('Dans le roman <em>Wonder</em>, R. J. Palacio raconte l’entrée au collège d’August, un garçon au visage déformé, puis donne la parole à ses camarades, qui apprennent à le regarder autrement.', PR),
   ('En lisant, nous faisons le même chemin qu’eux : nous apprenons à voir une personne au-delà de son apparence.', T)]),
  ('Conclusion', [
   ('La littérature et les arts peuvent donc rendre les hommes plus humains, à condition qu’on accepte de se mettre à la place de ceux qu’ils nous montrent.', CO),
   ('Reste une question : l’école ne doit-elle pas apprendre à lire et à regarder de cette manière ?', OUV)])],
  valorise=[('Respect du sujet', 'la réponse n’est ni un oui naïf ni un non : elle pose une condition.'),
            ('Exemples variés', 'un roman du XIXe siècle, un fait historique, un roman d’aujourd’hui.'),
            ('Argumentation', 'le deuxième paragraphe répond à une objection réelle avant de conclure.')]),

 dict(sujet='2025-metropole-reflexion', ancre='copie-lieux', titre='Découvrir des lieux comme si l’on y était', blocs=[
  ('Introduction', [
   ('Je n’ai jamais plongé dans l’océan profond ; pourtant, j’ai l’impression d’avoir vu ses forêts sous-marines.', S),
   ('Je pensais que seul un voyage permettait de connaître un lieu ; pourtant, ce sont des livres et des films qui me l’ont fait découvrir.', Q),
   ('La littérature et les arts permettent-ils de découvrir des lieux, réels ou fictifs, comme si l’on y était ?', A),
   ('Ils nous y transportent par les descriptions et les images ; ils ne remplacent pourtant pas l’expérience réelle ; mais ils ouvrent des lieux qu’aucun voyage n’atteint.', A1)]),
  ('Premier paragraphe', [
   ('Les œuvres décrivent d’abord les lieux avec assez de détails pour que nous les voyions.', EX),
   ('Dans <em>Vingt mille lieues sous les mers</em>, Jules Verne fait découvrir les fonds marins par les grandes vitres du salon du <em>Nautilus</em> : poissons, coraux, forêts d’algues défilent sous les yeux des passagers.', PR),
   ('Le lecteur regarde avec eux : la description le place à la fenêtre du sous-marin.', T)]),
  ('Transition', [('Mais voir un lieu dans un livre, est-ce vraiment y être ?', CC)]),
  ('Deuxième paragraphe', [
   ('Y être vraiment, c’est autre chose : une œuvre ne donne ni le froid, ni les odeurs, ni la fatigue du voyage.', arg('Deuxième', 'y être')),
   ('Un tableau de montagne nous montre le sommet, mais pas l’effort de la marche ; et le lieu que nous voyons est celui que l’artiste a choisi de nous montrer.', PR),
   ('L’œuvre nous donne donc un regard sur le lieu, filtré par l’artiste, plutôt que le lieu lui-même.', T)]),
  ('Transition', [('Que nous apportent alors les œuvres que le voyage ne peut pas nous donner ?', CC)]),
  ('Troisième paragraphe', [
   ('Les œuvres nous apportent des lieux où aucun voyage ne mène.', arg('Troisième', 'nous apportent')),
   ('En 1954, quinze ans avant les premiers pas de l’homme sur la Lune, Hergé y envoyait Tintin dans <em>On a marché sur la Lune</em> ; au cinéma, <em>Le Seigneur des anneaux</em> fait parcourir la Terre du Milieu, qui n’existe nulle part.', PR),
   ('L’imagination de l’artiste, puis celle du lecteur, construit des lieux que l’on habite le temps de l’œuvre.', T)]),
  ('Conclusion', [
   ('La littérature et les arts nous font donc découvrir des lieux presque comme si nous y étions : ils ne remplacent pas le voyage, mais ils vont plus loin que lui.', CO),
   ('Reste une question : après avoir rêvé d’un lieu dans un livre, le voit-on de la même façon quand on y va vraiment ?', OUV)])],
  valorise=[('Respect du sujet', 'les lieux réels et les lieux fictifs sont traités tous les deux, comme le demande le sujet.'),
            ('Exemples variés', 'un roman, la peinture, une bande dessinée et un film.'),
            ('Nuance', 'la limite de l’art est reconnue, puis dépassée.')]),

 dict(sujet='2025-amerique-du-nord-reflexion', ancre='copie-violence', titre='Montrer la violence ?', blocs=[
  ('Introduction', [
   ('En histoire, une enseignante nous a montré des dessins faits par des enfants pendant la guerre ; personne n’a eu envie de rire.', S),
   ('Je pensais qu’on devait épargner la violence au public ; pourtant, ces dessins nous en apprenaient plus qu’un long cours.', Q),
   ('Les œuvres d’art doivent-elles montrer la réalité, même lorsqu’elle est violente ?', A),
   ('Elles le doivent pour ne pas mentir ; mais montrer la violence peut aussi blesser ; tout dépend donc de la manière de la montrer.', A1)]),
  ('Premier paragraphe', [
   ('Les œuvres doivent montrer la violence, sinon elles mentiraient sur le monde.', EX),
   ('Dans la bande dessinée <em>Maus</em>, Art Spiegelman raconte comment son père a survécu à Auschwitz, en dessinant les Juifs en souris et les nazis en chats.', PR),
   ('Le lecteur découvre la persécution et les camps : cacher cette violence, ce serait trahir ceux qui l’ont subie.', T)]),
  ('Transition', [('Mais faut-il tout montrer, à tous, de n’importe quelle façon ?', CC)]),
  ('Deuxième paragraphe', [
   ('Tout montrer n’est pas sans danger : une violence exposée sans raison peut choquer, ou même habituer.', arg('Deuxième', 'tout montrer')),
   ('C’est pourquoi certains films sont interdits aux moins de douze ou de seize ans : des images trop crues peuvent effrayer un jeune spectateur sans rien lui faire comprendre.', PR),
   ('La violence n’a de valeur dans une œuvre que si elle fait réfléchir ; sinon, elle n’est qu’un spectacle.', T)]),
  ('Transition', [('Comment une œuvre peut-elle alors montrer la violence sans en faire un spectacle ?', CC)]),
  ('Troisième paragraphe', [
   ('Une œuvre y parvient par sa manière de montrer.', arg('Troisième', 'montrer')),
   ('Dans « Le Dormeur du val », Rimbaud décrit pendant tout le poème un jeune soldat qui semble dormir dans la nature, et ne révèle sa mort qu’au dernier vers ; dans <em>Maus</em>, les animaux tiennent l’horreur à distance sans l’effacer.', PR),
   ('Le choc final ou la distance du dessin obligent le lecteur à penser la violence au lieu de seulement la subir.', T)]),
  ('Conclusion', [
   ('Les œuvres d’art doivent donc montrer la réalité, même violente, à condition de trouver une forme qui la fasse comprendre plutôt que la donner en spectacle.', CO),
   ('Reste une question : à l’heure où des images violentes circulent partout sur les écrans, l’art n’est-il pas plus nécessaire que jamais ?', OUV)])],
  valorise=[('Respect du sujet', 'le « doivent » du sujet est discuté : une obligation, ses limites, puis sa condition.'),
            ('Exemples précis', 'une bande dessinée, un poème, une règle connue du cinéma ; chaque exemple est expliqué.'),
            ('Cohérence', 'la troisième partie reprend un exemple de la première pour le voir autrement.')]),

 dict(sujet='2025-polynesie-reflexion', ancre='copie-bon-moment', titre='Attendre le bon moment', blocs=[
  ('Introduction', [
   ('Pendant des mois, j’ai économisé pour assister au concert de mon groupe préféré ; le soir venu, chaque chanson m’a semblé plus belle que sur mon téléphone.', S),
   ('Je pensais que l’attente gâchait le plaisir ; pourtant, c’est elle qui l’avait rendu si fort.', Q),
   ('Est-il important d’attendre le bon moment pour savourer pleinement une expérience ?', A),
   ('L’attente prépare le plaisir ; mais attendre trop peut faire passer à côté de la vie ; le bon moment est donc celui que l’on sait reconnaître.', A1)]),
  ('Premier paragraphe', [
   ('Attendre rend d’abord le plaisir plus intense.', EX),
   ('Dans <em>Le Petit Prince</em>, le renard demande au petit prince de revenir chaque jour à la même heure : il commencera à être heureux avant même son arrivée, rien qu’en l’attendant.', PR),
   ('L’attente fait partie du bonheur : elle le prépare et le prolonge.', T)]),
  ('Transition', [('Mais à force d’attendre le moment parfait, ne risque-t-on pas de le manquer ?', CC)]),
  ('Deuxième paragraphe', [
   ('Le manquer, c’est le danger de ceux qui remettent toujours à plus tard.', arg('Deuxième', 'le manquer')),
   ('Dans son poème « Mignonne, allons voir si la rose », Ronsard invite une jeune femme à profiter de sa jeunesse, car la rose fanée en un seul soir montre que la beauté passe vite.', PR),
   ('Le poète le dit : certains moments ne reviennent pas, et attendre peut nous les faire perdre.', T)]),
  ('Transition', [('Comment savoir alors si le moment est venu ?', CC)]),
  ('Troisième paragraphe', [
   ('Le moment est venu quand on est prêt à vivre pleinement ce qui arrive.', arg('Troisième', 'le moment est venu')),
   ('Un randonneur qui atteint un sommet après des heures de marche savoure davantage le paysage que celui qui y monte en téléphérique ; mais il faut aussi qu’il prenne le temps de le regarder, au lieu de penser déjà à la descente.', PR),
   ('Savourer, c’est à la fois s’être préparé et être présent : l’attente ne vaut que si elle débouche sur l’attention.', T)]),
  ('Conclusion', [
   ('Il est donc important d’attendre le bon moment, à condition de ne pas l’attendre indéfiniment et de savoir le vivre quand il arrive.', CO),
   ('Reste une question : dans un monde où tout s’obtient en un clic, apprenons-nous encore à attendre ?', OUV)])],
  valorise=[('Respect du sujet', 'les deux idées du sujet, « attendre » et « savourer », sont travaillées ensemble.'),
            ('Exemples variés', 'un récit, un poème, l’expérience personnelle, comme le permet le sujet.'),
            ('Langue', 'des liens logiques variés (pourtant, mais, à condition de, à la fois).')]),

 dict(sujet='2023-amerique-du-nord-reflexion', ancre='copie-adolescents', titre='Des héros de notre âge', blocs=[
  ('Introduction', [
   ('Quand j’ai commencé <em>Harry Potter</em>, j’avais à peu près l’âge du héros, et j’ai eu l’impression de grandir avec lui.', S),
   ('Je pensais aimer ces livres seulement pour la magie ; pourtant, c’est le personnage, si proche de moi, qui m’a retenu.', Q),
   ('Pourquoi aimons-nous tant les œuvres dont les personnages principaux sont des adolescents ?', A),
   ('Je les aime parce que je m’y reconnais ; elles ont pourtant un défaut quand elles réduisent les adolescents à des clichés ; je les préfère donc quand elles nous prennent au sérieux.', A1)]),
  ('Premier paragraphe', [
   ('J’aime d’abord ces œuvres parce que je m’y reconnais.', EX),
   ('Dans le <em>Journal</em> d’Anne Frank, une adolescente cachée avec sa famille à Amsterdam pendant la guerre raconte ses disputes avec sa mère, ses doutes et ses rêves de devenir écrivain.', PR),
   ('Ses inquiétudes ressemblent aux nôtres : l’histoire de la guerre devient proche, parce qu’elle est vécue par quelqu’un de notre âge.', T)]),
  ('Transition', [('Mais ces œuvres montrent-elles toujours les adolescents tels qu’ils sont ?', CC)]),
  ('Deuxième paragraphe', [
   ('Tels qu’ils sont, pas toujours : certains films ne montrent que des adolescents moqueurs, obsédés par les téléphones et la popularité.', arg('Deuxième', 'tels qu’ils sont')),
   ('Ces personnages caricaturaux font rire un moment, mais on ne s’y reconnaît pas, et l’on s’en lasse vite.', PR),
   ('Une œuvre sur les adolescents n’est pas bonne parce qu’elle parle de nous, mais parce qu’elle parle juste.', T)]),
  ('Transition', [('Qu’attendre alors d’une bonne œuvre dont les héros ont notre âge ?', CC)]),
  ('Troisième paragraphe', [
   ('Une bonne œuvre prend au sérieux les choix des adolescents.', arg('Troisième', 'une bonne œuvre')),
   ('Au fil des sept tomes, Harry doit choisir entre ses amis et sa sécurité, entre la peur et le courage, jusqu’à accepter d’affronter seul Voldemort.', PR),
   ('Ces choix nous aident à réfléchir aux nôtres : le héros adolescent devient un modèle, ou au moins un compagnon.', T)]),
  ('Conclusion', [
   ('J’aime donc les œuvres dont les héros sont des adolescents, non parce qu’ils me ressemblent, mais quand elles prennent au sérieux leurs doutes et leurs choix.', CO),
   ('Reste une question : relirai-je ces livres de la même façon quand je serai adulte ?', OUV)])],
  valorise=[('Respect du sujet', 'le sujet demande un avis et ses raisons : la copie parle à la première personne et justifie chaque goût.'),
            ('Nuance', 'le deuxième paragraphe critique certaines œuvres, ce qui rend l’avis plus solide.'),
            ('Exemples', 'un témoignage réel et une saga romanesque, chacun développé.')]),

 dict(sujet='2021-amerique-du-nord-reflexion', ancre='copie-heroisme', titre='L’héroïsme est-il à la portée de tous ?', blocs=[
  ('Introduction', [
   ('En 2018, à Paris, un jeune homme, Mamoudou Gassama, a escaladé quatre étages d’un immeuble à mains nues pour sauver un enfant suspendu à un balcon.', S),
   ('Je pensais que les héros étaient des êtres exceptionnels ; pourtant, c’était un passant comme les autres.', Q),
   ('Un comportement héroïque est-il à la portée de tous ?', A),
   ('Chacun peut accomplir un geste héroïque ; il demande pourtant un courage que tous n’ont pas ; mais ce courage se prépare dans les petits gestes de chaque jour.', A1)]),
  ('Premier paragraphe', [
   ('Un geste héroïque peut d’abord être accompli par n’importe qui.', EX),
   ('Pendant la Seconde Guerre mondiale, des milliers de personnes ordinaires, reconnues ensuite comme « Justes parmi les nations », ont caché des enfants juifs au péril de leur vie.', PR),
   ('Ces paysans, ces commerçants, ces religieuses n’étaient pas des soldats : l’héroïsme n’est pas réservé à quelques-uns.', T)]),
  ('Transition', [('Mais si tous peuvent être des héros, pourquoi si peu le deviennent-ils ?', CC)]),
  ('Deuxième paragraphe', [
   ('Si peu le deviennent, parce que l’héroïsme demande d’accepter un risque, et que la peur retient la plupart d’entre nous.', arg('Deuxième', 'si peu le deviennent')),
   ('Dans <em>Les Misérables</em>, Jean Valjean soulève une charrette pour sauver le vieux Fauchelevent, alors que les témoins restent immobiles ; ce geste risque en plus de révéler qu’il est un ancien forçat.', PR),
   ('Le héros n’est pas plus fort que les autres : il accepte de perdre quelque chose pour sauver quelqu’un.', T)]),
  ('Transition', [('Comment ce courage peut-il alors devenir accessible à chacun ?', CC)]),
  ('Troisième paragraphe', [
   ('Ce courage devient accessible quand on s’y exerce dans les petites occasions.', arg('Troisième', 'ce courage')),
   ('Défendre un camarade dont on se moque, dire la vérité quand elle dérange, aider quelqu’un au lieu de filmer la scène : ces gestes ordinaires, comme ceux du héros que célèbre le poème d’Aragon, demandent déjà du courage.', PR),
   ('L’héroïsme des grands jours se prépare dans le courage de tous les jours.', T)]),
  ('Conclusion', [
   ('Un comportement héroïque est donc à la portée de tous, non parce qu’il est facile, mais parce qu’il commence par de petits gestes que chacun peut choisir.', CO),
   ('Reste une question : saurions-nous agir, nous aussi, si l’occasion se présentait demain ?', OUV)])],
  valorise=[('Respect du sujet', 'la copie s’appuie sur le poème d’Aragon, comme le sujet l’y invite, sans le recopier.'),
            ('Exemples variés', 'un fait réel récent, l’histoire, un roman, la vie quotidienne.'),
            ('Argumentation', 'une réponse nuancée, qui explique pourquoi l’héroïsme est rare sans le déclarer impossible.')]),

 dict(sujet='2019-metropole-reflexion', ancre='copie-vies', titre='Découvrir d’autres vies', blocs=[
  ('Introduction', [
   ('En lisant <em>Persepolis</em>, la bande dessinée de Marjane Satrapi, j’ai suivi une petite fille de Téhéran pendant la révolution iranienne.', S),
   ('Je pensais ne rien avoir en commun avec elle ; pourtant, ses questions ressemblaient aux miennes.', Q),
   ('Que peut m’apporter la découverte de la vie de personnages, fictifs ou réels, dans la littérature, le cinéma et les autres arts ?', A),
   ('Elle m’apprend d’abord l’histoire et le monde ; elle m’aide ensuite à comprendre les autres ; elle m’apprend enfin à me connaître moi-même.', A1)]),
  ('Premier paragraphe', [
   ('Découvrir une vie m’apprend d’abord des choses sur le monde.', EX),
   ('<em>Persepolis</em> raconte, à travers l’enfance de son autrice, la révolution de 1979 en Iran, puis la guerre contre l’Irak, avec leurs interdits et leurs dangers.', PR),
   ('Une page d’histoire lointaine devient concrète, parce que je la vois avec les yeux d’une enfant.', T)]),
  ('Transition', [('Mais ces œuvres m’apprennent-elles seulement des faits ?', CC)]),
  ('Deuxième paragraphe', [
   ('Au-delà des faits, elles m’apprennent à comprendre ce que vivent les autres.', arg('Deuxième', 'apprennent')),
   ('Dans <em>Wonder</em>, R. J. Palacio fait raconter à August, un garçon au visage déformé, les regards qui se détournent de lui au collège.', PR),
   ('En lisant, je ressens ce qu’il ressent : je comprends mieux ce que peut vivre un élève différent dans ma propre classe.', T)]),
  ('Transition', [('Et que m’apprennent ces vies sur moi-même ?', CC)]),
  ('Troisième paragraphe', [
   ('Sur moi-même, elles m’apprennent beaucoup, car je me compare aux personnages.', arg('Troisième', 'sur moi-même')),
   ('Quand Marjane, adolescente, choisit de dire ce qu’elle pense malgré les interdits, je me demande si j’aurais eu son courage ; quand les camarades d’August se moquent de lui, je me demande de quel côté j’aurais été.', PR),
   ('Les personnages deviennent des miroirs : ils m’obligent à me poser des questions que je n’aurais pas posées seul.', T)]),
  ('Conclusion', [
   ('Découvrir la vie de personnages, réels ou fictifs, m’apporte donc un savoir sur le monde, une meilleure compréhension des autres et une connaissance de moi-même.', CO),
   ('Reste une question : les personnages que j’admire aujourd’hui seront-ils encore ceux que j’admirerai plus tard ?', OUV)])],
  valorise=[('Respect du sujet', 'la question « Que peut vous apporter… ? » reçoit trois réponses, de plus en plus personnelles.'),
            ('Exemples développés', 'deux œuvres seulement, mais reprises d’un paragraphe à l’autre et analysées.'),
            ('Cohérence', 'la troisième partie relit les deux œuvres sous un angle nouveau.')]),
]
