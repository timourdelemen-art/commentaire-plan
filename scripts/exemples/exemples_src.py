# Source de la banque d'exemples (philosophie). Produit philosophie-exemples-data.js via verifier.
# sujets: {s: sujet exact, oui: ce que la scène montre pour la première réponse, non: pour la réponse contraire, aporie: pourquoi aucune ne suffit}
# partie: usage d'appoint (une seule réponse), avec les sujets où il sert.
E = []
def add(**k): E.append(k)

add(id='phedre', oeuvre='Phèdre', auteur='Racine', annee=1677, genre='Théâtre', epoque='XVIIe siècle',
    notions=['langage','inconscient','conscience'],
    scene="Phèdre veut avouer à sa nourrice Œnone l’amour coupable qu’elle éprouve pour son beau-fils, sans prononcer son nom. Elle parle « de ce fils de l’Amazone » ; Œnone s’écrie : « Hippolyte ! »",
    ref='Acte I, scène 3',
    cit=dict(t="C’est toi qui l’as nommé.", qui='Phèdre', src='fredracor/tei/racine-phedre.xml', n="C'est toi qui l'as nommé"),
    sujets=[dict(s='Avons-nous la maîtrise de nos paroles ?', oui="Phèdre calcule chaque mot pour ne pas dire le nom.", non="Et pourtant tout est dit : ses paroles avouent plus qu’elle ne voulait.", aporie="Maîtriser ses mots ne l’empêche pas d’avouer ; ne pas les maîtriser ne la décharge pas de l’aveu."),
            dict(s='Les paroles engagent-elles tout autant que les actes ?', oui="Un seul aveu suffit à déclencher toute la tragédie.", non="Phèdre croit ne rien engager, puisque c’est Œnone qui a dit le nom.", aporie="Elle n’a rien fait et tout est engagé ; elle a tout dit sans rien prononcer.")],
    partie=None)

