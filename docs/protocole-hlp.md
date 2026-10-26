# Protocole HLP (terminale) — corrigés brefs, au niveau de l’excellence

Document interne, non publié (`clean-publish.js` retire les `.md`). Version 1, 26 octobre 2026. À relire après l’audit des deux premiers corrigés (Voltaire, Diderot).

## 0. Ce que demande l’épreuve (sources officielles)

- **Note de service du 11 septembre 2026** (BO spécial n° 4 du 17 septembre 2026, à partir de la session 2027) : 4 heures ; un texte, deux questions notées chacune sur 10 ; une **interprétation** (littéraire ou philosophique), « un développement qui explicite et analyse un enjeu majeur du texte » ; un **essai** (de l’autre discipline), une réponse argumentée à une question que soulève le texte ; deux réponses **d’ampleur comparable**, sur **deux copies distinctes**, corrigées séparément par un professeur de lettres et un professeur de philosophie ; la maîtrise de la langue compte dans toute la copie (orthographe et syntaxe, vocabulaire, clarté, organisation) ; une copie défaillante sur l’ensemble de ces points ne peut avoir la moyenne.
- **Le candidat ne choisit pas** : le sujet fixe la combinaison, toujours croisée. Combinaison A : interprétation littéraire, puis essai philosophique. Combinaison B : interprétation philosophique, puis essai littéraire.
- **Éduscol, « Attendus des épreuves, éléments d’évaluation »** (2019) et **grille d’évaluation** (2021) ; **inspection de Rennes**, « Les attendus de l’épreuve de spécialité HLP » (novembre 2022) :
  - interprétation : « compréhension et élucidation du sens du texte », lu « dans certains de ses éléments les plus significatifs », non dans son intégralité (l’exhaustivité est « une erreur méthodologique ») ; précision de la lecture, attention à la langue, au lexique, aux concepts et aux arguments ; un commentaire « circonstancié, argumenté et en prise sur la lettre comme sur l’esprit du texte » ; « un exercice de lecture-compréhension ; pas une épreuve de Culture générale » ;
  - essai : « élaborer, tenir, mettre à l’épreuve et défendre une position » ; « pensée personnelle, progressive et ordonnée », « librement, mais avec ordre », rédigée à la première personne ; « plus bref et plus libre que la dissertation » ; la question « prend son sens dans le texte » ; références précises et pertinentes, jamais d’étalage ; « nullement un prétexte à la simple restitution de connaissances » ;
  - écueils : contresens, paraphrase, propos vague, citations sans ordre ; juxtaposition d’exemples, récitation de cours, propos « qui aurait pu être rédigé au début de l’année » ;
  - aucun schéma imposé : l’essai « n’implique aucun schéma rhétorique ou dissertatif particulier » ; aucune longueur fixée ; évaluation « essentiellement positive ».

**Conséquence.** Les structures ci-dessous sont celles des modèles du site : elles rendent visible un raisonnement ordonné. Elles ne sont jamais présentées à l’élève comme une règle de l’épreuve.

## 1. Règles communes

- **Deux réponses autonomes.** Chacune situe le texte pour son correcteur ; l’essai ne renvoie jamais à l’interprétation (« comme on l’a vu »). Elles ne se répètent pas : l’interprétation explique le texte, l’essai pense la question qu’il soulève.
- **Ampleur comparable** : 400 à 450 mots chacune dans un modèle (choix du site pour la brièveté ; une copie réelle de deux heures est souvent plus longue). Introduction : 50 à 70 mots ; conclusion : 40 à 60 mots.
- **Une fonction par phrase**, affichée à côté d’elle ; une phrase sans fonction est supprimée.
- **Citations du texte du sujet** : brèves, exactes (contrôle par script sur `scripts/hlp-textes.json`), intégrées à la syntaxe, toujours analysées. **Aucune citation d’une autre œuvre de mémoire** : une œuvre extérieure est décrite précisément (titre, auteur, épisode, détail) ; une citation n’est gardée que vérifiée mot pour mot dans une édition.
- **Langue** : sobre, exacte, sans jargon ; aucun mot réservé aux documents internes (AGENTS.md § 2).
- **Test de permutation** (protocole de dissertation littéraire) : si deux étapes ou deux moments peuvent s’échanger sans changer le raisonnement, c’est une liste ; reprendre.
- **Transition** : une phrase, une question ouverte née de ce qui vient d’être établi (comment, pourquoi, que devient…) ; interdits : « … suffit-il ? », « Nous verrons maintenant… ». L’étape suivante reprend son mot clé.

## 2. Les quatre fiches

### 2.1 Interprétation littéraire (professeur de lettres)

Méthode du commentaire du site, en réduit : X, ce que le texte présente avec sa voix et sa forme ; Y, ce que l’écriture en fait comprendre ou éprouver ; la question de l’épreuve dit quelle dimension suivre.

- **Introduction (3 ou 4 phrases).** (1) Situer : auteur, œuvre, date, qui parle, dans quelle situation, sous quelle forme (dialogue, sonnet, récit…). (2) Reprendre la question et le sens de son mot décisif (« idéal », « paradoxale », « richesse de l’instant »). (3) La lecture défendue : ce que l’écriture fait comprendre, en une phrase. (4) L’ordre des étapes.
- **Étapes (3 paragraphes).** Trois moments d’une même lecture, ordonnés par la progression du sens, non par l’ordre des lignes. Chaque étape répond à une part de la question.
- **Preuve (quatre gestes du protocole de dissertation littéraire).** Situer le passage ; citer brièvement ; analyser un fait d’écriture (procédé nommé simplement, d’après le Petit manuel des procédés : image, rythme, énonciation, temps, rime, place dans la composition…) et son effet ici ; conclure sur la question. Au moins une preuve par étape, deux pour l’étape décisive.
- **Conclusion (2 phrases).** La réponse, dans les mots de la question ; ce que l’écriture a fait comprendre. Ni ouverture ni référence extérieure.
- **Pièges propres.** Paraphrase ; relevé de procédés sans effet ; dans un dialogue, confondre le personnage et l’auteur ; anachronisme de lecture ; poème paraphrasé au lieu d’être analysé dans sa forme (vers, strophes, chute).

