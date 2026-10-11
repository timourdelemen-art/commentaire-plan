/* Banque d’exemples : sélecteur.
   L’élève choisit un sujet (ou une notion), filtre par genre et par époque, et peut n’afficher que les citations vérifiées.
   Pour un sujet, les scènes qui font voir les deux réponses et leur double échec sortent en premier (« Peut ouvrir ce sujet »).
   Pour les autres scènes de la même notion, l’élève peut chercher lui-même le lien : sa réponse reçoit un retour. */
(()=>{
'use strict';
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’ʼ]/g,"'");
const key=(subject,id,field)=>'philo-scenes:v1:'+encodeURIComponent(subject)+':'+encodeURIComponent(id)+':'+field;
function splitScenes(examples,subjects,state){
  const match=e=>(!state.genre||e.genre===state.genre)&&(!state.epoque||e.epoque===state.epoque)&&(!state.verif||!!e.citation)&&norm(state.q).split(/\s+/).filter(Boolean).every(w=>norm([e.oeuvre,e.auteur,e.scene,e.genre,e.ref].join(' ')).includes(w));
  const sub=subjects.find(x=>x.s===state.sujet), notion=sub?sub.n:state.notion;
  const all=examples.filter(match);
  if(!sub)return {ouvre:[],partie:[],autres:all.filter(e=>!notion||e.notions.includes(notion))};
  const ouvre=all.filter(e=>e.sujets.some(x=>x.s===sub.s));
  const partie=all.filter(e=>!ouvre.includes(e)&&e.partie&&e.partie.pour.includes(sub.s));
  return {ouvre,partie,autres:all.filter(e=>!ouvre.includes(e)&&!partie.includes(e)&&e.notions.includes(notion))};
}
if(typeof module==='object'&&module.exports){module.exports={norm,key,splitScenes};return;}
const E=window.PHILO_EXEMPLES||[], S=window.PHILO_SUJETS||[], NOMS=window.PHILO_NOTIONS_NOMS||{};
const root=document.getElementById('exemples-app'); if(!root||!E.length) return;
const NB=' ';
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const typo=s=>String(s).replace(/ ([;:?!»])/g,NB+'$1').replace(/« /g,'«'+NB);
const T=s=>typo(esc(s));
const GENRES=['Théâtre','Roman','Récit','Poésie','Cinéma','Histoire','Mythe','Essai'];
const EPOQUES=['Antiquité','XVIIe siècle','XVIIIe siècle','XIXe siècle','XXe siècle','XXIe siècle'];
const params=new URLSearchParams(location.search);
const st={sujet:params.get('sujet')||'', notion:params.get('notion')||'', genre:params.get('genre')||'', epoque:params.get('epoque')||'', verif:params.get('verif')==='1', q:params.get('q')||''};
let selected=[];
let storageOK=true;
const memory=new Map();
function readDraft(id,field){const k=key(st.sujet,id,field);if(memory.has(k))return memory.get(k);try{return localStorage.getItem(k)||'';}catch(_){storageOK=false;return '';}}
function saveDraft(id,field,value){const k=key(st.sujet,id,field);memory.set(k,value);try{localStorage.setItem(k,value);}catch(_){storageOK=false;}showStorage();}
function showStorage(){root.querySelectorAll('[data-save-status]').forEach(p=>p.textContent=storageOK?'Votre texte reste sur cet appareil.':'Enregistrement indisponible : gardez une copie de votre texte avant de quitter la page.');}
if(!GENRES.includes(st.genre))st.genre='';
if(!EPOQUES.includes(st.epoque))st.epoque='';
if(!Object.hasOwn(NOMS,st.notion))st.notion='';
if(st.sujet && !S.find(x=>x.s===st.sujet)) st.sujet='';
const annee=a=>a<0?`vers ${-a} av. J.-C.`:String(a);
const notionsTriees=Object.keys(NOMS).sort((a,b)=>NOMS[a].localeCompare(NOMS[b],'fr'));


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
  <button type="button" class="btn small" data-clear-filters>Effacer les filtres</button>
  </div>`;
}
function citation(e){
  const c=e.citation; if(!c) return `<p class="ex-nocit">${e.auteur==='Histoire'?'Fait historique : pas de citation.':(e.genre==='Cinéma'?'Film : la scène est décrite, sans citation. Racontez-la avec vos mots et donnez sa référence.':'Aucune citation vérifiée ici : racontez la scène avec vos mots et donnez sa référence.')}</p>`;
  return `<blockquote class="ex-cit"><p>${T(c.t).replace(/\n/g,'<br>')}</p><footer>${T(c.qui)} · ${T(e.ref)}</footer></blockquote>
  <p class="ex-verifiee">✓ Citation vérifiée mot pour mot sur <a href="${esc(c.verif.url)}" target="_blank" rel="noopener">${esc(c.verif.source)}</a>. Ce contrôle ne valide pas son usage dans votre argument.</p>${quoteWorkshop(e)}`;
}
function quoteWorkshop(e){
  if(!st.sujet)return '';
  const options=['','Établir une distinction','Donner une raison','Formuler une objection','Mettre une idée à l’épreuve'];
  const current=readDraft(e.id,'fonction-citation');
  return `<details class="ex-quote-work"><summary>Cette citation sert-elle votre argument ?</summary><p>Une citation n’est utile que si ses mots exacts apportent quelque chose. Sinon, choisissez une paraphrase précise ou retirez-la.</p><label>Choisissez sa fonction.<select data-scene-draft="${esc(e.id)}" data-draft-field="fonction-citation">${options.map(v=>`<option value="${esc(v)}"${v===current?' selected':''}>${v||'Choisir une fonction'}</option>`).join('')}</select></label><label>Indiquez la partie et l’argument précis que vous voulez développer.<textarea rows="3" data-feedback="off" data-scene-draft="${esc(e.id)}" data-draft-field="argument-citation">${esc(readDraft(e.id,'argument-citation'))}</textarea></label><label>Rédigez une phrase avant, puis deux après : ce que le passage apporte et sa limite.<textarea rows="5" data-feedback="off" data-scene-draft="${esc(e.id)}" data-draft-field="emploi-citation">${esc(readDraft(e.id,'emploi-citation'))}</textarea></label><p>Relisez le passage source. Votre phrase explique-t-elle le raisonnement, même sans le nom de l’auteur ? La citation dit-elle vraiment ce que vous lui faites établir ?</p><p data-save-status></p></details>`;
}
function carte(e,mode){
  const sj=st.sujet && e.sujets.find(x=>x.s===st.sujet);
  let usage='';
  if(sj){
    usage=`<div class="ex-usage ex-deux"><div class="kicker">PEUT OUVRIR CE SUJET</div>
    <p><b>Une première piste</b>${T(sj.oui)}</p><p><b>Une autre piste</b>${T(sj.non)}</p>${sj.limite1?`<p><b>Limite de la première piste</b>${T(sj.limite1)}</p><p><b>Limite de la seconde piste</b>${T(sj.limite2)}</p>`:''}<p><b>Ce qui résiste</b>${T(sj.aporie)}</p>${sj.probleme?`<p><b>Question à travailler</b>${T(sj.probleme)}</p>`:''}</div>`;
  } else if(st.sujet && e.partie && e.partie.pour.includes(st.sujet)){
    usage=`<div class="ex-usage"><div class="kicker">DANS UNE PARTIE</div><p>${T(e.partie.texte)}</p></div>`;
  } else if(st.sujet){
    usage=`<div class="ex-usage ex-avous exercise"><div class="kicker">À VOUS DE TROUVER</div>
    <p class="instruction">Cette scène peut-elle ouvrir le sujet « ${T(st.sujet)} » ? En deux ou trois phrases : les deux pistes qu’elle fait comprendre, et ce qui reste difficile dans chacune. Si elle ne porte qu’une réponse, dites laquelle.</p>
    <textarea rows="4" data-scene-draft="${esc(e.id)}" data-draft-field="analyse" data-feedback="off" data-feedback-kind="philo-scene" data-feedback-quote="${esc(e.oeuvre+', '+e.auteur+' : '+e.scene)}" data-feedback-instruction="${esc('Sujet : '+st.sujet+'. L’élève dit si la scène fait voir les deux réponses du sujet et leur double échec. N’invente aucune citation ni aucun détail de l’œuvre.')}" aria-label="Votre analyse de ${esc(e.oeuvre)}">${esc(readDraft(e.id,'analyse'))}</textarea><p data-save-status></p></div>`;
  } else {
    const n=e.sujets.length;
    usage=n?`<div class="ex-usage ex-deux"><div class="kicker">PEUT OUVRIR ${n>1?n+' SUJETS':'UN SUJET'}</div><ul>${e.sujets.map(x=>`<li><button type="button" class="ex-link" data-goto="${esc(x.s)}">${T(x.s)}</button></li>`).join('')}</ul></div>`
      :(e.partie?`<div class="ex-usage"><div class="kicker">DANS UNE PARTIE</div><p>${T(e.partie.texte)}</p></div>`:'');
  }
  return `<article class="ex-carte${sj?' ex-top':''}">
  <div class="ex-meta">${esc(e.genre)} · ${esc(e.epoque)}${e.citation?' · <span class="ex-badge">citation vérifiée</span>':''}</div>
  <h3>${T(e.oeuvre)} <span>${T(e.auteur==='Histoire'?annee(e.annee):e.auteur+', '+annee(e.annee))}</span></h3>
  <p class="ex-scene">${T(e.scene)}</p>
  ${e.source?`<p class="ex-ref"><a href="${esc(e.source.url)}" target="_blank" rel="noopener">${T(e.source.label)}</a> · ${T(e.source.portee)}</p>`:''}
  ${citation(e)}
  ${e.citation?'':`<p class="ex-ref">Où la trouver : ${T(e.ref)}</p>`}
  ${usage}
  ${st.sujet?`<div class="ex-actions"><button type="button" class="btn small" data-compare="${esc(e.id)}" aria-pressed="${selected.includes(e.id)}">${selected.includes(e.id)?'Retirer de la comparaison':'Comparer cette scène'}</button></div>`:''}</article>`;
}
function resultats(){
  let html='';
  if(st.sujet){
    const sub=S.find(x=>x.s===st.sujet), notion=sub?sub.n:'';
    const {ouvre,partie,autres}=splitScenes(E,S,st);
    html+=`<p class="ex-count">« ${T(st.sujet)} » · ${esc(NOMS[notion]||'')}</p>`;
    html+=ouvre.length?`<h2 class="ex-h">Peut ouvrir ce sujet <small>${ouvre.length}</small></h2><p class="ex-hint">Ces pistes sont analysées pour ce sujet. Comparez-les : une scène doit faire comprendre les deux exigences sans déformer l’œuvre. Le classement ne désigne pas la meilleure.</p>${ouvre.map(carte).join('')}`
      :`<h2 class="ex-h">Peut ouvrir ce sujet</h2><p class="ex-hint">Pas encore de scène analysée pour ce sujet${st.verif||st.genre||st.epoque||st.q?' avec ces filtres':''}. Cherchez parmi les scènes ci-dessous : c’est l’exercice.</p>`;
    if(partie.length) html+=`<h2 class="ex-h">Pour une partie <small>${partie.length}</small></h2><p class="ex-hint">Ces exemples ne portent qu’une réponse : ils servent à l’intérieur d’une partie, pas en ouverture.</p>${partie.map(carte).join('')}`;
    if(autres.length) html+=`<h2 class="ex-h">À vous de trouver <small>${autres.length}</small></h2><p class="ex-hint">Mêmes notions, pas encore reliées à ce sujet. À vous de voir si l’une d’elles peut l’ouvrir : écrivez puis comparez les critères ci-dessous.</p>${autres.map(carte).join('')}`;
  } else {
    const liste=splitScenes(E,S,st).autres;
    html+=`<p class="ex-count">${liste.length} exemple${liste.length>1?'s':''}${st.notion?' · '+esc(NOMS[st.notion]):''}. Choisissez un sujet en haut pour savoir lesquels peuvent l’ouvrir.</p>`+liste.map(carte).join('');
  }
  const lists=splitScenes(E,S,st);
  if(!lists.ouvre.length&&!lists.partie.length&&!lists.autres.length)html+='<p role="status">Aucune scène avec ces filtres. Effacez les filtres pour élargir la recherche.</p>';
  return html;
}
function workshop(){
  if(!st.sujet)return '';
  const cards=selected.map(id=>E.find(e=>e.id===id)).filter(Boolean);
  const cells=cards.map(e=>{const sj=e.sujets.find(x=>x.s===st.sujet);return `<article><h3>${T(e.oeuvre)}</h3><p>${T(e.scene)}</p><p class="micro">${T(e.ref)}</p>${sj?`<p><b>Deux pistes :</b> ${T(sj.oui)} ${T(sj.non)}</p><p><b>Difficulté :</b> ${T(sj.aporie)}</p>`:'<p>Le lien avec ce sujet reste à établir. Son appartenance à la même notion ne suffit pas.</p>'}<label>En trois phrases, expliquez les deux pistes et la difficulté propre à cette scène.<textarea rows="5" data-feedback="off" data-scene-draft="${esc(e.id)}" data-draft-field="comparaison">${esc(readDraft(e.id,'comparaison'))}</textarea></label></article>`;}).join('');
  return `<section class="ex-workshop" aria-labelledby="ex-compare-title"><h2 id="ex-compare-title">Comparer, puis écrire.</h2><p>Choisissez jusqu’à deux scènes avec leurs boutons. Vous pouvez aussi analyser une seule scène.</p><p data-compare-status role="status">${cards.length} scène${cards.length>1?'s':''} retenue${cards.length>1?'s':''}.</p><div class="ex-compare-grid">${cells}</div><details><summary>Vérifier votre choix</summary><ol><li>Les deux pistes répondent-elles aux mots exacts du sujet ?</li><li>Chacune rencontre-t-elle une difficulté distincte, présente dans la scène ?</li><li>La référence vous permet-elle de retrouver les faits racontés ?</li><li>Pouvez-vous faire comprendre le problème sans raconter toute l’œuvre ?</li></ol><p>Une scène qui n’appuie qu’une seule piste sert dans une partie. N’inventez pas la piste manquante.</p></details><label>Justifiez votre préférence en deux phrases : ce qu’une scène fait mieux comprendre, puis sa limite.<textarea rows="4" data-feedback="off" data-scene-draft="choix" data-draft-field="preference">${esc(readDraft('choix','preference'))}</textarea></label><label>Rédigez votre ouverture en deux ou trois phrases, puis la question qui en découle.<textarea rows="6" data-feedback="off" data-scene-draft="choix" data-draft-field="ouverture">${esc(readDraft('choix','ouverture'))}</textarea></label><p data-save-status></p><p class="micro">Ces critères aident à relire ; ils ne vérifient pas automatiquement les faits et ne donnent aucune note.</p><a href="philosophie-probleme-pas-a-pas.html">Poursuivre : formuler le problème →</a></section>`;
}
function bindDrafts(){root.querySelectorAll('[data-scene-draft]').forEach(a=>{if(a.dataset.boundDraft)return;a.dataset.boundDraft='1';a.addEventListener('input',()=>saveDraft(a.dataset.sceneDraft,a.dataset.draftField,a.value));});showStorage();}
function render(){
  root.innerHTML=controls()+`<div class="ex-results" aria-live="polite">${resultats()}</div><div class="ex-workshop-host">${workshop()}</div>`;
  bind();bindDrafts();
}
function updateURL(){const u=new URL(location.href);['sujet','notion','genre','epoque','q'].forEach(k=>{const v=k==='notion'&&st.sujet?'':st[k];v?u.searchParams.set(k,v):u.searchParams.delete(k);});st.verif?u.searchParams.set('verif','1'):u.searchParams.delete('verif');history.replaceState(null,'',u);}
function go(changes){if(Object.hasOwn(changes,'sujet')&&changes.sujet!==st.sujet)selected=[];Object.assign(st,changes);updateURL();render();}

function bind(){
  const $=s=>root.querySelector(s);
  $('#ex-sujet').onchange=e=>go({sujet:e.target.value});
  $('.ex-hasard').onclick=()=>{ const avec=S.filter(x=>E.some(e=>e.sujets.some(y=>y.s===x.s))); const p=avec[Math.floor(Math.random()*avec.length)]; if(p)go({sujet:p.s,genre:'',epoque:'',verif:false,q:''}); };
  root.querySelectorAll('[data-notion]').forEach(b=>b.onclick=()=>go({notion:b.dataset.notion}));
  root.querySelectorAll('[data-genre]').forEach(b=>b.onclick=()=>go({genre:b.dataset.genre}));
  bindResults();
  $('[data-clear-filters]').onclick=()=>go({genre:'',epoque:'',verif:false,q:''});
  $('#ex-epoque').onchange=e=>go({epoque:e.target.value});
  $('#ex-verif').onchange=e=>go({verif:e.target.checked});
  let t; $('#ex-q').oninput=e=>{ clearTimeout(t); const v=e.target.value; t=setTimeout(()=>{ st.q=v;updateURL();root.querySelector('.ex-results').innerHTML=resultats();bindResults();bindDrafts(); },250); };
}
function bindResults(){ root.querySelectorAll('[data-compare]').forEach(b=>b.onclick=()=>{const id=b.dataset.compare;if(selected.includes(id))selected=selected.filter(x=>x!==id);else if(selected.length<2)selected.push(id);else{root.querySelector('[data-compare-status]').textContent='Deux scènes sont déjà retenues : retirez-en une avant d’en ajouter une autre.';return;}render();const target=root.querySelector('[data-compare="'+id+'"]');if(target)target.focus();}); root.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{ go({sujet:b.dataset.goto}); root.scrollIntoView({behavior:'smooth'}); }); }
render();
})();
