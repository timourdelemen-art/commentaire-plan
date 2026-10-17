'use strict';
(() => {
 const form=document.getElementById('lettres-filters');if(!form)return;
 const fields={search:document.getElementById('lettres-search'),work:document.getElementById('lettres-work'),subject:document.getElementById('lettres-subject'),use:document.getElementById('lettres-use'),programme:document.getElementById('lettres-programme')};
 const cards=[...document.querySelectorAll('.lettres-card')],results=[...document.querySelectorAll('.lettres-result')],close=document.querySelector('.lettres-close');let selected='';
 const fold=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').toLocaleLowerCase('fr');
 const text=new Map(cards.map(c=>[c.id,fold(c.textContent)]));
 const updateHash=id=>history.replaceState(null,'',location.pathname+location.search+(id?'#'+id:''));
 function open(id,focus=true){
  const card=cards.find(c=>c.id===id),result=results.find(c=>c.dataset.entry===id);if(!card||result.hidden)return;
  selected=id;cards.forEach(c=>c.hidden=c!==card);close.hidden=false;
  results.forEach(r=>{const link=r.querySelector('a');if(r===result)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
  updateHash(id);if(focus){card.querySelector('h2').setAttribute('tabindex','-1');card.querySelector('h2').focus({preventScroll:true});card.scrollIntoView({block:'start'});}
 }
 function closeReader(focus=false){selected='';cards.forEach(c=>c.hidden=true);close.hidden=true;results.forEach(r=>r.querySelector('a').removeAttribute('aria-current'));updateHash('');if(focus){document.getElementById('lettres-results').scrollIntoView({block:'start'});document.querySelector('.lettres-result:not([hidden]) a')?.focus({preventScroll:true});}}
 function filter(){
  const terms=fold(fields.search.value).trim().split(/\s+/).filter(Boolean);let count=0;
  for(const card of cards){const uses=[...card.querySelectorAll('.lettres-use')];
   const matching=uses.filter(u=>(!fields.subject.value||u.dataset.subject===fields.subject.value)&&(!fields.use.value||u.dataset.mode===fields.use.value));
   uses.forEach(u=>u.hidden=!matching.includes(u));
   const found=(!fields.work.value||card.dataset.work===fields.work.value)&&(!fields.programme.value||card.dataset.programme===fields.programme.value)&&matching.length>0&&terms.every(t=>text.get(card.id).includes(t));
   const result=results.find(r=>r.dataset.entry===card.id);result.hidden=!found;if(found)count++;
  }
  document.getElementById('lettres-count').textContent=count+' citation'+(count>1?'s':'')+' trouvée'+(count>1?'s':'');document.getElementById('lettres-empty').hidden=count!==0;
  if(selected&&results.find(r=>r.dataset.entry===selected).hidden)closeReader();
 }
 results.forEach(r=>r.querySelector('a').addEventListener('click',ev=>{if(ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey)return;ev.preventDefault();open(r.dataset.entry);}));
 for(const button of document.querySelectorAll('.lettres-functions'))button.addEventListener('click',()=>{const on=button.getAttribute('aria-pressed')!=='true',p=document.getElementById(button.getAttribute('aria-controls'));button.setAttribute('aria-pressed',String(on));button.textContent=on?'Lire sans les fonctions':'Voir la fonction de chaque phrase';p.classList.toggle('is-annotated',on);p.querySelectorAll('.lettres-function').forEach(s=>s.hidden=!on);});
 close.addEventListener('click',()=>closeReader(true));form.addEventListener('submit',ev=>{ev.preventDefault();filter();});form.addEventListener('input',filter);form.addEventListener('change',filter);
 form.addEventListener('reset',()=>{Object.values(fields).forEach(f=>f.value='');filter();closeReader();});
 document.documentElement.classList.add('lettres-ready');cards.forEach(c=>c.hidden=true);filter();
 const followHash=()=>{let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}if(!id)return closeReader();if(cards.some(c=>c.id===id)){Object.values(fields).forEach(f=>f.value='');filter();open(id,false);document.getElementById(id).scrollIntoView({block:'start'});}};
 followHash();window.addEventListener('hashchange',followHash);
})();
