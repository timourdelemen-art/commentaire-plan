#!/usr/bin/env node
/*
  Prépare la couche matrices philosophiques à partir de data/philosophie-matrices.json.
  Cette première étape valide la présence de données structurées avant raccord aux pages.
*/
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const source = path.join(ROOT, 'data', 'philosophie-matrices.json');

if (!fs.existsSync(source)) throw new Error('Base matrices absente');
const data = JSON.parse(fs.readFileSync(source, 'utf8'));

if (!Array.isArray(data.matrices) || !data.matrices.length) {
  throw new Error('Aucune matrice philosophique');
}

for (const m of data.matrices) {
  if (!m.id || !m.titre || !m.structure) {
    throw new Error(`Matrice incomplète : ${JSON.stringify(m)}`);
  }
}

console.log(`Matrices philosophie validées : ${data.matrices.length}`);
