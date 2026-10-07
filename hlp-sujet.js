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
})();
