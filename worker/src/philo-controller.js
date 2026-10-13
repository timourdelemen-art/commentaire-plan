import { createPhiloContext } from './philo-entry.js';

// Couche de contrôle du moteur philosophique.
// Elle offre un point d'appel unique avant l'intégration dans l'orchestrateur principal.
export function preparePhilosophicalGeneration(sujet) {
  return createPhiloContext(sujet);
}
