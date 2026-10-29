**MISE À JOUR DU 28 OCTOBRE : document d'inventaire conservé comme historique. Les 26 copies ont désormais toutes reçu une réécriture textuelle sur la branche, y compris les 19 notées ici comme non réécrites. Consulter le bilan à jour `docs/audits/corpus26-bilan-apres-refonte-2026-10-28.md`. Les apories et les citations ne sont pas encore validées indépendamment.**

# Corpus de 26 dissertations — inventaire vérifié et chantier V7.3

**28 octobre 2026 — branche de travail, non publiée.** Ce rapport corrige le faux total de 20 devoirs. La page `philosophie-dissertations.html` comporte **26 cartes** : **20 copies du fichier `scripts/copies20-data.json`**, **5 dissertations autonomes des sessions 2023–2025**, et **1 dissertation autonome sur la pensée des machines**. Le total est celui des **corrigés distincts**, non des pages, variantes, fiches de notions ou exercices qui les reprennent.

## Périmètre

| Source des dissertations | Nombre de devoirs distincts | État dans la branche |
| --- | ---: | --- |
| `scripts/copies20-data.json` ; les pages sont générées par `scripts/philo-copie20.js` | 20 | Un devoir (« La science doit-elle être utile ? ») substantiellement réécrit ; les 19 autres ont reçu un premier audit contradictoire, **pas une refonte rédigée** |
| `philosophie-dissertation-2024-an-rien-dure.html` | 1 | Développement réécrit, 9 opérations, processualisation candidate |
| `philosophie-dissertation-2024-an-parler-sans-savoir.html` | 1 | Développement réécrit, 9 opérations, déplacement vers les actes de parole candidat |
| `philosophie-dissertation-2025-g1-douter-raison.html` | 1 | Développement réécrit, 9 opérations, suspension épistémique candidate |
| `philosophie-dissertation-2025-g1-art-voir.html` | 1 | Développement réécrit, 9 opérations, métamorphose du regard candidate |
| `philosophie-dissertation-2023-me-paix-justice.html` | 1 | Développement réécrit, 9 opérations, déplacement/institutionnalisation candidate |
| `philosophie-dissertation-machine-peut-elle-penser.html` | 1 | III approfondie, suspension épistémique et examen des normes de justification chez Wittgenstein et Sellars |

**Total : 26 corrigés distincts.** L'ancienne appellation « corpus20 » reste exacte pour un sous-système de génération, pas pour tout le site. Les sujets et les URL supplémentaires ne sont pas à confondre avec des titres alternatifs.

## Protocole applicable

- **V7.3 (25 octobre 2026)** : la hiérarchie sujet > racine > aporie > parties > scène > style est déterminante. Ne pas faire d'une citation, d'une belle III ni d'une scène une justification de la problématique.
- **Mini-protocole « Transformation / Calibrage 6 » v0.1** : il décrit la transformation d'une architecture **déjà validée** en copie concise, avec neuf acquis, deux transitions et une annotation phrase par phrase. Il se dit compatible avec V7.1 ; on vérifie sa compatibilité avec V7.3 et on n'applique surtout pas le repère de 31 phrases / 770 mots comme un plafond.
- **Préfaces seulement** du *Dictionnaire paradoxal de la philosophie* pour la matrice : duplication, abolition, processualisation, inversion, métamorphose, déplacement, suspension épistémique, consentement. L'article particulier d'une notion peut aider une dissertation mais ne décide pas de la matrice. Le mécanisme vient des branches, jamais du répertoire.

## Audit de premier passage — les six devoirs complémentaires

### Comment être heureux, si rien ne dure ?

**Test du gant** : l'opérateur `comment` cherche les conditions d'un bonheur dans un monde transitoire, non un jugement simpliste « rien ne vaut puisque tout passe ». La problématique reprise conserve le fait conditionnel « si rien ne dure ». **Risque persistant** : passage du bonheur d'une vie entière à la mémoire, qui pourrait ne pas suffire à préserver la continuité du sujet.

