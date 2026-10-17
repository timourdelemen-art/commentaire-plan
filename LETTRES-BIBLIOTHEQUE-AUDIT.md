# Bibliothèque de lettres — format corrigé le 17 octobre 2026

## Demande du propriétaire

Une citation brève, son auteur, son œuvre et sa référence ; puis deux rubriques, comme dans la bibliothèque de philosophie. « Dissertation » montre des sujets d’annales précis, la fonction de la citation et le moment du raisonnement où l’employer. « Commentaire » explique littérairement la phrase : réalisation, éléments textuels, construction ou procédé, effet ici. Le propriétaire a rejeté l’empilement de fiches et le mélange de ces deux usages.

## Résultat

27 citations sur 9 œuvres, 12 véritables sujets de dissertation et 45 emplois argumentatifs. Chaque fiche comporte une seule citation courte, puis exactement deux rubriques de contenu, dans l’ordre Dissertation / Commentaire. Les anciens fragments nominaux ont été remplacés par des propositions ou des phrases complètes ; une citation qui forme une seule phrase en plusieurs vers conserve ses retours de ligne.

La navigation suit la bibliothèque de philosophie : index de citations, sélection d’une fiche, un seul lecteur ouvert à la fois, fermeture et retour à l’index. Filtres par œuvre, sujet officiel, emploi, programme et recherche libre. Un filtre de sujet ne montre que les emplois correspondants dans la fiche. Le portail et les deux sources du menu (navigateur / en-tête statique) conduisent directement à la bibliothèque de citations. Les anciennes œuvres et lectures cursives restent accessibles par une entrée secondaire, distincte.

### Origine

Auteur nommé, œuvre, repère dans le texte, citation exacte, contexte bref. L’édition et le lien vers la source se consultent à la demande. Les divergences des métadonnées Fontenelle et Balzac restent explicites. Le texte de Rabelais vient de l’édition Juste 1535, avec sa graphie et sa numérotation propres ; une transcription abrégée ne sert pas d’intégrale.

### Dissertation

Pour chaque emploi : libellé exact du sujet, citation préalable du sujet lorsqu’elle est indispensable, année, zone, code, PDF officiel ; puis moment précis dans le développement, fonction argumentative, justification, insertion rédigée à consulter, limite de validité, éventuel raccord à la copie complète avec étape nommée.

Les six premiers sujets sont complétés par six autres : Rimbaud (écriture pour/contre, centres étrangers 2026), Corneille (suites du mensonge, Polynésie 2025), Musset (jeu de la parole et sincérité, Polynésie 2025), Prévost (seulement la passion, Métropole 2023), Balzac (élan créateur/désir destructeur, Antilles-Guyane 2025), Rabelais (rire de discernement, centres étrangers 2025). Le libellé et les citations qui le précèdent ont été contrôlés dans les PDF du ministère ou d’Éduscol.

36 emplois servent de preuve dans l’œuvre du sujet (18 citations, deux emplois chacune). Neuf autres sont des comparaisons, explicitement supplémentaires : Zola avec le tableau social de Balzac ; La Boétie avec les formes de libération chez Rimbaud ; Fontenelle avec les rapports du plaisir et du jugement chez Rabelais. Leur fonction est expliquée et leur limite rappelle de revenir à l’œuvre du sujet. Aucune influence n’est inventée et une autre œuvre ne remplace pas une preuve dans l’œuvre étudiée.

Aucune dissertation officielle sur Zola, La Boétie ou Fontenelle n’est inventée dans ce lot. Les essais technologiques ne sont pas présentés comme des dissertations générales. Les neuf fiches auparavant simplement préparatoires ont maintenant un véritable emploi de comparaison, situé dans un sujet réel ; elles peuvent être écartées avec le filtre « Preuve dans l’œuvre du sujet ».

### Commentaire

