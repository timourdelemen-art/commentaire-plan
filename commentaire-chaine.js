/* Le commentaire pas à pas : du texte au début du plan, une question à la fois.
   Niveau 1 : tout au clic. Niveau 2 : le même passage, certaines réponses s’écrivent. Niveau 3 : un autre passage, seul. */
(()=>{
const C=window.COMMENTAIRE_CHAINE, root=document.getElementById('comm-app');
if(!C||!root) return;
const W2=['surprise','problematique','effet'];
const mk=lvl=>({id:'pb01-'+lvl,sujet:'La cour des cuisines',notion:'Pot-Bouille, chapitre VI',etapes:C.etapes.map(e=>lvl===2&&W2.includes(e.k)?{p:e.p,k:e.k,w:1,q:'À vous : '+e.q.replace(/ Choisissez.*$/,'')+' Une phrase.',m:e.o.find(o=>o[1]==='ok')[0]}:e)});
const D={niveau1:[mk(1)],niveau2:[mk(2)],niveau3:{sujet:'Pot-Bouille, chapitre XVI : le retour de Berthe',href:'pot-bouille-pb02.html'}};
const NB=' ';
const typo=s=>String(s).replace(/ ([;:?!»])/g,NB+'$1').replace(/« /g,'«'+NB);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const T=s=>typo(esc(s));
const KEY='commentaire-chaine-fait';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}};
const save=a=>{try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const LABEL={ok:'Solide',def:'Défendable',no:'À revoir'};
const PLACE={situation:'Ce qui se passe',attente:'Ce qu’on attend',surprise:'La surprise',problematique:'La problématique',reponse:'La réponse',mots:'Les mots',procede:'Le procédé',effet:'L’effet ici',partie2:'La partie II'};

let level=1, si=0, step=0, got=[];
const params=new URLSearchParams(location.search);
if(params.get('niveau')) level=Math.min(3,Math.max(1,Number(params.get('niveau'))||1));
const list=()=>level===2?D.niveau2:D.niveau1;
const subj=()=>list()[si];

function tabs(){
  return `<nav class="chaine-tabs" aria-label="Niveaux">${[[1,'Niveau 1','Au clic'],[2,'Niveau 2','J’écris un peu'],[3,'Niveau 3','J’écris tout']].map(([n,a,b])=>`<button type="button" data-level="${n}" class="${n===level?'on':''}" ${n===level?'aria-current="step"':''}><b>${a}</b><span>${typo(b)}</span></button>`).join('')}</nav>`;
}
function chooser(){
  return '';
  const done=read();
  return `<div class="chaine-sujets"><span>Sujet</span>${D.niveau1.map((s,i)=>`<button type="button" data-subj="${i}" class="${i===si?'on':''}">${done.includes(s.id)?'✓ ':''}${T(s.sujet)}</button>`).join('')}<button type="button" class="comm-hasard">Un sujet au hasard</button></div>`;
}
function carte(){
  const s=subj();
  const slot=i=>{const e=s.etapes[i];const st=i<step?'done':i===step?'now':'';return `<li class="${st}"><span>${typo(PLACE[e.k])}</span></li>`;};
  const idx=p=>s.etapes.map((e,i)=>e.p===p?i:-1).filter(i=>i>=0);
  return `<ol class="chaine-carte comm-carte" aria-label="La chaîne">${['Lire','Problématique','Partie I','Partie II'].map(p=>`<li class="grp"><b>${p}</b><ol>${idx(p).map(slot).join('')}</ol></li>`).join('')}</ol>`;
}
function brouillon(){
  const s=subj(); if(!got.length) return '';
  const line=i=>got[i]?`<p><em>${typo(PLACE[s.etapes[i].k])} :</em> ${T(got[i])}</p>`:'';
  const part=(p,title)=>{const ids=s.etapes.map((e,i)=>e.p===p?i:-1).filter(i=>i>=0); return ids.some(i=>got[i])?`<div><strong>${title}</strong>${ids.map(line).join('')}</div>`:'';};
  return `<div class="chaine-brouillon"><div class="kicker">VOTRE BROUILLON SE CONSTRUIT</div>${part('Lire','La lecture')}${part('Problématique','La problématique')}${part('Partie I','Partie I')}${part('Partie II','Partie II')}</div>`;
}
function stepView(){
  const s=subj(), e=s.etapes[step];
  let body;
  if(e.w){
    body=`<label class="chaine-q" for="comm-w">${T(e.q)}</label><textarea id="comm-w" rows="3" data-feedback-kind="${({problematique:'problematique',effet:'analyse',surprise:'lecture'})[e.k]||'lecture'}" data-feedback-instruction="${esc('Commentaire de Pot-Bouille (Zola), chapitre VI, la cour des cuisines. '+e.q)}"></textarea>
    <p><button type="button" class="btn red small comm-compare">Comparer avec une réponse possible</button></p><div class="chaine-fb" aria-live="polite"></div>`;
  } else {
    body=`<p class="chaine-q">${T(e.q)}</p><div class="chaine-opts">${shuffle(e.o.map((o,k)=>k)).map(k=>`<button type="button" class="chaine-opt" data-k="${k}">${T(e.o[k][0])}</button>`).join('')}</div><div class="chaine-fb" aria-live="polite"></div>`;
  }
  return `<div class="chaine-step"><div class="chaine-num">Question ${step+1} sur ${s.etapes.length} · ${e.p}</div><p class="chaine-enonce"><button type="button" class="btn small comm-texte">Relire le texte</button></p>${body}</div>`;
}
function endView(){
  const s=subj();
  const done=read(); if(!done.includes(s.id)){done.push(s.id);save(done);}
  const nextSubj = level===1 && si<D.niveau1.length-1;
  return `<div class="chaine-fin"><div class="kicker">C’EST FAIT</div><h2>Vous avez la problématique et le début du plan.</h2>
  <p class="micro">De la lecture à la problématique, puis une partie prouvée par les mots du texte : c’est tout le chemin du commentaire. La partie II naît de ce que la partie I n’expliquait pas.</p>
  <p class="chaine-annale">Pour continuer sur ce passage : <a class="official-link" href="pot-bouille-pb01.html">l’extrait complet et ses exercices →</a></p>
  <div class="chaine-nav">
   <button type="button" class="btn small comm-again">Recommencer ce sujet</button>
   ${nextSubj?`<button type="button" class="btn small comm-nextsubj">Sujet suivant</button>`:''}
   ${level>1?`<button type="button" class="home-text-link comm-prevlevel">← Niveau précédent</button>`:''}
   <button type="button" class="btn red small comm-nextlevel">Niveau suivant →</button>
  </div></div>`;
}
function level3(){
  const n=D.niveau3;
  return `<div class="chaine-step"><div class="kicker">NIVEAU 3 · J’ÉCRIS TOUT</div><h2>Un autre passage, sans propositions.</h2>
  <p>Un autre passage du roman : cette fois, vous faites seul le chemin, de la lecture au plan.</p>
  <p class="chaine-pb">${typo('« '+esc(n.sujet)+' »')}</p>
  <p><a class="btn red small" href="${n.href}">Travailler ce passage →</a></p>
  <div class="chaine-nav"><button type="button" class="home-text-link comm-prevlevel">← Niveau précédent</button></div></div>`;
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
  const h=root.querySelector('.comm-hasard'); if(h) h.onclick=()=>{ let n=si; while(D.niveau1.length>1&&n===si) n=Math.floor(Math.random()*D.niveau1.length); si=n; go(); };
  const fb=root.querySelector('.chaine-fb');
  root.querySelectorAll('.chaine-opt').forEach(b=>b.onclick=()=>{
    const e=subj().etapes[step], o=e.o[Number(b.dataset.k)], st=o[1];
    root.querySelectorAll('.chaine-opt').forEach(x=>x.classList.remove('picked'));
    b.classList.add('picked',st);
    if(st==='no') b.disabled=true;
    fb.className='chaine-fb show '+st;
    fb.innerHTML=`<strong>${LABEL[st]}.</strong> ${T(o[2])}`+(st!=='no'?` <button type="button" class="btn red small comm-next">Continuer →</button>`:'');
    const n=fb.querySelector('.comm-next');
    if(n){ n.onclick=()=>{got[step]=o[0];step++;render();}; n.focus(); }
  });
  const cmp=root.querySelector('.comm-compare');
  if(cmp) cmp.onclick=()=>{
    const e=subj().etapes[step], ta=root.querySelector('#comm-w'), v=ta.value.trim();
    if(v.length<5){ fb.className='chaine-fb show no'; fb.innerHTML='Écrivez d’abord votre phrase : on compare après.'; return; }
    fb.className='chaine-fb show def';
    fb.innerHTML=`<strong>Une réponse possible :</strong> ${T(e.m)}<br><span class="micro">Votre phrase fait-elle le même travail, avec vos mots ?</span>
    <div class="chaine-nav"><button type="button" class="btn red small comm-yes">Oui, je continue →</button><button type="button" class="home-text-link comm-retry">Je reprends ma phrase</button></div>`;
    fb.querySelector('.comm-yes').onclick=()=>{got[step]=v;step++;render();};
    fb.querySelector('.comm-retry').onclick=()=>{fb.className='chaine-fb';fb.innerHTML='';ta.focus();};
  };
  const tb=root.querySelector('.comm-texte'); if(tb) tb.onclick=()=>{const d=document.getElementById('textDialog'); if(d&&d.showModal) d.showModal();};
  const q=(c,f)=>{const el=root.querySelector(c); if(el) el.onclick=f;};
  q('.comm-again',go);
  q('.comm-nextsubj',()=>{si++;go();});
  q('.comm-nextlevel',()=>{level=Math.min(3,level+1);si=0;go();});
  q('.comm-prevlevel',()=>{level=Math.max(1,level-1);si=0;go();});
}
render();
})();
