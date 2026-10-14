import { buildPhiloGenerationContext } from './philo-dissertation-generator.js';

// Test isolé du moteur philosophique sans toucher au Worker principal.
// Objectif : vérifier que la chaîne complète produit bien les étapes attendues.

const sujet = 'Peut-on être libre sans être responsable ?';

export function testPhiloEngineCopy() {
  const result = buildPhiloGenerationContext(sujet);

  return {
    sujet,
    hasEngine: Boolean(result.moteur),
    stages: result.moteur?.stages || [],
    chain: result.chaine_generation || [],
    checks: {
      hasConcreteOpening: result.chaine_generation?.includes('construire une ouverture philosophique concrète'),
      hasDoubleAporia: result.chaine_generation?.includes('formuler deux apories reliées'),
      hasProblematic: result.chaine_generation?.includes('construire une problématique conservant la tension'),
      hasDynamicPlan: result.chaine_generation?.includes('produire un plan dynamique nécessaire'),
      hasResolution: result.chaine_generation?.includes('construire une troisième partie comme opération de transformation'),
      hasAudit: result.chaine_generation?.includes('auditer la nécessité des phrases')
    }
  };
}
