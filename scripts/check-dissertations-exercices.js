#!/usr/bin/env node
/* Contrôle des exercices afférents : chaque étape 4 doit viser la problématique de la fiche,
   et le corrigé (pb) doit la reprendre à l’identique. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { load, PROTOCOL_WORDS } = require('./dissertations-v16');
const EXO = JSON.parse(fs.readFileSync(path.join(__dirname, 'dissertations-v16-exercices.json'), 'utf8'));
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'philosophie-annales-data.js'), 'utf8'), ctx);
const subjects = ctx.window.PHILO_ANNALES_2026.flatMap(g => g.subjects).filter(x => x.type === 'dissertation');
const V = load();
const errors = [];
const fail = (id, m) => errors.push(`${id} : ${m}`);
const stop = new Set(['une', 'un', 'des', 'les', 'que', 'qui', 'est', 'sont', 'dans', 'pour', 'par', 'sur', 'avec', 'sans', 'mais', 'nous', 'leur', 'leurs', 'elle', 'elles', 'il', 'ils', 'ce', 'cette', 'ces', 'son', 'sa', 'ses', 'du', 'de', 'la', 'le', 'et', 'ou', 'en', 'au', 'aux', 'à', 'si', 'pas', 'plus', 'quand', 'comme', 'faut', 'peut', 'être', 'avoir', 'ne', 'se', 'soi', 'tout', 'tous', 'on', 'je', 'mon', 'ma', 'mes', 'autre', 'autres']);
const words = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ’']/g, ' ').split(/[^a-zàâçéèêëîïôûùüÿœæ]+/u).filter(w => w.length > 3 && !stop.has(w));
for (const x of subjects) {
  const d = V[x.id];
  if (!d) { fail(x.id, 'source V16 absente'); continue; }
  const e = EXO[x.id];
  if (!e) { fail(x.id, 'exercices absents'); continue; }
  if (e.s1.length !== 2 || e.s2.length !== 2) fail(x.id, 'étapes 1 et 2 : deux consignes attendues');
  if (x.pb !== d.fiche.problematique) fail(x.id, 'corrigé (problématique) ≠ fiche');
  const shared = words(e.s4).filter(w => words(d.fiche.problematique).includes(w));
  if (new Set(shared).size < 3) fail(x.id, `étape 4 peu reliée à la problématique (${[...new Set(shared)].join(', ') || 'aucun mot commun'})`);
  const student = [...e.s1, ...e.s2, e.s3, e.s4, e.h1, e.h2].join(' ');
  for (const w of PROTOCOL_WORDS) if (new RegExp(`(^|[^\\p{L}])${w}`, 'iu').test(student)) fail(x.id, `mot du protocole dans un exercice : « ${w} »`);
  if (/\b(I|II|III)\.\d|\bLA\b|\bLB\b|\bFA\b|\bFB\b|verrou|soupçon|cas témoin/u.test(student)) fail(x.id, 'indice de fiche dans un exercice');
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Exercices afférents : ${subjects.length} sujets ; étape 4 reliée à la problématique, corrigé identique.`);