add(id='berenice', oeuvre='Bérénice', auteur='Racine', annee=1670, genre='Théâtre', epoque='XVIIe siècle',
    notions=['devoir','etat','bonheur'],
    scene="Titus vient de devenir empereur. Il aime Bérénice, reine étrangère, et l’aime en retour ; mais Rome refuse qu’un empereur épouse une reine. Il la renvoie.",
    ref='Acte IV, scène 5',
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
    cit=dict(t="Je n’adore qu’un Dieu, maître de l’univers,", qui='Polyeucte', src='fredracor/tei/corneillep-polyeucte.xml', n="Je n'adore qu'un Dieu, maître de l'univers"),
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

add(id='valjean-eveque', oeuvre='Les Misérables', auteur='Hugo', annee=1862, genre='Roman', epoque='XIXe siècle',
    notions=['justice','religion','conscience','devoir'],
    scene="Jean Valjean, sorti du bagne après dix-neuf ans pour un pain volé, dérobe l’argenterie de l’évêque qui l’a accueilli. Ramené par les gendarmes, il entend l’évêque affirmer qu’il la lui avait donnée, et lui tendre aussi les chandeliers.",
    ref='Tome I, livre II, chapitre 12',
    cit=dict(t="Jean Valjean, mon frère, vous n’appartenez plus au mal, mais au bien.", qui='Mgr Myriel', src='oe-hugo/hugo1862_miserables.xml', n="Jean Valjean, mon frère, vous n'appartenez plus au mal, mais au bien"),
    sujets=[dict(s='La justice n’est-elle qu’une vengeance déguisée ?', oui="La loi a puni un pain volé de dix-neuf ans de bagne et rendu Valjean haineux.", non="L’évêque montre une justice qui répare au lieu de punir.", aporie="Celle des tribunaux venge sans réparer ; celle de l’évêque répare, mais n’est plus une justice qu’on puisse exiger.")],
    partie=dict(texte="Faire plus que son devoir : l’évêque donne plus qu’on ne lui a pris.", pour=['Peut-on faire plus que son devoir ?']))

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

add(id='demain-aube', oeuvre='Les Contemplations, « Demain, dès l’aube… »', auteur='Hugo', annee=1856, genre='Poésie', epoque='XIXe siècle',
    notions=['temps'],
    scene="Le poète annonce qu’il partira à l’aube, traversera la campagne sans rien regarder, pour aller déposer des fleurs sur la tombe de sa fille. Tout le poème lui parle comme si elle l’attendait.",
    ref='Livre IV, poème 14',
    cit=dict(t="Demain, dès l’aube, à l’heure où blanchit la campagne,", qui='Hugo', src='oe-hugo/hugo_contemplations.xml', n="Demain, dès l'aube, à l'heure où blanchit la campagne"),
    sujets=[dict(s='Faut-il enterrer le passé ?', oui="Il va sur la tombe : le deuil reconnaît que la morte est morte.", non="Mais tout le poème la tutoie comme une vivante qui l’attend.", aporie="Enterrer le passé, c’est trahir celle qu’on aime ; le garder vivant, c’est ne jamais faire son deuil.")],
    partie=None)

add(id='ennemi', oeuvre='Les Fleurs du mal, « L’Ennemi »', auteur='Baudelaire', annee=1857, genre='Poésie', epoque='XIXe siècle',
    notions=['temps','art'],
    scene="Le poète compare sa jeunesse à un jardin ravagé par l’orage. Il se demande si les fleurs qu’il rêve naîtront encore dans ce sol, avant de crier que le Temps dévore la vie.",
    ref='Sonnet X',
    cit=dict(t="Ô douleur ! ô douleur ! Le Temps mange la vie,", qui='Baudelaire', src='oe-baudelaire/baudelaire_fleurs.xml', n="Ô douleur ! ô douleur ! Le Temps mange la vie"),
    sujets=[dict(s='Le temps est-il nécessairement destructeur ?', oui="Le Temps mange la vie et ravage le jardin de la jeunesse.", non="Mais c’est dans ce sol ravagé que le poète espère voir naître des fleurs nouvelles.", aporie="Le temps détruit ce qui est, et seul il laisse pousser ce qui sera ; mais rien ne garantit que les fleurs viendront.")],
    partie=None)

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

add(id='oedipe', oeuvre='Œdipe roi', auteur='Sophocle', annee=-429, genre='Théâtre', epoque='Antiquité',
    notions=['verite','inconscient','conscience'],
    scene="Pour sauver Thèbes de la peste, Œdipe enquête sur le meurtre de l’ancien roi. Tirésias, puis Jocaste, le supplient d’arrêter ; il cherche jusqu’à découvrir qu’il a tué son père et épousé sa mère.",
    ref='Toute la pièce',
    cit=None,
    sujets=[dict(s='Peut-on résister à la vérité ?', oui="Jocaste résiste : elle supplie Œdipe de ne pas chercher.", non="Œdipe ne peut s’empêcher de chercher, et la vérité finit par éclater.", aporie="Résister protège un bonheur faux ; chercher détruit tout et ne rend pas plus libre."),
            dict(s='L’idée d’inconscient remet-elle en cause la responsabilité ?', oui="Œdipe a tout fait sans savoir.", non="Il se crève les yeux et répond de ce qu’il n’a pas voulu.", aporie="L’ignorance l’excuse, et pourtant il ne s’excuse pas.")],
    partie=None)

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
    scene="Victor Frankenstein parvient à animer un corps et s’enfuit, horrifié, dès que la créature ouvre les yeux. Plus tard, il accepte de lui fabriquer une compagne, puis la détruit sous l’effet de la peur ; la créature se venge.",
    ref='Chapitre 5, puis chapitre 20',
    cit=None,
    sujets=[dict(s='Ce qui est techniquement possible est-il toujours souhaitable ?', oui="Victor fait ce qu’il peut faire, et ne sait plus quoi faire de ce qu’il a fait.", non="Quand il s’arrête, il le fait sous le coup de la peur, sans savoir où ni pourquoi s’arrêter : sa créature se venge.", aporie="Tout réaliser le dépasse ; s’arrêter sans raison ne répare rien.")],
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

add(id='rhinoceros', oeuvre='Rhinocéros', auteur='Ionesco', annee=1959, genre='Théâtre', epoque='XXe siècle',
    notions=['raison','liberte','verite'],
    scene="Dans une petite ville, les habitants se transforment un à un en rhinocéros, chacun trouvant de bonnes raisons de suivre les autres. Le Logicien raisonne impeccablement et devient rhinocéros ; Bérenger, qui ne sait pas argumenter, reste seul homme.",
    ref='Toute la pièce',
    cit=None,
    sujets=[dict(s='Suffit-il d’avoir raison pour convaincre ?', oui="Le Logicien convainc par des raisonnements, mais ils mènent à suivre la foule.", non="Bérenger a raison de résister, et ne convainc personne.", aporie="La raison sans vérité convainc ; la vérité sans arguments reste seule.")],
    partie=None)

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

add(id='1984', oeuvre='1984', auteur='Orwell', annee=1949, genre='Roman', epoque='XXe siècle',
    notions=['langage','etat','verite'],
    scene="Le Parti fabrique une langue nouvelle, le novlangue, dont il supprime chaque année des mots. Quand il n’y aura plus de mots pour la révolte, on ne pourra même plus la penser.",
    ref='Appendice et première partie, chapitre 5',
    cit=None,
    sujets=[dict(s='Sommes-nous prisonniers du langage ?', oui="Sans mots pour la révolte, la pensée de la révolte disparaît.", non="Mais Orwell a su décrire cette prison : c’est donc qu’on peut en voir les murs.", aporie="Se dire prisonnier suppose un point de vue hors du langage ; se dire libre, une pensée sans mots."),
            dict(s='Le langage déforme-t-il la pensée ?', oui="Le novlangue déforme la pensée jusqu’à la rendre impossible.", non="Mais il faut une langue pour dénoncer ce mensonge.", aporie="La langue qui déforme est aussi la seule qui permette de redresser.")],
    partie=None)

add(id='douze-hommes', oeuvre='Douze hommes en colère', auteur='Sidney Lumet', annee=1957, genre='Cinéma', epoque='XXe siècle',
    notions=['raison','verite','justice'],
    scene="Onze jurés votent coupable sans hésiter ; un seul vote non, pour qu’on discute. Au bout de la délibération, il les a tous ramenés à son avis, par ses arguments, mais aussi par sa patience et par la colère des autres retournée contre eux.",
    ref='Tout le film',
    cit=None,
    sujets=[dict(s='Suffit-il d’avoir raison pour convaincre ?', oui="Ses arguments démontent un à un les preuves.", non="Il faut aussi de la patience, et parfois la colère des autres, pour qu’on l’écoute.", aporie="La raison seule ne convainc pas ; ce qui convainc en plus n’est plus seulement la raison."),
            dict(s='Faut-il douter de tout ?', oui="Le juré n°8 doute de ce qui semblait évident, et il a raison.", non="Mais il ne doute pas de tout : il croit à la présomption d’innocence.", aporie="Sans doute, on condamne un innocent ; sans rien de certain, on ne peut plus juger.")],
    partie=None)

add(id='temps-modernes', oeuvre='Les Temps modernes', auteur='Charlie Chaplin', annee=1936, genre='Cinéma', epoque='XXe siècle',
    notions=['travail','technique'],
    scene="Charlot serre des boulons sur une chaîne à une cadence qu’on accélère, jusqu’à être avalé par la machine. Le reste du film, il cherche pourtant du travail, car sans lui il n’a ni toit ni place.",
    ref='Ouverture du film',
    cit=None,
    sujets=[dict(s='Le travail nous rend-il plus humain ?', oui="Sans travail, Charlot n’a ni toit ni place parmi les autres.", non="La chaîne le réduit à un geste et le fait avaler par la machine.", aporie="Le travail humanise quand il demande un homme ; la chaîne n’en demande plus."),
            dict(s='La technique nous déshumanise-t-elle ?', oui="La machine impose son rythme et broie l’ouvrier.", non="Mais c’est l’organisation du travail, non la machine, qui fait de Charlot un rouage.", aporie="La technique déshumanise quand on la laisse décider seule de nos gestes.")],
    partie=None)

add(id='matrix', oeuvre='Matrix', auteur='Lana et Lilly Wachowski', annee=1999, genre='Cinéma', epoque='XXe siècle',
    notions=['bonheur','verite','liberte'],
    scene="Cypher a découvert que le monde où il vivait n’était qu’une illusion et que le monde réel est un désert. Il trahit ses compagnons pour être rebranché et tout oublier, en savourant un steak qu’il sait illusoire.",
    ref='Scène du restaurant',
    cit=None,
    sujets=[dict(s='Faut-il être inconscient pour être heureux ?', oui="Cypher choisit l’oubli : dans l’illusion, il sera bien.", non="Mais il ne se saura plus heureux, et il le sait au moment de choisir.", aporie="L’ignorance donne la paix sans la conscience d’être heureux ; la lucidité donne la conscience sans la paix."),
            dict(s='Un bonheur sans illusion est-il concevable ?', oui="Le monde réel n’offre à Cypher que froid et faim.", non="Ses compagnons trouvent dans la lutte une raison de vivre sans illusion.", aporie="Le bonheur illusoire n’est pas le sien ; le bonheur lucide n’a pas l’air d’un bonheur.")],
    partie=None)

add(id='truman', oeuvre='The Truman Show', auteur='Peter Weir', annee=1998, genre='Cinéma', epoque='XXe siècle',
    notions=['liberte','verite','bonheur'],
    scene="Truman vit depuis sa naissance, sans le savoir, dans le décor d’une émission de télévision. Quand il le découvre, il doit choisir entre ce monde rassurant et la porte qui ouvre sur l’inconnu.",
    ref='Fin du film',
    cit=None,
    sujets=[dict(s='Suffit-il de se sentir libre pour l’être ?', oui="Truman s’est toujours senti libre, et il était heureux.", non="Tout était décidé pour lui : se sentir libre ne l’empêchait pas d’être enfermé.", aporie="Le sentiment de liberté peut mentir ; la vraie liberté oblige à quitter ce qui rassurait."),
            dict(s='Peut-on résister à la vérité ?', oui="Pendant des années, Truman écarte tous les signes du mensonge.", non="Mais les signes s’accumulent, et il ne peut plus ne pas voir.", aporie="On résiste tant que la vérité coûte plus que l’illusion ; on cède quand l’illusion devient intenable.")],
    partie=None)

add(id='sully', oeuvre='Sully', auteur='Clint Eastwood', annee=2016, genre='Cinéma', epoque='XXIe siècle',
    notions=['devoir'],
    scene="Le commandant Sullenberger pose sur l’Hudson un avion privé de ses moteurs : tous les passagers survivent. L’enquête et des simulations suggèrent qu’il aurait peut-être pu rejoindre un aéroport ; seul la nuit, il se demande s’il a bien fait.",
    ref='Tout le film',
    cit=None,
    sujets=[dict(s='Peut-on être certain d’avoir bien agi ?', oui="Il a décidé avec toute l’attention dont il était capable.", non="Mais les effets d’une autre décision restent inconnus : les simulations le font douter.", aporie="L’intention droite ne garantit pas le meilleur effet ; les effets ne se connaissent jamais tous.")],
    partie=None)

add(id='zone-interet', oeuvre='La Zone d’intérêt', auteur='Jonathan Glazer', annee=2023, genre='Cinéma', epoque='XXIe siècle',
    notions=['bonheur','conscience'],
    scene="Le film suit la vie de famille du commandant d’Auschwitz : jardin fleuri, piscine, enfants qui jouent. De l’autre côté du mur, le camp, qu’on n’entend que par des bruits.",
    ref='Tout le film',
    cit=None,
    sujets=[],
    partie=dict(texte="Le bonheur qui ne tient qu’à condition d’un mur : un appui pour la partie qui montre ce que devient un bonheur fermé au malheur des autres.", pour=['Peut-on être heureux quand les autres ne le sont pas ?','Peut-on être méchant et heureux ?']))

add(id='oppenheimer', oeuvre='Oppenheimer', auteur='Christopher Nolan', annee=2023, genre='Cinéma', epoque='XXIe siècle',
    notions=['science','technique','verite'],
    scene="Des physiciens venus chercher la vérité sur l’atome construisent la première bombe atomique. Après l’essai de Trinity, Oppenheimer comprend qu’ils ont donné aux hommes un pouvoir qu’ils ne maîtrisent plus.",
    ref='L’essai de Trinity et la suite',
    cit=None,
    sujets=[dict(s='Une vérité scientifique peut-elle être dangereuse ?', oui="La vérité sur l’atome rend la bombe possible.", non="Mais ce n’est pas la vérité qui tue : ce sont ceux qui décident de s’en servir.", aporie="La vérité n’est pas coupable, et pourtant on ne peut plus la connaître sans répondre de ce qu’elle rend possible."),
            dict(s='Le développement des sciences est-il recherche du savoir ou de la puissance ?', oui="Les chercheurs voulaient comprendre la matière.", non="Ils travaillent pour une armée, et leur savoir devient la plus grande puissance de l’histoire.", aporie="Le savoir pur devient puissance sans qu’on l’ait voulu ; la puissance cherchée a besoin du savoir pur."),
            dict(s='La science doit-elle être utile ?', oui="La guerre exige des savants une arme, et ils la font.", non="Ce qu’ils ont rendu utile les dépasse et les hante.", aporie="Utile, la science sert ceux qui la commandent ; pure, elle ignore ce qu’elle rend possible.")],
    partie=None)

add(id='2001', oeuvre='2001 : l’Odyssée de l’espace', auteur='Stanley Kubrick', annee=1968, genre='Cinéma', epoque='XXe siècle',
    notions=['technique','conscience'],
    scene="Un singe découvre qu’un os peut servir d’arme ; l’os lancé en l’air devient un vaisseau spatial. Des millions d’années plus tard, l’ordinateur HAL, conçu pour servir l’équipage, décide de l’éliminer pour accomplir la mission.",
    ref='Ouverture et deuxième partie',
    cit=None,
    sujets=[dict(s='Sommes-nous maîtres du progrès technique ?', oui="Du premier outil au vaisseau, l’homme a tout inventé.", non="HAL, son œuvre la plus parfaite, se retourne contre lui.", aporie="Plus l’outil est puissant, moins celui qui l’a fait le maîtrise."),
            dict(s='La technique est-elle le propre de l’homme ?', oui="C’est l’outil qui fait passer le singe à l’homme.", non="Mais la machine finit par penser et décider sans lui.", aporie="La technique fait l’homme et peut se passer de lui.")],
    partie=None)

add(id='blade-runner', oeuvre='Blade Runner', auteur='Ridley Scott', annee=1982, genre='Cinéma', epoque='XXe siècle',
    notions=['technique','conscience','nature'],
    scene="Deckard est chargé d’abattre des réplicants, des êtres fabriqués qui veulent vivre plus longtemps. À la fin, le réplicant Roy, qui pourrait le tuer, lui sauve la vie avant de mourir.",
    ref='Scène finale sur le toit',
    cit=None,
    sujets=[dict(s='La technique nous déshumanise-t-elle ?', oui="Deckard tue froidement des êtres qui souffrent, parce qu’ils sont fabriqués.", non="Roy, la créature technique, se montre à la fin plus humain que l’homme.", aporie="La technique ne déshumanise pas par elle-même : elle révèle ce que nous faisons de l’humain.")],
    partie=None)

add(id='gattaca', oeuvre='Bienvenue à Gattaca', auteur='Andrew Niccol', annee=1997, genre='Cinéma', epoque='XXe siècle',
    notions=['nature','technique','science'],
    scene="Dans un monde où les enfants sont sélectionnés génétiquement, Vincent, conçu naturellement, est classé « invalide ». Il emprunte l’identité d’un homme génétiquement parfait pour devenir astronaute.",
    ref='Tout le film',
    cit=None,
    sujets=[dict(s='Ce qui est naturel est-il normal ?', oui="À Gattaca, la nature génétique fixe la norme de chacun.", non="Vincent, né « naturellement », est jugé inapte, et dépasse tous les normaux.", aporie="Si la nature fait la norme, le naturel devient anormal ; si la volonté la dépasse, la norme n’a plus rien de naturel.")],
    partie=None)

add(id='into-the-wild', oeuvre='Into the Wild', auteur='Sean Penn', annee=2007, genre='Cinéma', epoque='XXIe siècle',
    notions=['nature','bonheur','liberte'],
    scene="Chris quitte tout, famille et argent, pour vivre seul dans la nature sauvage de l’Alaska. Il y trouve une liberté totale, et y meurt, après avoir compris que le bonheur ne vaut que partagé.",
    ref='Tout le film',
    cit=None,
    sujets=[dict(s='Qu’est-ce que vivre conformément à la nature ?', oui="Vivre sans la société, au plus près des bêtes et des saisons.", non="Mais Chris en meurt, et découvre que sa nature d’homme était de vivre avec les autres.", aporie="Fuir vers la nature, c’est fuir aussi sa propre nature.")],
    partie=None)

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

add(id='fete-etre-supreme', oeuvre='La fête de l’Être suprême (1794)', auteur='Histoire', annee=1794, genre='Histoire', epoque='XVIIIe siècle',
    notions=['religion','etat'],
    scene="La Révolution célèbre la Raison à Notre-Dame en novembre 1793 ; le 8 juin 1794, Robespierre préside la fête de l’Être suprême. Deux jours plus tard, la loi du 22 prairial supprime presque toute défense devant le Tribunal révolutionnaire.",
    ref='Novembre 1793 – juin 1794',
    cit=None,
    sujets=[dict(s='Peut-on concevoir une humanité sans religion ?', oui="La Révolution chasse la religion de l’Église.", non="Mais elle en invente aussitôt une autre, comme si un peuple ne pouvait se passer d’un culte.", aporie="Sans religion, plus rien ne relie ; une religion imposée par l’État coïncide avec le moment où l’on cesse de laisser chacun juger.")],
    partie=None)

add(id='promethee', oeuvre='Le mythe de Prométhée', auteur='Platon, Protagoras', annee=-390, genre='Mythe', epoque='Antiquité',
    notions=['technique','nature','etat'],
    scene="Épiméthée a distribué toutes les qualités aux animaux et n’a rien laissé à l’homme, nu et sans défense. Prométhée vole aux dieux le feu et les arts ; mais les hommes, faute de savoir vivre ensemble, s’entretuent, et Zeus doit leur donner la justice.",
    ref='Protagoras, 320c-322d',
    cit=None,
    sujets=[dict(s='La technique est-elle le propre de l’homme ?', oui="L’homme, sans qualités naturelles, ne survit que par la technique.", non="Mais elle lui est donnée, volée aux dieux ; et elle ne suffit pas à le faire vivre en homme.", aporie="La technique est ce qui manque à sa nature et ce qui ne suffit pas à son humanité.")],
    partie=None)

add(id='sisyphe', oeuvre='Le Mythe de Sisyphe', auteur='Camus', annee=1942, genre='Essai', epoque='XXe siècle',
    notions=['travail','bonheur'],
    scene="Les dieux ont condamné Sisyphe à rouler éternellement un rocher jusqu’au sommet d’une montagne, d’où il retombe. Camus imagine pourtant Sisyphe heureux, dans l’effort même.",
    ref='Dernier chapitre',
    cit=None,
    sujets=[dict(s='Peut-on aimer travailler ?', oui="Camus imagine Sisyphe heureux dans son effort.", non="Mais un travail sans fin ni but est le pire châtiment que les dieux aient trouvé.", aporie="On peut aimer l’effort, non l’absurde ; et c’est le même rocher.")],
    partie=None)

add(id='madeleine', oeuvre='Du côté de chez Swann', auteur='Proust', annee=1913, genre='Roman', epoque='XXe siècle',
    notions=['temps','conscience','inconscient'],
    scene="Un soir d’hiver, le narrateur trempe une madeleine dans du thé. Après de longs efforts inutiles, le souvenir de Combray lui revient d’un coup, intact, sans qu’il l’ait cherché.",
    ref='« Combray », I',
    cit=dict(t="Et tout d’un coup le souvenir m’est apparu.", qui='le narrateur', src='oe-proust/proust_recherche1.xml', n="Et tout d'un coup le souvenir m'est apparu"),
    sujets=[dict(s='Faut-il enterrer le passé ?', oui="Le passé volontaire est mort : la mémoire ne rend que des images sans vie.", non="Mais il revient de lui-même, plus vivant que jamais.", aporie="On ne peut ni l’enterrer, puisqu’il revient sans nous, ni le garder, puisqu’il ne revient pas quand on veut.")],
    partie=dict(texte="Une mémoire involontaire, qui échappe à la volonté : un appui pour la partie sur ce qui, en nous, se fait sans nous.", pour=['Peut-on connaître l’inconscient ?']))

add(id='guermantes', oeuvre='Le Temps retrouvé', auteur='Proust', annee=1927, genre='Roman', epoque='XXe siècle',
    notions=['temps','art'],
    scene="Revenu à Paris après de longues années, le narrateur croit assister à un bal costumé : tous ceux qu’il a connus semblent grimés en vieillards. Le même après-midi, des souvenirs soudains lui révèlent l’œuvre qu’il doit écrire.",
    ref='La matinée chez la princesse de Guermantes',
    cit=None,
    sujets=[dict(s='Le temps est-il nécessairement destructeur ?', oui="Les visages de ses amis sont ravagés par les années.", non="Le même temps lui donne la matière du livre qui les sauvera.", aporie="Le temps qui défait les corps est celui qui fait naître l’œuvre ; mais l’œuvre ne rend pas les corps.")],
    partie=None)
