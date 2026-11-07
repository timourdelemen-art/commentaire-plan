#!/usr/bin/env node
/* Régénère copies20-data.json et copies20-resolutions.json depuis les sources V16 (scripts/dissertations-v16/).
   Usage : node scripts/build-copies20-v16.js (écrit les deux fichiers, puis lance check-copies20). */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { load, derive } = require('./dissertations-v16');
const { check, digest } = require('./check-copies20');

const SCRIPTS = __dirname;
const readJSON = f => JSON.parse(fs.readFileSync(path.join(SCRIPTS, f), 'utf8'));
const oldLedger = readJSON('copies20-resolutions.json');
const additional = readJSON('copies20-additional.json');
const sources = load();
const keys = Object.keys(readJSON('copies20-data.json'));

const copies = {}, ledger = { version: 1, copies: {} };
const sentenceWith = (copy, re) => { for (const [h, rows] of copy) for (const [t, f] of rows) if (re.test(f)) return t; return ''; };
const enonces = epreuves => {
  const parts = {};
  for (const m of String(epreuves).matchAll(/(\d)\.\s*([^:]+?)\s*:\s*([^]*?)(?=\s\d\.\s|$)/gu)) parts[m[1]] = m[3].trim();
  return parts;
};

for (const key of keys) {
  const d = sources[key];
  if (!d) throw new Error('Source V16 absente : ' + key);
  const r = derive(d);
  const copy = d.copy;
  copies[key] = copy;
  const old = oldLedger.copies[key];
  const cands = d.fiche.candidats_III;
  const ep = enonces(d.fiche.epreuves);
  const requirements = old.requirements;
  
  const iii = copy.find(([h]) => h.startsWith('III'))[1];
  const chosenSentence = (iii.find(([, f]) => /opérateur/u.test(f)) || [''])[0];
  const candidates = [...cands].sort((a, b) => (b.verdict === 'retenue') - (a.verdict === 'retenue')).map(c => {
    const retained = c.verdict === 'retenue';
    return {
      id: c.id,
      proposal: retained ? chosenSentence : c.proposition,
      cost: c.raison,
      remainingProblem: retained ? r.finalQ : c.raison,
      preserves: retained ? [...requirements] : [c.raison],
    };
  });
  const chosen = candidates.find(c => c.id === 'retenue');
  const others = cands.filter(c => c.verdict !== 'retenue');
  const sceneSource = (copy[0][1].find(([, f]) => /scène/.test(f)) || [''])[0];
  const words = copy.reduce((n, [, rows]) => n + rows.reduce((m, [t]) => m + t.trim().split(/\s+/u).length, 0), 0);
  ledger.copies[key] = {
    subject: d.subject,
    ...(old.subjectVerification ? { subjectVerification: old.subjectVerification } : {}),
    requirements,
    scene: { source: sceneSource, analysis: d.fiche.scene, review: 'Scène reprise de la copie V16 ; vérifier les dates et les chiffres avant publication.' },
    candidates,
    selected: 'retenue',
    comparison: `Retenue : ${cands.find(c => c.verdict === 'retenue').raison} Écartées ou dominées : ${others.map(c => c.raison).join(' ')}`,
    strongestObjection: ep['1'] || '',
    responseToObjection: ep['2'] || '',
    residual: r.reste,
    conclusionQuestion: r.finalQ,
    economy: { words, principle: 'Protocole V16.1-exp : phrases de la copie sans répétition ; la justification nécessaire est gardée, le superflu retiré.' },
    review: { author: 'Protocole V16.1-exp (rédaction assistée) ; relecture à effectuer', status: 'propose', independentReview: 'Relecture philosophique indépendante à effectuer avant publication ; la traçabilité ne certifie ni la meilleure solution ni une note.' },
    copySha256: digest(copy),
    protocol: 'V16.1-exp',
  };
}
fs.writeFileSync(path.join(SCRIPTS, 'copies20-data.json'), JSON.stringify(copies, null, 1) + '\n');
fs.writeFileSync(path.join(SCRIPTS, 'copies20-resolutions.json'), JSON.stringify(ledger, null, 1) + '\n');
const errors = check(copies, ledger, additional);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Copies V16 régénérées : ${keys.length} ; traçabilité cohérente.`);
