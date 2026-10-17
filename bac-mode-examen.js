/* Rédaction locale : aucun corrigé ni service distant pendant l’épreuve. */
(() => {
  'use strict';
  const picker=document.getElementById('exam-subject');
  const panels=[...document.querySelectorAll('[data-exam-id]')];
  if(!picker||!panels.length)return;
  const states=new Map();let active=null;
  const format=n=>[Math.floor(n/3600),Math.floor(n/60)%60,n%60].map(x=>String(x).padStart(2,'0')).join(':');
  const key=id=>'commentaire-examen:v1:'+id;
  function read(id){
    const empty={draft:'',elapsed:0,startedAt:null,finished:false};
    try{
      const s=JSON.parse(localStorage.getItem(key(id))||'null');
      if(!s||typeof s!=='object')return empty;
      return {draft:typeof s.draft==='string'?s.draft:'',elapsed:Number.isFinite(s.elapsed)?Math.max(0,s.elapsed):0,startedAt:Number.isFinite(s.startedAt)&&s.startedAt>0?s.startedAt:null,finished:s.finished===true};
    }catch{return empty;}
  }
  const elapsed=s=>s.elapsed+(s.startedAt===null?0:Math.max(0,Math.floor((Date.now()-s.startedAt)/1000)));
  function save(panel){
    const s=states.get(panel.dataset.examId),note=panel.querySelector('[data-exam-save]');
    try{localStorage.setItem(key(panel.dataset.examId),JSON.stringify(s));note.textContent='Copie enregistrée dans ce navigateur.';}
    catch{note.textContent='La sauvegarde locale est indisponible. Téléchargez votre copie pour la conserver.';}
  }
  function pause(panel){const s=states.get(panel.dataset.examId);s.elapsed=elapsed(s);s.startedAt=null;save(panel);}
  function render(panel){
    const s=states.get(panel.dataset.examId),time=elapsed(s);
    panel.querySelector('[data-exam-clock]').textContent=format(time);
    panel.querySelector('[data-exam-clock]').classList.toggle('exam-overtime',time>=14400);
    panel.querySelector('[data-exam-timer-note]').textContent=s.finished?'Rédaction terminée. Vous pouvez relire et comparer.':time>=14400?'Les quatre heures sont écoulées. Votre copie reste accessible.':s.startedAt!==null?'Chronomètre en cours.':'Chronomètre en pause.';
    panel.querySelector('[data-exam-start]').textContent=s.finished?'Reprendre la rédaction':time?'Reprendre le chronomètre':'Démarrer le chronomètre';
    panel.querySelector('[data-exam-start]').disabled=s.startedAt!==null;
    panel.querySelector('[data-exam-pause]').disabled=s.startedAt===null;
    panel.querySelector('[data-exam-after]').hidden=!s.finished;
  }
  for(const panel of panels){
    const id=panel.dataset.examId,s=read(id);states.set(id,s);
    const draft=panel.querySelector('[data-exam-draft]');draft.value=s.draft;
    panel.querySelector('[data-exam-after]').hidden=!s.finished;
    panel.querySelectorAll('[data-exam-controls]').forEach(e=>e.hidden=false);
    if(s.draft)panel.querySelector('[data-exam-save]').textContent='Votre copie précédente a été retrouvée dans ce navigateur.';
    draft.addEventListener('input',()=>{s.draft=draft.value;save(panel);});
    panel.querySelector('[data-exam-start]').addEventListener('click',()=>{s.finished=false;if(s.startedAt===null)s.startedAt=Date.now();save(panel);render(panel);});
    panel.querySelector('[data-exam-pause]').addEventListener('click',()=>{pause(panel);render(panel);});
    panel.querySelector('[data-exam-finish]').addEventListener('click',()=>{pause(panel);s.finished=true;save(panel);render(panel);panel.querySelector('[data-exam-after]').scrollIntoView({block:'nearest'});});
    panel.querySelector('[data-exam-download]').addEventListener('click',()=>{
      const text=panel.querySelector('h2').textContent+'\n\n'+draft.value;
      const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
      const a=document.createElement('a');a.href=url;a.download='commentaire-'+id+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
    panel.querySelector('[data-exam-erase]').addEventListener('click',()=>{
      if(!confirm('Effacer uniquement la copie et le chronomètre de ce sujet ?'))return;
      Object.assign(s,{draft:'',elapsed:0,startedAt:null,finished:false});draft.value='';save(panel);render(panel);
    });
  }
  function select(id,update){
    const panel=panels.find(p=>p.dataset.examId===id)||panels[0];
    if(active&&active!==panel){const s=states.get(active.dataset.examId);if(s.startedAt!==null)pause(active);}
    active=panel;picker.value=panel.dataset.examId;
    panels.forEach(p=>p.hidden=p!==panel);render(panel);
    if(update){const u=new URL(location.href);u.searchParams.set('sujet',panel.dataset.examId);history.replaceState(null,'',u);}
  }
  picker.addEventListener('change',()=>select(picker.value,true));
  select(new URLSearchParams(location.search).get('sujet'),false);
  setInterval(()=>{if(active)render(active);},1000);
})();
