# Source de la banque d'exemples (philosophie). Produit philosophie-exemples-data.js via verifier.
# sujets: {s: sujet exact, oui: ce que la scène montre pour la première réponse, non: pour la réponse contraire, aporie: pourquoi aucune ne suffit}
# partie: usage d'appoint (une seule réponse), avec les sujets où il sert.
E = []
def add(**k): E.append(k)

add(**{'id': 'phedre',
 'oeuvre': 'Phèdre',
 'auteur': 'Racine',
 'annee': 1677,
 'genre': 'Théâtre',
 'epoque': 'XVIIe siècle',
 'notions': ['langage', 'inconscient', 'conscience'],
 'scene': 'Phèdre révèle à sa nourrice Œnone son amour pour son beau-fils. Elle le désigne par sa '
          'mère, l’Amazone, sans prononcer son nom. Œnone nomme Hippolyte ; Phèdre lui attribue '
          'cette nomination.',
 'ref': 'Acte I, scène 3',
 'cit': {'t': 'C’est toi qui l’as nommé.',
         'qui': 'Phèdre',
         'src': 'fredracor/tei/racine-phedre.xml',
         'n': "C'est toi qui l'as nommé"},
 'sujets': [{'s': 'Avons-nous la maîtrise de nos paroles ?',
             'oui': 'Phèdre calcule chaque mot pour ne pas dire le nom.',
             'non': 'Et pourtant tout est dit : ses paroles avouent plus qu’elle ne voulait.',
             'aporie': 'Maîtriser ses mots ne l’empêche pas d’avouer ; ne pas les maîtriser ne la '
                       'décharge pas de l’aveu.'}],
 'partie': {'texte': 'L’aveu montre qu’une parole peut modifier une relation. Cette scène ne '
                     'compare pas deux actes et deux paroles de portée équivalente ; elle ne '
                     'prouve pas à elle seule « tout autant ».',
            'pour': ['Les paroles engagent-elles tout autant que les actes ?']}})

add(id='berenice', oeuvre='Bérénice', auteur='Racine', annee=1670, genre='Théâtre', epoque='XVIIe siècle',
    notions=['devoir','etat','bonheur'],
    scene="Titus vient de devenir empereur. Il aime Bérénice, reine étrangère, et elle l’aime en retour. Il lui annonce qu’il doit renoncer à l’épouser : selon lui, Rome refuse cette union.",
    ref='Acte IV, scène 5 : annonce de la séparation',
    cit=dict(t="Mais il ne s’agit plus de vivre, il faut régner.", qui='Titus', src='fredracor/tei/racine-berenice.xml', n="Mais il ne s'agit plus de vivre, il faut régner"),
    sujets=[dict(s='Agir par devoir est-ce agir contre son intérêt ?', oui="Titus sacrifie à Rome le bonheur de sa vie.", non="Mais régner est aussi ce qu’il a voulu : son devoir est sa propre grandeur.", aporie="S’il cède à l’amour, il trahit ce qu’il est ; s’il règne, il perd ce qui le faisait vivre."),
            dict(s='Suffit-il de faire son devoir ?', oui="Titus fait tout son devoir d’empereur, sans faiblir.", non="Ce devoir accompli détruit deux vies et ne lui laisse aucune paix.", aporie="Le devoir accompli ne rend ni juste envers Bérénice, ni heureux.")],
    partie=None)

add(id='cid', oeuvre='Le Cid', auteur='Corneille', annee=1637, genre='Théâtre', epoque='XVIIe siècle',
    notions=['devoir','liberte'],
    scene="Le père de Rodrigue a été giflé par le père de Chimène, celle que Rodrigue aime. Son père lui demande de le venger. Seul, Rodrigue délibère dans les stances.",
    ref='Acte I, scène 6 (les stances)',
    cit=dict(t="Faut-il laisser un affront impuni ?\nFaut-il punir le père de Chimène ?", qui='Rodrigue', src='fredracor/tei/corneillep-cid.xml', n="Faut-il laisser un affront impuni ? Faut-il punir le père de Chimène ?"),
    sujets=[dict(s='Qui peut me dire ce que je dois faire ?', oui="Son père le lui dit : venger l’honneur de la famille.", non="Mais personne ne peut choisir à sa place entre l’honneur et l’amour : il délibère seul.", aporie="L’ordre du père ne suffit pas à décider ; la délibération solitaire ne trouve aucune issue sans perte."),
            dict(s='Peut-on être libre quand on n’a pas le choix ?', oui="Rodrigue décide lui-même, au terme de sa délibération.", non="Les deux voies le condamnent à perdre Chimène ou l’honneur : il n’a pas vraiment le choix.", aporie="Il choisit, mais entre deux pertes ; il est contraint, mais c’est lui qui tranche.")],
    partie=None)

add(id='horace', oeuvre='Horace', auteur='Corneille', annee=1640, genre='Théâtre', epoque='XVIIe siècle',
    notions=['etat','devoir','justice'],
    scene="Rome et Albe règlent leur guerre par un combat de trois champions contre trois. Rome désigne Horace ; Albe, Curiace, son ami et le fiancé de sa sœur.",
    ref='Acte II, scène 3',
    cit=dict(t="Albe vous a nommé, je ne vous connais plus.", qui='Horace (Curiace lui répond : « Je vous connais encore, et c’est ce qui me tue. »)', src='fredracor/tei/corneillep-horace.xml', n="Albe vous a nommé, je ne vous connais plus. Curiace. Je vous connais encore, et c'est ce qui me tue"),
    sujets=[dict(s='Que devons-nous à l’État ?', oui="Horace lui doit tout, jusqu’à l’amitié : il cesse de connaître Curiace.", non="Curiace obéit aussi, mais refuse que l’État efface ce qu’il sent.", aporie="Tout donner fait d’Horace un héros inhumain ; garder son cœur ne dispense pas Curiace de combattre."),
            dict(s='L’individu doit-il se méfier de l’État ?', oui="L’État exige d’Horace qu’il tue son ami : il peut tout demander.", non="Mais sans ce combat, Rome et Albe continueraient la guerre et tueraient bien davantage.", aporie="L’État qui protège est le même qui exige l’inhumain.")],
    partie=None)

add(id='cinna', oeuvre='Cinna', auteur='Corneille', annee=1643, genre='Théâtre', epoque='XVIIe siècle',
    notions=['liberte','conscience','etat'],
    scene="Auguste découvre que Cinna, qu’il a comblé de bienfaits, conspire pour le tuer. Au lieu de le faire exécuter, il lui pardonne.",
    ref='Acte V, scène 3',
    cit=dict(t="Je suis maître de moi comme de l’univers ;\nJe le suis, je veux l’être.", qui='Auguste', src='fredracor/tei/corneillep-cinna.xml', n="Je suis maître de moi comme de l'univers; Je le suis, je veux l'être"),
    sujets=[],
    partie=dict(texte="La liberté comme maîtrise de soi, conquise contre sa propre colère : un exemple pour la partie qui fait de la liberté une victoire sur soi.", pour=['Suffit-il de se sentir libre pour l’être ?','Peut-on être libre sans être responsable ?']))

add(id='polyeucte', oeuvre='Polyeucte', auteur='Corneille', annee=1643, genre='Théâtre', epoque='XVIIe siècle',
    notions=['religion'],
    scene="Polyeucte, seigneur arménien converti au christianisme, brise les idoles du temple. Son beau-père, gouverneur romain, le somme de renoncer ; il refuse et meurt en martyr. Sa femme Pauline se convertit à son tour.",
    ref='Acte V, scène 3',
    cit=dict(t="Je n’adore qu’un dieu, maître de l’univers,", qui='Polyeucte', src='fredracor/tei/corneillep-polyeucte.xml', n="Je n'adore qu'un dieu, maître de l'univers"),
    sujets=[dict(s='La religion unit-elle ou sépare-t-elle les hommes ?', oui="La foi de Polyeucte finit par gagner Pauline : elle unit ceux qu’elle touche.", non="Mais elle l’arrache à sa femme, à son beau-père, à la cité, et le conduit à la mort.", aporie="Ce qui unit au-delà de tout sépare ici-bas, et ne réunit qu’au prix d’un martyre.")],
    partie=None)

add(id='misanthrope', oeuvre='Le Misanthrope', auteur='Molière', annee=1666, genre='Théâtre', epoque='XVIIe siècle',
    notions=['verite','langage'],
    scene="Oronte lit à Alceste un sonnet de sa composition et lui demande son avis. Philinte le flatte ; Alceste, après avoir longtemps tourné autour, finit par dire ce qu’il pense.",
    ref='Acte I, scènes 1 et 2',
    cit=dict(t="Je veux qu’on soit sincère, et qu’en homme d’honneur,\nOn ne lâche aucun mot qui ne parte du cœur.", qui='Alceste (I, 1)', src='fredracor/tei/moliere-misanthrope.xml', n="Je veux qu'on soit sincère, et qu'en homme d'honneur, On ne lâche aucun mot qui ne parte du cœur"),
    sujets=[dict(s='Toute vérité est-elle bonne à dire ?', oui="Alceste a raison : le sonnet est mauvais, et il le dit.", non="Mais il se fait un ennemi sans éclairer personne ; Philinte, qui ménage, ment.", aporie="Tout dire blesse sans éclairer ; choisir ce qu’on dit, c’est décider pour l’autre de ce qu’il peut entendre."),
            dict(s='Peut-on tout dire ?', oui="Alceste dit tout, et la comédie montre qu’il le peut.", non="Mais la vie en société devient impossible : il finit par la fuir.", aporie="On peut tout dire, mais on ne peut plus vivre avec les autres.")],
    partie=None)

