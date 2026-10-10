/* Le commentaire pas à pas : du texte au plan complet, une question à la fois.
   Niveau 1 : tout au clic. Niveau 2 : le même chemin, certaines réponses s’écrivent, puis se comparent à une réponse possible.
   Niveau 3 : le plan entier, écrit seul sur un texte choisi, puis comparé au plan modèle.
   Paramètres d’adresse : ?niveau=1|2|3 et ?texte=pb01|hialmar|joujou|don-diegue.
   Statuts : ok = Solide, def = Défendable, no = À revoir. */
(()=>{
const C=window.COMMENTAIRE_CHAINE, root=document.getElementById('comm-app');
if(!C||!root||!Array.isArray(C.textes)||!C.textes.length) return;
const TX=C.textes;
const NB=' ';
const typo=s=>String(s).replace(/ ([;:?!»])/g,NB+'$1').replace(/« /g,'«'+NB);
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const T=s=>typo(esc(s));

/* Mémoire du navigateur : toujours protégée (navigation privée, stockage bloqué). Les clés de l’ancienne version sont gardées. */
const KEY='commentaire-chaine-fait';            // identifiants « texte-niveau » terminés (ancienne clé : « pb01-1 », « pb01-2 »)
const SEEN_KEY='commentaire-chaine-tentatives'; // nombre de passages par « niveau:texte »
const MASTERED_KEY='commentaire-chaine-solides';
const DEF_KEY='commentaire-chaine-defendables';
const N3_KEY='commentaire-chaine-n3';
const getJSON=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v}catch(e){return d}};
const setJSON=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const arr=k=>{const a=getJSON(k,[]);return Array.isArray(a)?a:[]};
const seen=()=>{const o=getJSON(SEEN_KEY,{});return o&&typeof o==='object'?o:{}};
const record=id=>{const a=seen();a[id]=(a[id]||0)+1;setJSON(SEEN_KEY,a)};
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const wide=()=>window.matchMedia&&window.matchMedia('(min-width: 1000px)').matches;

const LABEL={ok:'Solide',def:'Défendable',no:'À revoir'};
const ROM={I:'I',II:'II',III:'III'};
const GROUP={lire:'Lire le texte',pb:'La problématique',I:'Réponse I',T1:'Transition I → II',II:'Réponse II',T2:'Transition II → III',III:'Réponse III',C:'Conclusion'};
const JAUGE={lire:'Lire',pb:'Pb',I:'I',T1:'?',II:'II',T2:'?',III:'III',C:'Fin'};
const PLACE={installe:'Ce que le texte installe',attendre:'On pouvait attendre',pourtant:'Pourtant',pb:'La problématique',reponse:'La réponse',transition:'La question',conclusion:'Réponse et question ouverte'};

/* Numérote les réalisations à l’intérieur de chaque partie. */
TX.forEach(t=>{const n={};t.etapes.forEach(e=>{if(e.k==='real'){n[e.p]=(n[e.p]||0)+1;e.n=n[e.p];}});});
const placeOf=e=>e.k==='real'?'Réalisation '+e.n:PLACE[e.k];
const okOf=e=>e.o.find(o=>o[1]==='ok')[0];
const prevPart=p=>({T1:'I',T2:'II'})[p];
const nextPart=p=>({T1:'II',T2:'III'})[p];

