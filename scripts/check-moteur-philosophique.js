#!/usr/bin/env node
// Vérifie les liens internes du moteur, sans produire ni publier les catégories.
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'data/philosophie-matrices.json'),'utf8'));
const unique=(items,label)=>{const ids=items.map(x=>x.id);if(new Set(ids).size!==ids.length)throw Error('IDs dupliqués : '+label);return new Set(ids)};
if(!Array.isArray(data.problemes)||!Array.isArray(data.resolutions)||!Array.isArray(data.matrices))throw Error('Sections du moteur absentes');
const p=unique(data.problemes,'problemes'),r=unique(data.resolutions,'resolutions');unique(data.matrices,'matrices');
for(const m of data.matrices){if(!p.has(m.probleme)||!r.has(m.resolution))throw Error('Référence invalide : '+m.id)}
const sujet='Peut-on avoir raison contre tout le monde ?';
if(!sujet.trim())throw Error('Sujet vide');
console.log('Test moteur OK : '+data.matrices.length+' matrices, références valides ; sujet test : '+sujet);
console.log('Attention : ce test ne valide PAS la génération d’une dissertation.');
