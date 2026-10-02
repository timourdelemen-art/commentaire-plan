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
    timerReset:document.getElementById("timerReset"), accessStatus:document.getElementById("accessStatus"),
    manual:document.getElementById("manualHelp")
  };

  if (!item) {
    document.getElementById("trainingApp").innerHTML="<section class='pagehead'><div><div class='kicker'>ANNALE INTROUVABLE</div><h1>Ce parcours n'existe pas.</h1><a class='official-link' href='../annales.html'>Annales →</a></div></section>";
    return;
  }

  const storageKey="annale-training:"+id;
  const state=JSON.parse(localStorage.getItem(storageKey)||'{"step":0,"answers":{},"feedbacks":{},"totalElapsed":0,"stepElapsed":0}');
  state.answers=state.answers||{};
  state.feedbacks=state.feedbacks||{};
  state.totalElapsed=state.totalElapsed||0;
  state.stepElapsed=state.stepElapsed||0;
  let running=false, tick=null;

  els.meta.textContent=[item.examen,item.annee,item.zone,item.serie,item.epreuve].join(" · ");
  els.title.textContent=item.auteur+" — "+item.oeuvre;
  els.context.textContent=item.contexte;
  els.subject.href=item.sourceOfficielle;
  els.guided.href=item.parcours||"../annales.html";
  window.AccessControl?.renderBadge(els.accessStatus);

  const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
  const save=()=>localStorage.setItem(storageKey,JSON.stringify(state));
  const status=()=>window.AccessControl?.getStatus?.()||{premium:false};

  function updateTimers(){
    els.stepTimer.textContent=fmt(state.stepElapsed);
    els.totalTimer.textContent=fmt(state.totalElapsed);
    const step=item.etapes[state.step];
    if(step && step.temps) els.stepTimer.classList.toggle("over",state.stepElapsed>step.temps);
  }

  function startTimer(){
    if(running)return;
    running=true; els.timerToggle.textContent="Pause";
    tick=setInterval(()=>{state.stepElapsed++;state.totalElapsed++;updateTimers();save();},1000);
  }
  function pauseTimer(){ running=false; els.timerToggle.textContent="Reprendre"; clearInterval(tick); }
  els.timerToggle.addEventListener("click",()=>running?pauseTimer():startTimer());
  els.timerReset.addEventListener("click",()=>{pauseTimer();state.stepElapsed=0;state.totalElapsed=0;updateTimers();save();});

  function showStepPaywall(step){
    const isPremium=step.access==="premium" && !status().premium;
    if(!isPremium) return false;
    els.answer.disabled=true;
    els.ai.disabled=true;
    els.next.disabled=true;
    els.feedback.innerHTML="<div class='paywall-box'><div class='kicker'>ACCÈS COMPLET</div><h3>Cette étape fait partie de l’entraînement approfondi.</h3><p>Les étapes gratuites permettent d’essayer réellement le protocole. L’accès complet ouvre les reprises, la construction complète du plan, la rédaction guidée et les questions premium du Brevet.</p><a class='btn red small' href='../offre.html?source=annale-"+encodeURIComponent(id)+"'>Voir l’accès complet →</a></div>";
    els.feedback.classList.add("show");
    return true;
  }

  function renderManual(step){
    if(!els.manual) return;
    const choices=step.manual||[];
    if(!choices.length){els.manual.hidden=true;els.manual.innerHTML="";return;}
    els.manual.hidden=false;
    els.manual.innerHTML="<div class='kicker'>AIDE PROCÉDÉS · EXTRAIT PONCTUEL</div><p>Le manuel complet n’est pas affiché ici. Pour cette question, regardez seulement ces pistes :</p><div class='manual-choice-list'>"+
      choices.map(x=>"<button type='button' class='manual-choice'>"+x+"</button>").join("")+
      "</div><p class='micro'>Choisissez seulement ce qui permet de prouver votre analyse. Un procédé n’a jamais un effet automatique.</p><a class='official-link' href='../manuel-procedes.html'>Voir le principe du manuel →</a>";
    els.manual.querySelectorAll(".manual-choice").forEach(btn=>btn.addEventListener("click",()=>{
      btn.classList.toggle("selected");
    }));
  }

  function render(){
    if(state.step>=item.etapes.length)return renderSummary();
    const step=item.etapes[state.step];
    els.summary.hidden=true;
    document.querySelector(".annale-step-card").hidden=false;
    els.answer.disabled=false; els.ai.disabled=false; els.next.disabled=false;
    els.count.textContent="ÉTAPE "+(state.step+1)+" / "+item.etapes.length+" · TEMPS CONSEILLÉ "+fmt(step.temps||0)+(step.points!=null?" · "+step.points+" PT"+(step.points>1?"S":""):"");
    els.label.textContent=(step.kind||step.id).toUpperCase();
    els.stepTitle.textContent=step.titre;
    els.instruction.textContent=step.consigne;
    els.hint.textContent="Repère : "+step.aide;
    els.answer.value=state.answers[step.id]||"";
    els.feedback.classList.remove("show");
    els.feedback.textContent="";
    renderManual(step);
    updateTimers();
    showStepPaywall(step);
  }

  function protocolFor(step){
    const core=[
      "L’élève doit répondre avant toute aide.",
      "Commencer par identifier un point acquis, puis un seul manque principal.",
      "Poser une question de reprise avant de donner une solution complète.",
      "Ne jamais inventer une citation, une image ou un élément absent du support.",
      "Ne jamais accepter un effet générique du type « cela insiste » ou « cela met en valeur » sans précision."
    ];
    if(item.type==="bac-commentaire"){
      core.push(
        "Une grande partie est une RÉPONSE nécessaire à la problématique, jamais un thème.",
        "Le mot « établissement » est interdit pour désigner une partie : employer RÉPONSE.",
        "La NÉCESSITÉ explique pourquoi cette réponse doit intervenir dans la démonstration.",
        "Une TRANSITION est uniquement une question simple qui fait apparaître ce qu’il reste encore à expliquer.",
        "RÉALISATION = ce que le texte fait ; ÉLÉMENT TEXTUEL = ce qui le montre ; PROCÉDÉ = comment l’élément est construit ; EFFET = ce que cela change ici.",
        "Ne pas proposer le commentaire complet quand l’élève travaille une étape intermédiaire."
      );
    }else{
      core.push(
        "Respecter exactement le nombre d’éléments demandé et le barème indiqué.",
        "Pour une question de compréhension, exiger la justification textuelle lorsqu’elle est demandée.",
        "Pour la grammaire et la réécriture, vérifier méthodiquement toutes les transformations concernées.",
        "Pour une image non fournie à l’IA, signaler la limite et ne rien inventer."
      );
    }
    return core.join("\n- ");
  }

  async function askAI(){
    const step=item.etapes[state.step];
    if(step.access==="premium" && !status().premium){
      showStepPaywall(step); return;
    }
    if(window.AccessControl && !window.AccessControl.canUseAI()){
      window.AccessControl.showPaywall(els.feedback); return;
    }
    const answer=els.answer.value.trim();
    if(answer.length<8){els.feedback.textContent="Écrivez d’abord une réponse suffisamment développée.";els.feedback.classList.add("show");return;}
    els.ai.disabled=true; els.ai.textContent="Analyse…";
    try{
      const response=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        exercise:"annale-guided",
        answer,
        context:{
          annale_id:id,
          examen:item.examen, type:item.type, annee:item.annee, zone:item.zone, serie:item.serie,
          auteur:item.auteur, oeuvre:item.oeuvre, etape:step.id, kind:step.kind,
          consigne:step.consigne, aide:step.aide, points:step.points||null,
          protocol:protocolFor(step),
          manual_candidates:step.manual||[],
          instruction_to_model:"Évaluer uniquement la réponse à cette étape. Ne pas anticiper les étapes suivantes."
        }
      })});
      const data=await response.json();
      if(!response.ok||!data.ok)throw new Error(data.error||"Diagnostic indisponible.");
      const f=data.feedback||{};
      const html="<strong>Diagnostic : "+(f.diagnostic||"réponse à reprendre")+"</strong>"+
        "<p><b>Point acquis :</b> "+(f.point_acquis||"—")+"</p>"+
        "<p><b>À reprendre :</b> "+(f.manque_principal||"—")+"</p>"+
        "<p><b>Question pour améliorer :</b> "+(f.question_suivante||"Pouvez-vous préciser votre réponse ?")+"</p>";
      els.feedback.innerHTML=html;
      els.feedback.classList.add("show");
      state.feedbacks[step.id]=f; save();
      if(window.AccessControl){window.AccessControl.consumeDiagnostic();window.AccessControl.renderBadge(els.accessStatus);}
    }catch(e){
      els.feedback.textContent=e.message||"Le diagnostic IA n'est pas disponible pour le moment.";
      els.feedback.classList.add("show");
    }finally{
      els.ai.disabled=false; els.ai.textContent="Demander à l’IA";
    }
  }

  els.ai.textContent="Demander à l’IA";
  els.ai.addEventListener("click",askAI);
  els.next.addEventListener("click",()=>{
    const step=item.etapes[state.step];
    if(step.access==="premium" && !status().premium){showStepPaywall(step);return;}
    state.answers[step.id]=els.answer.value.trim();
    state.step++; state.stepElapsed=0; save(); render();
  });

  function renderSummary(){
    pauseTimer();
    document.querySelector(".annale-step-card").hidden=true;
    els.summary.hidden=false;
    if(els.manual)els.manual.hidden=true;
    els.count.textContent="PARCOURS TERMINÉ · "+fmt(state.totalElapsed);
    els.summaryContent.innerHTML=item.etapes.map(s=>"<article class='summary-step'><h3>"+s.titre+"</h3><p>"+(state.answers[s.id]||"—")+"</p></article>").join("");
    els.restart.href=item.type==="bac-commentaire"?"../bac-mode-examen.html":"../annales.html#brevet";
  }

  render();
})();