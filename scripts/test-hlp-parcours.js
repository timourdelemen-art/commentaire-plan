#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const bank = require('./build-hlp-parcours');
const root = path.resolve(__dirname, '..');
const decode = s => s.replace(/&(?:amp|lt|gt|quot|#39);/g, x => ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[x]));

/* Simulation du contrat DOM, sans navigateur : navigation, état et stockage.
   Ne teste pas le rendu, les événements du vrai navigateur ni son accessibilité. */
class Element {
  constructor(tag, attrs) {
    this.tag=tag; this.attrs={}; this.dataset={}; this.events={}; this.value=''; this.textContent=''; this.hidden=/\bhidden\b/.test(attrs); this.disabled=false;
    for (const m of attrs.matchAll(/([a-z][\w-]*)(?:="([^"]*)")?/g)) {
      this.attrs[m[1]]=decode(m[2]||'');
      if(m[1].startsWith('data-')) this.dataset[m[1].slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=decode(m[2]||'');
    }
    this.classes=new Set((this.attrs.class||'').split(/\s+/));
    this.classList={toggle:(c,force)=>{const on=force===undefined?!this.classes.has(c):force;if(on)this.classes.add(c);else this.classes.delete(c);return on;}};
  }
  setAttribute(k,v){this.attrs[k]=v;}
  getAttribute(k){return this.attrs[k];}
  addEventListener(k,f){this.events[k]=f;}
  click(){if(!this.disabled)this.events.click?.call(this);}
  focus(){this.focused=true;}
  scrollIntoView(){this.scrolled=true;}
  querySelectorAll(selector){return this.nodes.filter(n=>selector.split(',').some(s=>{s=s.trim();if(s[0]==='.')return n.classes.has(s.slice(1));if(s[0]==='[')return Object.hasOwn(n.attrs,s.slice(1,-1));return n.tag===s;}));}
  querySelector(selector){return this.querySelectorAll(selector)[0];}
}
function boxes(html) {
  const starts=[...html.matchAll(/<section class="exercise-wrap"[^>]*data-parcours="([^"]+)"/g)];
  return starts.map((m,i)=>{
    const box=new Element('section',`data-parcours="${m[1]}"`);
    const part=html.slice(m.index,starts[i+1]?.index||html.length);
    box.nodes=[...part.matchAll(/<(button|textarea|section|article|p|details|summary|div)\b([^>]*)>/g)].map(x=>new Element(x[1],x[2]));
    box.nodes.forEach(n=>n.nodes=box.nodes);
    return box;
  });
}
function runRuntime(html, storage, fail=false) {
  const result=boxes(html);
  const localStorage={setItem(k,v){if(fail)throw Error('Stockage refusé');storage.set(k,v);},getItem(k){if(fail)throw Error('Stockage refusé');return storage.get(k)||null;},removeItem(k){if(fail)throw Error('Stockage refusé');storage.delete(k);}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'hlp-parcours.js'),'utf8'),{document:{querySelectorAll:()=>result},localStorage,window:{confirm:()=>true}});
  return result;
}

bank.validate();
assert.equal(bank.data.subjects.length,12);
assert.equal(bank.data.subjects.filter(s=>s.level==='premiere').length,2);
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'hlp-test-'));
try {
  bank.build(tmp);
  const snapshots=new Map(fs.readdirSync(tmp).map(f=>[f,fs.readFileSync(path.join(tmp,f),'utf8')]));
  bank.build(tmp);
  for(const [f,h] of snapshots) assert.equal(fs.readFileSync(path.join(tmp,f),'utf8'),h,'Build idempotent');
  let longest=0, count=0;
  for(const s of bank.data.subjects) {
    const html=snapshots.get(bank.file(s));
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(ids.length,new Set(ids).size,'Identifiants uniques');
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.equal((html.match(/<textarea\b/g)||[]).length,(html.match(/data-feedback="off"/g)||[]).length,'Aucune correction générale sur les réponses HLP');
    const text=[...html.matchAll(/<span data-model-text>(.*?)<\/span>/gs)].map(m=>decode(m[1]));
    assert.deepEqual(text,s.responses.flatMap(r=>r.model.flatMap(p=>p.sentences.map(s=>s.text))),'Les annotations ne réécrivent pas le modèle');
    const paragraphs=[...html.matchAll(/<p class="ecrire-paragraph" data-model-paragraph>(.*?)<\/p>/gs)].map(m=>[...m[1].matchAll(/<span data-model-text>(.*?)<\/span>/gs)].map(x=>decode(x[1])).join(' '));
    assert.deepEqual(paragraphs,s.responses.flatMap(r=>r.model.map(bank.paragraphText)),'Masquer les fonctions restitue les paragraphes, citations et ponctuation');
    assert.equal((html.match(/class="ecrire-annotation"/g)||[]).length,text.length,'Chaque phrase a sa propre fonction');
    for(const r of s.responses) {
      assert(html.includes(escQuestion(r.question)),'Question officielle affichée');
      const lengths=r.choices.map(c=>c[0].split(/\s+/).length), solids=r.choices.map((c,i)=>c[1]==='Solide'?i:-1).filter(i=>i>=0);
      if(solids.some(solid=>lengths[solid]>Math.max(...lengths.filter((_,i)=>i!==solid))))longest++;
      count++;
    }
    const storage=new Map(), b=runRuntime(html,storage)[0];
    const levels=b.querySelectorAll('[data-level]'), panels=b.querySelectorAll('[data-panel]'), stages=b.querySelectorAll('[data-step]');
    levels[2].click();assert.deepEqual(panels.map(p=>p.hidden),[true,true,false]);
    levels[1].click();b.querySelector('[data-next-step]').click();assert.equal(stages[1].hidden,false);
    b.querySelectorAll('[data-goto-step]')[4].click();assert.equal(b.querySelector('[data-next-step]').disabled,true);
    b.querySelector('[data-previous-step]').click();assert.equal(stages[3].hidden,false);
    b.querySelector('[data-choice]').click();assert.match(b.querySelector('[data-choice-feedback]').textContent,/Solide|Défendable|À revoir/);
    const a=b.querySelector('[data-draft]');a.value='Mon brouillon personnel';a.events.input();
    b.querySelector('[data-restart]').click();assert.equal(a.value,'Mon brouillon personnel','Revenir au début préserve le brouillon');
    const reloaded=runRuntime(html,storage);assert.equal(reloaded[0].querySelector('[data-draft]').value,a.value);
    reloaded[1].querySelector('[data-draft]').value='Autre réponse';reloaded[1].querySelector('[data-draft]').events.input();
    reloaded[0].querySelector('[data-erase]').click();assert.equal(runRuntime(html,storage)[1].querySelector('[data-draft]').value,'Autre réponse','Effacement limité à la réponse');
    const ann=b.querySelector('[data-annotations]');ann.click();assert(b.querySelectorAll('.ecrire-copy').every(c=>c.classes.has('sans-annotations')));ann.click();assert(!b.querySelector('.ecrire-copy').classes.has('sans-annotations'));
    const unavailable=runRuntime(html,new Map(),true);assert.match(unavailable[0].querySelector('[data-save-status]').textContent,/indisponible/);
  }
  const firstSentence=bank.data.subjects[0].responses[0].model[0].sentences[0];
  const savedFunction=firstSentence.function;
  try { firstSentence.function='';assert.throws(()=>bank.validate(),/fonction/,'Une fonction manquante bloque le build'); }
  finally { firstSentence.function=savedFunction; }
  assert(longest<count/2,'La proposition solide ne doit pas être habituellement la plus longue');
  const gen=fs.readFileSync(path.join(root,'scripts/build-hlp.js'),'utf8');
  assert(!gen.includes('Puis écrivez les trois parties'));
  assert(gen.includes("require('./build-hlp-parcours').build(ROOT)"));
  console.log(`HLP : ${bank.data.subjects.length*2} modèles intacts, ${bank.data.subjects.length*10} tâches, navigation et brouillons simulés ; solide seule plus longue ${longest}/${count}. Navigateur non testé.`);
} finally { fs.rmSync(tmp,{recursive:true,force:true}); }
function escQuestion(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
