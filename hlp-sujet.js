/* Page sujet HLP : garde les réponses de l'élève sur son appareil (si le navigateur le permet). */
(()=>{
  const box=document.querySelector('.hlp-training');
  if(!box) return;
  const key='cp-hlp:'+box.dataset.hlpId;
  let saved={};
  try{ saved=JSON.parse(localStorage.getItem(key)||'{}')||{}; }catch(e){ saved={}; }
  const areas=[...box.querySelectorAll('textarea[data-hlp-save]')];
  const store=()=>{
    const data={};
    areas.forEach(a=>{ if(a.value.trim()) data[a.dataset.hlpSave]=a.value; });
    try{ localStorage.setItem(key,JSON.stringify(data)); }catch(e){}
  };
  areas.forEach(a=>{
    if(saved[a.dataset.hlpSave]) a.value=saved[a.dataset.hlpSave];
    a.addEventListener('input',store);
  });
  box.querySelector('.hlp-clear')?.addEventListener('click',()=>{
    areas.forEach(a=>{ a.value=''; });
    box.querySelectorAll('details.correction').forEach(d=>{ d.open=false; });
    try{ localStorage.removeItem(key); }catch(e){}
  });
  /* Une étape à la fois ; la grille s'ouvre après une tentative. Sans JavaScript, tout reste visible. */
  const steps=[...box.querySelectorAll('.hlp-step')];
  steps.forEach((st,i)=>{
    const ta=st.querySelector('textarea'), det=st.querySelector('details.correction');
    if(det&&ta) det.querySelector('summary').addEventListener('click',e=>{
      if(det.open||ta.value.trim()) return;
      e.preventDefault(); ta.focus();
      let m=st.querySelector('.hlp-wait');
      if(!m){ m=document.createElement('p'); m.className='micro hlp-wait'; m.textContent='Écrivez d’abord votre réponse : la grille s’ouvre ensuite.'; det.before(m); }
    });
    ta&&ta.addEventListener('input',()=>st.querySelector('.hlp-wait')?.remove());
    if(i===steps.length-1) return;
    const next=document.createElement('p'); next.className='hlp-next';
    next.innerHTML='<button type="button" class="btn red small">Étape suivante →</button>';
    st.appendChild(next);
    next.querySelector('button').addEventListener('click',()=>{
      next.remove(); steps[i+1].hidden=false;
      steps[i+1].scrollIntoView({behavior:'smooth',block:'start'});
      steps[i+1].querySelector('textarea')?.focus({preventScroll:true});
    });
  });
  /* Reprise : on rouvre jusqu'à la dernière étape commencée. */
  let last=0; steps.forEach((st,i)=>{ if(st.querySelector('textarea')?.value.trim()) last=i; });
  steps.forEach((st,i)=>{ st.hidden=i>last; if(i<last) st.querySelector('.hlp-next')?.remove(); });
})();
