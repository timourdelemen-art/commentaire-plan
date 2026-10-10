# AGENTS.md — règles communes pour Claude et ChatGPT sur Commentaire Plan

Ce fichier est la référence commune des agents qui modifient le site. **Lisez-le en entier avant toute modification.** En cas de conflit entre ce fichier et une consigne ancienne d’un autre document, ce fichier l’emporte ; en cas de conflit avec une demande explicite du propriétaire, la demande du propriétaire l’emporte, et ce fichier est mis à jour.

Propriétaire : un professeur de lettres en lycée (Istanbul). Public : lycéens (bac de français, philosophie, HLP), collégiens (brevet), parents, enseignants. But : un site sérieux qui rapporte de l’argent sans rien céder sur la didactique.

---

## 1. Coordination entre agents

1. **Avant de commencer** : `git pull`, puis regardez les PR ouvertes (`gh pr list`), leur rubrique « Fichiers réservés », et le tableau « Chantiers durables » ci-dessous. Ne modifiez pas un fichier qu’un autre agent a déclaré, ni un fichier touché par une PR encore ouverte.
2. **Déclarez votre travail dans la description de la PR** : rubrique « Fichiers réservés » (fichiers ou motifs de fichiers). Tant que la PR est ouverte, ces fichiers sont réservés. Le tableau « Chantiers durables » ci-dessous ne sert qu’aux chantiers qui s’étendent sur plusieurs PR ou plusieurs jours, pour éviter de modifier ce fichier commun à chaque PR.
3. **Une PR = un sujet.** Branches : `claude/<sujet>` ou `chatgpt/<sujet>`. Pas de commit direct sur `main`.
4. **Fichiers partagés à haut risque** (un seul agent à la fois, et prévenir) : `styles.css`, `site-nav.js`, `scripts/seo-build.js`, `netlify.toml`, `worker/src/index.js`, `free-response.js`. Dans `styles.css`, ajoutez vos règles **à la fin**, dans un bloc commenté `/* === sujet === */`, sans réécrire les blocs existants.
5. **Ne défaites pas le travail de l’autre agent sans le dire.** Si une modification de l’autre agent enfreint une règle de ce fichier, corrigez-la dans une PR séparée qui cite la règle, et signalez-le au propriétaire.
6. **Avant de fusionner**, refaites `git pull` : si `main` a bougé, refaites le build de test sur la version à jour.
7. **Une PR dont les tests requis ne sont pas réalisés ne peut pas être fusionnée.** Les tests requis sont ceux du § 5 (build, contrôles, navigateur à 390 et 1280 px, vérification pédagogique). Une PR qui indique « tests non réalisés » reste ouverte jusqu’à ce qu’ils soient faits, par son auteur ou par l’autre agent.

### Chantiers durables

| Agent | Branche | Fichiers | Depuis |
| --- | --- | --- | --- |
| — | — | — | — |

---

## 2. Règles didactiques (non négociables)

