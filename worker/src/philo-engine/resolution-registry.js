/*
Registre des opérations résolutoires.
La troisième partie est sélectionnée selon la transformation opérée et le reste produit.
La résolution ne supprime pas la double aporie : elle la transforme.
*/

export const RESOLUTION_CRITERIA = {
  preservesBothRequirements: true,
  identifiesOperation: true,
  evaluatesCost: true,
  producesPhilosophicalRemainder: true
};

export const RESOLUTION_REGISTRY = [
  {
    id: "distinction-niveaux",
    operation: "distinction de niveaux",
    preserves: [],
    cost: null,
    remainder: null,
    status: "template"
  },
  {
    id: "deplacement-probleme",
    operation: "déplacement du problème",
    preserves: [],
    cost: null,
    remainder: null,
    status: "template"
  },
  {
    id: "processualisation",
    operation: "processualisation",
    preserves: [],
    cost: null,
    remainder: null,
    status: "template"
  }
];

export function evaluateResolution(candidate) {
  return {
    candidate,
    criteria: RESOLUTION_CRITERIA,
    message: "La meilleure résolution est celle qui produit le reste philosophique le plus fécond après conservation des deux exigences."
  };
}