add(id='domjuan', oeuvre='Dom Juan', auteur='Molière', annee=1665, genre='Théâtre', epoque='XVIIe siècle',
    notions=['liberte','devoir','bonheur'],
    scene="Dom Juan explique à son valet Sganarelle pourquoi il ne s’attache à aucune femme : tout le plaisir de l’amour est dans le changement.",
    ref='Acte I, scène 2',
    cit=dict(t="la constance n’est bonne que pour des ridicules", qui='Dom Juan', src='fredracor/tei/moliere-dom-juan.xml', n="la constance n'est bonne que pour des ridicules"),
    sujets=[],
    partie=dict(texte="La liberté qui refuse tout engagement, poussée jusqu’au bout : Dom Juan garde tous ses possibles et ne fait que recommencer. Un appui pour la partie qui défend, puis montre la limite, de la liberté sans engagement.", pour=['S’engager, est-ce renoncer à sa liberté ?','Peut-on être libre sans être responsable ?']))

add(id='tartuffe', oeuvre='Le Tartuffe', auteur='Molière', annee=1669, genre='Théâtre', epoque='XVIIe siècle',
    notions=['religion','verite'],
    scene="Tartuffe, faux dévot installé chez Orgon, joue la pudeur devant la servante Dorine, alors qu’il convoite la femme de son hôte. Cléante, dans la pièce, distingue la vraie dévotion de la fausse.",
    ref='Acte III, scène 2',
    cit=dict(t="Couvrez ce sein que je ne saurais voir.", qui='Tartuffe', src='fredracor/tei/moliere-tartuffe.xml', n="Couvrez ce sein que je ne saurais voir"),
    sujets=[dict(s='Peut-on critiquer la religion sans la rejeter ?', oui="Molière n’attaque que l’hypocrisie, et fait dire à Cléante ce qu’est une piété sincère.", non="Pourtant la pièce fut interdite plusieurs années : ridiculiser les faux dévots semblait atteindre la religion elle-même.", aporie="Critiquer l’usage de la religion, c’est toujours toucher à ce qu’elle prétend être.")],
    partie=None)

add(id='lorenzaccio', oeuvre='Lorenzaccio', auteur='Musset', annee=1834, genre='Théâtre', epoque='XIXe siècle',
    notions=['etat','liberte','devoir','conscience'],
    scene="Pour tuer le tyran Alexandre de Médicis, Lorenzo s’est fait son compagnon de débauche. Il sait que les républicains ne feront rien de sa liberté retrouvée ; il tuera quand même.",
    ref='Acte III, scène 3',
    cit=dict(t="Songes-tu que ce meurtre, c’est tout ce qui me reste de ma vertu ?", qui='Lorenzo, à Philippe Strozzi', src='fredracor/tei/musset-lorenzaccio.xml', n="songes-tu que ce meurtre, c'est tout ce qui me reste de ma vertu"),
    sujets=[dict(s='Au nom de quoi peut-on s’opposer à l’État ?', oui="Au nom de la liberté de Florence, qu’un tyran opprime.", non="Mais Lorenzo sait que Florence ne se libérera pas : il tue au nom de lui-même, pour sauver ce qui reste de sa vertu.", aporie="Au nom du peuple, l’acte est inutile ; au nom de soi, il n’est plus politique.")],
    partie=None)

add(id='antigone-sophocle', oeuvre='Antigone', auteur='Sophocle', annee=-441, genre='Théâtre', epoque='Antiquité',
    notions=['justice','etat','religion','devoir'],
    scene="Créon, roi de Thèbes, interdit d’enterrer Polynice, mort en attaquant la cité. Sa nièce Antigone, sœur du mort, l’enterre au nom des lois non écrites des dieux, et l’assume devant lui.",
    ref='Dialogue entre Créon et Antigone (traduction de Leconte de Lisle, 1877)',
    cit=dict(t="Je suis née non pour une haine mutuelle, mais pour un mutuel amour.", qui='Antigone, traduction de Leconte de Lisle', src='fredracor/tei/sophocle-antigone.xml', n="Je suis née non pour une haine mutuelle, mais pour un mutuel amour"),
    sujets=[dict(s='Est-il toujours injuste de désobéir aux lois ?', oui="Pour Créon, une cité où chacun choisit ses lois n’existe plus.", non="Antigone désobéit au nom d’une justice plus haute que l’édit d’un roi.", aporie="Obéir fait de Créon un tyran ; désobéir mène Antigone à la mort, et la cité au deuil."),
            dict(s='Au nom de quoi peut-on s’opposer à l’État ?', oui="Au nom des lois non écrites, qu’aucun roi n’a faites.", non="Mais Créon parle aussi au nom de la cité, qu’un traître a attaquée.", aporie="Chacun a une loi pour lui, et aucune ne l’emporte sans détruire l’autre.")],
    partie=None)

add(id='antigone-anouilh', oeuvre='Antigone', auteur='Anouilh', annee=1944, genre='Théâtre', epoque='XXe siècle',
    notions=['liberte','etat','devoir'],
    scene="Créon n’a pas voulu le pouvoir, mais il l’a accepté ; devenu roi, il doit faire appliquer son édit, même contre sa nièce. Antigone refuse tous les compromis qu’il lui offre et garde jusqu’au bout le pouvoir de dire non.",
    ref='La grande scène entre Créon et Antigone',
    cit=None,
    sujets=[dict(s='S’engager, est-ce renoncer à sa liberté ?', oui="Créon, engagé dans le pouvoir, ne peut plus reculer.", non="Antigone, qui refuse tout, n’est libre que de mourir.", aporie="S’engager enferme ; ne s’engager à rien ne construit rien. Et le refus d’Antigone était lui aussi une fidélité."),
            dict(s='Peut-on être libre quand on n’a pas le choix ?', oui="Antigone n’a plus le choix, et c’est elle qui paraît libre.", non="Créon répète qu’il n’a pas le choix, et c’est lui qui paraît esclave.", aporie="Celui qui dit ne pas avoir le choix s’en sert d’excuse ; celle qui l’a perdu en fait son destin.")],
    partie=None)

add(id='cyrano', oeuvre='Cyrano de Bergerac', auteur='Rostand', annee=1897, genre='Théâtre', epoque='XIXe siècle',
    notions=['liberte','art'],
    scene="Son ami Le Bret conseille à Cyrano de se trouver un protecteur puissant. Cyrano répond par la tirade des « Non, merci ! » : plutôt la pauvreté que la dépendance. Pendant quinze ans, pourtant, il reste lié à Roxane par un amour qu’il ne dit pas.",
    ref='Acte II, scène 8',
    cit=dict(t="Ne pas monter bien haut, peut-être, mais tout seul !", qui='Cyrano', src='fredracor/tei/rostand-cyrano.xml', n="Ne pas monter bien haut, peut-être, mais tout seul"),
    sujets=[dict(s='S’engager, est-ce renoncer à sa liberté ?', oui="Cyrano refuse tout protecteur pour rester libre.", non="Et pourtant il s’engage pour la vie envers Roxane, sans rien en attendre.", aporie="Libre de tous, il est lié à une seule ; et ce lien est peut-être sa liberté la plus haute.")],
    partie=None)

add(id='ruyblas', oeuvre='Ruy Blas', auteur='Hugo', annee=1838, genre='Théâtre', epoque='XIXe siècle',
    notions=['etat','justice'],
    scene="Ruy Blas, laquais devenu ministre par une machination, surprend les conseillers du roi d’Espagne en train de se partager les richesses du pays. Il les apostrophe.",
    ref='Acte III, scène 2',
    cit=dict(t="Bon appétit ! messieurs !", qui='Ruy Blas', src='fredracor/tei/hugo-ruy-blas.xml', n="Bon appétit ! messieurs !"),
    sujets=[],
    partie=dict(texte="L’État confisqué par ceux qui devraient le servir : un appui pour la partie qui montre pourquoi l’individu a raison de se méfier.", pour=['L’individu doit-il se méfier de l’État ?','L’État est-il un mal nécessaire ?']))

add(id='ile-esclaves', oeuvre='L’Île des esclaves', auteur='Marivaux', annee=1725, genre='Théâtre', epoque='XVIIIe siècle',
    notions=['justice','etat'],
    scene="Des maîtres naufragés échouent sur une île où d’anciens esclaves ont pris le pouvoir : maîtres et serviteurs y échangent leurs rôles, non pour punir les maîtres, mais pour les corriger.",
    ref='Scènes 1 et 2',
    cit=dict(t="Votre esclave ? Vous vous trompez, et l’on vous apprendra à corriger vos termes.", qui='Trivelin, au maître Iphicrate', src='fredracor/tei/marivaux-ile-des-esclaves.xml', n="Votre esclave ? Vous vous trompez, et l'on vous apprendra à corriger vos termes"),
    sujets=[dict(s='La justice n’est-elle qu’une vengeance déguisée ?', oui="Les esclaves pourraient humilier leurs maîtres à leur tour, et ils en ont envie.", non="L’île veut corriger, non punir, et la pièce finit sur le pardon.", aporie="Sans réparation, la justice n’est qu’un mot ; avec elle, elle frôle sans cesse la revanche."),
            dict(s='Une inégalité peut-elle être juste ?', oui="Inverser les rôles est une inégalité qui répare l’injustice passée.", non="Mais si les rôles s’inversent si facilement, aucune hiérarchie ne tenait au mérite.", aporie="L’inégalité corrige à condition de ne pas durer ; durable, elle redevient injuste.")],
    partie=None)

