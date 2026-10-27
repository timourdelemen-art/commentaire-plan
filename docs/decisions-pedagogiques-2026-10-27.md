# Décisions pédagogiques du 27 octobre 2026

Document interne. Ces décisions reprennent les demandes du propriétaire et la grille de validation appliquée à cette livraison. Elles sont consignées ici pour ne pas modifier `AGENTS.md`, réservé par la PR ouverte nº 179. La demande explicite du propriétaire autorise l’exception décrite ci-dessous.

- **Validation didactique des exercices** (27 octobre 2026). La tâche annoncée, le support, la production attendue, l’aide, le corrigé et les critères du retour doivent correspondre. Garder les explications longues dans une aide facultative. Une analyse de réponses proposées ne se corrige pas comme un plan ou une transition entièrement rédigés ; utiliser une comparaison adaptée. Une comparaison locale d’un texte libre présente un modèle, sans simuler une évaluation automatique. Voir [la grille et la revue des consignes](docs/audit-consignes-2026-10-27.md).

- **Exception autorisée le 27 octobre 2026 — français, nouvelles œuvres au programme.** Le propriétaire demande de créer des sujets d’entraînement originaux pour les œuvres qui ne disposent pas encore d’annales de dissertation. Ils peuvent partir d’une affirmation critique exacte, dont l’auteur, la référence et le contexte ont été vérifiés. Les présenter explicitement comme des sujets d’entraînement non officiels, sans inventer de session ni de code d’examen. La question doit permettre une problématisation littéraire fondée sur l’œuvre entière ; aucun plan type ni contre-exemple artificiel n’est exigé. Cette autorisation ne transforme pas ces sujets en annales et ne dispense pas de vérifier les citations.

- **Références de production en français fournies le 27 octobre 2026.** Voir [le cadre de production](docs/cadre-production-francais-2026-2027.md) et les deux protocoles transcrits dans `docs/references/`. Ces documents sont des références fournies, dont les formulations internes ne remplacent pas automatiquement les décisions actuelles du propriétaire. Le cadre signale les points à harmoniser et distingue les choix du site des règles nationales ; ne pas transposer ces protocoles à HLP.

## Coordination

- PR nº 187 : le fichier des modèles `scripts/explication-textes-data.json` reste identique à `main`. Les neuf libellés d’exercice révisés sont dans `scripts/explication-consignes-data.json`, appliqués par le générateur, sans modifier les modèles.
- PR nº 132 : `scripts/check-browser-integration.cjs` reste identique à `main`. Les parcours étendus sont vérifiés par `scripts/check-browser-parcours.cjs`.
- PR nº 179 : aucune modification de `AGENTS.md`, du mécanisme de publication ni de la bibliothèque réservée. Les autres PR ouvertes ne sont ni fusionnées ni fermées par cette livraison.
