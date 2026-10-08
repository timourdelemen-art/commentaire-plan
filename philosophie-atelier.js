/* Atelier d’une notion : une étape visible à la fois, choix commentés, rôles des paragraphes.
   Sans JavaScript, tout l’atelier reste affiché (lecture, impression, moteurs de recherche). */
(()=>{
const steps=[...document.querySelectorAll('.atelier-step')];
if(!steps.length) return;
const esc=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
let shown=1;
const KEY='cp-atelier:'+location.pathname;
try{shown=Math.max(1,Math.min(steps.length,Number(localStorage.getItem(KEY))||1));}catch(e){}
function render(){
  steps.forEach(s=>{s.hidden=Number(s.dataset.step)>shown;});
  steps.forEach(s=>{const b=s.querySelector('.atelier-next'); if(b) b.hidden=Number(s.dataset.step)<shown;});
}
steps.forEach(s=>{
  const b=s.querySelector('.atelier-next');
  if(b) b.addEventListener('click',()=>{
    shown=Math.min(steps.length,Number(s.dataset.step)+1);
    try{localStorage.setItem(KEY,String(shown));}catch(e){}
    render();
    const nxt=steps.find(x=>Number(x.dataset.step)===shown);
    if(nxt) nxt.scrollIntoView({behavior:'smooth',block:'start'});
  });
});
const all=document.querySelector('.atelier-all');
if(all) all.addEventListener('click',()=>{shown=steps.length;try{localStorage.setItem(KEY,String(shown));}catch(e){}render();});
render();

/* Choix commentés : un clic, une explication ; la bonne réponse est montrée après une erreur. */
document.querySelectorAll('.atelier-choice').forEach(box=>{
  const why=box.querySelector('.atelier-why');
  const btns=[...box.querySelectorAll('button.choice')];
  btns.forEach(b=>b.addEventListener('click',()=>{
    const ok=b.dataset.ok==='1';
    btns.forEach(x=>x.classList.remove('correct','wrong'));
    b.classList.add(ok?'correct':'wrong');
    let html='<p><strong>'+(ok?'Juste.':'Pas celle-ci.')+'</strong> '+esc(b.dataset.why)+'</p>';
    if(!ok){const good=btns.find(x=>x.dataset.ok==='1'); good.classList.add('correct'); html+='<p><strong>La bonne :</strong> '+esc(good.dataset.why)+'</p>';}
    why.innerHTML=html;
  }));
});

/* Rôle des paragraphes d’une partie. */
document.querySelectorAll('.atelier-ordre').forEach(box=>{
  const why=box.querySelector('.atelier-why');
  box.querySelector('.ordre-check').addEventListener('click',()=>{
    const sels=[...box.querySelectorAll('select')];
    if(sels.some(s=>s.value==='')){why.innerHTML='<p>Choisissez d’abord un rôle pour chaque paragraphe.</p>';return;}
    let good=0;
    sels.forEach(s=>{const ok=s.value===s.dataset.role; if(ok) good++; s.closest('.ordre-item').classList.toggle('is-ok',ok); s.closest('.ordre-item').classList.toggle('is-wrong',!ok);});
    why.innerHTML=good===sels.length
      ?'<p><strong>Juste.</strong> La partie avance : elle pose une réponse, lui donne de la force, puis la pousse jusqu’au point où elle ne suffit plus. C’est cette limite qui rendra la partie suivante nécessaire.</p>'
      :'<p><strong>'+good+' sur '+sels.length+'.</strong> Indice : la limite n’est pas une objection venue d’ailleurs ; c’est l’idée elle-même, poussée jusqu’au bout, qui montre ce qu’elle ne peut pas faire. Corrigez les paragraphes en rouge.</p>';
  });
});
})();