add(**{'id': 'valjean-eveque',
 'oeuvre': 'Les Misérables',
 'auteur': 'Hugo',
 'annee': 1862,
 'genre': 'Roman',
 'epoque': 'XIXe siècle',
 'notions': ['justice', 'religion', 'conscience', 'devoir'],
 'scene': 'Après dix-neuf ans de bagne — cinq pour le vol d’un pain, prolongés à cause de '
          'tentatives d’évasion — Jean Valjean dérobe l’argenterie de l’évêque qui l’a accueilli. '
          'Ramené par les gendarmes, il entend l’évêque affirmer qu’il la lui avait donnée et lui '
          'offrir aussi les chandeliers.',
 'ref': 'Tome I, livre II, chapitre 12',
 'cit': {'t': 'Jean Valjean, mon frère, vous n’appartenez plus au mal, mais au bien.',
         'qui': 'Mgr Myriel',
         'src': 'oe-hugo/hugo1862_miserables.xml',
         'n': "Jean Valjean, mon frère, vous n'appartenez plus au mal, mais au bien"},
 'sujets': [{'s': 'La justice n’est-elle qu’une vengeance déguisée ?',
             'oui': 'La peine, aggravée après des tentatives d’évasion, a laissé Valjean plein de '
                    'ressentiment.',
             'non': 'L’évêque montre une justice qui répare au lieu de punir.',
             'aporie': 'La sanction légale ne suffit pas ici à réinsérer ; le geste qui restaure '
                       'la confiance est une générosité que la loi ne peut imposer.'}],
 'partie': {'texte': 'Faire plus que son devoir : l’évêque donne plus qu’on ne lui a pris.',
            'pour': ['Peut-on faire plus que son devoir ?']}})

add(id='javert', oeuvre='Les Misérables', auteur='Hugo', annee=1862, genre='Roman', epoque='XIXe siècle',
    notions=['devoir','justice','conscience'],
    scene="Javert, policier qui n’a jamais transigé avec la loi, doit la vie à Jean Valjean, le forçat qu’il poursuit. Il le laisse partir. Incapable de vivre avec cette désobéissance, il se jette dans la Seine.",
    ref='Tome V, livre IV, « Javert déraillé »',
    cit=dict(t="Javert déraillé", qui='titre du livre', src='oe-hugo/hugo1862_miserables.xml', n="Javert déraillé"),
    sujets=[dict(s='Est-il toujours injuste de désobéir aux lois ?', oui="Pour Javert, oui : la loi est le juste, et il ne peut la trahir sans se trahir.", non="Mais livrer l’homme qui l’a sauvé serait monstrueux : il désobéit.", aporie="Obéir le rendrait inhumain ; désobéir détruit l’homme qu’il était."),
            dict(s='Suffit-il de faire son devoir ?', oui="Javert a toujours fait tout son devoir, sans une faute.", non="Le jour où le devoir et la justice se séparent, son devoir ne lui dit plus rien.", aporie="Le devoir suffit tant qu’on ne rencontre pas le juste ; après, il ne suffit plus à vivre.")],
    partie=None)

add(id='tempete-crane', oeuvre='Les Misérables', auteur='Hugo', annee=1862, genre='Roman', epoque='XIXe siècle',
    notions=['conscience','devoir'],
    scene="Devenu maire respecté sous un faux nom, Jean Valjean apprend qu’un innocent, Champmathieu, va être condamné à sa place. Toute une nuit, il se débat : se taire et rester utile à toute une ville, ou se dénoncer et retourner au bagne.",
    ref='Tome I, livre VII, chapitre 3, « Une tempête sous un crâne »',
    cit=dict(t="Une tempête sous un crâne", qui='titre du chapitre', src='oe-hugo/hugo1862_miserables.xml', n="Une tempête sous un crâne"),
    sujets=[dict(s='La conscience peut-elle être un fardeau ?', oui="Une nuit de torture : la conscience ne lui laisse aucun repos.", non="C’est elle pourtant qui sauve un innocent et fait de Valjean un homme juste.", aporie="Sans elle, il serait tranquille et coupable ; avec elle, il est juste et ne connaîtra plus la paix."),
            dict(s='Faut-il se méfier de sa conscience ?', oui="Elle lui souffle aussi de bonnes raisons de se taire : la ville a besoin de lui.", non="Mais c’est elle seule qui finit par lui montrer l’injustice qu’il allait laisser faire.", aporie="La même conscience fournit l’excuse et la condamnation.")],
    partie=None)

add(id='dernier-jour', oeuvre='Le Dernier Jour d’un condamné', auteur='Hugo', annee=1829, genre='Roman', epoque='XIXe siècle',
    notions=['justice','temps'],
    scene="Un condamné à mort, dont on ne saura jamais le crime, tient le journal de ses dernières semaines jusqu’à l’exécution.",
    ref='Chapitre 1',
    cit=dict(t="Condamné à mort ! Voilà cinq semaines que j’habite avec cette pensée,", qui='le narrateur', src='oe-hugo/hugo_dernier-jour-condame.xml', n="Condamné à mort ! Voilà cinq semaines que j'habite avec cette pensée"),
    sujets=[],
    partie=dict(texte="En taisant le crime, Hugo fait voir la peine seule : un appui pour la partie qui soupçonne la justice de vengeance.", pour=['La justice n’est-elle qu’une vengeance déguisée ?','Est-il possible de vivre au présent ?']))

add(**{'id': 'demain-aube',
 'oeuvre': 'Les Contemplations, « Demain, dès l’aube… »',
 'auteur': 'Hugo',
 'annee': 1856,
 'genre': 'Poésie',
 'epoque': 'XIXe siècle',
 'notions': ['temps'],
 'scene': 'Le poète annonce qu’il partira à l’aube, traversera la campagne sans rien regarder, '
          'pour aller déposer des fleurs sur la tombe de sa fille. Tout le poème lui parle comme '
          'si elle l’attendait.',
 'ref': 'Livre IV, poème 14',
 'cit': {'t': 'Demain, dès l’aube, à l’heure où blanchit la campagne,',
         'qui': 'Hugo',
         'src': 'oe-hugo/hugo_contemplations.xml',
         'n': "Demain, dès l'aube, à l'heure où blanchit la campagne"},
 'sujets': [],
 'partie': {'texte': 'Le poème met en scène la fidélité à une personne morte. Il ne démontre pas '
                     'que faire son deuil reviendrait à la trahir ; ne transformez pas un hommage '
                     'en preuve contre toute séparation avec le passé.',
            'pour': ['Faut-il enterrer le passé ?']}})

add(**{'id': 'ennemi',
 'oeuvre': 'Les Fleurs du mal, « L’Ennemi »',
 'auteur': 'Baudelaire',
 'annee': 1857,
 'genre': 'Poésie',
 'epoque': 'XIXe siècle',
 'notions': ['temps', 'art'],
 'scene': 'Le poète compare sa jeunesse à un jardin ravagé par l’orage. Il se demande si les '
          'fleurs qu’il rêve naîtront encore dans ce sol, avant de crier que le Temps dévore la '
          'vie.',
 'ref': 'Sonnet X',
 'cit': {'t': 'Ô douleur ! ô douleur ! Le Temps mange la vie,',
         'qui': 'Baudelaire',
         'src': 'oe-baudelaire/baudelaire_fleurs.xml',
         'n': 'Ô douleur ! ô douleur ! Le Temps mange la vie'},
 'sujets': [],
 'partie': {'texte': 'Le poème oppose les dégâts du temps à l’espoir d’une création future. Cet '
                     'espoir ne prouve pas encore que le temps est créateur : il peut soutenir une '
                     'objection, mais ne porte pas seul les deux réponses et leurs limites.',
            'pour': ['Le temps est-il nécessairement destructeur ?']}})

add(id='horloge', oeuvre='Les Fleurs du mal, « L’Horloge »', auteur='Baudelaire', annee=1857, genre='Poésie', epoque='XIXe siècle',
    notions=['temps'],
    scene="L’horloge parle et rappelle à l’homme que chaque seconde perdue est perdue pour toujours.",
    ref='Poème LXXXV',
    cit=dict(t="Souviens-toi que le Temps est un joueur avide\nQui gagne sans tricher, à tout coup !", qui='Baudelaire', src='oe-baudelaire/baudelaire_fleurs.xml', n="Souviens-toi que le Temps est un joueur avide Qui gagne sans tricher, à tout coup"),
    sujets=[],
    partie=dict(texte="Le temps qui ne nous appartient jamais : un appui pour la partie qui montre que nous ne le possédons pas.", pour=['Le temps nous appartient-il ?','Est-il possible de vivre au présent ?']))

add(id='bovary', oeuvre='Madame Bovary', auteur='Flaubert', annee=1857, genre='Roman', epoque='XIXe siècle',
    notions=['bonheur','verite','art'],
    scene="Mariée à Charles, Emma s’étonne de ne pas ressentir le bonheur que lui promettaient les romans de sa jeunesse. Elle cherchera toute sa vie à rejoindre ces mots.",
    ref='Première partie, fin du chapitre 5',
    cit=dict(t="Et Emma cherchait à savoir ce que l’on entendait au juste dans la vie par les mots de félicité, de passion et d’ivresse, qui lui avaient paru si beaux dans les livres.", qui='le narrateur', src='oe-flaubert/flaubert_bovary.xml', n="Et Emma cherchait à savoir ce que l'on entendait au juste dans la vie par les mots de félicité, de passion et d'ivresse, qui lui avaient paru si beaux dans les livres"),
    sujets=[dict(s='Un bonheur sans illusion est-il concevable ?', oui="Emma ne désire le bonheur qu’à travers les mots des livres : sans illusion, elle n’aurait rien à désirer.", non="Mais ces illusions la conduisent à la ruine et à la mort.", aporie="L’illusion donne au bonheur sa forme et le rend impossible ; sans elle, la vie de Yonville n’a plus rien d’heureux.")],
    partie=None)

