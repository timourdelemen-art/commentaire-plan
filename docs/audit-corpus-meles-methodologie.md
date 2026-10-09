# Audit renforcé des 11 000 sujets — état des preuves et protocole

## Résultat vérifiable à ce stade
- La source de Claude est `PHILOSOPHIE-ANALYSE-CORPUS.md` sur `main`. Elle décrit explicitement les opérateurs du bac, les sept formes du recueil Mélès, et la chaîne **question → réponse plausible → justification → conséquences → coût → difficulté → problématique**.
- `.github/workflows/corpus-sujets.yml` télécharge les PDF, extrait quatre fichiers texte sur une branche `corpus` distincte de la publication du site. Le recueil Mélès n'est **pas** un recueil de sujets du bac.
- La typologie de Claude est un **référentiel heuristique puissant**, pas une validation automatique démontrée. Aucun comptage exhaustif fiable de tous les sujets Mélès n'a encore été produit ici : ne pas confondre lecture de la typologie, lecture du PDF et audit exhaustif des entrées.

## Modèle d'analyse à trois niveaux
1. **Morphosyntaxe** : questions, noms, articles, coordinations, citations ; portée de « ne… que », « toujours », « sans », modalité de « pouvoir », « devoir », négation et quantificateurs.
2. **Opérations sémantiques** : possibilité de fait/logique/droit, nécessité, suffisance, identification, distinction, dépendance, explication, finalité, reconnaissance, causalité, justification, compatibilité. Plusieurs opérations peuvent coexister.
3. **Logique philosophique** : justification de chaque réponse forte, implications, coût interne, contradictions dérivées, double aporie, formes paradoxales, résolutions et reste. Une catégorie grammaticale ne permet jamais à elle seule d'inférer un paradoxe.

## Protocole de polysémie
Pour chaque terme central et chaque opérateur : consigner les sens possibles, leur statut (littéral, contextuel, dérivé, hors sujet), les indices du libellé, les présupposés, et les dépendances entre sens. Tester explicitement :
- **Coexistence** : deux sens sont-ils tous deux requis dans la même argumentation ?
- **Substitution** : la réponse changerait-elle si l'on remplaçait le sens A par B ?
- **Portée** : la négation ou la restriction s'applique-t-elle à un seul sens, à plusieurs ou à leur relation ?
- **Équivoque** : l'argument passe-t-il clandestinement d'un sens à l'autre ?
- **Exclusion motivée** : peut-on justifier par le libellé qu'un sens n'a pas à être traité ?
Interdit : réduire arbitrairement à une seule acception ou faire un plan « sens 1 / sens 2 / synthèse » sans nécessité démontrée.

## Vérification du passage sujet → problème
- Reconstituer au moins deux réponses initialement défendables, pas des caricatures.
- Pour chacune : prémisses, inférence, conséquence nécessaire, coût conceptuel et aporie **interne**.
- Démontrer que les apories concernent la même difficulté directrice et ne sont pas deux objections indépendantes.
- Revenir à l'analyse des sens si la contradiction exige une distinction ou révèle une équivoque.
- Mettre à l'épreuve la résolution : opération identifiée, ce qu'elle préserve, ce qu'elle sacrifie, contradiction résiduelle.
- Les catégories du *Dictionnaire paradoxal* servent de tests de pertinence, non d'étiquettes obligatoires.

## Distracteurs
Pour chaque proposition : sens mobilisés, opérateurs respectés ou non, réponse sous-jacente, difficulté reconnue, défaut prouvable, verdict « Solide / Défendable / À revoir ». Ne pas forcer une proposition défendable à devenir fausse. Un distracteur fort peut manquer un sens indispensable, anticiper une résolution, construire une fausse contradiction ou confondre possibilité factuelle et légitimité ; il faut **démontrer** le défaut.

## Mesure empirique restant à exécuter sur le corpus intégral
1. Contrôler l'intégrité du PDF source (nombre de pages, hash) et de l'extraction sur `corpus`.
2. **Segmenter et dédoublonner les entrées** en utilisant la structure du recueil (sommaire, rubriques et pagination), pas seulement les retours à la ligne. Exclure titres de concours, années, numéros et métadonnées.
3. Mesurer fréquences et cooccurrences des opérateurs, négations, restrictions et types formels. Isoler les formulations atypiques.
4. Faire une annotation humaine stratifiée et double, puis mesurer les désaccords et réviser la taxonomie. Le comptage lexical seul n'établit ni sens ni double aporie.
5. Contrôler la couverture sur un **échantillon indépendant de sujets officiels du bac**. Le corpus Mélès reste un instrument d'arrière-plan ; aucun de ses sujets ne passe dans les exercices élèves.
6. Conserver scripts, données de comptage, échantillons de contrôle et rapports dans un espace interne non publié ; ajouter les tests à la CI uniquement après validation de la segmentation.

## Critères d'homologation
Pas de mention « analyse exhaustive » sans corpus intégral accessible et dénombrement contrôlé ; pas de « garde-fou automatisé » sans test exécutable sur les dossiers ; pas de publication de nouveaux exercices si source bac non vérifiée ou si les contrôles théoriques bloquants ne sont pas renseignés.

## Statut
**Audit conceptuel documenté ; audit statistique exhaustif en attente du traitement complet du PDF.** La présente note est une spécification à contrôler, non une prétention d'avoir traité les 11 000 entrées.
