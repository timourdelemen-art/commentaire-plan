/* QCM de problématique : une bonne formulation, trois distracteurs.
   L'élève choisit, puis nomme l'erreur de chaque distracteur.
   Balisage attendu :
   <div class="philo-qcm"><ol class="qcm-options">
     <li data-ok="1" data-why="…">texte</li>
     <li data-error="rhetorique" data-why="…">texte</li> …
   </ol></div> */
(()=>{
const ERR={
 hors:["Hors sujet : un doigt manque","fait disparaître un mot ou la relation que pose le sujet","aucun doigt ne manque"],
 reformulation:["Le sujet recopié","redit le sujet avec d’autres mots, sans faire apparaître de difficulté","on reconnaît le sujet sans qu’il soit recopié"],
 rhetorique:["La réponse est dans la question","« comment pourrait-on… si… » : la question a déjà répondu","les deux réponses restent ouvertes"],
 alternative:["Un faux choix","oppose les notions comme s’il fallait choisir entre elles","aucun doigt ne manque"],
 couple:["Une formule toute faite","plaque un couple appris par cœur (nature ou culture, hasard ou nécessité…)","aucun doigt en trop"],
 definitions:["Deux définitions côte à côte","« si l’on entend x… si l’on entend y… » sans montrer de difficulté","les deux réponses restent ouvertes"],
 generique:["Trop large","vaudrait telle quelle pour un autre sujet sur la même notion","on reconnaît le sujet, et seulement lui"],
 cascade:["Trop de questions","aligne plusieurs questions sans en poser une vraie","d’une traite"],
 ajout:["Un mot en trop","ajoute une notion ou une définition que le sujet ne contient pas","aucun doigt en trop"],
 boiteux:["La question penche d’un côté","une seule réponse est mise à l’épreuve ; l’autre n’est jamais examinée","les deux réponses restent ouvertes"]
};
const esc=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
document.querySelectorAll(".philo-qcm").forEach((box,qi)=>{
 const items=[...box.querySelectorAll(".qcm-options > li")];
 const fb=document.createElement("div"); fb.className="qcm-feedback"; fb.setAttribute("aria-live","polite"); box.appendChild(fb);
 items.forEach((li,n)=>{
  const letter=String.fromCharCode(65+n);
  const text=li.innerHTML;
  li.innerHTML='<button type="button" class="qcm-option"><b>'+letter+'.</b> '+text+'</button><div class="qcm-detail" hidden></div>';
  const btn=li.querySelector("button"), det=li.querySelector(".qcm-detail");
  btn.addEventListener("click",()=>{
   if(li.dataset.ok){
    li.classList.add("is-ok"); btn.disabled=true;
    det.hidden=false; det.innerHTML='<p><strong>Bonne problématique.</strong> '+esc(li.dataset.why||"")+'</p>';
    fb.innerHTML='<p>Il reste à nommer l’erreur de chaque autre formulation.</p>';
    items.filter(x=>!x.dataset.ok).forEach(x=>openNaming(x));
   }else{
    fb.innerHTML='<p><strong>Ce n’est pas la meilleure.</strong> Nommez son erreur, puis cherchez la formulation qui passe le test du gant.</p>';
    openNaming(li);
   }
  });
 });
 function openNaming(li){
  if(li.dataset.open) return; li.dataset.open="1";
  const det=li.querySelector(".qcm-detail"); det.hidden=false;
  const id="qcm"+qi+"-"+items.indexOf(li);
  det.innerHTML='<label for="'+id+'">Erreur :</label> <select id="'+id+'"><option value="">— choisir —</option>'+
   Object.entries(ERR).map(([k,v])=>'<option value="'+k+'">'+v[0]+'</option>').join("")+'</select><div class="qcm-verdict" aria-live="polite"></div>';
  const sel=det.querySelector("select"), out=det.querySelector(".qcm-verdict");
  sel.addEventListener("change",()=>{
   if(!sel.value){out.innerHTML="";return;}
   const good=sel.value===li.dataset.error, e=ERR[li.dataset.error];
   li.classList.toggle("is-named",good);
   out.innerHTML=good
    ?'<p><strong>Oui : '+e[0].toLowerCase()+'.</strong> '+esc(li.dataset.why||"")+' <span class="micro">Point du test du gant : '+e[2]+'.</span></p>'
    :'<p><strong>Pas tout à fait.</strong> « '+ERR[sel.value][0]+' » '+ERR[sel.value][1]+'. Relisez la formulation : est-ce bien son défaut principal ?</p>';
  });
 }
});
})();
