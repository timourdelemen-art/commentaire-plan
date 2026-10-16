# Recueil de citations — intégration du 16 octobre 2026

## Décision du propriétaire

Le propriétaire a fourni trois recueils, approuvé l’inventaire de 45 citations et demandé leur intégration à la place des quinze anciennes fiches. Chaque nouvelle fiche comporte la citation exacte, une partie Dissertation et une partie Commentaire. Il demande ensuite de poursuivre avec l’Éthique fournie, puis d’intégrer une sélection rigoureuse de Cioran. Les six fonctions du commentaire sont visibles par défaut et peuvent être masquées sans modifier le paragraphe.

## Contenu

- 221 citations : quinze de Platon, quinze d’Aristote, quinze de Nietzsche, quinze de Spinoza, dix-huit de Cioran, vingt-trois de Kant, seize de Baudelaire, dix-sept de Racine et dix-huit de Corneille, treize de Bachelard, douze de Freud, neuf de Simondon et quinze extraites des annales, réparties entre treize auteurs supplémentaires, et vingt de La Fontaine.
- 448 usages proposés sur 278 libellés de sujets distincts, avec un à trois sujets par fiche.
- 221 commentaires originaux de six phrases, de 145 mots au plus ; aucune prétention à un protocole officiel de six phrases.
- Sept liens vers des copies A20 existantes, avec indication de la sous-partie examinée. Il s’agit d’insertions possibles, pas de citations déjà présentes dans les copies.
- Les sujets anciens sont attestés dans le recueil de l’académie de Montpellier, 1996-2025, aux pages conservées dans les données. Sept raccords sont vérifiés dans les PDF ministériels 2026 (Amérique du Nord et Asie).
- Les traductions individuelles non identifiées restent explicitement indiquées comme à préciser. Les noms ne sont pas inventés.

## Sources et contrôle

La sélection et ses citations viennent des quatorze ouvrages fournis dans la conversation. Le registre scripts/philo-banque-provenance.json conserve les empreintes des sources, le passage interne et l’empreinte du texte de chaque citation contrôlée. Les livres, noms de fichiers privés et identifiants Library ne sont pas commis. Les espaces et renvois de notes ont été normalisés ; les mots des citations ne sont pas remplacés.

Le propriétaire a expressément demandé l’intégration de ces courts extraits après lecture du recueil. Aucun ouvrage ni chapitre entier n’est publié. La décision porte sur cette sélection, pas sur une autorisation générale de reproduire les traductions.

## Architecture

Source : scripts/philo-banque-data.json. Génération : node scripts/build-philo-banque.js. Le script vérifie les citations contre les empreintes, les six fonctions, les sources des sujets, les liens A20, et produit philosophie-banque-data.js ainsi que le catalogue HTML complet. --check vérifie la fraîcheur des deux sorties. Les sorties sont commises car le build général ne relance pas ce générateur.

La page fonctionne sans JavaScript : cent soixante-dix-sept fiches complètes dans des blocs dépliables. Avec JavaScript : filtres, lecteur unique, lecture annotée ou continue, lien direct partageable. La recherche ne promet aucun classement sémantique automatique. Le sélecteur ne fait que filtrer des raccords documentés.

Les anciennes fiches sont retirées des données et du catalogue. Onze anciens identifiants renvoient vers une nouvelle fiche du même passage ou thème repris ; quatre identifiants sans équivalent présentent un message de retrait. Les anciens brouillons du navigateur ne sont ni utilisés ni effacés.

Aucun worker, menu partagé, copie A20 ou mécanisme de correction automatique n’est modifié.

## Vérification pédagogique

Les trois volets sont distincts : la citation ; son usage dans un argument propre à un sujet ; son explication autonome dans son contexte d’origine. Le commentaire ne prouve pas sa qualité par le seul compte des phrases. Chaque phrase a été relue selon son apport : difficulté, affirmation, concepts, justification, exemple, portée. Les précautions importantes des fiches sont intégrées dans la phrase de portée plutôt qu’ajoutées en longues notes.

