#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm');
const bank=require('./build-brevet-lecture'),root=path.resolve(__dirname,'..');
const decode=s=>s.replace(/&(?:amp|lt|gt|quot|#39);/g,x=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[x]));
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
  vm.runInNewContext(fs.readFileSync(path.join(root,'brevet-lecture-parcours.js'),'utf8'),{document:{querySelectorAll:()=>result},localStorage,window:{confirm:()=>true}});
  return result;
}

bank.validate();assert.equal(bank.data.cases.length,8);
const html=bank.page();assert.equal(fs.readFileSync(path.join(root,'brevet-lecture-parcours.html'),'utf8'),html,'Sortie générée à jour');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size);
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.equal((html.match(/<textarea\b/g)||[]).length,(html.match(/data-feedback="off"/g)||[]).length);
const text=[...html.matchAll(/<p data-model-text>(.*?)<\/p>/gs)].map(x=>decode(x[1].replace(/<br>/g,'\n')));
assert.deepEqual(text,bank.data.cases.flatMap(r=>r.model.map(p=>p[0])),'Annotations sans altérer le modèle');
let c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'annales/catalogue-annales.js'),'utf8'),c);
let longest=0;for(const r of bank.data.cases){assert(c.window.ANNALES_CATALOGUE[r.annale].etapes.some(s=>s.id===r.step));const n=r.choices.map(c=>c[0].split(/\s+/).length),i=r.choices.findIndex(c=>c[1]==='Solide');if(n[i]>Math.max(...n.filter((_,j)=>i!==j)))longest++;}
assert(longest<8,'La proposition solide ne doit pas être toujours la plus longue');
const storage=new Map();const bs=runRuntime(html,storage);assert.equal(bs.length,8);
for(const b of bs){
 b.querySelectorAll('[data-level]')[2].click();assert.deepEqual(b.querySelectorAll('[data-panel]').map(p=>p.hidden),[true,true,false]);
 b.querySelector('[data-previous-level]').click();b.querySelector('[data-next-step]').click();assert.equal(b.querySelectorAll('[data-step]')[1].hidden,false);
 b.querySelectorAll('[data-goto-step]')[2].click();assert.equal(b.querySelector('[data-next-step]').disabled,true);
 b.querySelector('[data-choice]').click();assert.match(b.querySelector('[data-choice-feedback]').textContent,/Solide|Défendable|À revoir/);
 const a=b.querySelector('[data-draft]');a.value='Mon essai';a.events.input();b.querySelector('[data-restart]').click();assert.equal(a.value,'Mon essai');assert.equal(b.querySelectorAll('[data-panel]')[0].hidden,false);
 b.querySelector('[data-compare]').click();assert.equal(b.querySelector('[data-model]').open,true);
 b.querySelector('[data-annotations]').click();assert(b.querySelector('.ecrire-copy').classes.has('sans-annotations'));
}
assert.equal(runRuntime(html,storage)[0].querySelector('[data-draft]').value,'Mon essai');
bs[0].querySelector('[data-erase]').click();assert.equal(bs[0].querySelector('[data-draft]').value,'');assert.equal(runRuntime(html,storage)[1].querySelector('[data-draft]').value,'Mon essai');
assert.match(runRuntime(html,new Map(),true)[0].querySelector('[data-save-status]').textContent,/indisponible/);
console.log('Brevet : 8 modèles, 24 tâches ; navigation, brouillons, annotations, liens et trois états OK ; solide seule plus longue '+longest+'/8. Simulation DOM, pas test navigateur.');
