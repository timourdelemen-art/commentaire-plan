# Audit indépendant des quatorze modèles d’explication philosophique

27 octobre 2026 — versions existantes du dépôt `/workspace/commentaire-plan`, commit `0ec0e3b39f26d5265f330c91d8b9aa01517770a6`. Cet audit n’a modifié aucun fichier du dépôt ni aucun état de branche. Ce rapport ne porte sur aucune réécriture future de Platon.

La référence de cet audit est le commit public de main ci-dessus. Les six fichiers sources des quatorze modèles ont été comparés octet pour octet avec `git show 0ec0e3b39f26d5265f330c91d8b9aa01517770a6:chemin` : six sur six sont identiques. Le commit de travail Cioran `27ae3b6fab151ef899f201bc114a1e06295a16f8` n’est pas la référence publique. Journal : `audit-explications-comparaison-main-public.json`.

## Résultat

Les quatorze copies disposent d’une annotation de fonction pour chaque phrase. Cela ne suffit pas à établir leur conformité au protocole. Le texte exact de chacun des treize sujets manque dans les pièces accessibles : la fidélité des citations, des modalités, des voix, des limites de passage et de la couverture demeure **indéterminée pour tous**. Aucune copie n’est donc homologuée ici comme modèle validé. Ce résultat documentaire ne signifie pas qu’elles seraient toutes fautives ou de même qualité.

Des réparations internes sont néanmoins motivées : Platon annonce un ordre différent de celui qu’il suit et comprime plusieurs inférences ; Pascal ne justifie pas le lien entre absence d’étude et impossibilité de conserver ; Aristote glisse de l’inconséquence d’un locuteur à la fausseté de son discours ; Malebranche doit distinguer défaut de justification et erreur de contenu, puis thèse et réserve du commentateur. Chez Bergson, l’imprévisibilité doit être distinguée d’une ignorance des causes. Ces points sont détaillés et qualifiés ci-dessous, sans les transformer en contresens certifiés du passage absent.

La cible est la copie **la plus courte qui accomplit les opérations nécessaires**. Aucun minimum de mots, de phrases, de parties ou d’exemples extérieurs n’est appliqué. Fusionner une répétition pour expliciter une inférence est souvent préférable à un allongement. Mill possède par exemple une chaîne par cas plus nette que certains modèles plus longs ; ses 18 phrases ne le disqualifient ni ne le valident.

## Méthode, pièces et limites

`AGENTS.md` a été lu intégralement. L’auditeur a lu intégralement le protocole de 1 342 mots, version expérimentale 0.1 du 25 octobre 2026, et l’applique à la demande explicite du propriétaire. Empreinte SHA-256 : `744d7b5293dc870b520b3326d5bc9efae329270999036b1a452f985497f800fd`. L’auditeur est distinct de l’opérateur ; il n’a rédigé ni modifié aucune des copies.

Population : neuf modèles issus de huit sujets dans `scripts/explication-textes-data.json`, dont les deux options de Malebranche ; cinq modèles des pages manuelles Platon, Pascal, Aristote, Mill et Bergson. Soit douze copies de voie générale et deux options d’un même sujet technologique.

Les vraies copies sont seules comptées et lues : `paragraphs[][1]` des données, avec égalité contrôlée à la concaténation des phrases de `paragraphs[][3]` ; spans `.c20-t[data-model-text]` des cinq pages manuelles, avec contrôle qu’aucun span n’est omis. Sont exclus titres, fonctions, annotations, consignes, questions officielles, boutons, métadonnées et texte du JSON. Les identifiants S01, S02… sont ceux de l’extraction d’audit, pas des identifiants déjà présents sur le site. Les Pxx désignent les paragraphes des données ou les blocs des pages manuelles, sans certifier leur rendu visuel en mode copie entière.

Le compteur lexical conserve les apostrophes et traits d’union internes et exclut la ponctuation isolée. Le compteur du site, indiqué entre parenthèses, utilise toutes les unités séparées par espaces et compte aussi « : », « ; », « ? », « « », « » » lorsqu’ils sont isolés. Cette différence explique notamment 286 mots lexicaux contre 293 unités pour Platon ; aucune annotation n’entre dans aucun des deux nombres.

Sources recherchées : pages d’explication ; jeu de données ; `philosophie-annales-data.js` ; six pages `philosophie-bac-2026-texte-*.html` ; données d’audit conceptuel ; PDF suivis du dépôt ; référence Git locale `origin/corpus`. Les pages d’annales contiennent des résumés et des copies rédigées par le site, explicitement présentés comme tels, pas le texte original. Elles servent à contrôler la concordance éditoriale interne, jamais à certifier une citation de l’auteur. La page Murdoch ne correspond à aucun des treize modèles et n’est pas comptée. Les PDF du dépôt retrouvés concernent HLP et les grilles de français ; le corpus Git contient des listes de dissertations. Aucun extrait de ces sujets n’y a été retrouvé.

La configuration réseau observée est `restricted/enforced` ; les domaines officiels sont absents de la liste autorisée. L’opérateur a signalé le refus d’accès et l’absence de PDF local. Cet audit n’a effectué ni contournement, ni requête réseau, ni transcription de mémoire. Une URL officielle présente n’équivaut pas à un PDF ouvert et collationné. Les liens réglementaires de l’annexe 3 n’ont pas été reconsultés : la conformité de régime donnée ici est structurelle, au regard du protocole et des questions du dépôt.

Les jugements distinguent : **défaut interne établi**, visible dans la copie ; **sous-explication**, maillon non reconstruit ; **point à vérifier**, dont la source manque. Aucun faux guillemet ou contresens central de l’original n’est déclaré prouvé. Le verdict documentaire de la Porte 4.2 est donc « indéterminé (preuve manquante) », même lorsqu’une réparation interne est prioritaire. Les défauts localisés relèvent ici de points à surveiller ; l’absence de source bloque la validation procédurale sans constituer en soi un contresens de l’annexe 1. Les variantes de style ou de découpage qui conservent la démonstration sont acceptables. Aucun score sur 36 n’est donné : on ne peut noter honnêtement la fidélité et la couverture d’un texte absent.

## Priorités et comptages

P0 est un verrou documentaire commun avant validation, pas une recommandation de réécrire tout le corpus. P1 désigne un maillon ou une attribution centrale à réparer en premier ; P2 une précision utile sans reconstruction générale ; P3 une amélioration de densité ou de repérage. Les localisations détaillent la nature et le coût de la réparation, indépendamment du nombre de mots.

| Modèle | Mots lexicaux (compteur site) | Phrases annotées | Priorité de reprise |
| --- | ---: | ---: | --- |
| 1. nietzsche 2026 metropole | 463 (476) | 26 | P2 |
| 2. freud 2026 amerique du nord | 483 (495) | 28 | P2 |
| 3. tocqueville 2026 asie | 493 (510) | 27 | P2 |
| 4. weil 2026 centres etrangers | 557 (572) | 30 | P2 |
| 5. malebranche 2026 antilles guyane · option 1 | 637 (652) | 32 | P1 |
| 6. malebranche 2026 antilles guyane · option 2 | 484 (497) | 28 | P1 |
| 7. rawls 2025 metropole | 532 (541) | 28 | P2 |
| 8. weil 2024 metropole | 543 (556) | 28 | P2 |
| 9. levi strauss 2023 metropole | 509 (524) | 27 | P2 |
| 10. platon 2025 polynesie | 286 (293) | 19 | P1 |
| 11. pascal 2025 asie | 282 (300) | 18 | P1 |
| 12. aristote 2025 antilles guyane | 314 (323) | 19 | P1 |
| 13. mill 2025 metropole secours | 317 (325) | 18 | P2 |
| 14. bergson 2023 centres etrangers | 319 (334) | 19 | P1 |

Total : 6219 mots lexicaux, 6398 unités au compteur du site, 347 phrases annotées. Ces quantités sont descriptives.

## Exigences communes non démontrées par les dossiers existants

### C0 — P0 documentaire

Aucun extrait original intégral accessible pour confrontation dans le périmètre local inspecté. Auteur, titre et lien existent, mais édition, traduction, limites, ponctuation, citations, quantificateurs et voix ne sont pas certifiés. Un lien vers un PDF n’est pas une source effectivement consultée.

Exigences : A2, 1, 1.1, 1.2, 1.3.

### C1 — P0 dossier de validation

Prédiction initiale, lectures concurrentes testées, carte de propositions, registre complet et fiche scellée non fournis dans les pièces auditées. Des problèmes/thèses/mouvements existent dans les exercices, mais ils ne constituent pas ce dossier. On ne peut déduire de cette absence documentaire que le rédacteur n’a jamais fait ces opérations, ni fabriquer leur historique après coup.

Exigences : 0, 2, 2.1, 3, 3.1, 3.3, 4, 4.1.

### C2 — P0 traçabilité de validation

Chaque phrase de copie reçoit une fonction (347 phrases annotées au total), mais ni identifiant stable, ni ancrage propositionnel, ni opération/preuve/lien suivant systématiques. Deux présentations sont prévues par le balisage ; ce rapport n’a pas audité le navigateur. Le dossier ne contient pas les deux versions documentées d’une rédaction avant/après compression.

Exigences : 9.1, 9.2, 10.2.

### C3 — P0 statut

Auditeur distinct de l’opérateur pour ce rapport, mais audit rétrospectif partiel : impossible d’effectuer le premier audit sans copie rédigée, ou le second audit complet sans texte exact, fiche et registre. Aucune copie n’est homologuée comme modèle validé. Le statut retenu est état de travail ; il n’équivaut pas à un jugement négatif uniforme sur leur qualité.

Exigences : A7, 4.1, 10.1, 10.2.

Les exercices fournissent des thèmes, problèmes, thèses, mouvements et quelques analyses. Leur présence est reconnue ; elle ne remplace pas le registre 3.1 pour chaque proposition, les tests de lectures concurrentes, une fiche scellée ni le dossier soumis aux deux audits. L’absence de ces pièces dans le périmètre audité est un manque de preuve de conformité, pas la preuve que les gestes n’ont jamais été faits. Les Portes 0 et 4.1 ne peuvent pas être satisfaites rétrospectivement en inventant une trace « avant lecture ».

La Porte 8 demande pour chaque unité un ancrage, une élucidation, une opération, une inférence, une épreuve utile de la distinction et la nécessité du passage suivant. Tous ces gestes n’exigent pas six phrases ; ils peuvent se combiner. Aucune citation à chaque phrase, objection partout ou illustration extérieure automatique n’est imposée. En revanche, une étiquette « démontrer » en marge n’accomplit pas la démonstration dans la copie nue.