Le choix d’un sujet fournit une fonction argumentative, pas un plan universel I/II/III. Le lecteur doit l’adapter à son argument. Aucun exercice, évaluation ou note n’est promis sur cette page de lecture.

## Extension Spinoza

Quinze phrases complètes, référencées par partie et proposition, définition ou axiome. La traduction est celle de Maxime Rovere, explicitement nommé dans la page de titre de l’EPUB Flammarion 2021 ; le nom du fichier fourni portait d’autres noms et ne constitue pas une autorité bibliographique. Les citations ont été comparées au XHTML, sans appels de notes, avec normalisation des seuls espaces. Trente usages sont attestés dans le recueil académique ; le trente et unième renvoie au sujet Asie 2026 « Faut-il être inconscient pour être heureux ? ». La proposition V, 6 peut prolonger III.2 de la copie A20, lue intégralement, en traitant de la compréhension des causes et des regrets, sans remplacer l’argument épicurien par une attribution à Spinoza.

Relecture : liberté absolue réservée à Dieu et activité humaine graduelle ; effort sans intention consciente universelle ; joie directement bonne distincte de toute satisfaction particulière ; affect actif distinct d’une passion ; compréhension adéquate distincte de la simple désignation d’une émotion ; parallélisme distinct d’une causalité matérielle sur les idées.

## Extension Cioran

Douze phrases autonomes ont été retenues après examen, six dans le *Précis de décomposition* et six dans *La Chute dans le temps*. Ce nombre est le résultat de la sélection, sans quota initial. Cioran est présenté comme « Écrivain et penseur » dans le lecteur et le catalogue sans JavaScript. Les textes sont en français original : aucun traducteur à préciser n’est annoncé. Les années 1949 et 1964 sont expressément les dates de première publication ; aucune pagination d’édition imprimée n’est inventée. La rubrique de chaque passage figure publiquement ; la page numérique PDF ou le fichier HTML EPUB restent dans le registre interne.

Vingt-quatre emplois renvoient au recueil académique ; deux autres sont reliés à des sujets officiels 2026 et à des copies A20 examinées : *Peut-on concevoir une humanité sans religion ?*, II.3, pour la sacralisation et le risque d’exclusion ; *L’artiste sait-il ce qu’il fait ?*, II.3, pour discuter la différence entre le détachement radical et la lucidité nécessaire au travail de l’artiste. Aucun raccord ne prétend que ces citations se trouvent déjà dans les copies.

Les commentaires reconstruisent un argument local, sans prêter à Cioran une doctrine unifiée : faux absolus, définition et présence, ennui, explication et épreuve, conflit du désir et des principes, réflexion sur la sensation, passage du doute théorique au doute pratique, conversion et contrainte, besoin de reconnaissance, conscience corporelle, création et détachement, temps vécu. Les métaphores sont explicitées ; les généralisations polémiques sont distinguées des lois démontrées. L’intensité de la conscience n’est confondue ni avec un savoir complet ni avec une puissance accrue ; l’échec pratique d’un principe ne prouve pas sa fausseté logique.

## Complément demandé : « L’Arbre de vie »

Le 16 octobre 2026, le propriétaire demande de développer les usages de la relecture de la Genèse dans le premier chapitre de La Chute dans le temps. Sélection de phrases autonomes et rédaction des fiches au même format, après vérification dans le fichier fourni.

Six fiches complémentaires de « L’Arbre de vie » : C13 le malaise antérieur à la transgression ; C14 connaissance et perte de familiarité ; C15 précarité et conscience de la mortalité ; C16 entrée dans le temps vécu ; C17 outil comme compensation ; C18 distinction entre devenir et progrès. Treize usages nouveaux sur des sujets attestés : douze dans le recueil académique et un raccord à la copie Asie 2026, « Faut-il être inconscient pour être heureux ? », I.2, en complément de l’argument pascalien. Le chapitre entier a été relu, y compris sa distinction finale entre un savoir tourné vers la puissance et un savoir tourné vers la délivrance. Les commentaires ne condamnent donc pas tout savoir au nom de Cioran.