add(id='education-fin', oeuvre='L’Éducation sentimentale', auteur='Flaubert', annee=1869, genre='Roman', epoque='XIXe siècle',
    notions=['temps','bonheur'],
    scene="Des années plus tard, Frédéric et son ami Deslauriers, qui ont manqué leurs ambitions et leurs amours, se rappellent une soirée ratée de leur adolescence : leur fuite d’une maison close.",
    ref='Troisième partie, chapitre 7 (dernières lignes)',
    cit=dict(t="C’est là ce que nous avons eu de meilleur !", qui='Frédéric', src='oe-flaubert/flaubert_education.xml', n="C'est là ce que nous avons eu de meilleur"),
    sujets=[],
    partie=dict(texte="Le passé embelli par le temps, au point qu’un échec devient le meilleur souvenir : un appui pour la partie sur le temps qui transforme ce qu’il garde.", pour=['Faut-il enterrer le passé ?','Le temps est-il nécessairement destructeur ?']))

add(id='assommoir', oeuvre='L’Assommoir', auteur='Zola', annee=1877, genre='Roman', epoque='XIXe siècle',
    notions=['travail','bonheur'],
    scene="Gervaise, blanchisseuse, confie à Coupeau son idéal de vie : travailler, manger, dormir à l’abri. Elle ouvrira sa boutique, en sera fière, puis perdra tout quand elle cessera de travailler.",
    ref='Chapitre 2',
    cit=dict(t="Mon idéal, ce serait de travailler tranquille, de manger toujours du pain, d’avoir un trou un peu propre pour dormir,", qui='Gervaise', src='oe-zola/zola1877_assommoir.xml', n="Mon idéal, ce serait de travailler tranquille, de manger toujours du pain, d'avoir un trou un peu propre pour dormir"),
    sujets=[dict(s='Ne travaille-t-on que pour subvenir à ses besoins ?', oui="L’idéal de Gervaise ne demande que du pain et un toit.", non="Mais sa boutique lui donne une fierté et une place parmi les autres ; quand elle cesse de travailler, c’est elle-même qu’elle perd.", aporie="Le travail n’est jamais seulement un gagne-pain ; et pourtant c’est bien la misère qui décide de tout."),
            dict(s='Dépend-il de nous d’être heureux ?', oui="Gervaise demande si peu que son bonheur semble à sa portée.", non="L’accident de Coupeau, l’alcool, la misère du quartier défont tout ce qu’elle a construit.", aporie="Même le plus modeste bonheur dépend de ce qu’on ne maîtrise pas.")],
    partie=None)

add(id='germinal', oeuvre='Germinal', auteur='Zola', annee=1885, genre='Roman', epoque='XIXe siècle',
    notions=['travail','justice','etat'],
    scene="À Montsou, les mineurs, payés de moins en moins, se mettent en grève contre la Compagnie. La grève les unit, puis la faim et l’armée les brisent.",
    ref='Quatrième et cinquième parties',
    cit=None,
    sujets=[dict(s='Le travail divise-t-il les hommes ?', oui="Il sépare la Compagnie, qui possède, des mineurs, qui descendent.", non="Mais la mine crée entre les mineurs une solidarité que la grève révèle.", aporie="Le travail unit ceux qu’il réunit dans la peine et les oppose à ceux qui en profitent.")],
    partie=None)

add(id='bete-humaine', oeuvre='La Bête humaine', auteur='Zola', annee=1890, genre='Roman', epoque='XIXe siècle',
    notions=['inconscient','conscience','liberte'],
    scene="Jacques Lantier, mécanicien, est saisi par moments d’une envie de tuer les femmes qu’il désire. Il ne la comprend pas, la combat, et finit par y céder.",
    ref='Chapitre 2',
    cit=dict(t="La famille n’était guère d’aplomb, beaucoup avaient une fêlure.", qui='le narrateur, à propos de Jacques', src='oe-zola/zola1890_bete-humaine.xml', n="La famille n'était guère d'aplomb, beaucoup avaient une fêlure"),
    sujets=[dict(s='L’idée d’inconscient remet-elle en cause la responsabilité ?', oui="Jacques est poussé par une force qu’il ne comprend pas et qu’il n’a pas choisie.", non="Mais il la connaît, la combat, et c’est bien lui qui tue.", aporie="Si tout vient de la fêlure, plus personne ne tue ; s’il est seul responsable, on ignore ce qui l’a poussé.")],
    partie=None)

add(id='rouge-miroir', oeuvre='Le Rouge et le Noir', auteur='Stendhal', annee=1830, genre='Roman', epoque='XIXe siècle',
    notions=['art','verite'],
    scene="Le narrateur se défend d’avance contre le reproche d’immoralité : son roman ne fait que montrer ce qui est sur la route.",
    ref='Livre II, chapitre 19',
    cit=dict(t="un roman est un miroir qui se promène sur une grande route.", qui='le narrateur', src='oe-stendhal/stendhal_rougenoir.xml', n="un roman est un miroir qui se promène sur une grande route"),
    sujets=[],
    partie=dict(texte="L’art comme reflet fidèle du réel : un appui pour la partie qui défend que l’œuvre montre le monde tel qu’il est, avant d’en montrer la limite (c’est le romancier qui choisit la route).", pour=['L’art peut-il nous apprendre à voir le monde autrement ?','La vérité est-elle affaire de point de vue ?']))

add(id='horla', oeuvre='Le Horla', auteur='Maupassant', annee=1887, genre='Récit', epoque='XIXe siècle',
    notions=['inconscient','conscience','liberte'],
    scene="Dans son journal, le narrateur sent qu’un être invisible boit son eau, lit ses livres et finit par vouloir à sa place. Il s’observe, se surveille, et ne comprend rien à ce qui le gouverne.",
    ref='Journal, 14 août',
    cit=dict(t="Je suis perdu ! Quelqu’un possède mon âme et la gouverne !", qui='le narrateur', src='oe-maupassant/maupassant_lehorla.xml', n="Je suis perdu ! Quelqu'un possède mon âme et la gouverne"),
    sujets=[dict(s='Suis-je le mieux placé pour me connaître ?', oui="Personne d’autre que lui ne peut tenir ce journal : il est seul à savoir ce qu’il vit.", non="Mais il ne sait rien de ce qui le fait agir.", aporie="Le plus proche de soi est aussi le plus aveugle à ce qui le gouverne."),
            dict(s='L’idée d’inconscient remet-elle en cause la responsabilité ?', oui="Il obéit à une volonté qui n’est pas la sienne.", non="Pourtant c’est lui qui décide de mettre le feu à sa maison pour tuer le Horla.", aporie="S’il est possédé, il n’est plus coupable ; s’il est coupable, il faut qu’il soit encore lui-même.")],
    partie=None)

add(id='chef-oeuvre', oeuvre='Le Chef-d’œuvre inconnu', auteur='Balzac', annee=1831, genre='Récit', epoque='XIXe siècle',
    notions=['art'],
    scene="Le vieux peintre Frenhofer travaille dix ans à un seul portrait. Quand il le montre, ses deux visiteurs ne voient qu’un amas de couleurs d’où sort, dans un coin, un pied parfait.",
    ref='Deuxième partie',
    cit=None,
    sujets=[dict(s='L’artiste sait-il ce qu’il fait ?', oui="Frenhofer possède le métier le plus sûr de son temps.", non="Il croit avoir peint le tableau parfait, et ne voit plus ce qu’il a peint.", aporie="Le savoir-faire ne lui dit pas ce qu’est son œuvre ; l’invention aveugle en fait un chaos."),
            dict(s='L’artiste est-il maître de son œuvre ?', oui="Dix ans de maîtrise, touche après touche.", non="L’œuvre lui a échappé au point qu’il ne la voit plus.", aporie="Plus il la maîtrise, moins il la voit.")],
    partie=None)

add(**{'id': 'oedipe',
 'oeuvre': 'Œdipe roi',
 'auteur': 'Sophocle',
 'annee': -429,
 'genre': 'Théâtre',
 'epoque': 'Antiquité',
 'notions': ['verite', 'inconscient', 'conscience'],
 'scene': 'Pour sauver Thèbes de la peste, Œdipe enquête sur le meurtre de l’ancien roi. Tirésias, '
          'puis Jocaste, le supplient d’arrêter ; il cherche jusqu’à découvrir qu’il a tué son '
          'père et épousé sa mère.',
 'ref': 'Toute la pièce',
 'cit': None,
 'sujets': [{'s': 'Peut-on résister à la vérité ?',
             'oui': 'Jocaste résiste : elle supplie Œdipe de ne pas chercher.',
             'non': 'Œdipe ne peut s’empêcher de chercher, et la vérité finit par éclater.',
             'aporie': 'Résister protège un bonheur faux ; chercher détruit tout et ne rend pas '
                       'plus libre.'},
            {'s': 'L’idée d’inconscient remet-elle en cause la responsabilité ?',
             'oui': 'Œdipe a tout fait sans savoir.',
             'non': 'Il se crève les yeux et répond de ce qu’il n’a pas voulu.',
             'aporie': 'L’ignorance l’excuse, et pourtant il ne s’excuse pas.'}],
 'partie': {'texte': 'Œdipe ignore des faits de son histoire : cette ignorance ne doit pas être '
                     'assimilée sans justification à l’inconscient psychanalytique.',
            'pour': []}})

add(id='hamlet', oeuvre='Hamlet', auteur='Shakespeare', annee=1603, genre='Théâtre', epoque='XVIIe siècle',
    notions=['devoir','conscience','verite'],
    scene="Le spectre de son père apparaît à Hamlet et lui ordonne de le venger de son oncle, devenu roi. Hamlet doute du spectre, fait jouer une pièce pour vérifier, et tarde à agir.",
    ref='Acte I, scène 5, et acte III, scène 2',
    cit=None,
    sujets=[dict(s='Qui peut me dire ce que je dois faire ?', oui="Le spectre de son père le lui ordonne.", non="Mais Hamlet ne peut se fier à cette voix : il doit vérifier seul.", aporie="L’ordre d’un autre ne suffit pas ; et la vérification sans fin l’empêche d’agir.")],
    partie=None)

