document.addEventListener('DOMContentLoaded',()=>{
  const AI_TEMPORARILY_DISABLED=false;
  const nativeFetch=window.fetch.bind(window);
  const fetch=(resource,options)=>{
    if(AI_TEMPORARILY_DISABLED && String(resource).includes("atelier-commentaire-ia.timour-delemen.workers.dev")){
      return Promise.reject(new Error("Les fonctions d’IA sont temporairement désactivées."));
    }
    return nativeFetch(resource,options);
  };
  document.querySelectorAll('.timer-box').forEach(box=>{
    const initial=Number(box.dataset.seconds||0); let left=initial,t=null;
    const display=box.querySelector('.timer-display'), start=box.querySelector('.timer-start'), reset=box.querySelector('.timer-reset');
    const draw=()=>{let h=Math.floor(left/3600),m=Math.floor((left%3600)/60),s=left%60;display.textContent=(h?String(h)+':':'')+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');};
    draw();
    start?.addEventListener('click',()=>{if(t){clearInterval(t);t=null;start.textContent='Reprendre';return;}start.textContent='Pause';t=setInterval(()=>{if(left<=0){clearInterval(t);t=null;start.textContent='Terminé';return;}left--;draw();},1000);});
    reset?.addEventListener('click',()=>{if(t)clearInterval(t);t=null;left=initial;draw();if(start)start.textContent='Démarrer';});
  });

  document.querySelectorAll('.audio-prototype .record-btn').forEach(btn=>{
    const wrap=btn.closest('.audio-prototype'),status=wrap.querySelector('.record-status'),audio=wrap.querySelector('.record-playback');
    let rec=null,chunks=[];
    btn.addEventListener('click',async()=>{
      if(rec && rec.state==='recording'){rec.stop();btn.textContent='Enregistrer ma lecture';return;}
      if(!navigator.mediaDevices || !window.MediaRecorder){status.textContent='Enregistrement non pris en charge par ce navigateur.';return;}
      try{
        const stream=await navigator.mediaDevices.getUserMedia({audio:true});
        chunks=[];rec=new MediaRecorder(stream);
        rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
        rec.onstop=()=>{const blob=new Blob(chunks,{type:rec.mimeType||'audio/webm'});audio.src=URL.createObjectURL(blob);audio.style.display='block';status.textContent='Enregistrement prêt à être réécouté. Évaluation à connecter.';stream.getTracks().forEach(t=>t.stop());};
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


  const oralText=document.getElementById('oral-source-text');
  const oralStatus=document.getElementById('oral-source-status');
  const oralImage=document.getElementById('oral-image-file');
  const oralPdf=document.getElementById('oral-pdf-file');
  const oralAuthor=document.getElementById('oral-author');
  const oralTextWork=document.getElementById('oral-text-work');
  const oralLines=document.getElementById('oral-lines');
  if(oralText&&oralStatus){
    const key='oral-source-draft-v1';
    const restore=()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{return {}}};
    const saved=restore();
    oralText.value=saved.text||'';
    if(oralAuthor)oralAuthor.value=saved.author||'';
    if(oralTextWork)oralTextWork.value=saved.work||'';
    if(oralLines)oralLines.value=saved.lines||'';
    const persist=()=>{
      try{localStorage.setItem(key,JSON.stringify({
        text:oralText.value,
        author:oralAuthor?.value||'',
        work:oralTextWork?.value||'',
        lines:oralLines?.value||''
      }));}catch{}
      const hasText=oralText.value.trim().length>0;
      if(hasText) oralStatus.textContent='Texte copié-collé prêt. Il reste dans ce navigateur.';
    };
    [oralText,oralAuthor,oralTextWork,oralLines].filter(Boolean).forEach(el=>el.addEventListener('input',persist));
    const resizeImageToDataUrl=(file)=>new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.onerror=()=>reject(new Error("Lecture du fichier impossible."));
      reader.onload=()=>{
        const img=new Image();
        img.onerror=()=>reject(new Error("Image illisible."));
        img.onload=()=>{
          const max=1800,scale=Math.min(1,max/Math.max(img.width,img.height));
          const canvas=document.createElement("canvas");
          canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
          const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,canvas.width,canvas.height);
          resolve(canvas.toDataURL("image/jpeg",0.88));
        };
        img.src=reader.result;
      };
      reader.readAsDataURL(file);
    });

    oralImage?.addEventListener('change',async()=>{
      const file=oralImage.files&&oralImage.files[0];
      if(!file)return;
      oralStatus.textContent='Photo sélectionnée. Lecture du texte…';
      try{
        const imageData=await resizeImageToDataUrl(file);
        const res=await fetch("https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze",{
          method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({exercise:"oral-source-image",image_data_url:imageData})
        });
        const data=await res.json();
        if(!res.ok||!data.ok)throw new Error(data.error||"Extraction indisponible.");
        oralText.value=data.extracted_text||"";
        oralText.dispatchEvent(new Event("input",{bubbles:true}));
        oralStatus.textContent='Texte extrait de la photo. Vérifiez-le mot à mot avant l’entraînement.';
      }catch(e){
        oralStatus.textContent=(e.message||'Extraction indisponible.')+' Vous pouvez copier-coller le texte manuellement.';
      }
    });

    oralPdf?.addEventListener('change',()=>{
      if(oralPdf.files&&oralPdf.files[0]) oralStatus.textContent='PDF sélectionné : '+oralPdf.files[0].name+'. Extraction automatique PDF non activée ; copiez-collez le passage pour l’instant.';
    });
    if(saved.text)oralStatus.textContent='Texte copié-collé restauré depuis ce navigateur.';
  }

  // Oral du Bac — retours critériés sur productions textuelles
  const ORAL_ENDPOINT="https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";
  document.querySelectorAll(".oral-ai-btn").forEach(btn=>btn.addEventListener("click",async()=>{
    const kind=btn.dataset.oralKind;
    const target=document.querySelector('[data-feedback-for="'+kind+'"]');
    const source=(document.getElementById("oral-source-text")?.value||"").trim();
    const author=(document.getElementById("oral-author")?.value||"").trim();
    const work=(document.getElementById("oral-text-work")?.value||"").trim();
    let answer="",instruction="",quote=source;
    if(kind==="explanation"){
      answer=(document.getElementById("oral-explanation")?.value||"").trim();
      instruction="Évalue cette explication linéaire comme entraînement à la première partie de l’oral du bac de français : vérifier la compréhension du mouvement du passage, la précision des analyses, l’appui sur le texte, la qualité de l’interprétation et la clarté du propos. Donne un seul acquis, un seul manque prioritaire et une seule question de reprise. Ne donne pas de note.";
    }else if(kind==="grammar"){
      answer=(document.getElementById("oral-grammar-answer")?.value||"").trim();
      const q=(document.getElementById("oral-grammar-question")?.value||"").trim();
      instruction="Question de grammaire de l’oral du bac : "+q+". Vérifie la notion syntaxique, le lexique grammatical, la fonction ou relation demandée et la pertinence des manipulations utilisées. Une manipulation doit être expliquée par ce qu’elle démontre. Donne un acquis, un manque principal et une question de reprise. Ne donne pas la réponse complète si l’élève peut encore la reconstruire.";
    }else{
      answer=(document.getElementById("oral-interview-answer")?.value||"").trim();
      const chosen=(document.getElementById("oral-work")?.value||"").trim();
      instruction="Simulation de la seconde partie de l’oral du bac de français. Œuvre choisie : "+chosen+". Évalue la capacité à présenter synthétiquement l’œuvre, justifier un choix personnel, défendre une lecture, nuancer, argumenter et entrer dans un dialogue. Donne un acquis, un manque principal, puis formule comme question suivante une vraie relance ouverte d’examinateur fondée sur ce que l’élève vient de dire.";
      quote="";
    }
    if(answer.length<20){
      if(target){target.textContent="Votre réponse est trop courte pour un retour utile.";target.classList.add("show");}
      return;
    }
    btn.disabled=true;
    const old=btn.textContent; btn.textContent="Analyse…";
    if(target){target.className="feedback oral-ai-feedback";target.textContent="";}
    try{
      const res=await fetch(ORAL_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        exercise:"free-response",
        answer,
        context:{title:"Oral du Bac — "+(author&&work?author+" — "+work:kind),instruction,quote,page:"bac-oral",kind:kind==="grammar"?"brevet-grammaire":kind==="explanation"?"analyse":"brevet-redaction"}
      })});
      const data=await res.json();
      if(!res.ok||!data.ok) throw new Error(data.error||"Retour indisponible.");
      const f=data.feedback||{};
      if(target){
        target.innerHTML="<strong>"+(f.diagnostic==="acquis"?"Solide":f.diagnostic==="partiel"?"À préciser":"À reprendre")+"</strong>"+
          "<p><b>Point acquis :</b> "+(f.point_acquis||"—")+"</p>"+
          "<p><b>Priorité :</b> "+(f.manque_principal||"—")+"</p>"+
          "<p><b>"+(kind==="interview"?"Relance":"Pour reprendre")+" :</b> "+(f.question_suivante||"—")+"</p>";
        target.classList.add("show");
      }
    }catch(e){
      if(target){target.textContent=e.message||"Retour indisponible.";target.classList.add("show");}
    }finally{btn.disabled=false;btn.textContent=old;}
  }));



  // Simulation orale — déroulement fidèle en deux parties
  const oralPart1Done=document.getElementById("oral-part1-done");
  const oralInterviewPhase=document.getElementById("oral-interview-phase");
  const oralInterviewFirstDone=document.getElementById("oral-interview-first-done");
  const oralDialogue=document.getElementById("oral-dialogue");
  const oralMessages=document.getElementById("oral-dialogue-messages");
  const oralAnswerDone=document.getElementById("oral-answer-done");
  const oralInterviewFinish=document.getElementById("oral-interview-finish");
  const oralFinalBilan=document.getElementById("oral-final-bilan");
  const oralRestart=document.getElementById("oral-restart");

  if(oralPart1Done){
    const ORAL_ENDPOINT="https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";
    const lockKey="cp-oral-lock-v1";
    const part1Area=document.getElementById("oral-part1-transcript");
    const interviewArea=document.getElementById("oral-interview-transcript");
    const answerArea=document.getElementById("oral-answer-transcript");
    const workArea=document.getElementById("oral-work");
    const grammarQuestion=document.getElementById("oral-grammar-question");
    let part1Feedback=null;
    let interviewFeedback=null;
    let dialogueSaved={};try{dialogueSaved=JSON.parse(localStorage.getItem('oral-dialogue-v1')||'{}')||{};}catch{}
    let dialogueTurns=Array.isArray(dialogueSaved.turns)?dialogueSaved.turns:[];
    const storeDialogue=()=>{try{localStorage.setItem('oral-dialogue-v1',JSON.stringify({turns:dialogueTurns,interview:!oralInterviewPhase.hidden,dialogue:!oralDialogue.hidden,messages:[...oralMessages.querySelectorAll('.oral-dialogue-message')].map(p=>({role:p.classList.contains('student')?'student':'examiner',text:p.querySelector('p').textContent}))}));}catch{}};

    const serviceNote=()=>{const box=document.getElementById('oral-service-status');if(box){box.hidden=false;box.textContent='Le retour personnalisé est indisponible. Vous pouvez poursuivre avec des relances d’entraînement et reprendre votre transcription avec les pistes de relecture finales.';}};
    const reprisePart1='<p>Relisez votre transcription : avez-vous situé le passage, suivi ses mouvements, analysé des mots précis et répondu à la question de grammaire ?</p><p>La transcription ne permet pas de juger la qualité de votre voix ou de votre lecture.</p>';
    const repriseInterview='<p>Votre choix de l’œuvre est-il expliqué par un passage précis ? Vos réponses aux relances développent-elles une idée ou la nuancent-elles ?</p><p>Choisissez un seul point à améliorer pour votre prochaine simulation.</p>';
    const lockUntil=()=>{try{return Number(localStorage.getItem(lockKey)||0);}catch{return 0;}};
    const suspendOral=()=>{
      const host=document.getElementById("oral-simulation");
      if(host && !document.getElementById("oral-lock-message")){
        const box=document.createElement("div");
        box.id="oral-lock-message";
        box.className="examiner-card";
        box.innerHTML='<div class="examiner-label">PAS ENCORE DANS LE SUJET</div><p>Votre réponse ne parle pas encore du sujet : relisez la consigne, puis reprenez. Vous pouvez demander un nouveau retour dès que vous avez réécrit.</p>';
        host.prepend(box);
      }
    };

    if(lockUntil()){try{localStorage.removeItem(lockKey);}catch{}}

    const analyze=async(answer,instruction,quote="",previousAnswer="")=>{
      const res=await fetch(ORAL_ENDPOINT,{
        signal:typeof AbortSignal.timeout==='function'?AbortSignal.timeout(15000):undefined,
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          exercise:"free-response",
          answer,
          previous_answer:previousAnswer,
          context:{
            title:"Oral du Bac",
            instruction,
            quote,
            page:"bac-oral.html",
            kind:"analyse"
          }
        })
      });
      const data=await res.json();
      if(data.blocked && data.reason==="off_topic"){
        suspendOral();
        return {blocked:true};
      }
      if(!res.ok||!data.ok) throw new Error(data.error||"Retour indisponible.");
      return data.feedback||{};
    };

    let speech=null;
    const stopSpeech=()=>{if(!speech)return Promise.resolve();const current=speech;return new Promise(resolve=>{current.stopped=resolve;try{current.rec.stop();}catch{resolve();}setTimeout(resolve,1500);});};
    const speechError=code=>({
      "not-allowed":"L’accès au microphone est refusé. Autorisez-le dans les réglages de votre navigateur, puis réessayez.",
      "service-not-allowed":"Le service vocal du navigateur est indisponible. Vous pouvez saisir ou coller votre transcription.",
      "audio-capture":"Aucun microphone utilisable. Vérifiez le micro choisi dans votre navigateur.",
      "network":"Le service vocal du navigateur ne répond pas. Votre texte reste disponible ; vous pouvez réessayer.",
      "no-speech":"Aucune parole entendue. Vous pouvez réessayer."
    }[code]||"La transcription s’est interrompue. Votre texte est conservé ; vous pouvez réessayer.");
    const attachSpeech=(buttonId,statusId,area)=>{
      const btn=document.getElementById(buttonId),status=document.getElementById(statusId);
      if(!btn||!status||!area)return;
      const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition,idle=btn.textContent;
      status.setAttribute('role','status');btn.setAttribute('aria-describedby',statusId);btn.setAttribute('aria-pressed','false');
      if(!Recognition){btn.disabled=true;status.textContent="La transcription vocale est indisponible dans ce navigateur. Vous pouvez saisir votre transcription.";return;}
      const reset=session=>{btn.textContent=idle;btn.setAttribute('aria-pressed','false');if(speech===session)speech=null;};
      btn.addEventListener('click',()=>{
        if(speech?.btn===btn){stopSpeech();return;}
        if(speech){const previous=speech;speech=null;previous.reset();try{previous.rec.abort();}catch{}}
        const session={btn,rec:null,base:area.value.trim(),error:false,reset:null};
        session.reset=()=>reset(session);speech=session;
        try{
          const rec=new Recognition();session.rec=rec;rec.lang='fr-FR';rec.continuous=true;rec.interimResults=true;
          rec.onstart=()=>{if(speech!==session)return;btn.textContent='Arrêter le micro';btn.setAttribute('aria-pressed','true');status.textContent='Écoute en cours…';const timer=document.querySelector('[data-seconds="'+(buttonId==='oral-part1-mic'?'720':'480')+'"] .timer-start');if(timer&&!/Pause|Terminé/.test(timer.textContent))timer.click();};
          rec.onresult=e=>{if(speech!==session)return;const pieces=[];for(let i=0;i<e.results.length;i++)pieces.push(e.results[i][0]?.transcript||'');area.value=[session.base,pieces.join(' ').trim()].filter(Boolean).join(' ');area.dispatchEvent(new Event('input',{bubbles:true}));};
          rec.onerror=e=>{if(speech!==session)return;session.error=true;status.textContent=speechError(e.error);reset(session);};
          rec.onend=()=>{if(speech===session){reset(session);if(!session.error)status.textContent='Micro arrêté. Votre transcription peut être relue et corrigée.';}session.stopped?.();};
          status.textContent='Ouverture du microphone…';rec.start();
        }catch{reset(session);status.textContent='Le microphone n’a pas pu démarrer. Vous pouvez réessayer ou saisir votre transcription.';}
      });
    };

    attachSpeech("oral-part1-mic","oral-part1-status",part1Area);
    attachSpeech("oral-interview-mic","oral-interview-status",interviewArea);
    attachSpeech("oral-answer-mic","oral-answer-status",answerArea);

    const addMessage=(role,text)=>{
      if(!oralMessages)return;
      const div=document.createElement("div");
      div.className="oral-dialogue-message "+role;
      div.innerHTML="<strong>"+(role==="examiner"?"Examinateur":"Élève")+"</strong><p></p>";
      div.querySelector("p").textContent=text;
      oralMessages.appendChild(div);queueMicrotask(storeDialogue);
    };
    for(const m of Array.isArray(dialogueSaved.messages)?dialogueSaved.messages:[])addMessage(m.role==='student'?'student':'examiner',String(m.text||''));
    if(dialogueSaved.interview)oralInterviewPhase.hidden=false;
    if(dialogueSaved.dialogue)oralDialogue.hidden=false;

    oralPart1Done.addEventListener("click",async()=>{
      await stopSpeech();
      const answer=(part1Area?.value||"").trim();
      if(answer.length<30){alert("La première partie doit contenir une prestation réelle avant de passer à l’entretien.");return;}
      const clock=document.querySelector('[data-seconds="720"] .timer-start');if(clock?.textContent==='Pause')clock.click();
      oralInterviewPhase.hidden=false;storeDialogue();
      oralInterviewPhase.scrollIntoView({behavior:"smooth",block:"start"});
      oralPart1Done.disabled=true;
      try{
        part1Feedback=await analyze(
          answer,
          "Première partie de l’oral du bac. Vérifie uniquement, à partir de la transcription disponible, si l’élève situe le texte, construit une explication appuyée sur le passage et traite la question de grammaire. Ne commente pas la qualité de lecture ou de voix à partir d’une transcription. Donne un acquis, une priorité et une question de reprise, mais ces éléments ne seront montrés qu’au bilan final.",
          (document.getElementById("oral-source-text")?.value||"")+" Question de grammaire : "+(grammarQuestion?.value||"")
        );
        if(part1Feedback?.blocked)return;
      }catch(e){serviceNote();}
      finally{oralPart1Done.disabled=false;}
    });

    oralInterviewFirstDone?.addEventListener("click",async()=>{
      await stopSpeech();
      const answer=(interviewArea?.value||"").trim();
      if(answer.length<20){alert("Présentez d’abord réellement l’œuvre et les raisons de votre choix.");return;}
      oralInterviewFirstDone.disabled=true;
      try{
        interviewFeedback=await analyze(
          answer,
          "Seconde partie de l’oral du bac. L’élève vient de présenter l’œuvre choisie et les raisons de son choix. Formule dans question_suivante UNE relance ouverte d’examinateur, directement fondée sur ce qu’il vient de dire. Ne corrige pas l’élève pendant l’entretien et ne fournis pas de bilan maintenant.",
          (workArea?.value||"")
        );
        if(interviewFeedback?.blocked)return;
        oralDialogue.hidden=false;
        dialogueTurns=[answer];
        addMessage("examiner",interviewFeedback.question_suivante||"Pouvez-vous préciser ce qui, dans cette œuvre, a le plus changé votre manière de la lire ?");
        oralDialogue.scrollIntoView({behavior:"smooth",block:"start"});
      }catch(e){
        serviceNote();oralDialogue.hidden=false;dialogueTurns=[answer];
        addMessage("examiner","Relance d’entraînement : quel passage précis de l’œuvre éclaire le mieux ce que vous venez d’expliquer ?");
        oralDialogue.scrollIntoView({behavior:"smooth",block:"start"});
      }
      finally{oralInterviewFirstDone.disabled=false;}
    });

    oralAnswerDone?.addEventListener("click",async()=>{
      await stopSpeech();
      const answer=(answerArea?.value||"").trim();
      if(answer.length<8){alert("Répondez à la question avant de poursuivre.");return;}
      oralAnswerDone.disabled=true;
      try{
        const f=await analyze(
          answer,
          "Entretien de l’oral du bac. À partir de cette réponse précise, formule dans question_suivante UNE nouvelle relance ouverte d’examinateur. Elle doit rebondir sur ce que l’élève vient réellement de dire, sans donner de correction ni de jugement pendant l’entretien.",
          (workArea?.value||""),
          dialogueTurns[dialogueTurns.length-1]||""
        );
        if(f?.blocked)return;
        addMessage("student",answer);
        addMessage("examiner",f.question_suivante||"Pouvez-vous développer ce point à partir d’un passage précis de l’œuvre ?");
        dialogueTurns.push(answer);
        answerArea.value="";answerArea.dispatchEvent(new Event("input",{bubbles:true}));
      }catch(e){
        serviceNote();addMessage("student",answer);dialogueTurns.push(answer);
        addMessage("examiner","Relance d’entraînement : comment ce passage permet-il de préciser ou de nuancer votre réponse ?");
        answerArea.value="";answerArea.dispatchEvent(new Event("input",{bubbles:true}));
      }
      finally{oralAnswerDone.disabled=false;}
    });

    oralInterviewFinish?.addEventListener("click",async()=>{
      await stopSpeech();const clock=document.querySelector('[data-seconds="480"] .timer-start');if(clock?.textContent==='Pause')clock.click();
      const interviewText=[interviewArea?.value||"",...dialogueTurns.slice(1)].filter(Boolean).join(" ");
      oralInterviewFinish.disabled=true;
      try{
        const finalInterview=await analyze(
          interviewText||interviewArea?.value||"",
          "Bilan final de la seconde partie de l’oral du bac : présentation de l’œuvre et entretien. Donne un seul acquis réel, une seule priorité de reprise et une question de travail pour la prochaine simulation. Ne donne pas de note.",
          (workArea?.value||"")
        );
        if(finalInterview?.blocked)return;
        const p1=document.getElementById("oral-bilan-part1");
        const p2=document.getElementById("oral-bilan-interview");
        const safe=t=>String(t||'—').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
        const renderFeedback=f=>"<p><b>Point acquis :</b> "+safe(f?.point_acquis)+"</p><p><b>Priorité :</b> "+safe(f?.manque_principal)+"</p><p><b>Pour la reprise :</b> "+safe(f?.question_suivante)+"</p>";
        if(p1)p1.innerHTML=part1Feedback&&!part1Feedback.blocked?renderFeedback(part1Feedback):reprisePart1;
        if(p2)p2.innerHTML=renderFeedback(finalInterview);
        oralFinalBilan.hidden=false;
        oralFinalBilan.scrollIntoView({behavior:"smooth",block:"start"});
      }catch(e){
        serviceNote();
        document.getElementById("oral-bilan-part1").innerHTML=reprisePart1;
        document.getElementById("oral-bilan-interview").innerHTML=repriseInterview;
        oralFinalBilan.hidden=false;oralFinalBilan.scrollIntoView({behavior:"smooth",block:"start"});
      }
      finally{oralInterviewFinish.disabled=false;}
    });

    oralRestart?.addEventListener("click",()=>{
      stopSpeech();try{localStorage.removeItem("oral-source-draft-v1");}catch{}
      location.reload();
    });
  }

});
