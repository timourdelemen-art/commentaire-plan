# Banque philosophique — application de l’audit du 17 octobre 2026

## Périmètre et décisions

Les 246 fiches et leurs identifiants sont conservés. Treize usages secondaires sont retirés : la banque propose maintenant 485 usages sur 302 sujets distincts. Les liens vers les anciennes fiches restent inchangés. Le moteur de génération de copies et le Worker ne sont pas modifiés.

302 explications d’usage sont rédigées en phrases achevées, au lieu de consignes de composition (« montrer », « distinguer », « après… »). Les libellés de fonction restent à l’infinitif lorsqu’ils nomment le geste intellectuel. Le champ `reason` développe désormais l’argument. La révision touche les données de 183 fiches, dont sept commentaires de six phrases ; les autres fiches restent inchangées dans leurs données sources.

## Reprises particulières

- Spinoza : l’usage qui confondait affects actifs et passions est retiré. L’exemple sur la nécessité explique comment comprendre les causes permet de réorienter l’action, sans assimiler nécessité et fatalisme.
- Kant : les concepts ordinaires qui rendent la perception intelligible sont distingués d’une théorie scientifique déjà constituée. Les trois extraits signalés comme trop longs ont été examinés ; deux de Kant et un de Nietzsche sont affichés sous forme abrégée vérifiable.
- Les raccords insuffisamment argumentés sont retirés chez Aristote (deux), Nietzsche, Spinoza, Cioran, Baudelaire (deux), Racine, Freud, Simondon, La Fontaine et Rousseau (deux). La fiche concernée garde toujours au moins un usage précis.
- Corneille : les deux raccords sur neutralité et impartialité distinguent conditions de départ, mérite et appréciation des actes.
- La Fontaine : les castors portent une objection au modèle mécanique, avec renvoi à l’examen des conduites réelles ; « Un monde dans la présence aimée » repart des mots du vers ; la fonction sur l’ours et son ami porte sur l’aide effectivement apportée. Les deux explications de l’eau reposée sont achevées.
- Freud : « représentance psychique » est expliqué en termes accessibles, sans effacer le rapport entre excitation corporelle et vie psychique.

## Deux remplacements contrôlés dans les EPUB fournis

- Platon, *Phèdre*, 275d : le passage où le discours interrogé signifie « toujours la même » chose remplace la seule annonce d’une ressemblance avec la peinture. Lecture du contexte précédent et suivant dans `OEBPS/p34chap1.html` ; citation exacte après normalisation des espaces. Identifiant P11 conservé. Une situation explicite les discours dont il est question.
- Freud, *Note sur le « bloc magique »* : la proposition sur l’impossibilité de reproduire l’écriture de l’intérieur remplace la formule générale sur la fin de l’analogie. Lecture de tout le texte dans `OPS/chap3.xhtml`, dans la traduction d’Olivier Mannoni du volume fourni. Identifiant F03 conservé ; titre et explication ajustés à la fonction précise de rappel qui manque au modèle.

Ces deux passages sont réellement retrouvés dans les fichiers sources. Les seules empreintes modifiées dans le registre de provenance correspondent à ces deux remplacements. Aucun livre ni extrait long de contexte n’est ajouté au dépôt.

## Transcription et présentation

`quote` conserve la transcription source vérifiée. Les points-virgules, deux-points et virgules terminaux sont remplacés par un point dans les rendus, avec la mention « Ponctuation finale adaptée » dans l’édition de la citation. Une ponctuation interne ne change pas. Les points d’interrogation, d’exclamation et de suspension sont conservés. Les trois citations qui n’avaient pas de ponctuation terminale reçoivent un point affiché et la même mention.

Les quatre extraits de Baudelaire concernés sont ceux de *Correspondances*, *Alchimie de la douleur*, *Le Cygne* et *La Mort des pauvres*. La même règle vaut pour les autres auteurs ; la nouvelle proposition de Freud se termine elle aussi par un point-virgule dans la source.

`quoteSegments` indique les passages source affichés pour trois extraits de philosophie et le premier vers autonome de Burrhus. Chaque segment doit être retrouvé à l’identique et dans le même ordre dans `quote`. Une coupure intérieure est signalée par `[…]`, une abréviation par « Extrait abrégé ». La transcription d’origine et son empreinte restent contrôlées.

Le générateur statique, les aperçus et le lecteur interactif utilisent les mêmes fonctions de présentation. Le contrôle navigateur compare les 246 citations dans les cartes, le lecteur et le catalogue sans JavaScript. Il vérifie les mentions d’adaptation et conserve les contrôles de liens, filtres, annotations et débordements à 390 et 1280 px.

## Vérifications

- Génération, fraîcheur des sorties, cohérence des empreintes, test métier, syntaxe et `git diff --check` : réussis.
- Build complet dans une copie jetable : réussi ; contrôles globaux, parcours et SEO sans nouvelle erreur.
- La limite de poids de la banque reste dépassée (environ 586 Kio HTML et 604 Kio de JS local chargé selon le contrôle). Cette correction éditoriale ne réalise pas la refonte du chargement à la demande et ne modifie aucun seuil pour masquer la limite.
- Navigateur : validation par les workflows de PR, Chromium étant absent de l’environnement local. Les captures des deux largeurs sont archivées par le workflow de la banque.

La vérification pédagogique porte sur l’argument effectivement rédigé, la distinction des concepts et le raccord au libellé précis du sujet. Aucun exercice nouveau n’est ajouté.
