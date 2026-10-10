/* Le plan pas à pas : de la problématique au plan détaillé.
   Chaque étape : p = partie (I, II, III), k = place (reponse, exemple, limite, transition, issue, reste),
   q = question, o = [texte, ok|def|no, pourquoi] ; w:1 + m = étape écrite avec une réponse possible.
   Pour la troisième partie, plusieurs propositions peuvent tenir : la justification dit ce que chacune sauve et ce qu’elle laisse. */
window.PHILO_PLAN = {
niveau1: [
{
 id:'justice-lois', sujet:'Pour être juste, suffit-il d’obéir aux lois ?', notion:'La justice', v:2,
 pb:'Être juste, est-ce respecter la loi commune, au risque d’obéir à des lois injustes, ou juger les lois, au risque de ruiner la règle commune ?',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['Obéir aux lois suffit : la loi, la même pour tous, empêche chacun de décider seul du juste.','ok','Une réponse au sujet, avec sa raison : c’est un vrai point de départ.'],
  ['Les lois sont utiles, car sans elles la société serait livrée au désordre et à la violence.','def','Vrai, mais cela parle de l’ordre, pas encore de la justice : rapprochez-vous du sujet.'],
  ['Il faut obéir aux lois justes et désobéir aux lois injustes, selon les situations.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Socrate, condamné à tort, refuse de s’évader : il ne veut pas détruire les lois de la cité.','ok','La réponse est poussée au plus fort : elle tient même quand la loi frappe injustement celui qui obéit.'],
  ['Le juge applique la même loi au riche et au pauvre : personne ne fait sa propre justice.','def','Un bon exemple de la raison de la partie, mais il illustre plus qu’il ne renforce : la réponse tient-elle encore quand la loi est dure ?'],
  ['Antigone désobéit à Créon pour enterrer son frère, au nom d’une loi plus haute.','no','Cet exemple défend la réponse contraire : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Une loi peut ordonner de commettre l’injuste : obéir sans exception, c’est alors en devenir complice.','ok','La limite vient de la réponse elle-même. Socrate subissait l’injustice ; ici, la loi oblige à la commettre.'],
  ['Les lois changent d’un pays à l’autre et d’une époque à l’autre : elles ne sont donc pas toujours justes.','def','Bonne piste, mais la variété des lois ne prouve pas qu’obéir rende injuste. Allez jusqu’au cas où obéir fait le mal.'],
  ['Beaucoup de gens ne respectent pas les lois, et ne sont pas punis pour autant.','no','Un fait, pas une limite de la réponse : que d’autres désobéissent ne dit rien de celui qui obéit.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['Mais si la loi peut ordonner l’injuste, au nom de quoi pourra-t-on la juger ?','ok','Elle reprend la limite de la partie I et pose la question à laquelle seule la partie II peut répondre.'],
  ['Mais si la loi peut ordonner l’injuste, il faut une justice au-dessus des lois pour les juger.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Après avoir étudié l’obéissance aux lois, nous allons étudier la désobéissance.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on passe de l’une à l’autre.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Au nom d’une justice que la loi ne crée pas, et que la première réponse ne pouvait préserver.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I perdait.'],
  ['Au nom de la conscience de chacun, qui sait toujours, au fond d’elle-même, ce qui est juste.','def','Elle répond à la question, mais « toujours » va trop vite : c’est ce que la partie II devra examiner, et ce sera sa limite.'],
  ['Au nom de la majorité : une loi est juste quand la plupart des gens l’approuvent.','no','La majorité fait aussi les lois : on retombe dans la partie I au lieu d’en sortir.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Le refus de Rosa Parks a ouvert la lutte qui a fait condamner la ségrégation : la désobéissance a jugé la loi.','ok','La partie montre ce qu’elle permet de comprendre : sans le jugement des citoyens, la loi injuste n’aurait pas été corrigée.'],
  ['Il ne suffit pas d’obéir : être juste, c’est juger les lois au nom de ce qui est juste, et non de ce qui est permis.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['Les lois sont toujours injustes, car elles sont faites par les plus puissants pour se protéger.','no','Excessif, et ce n’est pas le « non » du sujet : il dit qu’obéir ne suffit pas, pas que toute loi est injuste.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Si chacun juge les lois à sa façon, il n’y a plus de règle commune : chacun fait sa justice.','ok','La limite vient encore de la réponse : le jugement de chacun ruine ce que la loi garantissait.'],
  ['Celui qui désobéit s’expose à des sanctions, parfois très lourdes, et risque sa propre liberté.','def','Vrai, mais c’est une objection extérieure : la limite doit venir du jugement lui-même.'],
  ['Il est très difficile de savoir avec certitude ce qui est juste, et chacun en a son idée.','no','Trop vague : dites ce que cette difficulté produit quand chacun juge seul.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Obéir ou juger : les deux réponses confiaient la justice à un seul. Faut-il qu’un seul la porte ?','ok','Elle découvre ce que I et II avaient en commun sans le dire : la partie III pourra poser le problème autrement.'],
  ['Si obéir ne suffit pas et que juger seul détruit la loi, faut-il finalement obéir ou bien désobéir ?','def','Elle reprend les deux limites, mais repose la même alternative : la partie III ne pourrait que choisir un camp.'],
  ['Il faudra donc, pour finir, trouver un juste équilibre entre l’obéissance et la désobéissance.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Non : chacune portait une moitié de la justice. Elle doit être commune (I) et pouvoir être jugée (II).','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur l’ordre public, la partie II sur la liberté de chacun.','def','Proche, mais l’ordre et la liberté déplacent le sujet : restez sur la justice.'],
  ['Aucune des deux n’avait raison : il faut reprendre la question de la justice autrement.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Obéir en jugeant : respecter la loi, la contester par les voies communes, et désobéir publiquement, en acceptant la sanction, si elle ordonne l’injuste.','ok','Elle répartit la justice entre deux acteurs : la règle commune à l’État (I), le jugement aux citoyens (II). En acceptant sa peine, celui qui désobéit reconnaît encore la loi.'],
  ['Distinguer le légal et le juste : la loi dit ce qui est permis, pas ce qui est juste ; on lui obéit donc sans jamais lui confier la justice.','def','Une distinction solide, qui sauve les deux parties. Mais elle laisse entière la question pratique : que faire quand les deux s’opposent ?'],
  ['Il faut un juste milieu : obéir à la plupart des lois, et ne désobéir qu’à quelques-unes, quand elles nous paraissent trop dures.','no','Couper la poire en deux : rien ne dit lesquelles, ni pourquoi. Le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['Être juste, c’est obéir en jugeant. Reste un cas : l’État qui ferme toute voie de contestation.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['Être juste, c’est obéir en jugeant : avec cette réponse, toute la difficulté du sujet se trouve résolue.','def','La réponse est juste, mais elle se croit complète : elle suppose des voies communes pour contester. Cherchez son reste.'],
  ['Être juste, c’est parfois obéir et parfois désobéir, selon les cas.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Quand l’État ferme toute voie de contestation, la désobéissance peut-elle rester juste sans devenir violence ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['Peut-on encore être juste dans une société qui n’aurait plus aucune loi pour nous guider ?','def','Une question liée au sujet, mais qui ne part pas du reste : dites ce que « obéir en jugeant » laisse sans réponse.'],
  ['La justice est un sujet passionnant, qui mérite toujours réflexion et qu’on ne finira jamais d’épuiser.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'inconscient-heureux', sujet:'Faut-il être inconscient pour être heureux ?', notion:'Le bonheur',
 pb:'Le bonheur exige-t-il d’ignorer ce qui le menace, au risque de ne plus se savoir heureux, ou la lucidité sans laquelle on ne se sait pas heureux le condamne-t-elle à l’inquiétude ?',
 annale:'faut-il-etre-inconscient-pour-etre-heureux',
 etapes:[
 {p:'I',k:'reponse',q:'Quelle première réponse défendre en partie I ?',o:[
  ['Il faut être inconscient pour être heureux : ignorer ce qui menace protège le repos.','ok','Une réponse au sujet, avec sa raison : l’ignorance protège.'],
  ['Les gens simples semblent souvent plus heureux que les savants.','def','Une impression juste, mais pas encore une raison : dites pourquoi l’ignorance rendrait heureux.'],
  ['Il faut voir clair sur ce qui dépend de nous, et accepter le reste.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'exemple',q:'Quel exemple porte le mieux cette réponse ?',o:[
  ['Les hommes se divertissent pour ne pas penser à la mort : Pascal y voit le ressort de leur bonheur.','ok','L’exemple montre une ignorance voulue, qui protège : c’est exactement la réponse.'],
  ['Un enfant joue sans connaître tous les dangers du monde qui l’entoure.','def','Juste, mais l’enfant ne choisit pas d’ignorer : le divertissement, qui détourne exprès, est plus fort.'],
  ['Socrate préfère savoir, même insatisfait, plutôt que vivre dans l’ignorance.','no','Il défend la réponse contraire : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Un bonheur fondé sur l’ignorance ne se sait plus heureux, et la réalité finit par revenir.','ok','La limite vient de la réponse : à force d’ignorer, on ignore aussi son bonheur.'],
  ['Ignorer certains dangers peut mettre la santé de chacun en danger.','def','Vrai, mais c’est une objection extérieure : la limite doit venir du bonheur lui-même.'],
  ['Tout le monde n’a pas la chance de pouvoir rester inconscient.','no','Un constat, pas une limite de la réponse.']]},
 {p:'II',k:'transition',q:'Quelle transition fait naître la partie II de cette limite ?',o:[
  ['Mais si un bonheur qu’on ignore n’est plus un bonheur, il faut se savoir heureux pour l’être.','ok','Elle part de la limite et en tire l’exigence de la partie II.'],
  ['Voyons maintenant l’autre point de vue, celui de la conscience.','no','Une annonce : rien ne dit pourquoi on change de réponse.'],
  ['Pourtant, la conscience aussi peut rendre heureux, à sa manière.','def','Le passage va dans le bon sens, mais il affirme sans fonder : reprenez la limite.']]},
 {p:'II',k:'reponse',q:'Quelle réponse défendre en partie II ?',o:[
  ['Il faut être conscient : se savoir heureux fait partie du bonheur.','ok','La réponse contraire, qui garde ce que la partie I perdait.'],
  ['La connaissance rend libre, et la liberté rend heureux.','def','Proche, mais vous glissez vers la liberté : restez sur le bonheur.'],
  ['Il faut tout savoir et tout comprendre pour être heureux.','no','Excessif : le « non » dit qu’il faut se savoir heureux, pas tout savoir.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais la lucidité voit tout ce qui menace : comment laisserait-elle place au repos ?','ok','La limite vient de la réponse : voir clair, c’est voir aussi les menaces.'],
  ['Les gens lucides paraissent souvent inquiets ou mélancoliques.','def','Constat juste, mais dites pourquoi : c’est la lucidité elle-même qui voit les menaces.'],
  ['Personne ne peut être totalement conscient de tout.','no','Vrai, mais cela ne montre pas ce que la lucidité fait perdre au bonheur.']]},
 {p:'III',k:'issue',q:'Quelle troisième partie garde le plus de I et de II ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Distinguer ce qui dépend de nous et ce qui n’en dépend pas : savoir, mais accepter ce qu’on ne peut changer, comme Épicure devant la mort.','ok','Elle garde la lucidité (II) et le repos (I). Elle laisse un reste : les pertes impossibles à accepter.'],
  ['Penser dans le temps : l’insouciance convient à l’enfance, la lucidité à l’âge adulte.','def','Elle sauve les deux, mais en les séparant dans le temps : l’adulte reste sans repos. Le reste est plus grand.'],
  ['Il faut être un peu conscient et un peu inconscient, selon les moments.','no','Un juste milieu sans raison : le problème reste entier.']]},
 {p:'III',k:'reste',q:'Qu’est-ce que cette troisième partie laisse ouvert, pour la conclusion ?',o:[
  ['Devant la mort de ceux qu’on aime, la lucidité peut-elle encore apaiser, ou faut-il une part d’oubli ?','ok','C’est le reste exact : certaines pertes ne s’acceptent pas.'],
  ['Le bonheur existe-t-il vraiment, ou n’est-il qu’un rêve ?','def','Une vraie question, mais trop large : partez de ce que la solution ne règle pas.'],
  ['Chacun doit trouver son propre chemin vers le bonheur.','no','Une formule vide.']]}
 ]
},
{
 id:'certain-bien-agi', sujet:'Peut-on être certain d’avoir bien agi ?', notion:'Le devoir',
 pb:'La certitude d’avoir bien fait repose-t-elle sur l’intention, au risque d’une bonne conscience aveugle aux effets, ou sur les effets, au risque de livrer la valeur de nos actes au hasard ?',
 annale:'peut-on-etre-certain-d-avoir-bien-agi',
 etapes:[
 {p:'I',k:'reponse',q:'Quelle première réponse défendre en partie I ?',o:[
  ['On peut être certain d’avoir bien agi : on connaît son intention, qui dépend de nous.','ok','Une réponse au sujet, avec sa raison.'],
  ['On le sait quand les autres nous remercient ou nous félicitent.','def','Une piste, mais le jugement des autres ne donne pas encore une certitude à soi.'],
  ['On n’est jamais certain de rien, et surtout pas de soi-même.','no','C’est la réponse contraire, en plus excessive : gardez-la pour la partie II, nuancée.']]},
 {p:'I',k:'exemple',q:'Quel exemple porte le mieux cette réponse ?',o:[
  ['Pour Kant, une bonne volonté reste bonne même si elle échoue : sa valeur ne dépend pas des résultats.','ok','La référence fait exactement ce que la partie demande : fonder la certitude sur l’intention.'],
  ['Je prête de l’argent à un ami, et il est content de l’avoir reçu.','def','L’exemple montre un bon effet plus qu’une intention : il sert à moitié.'],
  ['Le pilote Sully, seul la nuit, doute d’avoir pris la bonne décision.','no','Il illustre le doute : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Une bonne intention ne suffit pas quand l’action a fait du mal, et je ne suis pas sûr de connaître mes vraies raisons.','ok','La limite vient de la réponse : l’intention ne garantit ni les effets, ni sa propre sincérité.'],
  ['Les intentions sont difficiles à prouver devant un tribunal.','def','Vrai, mais objection extérieure : la question est ce que je sais de moi, pas ce qu’un juge peut prouver.'],
  ['Certaines personnes ont de mauvaises intentions.','no','Hors sujet : on parle de celui qui croit avoir bien agi.']]},
 {p:'II',k:'transition',q:'Quelle transition fait naître la partie II de cette limite ?',o:[
  ['Mais si je peux me tromper sur mes propres motifs, la certitude ne peut plus reposer sur l’intention seule.','ok','Elle part de la limite et ouvre la partie II.'],
  ['Nous allons maintenant parler des conséquences de nos actes.','no','Une annonce : rien ne dit pourquoi on change de réponse.'],
  ['Les conséquences de nos actes comptent aussi, bien sûr.','def','Juste, mais affirmé sans fondement : reprenez la limite.']]},
 {p:'II',k:'reponse',q:'Quelle réponse défendre en partie II ?',o:[
  ['On ne peut pas en être certain : les effets de nos actes et nos vrais motifs nous échappent.','ok','La réponse contraire, qui garde ce que la partie I perdait.'],
  ['Seuls les résultats comptent : une action est bonne si elle réussit.','def','Proche, mais vous oubliez les motifs cachés : la réponse est trop étroite.'],
  ['Il est impossible de jamais bien agir, quoi qu’on fasse.','no','Excessif : le sujet porte sur la certitude, pas sur la possibilité de bien agir.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais si l’on n’est jamais certain, le doute finit par empêcher d’agir.','ok','La limite vient de la réponse : un doute sans fin paralyse.'],
  ['Les effets d’une action ne sont parfois connus que bien plus tard.','def','Vrai, mais cela renforce la partie II au lieu d’en montrer la limite.'],
  ['Le doute est une attitude philosophique très ancienne.','no','Une généralité, pas une limite.']]},
 {p:'III',k:'issue',q:'Quelle troisième partie garde le plus de I et de II ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Changer le sens de la certitude : on n’est pas sûr d’avoir bien agi, mais on peut être sûr d’avoir agi avec soin, prêt à répondre des effets.','ok','Elle garde l’intention (I) et le souci des effets (II). Elle laisse un reste : le jugement des autres et du temps.'],
  ['Distinguer l’intention et les effets : on est certain de l’une, jamais des autres.','def','Elle sauve les deux, mais laisse l’agent coupé en deux : bien voulu, mal fait ? Le reste est plus grand.'],
  ['Il faut attendre de connaître tous les effets avant de juger son action.','no','C’est choisir la partie II, et c’est impossible : les effets ne finissent jamais.']]},
 {p:'III',k:'reste',q:'Qu’est-ce que cette troisième partie laisse ouvert, pour la conclusion ?',o:[
  ['Si c’est devant les autres qu’on répond de ses actes, la certitude d’avoir bien agi peut-elle être une certitude que l’on possède seul ?','ok','C’est le reste exact : répondre suppose quelqu’un devant qui répondre.'],
  ['Faut-il toujours agir, même quand on n’est sûr de rien ?','def','Une vraie question, mais qui revient à la partie II : partez de la solution.'],
  ['Il faut toujours essayer de faire de son mieux.','no','Une formule vide.']]}
 ]
},
{
 id:'science-utile', sujet:'La science doit-elle être utile ?', notion:'La science',
 pb:'La science vaut-elle par le pouvoir qu’elle donne, au risque de ne plus chercher que des vérités utiles, ou par la seule vérité, au risque d’oublier qu’elle ne connaît qu’en agissant ?',
 annale:'la-science-doit-elle-etre-utile',
 etapes:[
 {p:'I',k:'reponse',q:'Quelle première réponse défendre en partie I ?',o:[
  ['La science doit être utile : connaître les causes, c’est pouvoir agir sur la nature.','ok','Une réponse au sujet, avec sa raison.'],
  ['La science coûte très cher, elle doit donc rapporter quelque chose.','def','Une raison économique : elle ne dit pas encore ce qu’est la science.'],
  ['La science doit chercher le vrai, puis répondre de ses usages.','no','C’est déjà une troisième partie.']]},
 {p:'I',k:'exemple',q:'Quel exemple porte le mieux cette réponse ?',o:[
  ['Descartes veut que la science nous rende « comme maîtres et possesseurs de la nature ».','ok','La référence fait exactement ce que la partie demande : lier savoir et pouvoir.'],
  ['Les vaccins ont sauvé des millions de vies au cours du siècle dernier.','def','Il montre que la science est utile, pas qu’elle doive l’être : il sert à moitié.'],
  ['Einstein cherche la relativité sans penser à aucun usage pratique.','no','Il défend la réponse contraire : partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Si l’utilité choisit les questions, on abandonne les recherches inutiles, d’où sortent pourtant les grandes découvertes.','ok','La limite vient de la réponse : exiger l’utile prive de ce qui sera utile.'],
  ['Certaines inventions scientifiques sont dangereuses pour l’humanité.','def','Une piste pour plus tard, mais ce n’est pas la limite de cette réponse-ci.'],
  ['Beaucoup d’élèves n’aiment pas les matières scientifiques.','no','Hors sujet.']]},
 {p:'II',k:'transition',q:'Quelle transition fait naître la partie II de cette limite ?',o:[
  ['Exiger de la science qu’elle serve, c’est la priver de ce qui servira : aucun calcul d’utilité n’aurait commandé la relativité.','ok','Elle part de la limite et ouvre la partie II.'],
  ['Passons maintenant à la science pure et désintéressée.','no','Une annonce, sans raison.'],
  ['Mais la science ne cherche pas seulement à servir.','def','Juste, mais affirmé sans fondement.']]},
 {p:'II',k:'reponse',q:'Quelle réponse défendre en partie II ?',o:[
  ['La science vaut d’abord par la vérité : son utilité ne vient qu’ensuite.','ok','La réponse contraire, qui garde ce que la partie I perdait.'],
  ['La science est un loisir réservé à quelques curieux passionnés.','def','Vous réduisez la recherche du vrai à un loisir : la réponse est affaiblie.'],
  ['La science est inutile, et c’est très bien ainsi.','no','Excessif : le « non » dit qu’elle n’a pas à être utile, pas qu’elle est inutile.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais la science connaît en expérimentant : ses vérités deviennent aussitôt des pouvoirs, dont d’autres se servent.','ok','La limite vient de la réponse : la science pure oublie qu’elle agit.'],
  ['Les chercheurs ont besoin de beaucoup d’argent pour travailler.','def','Vrai, mais extérieur : gardez-le pour le reste, en conclusion.'],
  ['La vérité dépend toujours du point de vue de chacun.','no','Hors sujet, et faux pour la science.']]},
 {p:'III',k:'issue',q:'Quelle troisième partie garde le plus de I et de II ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Distinguer deux plans : la recherche n’a pas à être utile, mais la science répond de ce que ses résultats rendent possible.','ok','Elle garde la liberté de chercher (II) et la puissance des résultats (I). Elle laisse un reste : les crédits vont à ce qui promet d’être utile.'],
  ['Penser dans le temps : d’abord la recherche pure, ensuite les applications.','def','Elle sauve les deux, mais oublie la responsabilité : qui répond des usages dangereux ? Le reste est plus grand.'],
  ['Il faut une science à moitié utile et à moitié libre.','no','Un juste milieu sans raison.']]},
 {p:'III',k:'reste',q:'Qu’est-ce que cette troisième partie laisse ouvert, pour la conclusion ?',o:[
  ['La science peut-elle rester libre de chercher le vrai quand c’est l’utilité qui lui donne les moyens de chercher ?','ok','C’est le reste exact de la solution.'],
  ['La science fera-t-elle un jour le bonheur de l’humanité ?','def','Une vraie question, mais qui ne part pas de la solution.'],
  ['La science ne cesse de progresser depuis des siècles.','no','Un constat, pas une question.']]}
 ]
},
{
 id:'artiste-sait', sujet:'L’artiste sait-il ce qu’il fait ?', notion:'L’art',
 pb:'L’artiste maîtrise-t-il son œuvre comme un savoir-faire, au risque de n’inventer plus rien, ou l’invente-t-il à l’aveugle, au risque de n’en être plus l’auteur ?',
 annale:'l-artiste-sait-il-ce-qu-il-fait',
 etapes:[
 {p:'I',k:'reponse',q:'Quelle première réponse défendre en partie I ?',o:[
  ['L’artiste sait ce qu’il fait : l’art est d’abord un métier qui s’apprend.','ok','Une réponse au sujet, avec sa raison.'],
  ['Beaucoup d’artistes font de longues études dans des écoles d’art.','def','Un fait, pas encore une raison : dites ce que ces études donnent.'],
  ['L’artiste découvre ce qu’il fait à mesure qu’il le fait.','no','C’est déjà une troisième partie.']]},
 {p:'I',k:'exemple',q:'Quel exemple porte le mieux cette réponse ?',o:[
  ['Les esquisses et les brouillons d’un artiste montrent un travail réfléchi, repris, corrigé.','ok','L’exemple montre le savoir en acte : c’est exactement la réponse.'],
  ['Un peintre choisit avec soin les couleurs de sa palette.','def','Juste, mais mince : un choix de couleurs ne montre pas encore toute une maîtrise.'],
  ['Pour Kant, le génie ne sait pas expliquer comment il produit son œuvre.','no','La référence défend la réponse contraire : partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Si tout était su d’avance, l’œuvre ne serait qu’une fabrication : elle n’inventerait rien.','ok','La limite vient de la réponse : le savoir complet tue l’invention.'],
  ['Certains artistes ratent des œuvres qu’ils avaient longuement préparées.','def','Une piste, mais rater n’est pas encore ne pas savoir.'],
  ['L’art est une affaire de goût, et chacun a le sien.','no','Hors sujet : on parle de l’artiste, pas du goût du public.']]},
 {p:'II',k:'transition',q:'Quelle transition fait naître la partie II de cette limite ?',o:[
  ['Un métier qui saurait tout d’avance ne produirait que ce qu’il sait : l’œuvre doit donc dépasser ce savoir.','ok','Elle part de la limite et ouvre la partie II.'],
  ['Voyons à présent ce que les philosophes disent du génie.','no','Une annonce, sans raison.'],
  ['Pourtant, l’inspiration joue aussi un grand rôle dans l’art.','def','Juste, mais affirmé sans fondement.']]},
 {p:'II',k:'reponse',q:'Quelle réponse défendre en partie II ?',o:[
  ['L’artiste ne sait pas tout ce qu’il fait : l’œuvre le dépasse.','ok','La réponse contraire, qui garde ce que la partie I perdait.'],
  ['L’artiste est inspiré par les muses, comme le croyaient les Grecs.','def','Une image à expliquer : dites ce qu’elle signifie pour le savoir de l’artiste.'],
  ['L’artiste ne sait jamais rien de ce qu’il fait.','no','Excessif : le « non » dit qu’il ne sait pas tout.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais si l’artiste ne sait pas ce qu’il fait, l’œuvre est-elle encore la sienne, et non un heureux hasard ?','ok','La limite vient de la réponse : sans savoir, plus d’auteur.'],
  ['Le public ne comprend pas toujours les œuvres qu’il regarde.','def','Vous passez au public : la limite doit concerner l’artiste.'],
  ['Les œuvres d’art coûtent de plus en plus cher.','no','Hors sujet.']]},
 {p:'III',k:'issue',q:'Quelle troisième partie garde le plus de I et de II ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Penser dans le temps : l’artiste découvre ce qu’il fait en le faisant, et son métier lui permet de garder ce qu’il découvre.','ok','Elle garde la maîtrise (I) et l’invention (II). Elle laisse un reste : le sens que les spectateurs ajoutent après.'],
  ['Distinguer deux plans : l’artiste sait comment il fait, il ne sait pas ce que l’œuvre signifiera.','def','Elle sauve les deux, mais laisse l’invention hors du travail de l’artiste. Le reste est plus grand.'],
  ['L’artiste sait à moitié ce qu’il fait, et l’autre moitié lui échappe.','no','Un juste milieu sans raison.']]},
 {p:'III',k:'reste',q:'Qu’est-ce que cette troisième partie laisse ouvert, pour la conclusion ?',o:[
  ['Si ceux qui regardent l’œuvre l’achèvent, l’artiste sait-il encore ce qu’il a fait, une fois l’œuvre sortie de l’atelier ?','ok','C’est le reste exact de la solution.'],
  ['L’art est-il vraiment utile à la société ?','def','Une autre question : partez de la solution.'],
  ['Chaque artiste a son style et sa manière de travailler.','no','Un constat, pas une question.']]}
 ]
}
],
niveau2: [
{
 id:'prisonniers-langage', sujet:'Sommes-nous prisonniers du langage ?', notion:'Le langage',
 pb:'Nous dire prisonniers du langage suppose-t-il un point de vue hors de lui, et nous en dire libres, une pensée sans mots qui ne pourrait rien penser ?',
 annale:'sommes-nous-prisonniers-du-langage',
 etapes:[
 {p:'I',k:'reponse',q:'Quelle première réponse défendre en partie I ?',o:[
  ['Nous sommes prisonniers du langage : nous pensons dans une langue que nous n’avons pas choisie.','ok','Une réponse au sujet, avec sa raison.'],
  ['Il existe des mots qu’on ne peut pas traduire d’une langue à l’autre.','def','Un fait, pas encore une raison : dites ce qu’il montre de notre pensée.'],
  ['Le langage est un milieu qui limite la pensée et la rend possible.','no','C’est déjà une troisième partie.']]},
 {p:'I',k:'exemple',q:'Quel exemple porte le mieux cette réponse ?',o:[
  ['Pour Bergson, les mots ne notent des choses que ce qu’elles ont de commun et d’utile.','ok','La référence montre ce que les mots nous cachent : c’est la prison.'],
  ['Un enfant apprend sa langue maternelle sans jamais l’avoir choisie.','def','Il montre une langue reçue, pas encore qu’elle enferme.'],
  ['Les poètes inventent des mots et des images que la langue n’avait pas.','no','Il défend la réponse contraire : partie II.']]},
 {p:'I',k:'limite',w:1,q:'À vous : écrivez la limite de cette réponse, poussée jusqu’au bout. Une phrase.',m:'Mais si nous pouvons dire que nous sommes enfermés, c’est que nous voyons les limites du langage : nous ne sommes donc pas entièrement prisonniers.'},
 {p:'II',k:'transition',w:1,q:'À vous : écrivez la transition qui fait naître la partie II de cette limite. Une ou deux phrases.',m:'Pour savoir que les mots cachent les choses, il faut avoir aperçu ce qu’ils cachent : la thèse de la prison suppose un regard qui n’y est pas enfermé.'},
 {p:'II',k:'reponse',q:'Quelle réponse défendre en partie II ?',o:[
  ['Nous ne sommes pas prisonniers : nous travaillons le langage, nous l’agrandissons.','ok','La réponse contraire, qui garde ce que la partie I perdait.'],
  ['Nous pouvons toujours choisir de nous taire.','def','Le silence n’est pas une liberté de penser : la réponse est trop faible.'],
  ['Nous pouvons penser parfaitement sans aucun mot.','no','Excessif : c’est justement la limite de la partie II.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais cette liberté s’exerce toujours avec des mots : on ne pense jamais hors du langage.','ok','La limite vient de la réponse : travailler la langue, c’est rester dedans.'],
  ['Les grands poètes sont rares dans une génération.','def','Un constat : il ne montre pas la limite de la liberté elle-même.'],
  ['Des langues disparaissent chaque année dans le monde.','no','Hors sujet.']]},
 {p:'III',k:'issue',w:1,q:'À vous : écrivez une troisième partie qui garde quelque chose de I et de II. Deux phrases.',m:'Le langage n’est pas une prison mais un milieu, comme l’air pour l’oiseau : il limite et rend possible. Ses limites ne sont pas des murs : elles se déplacent quand on le travaille.'},
 {p:'III',k:'reste',q:'Qu’est-ce que cette troisième partie laisse ouvert, pour la conclusion ?',o:[
  ['Ce que nous ne savons pas encore dire marque-t-il une limite de notre langue, ou de notre pensée ?','ok','C’est le reste exact de la solution.'],
  ['Faut-il apprendre plusieurs langues pour mieux penser ?','def','Une question liée, mais qui ne part pas de la solution.'],
  ['Le langage est ce qui distingue l’homme des animaux.','no','Une affirmation, pas une question ouverte.']]}
 ]
}
],
niveau3: [
{sujet:'Peut-on être heureux quand les autres ne le sont pas ?',href:'philosophie-bac-2026-peut-on-etre-heureux-quand-les-autres-ne-le-sont-pas.html'},
{sujet:'Peut-on être certain d’avoir bien agi ?',href:'philosophie-bac-2026-peut-on-etre-certain-d-avoir-bien-agi.html'},
{sujet:'La science doit-elle être utile ?',href:'philosophie-bac-2026-la-science-doit-elle-etre-utile.html'},
{sujet:'L’artiste sait-il ce qu’il fait ?',href:'philosophie-bac-2026-l-artiste-sait-il-ce-qu-il-fait.html'},
{sujet:'Sommes-nous prisonniers du langage ?',href:'philosophie-bac-2026-sommes-nous-prisonniers-du-langage.html'}
]
};
