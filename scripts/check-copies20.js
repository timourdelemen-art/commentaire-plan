#!/usr/bin/env node
/* Contrôle de traçabilité, pas correcteur philosophique ni calcul de note. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const digest = copy => crypto.createHash('sha256').update(JSON.stringify(copy)).digest('hex');
const text = value => typeof value === 'string' && value.trim().length > 0;

function check(copies, ledger, additional = {}) {
  const errors = [];
  const fail = (key, message) => errors.push(`${key}: ${message}`);
  if (ledger?.version !== 1 || !ledger.copies) return ['Registre de comparaison absent ou version inconnue.'];
  for (const [key, copy] of Object.entries(copies)) {
    const record = ledger.copies[key];
    if (!record) { fail(key, 'dossier de comparaison absent'); continue; }
    if (record.copySha256 !== digest(copy)) fail(key, 'dossier périmé : la copie a changé depuis la comparaison');
    if (!text(record.subject)) fail(key, 'sujet absent');
    if (!Array.isArray(record.requirements) || record.requirements.length !== 2 || !record.requirements.every(text)) fail(key, 'deux exigences explicites attendues');
    const candidates = record.candidates || [];
    if (candidates.length < 3) fail(key, 'une proposition et deux concurrentes argumentées attendues');
    if (new Set(candidates.map(c => c.id)).size !== candidates.length) fail(key, 'identifiants des pistes dupliqués');
    if (new Set(candidates.map(c => c.proposal)).size !== candidates.length) fail(key, 'propositions dupliquées');
    for (const c of candidates) {
      for (const field of ['id', 'proposal', 'cost', 'remainingProblem']) if (!text(c[field])) fail(key, `${field} absent pour une piste`);
      if (!Array.isArray(c.preserves) || !c.preserves.length || !c.preserves.every(text)) fail(key, 'gain de la piste absent');
    }
    const chosen = candidates.find(c => c.id === record.selected);
    if (!chosen) fail(key, 'choix absent des pistes');
    else if (!record.requirements?.every(r => chosen.preserves?.includes(r))) fail(key, 'le choix ne documente pas les deux exigences');
    for (const field of ['comparison', 'strongestObjection', 'responseToObjection', 'residual', 'conclusionQuestion']) if (!text(record[field])) fail(key, `${field} absent`);
    if (!text(record.scene?.analysis) || !text(record.scene?.source) || !text(record.scene?.review)) fail(key, 'examen de scène incomplet');
    if (!['propose', 'relu'].includes(record.review?.status) || !text(record.review?.independentReview)) fail(key, 'statut de relecture absent');
    if (record.review?.status === 'relu' && (!text(record.review.reviewer) || !text(record.review.reviewedAt))) fail(key, 'relecture déclarée sans auteur ni date');
    const iii = copy.find(([h]) => h.startsWith('III.'))?.[1] || [];
    const conclusion = copy.find(([h]) => h === 'CONCLUSION')?.[1] || [];
    // Nouveaux devoirs V7.4 : un reste intrinsèque ouvre la conclusion,
    // sans devenir une pseudo-quatrième démonstration en III.3.
    // Les devoirs antérieurs gardent temporairement leur contrat de compatibilité.
    const remainderAtConclusionOnly = record.protocol?.remainderPlacement === 'conclusion-only';
    if (remainderAtConclusionOnly) {
      if (iii.some(([, f]) => /reste/i.test(f))) fail(key, 'reste parasite inséré dans la troisième partie');
      if (record.residual !== record.conclusionQuestion) fail(key, 'reste final incohérent avec la question de conclusion');
      if (iii.some(([t]) => t === record.residual)) fail(key, 'question finale répétée dans III.3');
    } else if (!iii.some(([t, f]) => f.startsWith('III.3') && /reste/i.test(f) && t === record.residual)) {
      fail(key, 'reste absent de III.3 ou désaccord avec le dossier (format historique)');
    }
    if (!iii.some(([t]) => t === chosen?.proposal)) fail(key, 'opération retenue absente de la III');
    const last = conclusion.at(-1);
    if (!last || last[0] !== record.conclusionQuestion || !/\?$/.test(last[0])) fail(key, 'question finale absente ou désaccord avec le dossier');
    if (!last || !/reste/i.test(last[1])) fail(key, 'fonction de la question finale non identifiée');
    const words = copy.reduce((n, [, rows]) => n + rows.reduce((n, [t]) => n + t.trim().split(/\s+/u).length, 0), 0);
    if (record.economy?.words !== words || !text(record.economy?.principle)) fail(key, 'longueur ou principe de réduction périmé');
    if (additional[key] && (record.subject !== additional[key].title || record.subjectVerification?.title !== additional[key].title || record.subjectVerification?.code !== additional[key].code)) fail(key, 'nouveau sujet sans libellé et code d’examen concordants');
  }
  for (const key of Object.keys(ledger.copies)) if (!copies[key]) fail(key, 'dossier sans copie');
  for (const key of Object.keys(additional)) if (!copies[key]) fail(key, 'page supplémentaire sans copie');
  return errors;
}
function assertValid(copies, ledger, additional) {
  const errors = check(copies, ledger, additional);
  if (errors.length) throw new Error('Traçabilité A20 invalide\n' + errors.join('\n'));
}
if (require.main === module) {
  const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', file), 'utf8'));
  const copies = read('copies20-data.json');
  const ledger = read('copies20-resolutions.json');
  const errors = check(copies, ledger, read('copies20-additional.json'));
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`A20 : ${Object.keys(copies).length} comparaisons cohérentes ; relecture philosophique distincte, aucune note automatique.`);
}
module.exports = { check, assertValid, digest };
