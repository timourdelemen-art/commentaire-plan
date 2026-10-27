# Audit des ressources et des modèles — 27 octobre 2026

## Conclusion et portée

Le corpus principal de philosophie est de très bon niveau : problèmes construits,
références qui servent le raisonnement, conclusions précises et explications
attentives aux conditions des thèses. Les modèles HLP respectent globalement la
différence entre interpréter un enjeu du texte et développer une réponse personnelle
argumentée. Une refonte générale de ces textes ne se justifie pas.

Le catalogue rassemble toutefois des productions de maturité différente. La copie
« Une machine peut-elle penser ? » comporte un développement de théorie interne
dans son texte élève : correction prioritaire. Cinq autres dissertations sont
beaucoup plus condensées que les vingt modèles suivis dans le registre. Leur
présentation doit rendre clair ce qu’elles permettent réellement d’apprendre.

En français, les nouveaux romans sont identifiés dans les documents du site, mais
la couverture est inégale : *Pot-Bouille* possède déjà un dossier important ; les
dossiers autonomes de la *Charrette* et de *Télumée Miracle* restent à construire.
Leurs futurs sujets peuvent désormais être originaux et non officiels, selon
l’autorisation donnée pendant cet audit.

**Limite documentaire importante.** La machine refuse l’accès aux sites officiels
et documentaires par un refus CONNECT 403 du proxy. Les observations sur le code,
les textes, les modèles, les liens et les corpus locaux sont vérifiées. Les BO
actuels et les nouvelles citations critiques n’ont pas été consultés en ligne
pendant cet audit. Leur contrôle reste à effectuer avant de déclarer une conformité
réglementaire actuelle ou de publier des sujets à citation critique.

## Travail effectué et sources

- Inventaire des 91 entrées de dissertation française et des 31 pages
  `bac-dissertation-copie-20-*.html` ; lecture des informations de programme
  dans `bac-dissertation-sujets.html`, des feuilles de route et du dossier *Pot-Bouille*.
- Relecture des 20 copies de `scripts/copies20-data.json` et des 6 dissertations
  supplémentaires du catalogue. Le registre `scripts/copies20-resolutions.json`
  et les traces de contrôle ont aussi été examinés.
- Relecture des 9 modèles associés aux 8 textes de
  `scripts/explication-textes-data.json`, et des explications manuelles de Pascal,
  Platon, Mill, Aristote et Bergson : 13 textes, 14 modèles en comptant les deux
  options technologiques de Malebranche.
- Relecture des 24 réponses HLP de `scripts/hlp-parcours-data.json`, des étapes
  et critères ; lecture en vis-à-vis des 10 textes de Terminale associés dans
  `scripts/hlp-textes.json`. Les sujets zéro de Première sont référencés dans les
  données ; leur PDF distant n’a pas été reconsulté ici.
- Vérification navigateur de la présentation réelle des 6 dissertations hors
  registre et d’une explication manuelle : mode continu, annotations et paragraphes.
- Lecture des deux protocoles DOCX fournis par le propriétaire : dissertation
  littéraire du 25 octobre et commentaire du 23 août. Leur articulation avec les
  décisions récentes est exposée dans `cadre-production-francais-2026-2027.md`.

Les anciens audits sont des sources de contexte, non une preuve de la validité
actuelle : ils ne couvraient pas tous les ajouts récents. Les contrôles techniques
ne constituent ni une notation de copie ni une garantie de 20/20.

## 1. Français : couverture des œuvres

La liste locale attribue au programme de Première générale 2026-2027 les douze
œuvres suivantes. Elle cite la note du 4 juillet 2025, BO du 24 juillet 2025,
MENE2518792N. Cette référence doit être reconsultée pour confirmer la liste et les
parcours applicables à l’écrit anticipé de juin 2027.

