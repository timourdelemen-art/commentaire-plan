# Révision des 20 copies à 20 selon le protocole V7.3 — compte-rendu (25 octobre 2026)

Document interne (non publié : `clean-publish.js` retire les `.md`). Opérateur : Claude. Statut : **état de travail** au sens de la V7.3 (A12, 10.2) : le second audit externe reste à faire, par ChatGPT de préférence.

## Références appliquées
- *Protocole du plan dynamique*, V7.3 consolidée (25 octobre 2026).
- *Mini-protocole de transformation-calibrage 6* (passage de l’architecture à la copie rédigée).

## Périmètre
Les 20 dissertations corrigées de philosophie du site (`scripts/copies20-data.json`) : 10 sujets 2026, 7 sujets de notions, 3 sujets 2025. Les documents de méthode du français ne relèvent pas de ces protocoles et n’ont pas été touchés.

## Principe : réviser, non réécrire
Chaque copie garde sa scène, son plan, ses références, sa troisième partie retenue, son reste et sa question finale. Seules les phrases que les protocoles déclaraient fautives ont été reprises ; les autres sont intactes, mot pour mot. Aucune référence ni citation nouvelle n’a été ajoutée.

## Ce qui a changé dans toutes les copies
1. **La racine dans l’introduction** (V7.3, 9.2 (3) ; mini-protocole I3). Une phrase « On attend de [la notion] qu’elle…, mais aussi qu’elle… » remplace la phrase « Du cas singulier au problème », souvent redondante avec l’analyse de la scène. Fonction en marge : « Ce que la notion demande : deux exigences ».
2. **Des pertes, non des risques** (9.2 (5), annexe 2). Les branches de l’introduction disent ce que chaque réponse perd, avec un verbe de perte (« cesse », « perd », « n’a plus », « livre à »), et non « il faut craindre », « risque » ou « il reste à dire ».
3. **Problématiques sans « au risque de »** (9.3 et annexe 2 : interdit dans un corrigé modèle). Neuf problématiques en contenaient ; toutes sont reprises dans une forme du catalogue, avec chiasme conceptuel et opérateur conservé. L’ancienne « Pourquoi… » (2025, vérité) et l’ancienne problématique à une seule perte (2025, art ; S’engager) sont remplacées. Fonction en marge : « une seule question, deux pertes » au lieu de « deux risques ».
4. **Variété des formes** (9.6 ; votre remarque sur des formulations répétitives). Problématiques : P1 ×8, P2 ×6, P3 ×4, P5 ×1, une forme hors catalogue justifiée (le temps) : aucune forme au-delà de 40 %. Branches : B1 ×8, B2 ×7, B3 ×3, B4 ×2 (Alceste et Philinte ; le vieux Turc et Candide), au lieu de B1 presque partout.
5. **I.3 et II.3 nécessaires, non contingents** (A5, 3.4.7, 6.1). Les limites formulées avec « peut », « parfois », « pas toujours » ou par simple fréquence (« bien des découvertes semblaient inutiles ») sont reformulées comme insuffisance nécessaire de la réponse qui prétend suffire, et la perte nommée est l’exigence défendue par l’autre partie.
6. **La transition II → III dévoile le présupposé** (A9, 6.5 ; mini-protocole T2). Elle reste une question brève (règle du site), mais une question qui nomme ce que les deux réponses tenaient pour acquis : « Mais savoir ce qu’on fait, est-ce nécessairement le savoir avant de le faire ? ». Huit d’entre elles ne commencent pas par « Mais », pour éviter l’automatisme.
7. **Annonces sans anticipation** (9.4 (4) ; mini-protocole I8). Les annonces qui livraient la troisième partie (« si l’image même de la prison convient », « comment la recherche peut être libre tout en répondant de ses pratiques ») sont reformulées en questions ouvertes.
8. **Réponse nette dans les termes du sujet** (9.7 ; mini-protocole C1). Neuf conclusions répondaient de biais ; elles répondent désormais avec son opérateur (« On peut être certain d’avoir bien agi, si… », « La science ne doit pas être utile, si l’on entend par là… »).

