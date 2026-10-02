(() => {
  const host=document.getElementById("anthologyBrevetGrid");
  if(!host)return;
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
  const items=Object.entries(window.ANNALES_CATALOGUE||{}).filter(([,x])=>x.type==="brevet").map(([id,x])=>({id,...x})).sort((a,b)=>b.annee-a.annee);
  host.innerHTML=items.map((x,i)=>`<article class="anthology-card${i===0?" featured":""}">
    <div class="anthology-meta">${esc(x.annee)} · ${esc(x.serie)} · SUJET OFFICIEL</div>
    <h2>${esc(x.auteur)} — <em>${esc(x.oeuvre)}</em></h2>
    <p>${esc(x.contexte)}</p>
    <div class="anthology-skills"><span>Compréhension</span><span>Grammaire</span><span>Réécriture</span><span>Aide IA</span></div>
    <a href="annales/entrainement-annale.html?id=${encodeURIComponent(x.id)}">Faire le sujet question par question →</a>
    <a href="${esc(x.sourceOfficielle)}" target="_blank" rel="noopener">Source officielle ↗</a>
  </article>`).join("");
})();