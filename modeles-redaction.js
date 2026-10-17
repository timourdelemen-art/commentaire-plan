/* Le même texte reste en place : seuls les rôles deviennent visibles. */
'use strict';
for(const button of document.querySelectorAll('.mr-toggle')){
 const article=document.getElementById(button.getAttribute('aria-controls'));
 if(!article)continue;
 button.addEventListener('click',()=>{
  const visible=button.getAttribute('aria-pressed')!=='true';
  button.setAttribute('aria-pressed',String(visible));
  button.textContent=visible?'Masquer la fonction de chaque phrase':'Voir la fonction de chaque phrase';
  article.classList.toggle('mr-annotated',visible);
  for(const note of article.querySelectorAll('.mr-note'))note.hidden=!visible;
 });
}
for(const group of document.querySelectorAll('.mr-choices')){
 for(const button of group.querySelectorAll('.mr-choice')){
  button.setAttribute('aria-pressed','false');
  button.addEventListener('click',()=>{
   for(const other of group.querySelectorAll('.mr-choice'))other.setAttribute('aria-pressed',String(other===button));
   group.nextElementSibling.textContent=button.dataset.state+' — '+button.dataset.why;
  });
 }
}
for(const button of document.querySelectorAll('.mr-reset')){
 button.addEventListener('click',()=>{
  const section=button.closest('.mr-exercises');
  // Conserver les textes de l’élève ; recommencer remet à zéro les choix et comparaisons.
  for(const choice of section.querySelectorAll('.mr-choice'))choice.setAttribute('aria-pressed','false');
  for(const feedback of section.querySelectorAll('.mr-feedback'))feedback.textContent='';
  for(const compare of section.querySelectorAll('.mr-compare'))compare.open=false;
  section.querySelector('.mr-reset-note').textContent='Les choix sont réinitialisés. Vos textes sont conservés.';
 });
}
