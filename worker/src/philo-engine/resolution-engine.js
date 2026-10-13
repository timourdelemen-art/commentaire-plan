/* Résolution : les matrices servent à comparer des opérations, pas à imposer un problème. */
export function compareResolutions(plan, aporia) {
  return {
    plan,
    aporia,
    criteria: [
      'ce que la résolution conserve des deux exigences',
      'ce qu’elle transforme',
      'son coût philosophique',
      'le reste qu’elle produit'
    ],
    status: 'comparison-required'
  };
}
