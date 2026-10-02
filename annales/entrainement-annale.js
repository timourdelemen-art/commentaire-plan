(() => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const item = window.ANNALES_CATALOGUE && window.ANNALES_CATALOGUE[id];
  const ENDPOINT = "https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";

  const els = {
    meta:document.getElementById("trainingMeta"), title:document.getElementById("trainingTitle"),
    context:document.getElementById("trainingContext"), subject:document.getElementById("officialSubject"),
    guided:document.getElementById("guidedPath"), count:document.getElementById("stepCount"),
    label:document.getElementById("stepLabel"), stepTitle:document.getElementById("stepTitle"),
    instruction:document.getElementById("stepInstruction"), hint:document.getElementById("stepHint"),
    answer:document.getElementById("studentAnswer"), ai:document.getElementById("aiCheck"),
    next:document.getElementById("saveNext"), feedback:document.getElementById("aiFeedback"),
    summary:document.getElementById("summary"), summaryContent:document.getElementById("summaryContent"),
    restart:document.getElementById("restartExam"), stepTimer:document.getElementById("stepTimer"),
    totalTimer:document.getElementById("totalTimer"), timerToggle:document.getElementById("timerToggle"),
    timerReset:document.getElementById("timerReset")
  };

  if (!item) {
    document.getElementById("trainingApp").innerHTML="<section class='pagehead'><div><div class='kicker'>ANNALE INTROUVABLE</div><h1>Ce parcours n'existe pas.</h1><a class='official-link' href='../annales.html'>Annales →</a></div></section>";
    return;
  }

  const storageKey="annale-training:"+id;
  const state=JSON.parse(localStorage.getItem(storageKey)||'{"step":0,"answers":{},"totalElapsed":0,"stepElapsed":0}');
  state.answers=state.answers||{};
  state.totalElapsed=state.totalElapsed||0;
  state.stepElapsed=state.stepElapsed||0;
  let running=false, tick=null;

  els.meta.textContent=[item.examen,item.annee,item.zone,item.serie,item.epreuve].join(" · ");
  els.title.textContent=item.auteur+" — "+item.oeuvre;
  els.context.textContent=item.contexte;
  els.subject.href=item.sourceOfficielle;
  els.guided.href=item.parcours;

  const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
  const save=()=>localStorage.setItem(storageKey,JSON.stringify(state));

  function updateTimers(){
    els.stepTimer.textContent=fmt(state.stepElapsed);
    els.totalTimer.textContent=fmt(state.totalElapsed);
    const step=item.etapes[state.step];
    if(step && step.temps){
      els.stepTimer.classList.toggle("over",state.stepElapsed>step.temps);
    }
  }

  function startTimer(){
    if(running)return;
    running=true; els.timerToggle.textContent="Pause";
    tick=setInterval(()=>{state.stepElapsed++;state.totalElapsed++;updateTimers();save();},1000);
  }
  function pauseTimer(){
    running=false; els.timerToggle.textContent="Reprendre"; clearInterval(tick);
  }

  els.timerToggle.addEventListener("click",()=>running?pauseTimer():startTimer());
  els.timerReset.addEventListener("click",()=>{pauseTimer();state.stepElapsed=0;state.totalElapsed=0;updateTimers();save();});

  function render(){
    if(state.step>=item.etapes.length)return renderSummary();
    const step=item.etapes[state.step];
    els.summary.hidden=true;
    document.querySelector(".annale-step-card").hidden=false;
    els.count.textContent="ÉTAPE "+(state.step+1)+" / "+item.etapes.length+" · TEMPS CONSEILLÉ "+fmt(step.temps||0);
    els.label.textContent=step.id.toUpperCase();
    els.stepTitle.textContent=step.titre;
    els.instruction.textContent=step.consigne;
    els.hint.textContent="Repère : "+step.aide;
    els.answer.value=state.answers[step.id]||"";
    els.feedback.classList.remove("show");
    els.feedback.textContent="";
    updateTimers();
  }

  async function askAI(){
    const step=item.etapes[state.step];
    const answer=els.answer.value.trim();
    if(answer.length<8){els.feedback.textContent="Écrivez d'abord une réponse suffisamment développée.";els.feedback.classList.add("show");return;}
    els.ai.disabled=true; els.ai.textContent="Analyse…";
    try{
      const response=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        exercise:"annale-guided",
        answer,
        context:{
          annale_id:id,
          examen:item.examen, annee:item.annee, zone:item.zone, serie:item.serie,
          auteur:item.auteur, oeuvre:item.oeuvre, etape:step.id,
          consigne:step.consigne, aide:step.aide
        }
      })});
      const data=await response.json();
      if(!response.ok||!data.ok)throw new Error(data.error||"Diagnostic indisponible.");
      const f=data.feedback;
      els.feedback.innerHTML="<strong>Diagnostic : "+f.diagnostic+"</strong><p><b>Point acquis :</b> "+f.point_acquis+"</p><p><b>À reprendre :</b> "+f.manque_principal+"</p><p><b>Question :</b> "+f.question_suivante+"</p>";
      els.feedback.classList.add("show");
    }catch(e){
      els.feedback.textContent=e.message||"Le diagnostic IA n'est pas disponible pour le moment.";
      els.feedback.classList.add("show");
    }finally{
      els.ai.disabled=false; els.ai.textContent="Diagnostic IA";
    }
  }

  els.ai.addEventListener("click",askAI);
  els.next.addEventListener("click",()=>{
    const step=item.etapes[state.step];
    state.answers[step.id]=els.answer.value.trim();
    state.step++;
    state.stepElapsed=0;
    save();
    render();
  });

  function renderSummary(){
    pauseTimer();
    document.querySelector(".annale-step-card").hidden=true;
    els.summary.hidden=false;
    els.count.textContent="PARCOURS TERMINÉ · "+fmt(state.totalElapsed);
    els.summaryContent.innerHTML=item.etapes.map(s=>"<article class='summary-step'><h3>"+s.titre+"</h3><p>"+(state.answers[s.id]||"—")+"</p></article>").join("");
    els.restart.href="../mode-bac.html";
  }

  render();
})();