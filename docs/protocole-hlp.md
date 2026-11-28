# Protocole HLP (terminale) — corrigés brefs, au niveau de l’excellence

Document interne, non publié (`clean-publish.js` retire les `.md`). Version 3.1, 28 novembre 2026 : clarification des structures propres aux quatre exercices, sans plan obligatoire ni opposition dialectique artificielle.

## 0. Ce que demande l’épreuve (sources officielles)

- **Note de service du 11 septembre 2026** (BO spécial n° 4 du 17 septembre 2026, à partir de la session 2027) : 4 heures ; un texte, deux questions notées chacune sur 10 ; une **interprétation** (littéraire ou philosophique), « un développement qui explicite et analyse un enjeu majeur du texte » ; un **essai** (de l’autre discipline), une réponse argumentée à une question que soulève le texte ; deux réponses **d’ampleur comparable**, sur **deux copies distinctes**, corrigées séparément par un professeur de lettres et un professeur de philosophie ; la maîtrise de la langue compte dans toute la copie (orthographe et syntaxe, vocabulaire, clarté, organisation) ; une copie défaillante sur l’ensemble de ces points ne peut avoir la moyenne.
- **Le candidat ne choisit pas** : le sujet fixe la combinaison, toujours croisée. Combinaison A : interprétation littéraire, puis essai philosophique. Combinaison B : interprétation philosophique, puis essai littéraire.
- **Annexe officielle – échelle descriptive 2026** : pour l’interprétation, le texte est étudié à travers certains éléments significatifs, non dans son intégralité ; sont valorisés la précision de la lecture, l’attention à l’écriture, à la langue, au lexique, aux concepts et aux arguments, ainsi que l’organisation d’une explication argumentée en prise sur la lettre et l’esprit. Pour l’essai, sont valorisés l’attention à la question et à ce qui la justifie au regard du texte, la cohérence et la justification de la réponse, l’appui sur des éléments déterminants du texte et la mobilisation pertinente des connaissances acquises.
- **Attendus du haut de l’échelle** : l’interprétation doit faire apparaître les élaborations conceptuelles ou littéraires, les implicites et les difficultés du texte, et situer sa position par rapport à la question ou à d’autres textes. L’essai doit approfondir sa réponse de manière progressive, élaborer précisément ses arguments, situer sa position par rapport à celle du texte et mobiliser une culture précise. Une réponse peut entrer en dialogue avec elle-même, mais cela ne commande ni une antithèse automatique ni une partie réservée à l’objection.
- **Ressources Éduscol antérieures (2019-2021) et documents académiques** : ils éclairent la liberté de composition, l’importance de la lecture sélective et la pensée personnelle. Ils ne remplacent pas la note de service 2026. La première personne est possible, non obligatoire ; aucun schéma rhétorique ou dissertatif n’est prescrit.
- **Écueils signalés par les ressources d’évaluation** : contresens, paraphrase, propos vague, citations sans ordre ; juxtaposition d’exemples, récitation de cours, propos qui pourrait avoir été écrit sans l’enseignement de spécialité.

**Conséquence.** Les architectures ci-dessous sont des repères de composition propres aux modèles du site, non des plans réglementaires. Elles doivent aider l’élève à produire une réponse ordonnée et complète sans lui faire imiter une dissertation ou une explication de texte du tronc commun.

## 1. Règles communes

- **Deux réponses autonomes.** Chacune situe le texte pour son correcteur ; l’essai ne renvoie jamais à l’interprétation (« comme on l’a vu »). Elles ne se répètent pas : l’interprétation explique le texte, l’essai pense la question qu’il soulève.
- **Ampleur comparable** : viser environ 400 à 550 mots par réponse terminale dans les modèles, avec un écart inférieur à 15 %. C’est un repère de rédaction, pas un quota officiel : une réponse plus courte reste préférable si elle est complète ; ne jamais ajouter de remplissage pour atteindre un nombre. Introduction et conclusion restent proportionnées au travail réellement accompli.
- **Une fonction par phrase**, affichée à côté d’elle ; une phrase sans fonction est supprimée.
- **Citations du texte du sujet** : brèves, exactes (contrôle par script sur `scripts/hlp-textes.json`), intégrées à la syntaxe, toujours analysées. **Aucune citation d’une autre œuvre de mémoire** : une œuvre extérieure est décrite précisément (titre, auteur, épisode, détail) ; une citation n’est gardée que vérifiée mot pour mot dans une édition.
- **Langue** : sobre, exacte, sans jargon ; aucun mot réservé aux documents internes (AGENTS.md § 2).
- **Test de progression propre à l’exercice** : chaque mouvement doit modifier ce que le lecteur comprend du texte ou ce que la réponse permet de soutenir. Si deux paragraphes peuvent s’échanger sans rien changer, leur ordre ou leur fonction est à reprendre.
- **Transition** : une phrase qui rend visible le lien entre deux mouvements lorsqu’il faut le marquer (conséquence, contraste, précision, condition). Une question ouverte est possible, jamais obligatoire ; pas de formule répétée ni de transition artificielle.


