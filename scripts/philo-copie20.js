/* Rendu des « copies à 20 » : la copie complète, chaque phrase avec sa fonction en marge. */
const fs=require('fs');
const path=require('path');
const DATA=JSON.parse(fs.readFileSync(path.join(__dirname,'copies20-data.json'),'utf8'));
// Typographie : espaces insécables avant ; : ! ? » et après «
const nb=s=>String(s).replace(/ ([;:!?»])/g,' $1').replace(/« /g,'« ');
const esc=s=>nb(String(s==null?'':s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const VITRINE='philosophie-copie-20-s-engager-liberte.html';
const line=(t,f)=>`<p class="c20-s"><span class="c20-t">${esc(t)}</span><span class="c20-f">${esc(f)}</span></p>`;
const block=(h,ss,tag)=>`<div class="c20-block"><${tag} class="c20-h">${esc(h)}</${tag}>${ss.map(([t,f])=>line(t,f)).join('')}</div>`;
const stats=d=>({n:d.reduce((a,[,ss])=>a+ss.length,0),w:d.reduce((a,[,ss])=>a+ss.reduce((b,[t])=>b+t.split(/\s+/).length,0),0)});
const TOGGLE=`<script>document.querySelectorAll('.c20-toggle').forEach(function(b){b.addEventListener('click',function(){var c=document.getElementById(b.getAttribute('aria-controls'));c.classList.toggle('c20-plain');b.textContent=c.classList.contains('c20-plain')?'Afficher les fonctions':'Masquer les fonctions';});});</script>`;
function section(key){
  const d=DATA[key]; if(!d) return '';
  const {n,w}=stats(d);
  return `<section class="offer-band c20-teaser" id="copie-20"><div class="kicker">LA COPIE À 20</div><h2>Le devoir le plus court qui mérite 20.</h2>
<p>${n} phrases, environ ${Math.round(w/10)*10} mots, soit trois pages manuscrites. Chaque phrase a sa fonction dans le plan, écrite en marge ; aux charnières, le rôle du lien logique. Lisez-la d’abord avec les fonctions, pour voir la machine, puis sans, pour voir que c’est une vraie copie.</p>
<p><button type="button" class="philo-print c20-toggle" aria-controls="c20-${key}">Masquer les fonctions</button></p>
<div class="c20" id="c20-${key}">${d.map(([h,ss])=>block(h,ss,'h3')).join('')}</div>
</section>
${TOGGLE}
`;
}
function vitrine(){
  const d=DATA['notion-liberte']; const {n,w}=stats(d);
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Copie à 20 en philosophie, commentée phrase par phrase</title>
<meta name="description" content="Une dissertation de philosophie qui mérite 20, la plus courte possible : « S’engager, est-ce renoncer à sa liberté ? ». Chaque phrase, sa fonction dans le plan.">
<link rel="canonical" href="https://commentaire-plan.com/${VITRINE}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · LA COPIE À 20</div>
<h1>« S’engager, est-ce renoncer à sa liberté ? »</h1>
<p class="lede">Le devoir le plus court qui mérite 20 : ${n} phrases, environ ${Math.round(w/10)*10} mots, soit trois pages manuscrites. Chaque phrase a sa fonction dans le plan ; elle est écrite en marge, avec, aux charnières, le rôle du lien logique.</p>
</div><aside class="side-note"><p><strong>Comment lire ?</strong><br>D’abord avec les fonctions, pour voir la machine. Puis sans, pour voir que c’est une vraie copie.</p><p><button type="button" class="philo-print c20-toggle" aria-controls="c20-vitrine">Masquer les fonctions</button></p></aside></section>
<section class="offer-band c20" id="c20-vitrine">${d.map(([h,ss])=>block(h,ss,'h2')).join('')}</section>
<section class="offer-band"><div class="kicker">POURQUOI CETTE COPIE MÉRITE 20</div><h2>Rien n’y est décoratif.</h2>
<div class="grid-3"><div><strong>Un problème réel</strong><p>Les deux réponses perdent quelque chose, et la problématique le dit en une seule question.</p></div><div><strong>Un plan qui avance</strong><p>Chaque limite naît de l’idée poussée jusqu’au bout ; chaque transition en fait une question. Aucun « d’abord », aucun « de plus » : les liens sont dans la pensée.</p></div><div><strong>Des auteurs qui travaillent</strong><p>Trois références, et chacune accomplit quelque chose : pousser l’idée, porter la réponse, réaliser l’opération.</p></div></div>
<p>Toutes les copies à 20 : sur la page de chaque sujet du bac 2026 (<a class="official-link" href="philosophie-annales.html">les annales →</a>) et de chaque notion (<a class="official-link" href="philosophie-notions.html">les 17 notions →</a>).</p>
<p><a class="official-link" href="philosophie-notion-liberte.html">L’atelier de la liberté →</a> · <a class="official-link" href="philosophie-dissertation.html#liens">L’architecture logique d’une dissertation →</a></p></section>
</main><script src="site-nav.js"></script>
${TOGGLE}
</body></html>
`;
}
module.exports={teaser:section,section,vitrine,VITRINE,has:k=>Boolean(DATA[k])};
