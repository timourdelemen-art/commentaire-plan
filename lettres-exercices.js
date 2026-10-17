'use strict';
for(const exercise of document.querySelectorAll('.lettres-exercise')){
 const buttons=[...exercise.querySelectorAll('[data-level]')],levels=[...exercise.querySelectorAll('.lettres-level')];let current=1;
 const show=level=>{
  current=Math.max(1,Math.min(3,level));
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.level)===current)));
  levels.forEach((p,i)=>p.hidden=i!==current-1);
  exercise.querySelector('.lettres-previous').disabled=current===1;
  exercise.querySelector('.lettres-next').disabled=current===3;
 };
 buttons.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.level))));
 exercise.querySelector('.lettres-previous').addEventListener('click',()=>show(current-1));
 exercise.querySelector('.lettres-next').addEventListener('click',()=>show(current+1));
 for(const option of exercise.querySelectorAll('.lettres-options button'))option.addEventListener('click',()=>{
  for(const b of exercise.querySelectorAll('.lettres-options button'))b.setAttribute('aria-pressed',String(b===option));
  exercise.querySelector('.lettres-feedback').textContent=option.dataset.state+' — '+option.dataset.why;
 });
 for(const area of exercise.querySelectorAll('textarea')){
  const key='cp-lettres-v1:'+area.id;
  try{area.value=localStorage.getItem(key)||'';}catch{}
  area.addEventListener('input',()=>{try{localStorage.setItem(key,area.value);exercise.querySelector('.lettres-save').textContent='Brouillon enregistré dans ce navigateur.';}catch{exercise.querySelector('.lettres-save').textContent='Stockage indisponible : copiez votre texte avant de fermer la page.';}});
 }
 exercise.querySelector('.lettres-reset').addEventListener('click',()=>{
  exercise.querySelectorAll('.lettres-options button').forEach(b=>b.setAttribute('aria-pressed','false'));
  exercise.querySelector('.lettres-feedback').textContent='';exercise.querySelectorAll('details').forEach(d=>d.open=false);
  show(1);exercise.querySelector('.lettres-save').textContent='Choix réinitialisés ; vos textes sont conservés.';
 });
 show(1);
}