Les modèles nomment trois parties dans leur présentation, mais le seul nombre trois ne prouve pas un plan imposé : plusieurs mouvements peuvent être regroupés légitimement. Sans texte exact, l’arbitraire des frontières reste indéterminé. Ne pas importer les treize paragraphes de dissertation ou les transitions-questions systématiques dans l’explication ; A3 et 8.3 demandent le mouvement singulier du texte et des articulations explicatives.

La concordance 10.3 concerne la révision : conserver chaque original, identifier segment ancien, diagnostic, intervention, justification et nouveau segment. Comme aucune copie n’est modifiée ici, aucun nouveau segment n’est fabriqué ; l’extraction et les empreintes rendent la comparaison ultérieure possible. Toute réparation doit être réauditée (10.1), et le contrôle futur de Platon doit rester distinct de cet audit initial.

## 1. nietzsche-2026-metropole

**463 mots lexicaux (476 au compteur du site), 26 phrases annotées. Priorité P2.** Architecture interne plutôt cohérente ; justifications et portée de certaines formulations à resserrer.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-philosophie-517487.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** La question S02 vise bien le paradoxe de connaissances compatibles avec la superstition. Elle appelle une raison, et ne se réduit pas au thème de la science.

**Thèse et modalités.** S03 privilégie l’apprentissage des raisons ; S05 garde « au moins », S07 le conditionnel, S23 « peut suffire ». Cette prudence est observable dans la copie, sans garantir les modalités originales.

**Couverture.** Les unités annoncées sont effectivement parcourues : valeur des méthodes, cas des personnes cultivées, hypothèse devenue conviction, portée politique et éducation. La couverture des propositions originales reste indéterminée.

**Opérations et inférences.** S07 reconstruit une hypothèse de disparition des méthodes et sa conséquence ; S14-18 distinguent explication possible et conviction. En revanche, la généralisation éducative n’explicite pas complètement ses conditions.

**Exemples et distinctions.** L’opposition savoir/méthode et la distinction instinct acquis/apprentissage sont utiles. Aucun exemple extérieur n’est requis ici : l’hypothèse de disparition est déjà un test. Son statut dans le passage doit être confronté à la source.

**Transitions.** S09 et S19 relient les unités par leurs effets, plutôt que par une simple liste. S22 « C’est pourquoi » demande de préciser le passage du diagnostic à l’exigence faite à chacun.

**Conclusion.** S25-26 répondent et formulent un gain clair. La chaîne disparition des méthodes → adhésion hâtive → formation est seulement implicite dans cette conclusion.

**Fonctions et trace source.** 26 fonctions sont présentes. Les expressions entre guillemets S17 et S20 ne sont pas contrôlables mot à mot ici ; « appuyer sur la formulation » ne constitue pas une preuve de vérification.

**Régime d’épreuve.** Voie générale : explication suivie de l’ensemble visé, sans questions A/B/C. Le nombre de mouvements n’est pas en soi un défaut ; leurs frontières doivent être justifiées sur l’extrait.

### Défauts ou vérifications localisés

**P2 — sous-explication établie (P02/S06, P02/S07).**

> S06 : Une méthode règle la recherche et permet de distinguer une explication séduisante d’une proposition justifiée.

> S07 : La supposition de sa disparition révèle sa nécessité : les vérités déjà acquises pourraient être répétées sans qu’on sache distinguer de nouvelles affirmations justifiées et de nouvelles superstitions.

La définition de méthode reste générique. Pour que le test de sa disparition démontre ce que S08 en tire, il faut préciser quelle capacité manque au simple détenteur de résultats : produire et contrôler une nouvelle affirmation. La copie le suggère mais n’explique pas le critère qui sépare les deux jugements.

Protocole : 8 D2-D4, 8.1.

**P2 — modalité à contrôler sur source (P05/S22, P05/S23, P05/S24).**

> S22 : C’est pourquoi il demande que chacun étudie au moins une science de manière approfondie.

> S23 : Une seule peut suffire à faire éprouver la difficulté de justifier une affirmation, là où une accumulation superficielle de résultats l’aurait masquée.

> S24 : Cette expérience doit former une disposition durable à mesurer ses jugements à leurs raisons.

Le devoir d’étudier au moins une science et la possibilité qu’une seule suffise ne sont pas une garantie de transfert à tous les jugements. La copie doit conserver la différence entre expérience formatrice, exigence éducative et efficacité suffisante ; la force exacte de cette conséquence n’est pas vérifiable sans le passage.

Protocole : 1.1, 5.1, 3.3.

**P3 — densité perfectible (P04/S16, P04/S17, P04/S18).**

> S16 : L’enthousiasme se change alors en fanatisme : l’attachement personnel dispense de soumettre l’opinion à une épreuve.

> S17 : Prendre une hypothèse « à cœur comme une conviction », c’est engager son attachement personnel là où il faudrait encore examiner une explication possible.

> S18 : L’assurance subjective augmente ainsi sans augmentation correspondante des preuves.

Trois phrases voisines expliquent le même remplacement des preuves par l’attachement. Une fusion peut libérer la place nécessaire à la précision du critère de contrôle, sans allonger la copie.

Protocole : 9.2.

**Intervention proportionnée.** Conserver le problème et les distinctions ; remplacer une répétition par le critère précis de contrôle d’une hypothèse, puis vérifier la portée de l’exigence éducative sur le texte exact.

## 2. freud-2026-amerique-du-nord

**483 mots lexicaux (495 au compteur du site), 28 phrases annotées. Priorité P2.** Explication organisée ; prudence sur illusion/erreur utile, mais causalité et statut de certaines définitions insuffisamment établis.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-philosophie-517046.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 formule une difficulté précise : force d’adhésion sans origine empirique ou démonstrative. La question de la vérité est correctement distinguée de celle de l’origine.

**Thèse et modalités.** S03 attribue la puissance aux désirs ; S08 et S15 refusent la déduction désir → fausseté. Il faut conserver cette limite sans faire de toute la copie une discussion extérieure sur Dieu.

**Couverture.** Origine affective, enfance, protection adulte, promesses et explications du monde sont parcourues. On ne peut garantir que tous les souhaits et leurs articulations du passage sont couverts.

**Opérations et inférences.** S11-14 rendent explicite une continuité enfant/adulte ; elle est une reconstruction psychologique à attribuer à Freud, non une déduction suffisante de toute croyance religieuse.

**Exemples et distinctions.** La distinction illusion/erreur est utile. Providence, justice et vie future reçoivent une fonction ; leur complémentarité est plus claire que le soutien « mutuel » affirmé S20.

**Transitions.** S10 annonce une question nouvelle, et S22 passe explicitement de consoler à expliquer. S16 est davantage une annonce de liste qu’une nécessité reconstruite.

**Conclusion.** S27 répond sur la puissance de la religion ; S28 dégage une différence de valeurs. La seconde phrase privilégie la prudence épistémique, tandis que la chaîne des désirs est peu reprise.

**Fonctions et trace source.** 28 fonctions présentes ; citations de S06 non collationnées. La définition de dogme S05 ne possède aucun ancrage explicite dans la copie.

**Régime d’épreuve.** Voie générale : cohérence de l’explication suivie ; la doctrine complète de Freud n’est pas nécessaire et ne doit pas combler l’absence d’extrait.

### Défauts ou vérifications localisés

**P2 — définition locale non établie (P02/S05).**

> S05 : Les idées religieuses se présentent comme des dogmes, c’est-à-dire des affirmations soustraites à la contestation.

« Affirmations soustraites à la contestation » est une définition supplémentaire. Le mot dogme peut désigner un enseignement posé ou tenu pour assuré sans que la formule exacte « soustraites à la contestation » soit démontrée par ce passage. Fixer son sens local sur la source, plutôt que certifier la définition scolaire.

Protocole : 1.3, A2, 6.

**P2 — statut de l’inférence insuffisamment marqué (P03/S11, P03/S13, P03/S14, P03/S15).**

> S11 : L’enfant dépend d’un père qui peut le protéger parce qu’il l’aime ; l’amour donne ainsi à la puissance protectrice une orientation favorable.

> S13 : L’adulte retrouve donc le besoin d’être protégé, mais le père humain ne peut plus garantir cette protection.

> S14 : La figure divine prolonge cette relation en lui donnant un protecteur plus puissant.

> S15 : Cette continuité explique, chez Freud, la formation de la croyance ; elle n’établit pas, à elle seule, si son objet existe.

L’amour explique l’orientation favorable de la protection, mais non à lui seul la puissance du protecteur. S13-15 passent ensuite de la vulnérabilité durable à la représentation divine : expliciter le souhait de prolonger la protection et marquer qu’il s’agit de l’explication de Freud évite de présenter cette continuité comme une déduction universelle.

Protocole : 3.2, 3.3, 8 D4.

**P2 — relation logique imprécise (P04/S20).**

> S20 : Ces promesses se soutiennent mutuellement : ce que l’expérience présente refuse peut être attendu d’un ordre qui la dépasse.

La complémentarité des promesses est expliquée, mais pas leur soutien mutuel : une vie future peut rendre réalisable une justice différée, sans que chaque promesse prouve réciproquement les autres. Préciser le rapport précis ou réduire « se soutiennent mutuellement ».

Protocole : 3.2, 8 D4.

**P3 — répétition observable (P02/S08, P03/S15, P05/S25, P06/S28).**

> S08 : Il faut cependant distinguer cette explication de l’adhésion d’une preuve de fausseté : qu’une croyance soit désirée ne suffit pas, à soi seul, à établir qu’elle est fausse.

> S15 : Cette continuité explique, chez Freud, la formation de la croyance ; elle n’établit pas, à elle seule, si son objet existe.

> S25 : On peut alors préciser la limite logique de ces réponses : leur cohérence interne ne suffit pas à établir indépendamment la vérité de leurs principes.

> S28 : Le texte invite à distinguer la valeur consolatrice d’une croyance des raisons qui pourraient en établir la vérité.

Quatre retours sur la différence consolation/origine/vérité protègent un point important, mais occupent une place qui pourrait servir à expliquer plus précisément une promesse. Ne conserver que les distinctions nécessaires à leur endroit.

Protocole : 9.2.

**Intervention proportionnée.** Fixer le sens local de dogme ; attribuer explicitement la reconstruction psychologique à Freud ; remplacer le soutien mutuel indéterminé par la relation exacte entre promesse de justice et au-delà.

