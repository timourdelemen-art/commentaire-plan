# Audit des dissertations de français et approfondissement des modèles — 7 novembre 2026

## Diagnostic : une faiblesse structurelle

Le reproche formulé pour les deux dissertations sur Rimbaud est fondé : leur version initiale comptait environ **1 087** et **867** mots de prose modèle, sans les annotations. Les neuf sous-parties étaient construites, mais la plupart tenaient en un argument, une citation et une interprétation rapide. Un bon **canevas** n'est pas nécessairement une copie de première suffisamment développée pour quatre heures.

L'inventaire des **31 pages de modèles** est plus préoccupant : 28 pages gérées par les générateurs du site, et trois pages brèves indépendantes sur Balzac, Rabelais et *Manon Lescaut*. Parmi les 28 générées, 26 proposaient entre **752 et 1 019 mots** ; les trois indépendantes font autour de **900 à 1 000 mots**. Ces chiffres ne sont pas une note et ne suffisent pas à juger la qualité, mais la revendication « la copie la plus courte qui mérite 20 » était beaucoup trop affirmative.

## Intervention de fond : les deux dissertations sur le *Cahier de Douai*

| Sujet | Avant, environ | Après, environ | Sous-parties enrichies |
| --- | ---: | ---: | ---: |
| « Est-ce seulement par la révolte que Rimbaud s'émancipe ? » | 1 087 mots | **1 973 mots** | 9 sur 9 |
| « Pas seulement écriture pour, mais écriture contre » | 867 mots | **1 690 mots** | 9 sur 9 |

Chaque sous-partie reçoit désormais **trois développements explicatifs** insérés entre l'exemple et sa conclusion : interprétation d'un choix d'écriture, analyse de son effet et conséquence pour l'argument. L'ensemble représente **54 nouveaux mouvements de prose annotés** dans les deux dissertations.

### Ce qui a été approfondi, et non seulement allongé

**Dissertation 1.** Le Dieu du *Mal* est analysé par l'opposition entre champ de bataille et autels ; le discours du souverain dans *Rages de Césars* par la suffisance du verbe « souffler » ; la satire bourgeoise dans *À la musique* par l'ordre du square et les corps ridicules. Dans *Sensation*, la fugue est l'ouverture du corps à l'espace ; dans *Au Cabaret-Vert*, le plaisir ne supprime pas les fatigues du chemin ; *Ma Bohème* transforme la précarité en imagination. La troisième partie analyse comment la lyre et les élastiques, le soleil et la chope, les objets vulgaires dans le sonnet renouvellent le poétique sans supprimer sa forme.

**Dissertation 2.** *Le Mal* et *Le Dormeur du val* sont distingués par la dénonciation accusatrice ou par la révélation finale ; le paysage heureux peut être l'instrument d'une dénonciation. *Roman* et *Sensation* permettent de montrer qu'une célébration suppose parfois un refus. Dans *Vénus Anadyomène*, le rejet d'un idéal corporel traditionnel aboutit à une puissance esthétique nouvelle ; *Ma Bohème* convertit la pauvreté du marcheur en musique poétique. Ainsi le « contre » et le « pour » deviennent une relation à démontrer, pas deux inventaires thématiques.

### Garantie technique de synchronisation

Les enrichissements figurent à la fois dans les deux pages HTML et dans `scripts/dissertation-sujets/douai_copies.py`, source canonique utilisée pour générer les pages. Le nombre de blocs et de phrases ajoutés a été contrôlé par relecture du HTML. Les citations originales n'ont pas été remplacées par des citations inventées.

## Les autres modèles : les présenter avec exactitude

Les autres copies générées (Ponge, Dorion, *Le Menteur*, Musset, *Manon Lescaut*, Sarraute) n'ont **pas été artificiellement gonflées** en ajoutant des phrases passe-partout. Les pages affichaient initialement une promesse de 20/20 associée à des modèles condensés. Leur texte de présentation distingue maintenant leur fonction réelle : **apprendre à problématiser, ordonner les neuf étapes et choisir des preuves**. Il indique explicitement que le travail analytique devrait être développé davantage pour une copie intégrale.

Les sources de génération `scripts/dissertation-sujets/gen_pages_sujet.py` et `scripts/dissertation-sujets/sarraute/gen.py` ont été corrigées dans le même sens, ainsi que le catalogue `bac-dissertation.html`.

Les trois pages indépendantes (Balzac, Rabelais, *Manon Lescaut*) portaient déjà la mention « copie brève » ou « modèle annoté » et n'ont pas été déclarées intégralement développées.

## Nouvelle exigence méthodologique

Une véritable sous-partie de dissertation au bac, lorsqu'elle est nécessaire au plan, doit comporter :

1. Une **raison précise** qui répond au sujet.
2. La situation de son **passage de référence** dans l'œuvre.
3. L'analyse d'un **premier choix textuel** (mot, image, construction, scène).
4. Un **second détail** qui enrichit, précise ou résiste à la première lecture.
5. Si nécessaire, la confrontation d'un **autre passage**.
6. Une conséquence explicite pour la **question directrice**, puis le raccord au mouvement de la partie.

Ce n'est pas un quota de phrases, de citations ou de mots. Il ne faut pas allonger les introductions pour compenser la brièveté des preuves. La priorité est l'analyse littéraire des passages et leur articulation en démonstration.

Cette exigence figure désormais dans `bac-dissertation-methode.html`, avec un exemple développé de *Ma Bohème*.

## Décision et limite exacte

**Achevé dans ce chantier :** audit de longueur des 31 pages ; approfondissement textuel des 18 sous-parties des deux dissertations de Rimbaud ; harmonisation du statut des 26 modèles condensés générés ; correction des générateurs, du catalogue et de la méthode.

**Non achevé :** la réécriture approfondie, citation par citation, des 29 autres dissertations. Elles sont reconnues comme modèles condensés, non certifiées « 20/20 » par un jury. Affirmer qu'elles sont toutes désormais des copies intégrales parfaites serait contraire au résultat de l'audit.

**Vérification technique :** relecture de la présence des 54 analyses et des 13 blocs des deux modèles de Rimbaud ; pas d'exécution du build complet ou des tests navigateur, l'environnement ne permettant pas ici de cloner le dépôt par accès direct à GitHub. La publication Netlify n'est pas vérifiée.
