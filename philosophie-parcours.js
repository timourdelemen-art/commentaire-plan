/* Parcours de philosophie : suivi déclaratif des étapes, pas évaluation de maîtrise. */
(()=>{
const KEY='philo-parcours-fait-v2'; /* v2 : nouvel ordre des cinq gestes (octobre 2026) */
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}};
const write=a=>{try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
let done=read();
const isDone=n=>done.includes(n);
const toggle=n=>{done=isDone(n)?done.filter(x=>x!==n):done.concat(n).sort();write(done);paint();};
const nextStep=()=>{const m=done.length?Math.max(...done):0;return m<5?m+1:0;};

/* Bande du parcours en haut des pages */
const strip=document.querySelector('.parcours-strip');
/* Bouton « J'ai fini cette étape » */
const here=strip?Number(strip.dataset.step):0;
const next=document.querySelector('.parcours-next');
let btn=null;
if(here&&next){
  btn=document.createElement('button');btn.type='button';btn.className='parcours-done';
  btn.addEventListener('click',()=>toggle(here));
  next.insertBefore(btn,next.querySelector('h2').nextSibling);
}
/* Cases sur la page d'accueil de la philosophie */
const items=[...document.querySelectorAll('[data-parcours]')];
items.forEach(p=>{
  const n=Number(p.dataset.parcours);
  const l=document.createElement('label');l.className='parcours-check';
  l.innerHTML='<input type="checkbox"> étape parcourue';
  l.querySelector('input').addEventListener('change',()=>toggle(n));
  p.appendChild(l);
});
const status=document.getElementById('parcours-status');

function paint(){
  if(strip)strip.querySelectorAll('a[data-n]').forEach(a=>a.classList.toggle('done',isDone(Number(a.dataset.n))));
  if(btn){btn.textContent=isDone(here)?'✓ Étape '+here+' parcourue (annuler)':'J’ai parcouru l’étape '+here;btn.classList.toggle('is-done',isDone(here));}
  items.forEach(p=>{const n=Number(p.dataset.parcours);p.classList.toggle('done',isDone(n));p.querySelector('input').checked=isDone(n);});
  if(status){const n=nextStep();status.textContent=done.length===0?'':(n?'Vous en êtes à l’étape '+n+'.':'Les cinq étapes ont été parcourues : vérifiez votre autonomie sur un sujet du bac.');}
}
paint();
})();
