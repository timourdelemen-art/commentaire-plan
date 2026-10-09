# Protocole obligatoire de création des exercices de problématisation — VERSION À AUDITER

> Document interne. **Statut : protocole initial, NON homologué.** Il formalise les contrôles demandés par le propriétaire mais ne remplace ni la Loi de la problématique, ni les données du corpus de 11 000 sujets, dont les versions canoniques et les algorithmes doivent être retrouvés et confrontés avant homologation. Aucune production en série ne peut se prévaloir d'une validation complète avant cette confrontation.

## Principe
Une problématique et chacun de ses distracteurs sont des objets philosophiques à vérifier, non des textes plausibles à générer. Tous les contrôles ci-dessous sont cumulatifs. Aucun score global ne peut compenser l'échec d'un contrôle bloquant.

## Sources et traçabilité obligatoires
- Sujet : libellé exact, année, série/voie, session, source officielle, notions et croisements.
- Loi de la problématique : référence canonique, version et règles opératoires (À RETROUVER).
- Dictionnaire paradoxal de la philosophie : préfaces, typologie empirique des figures paradoxales, critère de sélection des contradictions, typologie et exigences internes des résolutions.
- Garde-fou sémantique issu de l'analyse des quelque 11 000 sujets : source des données, version du corpus, critères/algorithmes, limites, résultats du contrôle (À RETROUVER).
- Historique de révision et identités des deux relectures indépendantes.

## Ordre de validation pour CHAQUE sujet
1. **Authenticité et pertinence** : vérifier le sujet officiel et analyser exactement ses termes, modalités, présupposés, relations et portée ; refuser les glissements de sens.
2. **Filtre sémantique empirique** : appliquer le dispositif tiré du corpus de 11 000 sujets, selon sa spécification originale ; consigner résultat et éventuels écarts. Tant que la spécification n'est pas retrouvée, marquer « non vérifié » : jamais « conforme » par défaut.
3. **Typologie paradoxale** : identifier, à partir de la préface du Dictionnaire, la ou les figures empiriques pertinentes (notamment renversement de conditionnalité/causalité, aporie gnoséologique, fusion catégorielle, et leurs croisements). Justifier leur application au sujet ; ne jamais plaquer une figure sur un sujet pour remplir une case.
4. **Contradiction directrice** : formuler les deux voies sérieuses, leur nécessité propre, puis l'impasse interne de chacune ; vérifier que la contradiction est structurante et non accessoire. Consigner pourquoi une autre contradiction possible a été écartée.
5. **Loi de la problématique / double aporie** : contrôler la formulation selon la loi canonique ; consigner séparément les deux impasses, leur articulation et la nécessité du problème. En l'absence de texte canonique accessible, statut « en attente de contrôle ».
6. **Résolutions** : examiner les opérations de résolution compatibles avec le problème et leurs exigences internes, sans solution magique ni compromis mécanique. Le Dictionnaire distingue notamment abolition partielle/totale, duplication ontologique, inversion, déplacement, métamorphose, processualisation et suspension épistémique ; contrôler la nomenclature et la portée exactes contre la préface avant homologation. Vérifier ce que chaque opération préserve, ce qu'elle sacrifie et l'écho éventuel de la contradiction.
7. **Formulation élève** : produire une problématique intelligible, fidèle au sujet, réellement ouverte ; le vocabulaire technique de la théorie reste interne, conformément à AGENTS.md.
8. **Distracteurs soignés** : produire des formulations plausibles et philosophiquement motivées, chacune avec une erreur ou limite spécifique démontrable : une seule branche, difficulté périphérique, présupposition non examinée, résolution prématurée, déplacement sémantique, contradiction factice, etc. Ne jamais qualifier de fausse une alternative philosophiquement défendable. Classer Solide / Défendable / À revoir avec justification individuelle et possibilité de plusieurs réponses solides.
9. **Contrôle QCM** : longueur et style comparables, absence d'indice de position, de jargon ou de formulation ; comparer toutes les propositions et leur justification. Un distracteur ne doit pas être simplement absurde.
10. **Relecture croisée** : ChatGPT et Claude examinent séparément le dossier théorique, les propositions et les corrections ; consigner divergences et arbitrage argumenté. L'accord des agents n'est pas une preuve suffisante sans contrôle des sources.
11. **Vérification d'usage** : parcours au clic, formulation avec aide, autonomie sur un autre sujet ; tests de build, SEO, navigation 390/1280 px, et absence de répétition involontaire avant fusion.

## Fiche de contrôle à conserver par sujet
```yaml
sujet_officiel:
source_et_session:
notions:
analyse_semantique:
controle_corpus_11000: non_verifie
figure_paradoxale:
justification_figure:
voie_1_et_aporie:
voie_2_et_aporie:
contradiction_directrice:
controle_loi_problematique: non_verifie
resolutions_possibles_et_couts:
problematique_solide:
distracteurs:
  - formulation:
    statut:
    raison_precise:
revue_chatgpt:
revue_claude:
arbitrage:
tests_techniques:
statut_publication: bloque
```

## Règles de blocage
- Sujet non authentifié, source théorique canonique manquante pour une validation annoncée comme complète, filtre sémantique non exécuté, double aporie non justifiée, distracteur injustement disqualifié ou désaccord non arbitré : **pas de publication**.
- Les contrôles sémantiques et théoriques ne sont pas interchangeables ; chacun doit laisser une trace.
- Ce protocole doit être révisé en confrontant mot à mot les textes et les implémentations existantes. Ne pas prétendre qu'il a déjà été automatisé.