| Œuvre | Copies portant le préfixe `bac-dissertation-copie-20-` | Autres ressources spécifiques repérées | Priorité |
| --- | ---: | --- | --- |
| Rimbaud, *Cahier de Douai* | 2 | Exercices et copies | Entretien et précision des sources |
| Ponge, *La Rage de l’expression* | 8 | Exercices et copies | Entretien ; vérification des citations sur l’édition utilisée |
| Dorion, *Mes forêts* | 9 | Exercices et copies | Entretien ; même précaution documentaire |
| Corneille, *Le Menteur* | 2 | Exercices et copies | Entretien |
| Musset, *On ne badine pas avec l’amour* | 2 | Exercices et copies | Entretien |
| Sarraute, *Pour un oui ou pour un non* | 4 | Exercices et copies | Entretien ; citation et contexte |
| La Boétie, *Discours de la servitude volontaire* | 0 | Pas de dossier autonome commentaire/dissertation repéré | Préparer un dossier et un sujet original |
| Fontenelle, *Entretiens sur la pluralité des mondes* | 0 | Pas de dossier autonome repéré | Même priorité |
| Graffigny, *Lettres d’une Péruvienne* | 0 | Pas de dossier autonome repéré | Même priorité |
| Chrétien de Troyes, *Le Chevalier de la charrette* | 0 | Pas de dossier autonome repéré | Prioritaire parmi les nouveaux romans |
| Zola, *Pot-Bouille* | 0 dans cette famille de fichiers | 9 pages : œuvre, entrée bac 2027, dissertation, 3 extraits, corrigés et dossiers professeurs | Raccorder l’existant, puis enrichir |
| Schwarz-Bart, *Pluie et vent sur Télumée Miracle* | 0 | Pas de dossier autonome repéré | Prioritaire parmi les nouveaux romans |

Les 31 pages du tableau de comptage comprennent 27 copies sur les six œuvres
actuelles déjà traitées et 4 sur des œuvres d’anciens programmes : deux *Manon
Lescaut*, une *La Peau de chagrin*, une *Gargantua*. Ce sont des périmètres de
fichiers, pas une mesure de toute présence d’un auteur dans le site. Une citation
dans une bibliothèque ne constitue pas à elle seule un dossier de préparation
sur une œuvre entière.

*Thérèse Raquin* est également indiquée dans la feuille de route technologique.
Si cette présence est confirmée, prévoir les exercices adaptés à cette voie,
sans présenter la dissertation comme son exercice écrit du bac.

### Le cas de Pot-Bouille

Il faut éviter de refaire ce qui existe déjà. Le dossier comprend notamment :

- PB-01, la cour des cuisines ; PB-02, le retour de Berthe ; PB-03, le lendemain
  du scandale, avec les corrigés et des usages en dissertation.
- `pot-bouille-dissertation.html`, sur le dévoilement des rouages de la société,
  explicitement présenté comme un sujet d’entraînement non officiel.
- `pot-bouille-bac-2027.html`, entrée rassemblant les ressources, et des dossiers
  destinés aux professeurs.

Le raccord reste insuffisant : `bac.html` et `enseignants.html` proposent des liens,
mais aucun lien Pot-Bouille n’a été retrouvé dans `bac-dissertation.html`,
`bac-dissertation-sujets.html` ou `bibliotheque-dissertation.html`.

Une consigne ancienne demeure dans la page de dissertation : « Pourtant, l’œuvre
montre Y ». Elle doit être harmonisée avec la décision du 17 octobre : analyser
les mots du sujet et les passages de l’œuvre, sans imposer X/Y ni une opposition
artificielle à la dissertation française.

### La banque des 91 sujets

Il y a bien 91 entrées. Vingt utilisent cependant une présentation « à partir de… » ;
plusieurs ne donnent pas l’intégralité de la citation initiale. Exemple : une entrée
Badine dit seulement « À partir d’une citation d’un critique ». Ces notices sont
utiles pour classer des formes de sujet ; elles ne suffisent pas toutes à faire
problématiser une citation exacte par un élève.

À reprendre : donner le libellé complet avec sa source, ou signaler explicitement
que la notice est un résumé. Ne pas confondre « sujet réellement proposé » et
« reproduction intégrale du sujet disponible sur cette page ».

### Nouvelles productions autorisées

La demande du propriétaire autorise des sujets d’entraînement construits sur des
affirmations critiques vérifiées, même sans annale existante. L’exception est
consignée dans `decisions-pedagogiques-2026-10-27.md`. Le cadre de sélection et de production figure
dans `cadre-production-francais-2026-2027.md`.

Le meilleur sujet n’est pas nécessairement celui du critique le plus célèbre :
il faut une lecture assez précise pour être éprouvée dans l’œuvre, assez ample
pour un devoir, et assez accessible pour que l’élève en examine la portée.
Une affirmation pertinente mais partielle est souvent plus productive qu’un
éloge vague ou qu’un jugement volontairement provocateur.

