(() => {
  const corpus=window.PROCEDES_CORPUS||[];
  const search=document.getElementById("effect-search");
  const filter=document.getElementById("effect-filter");
  const results=document.getElementById("effect-results");
  const count=document.getElementById("effect-count");
  const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
  const procedures=[...new Set(corpus.flatMap(x=>x.procedures||[]))].sort((a,b)=>a.localeCompare(b,"fr"));
  filter.insertAdjacentHTML("beforeend",procedures.map(p=>"<option>"+esc(p)+"</option>").join(""));
  function render(){
    const q=(search.value||"").trim().toLowerCase();
    const f=filter.value;
    const list=corpus.filter(x=>{
      const hay=[x.auteur,x.oeuvre,x.citation,(x.procedures||[]).join(" "),x.effet,x.sourceAnnale||""].join(" ").toLowerCase();
      return (!q||hay.includes(q)) && (!f||(x.procedures||[]).includes(f));
    });
    count.textContent=list.length+" occurrence"+(list.length>1?"s":"")+" affichée"+(list.length>1?"s":"")+".";
    results.innerHTML=list.map(x=>`<article>
      <span>${esc((x.procedures||[]).join(" · "))}</span>
      <h3>${esc(x.auteur)}</h3>
      <p class="micro">${esc(x.oeuvre)}${x.annee?" · "+esc(x.annee):""}${x.sourceAnnale?" · "+esc(x.sourceAnnale):""}</p>
      <p><strong>Élément :</strong> « ${esc(x.citation)} »</p>
      <p><strong>Effet ici :</strong> ${esc(x.effet)}</p>
      ${x.annaleHref?`<p><a class="official-link" href="${esc(x.annaleHref)}">Travailler l’annale →</a></p>`:""}
    </article>`).join("");
  }
  search.addEventListener("input",render);
  filter.addEventListener("change",render);
  render();
})();