- **Simplifier l’accès à la pensée, sans simplifier la pensée elle-même.**
- **Vocabulaire de la méthode, autorisé s’il aide l’élève** : « réalisation », « nécessité de la réponse », « opération » (voir § 7). **Pour trouver le problème, une seule formule élève** (décision du 10 octobre 2026) : commentaire « On pouvait attendre X. Pourtant, le texte produit Y. Comment comprendre que… ? » ; dissertation de français « On pourrait penser X. Pourtant, l’œuvre montre Y. Comment comprendre que… ? » ; brevet « Je m’attendais à… Pourtant, le texte… Pourquoi ? ». « Le donné », « l’attente » et « la transformation » ne sont plus des termes de méthode sur les pages élèves (documents internes seulement) ; « transformer » garde son sens ordinaire et son sens officiel en réécriture. Chaque terme est expliqué simplement, avec un exemple, à sa première apparition sur une page (ex. : « la réalisation, c’est ce que le texte fait : *le poète oppose la ville et la campagne* »). « Transition-question » s’introduit progressivement : d’abord la chose (« une question qui montre ce que la partie précédente n’a pas expliqué »), puis le mot.
- **Vocabulaire réservé aux documents internes** : « chiasme », « double aporie », « aporie », « reprobématisation », « condensation », « noyau spécifique », le *Dictionnaire paradoxal*, ses « figures » et ses « résolutions » comme termes techniques. Ils n’apparaissent jamais sur une page élève, ni dans les consignes envoyées au correcteur automatique (`data-feedback-instruction`, critères de `free-response.js` et du worker). Les fichiers `*.md` de théorie ne sont jamais publiés (voir `scripts/clean-publish.js`).
- **Consignes : six règles.** 1) verbe concret ; 2) quantité attendue (« en une phrase ») ; 3) un exemple sur un autre sujet quand c’est utile ; 4) aucun jargon ; 5) une seule tâche par ligne ; 6) phrases courtes, au « vous ».
- **Vouvoiement partout**, y compris dans les retours automatiques.
- **Uniquement de vrais sujets d’examen.** Corpus de référence : sujets du bac de philosophie 1996-2026 (branche `corpus`), annales officielles.
- **Correction en trois états** pour les choix : Solide / Défendable / À revoir, toujours avec une phrase de justification. Plusieurs propositions peuvent être justes (troisième partie). **La bonne réponse ne doit pas être reconnaissable à sa longueur** : visez des propositions de longueurs comparables, sans formulations artificielles pour égaliser ; sur une série, la bonne réponse n’est pas systématiquement la plus longue.
- **Boussole** en tête d’exercice : « D’où vous partez / Ce que vous faites / Ce que vous obtenez ».
- **Désétayage en trois niveaux** quand une chaîne existe : Niveau 1 au clic, Niveau 2 j’écris un peu, Niveau 3 j’écris tout ; navigation libre (recommencer, suivant, niveau précédent, niveau suivant). Modèles : `philosophie-probleme-pas-a-pas.html`, `philosophie-plan-pas-a-pas.html`, `commentaire-pas-a-pas.html`.
- **La scène d’ouverture d’une dissertation porte les deux réponses et leur double échec**, pas une seule branche.
- **Pas d’usine à gaz** : peu de texte avant d’agir ; « d’où je viens, où je vais » toujours visible.
- **La première réponse à un sujet** peut être oui, non (nuancé par les petits mots du sujet) ou « la question est mal posée » ; dans ce dernier cas, l’idée sert à la troisième partie.

## 3. Règles de contenu et de droit

- **Jamais de témoignage, de chiffre, de prix ou de donnée inventés.** Comptez réellement dans le dépôt ce que vous annoncez.
- **Prix** : aucun prix n’est affiché tant que le propriétaire ne l’a pas décidé. Tant que la vente n’est pas ouverte, `access-control.js` garde `salesOpen:false` (tout est accessible).
- **Droit d’auteur** : ne recopiez jamais le texte d’un auteur encore protégé (ni une traduction récente) : référence + lien vers le sujet officiel. Ne reconstituez jamais un texte d’examen de mémoire, même du domaine public.
- **Citations** : une citation affichée comme « vérifiée » doit avoir été retrouvée mot pour mot dans une édition numérique (voir `scripts/exemples/README.md`). Les citations célèbres circulent souvent sous une forme fausse.
- **Secrets** : jamais de clé ni de secret dans le dépôt (il est public). Les clés vivent dans les secrets GitHub ou Cloudflare.
- **Liens** : pas de lien vers un site concurrent (ex. sujets-corriges-bac.fr). Les sujets officiels sont pris sur les sites du ministère, d’Éduscol ou d’une académie, ou hébergés localement.

## 4. Architecture : modifier la source, pas le résultat

Plusieurs pages sont **générées** au déploiement (commande de `netlify.toml`). Modifier la page générée ne sert à rien : la modification sera écrasée.

| Pages | Source à modifier | Générateur |
| --- | --- | --- |
| `hlp-20*-*.html`, `hlp-annales.html`, `hlp-professeurs.html` | `hlp-annales-data.js` | `scripts/build-hlp.js` |
| `philosophie-bac-2026-*.html` | `philosophie-annales-data.js` | `scripts/build-philo-annales.js` |
| `philosophie-notion-*.html`, `philosophie-notions.html` | `philosophie-notions-data.js` | `scripts/build-philo-notions.js` |
| Copies à 20 (dans les pages ci-dessus et `philosophie-copie-20-*.html`) | `scripts/copies20-data.json` | `scripts/philo-copie20.js` |
| `philosophie-laboratoire.html` et boussoles des exercices philo | `scripts/philo-exercices.js` | `scripts/build-philo-boussole.js` |
| Bloc « Ce sujet, étape par étape » des annales du bac (`bac-20*-general-*.html`) | `annales/catalogue-annales.js` | `scripts/build-bac-annales.js` |
| Formulaire « nouveautés » en bas des pages | règles dans le script | `scripts/build-capture.js` |
| En-têtes, pieds de page, fil d’Ariane, `sitemap.xml` | `scripts/seo-build.js` | `scripts/seo-build.js` |
| Banque d’exemples `philosophie-exemples-data.js` | `scripts/exemples/exemples_src.py` | `scripts/exemples/build_exemples.py` (vérifie les citations) |