La recherche inclut désormais la référence du passage : « arbre de vie » retrouve les six fiches ensemble. Le complément représente 18 fiches Cioran en tout, dont six du Précis et douze de La Chute. L’innocence du mythe, le temps vécu et les affirmations polémiques sur le vivant ne sont pas présentés comme des faits historiques, physiques ou biologiques.

## Extension Kant

Le propriétaire demande de poursuivre avec les deux Critiques fournies, en privilégiant des phrases complètes qui restent intelligibles hors de leur paragraphe et permettent des emplois argumentatifs précis. La reprise retrouve la trace d’une sélection antérieure de 27 citations, mais pas son détail : les 23 fiches ajoutées ici sont une sélection vérifiée de nouveau dans les EPUB, et non une restitution prétendue de cette liste. Douze phrases proviennent de la *Critique de la raison pure*, onze de la *Critique de la faculté de juger*. Aucune lecture exhaustive nouvelle des deux ouvrages n’est certifiée par ce travail de sélection et de contextualisation.

Les deux traductions sont d’Alain Renaut. La première est identifiée sur la page de titre ; la seconde par la notice BnF cb44435653s correspondant à l’ISBN du livre fourni. L’année 2015 de la troisième Critique correspond au dépôt légal de l’édition, confirmé par la BnF, et non à l’année indiquée dans le nom du fichier ou à la première publication (1790). La première Critique utilise les repères A/B, l’autre les paragraphes ou divisions nommées, sans pagination française inventée. Appels de notes et repères intercalés de l’édition allemande sont retirés ; aucun mot des phrases n’est remplacé ni coupé. Le registre conserve l’emplacement exact et les empreintes.

Les 46 emplois sont vérifiés par comparaison du libellé avec la page du PDF académique 1996–2025. Le recueil des 11 000 sujets de Baptiste Mélès ne sert pas d’attestation de sujet du bac. Chaque commentaire suit les six fonctions et reste sous 145 mots ; les usages indiquent l’étape argumentative où la distinction devient utile. Aucun nouveau raccord A20 n’est annoncé sans lecture de la copie correspondante.

Relecture : commencement empirique distinct de l’origine de toutes les conditions ; cohérence nécessaire mais insuffisante ; jugement distinct de la sensation ; persistance de l’apparence distincte de l’adhésion ; critique de la preuve ontologique distincte d’une preuve d’inexistence ; certitude personnelle distincte de justification ; opinion insuffisante distincte d’une opinion fausse ; universalité du goût revendiquée plutôt que constatée ; sans concept distinct de sans réflexion ; désintéressement distinct d’indifférence ; génie compatible avec apprentissage technique ; naturel artistique distinct d’une copie de la nature ; beauté de la représentation distincte de celle du sujet ; finalité comme principe du jugement, non preuve d’un créateur ou verdict sur les limites de la biologie contemporaine.

## Extension Baudelaire et Racine

Trente-trois fiches reprennent le modèle existant : citation, référence en italique, Dissertation avec deux sujets du bac et fonctions argumentatives, Commentaire en six phrases. Les vers restent limités à deux par fiche. Les seize extraits de Baudelaire ont été relus sur les pages numérisées du volume Garnier-Flammarion de 1964 fourni et comparés aux textes de Wikisource. Les dix-sept extraits de Racine sont prélevés directement dans les scènes de l’EPUB Arvensa de 2012, avec conservation des mots, de la ponctuation et des limites de vers. Chaque réplique porte son locuteur, son acte, sa scène et une situation très brève. Aucun propos d’un personnage n’est présenté comme la doctrine de Racine.

Le dépouillement a porté sur l’ensemble du corpus extrait : inventaire des poèmes et des 353 scènes des douze pièces. La sélection et la lecture contextualisée des passages retenus ne constituent pas une lecture littéraire exhaustive de chaque ligne des deux volumes. Onze pièces sont représentées ; aucun quota par œuvre n’est imposé. Les matrices philosophiques orientent la sélection et la rédaction sans devenir une rubrique supplémentaire sur la page élève.

