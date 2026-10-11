const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {select,key}=require('../philosophie-banque.js');const data=JSON.parse(fs.readFileSync(path.join(__dirname,'philo-banque-data.json'),'utf8'));
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../philosophie-sujets-data.js'),'utf8'),c);
assert.equal(data.entries.length,15);assert.equal(new Set(data.entries.map(e=>e.id)).size,15);
for(const e of data.entries){assert(e.text===null);assert.equal(e.quotations.length,0);assert(e.explanation.length>150);assert(e.exercise.model.length>200);assert(e.locator&&e.editionYear);assert(!/20\/20|vérifiée/.test(e.exercise.model));for(const u of e.uses){assert(c.window.PHILO_SUJETS.some(s=>s.s===u.subject),e.id+': sujet inconnu');assert(u.reason&&u.limit);}}
assert.equal(select(data.entries,{author:'Platon'}).length,5);
assert.equal(select(data.entries,{author:'Aristote'}).length,6);
assert.equal(select(data.entries,{author:'Nietzsche'}).length,4);
assert.equal(select(data.entries,{query:'construire savoir'})[0].entry.id,'aristote-savoir');
assert.equal(select(data.entries,{subject:'Suffit-il d’avoir raison pour convaincre ?',function:'objection'}).length,1);
assert.equal(select(data.entries,{subject:'Suffit-il d’avoir raison pour convaincre ?',function:'raison'})[0].entry.id,'aristote-discours');
assert.equal(select(data.entries,{subject:'Sujet inventé'}).length,0);
assert.equal(select(data.entries,{argument:'bananes spatiales',function:'raison'}).length,0);
assert.equal(select(data.entries,{notion:'inconscient'}).length,0);
assert.notEqual(key('platon-persuasion',1),key('platon-persuasion',2));assert.notEqual(key('platon-persuasion',1),key('platon-recherche',1));
const pub={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../philosophie-banque-data.js'),'utf8'),pub);assert.equal(JSON.stringify(pub.window.PHILO_BANQUE),JSON.stringify(data));
console.log('Banque : 15 fiches, raccords aux sujets, fonctions distinctes, absence de faux rapprochement, clés isolées et données fraîches OK.');
