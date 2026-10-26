(() => {
  const cat=window.ANNALES_CATALOGUE||{};
  const host=document.getElementById("transformedAnnales");
  if(!host)return;
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
  const all=Object.entries(cat).map(([id,x])=>({id,...x})).sort((a,b)=>b.annee-a.annee||a.examen.localeCompare(b.examen,"fr"));
  /* Une page propre à un examen (data-examen="Bac") ne montre que ses sujets, sans filtre d’examen. */
  const only=host.dataset.examen||"";
  const items=only?all.filter(x=>x.examen===only):all;
  const controls=document.getElementById("annalesControls");
  let filter="bac";
  let author="all", work="all";
  const bacItems=items.filter(x=>x.examen==="Bac");
  const authors=[...new Set(bacItems.map(x=>x.auteur).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"fr"));
  const authorOptions=authors.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join("");
  const extra=document.createElement("div");
  extra.className="annales-discovery filters";
  extra.innerHTML='<label>Auteur <select id="annales-author"><option value="all">Tous les auteurs</option>'+authorOptions+'</select></label> <label>Œuvre <select id="annales-work"><option value="all">Toutes les œuvres</option></select></label> <button type="button" id="annales-reset">Effacer les filtres</button> <p id="annales-count" role="status" aria-live="polite"></p>';
  if(!controls)return;
  controls.insertAdjacentElement("afterend",extra);
  // L'accès aux filtres n'exige pas de parcourir les archives par année.
  // Déplacer le bloc interactif existant, sans le dupliquer.
  const frenchSection=document.getElementById("bac");
  const staticIndex=frenchSection?.querySelector(".annales-static-index");
  const guided=host.closest(".guided-section");
  if(frenchSection&&guided&&staticIndex){
    const discovery=document.createElement("section");
    discovery.className="guided-section";
    discovery.id="annales-recherche";
    discovery.setAttribute("aria-label","Trouver un entraînement dans les annales");
    discovery.innerHTML='<h3 id="annales-discovery-title">Trouver un entraînement de français</h3><p>Choisissez un auteur ou une œuvre, puis ouvrez les exercices disponibles. Les archives officielles restent accessibles ci-dessous.</p>';
    frenchSection.insertBefore(discovery,staticIndex);
    discovery.append(controls,extra,host);
    // Les liens historiques vers les filtres continuent de viser leur identifiant déplacé.
    if(!guided.querySelector(".filters, .corpus-index"))guided.remove();
  }
  extra.querySelectorAll("select").forEach(el=>el.setAttribute("aria-label",el.id==="annales-author"?"Filtrer par auteur":"Filtrer par œuvre"));
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
    author="all";work="all";filter="bac";authorSelect.value="all";updateWorks();
    controls?.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.f==="bac"));
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
  if(controls&&only){controls.hidden=true;}
  else if(controls){
    controls.innerHTML=[
      ["all","Tout ("+counts.all+")"],
      ["bac","Bac ("+counts.bac+")"],
      ["brevet","Brevet ("+counts.brevet+")"],
      ["free","Gratuit ("+counts.free+")"],
      ["premium","Accès complet ("+counts.premium+")"]
    ].map(([k,l])=>"<button class='filter"+(k==="bac"?" active":"")+"' data-f='"+k+"'>"+l+"</button>").join("");
    controls.querySelectorAll("button").forEach(b=>b.onclick=()=>{
      controls.querySelectorAll("button").forEach(x=>x.classList.remove("active"));
      b.classList.add("active"); filter=b.dataset.f; if(filter==="brevet"||filter==="all"){author="all";work="all";authorSelect.value="all";updateWorks();} extra.querySelectorAll("label").forEach(el=>el.hidden=filter==="brevet"||filter==="all"); render();
    });
  }
  function render(){
    const heading=document.getElementById("annales-discovery-title");
    if(heading)heading.textContent=filter==="brevet"?"Entraînements du brevet":filter==="all"?"Tous les entraînements disponibles":filter==="free"?"Entraînements gratuits":filter==="premium"?"Entraînements en accès complet":"Trouver un entraînement de français";
    const list=items.filter(x=>(filter==="all"||(filter==="bac"&&x.examen==="Bac")||(filter==="brevet"&&x.examen==="Brevet")||x.access===filter)&&((filter==="brevet"||filter==="all")||((author==="all"||x.auteur===author)&&(work==="all"||x.oeuvre===work))));
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