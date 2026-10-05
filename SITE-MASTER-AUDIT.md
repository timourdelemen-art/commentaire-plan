# Tableau maître du site — pilotage pédagogique et ergonomique
_Mise à jour : 5 octobre 2026_

## Règle générale
L’interface élève reste simple : une épreuve, puis 4 à 5 gestes visibles maximum. Les critères officiels, le protocole détaillé et les paliers d’évaluation restent dans le moteur, les ressources enseignants et les diagnostics IA.

## Architecture visible
- BAC : Commentaire · Dissertation · Oral · Annales
- BREVET : Questions · Langue · Rédaction · Sujets complets
- MÉTHODE : méthode du commentaire · manuel des procédés · entraînement guidé
- ENSEIGNANTS : 3e · 2de · 1re · progressions · bibliothèque

## Architecture cible
- BREVET
- BAC FRANÇAIS — Première
- HLP — Première / Terminale
- PHILOSOPHIE — Terminale
- ENSEIGNANTS

Règle : une nouvelle branche n’entre dans la navigation visible que lorsqu’elle possède au moins un vrai parcours utilisable. HLP et Philosophie peuvent être préparés dans le modèle de données et les documents internes sans créer de coquilles vides dans le menu.

## Hiérarchie SEO et pédagogique
Toute page publique doit appartenir à une chaîne lisible :
**examen → épreuve → geste → entraînement → transfert**.

Les pages SEO ne constituent pas une architecture parallèle. Une requête précise (« transition commentaire », « effet d’une antithèse », etc.) doit atterrir sur une page-geste reliée à son hub, à la méthode et à un exercice réel.

Pages prioritaires actuelles :
1. Accueil
2. Bac
3. Brevet
4. Commentaire
5. Méthode du commentaire
6. Problématique
7. Plan
8. Procédés / effets
9. Annales
10. Pot-Bouille

Le build doit empêcher les pages prioritaires orphelines, les canonicals incohérents, les profondeurs anormales et la réapparition de l’ancienne terminologie.

## Matrice pédagogique

### Bac — Commentaire
Référentiel officiel :
- comprendre le sens du texte ;
- percevoir son mouvement / sa composition ;
- identifier et analyser les éléments saillants ;
- exploiter implicites et résistances ;
- construire une interprétation ;
- mobiliser une culture littéraire pertinente ;
- organiser et hiérarchiser les remarques ;
- maîtriser langue, syntaxe, lexique et orthographe.

Traduction élève (5 gestes) :
1. Comprendre ce que le texte met en place et transforme.
2. Formuler une problématique.
3. Construire 2 ou 3 réponses nécessaires et leurs transitions-question.
4. Analyser : réalisation → élément textuel → procédé utile → effet ici.
5. Rédiger et transférer sur un sujet complet.

IA :
- jamais de commentaire complet à la place de l’élève ;
- un acquis, un manque prioritaire, une question de reprise ;
- protocole interne : problématique → réponse → nécessité de la réponse → réalisation → élément → procédé → effet ;
- la transition est une question qui fait apparaître le manque restant, et non la nécessité de la réponse suivante.

### Bac — Dissertation
Référentiel officiel :
- rendre compte d’une lecture effective et informée de l’œuvre ;
- comprendre les enjeux du sujet et du parcours ;
- mobiliser passages significatifs et références pertinentes ;
- identifier, citer et analyser des éléments saillants ;
- mettre en lien, hiérarchiser et catégoriser ;
- étayer un cheminement intellectuel ;
- maîtriser langue et expression.

Traduction élève (5 gestes) :
1. Comprendre le sujet et réactiver l’œuvre utilement.
2. Faire apparaître ce qu’il faut encore comprendre et formuler la problématique.
3. Construire des réponses nécessaires, puis des arguments prouvés par l’œuvre.
4. Vérifier la progression : preuves, transitions-question, ordre du plan.
5. Rédiger et contrôler une démonstration visible mais fluide.

IA :
- distinguer sujet, problématique, réponse, nécessité de la réponse, argument, preuve, analyse et transition ;
- ne jamais confondre une partie avec un thème ;
- exiger une utilisation effective et variée de l’œuvre sans quota mécanique de passages ;
- transition : acquis → question sur ce qui manque encore ;
- accepter plusieurs formes de progression : approfondir, nuancer, déplacer, mettre en relation ;
- exiger une formulation simple et élégante du plan ;
- vérifier que les connecteurs expriment une relation logique réelle ;
- culture littéraire : comparaison / différenciation → retour à l’œuvre → singularité ;
- ne pas donner de plan modèle avant tentative ;
- ne jamais convertir mécaniquement un palier en note.

### Bac — Oral
Référentiel officiel :
- situer le texte ;
- lire à voix haute ;
- comprendre, analyser, interpréter ;
- mobiliser œuvre / parcours ;
- organiser le propos dans le temps ;
- respecter les normes de l’oral et communiquer ;
- traiter la question de grammaire ;
- présenter l’œuvre choisie, justifier son choix, dialoguer.

