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
  ['Obéir ou juger : les deux réponses confiaient la justice à un seul. Qui doit la porter, si aucun ne suffit ?','ok','Elle découvre ce que I et II avaient en commun sans le dire, et pose une question ouverte : la partie III devra poser le problème autrement.'],
  ['Si obéir ne suffit pas et que juger seul détruit la loi, faut-il finalement obéir ou bien désobéir ?','def','Elle reprend les deux limites, mais repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Il faudra donc, pour finir, trouver un juste équilibre entre l’obéissance et la désobéissance.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Pas un seul : chacune portait une moitié de la justice. Elle doit être commune (I) et pouvoir être jugée (II).','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
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
 id:'inconscient-heureux', sujet:'Faut-il être inconscient pour être heureux ?', notion:'Le bonheur', v:2,
 pb:'Le bonheur exige-t-il d’ignorer ce qui le menace, au risque de ne plus se savoir heureux, ou la lucidité sans laquelle on ne se sait pas heureux le condamne-t-elle à l’inquiétude ?',
 annale:'faut-il-etre-inconscient-pour-etre-heureux',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['Il faut être inconscient pour être heureux : ignorer ce qui menace protège le repos.','ok','Une réponse au sujet, avec sa raison : l’ignorance protège.'],
  ['Les gens simples semblent souvent plus heureux que les savants, et moins inquiets.','def','Une impression juste, mais pas encore une raison : dites pourquoi l’ignorance rendrait heureux.'],
  ['Il faut voir clair sur ce qui dépend de nous, et accepter avec sérénité tout ce qui n’en dépend pas.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Pascal : ne pouvant guérir la mort et la misère, les hommes se divertissent pour n’y point penser.','ok','La réponse est poussée au plus fort : l’ignorance n’est plus un hasard de l’enfance, c’est un bonheur que les adultes se fabriquent.'],
  ['Un enfant joue sans connaître tous les dangers du monde qui l’entoure, et il est heureux.','def','Juste, mais l’enfant ne choisit pas d’ignorer : l’exemple illustre plus qu’il ne renforce.'],
  ['Socrate préfère savoir, même insatisfait, plutôt que vivre dans l’ignorance.','no','Il défend la réponse contraire : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Un bonheur fondé sur l’ignorance ne se sait plus heureux, et la réalité finit par revenir.','ok','La limite vient de la réponse : à force d’ignorer, on ignore aussi son bonheur.'],
  ['Ignorer certains dangers peut mettre la santé de chacun, et même celle des autres, en grand danger.','def','Vrai, mais c’est une objection extérieure : la limite doit venir du bonheur lui-même.'],
  ['Tout le monde n’a pas la chance de pouvoir rester inconscient de ce qui le menace.','no','Un constat, pas une limite de la réponse.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['Qui détourne les yeux de sa condition les détourne aussi de son bonheur : que vaut un bonheur qu’on ne se sait plus avoir ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle seule la partie II peut répondre.'],
  ['Mais si un bonheur qu’on ignore n’est plus un bonheur, il faut se savoir heureux pour l’être vraiment.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Voyons maintenant l’autre point de vue sur le bonheur, celui de la conscience.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Il ne vaut rien : un bonheur qu’on ne sent pas, qu’on ne sait pas avoir, n’en est pas un.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I perdait : se savoir heureux.'],
  ['Il vaut moins qu’un autre, mais c’est toujours mieux que d’être malheureux en sachant pourquoi.','def','Elle répond, mais garde l’ignorance comme un moindre mal : la partie II ne naît pas encore.'],
  ['Il faut tout savoir et tout comprendre pour être vraiment heureux.','no','Excessif : la partie II dit qu’il faut se savoir heureux, pas tout savoir.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Mill : mieux vaut être Socrate insatisfait qu’un imbécile satisfait, qui jouit sans savoir de quoi.','ok','La référence montre ce que la conscience ajoute au bonheur : elle donne son prix à ce qu’on vit.'],
  ['Il faut être conscient pour être heureux : se savoir heureux fait partie du bonheur.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['La connaissance rend libre, et la liberté rend heureux, comme chacun le sait bien.','no','Vous glissez vers la liberté : restez sur le bonheur.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['La lucidité voit tout ce qui menace : poussée jusqu’au bout, elle ne laisse plus de place au repos.','ok','La limite vient de la réponse : voir clair, c’est voir aussi les menaces.'],
  ['Les gens lucides paraissent souvent inquiets ou mélancoliques, comme s’ils portaient tout le poids du monde.','def','Constat juste, mais dites pourquoi : c’est la lucidité elle-même qui voit les menaces.'],
  ['Personne ne peut être totalement conscient de tout ce qui lui arrive.','no','Vrai, mais cela ne montre pas ce que la lucidité fait perdre au bonheur.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['L’insouciant ignore pour ne pas craindre, le lucide craint parce qu’il sait : à quelle condition pourrait-on savoir sans craindre ?','ok','Elle découvre ce que I et II supposaient ensemble, que savoir la menace, c’est la craindre, et pose une question ouverte.'],
  ['Si l’ignorance aveugle et que la lucidité inquiète, faut-il finalement être conscient ou inconscient ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Il faudra donc, pour finir, trouver un juste milieu entre l’insouciance et la lucidité.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['À condition de savoir autrement : la partie I avait compris que le bonheur veut le repos, la partie II qu’il veut la lucidité.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur le plaisir, la partie II sur la connaissance du monde.','def','Proche, mais le plaisir et la connaissance déplacent le sujet : le repos et la lucidité.'],
  ['Aucune des deux n’avait raison : le bonheur est une question de caractère, voilà tout.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Distinguer ce qui dépend de nous et ce qui n’en dépend pas : savoir, mais accepter ce qu’on ne peut changer, comme Épicure devant la mort.','ok','Elle garde la lucidité (II) et le repos (I) : c’est le savoir, non l’ignorance, qui délivre de la crainte.'],
  ['Penser dans le temps : l’insouciance convient à l’enfance, la lucidité à l’âge adulte, chacune à son heure.','def','Elle sauve les deux, mais en les séparant dans le temps : l’adulte reste sans repos.'],
  ['Il faut être un peu conscient et un peu inconscient, selon les moments et les circonstances de la vie.','no','Un juste milieu sans raison : le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['Le bonheur ne demande pas d’ignorer, mais de savoir autrement. Reste : certaines pertes ne s’acceptent pas.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['Le bonheur ne demande pas d’ignorer, mais de savoir autrement : avec cette sagesse, toute la difficulté est résolue.','def','La réponse est juste, mais elle se croit complète : certaines pertes résistent à toute sagesse. Cherchez son reste.'],
  ['Le bonheur demande parfois d’ignorer et parfois de savoir, selon les cas.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Devant la mort de ceux qu’on aime, la lucidité peut-elle encore apaiser, ou faut-il une part d’oubli ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['Le bonheur existe-t-il vraiment, ou n’est-il au fond qu’un rêve que les hommes poursuivent sans jamais l’atteindre ?','def','Une vraie question, mais trop large : elle ne part pas du reste de la réponse.'],
  ['Chacun doit trouver son propre chemin vers le bonheur, à sa manière et à son rythme.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'certain-bien-agi', sujet:'Peut-on être certain d’avoir bien agi ?', notion:'Le devoir', v:2,
 pb:'La certitude d’avoir bien fait repose-t-elle sur l’intention, au risque d’une bonne conscience aveugle aux effets, ou sur les effets, au risque de livrer la valeur de nos actes au hasard ?',
 annale:'peut-on-etre-certain-d-avoir-bien-agi',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['On peut être certain d’avoir bien agi : on connaît son intention, qui dépend de nous.','ok','Une réponse au sujet, avec sa raison.'],
  ['On le sait quand les autres nous remercient ou nous félicitent de ce qu’on a fait.','def','Une piste, mais le jugement des autres ne donne pas encore une certitude à soi.'],
  ['On n’est jamais certain de rien en morale, et surtout pas de soi-même ni de ses propres raisons.','no','C’est la réponse contraire, en plus excessive : gardez-la pour la partie II, nuancée.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Pour Kant, une bonne volonté reste bonne même si elle échoue : sa valeur ne dépend pas des résultats.','ok','La réponse est poussée au plus fort : la certitude tiendrait tout entière dans l’intention, quoi qu’il arrive.'],
  ['Je prête de l’argent à un ami en difficulté, il est content de l’avoir reçu, et je sais que j’ai bien fait.','def','L’exemple montre un bon effet plus qu’une intention : il ne renforce pas la réponse.'],
  ['Le pilote Sully, seul la nuit, doute d’avoir pris la bonne décision.','no','Il illustre le doute : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Une bonne intention ne suffit pas quand l’action a fait du mal, et je ne suis pas sûr de connaître mes vraies raisons.','ok','La limite vient de la réponse : l’intention ne garantit ni les effets, ni sa propre sincérité.'],
  ['Les intentions sont difficiles à prouver devant un tribunal, qui juge sur des faits et des témoignages.','def','Vrai, mais objection extérieure : la question est ce que je sais de moi, pas ce qu’un juge peut prouver.'],
  ['Certaines personnes ont de mauvaises intentions et le cachent très bien aux autres.','no','Hors sujet : on parle de celui qui croit avoir bien agi.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['La bonne volonté ne rassure que celui qui se croit transparent à lui-même : qui possède ce savoir de soi ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle la partie II répond : personne.'],
  ['Mais si je peux me tromper sur mes propres motifs, la certitude ne peut plus reposer sur l’intention seule.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Nous allons maintenant parler des conséquences de nos actes, qui comptent aussi.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Personne : nos motifs nous restent obscurs, et les effets de nos actes nous échappent.','ok','Elle répond exactement à la question de transition : le savoir de soi manque deux fois.'],
  ['Les autres, qui voient nos actes de l’extérieur et peuvent parfois les juger mieux que nous-mêmes.','def','Une piste, mais elle déplace la certitude vers autrui sans montrer ce qui nous échappe.'],
  ['Celui qui a de bonnes intentions, puisqu’il sait ce qu’il a voulu faire.','no','C’est revenir à la partie I au lieu d’en sortir.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['La Rochefoucauld montre l’amour-propre déguisé sous nos vertus ; et les effets d’un acte vont plus loin qu’on ne voit.','ok','La partie montre ce qu’elle permet de comprendre : motifs et effets échappent à l’agent.'],
  ['On ne peut pas en être certain : les effets de nos actes et nos vrais motifs nous échappent.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['Il est impossible de jamais bien agir, quoi qu’on fasse et quoi qu’on veuille.','no','Excessif : le sujet porte sur la certitude, pas sur la possibilité de bien agir.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais si l’on n’est jamais certain d’avoir bien agi, le doute finit par empêcher d’agir.','ok','La limite vient de la réponse : un doute sans fin paralyse.'],
  ['Les effets d’une action ne sont parfois connus que bien plus tard, des années après qu’on a agi.','def','Vrai, mais cela renforce la partie II au lieu d’en montrer la limite.'],
  ['Le doute est une attitude philosophique très ancienne, depuis Socrate.','no','Une généralité, pas une limite.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Ce doute qui interdit d’agir exigeait de l’agent la certitude du savant : que peut vouloir dire être certain, pour qui agit ?','ok','Elle découvre ce que I et II supposaient ensemble, une certitude de savant, et pose une question ouverte.'],
  ['Si l’intention ne suffit pas et que le doute paralyse, peut-on finalement être certain d’avoir bien agi ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Nous verrons pour finir qu’il faut un juste équilibre entre la confiance et le doute.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Répondre de ce qu’on a fait : la partie I voulait agir avec assurance, la partie II ne rien se cacher.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur la morale, la partie II sur la psychologie.','def','Proche, mais ces deux domaines déplacent le sujet : l’assurance d’agir et la lucidité sur soi.'],
  ['Aucune des deux n’avait raison : la morale n’est qu’une affaire d’opinion.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Transformer le concept : on n’est pas sûr d’avoir bien agi, mais on peut être sûr d’avoir agi avec soin, prêt à répondre des effets.','ok','Elle garde l’intention (I) et le souci des effets (II) : la certitude devient un engagement.'],
  ['Distinguer l’intention et les effets : on est certain de l’une, jamais des autres, et on s’en tient là.','def','Elle sauve les deux, mais laisse l’agent coupé en deux : bien voulu, mal fait ?'],
  ['Il faut attendre de connaître tous les effets d’une action avant de juger si elle était bonne.','no','C’est choisir la partie II, et c’est impossible : les effets ne finissent jamais.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['On n’est jamais sûr d’avoir bien agi, mais de l’avoir fait de bonne foi. Reste : le jugement des autres.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['On n’est jamais sûr d’avoir bien agi, mais de l’avoir fait de bonne foi : avec cette réponse, toute la difficulté est réglée.','def','La réponse est juste, mais elle se croit complète : elle oublie que d’autres jugent nos actes. Cherchez son reste.'],
  ['On est parfois sûr d’avoir bien agi, et parfois non, selon les situations.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Si c’est devant les autres qu’on répond de ses actes, la certitude d’avoir bien agi peut-elle être une certitude que l’on possède seul ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['Faut-il toujours agir, même quand on n’est sûr de rien de ce qui va arriver ?','def','Une vraie question, mais qui revient à la partie II : partez du reste de la réponse.'],
  ['Il faut toujours essayer de faire de son mieux, quoi qu’il arrive ensuite.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'science-utile', sujet:'La science doit-elle être utile ?', notion:'La science', v:2,
 pb:'La science vaut-elle par le pouvoir qu’elle donne, au risque de ne plus chercher que des vérités utiles, ou par la seule vérité, au risque d’oublier qu’elle ne connaît qu’en agissant ?',
 annale:'la-science-doit-elle-etre-utile',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['La science doit être utile : connaître les causes, c’est pouvoir agir sur la nature.','ok','Une réponse au sujet, avec sa raison.'],
  ['La science coûte très cher à la société, qui la finance : elle doit donc lui rapporter quelque chose.','def','Une raison économique : elle ne dit pas encore ce qu’est la science.'],
  ['La science doit chercher le vrai, puis répondre de ses usages.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Descartes veut que la science nous rende « comme maîtres et possesseurs de la nature ».','ok','La réponse est poussée au plus fort : connaître et pouvoir ne font qu’un.'],
  ['Les vaccins ont sauvé des millions de vies au cours du siècle dernier, et en sauvent encore chaque année.','def','Il montre que la science est utile, pas qu’elle doive l’être : il illustre plus qu’il ne renforce.'],
  ['Einstein cherche la relativité sans penser à aucun usage pratique.','no','Il défend la réponse contraire : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Si l’utilité choisit les questions, on abandonne les recherches inutiles, d’où sortent pourtant les grandes découvertes.','ok','La limite vient de la réponse : exiger l’utile prive de ce qui sera utile.'],
  ['Certaines inventions scientifiques sont dangereuses pour l’humanité, comme la bombe atomique.','def','Une piste pour plus tard, mais ce n’est pas la limite de cette réponse-ci.'],
  ['Beaucoup d’élèves n’aiment pas les matières scientifiques et s’en détournent tôt.','no','Hors sujet.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['Exiger de la science qu’elle serve, c’est la priver de ce qui servira : par quoi vaut-elle donc d’abord ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle la partie II répond : par le vrai.'],
  ['Exiger de la science qu’elle serve, c’est la priver de ce qui servira : aucun calcul n’aurait commandé la relativité.','def','Le diagnostic est juste, mais il n’ouvre rien : la partie II ne fait que le prolonger. Faites-en une question.'],
  ['Passons maintenant à la science pure et désintéressée, l’autre face du sujet.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Par le vrai : une science qui choisit ses vérités selon leur rendement cesse d’être une science.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I perdait.'],
  ['Par le prestige qu’elle donne aux pays qui la financent et la font briller.','def','Une réponse, mais extérieure : elle ne dit pas ce qu’est la science.'],
  ['Par son utilité à long terme, plutôt que par son utilité immédiate.','no','C’est encore l’utilité : on reste dans la partie I.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Nietzsche : les méthodes de la science importent autant que ses résultats ; sans elles, la superstition revient.','ok','La référence montre ce que vaut la recherche du vrai : un esprit, pas seulement des résultats.'],
  ['La science vaut d’abord par la vérité qu’elle cherche : son utilité ne vient qu’ensuite.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['La science est inutile, et c’est très bien ainsi : elle n’a de comptes à rendre à personne, pas même à ceux qui la paient.','no','Excessif : le « non » dit qu’elle n’a pas à être utile, pas qu’elle est inutile.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais la science connaît en expérimentant : ses vérités deviennent aussitôt des pouvoirs, dont d’autres se servent.','ok','La limite vient de la réponse : la science pure oublie qu’elle agit.'],
  ['Les chercheurs ont besoin de beaucoup d’argent pour travailler et pour équiper leurs laboratoires.','def','Vrai, mais extérieur : la limite doit venir de la recherche elle-même.'],
  ['La vérité dépend toujours du point de vue de chacun, même en science.','no','Hors sujet, et faux pour la science.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['On demandait à la science une seule réponse, comme si chercher et appliquer relevaient du même moment, et du même juge : combien de moments, et combien de juges ?','ok','Elle découvre ce que I et II supposaient ensemble et pose une question ouverte.'],
  ['Si l’utilité la trahit et que la vérité pure l’aveugle, la science doit-elle finalement être utile ou non ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Il faudra donc, pour finir, une science à moitié utile et à moitié libre.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Deux moments et deux juges : la partie I avait vu sa puissance, la partie II sa liberté de chercher.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur l’économie du savoir, la partie II sur la culture générale.','def','Proche, mais l’économie et la culture déplacent le sujet : la puissance et la liberté de chercher.'],
  ['Aucune des deux : la science n’a pas à être jugée, ni par l’utilité ni par rien.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Distinguer deux plans : la recherche n’a pas à être utile, mais la science répond de ce que ses résultats rendent possible.','ok','Elle garde la liberté de chercher (II) et la puissance des résultats (I).'],
  ['Penser dans le temps : d’abord la recherche pure, ensuite les applications, chacune à son tour.','def','Elle sauve les deux, mais oublie la responsabilité : qui répond des usages dangereux ?'],
  ['Il faut une science à moitié utile et à moitié libre, selon les domaines de recherche.','no','Un juste milieu sans raison : le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['L’utilité n’est pas son devoir, mais une conséquence dont elle répond. Reste : ses crédits vont à l’utile.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['L’utilité n’est pas son devoir, mais une conséquence dont elle répond : avec cela, le problème est entièrement réglé.','def','La réponse est juste, mais elle se croit complète : la recherche dépend de crédits accordés à l’utile. Cherchez son reste.'],
  ['La science doit être parfois utile et parfois libre, selon les cas.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['La science peut-elle rester libre de chercher le vrai quand c’est l’utilité qui lui donne les moyens de chercher ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['La science fera-t-elle un jour le bonheur de l’humanité, ou son malheur ?','def','Une vraie question, mais qui ne part pas du reste de la réponse.'],
  ['La science ne cesse de progresser depuis des siècles, et elle progressera encore.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'artiste-sait', sujet:'L’artiste sait-il ce qu’il fait ?', notion:'L’art', v:2,
 pb:'L’artiste maîtrise-t-il son œuvre comme un savoir-faire, au risque de n’inventer plus rien, ou l’invente-t-il à l’aveugle, au risque de n’en être plus l’auteur ?',
 annale:'l-artiste-sait-il-ce-qu-il-fait',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['L’artiste sait ce qu’il fait : l’art est d’abord un métier qui s’apprend.','ok','Une réponse au sujet, avec sa raison.'],
  ['Beaucoup d’artistes font de longues études dans des écoles d’art avant de créer.','def','Un fait, pas encore une raison : dites ce que ces études donnent.'],
  ['L’artiste découvre ce qu’il fait à mesure qu’il le fait.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Le mot « art » traduit la technè grecque : un savoir-faire qui connaît ses règles et sait ce qu’il produit.','ok','La réponse est poussée au plus fort : sans maîtrise, il n’y a pas d’œuvre, seulement des essais.'],
  ['Les esquisses et les brouillons d’un artiste montrent un travail réfléchi, repris, corrigé.','def','Un bon exemple, mais il illustre plus qu’il ne renforce : la réponse vaut-elle pour tout art ?'],
  ['Pour Kant, le génie ne sait pas expliquer comment il produit son œuvre.','no','La référence défend la réponse contraire : gardez-la pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Si tout était su d’avance, l’œuvre ne serait qu’une fabrication : elle n’inventerait rien.','ok','La limite vient de la réponse : le savoir complet tue l’invention.'],
  ['Certains artistes ratent des œuvres qu’ils avaient pourtant longuement préparées et mûries.','def','Une piste, mais rater n’est pas encore ne pas savoir.'],
  ['L’art est une affaire de goût, et chacun a le sien.','no','Hors sujet : on parle de l’artiste, pas du goût du public.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['Un métier qui saurait tout d’avance ne produirait que ce qu’il savait déjà : où commence donc l’œuvre ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle seule la partie II peut répondre.'],
  ['Un métier qui saurait tout d’avance ne produirait que ce qu’il sait : l’œuvre doit donc dépasser ce savoir.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Voyons à présent ce que les philosophes disent du génie et de l’inspiration.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Là où l’artiste cesse de tout savoir : une œuvre est nouvelle, on ne peut pas en donner la recette.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I perdait : l’invention.'],
  ['Là où l’inspiration vient, comme le croyaient les Grecs qui invoquaient les muses.','def','Une image à expliquer : dites ce qu’elle signifie pour le savoir de l’artiste.'],
  ['Là où le public la reconnaît et l’admire comme une œuvre.','no','Vous passez au public : la partie II porte sur l’artiste.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Kant : le génie donne à l’art sa règle sans pouvoir l’expliquer ; il ne sait pas dire comment il a fait.','ok','La référence montre ce que la partie permet de comprendre : l’œuvre dépasse le savoir de son auteur.'],
  ['L’artiste ne sait pas tout ce qu’il fait : l’œuvre le dépasse toujours, et c’est même ce qui fait sa valeur.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['L’artiste ne sait jamais rien de ce qu’il fait, il se laisse simplement porter.','no','Excessif : le « non » dit qu’il ne sait pas tout, pas qu’il ne sait rien.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais si l’artiste ne sait pas ce qu’il fait, l’œuvre est-elle encore la sienne, et non un heureux hasard ?','ok','La limite vient de la réponse : sans savoir, plus d’auteur.'],
  ['Le public ne comprend pas toujours les œuvres qu’il regarde, même les plus célèbres.','def','Vous passez au public : la limite doit concerner l’artiste.'],
  ['Les œuvres d’art coûtent de plus en plus cher sur le marché.','no','Hors sujet.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Tout savoir d’avance ou ne rien savoir : les deux réponses plaçaient le savoir de l’artiste avant le travail. Quand naît-il donc ?','ok','Elle découvre ce que I et II supposaient ensemble et pose une question ouverte.'],
  ['Si le métier tue l’invention et que l’invention perd l’auteur, l’artiste sait-il ou non ce qu’il fait ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Nous verrons pour finir que l’artiste sait à moitié ce qu’il fait, et qu’il ignore le reste.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Pendant le travail : la partie I avait vu la maîtrise, la partie II l’invention, et l’œuvre demande les deux.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur la technique, la partie II sur l’émotion que ressent l’artiste.','def','Proche, mais l’émotion déplace le sujet : il s’agit de l’invention.'],
  ['Aucune des deux n’avait raison : l’art ne s’explique pas, il se ressent.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Introduire un processus : l’artiste découvre ce qu’il fait en le faisant, et son métier lui permet de garder ce qu’il découvre.','ok','Elle garde la maîtrise (I) et l’invention (II).'],
  ['Distinguer deux plans : l’artiste sait comment il fait, il ne sait pas ce que l’œuvre signifiera pour d’autres.','def','Elle sauve les deux, mais laisse l’invention hors du travail de l’artiste.'],
  ['L’artiste sait à moitié ce qu’il fait, et l’autre moitié lui échappe toujours un peu.','no','Un juste milieu sans raison : le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['L’artiste sait ce qu’il fait, mais en le faisant. Reste : l’œuvre dit plus que ce qu’il y a reconnu.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['L’artiste sait ce qu’il fait, mais en le faisant : avec cette réponse, la question du sujet est entièrement réglée.','def','La réponse est juste, mais elle se croit complète : l’œuvre achevée continue de dire plus que son auteur. Cherchez son reste.'],
  ['L’artiste sait parfois ce qu’il fait, et parfois non, selon les œuvres.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Si ceux qui regardent l’œuvre l’achèvent, l’artiste sait-il encore ce qu’il a fait, une fois l’œuvre sortie de l’atelier ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['L’art est-il vraiment utile à la société, ou n’est-il qu’un luxe pour quelques-uns ?','def','Une autre question : partez du reste de la réponse.'],
  ['Chaque artiste a son style et sa manière de travailler, que personne ne peut imiter.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'maitrise-paroles', sujet:'Avons-nous la maîtrise de nos paroles ?', notion:'Le langage', v:2,
 pb:'Maîtriser ses paroles, est-ce ne plus dire que ce qu’on pensait déjà, et ne pas les maîtriser, est-ce cesser de pouvoir en répondre ?',
 annale:'avons-nous-la-maitrise-de-nos-paroles',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['Nous maîtrisons nos paroles : parler est un acte volontaire, nous choisissons nos mots.','ok','Une réponse au sujet, avec sa raison.'],
  ['Nous pouvons toujours nous taire, et le silence prouve bien que nous décidons de parler ou non.','def','Une piste, mais se taire n’est pas encore maîtriser ce qu’on dit : rapprochez-vous de la parole elle-même.'],
  ['Nos paroles nous engagent même quand leur sens nous échappe.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Une promesse, un témoignage nous engagent : si nous ne maîtrisions pas nos paroles, aucune ne nous engagerait.','ok','La réponse est poussée au plus fort : la responsabilité elle-même suppose la maîtrise.'],
  ['Un bon orateur prépare son discours avec soin et sait exactement ce qu’il va dire devant son public.','def','Un exemple de maîtrise, mais il illustre plus qu’il ne renforce : pourquoi la maîtrise serait-elle nécessaire ?'],
  ['Le lapsus montre que nous disons parfois ce que nous ne voulions pas dire.','no','Il défend la réponse contraire : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Une parole entièrement préparée ne dit rien de neuf : elle récite, alors que nous pensons souvent en parlant.','ok','La limite vient de la réponse : la maîtrise totale tue ce qu’elle voulait maîtriser.'],
  ['Il arrive que l’émotion nous fasse dire des choses que nous regrettons ensuite, une fois calmés.','def','Vrai, mais l’émotion est une cause extérieure : la limite doit venir de la maîtrise elle-même.'],
  ['Beaucoup de gens parlent trop vite et sans réfléchir à ce qu’ils disent.','no','Un constat sur certains, pas une limite de la réponse.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['Une parole entièrement prévue récite : d’où vient alors ce que nous disons de plus que nous ne savions ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle seule la partie II peut répondre.'],
  ['Une parole entièrement prévue récite : nos paroles disent donc toujours plus que ce que nous voulions dire.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Voyons maintenant les cas où nos paroles nous échappent.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['De la langue, qui n’est pas à nous : ses mots ont un sens commun qui dépasse notre intention.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I ne voyait pas.'],
  ['De l’inspiration du moment, qui vient on ne sait d’où et nous surprend nous-mêmes quand nous parlons.','def','Une image, mais elle n’explique rien : dites ce qui, dans la parole elle-même, nous dépasse.'],
  ['De notre volonté, qui choisit chaque mot avec soin.','no','C’est revenir à la partie I au lieu d’en sortir.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Le lapsus, le malentendu, le mot blessant dit sans le vouloir montrent que nos paroles nous échappent.','ok','La partie montre ce qu’elle permet de comprendre : une fois dites, nos paroles appartiennent aussi aux autres.'],
  ['Nos paroles disent plus, et autre chose, que ce que nous voulions : elles nous échappent, voilà tout.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['Nous ne savons jamais ce que nous disons, ni pourquoi nous le disons.','no','Excessif : le « non » dit que nos paroles nous échappent en partie, pas toujours.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Si nos paroles nous échappent tout à fait, chacun pourra dire « ce n’est pas ce que je voulais dire » : plus personne n’en répond.','ok','La limite vient de la réponse : sans maîtrise, plus d’engagement.'],
  ['Il est parfois utile de ne pas maîtriser ses paroles, pour être plus sincère avec les autres.','def','Une piste intéressante, mais elle renforce la partie II au lieu d’en montrer la limite.'],
  ['Les réseaux sociaux déforment nos paroles.','no','Un exemple de plus, pas une limite.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Nous tenons nos paroles comme un outil, ou elles nous tiennent : quel pouvoir nous reste-t-il donc sur elles ?','ok','Elle découvre ce que I et II supposaient ensemble, une maîtrise du sens, et pose une question ouverte.'],
  ['Si la maîtrise récite et que l’absence de maîtrise déresponsabilise, maîtrisons-nous nos paroles ou non ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Il faudra donc trouver un équilibre entre maîtrise et spontanéité.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Celui d’en répondre : la partie II a montré que le sens nous dépasse, la partie I que nos paroles nous engagent.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur la politesse, la partie II sur la psychologie de chacun.','def','Proche, mais la politesse et la psychologie déplacent le sujet : l’engagement et le sens.'],
  ['Aucun : nous ne sommes que les porte-voix de la langue.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Déplacer la difficulté : nous ne maîtrisons pas le sens de nos paroles, mais nous décidons de nous engager en parlant.','ok','Elle garde la responsabilité (I) sans nier que le sens nous dépasse (II).'],
  ['Distinguer deux sortes de paroles : celles que nous préparons, que nous maîtrisons, et les autres, qui nous échappent toujours.','def','Elle sauve les deux, mais en les séparant : une parole préparée peut aussi nous échapper.'],
  ['Il faut parler avec prudence, ni trop vite ni trop lentement.','no','Un juste milieu sans raison : le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['Maîtriser ses paroles, ce n’est pas tout contrôler, c’est en répondre. Reste : ce qu’elles font aux autres.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['Maîtriser ses paroles, ce n’est pas tout contrôler, c’est en répondre : avec cela, toute la difficulté du sujet est réglée.','def','La réponse est juste, mais elle se croit complète : l’écho de nos paroles chez les autres reste hors de portée. Cherchez son reste.'],
  ['Nous maîtrisons parfois nos paroles, et parfois non.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Peut-on vraiment répondre de paroles dont on ne maîtrise ni la portée ni l’écho ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['Faut-il parler moins pour mieux maîtriser ce que l’on dit, et se taire plus souvent ?','def','Une question liée, mais qui ne part pas du reste de la réponse.'],
  ['La parole est le propre de l’homme, et c’est ce qui fait sa grandeur.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'humanite-religion', sujet:'Peut-on concevoir une humanité sans religion ?', notion:'La religion', v:2,
 pb:'Une humanité qui ne croirait que ce qu’elle peut prouver garderait-elle de quoi relier les hommes, et une humanité unie par la croyance resterait-elle faite d’hommes qui jugent par eux-mêmes ?',
 annale:'peut-on-concevoir-une-humanite-sans-religion',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['On peut concevoir une humanité sans religion : la raison peut fonder le savoir et la morale.','ok','Une réponse au sujet, avec sa raison.'],
  ['Beaucoup de gens, aujourd’hui, vivent très bien sans aucune religion, dans de nombreux pays du monde.','def','Un fait, pas encore une raison : dites ce qui rend la religion superflue.'],
  ['L’humanité peut se passer de la religion, mais non de ce qu’elle assurait.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Freud explique la religion par la détresse de l’enfance : une humanité devenue adulte pourrait s’en passer.','ok','La réponse est poussée au plus fort : la religion devient une illusion, que la raison peut dissiper.'],
  ['Les sciences expliquent aujourd’hui des phénomènes que l’on attribuait autrefois aux dieux, comme la foudre.','def','Un bon exemple, mais il illustre plus qu’il ne renforce : la religion n’est pas seulement une explication du monde.'],
  ['Durkheim montre que la religion resserre les liens d’une communauté.','no','La référence défend la réponse contraire : gardez-la pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['La raison explique la croyance sans remplacer ce qu’elle offrait : un lien entre les hommes, un sens devant la mort.','ok','La limite vient de la réponse : la victoire de la raison laisse une place vide.'],
  ['Certains croyants refuseront toujours d’abandonner leur religion, quoi qu’on leur démontre et quoi qu’on leur explique.','def','Vrai, mais c’est un constat sur les croyants : la limite doit venir de la raison elle-même.'],
  ['Les religions ont provoqué beaucoup de guerres dans l’histoire.','no','Un argument pour la partie I, pas sa limite.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['La raison gagne contre l’illusion et perd ce que l’illusion donnait : d’où venait donc le lien entre les hommes ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle seule la partie II peut répondre.'],
  ['La raison gagne contre l’illusion, mais perd ce que l’illusion donnait : il faut donc garder la religion.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Après avoir vu les arguments contre la religion, voyons ceux qui la défendent.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['De la religion elle-même : relier les hommes, c’est ce qu’elle fait, et c’est par là qu’elle appartient à l’humanité.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I perdait.'],
  ['De la famille et des amis, qui suffisent largement à relier les hommes entre eux, sans aucune religion ni aucun culte.','def','Une réponse, mais trop étroite : la question porte sur ce qui relie toute une communauté.'],
  ['De la raison, qui relie tous les hommes par des vérités communes.','no','C’est revenir à la partie I au lieu d’en sortir.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Durkheim : en célébrant le sacré, une communauté se célèbre et se resserre elle-même.','ok','La référence montre ce que la partie permet de comprendre : la religion est d’abord un lien social.'],
  ['La religion relie les hommes et leur donne des fins communes, ce que la raison seule ne fait pas.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['Une humanité sans religion serait forcément immorale et violente.','no','Excessif : la partie II dit que la religion relie, pas que sans elle tout est permis.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Ce qui relie une communauté divise l’humanité : chaque religion unit ses fidèles en les séparant des autres.','ok','La limite vient de la réponse : le lien religieux sépare autant qu’il unit.'],
  ['Les pratiques religieuses reculent dans beaucoup de pays occidentaux depuis un siècle.','def','Un constat, mais extérieur : la limite doit venir du lien religieux lui-même.'],
  ['Il existe de nombreuses religions différentes dans le monde.','no','Un fait, pas encore une limite : dites ce qu’il produit.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Tous deux confondaient la religion avec ce qu’elle assurait : de quoi l’humanité ne peut-elle donc se passer ?','ok','Elle découvre ce que I et II supposaient ensemble et pose une question ouverte.'],
  ['Si la raison laisse un vide et que la religion divise, l’humanité peut-elle finalement se passer de toute religion ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Nous verrons pour finir qu’il faut un peu de raison et un peu de religion.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['De ce qu’elle assurait : la partie II a montré le besoin de lien, la partie I celui de juger par soi-même.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur la science, la partie II sur la tradition, les rites et les fêtes.','def','Proche, mais la science et la tradition déplacent le sujet : le jugement libre et le lien.'],
  ['De rien du tout : chacun peut vivre seul.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Déplacer la difficulté : le lien que la religion assurait peut reposer sur des convictions partagées et comprises, comme la dignité de chaque personne.','ok','Elle garde le jugement libre (I) et le besoin de lien (II).'],
  ['Distinguer la vie privée et la vie publique : chacun garde sa religion chez soi, et la raison règne dans l’espace commun.','def','Une distinction solide, mais elle ne dit pas ce qui relie les hommes dans l’espace commun.'],
  ['Il faut une religion modérée, qui ne demande pas trop de croire.','no','Un juste milieu sans raison : le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['On peut concevoir une humanité sans religion, mais non sans convictions communes. Reste : celles-ci ressemblent à une foi.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['On peut concevoir une humanité sans religion, mais non sans convictions communes : avec cela, tout est réglé.','def','La réponse est juste, mais elle se croit complète : des convictions partagées et transmises ressemblent beaucoup à une foi. Cherchez son reste.'],
  ['On peut se passer de religion dans certains pays, et pas dans d’autres.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Une humanité sans religion peut-elle tenir à ses convictions communes sans retrouver, sous un autre nom, ce qu’elle croyait avoir quitté ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['Les religions finiront-elles un jour par disparaître de la surface de la Terre ?','def','Une question liée, mais qui ne part pas du reste de la réponse.'],
  ['La religion est un sujet délicat, sur lequel chacun a son opinion.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'nature-besoin', sujet:'La nature a-t-elle besoin de nous ?', notion:'La nature', v:2,
 pb:'Une nature confiée à nos soins serait-elle encore ce qui se fait sans nous, et une nature qui se passe de nous reste-t-elle un ordre, s’il n’est ordre pour personne ?',
 annale:'la-nature-a-t-elle-besoin-de-nous',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['La nature n’a pas besoin de nous : elle existait avant l’homme et se fait toute seule.','ok','Une réponse au sujet, avec sa raison.'],
  ['La nature est bien plus grande et plus puissante que nous, comme le montrent les tempêtes et les séismes.','def','Une impression juste, mais pas encore une raison : dites pourquoi la puissance dispenserait du besoin.'],
  ['C’est nous qui avons besoin d’elle, et non l’inverse.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Aristote : la nature a en elle le principe de son mouvement ; avoir besoin de nous, ce serait cesser d’être nature.','ok','La réponse est poussée au plus fort : le besoin contredirait la définition même de la nature.'],
  ['Les forêts autour de Tchernobyl ont repoussé sans aucun jardinier, dès que l’homme s’est retiré de la zone interdite.','def','Un bon exemple, mais il illustre plus qu’il ne renforce : pourquoi en irait-il toujours ainsi ?'],
  ['Hans Jonas nous rend responsables de ce qui ne peut plus se protéger seul.','no','La référence défend la réponse contraire : gardez-la pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Une nature qui se passe de nous survit à nos destructions, mais l’ordre que nous admirons, nous savons le défaire.','ok','La limite vient de la réponse : la nature-puissance survit, la nature-ordre peut disparaître.'],
  ['La nature n’est pas toujours bonne pour l’homme : elle provoque aussi des catastrophes meurtrières, des famines, des épidémies.','def','Vrai, mais cela ne touche pas la question du besoin : la limite doit venir de la réponse elle-même.'],
  ['Les villes ont remplacé la nature dans beaucoup de régions.','no','Un constat, pas une limite.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['La nature qui se passe de nous est une puissance ; celle que nous admirons, nous savons la défaire : que nous impose ce pouvoir ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle seule la partie II peut répondre.'],
  ['La nature qui se passe de nous est une puissance, mais nous savons défaire son ordre : elle a donc besoin de nous.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Voyons maintenant le point de vue des écologistes.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Il nous oblige : depuis que l’homme peut détruire des espèces et changer le climat, la nature ne se maintient plus sans nous.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I ne voyait pas.'],
  ['Il nous donne le droit d’en faire ce que nous voulons, puisque nous en sommes devenus les maîtres.','def','Une réponse, mais elle tire du pouvoir un droit au lieu d’un devoir : la partie II ne naît pas encore.'],
  ['Rien du tout : la nature s’en remettra, comme toujours.','no','C’est revenir à la partie I au lieu d’en sortir.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Hans Jonas : ce pouvoir nous rend responsables de ce qui ne peut plus se protéger seul, comme une espèce menacée.','ok','La référence montre ce que la partie permet de comprendre : notre puissance crée notre responsabilité.'],
  ['Nous avons rendu la nature fragile par notre puissance, et elle a désormais besoin de nous pour se maintenir en vie.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['Sans l’homme, la nature serait sauvage et désordonnée.','no','Excessif, et ce n’est pas le « oui » du sujet : il dit que la nature est devenue fragile.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Si la nature ne se maintient plus que par nos soins, il faudra tout gérer : elle deviendra un jardin, notre ouvrage.','ok','La limite vient de la réponse : la nature entièrement protégée cesse d’être nature.'],
  ['Protéger la nature coûte très cher, et les pays n’ont pas tous les moyens de le faire correctement, surtout les plus pauvres.','def','Vrai, mais extérieur : la limite doit venir de l’idée de protection elle-même.'],
  ['Certains ne croient pas au changement climatique.','no','Hors sujet.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Le jardin trahit l’erreur : en voulant que la nature dépende de nous, on oubliait l’autre dépendance. Dans quel sens va le besoin ?','ok','Elle découvre ce que I et II supposaient ensemble et pose une question ouverte.'],
  ['Si elle se passe de nous et qu’elle devient pourtant fragile, la nature a-t-elle besoin de nous ou non ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Il faudra donc protéger un peu la nature, mais pas trop.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['De nous à elle : la partie I voulait une nature qui se fait seule, la partie II une nature protégée.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur la biologie, la partie II sur la politique et l’écologie.','def','Proche, mais ces domaines déplacent le sujet : l’autonomie de la nature et notre responsabilité.'],
  ['Dans aucun sens : la nature et l’homme n’ont rien à voir.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Inverser le rapport : c’est nous qui avons besoin d’une nature qui se fait sans nous ; la protéger, c’est d’abord la laisser faire.','ok','Elle garde l’autonomie de la nature (I) et notre responsabilité (II).'],
  ['Distinguer deux natures : les espaces sauvages, qu’on laisse faire, et les espaces cultivés, qu’on gère entièrement.','def','Une distinction solide, mais elle laisse de côté la question du besoin : qui a besoin de qui ?'],
  ['Il faut protéger les espèces les plus belles, et laisser faire le reste.','no','Un tri sans raison : le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['La nature n’a pas besoin d’être sauvée ; nous avons besoin qu’elle demeure. Reste : certains soins restent nécessaires.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['La nature n’a pas besoin d’être sauvée ; nous avons besoin qu’elle demeure : avec cette formule, la question est entièrement réglée.','def','La réponse est juste, mais elle se croit complète : après nos destructions, la laisser faire ne suffit plus toujours. Cherchez son reste.'],
  ['La nature a parfois besoin de nous, et parfois non.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Une nature que nous devons réparer pour qu’elle puisse se faire sans nous se fait-elle encore sans nous ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['L’homme fait-il lui-même partie de la nature, ou s’en est-il définitivement séparé ?','def','Une vraie question, mais qui ne part pas du reste de la réponse.'],
  ['La nature est magnifique, et nous devons tous l’aimer et la respecter.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'heureux-autres', sujet:'Peut-on être heureux quand les autres ne le sont pas ?', notion:'Le bonheur', v:2,
 pb:'Un bonheur fermé au malheur des autres est-il encore un bonheur humain, et un bonheur qui l’accueille peut-il jamais exister, tant qu’il y a des malheureux ?',
 annale:'peut-on-etre-heureux-quand-les-autres-ne-le-sont-pas',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['On peut être heureux quand les autres ne le sont pas : le bonheur dépend de nous, c’est un état intérieur.','ok','Une réponse au sujet, avec sa raison.'],
  ['On peut être heureux quand les autres ne le sont pas, car on ne connaît jamais tout le malheur qu’il y a dans le monde.','def','Une raison, mais faible : l’ignorance n’est pas encore le bonheur. Cherchez ce qui le rend possible.'],
  ['On peut être heureux, à condition que ce bonheur reste ouvert aux autres.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Épictète : le malheur des autres ne dépend pas de nous ; en faire dépendre mon bonheur me condamne au trouble.','ok','La réponse est poussée au plus fort : me rendre malheureux ne soulage personne.'],
  ['Certaines personnes restent sereines dans des situations très difficiles, même pendant une guerre ou une longue maladie.','def','Un bon exemple, mais il illustre plus qu’il ne renforce : pourquoi la sérénité serait-elle légitime ?'],
  ['Rousseau voit dans la pitié un sentiment naturel qui nous fait souffrir de voir souffrir.','no','La référence défend la réponse contraire : gardez-la pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Pour garder ce bonheur, il faut détourner les yeux du malheur d’autrui : il ressemble à de l’indifférence.','ok','La limite vient de la réponse : ce bonheur ne tient qu’à condition de ne plus voir.'],
  ['Il est difficile d’être heureux quand on regarde les informations tous les soirs à la télévision ou sur son téléphone.','def','Un constat juste, mais dites pourquoi : c’est le bonheur intérieur lui-même qui exige de détourner les yeux.'],
  ['Certaines personnes sont malheureuses par leur faute.','no','Hors sujet, et ce jugement ne montre pas la limite de la réponse.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['Ce bonheur ne dure qu’en détournant les yeux, comme le vieux Turc de Candide : que devient-il quand la souffrance des autres franchit la clôture ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle seule la partie II peut répondre.'],
  ['Ce bonheur ne dure qu’en détournant les yeux : il faut donc s’ouvrir au malheur des autres.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Voyons maintenant ce que pensent ceux qui sont touchés par le malheur des autres.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Il ne peut rester entier : le bonheur humain n’est pas celui d’un être isolé, et le sort des autres fait partie du nôtre.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I perdait.'],
  ['Il disparaît pour un moment, puis revient quand on a oublié ce qu’on a vu.','def','Une réponse, mais elle garde l’oubli comme remède : la partie II ne naît pas encore.'],
  ['Il continue tranquillement, puisque le malheur des autres ne dépend pas de nous.','no','C’est revenir à la partie I au lieu d’en sortir.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Rousseau : la pitié est un sentiment naturel ; un bonheur insensible mutilerait ce qui fait de nous des hommes.','ok','La référence montre ce que la partie permet de comprendre : être touché par autrui est humain.'],
  ['Le malheur des autres nous touche, et notre bonheur ne peut pas rester entier.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['Il est égoïste d’être heureux tant que d’autres souffrent quelque part.','no','Excessif : la partie II dit que le malheur nous touche, pas que le bonheur est une faute.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Si le malheur d’autrui suffit à empêcher mon bonheur, personne ne sera jamais heureux : il y a toujours des malheureux.','ok','La limite vient de la réponse : le bonheur devient impossible, et ma tristesse n’aide personne.'],
  ['Il est épuisant de penser sans cesse au malheur des autres, et cela finit par rendre malade.','def','Vrai, mais c’est un effet pratique : la limite doit venir de la réponse elle-même.'],
  ['Certains malheurs sont plus graves que d’autres.','no','Un constat, pas une limite.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Défendu ou sacrifié, ce bonheur restait un avoir, que le malheur des autres menace : quel bonheur pourrait y résister ?','ok','Elle découvre ce que I et II supposaient ensemble, le bonheur comme un bien qu’on possède, et pose une question ouverte.'],
  ['Si l’indifférence nous ferme et que la pitié nous accable, peut-on finalement être heureux ou non ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Nous verrons qu’il faut être heureux, mais pas trop.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Une joie qui se partage : la partie I avait vu que le bonheur est intérieur, la partie II que les autres nous touchent.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur la sagesse antique, la partie II sur la morale moderne.','def','Proche, mais l’histoire des idées déplace le sujet : l’intériorité du bonheur et le lien aux autres.'],
  ['Aucun : le bonheur n’existe pas vraiment.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Transformer le concept : le bonheur humain n’est pas un abri qu’on protège, mais une joie qui grandit de ce qu’on en donne.','ok','Elle garde l’intériorité du bonheur (I) et le lien aux autres (II).'],
  ['Distinguer les proches et les lointains : le malheur des proches nous touche de près, celui des inconnus de loin seulement.','def','Une distinction juste, mais elle ne dit pas quel bonheur reste possible : le problème est déplacé, pas traité.'],
  ['Il faut être heureux, mais un peu moins quand les autres souffrent.','no','Un juste milieu sans raison : le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['Être heureux, c’est rester ouvert aux autres. Reste : le malheur de ceux qu’on ne peut pas aider.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['Être heureux, ce n’est pas se mettre à l’abri des autres, c’est leur rester ouvert : tout est réglé.','def','La réponse est juste, mais elle se croit complète : le malheur de ceux qu’on ne peut aider demeure. Cherchez son reste.'],
  ['On peut être heureux quand les autres ne le sont pas, selon les cas.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Un bonheur qui porte cette inquiétude est-il encore le bonheur, ou le bonheur humain ne sera-t-il jamais tranquille ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['Faut-il aider les autres pour être heureux soi-même, ou bien les aider pour eux, sans rien attendre en retour de leur part ?','def','Une vraie question, mais qui ne part pas du reste de la réponse.'],
  ['Le bonheur est un bien précieux que chacun recherche toute sa vie.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
},
{
 id:'etat-injustice', sujet:'Revient-il principalement à l’État de lutter contre l’injustice ?', notion:'L’État', v:2,
 pb:'Confier d’abord à l’État la lutte contre l’injustice, est-ce donner à sa force le dernier mot sur le juste, et la confier d’abord à d’autres, est-ce priver la justice de force ?',
 annale:'revient-il-principalement-a-l-etat-de-lutter-contre-l-injustice',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['Il revient principalement à l’État de lutter contre l’injustice, car lui seul a la force d’imposer la loi à tous.','ok','Une réponse au sujet, avec sa raison.'],
  ['C’est l’État qui fait les lois, donc c’est à lui de les faire appliquer.','def','Une raison, mais circulaire : dites pourquoi lutter contre l’injustice exige l’État.'],
  ['À l’État la force, aux citoyens le contrôle.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Hobbes : sans un pouvoir commun, il n’y a ni loi ni justice, seulement la guerre de chacun contre chacun.','ok','La réponse est poussée au plus fort : l’État n’est pas un acteur parmi d’autres, il rend la justice possible.'],
  ['L’État punit les crimes, protège les plus faibles, corrige les inégalités par l’impôt et par les aides sociales.','def','Un bon exemple, mais il illustre plus qu’il ne renforce : pourquoi lui seul le pourrait-il ?'],
  ['Thoreau refuse de payer l’impôt à un gouvernement qui soutient l’esclavage.','no','Il défend la réponse contraire : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',q:'Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?',o:[
  ['Si l’État rend seul la justice possible, il en devient le seul juge : il peut faire de l’injustice une loi.','ok','La limite vient de la réponse : la force qui a le dernier mot peut se tromper sur le juste.'],
  ['L’État coûte cher, et ses administrations sont souvent lentes et compliquées pour les citoyens.','def','Vrai, mais extérieur : la limite doit venir de la force de l’État elle-même.'],
  ['Certains pays n’ont pas d’État solide.','no','Un constat, pas une limite de la réponse.']]},
 {p:'T1',k:'transition',q:'Quelle question, née de cette limite, fait passer à la partie II ?',o:[
  ['Quand la ségrégation fut loi en Alabama, qui restait-il, au-dessus de l’État, pour juger cette loi ?','ok','Elle reprend la limite de la partie I et pose une question ouverte, à laquelle seule la partie II peut répondre.'],
  ['Quand la ségrégation fut loi en Alabama, ce sont les citoyens qui ont dû juger cette loi injuste, à la place de l’État.','def','Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question.'],
  ['Voyons maintenant le rôle des citoyens dans la lutte contre l’injustice.','no','Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse.']]},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Les citoyens : la justice ne se réduit pas à la loi, et c’est en jugeant les lois qu’on les fait progresser.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I perdait.'],
  ['Les juges, qui sont indépendants et peuvent condamner l’État lui-même quand il viole ses propres lois ou ses engagements.','def','Une bonne piste, mais les juges appliquent les lois : qui juge une loi injuste ?'],
  ['Personne : l’État a toujours le dernier mot.','no','C’est revenir à la partie I au lieu d’en sortir.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['Antigone, Thoreau, Rosa Parks : chacun oppose à la loi un jugement sur la loi, et la contraint parfois à changer.','ok','La partie montre ce qu’elle permet de comprendre : le jugement des citoyens corrige l’État.'],
  ['La lutte contre l’injustice revient d’abord aux citoyens, car eux seuls peuvent juger les lois.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['L’État est toujours injuste, et seuls les citoyens sont justes.','no','Excessif : la partie II dit que les citoyens jugent les lois, pas que l’État a toujours tort.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Si chacun rend justice selon sa conscience, il y a autant de justices que de consciences, et parfois la vengeance.','ok','La limite vient de la réponse : sans la force de la loi, la justice devient inégale.'],
  ['Les citoyens n’ont pas toujours le temps de s’engager, entre leur travail et leur famille.','def','Vrai, mais extérieur : la limite doit venir du jugement des citoyens lui-même.'],
  ['Les manifestations peuvent gêner la circulation.','no','Hors sujet.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Seul, l’État fait de l’injustice une loi ; seuls, les citoyens en font une vengeance : à qui revient donc la lutte ?','ok','Elle découvre ce que I et II supposaient ensemble, une tâche à confier à un seul, et pose une question ouverte.'],
  ['Si l’État peut être injuste et que les citoyens se vengent, faut-il finalement confier toute la lutte à l’État seul ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Il faudra donc partager la lutte à parts égales entre l’État et les citoyens.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Aux deux, mais pas pour la même tâche : la partie I a montré qu’il faut la force, la partie II le jugement.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur l’ordre public, la partie II sur la liberté de chacun de protester.','def','Proche, mais l’ordre et la liberté déplacent le sujet : la force et le jugement.'],
  ['À personne : l’injustice fait partie du monde.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
  ['Distinguer deux plans : à l’État l’action, qui exige la force ; aux citoyens le jugement, car celui qui a la force ne peut en être le seul juge.','ok','Elle garde la force de l’État (I) et le jugement des citoyens (II).'],
  ['Penser dans le temps : d’abord les citoyens dénoncent l’injustice, ensuite l’État la corrige par la loi.','def','Elle sauve les deux, mais l’État reste seul juge une fois la loi faite.'],
  ['Il faut un État ni trop fort ni trop faible.','no','Un juste milieu sans raison : le problème reste entier.']]},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['L’État a la charge de la justice ; les citoyens en ont la garde. Reste : un État qu’on ne peut plus corriger.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['L’État a la charge de la justice ; les citoyens en ont la garde : avec ce partage, toute la difficulté est réglée.','def','La réponse est juste, mais elle se croit complète : ce partage suppose un État que les citoyens peuvent encore corriger. Cherchez son reste.'],
  ['C’est parfois à l’État de lutter, et parfois aux citoyens.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Quand l’État devient lui-même l’injustice et ne se laisse plus corriger, à qui revient la lutte, et avec quelle force ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['Une société parfaitement juste est-elle possible, ou n’est-elle qu’un rêve ?','def','Une vraie question, mais qui ne part pas du reste de la réponse.'],
  ['La justice est l’affaire de tous, et chacun doit y contribuer.','no','Une formule vide : la conclusion transforme le reste en question.']]}
 ]
}
],
niveau2: [
{
 id:'prisonniers-langage', sujet:'Sommes-nous prisonniers du langage ?', notion:'Le langage', v:2,
 pb:'Nous dire prisonniers du langage suppose-t-il un point de vue hors de lui, et nous en dire libres, une pensée sans mots qui ne pourrait rien penser ?',
 annale:'sommes-nous-prisonniers-du-langage',
 etapes:[
 {p:'I',k:'installer',q:'Quelle première réponse installer en partie I, avec sa raison ?',o:[
  ['Nous sommes prisonniers du langage : nous pensons dans une langue que nous n’avons pas choisie.','ok','Une réponse au sujet, avec sa raison.'],
  ['Il existe des mots qu’on ne peut pas traduire d’une langue à l’autre, même avec beaucoup d’effort et de patience.','def','Un fait, pas encore une raison : dites ce qu’il montre de notre pensée.'],
  ['Le langage est un milieu qui limite la pensée et la rend possible.','no','C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné.']]},
 {p:'I',k:'renforcer',q:'Qu’est-ce qui rend cette réponse la plus forte possible ?',o:[
  ['Bergson : les mots ne notent des choses que ce qu’elles ont de commun et d’utile, et nous cachent le reste.','ok','La réponse est poussée au plus fort : nous ne voyons pas les choses, mais les étiquettes de la langue.'],
  ['Un enfant apprend sa langue maternelle sans jamais l’avoir choisie, et il ne pourra jamais tout à fait en changer.','def','Il montre une langue reçue, pas encore qu’elle enferme : il illustre plus qu’il ne renforce.'],
  ['Les poètes inventent des mots et des images que la langue n’avait pas.','no','Il défend la réponse contraire : gardez-le pour la partie II.']]},
 {p:'I',k:'limite',w:1,q:'À vous : écrivez la limite de cette réponse, poussée jusqu’au bout. Une phrase.',m:'Mais si nous pouvons dire que nous sommes enfermés, c’est que nous voyons les limites du langage : nous ne sommes donc pas entièrement prisonniers.'},
 {p:'T1',k:'transition',w:1,q:'À vous : écrivez la transition, en une question ouverte née de cette limite. Une ou deux phrases.',m:'Pour savoir que les mots cachent les choses, il faut avoir aperçu ce qu’ils cachent : d’où vient ce regard que la prison n’enferme pas ?'},
 {p:'II',k:'exigence',q:'Comment la partie II répond-elle d’abord à cette question ?',o:[
  ['Ce regard est le nôtre chaque fois que nous parlons : nous ne subissons pas la langue, nous la déplaçons.','ok','Elle répond exactement à la question de transition et nomme ce que la partie I perdait.'],
  ['De la traduction, qui nous permet de passer d’une langue à une autre et de les comparer.','def','Un bon indice, mais partiel : dites ce qu’il montre de notre rapport à toute langue.'],
  ['D’une pensée pure, qui n’aurait besoin d’aucun mot pour penser.','no','C’est justement ce que la partie II devra exclure : ce sera sa limite.']]},
 {p:'II',k:'position',q:'Quel développement montre que cette exigence est nécessaire ?',o:[
  ['La poésie force la langue : la métaphore fait dire à un mot ce qu’aucun dictionnaire ne lui donnait.','ok','La partie montre ce qu’elle permet de comprendre : celui qui écrit agrandit la langue dont il hérite.'],
  ['Nous ne sommes pas prisonniers du langage : nous le travaillons, nous l’agrandissons.','def','C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre.'],
  ['Nous pouvons toujours choisir de nous taire, et personne ne peut nous en empêcher.','no','Le silence n’est pas une liberté de penser : la réponse est trop faible.']]},
 {p:'II',k:'limite',q:'Où cette deuxième réponse cède-t-elle à son tour ?',o:[
  ['Mais cette liberté s’exerce toujours avec des mots : on ne pense jamais hors du langage.','ok','La limite vient de la réponse : travailler la langue, c’est rester dedans.'],
  ['Les grands poètes sont rares dans une génération, et la plupart d’entre nous parlent comme tout le monde.','def','Un constat : il ne montre pas la limite de la liberté elle-même.'],
  ['Des langues disparaissent chaque année dans le monde.','no','Hors sujet.']]},
 {p:'T2',k:'transition',q:'Quelle question montre ce que les deux réponses supposaient ensemble ?',o:[
  ['Une limite dont on ne sort jamais et qu’on déplace sans cesse n’a plus rien d’un mur : comment nommer ce qui borne la pensée en la portant ?','ok','Elle découvre ce que I et II supposaient ensemble, le langage pensé comme une prison, et pose une question ouverte.'],
  ['Si la prison n’en est pas une et que la liberté reste dans les mots, sommes-nous prisonniers ou non ?','def','Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp.'],
  ['Nous verrons pour finir que le langage est à la fois une prison et une liberté.','no','Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux.']]},
 {p:'III',k:'probleme',q:'Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?',o:[
  ['Un milieu : la partie I avait vu que nous pensons dans les mots, la partie II que nous les travaillons.','ok','Elle répond à la question de transition et nomme les deux acquis : la partie III devra garder l’un et l’autre.'],
  ['Chacune avait raison à moitié : la partie I sur la grammaire, la partie II sur la littérature.','def','Proche, mais la grammaire et la littérature déplacent le sujet : la pensée et ses mots.'],
  ['Aucune des deux : le langage n’est qu’un outil pour communiquer avec les autres.','no','C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi.']]},
 {p:'III',k:'operation',w:1,q:'À vous : écrivez l’opération de la troisième partie, qui garde quelque chose de I et de II. Deux phrases.',m:'Le langage n’est pas une prison mais un milieu, comme l’air pour l’oiseau : il limite et rend possible. Ses limites ne sont pas des murs : elles se déplacent quand on le travaille.'},
 {p:'III',k:'stabiliser',q:'Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?',o:[
  ['Nous ne sommes pas prisonniers du langage, mais nous ne pensons jamais sans lui. Reste : ce qu’on ne sait pas encore dire.','ok','La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra.'],
  ['Nous ne sommes pas prisonniers du langage, mais nous ne pensons jamais sans lui : avec cette réponse, le problème du sujet est entièrement réglé.','def','La réponse est juste, mais elle se croit complète : certaines expériences restent au bord des mots. Cherchez son reste.'],
  ['Nous sommes parfois prisonniers du langage, et parfois libres, selon les cas.','no','On retombe dans le juste milieu : la réponse de la partie III est perdue.']]},
 {p:'C',k:'question',q:'Quelle question finale naît de ce reste ?',o:[
  ['Ce que nous ne savons pas encore dire marque-t-il une limite de notre langue, ou de notre pensée ?','ok','C’est le reste de la réponse, devenu question : le même problème, posé plus loin.'],
  ['Faut-il apprendre plusieurs langues étrangères pour mieux penser ?','def','Une question liée, mais qui ne part pas du reste de la réponse.'],
  ['Le langage est ce qui distingue l’homme des animaux, depuis toujours.','no','Une affirmation, pas une question.']]}
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
