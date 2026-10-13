/*
Registre des citations philosophiques.
Une citation est sélectionnée par fonction argumentative, jamais par prestige.
*/

export const CITATION_FUNCTIONS = [
  "conceptualiser",
  "construire une exigence",
  "renforcer une objection",
  "soutenir une résolution",
  "éclairer le reste"
];

export const CITATION_RULES = {
  autonomousThoughtFirst: true,
  authenticSourceRequired: true,
  decorativeCitationForbidden: true,
  explanationRequired: true
};

export const CITATION_REGISTRY = [
  {
    author: "À compléter",
    concept: "",
    operation: "",
    function: "",
    sourceVerified: false
  }
];

export function selectCitation(argument, functionNeeded) {
  return {
    argument,
    functionNeeded,
    rule: "La citation doit augmenter la précision de la pensée autonome."
  };
}