Traduction élève (4 gestes) :
1. Lire et situer.
2. Expliquer le texte.
3. Répondre à la question de grammaire.
4. Présenter l’œuvre et dialoguer.

IA :
- diagnostic par compétence, pas note automatique ;
- explication : compréhension → élément → analyse → interprétation ;
- entretien : relances ouvertes fondées sur la réponse réelle.

### Brevet — Sujet de réflexion
Référentiel officiel :
- répondre au sujet ;
- développer des arguments ;
- mobiliser des exemples ;
- structurer une réflexion progressive ;
- adapter le texte à la situation de communication ;
- orthographe, syntaxe, lexique.

Traduction élève (4 gestes) :
1. Comprendre la question.
2. Construire des arguments.
3. Développer les exemples : argument → exemple → ce que l’exemple prouve.
4. Organiser et rédiger.

IA :
- diagnostic par compétence ;
- pas de note automatique ;
- un seul manque prioritaire puis reprise.

### Brevet — Sujet d’imagination
Référentiel officiel :
- remobiliser les éléments du texte lorsque le sujet le demande ;
- faire preuve d’imagination dans l’univers attendu ;
- construire une progression cohérente ;
- respecter genre et types de discours ;
- orthographe, syntaxe, lexique.

Traduction élève (4 gestes) :
1. Décoder les contraintes.
2. Conserver ce qui doit l’être du texte-support.
3. Inventer une progression.
4. Respecter le genre et rédiger.

IA :
- distinguer contraintes et liberté d’invention ;
- vérifier cohérence avec l’univers de référence ;
- ne pas réécrire le texte de l’élève à sa place.

## Audit ergonomique — décisions
1. Page d’accueil raccourcie : promesse → Bac/Brevet → démonstration → preuve de méthode → offre → enseignants.
2. Bac : les trois épreuves avant l’anthologie et les outils.
3. Brevet : deux modes seulement — sujet complet ou difficulté ciblée.
4. Commentaire : cinq gestes visibles maximum ; le protocole détaillé reste derrière.
5. Dissertation : cinq gestes visibles maximum ; remplacer la “maquette” par un entraînement réel.
6. Oral : quatre blocs correspondant aux parties réellement évaluées.
7. Les grilles officielles ne sont pas un menu élève ; elles pilotent l’IA et les ressources enseignants.
8. Priorité actuelle : construire un gratuit suffisamment fort pour produire un effet « waouh ». Le paiement est volontairement relégué tant que l’expérience, le volume et la cohérence globale ne le justifient pas. Une future offre payante devra ajouter volume, répétition, profondeur et accompagnement sans amputer artificiellement le gratuit.
9. Toute page ou entrée qui duplique une autre sans geste distinct doit être fusionnée, reléguée ou supprimée de la navigation.
10. Tout exercice doit avoir en interne : épreuve, geste, compétence officielle, niveau d’aide, correction, possibilité de reprise.

## Critère de sortie
Un élève doit pouvoir répondre en moins de 10 secondes à :
- Où suis-je ?
- Que puis-je travailler ici ?
- Par quoi commencer ?
- Que se passe-t-il après ma réponse ?


## Terminologie stable
- **Réponse** : ce qu’une grande partie apporte à la problématique.
- **Nécessité de la réponse** : pourquoi cette réponse doit être construite dans la progression.
- **Transition** : question simple qui fait apparaître ce qui manque encore.
- **Réalisation** : ce que le texte fait ; elle peut être nommée ou rester implicite dans l’analyse.
- **Élément textuel** : citation ou élément précis du texte.
- **Procédé** : outil technique utile à l’analyse.
- **Effet ici** : transformation précise produite par ce procédé dans ce passage.

Le terme « établissement » ne désigne plus une partie. Le terme « solution » ne remplace pas « réponse » dans le protocole du commentaire.

## Offensive SEO autorisée
Approche agressive mais durable :
- génération statique de navigation crawlable ;
- sitemap construit au déploiement avec dates réelles de modification ;
- canonicals + redirections automatiques des anciennes routes ;
- fils d’Ariane HTML + données structurées ;
- audit automatique de profondeur, orphelins et métadonnées ;
- budget de performance bloquant les régressions ;
- calcul hors navigateur du graphe interne et des opportunités de liens ;
- suivi d’indexation Search Console des URL stratégiques ;
- IndexNow / signaux de découverte quand la vérification est opérationnelle ;
- nouvelles pages uniquement si elles répondent à une intention réelle avec contenu et exercice propres.

À éviter :
- pages quasi dupliquées générées en masse ;
- faux backlinks, réseaux de sites ou domaines expirés détournés ;
- texte caché, cloaking ou bourrage de mots-clés ;
- multiplication des pages uniquement pour couvrir des variantes de requêtes.
