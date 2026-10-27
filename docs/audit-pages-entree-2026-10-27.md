# Lisibilité des pages d’entrée — 27 octobre 2026

Document interne. Revue de dix-neuf entrées : `bac.html`, `bac-commentaire.html`, `bac-dissertation.html`, `bac-oral.html`, `brevet.html`, `brevet-redaction.html`, `brevet-comprehension.html`, `brevet-grammaire.html`, `brevet-reecriture.html`, `philosophie.html`, `philosophie-dissertation-parcours.html`, `philosophie-explication.html`, `hlp.html`, `hlp-premiere.html`, `hlp-terminale.html`, `hlp-ecrire.html`, `annales.html`, `annales-bac.html`, `bibliotheque.html`.

Question de revue : après le titre, l’élève sait-il quoi choisir, ce qu’il va faire et où trouver la méthode ? Un lien répété après une activité longue peut servir ; deux menus voisins menant aux mêmes destinations ne créent pas deux choix utiles.

| Entrée | Constat et décision |
| --- | --- |
| Brevet, rédaction | Le menu, les deux cartes et la liste de ressources répétaient les destinations. « Voir la méthode » menait à un parcours ouvrant les exercices, ce qui entretenait la confusion. Deux cartes sont conservées : imagination et réflexion. Chacune distingue « Commencer les exercices », « Comprendre la méthode » et « Lire les copies modèles », avec les bonnes ancres. Le choix d’un sujet entier vient ensuite. Outils et rédaction chronométrée sont facultatifs. |
| Brevet, accueil | Le premier onglet ouvrait toute la banque de sujets. L’entrée ouvre désormais les entraînements par partie ; les sujets complets et les méthodes restent dans deux autres onglets. Les deux boutons du bandeau qui répétaient les onglets sont retirés. Le déroulement de l’épreuve est consultable dans un volet. Les anciens liens directs vers les annales restent valables. |
| Brevet, compréhension, grammaire, réécriture | Les trois onglets ont des fonctions distinctes : méthode, exercices, questions d’annales. L’entraînement s’ouvre par défaut ; l’extrait nécessaire est présent. Cette structure est conservée. Les anciens défauts de support et de présentation des questions ont été traités dans les commits précédents. |
| Philosophie, accueil | La barre de quatre raccourcis répétait les deux grandes portes et deux liens de ressources immédiatement voisins. Elle est retirée. Les deux épreuves restent les choix principaux ; les dix-sept notions restent visibles dans les ressources, comme demandé. |
| Philosophie, dissertation | Deux choix principaux ont été mis en avant : commencer les exercices pas à pas ou choisir un sujet corrigé. Méthode et difficulté ciblée viennent en second. Les explications longues des exercices sont facultatives. Le catalogue de sujets remplace l’ancienne liste et les étiquettes de provenance obscures. |
| Philosophie, explication | Deux destinations distinctes sont annoncées : choisir un texte avec ses exercices ou consulter la méthode. La méthode longue ne précède plus obligatoirement le choix d’un texte. Les sources officielles restent dans leur section de référence. |
| HLP, accueil | Le choix se fait par classe puis par exercice. Les liens mènent au catalogue filtré de parcours, avec modèles et exercices, plutôt qu’à une page de programme. Structure conservée. |
| HLP, Première et Terminale | L’entraînement est proposé d’abord ; programme et évaluation ont des accès secondaires explicites. Les renvois vers d’autres disciplines servent à travailler une difficulté précise. Les épreuves HLP ne sont pas assimilées à deux dissertations disciplinaires. |
| HLP, écrire | Recherche par niveau, exercice et discipline, puis cartes de sujets. Les filtres sont progressifs ; sans JavaScript, les liens des sujets restent disponibles. Les modèles et leurs deux modes sont accessibles depuis les parcours. |
| Français, accueil | Les portes écrit/oral/annales sont compréhensibles. Le bloc « Je bloque » offre ensuite un autre accès par difficulté. La page reste plus dense que l’entrée HLP ; un repli de ce bloc pourra être étudié si l’usage montre qu’il gêne le choix. Pas de suppression d’exercices pour imposer une uniformité visuelle. |
| Français, commentaire et dissertation | Choix d’un texte ou d’une œuvre, difficulté ciblée, puis méthode : les onglets répondent à trois intentions différentes. Les listes sont plus longues dans le choix du corpus, où cette abondance est pertinente. Les œuvres manquantes au nouveau programme relèvent de l’audit de contenu séparé, pas d’un problème de navigation résolu par ces onglets. |
| Français, oral | La page est un simulateur séquentiel : support, préparation, exposé, entretien et bilans. Elle ne requiert pas le même menu qu’une banque d’exercices. Aucun bouton ne promet une correction avant que l’élève ait fourni le support et sa production. |
| Annales, accueil | Quatre banques clairement distinctes, une par épreuve. Structure conservée. |
| Annales du bac | Choix par auteur/œuvre, recherche et sources officielles coexistent. Le catalogue reste dense : c’est une priorité de simplification ultérieure, à traiter avec les filtres et la couverture des œuvres, sans confondre corrigés du site et corrigés officiels. |
| Bibliothèque | Deux portes distinctes, littérature et philosophie, puis ressources secondaires. Structure conservée. |

## Vérification

Les changements de cette passe concernent les accueils Rédaction, Brevet et Philosophie, ainsi que les sommaires des deux banques de copies du brevet : les sommaires donnent maintenant accès à toutes les copies, et non seulement aux trois premières. Les méthodes restent dans les parcours qui les enseignent, avec des liens explicites depuis l’accueil.

Contrôles : build complet, liens et ancres, clavier, 390/1280 px, ouverture du bon onglet, accès aux méthodes, simulation de rédaction avec chronomètre et retour simulé, deux modes de lecture, accès sans JavaScript. Les retours simulés vérifient l’interface et la conservation de la réponse pendant l’appel, pas la qualité du service d’IA en ligne.

Cette revue porte sur la hiérarchie et les parcours ; elle ne vaut pas audit complet de l’accessibilité de toutes les pages, ni validation du fond de chaque corrigé de français, de philosophie ou de HLP. Les limites et les contenus encore à compléter sont consignés dans les audits de programmes et de consignes.