add(id='candide', oeuvre='Candide', auteur='Voltaire', annee=1759, genre='Récit', epoque='XVIIIe siècle',
    notions=['bonheur','travail'],
    scene="Après avoir traversé guerres, tremblements de terre et esclavage, Candide et ses compagnons s’installent dans une petite métairie et se mettent à cultiver leur jardin.",
    ref='Chapitre 30',
    cit=None,
    sujets=[dict(s='Peut-on être heureux quand les autres ne le sont pas ?', oui="Le jardin donne enfin une forme de paix à ceux qui ont tout vu.", non="Mais il tourne le dos à un monde où l’on continue de souffrir.", aporie="Le bonheur du jardin naît d’avoir vu le malheur, et ne tient qu’en cessant de le regarder.")],
    partie=dict(texte="Le travail qui sauve de l’ennui et du désespoir : un appui pour la partie sur le travail qui humanise.", pour=['Le travail nous rend-il plus humain ?']))

add(id='frankenstein', oeuvre='Frankenstein', auteur='Mary Shelley', annee=1818, genre='Roman', epoque='XIXe siècle',
    notions=['technique','science'],
    scene="Victor Frankenstein parvient à animer un corps et s’enfuit, horrifié, dès que la créature ouvre les yeux. Plus tard, il accepte de lui fabriquer une compagne, puis la détruit avant de l’achever, de peur d’engendrer une race de monstres ; la créature se venge.",
    ref='Chapitre 5, puis chapitre 20',
    cit=None,
    sujets=[dict(s='Ce qui est techniquement possible est-il toujours souhaitable ?', oui="Victor fait ce qu’il peut faire, et ne sait plus quoi faire de ce qu’il a fait.", non="Quand il s’arrête, il décide encore seul, et trop tard : sa créature se venge sur ceux qu’il aime.", aporie="Tout réaliser le dépasse ; s’arrêter seul et trop tard ne répare rien.")],
    partie=None)

add(id='etranger', oeuvre='L’Étranger', auteur='Camus', annee=1942, genre='Roman', epoque='XXe siècle',
    notions=['verite','justice','conscience'],
    scene="Jugé pour un meurtre, Meursault refuse de dire ce qu’il ne ressent pas : il n’a pas pleuré à l’enterrement de sa mère et ne joue pas le repentir. Le procès finit par le juger sur cela plus que sur le meurtre.",
    ref='Deuxième partie',
    cit=None,
    sujets=[dict(s='Toute vérité est-elle bonne à dire ?', oui="Meursault ne dit que ce qu’il ressent ; il refuse le mensonge que tout le monde attend.", non="Mais sa sincérité le perd, et ne dit rien de vrai sur le meurtre lui-même.", aporie="Dire toute sa vérité le condamne ; mentir l’aurait sauvé sans rien éclairer.")],
    partie=None)

add(id='peste-rambert', oeuvre='La Peste', auteur='Camus', annee=1947, genre='Roman', epoque='XXe siècle',
    notions=['bonheur','devoir'],
    scene="Le journaliste Rambert, enfermé dans Oran par l’épidémie, veut à tout prix s’enfuir pour rejoindre la femme qu’il aime. Le jour où il le peut, il reste pour lutter contre la peste : il aurait honte d’être heureux seul.",
    ref='Deuxième à quatrième parties',
    cit=None,
    sujets=[dict(s='Peut-on être heureux quand les autres ne le sont pas ?', oui="Rambert a raison de vouloir son bonheur : rien ne l’oblige à mourir pour une ville étrangère.", non="Mais au moment de partir, il comprend qu’il ne pourrait pas être heureux en laissant les autres mourir.", aporie="Le bonheur fermé aux autres lui ferait honte ; ouvert à leur malheur, il doit attendre la fin de la peste.")],
    partie=None)

add(**{'id': 'rhinoceros',
 'oeuvre': 'Rhinocéros',
 'auteur': 'Ionesco',
 'annee': 1959,
 'genre': 'Théâtre',
 'epoque': 'XXe siècle',
 'notions': ['raison', 'liberte', 'verite'],
 'scene': 'À l’acte I, le Logicien présente des syllogismes défectueux : ses raisonnements sur les '
          'chats finissent par faire de Socrate un chat. La forme savante d’une démonstration '
          'masque une conclusion qui ne suit pas des prémisses.',
 'ref': 'Acte I : conversation du Logicien et du Vieux Monsieur',
 'cit': None,
 'sujets': [],
 'partie': {'texte': 'Distinguez la validité d’un raisonnement de son apparence savante. Ce '
                     'passage illustre une persuasion trompeuse ; il ne montre pas quelqu’un qui a '
                     'raison sans convaincre.',
            'pour': ['Suffit-il d’avoir raison pour convaincre ?']}})

add(id='guerre-troie', oeuvre='La guerre de Troie n’aura pas lieu', auteur='Giraudoux', annee=1935, genre='Théâtre', epoque='XXe siècle',
    notions=['langage','raison','etat'],
    scene="Hector, revenu de la guerre, fait tout pour éviter un nouveau conflit avec les Grecs ; il négocie avec Ulysse et obtient presque la paix. Au dernier moment, le poète Demokos appelle à la guerre ; Hector le frappe, et Demokos, mourant, accuse faussement le Grec Ajax : la guerre aura lieu.",
    ref='Acte II, dernières scènes',
    cit=None,
    sujets=[dict(s='Discuter, est-ce renoncer à la violence ?', oui="La négociation d’Hector et d’Ulysse évite presque la guerre.", non="Mais un mot, un mensonge, suffit à la déclencher.", aporie="La parole écarte la violence et peut aussi l’allumer ; on ne renonce jamais tout à fait à la violence en parlant.")],
    partie=None)

add(id='huis-clos', oeuvre='Huis clos', auteur='Sartre', annee=1944, genre='Théâtre', epoque='XXe siècle',
    notions=['conscience','liberte'],
    scene="Trois morts sont enfermés pour l’éternité dans un salon. Garcin veut qu’on le croie courageux ; mais les deux autres le jugent lâche, et il ne peut se défaire de leur regard.",
    ref='La fin de la pièce',
    cit=None,
    sujets=[dict(s='Suis-je le mieux placé pour me connaître ?', oui="Garcin seul connaît ses intentions.", non="Mais ses actes parlent contre lui, et ce sont les autres qui les voient.", aporie="Mes intentions n’appartiennent qu’à moi, mes actes appartiennent aux autres ; ni les unes ni les autres ne suffisent.")],
    partie=None)

add(**{'id': '1984',
 'oeuvre': '1984',
 'auteur': 'Orwell',
 'annee': 1949,
 'genre': 'Roman',
 'epoque': 'XXe siècle',
 'notions': ['langage', 'etat', 'verite'],
 'scene': 'Syme explique à Winston que la réduction du vocabulaire doit rendre certaines pensées '
          'impossibles. Winston peut encore comprendre ce projet dans la langue ancienne. Le roman '
          'distingue donc une ambition de contrôle et son accomplissement futur, encore incomplet.',
 'ref': 'Première partie, chapitre 5 : dialogue avec Syme',
 'cit': None,
 'sujets': [{'s': 'Sommes-nous prisonniers du langage ?',
             'oui': 'Syme veut supprimer les moyens de formuler une contestation.',
             'non': 'Winston comprend encore ce projet à partir de la langue ancienne.',
             'aporie': 'Le langage disponible conditionne ce qu’on formule ; ses ressources '
                       'peuvent aussi servir à critiquer une langue appauvrie.'}],
 'partie': {'texte': 'Le novlangue représente une tentative politique de limiter la pensée. La '
                     'capacité du narrateur ou de l’auteur à décrire cette tentative ne prouve pas '
                     'une sortie hors de tout langage.',
            'pour': ['Le langage déforme-t-il la pensée ?']}})

add(**{'id': 'douze-hommes',
 'oeuvre': 'Douze hommes en colère',
 'auteur': 'Sidney Lumet',
 'annee': 1957,
 'genre': 'Cinéma',
 'epoque': 'XXe siècle',
 'notions': ['raison', 'verite', 'justice'],
 'scene': 'Au premier vote, onze jurés déclarent l’accusé coupable. Le juré n° 8 demande une '
          'discussion. L’examen du couteau et des témoignages fait apparaître des doutes ; les '
          'jurés finissent par acquitter. Ils n’ont pas démontré l’innocence : la culpabilité '
          'n’est pas suffisamment établie.',
 'ref': 'Premier vote, examen des indices, vote final',
 'cit': None,
 'sujets': [{'s': 'Suffit-il d’avoir raison pour convaincre ?',
             'oui': 'Ses arguments démontent un à un les preuves.',
             'non': 'Il faut aussi de la patience, et parfois la colère des autres, pour qu’on '
                    'l’écoute.',
             'aporie': 'La raison seule ne convainc pas ; ce qui convainc en plus n’est plus '
                       'seulement la raison.'},
            {'s': 'Faut-il douter de tout ?',
             'oui': 'Le juré n°8 doute de ce qui semblait évident, et il a raison.',
             'non': 'Mais il ne doute pas de tout : il croit à la présomption d’innocence.',
             'aporie': 'Sans examen critique, on risque de condamner sans preuve suffisante ; sans '
                       'règle sur le doute raisonnable, on ne peut arrêter la délibération.'}],
 'partie': None})

add(id='temps-modernes', oeuvre='Les Temps modernes', auteur='Charlie Chaplin', annee=1936, genre='Cinéma', epoque='XXe siècle',
    notions=['travail','technique'],
    scene="Charlot serre des boulons sur une chaîne à une cadence qu’on accélère, jusqu’à être avalé par la machine. Le reste du film, il cherche pourtant du travail, car sans lui il n’a ni toit ni place.",
    ref='Ouverture du film',
    cit=None,
    sujets=[dict(s='Le travail nous rend-il plus humain ?', oui="Sans travail, Charlot n’a ni toit ni place parmi les autres.", non="La chaîne le réduit à un geste et le fait avaler par la machine.", aporie="Le travail humanise quand il demande un homme ; la chaîne n’en demande plus."),
            dict(s='La technique nous déshumanise-t-elle ?', oui="La machine impose son rythme et broie l’ouvrier.", non="Mais c’est l’organisation du travail, non la machine, qui fait de Charlot un rouage.", aporie="La technique déshumanise quand on la laisse décider seule de nos gestes.")],
    partie=None)

