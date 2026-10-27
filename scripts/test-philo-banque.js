const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {select,resolveId,displayQuote,quoteNote,excerptQuote}=require('../philosophie-banque.js');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'philo-banque-data.json'),'utf8'));
assert.equal(data.version,2);assert.equal(data.entries.length,250);assert.equal(new Set(data.entries.map(e=>e.id)).size,250);
assert.equal(data.entries.reduce((n,e)=>n+e.uses.length,0),489);
assert.equal(new Set(data.entries.flatMap(e=>e.uses.map(u=>u.subject))).size,302);
const functions=['Le problème','L’affirmation','Les concepts','La raison','L’exemple','La portée'];
for(const e of data.entries){
 assert.deepEqual(e.commentary.map(c=>c.function),functions);assert(e.commentary.every(c=>c.sentence.trim().length>25));
 assert(e.commentary.reduce((n,c)=>n+c.sentence.split(/\s+/).length,0)<=145,e.id+': commentaire trop long');
 assert(e.uses.length>=1&&e.uses.length<=3);assert(!('exercise' in e));assert(!('text' in e));
 assert(!/Library|Anna[’']s|libfile_|\/workspace|OEBPS/.test(JSON.stringify(e)),'Détail privé dans les données publiques');
 for(const u of e.uses){assert(u.function&&u.reason&&u.sourceLabel);assert(/^https:\/\//.test(u.source));if(u.a20)assert(fs.existsSync(path.join(__dirname,'..',u.a20)));}
}
const additions=data.entries.filter(e=>/^AN/.test(e.code));assert.equal(additions.length,15);assert.equal(new Set(additions.map(e=>e.author)).size,13);
for(const e of additions){assert(e.uses.length>=1&&e.uses.length<=2);assert(e.quoteSource&&e.quoteSourceLabel);assert(!/à préciser/.test(e.translator||''));}
for(const author of ['Platon','Aristote','Nietzsche','Spinoza'])assert.equal(select(data.entries,{author}).length,15);
assert.equal(select(data.entries,{author:'Cioran'}).length,22);
assert.equal(select(data.entries,{author:'Kant'}).length,23);
assert.equal(select(data.entries,{author:'Baudelaire'}).length,16);
assert.equal(select(data.entries,{author:'Racine'}).length,17);
assert.equal(select(data.entries,{author:'Corneille'}).length,18);
assert.equal(select(data.entries,{author:'Bachelard'}).length,13);
assert.equal(select(data.entries,{author:'Freud'}).length,12);
assert.equal(select(data.entries,{author:'Simondon'}).length,9);
assert.equal(select(data.entries,{author:'La Fontaine'}).length,20);
for(const e of select(data.entries,{author:'La Fontaine'})){assert(e.verse);assert.equal(e.originalLanguage,'français');assert.equal(e.translator,null);assert(e.uses.length>=1&&e.uses.length<=2);assert(e.locator.includes('PDF p.'));}
for(const e of select(data.entries,{author:'Simondon'})){assert.equal(e.originalLanguage,'français');assert.equal(e.translator,null);assert(e.uses.length>=1&&e.uses.length<=2);}
assert.equal(select(data.entries,{author:'Simondon',query:'genese'}).length,4);
for(const e of select(data.entries,{author:'Freud'})){assert.equal(e.translator,e.collection?(e.work==='Au-delà du principe de plaisir'?'Jean Laplanche et J.-B. Pontalis':'Olivier Mannoni'):'Fernand Cambon');}
const child=data.entries.find(e=>e.id==='freud-parole-et-presence');assert.equal(child.speaker,'Un garçon de trois ans');assert(child.situation.includes('Freud rapporte'));
for(const e of data.entries.filter(e=>e.verse)){assert(e.quote.split('\n').length<=2);assert.equal(e.originalLanguage,'français');if(['Racine','Corneille','La Fontaine'].includes(e.author)){assert(e.speaker&&e.situation);assert(e.situation.split(/\s+/).length<=22);}}
assert.equal(select(data.entries,{author:'Racine',query:'Polynice'}).length,1);
assert.equal(select(data.entries,{author:'Baudelaire',query:'Nouvelles Fleurs du Mal'}).length,1);
assert.equal(select(data.entries,{author:'Kant',query:'raison pure'}).length,12);
assert.equal(select(data.entries,{author:'Kant',query:'faculte de juger'}).length,11);
for(const e of select(data.entries,{author:'Kant'})){assert.equal(e.translator,'Alain Renaut');assert(e.uses.length>=1&&e.uses.length<=2);}
assert.equal(select(data.entries,{author:'Cioran',query:'arbre de vie'}).length,6);
for(const e of select(data.entries,{author:'Cioran'})){assert.equal(e.originalLanguage,'français');assert.equal(e.authorRole,'Écrivain et penseur');assert.equal(e.translator,null);}
assert(select(data.entries,{query:'grammaire'}).some(e=>e.code==='N15'));
assert(select(data.entries,{query:'reminiscence'}).some(e=>e.code==='P07'));
assert.equal(select(data.entries,{query:'bananes spatiales'}).length,0);
assert.equal(select(data.entries,{subject:'Sujet inventé'}).length,0);
assert.equal(select(data.entries,{author:'Aristote',notion:'art',subject:'L’artiste sait-il ce qu’il fait ?'}).length,0);
for(const e of select(data.entries,{notion:'justice'}))assert(e.notions.includes('justice'));
for(const id of ['platon-persuasion','aristote-vertu','nietzsche-liberte'])assert(data.entries.some(e=>e.id===resolveId(data,id)));
assert.equal(resolveId(data,'platon-caverne'),null);
for(const [oldId,newId] of Object.entries(data.legacyIds))if(newId)assert(data.entries.some(e=>e.id===resolveId(data,oldId)),oldId);
const pub={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../philosophie-banque-data.js'),'utf8'),pub);assert.equal(JSON.stringify(pub.window.PHILO_BANQUE),JSON.stringify(data));
const h=fs.readFileSync(path.join(__dirname,'../philosophie-banque.html'),'utf8');assert.equal((h.match(/<details id="citation-/g)||[]).length,250);
assert(!h.includes('Quinze références'));assert(!h.includes('bank-exercise'));assert.equal((h.match(/<h3>Commentaire<\/h3>/g)||[]).length,250);
console.log('250 fiches, 489 usages, 302 sujets ; commentaires courts, filtres, anciens liens, sources et catalogue OK.');

assert.equal(select(data.entries,{author:'Rousseau'}).length,26);
for(const prefix of ['RR','RC']){const es=data.entries.filter(e=>e.code.startsWith(prefix));assert.equal(es.length,prefix==='RR'?10:15);for(const e of es){assert(e.uses.length>=1&&e.uses.length<=2);assert.equal(e.originalLanguage,'français');assert.equal(e.translator,null);assert(e.locator.includes('PDF p.'));assert(!e.verse);}}

// Editorial presentation never rewrites the verified source transcription.
const punct={id:'punct',quote:'Une phrase ;'};assert.equal(displayQuote(punct),'Une phrase.');assert.equal(punct.quote,'Une phrase ;');assert(quoteNote(punct).toLowerCase().includes('ponctuation finale adaptée'));
assert.equal(displayQuote({id:'question',quote:'Une question ?'}),'Une question ?');
const cut={id:'cut',quote:'Premier passage, deuxième passage, fin.',quoteSegments:['Premier passage,','fin.']};assert.equal(displayQuote(cut),'Premier passage, […] fin.');assert(quoteNote(cut).includes('Extrait abrégé'));
assert.throws(()=>excerptQuote({...cut,quoteSegments:['fin.','Premier passage,']}),/différent de la source/);
assert.throws(()=>excerptQuote({...cut,quoteSegments:['Une paraphrase']}),/différent de la source/);
for(const e of data.entries){assert(/[.!?…]$/.test(displayQuote(e)),e.id);if(displayQuote(e)!==e.quote)assert(quoteNote(e),e.id);}