- **Le menu existe en deux endroits** : `site-nav.js` (navigateur) et `scripts/seo-build.js` (en-tête statique). Modifiez toujours les deux.
- **Le correcteur automatique** est un worker Cloudflare (`worker/`), déployé automatiquement à chaque push sur `main` ; le test `scripts/test-live-feedback.mjs` doit rester vert (action « Test du retour déployé »).
- `scripts/clean-publish.js` retire du site publié les `*.md`, `scripts/` et `worker/` (sur Netlify seulement).

## 5. Méthode de travail et tests

1. Build de test dans une **copie jetable** (le build réécrit des fichiers) :
   `B=$(mktemp -d); git ls-files -co --exclude-standard | tar -cf - -T - | tar -xf - -C $B; (cd $B && eval "$(sed -n 's/^ *command = "\(.*\)"/\1/p' netlify.toml)")`
2. Servez la copie (`python3 -m http.server`) et testez dans un navigateur à **390 px et 1280 px** : aucune erreur JavaScript, pas de défilement horizontal, chaque clic mène au bon endroit, parcours complet des exercices modifiés.
3. Vérifiez que `seo-audit` ne signale **aucune nouvelle erreur** et que les contrôles `check-philo-parcours` et `check-global-pages` passent.
4. **Vérification pédagogique** de chaque exercice ajouté ou modifié, en le faisant soi-même comme un élève :
   - **le geste** : quel geste intellectuel l’élève accomplit-il réellement (répondre, justifier, pousser une idée, comparer, formuler) ? Est-ce bien celui que la page annonce, et pas une simple reconnaissance ?
   - **les aides** : chaque aide fait-elle avancer sans donner la réponse ? Les justifications des propositions expliquent-elles pourquoi, en une phrase ?
   - **l’autonomie** : l’élève peut-il recommencer, passer au niveau suivant, et refaire le geste seul sur un autre sujet ? Le chemin vers l’étape suivante est-il visible ?
5. Après fusion : vérifiez que le déploiement Netlify est « ready » sur le bon commit, et, si le worker a changé, que l’action « Test du retour déployé » est verte.

### Contenu obligatoire de chaque PR

```
## Fichiers réservés
- (fichiers ou motifs de fichiers que cette PR modifie : personne d’autre n’y touche tant qu’elle est ouverte)

## Modifications
- (fichiers et ce qui change, en phrases simples)

## Tests réalisés
- build de test : …
- navigateur 390 px / 1280 px : pages et parcours testés …
- vérification pédagogique : geste réellement accompli, qualité des aides, reprise autonome
- autres vérifications (citations, liens, worker…)

## Points à vérifier
- (ce qui n’a pas pu être testé, décisions laissées au propriétaire, risques)

## Leçon apprise
- (si une erreur importante a été corrigée : la ligne proposée pour le § 6, sinon « aucune »)
```

## 6. Leçons apprises (à compléter après chaque erreur importante)

Format : date · ce qui s’est passé · la règle qui en découle. Proposez une ligne dans votre PR quand une erreur nous apprend quelque chose.