## Corrections ponctuelles
- *Avons-nous la maîtrise de nos paroles ?* : coquille « qu’choisir » supprimée ; la problématique et les branches reprennent vos exemples du catalogue (P2, B3).
- *Peut-on être certain d’avoir bien agi ?* : la III répondait par un « jugement justifié » qui glissait hors de la certitude (point relevé par l’audit ChatGPT du 18 octobre). Elle dit maintenant sur quoi porte la certitude possible : les raisons du choix, non la pureté des motifs ni la totalité des effets.
- *La nature a-t-elle besoin de nous ?* : l’introduction annonçait une perte (« un ordre pour personne ») que le développement ne traitait pas ; elle est alignée sur le développement (conservation des milieux / autonomie).
- *Ce qui est techniquement possible…* : Jonas paraphrasé avec ses termes (« prophétie de malheur » / « prophétie de bonheur ») au lieu de « pronostic de salut » ; branche « il reste à dire qui fixera la limite » (une lacune, non une perte) remplacée.
- *Peut-on concevoir une humanité sans religion ?* : trois phrases d’analyse de scène redondantes ramenées à une ; l’opérateur « pouvoir » réintroduit dans la problématique.

## Brièveté
15 copies sur 20 sont plus courtes (jusqu’à −41 mots) ; deux gagnent 10 et 12 mots (l’artiste, la science), pour énoncer la racine. Les trois copies de 2025, les plus brèves (625 à 675 mots), gagnent de 16 à 33 mots : leur introduction n’énonçait ni la racine ni deux pertes distinctes (point relevé par l’audit du 18 octobre).

## Sources synchronisées
- `scripts/copies20-resolutions.json` : exigences = racine ; empreinte, nombre de mots ; nouvelle rubrique `protocol` (racine, présupposé, forme, formes P et B, statut) ; relecture « proposée », second audit attribué à ChatGPT.
- `philosophie-annales-data.js` (10 corrigés) et `philosophie-notions-data.js` (7 corrigés) : « Ce que la notion demande », branches, problématique, plan détaillé, transitions (la seconde énonce les deux acquis puis pose la question du présupposé), conclusion.
- `philosophie-plan-data.js` : les 19 « bonnes réponses » qui reprenaient mot pour mot une phrase modifiée de la copie sont alignées.
- `index.html` : l’extrait de « S’engager… » est aligné sur la copie.

## Points à vérifier (non traités ici)
- **Exercice « Trouver le problème »** (`philosophie-chaine-data.js`) : il enseigne encore la problématique comme « deux risques » (« chaque réponse est là, avec ce qu’elle risque »). Le mettre en accord avec la V7.3 suppose de refaire ses propositions et ses justifications : chantier didactique à part, à votre décision.
- **QCM du plan pas à pas** : dans 17 étapes « limite » sur 19, la bonne réponse était déjà la plus longue avant cette révision ; c’est inchangé (règle du § 2 d’AGENTS.md à reprendre dans une PR dédiée).
- **Second audit** : la V7.3 interdit à l’opérateur de se déclarer validé. Chaque copie porte le statut « état de travail ». À auditer en priorité : la seconde branche de *Avons-nous besoin d’art ?* (forme « condition renversée », P5) et la T2 de *Ce qui est techniquement possible…* (présupposé « juger la puissance en bloc »).

## Détail par copie
### Revient-il principalement à l’État de lutter contre l’injustice ?  `2026-ag-etat-injustice`

- **Longueur** : 31 → 31 phrases ; 823 → 821 mots.
- **Racine** : une force commune qui impose le même droit à tous / un jugement capable de dire qu’une loi est injuste.
- **Présupposé commun** : Lutter contre l’injustice serait une seule tâche — décider du juste et l’imposer — qu’un seul acteur devrait porter « principalement ».
- **Forme** : réciprocité ; problématique P2 ; branches de l’introduction B1.
- **Problématique** — avant : « Confier d’abord à l’État la lutte contre l’injustice, est-ce donner à sa force le dernier mot sur le juste, et la confier d’abord à d’autres, est-ce priver la justice de force ? »  
  après : « Confier d’abord à l’État la lutte contre l’injustice, est-ce soustraire ses lois à tout jugement, et la confier d’abord aux citoyens, est-ce priver la justice de force commune ? »
