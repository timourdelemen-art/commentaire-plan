(() => {
  const AI_TEMPORARILY_DISABLED=false;
  if(AI_TEMPORARILY_DISABLED) return;
  const ENDPOINT="https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";
  const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const excluded=new Set(["contact.html","ia-laboratoire.html"]);
  if(excluded.has(page) || location.pathname.includes("/annales/")) return;

  function clean(s){return String(s||"").replace(/\s+/g," ").trim();}
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
  /* Philosophie : les critères partent avec la demande, pour que le serveur IA juge en philosophie (et non en littérature),
     même s’il n’a pas été mis à jour. Le vrai type est aussi transmis (philo_kind) pour un serveur à jour. */
  const PHILO_BASE="PHILOSOPHIE (Terminale), pas littérature : il n’y a ni texte ni œuvre à analyser, ignore toute règle sur le texte, l’œuvre ou les procédés. Méthode : la notion demande deux choses qui se gênent ; chaque réponse, poussée jusqu’au bout, perd quelque chose. N’exige jamais d’auteur. N’emploie aucun jargon. N’écris jamais la réponse à la place de l’élève. Si la réponse remplit la consigne, diagnostic acquis. La question de relance est courte (une ligne), simple, sans chiffres ni jargon.";
  const PHILO_CRIT={
    "philo-problematique":"Test du gant, signale seulement le premier point qui échoue : chaque mot important du sujet travaille ; aucune NOTION ajoutée que le sujet ne contient pas (l’État ou le bonheur dans un sujet qui n’en parle pas) : défaut, diagnostic à reprendre ; remplacer une notion du sujet par l’un de ses cas particuliers (la promesse au lieu de l’engagement) rétrécit le sujet : défaut léger, diagnostic partiel, inviter à revenir au terme général ; un mot qui radicalise une réponse (« tout engagement ») ou une image concrète placée à côté du terme général ne sont PAS des défauts ; les deux réponses restent ouvertes et chacune perd quelque chose (pas de question rhétorique « comment pourrait-on… puisque… ») ; on reconnaît le sujet sans recopie ; une seule question, une trentaine de mots ; on y lit la partie I et la partie II, sans la solution de la III. Si tous les points passent, diagnostic acquis, manque principal « Rien d’essentiel ne manque. » : ne fabrique jamais de défaut.",
    "philo-cout":"Les deux réponses doivent perdre quelque chose, et la perte doit venir de la réponse poussée jusqu’au bout, pas d’une objection extérieure.",
    "philo-consequence":"Deux choses que la notion demande dans son sens courant, sans définition d’auteur, et pourquoi elles se gênent.",
    "philo-reponse":"Trois temps attendus : une première réponse au sujet en une phrase qui reprend ses mots, au choix de l’élève : oui, non (éventuellement nuancé par les petits mots du sujet, par exemple « pas toujours »), ou une phrase qui montre que la question est mal posée ; les trois formes sont justes, rien de plus n’est demandé, ne pas exiger de justification ; le petit mot du sujet qui change la question (peut-on, faut-il, suffit-il, sans…) et ce qu’il change ; puis la phrase « Au premier abord, on répondrait…, mais… » qui montre que la première réponse ne suffit plus. Vérifier surtout que les mots du sujet font vaciller la première réponse.",
    "philo-transition":"Une transition est une question ouverte, placée entre deux parties : elle part de la limite de la réponse précédente (retournement, présupposé dévoilé, prix, glissement de sens ; pour passer à la III, ce que les deux réponses supposaient ensemble) et demande ce que cette réponse n’a pas su préserver. Une ou deux phrases, sans « nous avons vu » ni « voyons maintenant ». La question ne contient pas sa réponse : pas de « … suffit-il ? ». Une affirmation qui donne déjà la partie suivante n’est pas une transition.",
    "philo-plan":"I défend une réponse et finit sur sa limite, née de l’idée poussée jusqu’au bout ; II part de cette limite ; III ne choisit pas un camp ni ne coupe la poire en deux : une opération (distinguer deux plans, processus, inverser un rapport, transformer le concept, déplacer la difficulté, limiter ce qu’on peut savoir, maintenir la tension) qui garde les acquis de I et II.",
    "philo-troisieme":"III : ce qui reste (acquis de I et II), l’opération, ce qu’elle garde. Refuser compromis, choix d’un camp, changement de sujet.",
    "philo-reste":"Ce que la réponse précédente n’explique pas encore, nommé précisément, puis transformé en question ouverte.",
    "philo-partie":"Réponse, raison qui la rend nécessaire, appui analysé, limite qui découle de la réponse elle-même.",
    "philo-reference":"La référence doit accomplir une opération dans le raisonnement et être exacte ; sans le nom, le raisonnement doit tenir. N’invente aucune citation.",
    "philo-operation":"Nommer l’opération et dire ce qu’elle permet de résoudre ici ; une étiquette seule ne suffit pas.",
    "philo-liens":"Réécriture d’un paragraphe : vérifier que les connecteurs d’énumération (d’abord, de plus, enfin…) ont disparu, que chaque lien restant nomme la relation réelle (or, mais, donc…), que la ponctuation (deux-points, point-virgule) porte la logique, et que rien du raisonnement n’a été perdu.",
    "philo-scene":"Une scène (roman, film, histoire, anecdote) racontée en deux ou trois phrases, puis ce qu’elle montre. Elle doit contenir le problème du sujet, les deux réponses, et pas seulement le thème. Vérifier que les faits racontés sont plausibles et que la phrase finale relie vraiment la scène au sujet.",
    "philo-texte-probleme":"Explication de texte, texte NON fourni : juge seulement la forme ; le problème est une difficulté, formulée en question, et la raison pour laquelle elle n’est pas évidente.",
    "philo-texte-these":"Explication de texte, texte NON fourni : juge seulement la forme ; une thèse précise en une phrase, pas un thème ni un résumé.",
    "philo-texte-moments":"Explication de texte, texte NON fourni : juge seulement la construction ; trois à cinq moments, chacun avec ce que l’auteur fait."
  };
  function philoTransport(kind){
    return {problematique:"problematique","philo-problematique":"problematique","philo-transition":"transition","philo-plan":"plan","philo-troisieme":"plan","philo-partie":"plan","philo-reste":"plan"}[kind]||"lecture";
  }
  function contextFor(area){
    const box=area.closest(".exercise,.workbench,.writing-sim,.stage-card,.bac-work,.method-section")||area.parentElement;
    // Consigne visible par l’élève (sans le contenu des corrigés repliés), puis critère destiné au correcteur s’il existe.
    const visible=box ? [...box.querySelectorAll(".instruction,h2,h3,p,li")].filter(x=>!x.closest("details")&&!x.closest(".free-response-tools")).map(x=>clean(x.textContent)).filter(Boolean).slice(-8).join(" ") : "";
    const criterion=clean(area.dataset.feedbackInstruction||"");
    const quote=box?.querySelector(".quote,blockquote");
    return {
      page,
      title:clean(document.querySelector("h1")?.innerText||document.title),
      instruction:clean((visible?visible+" ":"")+(criterion?"Critère pour le correcteur : "+criterion:"")).slice(-1800),
      quote:clean(area.dataset.feedbackQuote||quote?.textContent||"").slice(0,1200),
      kind:clean(area.dataset.feedbackKind||"").slice(0,50)
    };
  }
  function contextForRequest(area){
    const c=contextFor(area);
    if(/^philo-/.test(c.kind)){
      const crit=PHILO_CRIT[c.kind]||"Évaluer seulement l’opération demandée par la consigne.";
      const head=PHILO_BASE+" CRITÈRE : "+crit+" CONSIGNE ET TRAVAIL DEMANDÉ : ";
      c.philo_kind=c.kind;
      c.kind=philoTransport(c.kind);
      c.instruction=head+c.instruction.slice(-Math.max(400,1800-head.length));
    }
    return c;
  }

  function mount(area,index){
    if(area.dataset.feedbackMounted==="1"||area.disabled||area.readOnly)return;
    let previousAnswer="";
    const lockKey="cp-exercise-lock:"+page+":"+index;
    const getLockUntil=()=>Number(localStorage.getItem(lockKey)||0);
    try{localStorage.removeItem(lockKey);}catch(e){}
    const setLocked=(until,feedback,btn)=>{
      feedback.innerHTML="<strong>Pas encore dans le sujet</strong><p>Votre réponse ne parle pas encore du sujet : relisez la consigne, puis reprenez. Vous pouvez demander un nouveau retour dès que vous avez réécrit.</p>";
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
            context:{...contextForRequest(area),response_index:index},
            previous_answer:previousAnswer
          })
        });
        const data=await response.json();
        if(data.blocked){
          if(data.reason==="off_topic"||data.reason==="gibberish"){
            setLocked(Date.now()+24*60*60*1000,feedback,btn);
            return;
          }
          feedback.innerHTML="<strong>IA non utilisée</strong><p>"+esc(data.error||"Reprenez d’abord votre réponse.")+"</p>";
          feedback.classList.add("show");
          return;
        }
        if(!response.ok||!data.ok)throw new Error(data.error||"Retour indisponible.");
        const f=data.feedback||{};
        feedback.innerHTML=
          "<strong>"+(f.diagnostic==="acquis"?"Réponse solide":f.diagnostic==="partiel"?"Réponse à préciser":"Réponse à reprendre")+"</strong>"+
          "<p><b>"+(/^Aucun acquis/i.test(f.point_acquis||"")?"État de la réponse":"Point acquis")+" :</b> "+esc(f.point_acquis||"—")+"</p>"+
          "<p><b>À reprendre :</b> "+esc(f.manque_principal||"—")+"</p>"+
          "<p><b>Pour améliorer :</b> "+esc(f.question_suivante||"Pouvez-vous préciser votre réponse ?")+"</p>";
        feedback.classList.add("show");
        previousAnswer=answer;
      }catch(e){
        const hasDet=!!((area.closest(".exercise,article,section")||document).querySelector("details"));
        feedback.innerHTML="<strong>Retour automatique indisponible pour l’instant</strong><p>Votre réponse est conservée. "+(hasDet?"Comparez-la avec les pistes ci-dessous, puis réessayez plus tard.":"Réessayez dans quelques minutes.")+"</p>";
        feedback.classList.add("show");
        const box=area.closest(".exercise,article,section");
        const det=box&&box.querySelector("details");
        if(det)det.open=true;
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