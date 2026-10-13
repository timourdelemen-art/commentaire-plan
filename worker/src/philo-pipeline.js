import { buildPhiloPreAnalysis } from './philo-pre-analysis.js';

// Adaptateur entre le sujet brut et le moteur philosophique.
// Cette couche permet d'ajouter progressivement le raisonnement
// philosophique sans réécrire l'orchestrateur principal.
export function preparePhiloGeneration(sujet) {
  return {
    sujet,
    mode: 'double-aporie-resolution',
    preAnalysis: buildPhiloPreAnalysis(sujet),
    requirements: {
      preserveProblematicTension: true,
      requireResolutionOperation: true,
      keepResidualDifficulty: true,
      runSentenceAudit: true
    }
  };
}
