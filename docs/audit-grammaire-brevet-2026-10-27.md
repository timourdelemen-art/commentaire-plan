# Réécritures et distracteurs du brevet — 27 octobre 2026

Relecture de quatre questions au clic en grammaire, de trois en réécriture (dont une ajoutée pour les accords qui restent au singulier) et des quatre questions de grammaire proposées dans l'entraînement d'annale de Zola. Les questions de compréhension et les entraînements écrits voisins ont aussi été relus pour vérifier la cohérence des supports.

## Le Lion et le Moucheron : défaut confirmé

Le support affichait les vers 26 à 29, mais la proposition dite solide ne recensait que des changements dans les vers 26-27. Le corrigé de l'annale omettait également la fin « les voilà sur les dents ». L'élève ne disposait donc pas d'une réécriture complète du passage annoncé.

La proposition au clic donne maintenant les quatre vers réécrits, sans coupe. Les pronoms du dernier vers sont tous modifiés. Les trois accès — question au clic, corrigé de l'annale et entraîneur général — donnent le même modèle canonique. Les lignes sont conservées dans les propositions pour faciliter la comparaison avec le texte.

| Repère du texte | Réécriture |
| --- | --- |
| Le malheureux Lion | Les malheureux Lions, groupe imposé |
| se déchire | se déchirent |
| lui-même | eux-mêmes |
| Fait | Font |
| sa queue | leur queue ; « leurs queues » est également admis |
| ses flancs | leurs flancs |
| Bat | Battent |
| sa fureur extrême | leur fureur extrême |
| Le fatigue | Les fatigue |
| l'abat | les abat |
| le voilà | les voilà |

« peut » dépend de « qui », qui reprend « l'air » ; « fatigue » et « abat » dépendent de « leur fureur extrême ». Ces trois verbes restent au singulier. « résonner » reste à l'infinitif ; « malheureux » ne change pas graphiquement. Une question au clic supplémentaire vérifie ces relations, au lieu d'encourager un passage mécanique de tous les mots au pluriel. Les repères de cette table ne constituent pas un nouveau barème.

## Zola : passage écrit complet

Le support lu contient deux phrases, de « À ce moment » à « des râles d'agonie ». La question d'écriture en isolait une version abrégée de la deuxième ; son corrigé ne montrait pas les changements de temps de la première phrase. Les bornes sont maintenant explicites et le modèle reprend tout le passage, y compris « s'éveille », « se met », « s'arrête », puis les accords autour des « clameurs ». Il n'y a plus de coupe au milieu d'une réécriture demandée intégralement.

## Qualité des distracteurs

| Question | Décision didactique |
| --- | --- |
| Nature et fonction de « Un matin » | Conserver la confusion plausible entre place initiale et fonction sujet. La réponse limitée à la fonction reste partielle, car la nature est aussi demandée. |
| Deux manipulations | Remplacer la proposition qui avouait elle-même ne pas effectuer le déplacement par une tentative complète mais fautive : elle nomme un déplacement tout en laissant le groupe à sa place initiale. |
| Phrase complexe | Ne plus utiliser comme mauvais exemple une subordination recevable accompagnée de quelques mots ajoutés. Distinguer un lien logique sans subordination et deux subordonnées dépourvues de principale. |
| Formation de « lenteur » | Remplacer la segmentation peu plausible « len- / -teur » par une confusion réelle sur la nature de la base. L'autre proposition repère la dérivation sans nommer le suffixe. |
| Nom du temps | Retirer « sans préciser le temps », qui signalait artificiellement l'incomplétude. Proposer une identification du conditionnel, sans le temps, parmi des réponses courtes comparables. |
| Valeur du conditionnel | Dans l'atelier, demander explicitement le rapport au récit passé. Dans l'annale, accepter aussi la possibilité, que le corrigé autorise : deux propositions sont alors classées solides et annoncées comme recevables. |
| Réécriture des Lions | Comparer trois passages de même étendue. Une proposition oublie les trois pronoms objets ; une autre accorde les verbes avec le complément au lieu du sujet. |
| Verbes qui restent au singulier | Faire expliquer l'accord avec chaque sujet, pas seulement reconnaître une terminaison. |
| « court » et « écoutant » | Conserver l'erreur plausible consistant à tout accorder. Supprimer les mots artificiellement ajoutés qui la rendaient trop visible. |

Une réponse admise par le corrigé ne doit pas devenir un distracteur prétendument faux. Une proposition partielle doit identifier quelque chose de juste, avec une lacune précise expliquée. Les erreurs retenues portent sur des confusions possibles ; leur longueur n'indique pas systématiquement le verdict. Les égalités de longueur ne sont pas comptées comme une réponse seule plus longue.

## Vérification

`scripts/test-brevet-reecriture.py` confronte le modèle aux quatre vers du vrai support, vérifie les accords qui doivent rester inchangés, l'identité des trois corrigés et le passage complet de Zola. Le contrôle navigateur vérifie les propositions, la navigation vers la deuxième question, les deux lectures acceptées du conditionnel, les brouillons et l'absence d'appels IA à 390/1280 px.
