/* Dissertation de français : « Trouver le problème du sujet » (bac-dissertation.html).
   Le contenu (vrais sujets, propositions, modèles) est dans la page ; ce script ne fait que
   mélanger les propositions, donner les retours Solide / Défendable / À revoir et naviguer.
   Niveau 1 : au clic (le pourtant, puis la question unique). Niveau 2 : l’élève écrit, puis compare. */
(()=>{
const root=document.getElementById('diss-probleme');
if(!root) return;
const LABEL={ok:'Solide',def:'Défendable',no:'À revoir'};
const sujets=[...root.querySelectorAll('.diss-sujet')];
const subjBtns=[...root.querySelectorAll('[data-subj]')].filter(b=>b.tagName==='BUTTON');
const levelBtns=[...root.querySelectorAll('.chaine-tabs [data-level]')];
let si=0, level=1;

const shuffle=box=>{const kids=[...box.children];for(let i=kids.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[kids[i],kids[j]]=[kids[j],kids[i]];}kids.forEach(k=>box.appendChild(k));};

function resetSujet(art){
  art.querySelectorAll('.diss-step').forEach((st,i)=>{
    st.hidden=i>0;
    st.querySelectorAll('.chaine-opt').forEach(b=>{b.disabled=false;b.className='chaine-opt';});
    const fb=st.querySelector('.chaine-fb'); fb.className='chaine-fb'; fb.innerHTML='';
    shuffle(st.querySelector('.chaine-opts'));
  });
  const fin=art.querySelector('.diss-fin'); if(fin) fin.hidden=true;
  const fbm=art.querySelector('.diss-fbm'); if(fbm){fbm.className='chaine-fb diss-fbm';fbm.innerHTML='';}
}
function show(){
  sujets.forEach((art,i)=>{
    art.hidden=i!==si;
    art.querySelector('.diss-n1').hidden=level!==1;
    art.querySelector('.diss-n2').hidden=level!==2;
  });
  subjBtns.forEach((b,i)=>{b.classList.toggle('on',i===si);b.setAttribute('aria-pressed',i===si?'true':'false');});
  levelBtns.forEach(b=>{const on=Number(b.dataset.level)===level;b.classList.toggle('on',on);if(on)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
}
function go(newSi,newLevel){
  if(newSi!=null) si=(newSi+sujets.length)%sujets.length;
  if(newLevel!=null) level=newLevel;
  resetSujet(sujets[si]); show();
  root.scrollIntoView({behavior:'smooth',block:'start'});
}

sujets.forEach(art=>{
  art.querySelectorAll('.diss-step').forEach(st=>{
    const fb=st.querySelector('.chaine-fb');
    st.querySelectorAll('.chaine-opt').forEach(b=>b.addEventListener('click',()=>{
      const v=b.dataset.v;
      st.querySelectorAll('.chaine-opt').forEach(x=>x.classList.remove('picked'));
      b.classList.add('picked',v);
      if(v==='no') b.disabled=true;
      fb.className='chaine-fb show '+v;
      fb.innerHTML='<strong>'+LABEL[v]+'.</strong> ';
      fb.appendChild(document.createTextNode(b.dataset.why||''));
      if(v==='no'){
        fb.appendChild(document.createTextNode(' Essayez une autre proposition.'));
        return;
      }
      if(v==='def') fb.appendChild(document.createTextNode(' Vous pouvez continuer, ou chercher une proposition plus précise.'));
      const next=document.createElement('button');
      next.type='button'; next.className='btn red small'; next.textContent='Continuer →';
      next.addEventListener('click',()=>{
        st.querySelectorAll('.chaine-opt').forEach(x=>x.disabled=true);
        next.remove();
        const after=st.nextElementSibling;
        if(after){ after.hidden=false; const first=after.querySelector('.chaine-opt,button'); if(first) first.focus(); }
      });
      fb.appendChild(document.createElement('br'));
      fb.appendChild(next);
      next.focus();
    }));
  });
  const cmp=art.querySelector('.diss-compare');
  if(cmp) cmp.addEventListener('click',()=>{
    const ta=art.querySelector('.diss-area'), fbm=art.querySelector('.diss-fbm');
    if(ta.value.trim().length<20){ fbm.className='chaine-fb diss-fbm show no'; fbm.textContent='Écrivez d’abord votre forme longue et votre question : on compare après.'; ta.focus(); return; }
    fbm.className='chaine-fb diss-fbm show def';
    fbm.innerHTML='';
    fbm.appendChild(art.querySelector('template.diss-modele').content.cloneNode(true));
  });
  art.querySelectorAll('.diss-again').forEach(b=>b.addEventListener('click',()=>go(si,1)));
  art.querySelectorAll('.diss-next').forEach(b=>b.addEventListener('click',()=>go(si+1,null)));
  art.querySelectorAll('.diss-tolevel').forEach(b=>b.addEventListener('click',()=>go(si,Number(b.dataset.to))));
});
subjBtns.forEach((b,i)=>b.addEventListener('click',()=>go(i,null)));
levelBtns.forEach(b=>b.addEventListener('click',()=>go(si,Number(b.dataset.level))));
sujets.forEach(resetSujet);
show();
})();