## 2. Philosophie : dissertations

### Ce qui est solide

Les 20 copies suivies travaillent réellement les mots des sujets et reviennent
dans leur conclusion à leur opérateur. Les exemples sont généralement analysés,
les passages d’une partie à l’autre sont motivés et les références ne se réduisent
pas à des noms. Les précautions ajoutées sur Tchernobyl, la distinction des usages
techniques ou le langage comme milieu transformable sont utiles.

Le comptage actuel, par mots séparés par des espaces dans le texte des phrases,
donne 586 à 856 mots. Les chiffres d’anciens documents de suivi ne doivent pas être
reproduits comme des mesures de la version actuelle. La brièveté est un choix
éditorial ; elle ne démontre à elle seule ni une faiblesse ni l’excellence.

### P1 — une copie à reprendre avant de la présenter comme modèle achevé

**Reprise du 27 octobre :** le développement et les annotations sur les formes de
résolution ont été remplacés par des arguments qui répondent au sujet. Le passage
distingue désormais l'hypothèse, la preuve, l'apprentissage et la compréhension,
sans exposer aux élèves la typologie interne. L'introduction et les références
n'ont pas été remplacées. La réserve ci-dessous décrit l'état trouvé lors de
l'audit, et non le texte après cette reprise.

`philosophie-dissertation-machine-peut-elle-penser.html` contient dans son texte
destiné à l’élève une évaluation des « huit formes de résolution », puis des
développements sur la « duplication », la « processualisation » et l’« inversion
du rapport d’indexation ». Ces passages apparaissent aussi dans le mode « La copie
entière » : ce ne sont pas uniquement des annotations invisibles ou un dossier interne.

Le raisonnement sur Turing, Searle, Bion et les critères de pensée peut fournir une
base intéressante. Mais la comparaison des formes de résolution est un travail
préparatoire de méthode qui doit disparaître de la rédaction finale. Le contenu
actuel contrevient à la séparation théorie interne / texte élève d’`AGENTS.md`.

Recommandation : réécrire la partie III en arguments adressés au sujet, en justifiant
ce qu’est un rapport aux raisons et au monde. Conserver l’examen des solutions
concurrentes dans le dossier professeur. La référence à Bion et sa traduction
doivent rester vérifiables dans leur source.

### P2 — cinq corrigés très condensés à situer clairement

Les pages sur la paix et la justice, parler sans savoir, le bonheur si rien ne dure,
l’art qui apprend à voir et le doute sur les pouvoirs de la raison comptent entre
387 et 451 mots. La navigation de lecture fonctionne : les six pages supplémentaires
ont les deux modes communs et 13 paragraphes dans la copie continue.

La réserve porte sur le développement, non sur la présence des paragraphes. Certains
arguments ou références tiennent à une seule proposition, par exemple « Kant limite
la connaissance aux objets dont nous pouvons faire l’expérience ». La logique est
compréhensible, mais la raison qui établit cette limite n’est pas développée à cet
endroit. Ces textes constituent de bonnes ossatures ; avant de les présenter au même
degré d’achèvement que les modèles développés, préciser ou approfondir leurs preuves.

### P2 — passages précis à consolider dans le corpus principal

| Copie | Observation | Reprise recommandée |
| --- | --- | --- |
| *Peut-on être certain d’avoir bien agi ?* | La III dit que la certitude ne garantit pas que l’acte fut bon, mais qu’il fut bien décidé. Le passage du jugement justifié à la certitude morale doit être mieux défendu. | Expliciter le sens de « bien agir » retenu, distinguer action moralement justifiée et conséquences bonnes, et justifier la portée exacte de la réponse. |
| Même copie, scène de Sully | Le registre décrit explicitement le film de Clint Eastwood. L’introduction associe faits historiques et doute intérieur du pilote sans annoncer la mise en scène cinématographique. | Nommer le film pour l’expérience subjective mise en scène ; garder distincts l’événement de 2009 et le récit filmique. |
| *Avons-nous besoin d’art ?* | « Besoin nécessaire » conduit trop vite à « on prescrit alors des œuvres ». Un besoin commun n’implique pas immédiatement des objets identiques pour tous. | Mieux justifier l’objection et la différence entre accès à l’art et prescription d’un goût, afin que la III résolve une difficulté réellement établie. |
| *Notre avenir dépend-il de la technique ?* | « Mais non comme d’une cause » est plus large que ce que le raisonnement a établi. Les dépendances matérielles décrites ont bien une efficacité causale. | Préciser « pas comme d’un destin qui déciderait tout à notre place » ou défendre explicitement la distinction causale voulue. |

