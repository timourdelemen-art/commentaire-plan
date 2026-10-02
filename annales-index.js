(() => {
  const cat=window.ANNALES_CATALOGUE||{};
  const host=document.getElementById("transformedAnnales");
  if(!host)return;
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
  const items=Object.entries(cat).map(([id,x])=>({id,...x})).sort((a,b)=>b.annee-a.annee||a.examen.localeCompare(b.examen,"fr"));
  const controls=document.getElementById("annalesControls");
  let filter="all";
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
    const list=items.filter(x=>filter==="all"||(filter==="bac"&&x.examen==="Bac")||(filter==="brevet"&&x.examen==="Brevet")||x.access===filter);
    host.innerHTML=list.map(x=>`<article class="annale corpus-card">
      <span class="badge">${esc(x.annee)}</span><span class="badge">${esc(x.examen)}</span><span class="badge">${x.access==="free"?"GRATUIT":"ACCÈS COMPLET"}</span>
      <div class="micro">${esc(x.zone)} · ${esc(x.serie)}</div>
      <h3>${esc(x.auteur)} — <em>${esc(x.oeuvre)}</em></h3>
      <p>${esc(x.contexte)}</p>
      <p class="micro">${x.type==="bac-commentaire"?"Problématique → plan → rédaction · IA bridée":"Chaque question officielle → réponse → retour IA · correction ciblée"}</p>
      <a class="official-link" href="annales/entrainement-annale.html?id=${encodeURIComponent(x.id)}">Ouvrir l’entraînement →</a>
      · <a class="official-link" href="${esc(x.sourceOfficielle)}" target="_blank" rel="noopener">Source officielle ↗</a>
    </article>`).join("");
  }
  render();
})();