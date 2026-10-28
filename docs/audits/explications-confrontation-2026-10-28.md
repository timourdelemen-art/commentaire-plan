# Trois explications : corrections ciblées sur les supports archivés

28 octobre 2026. État de travail local : aucune modification GitHub avant examen des corrections.
L’audit de la bibliothèque vient après la révision de toutes les explications.

Le propriétaire demande de relire les modèles à partir des passages
qu’ils expliquent, selon le protocole philosophique fourni. Les corrections touchent
le corrigé du site et ses aides ; aucun texte d’auteur n’est réécrit.

## Supports consultés et portée du contrôle

Une archive pédagogique indépendante, la base de sujets de Cyril Eyssette, contient
les transcriptions des trois sujets suivants. Les sessions, auteurs, titres et textes
ont été rapprochés des modèles. Les PDF officiels restent refusés par la politique
réseau : leur ponctuation, leurs lignes et leur édition ne sont pas nouvellement
certifiées. Ce contrôle ne vaut pas validation documentaire des quatorze modèles.

- levi-strauss-2023-metropole : [transcription archivée](https://github.com/eyssette/sujets-philosophie-bac/blob/573da6b92a3b4e5f2d94f4cfc99c508775abe18c/data/explications.tsv#L1209).
- bergson-2023-centres-etrangers : [transcription archivée](https://github.com/eyssette/sujets-philosophie-bac/blob/573da6b92a3b4e5f2d94f4cfc99c508775abe18c/data/explications.tsv#L1214).
- weil-2024-metropole : [transcription archivée](https://github.com/eyssette/sujets-philosophie-bac/blob/573da6b92a3b4e5f2d94f4cfc99c508775abe18c/data/explications.tsv#L1225).

La provenance, le commit et les empreintes sont conservés dans
`scripts/audits/explications-sources-archivees-2026-10-28.json`. Aucun corpus ni
texte d’auteur intégral n’est ajouté au dépôt du site. L’extrait des Lois retrouvé
dans cette archive appartient au Japon2007 : il n’est pas présenté comme celui de
Polynésie2025. Cette limite décrivait l’état du premier contrôle.
Le propriétaire a ensuite fourni le PDF2025 : sa collation et la reprise
distincte de Platon sont documentées dans
`explication-platon-source-primaire-2026-10-28.md`.

## Corrections

Chez Weil, une prémisse non exprimée sur la faiblesse du sens est remplacée par le
lien entre l’énergie exigée et l’obsession des seuls mobiles laissés disponibles.
L’occupation de l’âme et le retrait de la pensée sont distingués. La plainte finale
retrouve sa double difficulté : elle n’atteint pas les autres, et ne leur ferait pas
comprendre cette condition même si elle était entendue. La répétition sur l’horizon
intérieur disparaît. Les aides et comparaisons associées sont alignées.

Chez Bergson, quatre phrases précisent l’objection des données suffisantes et la
réponse maintenue au niveau de l’apparence. L’imprévisibilité de fait n’établit pas
une liberté. La Lune fictive illustre une initiative supposée ; l’analogie ne prouve
pas que le choix humain soit libre. Le conditionnel final reste conservé.

Chez Lévi-Strauss, une phrase distingue plus exactement les relations concrètes et
virtuelles. Les rapports concrets ne sont pas réduits aux usages passés ; les rapports
virtuels restent les possibilités d’autres agencements, dans les limites du type.
L’aide et la comparaison de la dernière étape reprennent cette distinction.

Le reste des copies est conservé. La concordance avant/après est dans
`scripts/audits/explications-reprises-2026-10-28.json`. Les quatorze originaux
restent archivés avant toute reprise. L’ancienne PR187 porte sur le même JSON ;
ses autres changements ne sont pas intégrés. La présente correction de la plainte
Weil2024 est motivée par le support, au lieu de supprimer la difficulté finale.

## Vérifications

Le contrat des modèles, la concordance entre texte continu et phrases annotées,
les fonctions et les exercices associés sont vérifiés. Le build complet et les
parcours navigateur sur copie stable sont contrôlés avant fusion. Le réaudit
indépendant distingue les corrections de sens de la collation primaire non faite.

Le [réaudit indépendant](explications-archives-reaudit-2026-10-28.md) accepte les
corrections de sens sur ces supports archivés, comme état de travail à examiner.
La vérification documentaire des PDF primaires reste distincte. Une dernière
correction conserve le pluriel exact « opérateurs » chez Lévi-Strauss.

Le contrôle de l’affichage a révélé sur les anciennes pages une commande supplémentaire
de masquage des annotations et un contraste insuffisant du mode sélectionné.
Les propositions locales masquent cette ancienne commande quand les deux modes
communs sont installés et donnent au bouton sélectionné un texte foncé lisible.
Aucun changement de raisonnement n’est ainsi introduit dans les autres copies.
