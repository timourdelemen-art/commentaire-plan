# Scènes et citations : audit du 11 octobre 2026

## Verdict

La banque est utile, mais son ancienne présentation surestimait la qualité de certains raccords. Les scènes n'étaient pas sélectionnées par une comparaison démontrée des deux apories et de leur coût. Le sélecteur utilisait une liaison éditoriale au sujet, un emploi dans une partie, puis la notion. Il ne calculait pas la meilleure ouverture. Le filtrage par citation vérifiée prouvait au mieux la présence d'une phrase dans une édition ; il ne prouvait pas la justesse narrative ni argumentative de la fiche.

La règle pédagogique sur les références est pertinente, dans `philosophie-references.html`, `PHILOSOPHIE-THEORIE-PLAN.md` et le critère `philo-reference` du worker. Mais une règle écrite n'est pas un moteur documentaire : le code consulté du worker et des copies ne récupère pas un passage authentifié selon l'argument d'une sous-partie. Les références des copies sont rédigées dans leurs données. Aucune trace de sélection concurrentielle par passage, d'index des éditions françaises ou de contrôle documentaire des références de toutes les copies n'a été trouvée dans ce périmètre.

## Inventaire mesuré

| Élément | Avant | Cette PR |
| --- | ---: | ---: |
| Scènes | 59 | 64 |
| Citations affichées comme vérifiées | 28 | 29 |
| Notions couvertes par les étiquettes | 17 | 17 |
| Sujets du sélecteur | 96 | 96 |
| Sujets ayant un raccord d'ouverture proposé | 56 | 51 |
| Raccords d'ouverture proposés | — | 69 |

La baisse de sujets annoncés comme ouvrables résulte du déclassement de rapprochements fragiles. La quantité ne doit pas dicter l'homologation. Les cinq nouvelles scènes ne suffisent pas encore à la grande multiplication demandée : poursuivre l'extension après validation, sujet par sujet.

## Corrections et ajouts

- Contrôle de citation : une différence du texte affiché entraînait un signalement sans toujours retirer le badge. Désormais : retrait, code de sortie non nul, empreinte SHA-256 du fichier source. Espaces, guillemets et apostrophes sont normalisés ; mots et casse restent contrôlés. Exclusion des notes et en-têtes TEI. Tests contre faux mot, fausse casse, passage absent, note, source manquante et génération trompeuse.
- Phèdre : suppression d'une formulation entre guillemets qui ne reproduisait pas le passage ; le raccord « tout autant que les actes » devient un emploi d'appoint.
- Valjean : cinq années initiales pour le pain et aggravations liées aux tentatives d'évasion, pas dix-neuf années directement prononcées pour ce seul vol.
- Rhinocéros : le Logicien produit des syllogismes défectueux. Il ne « raisonne impeccablement » pas. Usage d'appoint, pas preuve d'une raison juste impuissante à convaincre.
- Douze hommes : doute raisonnable et acquittement, pas démonstration d'innocence.
- Matrix : l'oubli n'empêche pas l'expérience du plaisir. Ici ignorant et inconscient psychanalytique ne se confondent pas.
- 2001 : raccord de montage, pas transformation matérielle de l'os ; distinguer délégation et contrôle. HAL ne réfute pas à lui seul l'exclusivité humaine de la technique.
- Oppenheimer : les chercheurs savent construire une arme. La fiche porte désormais sur l'entretien avec Truman, pas sur des savants innocemment surpris par toute finalité militaire. La scène du bunker avant Trinity est une fiche distincte : estimation du risque, certitude et décision irréversible. Ces fiches décrivent le film, pas une transcription historique.
- Gattaca : prévision statistique, sélection technique et norme sociale se distinguent ; une probabilité n'est pas un destin.
- Sully : récit cinématographique et enquête réelle distingués. Zone d'intérêt : description localisée au jardin.
- Truman, 1984, Sisyphe, madeleine : retrait d'affirmations absolues ou d'un saut de l'univers fictionnel au point de vue de l'auteur.
- Fête de l'Être suprême, Demain dès l'aube, L'Ennemi : usages d'appoint plutôt que démonstrations forcées des deux branches.

Ajouts : Claude Bernard (dosages et foie lavé), Verne (libération refusée à bord du Nautilus), Nolan (bunker avant Trinity), Molière (Orgon sous la table), Chaplin (perte des paroles de Titine). Chaque ajout possède une source localisée, deux limites distinctes et une question de travail. L'analyse philosophique proposée reste à relire indépendamment ; un synopsis ou un passage authentique ne certifie pas son adéquation maximale.

## Usage dans le site

Le sélecteur conserve les groupes disjoints : raccord éditorial au sujet / appui dans une partie / proximité de notion. Il sauvegarde tous les filtres dans l'URL ; une recherche vide permet de les effacer. Deux scènes peuvent être comparées ; les brouillons sont isolés par sujet, scène et tâche. Le classement ne désigne pas la meilleure scène et ne donne pas de note. L'IA générique est désactivée pour ces tâches, car elle ne dispose pas de tous les passages nécessaires pour vérifier les faits.

L'atelier de citation demande : fonction, partie et argument précis, phrase d'introduction, analyse et limite. Il invite à préférer une paraphrase quand les mots exacts n'ajoutent rien. Ce n'est pas encore un sélecteur documentaire de passages philosophiques.

