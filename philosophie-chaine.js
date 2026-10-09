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
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}};
const save=a=>{try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const ANNALE={'inconscient-heureux':'faut-il-etre-inconscient-pour-etre-heureux','certain-bien-agi':'peut-on-etre-certain-d-avoir-bien-agi','science-utile':'la-science-doit-elle-etre-utile','artiste-sait':'l-artiste-sait-il-ce-qu-il-fait','prisonniers-langage':'sommes-nous-prisonniers-du-langage'};
const PLAN_IDS=['justice-lois','inconscient-heureux','certain-bien-agi','science-utile','artiste-sait','prisonniers-langage'];
const LABEL={ok:'Solide',def:'Défendable',no:'À revoir'};
const PLACE={raison:'Pourquoi',scene:'La scène',perte:'Ce qu’il perd',pb:'La problématique'};

let level=1, si=0, step=0, got=[], firstTrySolid=true, attempts=0;
const params=new URLSearchParams(location.search);
if(params.get('niveau')) level=Math.min(3,Math.max(1,Number(params.get('niveau'))||1));
const wanted=params.get('sujet');
if(wanted){ const i1=D.niveau1.findIndex(x=>x.id===wanted), i2=D.niveau2.findIndex(x=>x.id===wanted); if(level===2&&i2>=0) si=i2; else if(i1>=0){ level=1; si=i1; } else if(i2>=0){ level=2; si=i2; } }
const list=()=>level===2?D.niveau2:D.niveau1;
const subj=()=>list()[si];

function tabs(){
  return `<nav class="chaine-tabs" aria-label="Niveaux">${[[1,'Niveau 1','Au clic'],[2,'Niveau 2','J’écris un peu'],[3,'Niveau 3','J’écris tout']].map(([n,a,b])=>`<button type="button" data-level="${n}" class="${n===level?'on':''}" ${n===level?'aria-current="step"':''}><b>${a}</b><span>${typo(b)}</span></button>`).join('')}</nav>`;
}
function chooser(){
  if(level===3) return '';
  const done=read(), mastered=readMastered();
  if(level===2) {const seen=readPractice();return `<div class="chaine-sujets"><span>Choisissez parmi les ${D.niveau2.length} sujets pour écrire avec moins d’aide</span>${D.niveau2.map((s,i)=>`<button type="button" data-subj="${i}" class="${i===si?'on':''}">${seen['2:'+s.id]?'↻ déjà essayé · ':''}${T(s.sujet)}</button>`).join('')}</div>`;}
  return `<div class="chaine-sujets"><span>Choisissez un sujet différent pour consolider le geste</span>${D.niveau1.map((s,i)=>`<button type="button" data-subj="${i}" class="${i===si?'on':''}">${mastered.includes(s.id)?'✓ réussi sans erreur · ':done.includes(s.id)?'↻ déjà essayé · ':''}${T(s.sujet)}</button>`).join('')}</div>`;
}
function carte(){
  const s=subj(); const slot=(i)=>{const e=s.etapes[i];const st=i<step?'done':i===step?'now':'';return `<li class="${st}"><span>${typo(PLACE[e.p])}</span></li>`;};
  return `<ol class="chaine-carte" aria-label="La chaîne">
  <li class="grp"><b>Oui</b><ol>${[0,1,2].map(slot).join('')}</ol></li>
  <li class="grp"><b>Non</b><ol>${[3,4,5].map(slot).join('')}</ol></li>
  <li class="grp pb ${step>6?'done':step===6?'now':''}"><b>Problématique</b></li></ol>`;
}
function brouillon(){
  const s=subj(); const line=(i)=>got[i]?`<p><em>${typo(PLACE[s.etapes[i].p])} :</em> ${T(got[i])}</p>`:'';
  if(!got.length) return '';
  return `<div class="chaine-brouillon"><div class="kicker">VOTRE BROUILLON SE CONSTRUIT</div>
  ${got.slice(0,3).some(Boolean)?`<div><strong>${typo(s.oui).replace(/<\/?u>/g,'')}</strong>${[0,1,2].map(line).join('')}</div>`:''}
  ${got.slice(3,6).some(Boolean)?`<div><strong>${typo(s.non).replace(/<\/?u>/g,'')}</strong>${[3,4,5].map(line).join('')}</div>`:''}
  ${got[6]?`<div><strong>La problématique</strong><p>${T(got[6])}</p></div>`:''}</div>`;
}
function stepView(){
  const s=subj(), e=s.etapes[step];
  const enonce = e.b==='oui'?typo(s.oui):e.b==='non'?typo(s.non):
    `Le oui perd : <strong>${T(got[2]||'')}</strong><br>Le non perd : <strong>${T(got[5]||'')}</strong>`;
  let body;
  if(e.w){
    body=`<label class="chaine-q" for="chaine-w">${T(e.q)}</label><textarea id="chaine-w" rows="3"></textarea>
    <p><button type="button" class="btn red small chaine-compare">Comparer avec une réponse possible</button></p><div class="chaine-fb" aria-live="polite"></div>`;
  } else {
    body=`<p class="chaine-q">${T(e.q)}</p><div class="chaine-opts">${shuffle(e.o.map((o,k)=>k)).map(k=>`<button type="button" class="chaine-opt" data-k="${k}">${T(e.o[k][0])}</button>`).join('')}</div><div class="chaine-fb" aria-live="polite"></div>`;
  }
  return `<div class="chaine-step"><div class="chaine-num">Question ${step+1} sur 7</div><p class="chaine-enonce">${enonce}</p>${body}</div>`;
}
function endView(){
  const s=subj();
  const done=read(); if(!done.includes(s.id)){done.push(s.id);save(done);}
  if(!got._marked){markPractice(level+':'+s.id);got._marked=true;}
  if(level===1&&firstTrySolid){const mastered=readMastered();if(!mastered.includes(s.id)){mastered.push(s.id);saveMastered(mastered);}}
  const mastered=readMastered().filter(id=>D.niveau1.some(s=>s.id===id));
  const ready=mastered.length>=3;
  const remaining=D.niveau1.findIndex((x,j)=>j!==si&&!mastered.includes(x.id));
  const nextSubj=level===1?D.niveau1.length>1:D.niveau2.length>1;
  const result=level===1?`<div class="prescription"><strong>${mastered.length} sujet${mastered.length>1?'s':''} réussi${mastered.length>1?'s':''} sans erreur sur 3 conseillés.</strong> ${ready?'Vous avez reconnu et relié les deux difficultés sur plusieurs sujets. Vous pouvez maintenant essayer de les formuler avec moins d’aide.':'Avant de réduire les aides, entraînez-vous sur des sujets différents. Vous pouvez néanmoins explorer le niveau 2 à tout moment.'}${!firstTrySolid?' Sur ce sujet, vous avez eu besoin d’au moins une correction : recommencez pour vérifier votre compréhension.':''}</div>`:'';
  return `<div class="chaine-fin"><div class="kicker">SUJET PARCOURU</div><h2>Vous avez suivi les sept gestes.</h2>
  <p class="chaine-pb">${T(got[6])}</p>
  <p class="micro">Vous avez examiné ce que perd chacune des deux réponses, puis la question qui relie leurs difficultés. Reconnaître cette relation n’est pas encore savoir la construire seul.</p>
  ${result}
  ${level===2?'<p class="prescription"><strong>Ce que vous gagnez :</strong> vous avez formulé vous-même deux difficultés et leur relation, puis comparé vos phrases avec des exemples. Recommencez sur un autre sujet avant d’essayer seul, sans questions intermédiaires.</p>':''}
  ${PLAN_IDS.includes(s.id)?`<p class="chaine-annale"><strong>Étape suivante :</strong> <a class="official-link" href="philosophie-plan-pas-a-pas.html?sujet=${s.id}${level===2?'&niveau=2':''}">Construire le plan de ce sujet →</a></p>`:''}
  ${ANNALE[s.id]?`<p class="chaine-annale">Ce sujet est tombé au bac 2026. <a class="official-link" href="philosophie-bac-2026-${ANNALE[s.id]}.html">L’écrire en entier, avec le corrigé et une copie à 20 →</a></p>`:''}
  <div class="chaine-nav">
   <button type="button" class="btn small chaine-again">Revoir ce même sujet</button>
   ${nextSubj?`<button type="button" class="btn small chaine-nextsubj">Essayer un autre sujet →</button>`:''}
   ${level>1?`<button type="button" class="home-text-link chaine-prevlevel">← Niveau précédent</button>`:''}
   <button type="button" class="btn red small chaine-nextlevel">${level===1?'Niveau 2 : formuler avec moins d’aide →':'Niveau suivant →'}</button>
  </div>${level===1?'<p class="micro">Au niveau 2, certaines propositions disparaissent : vous devrez écrire vous-même des difficultés et la question qui les relie. L’IA n’est pas nécessaire.</p>':''}</div>`;
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
  let html=tabs();
  if(level===3){ root.innerHTML=html+level3(); bind(); return; }
  const s=subj();
  html+=chooser()+`<p class="chaine-sujet">${typo('« '+esc(s.sujet)+' »')} <span>${T(s.notion)}</span></p>`+carte();
  html+= step<7 ? stepView() : endView();
  if(step<7) html+=`<div class="chaine-nav"><button type="button" class="btn small chaine-restart">↻ Recommencer ce sujet</button><a class="home-text-link" href="philosophie-problematisation.html">Revoir la méthode →</a></div>`;
  html+=brouillon();
  root.innerHTML=html; bind();
}
function go(){ step=0; got=[]; firstTrySolid=true; attempts=0; render(); root.scrollIntoView({behavior:'smooth',block:'start'}); }
function bind(){
  root.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);si=0;go();});
  root.querySelectorAll('[data-subj]').forEach(b=>b.onclick=()=>{si=Number(b.dataset.subj);go();});
  const fb=root.querySelector('.chaine-fb');
  root.querySelectorAll('.chaine-opt').forEach(b=>b.onclick=()=>{
    const e=subj().etapes[step], o=e.o[Number(b.dataset.k)], st=o[1];
    if(st!=='ok') firstTrySolid=false;
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
  q('.chaine-nextlevel',()=>{level=Math.min(3,level+1);si=0;go();});
  q('.chaine-prevlevel',()=>{level=Math.max(1,level-1);si=0;go();});
  q('.chaine-restart',go);
}
render();
})();
