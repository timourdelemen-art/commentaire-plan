#!/usr/bin/env node
/* Contrôle de non-régression HLP, à lancer après scripts/build-hlp.js. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const files = fs.readdirSync(root).filter(n => /^hlp(?:-.*)?\.html$/.test(n));
const failures = [];
for (const name of files) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  if (/href\s*=\s*["'][^"']*sujets-corriges-bac\.fr/i.test(html))
    failures.push(name + ' : lien vers le miroir privé');
  if (/href\s*=\s*["'](?:null|undefined)["']/i.test(html))
    failures.push(name + ' : lien sans destination');
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('HLP : ' + files.length + ' pages contrôlées ; aucun lien interdit ou invalide détecté.');
}
