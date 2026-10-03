(() => {
  const host=document.getElementById("brevetTargetedBank");
  if(!host) return;
  const kinds=(host.dataset.kinds||"").split(",").map(x=>x.trim()).filter(Boolean);
  const catalogue=window.ANNALES_CATALOGUE||{};
  const rows=[];
  for(const [id,item] of Object.entries(catalogue)){
    if(item.type!=="brevet") continue;
    for(const step of (item.etapes||[])){
      if(!kinds.includes(step.kind)) continue;
      rows.push({
        id,
        step:step.id,
        titre:step.titre,
        access:step.access||item.access||"free",
        aiMode:step.aiMode||"optional",
        annee:item.annee,
        auteur:item.auteur,
        oeuvre:item.oeuvre,
        zone:item.zone,
        correction:Boolean(step.correction)
      });
    }
  }
  rows.sort((a,b)=>b.annee-a.annee || a.titre.localeCompare(b.titre,"fr"));
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
  const aiLabel=x=>x.aiMode==="none"?"Correction locale":x.aiMode==="recommended"?"Retour personnalisé conseillé":"Retour personnalisé possible";
  host.innerHTML=rows.length?rows.map(x=>`
    <a class="brevet-bank-card" href="annales/entrainement-annale.html?id=${encodeURIComponent(x.id)}&mode=targeted&step=${encodeURIComponent(x.step)}">
      <div class="brevet-bank-meta">${esc(x.annee)} · ${esc(x.auteur)} · ${esc(x.oeuvre)}</div>
      <h3>${esc(x.titre)}</h3>
      <div class="brevet-bank-tags">
        <span>${x.access==="premium"?"ACCÈS COMPLET":"GRATUIT"}</span>
        <span>${esc(aiLabel(x))}</span>
      </div>
      <b>Faire cet exercice →</b>
    </a>`).join(""):"<p>Aucun exercice disponible pour ce groupe.</p>";
})();