# Examen du premier échantillon Mélès — 9 octobre 2026

Source : exécution GitHub Actions n° 37947779256, artefact `echantillon-validation-interne` (240 lignes). Le tirage est reproductible par graine fixée dans `scripts/echantillon-validation-meles.py`.

## Constats réellement contrôlés

- 240 lignes, chacune tirée d'une page différente du PDF (pages 4 à 1185).
- 128 lignes contiennent un point d'interrogation ; **112 n'en contiennent pas**.
- 237 formulations distinctes à comparaison stricte après passage en minuscules ; les répétitions ne sont pas nécessairement des doublons de sujets et la différence ne démontre rien sur les ~11 000 sujets.
- Par plages de pages du PDF, sans supposer les limites exactes des sections :

| Pages | Lignes | Avec « ? » |
|---|---:|---:|
| 1–250 | 45 | 27 |
| 251–500 | 51 | 19 |
| 501–750 | 45 | 25 |
| 751–950 | 43 | 16 |
| 951–1190 | 56 | 41 |

- Exemples de **formes** observées (ne pas republier les sujets de concours sur le site) : questions interrogatives, groupes nominaux avec article défini, couples de notions reliées par « et », intitulés verbaux à l'infinitif.
- Le tirage d'une seule ligne par page exclut délibérément les passages multiligne ; ce n'est donc **pas** un échantillon de sujets indépendants, ni une mesure de précision ou de rappel.

## Décisions

1. Ne jamais filtrer les sujets par présence de « ? » : plus de 46 % des lignes de ce tirage n'en ont pas.
2. Pour constituer une vérité terrain, ouvrir le PDF et contrôler le contexte de chaque ligne ; distinguer sujet complet, fragment, titre, métadonnée et cas ambigu.
3. Préserver les structures non interrogatives de la typologie de Claude, notamment mot unique, « le X », « X et Y », « X ou Y » et citation.
4. Pour toute problématique, construire les deux réponses et leur double échec **avant** la comparaison aux figures paradoxales ; vérifier le mécanisme de résolution, son coût et son résidu.
5. L'annotation humaine indépendante, l'accord inter-annotateurs, la segmentation complète et la validation philosophique ne sont **pas** réalisés. Les exercices publics restent inchangés.

## Prochain critère de sortie

Une segmentation ne sera dite validée que lorsqu'un échantillon de référence contextualisé aura été annoté et qu'une évaluation hors échantillon documentera précision, rappel et erreurs par type de sujet. L'homologation pédagogique est une étape distincte et ultérieure.
