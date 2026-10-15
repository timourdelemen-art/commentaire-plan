import { buildPhiloGenerationContext } from './philo-dissertation-generator.js';

// Test d'intégration du raccord moteur philosophique -> génération dissertation.
// Ce test ne contacte pas OpenAI : il vérifie uniquement que les couches internes
// communiquent correctement avant l'injection dans le Worker principal.

const sujet = "Peut-on être libre sans être responsable ?";

const context = buildPhiloGenerationContext(sujet);

if (!context) {
  throw new Error('Le contexte philosophique n’a pas été produit.');
}

if (context.moteur?.mode !== 'double-aporie-resolution') {
  throw new Error('Le moteur philosophique n’a pas fourni le mode attendu.');
}

if (!Array.isArray(context.consignes_actives) ||
    !Array.isArray(context.redaction?.sentenceFunctions) ||
    !context.redaction?.copy20ArgumentFunctions ||
context.redaction?.resolutionSelection?.forms?.length !== 8 ||
context.redaction?.resolutionSelection?.matrices?.length !== 4) {
  throw new Error('Les contraintes de génération sont absentes.');
}

if ('sceneSelection' in context || 'recherche_documentaire' in context ||
    !context.chaine_generation[0].includes('avant toute situation') ||
    !context.chaine_generation[1].includes('trois situations fictives')) {
  throw new Error('Le parcours actif doit construire l’aporie avant toute candidate et rester indépendant des sources documentaires.');
}

console.log('OK : intégration moteur philosophique -> contexte de génération validée.');