## 1 bis. Règles issues de l’audit (V2)

- **R1. Citer juste.** Pour chaque citation, relire la phrase entière : qui parle, y a-t-il une hypothèse (« si »), quelle est la suite. Ne jamais couper une énumération ou une phrase là où elle cesse d’arranger ; ne jamais faire dire à une citation ce qu’on attend d’elle.
- **R2. Ce qui résiste.** Avant de rédiger, relever trois éléments du texte qui gênent la lecture défendue, et en intégrer au moins un. Pour « Dans quelle mesure… ? », chercher d’abord la condition dans la lettre du texte (si, pour, à moins que…).
- **R3. Les voix.** Distinguer ce que le personnage valorise et ce que l’interprète en déduit (« pour Bordeu… ; mais l’image peut se lire… »). Ne pas prêter à un personnage des raisons que le texte ne donne pas.
- **R4. Les verbes du texte.** Garder les verbes du texte (dominer, affaiblir) ; ne jamais leur substituer un verbe plus fort (abolir, ne plus sentir).
- **R5. Les définitions tenues.** Après chaque étape ou moment, vérifier que le mot clé garde le sens posé dans l’introduction.
- **R6. La réponse mise à l’épreuve.** Lorsqu’un cas, une objection ou un point de vue contraire menace réellement la réponse, l’essai l’examine et montre ce qu’il oblige à maintenir ou à préciser. Il n’est pas nécessaire de fabriquer une opposition ni de réserver une partie à une objection.
- **R7. La position est assumée.** L’essai doit rendre visible la réponse défendue et les raisons qui la soutiennent. La première personne est possible, mais elle n’est pas une formule obligatoire.
- **R8. Une référence, une analyse exacte.** Toute œuvre citée est accompagnée d’un détail précis (un vers vérifié, un procédé), et le procédé prouve exactement ce qu’on affirme (l’impersonnalité de Flaubert ne prouve pas son absence d’émotion).
- **R9. L’essai ne recommente pas.** Le texte du sujet sert de point de départ, d’objection ou d’écho, jamais de preuve centrale analysée de nouveau.
- **R11. Mots-outils et provenance.** Vérifier la valeur des mots-outils cités ou commentés (mais, et, si : concession, addition, hypothèse) et la provenance de chaque citation (texte, chapeau ou note du sujet) ; une note du sujet se cite comme telle.
- **R10. Varier les tics.** Pas une question rhétorique en tête de chaque étape ni la même annonce dans chaque copie : la transition-question n’apparaît que là où elle fait avancer.

## 2. Les quatre fiches

### 2.1 Interprétation littéraire (professeur de lettres)

L’interprétation littéraire est une lecture sélective guidée par la question, non un commentaire composé miniature. Elle explique comment des choix d’écriture font comprendre ou éprouver l’enjeu demandé.

- **Introduction (3 ou 4 phrases).** (1) Situer : auteur, œuvre, date, qui parle, dans quelle situation, sous quelle forme (dialogue, sonnet, récit…). (2) Reprendre la question et le sens de son mot décisif (« idéal », « paradoxale », « richesse de l’instant »). (3) La lecture défendue : ce que l’écriture fait comprendre, en une phrase. (4) L’ordre des étapes.
- **Mouvements (généralement 2 ou 3).** Ils suivent une progression du sens, non un relevé linéaire : ce que le texte met en place ; ce que sa forme fait apparaître ou transforme ; ce que la tension ou la fin oblige à comprendre. Ce parcours s’adapte au texte : il n’impose ni trois paragraphes ni un ordre fixe.
- **Appui et analyse.** Partir d’un détail significatif (mot, image, rythme, voix, scène, composition) ; l’analyser dans son contexte ; montrer l’effet ou le sens qu’il produit ici ; revenir à la question. La quantité de citations ne compte pas : leur précision et leur exploitation comptent.
- **Conclusion (2 phrases).** La réponse, dans les mots de la question ; ce que l’écriture a fait comprendre. Ni ouverture ni référence extérieure.
- **Pièges propres.** Paraphrase ; relevé de procédés sans effet ; dans un dialogue, confondre le personnage et l’auteur ; anachronisme de lecture ; poème paraphrasé au lieu d’être analysé dans sa forme (vers, strophes, chute).