## 3. tocqueville-2026-asie

**493 mots lexicaux (510 au compteur du site), 27 phrases annotées. Priorité P2.** Paradoxe de l’intérêt bien construit ; mécanisme final et condition du danger à préciser.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-philosophie-517430.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 lie intérêt privé et conditions de prospérité : le problème est directeur et spécifique.

**Thèse et modalités.** S03 et S05 rendent le danger conditionnel à un décalage de développement. S07 exclut explicitement une loi « tout enrichissement détruit la démocratie ». La conclusion doit conserver cette finesse.

**Couverture.** Les quatre ensembles internes sont traités : décalage des goûts et des lumières, abandon de l’exercice, erreur sur l’intérêt, défaut de prise en charge collective. L’original n’est pas disponible pour apprécier la couverture exacte.

**Opérations et inférences.** S13 oppose coût immédiat et bénéfice collectif ; S19 explique la dépendance des affaires privées envers la capacité politique. S22-24 décrivent la vacance sans identifier assez précisément son objet.

**Exemples et distinctions.** S14 attribue « travaux inutiles » et « jeux d’oisifs » aux citoyens critiqués : c’est une bonne précaution de voix. S24 évite de transformer immédiatement le vide en tyrannie.

**Transitions.** S10 et S21 montrent pourquoi une conduite privée a une portée publique. S16 « rectifie » annonce une opération, mais son ancrage exact demeure absent.

**Conclusion.** S26-27 répondent et dégagent un gain. Le raccourci « recherche exclusive » fait perdre le décalage temporel essentiel posé S05.

**Fonctions et trace source.** 27 fonctions présentes ; pas de correspondance proposition originale → phrase de copie. Les citations et l’image de la place vide restent non vérifiées.

**Régime d’épreuve.** Voie générale : ensemble argumenté, ni dissertation autonome ni barème par questions. L’usage éventuel de l’œuvre entière doit rester subordonné à la détermination du passage.

### Défauts ou vérifications localisés

**P2 — sous-explication établie (P05/S22, P05/S23, P05/S24).**

> S22 : Les citoyens absorbés par le travail refusent la charge publique, tandis que la classe qui aurait pu l’assumer grâce à ses loisirs n’existe plus.

> S23 : Aucun groupe ne vient donc compenser ce retrait, qui laisse la fonction de gouvernement sans prise en charge suffisante.

> S24 : La comparaison avec une place vide décrit cette défaillance ; elle n’affirme ni la disparition matérielle de tout pouvoir ni l’installation déjà accomplie d’une tyrannie.

La « classe » n’est pas identifiée dans la copie, et « fonction de gouvernement » reste ambiguë : gouverner, participer et contrôler ne sont pas exactement le même acte. S24 écarte deux contresens sans dire assez précisément ce qui reste vide. Il faut fixer le référent et l’activité visée à partir de l’extrait.

Protocole : 1.3, 3.1, 8 D2-D4.

**P2 — perte de condition dans la synthèse (P02/S05, P06/S26).**

> S05 : Le péril apparaît lorsque le goût des biens progresse plus vite que les lumières et les habitudes de la liberté.

> S26 : Tocqueville montre ainsi qu’une recherche exclusive de la fortune peut sacrifier la liberté dont elle dépend.

S05 fait du déséquilibre entre goût des biens et formation à la liberté la condition du danger ; S26 ramène le résultat à une recherche « exclusive » de la fortune. Ce n’est pas une contradiction formelle, mais la conclusion ne restitue plus la condition singulière sur laquelle la copie a insisté.

Protocole : 1.1, 5.1, 9 C1-C3.

**P3 — ancrage insuffisant (P04/S18, P05/S24).**

> S18 : Rester maître de soi signifie ici conserver une capacité politique de participer aux décisions communes, et non seulement maîtriser ses passions.

> S24 : La comparaison avec une place vide décrit cette défaillance ; elle n’affirme ni la disparition matérielle de tout pouvoir ni l’installation déjà accomplie d’une tyrannie.

Le sens politique de « maître de soi » et celui de la « place vide » sont expliqués, mais aucun extrait bref ne fixe la proposition précise interprétée. Cette absence empêche de vérifier la restriction proposée.

Protocole : 8 D1, 9.1.

**Intervention proportionnée.** Préciser la fonction publique laissée sans prise en charge, puis conserver dans la conclusion le décalage entre goût des biens et formation à la liberté. Éviter une histoire doctrinale ajoutée pour identifier la classe sans source.

## 4. weil-2026-centres-etrangers

**557 mots lexicaux (572 au compteur du site), 30 phrases annotées. Priorité P2.** Raisonnement plus développé et plusieurs modalités bien distinguées ; problème initial et gain sur le désir à ajuster.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://www.education.gouv.fr/sites/default/files/document/baccalaur-at-g-n-ral-2026-philosophie-517142.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 transforme la servitude propre au travail d’exécution en impossibilité de délivrer de « toute souffrance ». Ce domaine est plus large que celui présenté S01 et expliqué par le développement.

**Thèse et modalités.** S03 distingue justice des conditions et nécessité répétitive. S08 circonscrit l’objet au travail d’exécution ; cette précaution ne démontre pas encore chaque quantification de la thèse.

**Couverture.** Les unités nécessité, conservation, désir, images, lassitude et meilleurs travailleurs sont prises en charge. Le résumé d’annale ajoute les mots écœurement et dégoût, absents de la copie : il s’agit d’une différence éditoriale à vérifier sur source, pas d’une omission originale déjà certifiée.

**Opérations et inférences.** S10-13 expliquent pourquoi conservation et production ne s’excluent pas. S15-18 reconstruisent la tension désir/retour au même, mais la définition du désir ne remplace pas l’examen du présupposé.

**Exemples et distinctions.** L’exemple du besoin de manger S12 teste bien la récurrence ; les deux comparaisons sont distinguées. S27 marque honnêtement comme possible une interprétation des « meilleurs », au lieu de la présenter comme une citation.

**Transitions.** S14 relie nécessité et désir par une difficulté précise. S24 rattache les images à l’effet intérieur ; c’est une transition explicative. S20 annonce les images sans distinguer encore leur valeur de preuve.

**Conclusion.** S29-30 répondent à la difficulté du travail nécessaire et récapitulent la distinction décisive. Elles sont plus précises que la question initiale sur toute souffrance.

**Fonctions et trace source.** 30 fonctions présentes. Les citations « meilleurs », « surtout », « et même autrement » et les images ne sont pas contrôlables à partir d’un original accessible.

**Régime d’épreuve.** Voie générale : traitement suivi de la difficulté ; ni revendication de doctrine complète ni obligation de trois sous-parties. La longueur ne lui confère aucun avantage automatique.

### Défauts ou vérifications localisés

**P2 — glissement de problème établi (P01/S01, P01/S02, P07/S29).**

> S01 : Dans cet extrait de La Condition ouvrière, Simone Weil examine la servitude propre au travail d’exécution.

> S02 : Pourquoi une organisation parfaitement équitable ne suffirait-elle pas à délivrer ce travail de toute souffrance ?

> S29 : Weil montre donc pourquoi la justice sociale ne règle pas à elle seule la difficulté intérieure du travail nécessaire.

La question porte sur « toute souffrance », alors que S01 annonce une servitude déterminée et S29 répond à la difficulté intérieure de ce travail. Une organisation équitable ne supprime évidemment pas toute souffrance pour d’autres raisons : cette généralité rend le problème plus facile et moins précis que l’argument ensuite reconstruit.

Protocole : 5, 7 I2-I3, A3.

**P2 — présupposé à préciser (P04/S15, P04/S16, P04/S17).**

> S15 : Weil pose que le désir est la source d’énergie de l’effort humain.

> S16 : Elle le définit comme une orientation vers ce qu’on ne possède pas encore, donc comme une distance à parcourir.

> S17 : Dans ce raisonnement, on ne peut désirer ce qu’on a puisque le désir est défini comme un mouvement vers un point où l’on n’est pas.

La copie présente d’abord une thèse sur l’énergie de l’effort, puis une définition du désir qui rend la négation presque analytique. Elle doit distinguer prémisse du passage et justification de cette prémisse ; définir le désir comme manque ne démontre pas à soi seul toute la psychologie de l’effort.

Protocole : 3.2, 3.3, 8 D4.

**P3 — conjecture dispensable (P06/S26, P06/S27).**

> S26 : La remarque sur les meilleurs travailleurs écarte l’idée d’une faiblesse réservée aux moins courageux.

> S27 : Une interprétation possible est qu’une forte exigence d’accomplissement rende cette répétition plus douloureuse ; l’extrait ne précise pas davantage qui sont ces « meilleurs ».

L’hypothèse d’une exigence d’accomplissement plus forte est signalée comme telle, ce qui est loyal. Elle n’est cependant pas requise pour le rôle logique déjà expliqué S26 : le cas des meilleurs écarte l’explication par une faiblesse réservée aux moins courageux. La supprimer est possible si elle n’a pas d’ancrage.

Protocole : A2, 3.3, 9.2.

**Intervention proportionnée.** Réduire la question au type de servitude effectivement expliqué ; distinguer la prémisse sur le désir de ses conséquences ; garder l’analyse des images et la restriction au travail d’exécution.

## 5. malebranche-2026-antilles-guyane — option 1

**637 mots lexicaux (652 au compteur du site), 32 phrases annotées. Priorité P1.** Les huit réponses sont présentes et ordonnées ; distinction ignorance/erreur et attribution de la modération à sécuriser.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://www.education.gouv.fr/sites/default/files/document/baccalaureat-technologique-2026-philosophie-517532.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** B1 = P04/S14-15 : le problème de responsabilité malgré la limitation naturelle est explicite. L’absence d’introduction générale avant A1 est normale pour cette option.

**Thèse et modalités.** B3 = P06/S20-22 donne la thèse. S05 distingue possibilité de l’erreur et jugement effectif ; la portée du blâme de toute erreur apparaît toutefois moins nettement que dans l’option 2.

**Couverture.** Ordre des paragraphes dans les données : A1, A2, A3, B1, B2, B3, C1, C2. Aucun item interne n’est omis. L’exactitude des huit questions dites officielles n’a pas été recontrôlée sur le sujet.

**Opérations et inférences.** A1 reconstruit le glissement de non-perception à négation ; A2 propose limitation/suspension ; A3 oppose possibilité et refus d’examiner. S09 confond toutefois la précipitation injustifiée et la fausseté obtenue.

