# Résultat empirique de l'audit Mélès v2 — 9 octobre 2026

**Source d'exécution :** https://github.com/timourdelemen-art/commentaire-plan/actions/runs/37947154107

**Statut : audit lexical réussi, segmentation philosophique NON homologuée.**

- Extraction : 1 190 fragments de pages, SHA-256 `3b25ba77c45ee647374150440f6bac56d6cd4b908332cf29f58780c085d53c52`.
- 48 278 lignes candidates après filtres élémentaires.
- 10 572 lignes distinctes selon une normalisation typographique agressive. **Ce ne sont pas 10 572 sujets distincts.**
- Fréquences brutes des lignes : identification 8 243 ; conjonction 7 316 ; possibilité 5 560 ; existence 2 064 ; quantification 1 437 ; obligation 1 410 ; pourquoi 909 ; sans 689 ; alternative 339 ; comment 287 ; restriction 155 ; finalité 154 ; reconnaissance 98 ; en quoi 98 ; suffisance 78 ; dépendance 22.
- Fréquences des lignes uniques normalisées : identification 1 848 ; conjonction 1 567 ; possibilité 1 058 ; existence 474 ; obligation 343 ; quantification 332 ; pourquoi 213 ; sans 145 ; comment 70 ; alternative 67 ; restriction 36 ; finalité 33 ; en quoi 23 ; reconnaissance 20 ; suffisance 18 ; dépendance 5.
- Un échantillon des lignes sans opérateur contient **le titre du recueil, le nom de l'auteur, la date et des mentions de concours**. Les candidats ne sont donc pas tous des sujets. Certaines lignes sont aussi des titres, métadonnées ou segments de sujets ; l'extraction peut contenir des répétitions entre les différents index.

## Conséquences vérifiables

1. **Interdiction de conclure à la couverture des 11 000 sujets** à partir de ces statistiques. Les fréquences se rapportent à des lignes du PDF, parfois répétées, et les catégories se chevauchent.
2. Les formes grammaticales constituent des indices de recherche, jamais un mécanisme génératif de la problématique.
3. Prochaine étape scientifique : identifier les frontières des sections et les énoncés, créer un jeu de vérité terrain annoté (sujet / titre / métadonnée / fragment / ambigu), puis mesurer précision et rappel sur cet échantillon.
4. Sur les seuls sujets validés, rapprocher la typologie sémantique **préexistante** de Claude (voir `PHILOSOPHIE-ANALYSE-CORPUS.md`) et vérifier les polysémies. Ne pas fabriquer de nouvelle taxonomie concurrente.
5. Pour chaque cas de problématisation : deux réponses initiales fortes, deux impossibilités internes argumentées, paradoxe du paradoxe, confrontation a posteriori aux huit récurrences du *Dictionnaire*, puis mécanismes de résolution, coûts et résidu.
6. **Aucun sujet du corpus Mélès n'est publiable dans les exercices**. Pour le site, utiliser exclusivement des sujets du bac attestés dans les annales officielles.
7. Les distracteurs doivent subir les mêmes quatre contrôles ; ne pas valider une proposition seulement parce qu'elle est grammaticalement plausible.

## Éléments non réalisés

La segmentation exhaustive, l'évaluation quantitative de la typologie de Claude, la vérification de la formulation canonique de la « Loi de la problématique » et l'homologation philosophique des exercices **ne sont pas réalisées**. L'artefact GitHub `audit-meles-v2-interne` contient les données détaillées ; rétention 7 jours.