### 2.2 Interprétation philosophique (professeur de philosophie)

Méthode de l’explication de texte, en réduit : le texte est lu comme un argument, quelle que soit sa forme.

- **Introduction (3 ou 4 phrases).** (1) Situer : auteur, œuvre, et de quoi parle le texte. (2) Reprendre la question et le sens de son mot décisif (pour « Dans quelle mesure… ? » : un degré et une condition). (3) La thèse du texte rapportée à la question, et le problème qu’elle résout. (4) Les moments de l’argument qui seront suivis.
- **Étapes (3 paragraphes).** Le mouvement de l’argument, guidé par la question : ce que le texte affirme, ce qui le fonde, ce que cela engage.
- **Preuve.** Citer le terme ou la phrase ; définir les termes ; expliciter l’opération (raison, distinction, condition, conséquence, rôle d’un exemple dans l’argument) ; dire ce qui est établi pour la question. Aucune référence à un autre auteur.
- **Conclusion (2 phrases).** La réponse dans les termes de la question (degré et condition si « dans quelle mesure ») ; la portée de la thèse, tirée du texte.
- **Pièges propres.** Résumer au lieu d’expliquer ; plaquer un cours ou un auteur ; dans un dialogue, prendre une voix pour la thèse sans voir ce que l’autre voix lui oppose.

### 2.3 Essai littéraire (professeur de lettres)

Dissertation littéraire plus brève et plus libre ; à la première personne.

- **Introduction (3 ou 4 phrases).** (1) Partir du texte du sujet : ce qu’il montre qui fait naître la question. (2) Les mots du sujet et leur sens. (3) Une seule question qui garde la tension (ce qui résiste à la réponse évidente). (4) Le chemin.
- **Moments (2 ou 3 paragraphes).** Plan dynamique littéraire en réduit : reconnaître ce que la question suggère, voir ce qui le déborde, reconfigurer. Une position est élaborée, mise à l’épreuve, défendue. Transition-question entre deux moments.
- **Preuve.** Des œuvres précises (littérature et autres arts), analysées dans leur écriture ou leur forme avec les quatre gestes ; le texte du sujet sert d’appui au moins une fois ; une référence extérieure compare et fait voir un écart (test : « grâce à cette comparaison, je comprends mieux que… »). Deux ou trois œuvres réellement exploitées, pas une liste.
- **Conclusion (2 ou 3 phrases).** La réponse avec le petit mot du sujet ; ce que le raisonnement a fait comprendre de la littérature et des arts ; une question seulement si elle naît du raisonnement (jamais sur « la littérature » ou « la vie » en général).

### 2.4 Essai philosophique (professeur de philosophie)

Dissertation philosophique plus brève et plus libre ; à la première personne.

- **Introduction (3 ou 4 phrases).** (1) Partir du texte du sujet : la situation ou l’idée qui pose la question. (2) Ce qu’on attend de la notion, et les deux exigences qui se gênent. (3) Les mots du sujet ; la question. (4) Le chemin.
- **Moments (2 ou 3 paragraphes).** Chaque moment établit une réponse et la fonde ; le suivant naît de ce qu’elle ne peut donner si elle prétend suffire (sans la déclarer fausse). La position est mise à l’épreuve, puis défendue. Transition-question.
- **Preuve.** Une proposition générale ; la raison qui l’établit (distinction, condition, conséquence) ; un exemple qui la montre. L’exemple ou l’auteur accompagne la preuve, il ne la remplace pas. Un auteur n’est cité que s’il fait avancer l’idée, et sans citation de mémoire.
- **Conclusion (2 ou 3 phrases).** Une réponse nette dans les termes du sujet ; ce qui reste à penser ; une question précise seulement si elle naît du raisonnement.

## 3. Le couplage des deux réponses

- **Combinaison A (interprétation littéraire, essai philosophique).** L’essai dégage du texte la question philosophique (ex. Voltaire : ce que veut dire « émancipatrice ») et la traite par des distinctions ; le texte lui sert d’exemple ou d’objection, pas de modèle à paraphraser.
- **Combinaison B (interprétation philosophique, essai littéraire).** L’essai passe des idées du texte à ce que la littérature et les arts en font (ex. Diderot : la sensibilité dans la création) ; le texte du sujet est une pièce du raisonnement, puis les œuvres prennent le relais.
- **Contrôle de non-répétition** : aucune phrase de l’essai ne refait l’analyse de l’interprétation.

## 4. L’entraînement autour du corrigé (format des parcours du site)

Pour chaque réponse : trois propositions au clic (Solide, Défendable, À revoir, chacune justifiée ; la Solide n’est pas habituellement la plus longue) ; cinq étapes guidées (consigne courte, aide, réponse attendue) ; trois critères de relecture ; le modèle phrase par phrase.

## 5. Contrôles avant publication

1. Citations du texte : retrouvées mot pour mot (script).
2. Longueurs : 400 à 450 mots par réponse ; écart entre les deux réponses inférieur à 15 %.
3. Introduction et conclusion : chaque phrase porte une fonction de la fiche.
4. Test de permutation des étapes ou moments.
5. Fiche de la discipline respectée ; couplage vérifié.
6. Audit par un agent distinct, qui ne reçoit que le sujet, le texte, les attendus officiels (§ 0) et le corrigé.
