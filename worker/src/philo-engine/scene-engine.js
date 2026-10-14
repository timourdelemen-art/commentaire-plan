import { rankScene, SCENE_REGISTRY } from './scene-registry.js';

export const OPENING_SCENE_UNAVAILABLE_CODE = 'OPENING_SCENE_UNAVAILABLE';
export const OPENING_SCENE_UNAVAILABLE_MESSAGE =
  'Aucune scène d’ouverture ne possède actuellement de provenance, de fidélité narrative et de raccord philosophique vérifiés.';

function sceneForGeneration(ranked) {
  const { scene, link, score } = ranked;
  return {
    id: scene.id,
    oeuvre: scene.oeuvre,
    auteur: scene.auteur,
    reference: scene.ref,
    description: scene.scene,
    source: scene.audit.source_narrative,
    sujet: {
      formulation: link.s,
      premiereReponse: link.oui,
      difficultePremiereReponse: link.limite1,
      reponseContraire: link.non,
      difficulteReponseContraire: link.limite2,
      tension: link.aporie,
      problematiqueCandidate: link.probleme
    },
    score
  };
}

export function selectOpeningScene(subject, aporia, candidates = SCENE_REGISTRY) {
  const context = aporia && typeof aporia === 'object'
    ? { ...aporia, subject }
    : { subject };
  const ranked = candidates
    .map((scene) => rankScene(scene, context))
    .filter((entry) => entry.admissible)
    .sort((a, b) => b.score - a.score || a.scene.id.localeCompare(b.scene.id));

  if (ranked.length === 0) {
    return {
      status: 'unavailable',
      subject,
      scene: null,
      reason: OPENING_SCENE_UNAVAILABLE_MESSAGE,
      candidatesEvaluated: candidates.length
    };
  }

  return {
    status: 'selected',
    subject,
    scene: sceneForGeneration(ranked[0]),
    candidatesEvaluated: candidates.length,
    admissibleCandidates: ranked.length
  };
}

export function createOpeningSceneUnavailableError(discovery = null) {
  const error = new Error(OPENING_SCENE_UNAVAILABLE_MESSAGE);
  error.code = OPENING_SCENE_UNAVAILABLE_CODE;
  error.discovery = discovery;
  return error;
}
