(() => {
  const corpus=window.PROCEDES_CORPUS||[];
  const modes=window.PROCEDES_MODES||{};
  const params=new URLSearchParams(location.search);
  const modeKey=params.get("mode")||"nommer";
  const mode=modes[modeKey]||modes.nommer;
  let index=0;
  let answered=false;

  const el={
    title:document.getElementById("proc-title"),
    lede:document.getElementById("proc-lede"),
    progress:document.getElementById("proc-progress"),
    author:document.getElementById("proc-author"),
    quote:document.getElementById("proc-quote"),
    task:document.getElementById("proc-task"),
    feedback:document.getElementById("proc-feedback"),
    next:document.getElementById("proc-next"),
    lock:document.getElementById("proc-lock"),
    status:document.getElementById("proc-status")
  };

  el.title.textContent=mode.title;
  el.lede.textContent=mode.lede;
  el.status.innerHTML="<strong>"+(mode.free?"Accès gratuit":"Aperçu accès complet")+"</strong><br>Corpus de "+corpus.length+" citations.";

  function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));}
  function pickDistractors(field,item,n=2){
    const vals=[];
    for(let k=1;k<corpus.length && vals.length<n;k++){
      const x=corpus[(index+k)%corpus.length];
      const v=field==="procedure"?x.procedures[0]:x.effet;
      if(v && !vals.includes(v) && (field!=="procedure" || !item.procedures.includes(v))) vals.push(v);
    }
    return vals;
  }
  function buttons(options,correctSet,explain){
    const list=[...options].sort((a,b)=>a.localeCompare(b,"fr"));
    el.task.innerHTML="<div class='choices'>"+list.map(o=>"<button class='choice' data-v='"+esc(o)+"'>"+esc(o)+"</button>").join("")+"</div>";
    el.task.querySelectorAll(".choice").forEach(btn=>btn.onclick=()=>{
      if(answered)return; answered=true;
      const ok=correctSet.includes(btn.dataset.v);
      btn.classList.add(ok?"correct":"wrong");
      el.task.querySelectorAll(".choice").forEach(b=>{if(correctSet.includes(b.dataset.v))b.classList.add("correct");b.disabled=true;});
      showFeedback(ok,explain);
    });
  }
  function showFeedback(ok,html){
    el.feedback.innerHTML="<strong>"+(ok?"Oui.":"À reprendre.")+"</strong><p>"+html+"</p>";
    el.feedback.classList.add("show");
    if(!mode.free){
      el.next.classList.remove("show");
      el.lock.hidden=false;
    }else{
      el.next.classList.add("show");
    }
  }
  function render(){
    answered=false; el.feedback.className="feedback"; el.feedback.innerHTML=""; el.next.className="quiz-next"; el.lock.hidden=true;
    const item=corpus[index%corpus.length];
    el.progress.textContent=(index+1)+" / "+corpus.length+" · "+mode.title.toUpperCase();
    el.author.textContent=item.auteur.toUpperCase()+" · "+item.oeuvre;
    el.quote.textContent="« "+item.citation+" »";

    if(mode.kind==="qcm-procede"){
      const opts=[item.procedures[0],...pickDistractors("procedure",item,3)];
      buttons(opts,item.procedures,"Le procédé attendu ici est <strong>"+item.procedures.join(" / ")+"</strong>. Il décrit comment l’élément est construit, pas ce qu’il signifie.");
    }else if(mode.kind==="qcm-effet"){
      const opts=[item.effet,...pickDistractors("effect",item,3)];
      buttons(opts,[item.effet],"Effet ici : "+item.effet);
    }else if(mode.kind==="repair"){
      el.task.innerHTML="<p class='instruction'><strong>Analyse faible :</strong> « "+esc(item.procedures[0])+" : cela crée un effet de "+esc(item.procedures[0].toLowerCase())+". »</p><textarea class='exam-writing-area' rows='5' placeholder='Expliquez ce qui manque et proposez un effet précis…'></textarea><button class='btn red small' id='reveal-answer'>Comparer →</button>";
      document.getElementById("reveal-answer").onclick=()=>showFeedback(true,"Le défaut principal est que l’effet répète le nom du procédé. Il faut expliquer ce que ce choix change ici. <strong>"+item.effet+"</strong>");
    }else if(mode.kind==="chain"){
      el.task.innerHTML="<p class='instruction'>Construisez la chaîne complète.</p><label>Élément textuel<textarea class='exam-writing-area' rows='2'></textarea></label><label>Procédé<textarea class='exam-writing-area' rows='2'></textarea></label><label>Effet ici<textarea class='exam-writing-area' rows='4'></textarea></label><button class='btn red small' id='reveal-answer'>Comparer →</button>";
      document.getElementById("reveal-answer").onclick=()=>showFeedback(true,"<strong>Élément :</strong> "+item.element+"<br><strong>Procédé :</strong> "+item.procedures.join(" / ")+"<br><strong>Effet ici :</strong> "+item.effet);
    }else if(mode.kind==="multiple"){
      el.task.innerHTML="<p class='instruction'>Trouvez au moins deux procédés possibles et dites ce que chacun permet de voir.</p><textarea class='exam-writing-area' rows='6'></textarea><button class='btn red small' id='reveal-answer'>Voir une réponse recevable →</button>";
      document.getElementById("reveal-answer").onclick=()=>showFeedback(true,"Procédés possibles : <strong>"+item.procedures.join(" / ")+"</strong>"+(item.effet2?"<br>Deuxième effet possible : "+item.effet2:"")+"<br>Effet principal : "+item.effet);
    }else if(mode.kind==="compare"){
      const pair=corpus.find((x,j)=>j!==index && x.procedures.some(p=>item.procedures.includes(p)))||corpus[(index+1)%corpus.length];
      el.task.innerHTML="<div class='procedure-compare'><div><strong>"+esc(item.auteur)+"</strong><p>« "+esc(item.citation)+" »</p></div><div><strong>"+esc(pair.auteur)+"</strong><p>« "+esc(pair.citation)+" »</p></div></div><p class='instruction'>Le procédé commun produit-il le même effet ? Expliquez précisément.</p><textarea class='exam-writing-area' rows='6'></textarea><button class='btn red small' id='reveal-answer'>Comparer →</button>";
      document.getElementById("reveal-answer").onclick=()=>showFeedback(true,"Procédé commun : <strong>"+item.procedures.find(p=>pair.procedures.includes(p))+"</strong>.<br><strong>Premier effet :</strong> "+item.effet+"<br><strong>Second effet :</strong> "+pair.effet);
    }else if(mode.kind==="pertinent"){
      el.task.innerHTML="<p class='instruction'><strong>Réalisation à prouver :</strong> le texte transforme ici la perception de la réalité.</p><p>Parmi les procédés repérables, lequel serait le plus utile à analyser et pourquoi ?</p><textarea class='exam-writing-area' rows='6'></textarea><button class='btn red small' id='reveal-answer'>Voir une piste →</button>";
      document.getElementById("reveal-answer").onclick=()=>showFeedback(true,"Une réponse défendable consiste à sélectionner <strong>"+item.procedures[0]+"</strong> parce qu’il permet d’expliquer ceci : "+item.effet);
    }else{
      el.task.innerHTML="<p class='instruction'>Manuel autorisé. Aucun procédé n’est donné. Construisez une analyse complète : élément précis → procédé → effet.</p><textarea class='exam-writing-area' rows='8'></textarea><button class='btn red small' id='reveal-answer'>Voir une correction possible →</button>";
      document.getElementById("reveal-answer").onclick=()=>showFeedback(true,"Une correction possible : <strong>"+item.element+"</strong> → <strong>"+item.procedures.join(" / ")+"</strong> → "+item.effet);
    }
  }

  el.next.onclick=()=>{index=(index+1)%corpus.length;render();};
  render();
})();