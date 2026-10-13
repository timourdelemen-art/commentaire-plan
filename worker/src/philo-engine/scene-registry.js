/*
Registre des scènes philosophiques.
Une scène n'est pas un exemple décoratif : elle est sélectionnée pour sa capacité
à incarner une double aporie vérifiable.

Les entrées doivent être enrichies progressivement avec des sources authentifiées.
*/

export const SCENE_CRITERIA = {
  authenticity: true,
  concreteSituation: true,
  firstRequirementVisible: true,
  secondRequirementVisible: true,
  internalDifficulty: true,
  generalizationPotential: true
};

export const SCENE_REGISTRY = [
  {
    id: "template-scene",
    sourceType: "litterature-science-histoire-art-philosophie-technique",
    source: "À compléter avec une source authentifiée",
    tensions: [],
    aporiaCompatibility: [],
    status: "structure"
  }
];

export function rankScene(scene, aporia) {
  const text = JSON.stringify(scene) + JSON.stringify(aporia);
  return {
    scene,
    score: 0,
    criteria: SCENE_CRITERIA,
    note: "Le classement réel doit dépendre de la présence des deux exigences de la double aporie."
  };
}