- **Transition II → III** — avant : « Comment donner force au droit sans soustraire l’État à la critique ? »  
  après : « Mais la force qui garantit les droits et le jugement qui les réclame se disputent-ils vraiment la même tâche ? »

### Peut-on concevoir une humanité sans religion ?  `2026-ag-humanite-religion`

- **Longueur** : 33 → 32 phrases ; 878 → 840 mots.
- **Racine** : relier tous les hommes par des fins communes / rester faite d’hommes qui jugent par eux-mêmes.
- **Présupposé commun** : Le lien commun ne pourrait naître que d’une croyance partagée et soustraite à l’examen.
- **Forme** : réciprocité ; problématique P2 (double question coordonnée, modalité « pouvoir » conservée) ; branches de l’introduction B1.
- **Problématique** — avant : « Une humanité qui ne croirait que ce qu’elle peut prouver garderait-elle de quoi relier les hommes, et une humanité unie par la croyance resterait-elle faite d’hommes qui jugent par eux-mêmes ? »  
  après : « Une humanité qui ne croit que ce qu’elle prouve peut-elle encore relier les hommes, et une humanité unie par la foi peut-elle rester faite d’hommes qui jugent par eux-mêmes ? »
- **Transition II → III** — avant : « De quoi l’humanité a-t-elle besoin : de religion ou de liens communs ? »  
  après : « Mais un lien commun doit-il être une croyance soustraite à l’examen ? »

### L’artiste sait-il ce qu’il fait ?  `2026-an-artiste-sait`

- **Longueur** : 32 → 32 phrases ; 694 → 704 mots.
- **Racine** : être l’auteur de son œuvre / faire une œuvre nouvelle, qu’aucune recette ne contient.
- **Présupposé commun** : Savoir ce qu’on fait, ce serait le savoir avant de le faire.
- **Forme** : réciprocité ; problématique P1 ; branches de l’introduction B1.
- **Problématique** — avant : « L’artiste maîtrise-t-il son œuvre comme un savoir-faire, au risque de ne plus rien inventer, ou l’invente-t-il à l’aveugle, au risque de n’en être plus l’auteur ? »  
  après : « L’artiste maîtrise-t-il son œuvre comme un savoir-faire, qui ne laisse plus rien à inventer, ou l’invente-t-il à l’aveugle, sans plus en être l’auteur ? »
- **Transition II → III** — avant : « Comment l’artiste peut-il savoir en découvrant ce qu’il fait ? »  
  après : « Mais savoir ce qu’on fait, est-ce nécessairement le savoir avant de le faire ? »

### La science doit-elle être utile ?  `2026-an-science-utile`

- **Longueur** : 32 → 32 phrases ; 804 → 815 mots.
- **Racine** : connaître le vrai pour lui-même, y compris sans usage prévisible / répondre de ce que ses vérités permettent de faire.
- **Présupposé commun** : L’utilité et la vérité se disputeraient une même place : celle de la fin qui choisit les questions de la recherche.
- **Forme** : réciprocité ; problématique P3 (exemple du catalogue) ; branches de l’introduction B1.
- **Problématique** — avant : « La science vaut-elle par le pouvoir qu’elle donne, au risque de ne plus chercher que des vérités utiles, ou par la seule vérité, au risque d’oublier qu’elle ne connaît qu’en agissant ? »  
  après : « La science doit-elle être utile, si l’utilité la détourne des vérités sans usage, et si ses vérités deviennent malgré elle des pouvoirs ? »
- **Transition II → III** — avant : « Comment protéger la recherche libre tout en contrôlant ses risques ? »  
  après : « Mais l’utilité doit-elle être la fin qui choisit les questions, pour que la science ait à répondre de ses pouvoirs ? »

### Faut-il être inconscient pour être heureux ?  `2026-asie-inconscient-bonheur`

