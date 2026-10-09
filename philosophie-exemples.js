/* Banque d’exemples : sélecteur.
   L’élève choisit un sujet (ou une notion), filtre par genre et par époque, et peut n’afficher que les citations vérifiées.
   Pour un sujet, les scènes qui font voir les deux réponses et leur double échec sortent en premier (« Peut ouvrir ce sujet »).
   Pour les autres scènes de la même notion, l’élève peut chercher lui-même le lien : sa réponse reçoit un retour. */
(()=>{
const E=window.PHILO_EXEMPLES||[], S=window.PHILO_SUJETS||[], NOMS=window.PHILO_NOTIONS_NOMS||{};
const root=document.getElementById('exemples-app'); if(!root||!E.length) return;
const NB=' ';
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const typo=s=>String(s).replace(/ ([;:?!»])/g,NB+'$1').replace(/« /g,'«'+NB);
const T=s=>typo(esc(s));
const GENRES=['Théâtre','Roman','Récit','Poésie','Cinéma','Histoire','Mythe','Essai'];
const EPOQUES=['Antiquité','XVIIe siècle','XVIIIe siècle','XIXe siècle','XXe siècle','XXIe siècle'];
const params=new URLSearchParams(location.search);
const st={sujet:params.get('sujet')||'', notion:params.get('notion')||'', genre:'', epoque:'', verif:false, q:''};
if(st.sujet && !S.find(x=>x.s===st.sujet)) st.sujet='';
const annee=a=>a<0?`vers ${-a} av. J.-C.`:String(a);
const notionsTriees=Object.keys(NOMS).sort((a,b)=>NOMS[a].localeCompare(NOMS[b],'fr'));
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');

function controls(){
  const opts=notionsTriees.map(n=>`<optgroup label="${esc(NOMS[n])}">${S.filter(x=>x.n===n).map(x=>`<option value="${esc(x.s)}"${x.s===st.sujet?' selected':''}>${esc(x.s)}</option>`).join('')}</optgroup>`).join('');
  return `<div class="ex-controls">
  <div class="ex-row ex-sujet"><label for="ex-sujet"><b>1. Votre sujet</b></label>
   <div class="ex-sujet-line"><select id="ex-sujet"><option value="">Aucun sujet : je parcours par notion</option>${opts}</select>
   <button type="button" class="btn small ex-hasard">Un sujet au hasard</button></div></div>
  ${st.sujet?'':`<div class="ex-row"><b>Ou une notion</b><div class="ex-chips">${['',...notionsTriees].map(n=>`<button type="button" data-notion="${n}" class="${st.notion===n?'on':''}">${n?esc(NOMS[n]):'Toutes'}</button>`).join('')}</div></div>`}
  <div class="ex-row"><b>2. Affiner</b><div class="ex-chips">${['',...GENRES].map(g=>`<button type="button" data-genre="${g}" class="${st.genre===g?'on':''}">${g||'Tous les genres'}</button>`).join('')}</div>
   <div class="ex-line"><select id="ex-epoque" aria-label="Époque"><option value="">Toutes les époques</option>${EPOQUES.map(e=>`<option${st.epoque===e?' selected':''}>${e}</option>`).join('')}</select>
   <label class="ex-verif"><input type="checkbox" id="ex-verif"${st.verif?' checked':''}> Citations vérifiées seulement</label>
   <input type="search" id="ex-q" placeholder="Chercher : Racine, Antigone, film…" value="${esc(st.q)}" aria-label="Chercher une œuvre ou un auteur"></div></div>
  </div>`;
}
function passe(e){
  if(st.genre && e.genre!==st.genre) return false;
  if(st.epoque && e.epoque!==st.epoque) return false;
  if(st.verif && !e.citation) return false;
  if(st.q){ const h=norm([e.oeuvre,e.auteur,e.scene,e.genre].join(' ')); if(!norm(st.q).split(/\s+/).every(w=>h.includes(w))) return false; }
  return true;
}
function citation(e){
  const c=e.citation; if(!c) return `<p class="ex-nocit">${e.auteur==='Histoire'?'Fait historique : pas de citation.':(e.genre==='Cinéma'?'Film : la scène est décrite, sans citation. Racontez-la avec vos mots et donnez sa référence.':(e.annee>=1929?'Œuvre encore protégée : la scène est décrite, sans citation. Racontez-la avec vos mots et donnez sa référence.':'Aucune citation vérifiée pour l’instant : racontez la scène avec vos mots et donnez sa référence.'))}</p>`;
  return `<blockquote class="ex-cit"><p>${T(c.t).replace(/\n/g,'<br>')}</p><footer>${T(c.qui)} · ${T(e.ref)}</footer></blockquote>
  <p class="ex-verifiee">✓ Citation vérifiée mot pour mot sur <a href="${esc(c.verif.url)}" target="_blank" rel="noopener">${esc(c.verif.source)}</a></p>`;
}
function carte(e,mode){
  const sj=st.sujet && e.sujets.find(x=>x.s===st.sujet);
  let usage='';
  if(sj){
    usage=`<div class="ex-usage ex-deux"><div class="kicker">PEUT OUVRIR CE SUJET</div>
    <p><b>Pour le oui</b>${T(sj.oui)}</p><p><b>Pour le non</b>${T(sj.non)}</p><p><b>Pourquoi aucune ne suffit</b>${T(sj.aporie)}</p></div>`;
  } else if(st.sujet && e.partie && e.partie.pour.includes(st.sujet)){
    usage=`<div class="ex-usage"><div class="kicker">DANS UNE PARTIE</div><p>${T(e.partie.texte)}</p></div>`;
  } else if(st.sujet){
    usage=`<div class="ex-usage ex-avous exercise"><div class="kicker">À VOUS DE TROUVER</div>
    <p class="instruction">Cette scène peut-elle ouvrir le sujet « ${T(st.sujet)} » ? En deux ou trois phrases : ce qu’elle montre pour le oui, ce qu’elle montre pour le non, et pourquoi aucune réponse ne suffit. Si elle ne porte qu’une réponse, dites laquelle.</p>
    <textarea rows="4" data-feedback-kind="philo-scene" data-feedback-quote="${esc(e.oeuvre+', '+e.auteur+' : '+e.scene)}" data-feedback-instruction="${esc('Sujet : '+st.sujet+'. L’élève dit si la scène fait voir les deux réponses du sujet et leur double échec. N’invente aucune citation ni aucun détail de l’œuvre.')}" aria-label="Votre réponse"></textarea></div>`;
  } else {
    const n=e.sujets.length;
    usage=n?`<div class="ex-usage ex-deux"><div class="kicker">PEUT OUVRIR ${n>1?n+' SUJETS':'UN SUJET'}</div><ul>${e.sujets.map(x=>`<li><button type="button" class="ex-link" data-goto="${esc(x.s)}">${T(x.s)}</button></li>`).join('')}</ul></div>`
      :(e.partie?`<div class="ex-usage"><div class="kicker">DANS UNE PARTIE</div><p>${T(e.partie.texte)}</p></div>`:'');
  }
  return `<article class="ex-carte${sj?' ex-top':''}">
  <div class="ex-meta">${esc(e.genre)} · ${esc(e.epoque)}${e.citation?' · <span class="ex-badge">citation vérifiée</span>':''}</div>
  <h3>${T(e.oeuvre)} <span>${T(e.auteur==='Histoire'?annee(e.annee):e.auteur+', '+annee(e.annee))}</span></h3>
  <p class="ex-scene">${T(e.scene)}</p>
  ${citation(e)}
  ${e.citation?'':`<p class="ex-ref">Où la trouver : ${T(e.ref)}</p>`}
  ${usage}</article>`;
}
function resultats(){
  let html='';
  if(st.sujet){
    const sub=S.find(x=>x.s===st.sujet), notion=sub?sub.n:'';
    const ouvre=E.filter(e=>e.sujets.some(x=>x.s===st.sujet)).filter(passe);
    const partie=E.filter(e=>!ouvre.includes(e) && e.partie && e.partie.pour.includes(st.sujet)).filter(passe);
    const autres=E.filter(e=>!ouvre.includes(e)&&!partie.includes(e)&&e.notions.includes(notion)).filter(passe);
    html+=`<p class="ex-count">« ${T(st.sujet)} » · ${esc(NOMS[notion]||'')}</p>`;
    html+=ouvre.length?`<h2 class="ex-h">Peut ouvrir ce sujet <small>${ouvre.length}</small></h2><p class="ex-hint">Ces scènes font voir les deux réponses et leur double échec : la meilleure ouverture possible.</p>${ouvre.map(carte).join('')}`
      :`<h2 class="ex-h">Peut ouvrir ce sujet</h2><p class="ex-hint">Pas encore de scène analysée pour ce sujet${st.verif||st.genre||st.epoque||st.q?' avec ces filtres':''}. Cherchez parmi les scènes ci-dessous : c’est l’exercice.</p>`;
    if(partie.length) html+=`<h2 class="ex-h">Pour une partie <small>${partie.length}</small></h2><p class="ex-hint">Ces exemples ne portent qu’une réponse : ils servent à l’intérieur d’une partie, pas en ouverture.</p>${partie.map(carte).join('')}`;
    if(autres.length) html+=`<h2 class="ex-h">À vous de trouver <small>${autres.length}</small></h2><p class="ex-hint">Mêmes notions, pas encore reliées à ce sujet. À vous de voir si l’une d’elles peut l’ouvrir : écrivez, vous recevez un retour.</p>${autres.map(carte).join('')}`;
  } else {
    const liste=E.filter(e=>(!st.notion||e.notions.includes(st.notion))).filter(passe).sort((a,b)=>b.sujets.length-a.sujets.length);
    html+=`<p class="ex-count">${liste.length} exemple${liste.length>1?'s':''}${st.notion?' · '+esc(NOMS[st.notion]):''}. Choisissez un sujet en haut pour savoir lesquels peuvent l’ouvrir.</p>`+liste.map(carte).join('');
  }
  return html;
}
function render(){
  root.innerHTML=controls()+`<div class="ex-results" aria-live="polite">${resultats()}</div>`;
  bind();
}
function go(changes){ Object.assign(st,changes); const u=new URL(location.href); st.sujet?u.searchParams.set('sujet',st.sujet):u.searchParams.delete('sujet'); st.notion&&!st.sujet?u.searchParams.set('notion',st.notion):u.searchParams.delete('notion'); history.replaceState(null,'',u); render(); }
function bind(){
  const $=s=>root.querySelector(s);
  $('#ex-sujet').onchange=e=>go({sujet:e.target.value});
  $('.ex-hasard').onclick=()=>{ const avec=S.filter(x=>E.some(e=>e.sujets.some(y=>y.s===x.s))); const p=avec[Math.floor(Math.random()*avec.length)]; go({sujet:p.s}); };
  root.querySelectorAll('[data-notion]').forEach(b=>b.onclick=()=>go({notion:b.dataset.notion}));
  root.querySelectorAll('[data-genre]').forEach(b=>b.onclick=()=>go({genre:b.dataset.genre}));
  root.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{ go({sujet:b.dataset.goto}); root.scrollIntoView({behavior:'smooth'}); });
  $('#ex-epoque').onchange=e=>go({epoque:e.target.value});
  $('#ex-verif').onchange=e=>go({verif:e.target.checked});
  let t; $('#ex-q').oninput=e=>{ clearTimeout(t); const v=e.target.value; t=setTimeout(()=>{ st.q=v; root.querySelector('.ex-results').innerHTML=resultats(); bindResults(); },250); };
}
function bindResults(){ root.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{ go({sujet:b.dataset.goto}); root.scrollIntoView({behavior:'smooth'}); }); }
render();
})();
