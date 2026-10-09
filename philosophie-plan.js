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
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}};
const save=a=>{try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const LABEL={ok:'Solide',def:'Défendable',no:'À revoir'};
const PLACE={reponse:'La réponse',exemple:'L’exemple',limite:'La limite',transition:'La transition',issue:'L’issue',reste:'Ce qui reste'};

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
  if(level!==1) return '';
  const done=read();
  return `<div class="chaine-sujets"><span>Sujet</span>${D.niveau1.map((s,i)=>`<button type="button" data-subj="${i}" class="${i===si?'on':''}">${done.includes(s.id)?'✓ ':''}${T(s.sujet)}</button>`).join('')}<button type="button" class="plan-hasard">Un sujet au hasard</button></div>`;
}
function carte(){
  const s=subj();
  const slot=i=>{const e=s.etapes[i];const st=i<step?'done':i===step?'now':'';return `<li class="${st}"><span>${typo(PLACE[e.k])}</span></li>`;};
  const idx=p=>s.etapes.map((e,i)=>e.p===p?i:-1).filter(i=>i>=0);
  return `<ol class="chaine-carte plan-carte" aria-label="Le plan">${['I','II','III'].map(p=>`<li class="grp"><b>Partie ${p}</b><ol>${idx(p).map(slot).join('')}</ol></li>`).join('')}</ol>`;
}
function brouillon(){
  const s=subj(); if(!got.length) return '';
  const line=i=>got[i]?`<p><em>${typo(PLACE[s.etapes[i].k])} :</em> ${T(got[i])}</p>`:'';
  const part=(p,title)=>{const ids=s.etapes.map((e,i)=>e.p===p?i:-1).filter(i=>i>=0); return ids.some(i=>got[i])?`<div><strong>${title}</strong>${ids.map(line).join('')}</div>`:'';};
  return `<div class="chaine-brouillon"><div class="kicker">VOTRE PLAN DÉTAILLÉ SE CONSTRUIT</div><div><strong>Problématique</strong><p>${T(s.pb)}</p></div>${part('I','Partie I')}${part('II','Partie II')}${part('III','Partie III et conclusion')}</div>`;
}
function stepView(){
  const s=subj(), e=s.etapes[step];
  let body;
  if(e.w){
    body=`<label class="chaine-q" for="plan-w">${T(e.q)}</label><textarea id="plan-w" rows="3" data-feedback-kind="${({limite:'philo-cout',transition:'philo-transition',issue:'philo-troisieme'})[e.k]||'philo-plan'}" data-feedback-instruction="${esc('Sujet : '+s.sujet+'. Problématique : '+s.pb+'. '+e.q)}"></textarea>
    <p><button type="button" class="btn red small plan-compare">Comparer avec une réponse possible</button></p><div class="chaine-fb" aria-live="polite"></div>`;
  } else {
    body=`<p class="chaine-q">${T(e.q)}</p><div class="chaine-opts">${shuffle(e.o.map((o,k)=>k)).map(k=>`<button type="button" class="chaine-opt" data-k="${k}">${T(e.o[k][0])}</button>`).join('')}</div><div class="chaine-fb" aria-live="polite"></div>`;
  }
  return `<div class="chaine-step"><div class="chaine-num">Question ${step+1} sur ${s.etapes.length} · Partie ${e.p}</div><p class="chaine-enonce"><b>La problématique :</b> ${T(s.pb)}</p>${body}</div>`;
}
function endView(){
  const s=subj();
  const done=read(); if(!done.includes(s.id)){done.push(s.id);save(done);}
  const nextSubj = level===1 && si<D.niveau1.length-1;
  return `<div class="chaine-fin"><div class="kicker">C’EST FAIT</div><h2>Vous avez le plan détaillé.</h2>
  <p class="micro">Chaque partie naît de la limite de la précédente ; la troisième garde le plus possible des deux premières, et la conclusion dit ce qui reste ouvert.</p>
  ${s.annale?`<p class="chaine-annale">Ce sujet est tombé au bac 2026. <a class="official-link" href="philosophie-bac-2026-${s.annale}.html">Le travailler en entier, avec le corrigé et une copie à 20 →</a></p>`:''}
  <div class="chaine-nav">
   <button type="button" class="btn small plan-again">Recommencer ce sujet</button>
   ${nextSubj?`<button type="button" class="btn small plan-nextsubj">Sujet suivant</button>`:''}
   ${level>1?`<button type="button" class="home-text-link plan-prevlevel">← Niveau précédent</button>`:''}
   <button type="button" class="btn red small plan-nextlevel">Niveau suivant →</button>
  </div></div>`;
}
function level3(){
  const n=D.niveau3;
  return `<div class="chaine-step"><div class="kicker">NIVEAU 3 · J’ÉCRIS TOUT</div><h2>Un sujet entier, sans propositions.</h2>
  <p>Vous faites seul tout le chemin : la problématique, puis les trois parties, les transitions et la conclusion. Le corrigé et la copie à 20 vous attendent à la fin.</p>
  <p class="chaine-pb">${typo('« '+esc(n.sujet)+' »')}</p>
  <p><a class="btn red small" href="${n.href}">Faire ce sujet →</a></p>
  <div class="chaine-nav"><button type="button" class="home-text-link plan-prevlevel">← Niveau précédent</button></div></div>`;
}
function render(){
  let html=tabs();
  if(level===3){ root.innerHTML=html+level3(); bind(); return; }
  const s=subj();
  html+=chooser()+`<p class="chaine-sujet">${typo('« '+esc(s.sujet)+' »')} <span>${T(s.notion)}</span></p>`+carte();
  html+= step<s.etapes.length ? stepView() : endView();
  html+=brouillon();
  root.innerHTML=html; bind();
}
function go(){ step=0; got=[]; render(); root.scrollIntoView({behavior:'smooth',block:'start'}); }
function bind(){
  root.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);si=0;go();});
  root.querySelectorAll('[data-subj]').forEach(b=>b.onclick=()=>{si=Number(b.dataset.subj);go();});
  const h=root.querySelector('.plan-hasard'); if(h) h.onclick=()=>{ let n=si; while(D.niveau1.length>1&&n===si) n=Math.floor(Math.random()*D.niveau1.length); si=n; go(); };
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
  q('.plan-nextsubj',()=>{si++;go();});
  q('.plan-nextlevel',()=>{level=Math.min(3,level+1);si=0;go();});
  q('.plan-prevlevel',()=>{level=Math.max(1,level-1);si=0;go();});
}
render();
})();
