# Banque d’exemples : vérification des citations

Les fiches sont écrites dans `exemples_src.py`. `build_exemples.py` produit `philosophie-exemples-data.js` et ne garde une citation que si elle est retrouvée mot pour mot dans une édition numérique du texte (sinon la fiche reste, sans citation).

Corpus utilisés (domaine public) :

    mkdir corpus && cd corpus
    git clone --depth 1 https://github.com/dracor-org/fredracor.git
    for r in hugo zola baudelaire proust flaubert stendhal maupassant; do git clone --depth 1 https://github.com/oeuvres/$r.git oe-$r; done

Puis, depuis la racine du dépôt :

    CORPUS=/chemin/vers/corpus python3 scripts/exemples/build_exemples.py philosophie-exemples-data.js

Ajouter une citation : champ `cit` avec `t` (texte affiché), `qui`, `src` (fichier du corpus) et `n` (passage cherché). Une œuvre encore protégée (auteur mort il y a moins de 70 ans, traduction récente, film) n’a jamais de citation : la scène est décrite.

## Contrôle bloquant

Le vérificateur refuse un badge si le texte affiché est différent du corpus, si le passage ou le fichier est absent, ou si la provenance n’est pas connue. Il retire la citation de la sortie et retourne un code non nul : ne pas publier cette sortie avant correction. Les notes et en-têtes ne comptent pas comme texte. La normalisation concerne les espaces, guillemets et apostrophes, pas les mots ni la casse.

Test sans téléchargement de corpus : `python3 scripts/exemples/test_verifier.py`.

Ce contrôle porte sur les citations seulement. Il ne prouve ni l’exactitude du résumé d’une scène, ni son adéquation à un sujet. Une liaison sujet-scène demande une lecture des deux pistes et de leurs limites.

## Scènes d’ouverture du Worker

Le même lancement de `build_exemples.py` produit aussi `worker/src/philo-engine/scene-bank.json`, à partir des fiches et de `scenes-audit.json`. Le fichier contient seulement les raccords pour lesquels les deux limites sont déjà renseignées ; sa présence dans ce registre ne vaut pas validation.

Le sélecteur documentaire n'admet une scène que si l'audit contient une provenance HTTPS avec un repère précis, une date et une empreinte SHA-256 du document consulté, une vérification explicite de la fidélité du résumé liée à l'empreinte SHA-256 de la description, une homologation d'ouverture, et une relecture indépendante du raccord. Cette relecture doit évaluer séparément l'ancrage concret, chacune des deux réponses avec sa difficulté interne, et le passage à la généralisation. Une citation contrôlée ne satisfait aucun de ces critères à elle seule.

Les fiches actuelles ne portent pas toutes ces attestations : le sélecteur les écarte. Ce registre reste hors du parcours actif de génération, qui ne dépend donc pas de l'homologation documentaire d'une scène.

## Prototype de découverte documentaire

`node scripts/exemples/test-scene-discovery.mjs` lance une recherche exploratoire à partir d'un sujet et d'une double aporie de test, dans l'API de Wikisource et la recherche plein texte d'Internet Archive. Ce prototype documentaire reste disponible hors du parcours actif de génération. Les pistes sont classées uniquement par recouvrement lexical ; ce classement ne mesure ni leur qualité esthétique ni leur puissance philosophique. Les licences déclarées sont conservées avec les résultats, mais une fiche Wikisource ne prouve pas le statut juridique de l'œuvre sous-jacente.

Le Worker ne lance pas cette recherche pendant la génération. En un appel modèle, il doit établir la double aporie avant de construire et comparer trois situations fictives, puis rédiger uniquement à partir de la candidate retenue. La réponse JSON du modèle doit fournir les trois évaluations selon les six critères philosophiques et la qualité littéraire ; le Worker vérifie leur présence, les structures distinctes et le choix d'une candidate au score maximal. La situation d'ouverture dans la copie doit être explicitement présentée comme une expérience de pensée ou un cas fictif. Les jugements qualitatifs restent à contrôler dans des lectures humaines de générations réelles.