add(**{'id': 'matrix',
 'oeuvre': 'Matrix',
 'auteur': 'Lana et Lilly Wachowski',
 'annee': 1999,
 'genre': 'Cinéma',
 'epoque': 'XXe siècle',
 'notions': ['bonheur', 'verite', 'liberte'],
 'scene': 'Cypher a découvert que le monde où il vivait n’était qu’une illusion et que le monde '
          'réel est un désert. Il trahit ses compagnons pour être rebranché et tout oublier, en '
          'savourant un steak qu’il sait illusoire.',
 'ref': 'Scène du restaurant',
 'cit': None,
 'sujets': [{'s': 'Faut-il être inconscient pour être heureux ?',
             'oui': 'Cypher veut oublier la simulation pour en retrouver les plaisirs.',
             'non': 'Cet oubli exige de livrer ses compagnons et de renoncer à connaître les '
                    'conditions de sa vie.',
             'aporie': 'La lucidité peut rendre la vie douloureuse ; l’ignorance choisie peut '
                       'procurer du plaisir au prix de la liberté et de la confiance.',
             'limite1': 'Confondre plaisir et bonheur efface le prix humain de ce choix.',
             'limite2': 'Savoir que le monde est réel ne garantit pas qu’on y vive heureux.',
             'probleme': 'Faut-il renoncer à savoir pour vivre heureux, ou transformer les '
                         'conditions dans lesquelles la vérité devient pénible ?'}],
 'partie': {'texte': 'Le choix de Cypher illustre le désir d’une illusion confortable. Il ne '
                     'prouve ni que tout bonheur exige une illusion, ni que l’oubli empêche de '
                     'sentir du plaisir. Ici, inconscient signifie ignorant, pas inconscient au '
                     'sens psychanalytique.',
            'pour': ['Un bonheur sans illusion est-il concevable ?']}})

add(**{'id': 'truman',
 'oeuvre': 'The Truman Show',
 'auteur': 'Peter Weir',
 'annee': 1998,
 'genre': 'Cinéma',
 'epoque': 'XXe siècle',
 'notions': ['liberte', 'verite', 'bonheur'],
 'scene': 'Truman vit depuis sa naissance, sans le savoir, dans le décor d’une émission de '
          'télévision. Quand il le découvre, il doit choisir entre ce monde rassurant et la porte '
          'qui ouvre sur l’inconnu.',
 'ref': 'Fin du film',
 'cit': None,
 'sujets': [{'s': 'Suffit-il de se sentir libre pour l’être ?',
             'oui': 'Truman peut choisir dans le cadre de la ville où il vit.',
             'non': 'Le producteur a construit ce cadre pour empêcher son départ.',
             'aporie': 'Le choix vécu peut ignorer ses contraintes ; sortir du cadre apporte une '
                       'liberté qui ne garantit plus la sécurité offerte par ce monde.'}],
 'partie': {'texte': 'La découverte du dispositif permet à Truman de réexaminer les signes de '
                     'manipulation. Ne dites pas qu’il s’est toujours senti libre et heureux : son '
                     'désir de partir précède la révélation.',
            'pour': ['Peut-on résister à la vérité ?']}})

add(**{'id': 'sully',
 'oeuvre': 'Sully',
 'auteur': 'Clint Eastwood',
 'annee': 2016,
 'genre': 'Cinéma',
 'epoque': 'XXIe siècle',
 'notions': ['devoir'],
 'scene': 'Dans le film, après l’amerrissage sur l’Hudson, les simulations examinées pendant '
          'l’enquête font douter Sullenberger de sa décision. Le récit confronte un choix effectué '
          'sous pression aux possibilités reconstruites après coup. Cette mise en scène ne décrit '
          'pas à elle seule la conduite de l’enquête historique.',
 'ref': 'Enquête et simulations dans le film de Clint Eastwood',
 'cit': None,
 'sujets': [{'s': 'Peut-on être certain d’avoir bien agi ?',
             'oui': 'Il a décidé avec toute l’attention dont il était capable.',
             'non': 'Mais les effets d’une autre décision restent inconnus : les simulations le '
                    'font douter.',
             'aporie': 'L’intention droite ne garantit pas le meilleur effet ; les effets ne se '
                       'connaissent jamais tous.'}],
 'partie': None})

add(**{'id': 'zone-interet',
 'oeuvre': 'La Zone d’intérêt',
 'auteur': 'Jonathan Glazer',
 'annee': 2023,
 'genre': 'Cinéma',
 'epoque': 'XXIe siècle',
 'notions': ['bonheur', 'conscience'],
 'scene': 'Dans les scènes de jardin, la famille du commandant d’Auschwitz mène une vie domestique '
          'de l’autre côté du mur du camp. Les bruits provenant du camp troublent ce cadre '
          'apparemment paisible ; le jardin ne suffit pas à isoler moralement cette vie.',
 'ref': 'Scènes dans le jardin de la maison des Höss',
 'cit': None,
 'sujets': [],
 'partie': {'texte': 'Le bonheur qui ne tient qu’à condition d’un mur : un appui pour la partie '
                     'qui montre ce que devient un bonheur fermé au malheur des autres.',
            'pour': ['Peut-on être heureux quand les autres ne le sont pas ?',
                     'Peut-on être méchant et heureux ?']}})

add(**{'id': 'oppenheimer',
 'oeuvre': 'Oppenheimer',
 'auteur': 'Christopher Nolan',
 'annee': 2023,
 'genre': 'Cinéma',
 'epoque': 'XXIe siècle',
 'notions': ['science', 'technique', 'verite'],
 'scene': 'Dans le film, Oppenheimer rencontre Truman après Hiroshima et Nagasaki. Le physicien '
          'exprime sa responsabilité et craint une course aux armements ; le président revendique '
          'la décision d’employer la bombe. La fabrication et l’usage relèvent de pouvoirs '
          'distincts, sans que cela efface leurs relations.',
 'ref': 'Scénario final du 21 avril 2023, pages imprimées 141–143 : entretien avec Truman',
 'cit': None,
 'sujets': [{'s': 'Une vérité scientifique peut-elle être dangereuse ?',
             'oui': 'Un savoir sur la matière permet la conception d’une arme.',
             'non': 'Une proposition vraie ne décide pas elle-même de son usage militaire.',
             'aporie': 'Séparer le savoir de ses usages peut exonérer trop vite les chercheurs ; '
                       'les confondre ferait de toute connaissance de la matière une arme.'},
            {'s': 'Le développement des sciences est-il recherche du savoir ou de la puissance ?',
             'oui': 'Comprendre les phénomènes rend possible une réalisation technique.',
             'non': 'Le financement et les décisions militaires orientent les recherches.',
             'aporie': 'Le savoir sans moyens risque de rester impuissant ; la recherche commandée '
                       'par la puissance risque de perdre la maîtrise de ses buts.'}],
 'partie': {'texte': 'L’usage militaire met en question la valeur de l’utilité recherchée. Il ne '
                     'prouve pas que toute utilité est mauvaise ni que ces chercheurs ignoraient '
                     'fabriquer une arme.',
            'pour': ['La science doit-elle être utile ?']},
 'source': {'url': 'https://assets.scriptslug.com/live/pdf/scripts/oppenheimer-2023.pdf?v=1729114966',
            'label': 'Scénario original de Christopher Nolan, copie publique',
            'portee': 'Entretien avec Truman dans le récit cinématographique'}})

add(**{'id': '2001',
 'oeuvre': '2001 : l’Odyssée de l’espace',
 'auteur': 'Stanley Kubrick',
 'annee': 1968,
 'genre': 'Cinéma',
 'epoque': 'XXe siècle',
 'notions': ['technique', 'conscience'],
 'scene': 'Dans la séquence préhistorique, un hominidé utilise un os comme outil et arme. Un '
          'raccord de montage rapproche l’os lancé d’un engin spatial. Plus tard, HAL tue des '
          'membres de l’équipage ; Bowman doit déconnecter ses fonctions supérieures.',
 'ref': '« L’aube de l’humanité » ; mission du Discovery et déconnexion de HAL',
 'cit': None,
 'sujets': [{'s': 'Sommes-nous maîtres du progrès technique ?',
             'oui': 'Les humains ont conçu un vaisseau et un ordinateur capables de conduire une '
                    'mission lointaine.',
             'non': 'La délégation à HAL met l’équipage en danger ; Bowman doit reprendre le '
                    'contrôle par une intervention risquée.',
             'aporie': 'Déléguer étend nos capacités mais crée une dépendance ; tout contrôler '
                       'directement ferait perdre le bénéfice de cette délégation.'}],
 'partie': {'texte': 'La séquence de l’os représente l’apparition d’un outil ; elle ne démontre '
                     'pas l’exclusivité humaine de la technique. L’autonomie de HAL ne suffit pas '
                     'non plus à réfuter cette exclusivité : HAL est fabriqué par des humains.',
            'pour': ['La technique est-elle le propre de l’homme ?']}})

add(id='blade-runner', oeuvre='Blade Runner', auteur='Ridley Scott', annee=1982, genre='Cinéma', epoque='XXe siècle',
    notions=['technique','conscience','nature'],
    scene="Deckard est chargé d’abattre des réplicants, des êtres fabriqués qui veulent vivre plus longtemps. À la fin, le réplicant Roy, qui pourrait le tuer, lui sauve la vie avant de mourir.",
    ref='Scène finale sur le toit',
    cit=None,
    sujets=[dict(s='La technique nous déshumanise-t-elle ?', oui="Deckard tue froidement des êtres qui souffrent, parce qu’ils sont fabriqués.", non="Roy, la créature technique, se montre à la fin plus humain que l’homme.", aporie="La technique ne déshumanise pas par elle-même : elle révèle ce que nous faisons de l’humain.")],
    partie=None)

