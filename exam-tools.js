document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.timer-box').forEach(box=>{
    const initial=Number(box.dataset.seconds||0); let left=initial,t=null;
    const display=box.querySelector('.timer-display'), start=box.querySelector('.timer-start'), reset=box.querySelector('.timer-reset');
    const draw=()=>{let h=Math.floor(left/3600),m=Math.floor((left%3600)/60),s=left%60;display.textContent=(h?String(h)+':':'')+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');};
    draw();
    start?.addEventListener('click',()=>{if(t){clearInterval(t);t=null;start.textContent='Reprendre';return;}start.textContent='Pause';t=setInterval(()=>{if(left<=0){clearInterval(t);t=null;start.textContent='Terminé';return;}left--;draw();},1000);});
    reset?.addEventListener('click',()=>{if(t)clearInterval(t);t=null;left=initial;draw();if(start)start.textContent='Démarrer';});
  });

  document.querySelectorAll('.record-btn').forEach(btn=>{
    const wrap=btn.closest('.audio-prototype'),status=wrap.querySelector('.record-status'),audio=wrap.querySelector('.record-playback');
    let rec=null,chunks=[];
    btn.addEventListener('click',async()=>{
      if(rec && rec.state==='recording'){rec.stop();btn.textContent='Enregistrer ma lecture';return;}
      if(!navigator.mediaDevices || !window.MediaRecorder){status.textContent='Enregistrement non pris en charge par ce navigateur.';return;}
      try{
        const stream=await navigator.mediaDevices.getUserMedia({audio:true});
        chunks=[];rec=new MediaRecorder(stream);
        rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
        rec.onstop=()=>{const blob=new Blob(chunks,{type:rec.mimeType||'audio/webm'});audio.src=URL.createObjectURL(blob);audio.style.display='block';status.textContent='Enregistrement prêt à être réécouté. Évaluation IA à connecter.';stream.getTracks().forEach(t=>t.stop());};
        rec.start();btn.textContent='Arrêter';status.textContent='Enregistrement en cours…';
      }catch(e){status.textContent='Le microphone n’a pas pu être ouvert.';}
    });
  });

  document.querySelectorAll('.grammar-choice').forEach(btn=>btn.addEventListener('click',()=>{
    const f=document.getElementById('grammar-feedback'); document.querySelectorAll('.grammar-choice').forEach(x=>x.disabled=true);
    const ok=btn.dataset.correct==='1'; btn.classList.add(ok?'correct':'wrong');
    f.innerHTML=ok?'<strong>Oui.</strong><p>La manipulation sert ici de preuve : on reconstruit le groupe repris pour voir que « que » occupe la place du COD de « interroge ».</p>':'<strong>À reprendre.</strong><p>Une manipulation doit permettre de tester la fonction, pas seulement modifier la forme de la phrase.</p>';f.classList.add('show');
  }));

  const area=document.getElementById('brevet-writing'),count=document.getElementById('word-count');
  if(area&&count){const update=()=>{const n=area.value.trim()?area.value.trim().split(/\s+/).length:0;count.textContent=n+' mot'+(n>1?'s':'');};area.addEventListener('input',update);update();}
});