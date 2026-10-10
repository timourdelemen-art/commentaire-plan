/* Dictée : un bouton « Dicter » sous chaque zone d'écriture, là où le navigateur sait transcrire la voix
   (Chrome, Edge, Safari). Chargé par site-nav.js seulement si la reconnaissance vocale existe.
   Pas de dictée en mode examen (bac-mode-examen.html) ni sur une zone marquée data-sans-dictee.
   La voix est transcrite par le service du navigateur (voir confidentialite.html) ; le site ne reçoit que le texte. */
(()=>{
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR||window.__dictee) return;
window.__dictee=true;
let rec=null, cible=null, bouton=null, base='', fini='';

const libre=b=>{b.classList.remove('on');b.setAttribute('aria-pressed','false');b.innerHTML='<span aria-hidden="true">●</span> Dicter';};
const dire=(b,t)=>{const s=b&&b.parentNode&&b.parentNode.querySelector('.dictee-etat');if(s)s.textContent=t||'';};
const ponct=t=>t.replace(/\s+([,.;:?!])/g,(m,p)=>(/[;:?!]/.test(p)?' ':'')+p).replace(/^\s+/,'');

function arreter(){ if(rec){ try{rec.stop();}catch(e){} } }
function demarrer(ta,b){
  if(rec) arreter();
  cible=ta; bouton=b; fini='';
  base=ta.value; if(base&&!/\s$/.test(base)) base+=' ';
  rec=new SR(); rec.lang='fr-FR'; rec.interimResults=true; rec.continuous=true;
  rec.onresult=ev=>{
    let provisoire='';
    for(let i=ev.resultIndex;i<ev.results.length;i++){
      const t=ev.results[i][0].transcript;
      if(ev.results[i].isFinal) fini+=(fini&&!/\s$/.test(fini)?' ':'')+t.trim();
      else provisoire+=t;
    }
    cible.value=base+ponct(fini+(provisoire?' '+provisoire:''));
    cible.dispatchEvent(new Event('input',{bubbles:true}));
  };
  rec.onerror=ev=>{
    dire(bouton,ev.error==='not-allowed'||ev.error==='service-not-allowed'?'Micro refusé : autorisez-le dans les réglages du navigateur.':ev.error==='no-speech'?'Je n’ai rien entendu. Réessayez.':'La dictée s’est interrompue.');
  };
  rec.onend=()=>{ if(bouton) libre(bouton); if(fini) dire(bouton,'Relisez et corrigez : la dictée oublie souvent la ponctuation.'); rec=null; cible=null; bouton=null; };
  b.classList.add('on'); b.setAttribute('aria-pressed','true'); b.innerHTML='<span aria-hidden="true">■</span> Arrêter la dictée'; dire(b,'Parlez : votre texte s’écrit au fur et à mesure.');
  try{ rec.start(); }catch(e){ libre(b); dire(b,'La dictée n’a pas pu démarrer.'); }
}

function equiper(ta){
  if(ta.dataset.dictee||ta.disabled||ta.readOnly||ta.closest('[data-sans-dictee]')) return;
  ta.dataset.dictee='1';
  const barre=document.createElement('div'); barre.className='dictee-barre';
  const b=document.createElement('button'); b.type='button'; b.className='dictee-btn'; b.title='Dicter votre réponse au lieu de la taper';
  libre(b);
  const etat=document.createElement('span'); etat.className='dictee-etat'; etat.setAttribute('aria-live','polite');
  barre.append(b,etat);
  ta.insertAdjacentElement('afterend',barre); ta._dicteeBarre=barre;
  b.addEventListener('click',()=>{ if(bouton===b) arreter(); else demarrer(ta,b); });
}

const style=document.createElement('style');
style.textContent='.dictee-barre{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:6px 0 4px}.dictee-btn{font:14px Georgia,"Times New Roman",serif;background:none;border:0;border-bottom:1px solid #c9bfb0;color:#6b655c;padding:2px 0;cursor:pointer}.dictee-btn span{color:#9b4c43;font-size:11px;margin-right:4px}.dictee-btn:hover{color:#181715;border-bottom-color:#181715}.dictee-btn.on{color:#9b4c43;border-bottom-color:#9b4c43}.dictee-btn.on span{animation:dictee 1s ease-in-out infinite alternate}.dictee-btn:focus-visible{outline:3px solid #9b4c43;outline-offset:2px}.dictee-etat{font-size:13px;color:#6b655c}@keyframes dictee{to{opacity:.25}}@media(prefers-reduced-motion:reduce){.dictee-btn.on span{animation:none}}';
document.head.appendChild(style);

const tout=r=>{ (r.querySelectorAll?r:document).querySelectorAll('textarea').forEach(equiper); if(r.tagName==='TEXTAREA') equiper(r); };
tout(document);
/* Le bouton reste collé sous la zone, même si un autre script insère ensuite quelque chose après elle. */
const recoller=()=>document.querySelectorAll('textarea[data-dictee]').forEach(ta=>{const b=ta._dicteeBarre;if(b&&ta.nextElementSibling!==b)ta.insertAdjacentElement('afterend',b);});
new MutationObserver(ms=>{ for(const m of ms) m.addedNodes.forEach(n=>{ if(n.nodeType===1) tout(n); }); recoller(); if(cible&&!document.contains(cible)) arreter(); }).observe(document.body,{childList:true,subtree:true});
})();
