(() => {
  const cat=window.ANNALES_CATALOGUE||{};
  const host=document.getElementById("transformedAnnales");
  if(!host)return;
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
  const items=Object.entries(cat).map(([id,x])=>({id,...x})).sort((a,b)=>b.annee-a.annee||a.examen.localeCompare(b.examen,"fr"));
  const controls=document.getElementById("annalesControls");
  let filter="all";
  let author="all", work="all";
  const bacItems=items.filter(x=>x.examen==="Bac");
  const authors=[...new Set(bacItems.map(x=>x.auteur).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"fr"));
  const authorOptions=authors.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join("");
  const extra=document.createElement("div");
  extra.className="annales-discovery";
  extra.innerHTML='<label>Auteur <select id="annales-author"><option value="all">Tous les auteurs</option>'+authorOptions+'</select></label> <label>Œuvre <select id="annales-work"><option value="all">Toutes les œuvres</option></select></label> <button type="button" id="annales-reset">Effacer les filtres</button> <p id="annales-count" role="status" aria-live="polite"></p>';
  controls?.insertAdjacentElement("afterend",extra);
  const authorSelect=extra.querySelector("#annales-author");
  const workSelect=extra.querySelector("#annales-work");
  function updateWorks(){
    const works=[...new Set(bacItems.filter(x=>author==="all"||x.auteur===author).map(x=>x.oeuvre).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"fr"));
    workSelect.innerHTML='<option value="all">Toutes les œuvres</option>'+works.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join("");
    if(!works.includes(work)){work="all";}
    workSelect.value=work;
  }
  authorSelect.addEventListener("change",()=>{author=authorSelect.value;work="all";updateWorks();render();});
  workSelect.addEventListener("change",()=>{work=workSelect.value;render();});
  extra.querySelector("#annales-reset").addEventListener("click",()=>{
    author="all";work="all";filter="all";authorSelect.value="all";updateWorks();
    controls?.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.f==="all"));
    render();
  });
  updateWorks();
  const counts={
    all:items.length,
    bac:items.filter(x=>x.examen==="Bac").length,
    brevet:items.filter(x=>x.examen==="Brevet").length,
    free:items.filter(x=>x.access==="free").length,
    premium:items.filter(x=>x.access==="premium").length
  };
  if(controls){
    controls.innerHTML=[
      ["all","Tout ("+counts.all+")"],
      ["bac","Bac ("+counts.bac+")"],
      ["brevet","Brevet ("+counts.brevet+")"],
      ["free","Gratuit ("+counts.free+")"],
      ["premium","Accès complet ("+counts.premium+")"]
    ].map(([k,l])=>"<button class='filter"+(k==="all"?" active":"")+"' data-f='"+k+"'>"+l+"</button>").join("");
    controls.querySelectorAll("button").forEach(b=>b.onclick=()=>{
      controls.querySelectorAll("button").forEach(x=>x.classList.remove("active"));
      b.classList.add("active"); filter=b.dataset.f; render();
    });
  }
  function render(){
    const list=items.filter(x=>(filter==="all"||(filter==="bac"&&x.examen==="Bac")||(filter==="brevet"&&x.examen==="Brevet")||x.access===filter)&&(author==="all"||x.auteur===author)&&(work==="all"||x.oeuvre===work));
    extra.querySelector("#annales-count").textContent=list.length+" sujet"+(list.length>1?"s":"")+" disponible"+(list.length>1?"s":"");
    if(!list.length){host.innerHTML='<p role="status">Aucun sujet pour ces critères. Essayez un autre auteur ou effacez les filtres.</p>';return;}
    host.innerHTML=list.map(x=>`<article class="annale corpus-card">
      <span class="badge">${esc(x.annee)}</span><span class="badge">${esc(x.examen)}</span><span class="badge">${x.access==="free"?"GRATUIT":"ACCÈS COMPLET"}</span>
      <div class="micro">${esc(x.zone)} · ${esc(x.serie)}</div>
      <h3>${esc(x.auteur)} — <em>${esc(x.oeuvre)}</em></h3>
      <p>${esc(x.contexte)}</p>
      <p class="micro">${x.type==="bac-commentaire"?"Problématique → réponses → analyse → rédaction":"Chaque question officielle → réponse → aide → correction → reprise"}</p>
      <p class="micro ai-usage">${(()=>{
        const modes=(x.etapes||[]).map(s=>s.aiMode||"optional");
        const local=modes.filter(m=>m==="none").length;
        const optional=modes.filter(m=>m==="optional").length;
        const recommended=modes.filter(m=>m==="recommended").length;
        return "Aide : "+local+" étape"+(local>1?"s":"")+" en correction locale · "+optional+" avec retour facultatif"+(optional>1?"s":"")+" · "+recommended+" avec retour conseillé"+(recommended>1?"s":"");
      })()}</p>
      ${x.type==="bac-commentaire"
        ? `<a class="official-link" href="${esc(x.id)}.html">Voir la fiche et les exercices →</a>`
        : `<a class="official-link" href="annales/entrainement-annale.html?id=${encodeURIComponent(x.id)}">Ouvrir l’entraînement →</a>`}
      · <a class="official-link" href="${esc(x.sourceOfficielle)}" target="_blank" rel="noopener">Source officielle ↗</a>
    </article>`).join("");
  }
  render();
})();