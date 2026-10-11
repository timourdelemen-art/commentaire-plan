# Audit général et intégration — 11 octobre 2026

## Résultat et périmètre

Intégration demandée par le propriétaire des PR 125–129, de l'archivage des audits (69) et du document interne non homologué (85), après contrôle combiné. La banque philosophique (130) est déjà dans main. Le protocole interne conserve son statut de travail : l'intégrer ne l'homologue pas. Les décisions du propriétaire du 11 octobre remplacent l'attente d'un déploiement par Claude et autorisent la fusion ; aucune relecture par Claude n'est inventée.

Navigation : six portes, Français, Philosophie, HLP, Brevet, Bibliothèque, Annales. Le menu Philosophie passe de onze à six liens, conserve les cinq étapes et ajoute l'explication. Les 17 notions restent visibles sur la page Philosophie. Bibliothèque est une rubrique autonome : Littérature conserve les sept parcours existants ; Philosophie ouvre les quinze références commentées. Annales reste le catalogue des sujets officiels, avec quatre accès par épreuve. Méthodes et Enseignants restent accessibles au pied de page. Aucun libellé « banque personnelle ».

Les deux sources du menu, navigateur et génération statique, sont mises à jour. Le fil d'Ariane rattache la bibliothèque à l'accueil. La page d'accueil offre deux accès directs Bibliothèque/Annales. Le lien incorrect de Première HLP vers la dissertation de philosophie est remplacé par le parcours HLP ; la question de réflexion porte son propre nom. Les six questions maison non homologuées de Première sont remplacées par les deux sujets zéro Éduscol déjà vérifiés. La fausse exclusion des évaluations ponctuelles est corrigée d’après le cadre consolidé de juin 2025 : https://eduscol.education.gouv.fr/sites/default/files/document/ndsevaluations-ponctuelleseds-non-poursuivivoie-gjuin-2025pdf-100575.pdf . Le collège et l'explication philosophique ont un lien HTML visible depuis leur portail.

## Contrôles réellement exécutés localement

- Construction complète avec la commande de netlify.toml sur une copie jetable : réussite, 290 pages HTML.
- Parcours philosophie : réussite, cinq gestes conservés ; vérification du menu sur ses données plutôt que sur une suite de caractères avec des apostrophes imposées.
- Contrôle global : zéro erreur, vingt avertissements anciens sans nouveau cas. Les vingt pages sont des redirections HTML avec un lien de secours, et non vingt cours sans titre. Ne pas gonfler l'audit en les présentant comme des contenus manquants.
- SEO : zéro erreur, zéro avertissement. Budget de performance : réussite.
- Tests des six banques : réussite. Vingt copies A20 cohérentes avec leur registre, douze modèles HLP, quatre explications philosophiques, huit réponses du DNB, soixante-quatre scènes et vingt-neuf citations munies de provenance, quinze fiches philosophiques.
- Le contrôle navigateur dans GitHub Actions parcourt les nouveaux modules et copies à 390/1280, fait écrire à chaque niveau, reprend les brouillons, masque les annotations, efface isolément et vérifie la navigation au clavier. Rapport et captures sont archivés ; sa réussite est requise avant fusion et référencée dans la PR d'intégration.

## Lecture pédagogique

Relus : les douze modèles HLP, les quatre modèles d'explication, les huit réponses DNB ; pour les vingt A20, les scènes et les comparaisons des troisièmes parties. Les exercices demandent une justification puis une rédaction, pas seulement un choix. Les aides et modèles sont repliés ; niveaux, reprise et transfert vers un autre texte restent disponibles. HLP ne reçoit pas le plan de dissertation de philosophie. L'option technologique d'explication conserve les huit questions ordonnées, distinctes de l'explication libre.

L'examen des dossiers A20 montre une comparaison locale de trois pistes, avec acquis, coût et objection. Ce n'est ni un calcul exhaustif des résolutions possibles ni la preuve d'un minimum absolu ; aucun 20 ne découle des tests. Les dossiers gardent leur statut proposé : cette intégration ne prétend pas remplacer une seconde lecture philosophique indépendante. La conclusion prolonge effectivement la difficulté formulée à la fin de III.

La banque de scènes distingue ouverture et exemple de partie ; HAL, Rhinocéros et la fête de l'Être suprême ne retrouvent pas les raccords écartés par l'audit. Les vingt-quatre vigilances narratives du registre restent ouvertes : une citation retrouvée ne vérifie pas à elle seule une scène entière. Le nouveau contrôle du vérificateur bloque les citations altérées ; il ne remplace pas une confrontation de toutes les œuvres au corpus original.

## Ce qui reste réellement à faire

- Bibliothèque philosophique : publier uniquement des passages et citations textuellement vérifiés, dans des éditions identifiées et dont la reproduction est autorisée. Les quinze fiches actuelles sont des commentaires originaux ; elles ne reproduisent pas les traductions modernes fournies. Préciser les traducteurs individuels encore non attribués. Aucun Hegel ancien ajouté.
- Bibliothèque littéraire : les sept parcours existants sont conservés ; la future sélection de textes fournie par le propriétaire reste à intégrer. Pas de fausse banque annoncée comme déjà complète.
- Sélection philosophique : rapprochement lexical explicable, non moteur sémantique garantissant la meilleure citation. Le corpus des 11 000 sujets n'est pas intégré.
- Collège : les huit parcours ne constituent pas une progression complète de sixième à troisième ; les corrections locales manquantes des anciennes chaînes sont décrites dans COLLEGE-AUDIT-ET-LECTURE.md.
- HLP et explication : premiers lots partiels, à étendre par entrée de programme et type de texte, sans confondre les deux épreuves.
- Après publication : vérifier le commit Netlify, l'accès aux nouvelles pages et l'action de retour déployé du Worker modifié.
