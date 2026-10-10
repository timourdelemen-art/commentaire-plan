/* Chaîne « Trouver le problème » : sujets réels du bac (corpus 1996-2026).
   Statuts des réponses : "ok" = solide, "def" = défendable, "no" = à revoir.
   Chaque étape : branche (oui / non / pb), place (raison / scene / perte / pb), énoncé affiché, question, propositions.
   Niveau 2 : certaines étapes sont "write" (l'élève écrit, puis compare avec une réponse possible). */
window.PHILO_CHAINE = {
niveau1: [
{
 id:'justice-lois', sujet:'Pour être juste, suffit-il d’obéir aux lois ?', notion:'La justice',
 oui:'Oui : pour être juste, il <u>suffit</u> d’obéir aux lois.',
 non:'Non : pour être juste, il <u>ne suffit pas</u> d’obéir aux lois.',
 etapes:[
  {b:'oui',p:'raison',q:'Pourquoi répondrait-on oui ?',o:[
   ['La loi est la même pour tous : elle évite que chacun décide seul de ce qui est juste.','ok','Oui : c’est la force du oui, une règle commune au lieu de l’avis de chacun.'],
   ['Sans lois, on ne pourrait pas vivre ensemble.','no','C’est une raison d’obéir, pas une raison pour que cela suffise. Regardez le mot souligné : le sujet demande « suffit-il », pas « faut-il ».'],
   ['Celui qui désobéit est puni.','no','Obéir par peur d’être puni, est-ce être juste ? Cette raison ne dit rien de la justice.']]},
  {b:'oui',p:'scene',q:'Imaginez quelqu’un qui obéit à toutes les lois, sans exception. Que peut-il finir par faire ?',o:[
   ['Obéir à une loi injuste, par exemple une loi qui ordonne de dénoncer des innocents.','ok','Oui : de telles lois ont existé. Obéir à tout, c’est leur obéir aussi.'],
   ['Devenir un citoyen modèle, respecté de tous.','no','C’est ce que promet le oui, pas ce qu’il risque. On cherche ce qui arrive quand on le pousse jusqu’au bout.'],
   ['Refuser une loi qu’il trouve injuste.','no','Ce n’est plus obéir à toutes les lois : c’est déjà la réponse contraire.']]},
  {b:'oui',p:'perte',q:'Qu’a-t-il perdu en route ?',o:[
   ['Le droit de juger si une loi est juste.','ok','Oui : le oui garde la règle commune, mais perd la possibilité de juger la règle.'],
   ['Sa liberté de faire ce qu’il veut.','no','Le sujet parle d’être juste, pas d’être libre. La perte est du côté de la justice.'],
   ['Le respect des autres.','no','Au contraire, il traite tout le monde selon la même loi. Ce qu’il perd est ailleurs : dans la loi injuste qu’il a suivie.']]},
  {b:'non',p:'raison',q:'Pourquoi répondrait-on non ?',o:[
   ['Une loi peut être injuste : il faut encore pouvoir la juger.','ok','Oui : le non en appelle à un juste plus haut que la loi.'],
   ['Il ne faut pas obéir aux lois.','no','Attention : « il ne suffit pas d’obéir » ne veut pas dire « il ne faut pas obéir ». Le non dit que l’obéissance ne suffit pas, pas qu’elle est mauvaise.'],
   ['Les lois changent d’un pays à l’autre.','def','Défendable : cela montre que la loi ne fixe pas seule le juste. Mais la raison la plus forte est plus directe : une loi peut être injuste.']]},
  {b:'non',p:'scene',q:'Imaginez quelqu’un qui juge chaque loi avant d’y obéir. Que se passe-t-il si tout le monde fait comme lui ?',o:[
   ['Chacun n’obéit plus qu’aux lois qui lui plaisent.','ok','Oui : si chacun juge seul, la loi n’est plus commune.'],
   ['Toutes les lois deviennent justes.','no','Ce serait le rêve du non. Mais qui décide de ce qui est juste, si chacun juge ?'],
   ['Plus personne ne respecte rien.','no','C’est exagéré : chacun respecte ce qu’il juge juste. Ce qui se perd est plus précis : une règle qui vaut pour tous.']]},
  {b:'non',p:'perte',q:'Qu’a-t-on perdu en route ?',o:[
   ['Une règle commune, la même pour tous.','ok','Oui : le non garde le droit de juger, mais perd la règle commune.'],
   ['Le droit de juger les lois.','no','C’est justement ce que le non garde. Ce qu’il perd est de l’autre côté.'],
   ['La liberté de penser.','no','Le non la garde, au contraire.']]},
  {b:'pb',p:'pb',q:'Quelle question met ces deux pertes face à face ?',o:[
   ['Être juste, est-ce respecter la loi commune, au risque d’obéir à des lois injustes, ou juger les lois, au risque de ruiner la règle commune ?','ok','Oui : les deux réponses restent ouvertes, et chacune montre ce qu’elle risque.'],
   ['Comment pourrait-on être juste en obéissant à des lois injustes ?','no','La question a déjà répondu : elle suppose qu’obéir ne suffit pas. Une problématique laisse les deux réponses ouvertes.'],
   ['Qu’est-ce que la justice, qu’est-ce que la loi, et faut-il leur obéir ?','no','Trois questions à la suite, et aucune ne met les deux pertes face à face.']]}
 ]},
{
 id:'inconscient-heureux', sujet:'Faut-il être inconscient pour être heureux ?', notion:'Le bonheur',
 oui:'Oui : <u>il faut</u> être inconscient <u>pour</u> être heureux.',
 non:'Non : <u>il ne faut pas</u> être inconscient pour être heureux.',
 etapes:[
  {b:'oui',p:'raison',q:'Pourquoi répondrait-on oui ?',o:[
   ['Celui qui ne voit pas ce qui le menace a l’esprit tranquille.','ok','Oui : l’insouciance protège le repos.'],
   ['Les gens insouciants ont souvent de la chance.','no','La chance n’est pas une raison : le sujet demande si l’insouciance est une condition du bonheur.'],
   ['Selon Freud, l’inconscient gouverne nos désirs.','no','Attention au sens du mot : ici, « inconscient » veut dire insouciant, qui ne voit pas le danger. Ce n’est pas l’inconscient des psychanalystes.']]},
  {b:'oui',p:'scene',q:'Imaginez quelqu’un qui ne voit jamais rien de ce qui le menace. Que lui arrive-t-il ?',o:[
   ['Il vit tranquille, sans mesurer ce qu’il a : on ne se sait heureux qu’en sachant qu’on pourrait ne plus l’être.','ok','Oui : se savoir heureux, c’est savoir que ce bonheur peut se perdre. Qui ne voit rien de ce qui le menace ne le sait pas.'],
   ['Tôt ou tard, il finit forcément par avoir un grave accident, puisqu’il ne voit jamais le danger venir.','no','Ce n’est pas certain. On cherche ce que le oui perd à coup sûr, même si tout va bien.'],
   ['Il devient très inquiet, car il sent confusément que quelque chose le guette, sans savoir quoi au juste.','no','C’est le risque de la réponse contraire, celle qui voit tout.']]},
  {b:'oui',p:'perte',q:'Qu’a-t-il perdu ?',o:[
   ['La conscience d’être heureux.','ok','Oui : le oui garde le repos, mais perd le fait de se savoir heureux.'],
   ['Le repos.','no','Le repos, il l’a : c’est ce que le oui garde.'],
   ['Ses amis.','no','Rien dans le sujet ne parle des autres.']]},
  {b:'non',p:'raison',q:'Pourquoi répondrait-on non ?',o:[
   ['Un bonheur n’est complet que si l’on sait qu’on est heureux.','ok','Oui : le non tient à la conscience d’être heureux.'],
   ['Il faut être conscient de tout pour être heureux.','def','Défendable, mais vous durcissez la réponse : « il ne faut pas être inconscient » ne veut pas dire « il faut tout voir ».'],
   ['Les insouciants font des bêtises.','no','Cette raison ne touche pas au bonheur.']]},
  {b:'non',p:'scene',q:'Imaginez quelqu’un qui voit lucidement tout ce qui le menace. Que lui arrive-t-il ?',o:[
   ['Il s’inquiète sans cesse : la maladie, la mort, la perte de ceux qu’il aime.','ok','Oui : voir clair, c’est voir aussi ce qui menace.'],
   ['Il évite tous les dangers et vit heureux.','no','Voir le danger ne suffit pas à l’éviter ; et le voir, c’est déjà s’inquiéter.'],
   ['Il ne sait plus qu’il est heureux.','no','C’est la perte du oui, pas celle du non.']]},
  {b:'non',p:'perte',q:'Qu’a-t-il perdu ?',o:[
   ['Le repos : l’esprit tranquille.','ok','Oui : le non garde la conscience d’être heureux, mais perd le repos.'],
   ['La conscience d’être heureux.','no','Il la garde : c’est la force du non.'],
   ['Sa santé.','no','Le sujet parle de bonheur, pas de santé.']]},
  {b:'pb',p:'pb',q:'Quelle question met ces deux pertes face à face ?',o:[
   ['Le bonheur exige-t-il d’ignorer ce qui le menace, au risque de ne plus se savoir heureux, ou la lucidité sans laquelle on ne se sait pas heureux le condamne-t-elle à l’inquiétude ?','ok','Oui : chaque réponse est gardée, avec ce qu’elle risque.'],
   ['Le bonheur est-il dans l’insouciance ou dans la lucidité ?','def','Défendable, mais incomplet : on voit les deux réponses, pas ce que chacune perd. Il manque les deux « au risque de ».'],
   ['Comment être heureux si l’on voit tout ce qui nous menace ?','no','La question a déjà répondu : elle suppose qu’il faut être inconscient.']]}
 ]},
{
 id:'certain-bien-agi', sujet:'Peut-on être certain d’avoir bien agi ?', notion:'Le devoir',
 oui:'Oui : on <u>peut être certain</u> d’avoir bien agi.',
 non:'Non : on <u>ne peut pas être certain</u> d’avoir bien agi.',
 etapes:[
  {b:'oui',p:'raison',q:'Pourquoi répondrait-on oui ?',o:[
   ['Je sais ce que j’ai voulu faire : mon intention était bonne.','ok','Oui : le oui s’appuie sur l’intention, que je connais.'],
   ['On pense souvent avoir bien agi.','no','Penser n’est pas être certain. Regardez les mots soulignés : le sujet demande une certitude, pas une impression.'],
   ['Les autres me félicitent.','no','C’est l’avis des autres, pas une certitude sur mon action.']]},
  {b:'oui',p:'scene',q:'Imaginez quelqu’un qui ne juge ses actes que par ses intentions. Que peut-il finir par faire ?',o:[
   ['Faire du mal autour de lui en restant persuadé d’avoir bien agi.','ok','Oui : une bonne intention peut avoir de mauvais effets.'],
   ['Ne plus jamais agir, par peur de mal faire.','no','C’est plutôt le risque de celui qui doute de tout.'],
   ['Toujours faire le bien.','no','Une bonne intention ne garantit pas un bon résultat : c’est justement le problème.']]},
  {b:'oui',p:'perte',q:'Qu’a-t-il perdu en route ?',o:[
   ['Les effets réels de ce qu’il fait.','ok','Oui : la bonne conscience devient aveugle aux conséquences.'],
   ['Sa bonne intention.','no','Il la garde : c’est la force du oui.'],
   ['La confiance des autres.','no','Peut-être, mais ce n’est pas l’essentiel. Bien agir a deux moitiés : l’intention et les effets. Laquelle manque ici ?']]},
  {b:'non',p:'raison',q:'Pourquoi répondrait-on non ?',o:[
   ['Les effets d’un acte nous échappent : on ne sait jamais tout ce qu’ils produiront.','ok','Oui : le non regarde les effets, qu’on ne maîtrise pas.'],
   ['On ne peut jamais bien agir.','no','Attention : le non dit qu’on ne peut pas en être certain, pas qu’on ne peut pas bien agir.'],
   ['La morale change selon les époques.','def','Défendable : cela fragilise toute certitude morale. Mais la raison la plus directe est ailleurs : on ne maîtrise pas les effets de ses actes.']]},
  {b:'non',p:'scene',q:'Imaginez quelqu’un qui ne juge ses actes que par leurs effets. Que devient la valeur de ce qu’il fait ?',o:[
   ['Elle dépend de ce qui arrive ensuite, parfois par hasard.','ok','Oui : un même acte vaut bien ou mal selon des suites qu’il n’a pas choisies.'],
   ['Il devient égoïste.','no','Rien ne l’implique. On cherche ce que devient la valeur de ses actes.'],
   ['Il est certain d’avoir bien agi.','no','Justement non : on ne connaît jamais tous les effets.']]},
  {b:'non',p:'perte',q:'Qu’a-t-il perdu en route ?',o:[
   ['Le mérite de l’intention : son acte ne vaut plus que par la chance.','ok','Oui : le non garde les effets, mais livre la valeur des actes au hasard.'],
   ['Les effets de ses actes.','no','Il ne regarde que cela : c’est ce que le non garde.'],
   ['Sa liberté.','no','Le sujet ne parle pas de liberté.']]},
  {b:'pb',p:'pb',q:'Quelle question met ces deux pertes face à face ?',o:[
   ['La certitude d’avoir bien fait repose-t-elle sur l’intention, au risque d’une bonne conscience aveugle aux effets, ou sur les effets, au risque de livrer la valeur de nos actes au hasard ?','ok','Oui : les deux appuis sont là, chacun avec son risque.'],
   ['Peut-on être certain d’avoir bien agi, ou ne le peut-on pas ?','no','C’est le sujet redit deux fois : aucune perte n’apparaît.'],
   ['Comment être certain d’avoir bien agi, puisque les effets nous échappent ?','no','La question a déjà répondu : elle suppose qu’on ne peut pas.']]}
 ]},
{
 id:'science-utile', sujet:'La science doit-elle être utile ?', notion:'La science',
 oui:'Oui : la science <u>doit</u> être utile.',
 non:'Non : la science <u>n’a pas à</u> être utile ; elle cherche le vrai.',
 etapes:[
  {b:'oui',p:'raison',q:'Pourquoi répondrait-on oui ?',o:[
   ['Savoir, c’est pouvoir : la science sert à soigner, construire, nourrir.','ok','Oui : le oui juge la science à ce qu’elle permet de faire.'],
   ['La science est souvent utile.','no','Regardez le mot souligné : « doit » demande ce qu’on peut exiger d’elle, pas ce qui arrive souvent.'],
   ['Les chercheurs veulent être payés.','no','Cette raison ne touche pas à ce qu’est la science.']]},
  {b:'oui',p:'scene',q:'Imaginez une science qui ne chercherait que ce qui sert. Que finirait-elle par faire ?',o:[
   ['Abandonner les recherches dont on ne voit pas tout de suite l’usage.','ok','Oui : bien des découvertes utiles sont venues de recherches qui ne servaient à rien.'],
   ['Faire des découvertes plus vite.','no','C’est la promesse du oui, pas son risque.'],
   ['Ne plus servir à rien.','no','Au contraire, elle servirait. C’est autre chose qu’elle perd.']]},
  {b:'oui',p:'perte',q:'Qu’a-t-elle perdu en route ?',o:[
   ['La recherche du vrai pour lui-même.','ok','Oui : le oui garde l’utilité, mais perd le désir de connaître.'],
   ['Son utilité.','no','Elle la garde : c’est la force du oui.'],
   ['L’argent des États.','no','Le sujet ne parle pas de financement.']]},
  {b:'non',p:'raison',q:'Pourquoi répondrait-on non ?',o:[
   ['La science cherche à connaître le monde tel qu’il est, pas à le servir.','ok','Oui : le non juge la science à la vérité qu’elle cherche.'],
   ['La science ne doit surtout pas servir.','no','Attention : « elle n’a pas à être utile » ne veut pas dire « elle doit être inutile ». Le non dit seulement qu’on ne peut pas l’exiger.'],
   ['La science est dangereuse.','def','Défendable, mais c’est une autre question, celle de ses dangers. Le non le plus fort parle de ce qu’elle cherche : le vrai.']]},
  {b:'non',p:'scene',q:'Imaginez une science qui ne chercherait que le vrai, sans se soucier des usages. Qu’oublie-t-elle d’elle-même ?',o:[
   ['Qu’elle ne connaît la nature qu’en agissant sur elle, par l’expérience.','ok','Oui : connaître, pour la science, c’est déjà transformer.'],
   ['Qu’elle ne trouve plus rien.','no','Rien ne le dit : une science désintéressée trouve beaucoup.'],
   ['Qu’elle est difficile à comprendre.','no','Peut-être, mais ce n’est pas ce qu’elle oublie d’elle-même.']]},
  {b:'non',p:'perte',q:'Qu’a-t-elle perdu en route ?',o:[
   ['Le lien entre connaître et agir : ses vérités sont aussi des pouvoirs.','ok','Oui : le non garde la vérité, mais oublie que la science connaît en agissant.'],
   ['La vérité.','no','Elle la garde : c’est la force du non.'],
   ['Sa beauté.','no','Le sujet ne parle pas de beauté.']]},
  {b:'pb',p:'pb',q:'Quelle question met ces deux pertes face à face ?',o:[
   ['La science vaut-elle par le pouvoir qu’elle donne, au risque de ne plus chercher que des vérités utiles, ou par la seule vérité, au risque d’oublier qu’elle ne connaît qu’en agissant ?','ok','Oui : chaque réponse est là, avec ce qu’elle risque.'],
   ['Comment la science pourrait-elle chercher le vrai si elle doit être utile ?','no','La question a déjà répondu : elle oppose d’avance le vrai et l’utile.'],
   ['La science est-elle bonne ou mauvaise pour l’homme ?','no','Une question trop large, qui irait à n’importe quel sujet sur la science.']]}
 ]},
{
 id:'artiste-sait', sujet:'L’artiste sait-il ce qu’il fait ?', notion:'L’art',
 oui:'Oui : l’artiste <u>sait</u> ce qu’il fait.',
 non:'Non : l’artiste <u>ne sait pas</u> ce qu’il fait ; l’inspiration le dépasse.',
 etapes:[
  {b:'oui',p:'raison',q:'Pourquoi répondrait-on oui ?',o:[
   ['L’art est un métier : il faut des règles, une technique, des années d’apprentissage.','ok','Oui : le oui s’appuie sur le savoir-faire.'],
   ['L’artiste a envie de faire une œuvre.','no','Regardez le mot souligné : avoir envie n’est pas savoir. Le sujet demande un savoir.'],
   ['Les œuvres sont exposées dans les musées.','no','Ce n’est pas une raison de penser que l’artiste sait ce qu’il fait.']]},
  {b:'oui',p:'scene',q:'Imaginez un artiste qui sait d’avance tout ce qu’il va faire. Que produit-il ?',o:[
   ['Des œuvres faites comme on suit une recette : bien faites, mais sans surprise.','ok','Oui : ce qui est entièrement prévu n’invente plus rien.'],
   ['Des chefs-d’œuvre à chaque fois.','no','C’est la promesse du oui, pas son risque.'],
   ['Rien du tout.','no','Au contraire, il produit. Mais quoi ?']]},
  {b:'oui',p:'perte',q:'Qu’a-t-il perdu en route ?',o:[
   ['L’invention : son œuvre n’apporte plus rien de neuf.','ok','Oui : le oui garde le métier, mais perd l’invention.'],
   ['Son savoir-faire.','no','Il le garde : c’est la force du oui.'],
   ['Ses revenus.','no','Le sujet ne parle pas d’argent.']]},
  {b:'non',p:'raison',q:'Pourquoi répondrait-on non ?',o:[
   ['Une œuvre semble venir d’ailleurs : l’artiste découvre en faisant.','ok','Oui : le non s’appuie sur l’invention, qui échappe au calcul.'],
   ['Les artistes ne travaillent pas.','no','Le non dit que l’artiste ne sait pas tout ce qu’il fait, pas qu’il ne travaille pas.'],
   ['L’art ne sert à rien.','no','C’est une autre question.']]},
  {b:'non',p:'scene',q:'Imaginez un artiste qui ne fait que suivre son inspiration, sans rien maîtriser. Que devient son œuvre ?',o:[
   ['Elle sort de lui sans qu’il puisse dire qu’il l’a voulue.','ok','Oui : ce qu’on n’a pas voulu, en est-on encore l’auteur ?'],
   ['Elle devient parfaite.','no','Rien ne garantit qu’une œuvre inspirée soit parfaite. On cherche ce que le non risque.'],
   ['Elle ressemble à toutes les autres.','no','C’est plutôt le risque de la recette, donc du oui.']]},
  {b:'non',p:'perte',q:'Qu’a-t-il perdu en route ?',o:[
   ['Le fait d’être vraiment l’auteur de son œuvre.','ok','Oui : le non garde l’invention, mais perd l’auteur.'],
   ['L’inspiration.','no','Il la garde : c’est la force du non.'],
   ['Son public.','no','Le sujet ne parle pas du public.']]},
  {b:'pb',p:'pb',q:'Quelle question met ces deux pertes face à face ?',o:[
   ['L’artiste maîtrise-t-il son œuvre comme un savoir-faire, au risque de n’inventer plus rien, ou l’invente-t-il à l’aveugle, au risque de n’en être plus l’auteur ?','ok','Oui : le métier et l’invention, chacun avec son risque.'],
   ['L’artiste sait-il ou ne sait-il pas ce qu’il fait ?','no','C’est le sujet redit : aucune perte n’apparaît.'],
   ['Comment l’artiste pourrait-il savoir ce qu’il fait, puisque l’inspiration le dépasse ?','no','La question a déjà répondu : elle suppose qu’il ne le sait pas.']]}
 ]}
],
niveau2: [
{
 id:'prisonniers-langage', sujet:'Sommes-nous prisonniers du langage ?', notion:'Le langage',
 oui:'Oui : nous <u>sommes</u> prisonniers du langage.',
 non:'Non : nous <u>ne sommes pas</u> prisonniers du langage ; c’est un instrument.',
 etapes:[
  {b:'oui',p:'raison',q:'Pourquoi répondrait-on oui ?',o:[
   ['Nous ne pensons qu’avec des mots que nous n’avons pas choisis.','ok','Oui : les mots nous viennent des autres, et nous pensons avec eux.'],
   ['Nous parlons tous les jours.','no','Parler souvent n’est pas être prisonnier. Le sujet demande si les mots nous enferment.'],
   ['Certaines langues sont difficiles à apprendre.','no','Cette raison ne dit rien d’un enfermement de la pensée.']]},
  {b:'oui',p:'scene',w:1,q:'Imaginez que ce oui soit vrai jusqu’au bout. Que faudrait-il pour pouvoir dire qu’on est prisonnier ? Écrivez une phrase.',m:'Il faudrait voir le langage du dehors, comme on voit les murs d’une prison ; or on le dit avec des mots.'},
  {b:'oui',p:'perte',q:'Qu’a-t-on perdu en route ?',o:[
   ['La possibilité même de le savoir : pour se dire prisonnier, il faudrait un point de vue hors du langage.','ok','Oui : le oui se contredit en se disant.'],
   ['La liberté de parler.','no','On parle toujours : le oui ne nous l’enlève pas.'],
   ['Le sens des mots.','no','Les mots gardent leur sens. Ce qui se perd est plus étrange : la possibilité de se savoir prisonnier.']]},
  {b:'non',p:'raison',q:'Pourquoi répondrait-on non ?',o:[
   ['Nous choisissons nos mots pour dire ce que nous pensons.','ok','Oui : le non fait du langage un outil.'],
   ['On peut toujours se taire.','def','Défendable : se taire montre une marge de liberté. Mais la raison la plus forte est que nous nous servons des mots comme d’un outil.'],
   ['Le langage change avec le temps.','no','Qu’il change ne dit pas si nous en sommes libres.']]},
  {b:'non',p:'scene',w:1,q:'Imaginez une pensée tout à fait libre du langage, sans aucun mot. Que pourrait-elle penser ? Écrivez une phrase.',m:'Presque rien de précis : une pensée sans mots reste vague, elle ne se saisit pas elle-même.'},
  {b:'non',p:'perte',q:'Qu’a-t-on perdu en route ?',o:[
   ['Une pensée précise : sans les mots, la pensée ne prend pas forme.','ok','Oui : le non garde la liberté, mais perd la pensée qui se dit.'],
   ['La maîtrise des mots.','no','Le non la garde, au contraire.'],
   ['Les langues étrangères.','no','Le sujet ne parle pas des langues étrangères.']]},
  {b:'pb',p:'pb',w:1,q:'Écrivez la question qui met ces deux pertes face à face, sur le modèle : « … suppose-t-il…, et … suppose-t-il… ? »',m:'Nous dire prisonniers du langage suppose-t-il un point de vue hors de lui, et nous en dire libres, une pensée sans mots qui ne pourrait rien penser ?'}
 ]}
],
niveau3: [
 {sujet:'Peut-on être heureux quand les autres ne le sont pas ?',href:'philosophie-bac-2026-peut-on-etre-heureux-quand-les-autres-ne-le-sont-pas.html'},
 {sujet:'Peut-on être certain d’avoir bien agi ?',href:'philosophie-bac-2026-peut-on-etre-certain-d-avoir-bien-agi.html'},
 {sujet:'La science doit-elle être utile ?',href:'philosophie-bac-2026-la-science-doit-elle-etre-utile.html'},
 {sujet:'L’artiste sait-il ce qu’il fait ?',href:'philosophie-bac-2026-l-artiste-sait-il-ce-qu-il-fait.html'},
 {sujet:'Sommes-nous prisonniers du langage ?',href:'philosophie-bac-2026-sommes-nous-prisonniers-du-langage.html'}
]
};

/* Au deuxième niveau, reprendre plusieurs sujets sous une forme plus exigeante :
   la scène qui met chaque réponse en difficulté et la question finale sont écrites.
   Les exemples restent disponibles seulement après une tentative. */
const exemplesGuides=window.PHILO_CHAINE.niveau1.map(s=>({
  ...s,
  etapes:s.etapes.map((e,i)=>{
    if(![1,4,6].includes(i)) return {...e};
    const solide=e.o.find(o=>o[1]==='ok');
    return {b:e.b,p:e.p,w:1,
      q:i===6?'Écrivez une question qui relie les deux difficultés sans choisir une réponse à l’avance.':
        'Sans propositions, imaginez ce qui met cette réponse en difficulté. Écrivez une phrase.',
      m:solide[0]};
  })
}));
window.PHILO_CHAINE.niveau2.push(...exemplesGuides);
