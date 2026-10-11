(() => {
'use strict';
const search=document.querySelector('#lit-search'),usage=document.querySelector('#lit-use'),author=document.querySelector('#lit-author');
if(!search||!usage||!author)return;
const cards=[...document.querySelectorAll('.lit-fiche')];
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function filter(){const words=normalize(search.value).trim().split(/\s+/).filter(Boolean);let total=0;
 for(const card of cards){const hay=normalize(card.dataset.search);const visible=(!author.value||card.dataset.author===author.value)&&(!usage.value||card.dataset.uses.split(' ').includes(usage.value))&&words.every(w=>hay.includes(w));card.hidden=!visible;if(visible)total++;}
 document.querySelector('#lit-count').textContent=total+' passage'+(total===1?'':'s')+' proposé'+(total===1?'':'s')+'.';document.querySelector('#lit-empty').hidden=total!==0;
}
search.addEventListener('input',filter);usage.addEventListener('change',filter);author.addEventListener('change',filter);
document.querySelector('#lit-reset').addEventListener('click',()=>{search.value=usage.value=author.value='';filter();search.focus();});
for(const box of document.querySelectorAll('[data-lit-draft]')){
 const id=box.dataset.litDraft,key='cp-lit-idees-v1:'+id,status=document.querySelector('[data-storage-status="'+id+'"]');
 try{box.value=localStorage.getItem(key)||'';}catch{status.textContent='La sauvegarde est indisponible dans ce navigateur. Copiez votre brouillon avant de fermer la page.';}
 box.addEventListener('input',()=>{try{if(box.value)localStorage.setItem(key,box.value);else localStorage.removeItem(key);status.textContent='Brouillon enregistré dans ce navigateur.';}catch{status.textContent='Votre brouillon est visible mais ne peut pas être enregistré. Copiez-le avant de fermer la page.';}});
 document.querySelector('[data-lit-erase="'+id+'"]').addEventListener('click',()=>{if(!confirm('Effacer uniquement le brouillon de cette fiche ?'))return;box.value='';try{localStorage.removeItem(key);status.textContent='Ce brouillon a été effacé.';}catch{status.textContent='La zone est vide ; la sauvegarde du navigateur est indisponible.';}box.focus();});
}
})();
