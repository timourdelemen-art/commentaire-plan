import { preparePhilosophicalGeneration } from './philo-controller.js';

// Test d'intégration minimal du moteur philosophique.
// Vérifie que les couches du moteur communiquent correctement
// avant le raccord avec generate-dissertation.

const sujet = "Peut-on être libre sans être responsable ?";

const result = preparePhilosophicalGeneration(sujet);

console.log(JSON.stringify({
  ok: Boolean(result),
  sujet: result?.sujet ?? sujet,
  mode: result?.mode ?? null,
  hasPreAnalysis: Boolean(result?.preAnalysis)
}, null, 2));
