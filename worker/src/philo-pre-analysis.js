// Couche intermédiaire de raisonnement philosophique.
// Elle prépare la construction du problème avant la rédaction.

export function buildPhiloPreAnalysis(sujet) {
  return {
    sujet,
    operations: [
      "identifier les notions centrales et leur relation",
      "identifier l'opérateur du sujet (peut-on, faut-il, suffit-il, sans, pourquoi...) ",
      "faire apparaître deux exigences légitimes",
      "construire deux réponses possibles sans caricature",
      "identifier le coût interne de chaque réponse",
      "formuler la double aporie",
      "construire une problématique qui conserve les deux tensions",
      "construire trois résolutions concrètes distinctes à partir des formes opératoires disponibles, sans les transformer en recette",
      "comparer leurs présupposés, acquis, sacrifices, objections, conditions, coûts et restes sans score",
      "retenir la plus défendable pour le sujet et justifier ce choix contre sa meilleure concurrente avant de rédiger III"
    ],
    constraints: {
      noThemePlan: true,
      noArtificialSynthesis: true,
      keepResidualProblem: true,
      sentenceNecessityAudit: true
    }
  };
}
