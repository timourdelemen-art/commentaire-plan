# Révision intégrale des commentaires — 7 novembre 2026

## Périmètre et décision éditoriale

**18 commentaires annotés** figurent dans le catalogue `commentaire-bac-deux-modeles.html`. Deux commentaires supplémentaires, sur Zola et Chrétien de Troyes, sont accessibles par les pages du programme : **20 parcours de lecture** examinés. Les **13 annales** constituent un corpus d'exercices distinct : la cohérence X/Y et leurs liens sont couverts par le contrôle existant `scripts/check-commentaire-xy.js` et l'audit du 17 octobre, sans prétendre qu'une nouvelle vérification philologique des treize sujets a été réalisée ici.

Le critère de clôture n'est pas « tous les textes réécrits ». C'est **chaque modèle possède un fil identifiable, des preuves locales et une réponse d'ensemble, sans transformer l'analyse en paraphrase**. Une retouche n'est justifiée que si elle produit un gain interprétatif.

## Relecture éditoriale du corpus

| Modèle | Continuité contrôlée et singularité préservée |
| --- | --- |
| Rimbaud, *Les Effarés* | Enfants devant le four → attraction du pain et de la chaleur → retour de l'hiver ; l'attendrissement ne supprime pas l'exclusion. |
| Fontenelle, *Entretiens sur la pluralité des mondes* | Analogie du spectacle → critique des explications anciennes → réorientation de l'étonnement ; le dialogue fait découvrir plutôt qu'asséner. |
| La Boétie, *Discours de la servitude volontaire* | Tyran ramené à un seul corps → puissance prêtée par les sujets → colosse qui tombe ; la démonstration fait changer de conception de l'obéissance. |
| Musset, *On ne badine pas avec l'amour* (Perdican) | Dénonciation des discours empruntés → accusation du genre humain → amour affirmé malgré la douleur ; ne pas résorber l'ambivalence. |
| Graffigny, *Lettres d'une Péruvienne* | Recherche d'une cause → examen de l'éducation → critique de la contradiction entre honneurs verbaux et privations réelles ; conserver la voix étrangère. |
| Corneille, *Le Menteur* | Séduction → récit guerrier exorbitant → décalage perceptible entre les savoirs des interlocuteurs ; théâtre et parole mensongère articulés. |
| Proust, *Du côté de chez Swann* | Séparation anticipée → baiser préparé par la pensée → injonction du coucher ; rapport décisif entre la longueur des phrases et l'épreuve intérieure. |
| Ajar, *La Vie devant soi* | Provocations pour obtenir une mère → attention à la fatigue de Madame Rosa → vols pour être remarqué ; le passage par l'autre vulnérabilité est explicitement raccordé dans le modèle. |
| Baudelaire, *Le Joujou du pauvre* | Grille et hiérarchie → désir du jouet inattendu → rire partagé ; la frontière persiste tandis que la perception de l'égalité change. |
| Leconte de Lisle, *Le Cœur de Hialmar* | Défaite et blessures → adresse aux vivants → héroïsation de la mort ; la représentation héroïque ne nie pas la mort. |
| Cioran, aphorisme du spermatozoïde | Deux termes éloignés rapprochés → renversement de la naissance en violence ; exemple bref explicitement distinct du commentaire de bac en quatre heures. |
| La Fontaine, *Les Animaux malades de la peste* | Délibération royale → confessions inégalement évaluées → condamnation de l'Âne ; les discours de justice produisent l'injustice. |
| Corneille, *Le Cid* (Don Diègue) | Défaite du corps → impératif d'honneur → transfert de la vengeance à l'épée et aux « meilleures mains » ; la réponse ouvre un coût pour le fils. |
| Hugo, poème de la branche rude | Bois hivernal → bourgeon → âme aimante → certitude du printemps ; retour des images et non accumulation de métaphores indépendantes. |
| Desbordes-Valmore, *À Monsieur A. L.* | Ville meurtrie et témoignage → impuissance à sauver → responsabilité de la mémoire ; aucune consolation facile. |
| Gautier, *La Morte amoureuse* | Méfiance du narrateur → corps aimé et danger du sang → coexistence du soin et de la violence ; laisser subsister l'hésitation fantastique. |
| Musset, *Il faut qu'une porte soit ouverte ou fermée* | Critique des paroles galantes → esquives et prises de position → invitation finale ; comique des échanges et symbole de la porte. |
| Rousseau, *Émile*, voyager à pied | Critique du voyage utilitaire → disponibilité sensible de la marche → éducation par le chemin ; la distinction « arriver / voyager » unifie la démonstration. |
| Zola, *Pot-Bouille*, cour des cuisines | Vacarme et humiliation d'Adèle → silence soudain devant les maîtres → révélation de l'immeuble sous ses façades ; texte et commentaire accessibles dans des onglets. |
| Chrétien de Troyes, *Le Chevalier de la charrette* | Marché imposé par le nain → conflit de Raison et Amour → contraste de conduites avec Gauvain ; la traduction de travail et sa provenance sont signalées. |

## Changements réellement apportés

1. `THEORIE-COMMENTAIRE.md` : nouveaux tests du lecteur absent, de l'unité expressive et de la recomposition ; refus d'un découpage mécanique.
2. `commentaire-bac-methode.html` : nouvelle section « Suivre le texte sans le morceler » ; harmonisation du catalogue à **dix-huit** modèles (au lieu de dix).
3. `commentaire-bac-deux-modeles.html` : correction de l'ancien nom du site dans le titre de page.
4. `bac-commentaire-ajar-vie-devant-soi.html` : deux raccords rédigés à l'intérieur de la copie, sur le passage du manque de Momo à la fatigue de Madame Rosa et sur le retour au manque de Momo.

## Bilan et limites de la clôture

La relecture a vérifié la présence de l'introduction et de la conclusion, l'articulation des grandes unités et les enchaînements interprétatifs de chaque modèle. **Les 18 modèles ont été conservés plutôt que réécrits systématiquement**, lorsqu'ils satisfaisaient déjà à l'exigence de continuité. Les deux parcours du programme ont été examinés séparément, puisqu'ils ne portent pas la même structure HTML `model-commentary`.

**Clôture éditoriale du corpus de 20 commentaires : acquise sur les critères de continuité, d'ancrage et de cohérence des lectures examinées.** Cette mention ne constitue pas une certification de concordance philologique citation par citation avec toutes les éditions imprimées, ni une réussite de tests navigateur ou CI qui n'ont pas été exécutés dans cette session. Les annexes d'entraînement et annales ne sont pas déclarées intégralement revalidées. Les corrections futures devront répondre à une erreur démontrée ou à un gain interprétatif précis, pas à un besoin de multiplier les formulations.
