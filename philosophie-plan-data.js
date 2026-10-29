/* Le plan pas à pas : de la problématique au plan détaillé.
   Chaque étape : p = partie (I, II, III), k = place (reponse, exemple, limite, transition, issue, reste),
   q = question, o = [texte, ok|def|no, pourquoi] ; w:1 + m = étape écrite avec une réponse possible.
   Pour la troisième partie, plusieurs propositions peuvent tenir : la justification dit ce que chacune sauve et ce qu’elle laisse. */
window.PHILO_PLAN = {
niveau1: [
{
 id:'justice-lois', sujet:'Pour être juste, suffit-il d’obéir aux lois ?', notion:'La justice', v:2,
 pb:'Suffit-il d’obéir aux lois pour être juste, si l’obéissance interdit de juger une loi injuste, et si juger les lois ne laisse plus de règle commune ?',
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
 {p:'III',k:'operation',q:'Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.',o:[
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
  "id": "inconscient-heureux",
  "sujet": "Faut-il être inconscient pour être heureux ?",
  "notion": "Le bonheur",
  "v": 3,
  "pb": "Faut-il être inconscient pour être heureux, si savoir permet de prévenir certains dangers mais peut aussi entretenir une inquiétude devant ce qui n’arrive pas encore ?",
  "annale": "faut-il-etre-inconscient-pour-etre-heureux",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "Il semble qu’il faille être inconscient pour être heureux, car l’insouciance protège le repos.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "Les gens simples semblent souvent plus heureux que les savants, et moins inquiets.",
          "def",
          "Une impression juste, mais pas encore une raison : dites pourquoi l’ignorance rendrait heureux."
        ],
        [
          "Il faut voir clair sur ce qui dépend de nous, et accepter avec sérénité tout ce qui n’en dépend pas.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Pascal, dans les Pensées (liasse « Divertissement »), montre que les adultes font de même : ne pouvant guérir la mort et la misère, les hommes ont choisi de n’y point penser pour se rendre heureux, et se divertissent pour ne pas penser à leur condition.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "Un enfant joue sans connaître tous les dangers du monde qui l’entoure, et il est heureux.",
          "def",
          "Juste, mais l’enfant ne choisit pas d’ignorer : l’exemple illustre plus qu’il ne renforce."
        ],
        [
          "Socrate préfère savoir, même insatisfait, plutôt que vivre dans l’ignorance.",
          "no",
          "Il défend la réponse contraire : gardez-le pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais ignorer une menace ne la supprime pas : qui ne la voit pas ne peut s’en garder.",
          "ok",
          "La limite vient de la réponse elle-même, poussée jusqu’au bout : c’est elle qui obligera à changer de réponse."
        ],
        [
          "Ignorer certains dangers peut mettre la santé de chacun, et même celle des autres, en grand danger.",
          "def",
          "Vrai, mais c’est une objection extérieure : la limite doit venir du bonheur lui-même."
        ],
        [
          "Tout le monde n’a pas la chance de pouvoir rester inconscient de ce qui le menace.",
          "no",
          "Un constat, pas une limite de la réponse."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "L'ignorance épargne parfois une inquiétude, mais elle peut aussi priver des moyens d'éviter un mal réel ; cherchons ce que la conscience apporte à la joie sans supposer qu'elle supprime tout risque.",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "Mais si un bonheur qu’on ignore n’est plus un bonheur, il faut se savoir heureux pour l’être vraiment.",
          "def",
          "Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question."
        ],
        [
          "Voyons maintenant l’autre point de vue sur le bonheur, celui de la conscience.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Connaître certaines menaces permet de préserver ce qui nous rend heureux.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Aucun qui compte vraiment : les dangers que l’on ignore finissent presque toujours par s’éloigner d’eux-mêmes, sans qu’on ait rien à faire.",
          "def",
          "Elle répond, mais garde l’ignorance comme remède : la partie II ne naît pas encore."
        ],
        [
          "Tous : il faut tout savoir et tout comprendre pour être vraiment heureux.",
          "no",
          "Excessif : la partie II dit qu’il faut voir certaines menaces, pas tout savoir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Épicure examine, dans la Lettre à Ménécée, la peur de la mort et montre qu'une analyse peut corriger certaines représentations anxieuses. La lucidité peut donc soulager au lieu d'inquiéter.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "Il faut être conscient pour être heureux : se savoir heureux fait partie du bonheur.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "La connaissance rend libre, et la liberté rend heureux, comme chacun le sait bien.",
          "no",
          "Vous glissez vers la liberté : restez sur le bonheur."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais une prudence qui exigerait de prévoir et d'écarter tous les dangers ne laisserait plus de place à la joie, puisque l'incertitude ne disparaît jamais.",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Les gens lucides paraissent souvent inquiets ou mélancoliques, comme s’ils portaient sur leurs épaules tout le poids du monde et de ses menaces.",
          "def",
          "Constat juste, mais dites pourquoi : c’est la lucidité elle-même qui voit les menaces."
        ],
        [
          "Personne ne peut être totalement conscient de tout ce qui lui arrive.",
          "no",
          "Vrai, mais cela ne montre pas ce que la lucidité fait perdre au bonheur."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "Une personne peut être informée et sereine : la coexistence du savoir et de la joie réfute déjà la nécessité de l'inconscience, mais n'explique pas encore comment discerner ce qui mérite notre attention de ce qui nourrit seulement l'angoisse.",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si l’ignorance aveugle et que la lucidité inquiète, faut-il finalement être conscient ou inconscient ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Il faudra donc, pour finir, trouver un juste milieu entre l’insouciance et la lucidité.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "La personne informée et heureuse est un contre-exemple suffisant à la nécessité de l'inconscience. Reste à distinguer l'attention utile à un danger et l'inquiétude sans objet précis.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur le plaisir que donne l’insouciance, la partie II sur la connaissance du monde qui nous entoure.",
          "def",
          "Proche, mais le plaisir et la connaissance déplacent le sujet : le repos et la lucidité."
        ],
        [
          "Aucune des deux n’avait raison : le bonheur est une question de caractère, voilà tout.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "La lucidité distingue alors un danger réel d’une représentation qui nous tourmente : connaître peut diminuer la crainte au lieu de l’accroître.",
          "ok",
          "Elle garde l’acquis de la partie I et celui de la partie II, et dit concrètement comment les tenir ensemble."
        ],
        [
          "On peut distinguer ce qui dépend de nous de ce qui n’en dépend pas, et cesser de s’inquiéter de tout ce qui échappe, de toute façon, à notre pouvoir.",
          "def",
          "Défendable, mais incomplet : un dommage réel ne devient pas indifférent parce qu’il ne dépend pas de nous."
        ],
        [
          "Il faut être un peu conscient et un peu inconscient, selon les moments et les circonstances de la vie.",
          "no",
          "Un juste milieu sans raison : le problème reste entier."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "Une joie peut être lucide et vulnérable : comprendre un risque aide parfois à agir, mais ne garantit pas contre toute perte. La souffrance née d'une perte réelle demeure à penser.",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "Le bonheur lucide n’est donc pas un repos acheté par l’oubli, mais une paix conquise sur la crainte, qui garde sa vigilance. Ainsi compris, il ne laisse plus aucune souffrance hors de sa portée : toute peine, une fois examinée, se dissipe comme une crainte imaginaire.",
          "def",
          "La réponse se croit complète : réfuter une peur imaginaire ne supprime pas la douleur d’un mal réel, comme la perte d’un proche."
        ],
        [
          "Le bonheur demande parfois d’ignorer et parfois de savoir, selon les cas.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Comment soutenir durablement une vie heureuse lorsque la douleur ne vient plus d'une anticipation trompeuse, mais d'une perte effectivement subie ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "Le bonheur existe-t-il vraiment, ou n’est-il au fond qu’un rêve que les hommes poursuivent toute leur vie sans jamais parvenir à l’atteindre ?",
          "def",
          "Une vraie question, mais trop large : elle ne part pas du reste de la réponse."
        ],
        [
          "Chacun doit trouver son propre chemin vers le bonheur, à sa manière et à son rythme.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-asie-inconscient-bonheur"
},
{
  "id": "certain-bien-agi",
  "sujet": "Peut-on être certain d’avoir bien agi ?",
  "notion": "Le devoir",
  "v": 3,
  "pb": "Peut-on être certain d’avoir bien agi, lorsque les raisons de notre choix peuvent être justifiées mais que nous ne connaissons pas toutes ses conséquences ?",
  "annale": "peut-on-etre-certain-d-avoir-bien-agi",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "On peut être certain d’avoir bien agi, car on connaît son intention.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "On le sait quand les autres nous remercient ou nous félicitent de ce qu’on a fait.",
          "def",
          "Une piste, mais le jugement des autres ne donne pas encore une certitude à soi."
        ],
        [
          "On n’est jamais certain de rien en morale, et surtout pas de soi-même ni de ses propres raisons.",
          "no",
          "C’est la réponse contraire, en plus excessive : gardez-la pour la partie II, nuancée."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Kant, dans la première section des Fondements de la métaphysique des mœurs, affirme qu’une bonne volonté est bonne par elle-même, même si elle échoue.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "Je prête de l’argent à un ami en difficulté, il est content de l’avoir reçu, et je sais que j’ai bien fait.",
          "def",
          "L’exemple montre un bon effet plus qu’une intention : il ne renforce pas la réponse."
        ],
        [
          "Le pilote Sully, seul la nuit, doute d’avoir pris la bonne décision.",
          "no",
          "Il illustre le doute : gardez-le pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais si tout repose sur l’intention, il faut encore être sûr de la connaître, et rien ne garantit que mes vraies raisons soient celles que je crois.",
          "ok",
          "La limite vient de la réponse elle-même, poussée jusqu’au bout : c’est elle qui obligera à changer de réponse."
        ],
        [
          "Les intentions sont difficiles à prouver devant un tribunal, qui juge sur des faits, des témoignages et des preuves, et non sur ce que chacun dit avoir voulu.",
          "def",
          "Vrai, mais objection extérieure : la question est ce que je sais de moi, pas ce qu’un juge peut prouver."
        ],
        [
          "Certaines personnes ont de mauvaises intentions et le cachent très bien aux autres.",
          "no",
          "Hors sujet : on parle de celui qui croit avoir bien agi."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "Une intention juste ne dispense pas de rechercher les conséquences prévisibles. Quels éléments échappent néanmoins à celui qui veut juger son acte ?",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "Mais si je peux me tromper sur mes propres motifs, la certitude ne peut plus reposer sur l’intention seule.",
          "def",
          "Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question."
        ],
        [
          "Nous allons maintenant parler des conséquences de nos actes, qui comptent aussi.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Il devient incertain : ce qui fait la valeur d’un acte, ses vrais motifs et ses effets, ne nous est pas transparent.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Il passe aux autres, qui voient nos actes de l’extérieur et peuvent parfois les juger bien mieux que nous ne le faisons nous-mêmes.",
          "def",
          "Une piste, mais elle déplace la certitude vers autrui sans montrer ce qui nous échappe."
        ],
        [
          "Il reste sûr : il suffit de savoir ce qu’on a voulu faire.",
          "no",
          "C’est revenir à la partie I au lieu d’en sortir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Kant lui-même reconnaît, dans la deuxième section des Fondements, qu’on ne peut jamais savoir avec certitude si l’on a agi par devoir plutôt que par intérêt caché, et La Rochefoucauld, dans ses Maximes, montre l’amour-propre déguisé sous les vertus.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "On ne peut pas en être certain : les effets de nos actes et nos vrais motifs nous échappent.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "Il est impossible de jamais bien agir, quoi qu’on fasse et quoi qu’on veuille.",
          "no",
          "Excessif : le sujet porte sur la certitude, pas sur la possibilité de bien agir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais si seuls les effets décident, la valeur d’un acte dépend de ce qui arrive après lui : la même décision serait mauvaise si un coup de vent avait fait échouer l’amerrissage.",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Les effets d’une action ne sont parfois connus que bien plus tard, des années après qu’on a agi, quand plus personne ne se souvient de ce qu’on avait voulu ni pourquoi on l’avait décidé.",
          "def",
          "Vrai, mais cela renforce la partie II au lieu d’en montrer la limite."
        ],
        [
          "Le doute est une attitude philosophique très ancienne, depuis Socrate.",
          "no",
          "Une généralité, pas une limite."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "Ni les seuls motifs ni l’exigence de connaître toutes les conséquences ne suffisent. Dans quelles situations des raisons accessibles permettent-elles de juger avec certitude, sans réclamer l’omniscience ?",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si l’intention ne suffit pas et que le doute paralyse, peut-on finalement être certain d’avoir bien agi, oui ou non ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Nous verrons pour finir qu’il faut un juste équilibre entre la confiance et le doute.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "La certitude qui convient à l’action n’est pas celle d’un savoir complet : elle porte sur les raisons du choix, que l’on peut examiner au moment d’agir.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la morale de l’intention, la partie II sur la psychologie de celui qui prétend se juger lui-même sans se tromper.",
          "def",
          "Proche, mais ces deux domaines déplacent le sujet : l’assurance d’agir et la lucidité sur soi."
        ],
        [
          "Aucune des deux n’avait raison : la morale n’est qu’une affaire d’opinion.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "Elle compare les raisons accessibles, les risques prévisibles et les autres décisions possibles : on peut être sûr de l’avoir fait, sans l’être de l’issue.",
          "ok",
          "Elle garde l’acquis de la partie I et celui de la partie II, et dit concrètement comment les tenir ensemble."
        ],
        [
          "On peut changer la certitude en engagement : celui qui répond de son acte devant les autres n’a pas besoin d’être sûr qu’il était bon pour l’assumer tout entier.",
          "def",
          "Défendable, mais elle change de sujet : répondre d’un acte ne démontre pas qu’on a bien agi."
        ],
        [
          "Il faut attendre de connaître tous les effets d’une action avant de juger si elle était bonne.",
          "no",
          "C’est choisir la partie II, et c’est impossible : les effets ne finissent jamais."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "Cette certitude ne garantit pas que l’acte fut bon, mais qu’il fut bien décidé, et c’est de cela qu’un agent peut répondre. Reste qu’un effet imprévisible peut conduire à réviser l’appréciation d’un choix pourtant raisonnable au moment d’agir.",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "Cette certitude ne garantit pas que l’acte fut bon, mais qu’il fut bien décidé, et c’est de cela qu’un agent peut répondre. Un choix bien décidé ne peut donc plus être révisé, quoi qu’il arrive ensuite : ses effets imprévus ne regardent plus celui qui a agi.",
          "def",
          "La réponse se croit complète : un effet imprévisible peut encore conduire à réviser l’appréciation d’un choix pourtant raisonnable."
        ],
        [
          "On est parfois sûr d’avoir bien agi, et parfois non, selon les situations.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Doit-on répondre d’un mal que nos meilleures raisons ne permettaient pas de prévoir ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "Faut-il toujours agir, même quand on n’est sûr de rien de ce qui va arriver, ni de ce qu’on veut vraiment ?",
          "def",
          "Une vraie question, mais qui revient à la partie II : partez du reste de la réponse."
        ],
        [
          "Il faut toujours essayer de faire de son mieux, quoi qu’il arrive ensuite.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-g1-bien-agir"
},
{
  "id": "science-utile",
  "sujet": "La science doit-elle être utile ?",
  "notion": "La science",
  "v": 3,
  "pb": "La science doit-elle être utile, si elle ne peut promettre les applications de vérités encore inconnues, mais ne peut non plus se dispenser de répondre de ses pratiques et de leurs conséquences ?",
  "annale": "la-science-doit-elle-etre-utile",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quel philosophe permet d’établir la destination humaine des sciences ?",
      "o": [
        [
          "Bacon, dans le Novum Organum (I, § 81), assigne à la science la fin d’enrichir la vie humaine de nouvelles découvertes.",
          "ok",
          "L’opération établit une fin humaine de la science ; elle ne prouve pas encore, à elle seule, une obligation morale."
        ],
        [
          "La science coûte très cher à la société, qui la finance : elle doit donc lui rapporter quelque chose.",
          "def",
          "Une raison économique : elle ne dit pas encore ce qu’est la science."
        ],
        [
          "La science doit chercher le vrai, puis répondre de ses usages.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Quelle pensée transforme cette fin en véritable devoir ?",
      "o": [
        [
          "Descartes, dans le Discours de la méthode (VI), invoque le devoir de procurer « le bien général de tous les hommes ».",
          "ok",
          "Descartes ajoute la prémisse normative qui transforme une fin souhaitable en obligation de contribuer et de communiquer."
        ],
        [
          "Les vaccins ont sauvé des millions de vies au cours du siècle dernier, et en sauvent encore chaque année.",
          "def",
          "Il montre que la science est utile, pas qu’elle doive l’être : il illustre plus qu’il ne renforce."
        ],
        [
          "Einstein cherche la relativité sans penser à aucun usage pratique.",
          "no",
          "Il défend la réponse contraire : gardez-le pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Quel obstacle Bachelard fait-il apparaître quand l’utilité commande d’avance ce qu’il faut connaître ?",
      "o": [
        [
          "Bachelard note que l’opinion, en désignant les objets par leur utilité, s’interdit de les connaître.",
          "ok",
          "Il vise la confusion entre besoin et connaissance ; on ne peut l’étendre à toute recherche utile sans argument."
        ],
        [
          "Certaines inventions scientifiques sont dangereuses pour l’humanité, comme la bombe atomique, dont la puissance pourrait détruire des villes entières.",
          "def",
          "Une piste pour plus tard, mais ce n’est pas la limite de cette réponse-ci."
        ],
        [
          "Beaucoup d’élèves n’aiment pas les matières scientifiques et s’en détournent tôt.",
          "no",
          "Hors sujet."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "Comment juger une recherche dont on ne peut encore prévoir les applications ?",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "Exiger de la science qu’elle serve, c’est la priver de ce qui servira : aucun calcul n’aurait commandé la relativité.",
          "def",
          "Le diagnostic est juste, mais il n’ouvre rien : la partie II ne fait que le prolonger. Faites-en une question."
        ],
        [
          "Passons maintenant à la science pure et désintéressée, l’autre face du sujet.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Avec Aristote, comment répondre à la question ouverte par la première partie ?",
      "o": [
        [
          "Aristote distingue le savoir recherché pour lui-même de celui qu’on poursuit en vue de ses résultats.",
          "ok",
          "L’opération est de reconnaître une valeur intrinsèque au savoir ; Aristote traite ici de la philosophie."
        ],
        [
          "Par le prestige qu’elle donne aux pays qui la financent et la font briller.",
          "def",
          "Une réponse, mais extérieure : elle ne dit pas ce qu’est la science."
        ],
        [
          "Par son utilité à long terme, plutôt que par son utilité immédiate.",
          "no",
          "C’est encore l’utilité : on reste dans la partie I."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Comment Nietzsche rend-il cette réponse plus forte que l’affirmation « la science cherche le vrai » ?",
      "o": [
        [
          "Nietzsche, dans Humain, trop humain (§ 635), donne aux méthodes scientifiques une valeur comparable à celle de leurs résultats.",
          "ok",
          "La méthode est une conquête distincte du produit : elle permet de contrôler et de rectifier la croyance."
        ],
        [
          "La science vaut d’abord par la vérité qu’elle cherche : son utilité ne vient qu’ensuite.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "La science est inutile, et c’est très bien ainsi : elle n’a de comptes à rendre à personne, pas même à ceux qui la paient.",
          "no",
          "Excessif : le « non » dit qu’elle n’a pas à être utile, pas qu’elle est inutile."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Quelle norme philosophique révèle l’insuffisance d’une justification par la seule méthode ?",
      "o": [
        [
          "La règle kantienne de ne jamais traiter autrui seulement comme un moyen interdit de justifier une expérience par sa seule efficacité.",
          "ok",
          "L’opération introduit un critère moral qui ne se déduit pas d’une preuve, sans imputer à Kant un propos sur les laboratoires."
        ],
        [
          "Les chercheurs ont besoin de beaucoup d’argent pour travailler, pour équiper leurs laboratoires et pour payer ceux qui les aident dans leurs expériences.",
          "def",
          "Vrai, mais extérieur : la limite doit venir de la recherche elle-même."
        ],
        [
          "La vérité dépend toujours du point de vue de chacun, même en science.",
          "no",
          "Hors sujet, et faux pour la science."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "Comment préserver à la fois le critère du vrai et le devoir de justifier les actes de recherche ?",
          "ok",
          "La question demande une distinction des critères, non une opposition fabriquée entre liberté et utilité."
        ],
        [
          "Si l’utilité la trahit et que la vérité pure l’aveugle, faut-il finalement exiger de la science qu’elle soit utile, ou non ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Il faudra donc, pour finir, une science à moitié utile et à moitié libre.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Quelle distinction de Kant permet de transformer le présupposé commun ?",
      "o": [
        [
          "Distinguer avec Kant « Que puis-je savoir ? » et « Que dois-je faire ? », puis examiner séparément l’utilité.",
          "ok",
          "La distinction entre justification théorique et pratique transforme le problème ; l’utilité est une troisième question introduite ici."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur l’économie du savoir et ses profits, la partie II sur la culture générale et le goût de connaître.",
          "def",
          "Proche, mais l’économie et la culture déplacent le sujet : la puissance et la liberté de chercher."
        ],
        [
          "Aucune des deux : la science n’a pas à être jugée, ni par l’utilité ni par rien.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération de Claude Bernard permet de limiter les pratiques sans imposer un rendement aux résultats ?",
      "o": [
        [
          "Claude Bernard subordonne l’expérimentation humaine à ce qu’elle fait subir au patient, indépendamment de l’intérêt scientifique.",
          "ok",
          "Le principe porte sur les moyens et les risques, non sur le rendement d’une découverte ; son domaine d’origine doit rester nommé."
        ],
        [
          "On peut séparer la recherche de ses applications : laisser les savants chercher librement, puis juger seulement l’usage qu’on fera de leurs découvertes.",
          "def",
          "Défendable, mais tardif : la responsabilité n’arrive qu’après des expériences déjà lourdes de conséquences."
        ],
        [
          "Il faut une science à moitié utile et à moitié libre, selon les domaines de recherche.",
          "no",
          "Un juste milieu sans raison : le problème reste entier."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que permet de déduire Dewey que ne disaient pas encore III.1 et III.2 ?",
      "o": [
        [
          "Avec Dewey, confronter l’expertise de ceux qui savent aux besoins de ceux qui subissent les conséquences ; rendre la décision explicite et révisable.",
          "ok",
          "La troisième opération ne résume pas la solution : elle déduit une compétence publique associée à l’expertise."
        ],
        [
          "La science répond de ce qu’elle fait, et tout est résolu dès que les savants jugent eux-mêmes leurs risques.",
          "def",
          "La seule autorégulation ne suffit pas à établir qui doit décider des risques imposés à autrui."
        ],
        [
          "La science doit être parfois utile et parfois libre, selon les cas.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Comment instituer un jugement commun sur les risques d’une recherche lorsque la connaissance demeure spécialisée et que ses conséquences restent incertaines ?",
          "ok",
          "La difficulté restante porte sur la décision légitime entre expertise et public concerné."
        ],
        [
          "La science fera-t-elle un jour le bonheur de l’humanité, ou bien sera-t-elle la cause de son malheur et de sa ruine ?",
          "def",
          "Une vraie question, mais qui ne part pas du reste de la réponse."
        ],
        [
          "La science ne cesse de progresser depuis des siècles, et elle progressera encore.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-an-science-utile"
},
{
  "id": "artiste-sait",
  "sujet": "L’artiste sait-il ce qu’il fait ?",
  "notion": "L’art",
  "v": 3,
  "pb": "L’artiste sait-il ce qu’il fait, si l’œuvre exige des décisions qu’il peut justifier, mais acquiert au cours de son élaboration une forme qu’il ne pouvait connaître d’avance ?",
  "annale": "l-artiste-sait-il-ce-qu-il-fait",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "L’artiste sait ce qu’il fait, car l’art est, à sa racine, un métier.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "Beaucoup d’artistes font de longues études dans des écoles d’art avant de créer.",
          "def",
          "Un fait, pas encore une raison : dites ce que ces études donnent."
        ],
        [
          "L’artiste découvre ce qu’il fait à mesure qu’il le fait.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Le latin ars, d’où vient notre mot « art », traduisait la technè grecque : un savoir-faire qui connaît ses règles et sait ce qu’il produit.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "Les esquisses et les brouillons d’un artiste montrent un travail réfléchi, repris, corrigé.",
          "def",
          "Un bon exemple, mais il illustre plus qu’il ne renforce : la réponse vaut-elle pour tout art ?"
        ],
        [
          "Pour Kant, le génie ne sait pas expliquer comment il produit son œuvre.",
          "no",
          "La référence défend la réponse contraire : gardez-la pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais si tout était su d’avance, l’œuvre serait une fabrication, comme un objet produit selon un plan.",
          "ok",
          "La limite vient de la réponse elle-même, poussée jusqu’au bout : c’est elle qui obligera à changer de réponse."
        ],
        [
          "Certains artistes ratent des œuvres qu’ils avaient pourtant longuement préparées, mûries et dessinées dans leurs moindres détails.",
          "def",
          "Une piste, mais rater n’est pas encore ne pas savoir."
        ],
        [
          "L’art est une affaire de goût, et chacun a le sien.",
          "no",
          "Hors sujet : on parle de l’artiste, pas du goût du public."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "Où commence l’invention si le savoir-faire ne suffit pas à créer ?",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "Un métier qui saurait tout d’avance ne produirait que ce qu’il sait : l’œuvre doit donc dépasser ce savoir.",
          "def",
          "Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question."
        ],
        [
          "Voyons à présent ce que les philosophes disent du génie et de l’inspiration.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Une œuvre doit être nouvelle : on ne peut pas en donner la recette, sinon n’importe qui la referait.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Là où l’inspiration vient, comme le croyaient les Grecs, qui invoquaient les muses avant de chanter ou d’écrire.",
          "def",
          "Une image à expliquer : dites ce qu’elle signifie pour le savoir de l’artiste."
        ],
        [
          "Là où le public la reconnaît et l’admire comme une œuvre.",
          "no",
          "Vous passez au public : la partie II porte sur l’artiste."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Kant, dans la Critique de la faculté de juger (§ 46), définit le génie comme le talent qui donne à l’art sa règle sans pouvoir l’expliquer : l’artiste ne sait pas dire comment il a produit son œuvre.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "L’artiste ne sait pas tout ce qu’il fait : l’œuvre le dépasse toujours, et c’est même ce qui fait sa valeur.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "L’artiste ne sait jamais rien de ce qu’il fait, il se laisse simplement porter.",
          "no",
          "Excessif : le « non » dit qu’il ne sait pas tout, pas qu’il ne sait rien."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais si le génie ne sait pas comment il produit, il ne choisit plus : l’œuvre passe par lui sans venir de lui.",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Le public ne comprend pas toujours les œuvres qu’il regarde, même les plus célèbres, ni ce que l’artiste a voulu y mettre.",
          "def",
          "Vous passez au public : la limite doit concerner l’artiste."
        ],
        [
          "Les œuvres d’art coûtent de plus en plus cher sur le marché.",
          "no",
          "Hors sujet."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "Mais savoir ce qu’on fait, est-ce nécessairement le savoir avant de le faire ?",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si le métier tue l’invention et que l’invention perd l’auteur, l’artiste sait-il ou non ce qu’il fait ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Nous verrons pour finir que l’artiste sait à moitié ce qu’il fait, et qu’il ignore le reste.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "Savoir ce qu’on fait peut aussi vouloir dire le reconnaître pendant qu’on le fait.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la technique, la partie II sur l’émotion que ressent l’artiste.",
          "def",
          "Proche, mais l’émotion déplace le sujet : il s’agit de l’invention."
        ],
        [
          "Aucune des deux n’avait raison : l’art ne s’explique pas, il se ressent.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "Une possibilité imprévue n’est pas un hasard subi si l’artiste la reconnaît, la juge et la retravaille.",
          "ok",
          "Elle garde l’acquis de la partie I et celui de la partie II, et dit concrètement comment les tenir ensemble."
        ],
        [
          "On peut distinguer le savoir technique de l’artiste et le sens de son œuvre : il sait ce qu’il fait, non ce que cela veut dire.",
          "def",
          "Défendable, mais elle sépare deux savoirs sans montrer comment l’invention devient un choix de l’artiste."
        ],
        [
          "L’artiste sait à moitié ce qu’il fait, et l’autre moitié lui échappe toujours un peu.",
          "no",
          "Un juste milieu sans raison : le problème reste entier."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "L’artiste est ainsi l’auteur de l’œuvre par les choix qu’il assume dans cette découverte, sans en posséder tout le sens. Reste que l’œuvre peut recevoir des significations que même ce jugement exercé pendant la création n’avait pas envisagées.",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "L’artiste est ainsi l’auteur de l’œuvre par les choix qu’il assume dans cette découverte, sans en posséder tout le sens. Puisqu’il a tout jugé en peignant, aucun regard venu après lui ne pourra trouver dans l’œuvre ce qu’il n’y a pas mis.",
          "def",
          "La réponse se croit complète : l’œuvre peut recevoir des significations que l’artiste, même attentif pendant la création, n’avait pas envisagées."
        ],
        [
          "L’artiste sait parfois ce qu’il fait, et parfois non, selon les œuvres.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "La valeur de l’œuvre peut-elle dépendre du jugement de ses spectateurs sans se réduire à leur goût ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "L’art est-il vraiment utile à la société, ou n’est-il qu’un luxe réservé à quelques-uns, qui ont le temps et l’argent nécessaires pour en profiter ?",
          "def",
          "Une autre question : partez du reste de la réponse."
        ],
        [
          "Chaque artiste a son style et sa manière de travailler, que personne ne peut imiter.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-an-artiste-sait"
},
{
  "id": "maitrise-paroles",
  "sujet": "Avons-nous la maîtrise de nos paroles ?",
  "notion": "Le langage",
  "v": 3,
  "pb": "Avons-nous la maîtrise de nos paroles, lorsque leur sens dépend de règles que nous partageons avec autrui, mais que nous devons néanmoins répondre de ce que nous faisons en parlant ?",
  "annale": "avons-nous-la-maitrise-de-nos-paroles",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "Nous maîtrisons nos paroles, car parler est un acte volontaire.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "Nous pouvons toujours nous taire, et le silence prouve bien que nous décidons de parler ou non.",
          "def",
          "Une piste, mais se taire n’est pas encore maîtriser ce qu’on dit : rapprochez-vous de la parole elle-même."
        ],
        [
          "Nos paroles nous engagent même quand leur sens nous échappe.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Si nous ne maîtrisions pas nos paroles, aucune d’elles ne nous engagerait : la responsabilité suppose la maîtrise.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "Un bon orateur prépare son discours avec soin et sait exactement ce qu’il va dire devant son public.",
          "def",
          "Un exemple de maîtrise, mais il illustre plus qu’il ne renforce : pourquoi la maîtrise serait-elle nécessaire ?"
        ],
        [
          "Le lapsus montre que nous disons parfois ce que nous ne voulions pas dire.",
          "no",
          "Il défend la réponse contraire : gardez-le pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais une parole dont tout le sens serait fixé d’avance ne ferait que réciter une pensée déjà faite.",
          "ok",
          "La limite vient de la réponse elle-même, poussée jusqu’au bout : c’est elle qui obligera à changer de réponse."
        ],
        [
          "Il arrive que l’émotion nous fasse dire des choses que nous regrettons ensuite, une fois calmés et revenus à nous.",
          "def",
          "Vrai, mais l’émotion est une cause extérieure : la limite doit venir de la maîtrise elle-même."
        ],
        [
          "Beaucoup de gens parlent trop vite et sans réfléchir à ce qu’ils disent.",
          "no",
          "Un constat sur certains, pas une limite de la réponse."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "Pourquoi le sens d’une parole échappe-t-il à la seule intention de celui qui parle ?",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "Une parole entièrement prévue récite : nos paroles disent donc toujours plus que ce que nous voulions dire.",
          "def",
          "Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question."
        ],
        [
          "Voyons maintenant les cas où nos paroles nous échappent.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "C’est que la langue n’est pas à nous : ses mots ont un sens commun qui dépasse notre intention.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Parce que l’inspiration du moment, qui vient on ne sait d’où, nous surprend nous-mêmes quand nous parlons.",
          "def",
          "Une image, mais elle n’explique rien : dites ce qui, dans la parole elle-même, nous dépasse."
        ],
        [
          "Il ne lui échappe pas : notre volonté choisit chaque mot avec soin.",
          "no",
          "C’est revenir à la partie I au lieu d’en sortir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Le lapsus, le malentendu, le mot blessant prononcé sans le vouloir montrent que nos paroles nous échappent.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "Nos paroles disent plus, et autre chose, que ce que nous voulions : elles nous échappent, voilà tout.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "Nous ne savons jamais ce que nous disons, ni pourquoi nous le disons.",
          "no",
          "Excessif : le « non » dit que nos paroles nous échappent en partie, pas toujours."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais si nos paroles nous échappent tout à fait, chacun pourra toujours dire : « Ce n’est pas ce que je voulais dire. »",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Il est parfois utile de ne pas maîtriser ses paroles, pour être plus sincère avec les autres et leur dire enfin ce qu’on pense.",
          "def",
          "Une piste intéressante, mais elle renforce la partie II au lieu d’en montrer la limite."
        ],
        [
          "Les réseaux sociaux déforment nos paroles.",
          "no",
          "Un exemple de plus, pas une limite."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "Mais maîtriser une parole, est-ce en fixer le sens avant de la dire ?",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si la maîtrise récite et que l’absence de maîtrise déresponsabilise, maîtrisons-nous nos paroles ou non ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Il faudra donc trouver un équilibre entre maîtrise et spontanéité.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "La maîtrise d’une parole ne se joue pas tout entière avant qu’elle soit dite : elle s’exerce aussi en la reprenant devant celui qui l’a entendue.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la politesse et les bonnes manières, la partie II sur la psychologie et l’histoire propres à chacun de nous.",
          "def",
          "Proche, mais la politesse et la psychologie déplacent le sujet : l’engagement et le sens."
        ],
        [
          "Aucun : nous ne sommes que les porte-voix de la langue.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "Nous pouvons vérifier ce que l’autre a compris et rectifier un malentendu, sans décider à sa place de toute interprétation.",
          "ok",
          "Elle garde l’acquis de la partie I et celui de la partie II, et dit concrètement comment les tenir ensemble."
        ],
        [
          "On peut renverser le rapport : la parole nous engage plutôt que nous ne la maîtrisons, comme une promesse qu’on doit tenir.",
          "def",
          "Défendable, mais elle réduit toute parole à la promesse et remplace la maîtrise par l’engagement."
        ],
        [
          "Il faut parler avec prudence, ni trop vite ni trop lentement.",
          "no",
          "Un juste milieu sans raison : le problème reste entier."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "Répondre de ses paroles, c’est donc exercer cette maîtrise, non la supposer acquise. Reste qu’une parole peut produire un effet irréversible avant que sa rectification soit entendue.",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "Répondre de ses paroles, c’est donc exercer cette maîtrise, non la supposer acquise. Comme on peut toujours rectifier, aucune parole ne peut plus nuire durablement à celui qui l’entend.",
          "def",
          "La réponse se croit complète : une parole peut produire un effet irréversible avant que sa rectification soit entendue."
        ],
        [
          "Nous maîtrisons parfois nos paroles, et parfois non.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Jusqu’où répondre d’un effet que l’on ne pouvait ni prévoir ni prévenir ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "Faut-il parler moins pour mieux maîtriser ce que l’on dit, et se taire plus souvent, même quand on aurait quelque chose à dire ?",
          "def",
          "Une question liée, mais qui ne part pas du reste de la réponse."
        ],
        [
          "La parole est le propre de l’homme, et c’est ce qui fait sa grandeur.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-me-paroles"
},
{
  "id": "humanite-religion",
  "sujet": "Peut-on concevoir une humanité sans religion ?",
  "notion": "La religion",
  "v": 3,
  "pb": "Peut-on concevoir une humanité sans religion, alors que la religion a contribué à faire société sans que tout lien humain doive dépendre d’une foi ?",
  "annale": "peut-on-concevoir-une-humanite-sans-religion",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "On peut concevoir une humanité sans religion, car la raison peut suffire.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "Beaucoup de gens, aujourd’hui, vivent très bien sans aucune religion, dans de nombreux pays du monde.",
          "def",
          "Un fait, pas encore une raison : dites ce qui rend la religion superflue."
        ],
        [
          "L’humanité peut se passer de la religion, mais non de ce qu’elle assurait.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Freud, dans L’Avenir d’une illusion, explique les idées religieuses par la détresse de l’enfance et le besoin d’un père protecteur : ce sont des illusions, nées du désir.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "Les sciences expliquent aujourd’hui des phénomènes que l’on attribuait autrefois aux dieux, comme la foudre.",
          "def",
          "Un bon exemple, mais il illustre plus qu’il ne renforce : la religion n’est pas seulement une explication du monde."
        ],
        [
          "Durkheim montre que la religion resserre les liens d’une communauté.",
          "no",
          "La référence défend la réponse contraire : gardez-la pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais si la religion répond à une détresse qui dure toute la vie, s’en passer suppose de trouver ailleurs ce qu’elle donnait.",
          "ok",
          "La limite vient de la réponse elle-même, poussée jusqu’au bout : c’est elle qui obligera à changer de réponse."
        ],
        [
          "Certains croyants refuseront toujours d’abandonner leur religion, quoi qu’on leur démontre, quoi qu’on leur explique et quoi qu’on leur oppose.",
          "def",
          "Vrai, mais c’est un constat sur les croyants : la limite doit venir de la raison elle-même."
        ],
        [
          "Les religions ont provoqué beaucoup de guerres dans l’histoire.",
          "no",
          "Un argument pour la partie I, pas sa limite."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "Une morale sans foi peut être conçue, mais les principes ne créent pas à eux seuls des pratiques communes. Il faut examiner ce que la religion apporte historiquement à la cohésion.",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "La raison gagne contre l’illusion, mais perd ce que l’illusion donnait : il faut donc garder la religion.",
          "def",
          "Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question."
        ],
        [
          "Après avoir vu les arguments contre la religion, voyons ceux qui la défendent.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Une humanité n’est pas seulement une somme d’individus raisonnables : il lui faut ce qui les relie et leur donne des fins communes.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Il se maintient sans peine : la famille et les amis suffisent largement à relier les hommes entre eux, sans aucune religion ni aucun culte.",
          "def",
          "Une réponse, mais trop étroite : la question porte sur ce qui relie toute une communauté."
        ],
        [
          "Rien ne change : la raison relie tous les hommes par des vérités communes.",
          "no",
          "C’est revenir à la partie I au lieu d’en sortir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Durkheim, dans Les Formes élémentaires de la vie religieuse, montre que la religion est, en son fond, une affaire sociale : en célébrant le sacré, une communauté se célèbre et se resserre elle-même.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "La religion relie les hommes et leur donne des fins communes, ce que la raison seule ne fait pas.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "Une humanité sans religion serait forcément immorale et violente.",
          "no",
          "Excessif : la partie II dit que la religion relie, pas que sans elle tout est permis."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais un lien qui tient à une croyance commune exige qu’on ne la mette pas en doute : l’unité se paie du jugement personnel.",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Les pratiques religieuses reculent dans beaucoup de pays occidentaux depuis plus d’un siècle, et les églises s’y vident peu à peu.",
          "def",
          "Un constat, mais extérieur : la limite doit venir du lien religieux lui-même."
        ],
        [
          "Il existe de nombreuses religions différentes dans le monde.",
          "no",
          "Un fait, pas encore une limite : dites ce qu’il produit."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "Une communauté sans foi commune et des rites partagés sont compatibles : aucune contradiction ne les oppose nécessairement. Quelles pratiques peuvent instituer durablement ce lien sans lui donner un fondement religieux ?",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si la raison laisse un vide et que la religion divise, l’humanité peut-elle finalement se passer de toute religion ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Nous verrons pour finir qu’il faut un peu de raison et un peu de religion.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "Un lien n’a besoin d’être soustrait à l’examen que s’il repose sur une croyance ; des hommes peuvent aussi se relier par ce qu’ils examinent ensemble.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la science et ses preuves, la partie II sur la tradition, les rites et les fêtes qu’on partage en famille.",
          "def",
          "Proche, mais la science et la tradition déplacent le sujet : le jugement libre et le lien."
        ],
        [
          "De rien du tout : chacun peut vivre seul.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "Le fait que la religion ait assuré ces fonctions ne prouve pas qu’elle seule puisse les assurer. Une communauté peut reconnaître des droits et organiser une solidarité sans partager une révélation, un culte ou une autorité sacrée.",
          "ok",
          "Elle garde l’acquis de la partie I et celui de la partie II, et dit concrètement comment les tenir ensemble."
        ],
        [
          "On peut changer la religion plutôt que la quitter : une religion de la raison, sans révélation ni miracles, garderait ses rites et ses fêtes communes, mais n’exigerait plus de croire que ce que chacun peut comprendre par lui-même.",
          "def",
          "Défendable, mais elle renomme religion toute conviction commune, sans montrer qu’il faille encore du sacré."
        ],
        [
          "Il faut une religion modérée, qui ne demande pas trop de croire.",
          "no",
          "Un juste milieu sans raison : le problème reste entier."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "Une humanité sans religion est donc concevable, pourvu que ses institutions communes restent examinables. Reste que des principes discutables peuvent être sacralisés : un lien initialement ouvert à la critique peut devenir un dogme qui interdit de le contester.",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "Une humanité sans religion est donc concevable, pourvu que ses institutions communes restent examinables. Et comme des principes examinés en commun ne peuvent plus devenir des dogmes, ce lien restera ouvert à la critique aussi longtemps qu’il durera entre les hommes.",
          "def",
          "La réponse se croit complète : des principes d’abord discutés peuvent être sacralisés, au point d’interdire qu’on les conteste."
        ],
        [
          "On peut se passer de religion dans certains pays, et pas dans d’autres.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Des convictions assez fortes pour unir les hommes peuvent-elles rester ouvertes à l’examen qui les a fondées ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "Les religions finiront-elles un jour par disparaître de la surface de la Terre, ou renaîtront-elles toujours sous d’autres formes ?",
          "def",
          "Une question liée, mais qui ne part pas du reste de la réponse."
        ],
        [
          "La religion est un sujet délicat, sur lequel chacun a son opinion.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-ag-humanite-religion"
},
{
  "id": "nature-besoin",
  "sujet": "La nature a-t-elle besoin de nous ?",
  "notion": "La nature",
  "v": 3,
  "pb": "La nature a-t-elle besoin de nous, alors que ses processus ne nous doivent pas leur existence mais que nos actions peuvent désormais compromettre des formes déterminées de vie ?",
  "annale": "la-nature-a-t-elle-besoin-de-nous",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "La nature n’a pas besoin de nous, car elle se fait toute seule.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "La nature est bien plus grande et plus puissante que nous, comme le montrent les tempêtes et les séismes.",
          "def",
          "Une impression juste, mais pas encore une raison : dites pourquoi la puissance dispenserait du besoin."
        ],
        [
          "C’est nous qui avons besoin d’elle, et non l’inverse.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Aristote, dans la Physique (II, 1), définit la nature comme ce qui a en soi le principe de son mouvement, à la différence des objets fabriqués, qui le reçoivent de l’artisan.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "Les forêts autour de Tchernobyl ont repoussé sans aucun jardinier, dès que l’homme s’est retiré de la zone interdite.",
          "def",
          "Un bon exemple, mais il illustre plus qu’il ne renforce : pourquoi en irait-il toujours ainsi ?"
        ],
        [
          "Hans Jonas nous rend responsables de ce qui ne peut plus se protéger seul.",
          "no",
          "La référence défend la réponse contraire : gardez-la pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais une nature qui n’a besoin de personne survit aussi à nos destructions, et ce qui subsisterait après elles ne serait plus la nature que nous admirons.",
          "ok",
          "La limite vient de la réponse elle-même, poussée jusqu’au bout : c’est elle qui obligera à changer de réponse."
        ],
        [
          "La nature n’est pas toujours bonne pour l’homme : elle provoque aussi des catastrophes meurtrières, des famines, des épidémies qui ravagent des pays entiers.",
          "def",
          "Vrai, mais cela ne touche pas la question du besoin : la limite doit venir de la réponse elle-même."
        ],
        [
          "Les villes ont remplacé la nature dans beaucoup de régions.",
          "no",
          "Un constat, pas une limite."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "L’autonomie du vivant n’empêche pas certains milieux d’être dégradés par nos actes. Leur vulnérabilité suffit-elle à établir un besoin de nous ?",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "La nature qui se passe de nous est une puissance, mais nous savons défaire son ordre : elle a donc besoin de nous.",
          "def",
          "Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question."
        ],
        [
          "Voyons maintenant le point de vue des écologistes.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Notre capacité de détruire des milieux fait naître une responsabilité envers ce qui dépend désormais de nous.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Elle ne fait naître aucun devoir, mais un droit : puisque nous en sommes devenus les maîtres, nous pouvons en faire ce que nous voulons.",
          "def",
          "Une réponse, mais elle tire du pouvoir un droit au lieu d’un devoir : la partie II ne naît pas encore."
        ],
        [
          "Elle n’en fait naître aucun : la nature s’en remettra, comme toujours.",
          "no",
          "C’est revenir à la partie I au lieu d’en sortir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Descartes voulait nous rendre « comme maîtres et possesseurs de la nature » ; Hans Jonas, dans Le Principe responsabilité, en tire la conséquence : ce pouvoir nous rend responsables de ce qui ne peut plus se protéger seul.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "Nous avons rendu la nature fragile par notre puissance, et elle a désormais besoin de nous pour se maintenir en vie.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "Sans l’homme, la nature serait sauvage et désordonnée.",
          "no",
          "Excessif, et ce n’est pas le « oui » du sujet : il dit que la nature est devenue fragile."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais une protection qui dirige un milieu remplace ses processus par nos décisions : plus elle s’étend, plus elle supprime l’autonomie qu’elle voulait sauver.",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Protéger la nature coûte très cher, et les pays n’ont pas tous les moyens de le faire correctement, surtout les plus pauvres, qui ont d’autres urgences à régler.",
          "def",
          "Vrai, mais extérieur : la limite doit venir de l’idée de protection elle-même."
        ],
        [
          "Certains ne croient pas au changement climatique.",
          "no",
          "Hors sujet."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "La nature comme ensemble de processus et des écosystèmes dépendant d’interventions réparatrices ne sont pas contradictoires. Quel sens précis donner alors à « besoin » et au devoir humain de protection ?",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si elle se passe de nous et qu’elle devient pourtant fragile, la nature a-t-elle besoin de nous ou non ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Il faudra donc protéger un peu la nature, mais pas trop.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "Prendre soin d’un être n’est pas forcément le diriger : on peut lui rendre les conditions de son propre mouvement.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la biologie des espèces, la partie II sur la politique et l’écologie.",
          "def",
          "Proche, mais ces domaines déplacent le sujet : l’autonomie de la nature et notre responsabilité."
        ],
        [
          "Dans aucun sens : la nature et l’homme n’ont rien à voir.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "La nature comme ensemble de processus ne dépend pas de nous ; des milieux déterminés, que nous avons fragilisés, dépendent de nos choix : c’est à eux que le soin est dû.",
          "ok",
          "Elle garde l’acquis de la partie I et celui de la partie II, et dit concrètement comment les tenir ensemble."
        ],
        [
          "On peut renverser le rapport : ce n’est pas la nature qui a besoin de nous, ce sont seulement les hommes qui ont besoin d’elle pour vivre, respirer et se nourrir chaque jour.",
          "def",
          "Défendable, mais notre besoin de la nature ne supprime pas celui d’un milieu abîmé envers certains soins."
        ],
        [
          "Il faut protéger les espèces les plus belles, et laisser faire le reste.",
          "no",
          "Un tri sans raison : le problème reste entier."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "Le bon soin se mesure donc à son retrait possible : il vise un milieu qui puisse de nouveau se passer de nous. Reste que choisir le milieu à restaurer suppose un jugement humain : quelle autonomie préserver quand plusieurs formes de vie entrent en conflit ?",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "Le bon soin se mesure donc à son retrait possible : il vise un milieu qui puisse de nouveau se passer de nous. Il suffit alors de laisser faire la nature, qui choisira elle-même, mieux que nous, quelles formes de vie méritent d’être sauvées et restaurées.",
          "def",
          "La réponse se croit complète : choisir le milieu à restaurer suppose encore un jugement humain, quand plusieurs formes de vie entrent en conflit."
        ],
        [
          "La nature a parfois besoin de nous, et parfois non.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Au nom de quoi choisir le milieu à restaurer, si ce ne doit pas être au nom de nos seules préférences ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "L’homme fait-il lui-même partie de la nature, ou s’en est-il définitivement séparé par sa technique ?",
          "def",
          "Une vraie question, mais qui ne part pas du reste de la réponse."
        ],
        [
          "La nature est magnifique, et nous devons tous l’aimer et la respecter.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-g1-nature-besoin"
},
{
  "id": "heureux-autres",
  "sujet": "Peut-on être heureux quand les autres ne le sont pas ?",
  "notion": "Le bonheur",
  "v": 3,
  "pb": "Peut-on être heureux quand les autres ne le sont pas, sans confondre la joie qui nous arrive avec l’indifférence à leur malheur ?",
  "annale": "peut-on-etre-heureux-quand-les-autres-ne-le-sont-pas",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "On peut être heureux quand les autres ne le sont pas, car le bonheur dépend de nous.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "On peut être heureux quand les autres ne le sont pas, car on ne connaît jamais tout le malheur qu’il y a dans le monde.",
          "def",
          "Une raison, mais faible : l’ignorance n’est pas encore le bonheur. Cherchez ce qui le rend possible."
        ],
        [
          "On peut être heureux, à condition que ce bonheur reste ouvert aux autres.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Épictète, au début du Manuel, distingue ce qui dépend de nous, nos jugements et nos désirs, de ce qui n’en dépend pas.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "Certaines personnes restent sereines dans des situations très difficiles, même pendant une guerre ou une longue maladie.",
          "def",
          "Un bon exemple, mais il illustre plus qu’il ne renforce : pourquoi la sérénité serait-elle légitime ?"
        ],
        [
          "Rousseau voit dans la pitié un sentiment naturel qui nous fait souffrir de voir souffrir.",
          "no",
          "La référence défend la réponse contraire : gardez-la pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais si le malheur des autres ne dépend pas de moi, il ne doit plus me toucher : la sérénité qui suffit au bonheur exige de s’en détourner.",
          "ok",
          "La limite vient de la réponse elle-même, poussée jusqu’au bout : c’est elle qui obligera à changer de réponse."
        ],
        [
          "Il est difficile d’être heureux quand on regarde les informations tous les soirs à la télévision ou sur son téléphone, pleines de guerres et de misères.",
          "def",
          "Un constat juste, mais dites pourquoi : c’est le bonheur intérieur lui-même qui exige de détourner les yeux."
        ],
        [
          "Certaines personnes sont malheureuses par leur faute.",
          "no",
          "Hors sujet, et ce jugement ne montre pas la limite de la réponse."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "Une joie personnelle est possible, mais l’indifférence au malheur d’autrui interroge ce qu’elle vaut. Pourquoi la compassion devrait-elle entrer dans l’examen du bonheur ?",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "Ce bonheur ne dure qu’en détournant les yeux : il faut donc s’ouvrir au malheur des autres.",
          "def",
          "Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question."
        ],
        [
          "Voyons maintenant ce que pensent ceux qui sont touchés par le malheur des autres.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Le bonheur humain n’est pas celui d’un être isolé : nous vivons avec les autres, et leur sort fait partie du nôtre.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Oui, pour un temps : elle disparaît quand on voit souffrir, puis revient dès qu’on a oublié ce qu’on a vu et entendu.",
          "def",
          "Une réponse, mais elle garde l’oubli comme remède : la partie II ne naît pas encore."
        ],
        [
          "Oui, tout à fait : le malheur des autres ne dépend pas de nous.",
          "no",
          "C’est revenir à la partie I au lieu d’en sortir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Rousseau, dans le Discours sur l’origine de l’inégalité, voit dans la pitié un sentiment naturel qui nous fait souffrir de voir souffrir.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "Le malheur des autres nous touche, et notre bonheur ne peut pas rester entier.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "Il est égoïste d’être heureux tant que d’autres souffrent quelque part.",
          "no",
          "Excessif : la partie II dit que le malheur nous touche, pas que le bonheur est une faute."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais si le malheur d’autrui suffit à empêcher mon bonheur, personne ne sera jamais heureux, puisqu’il y a toujours des malheureux.",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Il est épuisant de penser sans cesse au malheur des autres, et cela finit par rendre malade celui qui ne pense plus à rien d’autre.",
          "def",
          "Vrai, mais c’est un effet pratique : la limite doit venir de la réponse elle-même."
        ],
        [
          "Certains malheurs sont plus graves que d’autres.",
          "no",
          "Un constat, pas une limite."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "On peut être joyeux et compatissant : cette coexistence ne constitue pas une solution nouvelle. Comment juger le bonheur qui dépend effectivement d’un tort infligé à d’autres ?",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si l’indifférence nous ferme et que la pitié nous accable, peut-on finalement être heureux ou non ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Nous verrons qu’il faut être heureux, mais pas trop.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "Être touché par le malheur d’autrui, c’est d’abord le reconnaître et y répondre, non le subir à son tour.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la sagesse antique, la partie II sur la morale chrétienne et moderne.",
          "def",
          "Proche, mais l’histoire des idées déplace le sujet : l’intériorité du bonheur et le lien aux autres."
        ],
        [
          "Aucun : le bonheur n’existe pas vraiment.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "Un bonheur peut alors inclure l’inquiétude et se prolonger en aide : la joie ne prouve ni l’ignorance ni l’approbation du malheur.",
          "ok",
          "Elle garde l’acquis de la partie I et celui de la partie II, et dit concrètement comment les tenir ensemble."
        ],
        [
          "On peut distinguer les proches et les lointains : le malheur de ceux que j’aime me touche, celui des inconnus ne m’oblige à rien du tout.",
          "def",
          "Défendable, mais la distance seule ne justifie ni l’indifférence ni la participation à une injustice."
        ],
        [
          "Il faut être heureux, mais un peu moins quand les autres souffrent.",
          "no",
          "Un juste milieu sans raison : le problème reste entier."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "Ce bonheur n’est donc ni clos ni impossible ; il ne donne pas pour autant le droit de profiter de la souffrance d’autrui. Reste le cas où mon bonheur repose matériellement sur une injustice subie par d’autres : leur porter de l’attention ne suffit plus.",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "Ce bonheur n’est donc ni clos ni impossible ; il ne donne pas pour autant le droit de profiter de la souffrance d’autrui. Il suffit alors de penser aux malheureux et de les plaindre sincèrement pour être heureux en toute justice et en paix.",
          "def",
          "La réponse se croit complète : si mon bonheur repose matériellement sur une injustice subie par d’autres, leur porter de l’attention ne suffit plus."
        ],
        [
          "On peut être heureux quand les autres ne le sont pas, selon les cas.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Que doit changer celui dont le bonheur dépend d’une injustice, pour que son souci d’autrui ne demeure pas une simple bonne conscience ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "Faut-il aider les autres pour être heureux soi-même, ou bien les aider pour eux seuls, sans rien attendre en retour, pas même de la gratitude ?",
          "def",
          "Une vraie question, mais qui ne part pas du reste de la réponse."
        ],
        [
          "Le bonheur est un bien précieux que chacun recherche toute sa vie.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-me-bonheur-autres"
},
{
  "id": "etat-injustice",
  "sujet": "Revient-il principalement à l’État de lutter contre l’injustice ?",
  "notion": "L’État",
  "v": 3,
  "pb": "Revient-il principalement à l’État de lutter contre l’injustice, alors qu’il doit garantir des droits communs mais peut aussi être l’auteur d’une injustice ?",
  "annale": "revient-il-principalement-a-l-etat-de-lutter-contre-l-injustice",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "Il revient principalement à l’État de lutter contre l’injustice, car lui seul en a la force.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "C’est l’État qui fait les lois, donc c’est à lui de les faire appliquer et de punir ceux qui ne les respectent pas.",
          "def",
          "Une raison, mais circulaire : dites pourquoi lutter contre l’injustice exige l’État."
        ],
        [
          "À l’État la force, aux citoyens le contrôle.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Hobbes, dans le Léviathan (chap. XIII), va plus loin : sans un pouvoir commun, il n’y a ni loi ni justice, seulement la guerre de chacun contre chacun.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "L’État punit les crimes, protège les plus faibles, corrige les inégalités par l’impôt et par les aides sociales.",
          "def",
          "Un bon exemple, mais il illustre plus qu’il ne renforce : pourquoi lui seul le pourrait-il ?"
        ],
        [
          "Thoreau refuse de payer l’impôt à un gouvernement qui soutient l’esclavage.",
          "no",
          "Il défend la réponse contraire : gardez-le pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais si l’État rend seul la justice possible, il en devient aussi le principal juge, et personne ne peut plus le juger quand ses propres lois sont injustes.",
          "ok",
          "La limite vient de la réponse elle-même, poussée jusqu’au bout : c’est elle qui obligera à changer de réponse."
        ],
        [
          "L’État coûte cher, et ses administrations sont souvent lentes et compliquées pour les citoyens, qui attendent parfois des années une simple réponse à leurs demandes.",
          "def",
          "Vrai, mais extérieur : la limite doit venir de la force de l’État elle-même."
        ],
        [
          "Certains pays n’ont pas d’État solide.",
          "no",
          "Un constat, pas une limite de la réponse."
        ]
      ]
    },
    {
      "p": "T1",
      "k": "transition",
      "q": "Quelle question, née de cette limite, fait passer à la partie II ?",
      "o": [
        [
          "L’État rend les droits opposables à tous, mais sa force ne démontre pas la justice de ses lois. Il faut donc examiner comment les citoyens peuvent contester une loi injuste.",
          "ok",
          "Une question brève, née de cette limite : elle fait passer à la partie II sans la donner d’avance."
        ],
        [
          "Quand la ségrégation fut loi en Alabama, ce sont les citoyens qui ont dû juger cette loi injuste, à la place de l’État.",
          "def",
          "Le diagnostic est juste, mais il répond déjà : la partie II est donnée avant d’être pensée. Faites-en une question."
        ],
        [
          "Voyons maintenant le rôle des citoyens dans la lutte contre l’injustice.",
          "no",
          "Une annonce : elle parle du devoir, pas du problème. Rien ne dit pourquoi on change de réponse."
        ]
      ]
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "La justice ne se réduit pas à la loi : on peut dire qu’une loi est injuste, et c’est même ainsi que les lois progressent.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Les juges, qui sont indépendants et peuvent condamner l’État lui-même quand il viole ses propres lois ou ses engagements.",
          "def",
          "Une bonne piste, mais les juges appliquent les lois : qui juge une loi injuste ?"
        ],
        [
          "Personne : l’État a toujours le dernier mot.",
          "no",
          "C’est revenir à la partie I au lieu d’en sortir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Antigone enterre son frère malgré l’interdit de Créon ; Thoreau, dans La Désobéissance civile (1849), refuse de payer l’impôt à un gouvernement qui soutient l’esclavage : tous deux opposent à la loi un jugement sur la loi.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "La lutte contre l’injustice revient d’abord aux citoyens, car eux seuls peuvent juger les lois.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "L’État est toujours injuste, et seuls les citoyens sont justes.",
          "no",
          "Excessif : la partie II dit que les citoyens jugent les lois, pas que l’État a toujours tort."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais, même sincères, des consciences opposées revendiquent des droits incompatibles : si leur jugement l’emporte sur la loi, celle-ci n’oblige plus que ceux qui l’approuvent.",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Les citoyens n’ont pas toujours le temps de s’engager, entre leur travail et leur famille, et laissent souvent à d’autres le soin de protester à leur place contre l’injustice.",
          "def",
          "Vrai, mais extérieur : la limite doit venir du jugement des citoyens lui-même."
        ],
        [
          "Les manifestations peuvent gêner la circulation.",
          "no",
          "Hors sujet."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "La force publique et la critique citoyenne peuvent coexister : leur réunion ne suffit pas à déterminer qui contrôle l’institution lorsqu’elle produit elle-même l’injustice. Comment rendre effectivement contestable la priorité de l’État ?",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si l’État peut être injuste et que les citoyens se vengent, faut-il finalement confier toute la lutte à l’État seul ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Il faudra donc partager la lutte à parts égales entre l’État et les citoyens.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "La force et le jugement ne se disputent la même tâche que si l’on confond garantir les droits et décider seul du juste : l’État garantit, le jugement des citoyens ne s’impose pas à sa place, il l’oblige à se réexaminer.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur l’ordre public que la police et les tribunaux maintiennent, la partie II sur la liberté de chacun de protester, de manifester et de faire grève quand il le juge bon.",
          "def",
          "Proche, mais l’ordre et la liberté déplacent le sujet : la force et le jugement."
        ],
        [
          "À personne : l’injustice fait partie du monde.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "La contestation juste se reconnaît donc à sa forme : publique, elle en appelle à la règle commune devant tous et demande une révision, non une exception pour soi.",
          "ok",
          "Elle garde l’acquis de la partie I et celui de la partie II, et dit concrètement comment les tenir ensemble."
        ],
        [
          "On peut renverser le rapport : c’est la mobilisation des citoyens qui rend possible une justice publique, et l’État ne fait ensuite qu’enregistrer leurs victoires.",
          "def",
          "Défendable, mais elle ne dit pas qui garantit durablement les droits une fois la mobilisation passée."
        ],
        [
          "Il faut un État ni trop fort ni trop faible.",
          "no",
          "Un juste milieu sans raison : le problème reste entier."
        ]
      ]
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "La force publique tient donc sa justice de ce qu’elle reste exposée à la contestation : l’État qui la reçoit se corrige sans cesser de garantir. Reste le cas où le pouvoir ferme les voies de contestation : les garanties dont dépend cette répartition des rôles ne peuvent plus être présupposées.",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "La force publique tient donc sa justice de ce qu’elle reste exposée à la contestation : l’État qui la reçoit se corrige sans cesser de garantir. Aucun pouvoir ne pourra donc plus fermer ces voies, puisque les citoyens veillent.",
          "def",
          "La réponse se croit complète : il reste le cas où le pouvoir ferme les voies de contestation, et où cette répartition des rôles ne peut plus être présupposée."
        ],
        [
          "C’est parfois à l’État de lutter, et parfois aux citoyens.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Lorsque l’État détruit les voies par lesquelles on pouvait le corriger, comment lui résister sans abandonner l’exigence d’une justice commune ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "Une société parfaitement juste est-elle possible, ou n’est-elle qu’un rêve que les hommes poursuivent depuis toujours sans jamais vraiment l’approcher ?",
          "def",
          "Une vraie question, mais qui ne part pas du reste de la réponse."
        ],
        [
          "La justice est l’affaire de tous, et chacun doit y contribuer.",
          "no",
          "Une formule vide : la conclusion transforme le reste en question."
        ]
      ]
    }
  ],
  "copie20": "2026-ag-etat-injustice"
}
],
niveau2: [
{
  "id": "prisonniers-langage",
  "sujet": "Sommes-nous prisonniers du langage ?",
  "notion": "Le langage",
  "v": 3,
  "pb": "Sommes-nous prisonniers du langage, lorsque les mots fixent des habitudes de pensée mais permettent aussi de les défaire et de les transformer ?",
  "annale": "sommes-nous-prisonniers-du-langage",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "Nous sommes prisonniers du langage, car nous pensons dans une langue reçue.",
          "ok",
          "Une réponse au sujet, avec sa raison : c’est un vrai point de départ."
        ],
        [
          "Il existe des mots qu’on ne peut pas traduire d’une langue à l’autre, même avec beaucoup d’effort et de patience.",
          "def",
          "Un fait, pas encore une raison : dites ce qu’il montre de notre pensée."
        ],
        [
          "Le langage est un milieu qui limite la pensée et la rend possible.",
          "no",
          "C’est déjà une troisième partie : vous tranchez avant d’avoir rien examiné."
        ]
      ]
    },
    {
      "p": "I",
      "k": "renforcer",
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Bergson, dans Le Rire (chap. III), va plus loin : les mots ne notent des choses que ce qu’elles ont de commun et d’utile, et nous cachent ce qu’elles ont de singulier.",
          "ok",
          "La référence ne décore pas : elle donne à la réponse sa forme la plus forte, en disant pourquoi elle vaut."
        ],
        [
          "Un enfant apprend sa langue maternelle sans jamais l’avoir choisie, et il ne pourra jamais tout à fait en changer.",
          "def",
          "Il montre une langue reçue, pas encore qu’elle enferme : il illustre plus qu’il ne renforce."
        ],
        [
          "Les poètes inventent des mots et des images que la langue n’avait pas.",
          "no",
          "Il défend la réponse contraire : gardez-le pour la partie II."
        ]
      ]
    },
    {
      "p": "I",
      "k": "limite",
      "w": 1,
      "q": "À vous : écrivez la limite de cette réponse, poussée jusqu’au bout. Une phrase.",
      "m": "Mais pour dire que les mots nous cachent les choses, il faut avoir aperçu, au moins un peu, ce qu’ils cachent."
    },
    {
      "p": "T1",
      "k": "transition",
      "w": 1,
      "q": "À vous : écrivez la transition, en une question ouverte née de cette limite. Une ou deux phrases.",
      "m": "Le langage oriente nos pensées, mais il rend aussi possible l’examen de ses propres usages. Comment exercer cette critique sans sortir de toute langue ?"
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Nous inventons des mots, nous sentons ce que la langue ne dit pas encore, nous traduisons d’une langue à l’autre : nous ne la subissons pas, nous la déplaçons.",
          "ok",
          "Elle répond à la question de transition : la partie II part de ce que la partie I perdait."
        ],
        [
          "Par la traduction, qui nous permet de passer d’une langue à une autre, de les comparer et de voir ce que chacune laisse dans l’ombre et que l’autre éclaire.",
          "def",
          "Un bon indice, mais partiel : dites ce qu’il montre de notre rapport à toute langue."
        ],
        [
          "Par une pensée pure, qui n’aurait besoin d’aucun mot pour penser.",
          "no",
          "C’est justement ce que la partie II devra exclure : ce sera sa limite."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "La poésie et la philosophie forcent la langue : elles créent des sens nouveaux avec des mots anciens, comme la métaphore, qui fait dire à un mot ce qu’aucun dictionnaire ne lui donnait.",
          "ok",
          "La référence porte la nouvelle réponse : elle montre pourquoi l’exigence de la partie II est nécessaire."
        ],
        [
          "Nous ne sommes pas prisonniers du langage : nous le travaillons, nous l’agrandissons.",
          "def",
          "C’est bien la position de la partie, mais énoncée, pas développée : montrez ce qu’elle permet de comprendre."
        ],
        [
          "Nous pouvons toujours choisir de nous taire, et personne ne peut nous en empêcher.",
          "no",
          "Le silence n’est pas une liberté de penser : la réponse est trop faible."
        ]
      ]
    },
    {
      "p": "II",
      "k": "limite",
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais cette liberté s’exerce toujours avec des mots : pour agrandir la langue, il faut encore parler.",
          "ok",
          "La limite vient encore de l’intérieur : la seconde réponse perd à son tour ce que la première gardait."
        ],
        [
          "Les grands poètes sont rares dans une génération, et la plupart d’entre nous parlent comme tout le monde.",
          "def",
          "Un constat : il ne montre pas la limite de la liberté elle-même."
        ],
        [
          "Des langues disparaissent chaque année dans le monde.",
          "no",
          "Hors sujet."
        ]
      ]
    },
    {
      "p": "T2",
      "k": "transition",
      "q": "Quelle question montre ce que les deux réponses supposaient ensemble ?",
      "o": [
        [
          "Ni l’obéissance à des règles communes ni l’invention de nouveaux usages n’abolissent l’autre. Comment leur articulation permet-elle une liberté de pensée effectivement partageable ?",
          "ok",
          "La question fait voir ce que les deux réponses supposaient ensemble : c’est ce point que la partie III transformera."
        ],
        [
          "Si la prison n’en est pas une et que la liberté reste dans les mots, sommes-nous prisonniers ou non ?",
          "def",
          "Elle repose la même alternative, et sa réponse tient en un mot : la partie III ne pourrait que choisir un camp."
        ],
        [
          "Nous verrons pour finir que le langage est à la fois une prison et une liberté.",
          "no",
          "Une annonce de compromis : elle parle du devoir et promet de couper la poire en deux."
        ]
      ]
    },
    {
      "p": "III",
      "k": "probleme",
      "q": "Revenir au problème : que supposaient ensemble les deux réponses, et comment le transformer ?",
      "o": [
        [
          "On peut être libre à l’égard d’un milieu sans en sortir, si l’on peut le transformer de l’intérieur.",
          "ok",
          "Elle ne choisit pas un camp : elle transforme ce que les deux réponses tenaient pour acquis."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la grammaire et ses règles, la partie II sur la littérature.",
          "def",
          "Proche, mais la grammaire et la littérature déplacent le sujet : la pensée et ses mots."
        ],
        [
          "Aucune des deux : le langage n’est qu’un outil pour communiquer avec les autres.",
          "no",
          "C’est jeter les deux parties : la troisième doit garder ce qu’elles ont établi."
        ]
      ]
    },
    {
      "p": "III",
      "k": "operation",
      "w": 1,
      "q": "Proposez en deux phrases une troisième réponse qui conserve ce que I et II ont établi.",
      "m": "Nous contestons une expression avec d’autres, comparons des traductions, définissons ce que l’usage confondait : la critique travaille les ressources du langage contre ses habitudes. Le langage est ainsi un milieu de la pensée, non sa prison : ses limites se déplacent à mesure qu’on parle."
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "Le langage est ainsi un milieu de la pensée, non sa prison : ses limites se déplacent à mesure qu’on parle. Reste que cette transformation dépend de ressources partagées : une expérience peut demeurer difficile à communiquer tant que d’autres ne reconnaissent pas les mots proposés.",
          "ok",
          "La réponse est nette, et son reste est dit : c’est lui que la conclusion reprendra."
        ],
        [
          "Le langage est ainsi un milieu de la pensée, non sa prison : ses limites se déplacent à mesure qu’on parle. Chacun peut donc dire désormais tout ce qu’il éprouve, et les autres le comprendront aussitôt.",
          "def",
          "La réponse se croit complète : une expérience reste difficile à communiquer tant que d’autres ne reconnaissent pas les mots proposés."
        ],
        [
          "Nous sommes parfois prisonniers du langage, et parfois libres, selon les cas.",
          "no",
          "On retombe dans le juste milieu : la réponse de la partie III est perdue."
        ]
      ]
    },
    {
      "p": "C",
      "k": "question",
      "q": "Quelle question finale naît de ce reste ?",
      "o": [
        [
          "Une pensée nouvelle peut-elle devenir commune avant que les mots qui la disent soient compris ?",
          "ok",
          "C’est le reste de la réponse, devenu question : le même problème, posé plus loin."
        ],
        [
          "Faut-il apprendre plusieurs langues étrangères pour mieux penser, et mieux voir les limites de la sienne ?",
          "def",
          "Une question liée, mais qui ne part pas du reste de la réponse."
        ],
        [
          "Le langage est ce qui distingue l’homme des animaux, depuis toujours.",
          "no",
          "Une affirmation, pas une question."
        ]
      ]
    }
  ],
  "copie20": "2026-asie-langage"
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