**Exemples et distinctions.** C1 distingue deux sens d’« erreur humaine » ; C2 teste la responsabilité par l’accusation, l’urgence et l’indice trompeur. Ces cas servent une distinction précise et sont permis dans le commentaire conditionnel de l’option 1.

**Transitions.** On ne doit pas exiger des transitions linéaires entre A, B et C : les questions déterminent leur ordre. À l’intérieur des réponses, les liens sont globalement explicites.

**Conclusion.** C2/S32 stabilise une responsabilité proportionnée aux possibilités. Une conclusion générale supplémentaire n’est pas exigée par ce régime ; il faut seulement distinguer cette réponse discutée de la thèse reconstruite en B.

**Fonctions et trace source.** 32 fonctions présentes ; labels A1-C2 conservés dans les données, et option déclarée par le générateur. Les en-têtes paragraphSections identiques masquent néanmoins les labels de question dans les titres de la copie générée ; l’ordre s’y infère des paragraphes.

**Régime d’épreuve.** Conformité structurelle à l’option 1 vérifiable dans les données : huit réponses dans l’ordre A/B/C, option indiquée, discussion C distincte. Conformité documentaire officielle indéterminée ; aucune transposition des exigences de l’explication libre n’est imposée.

### Défauts ou vérifications localisés

**P1 — confusion conceptuelle interne (P02/S09).**

> S09 : Ne pas savoir une chose n’est pas encore se tromper ; l’erreur commence lorsqu’on lui attribue sans assurance ce qu’elle n’a peut-être pas.

Attribuer sans assurance une propriété que la chose « n’a peut-être pas » n’est pas encore établir une erreur de contenu : l’affirmation pourrait être vraie par hasard. La copie doit séparer absence de justification, risque de fausseté et jugement effectivement faux ; sinon l’opposition ignorance/erreur annoncée n’est pas tenue.

Protocole : A4, 1.3, 3.2, 8 D2-D4.

**P1 — condition pratique sous-expliquée (P02/S07, P02/S08, P06/S22).**

> S07 : Cela n’exige pas de devenir un esprit infini.

> S08 : Lorsqu’un examen reste incomplet, on peut limiter son affirmation ou suspendre son jugement.

> S22 : La connaissance limitée ne force pas le jugement à devenir entier : on peut reconnaître une ignorance plutôt que la convertir en certitude.

L’examen d’un esprit fini est toujours incomplet au sens où tous les rapports ne sont pas connus. Il faut donc expliquer ce que signifie un examen suffisant pour la proposition précise, sans exiger la connaissance infinie ni conclure qu’il faut toujours suspendre. La règle praticable est annoncée en marge mais ce seuil n’est pas élucidé.

Protocole : 3.3, 8 D4-D5, 8.1.

**P1 — voix et généralité à confronter (P06/S20, P06/S21, P08/S27, P08/S31).**

> S20 : L’idée principale est que l’erreur humaine, bien que rendue possible par la limitation de l’esprit, peut être évitée par le bon usage de la liberté.

> S21 : Malebranche attribue donc une responsabilité à celui qui dépasse ce qu’il a examiné.

> S27 : Nous sommes responsables d’une erreur lorsque nous aurions pu prendre une précaution raisonnable, vérifier ou suspendre notre affirmation, et que nous avons préféré décider sans examen.

> S31 : La thèse de Malebranche est éclairante si l’on examine ce qui dépendait effectivement du sujet ; sa formule très générale de blâme demande cette attention aux circonstances.

B présente une responsabilité de celui qui dépasse son examen ; C la conditionne aux précautions raisonnablement disponibles. L’option 2 affirme expressément que le blâme de l’auteur porte sur « toute erreur ». Il faut garder cette généralité en B si elle est attestée, puis identifier clairement la limitation circonstancielle comme la discussion de C, sans corriger silencieusement l’auteur.

Protocole : A5, 1.1, 1.2, 5.1, 6.2.

**P3 — repérage des réponses perfectible (P04/S14, P06/S20).**

> S14 : Le texte demande comment l’homme peut être responsable de ses erreurs alors que son esprit est naturellement limité.

> S20 : L’idée principale est que l’erreur humaine, bien que rendue possible par la limitation de l’esprit, peut être évitée par le bon usage de la liberté.

Le générateur privilégie paragraphSections = « Option 1 — questions officielles » pour tous les paragraphes, donc il n’écrit plus A1/B1/B3 comme titres de chacun. La correspondance est conservée dans les données, mais la copie annotée gagne à exposer les repères de réponse si le mode du site l’autorise.

Protocole : 9.1, 10.2.

**Intervention proportionnée.** Conserver l’ordre A1-C2. Réparer la distinction erreur/faute d’examen ; préciser la proposition sur laquelle l’assentiment porte ; conserver la généralité exacte de B avant la discussion circonstancielle de C.

## 6. malebranche-2026-antilles-guyane — option 2

**484 mots lexicaux (497 au compteur du site), 28 phrases annotées. Priorité P1.** Le problème et la règle de jugement sont lisibles ; objection locale laissée sans réponse puis partiellement intégrée à la conclusion.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://www.education.gouv.fr/sites/default/files/document/baccalaureat-technologique-2026-philosophie-517532.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 met en tension blâme et limitation naturelle : c’est un problème précis.

**Thèse et modalités.** S03 énonce la responsabilité ; S18 conserve « toute erreur ». S28 conclut pourtant sur ce qui pouvait effectivement être examiné, formulation qui risque de rabattre la thèse sur la restriction discutée.

**Couverture.** Limitation, règle de jugement, blâme et préférence pour décider sans peine sont traités. Leur importance relative et leurs frontières exactes restent invérifiables sans l’extrait.

**Opérations et inférences.** S08 explique correctement qu’absence d’aperception n’autorise pas la négation ; S15 rend visible la prémisse de liberté de suspendre. S19-20 introduisent une difficulté sans reconstruire la réponse possible du passage.

**Exemples et distinctions.** Les distinctions savoir/jugement et ignorance/certitude sont utiles. Les cas de témoignage trompeur et d’urgence interrogent une condition précise ; il faut distinguer agir vite et affirmer avec certitude.

**Transitions.** S10 explique le connecteur « Toutefois ». S16 passe au blâme par l’évitabilité, et S21 revient à la fréquence des erreurs. Le retour après objection est clair, mais laisse l’objection ouverte.

**Conclusion.** S27-28 réunissent reconnaissance de la limite et exercice de la liberté. La fin doit attribuer distinctement la thèse de l’auteur et la réserve du commentateur.

**Fonctions et trace source.** 28 fonctions présentes, avec une citation de connecteur mais sans registre textuel complet. L’annotation de S20 promet une délimitation, pas une réponse, ce que la copie accomplit effectivement.

**Régime d’épreuve.** Option 2 technologique : développement libre et option indiquée par le générateur. Pas d’obligation de répondre séparément aux huit questions, et pas d’importation d’une dissertation en trois parties.

### Défauts ou vérifications localisés

**P1 — objection non résolue avec les ressources de l’argument (P03/S15, P04/S19, P04/S20).**

> S15 : Malebranche suppose ici que le sujet peut retenir son assentiment ; cette possibilité donne sa force à son argument sur la responsabilité.

> S19 : On peut toutefois éprouver cette affirmation : un témoignage trompeur ou une décision urgente laissent-ils toujours la possibilité de vérifier ou de suspendre ?

> S20 : Ces difficultés ne réfutent pas la distinction entre savoir et jugement ; elles demandent d’établir quelle liberté pouvait réellement s’exercer.

L’urgence peut forcer une action sans forcer à tenir une proposition pour certaine ; un témoignage trompeur peut tromper sans rendre l’assentiment irrésistible. La copie demande seulement d’« établir quelle liberté » était disponible, alors que sa propre ressource S15 est de retenir l’assentiment. Il faut répondre d’abord par cette distinction, puis conserver ce qui reste réellement contesté.

Protocole : 6.2, 8.4, 8 D4-D5.

**P1 — mélange possible entre thèse et réserve (P04/S18, P04/S20, P06/S28).**

> S18 : Sa formule demeure cependant très générale, puisqu’elle attribue une responsabilité à toute erreur.

> S20 : Ces difficultés ne réfutent pas la distinction entre savoir et jugement ; elles demandent d’établir quelle liberté pouvait réellement s’exercer.

> S28 : Il fait ainsi de la liberté de suspendre son jugement une ressource contre l’erreur ; le texte fonde la responsabilité sur ce que le sujet pouvait effectivement examiner.

Le commentaire annonce une responsabilité attribuée à toute erreur, discute la liberté réelle, puis fait dire au texte que la responsabilité porte sur ce qui pouvait « effectivement » être examiné. Sans balise de voix, cette fin peut transformer la restriction du commentateur en thèse de l’auteur. La source exacte est nécessaire pour trancher la portée originale.

Protocole : A5, 1.1, 1.2, 9 C1-C3.

**P2 — règle de jugement sous-expliquée (P03/S11, P03/S12, P03/S13).**

> S11 : Un esprit limité ne serait pas condamné à l’erreur si la liberté réglait toujours ses affirmations sur ce qui a été examiné.

> S12 : Cette règle demande de ne pas affirmer plus qu’on ne sait, plutôt que de tout connaître.

> S13 : Lorsque l’examen demeure incomplet, on peut limiter sa conclusion ou suspendre son jugement.

L’examen ne peut être complet sur une chose qui possède une infinité de rapports ; la règle doit porter sur la justification de l’affirmation précise. Les formules « ce qui a été examiné » et « examen incomplet » ne déterminent pas encore cette différence.

Protocole : 1.3, 3.3, 8 D4.

**P3 — gain final partiellement générique (P05/S25, P05/S26).**

> S25 : Refuser la règle de la vérité ne rend pas indépendant, puisqu’on se livre alors à des jugements que l’on ne maîtrise pas.

> S26 : La discipline de l’examen peut au contraire permettre à la liberté de s’exercer avec discernement.

Refuser la règle ne démontre pas par lui-même qu’on ne maîtrise plus ses jugements. Expliquer la différence entre liberté d’affirmer et assujettissement au faux rendrait le paradoxe plus précis, sans ajouter un développement doctrinal.

Protocole : 8 D4, 9.2.

**Intervention proportionnée.** Répondre à l’objection d’urgence par la différence action/assentiment ; marquer ensuite la réserve propre du commentateur ; recoller la conclusion à la modalité exacte du passage.

