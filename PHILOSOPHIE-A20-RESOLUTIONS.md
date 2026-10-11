# Audit et révision des copies A20 — 11 octobre 2026

Périmètre : philosophie, sans intervention sur le collège ni HLP. Aucun déploiement. PR de travail à reprendre par Claude.

## Réponse à la question du propriétaire

L’état initial ne permettait pas d’affirmer que les 17 copies distinctes méritaient toutes 20 : plusieurs arguments forçaient l’opposition ou substituaient un autre critère au sujet. Aucun dossier de comparaison ne permettait de vérifier que la troisième partie avait été choisie pour son moindre coût. Le générateur rendait le texte ; il ne choisissait pas les solutions.

Le Dictionnaire paradoxal expose une comparaison de coûts et de restes, non un barème numérique universel. On ne peut certifier un minimum absolu parmi toutes les pensées possibles. Le résultat proposé ici est une préférence locale argumentée entre au moins trois pistes, soumise à objection et relecture. La brièveté est optimisée après les justifications, non à leur place.

## Corrections principales

| Copie | Défaut repéré | Modification |
|---|---|---|
| Science | Reporter la responsabilité après la recherche | Contrôle des moyens et risques dès la recherche, sans exiger une application immédiate |
| Bien agir | Faire de la responsabilité une preuve de bonté ou de certitude | Distinguer certitude absolue et appréciation justifiée, révisable |
| Paroles | Remplacer la maîtrise par la promesse | Distinguer contrôle partiel du dire et maîtrise impossible de toute réception |
| Nature | L’inversion « nous avons besoin d’elle » ne traite pas les milieux abîmés | Distinguer processus naturels et milieux particuliers à restaurer |
| Temps | L’irrévocabilité du passé était prise pour une conservation de ce qu’on perd | Distinguer événement passé et disponibilité présente |
| Vérité | La manière de dire était prise pour une justification de tout dire | Examiner aussi la pertinence et le droit de divulguer |
| Liberté | Une nouvelle décision quotidienne effaçait la durée d’une obligation | Examiner la fidélité et ses possibilités justifiées de révision |
| Inconscience/bonheur | L’ignorance était supposée empêcher de sentir son bonheur | Son coût porte désormais sur les dangers qu’elle empêche d’anticiper |

Les 17 copies sont révisées. Leur volume total passe de 14 941 à 13 825 mots selon le même comptage des textes, hors fonctions marginales. Ce gain ne démontre pas que chaque copie ait atteint une longueur minimale absolue.

Trois copies supplémentaires portent sur des sujets réels de Métropole 2025 : « La vérité est-elle toujours convaincante ? », « Notre avenir dépend-il de la technique ? » (25-PHGEME1, page 2), « Avons-nous besoin d’art ? » (25-PHTEME1, page 2). Libellés vérifiés sur les fac-similés des sujets ; lien public vers l’index ministériel des annales. Les nouvelles scènes sont la caverne, le mythe de Protagoras et le chant de Démodocos dans l’Odyssée VIII. Elles restent à examiner individuellement avant homologation.

## Moteur de travail dans le site

- `scripts/copies20-resolutions.json` : pour chacune des 20 copies, exigences, scène, trois propositions, acquis conservés, coûts, difficultés restantes, préférence, objection la plus forte et réponse, III.3, question finale, longueur, empreinte du texte et état de relecture.
- `scripts/check-copies20.js` : bloque la génération si un dossier manque, devient périmé ou ne correspond plus au reste et à la question effectivement écrits. Le contrôle n’évalue pas la vérité des arguments.
- `scripts/philo-copie20.js` et les générateurs : utilisent les textes contrôlés et créent les trois pages nouvelles. Les dossiers restent internes ; ils ne sont pas ajoutés au JavaScript élève.
- Corrigés d’annales, notions et plans pas à pas : les réponses concernées sont synchronisées avec la révision. Une autre piste argumentée demeure recevable ; le nom d’une opération n’est pas une preuve.
- `worker/src/philo-resolution-policy.js`, Worker et `free-response.js` : mêmes critères pour III, reste et conclusion. Comparaison des acquis et coûts quand la consigne la demande ; aucune note déduite de la présence du plan.
- Atelier de III : comparer deux pistes avant de préférer l’une ; nouvel exercice de conclusion : réponse → reste de III.3 → question née de ce reste. L’exercice de transition intermédiaire est identifié comme transition, pas comme reste final.

Le moteur est un protocole explicite de sélection et de contrôle. Il ne génère pas automatiquement de nouveaux dossiers : toute modification de copie exige un réexamen et une mise à jour de la comparaison.

## Validation et reprise

Tests de cohérence et tests de mutations : omissions, coûts manquants, sélection inconnue, empreinte périmée, exigence perdue, reste absent, question divergente, relecture faussement déclarée et code d’examen erroné. Construction complète exécutée avec la commande Netlify dans une copie jetable : succès. Contrôles du parcours philosophie et du budget de performance : succès. Contrôle global : 276 pages, zéro erreur, 20 avertissements sur des pages anciennes hors périmètre (absence de H1). Audit SEO : zéro erreur et zéro avertissement. Rendu des 20 copies et parité exacte des consignes Worker/client : vérifiés par les tests. Aucun appel réel du correcteur IA modifié ni test après déploiement ; ces contrôles restent à faire après reprise puis déploiement par Claude.

Tous les dossiers restent `propose`. Il reste à Claude une relecture philosophique distincte, notamment des arguments de I et II, des alternatives comparées et de l’objection la plus forte ; au propriétaire, l’examen individuel des scènes nouvelles ou modifiées selon AGENTS.md. La trace informatique ne permet pas de déclarer ces examens accomplis.

Contrôle visuel à effectuer à 390 px et 1280 px avant fusion : pages nouvelles, copie annotée/masquée, plans pas à pas et champs III/conclusion. Aucun navigateur de contrôle n’est disponible dans cette session ; ne pas considérer la PR comme prête au déploiement sur ce seul fondement.
