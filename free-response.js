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
      instruction:instruction.slice(0,1800),
      quote:clean(quote?.textContent||"").slice(0,1200)
    };
  }

  function mount(area,index){
    if(area.dataset.feedbackMounted==="1"||area.disabled||area.readOnly)return;
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
            context:{...contextFor(area),response_index:index}
          })
        });
        const data=await response.json();
        if(!response.ok||!data.ok)throw new Error(data.error||"Retour indisponible.");
        const f=data.feedback||{};
        feedback.innerHTML=
          "<strong>"+(f.diagnostic==="acquis"?"Réponse solide":f.diagnostic==="partiel"?"Réponse à préciser":"Réponse à reprendre")+"</strong>"+
          "<p><b>Point acquis :</b> "+(f.point_acquis||"—")+"</p>"+
          "<p><b>À reprendre :</b> "+(f.manque_principal||"—")+"</p>"+
          "<p><b>Pour améliorer :</b> "+(f.question_suivante||"Pouvez-vous préciser votre réponse ?")+"</p>";
        feedback.classList.add("show");
      }catch(e){
        feedback.textContent=e.message||"Le retour n’est pas disponible pour le moment.";
        feedback.classList.add("show");
      }finally{
        btn.disabled=false; btn.textContent="Vérifier ma réponse";
      }
    });
  }

  document.querySelectorAll("textarea").forEach((area,index)=>{
    if(area.closest("form[action]")||area.dataset.feedback==="off")return;
    mount(area,index);
  });
})();