### 2.2 Interprétation philosophique (professeur de philosophie)

L’interprétation philosophique est une lecture ciblée de l’enjeu et de l’argument du texte. Elle n’est ni une explication linéaire exhaustive ni une dissertation prenant le texte pour prétexte.

- **Introduction (3 ou 4 phrases).** (1) Situer : auteur, œuvre, et de quoi parle le texte. (2) Reprendre la question et le sens de son mot décisif (pour « Dans quelle mesure… ? » : un degré et une condition). (3) La thèse du texte rapportée à la question, et le problème qu’elle résout. (4) Les moments de l’argument qui seront suivis.
- **Mouvements (généralement 2 ou 3).** Suivre les opérations décisives pour la question : thèse ou réponse ; raison, distinction ou exemple qui la fonde ; conséquence, condition ou difficulté qui en précise la portée. On ne résume pas chaque phrase et l’on ne force pas le texte à entrer dans trois temps.
- **Preuve.** Citer le terme ou la phrase ; définir les termes ; expliciter l’opération (raison, distinction, condition, conséquence, rôle d’un exemple dans l’argument) ; dire ce qui est établi pour la question. Aucune référence à un autre auteur.
- **Conclusion (2 phrases).** La réponse dans les termes de la question (degré et condition si « dans quelle mesure ») ; la portée de la thèse, tirée du texte.
- **Pièges propres.** Résumer au lieu d’expliquer ; plaquer un cours ou un auteur ; dans un dialogue, prendre une voix pour la thèse sans voir ce que l’autre voix lui oppose.

### 2.3 Essai littéraire (professeur de lettres)

L’essai littéraire est une réponse personnelle, argumentée et nourrie d’œuvres à une question que le texte fait naître. Ce n’est pas une dissertation littéraire raccourcie.

- **Entrée en matière (brève).** Partir du lien entre le texte et la question ; éclairer les mots décisifs ; formuler la réponse que l’on va défendre et la raison qui la soutient. Pas d’accroche plaquée, de problématique artificielle ou d’annonce d’un plan dialectique.
- **Développement (2 ou 3 mouvements possibles, sans plan imposé).** Une œuvre ou une forme fait apparaître une dimension de la question ; une autre peut la confirmer, la déplacer ou la contredire ; la comparaison permet alors de préciser la réponse. L’ordre doit être nécessaire : chaque mouvement apporte un nouvel éclairage ou oblige à réviser ce qui précède. Les transitions nomment sobrement ce déplacement (écart, conséquence, limite, prolongement) ; elles ne sont pas obligatoirement des questions.
- **Appui.** Des œuvres précises (littérature et autres arts), analysées dans leur écriture ou leur forme ; le texte du sujet demeure le point de départ et la position de l’essai se situe par rapport à ce qu’il donne à penser, sans le réinterpréter une seconde fois. Une comparaison est utile si elle fait apparaître un écart décisif. Deux œuvres bien exploitées valent mieux qu’une liste.
- **Conclusion (2 ou 3 phrases).** La réponse avec le petit mot du sujet ; ce que le raisonnement a fait comprendre de la littérature et des arts ; une question seulement si elle naît du raisonnement (jamais sur « la littérature » ou « la vie » en général).

### 2.4 Essai philosophique (professeur de philosophie)

L’essai philosophique est une réponse argumentée à une question née du texte. Il engage une pensée personnelle, mais n’est ni une dissertation abrégée ni une explication du texte.