add(**{'id': 'gattaca',
 'oeuvre': 'Bienvenue à Gattaca',
 'auteur': 'Andrew Niccol',
 'annee': 1997,
 'genre': 'Cinéma',
 'epoque': 'XXe siècle',
 'notions': ['nature', 'technique', 'science'],
 'scene': 'Vincent, conçu sans sélection génétique, est déclaré peu apte par les prévisions '
          'attachées à son profil. Pour accéder au programme spatial, il utilise les échantillons '
          'biologiques et l’identité de Jerome. Le contrôle des traces biologiques remplace '
          'l’examen de ce qu’il peut effectivement accomplir.',
 'ref': 'Prévisions à la naissance ; contrôles biologiques de recrutement et d’accès',
 'cit': None,
 'sujets': [{'s': 'Ce qui est naturel est-il normal ?',
             'oui': 'La société du film fait de prévisions biologiques une norme d’aptitude.',
             'non': 'Cette norme valorise pourtant des naissances sélectionnées et exclut Vincent, '
                    'conçu sans intervention.',
             'aporie': 'Identifier le normal à une prévision biologique transforme une probabilité '
                       'en destin ; récuser toute prévision empêcherait aussi de prendre en compte '
                       'des risques réels.'}],
 'partie': None})

add(**{'id': 'into-the-wild',
 'oeuvre': 'Into the Wild',
 'auteur': 'Sean Penn',
 'annee': 2007,
 'genre': 'Cinéma',
 'epoque': 'XXIe siècle',
 'notions': ['nature', 'bonheur', 'liberte'],
 'scene': 'Dans le film, Chris cherche à vivre loin de la société, dans un bus abandonné en '
          'Alaska. L’isolement l’expose à des difficultés de subsistance et l’empêche de rejoindre '
          'facilement les autres. Son désir d’indépendance ne supprime pas ses besoins matériels '
          'et relationnels.',
 'ref': 'Tout le film',
 'cit': None,
 'sujets': [],
 'partie': {'texte': 'Le séjour de Chris interroge l’idéal d’une vie sauvage. Sa mort ne prouve '
                     'pas une essence humaine qui imposerait de vivre en société ; distinguez '
                     'nature extérieure, besoins du vivant et idéal de vie.',
            'pour': ['Qu’est-ce que vivre conformément à la nature ?']}})

add(id='hannah-arendt', oeuvre='Hannah Arendt', auteur='Margarethe von Trotta', annee=2012, genre='Cinéma', epoque='XXIe siècle',
    notions=['devoir','justice','conscience'],
    scene="La philosophe assiste au procès d’Eichmann, organisateur des déportations. Elle s’attend à un monstre et découvre un fonctionnaire qui répète qu’il n’a fait qu’obéir aux lois et faire son devoir.",
    ref='Les scènes du procès',
    cit=None,
    sujets=[dict(s='Peut-on faire son devoir par habitude ?', oui="Eichmann l’a fait : il a appliqué les ordres sans jamais penser.", non="Mais ce « devoir » sans pensée est devenu un crime : ce n’était plus un devoir.", aporie="L’habitude rend le devoir possible et peut le vider de toute moralité."),
            dict(s='Pour être juste, suffit-il d’obéir aux lois ?', oui="Eichmann a obéi à toutes les lois de son État.", non="Et c’est cette obéissance même qui fait de lui un criminel.", aporie="Sans lois, aucune justice ; avec la seule obéissance, la pire injustice.")],
    partie=None)

add(id='rosa-parks', oeuvre='Rosa Parks à Montgomery (1955)', auteur='Histoire', annee=1955, genre='Histoire', epoque='XXe siècle',
    notions=['justice','etat'],
    scene="Rosa Parks refuse de céder sa place à un passager blanc, comme l’exige la loi. Arrêtée par la police de l’État, elle voit un an plus tard, après un long boycott, la Cour suprême déclarer la ségrégation dans les bus contraire à la Constitution.",
    ref='1er décembre 1955 – décembre 1956',
    cit=None,
    sujets=[dict(s='Revient-il principalement à l’État de lutter contre l’injustice ?', oui="C’est la Cour suprême, une institution de l’État, qui met fin à la ségrégation.", non="Mais l’État était l’auteur de l’injustice : il n’a changé que parce que des citoyens ont refusé ses lois.", aporie="Confier la justice à l’État, c’est donner à sa force le dernier mot ; la confier aux citoyens, c’est la priver de force."),
            dict(s='Est-il toujours injuste de désobéir aux lois ?', oui="La loi de l’Alabama était claire, et Rosa Parks l’a enfreinte.", non="C’est cette désobéissance qui a rendu la loi plus juste.", aporie="La désobéissance n’a été juste que parce qu’un État de droit pouvait l’entendre.")],
    partie=None)

add(id='tchernobyl', oeuvre='La zone de Tchernobyl', auteur='Histoire', annee=1986, genre='Histoire', epoque='XXe siècle',
    notions=['nature','technique'],
    scene="Après la catastrophe de 1986, les hommes ont évacué la région. Quelques décennies plus tard, la forêt a envahi les rues de Pripiat, et loups, élans et sangliers y vivent en nombre.",
    ref='Depuis 1986',
    cit=None,
    sujets=[dict(s='La nature a-t-elle besoin de nous ?', oui="Nous parlons de « sauver la planète », comme si elle dépendait de nous.", non="Là où l’homme s’est retiré, elle n’a pas attendu qu’on la sauve.", aporie="Confiée à nos soins, elle n’est plus ce qui se fait sans nous ; livrée à elle-même, sur un sol que nous avons empoisonné, elle n’est plus tout à fait sans nous."),
            dict(s='Peut-on à la fois préserver et dominer la nature ?', oui="La centrale était une domination technique de la nature.", non="La catastrophe a détruit le milieu qu’elle devait servir ; la nature n’a repris que sans nous.", aporie="Dominer menace ce qu’on veut préserver ; préserver semble exiger de se retirer.")],
    partie=None)

add(**{'id': 'fete-etre-supreme',
 'oeuvre': 'La fête de l’Être suprême (1794)',
 'auteur': 'Histoire',
 'annee': 1794,
 'genre': 'Histoire',
 'epoque': 'XVIIIe siècle',
 'notions': ['religion', 'etat'],
 'scene': 'La Révolution célèbre la Raison à Notre-Dame en novembre 1793 ; le 8 juin 1794, '
          'Robespierre préside la fête de l’Être suprême. Deux jours plus tard, la loi du 22 '
          'prairial supprime presque toute défense devant le Tribunal révolutionnaire.',
 'ref': 'Novembre 1793 – juin 1794',
 'cit': None,
 'sujets': [],
 'partie': {'texte': 'La fête illustre un projet de culte civique, pas l’impossibilité d’une '
                     'humanité sans religion. Les projets révolutionnaires de la Raison et de '
                     'l’Être suprême ne se confondent pas ; leur succession ne prouve pas que sans '
                     'religion rien ne relie les hommes.',
            'pour': ['Peut-on concevoir une humanité sans religion ?']}})

add(**{'id': 'promethee',
 'oeuvre': 'Le mythe de Prométhée',
 'auteur': 'Platon, Protagoras',
 'annee': -390,
 'genre': 'Mythe',
 'epoque': 'Antiquité',
 'notions': ['technique', 'nature', 'etat'],
 'scene': 'Épiméthée a distribué toutes les qualités aux animaux et n’a rien laissé à l’homme, nu '
          'et sans défense. Prométhée vole aux dieux le feu et les arts ; mais les hommes, faute '
          'de savoir vivre ensemble, s’entretuent, et Zeus doit leur donner la justice.',
 'ref': 'Protagoras, 320c-322d',
 'cit': None,
 'sujets': [],
 'partie': {'texte': 'Le mythe distingue savoir technique et capacité politique. Il ne constitue '
                     'pas une preuve empirique de l’exclusivité humaine de la technique ; les arts '
                     'techniques y sont d’ailleurs volés aux dieux.',
            'pour': ['La technique est-elle le propre de l’homme ?']}})

add(**{'id': 'sisyphe',
 'oeuvre': 'Le Mythe de Sisyphe',
 'auteur': 'Camus',
 'annee': 1942,
 'genre': 'Essai',
 'epoque': 'XXe siècle',
 'notions': ['travail', 'bonheur'],
 'scene': 'Les dieux ont condamné Sisyphe à rouler éternellement un rocher jusqu’au sommet d’une '
          'montagne, d’où il retombe. Camus imagine pourtant Sisyphe heureux, dans l’effort même.',
 'ref': 'Dernier chapitre',
 'cit': None,
 'sujets': [{'s': 'Peut-on aimer travailler ?',
             'oui': 'Camus propose de penser un bonheur dans la conscience de l’effort.',
             'non': 'Le rocher retombe toujours : l’activité est imposée et ne produit aucun '
                    'résultat durable.',
             'aporie': 'Mesurer toute valeur au résultat condamne cet effort ; lui trouver une '
                       'valeur intérieure ne suffit pas à rendre légitime le travail imposé.'}],
 'partie': None})

