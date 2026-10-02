(() => {
  const host=document.getElementById("anthologyBacGrid");
  if(!host)return;
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
  const items=Object.entries(window.ANNALES_CATALOGUE||{}).filter(([,x])=>x.type==="bac-commentaire").map(([id,x])=>({id,...x})).sort((a,b)=>b.annee-a.annee);
  host.innerHTML=items.map((x,i)=>`<article class="anthology-card${i===0?" featured":""}">
    <div class="anthology-meta">${esc(x.annee)} · ${esc(x.zone)} · ANNALE OFFICIELLE</div>
    <h2>${esc(x.auteur)} — <em>${esc(x.oeuvre)}</em></h2>
    <p>${esc(x.contexte)}</p>
    <div class="anthology-skills"><span>Problématique</span><span>Réponses du plan</span><span>Rédaction guidée</span><span>Aide IA</span></div>
    <div class="meta"><span class="badge">${x.access==="free"?"GRATUIT":"ACCÈS COMPLET"}</span></div>
    <a href="annales/entrainement-annale.html?id=${encodeURIComponent(x.id)}">Travailler pas à pas →</a>
    <a href="${esc(x.sourceOfficielle)}" target="_blank" rel="noopener">Sujet / banque officielle ↗</a>
  </article>`).join("");
})();