- 2026-10-08 · Des fichiers de théorie `.md` étaient accessibles en ligne. · Ne jamais publier de `.md` ; `clean-publish.js` les retire.
- 2026-10-09 · Des libellés de théorie (« reprobématisation ») corrigés dans les pages HTML sont revenus au déploiement, car ils venaient de `copies20-data.json`. · Toujours corriger la **source** (tableau du § 4), jamais la page générée.
- 2026-10-09 · Le mot « chiasme » figurait dans une consigne envoyée au correcteur automatique. · Les consignes cachées obéissent aux mêmes règles que le texte visible.
- 2026-10-09 · Une page élève ajoutée parlait de « double aporie » et de « résolutions ». · Relire tout ajout au regard du § 2 avant la PR.
- 2026-10-09 · La scène d’Ulysse n’illustrait qu’une des deux réponses du sujet ; remplacée par Antigone. · Une scène d’ouverture porte les deux réponses et leur double échec.
- 2026-10-09 · Une phrase célèbre de Proust n’existe pas sous sa forme courante dans l’édition consultée. · Aucune citation de mémoire : vérification sur corpus, ou pas de citation.
- 2026-10-09 · Des étapes payantes bloquaient alors qu’aucun paiement n’existait, et « 29 € » était affiché avant décision. · Ne jamais bloquer ce qu’on ne peut pas acheter ; pas de prix sans décision du propriétaire.
- 2026-10-09 · Une réponse hors sujet suspendait l’exercice 24 heures. · Pas de punition : un message qui aide à reprendre.
- 2026-10-09 · Les retours automatiques tutoyaient l’élève alors que le site vouvoie. · Vouvoiement partout, y compris dans le worker.
- 2026-10-09 · Dans plusieurs QCM, la bonne réponse était toujours la plus longue. · Longueurs comparables (§ 2).
- 2026-10-09 · Deux agents ont travaillé en même temps sur `main` sans se voir (PR #65 à #70). · Vérifier les PR ouvertes et leurs « Fichiers réservés » avant de commencer (§ 1).
- 2026-10-09 · Cinq PR (n° 73 à 79) ont été fusionnées en indiquant « tests non réalisés » ; le diagnostic mis en ligne donnait la bonne réponse comme la plus longue dans tous les nouveaux sujets, et un sujet n’était pas un vrai sujet du bac. · Pas de fusion sans tests (§ 1, règle 7) ; la vérification pédagogique aurait détecté les deux défauts.
- 2026-10-09 · Des termes propres à la méthode (« le donné », « transition-question ») ont été retirés des consignes parce qu’un audit les jugeait techniques. · Ne pas supprimer le vocabulaire de la méthode : l’expliquer, avec un exemple, à sa première apparition (§ 2).
- 2026-10-09 · Une copie à 20 ouvrait sur La Zone d’intérêt, que la banque d’exemples classait elle-même « pour une partie » (une seule réponse) ; une autre citait une réplique de film doublé jamais vérifiée. · Avant de garder une scène d’ouverture, vérifier qu’elle est classée « peut ouvrir ce sujet » dans la banque ; une réplique non vérifiée se paraphrase, sans guillemets.
- 2026-10-10 · Après le passage aux transitions-questions, le libellé « III.1 Ce qui reste » subsistait dans 17 pages générées, car les corrigés (`philosophie-annales-data.js`, `philosophie-notions-data.js`) reprennent la théorie à côté des copies à 20. · Après un changement de théorie, chercher l’ancienne formule dans le build entier, pas seulement dans les sources modifiées.
- 2026-10-10 · Un exemple de « Pourquoi cet ordre ? » reprenait la formule de la transition (« ce que la partie I ne suffisait pas à expliquer »). · Les exemples de nécessité ne reprennent jamais la formule de la transition.
- 2026-10-10 · Écrite d’un seul jet, la bonne réponse d’un QCM était la plus longue dans 83 à 100 % des étapes. · Mesurer les longueurs par script après rédaction ; allonger un distracteur par une erreur plausible plutôt qu’appauvrir la bonne réponse.
- 2026-10-10 · Une justification citait une position (« la deuxième… ») et devenait fausse dès qu’on déplaçait les réponses. · Désigner la bonne réponse par son contenu, jamais par sa position.
- 2026-10-10 · Un PDF publié en morceaux base64 sur raw.githubusercontent était tronqué, et la page promettait un dossier complet. · Ne jamais lier un fichier sans l’avoir téléchargé et ouvert ; aucune promesse de contenu qui n’existe pas.
- 2026-10-10 · Une consigne de rédaction du brevet contenant « transitions » était classée par le correcteur comme une transition de commentaire. · Toujours passer le type de retour (`kind`) explicitement.
- 2026-10-10 · Le bouton « Dicter », ajouté à toutes les zones d’écriture, faisait doublon dans le simulateur d’oral. · Avant d’ajouter un outil partout, chercher les pages qui ont déjà le leur.

## 7. Décisions du propriétaire

Prises (9 octobre 2026) :
- **Vocabulaire** : voir § 2 (termes de la méthode expliqués à leur première apparition ; termes de la théorie réservés aux documents internes).
- **QCM** : longueurs comparables, sans seuil chiffré strict.
- **Notions de philosophie** : les 17 notions restent accessibles par une entrée secondaire clairement visible sur `philosophie.html` (pas seulement dans un menu replié).
- **Textes manquants des annales** : un texte n’est intégré qu’après vérification de la source officielle (découpage exact de l’extrait, numéros de ligne) et des droits.
- **Copies à 20** : chaque correction de scène d’ouverture est examinée individuellement par le propriétaire avant validation. Le 9 octobre, le propriétaire a délégué cet examen pour les quatre copies en attente (religion, science, bonheur, technique) : voir la PR correspondante.
- **« Opération »** : conservé, avec une explication simple à sa première apparition : « une opération intellectuelle, c’est quelque chose que vous faites avec une idée : la distinguer, la comparer, la mettre à l’épreuve ou la transformer ». Le terme sert l’autonomie de l’élève.
- **Signature du site** (10 octobre 2026) : « La copie la plus courte qui mérite 20. » est conservée sur l’accueil et la page Philosophie. Elle décrit le modèle visé, pas une note garantie ; ne pas la remplacer sans demande du propriétaire.
- **Plan de dissertation philosophique et transitions** (10 octobre 2026) : référence unique dans `PHILOSOPHIE-THEORIE-PLAN.md`. Trois sous-parties par partie (I.1 Installer, I.2 Renforcer, I.3 Limite ; II.1 Nouvelle exigence, II.2 Nouvelle réponse, II.3 Sa limite ; III.1 Revenir au problème, III.2 L’opération, III.3 Stabiliser la réponse). Les transitions sont **des questions ouvertes, placées entre les parties** : la partie suivante y répond en reprenant leur mot clé (question directe en règle, indirecte tolérée, jamais d’affirmation ; pas de « … suffit-il ? »). Cette règle d’élégance vaut aussi pour le français (`THEORIE-PLAN-DISSERTATION.md`). « Le reste » n’a qu’un sens : ce que la réponse de III.3 ne règle pas ; la conclusion le transforme en question.
- **Introduction, partie III et grille de contrôle** (10 octobre 2026, protocole « théorie des résolutions ») : l’introduction part d’une scène qui porte **les deux exigences et leur contradiction**, puis analyse courte, généralisation, problématique, annonce. Côté élève, la partie III propose **trois opérations** : renverser le rapport, changer de niveau, réunir ce qu’on avait séparé ; les sept formes déjà présentes (distinguer deux plans, introduire un processus…) restent comme exemples dans chaque famille. Les transitions restent propres au sujet : les formules générales du protocole ne sont qu’un patron interne. Grille de contrôle des copies et corrigés : `PHILOSOPHIE-THEORIE-PLAN.md`.

- **Dictée** (10 octobre 2026) : un bouton « Dicter » sous chaque zone d’écriture (`dictee.js`, chargé par `site-nav.js` seulement si le navigateur sait transcrire la voix). Jamais en mode examen ni dans le simulateur d’oral (son propre micro) ; une zone peut l’exclure avec `data-sans-dictee`. Mention discrète dans `confidentialite.html` (la voix est transcrite par le service du navigateur ; le site ne reçoit que le texte).

- **Problématique développée et condensée** (10 octobre 2026) : la mise en tension des deux réponses (philosophie) ou le « pourtant » (français) est la **forme développée** du problème ; la problématique est sa **forme condensée** : une seule question, la plus courte qui garde tout le problème. Ce n’est pas un niveau supérieur mais la même pensée, écrite avec économie ; dans une copie, l’introduction développe et la problématique condense. Trois tests : on reconnaît le sujet (remplacer son mot central casse la question) ; on retrouve dans la question les deux réponses et ce que chacune perd (ou X et Y) ; elle ne contient pas la solution (« concilier » est interdit). Exercices : niveau 1, choisir la bonne condensation parmi des erreurs typiques (garde l’opposition mais perd le rapport ; monte trop haut ; résout trop tôt ; perd une des deux réponses) ; niveau 2, condenser sa propre forme longue ; le « noyau » et la typologie du *Dictionnaire paradoxal* restent internes. Mots élève : « Dites le problème en une seule question, sans perdre l’une des deux réponses. »
- **Commentaire : plan** (10 octobre 2026) : une grande partie s’appelle « réponse » (plus « solution ») ; elle donne sa réponse à la problématique, la construit par deux ou trois réalisations analysées (nombre libre), puis fait apparaître ce qu’elle n’explique pas encore, d’où la transition-question entre les parties (règle d’élégance de `PHILOSOPHIE-THEORIE-PLAN.md`).
- **Dissertation de français : plan sur mesure** (10 octobre 2026) : pas de plan type ni de rôle fixe pour les extraits. Le plan naît de la problématique : la première partie donne au sujet sa part de vérité, ce qu’elle n’explique pas devient la transition-question, la partie suivante y répond ; deux ou trois parties selon le sujet. Les extraits sont choisis ensuite, pour répondre à la question de chaque partie. Le sujet commande. Seuls de vrais sujets officiels servent d’exercices (libellé vérifié sur la source officielle).

En attente :
- Identité de l’éditeur (mentions légales, CGV, confidentialité) et moyen de paiement, avant toute vente ; pages légales à faire relire par un juriste.