## 7. rawls-2025-metropole

**532 mots lexicaux (541 au compteur du site), 28 phrases annotées. Priorité P2.** Conditions matérielles des libertés clairement identifiées ; les institutions correctrices restent trop indéterminées.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://eduscol.education.gouv.fr/sites/default/files/document/25-phgeme1v1pdf-112464.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 pose un problème spécifique de valeur des droits égaux lorsque l’influence demeure inégale.

**Thèse et modalités.** S03 énonce la nécessité de mesures correctrices ; S13 distingue égalité politique et égalité de toute influence. La formule S12 « reste formelle » doit rester relative à l’efficacité d’exercice.

**Couverture.** Capacités civiques, contrôle du débat, formation des lois, compensations et hypothèse de propriété privée sont parcourus. Sans original, on ne peut vérifier les bénéficiaires précis du financement ni les dispositifs exacts.

**Opérations et inférences.** S15-19 reconstruisent une boucle ressources → débat → lois → consolidation des avantages. La dernière étape comporte une prémisse à expliciter, et non une simple conséquence automatique de toute influence.

**Exemples et distinctions.** Autorisation de parler et possibilité d’être entendu sont utilement distinguées. Le prolongement S26 porte sur une condition pertinente, mais ne remplace pas l’explication du dispositif de financement du passage.

**Transitions.** S10 passe des capacités à leur inégalité ; S21 appelle les compensations à partir du mécanisme établi. Le connecteur « Car » est effectivement interprété plutôt que seulement signalé.

**Conclusion.** S27-28 répondent et dégagent le gain matériel des libertés. Elles ne reprennent qu’implicitement la chaîne institutionnelle qui rend les corrections nécessaires.

**Fonctions et trace source.** 28 fonctions présentes ; les phrases sur les financements n’ont aucun ancrage documentaire détaillé. La mention « On peut prolonger » S26 signale correctement le changement de voix.

**Régime d’épreuve.** Voie générale : explication suivie. Ne pas réclamer toute la théorie rawlsienne pour valider ce passage, ni transformer le sujet en exposé général sur les inégalités.

### Défauts ou vérifications localisés

**P2 — mécanisme correcteur sous-expliqué (P05/S22, P05/S25).**

> S22 : Une répartition étendue des richesses réduit la concentration des moyens d’action politique ; des financements publics peuvent rendre le débat accessible à davantage de participants.

> S25 : La régularité du soutien public importe, car des capacités de participation doivent être entretenues et ne se créent pas par une aide isolée.

À qui vont les financements, pour quel moyen d’action, et comment leur régularité empêche-t-elle une dépendance aux plus riches ? La copie dit seulement « rendre le débat accessible ». Le lecteur ne peut reconstituer le dispositif précis. Ce sont des questions à résoudre sur le passage, sans inventer un mécanisme.

Protocole : 8 D1-D4, 3.1, 5.2.

**P2 — prémisse implicite à établir (P04/S18, P04/S19).**

> S18 : Il précise aussi que les plus favorisés ne s’accordent pas sur tout : leur convergence porte notamment sur la défense de leurs privilèges.

> S19 : Des intérêts particuliers peuvent ainsi orienter des règles qui s’imposeront à tous et consolider les avantages dont cette influence provient.

Le passage de la convergence sur les privilèges à leur consolidation par les lois suppose que l’influence serve effectivement ces intérêts et se traduise dans des règles. S19 l’énonce plausiblement mais ne distingue pas encore la conséquence nécessaire d’un risque institutionnel.

Protocole : 1.1, 3.3, 8 D4.

**P2 — distinction à préserver (P03/S11, P03/S12, P03/S14).**

> S11 : Quand la richesse permet de contrôler le débat, tous peuvent encore être autorisés à parler tout en disposant de possibilités très inégales d’être entendus.

> S12 : La liberté de prendre la parole reste alors formelle si les ressources économiques déterminent quelles propositions peuvent réellement être entendues.

> S14 : La valeur d’une liberté désigne ici la possibilité réelle de l’exercer utilement, et pas seulement son inscription dans la loi.

« Reste formelle » peut être compris comme « ne vaut plus rien ». La copie reconnaît pourtant une autorisation subsistante et une inégalité de capacité. Préciser que c’est la valeur effective et équitable de l’exercice qui est atteinte évite de rabattre le droit sur une apparence pure.

Protocole : 1.3, 5.1.

**P3 — prolongement à subordonner à l’explication (P05/S26).**

> S26 : On peut prolonger ce raisonnement par une condition de cohérence : un financement réservé aux opinions du pouvoir contredirait l’égalité de participation recherchée.

La condition d’un financement non réservé aux opinions du pouvoir est marquée comme prolongement et porte sur une inférence pertinente. Si la place manque, la priorité revient toutefois à l’explication du financement effectivement proposé dans le texte.

Protocole : A2, 6.2, 9.2.

**Intervention proportionnée.** Remplacer une généralité ou le prolongement facultatif par le mécanisme précis du financement attesté ; préserver la différence droit égal/valeur de son exercice ; ne pas inventer de compensation.

## 8. weil-2024-metropole

**543 mots lexicaux (556 au compteur du site), 28 phrases annotées. Priorité P2.** Distinctions utiles entre dépense, initiative et conscience ; analogie et plainte finale restent sous-expliquées.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://eduscol.education.gouv.fr/sites/default/files/document/24-phgeme1v1-0pdf-106296.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 demande comment l’effort peut étouffer pensée et attention. Le contraste a besoin de la distinction effort imposé/activité autonome, reconstruite dans le corps de la copie.

**Thèse et modalités.** S03 situe le mécanisme dans les mobiles obsédants. « Peut-être » S11 et « presque » S22 évitent de convertir les réserves citées en nécessité absolue ; leur exactitude originale reste à vérifier.

**Couverture.** Mobiles, absence de chaînes, pensée, relations et plainte sont suivis. La plainte finale n’est ni citée ni précisément ancrée, et son rôle propre reste résumé par l’horizon absent.

**Opérations et inférences.** S07-08 séparent énergie dépensée et initiative ; S15-19 séparent occupation mentale et réflexion. S10-14 doivent mieux préciser pourquoi des mobiles intérieurs sont nécessaires et pourquoi seuls ceux-là peuvent agir.

**Exemples et distinctions.** Les distinctions sont nombreuses et opérantes. L’analogie avec la pesanteur reçoit seulement une fonction d’intensité, et non l’analyse du rapport qu’elle permet de comprendre.

**Transitions.** S15 et S20 font avancer une conséquence nouvelle ; S25 annonce le temps vécu. La fonction de la plainte est annoncée, puis reformulée au lieu d’être davantage analysée.

**Conclusion.** S27-28 répondent au problème en réunissant les dimensions atteintes. Le gain n’est pas une thèse vague contre le travail, mais une manière de comprendre les conduites à partir de conditions précises.

**Fonctions et trace source.** 28 fonctions présentes ; S25-26 répètent largement une même fonction. Les citations et la plainte ne sont pas collationnées sur l’extrait.

**Régime d’épreuve.** Voie générale : parcours explicatif cohérent. Ne pas importer les thèses d’un autre extrait de Weil pour compléter les mobiles, ni imposer un nombre fixe d’unités.

### Défauts ou vérifications localisés

**P2 — inférence sous-expliquée (P03/S10, P03/S12, P03/S14).**

> S10 : Puisque la violence physique ne commande pas chaque geste, l’ouvrier doit trouver en lui-même les motifs de son obéissance.

> S12 : Or les conditions décrites ne laissent agir que la peur de la sanction, l’avidité du gain et, plus partiellement, la compétition de vitesse.

> S14 : Ces mobiles doivent devenir obsédants, car leur présence continuelle compense la faiblesse du sens que le travail offre par lui-même.

L’absence de contrainte physique immédiate ne suffit pas à expliquer la liste restreinte des mobiles ni leur caractère obsédant. La copie doit relier l’organisation de l’exécution, la dépendance matérielle et l’entretien volontaire de l’effort, avec les raisons effectivement présentes dans le passage.

Protocole : 3.3, 8 D4, 8.1.

**P2 — analogie réduite à une intensité (P05/S22).**

> S22 : La comparaison avec la pesanteur exprime la puissance du mécanisme ; « presque irrésistible » laisse néanmoins subsister une possibilité de résistance.

« Puissance du mécanisme » dit que la comparaison est forte, pas ce qu’elle fait comprendre. Il faut identifier la propriété commune à la pesanteur et à l’entraînement décrit, puis distinguer cette analogie d’une loi physique appliquée aux conduites. La réserve « presque » est déjà bien observée.

Protocole : 3.2, 8.2, 8 D5.

**P2 — sous-explication et répétition établies (P06/S25, P06/S26).**

> S25 : La plainte sur la longueur du temps condense finalement les effets précédents : elle exprime une journée sans horizon intérieur.

> S26 : Elle paraît banale à celui qui ignore cette condition, mais exprime une journée sans élan intérieur et sans horizon qui permette de la traverser.

Deux phrases emploient presque le même diagnostic de journée sans horizon. Ni les mots précis de la plainte ni l’opposition entre banalité apparente et portée de l’expérience ne sont reconstruits. Une reformulation redondante peut être remplacée par l’explication précise de la plainte.

Protocole : 8 D1-D4, 9.2.

**Intervention proportionnée.** Conserver les distinctions effort/initiative et obsession/réflexion ; remplacer la répétition finale par l’analyse des mots de la plainte, une fois la source obtenue ; préciser la relation figurée par la pesanteur.

## 9. levi-strauss-2023-metropole

**509 mots lexicaux (524 au compteur du site), 27 phrases annotées. Priorité P2.** Distinction projet/stock et polyvalence bien suivie ; certains rapports restent nommés plutôt que reconstruits.

Copie : `scripts/explication-textes-data.json`. Source indiquée : https://eduscol.education.gouv.fr/sites/default/files/document/23-phgeme1pdf-103488.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 pose précisément la diversité des réalisations avec un stock limité et non réuni pour un projet unique.

**Thèse et modalités.** S03 répond par une disponibilité pour plusieurs usages sous contraintes. S06 « en principe » évite de transformer les deux rapports en description exhaustive des pratiques professionnelles.

**Couverture.** Rapport ingénieur/bricoleur, histoire du stock, spécialisation relative et opérateur sont traités. La couverture du passage, notamment de ses derniers termes techniques, demeure documentairement indéterminée.

