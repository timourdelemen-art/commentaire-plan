(() => {
  const AI_TEMPORARILY_DISABLED=true;
  if(AI_TEMPORARILY_DISABLED) return;
  const area=document.getElementById("brevet-writing");
  const btn=document.getElementById("finish-brevet-writing");
  const feedback=document.getElementById("brevet-writing-feedback");
  if(!area||!btn||!feedback)return;
  const ENDPOINT="https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";
  btn.addEventListener("click",async()=>{
    const answer=area.value.trim();
    if(answer.length<80){
      feedback.textContent="Rédigez d’abord une réponse suffisamment développée avant de demander le bilan.";
      feedback.classList.add("show"); return;
    }
    btn.disabled=true; btn.textContent="Bilan en cours…";
    try{
      const r=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        exercise:"free-response",
        answer,
        context:{
          page:"brevet-redaction.html",
          title:"Brevet — rédaction argumentée",
          instruction:"Sujet : « Vaut-il mieux vivre tranquillement ou vivre des aventures ? Vous développerez une réponse argumentée et illustrée. » Évaluer après rédaction : respect du sujet, organisation, développement des arguments, exemples, correction et précision de la langue. Donner un seul point acquis et une seule priorité de reprise.",
          response_index:0
        }
      })});
      const data=await r.json();
      if(!r.ok||!data.ok)throw new Error(data.error||"Bilan indisponible.");
      const f=data.feedback||{};
      feedback.innerHTML="<strong>"+(f.diagnostic==="acquis"?"Réponse solide":f.diagnostic==="partiel"?"Réponse à préciser":"Réponse à reprendre")+"</strong>"+
      "<p><b>Ce qui fonctionne :</b> "+(f.point_acquis||"—")+"</p>"+
      "<p><b>Priorité :</b> "+(f.manque_principal||"—")+"</p>"+
      "<p><b>Pour reprendre :</b> "+(f.question_suivante||"Que pouvez-vous améliorer en priorité ?")+"</p>";
      feedback.classList.add("show");
    }catch(e){
      feedback.textContent=e.message||"Le bilan n’est pas disponible pour le moment."; feedback.classList.add("show");
    }finally{btn.disabled=false;btn.textContent="Terminer et obtenir un bilan";}
  });
})();