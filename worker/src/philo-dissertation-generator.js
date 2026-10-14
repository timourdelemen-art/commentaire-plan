import { generatePhiloContext } from './philo-runtime.js';
import { adaptPhiloContext } from './philo-generation-adapter.js';

// Orchestrateur complet de la génération philosophique.
// Il expose la chaîne du moteur plutôt qu'un simple ensemble de contraintes.
export function buildPhiloGenerationContext(sujet) {
  const engineContext = generatePhiloContext(sujet);
  const adapted = adaptPhiloContext(engineContext);

  return {
    sujet,
    moteur: {
      mode: engineContext.mode,
      stages: engineContext.stages || [
        'analyse-du-sujet',
        'double-aporie',
        'problematique',
        'resolution',
        'redaction',
        'audit'
      ]
    },
    preparation: adapted.preparation,
    consignes_actives: adapted.consignes_actives,
    chaine_generation: [
      'construire une ouverture philosophique concrète',
      'faire apparaître une situation problématique réelle',
      'formuler deux apories reliées',
      'transformer la situation concrète en problème philosophique',
      'construire une problématique conservant la tension',
      'produire un plan dynamique nécessaire',
      'construire une troisième partie comme opération de transformation',
      'conclure en conservant un reste problématique',
      'auditer la nécessité des phrases'
    ]
  };
}

export function buildPhiloGenerationInstruction(sujet) {
  return JSON.stringify(buildPhiloGenerationContext(sujet));
}
