/* Philosophie : la « boussole » de chaque exercice (d'où l'on part, ce que l'on fait, ce que l'on obtient)
   et son classement par difficulté pour la page « Je bloque sur… » (philosophie-laboratoire.html).
   Source unique : scripts/build-philo-boussole.js injecte ces lignes dans les pages d'exercices. */
const E='philosophie-dissertation-entrainement.html',P='philosophie-problematisation.html',S='philosophie-penser-par-soi-meme.html',R='philosophie-references.html',O='philosophie-operations.html';

const GROUPS=[
['sujet','Je ne comprends pas ce que le sujet demande','On part des mots du sujet, pas de ce qu’on sait sur la notion.'],
['probleme','Je ne trouve pas le problème','Le geste le plus important : sans problème, pas de dissertation.'],
['idees','Je n’ai rien à dire, pas d’arguments','On peut penser seul, sans réciter de cours.'],
['plan','Mon plan ressemble à une liste','Chaque partie doit naître de la précédente.'],
['transitions','Je ne sais pas faire les transitions','Une transition dit pourquoi la réponse précédente ne suffit pas.'],
['troisieme','Je n’ai pas de troisième partie','La III garde ce que I et II avaient de vrai.'],
['references','Je cite des philosophes sans savoir quoi en faire','Un philosophe doit faire avancer votre raisonnement, pas le remplacer.'],
['style','Mes phrases s’enchaînent mal','Moins de connecteurs, plus de logique.'],
['tout','Je veux faire un sujet en entier','Quand les gestes sont là, on les enchaîne.'],
];

