# Audit ciblé — parcours de problématisation philosophique

Date : 9 octobre 2026. Audit statique du code GitHub, sans test navigateur ni mesure auprès d'élèves. Aucun changement du site en production.

## Périmètre vérifié
- `philosophie-diagnostic.html` et `philosophie-diagnostic.js`
- `philosophie-problematisation.html`, `philosophie-qcm.js`
- `philosophie-probleme-pas-a-pas.html`, `philosophie-chaine.js`, `philosophie-chaine-data.js`
- `philosophie-dissertation-entrainement.html`, `philosophie-parcours.js`

## Acquis à préserver
1. Diagnostic de cinq situations avec explications et orientation vers un exercice précis.
2. Chaîne de sept opérations pour construire une problématique, avec retours sur chaque proposition.
3. Trois niveaux : choix au clic, rédaction partielle, rédaction autonome.
4. Plusieurs sujets et possibilité de recommencer.
5. QCM de problématique où l'élève doit aussi qualifier les erreurs des distracteurs.
6. Principes pédagogiques cohérents : faire apparaître les deux réponses, les pertes de chacune, puis la question qui les articule.

## Constats et risques
### P1 — « Étape faite » n'est pas « compétence acquise »
`philosophie-parcours.js` permet de cocher manuellement une étape dans `localStorage`. C'est un suivi déclaratif, pas une validation des apprentissages. Ne pas supprimer cette liberté ; distinguer visuellement « parcouru », « entraîné », « confirmé sur un autre sujet » si une progression mesurée est ajoutée.

### P1 — Niveau 2 : autoévaluation trop binaire
Dans `philosophie-chaine.js`, une réponse écrite d'au moins cinq caractères donne accès à une réponse modèle, puis l'élève choisit « Oui, je continue » ou « Je reprends ma phrase ». Ajouter à terme une courte grille d'autocontrôle (deux réponses présentes ? perte précise de chacune ? question ouverte ? sujet respecté ?) avant de continuer, sans faire croire à une correction automatique fiable.

### P1 — Transfert non vérifié automatiquement
Le niveau 3 renvoie vers une annale complète. C'est pédagogiquement cohérent, mais le code inspecté ne permet pas d'établir que la compétence est réutilisée sans aide sur un sujet nouveau. Concevoir un test de transfert léger et non bloquant.

### P2 — Risque d'une forme unique de problématique
La chaîne oui/non/perte/perte est féconde, mais ne doit pas être présentée comme le seul schéma possible pour tous les sujets philosophiques. Vérifier les consignes générales et les corrigés pour distinguer outil pédagogique et dogme de composition.

### P2 — Diagnostic : cinq items pour cinq compétences
Une seule situation par compétence est insuffisante pour établir une maîtrise. Le diagnostic dit déjà « pas de note » ; préserver ce langage et éviter toute inférence de niveau définitif.

### P2 — Contrôler les distracteurs
Les explications sont souvent substantielles ; tester en situation si les mauvaises réponses sont assez plausibles pour discriminer compréhension et simple reconnaissance.

## Protocole de vérification proposé
Pour trois sujets différents : (A) élève au clic, (B) même geste rédigé avec modèle, (C) sujet inédit sans aide.
- Mesurer si l'élève sait justifier les deux réponses.
- Vérifier qu'il identifie la limite interne de chacune.
- Vérifier qu'il formule une question ouverte propre au sujet.
- Tester retour en arrière, changement de niveau, reprise après erreur, navigation mobile et clavier.
- Observer si la progression affichée reste honnête et compréhensible.

## Prochain petit changement recommandé
Ajouter au niveau 2 une grille d'autocontrôle non bloquante, sans réécriture du moteur ni ajout de dépendance. Vérifier ensuite au navigateur avant fusion. Ne pas modifier la branche principale sans validation.

## Pour Claude et ChatGPT
Répondre contradictoirement à trois questions : faut-il vraiment un moteur commun aux matières ? La grille oui/non est-elle trop systématique ? Quelle preuve minimale de transfert suffit sans alourdir l'interface ?