**Opérations et inférences.** S09-10 expliquent la compatibilité clôture/enrichissement ; S19-20 donnent les deux raisons de la spécialisation relative. Le mot opérateur et les relations concrètes/virtuelles restent décrits dans une langue très générale.

**Exemples et distinctions.** La planche réemployée sert deux distinctions réelles et n’est pas un ornement. Son statut d’exemple pédagogique du rédacteur doit être clair dans la copie nue, sans dépendre de la fonction en marge.

**Transitions.** S11 explique la diversité historique ; S16 passe de la diversité du stock à celle des usages. S22 « rassemble » est plus récapitulatif qu’explicatif : quel rapport exactement est transformé ?

**Conclusion.** S26 répond et S27 formule un gain sur l’invention sous contrainte. Le « peut devenir » conserve la prudence : il ne démontre pas que toute contrainte favorise la créativité.

**Fonctions et trace source.** 27 fonctions présentes ; un mot cité (« opérateur ») ne fournit pas à lui seul la trace des relations finales. Les citations et les limites de l’extrait doivent être contrôlées.

**Régime d’épreuve.** Voie générale : explication suivie ; comparaison avec l’ingénieur rattachée au passage et non exposé général sur la technique.

### Défauts ou vérifications localisés

**P2 — statut d’exemple non indiqué dans la copie nue (P03/S15, P04/S21).**

> S15 : L’exemple d’une planche conservée après un démontage le montre : elle n’a pas été acquise pour le meuble futur, mais peut entrer dans sa construction.

> S21 : Une planche possède déjà une forme et une résistance exploitables ; elle peut devenir une étagère ou un renfort, mais pas remplir indifféremment toute fonction.

« L’exemple d’une planche » peut être lu comme l’exemple de l’auteur ; seule l’annotation dit « Proposer un exemple ». Faute de texte original, l’origine de cet exemple n’est pas certifiée. S’il est du rédacteur, une marque brève telle qu’« imaginons » doit suffire à l’indiquer ; ne pas attribuer de cas au passage sans vérification.

Protocole : A5, 8.2, 9.2.

**P2 — opération finale sous-expliquée (P05/S22, P05/S23, P05/S24).**

> S22 : La dernière phrase rassemble ces deux dimensions : chaque élément est un « opérateur », c’est-à-dire un moyen d’effectuer certaines transformations.

> S23 : Les relations concrètes correspondent à ce qu’il est et à ce qu’il a déjà fait ; les relations virtuelles aux rapports nouveaux que ses propriétés permettent d’envisager.

> S24 : Un élément rend donc certaines transformations possibles, à l’intérieur d’une famille d’usages que ses caractéristiques limitent.

Dire opérateur = moyen d’effectuer des transformations renomme l’opération sans montrer quel rapport d’un objet à un autre devient possible. L’exemple de la planche pourrait ici servir à distinguer une relation déjà effective d’une relation possible, plutôt que laisser ces deux termes abstraits.

Protocole : 1.3, 8 D2-D5, 8.1.

**P3 — portée d’interprétation à vérifier (P02/S09, P02/S10).**

> S09 : Cette limite vaut pour le stock disponible à un moment donné : le texte précise ensuite qu’il peut être enrichi.

> S10 : La clôture n’interdit donc pas l’histoire du stock ; elle empêche d’en disposer comme d’un équipement intégralement renouvelé à chaque projet.

La clôture est rapportée à un moment du stock et à l’absence de renouvellement complet par projet. Cette interprétation est intelligible, mais le découpage temporel de S09 est une prémisse ajoutée qui doit être distinguée de la formulation exacte de l’extrait.

Protocole : 3.3, 3.4, 8 D1.

**Intervention proportionnée.** Clarifier le statut de l’exemple de la planche ; faire effectuer à cet exemple le passage relation actuelle/relation possible ; vérifier le sens exact de la clôture plutôt que l’étendre de mémoire.

## 10. platon-2025-polynesie

**286 mots lexicaux (293 au compteur du site), 19 phrases annotées. Priorité P1.** Révision interne nécessaire : ordre annoncé inexact et plusieurs opérations décisives réduites à des assertions.

Copie : `philosophie-explication-platon-2025-polynesie.html`. Source indiquée : https://eduscol.education.gouv.fr/sites/default/files/document/25-phgepo1-a16pdf-125396.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 pose une question spécifique sur la partialité envers soi et les critères du juste et du vrai. La difficulté est réelle à l’échelle de la copie ; son origine précise dans le passage n’est pas vérifiable.

**Thèse et modalités.** S03 regroupe aveuglement moral et intellectuel, puis ne tire qu’une préférence pour la justice. S08 « toute valeur » et S14 « tout savoir » élargissent la portée sans justification textuelle disponible.

**Couverture.** La copie nomme indulgence, norme impersonnelle, ignorance, compétence et honte. Nommer ces points ne suffit pas à attester leur couverture : le mécanisme initial et les conséquences intellectuelles sont peu reconstruits.

**Opérations et inférences.** S06 présente l’aveuglement comme explication de lui-même ; S10-12 déclinent la même norme sous trois formes. S14-17 passent du croire-savoir à la faute et au remède sans assez établir les étapes.

**Exemples et distinctions.** La distinction aimer soi/aimer excessivement soi est posée S08 ; celle entre identité de l’agent et valeur de l’action est intelligible S10-11. Aucun exemple extérieur n’est obligatoire ; le problème est l’absence de test précis de ces distinctions.

**Transitions.** Défaut établi : S04 annonce indulgence → conséquences intellectuelles → remède, alors que S09-12 présentent le remède moral avant S13-15. S13 annonce une extension au savoir mais ne justifie pas sa nécessité.

**Conclusion.** S18-19 répondent et réunissent deux remèdes. Elles ne résument pas la chaîne des opérations ni le rôle de la honte ; « accepter l’aide » ne précise pas encore ce que demande l’action de chercher quelqu’un de meilleur.

**Fonctions et trace source.** 19 fonctions présentes. Des labels tels qu’« expliquer le mécanisme » S06 et « montrer la conséquence » S15 dépassent le travail réellement accompli. Aucun extrait original disponible pour vérifier « mal » ou les quantificateurs.

**Régime d’épreuve.** Voie générale : forme d’explication suivie, mais pas de validation globale d’excellence possible. L’écart n’est pas le nombre de mots ; c’est l’insuffisance de certains maillons et de leur attribution.

### Défauts ou vérifications localisés

**P1 — incohérence structurelle établie (P01/S04, P03/S10, P04/S13).**

> S04 : Il dénonce d’abord l’indulgence envers soi, en montre les conséquences intellectuelles, puis indique comment la combattre.

> S10 : Platon demande d’aimer le juste, que l’action juste soit la nôtre ou celle d’autrui.

> S13 : Le même aveuglement se retrouve dans le savoir : nous prenons notre ignorance pour de la sagesse.

L’annonce du mouvement ne correspond pas à l’ordre effectif de la copie : la correction morale vient avant les conséquences intellectuelles. Réparer l’annonce est possible sans connaître l’original, mais choisir l’ordre fidèle du développement exige le passage exact.

Protocole : 7 I6, 8.3, 9 C2.

**P1 — preuve comprimée en assertion (P02/S06, P02/S07, P02/S08).**

> S06 : L’amour rend aveugle à l’objet aimé : lorsqu’il se porte excessivement sur soi, il empêche de juger ses propres fautes.

> S07 : L’intérêt personnel reçoit alors plus d’estime que le vrai, le juste et le beau.

> S08 : La difficulté n’est donc pas de s’aimer, mais de faire de soi la mesure de toute valeur.

La cécité de l’amour est énoncée comme une loi puis appliquée à soi ; le lecteur n’apprend pas pourquoi l’identité de l’être aimé fausse l’évaluation d’un acte. La priorité de l’intérêt et la mesure de « toute valeur » sont ensuite affirmées. La fonction mécanisme ne remplace pas l’inférence manquante.

Protocole : 8 D2-D4, 8.1, 9.2.

**P1 — modalité et inférence sous-établies (P04/S13, P04/S14, P04/S15).**

> S13 : Le même aveuglement se retrouve dans le savoir : nous prenons notre ignorance pour de la sagesse.

> S14 : Parce que nous croyons tout savoir, nous refusons de laisser agir ceux qui sont plus compétents.

> S15 : Nous commettons alors nous-mêmes les erreurs que notre prétendue supériorité nous empêchait d’éviter.

Croire son ignorance sagesse ne signifie pas encore croire « tout » savoir. Refuser l’intervention de personnes compétentes demande de reconstruire le rapport entre préférence pour son jugement et refus de reconnaître une compétence supérieure. S15 parle seulement d’erreurs qu’on n’a pas évitées : elle ne montre pas comment le refus les produit.

Protocole : 1.1, 3.3, 8 D4, 9.2.

**P1 — remède et articulation sous-expliqués (P04/S16, P04/S17, P05/S19).**

> S16 : Platon conclut qu’il faut chercher quelqu’un de meilleur que soi, sans céder à la honte.

> S17 : Reconnaître sa limite devient ainsi une condition du progrès moral et intellectuel.

> S19 : Préférer la justice et accepter l’aide d’autrui permettent de corriger cette partialité.

Le rapport entre honte, aveu d’insuffisance et recours à quelqu’un de meilleur est annoncé, non expliqué. « Progrès moral et intellectuel » et « accepter l’aide » sont des gains proposés par la copie ; on ne peut les certifier comme la thèse ou l’issue de l’extrait sans sa fin exacte.

Protocole : A2, 5.2, 8 D2-D6, 9 C2-C3.

**Intervention proportionnée.** À source absente : corriger seulement l’annonce pour la faire correspondre à la copie existante et signaler les maillons indéterminés. À source obtenue : restituer les raisons qui relient partialité, norme impersonnelle, croire-savoir, compétence et honte. Ne pas ajouter une doctrine générale de Platon, une condamnation totale de l’amour de soi ou une thèse de progrès non attestée.

## 11. pascal-2025-asie

**282 mots lexicaux (300 au compteur du site), 18 phrases annotées. Priorité P1.** Distinction exactitude/progrès lisible ; inférence sur la conservation et statut de l’exemple à réparer.

Copie : `philosophie-explication-pascal-2025-asie.html`. Source indiquée : https://eduscol.education.gouv.fr/sites/default/files/document/25-phgeas1-a20pdf-124856.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 distingue accroissement humain et répétition animale. Il faut conserver ce problème historique et conceptuel, sans remplacer le texte par un débat contemporain d’éthologie.

