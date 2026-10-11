# Banque philosophique — intégration

15 fiches : 5 Platon, 6 Aristote, 4 Nietzsche. Elles reprennent les thèmes préparés dans la conversation précédente ; les explications et exercices sont écrits ici. Les citations qui y étaient annoncées ne sont pas réputées vérifiées. Aucun livre fourni, extrait protégé, URL de téléchargement privé ou identifiant Library n'est commité.

Sources consultées : Platon, Œuvres complètes, direction Luc Brisson, Flammarion 2008 ; Aristote, Œuvres complètes, direction Pierre Pellegrin, Flammarion 2014 ; Nietzsche, Œuvres, préface Patrick Wotling, Flammarion 2010. Repères Stephanus, Bekker, sections d'aphorismes et chapitres dans chaque fiche. Le registre de provenance conserve les empreintes des fichiers ; il ne certifie pas une traduction ni une note. Attribution individuelle des traductions de Platon et de plusieurs traités aristotéliciens encore à préciser. Les traducteurs Nietzsche sont identifiés sur la page de titre.

## Architecture

- Source : scripts/philo-banque-data.json. Générer : node scripts/build-philo-banque.js. Contrôle de fraîcheur : --check.
- Données publiques générées commitées : philosophie-banque-data.js. Le build actuel ne relance pas ce générateur ; le contrôle dédié en CI empêche une divergence avant fusion.
- Entrée depuis philosophie.html et philosophie-references.html ; styles isolés, aucun menu partagé ni worker modifié.
- Sélecteur pur PhiloBanque.select utilisable par d'autres pages. Fonctions documentées distinction/raison/objection, sujets exacts puis recoupement lexical de l'argument. Les mots partagés ne prouvent pas l'accord philosophique. Zéro résultat pour un argument non couvert ; aucune garantie d'optimalité.
- Trois niveaux ; justification après choix, explication partielle, autonome ; modèle replié, brouillon par fiche/niveau. Effacer touche seulement ce brouillon. Aucun correcteur IA général.

## Périmètre et suites

Banque de références commentées, pas encore bibliothèque d'extraits ni sélecteur de citations authentifiées. L'import des passages, leurs droits et leur vérification textuelle restent à traiter ; leur réception n'autorise pas à republier des traductions protégées selon AGENTS.md §3. Aucun Hegel ancien ; son ajout attend le choix du propriétaire.

Les 11 000 sujets de Mélès ne sont pas intégrés : extraction et segmentation non homologuées. Aucune couverture exhaustive des 17 notions prétendue. Les sujets proposés sont vérifiés contre PHILO_SUJETS ; ce contrôle ne remplace pas leur source officielle.

## Vérification pédagogique

L'élève doit expliquer une différence et son utilité, non réciter un nom. Chaque fiche propose un problème spécifique, une explication, un contresens et un raccord argumentatif. Le niveau 1 demande une justification après un choix ; niveaux 2/3 font écrire. La comparaison au modèle laisse au lecteur le jugement ; pas de note automatique. La proposition solide de chaque choix n'est pas systématiquement la plus longue ; mesurer avant nouvelle extension. Les textes de modèle sont des propositions du site, jamais des copies garanties à 20.

## Vérification technique

Test Node du sélecteur, 15 IDs, 5/6/4 auteurs, raccords aux sujets, faux rapprochements refusés, données fraîches : réussi. Syntaxe JS : réussie. Contrôle navigateur dédié via GitHub Actions sur 390/1280 : filtres, choix, niveaux, stockage, rechargement et effacement. Ne fusionner qu'après réussite du workflow.
