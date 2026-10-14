import SCENE_CANDIDATES from './scene-bank.json' with { type: 'json' };

export const SCENE_CRITERIA = Object.freeze({
  sourceVerified: 'source URL, precise locator, verification date and source SHA-256',
  descriptionVerified: 'scene description checked against the cited source',
  openingApproved: 'independent approval for use as an opening',
  subjectMatch: 'exact subject-specific link with both responses and their limits',
  independentAporiaReview: 'independent review of the two internal difficulties',
  comparativeAssessment: [
    'concrete fit',
    'literary, dramatic, cinematic or scientific power',
    'first response and its internal difficulty',
    'contrary response and its internal difficulty',
    'generalization to the subject'
  ]
});

export const SCENE_REGISTRY = SCENE_CANDIDATES;

const ASSESSMENT_DIMENSIONS = [
  'concreteFit',
  'aestheticPower',
  'firstResponseAndDifficulty',
  'contraryResponseAndDifficulty',
  'generalization'
];
const MIN_ASSESSMENT = 3;
const MAX_ASSESSMENT = 5;

function targetSubject(aporia) {
  if (typeof aporia === 'string') return aporia;
  return aporia?.subject ?? aporia?.sujet ?? '';
}

function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function validSource(scene) {
  const source = scene.audit?.source_narrative;
  if (!source || typeof source.url !== 'string' ||
      typeof source.label !== 'string' || !source.label.trim() ||
      typeof source.portee !== 'string' || !source.portee.trim() ||
      typeof scene.oeuvre !== 'string' || !scene.oeuvre.trim() ||
      typeof scene.auteur !== 'string' || !scene.auteur.trim() ||
      typeof scene.ref !== 'string' || !scene.ref.trim() ||
      typeof scene.scene !== 'string' || !scene.scene.trim()) return false;

  let url;
  try {
    url = new URL(source.url);
  } catch {
    return false;
  }

  return url.protocol === 'https:' &&
    typeof source.sha256_source === 'string' &&
    /^[a-f0-9]{64}$/i.test(source.sha256_source) &&
    validDate(source.verified_at) &&
    scene.audit.statut_narratif === 'passage_consulte' &&
    scene.audit.description_fidelity_verified === true &&
    /^[a-f0-9]{64}$/i.test(scene.scene_description_sha256 || '') &&
    scene.audit.verified_scene_description_sha256 === scene.scene_description_sha256;
}

function validAssessment(link) {
  const review = link.audit?.assessment;
  if (link.audit?.validation_independante !== true ||
      !review || typeof review.reviewer !== 'string' || !review.reviewer.trim() ||
      !validDate(review.reviewed_at)) return false;

  return ASSESSMENT_DIMENSIONS.every((dimension) => {
    const item = review[dimension];
    return Number.isInteger(item?.score) &&
      item.score >= MIN_ASSESSMENT &&
      item.score <= MAX_ASSESSMENT &&
      typeof item.rationale === 'string' &&
      item.rationale.trim().length > 0;
  });
}

function matchingLink(scene, subject) {
  return (scene.sujets || []).find((link) => link.s === subject);
}

export function rankScene(scene, aporia) {
  const subject = targetSubject(aporia);
  const link = matchingLink(scene, subject);
  const reasons = [];

  if (!subject || !link) reasons.push('no-exact-subject-link');
  if (!scene.audit?.homologation_ouverture) reasons.push('opening-not-approved');
  if (!validSource(scene)) reasons.push('source-or-description-not-verified');
  if (!scene.scene || typeof scene.scene !== 'string') reasons.push('scene-description-missing');

  if (link) {
    if (link.audit?.deux_limites_explicites !== true ||
        !link.oui || !link.non || !link.limite1 || !link.limite2 ||
        !link.aporie || !link.probleme) {
      reasons.push('two-defensible-responses-and-limits-not-established');
    }
    if (!validAssessment(link)) reasons.push('independent-philosophical-review-missing');
  }

  const review = link?.audit?.assessment;
  const score = reasons.length === 0
    ? ASSESSMENT_DIMENSIONS.reduce((sum, dimension) => sum + review[dimension].score, 0)
    : null;

  return {
    scene,
    subject,
    link,
    admissible: reasons.length === 0,
    score,
    reasons,
    criteria: SCENE_CRITERIA
  };
}
