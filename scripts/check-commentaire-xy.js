#!/usr/bin/env node
// Contrôle des sources et des données pédagogiques après le changement X/Y.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(process.argv[2]||'.');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
function data(file,key){const c={window:{}};vm.runInNewContext(read(file),c);return c.window[key];}
const cat=data('annales/catalogue-annales.js','ANNALES_CATALOGUE');
const textes=data('commentaire-chaine-data.js','COMMENTAIRE_CHAINE').textes;
assert.equal(textes.length,4);
let longest=0;
for(const t of textes){
 assert(!t.etapes.some(e=>['attendre','pourtant'].includes(e.k)),t.id);
 for(const k of ['installe','lecture','pb'])assert.equal(t.etapes.filter(e=>e.k===k).length,1,t.id+' '+k);
 for(const e of t.etapes){
  assert.equal(e.o.filter(o=>o[1]==='ok').length,1);
  assert(e.o.every(o=>o[0]&&o[2]));
 }
 const e=t.etapes.find(e=>e.k==='lecture');const count=s=>s.split(/\s+/u).length;
 if(count(e.o.find(o=>o[1]==='ok')[0])===Math.max(...e.o.map(o=>count(o[0]))))longest++;
}
assert(longest<textes.length,'La lecture solide ne doit pas toujours être la plus longue.');
const subjects=Object.entries(cat).filter(([,v])=>v.type==='bac-commentaire');assert.equal(subjects.length,13);
for(const [id,d]of subjects){
 assert.equal(d.methodeVersion,'xy-2026-10');
 assert(d.etapes[0].titre.includes('X :'));assert(d.etapes[1].titre.includes('Y :'));assert(d.etapes[2].titre.includes('deux indices'));
 for(const e of d.etapes){
  assert(!/on pouvait attendre|le pourtant|ce qu’on pouvait attendre/iu.test(JSON.stringify(e)),id+' '+e.id);
 }
 const page=read(id+'.html');if(!page.includes('<!--etapes-sujet:start--><!--etapes-sujet:end-->'))assert(page.includes(d.etapes[1].titre.replace(/^\d+\.\s*/,'')),id);
}
for(const file of ['commentaire-chaine.js','commentaire-bac-problematique.html','commentaire-bac-methode.html','commentaire-bac-introduction.html','commentaire-pas-a-pas.html','bac-dissertation.html','bac-dissertation-methode.html','bac-dissertation-sujets.html','pot-bouille-dissertation.html']){
 assert(!/on pouvait attendre|on pourrait penser X|formule[^<\n]{0,40}pourtant/iu.test(read(file)),file);
}
assert(read('annales/entrainement-annale.js').includes('Ne jamais exiger une attente contrariée'));
assert(!read('commentaire-chaine.js').includes('commentaire-chaine-n3\';'));
assert(read('commentaire-bac-problematique.html').includes('X n’est pas forcément le début'));
console.log('X/Y : 4 textes guidés, 13 annales, méthodes et consignes de retour cohérentes.');
