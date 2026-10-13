import { buildPhiloGenerationContext } from './philo-dissertation-generator.js';

// Test d'intégration du raccord moteur philosophique -> génération dissertation.
// Ce test ne contacte pas OpenAI : il vérifie uniquement que les couches internes
// communiquent correctement avant l'injection dans le Worker principal.

const sujet = "Peut-on être libre sans être responsable ?";

const context = buildPhiloGenerationContext(sujet);

if (!context) {
  throw new Error('Le contexte philosophique n’a pas été produit.');
}

if (context.mode !== 'double-aporie-resolution') {
  throw new Error('Le moteur philosophique n’a pas fourni le mode attendu.');
}

if (!Array.isArray(context.consignes_actives)) {
  throw new Error('Les contraintes de génération sont absentes.');
}

console.log('OK : intégration moteur philosophique -> contexte de génération validée.');
