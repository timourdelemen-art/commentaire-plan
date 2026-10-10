(() => {
  const AI_TEMPORARILY_DISABLED=false;
  if(AI_TEMPORARILY_DISABLED) return;
  const area=document.getElementById("brevet-writing");
  const btn=document.getElementById("finish-brevet-writing");
  const feedback=document.getElementById("brevet-writing-feedback");
  if(!area||!btn||!feedback)return;
  const ENDPOINT="https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";
  btn.addEventListener("click",async()=>{
    const answer=area.value.trim();
    if(answer.length<80){
      feedback.textContent="Rédigez d’abord un texte suffisamment développé avant de demander la remarque.";
      feedback.classList.add("show"); return;
    }
    btn.disabled=true; btn.textContent="Lecture en cours…";
    try{
      const r=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        exercise:"free-response",
        answer,
        context:{
          page:"brevet-redaction.html",
          title:"Brevet — rédaction, sujet de réflexion",
          kind:"brevet-redaction",
          instruction:"Brevet, sujet de réflexion (sujet officiel DNB 2021, série générale) : « Dans son poème, Aragon évoque la figure d’un héros ordinaire. Selon vous, un comportement héroïque est-il à la portée de tous ? Vous répondrez à cette question dans un texte organisé, en vous appuyant sur vos connaissances, vos lectures et votre culture personnelle. » Le poème n’est pas fourni : ne l’exigez pas et n’en citez rien. Évaluez après rédaction : réponse au sujet ; introduction (une situation concrète, la question, le chemin annoncé) ; paragraphes qui s’enchaînent, chacun répondant à ce que le précédent a laissé ouvert, avec des transitions sous forme de questions ouvertes ; exemples développés ; conclusion (une réponse nette, puis ce qui reste ouvert) ; langue. Vouvoyez l’élève. Donnez un seul point acquis et une seule priorité de reprise, sans réécrire le texte.",
          response_index:0
        }
      })});
      const data=await r.json();
      if(!r.ok||!data.ok)throw new Error(data.error||"Remarque indisponible.");
      const f=data.feedback||{};
      feedback.innerHTML="<strong>"+(f.diagnostic==="acquis"?"Réponse solide":f.diagnostic==="partiel"?"Réponse à préciser":"Réponse à reprendre")+"</strong>"+
      "<p><b>Ce qui fonctionne :</b> "+(f.point_acquis||"—")+"</p>"+
      "<p><b>Priorité :</b> "+(f.manque_principal||"—")+"</p>"+
      "<p><b>Pour reprendre :</b> "+(f.question_suivante||"Que pouvez-vous améliorer en priorité ?")+"</p>";
      feedback.classList.add("show");
    }catch(e){
      feedback.textContent=e.message||"La remarque n’est pas disponible pour le moment. Votre texte est conservé."; feedback.classList.add("show");
    }finally{btn.disabled=false;btn.textContent="Terminer et obtenir une remarque";}
  });
})();