Un paragraphe continu original de quatre phrases, et non un argument de dissertation réétiqueté. La fonction de chaque phrase peut être affichée ou masquée sans changer le texte : réalisation, éléments textuels, construction / procédé, effet ici. Les 108 phrases sont rédigées pour leurs passages respectifs. Les observations portent sur des mots ou des rapports identifiables ; aucun effet automatique n’est attribué à une figure.

Exemple Prévost : le cœur se rendrait coupable d’accuser Manon ; ce déplacement de la faute protège l’illusion et permet au lecteur de reconnaître un refus affectif de voir. L’analyse ne se contente ni de nommer une figure ni de conclure que la phrase « fait ressentir une émotion ». Elle explique le rapport entre les mots, l’action du narrateur et la position possible du lecteur.

## Sources et maintenance

- Source du corpus : lettres-dissertation-data.js. Les exercices existants restent dans ce registre et leurs données ne sont pas modifiées par la refonte.
- Génération de l’HTML : node scripts/build-lettres-library.cjs ; contrôle sans réécriture avec --check. Le HTML généré est suivi dans Git et reste lisible sans JavaScript. Aucun changement à la commande Netlify, réservée par la PR 132.
- Registre : scripts/lettres-sources.json ; traces de vérification initiales, annales supplémentaires et citations de remplacement dans scripts/lettres-verification.json, scripts/lettres-annales-verification.json et scripts/lettres-citations-revision.json.
- Ces traces ne sont ni une transcription intégrale des œuvres ni une validation mécanique des interprétations ; les emplois et les commentaires font l’objet d’une relecture pédagogique distincte.

## Contrôles

Build complet dans /tmp/lettres-refonte-build-so427duz : 300 pages, contrôle global 0 erreur / 21 avertissements ; parcours philosophie OK ; SEO 0 erreur / 1 avertissement. Les deux alertes de performance de philosophie-banque.html sont préexistantes. Le nouvel HTML de bibliothèque est d’environ 154 Ko ; les données de lettres ne sont pas chargées globalement dans le navigateur.

scripts/check-lettres.cjs contrôle les 27 citations, les 12 questions et leurs citations préalables, les 45 emplois et les 108 phrases de commentaire. Au navigateur à 390 et 1280 px : ouverture et fermeture des 27 fiches, unicité du lecteur visible, source / citation / deux rubriques, insertions rédigées, fonctions sans modification du paragraphe, tous les filtres de sujets et d’œuvres, preuve / comparaison, actuel / archives, recherche avec ou sans accents, zéro résultat, remise à zéro, lien direct par fragment, liens internes et ancres, absence de débordement et d’erreur JavaScript. Le corpus reste accessible sans JavaScript.

Le même contrôle parcourt aussi les 18 gestes et leurs 36 zones d’écriture : choix justifiés, aides, comparaisons, niveaux libres, navigation, reprise sur une seconde annale, sauvegarde et recharge des brouillons. Les deux modèles Balzac et Rabelais restent annotables sans altération du texte. Les 18 gestes / 54 activités de niveau ne sont pas renommés en 54 rédactions complètes.

## Périmètre conservé

Les modèles de la première livraison, les deux dissertations supplémentaires et les exercices restent dans ce lot. Au total du site avec ce lot : sept dissertations modèles sur six œuvres, cinq imaginations et cinq réflexions au brevet. Les copies visent l’excellence ; aucun jury ne leur a attribué de note et aucun minimum universel de phrases n’est démontré.

La sélection couvre six des douze œuvres actuelles et trois œuvres d’archives. Elle ne devient pas une couverture intégrale du programme. Aucun prix, paywall ou choix gratuit/payant n’est ajouté. Le Worker et les fichiers réservés des PR 132 et 147 restent inchangés.

## Leçon de cette correction

Un regroupement « procédé / effet » suivi d’un paragraphe à usage indifférencié ne répond pas à une demande de bibliothèque de citations. Partir de la citation et conserver deux lectures rédigées et distinctes : emploi dans un sujet réel, puis commentaire du texte lui-même. Le menu principal doit conduire à ce parcours, avec les lectures cursives clairement séparées.