- **Longueur** : 31 → 31 phrases ; 730 → 704 mots.
- **Racine** : laisser en repos / durer face aux dangers réels.
- **Présupposé commun** : Connaître une menace, ce serait nécessairement la craindre.
- **Forme** : réciprocité ; problématique P3 ; branches de l’introduction B2.
- **Problématique** — avant : « Faut-il ignorer les menaces pour être heureux, au risque de ne pouvoir s’en protéger, ou les connaître, au risque de ne plus trouver de repos ? »  
  après : « Faut-il être inconscient pour être heureux, si l’insouciance livre le bonheur aux dangers qu’elle ignore, et si la lucidité ne voit les menaces qu’en perdant le repos ? »
- **Transition II → III** — avant : « Comment connaître les dangers sans faire de leur anticipation une nouvelle source d’angoisse ? »  
  après : « Mais connaître un mal, est-ce nécessairement le craindre ? »

### Sommes-nous prisonniers du langage ?  `2026-asie-langage`

- **Longueur** : 31 → 31 phrases ; 776 → 757 mots.
- **Racine** : donner de quoi penser / laisser juger ce qu’il fait penser.
- **Présupposé commun** : Être libre à l’égard du langage, ce serait pouvoir se tenir hors de lui.
- **Forme** : réciprocité ; problématique P2 ; branches de l’introduction B2.
- **Problématique** : conservée.
- **Transition II → III** — avant : « Comment une langue peut-elle à la fois limiter et porter la pensée ? »  
  après : « Mais être libre à l’égard du langage, est-ce se tenir hors de lui ? »

### Peut-on être certain d’avoir bien agi ?  `2026-g1-bien-agir`

- **Longueur** : 32 → 32 phrases ; 804 → 798 mots.
- **Racine** : procéder d’une intention droite / faire effectivement du bien.
- **Présupposé commun** : La certitude morale devrait être un savoir complet de l’acte : transparence des motifs et connaissance de tous ses effets.
- **Forme** : réciprocité ; problématique P1 ; branches de l’introduction B1.
- **Problématique** — avant : « La certitude d’avoir bien fait repose-t-elle sur l’intention, au risque d’une bonne conscience aveugle aux effets, ou sur les effets, au risque de livrer la valeur de nos actes au hasard ? »  
  après : « Peut-on tirer la certitude d’avoir bien agi de son intention, aveugle aux effets de l’acte, ou de ses effets, qui livrent sa valeur au hasard ? »
- **Transition II → III** — avant : « Comment juger une décision sans attendre une connaissance impossible de toutes ses conséquences ? »  
  après : « Mais la certitude d’avoir bien agi doit-elle être celle d’un savoir complet sur l’acte, ses motifs et ses suites ? »

### La nature a-t-elle besoin de nous ?  `2026-g1-nature-besoin`

- **Longueur** : 31 → 31 phrases ; 785 → 765 mots.
- **Racine** : se faire sans nous / conserver les milieux et les espèces qui la composent.
- **Présupposé commun** : Avoir besoin de nous, pour la nature, ce serait dépendre de notre direction : la soigner, ce serait la fabriquer.
- **Forme** : réciprocité ; problématique P1 ; branches de l’introduction B1.
- **Problématique** — avant : « Une nature confiée à nos soins serait-elle encore ce qui se fait sans nous, et une nature qui se passe de nous reste-t-elle un ordre, s’il n’est ordre pour personne ? »  
  après : « La nature se fait-elle sans nous, ce qui l’abandonne à nos destructions, ou dépend-elle de nos soins, ce qui en fait notre ouvrage ? »
- **Transition II → III** — avant : « Comment réparer les dommages sans faire de la nature un ouvrage entièrement dirigé par nous ? »  
  après : « Mais prendre soin de la nature, est-ce la diriger ? »

### Peut-on être heureux quand les autres ne le sont pas ?  `2026-me-bonheur-autres`

- **Longueur** : 32 → 31 phrases ; 789 → 774 mots.
- **Racine** : dépendre de nous / rester le bonheur d’un homme parmi les hommes.
- **Présupposé commun** : Être touché par le malheur d’autrui, ce serait le reproduire en soi : la sensibilité ne connaîtrait que la contagion de la souffrance.
- **Forme** : réciprocité ; problématique P1 ; branches de l’introduction B4.
- **Problématique** — avant : « Un bonheur fermé au malheur des autres est-il encore un bonheur humain, et un bonheur qui l’accueille peut-il jamais exister, tant qu’il y a des malheureux ? »  
  après : « Peut-on être heureux en fermant son bonheur au malheur des autres, qui cesse alors d’être humain, ou en l’y ouvrant, ce qui le rend impossible tant qu’il y a des malheureux ? »
