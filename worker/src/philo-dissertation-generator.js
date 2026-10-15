import { generatePhiloContext } from './philo-runtime.js';
import { adaptPhiloContext } from './philo-generation-adapter.js';
import { PHILO_GENERATION_POLICY } from './philo-generation-policy.js';
import { buildWritingRules } from './philo-engine/writing-engine.js';

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
    politique_dissertation: PHILO_GENERATION_POLICY,
    redaction: buildWritingRules(sujet),
    chaine_generation: [
      'analyser le sujet et construire la double aporie avant toute situation',
      'imaginer et comparer trois situations fictives de structures distinctes',
      'choisir la situation la plus féconde au regard des critères',
      'développer la situation comme expérience de pensée ou cas fictif',
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
