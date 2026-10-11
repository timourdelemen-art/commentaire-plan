'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
const {splitScenes,key,norm}=require('../philosophie-exemples.js');
const ctx={window:{}};vm.createContext(ctx);for(const n of ['philosophie-exemples-data.js','philosophie-sujets-data.js'])vm.runInContext(fs.readFileSync(n,'utf8'),ctx);
const E=ctx.window.PHILO_EXEMPLES,S=ctx.window.PHILO_SUJETS;
assert.equal(E.length,64);assert.equal(new Set(E.map(x=>x.id)).size,E.length);
assert.equal(E.filter(x=>x.citation).length,29);
const state={sujet:'',notion:'',genre:'',epoque:'',verif:false,q:''};
assert.equal(splitScenes(E,S,state).autres.length,64);
assert.equal(splitScenes(E,S,{...state,verif:true}).autres.length,29);
for(const e of E){
 assert(e.scene&&e.ref);for(const s of e.sujets)assert(S.some(x=>x.s===s.s),'Sujet absent : '+s.s);
 for(const s of e.partie?.pour||[])assert(S.some(x=>x.s===s),'Sujet d’appoint absent : '+s);
 if(e.source)assert(/^https:\/\//.test(e.source.url));
 if(e.citation)assert(e.citation.t&&e.citation.verif.url&&e.citation.verif.date);
}
for(const s of S){
 const r=splitScenes(E,S,{...state,sujet:s.s});const ids=[...r.ouvre,...r.partie,...r.autres].map(e=>e.id);
 assert.equal(new Set(ids).size,ids.length,'Groupes qui se recouvrent');
 assert(r.ouvre.every(e=>e.sujets.some(x=>x.s===s.s)));
 assert(r.partie.every(e=>e.partie.pour.includes(s.s)));
}
for(const id of ['bernard-foie-lave','nautilus-captivite','oppenheimer-risque-trinity','tartuffe-table','chaplin-titine']){
 const e=E.find(x=>x.id===id);assert(e.source);for(const s of e.sujets){assert(s.limite1&&s.limite2&&s.probleme);assert.notEqual(s.limite1,s.limite2);}
}
assert.equal(E.find(e=>e.id==='rhinoceros').sujets.length,0);
assert(!E.find(e=>e.id==='2001').sujets.some(s=>s.s==='La technique est-elle le propre de l’homme ?'));
assert.equal(E.find(e=>e.id==='fete-etre-supreme').sujets.length,0);
assert.equal(splitScenes(E,S,{...state,q:'  CLAUDE   bernard '}).autres.length,1);
assert.equal(splitScenes(E,S,{...state,q:'no-such-work-xyz'}).autres.length,0);
assert.equal(norm('ÉTAT d’esprit'),"etat d'esprit");
assert.notEqual(key('Sujet A','x','analyse'),key('Sujet B','x','analyse'));
assert.notEqual(key('s','a:b','c'),key('s','a','b:c'));
const js=fs.readFileSync('philosophie-exemples.js','utf8');
assert(js.includes('data-draft-field="emploi-citation"'));assert(js.includes('data-draft-field="argument-citation"'));
assert(!js.includes('data-feedback="on"'));
console.log('Scènes : 64 fiches, 29 citations ; sujets, groupes distincts, filtres, limites et clés de brouillon OK. Pas de test navigateur.');
