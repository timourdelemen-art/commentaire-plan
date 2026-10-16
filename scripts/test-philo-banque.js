const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {select,resolveId}=require('../philosophie-banque.js');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'philo-banque-data.json'),'utf8'));
assert.equal(data.version,2);assert.equal(data.entries.length,45);assert.equal(new Set(data.entries.map(e=>e.id)).size,45);
assert.equal(data.entries.reduce((n,e)=>n+e.uses.length,0),93);
assert.equal(new Set(data.entries.flatMap(e=>e.uses.map(u=>u.subject))).size,63);
const functions=['Le problème','L’affirmation','Les concepts','La raison','L’exemple','La portée'];
for(const e of data.entries){
 assert.deepEqual(e.commentary.map(c=>c.function),functions);assert(e.commentary.every(c=>c.sentence.trim().length>25));
 assert(e.commentary.reduce((n,c)=>n+c.sentence.split(/\s+/).length,0)<=145,e.id+': commentaire trop long');
 assert(e.uses.length>=1&&e.uses.length<=3);assert(!('exercise' in e));assert(!('text' in e));
 assert(!/Library|Anna[’']s|libfile_|\/workspace|OEBPS/.test(JSON.stringify(e)),'Détail privé dans les données publiques');
 for(const u of e.uses){assert(u.function&&u.reason&&u.sourceLabel);assert(/^https:\/\//.test(u.source));if(u.a20)assert(fs.existsSync(path.join(__dirname,'..',u.a20)));}
}
for(const author of ['Platon','Aristote','Nietzsche'])assert.equal(select(data.entries,{author}).length,15);
assert(select(data.entries,{query:'grammaire'}).some(e=>e.code==='N15'));
assert(select(data.entries,{query:'reminiscence'}).some(e=>e.code==='P07'));
assert.equal(select(data.entries,{query:'bananes spatiales'}).length,0);
assert.equal(select(data.entries,{subject:'Sujet inventé'}).length,0);
assert.equal(select(data.entries,{author:'Aristote',notion:'art',subject:'L’artiste sait-il ce qu’il fait ?'}).length,0);
for(const e of select(data.entries,{notion:'justice'}))assert(e.notions.includes('justice'));
for(const id of ['platon-persuasion','aristote-vertu','nietzsche-liberte'])assert(data.entries.some(e=>e.id===resolveId(data,id)));
assert.equal(resolveId(data,'platon-caverne'),null);
const pub={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../philosophie-banque-data.js'),'utf8'),pub);assert.equal(JSON.stringify(pub.window.PHILO_BANQUE),JSON.stringify(data));
const h=fs.readFileSync(path.join(__dirname,'../philosophie-banque.html'),'utf8');assert.equal((h.match(/<details id="citation-/g)||[]).length,45);
assert(!h.includes('Quinze références'));assert(!h.includes('bank-exercise'));assert.equal((h.match(/<h3>Commentaire<\/h3>/g)||[]).length,45);
console.log('45 fiches, 93 usages, 63 sujets ; commentaires courts, filtres, anciens liens, sources et catalogue OK.');
