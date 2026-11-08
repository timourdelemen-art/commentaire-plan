# Bilan de clôture des corrections littéraires — 8 novembre 2026

## Périmètre réellement parcouru
Les vingt commentaires principaux ont fait l'objet d'une reprise de lecture et de révisions ciblées à différents degrés : Ajar, Baudelaire, Cioran, Corneille (*Le Menteur*), Desbordes-Valmore, Duras, Fontenelle, Gautier, Graffigny, Hugo, La Boétie, Chrétien de Troyes, Leconte de Lisle, Musset (*On ne badine pas* et *Porte ouverte*), Proust, Racine, Rimbaud, Rousseau et Zola. Deux modèles historiques, Corneille (*Le Cid*, Don Diègue) et La Fontaine (*Les Animaux malades de la peste*), ont également été repris.

**Branches** :
- `chatgpt/commentaires-vie-du-texte-20261108` / PR #260 : vingt et un modèles corrigés, plus fichiers d'audit. Base de comparaison : branche expérimentale `chatgpt/commentaires-continuite-lecture-20261107` (PR #259). Cette PR ne doit pas être fusionnée indépendamment de son socle sans revue des différences et conflits.
- `chatgpt/ajar-devoir-eleve-site-20261107` / PR #257 : Ajar corrigé à partir du document PDF de l'enseignant, avec les seize questions, les deux transitions et cinq paragraphes de l'extrait. La reprise intégrale du passage, encore protégé, ne doit pas être publiée sans autorisation ou validation juridique.

## Corrections effectuées
- **Poésie et vers** — Hialmar : progression des impératifs vers la transmission ; Rimbaud : subordonnées de temps et attente du pain ; Racine : suppression de redondances et conflit de deux justifications ; Hugo : impératifs, futurs et rythme du dévoilement ; Desbordes-Valmore : principale retardée, regard derrière la vitre et adresse ; Don Diègue : passage des questions aux ordres.
- **Roman et récit** — Proust : la période infinitive fait durer le désir ; Duras : rupture des perceptions par « Mais bientôt », geste offert et retiré ; Gautier : gestes, attente, prélèvement et soin tenus ensemble ; Zola : « puisard » et « égout » réorientent l'image de l'immeuble ; Ajar : successions de tentatives et de revers, à valider depuis la PR #257 ; Chrétien : délai, débat puis saut, contraste avec Gauvain ; Baudelaire : renversement de la valeur des jouets et retour de la blancheur.
- **Théâtre** — *Le Menteur* : invention du mensonge entre répliques et savoirs divergents ; *Porte ouverte* : critique qui formule une attente et porte finale ; Perdican : « mais » préparé par le réquisitoire, passage du « on » au « je ».
- **Argumentation, fable, aphorisme** — Fontenelle : défilé des explications anciennes sur la scène de l'opéra ; La Boétie : corps réduit, membres prêtés et colosse ; Graffigny : déroulement de la découverte et critique des moyens de l'éducation ; Rousseau : rythme des bifurcations, relecture finale de « voyager » ; La Fontaine : actes similaires jugés selon des rangs différents, verdict fabriqué par les discours ; Cioran : brièveté et précision « à l'état pur », sans gonfler une phrase en dissertation.

## Audit structurel réellement exécuté
Sur **22 pages de commentaires** (20 parcours principaux + Corneille/La Fontaine historiques) :
- Les 22 modèles sont présents et leur bloc HTML se ferme correctement.
- Sur les 22 pages, le nombre de balises ouvrantes `<p>` correspond au nombre de fermantes `</p>` : **22/22** pour cette vérification syntaxique limitée.
- Les modèles majoritaires conservent introduction, trois parties, neuf paragraphes de développement, deux transitions et conclusion (13 blocs de paragraphe HTML). Cioran conserve un format bref à deux parties (9 blocs) qui doit demeurer une microlecture, non un faux devoir de quatre heures.
- Zola, Duras, Racine et Chrétien utilisent un découpage HTML par phrases/fonctions (respectivement 57, 51, 51, 58 blocs de paragraphes), qui n'est pas directement comparable au comptage des paragraphes littéraires ; leur structure a été conservée.

## Qualité littéraire : contrôles positifs et réserves
**Acquis attestés sur passages corrigés** : la phrase et le vers sont traités comme des unités dynamiques ; le même motif peut changer de valeur ; l'effet de lecture suit le texte sans devenir une émotion arbitraire ; les tensions ne sont pas systématiquement résolues ; le commentaire conserve le niveau et le vocabulaire attendus au baccalauréat.

**Réserves non levées par l'audit** :
1. Ce contrôle structurel ne remplace **pas** une collation philologique, citation par citation, contre les éditions originales et le manuel complet des procédés.
2. Il ne prouve ni la correction parfaite des analyses métriques, ni la fidélité absolue de chaque découpage, ni l'absence de répétitions subtiles.
3. Aucun test navigateur, CI ou de déploiement n'a été lancé dans cette campagne. Un balisage de paragraphes équilibré ne garantit pas la qualité responsive ni l'accessibilité.
4. Les versions enrichies des PR #256, #258 et #259 se chevauchent. Il faut comparer et réconcilier les propositions avant publication, au lieu de fusionner mécaniquement.
5. Dans l'extrait de Chrétien, l'analyse de la syntaxe et de la ponctuation vaut pour la **traduction de travail** ; les formes et le rythme du texte médiéval exigent une collation séparée.
6. Le document Ajar reproduit une quantité substantielle d'un roman protégé. Son passage intégral demeure hors publication publique sans droits établis.

## Règle éditoriale de clôture
La **campagne de corrections est achevée au sens de la reprise ciblée des vingt-deux modèles**. Le corpus **n'est pas certifié prêt à publication** : cette décision exige encore les vérifications d'origine, de rendu et de droits énumérées ci-dessus. Aucune fusion dans `main` n'est autorisée par ce seul audit.

## Apports pour le second protocole
1. Choisir la **bonne unité expressive** : mot, proposition, phrase, vers, strophe, échange, séquence ; ne jamais réduire le texte à une collection de mots-clés.
2. Identifier **précisément** les procédés dans cette unité et leur fonction ici.
3. Expliquer les **relations temporelles et formelles** : ce qui se prépare, se suspend, se retourne, se prolonge ou change de portée.
4. Mettre en relation les **retours de motifs** et les transformations de signification ; différencier convergence et progression.
5. Décrire ce que la composition permet au **lecteur de comprendre, éprouver ou reconsidérer**, en le démontrant par la lettre du texte.
6. Respecter le **reste** et la tension non résolue ; ne pas forcer une conclusion philosophique ou une « pensivité » sur toutes les œuvres.
7. Rédiger le commentaire selon le **plan dynamique conservé** ; chaque paragraphe doit apporter une découverte distincte et démontrée, sans paraphrase ni jargon.

### Questions simples pour l'élève
**Quel procédé remarquez-vous ?** **Que construit la phrase / le vers entier ?** **Que change la suite ?** **Que comprenez-vous ou percevez-vous autrement ?**

Ces questions forment un noyau expérimental de **protocole II**, à mettre à l'essai sur des élèves de seconde avant stabilisation. Le vocabulaire technique doit continuer à venir du *Petit manuel des procédés*.
