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
  "pb": "Faut-il être inconscient pour être heureux, si l’insouciance livre le bonheur aux dangers qu’elle ignore, et si la lucidité ne voit les menaces qu’en perdant le repos ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Pascal, dans les Pensées, montre que les adultes font de même : ne pouvant guérir la mort et la misère, les hommes ont choisi de n’y point penser pour se rendre heureux, et se divertissent pour ne pas penser à leur condition.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Que vaut cette paix si elle nous prive des moyens de préserver ce qui nous rend heureux ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Reconnaître une maladie ou une injustice peut permettre d’agir au lieu de subir : la conscience ne vaut pas seulement par ce qu’elle trouble.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il vaut moins qu’un autre, mais c’est toujours mieux que d’être malheureux en sachant pourquoi.",
          "def",
          "Elle répond, mais garde l’ignorance comme un moindre mal : la partie II ne naît pas encore."
        ],
        [
          "Il faut tout savoir et tout comprendre pour être vraiment heureux.",
          "no",
          "Excessif : la partie II dit qu’il faut se savoir heureux, pas tout savoir."
        ]
      ]
    },
    {
      "p": "II",
      "k": "position",
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Mill, dans L’Utilitarisme, distingue la valeur des plaisirs de leur seule quantité : une vie d’exercice des facultés humaines ne s’évalue pas uniquement à son degré de satisfaction.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Mais si connaître un danger, c’est s’en inquiéter, plus la lucidité voit loin, plus elle trouve de quoi craindre.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Les gens lucides paraissent souvent inquiets ou mélancoliques, comme s’ils portaient tout le poids du monde.",
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
          "L’ignorance expose au danger, la connaissance peut entretenir la peur : quel usage du savoir pourrait contribuer à la paix ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder la paix recherchée sans entretenir l’ignorance des dangers.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur le plaisir, la partie II sur la connaissance du monde.",
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
          "Comprendre peut défaire une crainte trompeuse, plutôt qu’ajouter des menaces à celles que nous connaissons.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Distinguer ce qui dépend de nous de ce qui n’en dépend pas",
          "def",
          "Une piste à examiner : Les dommages réels ne deviennent pas indifférents par le seul fait de ne pas dépendre de nous"
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
          "La lucidité peut apaiser. Elle ne supprime pourtant pas la souffrance d’une perte réelle.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il ne faut donc pas être inconscient pour être heureux : une compréhension mieux réglée peut rendre le bonheur plus lucide et moins fragile. Cela ne signifie pas que tout savoir apaise. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste la souffrance liée à un mal réel, notamment la perte d’un proche : réfuter une peur imaginaire ne supprime pas cette douleur."
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
          "Lorsque la souffrance vient d’une perte réelle que comprendre ne supprime pas, comment la lucidité peut-elle encore contribuer au bonheur ?",
          "ok",
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "Le bonheur existe-t-il vraiment, ou n’est-il au fond qu’un rêve que les hommes poursuivent sans jamais l’atteindre ?",
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
  "pb": "Peut-on tirer la certitude d’avoir bien agi de son intention, aveugle aux effets de l’acte, ou de ses effets, qui livrent sa valeur au hasard ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Kant, dans les Fondements de la métaphysique des mœurs, affirme qu’une bonne volonté est bonne par elle-même, même si elle échoue.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Les intentions sont difficiles à prouver devant un tribunal, qui juge sur des faits et des témoignages.",
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
          "La bonne volonté ne rassure que celui qui se croit transparent à lui-même : qui possède ce savoir de soi que la certitude d’avoir bien agi supposait ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Bien agir, c’est aussi faire du bien dans le monde : une action qui blesse ne devient pas bonne parce qu’on la voulait bonne.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Les autres, qui voient nos actes de l’extérieur et peuvent parfois les juger mieux que nous-mêmes.",
          "def",
          "Une piste, mais elle déplace la certitude vers autrui sans montrer ce qui nous échappe."
        ],
        [
          "Celui qui a de bonnes intentions, puisqu’il sait ce qu’il a voulu faire.",
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
          "Kant lui-même reconnaît qu’on ne peut jamais savoir avec certitude si l’on a agi par devoir plutôt que par intérêt caché, et La Rochefoucauld, dans ses Maximes, montre l’amour-propre déguisé sous les vertus.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Les effets d’une action ne sont parfois connus que bien plus tard, des années après qu’on a agi.",
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
          "Comment justifier une décision morale si l’on ne peut en connaître avec certitude tous les motifs et tous les effets ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Si l’intention ne suffit pas et que le doute paralyse, peut-on finalement être certain d’avoir bien agi ?",
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Examiner intentions et effets sans exiger leur connaissance complète.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la morale, la partie II sur la psychologie.",
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
          "Distinguer certitude absolue et jugement justifié : comparer les raisons accessibles et accepter une révision.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Métamorphoser la certitude en engagement responsable",
          "def",
          "Une piste à examiner : Répondre de l’acte ne démontre pas sa bonté : risque de substitution du sujet"
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
          "Un jugement moral peut être justifié sans être infaillible. Un effet imprévisible peut le remettre en cause.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "On peut donc avoir des raisons solides de juger qu’on a bien agi, sans convertir cette assurance en certitude infaillible. Accepter d’en répondre rend ce jugement contrôlable ; cela ne prouve pas à soi seul la bonté de l’acte. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste qu’un effet imprévisible peut conduire à réviser l’appréciation d’un choix pourtant raisonnable au moment d’agir."
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
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "Faut-il toujours agir, même quand on n’est sûr de rien de ce qui va arriver ?",
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
  "pb": "La science doit-elle être utile, si l’utilité la détourne des vérités sans usage, et si ses vérités deviennent malgré elle des pouvoirs ?",
  "annale": "la-science-doit-elle-etre-utile",
  "etapes": [
    {
      "p": "I",
      "k": "installer",
      "q": "Quelle première réponse installer en partie I, avec sa raison ?",
      "o": [
        [
          "La science doit être utile, car c’est elle qui donne à l’homme le pouvoir de maîtriser la nature.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Qu’est-ce qui rend cette réponse la plus forte possible ?",
      "o": [
        [
          "Descartes l’annonçait dans le Discours de la méthode : une philosophie « pratique » doit nous rendre « comme maîtres et possesseurs de la nature ».",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Où cette réponse cède-t-elle, si on la pousse jusqu’au bout ?",
      "o": [
        [
          "Mais si la science doit être utile, c’est l’utilité qui choisit ses questions, et les recherches qui ne promettent rien sont abandonnées.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Certaines inventions scientifiques sont dangereuses pour l’humanité, comme la bombe atomique.",
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
          "Exiger de la science qu’elle serve, c’est la priver de ce qui servira : aucun calcul d’utilité n’aurait commandé la relativité, qui ne cherchait que le vrai. Par quoi la science vaut-elle donc d’abord ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Ce que la science cherche, c’est savoir comment sont les choses ; une science qui choisit ses vérités selon leur rendement cesse d’être une science.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Quel développement montre que cette exigence est nécessaire ?",
      "o": [
        [
          "Nietzsche, dans Humain, trop humain, montre que les méthodes de la science importent au moins autant que ses résultats : c’est en elles que tient l’esprit scientifique, qui ne croit que ce qui est prouvé.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Où cette deuxième réponse cède-t-elle à son tour ?",
      "o": [
        [
          "Mais la science ne connaît la nature qu’en agissant sur elle : l’expérience est déjà une intervention, avant toute application.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Les chercheurs ont besoin de beaucoup d’argent pour travailler et pour équiper leurs laboratoires.",
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
          "Une application prédéfinie peut étouffer la découverte ; une indépendance sans contrôle peut couvrir des pratiques dangereuses. Sur quoi la recherche doit-elle rendre des comptes pour rester libre ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Si l’utilité la trahit et que la vérité pure l’aveugle, la science doit-elle finalement être utile ou non ?",
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder la liberté de découvrir et justifier les moyens employés.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur l’économie du savoir, la partie II sur la culture générale.",
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
      "q": "Quelle opération permet de tenir les deux ensemble : renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé ? Plusieurs peuvent tenir : regardez ce que chacune laisse.",
      "o": [
        [
          "Distinguer la liberté des questions et la responsabilité des pratiques : contrôler les risques dès la recherche.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Distinguer recherche puis applications",
          "def",
          "Une piste à examiner : Reporte la responsabilité après des décisions et interventions déjà lourdes de conséquences"
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
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "L’application immédiate n’est pas exigible. Reste à contrôler une recherche dont les bénéfices et certains risques sont inconnus.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "La science n’a donc pas à être utile immédiatement pour être légitime ; elle doit rendre compte de ses moyens, de ses risques et des usages prévisibles, dès la recherche. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste la difficulté de juger publiquement une recherche dont ni les bénéfices ni certains risques ne sont encore connus."
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
          "Qui a qualité pour juger une recherche que seuls ses pairs comprennent, au nom de tous ceux qu’elle engage ?",
          "ok",
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "La science fera-t-elle un jour le bonheur de l’humanité, ou son malheur ?",
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
  "pb": "L’artiste maîtrise-t-il son œuvre comme un savoir-faire, qui ne laisse plus rien à inventer, ou l’invente-t-il à l’aveugle, sans plus en être l’auteur ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Certains artistes ratent des œuvres qu’ils avaient pourtant longuement préparées et mûries.",
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
          "Un métier qui saurait tout d’avance ne produirait que ce qu’il savait déjà : si la maîtrise achevée ne fabrique que des objets, où commence l’œuvre ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Là où l’inspiration vient, comme le croyaient les Grecs qui invoquaient les muses.",
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
          "Kant, dans la Critique de la faculté de juger, définit le génie comme le talent qui donne à l’art sa règle sans pouvoir l’expliquer : l’artiste ne sait pas dire comment il a produit son œuvre.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Le public ne comprend pas toujours les œuvres qu’il regarde, même les plus célèbres.",
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
          "Savoir tout d’avance ou ne rien savoir du tout : les deux réponses plaçaient le savoir de l’artiste avant le travail, où il ne pouvait être que complet ou nul. Quand ce savoir naît-il donc ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder la maîtrise du geste sans prévoir toute l’œuvre.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Le savoir de l’artiste évolue avec son travail : il juge et retravaille ce qu’il découvre.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Distinguer savoir technique et sens de l’œuvre",
          "def",
          "Une piste à examiner : Éclaire deux objets du savoir, mais explique moins directement comment l’invention devient un choix"
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
          "L’artiste sait à mesure qu’il fait. Le sens que d’autres donnent à l’œuvre peut encore lui échapper.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "L’artiste sait donc ce qu’il fait à mesure qu’il le fait, sans posséder tout le sens de ce qu’il produit. Il en est l’auteur par les choix qu’il assume dans cette découverte. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste que l’œuvre peut recevoir des significations que même ce jugement exercé pendant la création n’avait pas envisagées."
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
          "Jusqu’où le savoir de l’artiste peut-il porter sur son œuvre, si celle-ci continue de prendre sens dans des regards qu’il ne dirige pas ?",
          "ok",
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "L’art est-il vraiment utile à la société, ou n’est-il qu’un luxe pour quelques-uns ?",
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
  "pb": "Maîtriser ses paroles, est-ce ne plus dire que ce qu’on pensait déjà, et ne pas les maîtriser, est-ce cesser de pouvoir en répondre ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il arrive que l’émotion nous fasse dire des choses que nous regrettons ensuite, une fois calmés.",
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
          "Choisir les mots ne fixe ni toute la pensée qu’ils font naître ni leur compréhension par autrui : d’où vient cet écart entre l’intention et le sens ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "De l’inspiration du moment, qui vient on ne sait d’où et nous surprend nous-mêmes quand nous parlons.",
          "def",
          "Une image, mais elle n’explique rien : dites ce qui, dans la parole elle-même, nous dépasse."
        ],
        [
          "De notre volonté, qui choisit chaque mot avec soin.",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il est parfois utile de ne pas maîtriser ses paroles, pour être plus sincère avec les autres.",
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
          "Le sens n’est pas fixé par notre seule intention, mais il ne nous est pas totalement étranger : quel pouvoir pouvons-nous exercer dans cet écart ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder notre pouvoir de parler sans maîtriser toute réception.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la politesse, la partie II sur la psychologie de chacun.",
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
          "Distinguer le contrôle de ce qu’on dit et l’interprétation d’autrui ; préciser et corriger peut réduire les malentendus.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Inverser : la parole nous engage plutôt que nous la maîtrisons",
          "def",
          "Une piste à examiner : Réduit trop vite toute parole à la promesse et remplace la maîtrise par l’engagement"
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
          "La maîtrise est partielle. Une parole interprétée autrement peut produire des effets que sa correction ne défait pas.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Nous avons une maîtrise partielle de nos paroles, à exercer dans l’échange. En répondre ne remplace pas ce pouvoir ; cela oblige à le mettre en œuvre et à reconnaître ses limites. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste qu’une parole peut produire un effet irréversible avant que sa rectification soit entendue."
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
          "Comment répondre d’une parole dont on peut corriger le sens, mais dont on ne peut plus réparer tous les effets ?",
          "ok",
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "Faut-il parler moins pour mieux maîtriser ce que l’on dit, et se taire plus souvent ?",
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
  "pb": "Une humanité qui ne croit que ce qu’elle prouve peut-elle encore relier les hommes, et une humanité unie par la foi peut-elle rester faite d’hommes qui jugent par eux-mêmes ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Certains croyants refuseront toujours d’abandonner leur religion, quoi qu’on leur démontre et quoi qu’on leur explique.",
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
          "La raison gagne contre l’illusion et perd ce que l’illusion donnait, un sens devant la mort, un lien entre les hommes : d’où venait donc ce lien ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "De la famille et des amis, qui suffisent largement à relier les hommes entre eux, sans aucune religion ni aucun culte.",
          "def",
          "Une réponse, mais trop étroite : la question porte sur ce qui relie toute une communauté."
        ],
        [
          "De la raison, qui relie tous les hommes par des vérités communes.",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Les pratiques religieuses reculent dans beaucoup de pays occidentaux depuis un siècle.",
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
          "Celui qui renonçait au dieu croyait perdre le lien ; celui qui gardait le lien croyait devoir garder le dieu : tous deux confondaient la religion avec ce qu’elle assurait. De quoi l’humanité ne peut-elle donc se passer ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder l’autonomie humaine sans nier les fonctions des religions.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la science, la partie II sur la tradition, les rites et les fêtes.",
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
          "Distinguer les fonctions de lien et de sens de leurs formes religieuses : d’autres institutions peuvent les assumer.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Métamorphoser : une religion rationnelle commune",
          "def",
          "Une piste à examiner : Risque de renommer religion toute conviction commune, sans établir la nécessité du sacré"
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
          "Une humanité sans religion est concevable. Reste à savoir si ses formes communes recréent une autorité soustraite à la critique.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Une humanité sans religion est donc concevable : elle doit construire des institutions et des pratiques communes, mais leur caractère partagé ne suffit pas à en faire une religion. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste que des principes discutables peuvent être sacralisés : un lien initialement ouvert à la critique peut devenir un dogme qui interdit de le contester."
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
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "Les religions finiront-elles un jour par disparaître de la surface de la Terre ?",
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
  "pb": "La nature se fait-elle sans nous, ce qui l’abandonne à nos destructions, ou dépend-elle de nos soins, ce qui en fait notre ouvrage ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Aristote, dans la Physique, définit la nature comme ce qui a en soi le principe de son mouvement, à la différence des objets fabriqués, qui le reçoivent de l’artisan.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "La nature n’est pas toujours bonne pour l’homme : elle provoque aussi des catastrophes meurtrières, des famines, des épidémies.",
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
          "La nature qui se passe de nous est une puissance ; celle que nous admirons est un ordre, qui n’est ordre que pour nous, et que nous savons défaire : que nous impose ce pouvoir de la défaire ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Notre action peut menacer des espèces et des équilibres : certains milieux ne retrouveront pas leur autonomie si nous maintenons les causes de leur destruction.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il nous donne le droit d’en faire ce que nous voulons, puisque nous en sommes devenus les maîtres.",
          "def",
          "Une réponse, mais elle tire du pouvoir un droit au lieu d’un devoir : la partie II ne naît pas encore."
        ],
        [
          "Rien du tout : la nature s’en remettra, comme toujours.",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Protéger la nature coûte très cher, et les pays n’ont pas tous les moyens de le faire correctement, surtout les plus pauvres.",
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
          "Comment nos soins pourraient-ils permettre à un milieu de retrouver une autonomie, au lieu de l’en rendre toujours plus dépendant ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder l’autonomie des processus et soigner les milieux abîmés.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la biologie, la partie II sur la politique et l’écologie.",
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
          "Distinguer l’ensemble des processus naturels et les milieux particuliers ; protéger ceux-ci pour qu’ils retrouvent leur autonomie.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Inverser : seuls les hommes ont besoin de la nature",
          "def",
          "Une piste à examiner : Notre besoin ne supprime pas celui d’un milieu abîmé envers certains soins"
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
          "Certains milieux ont besoin de soins. Reste à choisir lesquels restaurer quand plusieurs formes de vie entrent en conflit.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "La nature n’a donc pas besoin de nous en un sens unique : certains milieux abîmés ont besoin de soins, dont la fin doit être leur autonomie plutôt que leur remplacement par notre ouvrage. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste que choisir le milieu à restaurer suppose un jugement humain : quelle autonomie préserver quand plusieurs formes de vie entrent en conflit ?"
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
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "L’homme fait-il lui-même partie de la nature, ou s’en est-il définitivement séparé ?",
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
  "pb": "Peut-on être heureux en fermant son bonheur au malheur des autres, qui cesse alors d’être humain, ou en l’y ouvrant, ce qui le rend impossible tant qu’il y a des malheureux ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Épictète, dans le Manuel, distingue ce qui dépend de nous, nos jugements et nos désirs, de ce qui n’en dépend pas.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il est difficile d’être heureux quand on regarde les informations tous les soirs à la télévision ou sur son téléphone.",
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
          "Le retrait peut protéger la paix, comme le jardin du vieux Turc de Candide ; que devient cette paix lorsqu’elle nous dispense de regarder la souffrance voisine ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il disparaît pour un moment, puis revient quand on a oublié ce qu’on a vu.",
          "def",
          "Une réponse, mais elle garde l’oubli comme remède : la partie II ne naît pas encore."
        ],
        [
          "Il continue tranquillement, puisque le malheur des autres ne dépend pas de nous.",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il est épuisant de penser sans cesse au malheur des autres, et cela finit par rendre malade.",
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
          "Défendu ou sacrifié, ce bonheur restait un avoir, que le malheur des autres menace : quel bonheur pourrait résister au malheur des autres ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder une possibilité de joie et le souci d’autrui.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la sagesse antique, la partie II sur la morale moderne.",
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
          "La compassion n’exige pas de reproduire toute souffrance : la joie peut demeurer attentive et se prolonger en aide.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Distinguer proches et lointains",
          "def",
          "Une piste à examiner : La distance seule ne justifie pas l’indifférence ni la participation à une injustice"
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
          "Un bonheur attentif est possible. Reste le cas où il dépend matériellement d’une injustice que l’attention ne corrige pas.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "On peut ainsi être heureux lorsque d’autres ne le sont pas, si ce bonheur reste compatible avec l’attention et l’action pour eux. Il ne faut pas confondre cette possibilité avec le droit de profiter de leur souffrance. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste le cas où mon bonheur repose matériellement sur une injustice subie par d’autres : leur porter de l’attention ne suffit plus."
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
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "Faut-il aider les autres pour être heureux soi-même, ou bien les aider pour eux, sans rien attendre en retour de leur part ?",
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
  "pb": "Confier d’abord à l’État la lutte contre l’injustice, est-ce soustraire ses lois à tout jugement, et la confier d’abord aux citoyens, est-ce priver la justice de force commune ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "C’est l’État qui fait les lois, donc c’est à lui de les faire appliquer.",
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
          "Hobbes, dans le Léviathan, va plus loin : sans un pouvoir commun, il n’y a ni loi ni justice, seulement la guerre de chacun contre chacun.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "L’État coûte cher, et ses administrations sont souvent lentes et compliquées pour les citoyens.",
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
          "L’État qui rend seul la justice possible en devient le seul juge : quand la ségrégation fut loi en Alabama, qui restait-il, au-dessus de lui, pour juger cette loi ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Antigone enterre son frère malgré l’interdit de Créon ; Thoreau refuse de payer l’impôt à un gouvernement qui soutient l’esclavage : tous deux opposent à la loi un jugement sur la loi.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Les citoyens n’ont pas toujours le temps de s’engager, entre leur travail et leur famille.",
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
          "La force publique peut protéger une loi injuste ; une conscience sincère peut défendre une exigence injuste. Comment donner force au droit sans soustraire cette force à la critique ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder la force commune et la possibilité de la critiquer.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur l’ordre public, la partie II sur la liberté de chacun de protester.",
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
          "Distinguer la garantie publique des droits et le jugement de leur justice : la force doit rester contestable.",
          "ok",
          "Ce choix conserve les deux exigences. Sa justification et les limites des autres propositions doivent être comparées ; le nom de l’opération ne suffit pas."
        ],
        [
          "Inverser : la mobilisation rend la justice publique possible",
          "def",
          "Une piste à examiner : Ne dit pas qui garantit durablement les droits après la mobilisation"
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
          "L’État garantit les droits sous contrôle. Reste le cas où il détruit les voies qui permettent de le corriger.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Il revient principalement à l’État de garantir la lutte contre l’injustice, mais cette responsabilité exige des contre-pouvoirs : les citoyens ne veillent pas seulement, ils participent à sa correction. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste le cas où le pouvoir ferme les voies de contestation : les garanties qui rendent ce partage juste ne peuvent plus être présupposées."
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
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "Une société parfaitement juste est-elle possible, ou n’est-elle qu’un rêve ?",
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
  "pb": "Nous dire prisonniers du langage suppose-t-il un point de vue hors de lui, et nous en dire libres, une pensée sans mots qui ne pourrait rien penser ?",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Bergson, dans Le Rire, va plus loin : les mots ne notent des choses que ce qu’elles ont de commun et d’utile, et nous cachent ce qu’elles ont de singulier.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "m": "Mais si nous pouvons dire que nous sommes enfermés, c’est que nous voyons les limites du langage : nous ne sommes donc pas entièrement prisonniers."
    },
    {
      "p": "T1",
      "k": "transition",
      "w": 1,
      "q": "À vous : écrivez la transition, en une question ouverte née de cette limite. Une ou deux phrases.",
      "m": "Pour savoir que les mots cachent les choses, il faut avoir aperçu ce qu’ils cachent : d’où vient ce regard que la prison n’enferme pas ?"
    },
    {
      "p": "II",
      "k": "exigence",
      "q": "Comment la partie II répond-elle d’abord à cette question ?",
      "o": [
        [
          "Nous inventons des mots, nous sentons ce que la langue ne dit pas encore, nous traduisons d’une langue à l’autre : nous ne la subissons pas, nous la déplaçons.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "De la traduction, qui nous permet de passer d’une langue à une autre et de les comparer.",
          "def",
          "Un bon indice, mais partiel : dites ce qu’il montre de notre rapport à toute langue."
        ],
        [
          "D’une pensée pure, qui n’aurait besoin d’aucun mot pour penser.",
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
          "Une limite dont on ne sort jamais et qu’on déplace sans cesse n’a plus rien d’un mur : comment nommer ce qui borne la pensée en la portant ?",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
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
      "q": "Revenir au problème : qu’est-ce que chacune des deux réponses avait compris ?",
      "o": [
        [
          "Garder les ressources d’une langue sans figer toute pensée.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Chacune avait raison à moitié : la partie I sur la grammaire, la partie II sur la littérature.",
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
      "q": "À vous : écrivez l’opération de la troisième partie (renverser le rapport, changer de niveau, ou réunir ce qu’on avait séparé), qui garde quelque chose de I et de II. Deux phrases.",
      "m": "Nous pouvons contester une expression avec d’autres expressions, expliquer un mot inconnu ou comparer des traductions. La critique n’exige donc pas de sortir de tout langage : elle travaille ses ressources contre ses habitudes. Reste que cette transformation dépend de ressources partagées : une expérience peut demeurer difficile à communiquer tant que d’autres ne reconnaissent pas les mots proposés."
    },
    {
      "p": "III",
      "k": "stabiliser",
      "q": "Que peut-on désormais affirmer, et que cette réponse ne règle-t-elle pas encore ?",
      "o": [
        [
          "Le langage permet de déplacer des limites. Une pensée reste difficile à partager si ses mots ne sont pas reconnus.",
          "ok",
          "Cette proposition reprend l’argument de la copie révisée ; vérifiez le lien avec la question précédente et sa limite."
        ],
        [
          "Le langage est ainsi un milieu de la pensée, dont certaines limites peuvent être déplacées. Dépendre de ses ressources n’équivaut pas à subir une prison immuable. La difficulté est donc entièrement réglée.",
          "def",
          "La réponse oublie sa propre limite : Reste que cette transformation dépend de ressources partagées : une expérience peut demeurer difficile à communiquer tant que d’autres ne reconnaissent pas les mots proposés."
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
          "La question reprend exactement la difficulté laissée par la réponse de III.3."
        ],
        [
          "Faut-il apprendre plusieurs langues étrangères pour mieux penser ?",
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
