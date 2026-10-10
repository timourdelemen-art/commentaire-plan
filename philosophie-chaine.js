/* Chaîne « Trouver le problème » : une question à la fois, trois propositions, la problématique se construit.
   Niveau 1 : tout au clic. Niveau 2 : certaines places s'écrivent. Niveau 3 : un sujet entier à écrire (page d'annale).
   Statuts : ok = solide, def = défendable, no = à revoir. */
(()=>{
const D=window.PHILO_CHAINE, root=document.getElementById('chaine-app');
if(!D||!root) return;
const NB=' ';
const typo=s=>String(s).replace(/ ([;:?!»])/g,NB+'$1').replace(/« /g,'«'+NB);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const T=s=>typo(esc(s));
const KEY='philo-chaine-fait';
const MASTERED_KEY='philo-chaine-solides';
const PRACTICE_KEY='philo-chaine-reprises';
const readPractice=()=>{try{return JSON.parse(localStorage.getItem(PRACTICE_KEY)||'{}')}catch(e){return {}}};
const markPractice=id=>{const a=readPractice();a[id]=(a[id]||0)+1;try{localStorage.setItem(PRACTICE_KEY,JSON.stringify(a))}catch(e){}};
const readMastered=()=>{try{const a=JSON.parse(localStorage.getItem(MASTERED_KEY)||'[]');return Array.isArray(a)?a:[]}catch(e){return []}};
const saveMastered=a=>{try{localStorage.setItem(MASTERED_KEY,JSON.stringify(a))}catch(e){}};
/* Parmi les sujets réussis, ceux où au moins une réponse était seulement « Défendable » (réussite, mais distinguée dans le bilan). */
const DEF_KEY='philo-chaine-defendables';
const readDef=()=>{try{const a=JSON.parse(localStorage.getItem(DEF_KEY)||'[]');return Array.isArray(a)?a:[]}catch(e){return []}};
const saveDef=a=>{try{localStorage.setItem(DEF_KEY,JSON.stringify(a))}catch(e){}};
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}};
const save=a=>{try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const ANNALE={'inconscient-heureux':'faut-il-etre-inconscient-pour-etre-heureux','certain-bien-agi':'peut-on-etre-certain-d-avoir-bien-agi','science-utile':'la-science-doit-elle-etre-utile','artiste-sait':'l-artiste-sait-il-ce-qu-il-fait','prisonniers-langage':'sommes-nous-prisonniers-du-langage'};
const PLAN_IDS=['justice-lois','inconscient-heureux','certain-bien-agi','science-utile','artiste-sait','prisonniers-langage'];
const LABEL={ok:'Solide',def:'Défendable',no:'À revoir'};
const PLACE={raison:'Pourquoi',scene:'La scène',perte:'Ce qu’il perd',pb:'La problématique'};

let level=1, si=0, step=0, got=[], hadNo=false, hadDef=false, attempts=0;
const params=new URLSearchParams(location.search);
if(params.get('niveau')) level=Math.min(3,Math.max(1,Number(params.get('niveau'))||1));
const wanted=params.get('sujet');
if(wanted){ const i1=D.niveau1.findIndex(x=>x.id===wanted), i2=D.niveau2.findIndex(x=>x.id===wanted); if(level===2&&i2>=0) si=i2; else if(i1>=0){ level=1; si=i1; } else if(i2>=0){ level=2; si=i2; } }
const list=()=>level===2?D.niveau2:D.niveau1;
const subj=()=>list()[si];

function tabs(){
  return `<nav class="chaine-tabs" aria-label="Niveaux">${[[1,'Niveau 1','Au clic'],[2,'Niveau 2','J’écris un peu'],[3,'Niveau 3','J’écris tout']].map(([n,a,b])=>`<button type="button" data-level="${n}" class="${n===level?'on':''}" ${n===level?'aria-current="step"':''}><b>${a}</b><span>${typo(b)}</span></button>`).join('')}</nav>`;
}
const GRP={oui:'Le oui',non:'Le non',pb:'La problématique'};
const grpOf=i=>i<3?'oui':i<6?'non':'pb';
const NB_ET=()=>subj().etapes.length;
let open=false;
const wide=()=>window.matchMedia&&window.matchMedia('(min-width: 1000px)').matches;
const sans=h=>String(h).replace(/<\/?u>/g,'');
function chooser(){
  if(level===3) return '';
  const done=read(), mastered=readMastered(), defs=readDef();
  if(level===2) {const seen=readPractice();return `<div class="chaine-sujets"><span>Sujet</span>${D.niveau2.map((s,i)=>`<button type="button" data-subj="${i}" class="${i===si?'on':''}">${seen['2:'+s.id]?'↻ ':''}${T(s.sujet)}</button>`).join('')}</div>`;}
  const n=mastered.filter(id=>D.niveau1.some(x=>x.id===id)).length;
  return `<div class="chaine-sujets"><span>Sujet · ${n} réussi${n>1?'s':''} sur 3 conseillés</span>${D.niveau1.map((s,i)=>`<button type="button" data-subj="${i}" class="${i===si?'on':''}">${mastered.includes(s.id)?'✓ ':done.includes(s.id)?'↻ ':''}${T(s.sujet)}${mastered.includes(s.id)?`<small>${defs.includes(s.id)?'réussi, une réponse défendable':'réussi'}</small>`:done.includes(s.id)?'<small>déjà essayé</small>':''}</button>`).join('')}</div>`;
}
function barre(){
  const s=subj(), niv=[,'Niveau 1 · Au clic','Niveau 2 · J’écris un peu','Niveau 3 · J’écris tout'][level];
  const head=`<div class="pb-barre"><span class="pb-niv">${typo(niv)}</span>${level<3?`<span class="pb-suj">${typo('« '+esc(s.sujet)+' »')} <i>${T(s.notion)}</i></span>`:''}<button type="button" class="pb-changer" aria-expanded="${open}">${open?'Fermer':'Changer de niveau ou de sujet'}</button></div>`;
  return head+(open?`<div class="pb-choix">${tabs()}${chooser()}</div>`:'');
}
function repere(){
  const s=subj(), N=NB_ET(), e=s.etapes[Math.min(step,N-1)];
  const where=step<N?`<b>${typo(GRP[grpOf(step)])}${step<6?' · '+typo(PLACE[e.p]):''}</b><span>Question ${step+1} sur ${N}</span>`:`<b>Problème trouvé</b><span>${N} questions sur ${N}</span>`;
  const segs=s.etapes.map((x,i)=>i).map(i=>`<i class="${i<step?'done':i===step?'now':''}${i===3||i===6?' sep':''}"></i>`).join('');
  return `<div class="pb-repere">${where}</div><div class="pb-jauge" aria-hidden="true">${segs}<span>Oui</span><span>Non</span><span>Pb</span></div>`;
}
function carte(){
  const s=subj(), nb=got.filter(Boolean).length;
  const cell=i=>{const t=got[i];return `<p class="${t?'':'vide'}${i===step?' now':''}"><em>${typo(PLACE[s.etapes[i].p])}</em>${t?T(t):'…'}</p>`;};
  const col=(k,ids,h)=>`<div class="pb-col pb-${k}"><strong>${h}</strong>${ids.map(cell).join('')}</div>`;
  return `<details class="pb-carte"${wide()||step>=NB_ET()?' open':''}><summary>La carte du problème <span>${nb} sur ${NB_ET()}</span></summary>
  <div class="pb-cols">${col('oui',[0,1,2],sans(typo(s.oui)))}${col('non',[3,4,5],sans(typo(s.non)))}</div>
  <div class="pb-pbm${got[6]?'':' vide'}${step===6?' now':''}"><em>La problématique</em>${got[6]?T(got[6]):'Elle naîtra de ce que perdent les deux réponses.'}</div></details>`;
}
function stepView(){
  const s=subj(), e=s.etapes[step];
  const enonce = e.b==='oui'?typo(s.oui):e.b==='non'?typo(s.non):    `Le oui perd : <strong>${T(got[2]||'')}</strong><br>Le non perd : <strong>${T(got[5]||'')}</strong>`;
  let body;
  if(e.w){
    body=`<label class="chaine-q" for="chaine-w">${T(e.q)}</label><textarea id="chaine-w" rows="3"></textarea>
    <p><button type="button" class="btn red small chaine-compare">Comparer avec une réponse possible</button></p><div class="chaine-fb" aria-live="polite"></div>`;
  } else {
    body=`<p class="chaine-q">${T(e.q)}</p><div class="chaine-opts">${shuffle(e.o.map((o,k)=>k)).map(k=>`<button type="button" class="chaine-opt" data-k="${k}">${T(e.o[k][0])}</button>`).join('')}</div><div class="chaine-fb" aria-live="polite"></div>`;
  }
  return `<div class="chaine-step pb-step"><p class="chaine-enonce">${enonce}</p>${body}</div>`;
}
function endView(){
  const s=subj();
  const done=read(); if(!done.includes(s.id)){done.push(s.id);save(done);}
  if(!got._marked){markPractice(level+':'+s.id);got._marked=true;}
  if(level===1&&!hadNo&&!got._validated){
    got._validated=true;
    const m=readMastered(), d=readDef();
    const wasSolid=m.includes(s.id)&&!d.includes(s.id);
    if(!m.includes(s.id)) m.push(s.id);
    // le meilleur passage l’emporte : un sujet déjà « Solide » le reste ; un passage « Solide » efface la mention « défendable »
    const di=d.indexOf(s.id);
    if(hadDef&&di<0&&!wasSolid) d.push(s.id);
    if(!hadDef&&di>=0) d.splice(di,1);
    saveMastered(m); saveDef(d);
  }
  const mastered=readMastered().filter(id=>D.niveau1.some(x=>x.id===id));
  const defs=readDef().filter(id=>mastered.includes(id));
  const solides=mastered.length-defs.length;
  const ready=mastered.length>=3;
  const nextSubj=level===1?D.niveau1.length>1:D.niveau2.length>1;
  const verdict=hadNo?'<b class="pb-a-revoir">Sujet à reprendre.</b> Une réponse était « À revoir » : recommencez-le, ou essayez un autre sujet.':(hadDef?'<b class="pb-valide">✓ Sujet validé.</b> Réponses solides ou défendables : repassez-le pour viser « Solide » partout.':'<b class="pb-valide">✓ Sujet validé.</b> Toutes vos réponses étaient solides.');
  const pastilles=[0,1,2].map(i=>`<i class="${i<mastered.length?'on':''}"></i>`).join('');
  const bilan=level===1?`<div class="pb-bilan"><p>${verdict}</p><p class="pb-score"><span class="pb-pastilles" aria-hidden="true">${pastilles}</span><strong>${mastered.length} sujet${mastered.length>1?'s':''} réussi${mastered.length>1?'s':''} sur 3 conseillés</strong>${defs.length?` <span>(dont ${defs.length} avec une réponse défendable)</span>`:''}</p><p class="micro">${ready?'Trois sujets différents réussis : passez au niveau 2, où vous écrirez vous-même certaines réponses.':'Pour consolider le geste, changez de sujet : c’est en le refaisant ailleurs qu’on le possède. Le niveau 2 reste ouvert à tout moment.'}</p></div>`
   :`<div class="pb-bilan"><p><strong>Ce que vous gagnez :</strong> vous avez formulé vous-même deux difficultés et leur relation, puis comparé vos phrases avec des exemples. Recommencez sur un autre sujet avant d’essayer seul, sans questions intermédiaires.</p></div>`;
  const primaire=level===1&&!ready&&nextSubj;
  const suite=[PLAN_IDS.includes(s.id)?`<li><a class="official-link" href="philosophie-plan-pas-a-pas.html?sujet=${s.id}${level===2?'&niveau=2':''}">Construire le plan de ce sujet →</a></li>`:'',ANNALE[s.id]?`<li>Tombé au bac 2026 : <a class="official-link" href="philosophie-bac-2026-${ANNALE[s.id]}.html">l’écrire en entier, avec le corrigé et une copie à 20 →</a></li>`:''].join('');
  return `<div class="chaine-fin pb-fin"><div class="kicker">VOTRE PROBLÉMATIQUE</div><h2>Voici le problème du sujet.</h2>
  <p class="chaine-pb">${T(got[NB_ET()-1])}</p>
  <p class="micro">Il naît de ce que perdent les deux réponses : la carte du problème le montre${wide()?', à droite':', plus bas'}. Reconnaître cette relation n’est pas encore savoir la construire seul.</p>
  ${bilan}
  <div class="chaine-nav">
   ${nextSubj?`<button type="button" class="btn ${primaire?'red ':''}small chaine-nextsubj">${level===1&&!ready?'Consolider sur un autre sujet →':'Essayer un autre sujet →'}</button>`:''}
   <button type="button" class="btn ${primaire?'':'red '}small chaine-nextlevel">${level===1?'Niveau 2 : formuler avec moins d’aide →':'Niveau suivant →'}</button>
   <button type="button" class="home-text-link chaine-again">Revoir ce même sujet</button>
   ${level>1?`<button type="button" class="home-text-link chaine-prevlevel">← Niveau précédent</button>`:''}
  </div>${level===1?'<p class="micro">Au niveau 2, certaines propositions disparaissent : vous écrivez vous-même des difficultés et la question qui les relie. L’IA n’est pas nécessaire.</p>':''}
  ${suite?`<div class="pb-suite"><div class="kicker">ET ENSUITE</div><ul>${suite}</ul></div>`:''}</div>`;
}
function level3(){
  const n=D.niveau3;
  const subjects=Array.isArray(n)?n:[n];
  const choice=subjects.map((x,k)=>`<li><a href="${x.href}">${T(x.sujet)} →</a></li>`).join('');
  return `<div class="chaine-step"><div class="kicker">NIVEAU 3 · J’ÉCRIS TOUT</div><h2>Un sujet entier, sans propositions.</h2>
  <p>Vous faites seul tout le chemin : la réponse, ce que chaque réponse perd, la problématique. Le corrigé et la copie à 20 vous attendent à la fin.</p>
  <p>Choisissez un sujet que vous n’avez pas encore traité :</p><ul>${choice}</ul>
  <div class="chaine-nav"><button type="button" class="home-text-link chaine-prevlevel">← Niveau précédent</button></div></div>`;
}
function render(){
  if(level===3){ root.innerHTML=tabs()+level3(); bind(); return; }
  let html=barre()+repere();
  const main= step<NB_ET() ? stepView()+`<div class="chaine-nav pb-pied"><button type="button" class="home-text-link chaine-restart">↻ Recommencer ce sujet</button><a class="home-text-link" href="philosophie-problematisation.html">Revoir la méthode →</a></div>` : endView();
  html+=`<div class="pb-grille"><div class="pb-main">${main}</div>${carte()}</div>`;
  root.innerHTML=html; bind();
}
function go(){ step=0; got=[]; hadNo=false; hadDef=false; attempts=0; render(); root.scrollIntoView({behavior:'smooth',block:'start'}); }
function bind(){
  root.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);si=0;open=level!==3;go();});
  root.querySelectorAll('[data-subj]').forEach(b=>b.onclick=()=>{si=Number(b.dataset.subj);open=false;go();});
  const ch=root.querySelector('.pb-changer'); if(ch) ch.onclick=()=>{open=!open;render();};
  const fb=root.querySelector('.chaine-fb');
  root.querySelectorAll('.chaine-opt').forEach(b=>b.onclick=()=>{
    const e=subj().etapes[step], o=e.o[Number(b.dataset.k)], st=o[1];
    if(st==='no') hadNo=true; else if(st==='def') hadDef=true;
    attempts++;
    root.querySelectorAll('.chaine-opt').forEach(x=>x.classList.remove('picked'));
    b.classList.add('picked',st);
    if(st==='no'){ b.disabled=true; }
    fb.className='chaine-fb show '+st;
    fb.innerHTML=`<strong>${LABEL[st]}.</strong> ${T(o[2])}`+(st!=='no'?` <button type="button" class="btn red small chaine-next">Continuer →</button>`:'');
    const n=fb.querySelector('.chaine-next');
    if(n){ n.onclick=()=>{got[step]=o[0];step++;render();}; n.focus(); }
  });
  const cmp=root.querySelector('.chaine-compare');
  if(cmp) cmp.onclick=()=>{
    const e=subj().etapes[step], ta=root.querySelector('#chaine-w'), v=ta.value.trim();
    if(v.length<5){ fb.className='chaine-fb show no'; fb.innerHTML='Écrivez d’abord votre phrase : on compare après.'; return; }
    fb.className='chaine-fb show def';
    fb.innerHTML=`<strong>Une réponse possible :</strong> ${T(e.m)}<br><span class="micro">Votre phrase dit-elle la même chose, avec vos mots ?</span>
    <div class="chaine-nav"><button type="button" class="btn red small chaine-yes">Oui, je continue →</button><button type="button" class="home-text-link chaine-retry">Je reprends ma phrase</button></div>`;
    fb.querySelector('.chaine-yes').onclick=()=>{got[step]=v;step++;render();};
    fb.querySelector('.chaine-retry').onclick=()=>{fb.className='chaine-fb';fb.innerHTML='';ta.focus();};
  };
  const q=(c,f)=>{const el=root.querySelector(c); if(el) el.onclick=f;};
  q('.chaine-again',go);
  q('.chaine-nextsubj',()=>{const a=list(),seen=readPractice(),mastered=readMastered();const candidates=a.map((x,k)=>({k,seen:seen[level+':'+x.id]||0,mastered:level===1&&mastered.includes(x.id)?1:0})).filter(x=>x.k!==si);candidates.sort((x,y)=>x.mastered-y.mastered||x.seen-y.seen||x.k-y.k);if(candidates.length){si=candidates[0].k;go();}});
  q('.chaine-nextlevel',()=>{level=Math.min(3,level+1);si=0;open=false;go();});
  q('.chaine-prevlevel',()=>{level=Math.max(1,level-1);si=0;open=false;go();});
  q('.chaine-restart',go);
}
render();
})();
