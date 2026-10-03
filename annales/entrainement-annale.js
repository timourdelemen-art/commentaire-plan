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
    manual:document.getElementById("manualHelp"), helpButton:document.getElementById("helpButton"),
    helpLevel:document.getElementById("helpLevel"), trainingMode:document.getElementById("trainingMode"),
    targetedPicker:document.getElementById("targetedPicker")
  };

  if (!item) {
    document.getElementById("trainingApp").innerHTML="<section class='pagehead'><div><div class='kicker'>ANNALE INTROUVABLE</div><h1>Ce parcours n'existe pas.</h1><a class='official-link' href='../annales.html'>Annales →</a></div></section>";
    return;
  }

  const storageKey="annale-training:"+id;
  const state=JSON.parse(localStorage.getItem(storageKey)||'{"step":0,"answers":{},"feedbacks":{},"totalElapsed":0,"stepElapsed":0,"mode":"guided","help":{}}');
  state.answers=state.answers||{};
  state.feedbacks=state.feedbacks||{};
  state.totalElapsed=state.totalElapsed||0;
  state.stepElapsed=state.stepElapsed||0;
  state.mode=state.mode||"guided";
  state.help=state.help||{};
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
  const currentStep=()=>item.etapes[state.step];

  const TARGETS=[
    ["problematique","Problématique","Formuler la question qui fait apparaître ce que le texte oblige à expliquer."],
    ["plan","Plan","Construire deux ou trois réponses nécessaires à la problématique."],
    ["preuves","Procédés & effets","Repérer des éléments, nommer des procédés utiles et expliquer leur effet ici."],
    ["intro","Introduction","Rédiger une introduction brève et fonctionnelle."],
    ["partie","Rédiger une partie","Développer une réponse en la prouvant par plusieurs analyses."],
    ["transitions","Transition","Écrire la seule question qui fait apparaître ce qu’il reste à expliquer."],
    ["raccord","Transition","Écrire la seule question qui fait apparaître ce qu’il reste à expliquer."],
    ["conclusion","Conclusion","Synthétiser les effets sans résumer mécaniquement le plan."]
  ];

  function targetedSteps(){
    const seen=new Set();
    return TARGETS.map(([stepId,label,description])=>{
      const index=item.etapes.findIndex(s=>s.id===stepId);
      if(index<0) return null;
      const canonical=label==="Transition"?"transition":stepId;
      if(seen.has(canonical)) return null;
      seen.add(canonical);
      return {index,step:item.etapes[index],label,description};
    }).filter(Boolean);
  }

  function updateTimers(){
    els.stepTimer.textContent=fmt(state.stepElapsed);
    els.totalTimer.textContent=fmt(state.totalElapsed);
    const step=currentStep();
    const over=Boolean(step && step.temps && state.stepElapsed>step.temps);
    els.stepTimer.classList.toggle("over",over);
    if(over) els.stepTimer.setAttribute("title","Temps conseillé dépassé : terminez votre phrase puis passez à la reprise.");
    else els.stepTimer.removeAttribute("title");
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
    els.helpButton.disabled=true;
    els.feedback.innerHTML="<div class='paywall-box'><div class='kicker'>ACCÈS COMPLET</div><h3>Cette étape fait partie de l’entraînement approfondi.</h3><p>Le gratuit permet d’essayer un vrai parcours. L’accès complet ouvre toutes les batteries d’exercices ciblés, les reprises et les annales guidées pendant 12 mois.</p><a class='btn red small' href='../offre.html?source=annale-"+encodeURIComponent(id)+"'>Voir l’accès complet →</a></div>";
    els.feedback.classList.add("show");
    return true;
  }

  const PROCEDURE_DISTRACTORS=["métaphore","comparaison","anaphore","gradation","personnification","chiasme","parallélisme","métonymie","périphrase","ironie","ellipse","retardement de l’information"];

  function procedureChoices(step){
    const relevant=(step.manual||[]).slice(0,2);
    const distractors=PROCEDURE_DISTRACTORS.filter(x=>!relevant.some(y=>y.toLowerCase()===x.toLowerCase())).slice(0,Math.max(0,4-relevant.length));
    return [...relevant,...distractors].slice(0,4);
  }

  function renderManual(step,visible=false){
    if(!els.manual) return;
    const choices=procedureChoices(step);
    if(!visible || !choices.length){els.manual.hidden=true;els.manual.innerHTML="";return;}
    els.manual.hidden=false;
    els.manual.innerHTML="<div class='kicker'>AIDE PROGRESSIVE · PROCÉDÉS POSSIBLES</div><p>Si vous n’arrivez pas à nommer le procédé seul, choisissez d’abord parmi ces pistes. Vous devrez ensuite expliquer l’effet précis dans le passage.</p><div class='manual-choice-list'>"+
      choices.map(x=>"<button type='button' class='manual-choice'>"+x+"</button>").join("")+
      "</div><p class='micro'>Le choix ne remplace pas l’explication. Un procédé n’a jamais un effet automatique.</p>";
    els.manual.querySelectorAll(".manual-choice").forEach(btn=>btn.addEventListener("click",()=>{
      els.manual.querySelectorAll(".manual-choice").forEach(x=>x.classList.remove("selected"));
      btn.classList.add("selected");
    }));
  }

  function renderHelp(step){
    const level=state.help[step.id]||0;
    els.hint.hidden=level<1;
    els.hint.textContent=level>=1 ? "Indice : "+step.aide : "";
    renderManual(step,level>=2 && (step.manual||[]).length>0);
    if(level===0){
      els.helpButton.hidden=false;
      els.helpButton.disabled=false;
      els.helpButton.textContent="J’ai besoin d’un indice";
      els.helpLevel.textContent="";
    }else if(level===1 && (step.manual||[]).length){
      els.helpButton.hidden=false;
      els.helpButton.disabled=false;
      els.helpButton.textContent="J’ai encore besoin d’aide";
      els.helpLevel.textContent="Indice 1 / 2";
    }else{
      els.helpButton.hidden=true;
      els.helpLevel.textContent=(step.manual||[]).length ? "Aide 2 / 2" : "Indice affiché";
    }
  }

  function renderTargetedPicker(){
    if(item.type!=="bac-commentaire" || !els.trainingMode) return;
    els.trainingMode.hidden=false;
    els.targetedPicker.hidden=state.mode!=="targeted";
    els.trainingMode.querySelectorAll("[data-mode]").forEach(btn=>btn.classList.toggle("active",btn.dataset.mode===state.mode));
    if(state.mode!=="targeted") return;
    const cards=targetedSteps();
    els.targetedPicker.innerHTML="<div class='targeted-picker-head'><strong>Choisissez un geste.</strong><span>Chaque exercice est chronométré et peut être refait.</span></div><div class='targeted-grid'>"+
      cards.map(({index,step,label,description})=>"<button type='button' class='targeted-card"+(index===state.step?" active":"")+"' data-step='"+index+"'><span>"+fmt(step.temps||0)+"</span><strong>"+label+"</strong><small>"+description+"</small></button>").join("")+
      "</div>";
    els.targetedPicker.querySelectorAll("[data-step]").forEach(btn=>btn.addEventListener("click",()=>{
      pauseTimer();
      state.step=Number(btn.dataset.step);
      state.stepElapsed=0;
      state.help[currentStep().id]=0;
      save();
      render();
      renderTargetedPicker();
      startTimer();
      document.querySelector(".annale-workspace")?.scrollIntoView({behavior:"smooth",block:"start"});
    }));
  }

  if(item.type==="bac-commentaire" && els.trainingMode){
    els.trainingMode.querySelectorAll("[data-mode]").forEach(btn=>btn.addEventListener("click",()=>{
      state.mode=btn.dataset.mode;
      if(state.mode==="guided" && state.step>=item.etapes.length) state.step=0;
      state.stepElapsed=0;
      save();
      renderTargetedPicker();
      render();
    }));
  }

  els.helpButton.addEventListener("click",()=>{
    const step=currentStep();
    const max=(step.manual||[]).length?2:1;
    state.help[step.id]=Math.min(max,(state.help[step.id]||0)+1);
    save();
    renderHelp(step);
  });

  function render(){
    if(state.step>=item.etapes.length)return renderSummary();
    const step=currentStep();
    els.summary.hidden=true;
    document.querySelector(".annale-step-card").hidden=false;
    els.answer.disabled=false; els.ai.disabled=false; els.next.disabled=false; els.helpButton.disabled=false;
    const prefix=state.mode==="targeted"?"EXERCICE CIBLÉ":"ÉTAPE "+(state.step+1)+" / "+item.etapes.length;
    els.count.textContent=prefix+" · TEMPS CONSEILLÉ "+fmt(step.temps||0)+(step.points!=null?" · "+step.points+" PT"+(step.points>1?"S":""):"");
    els.label.textContent=(step.kind||step.id).toUpperCase();
    els.stepTitle.textContent=step.titre;
    els.instruction.textContent=step.consigne;
    els.answer.value=state.answers[step.id]||"";
    els.feedback.classList.remove("show");
    els.feedback.textContent="";
    renderHelp(step);
    updateTimers();
    els.next.textContent=state.mode==="targeted"?"Enregistrer cet exercice":"Enregistrer et continuer →";
    showStepPaywall(step);
  }

  function protocolFor(step){
    const core=[
      "L’élève doit répondre avant toute aide.",
      "Commencer par identifier un point acquis, puis un seul manque principal.",
      "Poser une question de reprise avant de donner une solution complète.",
      "Ne jamais inventer une citation, une image ou un élément absent du support.",
      "Ne jamais accepter un effet générique du type « cela insiste » ou « cela met en valeur » sans précision.",
      "Si l’élève a utilisé une aide, évaluer malgré tout sa capacité à justifier et à expliquer."
    ];
    if(item.type==="bac-commentaire"){
      core.push(
        "Une grande partie est une RÉPONSE nécessaire à la problématique, jamais un thème.",
        "Le mot « établissement » est interdit pour désigner une partie : employer RÉPONSE.",
        "La NÉCESSITÉ explique pourquoi cette réponse doit intervenir dans la démonstration.",
        "Une TRANSITION est uniquement une question simple qui fait apparaître ce qu’il reste encore à expliquer.",
        "RÉALISATION = ce que le texte fait ; ÉLÉMENT TEXTUEL = ce qui le montre ; PROCÉDÉ = comment l’élément est construit ; EFFET = ce que cela change ici.",
        "Pour un procédé, ne jamais valider le seul nom : exiger l’élément précis et l’effet contextualisé.",
        "Ne pas proposer le commentaire complet quand l’élève travaille une étape intermédiaire."
      );
    }else{
      core.push(
        "Respecter exactement le nombre d’éléments demandé et le barème indiqué.",
        "Pour une question de compréhension, exiger la justification textuelle lorsqu’elle est demandée.",
        "Pour la grammaire et la réécriture, vérifier méthodiquement toutes les transformations concernées.",
        "Pour une image non fournie au système d’analyse, signaler la limite et ne rien inventer."
      );
    }
    return core.join("\n- ");
  }

  async function askAI(){
    const step=currentStep();
    if(step.access==="premium" && !status().premium){
      showStepPaywall(step); return;
    }
    if(item.access!=="free" && window.AccessControl && !window.AccessControl.canUseAI()){
      window.AccessControl.showPaywall(els.feedback); return;
    }
    const answer=els.answer.value.trim();
    if(answer.length<8){els.feedback.textContent="Écrivez d’abord une réponse suffisamment développée.";els.feedback.classList.add("show");return;}
    els.ai.disabled=true; els.ai.textContent="Vérification…";
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
          help_level:state.help[step.id]||0,
          instruction_to_model:"Évaluer uniquement la réponse à cette étape. Ne pas anticiper les étapes suivantes."
        }
      })});
      const data=await response.json();
      if(!response.ok||!data.ok)throw new Error(data.error||"Retour indisponible.");
      const f=data.feedback||{};
      const html="<strong>"+(f.diagnostic==="acquis"?"Réponse solide":f.diagnostic==="partiel"?"Réponse à préciser":"Réponse à reprendre")+"</strong>"+
        "<p><b>Point acquis :</b> "+(f.point_acquis||"—")+"</p>"+
        "<p><b>À reprendre :</b> "+(f.manque_principal||"—")+"</p>"+
        "<p><b>Pour améliorer :</b> "+(f.question_suivante||"Pouvez-vous préciser votre réponse ?")+"</p>";
      els.feedback.innerHTML=html;
      els.feedback.classList.add("show");
      state.feedbacks[step.id]=f; save();
      if(item.access!=="free" && window.AccessControl){window.AccessControl.consumeDiagnostic();window.AccessControl.renderBadge(els.accessStatus);}
    }catch(e){
      els.feedback.textContent=e.message||"Le retour n'est pas disponible pour le moment.";
      els.feedback.classList.add("show");
    }finally{
      els.ai.disabled=false; els.ai.textContent="Vérifier ma réponse";
    }
  }

  els.ai.textContent="Vérifier ma réponse";
  els.ai.addEventListener("click",askAI);
  els.next.addEventListener("click",()=>{
    const step=currentStep();
    if(step.access==="premium" && !status().premium){showStepPaywall(step);return;}
    state.answers[step.id]=els.answer.value.trim();
    if(state.mode==="targeted"){
      save();
      pauseTimer();
      renderTargetedPicker();
      document.getElementById("trainingMode")?.scrollIntoView({behavior:"smooth",block:"start"});
      return;
    }
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

  renderTargetedPicker();
  render();
})();