## Corpus français plus large : ressources réellement accessibles

1. [Académie de Montpellier, recueil 1996–2025](https://pedagogie.ac-montpellier.fr/recueils-des-sujets-de-philo-du-bac) : 1 178 textes annoncés par l'académie, PDF de 1 224 pages consultable. Index par notions et auteurs. Priorité pour des passages adaptés aux examens ; dédoublonner les variantes et conserver session, page, auteur, édition/traducteur quand identifiables. Le document est référencé dans le dépôt mais sa banque de passages structurée n'a pas été trouvée. La branche `corpus` consultée contient quatre fichiers de sujets de dissertation, pas cette banque de textes. Ne pas annoncer les 1 178 passages comme tous intégrés et sélectionnables.
2. [Corpus Descartes, Université de Caen](https://www.unicaen.fr/puc/sources/prodescartes/consult/descartes/Oeuvres/Oeuvres_Descartes/discours_de_la_methode.xml/dm_preface.html) : texte français et renvoi au fac-similé ; pagination Adam–Tannery. Conserver l'orthographe de l'édition, ou signaler une modernisation ; ne pas faire passer une citation modernisée pour une transcription diplomatique.
3. [Gallica, sélection philosophique de la BnF](https://gallica.bnf.fr/selections/fr/html/philosophie/les-grands-textes-de-philosophie-du-xviie-siecle) : éditions numérisées. Source identifiée par la BnF ; cette page a répondu à la recherche mais son ouverture a échoué pendant cet audit. Aucun passage n'est validé sur cette seule identification. Vérifier les mots sur l'image de la page, pas seulement dans l'OCR.
4. [Wikisource, projet philosophie](https://fr.wikisource.org/wiki/Wikisource:Projet_philosophie) : accès aux éditions et traductions françaises, avec statuts de relecture variables. Vérifier chaque édition, traducteur, page et fac-similé ; un nom d'auteur ou un portail ne garantit pas une transcription achevée.
5. FreDraCor et les dépôts Œuvres déjà utilisés : théâtre et littérature français authentifiables, précieux pour les scènes. Ils ne remplacent pas la banque de textes philosophiques. Les huit corpus requis pour les anciennes citations ont été téléchargés ; les 29 citations de la sortie ont été effectivement contrôlées.

Il est donc possible d'élargir fortement la réserve en français. « Le plus large possible » n'est pas un critère vérifiable sans périmètre : mieux vaut une réserve étendue dont chaque passage a une édition identifiable et un usage contrôlé qu'une collection maximale non relue.

## Sélecteur de citations : exigences de la prochaine étape

Entrée : sujet exact, idée de la partie, argument de la sous-partie, fonction cherchée. L'auteur vient après ces exigences. Les filtres impératifs sont langue française, édition/traduction identifiée, passage localisable, texte contrôlé et contexte disponible. Aucune reformulation automatique ne porte des guillemets.

Pour chaque candidat, conserver : thèse réellement soutenue, raisonnement du passage, distinction utile, portée, objection possible, place envisagée, phrase de reprise, risque de contresens et raison d'écarter les autres candidats. Comparer quelques passages et justifier le choix ; ne pas inventer un score numérique d'optimalité. Une recherche sémantique ou un tag de notion ne vérifie ni le contexte ni la fonction. Le passage peut être utile comme objection plutôt que comme soutien ; sa fonction change selon la partie.

Une citation qui ne fait que répéter l'argument, qui exige un long détour doctrinal ou qui dit moins précisément la chose qu'une paraphrase doit être écartée. Pour A20, le coût en longueur s'ajoute à l'exigence de justesse : aucune citation obligatoire par partie. Relier cette future sélection au registre de résolutions de la PR 125, sans confondre le choix de référence avec le choix de l'opération de III.

## Traçabilité et limites de l'audit

`scripts/exemples/scenes-audit.json` inventorie les 64 fiches, leurs empreintes et les raccords. Il distingue citation contrôlée et passage narratif consulté. Aucune ouverture n'y est déclarée homologuée indépendamment. Vingt-quatre vigilances sont ciblées, notamment : citations et scènes mélangées dans Cyrano, hérédité/inconscient chez Zola, possession fantastique dans Le Horla, chronologie de Germinal, portée du fait historique à Tchernobyl, scène et jurisprudence de Rosa Parks. Les autres scènes doivent aussi être relues ; l'absence d'alerte ciblée n'est pas un certificat.

Les réservations de la PR 125 empêchent de modifier ici les copies A20. Plusieurs de leurs scènes recoupent cette banque : Claude doit comparer les versions avant fusion et reprendre les introductions concernées, sans revenir aux anciens raccourcis.

Tests : huit tests Python du vérificateur réussis ; test Node de 64 fiches, 29 citations, sujets présents, filtres, groupes distincts, cinq nouveaux raccords à deux limites et isolation des clés de brouillon réussi ; syntaxe JS réussie. Construction Netlify exacte en copie jetable réussie : 273 pages, zéro erreur globale, vingt avertissements préexistants ; parcours philosophie, SEO zéro erreur/zéro avertissement et budget performance réussis.

Navigateur réel 390/1280 px et relecture philosophique indépendante non réalisés. PR en brouillon ; aucune fusion ni publication. L'audit complet d'authenticité narrative des 64 fiches et le moteur documentaire des citations restent à terminer avant de promettre une banque intégralement homologuée.
