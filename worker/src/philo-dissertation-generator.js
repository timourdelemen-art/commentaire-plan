import { generatePhiloContext } from './philo-runtime.js';
import { adaptPhiloContext } from './philo-generation-adapter.js';

// Orchestrateur isolé de la génération philosophique.
// Cette couche évite de charger l'orchestrateur principal avec
// la logique propre au moteur philosophique.
export function buildPhiloGenerationContext(sujet) {
  return adaptPhiloContext(generatePhiloContext(sujet));
}

export function buildPhiloGenerationInstruction(sujet) {
  const context = buildPhiloGenerationContext(sujet);
  return JSON.stringify(context);
}