Les références distinguent le recueil proprement dit, les Nouvelles Fleurs du Mal et l’Ébauche d’un épilogue pour la deuxième édition. La variante « Et le paradis en enfers; » d’Alchimie de la douleur est conservée conformément au livre fourni ; la comparaison en ligne donne « en enfer ». Cette différence est signalée dans le détail d’édition : aucune harmonisation silencieuse. La réplique sur le peuple qui choisirait son maître est attribuée à Polynice (La Thébaïde, II, 3), non à Étéocle ; l’oracle d’Iphigénie est interrogé par Clytemnestre ; la justice expéditive d’Athalie est défendue par Mathan.

Les 66 emplois nouveaux sont raccordés à des libellés retrouvés dans le PDF académique du bac 1996–2025, avec lien vers la page. Le recueil des 11 000 sujets ne suffit pas à attester un sujet du bac. Les situations restent brèves ; les explications distinguent la parole poétique d’une démonstration, la métaphore d’une loi et les passions représentées d’une prescription morale. Les 101 fiches antérieures sont conservées à l’identique dans les données.

## Corneille et audit esthétique des vers

Dix-huit extraits de douze pièces sont prélevés dans l’EPUB Arvensa fourni, avec personnage, acte, scène et situation brève. Les mots et la ponctuation de ce volume sont conservés, les espaces de mise en page normalisés et les appels de notes retirés. Le volume indique une mise en français moderne par Charles Wincesky et une référence à Marty-Laveaux (Hachette, 1862). Aucune année d’édition n’est déduite du nom de fichier ou des métadonnées manifestement invalides ; la date est dite non indiquée. Comparaison à Théâtre classique ou à l’édition Marty-Laveaux sur Wikisource : mêmes mots pour les dix-huit passages, typographie propre au livre fourni. Les usages sont attestés à leur page dans le recueil académique du bac.

Le corpus a été extrait et inventorié, puis les scènes retenues et leurs échanges environnants relus ; il ne s’agit pas d’une certification de lecture littéraire exhaustive des œuvres complètes. Les sections critiques, traductions religieuses et pièces en collaboration ne sont pas utilisées pour attribuer à Corneille seul un texte dramatique. Le registre conserve le chemin et la position de chaque prélèvement.

L’audit de chacune des 33 fiches Baudelaire/Racine est motivé dans PHILOSOPHIE-CITATIONS-AUDIT.md. Il retient cinq remplacements, sans prétendre établir un classement objectif des plus beaux vers de ces auteurs. B05 et B10, R01, R04 et R09 sont refaits entièrement : citation, référence, titre, sujets, fonctions et commentaire. Les anciens liens redirigent vers leur remplacement. Les 129 autres fiches conservent exactement leurs données. Les citations retirées restent consignées dans le registre interne pour rendre la décision vérifiable ; elles ne sont plus publiées dans le catalogue.

## Extension Bachelard et Freud

Lecture intégrale des trois nouveaux volumes avant sélection (journal et décisions dans BACHELARD-FREUD-LECTURE.md). 25 courts extraits et 50 usages de sujets du bac attestés page par page. Première publication de La Formation en 1938 malgré la métadonnée 1934 ; traduction Cambon des Trois essais distinguée de celles du recueil Payot (Mannoni, puis Laplanche/Pontalis). La parole de l'enfant est explicitement rapportée par Freud. Aucun ouvrage complet publié.

Validation de cette extension : génération et test des 177 fiches ; build intégral sur copie jetable (292 pages, contrôle global zéro erreur/20 avertissements, SEO zéro erreur/1 avertissement) ; navigateur à 390 et 1280 px, tous les extraits, six fonctions, filtres, titres en italique, situations, traductions et fonctionnement sans JavaScript. Le budget de taille de la banque était déjà dépassé avant cette extension (HTML358Ko, donnéesJS352Ko) ; elle l'augmente (HTML420Ko, JSlocal434Ko). Ce point reste une limite de la page complète, sans modification des seuils de contrôle.