**I.1–I.3** : Aristote (vie entière), Épicure (choix des plaisirs / tranquillité), Montaigne (le passage contre le fantasme d'immobilité). **II.1–II.3** : valeur de la joie finie, Épicure (art de choisir), Aristote (insuffisance d'une collection d'instants). **III.1–III.3** : durée vécue chez Bergson → reprise et transformation par la mémoire proustienne (exemple littéraire, non preuve philosophique unique) → critère aristotélicien d'unité de l'activité heureuse.

**Matrice candidate** : processualisation. **Test à refaire** : prouver le mécanisme du passage ; un simple récit temporel ne suffit pas.

### Peut-on parler sans savoir ?

**Test du gant** : `peut-on` porte sur l'aptitude et la légitimité de certains actes de parole ; le sujet ne demande pas si l'on peut *affirmer comme vrai ce qu'on ignore*. Si la problématique ne portait que sur ce dernier cas, elle aurait changé de sujet. **Risque persistant** : la distinction assertion / interrogation peut être disponible dès l'abord et réfuter la nécessité de l'aporie au test 3.4.9.

**I** : Socrate/Platon (21e), *Théétète* (raison), *Ménon* (la recherche de l'inconnu). **II** : acte de questionner, usages du langage chez Wittgenstein, actes illocutoires chez Austin. **III** : identifier l'acte effectué (Austin) → ajuster l'assurance aux preuves disponibles (Socrate) → démontrer la responsabilité dans l'échange, au-delà de l'intention privée (Wittgenstein).

**Matrice candidate** : déplacement de l'ignorance comme déficit vers la forme du rapport à autrui. **Test à refaire** : le déplacement produit-il vraiment une transformation du présupposé ?

### Peut-on douter des pouvoirs de la raison ?

**Test du gant** : l'opérateur `peut-on` autorise un doute justifié sur la portée des pouvoirs, pas l'abolition de la raison. **Risque persistant** : le doute méthodique est déjà une réponse sérieuse, et il faut examiner si les branches sont nécessaires ou seulement deux abus évidents.

**I** : méthode et fondation chez Descartes, distinction entre nécessité logique et connaissance objective chez Kant. **II** : droit de conclure, antinomies chez Kant, critique des deux excès chez Pascal. **III** : suspendre les prétentions sans conditions de connaissance (Kant) → montrer pourquoi cette limite est elle-même œuvre de raison (Descartes) → établir l'acquis distinct de la rectification des erreurs (Bachelard).

**Matrice candidate** : suspension épistémique, avec redéploiement positif du pouvoir critique.

### L'art peut-il nous apprendre à voir le monde autrement ?

**Test du gant** : `peut-il` pose une possibilité, non l'universalité de l'effet artistique. « Apprendre à voir autrement » ne doit pas être réduit à « produire une vérité objectivement démontrée ». **Risque** : art et science n'ont pas le même statut de preuve ; le paradoxe pourrait être fabriqué en assimilant enseignement et connaissance démonstrative.

**I** : attention pratique chez Bergson, Monet, objection de la copie illusoire chez Platon. **II** : non-démonstrativité de l'œuvre, idées esthétiques chez Kant, rapport au visible chez Merleau-Ponty. **III** : modifier la perception (Merleau-Ponty) → faire reprendre au spectateur le travail de voir (Kant/Monet) → démontrer le transfert au regard hors de l'œuvre (Bergson).

**Matrice candidate** : métamorphose de la perception. **Test à refaire** : montrer ce qui reste identique à travers la transformation.

### Vouloir la paix, est-ce vouloir la justice ?

**Test du gant** : la question porte sur l'identité ou l'implication entre deux intentions ; elle ne demande pas directement « qu'est-ce qu'une paix juste ? » La nouvelle problématique remet l'opérateur exact au centre. **Risque** : la coexistence d'un désir de paix et d'une revendication de justice ne suffit pas à créer une contradiction nécessaire.

**I** : sécurité et loi chez Hobbes, objection de la paix imposée avec Kant. **II** : contestation juste, désobéissance civile selon Rawls, critique de la violence chez Arendt. **III** : déplacer le jugement de l'absence de conflit à la possibilité de discuter le juste (Rawls) → instituer un traitement des conflits (Kant) → éprouver la légitimité publique des institutions par la possibilité de les contester (Rawls).

**Matrice candidate** : déplacement de la contradiction vers la juridicité des conflits. **Test à refaire** : ce déplacement ne doit pas être une simple complémentarité déjà accessible.

### Une machine peut-elle penser ?

**Test du gant** : `peut-elle` réclame un jugement de possibilité, non la preuve que Deep Blue ou un autre système possède effectivement une expérience subjective. La pensée ne peut être définie d'avance exclusivement par nos mécanismes biologiques.

**I** : manifestations publiques de rationalité avec Turing, limite de la simple performance. **II** : expérience de pensée de Searle, genèse psychique chez Bion, limite d'une extrapolation biologique universelle. **III réécrite** : Wittgenstein §360 demande si « la machine ne peut penser » est une évidence empirique ou un interdit grammatical → Sellars §36 introduit la normativité de la justification, au-delà de la réaction programmée → enquête sur la possibilité d'un rapport aux raisons qui ne soit pas simplement projeté par l'observateur. **Matrice candidate** : suspension épistémique, non abolition du concept de pensée.

**Reste** : la reconnaissance des normes observables ne démontre pas une expérience vécue.

## Citations textuelles directement contrôlées dans cette nouvelle passe

- **Platon**, *Apologie de Socrate* 21e, trad. Victor Cousin : « je ne crois pas savoir ce que je ne sais point » — https://fr.wikisource.org/wiki/Apologie_de_Socrate_%28trad._Cousin%29/Dialogue
- **Pascal**, *Pensées*, Lafuma 183 / Sellier 214 : « Deux excès : exclure la raison, n’admettre que la raison. » — manuscrit et éditions : https://www.penseesdepascal.fr/Soumission/Soumission17-savante.php
- **Bergson**, *Le Rire*, III : « écarter les symboles pratiquement utiles » — fac-similé édité : https://fr.wikisource.org/wiki/Page%3ABergson_-_Le_Rire.djvu/168
- **Wittgenstein**, *Recherches philosophiques*, §360 : l'interrogation sur le statut de l'exclusion des machines est authentifiée dans le texte allemand original (paraphrase dans la copie, **pas** citation littérale française) — https://www.wittgensteinproject.org/w/index.php/Philosophische_Untersuchungen
- **Sellars**, *Empiricism and the Philosophy of Mind*, §36 : la notion de « logical space of reasons » est authentifiée ; usage dans la copie en paraphrase, sans guillemets — https://plato.stanford.edu/entries/sellars/

**Reste à faire pour ces six** : contrôler dans les éditions concernées toutes les autres attributions, y compris la traduction de Montaigne, Aristote, Kant, Épicure, Rawls, Arendt, Wittgenstein, Bion ; fournir les versions « copie nue » et « copie annotée » synchronisées exigées par le mini-protocole. Les cinq devoirs réécrits restent partiellement compacts. Aucune des nouvelles apories n'est certifiée selon V7.3, et il faut toujours l'audit indépendant.

## Autres livrables

- Audits des vingt copies générées : `docs/audits/corpus20-gant-operations-matrices-2026-10-28.md`.
- Registre des 180 sous-parties générées : `docs/audits/corpus20-registre-180-operations-2026-10-28.json`.
- Cas développé de la science : `docs/audits/science-utile-refonte-2026-10-28.md`.

## Étapes bloquantes avant fusion

1. Sur les 26 sujets, recherche de plusieurs architectures et choix justifié ; rejeter les apories qui ne passent pas le test de conjonction.
2. Validation indépendante des neuf démonstrations, et des trois opérations non permutables de chaque III.
3. Confrontation systématique aux textes primaires avant d'employer les guillemets ; la recherche d'une citation n'est pas un substitut à une preuve.
4. Audit de la cohérence des corrections, des versions élèves et des exercices ; vérification des 26 chemins d'accès et navigation.
5. Exécuter les scripts de build, les tests de parcours/SEO et un rendu visuel sur une copie locale, puis seulement envisager la publication.

**Verdict global : refonte réelle de six copies complémentaires et d'une copie générée sur vingt ; premier audit sur dix-neuf autres. Travail de source, validation et reconstruction des autres devoirs encore incomplets.**
