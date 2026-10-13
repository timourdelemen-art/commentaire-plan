import { buildPhiloEngine } from './philo-engine.js';

// Point d'entrée stable du moteur philosophique.
// Permet au reste du Worker d'appeler le moteur sans dépendre
// de son organisation interne.
export function createPhiloContext(sujet) {
  return buildPhiloEngine(sujet);
}
