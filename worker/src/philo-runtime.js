import { preparePhilosophicalGeneration } from './philo-controller.js';

// Point d'intégration unique du moteur philosophique.
// Permet de brancher le moteur sans déplacer la logique principale du Worker.
export function generatePhiloContext(sujet) {
  return preparePhilosophicalGeneration(sujet);
}