- **Transition II → III** — avant : « Comment être heureux sans ignorer ni reproduire la souffrance d’autrui ? »  
  après : « Mais être touché par le malheur d’autrui, est-ce le reproduire en soi ? »

### Avons-nous la maîtrise de nos paroles ?  `2026-me-paroles`

- **Longueur** : 34 → 33 phrases ; 748 → 744 mots.
- **Racine** : nous engager : répondre de ce que nous disons / dire plus que ce que nous avions prévu.
- **Présupposé commun** : Maîtriser une parole, ce serait en fixer le sens avant de la dire.
- **Forme** : réciprocité ; problématique P2 (exemple du catalogue) ; branches de l’introduction B3 (exemple du catalogue).
- **Problématique** — avant : « Choisir nos mots nous donne-t-il la maîtrise de nos paroles, si leur sens dépend aussi d’autrui ; et si ce sens nous échappe, de quoi pouvons-nous encore répondre ? »  
  après : « Maîtriser ses paroles, est-ce ne plus dire que ce qu’on pensait déjà, et ne pas les maîtriser, est-ce cesser de pouvoir en répondre ? »
- **Transition II → III** — avant : « Quelle responsabilité demeure lorsque nous ne décidons pas seuls du sens de nos paroles ? »  
  après : « Mais maîtriser une parole, est-ce en fixer le sens avant de la dire ? »

### L’idée d’inconscient remet-elle en cause la responsabilité ?  `notion-inconscient`

- **Longueur** : 32 → 32 phrases ; 842 → 838 mots.
- **Racine** : n’imputer que ce que nous avons voulu / faire répondre de ce qui vient de nous.
- **Présupposé commun** : Répondre d’un acte, ce serait en avoir été l’auteur transparent : la responsabilité serait tout ou rien, mesurée à la conscience du moment.
- **Forme** : réciprocité ; problématique P1 ; branches de l’introduction B1.
- **Problématique** — avant : « L’idée d’inconscient fait-elle de nous les instruments de désirs ignorés, au risque de tout excuser, ou restons-nous responsables, au risque de répondre de ce que nous n’avons pas voulu ? »  
  après : « L’idée d’inconscient fait-elle de nous les instruments de désirs ignorés, dont nul ne répondrait plus, ou nous en laisse-t-elle les auteurs, tenus de répondre de ce que nous n’avons pas voulu ? »
- **Transition II → III** — avant : « Comment juger une responsabilité qui n’est ni nulle ni totale ? »  
  après : « Mais répondre d’un acte, est-ce en avoir été l’auteur transparent ? »

### S’engager, est-ce renoncer à sa liberté ?  `notion-liberte`

- **Longueur** : 31 → 31 phrases ; 765 → 745 mots.
- **Racine** : pouvoir choisir autrement / passer dans des actes qui durent.
- **Présupposé commun** : S’engager, ce serait se lier une fois pour toutes : la décision passée commanderait seule l’avenir.
- **Forme** : réciprocité ; problématique P2 ; branches de l’introduction B1.
- **Problématique** — avant : « S’engager, est-ce perdre la liberté de revenir sur ses choix, ou lui donner un sens en choisissant ce qui nous lie ? »  
  après : « S’engager, est-ce soumettre sa liberté au choix d’hier, et ne pas s’engager, est-ce la laisser vide ? »
- **Transition II → III** — avant : « Comment une promesse peut-elle obliger sans supprimer le jugement présent ? »  
  après : « S’engager, est-ce donc se lier une fois pour toutes ? »

### Suffit-il d’avoir raison pour convaincre ?  `notion-raison`

