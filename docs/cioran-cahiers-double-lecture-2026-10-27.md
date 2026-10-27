# Cahiers de Cioran : dix-huit citations, deux lectures

Demande du propriétaire : prolonger les premières boutades par des pensées de fond,
les relier aux notions du bac et aux parcours de français, et garder la présentation
des fiches existantes. Cette sélection n’est pas une extraction exhaustive du livre.

## Sélection et source

Les quatre notes initiales sont conservées ; quatorze autres complètent la sélection :
neuf notes humoristiques et neuf notes de fond au total. Les dix-huit paragraphes
représentent 489 mots au décompte par espaces. Ils ont chacun été retrouvés dans
l’EPUB fourni, puis contrôlés indépendamment, caractères et ponctuation compris
après harmonisation des seuls blancs. L’édition numérique est celle de Gallimard,
2013, *Cahiers 1957–1972* ; empreinte du fichier source :
`494d206a7f7848040eea094aa1065b8b1181c218631dd7390c1b3c2b4be50ba9`.
La référence donne l’année du cahier et le début de la note, sans page imprimée
inventée. Le livre et son extraction intégrale restent hors du dépôt.

Les notes touchent douze notions de philosophie. Les comparaisons de français
portent sur sept parcours : Ponge, Musset, Rimbaud, Zola, La Boétie, Fontenelle
et Dorion. Les neuf premières fiches comparent la citation à un sujet d’annales
déjà documenté ; les neuf suivantes proposent des rapprochements avec le programme,
sans fabriquer de question officielle. Une comparaison intervient après une preuve
tirée de l’œuvre étudiée et précise sa propre limite.

## Présentation et sources de production

Une même citation, conservée dans `scripts/philo-banque-data.json`, nourrit les deux
lectures. En philosophie, elle garde les deux rubriques Dissertation / Commentaire
et les six fonctions habituelles. En lettres, elle garde les deux rubriques et les
quatre fonctions : réalisation, éléments textuels, construction, effet ici. Les
fonctions se masquent sans changer le texte. Chaque fiche mène à l’autre lecture.
Le lien philosophique ouvre directement la fiche choisie.

Le supplément littéraire est `scripts/cioran-cahiers-lettres.json` ; le chargeur
`scripts/load-lettres-library.cjs` le rapproche de la citation philosophique canonique.
Les anciens 27 extraits littéraires et les 18 exercices restent dans leur source
existante. Le statut « Lectures complémentaires » évite de faire passer Cioran pour
une œuvre du programme. Le filtre indique le statut de l’œuvre citée.

Régénération :

```
node scripts/build-philo-banque.js
node scripts/build-lettres-library.cjs
```

La banque compte désormais 264 fiches philosophiques, 503 emplois et 302 sujets.
La bibliothèque de lettres compte 45 citations sur dix œuvres, douze sujets
historiques officiels, 54 emplois dans ces annales et neuf rapprochements de programme.

## Relecture et contrôles

Une relecture indépendante a confirmé les dix-huit citations et demandé sept
reprises locales. Les réparations conservent les maximes dans leur portée exacte
avant de les discuter : toute vanité, la condition nécessaire des interprétations,
toute vérité qui devient chaîne. Les analyses littéraires expliquent un effet
précis ; elles corrigent notamment le rôle de « livre » dans la note sur Constantinople
et distinguent les rapports temps/éternité, Histoire/temps et vie/matière.
L’audit initial et le réaudit conservent les segments avant/après.

Le build complet passe, ainsi que les contrôles globaux, philosophiques et SEO.
Le parcours de bibliothèque a été fait à 390 et 1280 pixels : 45 fiches, filtres,
annotations, 18 allers-retours réels entre lettres et philosophie, absence de
nouvelle erreur JavaScript ou de débordement, et accès sans JavaScript.
La banque philosophique a été parcourue sur les 264 fiches aux deux largeurs.
Les derniers remplacements de texte et l’arrivée directe sont contrôlés séparément
sur une nouvelle copie stable après régénération.

Le contrôle lettres complet a aussi signalé deux anciennes valeurs `data-quote`
non couvertes par ses attestations (« VOULOIR nous brûle… » et « Fay ce que vouldras »)
dans les modèles Balzac et Rabelais. Pages et attestations sont identiques à `main`
`0ec0e3b` : cette anomalie préexistante est conservée dans le suivi, sans ajouter de
fausse preuve ni assouplir la vérification des citations. Les 18 exercices antérieurs
ne sont pas modifiés par ce lot ; le contrôle de bibliothèque seul ne prétend pas
les avoir rejoués.

Les deux dépassements de budget de la banque philosophique, HTML et JavaScript,
préexistent à ce lot et augmentent avec son contenu ; ils restent à traiter.
La vérification directe du déploiement Netlify reste empêchée par la politique
réseau effective de l’environnement.

Le [réaudit indépendant final](audits/cioran-cahiers-validation-2026-10-27.md)
conclut à zéro blocage pédagogique restant sur les dix-huit fiches. La concordance
est conservée dans `scripts/audits/cioran-cahiers-concordance-2026-10-27.json`.
La vérification finale confirme l’arrivée à environ 25 pixels du haut de l’écran
en philosophie aux deux largeurs, les 18 textes et leurs fonctions rendus dans
chaque banque, puis le parcours complet des 264 fiches. Le build de livraison et
les deux contrôles navigateur finaux terminent avec un code de sortie nul.
