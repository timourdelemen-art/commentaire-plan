# HLP — corrections du 17 octobre 2026

## Périmètre

Six sujets officiels, douze réponses, soixante tâches. La base de cette branche est `8f43722862a9c14150d1c97e6bfa1810f1d27ec4`. Le travail est indépendant de la banque philosophique (#163) et du moteur de dissertation (#147).

## Modèles et annotations

Les 68 annotations de paragraphes sont remplacées par 295 fonctions de phrases rédigées individuellement. Une phrase et sa fonction restent liées dans les données. Le texte conserve ses paragraphes ; masquer les fonctions donne une lecture continue du même texte, avec la même ponctuation. La version révisée comporte 69 paragraphes après l’ajout sur l’écriture de soi chez Montaigne.

Les fonctions décrivent le travail propre à chaque phrase : l’image analysée, la raison reconstruite, le sens distingué ou la conséquence tirée. Elles ne déterminent ni une liste universelle de gestes, ni un nombre obligatoire de phrases ou de parties.

Les titres HLP « A20 » et les présentations « vise 10/10 » sont remplacés par « réponse modèle ». Le texte est une proposition pédagogique originale du site ; aucune note de jury n’est revendiquée. La signature générale du site et ses modèles de dissertation philosophique restent hors de ce chantier.

## Reprises de contenu

- Molière : attribution exacte de l’interdiction de dire « ma femme » au père, confirmée par la mère ; deux pistes solides au premier niveau, domination des Sotenville ou renversement final par Dandin. Les critères ne rendent pas obligatoire la lecture choisie par le modèle.
- Zola : lettre ouverte, L’Aurore, 1898, destinataire et affaire Dreyfus ; l’analyse distingue publication et réparation immédiate.
- Léry : chapitre XV, rapprochement entre anthropophagie, usure et violences européennes ; le lecteur examine le regard qui compare.
- Candide : correction de « déplacements de Voltaire » ; le personnage voyage, l’auteur construit la fiction.
- Montaigne : Essais III, 2, « Du repentir », variation de soi ; dans l’essai sur l’identité, l’écriture de soi complète l’étude des personnages et du jugement du lecteur.
- Flaubert : après le bal à la Vaubyessard, souvenirs et rêveries d’Emma ; la compréhension de sa vie intérieure n’abolit pas la distance critique.
- Molière, L’Avare IV, 7 : l’argent perdu concentre la parole d’Harpagon ; une lecture réductrice peut transformer le personnage en étiquette. Le modèle ne soutient pas que tout personnage comique serait un stéréotype sans complexité.
- Condorcet : la férocité peut servir de prétexte à la tyrannie et aux lois inégales ; l’explication est resserrée sur ce lien précis du texte.

## Sources relues pour les reprises

- [Attendus Éduscol](https://eduscol.education.gouv.fr/sites/default/files/document/ra19lyceeg1-thlpattendus-epreuveselements-evaluation1205353pdf-83928.pdf) : liberté de composition, précision et progression.
- [BO applicable à partir de 2027](https://www.education.gouv.fr/bo/2026/Hebdo4/MENE2622659N) : distinction des deux exercices, disciplines différentes, ampleur comparable et 10 points par réponse.
- Les six PDF officiels restent liés dans `scripts/hlp-parcours-data.json` : Molière, Descartes, Rivière, Alain, Condorcet et Sand. Les commentaires des sujets zéro Molière et Alain reconnaissent explicitement plusieurs voies recevables, sans plan formel imposé.
- [Montaigne, Essais III, 2](https://fr.wikisource.org/wiki/Essais/Livre_III/Chapitre_2) : ouverture du chapitre, peinture du passage, variation des intentions.
- [Léry, corpus académique, page 2 du PDF](https://pedagogie.ac-limoges.fr/hlp/IMG/pdf/poitiers_corpus1_du_regard_a_la_representation.pdf) : chapitre XV, retour critique sur les violences européennes.
- [Zola, J’accuse…!](https://fr.wikisource.org/wiki/J%E2%80%99accuse%E2%80%A6!) : lettre et mise en cause des autorités.
- [Flaubert, Madame Bovary I, 9](https://fr.wikisource.org/wiki/Madame_Bovary/Premi%C3%A8re_partie/9) : suites du bal, livres et rêveries, déception et vie quotidienne.
- [Molière, L’Avare IV](https://fr.wikisource.org/wiki/L%E2%80%99Avare_(Moli%C3%A8re)/%C3%89dition_Louandre,_1910/Acte_IV) : scène 7, tirade d’Harpagon après le vol.

Les références nouvelles sont présentées par des analyses originales, sans ajout de citation littéraire de mémoire.

## Exercices et sorties générées

Le générateur des annales avait été assoupli, mais 103 HTML suivis par Git contenaient encore l’ancienne obligation des trois parties. Ils sont régénérés. Le repérage demande deux ou trois passages ; le sens des mots est rapporté à la question. Le nombre de phrases des exercices courts est présenté comme un repère d’entraînement.

Les zones HLP gardent `data-feedback="off"` : les grilles et modèles servent à la comparaison, sans appliquer le correcteur de dissertation à un exercice HLP. Les brouillons et leurs identifiants sont conservés.

## Vérification pédagogique

Les tâches ont été relues en construisant la réponse qu’elles permettent : repérage puis explication d’un détail en interprétation, raison et exemple analysé dans l’essai, réserve qui précise la réponse. Les aides restent repliées ; leur consultation et la comparaison interviennent après la tentative. Pour Molière, deux thèses distinctes peuvent être soutenues au niveau 1 et prolongées dans les étapes suivantes. Le niveau 3 reste accessible sans exécuter les niveaux précédents. La reprise finale demande de dire ce qu’une phrase apporte, puis de réécrire un passage ; le lien vers un autre sujet permet de refaire le geste sans modèle préalable.

## Vérifications techniques

Le test de données contrôle que chaque phrase a une fonction, que le texte annoté et le texte continu sont identiques, et que les paragraphes sont conservés. Il vérifie également navigation et brouillons dans un DOM simulé. Un contrôle navigateur dédié couvre les douze réponses à 390 et 1280 pixels, le clavier, l’affichage des fonctions, le texte continu, deux annales et l’accès aux modèles sans JavaScript. Il est ajouté au workflow navigateur existant.

Le build et les contrôles navigateur sont consignés dans la PR après leur exécution. Ces tests ne constituent pas une notation pédagogique des modèles.
