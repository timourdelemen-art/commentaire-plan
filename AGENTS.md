# AGENTS.md — règles communes pour Claude et ChatGPT sur Commentaire Plan

Ce fichier est la référence commune des agents qui modifient le site. **Lisez-le en entier avant toute modification.** En cas de conflit entre ce fichier et une consigne ancienne d’un autre document, ce fichier l’emporte ; en cas de conflit avec une demande explicite du propriétaire, la demande du propriétaire l’emporte, et ce fichier est mis à jour.

Propriétaire : un professeur de lettres en lycée (Istanbul). Public : lycéens (bac de français, philosophie, HLP), collégiens (brevet), parents, enseignants. But : un site sérieux qui rapporte de l’argent sans rien céder sur la didactique.

---

## 1. Coordination entre agents

1. **Avant de commencer** : `git pull`, puis regardez les PR ouvertes (`gh pr list`) et la section « Travaux en cours » ci-dessous. Ne modifiez pas un fichier qu’un autre agent a déclaré, ni un fichier touché par une PR encore ouverte.
2. **Déclarez votre travail** : ajoutez une ligne dans « Travaux en cours » (agent, branche, fichiers ou motifs de fichiers, date) dans votre première PR, ou dites-le au propriétaire s’il coordonne lui-même.
3. **Une PR = un sujet.** Branches : `claude/<sujet>` ou `chatgpt/<sujet>`. Pas de commit direct sur `main`.
4. **Fichiers partagés à haut risque** (un seul agent à la fois, et prévenir) : `styles.css`, `site-nav.js`, `scripts/seo-build.js`, `netlify.toml`, `worker/src/index.js`, `free-response.js`. Dans `styles.css`, ajoutez vos règles **à la fin**, dans un bloc commenté `/* === sujet === */`, sans réécrire les blocs existants.
5. **Ne défaites pas le travail de l’autre agent sans le dire.** Si une modification de l’autre agent enfreint une règle de ce fichier, corrigez-la dans une PR séparée qui cite la règle, et signalez-le au propriétaire.
6. **Avant de fusionner**, refaites `git pull` : si `main` a bougé, refaites le build de test sur la version à jour.

### Travaux en cours

| Agent | Branche | Fichiers | Depuis |
| --- | --- | --- | --- |
| — | — | — | — |

---

## 2. Règles didactiques (non négociables)

- **La théorie reste cachée.** Le chiasme, le *Dictionnaire paradoxal*, les « figures », les « résolutions », « aporie », « double aporie », « reprobématisation », « opération » au sens technique n’apparaissent jamais sur une page élève, ni dans les consignes envoyées au correcteur automatique (`data-feedback-instruction`, critères de `free-response.js` et du worker). Les fichiers `*.md` de théorie ne sont jamais publiés (voir `scripts/clean-publish.js`).
- **Consignes : six règles.** 1) verbe concret ; 2) quantité attendue (« en une phrase ») ; 3) un exemple sur un autre sujet quand c’est utile ; 4) aucun jargon ; 5) une seule tâche par ligne ; 6) phrases courtes, au « vous ».
- **Vouvoiement partout**, y compris dans les retours automatiques.
- **Uniquement de vrais sujets d’examen.** Corpus de référence : sujets du bac de philosophie 1996-2026 (branche `corpus`), annales officielles.
- **Correction en trois états** pour les choix : Solide / Défendable / À revoir, toujours avec une phrase de justification. Plusieurs propositions peuvent être justes (troisième partie). **La bonne réponse ne doit pas être reconnaissable à sa longueur** (écart de longueur < 20 %).
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
4. Après fusion : vérifiez que le déploiement Netlify est « ready » sur le bon commit, et, si le worker a changé, que l’action « Test du retour déployé » est verte.

### Contenu obligatoire de chaque PR

```
## Modifications
- (fichiers et ce qui change, en phrases simples)

## Tests réalisés
- build de test : …
- navigateur 390 px / 1280 px : pages et parcours testés …
- autres vérifications (citations, liens, worker…)

## Points à vérifier
- (ce qui n’a pas pu être testé, décisions laissées au propriétaire, risques)
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
- 2026-10-09 · Deux agents ont travaillé en même temps sur `main` sans se voir (PR #65 à #70). · Section « Travaux en cours » et vérification des PR ouvertes avant de commencer (§ 1).

## 7. Décisions en attente du propriétaire

- Identité de l’éditeur (mentions légales, CGV, confidentialité) et moyen de paiement, avant toute vente ; pages légales à faire relire par un juriste.
- Vocabulaire de la méthode sur les pages élèves : « le donné », « l’attente », « la transformation », « réalisation », « nécessité de la réponse », « transition-question », « opération ». À garder (avec une explication la première fois) ou à remplacer dans les consignes ?
- Entrée par les 17 notions sur `philosophie.html` : en évidence ou dans le menu replié ?
- Textes du domaine public manquant dans 11 annales (bac et brevet) : à fournir en PDF officiel pour être intégrés avec leurs vraies lignes.
- Scènes d’ouverture de 4 copies à 20 à corriger (religion, science, bonheur, technique) : propositions faites, accord attendu.