**Thèse et modalités.** S03 répond par mémoire et transmission. Les modalités de progrès indéfini, de conservation et de perfection bornée sont les points sensibles ; les mots originaux ne sont pas disponibles pour en contrôler la portée.

**Couverture.** Opposition initiale, ruches, instruction naturelle, conservation personnelle et transmission sont abordées. La singularité des raisons de l’absence de progrès animal reste peu analysée.

**Opérations et inférences.** S11 fait de l’absence d’étude une raison de l’impossibilité de conserver : il manque la prémisse reliant type d’acquisition et conservation. La copie ne distingue pas nettement non-accumulation historique et impossibilité de tout acquis individuel.

**Exemples et distinctions.** Le cas de la ruche distingue précision et progrès. Sa fonction dit « preuve par l’exemple », alors qu’un cas ne suffit pas à établir une loi sur tous les animaux. On ne peut savoir sans extrait s’il illustre ou soutient une généralisation déjà posée.

**Transitions.** S09 demande une raison de la stabilité ; S13 introduit la conservation humaine. Le lien stabilité → absence de mémoire ne peut pas être seulement suggéré par la succession.

**Conclusion.** S17-18 répondent, sans attribuer un savoir effectivement infini à un humain. Néanmoins S16 laisse « infinité » presque indéfini dans la copie nue, malgré une annotation qui promet cette distinction.

**Fonctions et trace source.** 18 fonctions présentes ; plusieurs citations très brèves sont non collationnées. L’annotation de S06 sur la preuve et celle de S16 sur le savoir infini demandent un contrôle fonctionnel.

**Régime d’épreuve.** Voie générale : explication suivie, sans nécessité d’ajouter une discussion scientifique autonome. La brièveté est compatible avec la qualité si la distinction acquisition/conservation/accumulation est rendue exacte.

### Défauts ou vérifications localisés

**P1 — saut d’inférence établi (P03/S10, P03/S11).**

> S10 : La nature les instruit selon les besoins, mais le savoir reçu disparaît avec l’occasion qui l’a suscité.

> S11 : Parce qu’ils reçoivent ce savoir « sans étude », ils ne peuvent le conserver comme un acquis.

Recevoir un savoir « sans étude » n’implique pas à lui seul l’impossibilité de le conserver comme acquis. La copie peut rapporter une affirmation du passage, mais doit alors distinguer la prémisse sur le type d’instruction de la conséquence sur sa durée et expliquer le lien que Pascal propose réellement.

Protocole : 3.2, 3.3, 8 D4, 9.2.

**P1 — statut logique de l’exemple à préciser (P02/S06, P02/S07).**

> S06 : L’exemple des ruches, identiques à travers les siècles, rend sensible la régularité de l’instinct.

> S07 : La perfection de l’hexagone n’atteste donc pas un apprentissage cumulatif : la première réalisation vaut déjà la dernière.

La régularité des ruches peut rendre sensible la différence exactitude/progrès ; elle ne démontre pas à elle seule que toute faculté animale soit dépourvue de progrès. L’annotation « preuve par l’exemple » ne dit ni le niveau de généralité ni la limite de ce cas. Ne pas qualifier de preuve universelle ce que la source utiliserait comme illustration ou indice.

Protocole : 3.2, 8.2, annexe 1.

**P2 — distinction annoncée mais incomplète (P04/S14, P04/S15, P04/S16).**

> S14 : Sa mémoire garde l’expérience personnelle ; les livres lui rendent présente celle de ses prédécesseurs.

> S15 : Chaque génération peut ainsi commencer avec des connaissances qu’elle n’a pas elle-même découvertes.

> S16 : La conservation rend possible l’augmentation : c’est pourquoi Pascal associe l’humanité à « l’infinité ».

La transmission est expliquée, mais le rapport à « l’infinité » reste une association de mots. La copie nue doit distinguer un accroissement sans borne assignée de la possession d’un savoir infini déjà achevé ; la fonction en marge ne suffit pas à accomplir cette distinction.

Protocole : 1.1, 1.3, 5.1, 9.1.

**Intervention proportionnée.** Conserver le contraste exactitude/progrès ; rétablir le lien précis entre instruction naturelle, conservation et accumulation ; nommer brièvement la différence progrès indéfini/savoir infini achevé.

## 12. aristote-2025-antilles-guyane

**314 mots lexicaux (323 au compteur du site), 19 phrases annotées. Priorité P1.** Voix des adversaires bien distinguées ; crédibilité et vérité sont trop facilement confondues dans le dernier mouvement.

Copie : `philosophie-explication-aristote-2025-antilles-guyane.html`. Source indiquée : https://eduscol.education.gouv.fr/sites/default/files/document/25-phgeag1v1pdf-112467.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 vise une stratégie éducative spécifique : condamner le plaisir pour redresser l’inclination. Le problème n’est pas simplement « le plaisir est-il bon ? ».

**Thèse et modalités.** S03 condamne la généralisation éducative et S18 écarte une thèse de bien suprême. Cependant « fausseté manifeste » à la fin n’est pas démontrée par la seule inconséquence du contempteur.

**Couverture.** Importance du plaisir, voix des adversaires, stratégie de contrepoids et effet inverse sont parcourus. Le passage original n’étant pas accessible, on ne sait si d’autres propriétés ou nuances du plaisir sont omises.

**Opérations et inférences.** S14 énonce une force persuasive des faits ; S15 explique la perte de crédit ; S16 ajoute la croyance inverse « tout plaisir ». Il faut distinguer ce mécanisme d’audience d’une réfutation logique de la condamnation.

**Exemples et distinctions.** S10 distingue conviction sincère et calcul pédagogique : bonne précaution de voix. S12 attribue le milieu au résultat espéré de cette stratégie, sans importer automatiquement une théorie entière du juste milieu.

**Transitions.** S09 relie le rôle du plaisir à sa controverse ; S13 pose la question de l’efficacité de la stratégie. Le verbe « dément » risque déjà d’effacer la différence entre contradiction pratique et fausseté.

**Conclusion.** S18-19 concluent sur une éducation vraie et cohérente. « La vertu exige » énonce toutefois une norme plus large que l’échec pédagogique effectivement montré par la copie.

**Fonctions et trace source.** 19 fonctions présentes ; la fonction de S16 annonce un renversement causal dont une étape manque. Le mot cité « juste milieu » et la formule finale sont non collationnés.

**Régime d’épreuve.** Voie générale : explication du débat local, sans dissertation morale générale requise. L’enjeu de vérité ne doit pas devenir un simple jugement sur l’hypocrisie du locuteur.

### Défauts ou vérifications localisés

**P1 — distinction logique manquante (P04/S13, P04/S14, P04/S15, P05/S18).**

> S13 : Mais une stratégie éducative peut-elle réussir si elle affirme ce que l’expérience dément ?

> S14 : Aristote rappelle que, dans les actions et les sentiments, les faits persuadent davantage que les discours.

> S15 : Lorsque le contempteur du plaisir y cède lui-même, son comportement retire tout crédit à sa condamnation.

> S18 : Aristote ne fait pas du plaisir le bien suprême : il refuse d’éduquer par une fausseté manifeste.

Qu’un adversaire du plaisir y cède discrédite son discours sans démontrer que sa proposition est fausse : il peut agir contre ce qu’il croit vrai. La copie passe de « les faits persuadent » à « l’expérience dément » et « fausseté manifeste » sans distinguer vérité, crédibilité et effet pédagogique. Cette distinction est centrale à ce qu’elle prétend expliquer.

Protocole : A4, 3.2, 8 D4, 8.4.

**P1 — inférence d’audience sous-expliquée (P04/S15, P04/S16).**

> S15 : Lorsque le contempteur du plaisir y cède lui-même, son comportement retire tout crédit à sa condamnation.

> S16 : Le discours excessif produit alors l’effet inverse de celui qu’il recherchait : il fait croire que tout plaisir est désirable.

La contradiction du locuteur ne suffit pas à faire croire que tout plaisir est désirable. Il faut reconstruire comment l’auditeur généralise indûment à tous les plaisirs et perd la distinction qu’une éducation vraie devrait conserver, si telle est bien l’inférence du texte exact.

Protocole : 3.1, 8 D4-D5, 9.2.

**P2 — gain normatif plus large que la preuve interne (P05/S19).**

> S19 : La vertu exige d’accorder les paroles, les conduites et la juste appréciation des plaisirs.

L’accord des paroles, des conduites et de l’appréciation des plaisirs peut être une portée raisonnable, mais la copie vient surtout de montrer l’échec d’un discours excessif. Distinguer ce résultat de la définition générale de ce que la vertu exige, ou ancrer celle-ci dans la source.

Protocole : A2, 5.2, 9 C3.

**Intervention proportionnée.** Séparer vérité d’une proposition, crédit du locuteur et croyance de l’auditeur ; rendre explicite l’étape qui conduit à « tout plaisir » ; ne pas déduire la fausseté d’une condamnation du seul comportement de celui qui la professe.

## 13. mill-2025-metropole-secours

**317 mots lexicaux (325 au compteur du site), 18 phrases annotées. Priorité P2.** Brièveté relativement maîtrisée : deux branches et réciprocité lisibles ; contrôle textuel indispensable et un maillon pédagogique à préciser.

Copie : `philosophie-explication-mill-2025-metropole-secours.html`. Source indiquée : https://eduscol.education.gouv.fr/sites/default/files/document/25-phgeme2v1pdf-112461.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 demande pourquoi protéger une opinion même erronée ; le corps élargit bien à l’interdiction de faire taire et au tort collectif.

**Thèse et modalités.** S03 annonce les deux gains : découverte et intelligence du vrai. S14 distingue impossibilité de certifier la fausseté et S15 l’hypothèse où on pourrait la certifier. Ces modalités sont importantes et bien visibles dans la copie.

**Couverture.** Unanimité contre un, réciprocité, hypothèse de possession privée, bien commun et deux cas sont présents. Sans extrait, on ne peut contrôler les destinataires temporels ou les degrés de bénéfice éventuellement explicités par Mill.

**Opérations et inférences.** Le raisonnement par cas est effectivement reconstruit ; le second cas explique moins précisément comment la confrontation transforme la compréhension. La prémisse faillibiliste S14 est rapportée comme affirmation, non démontrée.

