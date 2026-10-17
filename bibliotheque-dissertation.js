'use strict';
(() => {
 const form=document.querySelector('.lettres-filters');
 if(!form)return;
 const search=document.getElementById('lettres-search'),work=document.getElementById('lettres-work'),programme=document.getElementById('lettres-programme');
 const cards=[...document.querySelectorAll('.lettres-card')],fold=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
 const texts=cards.map(c=>fold(c.textContent));
 const filter=()=>{
  const terms=fold(search.value).trim().split(/\s+/).filter(Boolean);let count=0;
  cards.forEach((card,i)=>{card.hidden=!((!work.value||card.dataset.work===work.value)&&(!programme.value||card.dataset.programme===programme.value)&&terms.every(t=>texts[i].includes(t)));if(!card.hidden)count++;});
  document.getElementById('lettres-count').textContent=count+' fiche'+(count>1?'s':'')+' sur '+cards.length;
  document.getElementById('lettres-empty').hidden=count!==0;
 };
 form.addEventListener('input',filter);form.addEventListener('change',filter);
 form.addEventListener('reset',()=>{search.value='';work.value='';programme.value='';filter();});
 // A linked quotation must remain visible even if a filter was previously restored.
 if(location.hash){const card=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(card?.classList.contains('lettres-card')){form.reset();card.scrollIntoView();}}
})();