add(**{'id': 'madeleine',
 'oeuvre': 'Du côté de chez Swann',
 'auteur': 'Proust',
 'annee': 1913,
 'genre': 'Roman',
 'epoque': 'XXe siècle',
 'notions': ['temps', 'conscience', 'inconscient'],
 'scene': 'Le goût d’une madeleine trempée dans du thé donne au narrateur une joie dont il ignore '
          'd’abord la cause. Il cherche à retrouver le souvenir qui l’explique ; Combray finit par '
          'lui revenir. L’impression initiale n’était pas voulue, mais la recherche du souvenir '
          'est bien active.',
 'ref': '« Combray », I',
 'cit': {'t': 'Et tout d’un coup le souvenir m’est apparu.',
         'qui': 'le narrateur',
         'src': 'oe-proust/proust_recherche1.xml',
         'n': "Et tout d'un coup le souvenir m'est apparu"},
 'sujets': [{'s': 'Faut-il enterrer le passé ?',
             'oui': 'L’évocation volontaire ne rend pas d’emblée la présence sensible du passé.',
             'non': 'Une sensation présente peut pourtant rouvrir l’accès à ce passé.',
             'aporie': 'Renoncer au passé ferait perdre ce qu’il peut encore révéler ; chercher à '
                       'le posséder à volonté ne garantit pas son retour.'}],
 'partie': {'texte': 'Une mémoire involontaire, qui échappe à la volonté : un appui pour la partie '
                     'sur ce qui, en nous, se fait sans nous.',
            'pour': ['Peut-on connaître l’inconscient ?']}})

add(id='guermantes', oeuvre='Le Temps retrouvé', auteur='Proust', annee=1927, genre='Roman', epoque='XXe siècle',
    notions=['temps','art'],
    scene="Revenu à Paris après de longues années, le narrateur croit assister à un bal costumé : tous ceux qu’il a connus semblent grimés en vieillards. Le même après-midi, des souvenirs soudains lui révèlent l’œuvre qu’il doit écrire.",
    ref='La matinée chez la princesse de Guermantes',
    cit=None,
    sujets=[dict(s='Le temps est-il nécessairement destructeur ?', oui="Les visages de ses amis sont ravagés par les années.", non="Le même temps lui donne la matière du livre qui les sauvera.", aporie="Le temps qui défait les corps est celui qui fait naître l’œuvre ; mais l’œuvre ne rend pas les corps.")],
    partie=None)

# Ajouts du 11 octobre 2026 : chaque limite est distincte et le passage est localisé.
add(id='bernard-foie-lave', oeuvre='Introduction à l’étude de la médecine expérimentale', auteur='Claude Bernard', annee=1865, genre='Essai', epoque='XIXe siècle',
 notions=['science','verite','raison'],
 scene='Bernard obtient deux dosages différents de sucre dans un même foie, analysé immédiatement puis le lendemain. Il vérifie l’effet du délai : après lavage du foie, du sucre se forme de nouveau. Le protocole révèle un phénomène que le premier dosage ne permettait pas de comprendre.',
 ref='Troisième partie, chapitre I, § II, deuxième exemple : dosages différés et foie lavé',
 source=dict(url='https://www.gutenberg.org/cache/epub/16234/pg16234.html',label='Texte français de Claude Bernard',portee='Passage lu : dosages et expérience du foie lavé'),cit=None,
 sujets=[dict(s='La connaissance scientifique progresse-t-elle par l’accumulation des observations ?',oui='Les dosages répétés rendent visible une différence.',non='Il faut modifier le protocole pour comprendre ce qui varie.',aporie='Compter davantage ne suffit pas ; expérimenter sans observations contrôlées ne prouve rien.',limite1='La moyenne des dosages ferait disparaître le phénomène à expliquer.',limite2='Une intervention sans comparaison pourrait produire un résultat mal attribué.',probleme='Comment les observations font-elles progresser le savoir lorsqu’elles deviennent les éléments d’une enquête contrôlée ?')],
 partie=dict(texte='Le résultat discordant déclenche une recherche. Il faut distinguer résultat inattendu, erreur de mesure et hypothèse fausse : tout écart n’est pas une découverte.',pour=['L’erreur peut-elle être féconde ?','La science a-t-elle toujours raison ?']))

add(id='nautilus-captivite',oeuvre='Vingt mille lieues sous les mers',auteur='Jules Verne',annee=1870,genre='Roman',epoque='XIXe siècle',notions=['technique','liberte','science'],
 scene='Aronnax demande à quitter le Nautilus avec ses compagnons. Nemo refuse. Le même sous-marin qui permet l’étude des mers soustrait ses passagers au pouvoir de décider où vivre : Aronnax admire les recherches de Nemo, mais réclame leur liberté.',
 ref='Deuxième partie, chapitre XIX, « Gulf-Stream » : demande de libération',
 source=dict(url='https://www.gutenberg.org/files/5096/5096-h/5096-h.htm',label='Texte français de Jules Verne',portee='Dialogue Aronnax–Nemo, deuxième partie XIX'),cit=None,
 sujets=[dict(s='Sommes-nous maîtres du progrès technique ?',oui='Nemo dirige un dispositif qui étend sa puissance et ses recherches.',non='Les passagers bénéficient de ce dispositif sans décider de leur propre déplacement.',aporie='Maîtriser une machine ne garantit pas une maîtrise commune de ses usages.',limite1='Identifier « nous » au concepteur efface la dépendance des autres.',limite2='Se libérer de cette dépendance en quittant le bord prive Aronnax de ses moyens d’étude.',probleme='Qui doit pouvoir décider des usages d’une technique dont les bénéfices et les contraintes ne sont pas partagés ?')],partie=None)

add(id='oppenheimer-risque-trinity',oeuvre='Oppenheimer — avant l’essai de Trinity',auteur='Christopher Nolan',annee=2023,genre='Cinéma',epoque='XXIe siècle',notions=['technique','science','raison'],
 scene='Avant Trinity, Groves interroge Oppenheimer sur le risque d’enflammer l’atmosphère. Dans le scénario, le physicien le juge presque nul ; Groves voudrait une certitude complète. La discussion oppose une estimation scientifique à une décision aux conséquences irréversibles.',
 ref='Scénario final du 21 avril 2023, pages imprimées 126–127 ; scène dans le bunker',
 source=dict(url='https://assets.scriptslug.com/live/pdf/scripts/oppenheimer-2023.pdf?v=1729114966',label='Scénario original de Christopher Nolan, copie publique',portee='Scène du bunker : représentation cinématographique, pas transcription historique'),cit=None,
 sujets=[dict(s='Ce qui est techniquement possible est-il toujours souhaitable ?',oui='L’essai permettrait de vérifier le fonctionnement du dispositif.',non='Le gain de connaissance ne suffit pas à autoriser un risque irréversible.',aporie='Tester réduit une incertitude ; certaines conséquences du test empêcheraient toute réparation.',limite1='La faisabilité ne donne pas la valeur du but ni le risque acceptable.',limite2='Exiger une certitude absolue avant toute action peut empêcher même une décision justifiée.',probleme='Sur quels critères décider d’un essai possible lorsque la connaissance de ses effets reste incomplète ?')],partie=None)

add(id='tartuffe-table',oeuvre='Tartuffe — Orgon sous la table',auteur='Molière',annee=1669,genre='Théâtre',epoque='XVIIe siècle',notions=['raison','verite','langage'],
 scene='Orgon refuse de croire les accusations contre Tartuffe. Elmire le cache sous une table et laisse Tartuffe lui déclarer ses intentions. Orgon finit par reconnaître la tromperie ; Elmire lui rappelle ironiquement son exigence de preuves.',ref='Acte IV, scènes 4–6',
 source=dict(url='https://github.com/dracor-org/fredracor/blob/main/tei/moliere-tartuffe.xml',label='Texte de Molière, FreDraCor',portee='Acte IV, scènes 4–6, vers 1360–1538'),
 cit=dict(t='Et c’est pour vous convaincre, ainsi que j’ai promis.',qui='Elmire',src='fredracor/tei/moliere-tartuffe.xml',n="Et c'est pour vous convaincre, ainsi que j'ai promis."),
 sujets=[dict(s='Suffit-il d’avoir raison pour convaincre ?',oui='Elmire a raison sur les intentions de Tartuffe et peut les exposer.',non='Orgon ne change de jugement qu’après avoir entendu Tartuffe lui-même.',aporie='L’argument exige d’être reçu ; la preuve mise en scène exige une épreuve que la parole aurait pu éviter.',limite1='Une raison juste demeure inefficace si la confiance va systématiquement à son adversaire.',limite2='Réclamer toujours une confrontation directe peut exposer celui qui dit vrai à une situation pénible.',probleme='Comment rendre une raison recevable sans devoir imposer à celui qui la soutient une épreuve supplémentaire ?')],partie=None)

add(id='chaplin-titine',oeuvre='Les Temps modernes — la chanson du restaurant',auteur='Charlie Chaplin',annee=1936,genre='Cinéma',epoque='XXe siècle',notions=['art','langage','travail'],
 scene='Au restaurant, Charlot perd les manchettes sur lesquelles il avait inscrit les paroles de sa chanson. Il chante dans une langue inventée, avec des gestes qui portent la scène. L’exécution réussit en changeant ce qu’il avait préparé.',ref='Séquence de la chanson « Titine » au restaurant',
 source=dict(url='https://www.charliechaplin.com/en/films/7-The-Great-Dictator/articles/114-Nonsense-Song-from-Modern-Times-Titine-',label='Site officiel Charlie Chaplin : la chanson de Titine',portee='Perte des paroles et chant dans une langue inventée'),cit=None,
 sujets=[dict(s='L’artiste sait-il ce qu’il fait ?',oui='Charlot prépare sa chanson et organise une prestation.',non='La perte du texte l’oblige à réussir autrement que prévu.',aporie='Préparer ne garantit pas la réussite ; improviser ne signifie pas créer sans savoir-faire.',limite1='Identifier le savoir à un programme fixé ferait de toute adaptation un échec.',limite2='Attribuer la réussite au seul hasard effacerait les gestes et la maîtrise de l’interprète.',probleme='Le savoir de l’artiste consiste-t-il à prévoir l’œuvre ou à savoir transformer son projet pendant l’exécution ?')],partie=None)
