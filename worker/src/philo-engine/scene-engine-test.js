import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { buildPhiloGenerationContext } from '../philo-dissertation-generator.js';
import {
  rankScene,
  SCENE_REGISTRY
} from './scene-registry.js';
import { selectOpeningScene } from './scene-engine.js';

const subject = 'Peut-on être libre sans être responsable ?';

function reviewedScene(id, scores) {
  const description = 'Une situation précise présente les deux réponses et leurs coûts.';
  const descriptionHash = createHash('sha256').update(description).digest('hex');
  const assessment = Object.fromEntries(
    Object.entries(scores).map(([dimension, score]) => [
      dimension,
      { score, rationale: `Justification contrôlée pour ${dimension}.` }
    ])
  );
  const scene = {
    id,
    oeuvre: `Œuvre ${id}`,
    auteur: 'Auteur vérifié',
    ref: 'Acte I, scène 1',
    scene: description,
    scene_description_sha256: descriptionHash,
    audit: {
      source_narrative: {
        url: 'https://example.org/edition',
        label: 'Édition consultée',
        portee: 'Acte I, scène 1',
        sha256_source: 'a'.repeat(64),
        verified_at: '2026-10-14'
      },
      statut_narratif: 'passage_consulte',
      description_fidelity_verified: true,
      verified_scene_description_sha256: descriptionHash,
      homologation_ouverture: true
    },
    sujets: [{
      s: subject,
      oui: 'Première réponse défendable.',
      non: 'Réponse contraire défendable.',
      limite1: 'Difficulté interne de la première réponse.',
      limite2: 'Difficulté interne de la réponse contraire.',
      aporie: 'Les deux réponses rencontrent une difficulté propre.',
      probleme: 'Quelle réponse peut préserver les deux exigences ?',
      audit: {
        deux_limites_explicites: true,
        validation_independante: true,
        assessment: {
          reviewer: 'relecture éditoriale',
          reviewed_at: '2026-10-14',
          ...assessment
        }
      }
    }]
  };
  return scene;
}

const lowerRanked = reviewedScene('scene-b', {
  concreteFit: 3,
  aestheticPower: 3,
  firstResponseAndDifficulty: 3,
  contraryResponseAndDifficulty: 3,
  generalization: 3
});
const higherRanked = reviewedScene('scene-a', {
  concreteFit: 4,
  aestheticPower: 4,
  firstResponseAndDifficulty: 5,
  contraryResponseAndDifficulty: 4,
  generalization: 5
});
const highScoreWithoutAuthenticity = structuredClone(higherRanked);
highScoreWithoutAuthenticity.id = 'unauthenticated';
delete highScoreWithoutAuthenticity.audit.source_narrative.sha256_source;
const weakFirstResponse = reviewedScene('weak-first-response', {
  concreteFit: 5,
  aestheticPower: 5,
  firstResponseAndDifficulty: 2,
  contraryResponseAndDifficulty: 5,
  generalization: 5
});
const staleDescription = structuredClone(higherRanked);
staleDescription.scene += ' Description modifiée après la relecture.';
staleDescription.scene_description_sha256 = createHash('sha256')
  .update(staleDescription.scene)
  .digest('hex');

assert.equal(SCENE_REGISTRY.length, 6);
assert.equal(SCENE_REGISTRY.every((scene) =>
  !rankScene(scene, { subject: scene.sujets[0].s }).admissible
), true);

const noScene = selectOpeningScene(subject, { subject });
assert.equal(noScene.status, 'unavailable');
assert.equal(noScene.scene, null);
assert.equal(noScene.candidatesEvaluated, 6);

const citationOnly = structuredClone(higherRanked);
citationOnly.audit = {
  citation_controlee: true,
  homologation_ouverture: false,
  raccords: []
};
citationOnly.sujets[0].audit = {
  deux_limites_explicites: true,
  validation_independante: false
};
assert.equal(rankScene(citationOnly, { subject }).admissible, false);
assert.equal(rankScene(citationOnly, { subject }).score, null);
assert.equal(rankScene(weakFirstResponse, { subject }).admissible, false);
assert.equal(rankScene(staleDescription, { subject }).admissible, false);

const selection = selectOpeningScene(subject, { subject }, [
  lowerRanked,
  highScoreWithoutAuthenticity,
  higherRanked
]);
assert.equal(selection.status, 'selected');
assert.equal(selection.scene.id, 'scene-a');
assert.equal(selection.scene.score, 22);
assert.equal(selection.scene.source.url, 'https://example.org/edition');
assert.equal(selection.scene.sujet.difficultePremiereReponse,
  'Difficulté interne de la première réponse.');
assert.equal(selection.scene.sujet.difficulteReponseContraire,
  'Difficulté interne de la réponse contraire.');
assert.equal(selection.admissibleCandidates, 2);

const wrongSubject = selectOpeningScene('Sujet sans raccord exact', { subject }, [
  higherRanked
]);
assert.equal(wrongSubject.status, 'unavailable');
assert.equal(rankScene(higherRanked, { subject }).admissible, true);

const generationContext = buildPhiloGenerationContext(subject);
assert.equal('sceneSelection' in generationContext, false);
assert.equal(generationContext.chaine_generation.some((stage) =>
  stage.includes('trois situations fictives')
), true);

console.log('OK : admissibilité documentaire et classement conservés hors du parcours de génération.');
