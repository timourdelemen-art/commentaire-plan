(() => {
  const ENDPOINT="https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";
  const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const excluded=new Set(["contact.html","ia-laboratoire.html"]);
  if(excluded.has(page) || location.pathname.includes("/annales/")) return;

  function clean(s){return String(s||"").replace(/\s+/g," ").trim();}
  function contextFor(area){
    const box=area.closest(".exercise,.workbench,.writing-sim,.stage-card,.bac-work,.method-section")||area.parentElement;
    const instruction=box ? [...box.querySelectorAll(".instruction,h2,h3,p")].map(x=>clean(x.textContent)).filter(Boolean).slice(-6).join(" ") : "";
    const quote=box?.querySelector(".quote,blockquote");
    return {
      page,
      title:clean(document.querySelector("h1")?.textContent||document.title),
      instruction:clean(area.dataset.feedbackInstruction||instruction).slice(0,1800),
      quote:clean(area.dataset.feedbackQuote||quote?.textContent||"").slice(0,1200),
      kind:clean(area.dataset.feedbackKind||"").slice(0,50)
    };
  }

  function mount(area,index){
    if(area.dataset.feedbackMounted==="1"||area.disabled||area.readOnly)return;
    let previousAnswer="";
    const lockKey="cp-exercise-lock:"+page+":"+index;
    const getLockUntil=()=>Number(localStorage.getItem(lockKey)||0);
    const setLocked=(until,feedback,btn)=>{
      localStorage.setItem(lockKey,String(until));
      area.disabled=true;
      btn.disabled=true;
      feedback.innerHTML="<strong>Exercice suspendu</strong><p>Activité interrompue. La réponse est incohérente ou ne traite pas la tâche demandée. Nouvel essai possible dans 24 heures.</p>";
      feedback.classList.add("show");
    };
    area.dataset.feedbackMounted="1";
    const wrap=document.createElement("div");
    wrap.className="free-response-tools";
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="btn red small response-check";
    btn.textContent="Vérifier ma réponse";
    const feedback=document.createElement("div");
    feedback.className="ai-feedback response-feedback";
    feedback.setAttribute("aria-live","polite");
    wrap.append(btn,feedback);
    area.insertAdjacentElement("afterend",wrap);

    const lockUntil=getLockUntil();
    if(lockUntil>Date.now()){
      setLocked(lockUntil,feedback,btn);
      return;
    }else if(lockUntil){
      localStorage.removeItem(lockKey);
    }

    btn.addEventListener("click",async()=>{
      const answer=clean(area.value);
      if(answer.length<8){
        feedback.textContent="Écrivez d’abord une réponse suffisamment développée.";
        feedback.classList.add("show");
        return;
      }
      btn.disabled=true; btn.textContent="Vérification…";
      feedback.classList.remove("show");
      try{
        const response=await fetch(ENDPOINT,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            exercise:"free-response",
            answer,
            context:{...contextFor(area),response_index:index},
            previous_answer:previousAnswer
          })
        });
        const data=await response.json();
        if(data.blocked){
          if(data.reason==="off_topic"||data.reason==="gibberish"){
            setLocked(Date.now()+24*60*60*1000,feedback,btn);
            return;
          }
          feedback.innerHTML="<strong>IA non utilisée</strong><p>"+(data.error||"Reprenez d’abord votre réponse.")+"</p>";
          feedback.classList.add("show");
          return;
        }
        if(!response.ok||!data.ok)throw new Error(data.error||"Retour indisponible.");
        const f=data.feedback||{};
        feedback.innerHTML=
          "<strong>"+(f.diagnostic==="acquis"?"Réponse solide":f.diagnostic==="partiel"?"Réponse à préciser":"Réponse à reprendre")+"</strong>"+
          "<p><b>"+(/^Aucun acquis/i.test(f.point_acquis||"")?"État de la réponse":"Point acquis")+" :</b> "+(f.point_acquis||"—")+"</p>"+
          "<p><b>À reprendre :</b> "+(f.manque_principal||"—")+"</p>"+
          "<p><b>Pour améliorer :</b> "+(f.question_suivante||"Pouvez-vous préciser votre réponse ?")+"</p>";
        feedback.classList.add("show");
        previousAnswer=answer;
      }catch(e){
        feedback.textContent=e.message||"Le retour n’est pas disponible pour le moment.";
        feedback.classList.add("show");
      }finally{
        if(getLockUntil()>Date.now()){
          btn.disabled=true;
          area.disabled=true;
        }else{
          btn.disabled=false;
          btn.textContent="Vérifier ma réponse";
        }
      }
    });
  }

  let counter=0;
  function scan(root=document){
    root.querySelectorAll?.("textarea").forEach(area=>{
      if(area.dataset.feedbackMounted==="1"||area.closest("form[action]")||area.dataset.feedback==="off")return;
      mount(area,counter++);
    });
  }
  scan();

  const observer=new MutationObserver(mutations=>{
    for(const mutation of mutations){
      for(const node of mutation.addedNodes){
        if(node.nodeType!==1) continue;
        if(node.matches?.("textarea")) scan(node.parentElement||document);
        else scan(node);
      }
    }
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();