## Extension Simondon

Neuf citations des deux livres fournis, dix-huit usages sur des sujets du bac et neuf commentaires de six phrases. Lecture de tout le texte disponible documentée dans SIMONDON-LECTURE.md : quatre pages absentes du scan et deux pages répétées, sans reconstitution des lacunes. Contrôle visuel des extraits du PDF, distinction des textes de Simondon et des interventions éditoriales. Édition Millon datée 1995, matériaux préparatoires du recueil PUF datés vers 1956, aucune attribution au livre définitif de 1958.

Validation : génération et test des 186 fiches, comparaison des 177 fiches précédentes inchangées, build intégral sur copie jetable (292 pages, contrôle global zéro erreur/20 avertissements existants, SEO zéro erreur/1 avertissement existant), navigateur 390/1280 px sur toutes les fiches, deux lectures, filtres, six fonctions, italiques, sources, anciens liens et fonctionnement sans JavaScript. La limite de poids préexistante augmente à HTML442Ko/JSlocal457Ko ; aucun seuil ni contrôle n’est modifié pour la masquer.

## Extension par les annales d’explication de texte

Quinze phrases de treize nouveaux auteurs : Alain (deux), Bergson, Comte, Diderot, Durkheim, Montesquieu, Tocqueville, Rousseau, Pascal, Leibniz, Simone Weil (deux), Mill et Arendt. Trente usages sur des sujets attestés, commentaires de six phrases, liens directs vers le texte du bac dans les deux rendus. Comparaison de deux recueils académiques apparentés, lecture ciblée des contextes, contrôle visuel des quinze phrases, aucune modification des 186 fiches antérieures. Références corrigées et variantes de traduction documentées dans ANNALES-CITATIONS-SELECTION.md ; aucun traducteur supposé.

Validation de cette extension : 201 fiches vérifiées par le générateur et le test métier ; citations nouvelles retrouvées exactement dans leur page PDF et sujets vérifiés dans le recueil de dissertations ; 186 fiches précédentes inchangées. Build complet sur copie jetable : 292 pages, contrôle global zéro erreur/20 avertissements préexistants, SEO zéro erreur/1 avertissement préexistant ; nettoyage de publication : 53 fichiers ou dossiers retirés. Navigateur : toutes les fiches à 390 et 1280 px, exactitude du texte, filtres, six annotations, liens de contexte, italiques, anciens liens et rendu sans JavaScript ; aucune erreur de page ni débordement. Captures mobile Weil et ordinateur Durkheim relues. Poids relevé : HTML 479 Ko et JavaScript local 495 Ko, au-delà du budget de 350 Ko déjà dépassé avant cette extension (442/457 Ko) ; seuils inchangés.

## Extension La Fontaine — 17 octobre 2026

Vingt fiches issues des douze livres lus dans le volume Couton, Bordas, 1990 : un ou deux vers exacts, titre de la fable et recueil en italique, référence imprimée/PDF, voix et situation brève, deux sujets attestés et six phrases originales de 89 à 105 mots. La sélection puise dans les récits et dialogues autant que dans les morales. Les vingt passages sont contrôlés visuellement dans le livre et comparés à des éditions anciennes, avec conservation documentée des variantes du volume fourni ; voir `LA-FONTAINE-SELECTION.md`. Les numérotations variables des livres VII, IX/X et XII ne sont pas confondues.

Validation : 221 fiches, 448 usages, 278 sujets distincts, 26 auteurs ; les 201 anciennes fiches restent identiques. Build jetable complet : 292 pages, zéro erreur globale/20 avertissements préexistants et zéro erreur SEO/un avertissement préexistant. Navigateur : toutes les fiches à 390/1280 px, filtres, annotations, texte et liens, italiques, situations, rechargement et rendu sans JavaScript ; aucune erreur JavaScript ni débordement. Captures La Fontaine relues. Le poids reste au-dessus du budget existant : HTML 529 Ko et JS local 545 Ko, contre 479/495 Ko avant ajout ; seuils inchangés.