/* [page, id, groupes, titre, d'où vous partez, ce que vous faites, ce que vous obtenez] */
const EX=[
[E,'ex-mots',['sujet'],'Lire les mots du sujet','Vous lisez le sujet et vous ne savez pas par quel bout le prendre.','Transformer la question en phrase, puis chercher le petit mot qui fait vaciller cette phrase.','Votre première réponse, et la raison pour laquelle elle ne suffit pas : le début de votre introduction.'],
[E,'ex-notion',['sujet'],'Deux attentes qui se gênent','Vous connaissez le mot du sujet (la justice), mais vous ne voyez pas où est la difficulté.','Dire, avec des exemples de tous les jours, les deux choses qu’on attend de ce mot.','Les deux attentes qui se gênent : c’est là que se cache le problème.'],
[E,'ex-cout',['probleme'],'Ce que chaque réponse perd','Vous avez une réponse au sujet, et elle vous paraît évidente.','Pousser cette réponse jusqu’au bout, puis la réponse contraire, et noter ce que chacune perd.','Deux pertes, une par réponse : la matière de votre problématique.'],
[E,'ex-problematique',['probleme'],'Des deux pertes à la problématique','Vous savez ce que chaque réponse perd.','Réunir les deux pertes en une seule question.','Votre problématique : la dernière phrase de l’introduction, juste avant l’annonce du plan.'],
[E,'ex-qcm',['probleme'],'Reconnaître une vraie problématique','Vous avez écrit une problématique sans savoir si elle est bonne.','Choisir la bonne parmi quatre, et nommer l’erreur des trois autres.','Les erreurs à éviter, que vous saurez repérer dans votre propre copie.'],
[E,'ex-6',['references'],'Ce que fait un philosophe','Vous connaissez une idée de philosophe, mais vous ne savez pas à quoi elle sert dans un sujet.','Dire ce que le philosophe fait d’une idée ordinaire, puis ce que cela change pour le sujet.','Une référence qui fait avancer votre raisonnement au lieu de le décorer.'],
[E,'ex-transition',['transitions'],'Écrire une transition','Vous avez fini une partie et vous ne savez pas comment passer à la suivante.','Partir de ce que la partie a montré et de sa limite, et dire ce qui manque encore.','Une transition d’une ou deux phrases, qui rend la partie suivante nécessaire.'],
[E,'ex-reste',['plan','transitions'],'Ce qui reste après une réponse','Vous avez une partie I, mais la partie II vous semble tombée du ciel.','Trouver ce que la réponse I n’explique pas encore, et en faire une question.','La question qui oblige à écrire la partie II : votre plan devient un enchaînement.'],
[E,'ex-troisieme',['troisieme'],'Trouver l’idée de la III','Vous avez une partie I et une partie II qui s’opposent, et pas de III.','Choisir, parmi sept gestes possibles, celui qui garde ce que I et II avaient de vrai.','L’idée de votre troisième partie, en une phrase.'],
[E,'ex-partie',['idees'],'Construire une partie','Vous avez une idée, mais vous ne savez pas comment en faire une partie.','Préparer la partie en quatre lignes : la réponse, pourquoi, un exemple, la limite.','Le squelette d’une partie, prêt à rédiger.'],
[E,'ex-puzzle',['plan'],'Le puzzle logique','Vos parties pourraient être dans n’importe quel ordre.','Remettre trois moments d’un raisonnement dans l’ordre, et dire pourquoi cet ordre s’impose.','Le réflexe de vérifier que chaque partie naît de la précédente.'],
[E,'ex-plan',['tout'],'Du sujet au plan, en version courte','Vous connaissez les gestes un par un, mais vous ne les avez jamais enchaînés.','Refaire tout le chemin sur un sujet, une phrase à chaque fois.','Un brouillon complet : la problématique et le plan en trois parties.'],
[E,'lien-juste',['style'],'Le lien juste','Vous mettez des « donc », « de plus », « en effet » un peu au hasard.','Choisir, entre deux phrases, le seul lien qui dit la vraie relation.','Des liens qui disent quelque chose : une opposition, une conséquence, une raison.'],
[E,'allegez',['style'],'Allégez','Vos paragraphes sont pleins de « d’abord », « ensuite », « de plus ».','Réécrire un paragraphe surchargé en gardant un seul lien fort.','Un paragraphe plus court, où la logique tient toute seule.'],
[E,'duel-transitions',['transitions'],'Duel de transitions','Vos transitions résument ce qui précède ou annoncent ce qui suit.','Comparer quatre transitions, garder la seule nécessaire, éliminer les autres.','Le critère d’une vraie transition : elle dit ce qui manque.'],
[E,'bataille-iii',['troisieme'],'Bataille des III','Votre troisième partie ressemble à un compromis (« un peu des deux »).','Classer quatre troisièmes parties, de la plus faible à la plus forte.','Savoir reconnaître une III qui garde I et II au lieu de les mélanger.'],
[E,'plan-interchangeable',['plan'],'Plan interchangeable ?','Votre plan est une suite de thèmes.','Comparer deux plans, et voir ce qui se passe si l’on échange II et III.','Le test pour savoir si votre plan est un raisonnement ou une liste.'],
[P,'qcm',['probleme'],'La problématique qui va au sujet','Vous ne savez pas si une problématique est bonne.','Choisir la formulation juste, puis nommer l’erreur des autres.','Le test du gant : la problématique doit aller au sujet, ni trop large, ni à côté.'],
[P,'qcm-2',['probleme'],'Le piège du « comment… si… »','Vos problématiques commencent souvent par « comment… si… ».','Repérer pourquoi cette tournure tranche déjà la question.','Une problématique qui laisse vraiment les deux réponses ouvertes.'],
[P,'qcm-3',['probleme'],'Trois erreurs discrètes','Votre problématique oppose deux mots tout faits, ou empile les questions.','Repérer les couples tout faits, les définitions en alternative, les questions en cascade.','Trois défauts que les correcteurs relèvent chaque année, et que vous éviterez.'],
[P,'qcm-4',['probleme','sujet'],'Ne rien ajouter au sujet','Vous glissez dans le sujet une notion qu’il ne contient pas.','Repérer la problématique qui change de sujet sans le dire.','Une problématique fidèle aux mots du sujet.'],
[P,'qcm-5',['probleme'],'Une problématique pour ce sujet-là','Votre problématique pourrait servir pour n’importe quel sujet.','Repérer la seule formulation qui ne vaut que pour ce sujet.','Une problématique précise, qui annonce déjà votre plan.'],
[P,'production',['probleme'],'À vous : un sujet « Peut-on… ? »','Vous avez vu la méthode sur un exemple.','La refaire seul sur un vrai sujet du bac 2026, en quatre phrases.','Votre problématique sur un sujet en « Peut-on… ? ».'],
[P,'prod-faut-il',['probleme'],'À vous : un sujet « Faut-il… ? »','Les sujets en « Faut-il » vous semblent demander votre avis.','Partir d’une situation concrète, et dire ce que chaque choix gagne et perd.','Votre problématique sur un sujet en « Faut-il… ? ».'],
[P,'prod-pourquoi',['probleme'],'À vous : un sujet « Pourquoi… ? »','Un sujet en « Pourquoi » : on ne peut pas répondre par oui ou par non.','Chercher deux raisons rivales, et ce que chacune risque.','Votre problématique sur un sujet en « Pourquoi… ? ».'],
[S,'zero-auteur',['idees'],'Zéro auteur','Vous pensez qu’il faut citer des philosophes pour avoir quelque chose à dire.','Répondre au sujet en quatre phrases, sans aucun nom : une réponse, une raison, un exemple, une difficulté.','La preuve que vous pouvez penser seul : la base de chaque partie.'],
[S,'raison-pas-nom',['idees','references'],'Une raison, pas un nom','Vous écrivez « Descartes l’a montré » à la place d’un argument.','Réécrire la phrase sans l’auteur, en donnant la raison.','Un argument qui tient par lui-même.'],
[S,'objection',['idees'],'L’objection qui compte','Vous défendez votre idée sans voir ce qu’on peut lui opposer.','Trouver le meilleur argument contre votre réponse, avec un exemple.','Une réponse plus précise, et souvent la limite de votre partie.'],
[S,'exemple-qui-pense',['idees'],'L’exemple qui pense','Vos exemples illustrent, mais ne prouvent rien.','Inventer un cas concret qui rend une réponse difficile à tenir.','Un exemple qui oblige à distinguer : c’est souvent le point de départ d’une partie.'],
[S,'sans-philosophe',['references'],'Faites tenir le paragraphe','Votre paragraphe s’effondre si l’on retire le philosophe.','Réécrire le passage sans l’auteur, puis replacer la référence là où elle aide.','Un paragraphe qui tient seul, et une référence qui le renforce.'],
[S,'qui-pense-ici',['references'],'Qui pense ici ?','Vous alignez les auteurs les uns après les autres.','Comparer deux paragraphes et dire lequel raisonne vraiment.','Le réflexe de faire travailler les références au lieu de les réciter.'],
[R,'sauvez-citation',['references'],'Sauvez cette citation','Vous connaissez une citation, mais elle tombe à plat dans votre copie.','L’encadrer : une phrase avant pour poser la difficulté, deux après pour dire ce qu’elle apporte.','Une citation qui sert votre raisonnement.'],
[R,'utile-decorative',['references'],'Utile ou décorative ?','Vous ne savez pas si vos références servent à quelque chose.','Comparer deux passages, et dire ce que la référence fait dans l’un et pas dans l’autre.','Le critère d’une référence utile.'],
[R,'citation-paraphrase',['references'],'Citation ou paraphrase ?','Vous ne retenez pas les citations mot pour mot.','Dire la même idée de Kant en paraphrase, puis avec une citation très brève.','La preuve qu’une paraphrase précise vaut souvent mieux qu’une citation.'],
[R,'trop-tot',['references','plan'],'Le philosophe arrive trop tôt','Vous commencez vos parties par « Selon Rousseau… ».','Remettre quatre phrases dans l’ordre : la difficulté avant la référence.','Des parties où la référence répond à une question déjà posée.'],
[R,'remplacez-auteur',['references'],'Remplacez l’auteur','Vos références pourraient être signées de n’importe quel philosophe.','Remplacer le nom de Kant par d’autres, et voir si la phrase change.','Une référence précise, que seul cet auteur pouvait apporter.'],
[R,'meme-texte',['references'],'Même idée, autre sujet','Vous croyez qu’une référence ne sert qu’à un seul sujet.','Utiliser la même idée de Spinoza dans deux sujets différents.','Des références que vous saurez réemployer le jour du bac.'],
[R,'une-seule-utile',['references'],'Trois références, une seule utile','Vous placez toutes les références que vous connaissez.','Choisir la seule qui aide ce sujet, et dire pourquoi les autres n’aident pas.','Moins de noms, mieux choisis.'],
[R,'reprenez-main',['references'],'Reprenez la main','Après une référence, vous passez directement à autre chose.','Écrire la phrase qui suit la référence : « Cette distinction permet ici de… ».','La phrase la plus importante du paragraphe : celle où vous tirez parti de la référence.'],
[O,'operation-inversion',['troisieme'],'Retourner une idée','Vous ne voyez pas comment dépasser l’opposition entre I et II.','Voir comment un philosophe retourne une idée ordinaire : la cause devient l’effet.','Un premier outil pour la troisième partie : l’inversion.'],
[O,'operation-distinction',['troisieme'],'Distinguer deux plans','Vos deux parties semblent se contredire.','Montrer qu’elles ne parlent pas du même point de vue (ce qui est légal, ce qui est moral).','Une troisième partie qui garde I et II, chacune à sa place.'],
[O,'operation-processus',['troisieme'],'Penser dans le temps','Deux idées paraissent contradictoires (la contrainte et la liberté).','Montrer que l’une vient avant l’autre, et la rend possible.','Une troisième partie qui transforme une opposition en chemin.'],
[O,'operation-concept',['troisieme'],'Changer le sens du mot','Le mot du sujet, pris dans son sens habituel, mène à une impasse.','Proposer un autre sens du mot, qui garde ce que I et II avaient de juste.','La forme la plus forte de troisième partie.'],
];

/* Liens qui ne sont pas des exercices mais aident dans une difficulté */
const EXTRA={
sujet:[[P+'#petits-mots','Les petits mots qui comptent','Un tableau : ce que « peut-on », « faut-il », « suffit-il »… font au sujet.']],
troisieme:[[O+'#test-troisieme','Le test de la troisième partie','Quatre questions pour vérifier votre III avant de la rédiger.']],
transitions:[['philosophie-dissertation.html#transitions','Six modèles de transition','Le retournement, le présupposé dévoilé, le prix… chacun avec un exemple.']],
style:[['philosophie-dissertation.html#liens','L’architecture logique','Où placer un lien fort, où laisser la phrase porter la logique.']],
tout:[['philosophie-annales.html','Un sujet du bac 2026, corrigé','Travaillez-le au brouillon, puis comparez avec le corrigé complet.'],['philosophie-notions.html','Les 17 notions','Cinq vrais sujets du bac par notion, et un sujet traité en entier.'],['philosophie-jour-du-bac.html','Le jour du bac','Organiser les quatre heures, et que faire si l’on bloque.']],
};

module.exports={GROUPS,EX,EXTRA};
