/* Rendu des copies annotées : chaque segment de rédaction avec sa fonction en marge ; un segment peut contenir plusieurs phrases. */
const fs=require('fs');
const path=require('path');
const DATA=JSON.parse(fs.readFileSync(path.join(__dirname,'copies20-data.json'),'utf8'));
const ADDITIONAL=JSON.parse(fs.readFileSync(path.join(__dirname,'copies20-additional.json'),'utf8'));
const LEDGER=JSON.parse(fs.readFileSync(path.join(__dirname,'copies20-resolutions.json'),'utf8'));
require('./check-copies20').assertValid(DATA,LEDGER,ADDITIONAL);
// Typographie : espaces insécables avant ; : ! ? » et après «
const nb=s=>String(s).replace(/ ([;:!?»])/g,' $1').replace(/« /g,'« ');
const esc=s=>nb(String(s==null?'':s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const VITRINE='philosophie-copie-20-s-engager-liberte.html';
const line=(t,f)=>`<p class="c20-s"><span class="c20-t">${esc(t)}</span><span class="c20-f">${esc(f)}</span></p>`;
const block=(h,ss,tag)=>`<div class="c20-block"><${tag} class="c20-h">${esc(h)}</${tag}>${ss.map(([t,f])=>line(t,f)).join('')}</div>`;
// Une transition est une charnière autonome entre deux parties, jamais une phrase de la partie précédente.
const isTransition=pair=>/^Transition\b/i.test(String(pair[1]).trim());
const renderCopy=(d,tag)=>d.map(([heading,sentences])=>{
  const body=sentences.filter(pair=>!isTransition(pair));
  const transitions=sentences.filter(isTransition);
  const bridge=transitions.map(([sentence,functionLabel])=>
    '<div class="c20-bridge" role="group" aria-label="Transition entre les parties">'+
    '<p class="c20-bridge-label">TRANSITION</p>'+line(sentence,functionLabel)+'</div>'
  ).join('');
  return block(heading,body,tag)+bridge;
}).join('');
const BRIDGE_CSS='<style>.c20-bridge{clear:both;margin:1.6rem 0;padding:1rem 1.15rem;border-block:1px solid currentColor}.c20-bridge-label{font-size:.75rem;font-weight:700;letter-spacing:.08em;margin:0 0 .65rem}.c20-bridge .c20-s{margin-bottom:0}</style>';
const stats=d=>({n:d.reduce((a,[,ss])=>a+ss.length,0),w:d.reduce((a,[,ss])=>a+ss.reduce((b,[t])=>b+t.split(/\s+/).length,0),0)});
const TOGGLE=`<script>document.querySelectorAll('.c20-toggle').forEach(function(b){b.addEventListener('click',function(){var c=document.getElementById(b.getAttribute('aria-controls'));c.classList.toggle('c20-plain');b.textContent=c.classList.contains('c20-plain')?'Afficher les fonctions':'Masquer les fonctions';});});</script>`;
function section(key){
  const d=DATA[key]; if(!d) return '';
  const {n,w}=stats(d);
  return `<section class="offer-band c20-teaser" id="copie-20"><div class="kicker">LA COPIE À 20</div><h2>Le devoir le plus court qui mérite 20.</h2>
<p>${n} segments annotés, environ ${Math.round(w/10)*10} mots. Chaque segment a sa fonction dans le plan, écrite en marge ; les deux transitions sont distinguées. Lisez-la d’abord avec les fonctions, pour voir la machine, puis sans, pour voir que c’est une vraie copie.</p>
<p><button type="button" class="philo-print c20-toggle" aria-controls="c20-${key}">Masquer les fonctions</button></p>
<div class="c20" id="c20-${key}">${renderCopy(d,'h3')}</div>
</section>
${BRIDGE_CSS}
${TOGGLE}
`;
}
function vitrine(key='notion-liberte',meta=null){
  const d=DATA[key]; const {n,w}=stats(d);
  const subject=meta?meta.title:'S’engager, est-ce renoncer à sa liberté ?';
  const filename=meta?meta.file:VITRINE;
  const extraLinks=Object.entries(ADDITIONAL).map(([k,m])=>`<li><a href="${esc(m.file)}">${esc(m.title)}</a> · ${esc(m.exam)}</li>`).join('');
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(subject)} : copie à 20 en philosophie</title>
<meta name="description" content="Une dissertation de philosophie qui mérite 20, la plus courte possible : « ${esc(subject)} ». Chaque segment argumentatif, sa fonction dans le plan.">
<link rel="canonical" href="https://commentaire-plan.com/${filename}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · LA COPIE À 20</div>
<h1>« ${esc(subject)} »</h1>
${meta?`<p class="micro">${esc(meta.exam)} · ${esc(meta.code)} · <a class="official-link" href="${esc(meta.source)}">Annales officielles →</a></p>`:''}
<p class="lede">${n} segments annotés, environ ${Math.round(w/10)*10} mots. Chaque segment possède une fonction en marge ; les transitions explicitées relient les parties.</p>
</div><aside class="side-note"><p><strong>Comment lire ?</strong><br>Lisez d’abord les fonctions de chaque segment pour comprendre le raisonnement, puis masquez-les pour lire la dissertation suivie.</p><p><button type="button" class="philo-print c20-toggle" aria-controls="c20-vitrine">Masquer les fonctions</button></p></aside></section>
<section class="offer-band c20" id="c20-vitrine">${renderCopy(d,'h2')}</section>
<section class="offer-band"><div class="kicker">POURQUOI CETTE COPIE MÉRITE 20</div><h2>Rien n’y est décoratif.</h2>
<div class="grid-3"><div><strong>Un problème réel</strong><p>Les deux réponses perdent quelque chose, et la problématique le dit en une seule question.</p></div><div><strong>Un plan qui avance</strong><p>Chaque limite naît de l’idée poussée jusqu’au bout ; chaque transition en fait une question. Aucun « d’abord », aucun « de plus » : les liens sont dans la pensée.</p></div><div><strong>Des auteurs qui travaillent</strong><p>Les références sont choisies pour accomplir quelque chose : pousser l’idée, porter la réponse, réaliser l’opération.</p></div></div>
<p>Les copies à 20 : sur les pages des sujets du bac 2026 (<a class="official-link" href="philosophie-annales.html">les annales →</a>) et de chaque notion (<a class="official-link" href="philosophie-notions.html">les 17 notions →</a>).</p>
<h3>Trois nouveaux sujets, pour refaire le travail</h3><ul>${extraLinks}</ul>
<p><a class="official-link" href="philosophie-notion-${meta?esc(meta.notion):'liberte'}.html">Travailler la notion →</a> · <a class="official-link" href="philosophie-dissertation.html#liens">L’architecture logique d’une dissertation →</a></p></section>
</main><script src="site-nav.js"></script>
${BRIDGE_CSS}
${TOGGLE}
</body></html>
`;
}
function writeAdditional(root){
  for(const [key,meta]of Object.entries(ADDITIONAL))fs.writeFileSync(path.join(root,meta.file),vitrine(key,meta));
}
module.exports={teaser:section,section,vitrine,writeAdditional,VITRINE,has:k=>Boolean(DATA[k])};
