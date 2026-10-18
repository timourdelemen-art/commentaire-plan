# Audit conceptuel et résolutoire — protocole (18 octobre 2026)

## Source et précaution
Pierre Dulau, Guillaume Morano, Martin Steffens (dir.), *Dictionnaire paradoxal de la philosophie*, Cerf, 2022, préfaces, PDF transmis par le propriétaire, pages 14–42. Le dictionnaire défend une perspective philosophique déterminée : son analyse n'est pas un critère officiel du baccalauréat. Ne pas plaquer sa dialectique sur un texte d'auteur.

## Taxonomie exacte
La préface 2 (pages 34–39) énumère huit **familles** : duplication ontologique ; abolition (partielle ou totale, deux sous-types) ; processualisation ; inversion du rapport d'indexation ; métamorphose ; déplacement ; suspension épistémique ; consentement. Le document de méthode actuel évoque « sept opérations » : corriger cette approximation. Certaines familles se combinent (ex. Épicure : déplacement et inversion ; Hegel : processualisation et métamorphose).

## Principe de choix
La préface 1 (pages 27–28) privilégie une élucidation qui ne retranche pas les déterminations initiales et n'en ajoute pas arbitrairement. La préface 2 (pages 39–42) souligne que toute résolution laisse un « irrésolu résiduel » ; le critère est **local** et oppose parfois complétude et économie. Ne jamais prétendre mesurer numériquement une vérité philosophique.

### Contrôle comparatif pour chaque dissertation
1. Transcrire exactement le sujet, les deux exigences en tension et la limite de I et II.
2. Identifier la matrice effectivement accomplie en III (et non celle annoncée).
3. Construire deux contre-propositions sérieuses, distinctes, chacune justifiée par le sujet.
4. Pour les trois : noter (a) ce qui est conservé, (b) ce qui est supprimé, (c) les hypothèses nouvelles, (d) le mécanisme qui permet l'opération, (e) l'objection résiduelle.
5. Écarter toute solution qui élude une exigence sans le justifier. Comparer les survivantes : meilleure conservation au moindre coût, objection résiduelle la moins destructrice. Accepter les ex aequo argumentés.
6. Vérifier que III.3 nomme le vrai reste et que la conclusion le reproblématise **sans ajouter une nouvelle thèse**.
7. Ne modifier la copie qu'après cette comparaison et une relecture de l'enchaînement phrase par phrase.

### Contrôle conceptuel pour chaque explication
- Relever les notions déterminantes du texte original.
- Vérifier distinction des concepts voisins et attribution exacte des thèses à l'auteur.
- Chaque inférence de la copie doit être justifiée par une formulation ou un argument du passage.
- Distinguer explicitation légitime et surinterprétation. Le dictionnaire sert d'outil de vigilance, non d'autorité pour corriger l'auteur.
- Contrôler citation, progression des mouvements, transitions, fonction de chaque phrase, sobriété.
- Ne pas ajouter une troisième partie résolutoire à une explication dont le texte n'en comporte pas.

## Échantillon de vérification — non exhaustif
**Dissertation** : `philosophie-copie-20-s-engager-liberte.html` (« S'engager, est-ce renoncer à sa liberté ? »). III opère une **processualisation** : l'engagement est fidélité renouvelée. Gain : maintient le choix et la durée. Coût : présuppose que la promesse demeure librement réappropriable, même lorsque la personne change. Le reste affiché (le refus d'Antigone est déjà engagement) ne teste pas directement ce coût : **révision de la conclusion recommandée**, après comparaison avec inversion d'indexation (la promesse produit une identité durable) et distinction des plans (liberté d'initier / autonomie dans la fidélité). Pas de verdict « meilleure matrice » sans ce test.
**Explication** : `philosophie-explication-nietzsche-2026-metropole.html`. Le passage annoté distingue hypothèse, conviction et preuve, et indique que la science ne tranche pas à elle seule le juste : bonne vigilance conceptuelle visible. Vérification mot à mot contre le sujet officiel encore à faire ; aucun label « audit complet » n'est justifié.

## Exercice à clic : spécification
Trois solutions de qualité comparable ; l'élève choisit d'abord **ce que chaque solution sauve**, puis **ce qu'elle sacrifie**, puis **son reste** ; la comparaison s'affiche après la tentative. L'écran final demande quelle objection atteint le cœur de la solution, puis justifie une sélection ou une égalité. Les scores, s'ils sont utilisés, sont des aides à la discussion et non des notes de vérité. Exemple test : causalité (Hume / rationalisme / Kant), avec vigilance sur la distinction entre nécessité, succession et conditions transcendantales.

## État
Audit théorique et deux cas de reconnaissance effectués ; **audit exhaustif, réécriture du corpus, tests navigateur et déploiement non réalisés**. Ne pas déclarer toutes les copies validées.

## Contrôle étendu effectué le 18 octobre
- `scripts/copies20-data.json` : 20 copies, toutes avec cinq sections, 22 à 33 phrases.
- `scripts/copies20-resolutions.json` : 20 dossiers, trois propositions par sujet (60 candidates) ; les deux exigences sont listées comme préservées par la solution retenue dans les 20 cas ; les 20 restes et leurs 20 questions sont repris dans le texte des copies. **Ces concordances sont des contrôles formels, pas une validation philosophique indépendante.**
- `data/philosophie-audit-reste.json` : tableau traçable des 20 comparaisons, avec statut provisoire.
- `scripts/explication-textes-data.json` : huit sujets historiques et neuf modèles (Malebranche en comporte deux). `data/philosophie-audit-explications-concepts.json` : notions et risques conceptuels par sujet, non relecture mot à mot des annales.
- L'exercice existant `philosophie-troisieme-resolutions.js` a été enrichi d'un clic pour identifier l'objection propre à une solution parmi les trois coûts. Aucune nouvelle page n'est créée.

## Propositions éditoriales prioritaires
1. Confronter les 20 choix à deux alternatives vraiment développées et documenter les éventuels ex aequo ; les trois pistes existantes sont parfois très inégalement fortes.
2. Vérifier indépendamment les textes originaux des 8 sujets historiques, puis les 5 pages plus récentes, avant toute correction conceptuelle ; conserver les citations exactes.
3. Faire tester l'exercice à clic sur téléphone et ordinateur, avec navigation clavier, puis ajuster le retour si l'élève confond coût et reste.
4. Traiter spécialement la dissertation sur l'engagement : le reste actuel de la banque et celui de la page vitrine ne sont pas identiques ; vérifier si le dernier met réellement à l'épreuve la résolution choisie.
