/* Le plan pas à pas : de la problématique au plan détaillé, une question à la fois.
   Niveau 1 : tout au clic. Niveau 2 : certaines places s’écrivent. Niveau 3 : un sujet entier (page d’annale).
   Statuts : ok = solide, def = défendable, no = à revoir. En troisième partie, plusieurs propositions peuvent tenir. */
(()=>{
const D=window.PHILO_PLAN, root=document.getElementById('plan-app');
if(!D||!root) return;
const NB=' ';
const typo=s=>String(s).replace(/ ([;:?!»])/g,NB+'$1').replace(/« /g,'«'+NB);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const T=s=>typo(esc(s));
const KEY='philo-plan-fait';
const SEEN_KEY='plan-chaine-tentatives';
const seen=()=>{try{return JSON.parse(localStorage.getItem(SEEN_KEY)||'{}')}catch(e){return {}}};
const record=id=>{const a=seen();a[id]=(a[id]||0)+1;try{localStorage.setItem(SEEN_KEY,JSON.stringify(a))}catch(e){}};
const leastNew=(items,current,level)=>items.map((x,i)=>({i,n:seen()[level+':'+x.id]||0})).filter(x=>x.i!==current).sort((a,b)=>a.n-b.n||a.i-b.i)[0]?.i;
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}};
const save=a=>{try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const LABEL={ok:'Solide',def:'Défendable',no:'À revoir'};
const PLACE={reponse:'La réponse',exemple:'L’exemple',limite:'La limite',transition:'La transition',issue:'L’issue',reste:'Ce qui reste'};
/* Structure de référence (v2) : trois sous-parties par partie, deux transitions ENTRE les parties,
   et la question finale de la conclusion, née du reste de la partie III (voir PHILOSOPHIE-THEORIE-PLAN.md). */
const PLACE2={'I:installer':'I.1 Installer','I:renforcer':'I.2 Renforcer','I:limite':'I.3 La limite','T1:transition':'Transition I → II','II:exigence':'II.1 La nouvelle exigence','II:position':'II.2 La nouvelle réponse','II:limite':'II.3 Sa limite','T2:transition':'Transition II → III','III:probleme':'III.1 Revenir au problème','III:operation':'III.2 L’opération','III:stabiliser':'III.3 Stabiliser la réponse','C:question':'La question finale'};
const GROUPS2=[['I','Partie I'],['T1','Transition'],['II','Partie II'],['T2','Transition'],['III','Partie III'],['C','Conclusion']];
const GROUPS1=[['I','Partie I'],['II','Partie II'],['III','Partie III et conclusion']];
const lab=(s,e)=>s.v===2?(PLACE2[e.p+':'+e.k]||PLACE[e.k]):PLACE[e.k];
const groupsOf=s=>s.v===2?GROUPS2:GROUPS1;
const groupName=(s,p)=>(groupsOf(s).find(g=>g[0]===p)||[p,'Partie '+p])[1];
let open=false;
const wide=()=>window.matchMedia&&window.matchMedia('(min-width: 1000px)').matches;

let level=1, si=0, step=0, got=[];
const params=new URLSearchParams(location.search);
if(params.get('niveau')) level=Math.min(3,Math.max(1,Number(params.get('niveau'))||1));
const wanted=params.get('sujet');
if(wanted){ const i1=D.niveau1.findIndex(x=>x.id===wanted), i2=D.niveau2.findIndex(x=>x.id===wanted); if(i1>=0&&level!==2){level=1;si=i1;} else if(i2>=0){level=2;si=i2;} }
const list=()=>level===2?D.niveau2:D.niveau1;
const subj=()=>list()[si];

function tabs(){
  return `<nav class="chaine-tabs" aria-label="Niveaux">${[[1,'Niveau 1','Au clic'],[2,'Niveau 2','J’écris un peu'],[3,'Niveau 3','J’écris tout']].map(([n,a,b])=>`<button type="button" data-level="${n}" class="${n===level?'on':''}" ${n===level?'aria-current="step"':''}><b>${a}</b><span>${typo(b)}</span></button>`).join('')}</nav>`;
}
function chooser(){
  if(level===3) return '';
  const done=read();
  if(level===2) return `<div class="chaine-sujets"><span>Un autre sujet pour écrire sans propositions</span>${D.niveau2.map((s,i)=>`<button type="button" data-subj="${i}" class="${i===si?'on':''}">${seen()['2:'+s.id]?'↻ ':''}${T(s.sujet)}</button>`).join('')}</div>`;
  return `<div class="chaine-sujets"><span>Sujet</span>${D.niveau1.map((s,i)=>`<button type="button" data-subj="${i}" class="${i===si?'on':''}">${done.includes(s.id)?'✓ ':''}${T(s.sujet)}</button>`).join('')}<button type="button" class="plan-hasard">Un sujet au hasard</button></div>`;
}
function barre(){
  const s=subj(), niv=[,'Niveau 1 · Au clic','Niveau 2 · J’écris un peu','Niveau 3 · J’écris tout'][level];
  const head=`<div class="plan-barre"><span class="plan-niv">${typo(niv)}</span>${level<3?`<span class="plan-suj">${typo('« '+esc(s.sujet)+' »')} <i>${T(s.notion)}</i></span>`:''}<button type="button" class="plan-changer" aria-expanded="${open}">${open?'Fermer':'Changer de niveau ou de sujet'}</button></div>`;
  return head+(open?`<div class="plan-choix">${tabs()}${chooser()}</div>`:'');
}
function repere(){
  const s=subj(), n=s.etapes.length;
  const e=s.etapes[Math.min(step,n-1)];
  const where=step<n?`<b>${typo(groupName(s,e.p))} · ${typo(lab(s,e))}</b><span>Étape ${step+1} sur ${n}</span>`:`<b>Plan terminé</b><span>${n} étapes sur ${n}</span>`;
  const segs=s.etapes.map((x,i)=>`<i class="${i<step?'done':i===step?'now':''}${i>0&&s.etapes[i-1].p!==x.p?' sep':''}"></i>`).join('');
  return `<div class="plan-repere">${where}</div><div class="plan-jauge" aria-hidden="true">${segs}</div>`;
}
function brouillon(){
  const s=subj(), n=s.etapes.length, nb=got.filter(Boolean).length;
  const line=i=>{const e=s.etapes[i], t=got[i];return `<p class="${t?'':'vide'}${i===step?' now':''}"><em>${typo(lab(s,e))}</em>${t?T(t):'…'}</p>`;};
  const part=([p,title])=>{const ids=s.etapes.map((e,i)=>e.p===p?i:-1).filter(i=>i>=0); if(!ids.length) return ''; const tr=/^T\d/.test(p); return `<div class="plan-bloc${tr?' plan-trans':''}">${tr?'':`<strong>${typo(title)}</strong>`}${ids.map(line).join('')}</div>`;};
  return `<details class="plan-cote"${wide()||step>=n?' open':''}><summary>Votre plan se construit <span>${nb} sur ${n}</span></summary><div class="plan-bloc"><strong>Problématique</strong><p>${T(s.pb)}</p></div>${groupsOf(s).map(part).join('')}</details>`;
}
function stepView(){
  const s=subj(), e=s.etapes[step];
  let body;
  if(e.w){
    body=`<label class="chaine-q" for="plan-w">${T(e.q)}</label><textarea id="plan-w" rows="3" data-feedback-kind="${({limite:'philo-cout',transition:'philo-transition',issue:'philo-troisieme',operation:'philo-troisieme'})[e.k]||'philo-plan'}" data-feedback-instruction="${esc('Sujet : '+s.sujet+'. Problématique : '+s.pb+'. '+e.q)}"></textarea>
    <p><button type="button" class="btn red small plan-compare">Comparer avec une réponse possible</button></p><div class="chaine-fb" aria-live="polite"></div>`;
  } else {
    body=`<p class="chaine-q">${T(e.q)}</p><div class="chaine-opts">${shuffle(e.o.map((o,k)=>k)).map(k=>`<button type="button" class="chaine-opt" data-k="${k}">${T(e.o[k][0])}</button>`).join('')}</div><div class="chaine-fb" aria-live="polite"></div>`;
  }
  return `<div class="chaine-step plan-step"><details class="plan-pb"${step===0?' open':''}><summary>La problématique</summary><p>${T(s.pb)}</p></details>${body}</div>`;
}
function endView(){
  const s=subj();
  const done=read(); if(!done.includes(s.id)){done.push(s.id);save(done);}
  if(!got._recorded){record(level+':'+s.id);got._recorded=true;}
  const nextSubj=list().length>1;
  return `<div class="chaine-fin"><div class="kicker">C’EST FAIT</div><h2>Vous avez le plan détaillé.</h2>
  <p class="micro">Chaque partie répond à la question née de la limite de la précédente ; la troisième garde ce que les deux premières avaient compris, et la conclusion transforme ce qui reste en question.</p>
  ${s.annale?`<p class="chaine-annale">Ce sujet est tombé au bac 2026. <a class="official-link" href="philosophie-bac-2026-${s.annale}.html">Le travailler en entier, avec le corrigé et une copie à 20 →</a></p>`:''}
  <div class="chaine-nav">
   <button type="button" class="btn small plan-again">Revoir ce même sujet</button>
   ${nextSubj?`<button type="button" class="btn small plan-nextsubj">Essayer un autre sujet →</button>`:''}
   ${level>1?`<button type="button" class="home-text-link plan-prevlevel">← Niveau précédent</button>`:''}
   <button type="button" class="btn red small plan-nextlevel">Niveau suivant →</button>
  </div></div>`;
}
function level3(){
  const n=D.niveau3;
  const choices=Array.isArray(n)?n:[n];
  return `<div class="chaine-step"><div class="kicker">NIVEAU 3 · J’ÉCRIS TOUT</div><h2>Un sujet entier, sans propositions.</h2>
  <p>Vous faites seul tout le chemin : la problématique, puis les trois parties, les transitions et la conclusion. Le corrigé et la copie à 20 vous attendent à la fin.</p>
  <p>Choisissez un sujet inédit :</p><ul>${choices.map(x=>`<li><a href="${x.href}">${T(x.sujet)} →</a></li>`).join('')}</ul>
  <div class="chaine-nav"><button type="button" class="home-text-link plan-prevlevel">← Niveau précédent</button></div></div>`;
}
function render(){
  let html=tabs();
  if(level===3){ root.innerHTML=barre()+(open?'':tabs())+level3(); bind(); return; }
  const s=subj();
  html=barre()+repere();
  html+=`<div class="plan-grille"><div class="plan-main">${step<s.etapes.length ? stepView() : endView()}</div>${brouillon()}</div>`;
  root.innerHTML=html; bind();
}
function go(){ step=0; got=[]; render(); root.scrollIntoView({behavior:'smooth',block:'start'}); }
function bind(){
  root.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);si=0;open=level!==3?true:false;go();});
  root.querySelectorAll('[data-subj]').forEach(b=>b.onclick=()=>{si=Number(b.dataset.subj);open=false;go();});
  const h=root.querySelector('.plan-hasard'); if(h) h.onclick=()=>{const j=leastNew(list(),si,level);if(j!==undefined){si=j;open=false;go();}};
  const ch=root.querySelector('.plan-changer'); if(ch) ch.onclick=()=>{open=!open;render();};
  const fb=root.querySelector('.chaine-fb');
  root.querySelectorAll('.chaine-opt').forEach(b=>b.onclick=()=>{
    const e=subj().etapes[step], o=e.o[Number(b.dataset.k)], st=o[1];
    root.querySelectorAll('.chaine-opt').forEach(x=>x.classList.remove('picked'));
    b.classList.add('picked',st);
    if(st==='no') b.disabled=true;
    fb.className='chaine-fb show '+st;
    fb.innerHTML=`<strong>${LABEL[st]}.</strong> ${T(o[2])}`+(st!=='no'?` <button type="button" class="btn red small plan-next">Continuer →</button>`:'');
    const n=fb.querySelector('.plan-next');
    if(n){ n.onclick=()=>{got[step]=o[0];step++;render();}; n.focus(); }
  });
  const cmp=root.querySelector('.plan-compare');
  if(cmp) cmp.onclick=()=>{
    const e=subj().etapes[step], ta=root.querySelector('#plan-w'), v=ta.value.trim();
    if(v.length<5){ fb.className='chaine-fb show no'; fb.innerHTML='Écrivez d’abord votre phrase : on compare après.'; return; }
    fb.className='chaine-fb show def';
    fb.innerHTML=`<strong>Une réponse possible :</strong> ${T(e.m)}<br><span class="micro">Votre phrase fait-elle le même travail, avec vos mots ?</span>
    <div class="chaine-nav"><button type="button" class="btn red small plan-yes">Oui, je continue →</button><button type="button" class="home-text-link plan-retry">Je reprends ma phrase</button></div>`;
    fb.querySelector('.plan-yes').onclick=()=>{got[step]=v;step++;render();};
    fb.querySelector('.plan-retry').onclick=()=>{fb.className='chaine-fb';fb.innerHTML='';ta.focus();};
  };
  const q=(c,f)=>{const el=root.querySelector(c); if(el) el.onclick=f;};
  q('.plan-again',go);
  q('.plan-nextsubj',()=>{const j=leastNew(list(),si,level);if(j!==undefined){si=j;go();}});
  q('.plan-nextlevel',()=>{level=Math.min(3,level+1);si=0;go();});
  q('.plan-prevlevel',()=>{level=Math.max(1,level-1);si=0;go();});
}
render();
})();
