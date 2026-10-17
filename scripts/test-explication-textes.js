#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const bank = require('./build-explication-textes');
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
  vm.runInNewContext(fs.readFileSync(path.join(root,'philosophie-explication.js'),'utf8'),{document:{querySelectorAll:()=>result},localStorage,window:{confirm:()=>true}});
  return result;
}

bank.validate();
assert.equal(bank.data.subjects.length,8);
assert.equal(bank.data.subjects.reduce((n,s)=>n+s.models.length,0),9);
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'explication-test-'));
try {
  bank.build(tmp);
  const snapshots=new Map(fs.readdirSync(tmp).map(f=>[f,fs.readFileSync(path.join(tmp,f),'utf8')]));
  bank.build(tmp);
  for(const [f,h] of snapshots)assert.equal(fs.readFileSync(path.join(tmp,f),'utf8'),h,'Build idempotent');
  let longest=0;
  for(const s of bank.data.subjects){
    const html=snapshots.get(bank.file(s));
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(ids.length,new Set(ids).size);
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.equal((html.match(/<textarea\b/g)||[]).length,(html.match(/data-feedback="off"/g)||[]).length,'Aucune validation générale de lecture');
    const text=[...html.matchAll(/<span class="c20-t" data-model-text>(.*?)<\/span>/gs)].map(m=>decode(m[1]));
    assert.deepEqual(text,s.models.flatMap(m=>m.paragraphs.flatMap(p=>p[3].map(x=>x[0]))),'Chaque phrase du modèle reste intacte');
    assert.equal(text.length,(html.match(/class="c20-f"/g)||[]).length,'Une fonction par phrase');
    for(const m of s.models) assert.equal(m.paragraphs.map(p=>p[1]).join(' '),m.paragraphs.flatMap(p=>p[3].map(x=>x[0])).join(' '));
    assert.equal((html.match(/class="ecrire-drill"/g)||[]).length,2);
    const lengths=s.choices.map(c=>c[0].split(/\s+/).length),solid=s.choices.findIndex(c=>c[1]==='Solide');
    if(lengths[solid]>Math.max(...lengths.filter((_,i)=>i!==solid)))longest++;
    if(s.track==='technologique'){
      assert.deepEqual(s.officialQuestions.map(q=>q[0]),['A1','A2','A3','B1','B2','B3','C1','C2']);
      assert.deepEqual(s.models[0].paragraphs.map(p=>p[0]),s.officialQuestions.map(q=>q[0]));
      assert(html.includes('Option n° 1')&&html.includes('Option n° 2'));
    }
    const storage=new Map(),b=runRuntime(html,storage)[0];
    const panels=b.querySelectorAll('[data-panel]'),levels=b.querySelectorAll('[data-level]'),stages=b.querySelectorAll('[data-step]');
    levels[2].click();assert.deepEqual(panels.map(p=>p.hidden),[true,true,false]);
    b.querySelector('[data-previous-level]').click();assert.equal(panels[1].hidden,false);
    b.querySelectorAll('[data-goto-step]')[4].click();assert.equal(stages[4].hidden,false);
    b.querySelector('[data-previous-step]').click();assert.equal(stages[3].hidden,false);
    b.querySelector('[data-next-step]').click();assert.equal(b.querySelector('[data-next-step]').disabled,true);
    const a=b.querySelector('[data-draft]');a.value='Explication personnelle';a.events.input();
    b.querySelector('[data-restart]').click();assert.equal(a.value,'Explication personnelle');
    assert.equal(runRuntime(html,storage)[0].querySelector('[data-draft]').value,a.value);
    b.querySelector('[data-choice]').click();assert.match(b.querySelector('[data-choice-feedback]').textContent,/Solide|Défendable|À revoir/);
    const ann=b.querySelector('[data-annotations]');ann.click();assert(b.querySelectorAll('.ecrire-copy').every(c=>c.classes.has('sans-annotations')),'Les deux options masquent leurs annotations');
    ann.click();assert(b.querySelectorAll('.ecrire-copy').every(c=>!c.classes.has('sans-annotations')));
    b.querySelector('[data-erase]').click();assert.equal(runRuntime(html,storage)[0].querySelector('[data-draft]').value,'');
    assert.match(runRuntime(html,new Map(),true)[0].querySelector('[data-save-status]').textContent,/indisponible/);
  }
  assert(longest<bank.data.subjects.length,'La thèse solide ne doit pas être toujours la plus longue');
  const gen=fs.readFileSync(path.join(root,'scripts/build-philo-annales.js'),'utf8');
  assert(gen.includes("require('./build-explication-textes').build(ROOT)"));
  assert(gen.includes("'philo-texte-copie',20"),'La chaîne doit conduire à une rédaction entière');
  assert(!gen.includes("step('5 · DANS UNE DISSERTATION'"));
  console.log(`Explication : 9 modèles intacts, 40 tâches et 16 ateliers ; une fonction par phrase ; navigation et stockage simulés ; solide seule plus longue ${longest}/8. Rendu navigateur vérifié séparément.`);
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
