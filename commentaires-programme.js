/* Brouillons et comparaison : aucun diagnostic automatique n’est attribué. */
(()=>{'use strict';
 function init(){
  document.querySelectorAll('[data-programme-draft]').forEach(area=>{
   const key='commentaire-programme:'+location.pathname+':'+area.id;
   const status=area.parentElement.querySelector('.programme-status');
   try{area.value=localStorage.getItem(key)||'';}catch{}
   if(area.value&&area.closest('.etape-ecrit'))area.closest('.etape-ecrit').hidden=false;
   area.addEventListener('input',()=>{try{localStorage.setItem(key,area.value);status.textContent='Brouillon conservé dans ce navigateur.';}catch{status.textContent='La sauvegarde est indisponible. Copiez votre réponse pour la conserver.';}});
  });
  document.querySelectorAll('[data-after-writing] > summary').forEach(summary=>summary.addEventListener('click',e=>{
   const box=summary.closest('.programme-writing'),area=box.querySelector('textarea');
   if(!area.value.trim()){e.preventDefault();box.querySelector('[role="status"]').textContent='Écrivez un essai avant de comparer.';area.focus();}
  }));
  document.querySelectorAll('[data-recommencer]').forEach(b=>b.addEventListener('click',()=>{
   const step=b.closest('.etape');step.querySelectorAll('.chaine-opt').forEach(o=>{o.disabled=false;o.classList.remove('picked','ok','def','no');});
   step.querySelectorAll('.chaine-fb').forEach(f=>{f.textContent='';f.className='chaine-fb';});
   step.querySelector('.etape-ecrit').hidden=true;step.querySelector('.chaine-q').scrollIntoView({block:'center'});
  }));
  document.querySelectorAll('[data-etape]').forEach(b=>b.addEventListener('click',()=>{
   const step=b.closest('[data-etapes]').querySelectorAll('.etape')[Number(b.dataset.etape)];if(step)history.replaceState(null,'','#'+step.id);
  }));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
