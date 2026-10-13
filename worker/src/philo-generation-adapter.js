// Adaptateur entre le moteur philosophique interne et le prompt final.
// Ne transmet pas toute l'implémentation du moteur : il extrait uniquement
// les contraintes utiles à la rédaction.

export function adaptPhiloContext(engineContext) {
  if (!engineContext || typeof engineContext !== 'object') {
    return {
      mode: 'double-aporie-resolution',
      constraints: []
    };
  }

  return {
    mode: engineContext.mode,
    sujet: engineContext.subject,
    preparation: engineContext.context?.preAnalysis || null,
    stages: engineContext.stages || [],
    consignes_actives: [
      'conserver la tension entre les deux exigences du sujet',
      'faire apparaître le coût interne de chaque réponse',
      'construire une résolution qui transforme le problème sans compromis artificiel',
      'conserver une difficulté résiduelle après la résolution'
    ]
  };
}
