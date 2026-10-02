(() => {
  const ENDPOINT="https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";

  function feedbackHTML(f){
    return "<div class='ai-feedback-grid'>"+
      "<div><b>Diagnostic</b><p>"+escapeHTML(f.diagnostic)+"</p></div>"+
      "<div><b>Point acquis</b><p>"+escapeHTML(f.point_acquis)+"</p></div>"+
      "<div><b>À reprendre</b><p>"+escapeHTML(f.manque_principal)+"</p></div>"+
      "<div><b>Question suivante</b><p>"+escapeHTML(f.question_suivante)+"</p></div>"+
      "</div>";
  }
  function escapeHTML(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));}

  async function analyze(exercise,answer,target,source=""){
    if(!answer || answer.trim().length<8){
      target.innerHTML="<strong>Réponse trop courte.</strong><p>Écris d’abord une vraie tentative avant de demander un diagnostic.</p>";
      target.classList.add("show"); return;
    }
    if(window.AccessControl && !window.AccessControl.canUseAI()){
      window.AccessControl.showPaywall(target); return;
    }
    target.innerHTML="<strong>Analyse en cours…</strong>";
    target.classList.add("show");
    try{
      const res=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({exercise,answer,source})});
      const data=await res.json();
      if(!res.ok || !data.ok) throw new Error(data.error||"Erreur");
      target.innerHTML=feedbackHTML(data.feedback);
      if(window.AccessControl){window.AccessControl.consumeDiagnostic();}
    }catch(e){
      target.innerHTML="<strong>Diagnostic indisponible.</strong><p>Ta réponse est conservée. Tu peux réessayer sans la retaper.</p>";
    }
  }

  function attach(block){
    const exercise=block.dataset.aiExercise;
    if(!exercise)return;
    let button=block.querySelector("[data-ai-send]");
    let feedback=block.querySelector("[data-ai-feedback]");
    if(!button){
      button=document.createElement("button");
      button.type="button"; button.className="btn red small ai-inline-send"; button.dataset.aiSend="";
      button.textContent="Diagnostic IA →";
      block.appendChild(button);
    }
    if(!feedback){
      feedback=document.createElement("div");
      feedback.className="feedback ai-inline-feedback"; feedback.dataset.aiFeedback="";
      block.appendChild(feedback);
    }
    button.addEventListener("click",()=>{
      const fields=[...block.querySelectorAll("textarea[data-ai-answer], input[data-ai-answer]")];
      const answer=(fields.length?fields:[...block.querySelectorAll("textarea")]).map((x,i)=>{
        const label=x.closest("label")?.childNodes?.[0]?.textContent?.trim()||("Réponse "+(i+1));
        return label+" : "+x.value.trim();
      }).filter(x=>!x.endsWith(": ")).join("\n\n");
      let source="";
      const sourceId=block.dataset.aiSource;
      if(sourceId) source=document.getElementById(sourceId)?.value||document.getElementById(sourceId)?.textContent||"";
      analyze(exercise,answer,feedback,source);
    });
  }

  document.addEventListener("DOMContentLoaded",()=>document.querySelectorAll("[data-ai-exercise]").forEach(attach));
  window.AIFeedback={analyze};
})();