import { preparePhiloGeneration } from './philo-pipeline.js';
import { PHILO_GENERATION_POLICY } from './philo-generation-policy.js';

// Orchestrateur philosophique central.
// Il rassemble les couches de préparation sans remplacer le Worker principal.
export function buildPhiloEngine(sujet) {
  return {
    mode: 'double-aporie-resolution',
    subject: sujet,
    context: preparePhiloGeneration(sujet),
    policy: PHILO_GENERATION_POLICY,
    stages: [
      'analyse-du-sujet',
      'double-aporie',
      'problematique',
      'resolution',
      'redaction',
      'audit'
    ]
  };
}
