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