- **Entrée en matière (brève).** Faire apparaître le lien entre le texte et la question ; préciser les notions dont dépend la réponse ; annoncer une position initiale et sa raison principale. Il n’est pas nécessaire de fabriquer deux exigences opposées si le sujet n’en fait pas apparaître.
- **Développement (2 ou 3 mouvements possibles, sans plan imposé).** Établir une proposition par une raison ; la rendre intelligible par un exemple précis ; examiner, si cela est nécessaire, un cas qui la met en difficulté ; préciser alors ce que l’on peut maintenir. Selon le sujet, on peut distinguer deux sens, examiner une condition, comparer deux réponses ou éprouver une affirmation par un contre-exemple. Aucun de ces parcours n’est obligatoire. Chaque mouvement doit faire progresser la réponse, et non répéter la même idée.
- **Preuve.** Une proposition générale ; la raison qui l’établit (distinction, condition, conséquence) ; un exemple qui la montre. L’exemple ou l’auteur accompagne la preuve, il ne la remplace pas. Un auteur n’est cité que s’il fait avancer l’idée, et sans citation de mémoire.
- **Transitions.** Une phrase suffit lorsqu’un passage doit être rendu visible : conséquence, distinction, objection, changement de niveau ou précision. Elle indique pourquoi le mouvement suivant est nécessaire ; elle ne pose pas systématiquement une question et ne reprend pas une formule de dissertation.
- **Conclusion (2 ou 3 phrases).** Une réponse nette dans les termes du sujet ; sa portée ou sa condition ; une difficulté résiduelle seulement si le raisonnement en a réellement fait apparaître une.

## 3. Le couplage des deux réponses

- **Combinaison A (interprétation littéraire, essai philosophique).** L’essai dégage du texte la question philosophique (ex. Voltaire : ce que veut dire « émancipatrice ») et la traite par des distinctions ; le texte lui sert d’exemple ou d’objection, pas de modèle à paraphraser.
- **Combinaison B (interprétation philosophique, essai littéraire).** L’essai passe des idées du texte à ce que la littérature et les arts en font (ex. Diderot : la sensibilité dans la création) ; le texte du sujet est une pièce du raisonnement, puis les œuvres prennent le relais.
- **Contrôle de non-répétition** : aucune phrase de l’essai ne refait l’analyse de l’interprétation.

## 4. L’entraînement autour du corrigé (format des parcours du site)

Pour chaque réponse : trois propositions au clic (Solide, Défendable, À revoir, chacune justifiée ; la Solide n’est pas habituellement la plus longue) ; cinq étapes guidées (consigne courte, aide, réponse attendue) ; trois critères de relecture ; le modèle phrase par phrase.

## 5. Contrôles avant publication

1. Citations du sujet : chaque citation est retrouvée mot pour mot dans le PDF officiel et replacée dans son contexte.
1 bis. Références extérieures : toute citation littéraire, philosophique ou historique est accompagnée, dans les données de travail, de l’auteur, de l’œuvre, du repère précis, de l’édition et d’une vérification dans le texte original ou une édition savante. Une modernisation orthographique est signalée. Une liste de titres ou une mention « citation vérifiée » ne remplace pas cette vérification.
1 ter. Attendus du haut de l’échelle 2026 : interprétation attentive aux implicites et aux difficultés ; essai qui approfondit progressivement sa réponse, situe sa position par rapport au texte et mobilise des connaissances précises. La qualité de la langue est prise en compte dans les deux réponses.
2. Longueur : aucun nombre de mots n’est prescrit par les textes officiels. Pour les modèles de Terminale, viser environ 400 à 550 mots par réponse, sans allonger pour atteindre un quota ; écart entre les deux réponses inférieur à 15 %. Les sujets historiques de Première sont plus courts et ne sont pas comparés aux modèles de Terminale.
2 bis. Règles R1 à R11 vérifiées une à une.
3. Introduction et conclusion : chaque phrase porte une fonction identifiable ; elles restent proportionnées à l’exercice.
4. Test de progression : chaque mouvement ajoute une raison, un éclairage ou une précision qui dépend de ce qui précède.
5. Fiche de la discipline respectée ; couplage vérifié : interprétation littéraire/philosophique et essai dans l’autre discipline en Terminale.
6. Audit de lecture indépendant : le relecteur ne reçoit que le sujet, le texte, les attendus officiels (§ 0) et le corrigé. À défaut d’un audit distinct effectivement réalisé, ne pas présenter le modèle comme validé par un jury.