Ces remarques sont des points de consolidation argumentative, pas la preuve que
les copies seraient mauvaises. Il faut préserver leur travail de précision et
éviter une réécriture systématique qui ne ferait que changer leur style.

Les tests de traçabilité passent pour les 20 copies. Leurs statuts de relecture
dans le registre sont néanmoins tous `propose`. Ils ne doivent pas être transformés
automatiquement en mentions de validation indépendante sur la seule base des tests.

## 3. Philosophie : explications de texte

Les 9 modèles guidés sont particulièrement solides sur les nuances :

- Nietzsche : distinction entre connaissances et esprit scientifique ; une hypothèse
  n’est pas traitée comme une preuve.
- Freud : l’origine désirante d’une croyance n’est pas confondue avec une preuve
  de sa fausseté.
- Tocqueville : la condition du danger est conservée et le vide de prise en charge
  n’est pas transformé en tyrannie déjà accomplie.
- Weil 2026 : équité sociale, travail d’exécution, désir et répétition sont distingués.
- Malebranche : possibilité d’erreur, ignorance et affirmation fausse ne se confondent
  pas ; les deux options technologiques sont réellement différentes.
- Rawls : égalité des droits et valeur effective des libertés sont expliquées.
- Weil 2024 : « presque irrésistible » laisse une place à la résistance.
- Lévi-Strauss : un stock clos n’est pas assimilé à un stock sans histoire ; la
  spécialisation partielle des objets est expliquée.

Il s’agit bien d’expliquer les raisons du texte, avec une organisation liée à son
mouvement, et non de plaquer une dissertation pour ou contre la thèse.

Améliorations limitées : supprimer la redondance de l’explication Weil 2024 autour
de la « journée sans horizon intérieur » ; continuer à distinguer le propos du
texte et les hypothèses proposées par le modèle. Les cinq explications manuelles
sont logiquement cohérentes mais très brèves ; « corrigé bref » est une désignation
utile à conserver et à homogénéiser. Leurs deux modes de lecture sont disponibles.

La fidélité de toutes les citations de philosophie aux PDF originaux n’a pas été
recontrôlée pendant cet audit, faute d’accès réseau. Cette limite est distincte
de l’appréciation de la qualité du raisonnement des modèles.

## 4. HLP : esprit, plan et présentation

### Diagnostic pédagogique

Le corpus actuel comporte 12 sujets, 24 réponses. Les interprétations traitent
un enjeu indiqué par la question ; elles n’essaient pas de tout dire sur chaque
texte. Les essais et réflexions développent une position propre, mettent des raisons
à l’épreuve et utilisent les œuvres au lieu de simplement réciter des connaissances.
La conclusion répond généralement à la question, sans imposer une ouverture.

La variété existante est utile : les modèles ont cinq, six ou sept paragraphes.
Une introduction, trois moments et une conclusion ne font pas automatiquement
d’un essai une dissertation classique. L’important est la réponse à la question,
le travail des raisons et la liberté de composition. Il n’y a pas lieu de remplacer
les modèles uniquement parce que certains comportent trois moments.

Les points de lecture sensibles sont bien traités dans les modèles récents :
condition et prix de la maîtrise chez Diderot, résistance du désir de délivrance
chez Weil, opposition spectacle / souffrance chez Barbusse, retour à soi chez
Rousseau, travail de la forme chez Heredia. Les textes locaux associés permettent
de suivre les appuis de ces analyses.

### Points à améliorer

1. **Éviter le modèle d’annonce unique.** Les six essais ajoutés récemment utilisent
   régulièrement « Je soutiendrai… », suivi de trois moments annoncés. Cela peut
   convenir à une copie ; varier la présentation dans le corpus évitera d’en faire
   implicitement une formule exigible. Une prise de position argumentée compte
   davantage que la présence d’une expression précise à la première personne.