**Exemples et distinctions.** L’expérience de pensée initiale ne devient pas une preuve par sondage majoritaire. La distinction opinion comme possession/bien de discussion est claire ; aucun exemple extérieur décoratif n’est nécessaire.

**Transitions.** S09 demande pourquoi le dommage concerne même les adversaires ; S13 rassemble les branches. La progression ne se contente pas d’aligner les thèmes.

**Conclusion.** S17-18 répondent et dégagent le gain commun. La chaîne des cas reste implicitement contenue dans les deux fonctions de la liberté de discussion.

**Fonctions et trace source.** 18 fonctions présentes. Aucun micro-extrait direct n’ancre les unités du développement ; la reconstruction des deux branches n’est donc pas vérifiable mot à mot ici.

**Régime d’épreuve.** Voie générale : organisation suivie cohérente. Ce modèle illustre pourquoi 18 phrases ne constituent pas en elles-mêmes un défaut ni une preuve d’excellence.

### Défauts ou vérifications localisés

**P2 — mécanisme pédagogique un peu elliptique (P03/S11, P03/S12).**

> S11 : Si elle est fausse, la confrontation permet néanmoins de mieux saisir la vérité que l’on défend.

> S12 : L’erreur n’est donc pas utile parce qu’elle serait vraie, mais parce que sa réfutation donne des raisons à une conviction qui risquerait de rester passive.

« Mieux saisir » et « donne des raisons » expriment le gain mais pas exactement le geste qui le produit : la contradiction oblige à expliciter et éprouver les raisons, plutôt qu’à répéter une conviction passive. Une précision locale peut suffire ; aucun développement supplémentaire de doctrine n’est requis.

Protocole : 8 D4-D5, 8.1.

**P2 — absence d’ancrages brefs (P02/S05, P02/S07, P04/S14, P04/S16).**

> S05 : L’hypothèse d’une humanité unanime contre un seul individu rend d’abord manifeste qu’une majorité ne fonde aucun droit de censure.

> S07 : Mill envisage alors l’opinion comme une simple possession privée : le dommage semblerait varier avec le nombre de personnes lésées.

> S14 : Mill ajoute qu’on ne peut jamais être certain de la fausseté de l’opinion supprimée.

> S16 : La dernière phrase ne répète donc pas la thèse : elle ferme successivement les deux justifications possibles de la censure.

Les unités sont désignées fidèlement à l’architecture interne de la copie, mais aucun extrait bref ne permet de contrôler l’hypothèse initiale, la concession privée ou la dernière phrase. Ce défaut de trace interdit de certifier l’exactitude des modalités et de la couverture.

Protocole : 8 D1, 9.1, 1.

**P3 — prémisse à garder comme telle (P04/S14, P04/S15).**

> S14 : Mill ajoute qu’on ne peut jamais être certain de la fausseté de l’opinion supprimée.

> S15 : Et même si cette certitude était possible, la discussion resterait nécessaire pour maintenir une compréhension vivante du vrai.

L’impossibilité de certifier une opinion fausse est une affirmation rapportée ici, pas une conséquence démontrée par l’énumération des cas. La copie garde utilement une seconde branche même dans l’hypothèse adverse ; conserver clairement cette différence suffit, sans inventer une preuve absente du passage.

Protocole : 3.2, 3.3.

**Intervention proportionnée.** Conserver l’économie et le raisonnement par cas ; préciser le travail intellectuel rendu nécessaire par la contradiction ; rétablir quelques ancrages exacts après obtention du sujet.

## 14. bergson-2023-centres-etrangers

**319 mots lexicaux (334 au compteur du site), 19 phrases annotées. Priorité P1.** Réserves et voix bien signalées ; le critère d’imprévisibilité demande une distinction conceptuelle centrale.

Copie : `philosophie-explication-bergson-2023-centres-etrangers.html`. Source indiquée : https://eduscol.education.gouv.fr/sites/default/files/document/23-phgeg11-a24pdf-104043.pdf. Texte original inaccessible : fidélité, citations et couverture externe indéterminées.

**Problème.** S02 pose l’opposition mécanisme/choix. Le « si » doit rester une hypothèse de départ et ne pas faire dire à Bergson qu’il admet sans réserve le déterminisme de toute réalité.

**Thèse et modalités.** S03, S08, S12 et S19 maintiennent les réserves de démonstration : résister à la prévision ne doit toutefois pas être compris comme la définition suffisante de tout événement libre.

**Couverture.** Mécanisme, automate, droite/gauche, prédiction et Lune fictive sont pris en charge. La réserve finale est explicitement gardée ; couverture exacte et ordre des objections impossibles à collationner.

**Opérations et inférences.** La copie distingue perception immédiate et réfutation scientifique. Elle ne distingue pas assez la prévision impossible faute d’information d’une indétermination qui subsisterait même avec une connaissance suffisante.

**Exemples et distinctions.** L’horloge reçoit une propriété pertinente ; le choix est présenté comme apparence et la Lune comme fiction, non comme fait physique. Le rôle exact de « tromper » demande encore de séparer surprise du savant et initiative de l’agent.

**Transitions.** S09 oppose les voix ; S13 déplace vers la caractérisation. S14 réintroduit une réponse scientifique, sans préciser le statut et la portée du « toujours ».

**Conclusion.** S18-19 ne déclarent pas la liberté démontrée et conservent « si elle existe ». C’est une précaution importante, qui ne dispense pas de fixer le sens du critère proposé.

**Fonctions et trace source.** 19 fonctions présentes ; citations courtes non collationnées. La fonction S17 « définir » risque de donner à une formule plus d’extension que l’analogie n’en justifie.

**Régime d’épreuve.** Voie générale : explication d’une confrontation et d’une comparaison, sans obligation de résoudre personnellement le problème métaphysique de la liberté.

### Défauts ou vérifications localisés

**P1 — distinction centrale sous-expliquée (P01/S03, P04/S14, P04/S17).**

> S03 : Bergson caractérise la liberté comme ce qui résiste à la prévision scientifique, sans prétendre ici démontrer définitivement son existence.

> S14 : La science peut toujours supposer qu’une connaissance suffisante des causes permettrait de prévoir l’acte.

> S17 : Ainsi, la « faculté de tromper la science » désigne la possibilité d’un acte imprévisible, non la volonté de mentir au savant.

Un événement peut être imprévisible par manque d’information ou complexité sans être un acte libre. La copie caractérise la liberté par la résistance à la prévision, puis parle d’« un acte imprévisible », sans fixer la portée de cette imprévisibilité. Elle ne démontre pas explicitement la réciproque imprévisible → libre ; elle doit prévenir ce contresens et distinguer limites de la connaissance et initiative. La source devra déterminer la formulation exacte permise.

Protocole : 1.3, 3.2, 5.1, 8 D4-D5.

**P2 — portée de la fiction à préciser (P04/S15, P04/S16).**

> S15 : L’exemple de l’éclipse imagine au contraire une Lune capable de déjouer l’astronome : la plaisanterie révèle ce que la liberté changerait dans une prévision.

> S16 : La comparaison ne prouve pas qu’un astre choisit ; elle isole l’idée d’une initiative qui échappe au calcul.

La Lune qui « déjoue » un calcul ne figure pas seulement une donnée que l’astronome ignorait ; la copie lui prête une capacité d’initiative. Expliquer la différence entre calcul manqué et décision contraire à une prévision donne à la fiction son rôle exact, sans lui attribuer de preuve physique.

Protocole : 8.2, 3.2, 8 D5.

**P2 — modalité à vérifier (P04/S14).**

> S14 : La science peut toujours supposer qu’une connaissance suffisante des causes permettrait de prévoir l’acte.

« Toujours supposer » est une portée très forte attribuée à la science. Sans les mots originaux et le repérage de la voix, on ne peut savoir s’il s’agit d’une objection déterministe, d’une hypothèse ou d’une affirmation de l’auteur. Réduire l’assurance documentaire et contrôler la proposition précise.

Protocole : 1.1, 1.2, A5.

**Intervention proportionnée.** Conserver toutes les réserves déjà présentes ; préciser dans quel sens un acte échapperait en principe à la prévision et séparer ce sens d’une ignorance provisoire ; contrôler le statut de la réponse scientifique sur le passage exact.

## Ordre de travail recommandé

1. Obtenir l’extrait exact de chaque sujet, avec ses limites, son édition ou sa traduction ; le numéroter et collationner les citations existantes. Commencer par Platon, sans prétendre que le site dispose déjà de sa source. Archiver les quatorze versions initiales et garder la concordance des interventions.

2. Réparer les défauts internes certains ou marquer leur statut : ordre annoncé de Platon ; distinction vérité/crédibilité d’Aristote ; absence de prémisse de Pascal ; justification/fausseté et attribution de la réserve dans Malebranche. Pour Bergson, expliciter la distinction imprévisibilité par ignorance/initiative sans déclarer l’argument original faux.

3. Pour les autres, remplacer des répétitions ou des formulations génériques par le maillon précis : financement chez Rawls, statut de la planche et transformation chez Lévi-Strauss, plainte et pesanteur chez Weil 2024, servitude déterminée et présupposé du désir chez Weil 2026, dispositif final chez Tocqueville, causalité chez Freud, contrôle des hypothèses chez Nietzsche. Préserver l’économie de Mill tout en ancrant ses unités sur le passage.

4. Constituer fiche et registre de compréhension avant la nouvelle rédaction ; soumettre les lectures concurrentes et l’inférence la plus fragile à un auditeur distinct. Réaliser ensuite la copie nue et l’annotation complète, puis contrôler que chaque phrase annotée remplit réellement sa fonction et que la compression n’a pas supprimé une preuve.

5. Réauditer chaque copie réparée avec le texte, la fiche, le registre et la concordance ; conserver « état de travail » tant qu’un point documentaire ou central reste indéterminé. Aucune demande d’allongement automatique, aucun quota minimal et aucune note de bac ne résultent de cet audit.

## Fichiers de contrôle

La synthèse machine `audit-explications-protocole-synthese.json` contient pour chaque modèle : disponibilité de la source, deux comptages, neuf axes d’analyse, défauts avec citations exactes, exigences manquantes ou indéterminées, priorité et intervention proportionnée. `audit-explications-extraction.json` conserve le texte complet des copies et les annotations d’origine ; `audit-copie-01.txt` à `audit-copie-14.txt` permettent une lecture indépendante des interfaces. Les empreintes SHA-256 des six fichiers sources de copies figurent dans le JSON. La génération du rapport n’a écrit que dans `/workspace/francais-2026-10-27/`.