function question(t,e,write){
  const part=ROM[e.p];
  if(write){
    return ({
      pourtant:'À vous : complétez « Pourtant, le texte… » en une phrase.',
      pb:'À vous : dites le problème en une seule question, sans perdre ce qu’on pouvait attendre ni ce que le texte produit.',
      transition:`À vous : écrivez la question qui montre ce que la réponse ${prevPart(e.p)} n’explique pas encore. Une question ouverte : on ne doit pas pouvoir y répondre par oui ou par non.`,
      real:`À vous : choisissez une réalisation de la partie ${part}. Citez les mots exacts du texte, nommez le procédé s’il aide, dites l’effet ici et ce qu’il prouve. Une ou deux phrases.`,
      conclusion:'À vous : répondez à la problématique en une phrase, puis dites en une question ce qui reste ouvert.'
    })[e.k];
  }
  return ({
    installe:'Que met en place le passage ? Choisissez la phrase la plus juste.',
    attendre:'À partir de là, qu’est-ce qu’on pouvait attendre ?',
    pourtant:'Pourtant, que produit le texte à la place ?',
    pb:'Dites le problème en une seule question, sans perdre ce qu’on pouvait attendre ni ce que le texte produit. Quelle question le fait ?',
    reponse:e.p==='I'?'Quelle réponse la partie I donne-t-elle à la problématique ?':`Quelle réponse la partie ${part} donne-t-elle à la question de la transition ?`,
    real:`Réalisation ${e.n} de la partie ${part} : quelle analyse prouve la réponse ?`,
    transition:`Entre la partie ${prevPart(e.p)} et la partie ${nextPart(e.p)} : quelle question montre ce que la réponse ${prevPart(e.p)} n’explique pas encore ?`,
    conclusion:'Quelle conclusion répond à la problématique, puis dit ce qui reste ouvert ?'
  })[e.k];
}
/* Les mots de la méthode, expliqués à leur première apparition dans le parcours. */
function definition(t,e,i){
  const first=k=>t.etapes.findIndex(x=>x.k===k)===i;
  if(e.k==='pb') return 'La phrase « On pouvait attendre… Pourtant… » dit le problème en long ; la problématique le dit en une seule question.';
  if(e.k==='reponse'&&first('reponse')) return 'Une grande partie s’appelle une réponse : elle répond à la problématique, en une phrase.';
  if(e.k==='real'&&first('real')) return 'Une réalisation, c’est ce que le texte fait, prouvé par ses mots : la citation, le procédé s’il aide, l’effet ici, et ce que cela prouve.';
  if(e.k==='transition'&&first('transition')) return 'Entre deux parties, on écrit une question : elle montre ce que la partie précédente n’a pas expliqué. C’est la transition-question ; la partie suivante y répond en reprenant son mot clé.';
  if(e.k==='conclusion') return 'La conclusion répond à la problématique, puis transforme ce qui reste ouvert en question.';
  return '';
}
const HINT={
  pourtant:'Relisez la fin du texte : qu’est-ce qui n’arrive pas comme on pouvait le prévoir ?',
  pb:'Gardez un mot de ce qu’on pouvait attendre et un mot de ce que le texte produit. Forme possible : « Comment [l’auteur] fait-il de … … ? »',
  transition:'Partez de ce que la réponse précédente laisse sans explication. Commencez par « Comment », « Pourquoi » ou « Qu’est-ce qui ».',
  real:'Partez de ce que le texte fait, pas d’une figure de style. Cherchez ensuite les mots qui le montrent.',
  conclusion:'La réponse reprend la problématique. La question part de ce que votre dernière partie ne règle pas.'
};
const CHECK={
  pourtant:['Votre phrase dit ce que le texte produit, pas seulement un fait du texte.','Elle s’oppose vraiment à ce qu’on pouvait attendre.'],
  pb:['On reconnaît le texte dans votre question.','On y retrouve ce qu’on pouvait attendre et ce que le texte produit.','Elle ne donne pas déjà la réponse.'],
  transition:['C’est une question ouverte : on ne peut pas y répondre par oui ou par non.','Elle part de ce que la réponse précédente n’explique pas.','La réponse suivante peut reprendre son mot clé.'],
  real:['Les mots cités sont exactement ceux du texte.','L’effet est dit pour ce passage, pas en général.','On voit ce que cela prouve pour la réponse.'],
  conclusion:['Votre première phrase répond à la problématique.','Votre question naît du texte, pas d’une idée générale.']
};
/* Quelques repérages automatiques, sans IA : ils signalent une forme, jamais le fond. */
function warn(k,v){
  const w=[], q=/\?\s*$/.test(v);
  if((k==='pb'||k==='transition')&&!q) w.push('Votre phrase ne se termine pas par un point d’interrogation : écrivez une question.');
  if(k==='pb'&&/concili/i.test(v)) w.push('« Concilier » donne déjà la réponse : la question doit la laisser à trouver.');
  if(k==='transition'&&/suffi[ts]|faut-il vraiment/i.test(v)) w.push('« … suffit-il ? » appelle oui ou non : ouvrez la question (« Comment… ? », « Qu’est-ce qui… ? »).');
  if(k==='transition'&&/^\s*(nous allons|après|ensuite|dans un second temps)/i.test(v)) w.push('Une annonce n’est pas une question : partez de ce que la réponse précédente n’explique pas.');
  if(k==='conclusion'&&!/\?/.test(v)) w.push('Il manque la question finale : ce qui reste ouvert.');
  if(k==='real'&&!/[«"]/.test(v)) w.push('Citez les mots du texte entre guillemets.');
  return w;
}

/* État */
let level=1, ti=0, step=0, got=[], hadNo=false, hadDef=false, open=false, compared=false;
const params=new URLSearchParams(location.search);
if(params.get('niveau')) level=Math.min(3,Math.max(1,Number(params.get('niveau'))||1));
const wanted=(params.get('texte')||'').toLowerCase();
const ALIAS={'pot-bouille':'pb01','pb-01':'pb01','pb01':'pb01','le-coeur-de-hialmar':'hialmar','le-joujou-du-pauvre':'joujou','le-cid':'don-diegue'};
if(wanted){const id=ALIAS[wanted]||wanted;const i=TX.findIndex(t=>t.id===id);if(i>=0) ti=i;}
const tx=()=>TX[ti];
const isWrite=e=>level===2&&e.w2;

function fillText(){
  const t=tx(), h=t.html;
  const d=document.getElementById('comm-texte-dialog'); if(d) d.innerHTML=h+`<p class="micro">${T(t.ref)}. ${T(t.source)}</p>`;
  const dh=document.getElementById('comm-dialog-titre'); if(dh) dh.textContent=t.court;
}
function tabs(){
  return `<nav class="chaine-tabs" aria-label="Niveaux">${[[1,'Niveau 1','Au clic'],[2,'Niveau 2','J’écris un peu'],[3,'Niveau 3','J’écris tout']].map(([n,a,b])=>`<button type="button" data-level="${n}" class="${n===level?'on':''}" ${n===level?'aria-current="step"':''}><b>${a}</b><span>${typo(b)}</span></button>`).join('')}</nav>`;
}
function chooser(){
  const mastered=arr(MASTERED_KEY), defs=arr(DEF_KEY), done=arr(KEY), sn=seen();
  const n=mastered.filter(id=>TX.some(t=>t.id===id)).length;
  const head=level===1?`Texte · ${n} réussi${n>1?'s':''} sur 3 conseillés`:level===2?'Texte pour écrire avec moins d’aide':'Texte pour écrire tout le plan seul';
  return `<div class="chaine-sujets"><span>${typo(head)}</span>${TX.map((t,i)=>{
    let mark='',small='';
    if(level===1){ if(mastered.includes(t.id)){mark='✓ ';small=defs.includes(t.id)?'réussi, une réponse défendable':'réussi';} else if(done.includes(t.id+'-1')){mark='↻ ';small='déjà essayé';} }
    else if(level===2){ if(sn['2:'+t.id]){mark='↻ ';small='déjà écrit';} }
    else { const d=getJSON(N3_KEY,{}); if(d&&d[t.id]&&Object.values(d[t.id]).some(Boolean)){mark='✎ ';small='brouillon gardé';} }
    return `<button type="button" data-texte="${i}" class="${i===ti?'on':''}">${mark}${T(t.court)}<small class="cc-genre">${T(t.genre)}</small>${small?`<small>${typo(small)}</small>`:''}</button>`;
  }).join('')}</div>`;
}
function barre(){
  const t=tx(), niv=[,'Niveau 1 · Au clic','Niveau 2 · J’écris un peu','Niveau 3 · J’écris tout'][level];
  return `<div class="cc-barre"><span class="cc-niv">${typo(niv)}</span><span class="cc-suj">${T(t.titre)} <i>${T(t.court===t.titre?t.genre:t.court)}</i></span><button type="button" class="cc-changer" aria-expanded="${open}">${open?'Fermer':'Changer de niveau ou de texte'}</button></div>`
   +(open?`<div class="cc-choix">${tabs()}${chooser()}</div>`:'');
}
function repere(){
  const t=tx(), n=t.etapes.length, e=t.etapes[Math.min(step,n-1)];
  const where=step<n?`<b>${typo(GROUP[e.p])}${['reponse','transition','pb','conclusion'].includes(e.k)?'':' · '+typo(placeOf(e))}</b><span>Question ${step+1} sur ${n}</span>`:`<b>Plan terminé</b><span>${n} questions sur ${n}</span>`;
  const groups=[];t.etapes.forEach((x,i)=>{const g=groups[groups.length-1];if(g&&g.p===x.p)g.ids.push(i);else groups.push({p:x.p,ids:[i]});});
  const jauge=groups.map(g=>`<span class="cc-jg${/^T/.test(g.p)?' cc-jt':''}" style="flex-grow:${g.ids.length}"><span class="cc-segs">${g.ids.map(i=>`<i class="${i<step?'done':i===step?'now':''}"></i>`).join('')}</span><small>${typo(JAUGE[g.p])}</small></span>`).join('');
  return `<div class="cc-repere">${where}</div><div class="cc-jauge" aria-hidden="true">${jauge}</div>`;
}
function carte(){
  const t=tx(), n=t.etapes.length, nb=got.filter(Boolean).length;
  const cell=i=>{const e=t.etapes[i], v=got[i];return `<p class="${v?'':'vide'}${i===step?' now':''}"><em>${typo(placeOf(e))}</em>${v?T(v):'…'}</p>`;};
  const ids=p=>t.etapes.map((e,i)=>e.p===p?i:-1).filter(i=>i>=0);
  const bloc=(p,cls)=>{const l=ids(p);if(!l.length) return '';
    if(/^T/.test(p)) return `<div class="cc-trans${got[l[0]]?'':' vide'}${step===l[0]?' now':''}"><em>Transition-question</em>${got[l[0]]?T(got[l[0]]):'Une question, entre les deux parties.'}</div>`;
    if(p==='pb') return `<div class="cc-pbm${got[l[0]]?'':' vide'}${step===l[0]?' now':''}"><em>Problématique</em>${got[l[0]]?T(got[l[0]]):'Elle naîtra du « pourtant ».'}</div>`;
    return `<div class="cc-bloc ${cls||''}"><strong>${typo(GROUP[p])}</strong>${l.map(cell).join('')}</div>`;};
  return `<details class="cc-carte"${wide()||step>=n?' open':''}><summary>Votre commentaire se construit <span>${nb} sur ${n}</span></summary>
  ${['lire','pb','I','T1','II','T2','III','C'].map(p=>bloc(p)).join('')}</details>`;
}
function context(t,e){
  const g=k=>{const i=t.etapes.findIndex(x=>x.k===k);return i>=0?got[i]:'';};
  const partRep=p=>{const i=t.etapes.findIndex(x=>x.p===p&&x.k==='reponse');return i>=0?got[i]:'';};
  const line=(a,b)=>b?`<span class="cc-ctx">${a?`<em>${typo(a)}</em> `:''}${T(b)}</span>`:'';
  switch(e.k){
    case 'installe': return '';
    case 'attendre': return line('Le texte installe :',g('installe'));
    case 'pourtant': return line('',g('attendre'));
    case 'pb': return line('',g('attendre'))+line('',g('pourtant'));
    case 'reponse': if(e.p==='I') return line('Problématique :',g('pb')); {const i=t.etapes.findIndex(x=>x.p===(e.p==='II'?'T1':'T2'));return line('Transition :',got[i]);}
    case 'real': return line('Réponse '+ROM[e.p]+' :',partRep(e.p));
    case 'transition': return line('Réponse '+prevPart(e.p)+' :',partRep(prevPart(e.p)));
    case 'conclusion': return line('Problématique :',g('pb'));
  }
  return '';
}
function stepView(){
  const t=tx(), e=t.etapes[step], w=isWrite(e);
  const ctx=context(t,e), def=definition(t,e,step);
  const texte=step===0?`<details class="cc-texte" open><summary>Le texte · ${T(t.ref)}</summary><div class="texte-examen">${t.html}</div><p class="micro">${T(t.source)}</p></details>`
    :`<p class="cc-relire"><button type="button" class="home-text-link comm-texte">Relire le texte</button></p>`;
  let body;
  if(w){
    body=`<label class="chaine-q" for="comm-w">${T(question(t,e,true))}</label>${def?`<p class="cc-def">${T(def)}</p>`:''}
    <details class="cc-aide"><summary>Un coup de pouce</summary><p>${T(HINT[e.k]||'')}</p></details>
    <textarea id="comm-w" rows="3" data-feedback="off"></textarea>
    <p><button type="button" class="btn red small comm-compare">Comparer avec une réponse possible</button></p><div class="chaine-fb" aria-live="polite"></div>`;
  } else {
    body=`<p class="chaine-q">${T(question(t,e,false))}</p>${def?`<p class="cc-def">${T(def)}</p>`:''}<div class="chaine-opts">${shuffle(e.o.map((o,k)=>k)).map(k=>`<button type="button" class="chaine-opt" data-k="${k}">${T(e.o[k][0])}</button>`).join('')}</div><div class="chaine-fb" aria-live="polite"></div>`;
  }
  return `<div class="chaine-step cc-step">${texte}${ctx?`<p class="chaine-enonce cc-enonce">${ctx}</p>`:''}${body}</div>`;
}
function endView(){
  const t=tx();
  const done=arr(KEY), id=t.id+'-'+level; if(!done.includes(id)){done.push(id);setJSON(KEY,done);}
  if(!got._marked){record(level+':'+t.id);got._marked=true;}
  if(level===1&&!hadNo&&!got._validated){
    got._validated=true;
    const m=arr(MASTERED_KEY), d=arr(DEF_KEY);
    const wasSolid=m.includes(t.id)&&!d.includes(t.id);
    if(!m.includes(t.id)) m.push(t.id);
    const di=d.indexOf(t.id);
    if(hadDef&&di<0&&!wasSolid) d.push(t.id);
    if(!hadDef&&di>=0) d.splice(di,1);
    setJSON(MASTERED_KEY,m); setJSON(DEF_KEY,d);
  }
  const mastered=arr(MASTERED_KEY).filter(x=>TX.some(y=>y.id===x));
  const defs=arr(DEF_KEY).filter(x=>mastered.includes(x));
  const ready=mastered.length>=3;
  const pbi=t.etapes.findIndex(x=>x.k==='pb');
  const verdict=hadNo?'<b class="cc-a-revoir">Texte à reprendre.</b> Une réponse était « À revoir » : recommencez-le, ou essayez un autre texte.':(hadDef?'<b class="cc-valide">✓ Texte réussi.</b> Réponses solides ou défendables : repassez-le pour viser « Solide » partout.':'<b class="cc-valide">✓ Texte réussi.</b> Toutes vos réponses étaient solides.');
  const pastilles=[0,1,2].map(i=>`<i class="${i<mastered.length?'on':''}"></i>`).join('');
  const bilan=level===1?`<div class="cc-bilan"><p>${verdict}</p><p class="cc-score"><span class="cc-pastilles" aria-hidden="true">${pastilles}</span><strong>${Math.min(mastered.length,TX.length)} texte${mastered.length>1?'s':''} réussi${mastered.length>1?'s':''} sur 3 conseillés</strong>${defs.length?` <span>(dont ${defs.length} avec une réponse défendable)</span>`:''}</p><p class="micro">${ready?'Trois textes différents réussis : passez au niveau 2, où vous écrirez vous-même certaines réponses.':'Pour consolider le geste, changez de texte : c’est en le refaisant ailleurs qu’on le possède. Le niveau 2 reste ouvert à tout moment.'}</p></div>`
   :`<div class="cc-bilan"><p><strong>Ce que vous gagnez :</strong> vous avez écrit vous-même le « pourtant », la problématique, une transition-question, une réalisation et la conclusion, puis vous les avez comparés à des réponses possibles. Refaites-le sur un autre texte, puis essayez le plan entier, seul.</p></div>`;
  const primaire=level===1&&!ready;
  return `<div class="chaine-fin cc-fin"><div class="kicker">VOTRE PROBLÉMATIQUE</div><h2>Votre plan est construit.</h2>
  <p class="chaine-pb">${T(got[pbi]||'')}</p>
  <p class="micro">De la lecture au « pourtant », puis la question, les réponses, les transitions et la conclusion : tout le plan est dans la carte${wide()?', à droite':', plus bas'}.</p>
  ${bilan}
  <div class="chaine-nav">
   <button type="button" class="btn ${primaire?'red ':''}small comm-nextsubj">${level===1&&!ready?'Consolider sur un autre texte →':'Essayer un autre texte →'}</button>
   <button type="button" class="btn ${primaire?'':'red '}small comm-nextlevel">${level===1?'Niveau 2 : écrire davantage →':'Niveau 3 : écrire tout le plan →'}</button>
   <button type="button" class="home-text-link comm-again">Revoir ce même texte</button>
   ${level>1?`<button type="button" class="home-text-link comm-prevlevel">← Niveau précédent</button>`:''}
  </div>
  <div class="cc-suite"><div class="kicker">ET ENSUITE</div><ul><li><a class="official-link" href="${esc(t.modele.href)}">${T(t.modele.label)} →</a></li></ul></div></div>`;
}

/* Niveau 3 : le plan entier, écrit seul, puis comparé au plan modèle. */
function fields(t){
  const ok=k=>{const e=t.etapes.find(x=>x.k===k);return e?okOf(e):'';};
  const rep=p=>{const e=t.etapes.find(x=>x.p===p&&x.k==='reponse');return e?okOf(e):'';};
  const reals=p=>t.etapes.filter(x=>x.p===p&&x.k==='real').map(okOf).join('\n');
  const tr=p=>{const e=t.etapes.find(x=>x.p===p);return e?okOf(e):'';};
  const sans='Le plan modèle s’arrête à deux parties : ce texte n’en appelle pas une troisième.';
  const three=t.parties===3;
  return [
   {id:'attendre',lab:'On pouvait attendre…',ph:'On pouvait attendre…',m:ok('attendre'),r:2},
   {id:'pourtant',lab:'Pourtant, le texte…',ph:'Pourtant, le texte…',m:ok('pourtant'),r:2},
   {id:'pb',lab:'Problématique : une seule question',ph:'Comment… ?',m:ok('pb'),r:2,k:'pb'},
   {id:'r1',lab:'Réponse I',ph:'La réponse de la partie I, en une phrase.',m:rep('I'),r:2,g:'I'},
   {id:'re1',lab:'Deux réalisations de la partie I',ph:'Pour chacune : les mots cités, le procédé s’il aide, l’effet ici.',m:reals('I'),r:4,g:'I',k:'real'},
   {id:'t1',lab:'Transition-question I → II',ph:'Une question ouverte.',m:tr('T1'),r:2,cls:'cc-f-trans',k:'transition'},
   {id:'r2',lab:'Réponse II',ph:'Elle reprend le mot clé de la question.',m:rep('II'),r:2,g:'II'},
   {id:'re2',lab:'Deux réalisations de la partie II',ph:'Pour chacune : les mots cités, le procédé s’il aide, l’effet ici.',m:reals('II'),r:4,g:'II',k:'real'},
   {id:'t2',lab:'Transition-question II → III, si le texte appelle une troisième partie',ph:'Une question ouverte, ou rien.',m:three?tr('T2'):sans,r:2,cls:'cc-f-trans',k:'transition',opt:1},
   {id:'r3',lab:'Réponse III, si besoin',ph:'Facultatif.',m:three?rep('III'):sans,r:2,g:'III',opt:1},
   {id:'re3',lab:'Réalisations de la partie III, si besoin',ph:'Facultatif.',m:three?reals('III'):sans,r:4,g:'III',k:'real',opt:1},
   {id:'c',lab:'Conclusion : la réponse, puis la question qui reste ouverte',ph:'…  Reste une question : … ?',m:ok('conclusion'),r:3,k:'conclusion'}
  ];
}
function level3(){
  const t=tx(), F=fields(t), all=getJSON(N3_KEY,{}), d=(all&&all[t.id])||{};
  const form=F.map(f=>`<div class="cc-f ${f.cls||''}${f.opt?' cc-f-opt':''}"><label for="n3-${f.id}">${typo(f.lab)}</label><textarea id="n3-${f.id}" data-f="${f.id}" rows="${f.r}" placeholder="${esc(typo(f.ph))}" data-feedback="off">${esc(d[f.id]||'')}</textarea>${compared?`<div class="cc-modele"><em>Plan modèle</em>${esc(typo(f.m)).replace(/\n/g,'<br>')}</div>${f.k&&d[f.id]?warn(f.k==='real'?'real':f.k,d[f.id]).map(x=>`<p class="cc-warn">${T(x)}</p>`).join(''):''}`:''}</div>`).join('');
  return `<div class="chaine-step cc-step cc-n3"><h2>Le plan entier, sans propositions.</h2>
  <p>Faites seul tout le chemin, du « pourtant » à la conclusion. Écrivez court : une phrase par case. Ensuite seulement, comparez avec le plan modèle. Votre brouillon reste dans ce navigateur.</p>
  <details class="cc-texte"${wide()?' open':''}><summary>Le texte · ${T(t.ref)}</summary><div class="texte-examen">${t.html}</div><p class="micro">${T(t.source)}</p></details>
  <div class="cc-form">${form}</div>
  <div class="chaine-nav">${compared?`<button type="button" class="btn small comm-hide">Masquer le plan modèle</button>`:`<button type="button" class="btn red small comm-reveal">Comparer avec le plan modèle</button>`}<button type="button" class="home-text-link comm-clear">Effacer mon brouillon</button><button type="button" class="home-text-link comm-prevlevel">← Niveau précédent</button></div>
  ${compared?`<div class="cc-bilan"><p><strong>Comparez case par case.</strong> Votre plan peut être différent et juste. Vérifiez trois choses : chaque partie répond à la question qui la précède ; chaque transition est une question ouverte ; chaque réalisation cite les mots exacts du texte.</p><p><a class="official-link" href="${esc(t.modele.href)}">${T(t.modele.label)} →</a></p></div>`:''}</div>`;
}
function render(){
  fillText();
  let html=barre();
  if(level===3){ root.innerHTML=html+level3(); bind(); return; }
  const t=tx(), n=t.etapes.length;
  html+=repere();
  const main= step<n ? stepView()+`<div class="chaine-nav cc-pied"><button type="button" class="home-text-link comm-restart">↻ Recommencer ce texte</button><a class="home-text-link" href="commentaire-bac-methode.html">Revoir la méthode →</a></div>` : endView();
  html+=`<div class="cc-grille"><div class="cc-main">${main}</div>${carte()}</div>`;
  root.innerHTML=html; bind();
}
function go(scroll){ step=0; got=[]; hadNo=false; hadDef=false; compared=false; render(); if(scroll!==false) root.scrollIntoView({behavior:'smooth',block:'start'}); }
function nextText(){
  const sn=seen(), m=arr(MASTERED_KEY);
  const c=TX.map((x,k)=>({k,seen:sn[level+':'+x.id]||0,m:level===1&&m.includes(x.id)?1:0})).filter(x=>x.k!==ti);
  c.sort((a,b)=>a.m-b.m||a.seen-b.seen||a.k-b.k);
  if(c.length){ti=c[0].k;go();}
}
function bind(){
  root.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);open=true;go(false);});
  root.querySelectorAll('[data-texte]').forEach(b=>b.onclick=()=>{ti=Number(b.dataset.texte);open=false;go();});
  const ch=root.querySelector('.cc-changer'); if(ch) ch.onclick=()=>{open=!open;render();};
  const fb=root.querySelector('.chaine-fb');
  root.querySelectorAll('.chaine-opt').forEach(b=>b.onclick=()=>{
    const e=tx().etapes[step], o=e.o[Number(b.dataset.k)], st=o[1];
    if(st==='no') hadNo=true; else if(st==='def') hadDef=true;
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
    const e=tx().etapes[step], ta=root.querySelector('#comm-w'), v=ta.value.trim();
    if(v.length<5){ fb.className='chaine-fb show no'; fb.innerHTML='Écrivez d’abord votre phrase : on compare après.'; ta.focus(); return; }
    const ws=warn(e.k,v);
    fb.className='chaine-fb show def';
    fb.innerHTML=`${ws.length?`<p class="cc-warn">${ws.map(T).join('<br>')}</p>`:''}<strong>Une réponse possible :</strong> ${T(okOf(e))}
    <ul class="cc-check">${(CHECK[e.k]||[]).map(x=>`<li>${T(x)}</li>`).join('')}</ul><span class="micro">Votre phrase fait-elle le même travail, avec vos mots ?</span>
    <div class="chaine-nav"><button type="button" class="btn red small comm-yes">Oui, je continue →</button><button type="button" class="home-text-link comm-retry">Je reprends ma phrase</button></div>`;
    fb.querySelector('.comm-yes').onclick=()=>{got[step]=v;step++;render();};
    fb.querySelector('.comm-retry').onclick=()=>{fb.className='chaine-fb';fb.innerHTML='';ta.focus();};
  };
  root.querySelectorAll('.cc-form textarea').forEach(a=>a.oninput=()=>{const all=getJSON(N3_KEY,{});const o=(all&&typeof all==='object')?all:{};o[tx().id]=o[tx().id]||{};o[tx().id][a.dataset.f]=a.value;setJSON(N3_KEY,o);});
  const tb=root.querySelector('.comm-texte'); if(tb) tb.onclick=()=>{const d=document.getElementById('textDialog'); if(d&&d.showModal) d.showModal();};
  const q=(c,f)=>{const el=root.querySelector(c); if(el) el.onclick=f;};
  q('.comm-again',()=>go());
  q('.comm-restart',()=>go());
  q('.comm-nextsubj',nextText);
  q('.comm-nextlevel',()=>{level=Math.min(3,level+1);open=false;go();});
  q('.comm-prevlevel',()=>{level=Math.max(1,level-1);open=false;go();});
  q('.comm-reveal',()=>{const all=root.querySelectorAll('.cc-form textarea');if(![...all].some(a=>a.value.trim().length>4)){alertBox('Écrivez d’abord votre plan, au moins la problématique : on compare après.');return;}compared=true;render();const f=root.querySelector('.cc-modele');if(f) f.closest('.cc-f').scrollIntoView({behavior:'smooth',block:'center'});});
  q('.comm-hide',()=>{compared=false;render();});
  q('.comm-clear',()=>{const all=getJSON(N3_KEY,{});if(all&&all[tx().id]){delete all[tx().id];setJSON(N3_KEY,all);}compared=false;render();});
}
function alertBox(msg){
  let p=root.querySelector('.cc-n3 .cc-warn-top');
  if(!p){p=document.createElement('p');p.className='cc-warn cc-warn-top';p.setAttribute('role','status');root.querySelector('.cc-n3 .chaine-nav').before(p);}
  p.textContent=typo(msg);
}
render();
})();