- **Longueur** : 32 → 32 phrases ; 810 → 807 mots.
- **Racine** : être produite par des raisons / être l’adhésion propre de l’autre.
- **Présupposé commun** : Convaincre, ce serait produire une adhésion en l’autre : par la seule force de la preuve, ou par une action sur ses passions.
- **Forme** : réciprocité ; problématique P3 ; branches de l’introduction B2.
- **Problématique** — avant : « La vérité s’impose-t-elle à tout esprit qui raisonne, au risque de mépriser ceux qu’elle ne convainc pas, ou doit-elle gagner les cœurs, au risque de persuader au lieu de convaincre ? »  
  après : « Suffit-il d’avoir raison pour convaincre, si la preuve seule ne voit en celui qui résiste qu’un sot, et si gagner son esprit oblige à plaire plutôt qu’à prouver ? »
- **Transition II → III** — avant : « Comment rendre la vérité accessible sans la remplacer par la séduction ? »  
  après : « Mais gagner l’esprit de l’autre, est-ce agir sur lui, au lieu de le laisser juger ? »

### Ce qui est techniquement possible est-il toujours souhaitable ?  `notion-technique`

- **Longueur** : 32 → 32 phrases ; 858 → 832 mots.
- **Racine** : accroître notre pouvoir / que ce pouvoir reste le nôtre : pouvoir ne pas l’exercer.
- **Présupposé commun** : Le souhaitable se déciderait au niveau du possible lui-même, comme puissance accordée ou refusée en bloc.
- **Forme** : réciprocité ; problématique P3 ; branches de l’introduction B2.
- **Problématique** — avant : « Faut-il réaliser tout ce que la technique rend possible, au risque d’en devenir les esclaves, ou lui fixer des limites, au risque de ne savoir ni où ni pourquoi ? »  
  après : « Ce qui est techniquement possible est-il toujours souhaitable, si réaliser tout le possible nous en rend dépendants, et si y renoncer prive les hommes de ses remèdes ? »
- **Transition II → III** — avant : « À quelles fins devons-nous soumettre notre puissance technique ? »  
  après : « Est-ce bien le possible lui-même, comme puissance, qu’il faut juger ? »

### Le temps est-il nécessairement destructeur ?  `notion-temps`

- **Longueur** : 31 → 31 phrases ; 839 → 835 mots.
- **Racine** : faire passer toute chose / être la durée où les choses se font.
- **Présupposé commun** : Passer, ce serait être anéanti : ce que le temps fait passer ne serait plus rien.
- **Forme** : réciprocité ; problématique hors catalogue justifiée : alternative croisée à « alors que » (chaque branche nomme ce qu’exige l’autre) ; branches de l’introduction B2.
- **Problématique** : conservée.
- **Transition II → III** — avant : « Comment reconnaître les créations du temps sans prétendre qu’elles compensent ses destructions ? »  
  après : « Ce que le temps fait passer est-il pour autant anéanti ? »

### Le travail nous rend-il plus humain ?  `notion-travail`

- **Longueur** : 31 → 31 phrases ; 820 → 817 mots.
- **Racine** : former celui qui l’accomplit / le laisser maître de ce qu’il fait.
- **Présupposé commun** : Le travail aurait sur l’homme un effet qui lui appartient en tant que travail, quelle que soit son organisation.
- **Forme** : réciprocité ; problématique P1 ; branches de l’introduction B2.
- **Problématique** — avant : « Le travail humanise-t-il en formant celui qui transforme la nature, au risque d’oublier la peine qui l’asservit, ou n’est-il que peine, au risque d’oublier que l’homme se forme par lui ? »  
  après : « Le travail humanise-t-il celui qui façonne la matière, ce qui ne dit plus rien de l’ouvrier qu’il asservit, ou n’est-il qu’une peine, ce qui fait perdre ce que l’homme apprend en travaillant ? »
- **Transition II → III** — avant : « De quoi dépend qu’un travail forme plutôt qu’il n’aliène ? »  
  après : « Ce que le travail fait de l’homme tient-il au travail lui-même ? »

### Toute vérité est-elle bonne à dire ?  `notion-verite`

