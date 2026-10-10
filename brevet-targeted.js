(() => {
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));

  /* Choix corrigés en trois états (Solide / Défendable / À revoir) sur les pages du brevet.
     Chaque bouton porte data-state (ok, def, no) et data-why (la justification en une phrase). */
  const LABEL3={ok:"Solide",def:"Défendable",no:"À revoir"};
  document.querySelectorAll(".brevet-qcm").forEach(qcm=>{
    const fb=qcm.querySelector(".brevet-qcm-fb");
    qcm.querySelectorAll("button[data-state]").forEach(btn=>btn.addEventListener("click",()=>{
      qcm.querySelectorAll("button[data-state]").forEach(x=>x.classList.remove("picked","ok","def","no"));
      const st=btn.dataset.state;
      btn.classList.add("picked",st);
      if(!fb) return;
      fb.className="brevet-qcm-fb chaine-fb show "+st;
      fb.innerHTML="<strong>"+LABEL3[st]+".</strong> "+esc(btn.dataset.why||"")+(st==="no"?" Essayez une autre proposition.":"");
    }));
  });

  const host=document.getElementById("brevetTargetedBank");
  if(!host) return;
  const kinds=(host.dataset.kinds||"").split(",").map(x=>x.trim()).filter(Boolean);
  const catalogue=window.ANNALES_CATALOGUE||{};
  const CLOSED=["brevet-grammaire","brevet-lexique","brevet-reecriture"];
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
        correction:Boolean(step.correction),
        open:!CLOSED.includes(step.kind)
      });
    }
  }
  rows.sort((a,b)=>b.annee-a.annee || a.titre.localeCompare(b.titre,"fr"));
  const aiLabel=x=>x.aiMode==="none"?"Correction locale":x.aiMode==="recommended"?"Retour personnalisé conseillé":"Retour personnalisé possible";
  host.innerHTML=rows.length?rows.map(x=>`
    <a class="brevet-bank-card" href="annales/entrainement-annale.html?id=${encodeURIComponent(x.id)}&mode=targeted&step=${encodeURIComponent(x.step)}">
      <div class="brevet-bank-meta">${esc(x.annee)} · ${esc(x.auteur)} · ${esc(x.oeuvre)}</div>
      <h3>${esc(x.titre)}</h3>
      <div class="brevet-bank-tags">
        <span>${x.access==="premium"?"ACCÈS COMPLET":"GRATUIT"}</span>
        <span>${esc(aiLabel(x))}</span>
        ${x.correction&&x.open?"<span>Réponse possible</span>":""}
      </div>
      <b>Faire cet exercice →</b>
    </a>`).join(""):"<p>Aucun exercice disponible pour ce groupe.</p>";
})();
