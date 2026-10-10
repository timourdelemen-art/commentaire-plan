(() => {
  const AI_TEMPORARILY_DISABLED=false;
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
  const state=JSON.parse(localStorage.getItem(storageKey)||'{"step":0,"answers":{},"feedbacks":{},"totalElapsed":0,"stepElapsed":0,"mode":"guided","help":{},"suspensions":{}}');
  state.answers=state.answers||{};
  state.feedbacks=state.feedbacks||{};
  state.suspensions=state.suspensions||{};
  state.totalElapsed=state.totalElapsed||0;
  state.stepElapsed=state.stepElapsed||0;
  state.mode=state.mode||"guided";
  state.help=state.help||{};
  const requestedMode=params.get("mode");
  const requestedStep=params.get("step");
  if(requestedMode==="targeted"){
    const requestedIndex=item.etapes.findIndex(s=>s.id===requestedStep);
    if(requestedIndex>=0){
      state.mode="targeted";
      state.step=requestedIndex;
      state.stepElapsed=0;
    }
  }
  let running=false, tick=null;

  els.meta.textContent=[item.examen,item.annee,item.zone,item.serie,item.epreuve].join(" · ");
  els.title.textContent=item.auteur+" — "+item.oeuvre;
  els.context.textContent=item.contexte;
  els.subject.href=item.sourceOfficielle;
  const supportBlock=document.getElementById("supportBlock");
  const supportTitle=document.getElementById("supportTitle");
  const supportText=document.getElementById("supportText");
  const supportSource=document.getElementById("supportSource");
  const textToggle=document.getElementById("textToggle"), textDialog=document.getElementById("textDialog");
  if(item.supportText && supportBlock && supportText){
    supportBlock.hidden=false;
    supportTitle.textContent=item.supportTitle||(item.auteur+", "+item.oeuvre);
    supportText.innerHTML=item.supportText;
    supportSource.textContent=(item.supportSource||"Texte reproduit pour le travail de l’annale.")+(/line-no/.test(item.supportText)?" Les numéros dans la marge marquent le début des lignes du sujet officiel.":"");
    if(textToggle && textDialog && textDialog.showModal){
      textToggle.hidden=false;
      document.getElementById("textDialogTitle").textContent=supportTitle.textContent;
      document.getElementById("textDialogBody").innerHTML=item.supportText+"<p class='micro'>"+supportSource.textContent+"</p>";
      textToggle.addEventListener("click",()=>textDialog.showModal());
      document.getElementById("textDialogClose").addEventListener("click",()=>textDialog.close());
      textDialog.addEventListener("click",e=>{ if(e.target===textDialog) textDialog.close(); });
    }
  }else if(supportBlock && supportText){
    supportBlock.hidden=false;
    supportTitle.textContent=item.auteur+", "+item.oeuvre;
    supportText.classList.remove("texte-examen");
    supportText.innerHTML="<p class='texte-absent'>Le texte est dans le sujet officiel, avec ses numéros de ligne. Ouvrez-le et gardez-le à côté de cet exercice : chaque étape vous demandera d’y revenir.</p><p><a class='btn red small' href='"+item.sourceOfficielle+"' target='_blank' rel='noopener'>Ouvrir le sujet officiel ↗</a></p>";
    supportSource.textContent=item.texteDomainePublic?"Ce texte sera bientôt affiché ici.":"Ce texte est encore protégé par le droit d’auteur : il n’est pas reproduit sur le site.";
    if(textToggle){ textToggle.hidden=false; textToggle.textContent="Le texte ↗"; textToggle.addEventListener("click",()=>window.open(item.sourceOfficielle,"_blank","noopener")); }
  }
  els.guided.href=item.parcours||"../annales.html";
  window.AccessControl?.renderBadge(els.accessStatus);

  const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
  const save=()=>localStorage.setItem(storageKey,JSON.stringify(state));
  const status=()=>window.AccessControl?.getStatus?.()||{premium:false};
  const currentStep=()=>item.etapes[state.step];
  const aiModeFor=(step)=>{
    if(step.aiMode==="none") return "none";

    if(item.type==="bac-commentaire"){
      if(["donne","attente","transformation","necessite","transitions","realisations","raccord"].includes(step.id)) return "none";
      if(["plan","intro","partie","conclusion"].includes(step.id)) return "recommended";
      if(["problematique","preuves"].includes(step.id)) return "optional";
      return "none";
    }

    if(item.type==="brevet"){
      if(step.correction && ["brevet-grammaire","brevet-lexique","brevet-reecriture"].includes(step.kind)) return "none";
      if(["brevet-interpretation","brevet-analyse","brevet-image","brevet-redaction"].includes(step.kind)) return step.aiMode==="recommended"?"recommended":"optional";
      if(step.kind==="brevet-comprehension") return step.aiMode==="recommended"?"recommended":"optional";
      return "none";
    }

    if(step.aiMode) return step.aiMode;
    if(step.kind==="redaction" || step.kind==="plan") return "recommended";
    return "optional";
  };

  const TARGETS=[
    ["problematique","Problématique","Formuler la question qui fait apparaître ce que le texte oblige à expliquer."],
    ["plan","Plan","Construire deux ou trois réponses nécessaires à la problématique."],
    ["preuves","Procédés & effets","Repérer des éléments, nommer des procédés utiles et expliquer leur effet ici."],
    ["intro","Introduction","Rédiger une introduction brève et fonctionnelle."],
    ["partie","Rédiger une partie","Développer une réponse en la prouvant par plusieurs analyses."],
    ["transitions","Transition","Écrire la seule question qui fait apparaître ce que la réponse précédente ne suffit pas encore à expliquer."],
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

  const LABEL3={ok:"Solide",def:"Défendable",no:"À revoir"};
  const structured=step=>(step.choix||[]).length>0 && Array.isArray(step.choix[0]);
  function shuffle(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
  function renderManual(step,level=0){
    if(!els.manual) return;
    const guidedChoices=(step.choix||[]);
    const isStructured=structured(step);
    const procedureOptions=procedureChoices(step);
    const hasSecond=guidedChoices.length || procedureOptions.length;
    const showSecond=(isStructured?level>=1:level>=2) && hasSecond;
    const showCorrection=level>=3 && step.correction;
    if(!showSecond && !showCorrection){els.manual.hidden=true;els.manual.innerHTML="";return;}
    els.manual.hidden=false;
    let html="";
    if(showSecond && isStructured){
      html+="<div class='kicker'>TROIS PROPOSITIONS</div><p>Choisissez celle qui vous paraît la plus juste. On vous dit pourquoi. Puis écrivez votre réponse avec vos mots.</p><div class='manual-choice-list'>"+
        shuffle(guidedChoices.map((c,i)=>i)).map(i=>"<button type='button' class='manual-choice chaine-opt' data-i='"+i+"'>"+guidedChoices[i][0]+"</button>").join("")+
        "</div><div class='chaine-fb manual-fb' aria-live='polite'></div>";
    }else if(showSecond){
      const choices=guidedChoices.length ? guidedChoices : procedureOptions;
      html+="<div class='kicker'>J’HÉSITE ENCORE</div><p>Quel procédé peut servir ici ? Choisissez-en un, puis expliquez dans votre réponse son effet dans ce passage.</p><div class='manual-choice-list'>"+
        choices.map(x=>"<button type='button' class='manual-choice'>"+x+"</button>").join("")+
        "</div>";
      if(!guidedChoices.length) html+="<p class='micro'>Le nom du procédé ne suffit jamais : c’est son effet ici qui compte.</p>";
    }
    if(showCorrection){
      html+="<div class='guided-correction'><div class='kicker'>CORRECTION EXPLIQUÉE</div><p>"+step.correction+"</p><p class='micro'>Relisez votre première réponse, puis réécrivez-la avant de poursuivre.</p></div>";
    }
    els.manual.innerHTML=html;
    const fb=els.manual.querySelector(".manual-fb");
    els.manual.querySelectorAll(".manual-choice").forEach(btn=>btn.addEventListener("click",()=>{
      els.manual.querySelectorAll(".manual-choice").forEach(x=>x.classList.remove("selected","picked"));
      btn.classList.add("selected");
      if(isStructured && fb){
        const c=guidedChoices[Number(btn.dataset.i)], st=c[1]||"no";
        btn.classList.add("picked",st);
        if(st==="no") btn.disabled=true;
        fb.className="chaine-fb manual-fb show "+st;
        fb.innerHTML="<strong>"+LABEL3[st]+".</strong> "+(c[2]||"")+(st!=="no"?" <span class='micro'>Écrivez maintenant votre réponse avec vos mots.</span>":"");
      }
    }));
  }

  function renderHelp(step){
    const level=state.help[step.id]||0;
    els.hint.hidden=level<1;
    els.hint.textContent=level>=1 ? "Petit coup de pouce : "+step.aide : "";
    renderManual(step,level);
    const hasSecond=(step.choix||[]).length || (step.manual||[]).length;
    const hasCorrection=Boolean(step.correction);
    if(level===0){
      els.helpButton.hidden=false;
      els.helpButton.disabled=false;
      els.helpButton.textContent=structured(step)?"💡 Pas d’idée ? Un coup de pouce et trois propositions":"💡 Petit coup de pouce";
      els.helpLevel.textContent="";
    }else if(level===1 && structured(step) && hasCorrection){
      els.helpButton.hidden=false;
      els.helpButton.disabled=false;
      els.helpButton.textContent="Voir la correction expliquée";
      els.helpLevel.textContent="Aide 1";
    }else if(level===1 && (hasSecond||hasCorrection)){
      els.helpButton.hidden=false;
      els.helpButton.disabled=false;
      els.helpButton.textContent="J’hésite encore";
      els.helpLevel.textContent="Aide 1";
    }else if(level===2 && hasCorrection){
      els.helpButton.hidden=false;
      els.helpButton.disabled=false;
      els.helpButton.textContent="Voir la correction expliquée";
      els.helpLevel.textContent="Aide 2";
    }else{
      els.helpButton.hidden=true;
      els.helpLevel.textContent=hasCorrection?"Correction affichée":"Aide affichée";
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
    const firstChoice=structured(step) && !(state.help[step.id]||0);
    if(!firstChoice && (els.answer.value||"").trim().length<2){
      els.feedback.textContent="Répondez d’abord. L’aide ne s’ouvre qu’après une tentative réelle.";
      els.feedback.classList.add("show");
      return;
    }
    const hasSecond=(step.choix||[]).length || (step.manual||[]).length;
    const max=step.correction?3:(hasSecond?2:1);
    const cur=state.help[step.id]||0;
    state.help[step.id]=Math.min(max,structured(step)&&cur===1?3:cur+1);
    save();
    renderHelp(step);
  });

  function suspensionUntil(step){ return Number(state.suspensions[step.id]||0); }
  function isSuspended(step){
    if(state.suspensions[step.id]){ delete state.suspensions[step.id]; save(); }
    return false;
    const until=suspensionUntil(step);
    if(until && until<=Date.now()){ delete state.suspensions[step.id]; save(); return false; }
    return until>Date.now();
  }
  function suspendStep(step){
    state.suspensions[step.id]=Date.now()+24*60*60*1000;
    save();
  }

  function render(){
    if(state.step>=item.etapes.length)return renderSummary();
    const step=currentStep();
    els.summary.hidden=true;
    document.querySelector(".annale-step-card").hidden=false;
    els.answer.disabled=false; els.ai.disabled=false; els.next.disabled=false; els.helpButton.disabled=false;
    if(isSuspended(step)){
      els.answer.disabled=true; els.ai.disabled=true; els.next.disabled=true; els.helpButton.disabled=true;
      els.feedback.innerHTML="<strong>Exercice suspendu</strong><p>Réponse hors sujet. Cet exercice est suspendu pendant au moins 24 heures.</p>";
      els.feedback.classList.add("show");
      updateTimers();
      return;
    }
    const aiMode=aiModeFor(step);
    els.ai.hidden=AI_TEMPORARILY_DISABLED || aiMode==="none";
    els.ai.textContent=aiMode==="recommended"?"Analyser ma réponse":"Demander un retour IA";
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
      "Poser une question de reprise avant de donner une réponse complète.",
      "Ne jamais inventer une citation, une image ou un élément absent du support.",
      "Ne jamais accepter un effet générique du type « cela insiste » ou « cela met en valeur » sans précision.",
      "Si l’élève a utilisé une aide, évaluer malgré tout sa capacité à justifier et à expliquer."
    ];
    if(item.type==="bac-commentaire"){
      core.push(
        "Une grande partie est une RÉPONSE nécessaire à la problématique, jamais un thème.",
        "Le mot « établissement » est interdit pour désigner une partie : employer RÉPONSE.",
        "La NÉCESSITÉ DE LA RÉPONSE explique pourquoi cette réponse est indispensable pour comprendre le « pourtant » du texte (ce qu’on pouvait attendre, ce que le texte produit) et répondre à la problématique.",
        "Une TRANSITION est une question ouverte et directe, placée entre deux parties, qui fait apparaître ce qu’il reste encore à expliquer ; jamais « … suffit-il ? » ni une question fermée ; la partie suivante reprend son mot clé.",
        "RÉALISATION = ce que le texte fait ; ÉLÉMENT TEXTUEL = ce qui le montre ; PROCÉDÉ = comment l’élément est construit ; EFFET = ce que cela change ici.",
        "Pour un procédé, ne jamais valider le seul nom : exiger l’élément précis et l’effet contextualisé.",
        "Ne pas proposer le commentaire complet quand l’élève travaille une étape intermédiaire."
      );
    }else{
      core.push(
        "Respecter exactement le nombre d’éléments demandé et le barème indiqué.",
        "Pour une question de compréhension, exiger la justification textuelle lorsqu’elle est demandée.",
        "Pour la grammaire et la réécriture, vérifier méthodiquement toutes les transformations concernées.",
        "MANIPULATIONS GRAMMATICALES : ne jamais présenter les tests comme interchangeables. Pour un complément circonstanciel, la suppression et le déplacement sont des indices privilégiés de mobilité et de caractère facultatif. Pour un COD ou un COI, la pronominalisation par un pronom objet est particulièrement probante. Pour un COD nominal, la transformation passive peut confirmer l’analyse lorsque la phrase s’y prête. Pour une proposition subordonnée COD, la substitution de toute la proposition par « le » est un test fort. Toujours expliquer ce que la manipulation démontre.",
        "Pour une image non fournie au système d’analyse, signaler la limite et ne rien inventer."
      );
    }
    return core.join("\n- ");
  }

  async function askAI(){
    if(AI_TEMPORARILY_DISABLED){
      els.feedback.innerHTML="<strong>Retour personnalisé temporairement désactivé</strong><p>Continuez avec les aides et corrections locales du parcours.</p>";
      els.feedback.classList.add("show");
      return;
    }
    const step=currentStep();
    if(aiModeFor(step)==="none"){
      els.feedback.innerHTML="<strong>Correction locale</strong><p>Cette question n’utilise pas l’IA. Utilisez l’aide progressive puis la correction expliquée.</p>";
      els.feedback.classList.add("show");
      return;
    }
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
        },
        previous_answer:(state.feedbacks[step.id]&&state.feedbacks[step.id].answer)||""
      })});
      const data=await response.json();
      if(data.blocked){
        if(data.reason==="off_topic"){
          els.feedback.innerHTML="<strong>Pas encore dans le sujet</strong><p>Votre réponse ne parle pas encore du sujet : relisez la consigne, puis reprenez. Vous pouvez demander un nouveau retour dès que vous avez réécrit.</p>";
          els.feedback.classList.add("show");
          return;
        }
        els.feedback.innerHTML="<strong>IA non utilisée</strong><p>"+(data.error||"Reprenez d’abord votre réponse.")+"</p>";
        els.feedback.classList.add("show");
        return;
      }
      if(!response.ok||!data.ok)throw new Error(data.error||"Retour indisponible.");
      const f=data.feedback||{};
      const html="<strong>"+(f.diagnostic==="acquis"?"Réponse solide":f.diagnostic==="partiel"?"Réponse à préciser":"Réponse à reprendre")+"</strong>"+
        "<p><b>"+(/^Aucun acquis/i.test(f.point_acquis||"")?"État de la réponse":"Point acquis")+" :</b> "+(f.point_acquis||"—")+"</p>"+
        "<p><b>À reprendre :</b> "+(f.manque_principal||"—")+"</p>"+
        "<p><b>Pour améliorer :</b> "+(f.question_suivante||"Pouvez-vous préciser votre réponse ?")+"</p>";
      els.feedback.innerHTML=html;
      els.feedback.classList.add("show");
      state.feedbacks[step.id]={...f,answer}; save();
      if(item.access!=="free" && window.AccessControl){window.AccessControl.consumeDiagnostic();window.AccessControl.renderBadge(els.accessStatus);}
    }catch(e){
      els.feedback.textContent=e.message||"Le retour n'est pas disponible pour le moment.";
      els.feedback.classList.add("show");
    }finally{
      if(!isSuspended(step)){
        els.ai.disabled=false;
        els.ai.textContent=aiModeFor(step)==="recommended"?"Analyser ma réponse":"Demander un retour IA";
      }
    }
  }
  els.ai.addEventListener("click",askAI);
  els.next.addEventListener("click",()=>{
    const step=currentStep();
    if(step.access==="premium" && !status().premium){showStepPaywall(step);return;}
    const answer=els.answer.value.trim();
    if(answer.length<2){
      els.feedback.textContent="Répondez d’abord. Vous ne pouvez pas passer à l’étape suivante sans tentative.";
      els.feedback.classList.add("show");
      return;
    }
    state.answers[step.id]=answer;
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
  if(item.type==="bac-commentaire" && requestedMode==="targeted" && requestedStep){
    startTimer();
  }
})();