- **Longueur** : 31 → 30 phrases ; 861 → 820 mots.
- **Racine** : ne pas tromper / éclairer celui à qui l’on parle.
- **Présupposé commun** : Le devoir de vérité porterait sur chaque énoncé vrai : dire vrai, ce serait divulguer tout ce que l’on sait.
- **Forme** : réciprocité ; problématique P2 ; branches de l’introduction B4.
- **Problématique** — avant : « Faut-il dire toute vérité, au risque de blesser sans éclairer, ou choisir celles qu’on dit, au risque de décider pour les autres de ce qu’ils peuvent entendre ? »  
  après : « Dire toute vérité, est-ce cesser d’éclairer celui qu’on blesse, et en taire certaines, est-ce décider à sa place de ce qu’il peut savoir ? »
- **Transition II → III** — avant : « À quelles conditions le silence protège-t-il sans priver autrui de ce qu’il doit savoir ? »  
  après : « Le devoir de vérité oblige-t-il pourtant à divulguer tout ce que l’on sait ? »

### La vérité est-elle toujours convaincante ?  `2025-me-verite`

- **Longueur** : 23 → 24 phrases ; 625 → 657 mots.
- **Racine** : s’imposer par ses raisons / être reconnue par d’autres esprits.
- **Présupposé commun** : La validité d’une preuve et sa réception seraient extérieures l’une à l’autre : l’une affaire de raisons, l’autre affaire de dispositions.
- **Forme** : réciprocité ; problématique P1 ; branches de l’introduction B2.
- **Problématique** — avant : « Pourquoi une vérité peut-elle ne pas convaincre, sans que sa valeur se réduise à l’adhésion qu’elle obtient ? »  
  après : « Une vérité convainc-elle toujours par ses raisons, ce qui fait de tout refus une déraison, ou par l’accueil qu’on lui fait, ce qui la met au rang de la flatterie ? »
- **Transition II → III** — avant : « Comment rendre une preuve accessible sans remplacer sa force par la séduction ? »  
  après : « La force d’une vérité et son accueil se jouent-ils vraiment l’un sans l’autre ? »

### Notre avenir dépend-il de la technique ?  `2025-me-avenir-technique`

- **Longueur** : 23 → 23 phrases ; 636 → 668 mots.
- **Racine** : être rendu possible par des moyens / rester le nôtre : choisi.
- **Présupposé commun** : La technique ne fournirait que des moyens neutres, séparés des fins que nous choisirions d’un dehors intact.
- **Forme** : réciprocité ; problématique P1 ; branches de l’introduction B3.
- **Problématique** — avant : « La technique détermine-t-elle notre avenir, ou pouvons-nous le choisir alors que ses moyens transforment déjà nos possibilités ? »  
  après : « Notre avenir dépend-il de la technique, qui le choisit à notre place, ou de nos décisions, qui oublient que ses moyens ont déjà changé nos choix ? »
- **Transition II → III** — avant : « Comment choisir nos fins lorsque les techniques modifient déjà nos possibilités de choix ? »  
  après : « La technique n’est-elle qu’un ensemble de moyens, que nos fins viendraient diriger après coup ? »

### Avons-nous besoin d’art ?  `2025-me-besoin-art`

- **Longueur** : 23 → 23 phrases ; 675 → 690 mots.
- **Racine** : répondre à un manque réel / rester l’affaire d’un goût libre.
- **Présupposé commun** : Avoir besoin de quelque chose, ce serait avoir besoin d’un objet déterminé, le même pour tous.
- **Forme** : condition renversée (faire de l’art un besoin compromet sa liberté) ; problématique P5 ; branches de l’introduction B3.
- **Problématique** — avant : « Avons-nous besoin d’art pour vivre humainement, sans que ce besoin impose à chacun les mêmes œuvres et les mêmes goûts ? »  
  après : « Pour vivre humainement, n’avons-nous pas besoin de l’art, qui donne forme à ce que nous vivons ? Mais si nous en avons besoin, son goût peut-il rester libre ? »
- **Transition II → III** — avant : « Comment reconnaître ce besoin sans imposer à tous les mêmes œuvres et les mêmes goûts ? »  
  après : « Avoir besoin d’art, est-ce avoir besoin de certaines œuvres ? »

