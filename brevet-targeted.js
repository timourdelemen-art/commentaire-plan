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
      });
    }
  }
  const progressive=new Set(['2022-q2c','2022-q5','2022-q6','2022-q11','2023-q3','2023-q4b','2023-q5','2023-q10']);
  rows.sort((a,b)=>b.annee-a.annee || a.titre.localeCompare(b.titre,"fr"));
  const card=x=>`
    <a class="brevet-bank-card" href="${progressive.has(x.annee+'-'+x.step)?'brevet-lecture-parcours.html#'+x.annee+'-'+x.step:'annales/entrainement-annale.html?id='+encodeURIComponent(x.id)+'&mode=targeted&step='+encodeURIComponent(x.step)}">
      <div class="brevet-bank-meta">${esc(x.annee)} · ${esc(x.auteur)} · ${esc(x.oeuvre)}</div>
      <h3>${esc(x.titre)}</h3>
      <div class="brevet-bank-tags">
        ${progressive.has(x.annee+'-'+x.step)?"Au clic ou à l’écrit · modèle expliqué":x.correction?"Avec aide et corrigé à consulter":"Avec aide pour commencer"}
      </div>
      <b>Faire cet exercice →</b>
    </a>`;
  const years=[...new Set(rows.map(x=>x.annee))];
  host.classList.replace("brevet-bank-grid","brevet-bank-years");
  host.innerHTML=rows.length?years.map((year,i)=>{
    const exercises=rows.filter(x=>x.annee===year);
    return `<details class="brevet-bank-year"${i===0?' open':''}><summary>Session ${esc(year)} <small>${exercises.length} exercices</small></summary><div class="brevet-bank-grid">${exercises.map(card).join('')}</div></details>`;
  }).join(''):"<p>Aucun exercice disponible pour ce groupe.</p>";
})();
