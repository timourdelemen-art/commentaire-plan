#!/usr/bin/env node
const assert = require('node:assert/strict');
const { check, digest } = require('./check-copies20');
const copies = require('./copies20-data.json');
const ledger = require('./copies20-resolutions.json');
const additional = require('./copies20-additional.json');
const clone = value => structuredClone(value);
assert.deepEqual(check(copies, ledger, additional), []);
const key = Object.keys(copies)[0];
function rejects(edit, pattern, reseal = false) {
  const c = clone(copies), l = clone(ledger), a = clone(additional);
  edit(c, l, a);
  if (reseal) l.copies[key].copySha256 = digest(c[key]);
  assert(check(c, l, a).some(e => pattern.test(e)), `Modification non détectée : ${pattern}`);
}
rejects((c, l) => delete l.copies[key], /dossier.*absent/);
rejects(c => c[key][0][1][0][0] += ' texte modifié', /périmé/);
rejects((c, l) => { l.copies[key].selected = 'inconnue'; }, /choix absent/);
rejects((c, l) => { l.copies[key].candidates[0].preserves.pop(); }, /deux exigences/);
rejects((c, l) => { l.copies[key].candidates[1].cost = ''; }, /cost absent/);
rejects((c, l) => { l.copies[key].comparison = ''; }, /comparison absent/);
rejects((c, l) => { l.copies[key].strongestObjection = ''; }, /strongestObjection absent/);
rejects(c => { const iii = c[key].find(([h]) => h.startsWith('III.'))[1]; iii.pop(); }, /reste absent/, true);
rejects(c => { c[key].at(-1)[1].at(-1)[0] = 'Une ouverture sur un autre sujet ?'; }, /question finale/, true);
rejects((c, l) => { l.copies[key].review.status = 'relu'; }, /relecture déclarée/);
rejects((c, l, a) => { a['copie-inexistante'] = {title:'Inventée'}; }, /page supplémentaire/);
rejects((c, l, a) => { const k = Object.keys(a)[0]; a[k].code = 'code-inventé'; }, /code d’examen/);
console.log('Tests A20 : omissions, dossier périmé, reste, question finale, gains, relecture et sujet vérifiés.');

// Vérifier aussi les textes réellement servis et les consignes des deux correcteurs.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const renderer = require('./philo-copie20');
const htmlText = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\u00a0/g, ' ');
for (const [key, copy] of Object.entries(copies)) {
  const rendered = htmlText(renderer.section(key));
  for (const [, rows] of copy) for (const [text] of rows) assert(rendered.includes(text), `Phrase absente du rendu : ${key}`);
}
for (const [key, meta] of Object.entries(additional)) {
  const rendered = htmlText(renderer.vitrine(key, meta));
  assert(rendered.includes(meta.title));
  assert(rendered.includes(meta.code));
  assert(rendered.includes(meta.file));
  assert(!rendered.includes('undefined'));
}
const context = {window: {}};
for (const file of ['philosophie-annales-data.js', 'philosophie-notions-data.js', 'philosophie-plan-data.js']) vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
for (const group of context.window.PHILO_ANNALES_2026) for (const subject of group.subjects) if (copies[subject.id]) {
  assert(subject.conclusion.includes(ledger.copies[subject.id].conclusionQuestion));
  assert(subject.parties[2].join(' ').includes(ledger.copies[subject.id].residual));
}
for (const notion of context.window.PHILO_NOTIONS) {
  const key = 'notion-' + notion.slug;
  if (copies[key]) assert(notion.corrige.conclusion.includes(ledger.copies[key].conclusionQuestion));
}
for (const level of Object.values(context.window.PHILO_PLAN)) for (const subject of level) if (subject.copie20) {
  const final = subject.etapes.find(s => s.p === 'C');
  assert(final.o.find(o => o[1] === 'ok')[0] === ledger.copies[subject.copie20].conclusionQuestion);
  assert(!JSON.stringify(subject).includes('undefined'));
}
const policySource = fs.readFileSync(path.join(root, 'worker/src/philo-resolution-policy.js'), 'utf8');
const policy = {};
vm.runInNewContext(policySource.replace(/export const /g, 'globalThis.'), policy);
const client = fs.readFileSync(path.join(root, 'free-response.js'), 'utf8');
for (const [kind, name] of [['philo-troisieme', 'THIRD_PART_REVIEW'], ['philo-reste', 'RESIDUAL_REVIEW'], ['philo-conclusion', 'CONCLUSION_REVIEW']]) {
  const literal = client.match(new RegExp('"' + kind + '":("(?:[^"\\\\]|\\\\.)*")'));
  assert(literal, `Consigne cliente absente : ${kind}`);
  assert.equal(JSON.parse(literal[1]), policy[name]);
}
console.log('Rendus des 20 copies, nouveaux sujets, corrigés, questions finales et parité des consignes : OK.');