2. **Conserver les seuils internes à leur place.** Les 450–550 mots et l’écart inférieur
   à 15 % sont des repères du protocole du site, pas des prescriptions nationales.
   Pour Alain, les deux réponses comptent 447 et 565 mots, soit 20,9 % d’écart rapporté
   à la plus longue. Cela dépasse le repère interne ; cela ne suffit pas à déclarer
   une violation de l’« ampleur comparable ». Relire l’équilibre plutôt qu’allonger
   mécaniquement la réponse courte.
3. **Nuancer une attribution d’intention.** L’essai littéraire associé à Weil affirme
   que la sobriété de Primo Levi « ne cherche pas à émouvoir ». Une écriture sobre
   peut émouvoir et avoir une visée émotionnelle. Décrire le choix de retenue et
   ses effets évite d’en déduire trop vite l’intention de l’auteur.
   **Repris le 27 octobre :** le modèle décrit maintenant la force accusatrice des
   faits et l'émotion que la retenue peut produire ; il ne prétend plus connaître
   une intention de ne pas émouvoir.
4. **Garder distincts modèles et consignes.** Les fiches internes parlent de
   « dissertation plus brève et plus libre ». La sortie élève doit insister sur
   la réponse argumentée et sa liberté, pas sur la reproduction d’une dissertation
   miniature. Les tâches publiques examinées reconnaissent déjà que les nombres
   de phrases sont des repères d’entraînement.

Les deux documents de français nouvellement fournis ne doivent donc pas imposer
à HLP le 3 × 3, une troisième partie consacrée à l’écriture ou une conclusion
en quatre fonctions obligatoires. Ce serait changer d’exercice.

La conformité aux versions actuelles des notes de service reste à confirmer par
reconsultation. L’appréciation ci-dessus porte sur les modèles et sur les attendus
reproduits dans les documents locaux et les références fournies.

## 5. Contrôles exécutés

| Contrôle | Résultat et portée |
| --- | --- |
| `node scripts/check-copies20.js` | 20 comparaisons cohérentes, empreintes et dossiers concordants ; pas une note de philosophie |
| `node scripts/test-copies20.js` | Intégrité des rendus et cohérence des données passées |
| `python3 -B scripts/hlp-corriges/verifier.py voltaire diderot heredia weil barbusse rousseau` | 12 modèles récents : citations retrouvées dans le corpus local utilisé par ce contrôle ; ne remplace pas l’examen du contexte |
| Lecture navigateur des 6 dissertations supplémentaires | 2 modes, 13 paragraphes en lecture continue ; passage théorique de la machine visible dans la copie entière |
| Contrôles HLP et explication exécutés à l’issue du chantier de navigation | 24 modèles HLP et 9 modèles d’explication : intégrité, navigation, brouillons et affichage vérifiés ; aucun jugement automatique d’excellence |

Aucun texte de copie n’a été réécrit pendant l’audit. Seules l’autorisation
des sujets originaux et les références de travail ont été consignées.

## 6. Ordre d’action proposé

1. Reprendre le passage interne de la copie sur la machine et la distinction
   film / fait historique dans la scène de Sully.
2. Raccorder le dossier Pot-Bouille depuis les entrées de dissertation et la
   bibliothèque, et harmoniser sa consigne ancienne.
3. Vérifier les sources officielles et critiques ; sélectionner un premier sujet
   à citation critique pour chacun des trois nouveaux romans, puis construire les
   preuves dans une édition réellement consultée.
4. Compléter les dossiers des œuvres d’idées sans copier le protocole de philosophie.
5. Consolider les quelques passages de philosophie signalés, situer les corrigés
   très condensés, varier les annonces HLP et nuancer la phrase sur Primo Levi.
6. Rétablir les citations manquantes des notices de sujets, en conservant leur
   provenance et leur statut exacts.

## 7. Accès documentaire à activer

Les domaines nécessaires ont été enregistrés dans le brouillon de configuration :
ministère, Éduscol, inspections citées, Persée, Gallica, OpenEdition et Fabula.
L’enregistrement est confirmé ; il ne modifie pas le réseau de la machine courante.
Les réglages doivent être enregistrés et l’environnement publié dans les paramètres
pour activer la configuration selon le flux de l’interface, puis les accès devront
être retestés. Il s’agit de l’environnement de travail, pas d’une publication du site.

Tant que les sources restent inaccessibles, aucune nouvelle citation de critique
ne doit être présentée comme vérifiée. Le dossier de préparation est prêt à guider
la recherche ; les nouveaux sujets à citation critique ne sont pas encore validés
ni publiés.
