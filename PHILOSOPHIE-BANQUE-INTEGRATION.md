# Recueil de citations — intégration du 16 octobre 2026

## Décision du propriétaire

Le propriétaire a fourni trois recueils, approuvé l’inventaire de 45 citations et demandé leur intégration à la place des quinze anciennes fiches. Chaque nouvelle fiche comporte la citation exacte, une partie Dissertation et une partie Commentaire. Les six fonctions du commentaire sont visibles par défaut et peuvent être masquées sans modifier le paragraphe.

## Contenu

- 45 citations : quinze de Platon, quinze d’Aristote, quinze de Nietzsche.
- 93 usages proposés sur 63 libellés de sujets distincts, avec deux ou trois sujets par fiche.
- 45 commentaires originaux de six phrases, entre 93 et 138 mots ; aucune prétention à un protocole officiel de six phrases.
- Trois liens vers des copies A20 existantes, avec indication de la sous-partie examinée. Il s’agit d’insertions possibles, pas de citations déjà présentes dans les copies.
- Les sujets anciens sont attestés dans le recueil de l’académie de Montpellier, 1996-2025, aux pages conservées dans les données. Trois raccords sont vérifiés dans les PDF ministériels 2026 (Amérique du Nord et Asie).
- Les traductions individuelles non identifiées restent explicitement indiquées comme à préciser. Les noms ne sont pas inventés.

## Sources et contrôle

La sélection et ses citations viennent des trois recueils fournis dans la conversation. Le registre scripts/philo-banque-provenance.json conserve les empreintes des sources, le passage interne et l’empreinte du texte de chaque citation contrôlée. Les livres, noms de fichiers privés et identifiants Library ne sont pas commis. Les espaces et renvois de notes ont été normalisés ; les mots des citations ne sont pas remplacés.

Le propriétaire a expressément demandé l’intégration de ces courts extraits après lecture du recueil. Aucun ouvrage ni chapitre entier n’est publié. La décision porte sur cette sélection, pas sur une autorisation générale de reproduire les traductions.

## Architecture

Source : scripts/philo-banque-data.json. Génération : node scripts/build-philo-banque.js. Le script vérifie les citations contre les empreintes, les six fonctions, les sources des sujets, les liens A20, et produit philosophie-banque-data.js ainsi que le catalogue HTML complet. --check vérifie la fraîcheur des deux sorties. Les sorties sont commises car le build général ne relance pas ce générateur.

La page fonctionne sans JavaScript : quarante-cinq fiches complètes dans des blocs dépliables. Avec JavaScript : filtres, lecteur unique, lecture annotée ou continue, lien direct partageable. La recherche ne promet aucun classement sémantique automatique. Le sélecteur ne fait que filtrer des raccords documentés.

Les anciennes fiches sont retirées des données et du catalogue. Douze anciens identifiants renvoient vers une nouvelle fiche du même passage ou thème repris ; trois identifiants sans équivalent présentent un message de retrait. Les anciens brouillons du navigateur ne sont ni utilisés ni effacés.

Aucun worker, menu partagé, copie A20 ou mécanisme de correction automatique n’est modifié.

## Vérification pédagogique

Les trois volets sont distincts : la citation ; son usage dans un argument propre à un sujet ; son explication autonome dans son contexte d’origine. Le commentaire ne prouve pas sa qualité par le seul compte des phrases. Chaque phrase a été relue selon son apport : difficulté, affirmation, concepts, justification, exemple, portée. Les précautions importantes des fiches sont intégrées dans la phrase de portée plutôt qu’ajoutées en longues notes.

Le choix d’un sujet fournit une fonction argumentative, pas un plan universel I/II/III. Le lecteur doit l’adapter à son argument. Aucun exercice, évaluation ou note n’est promis sur cette page de lecture.
