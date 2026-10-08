/* Rendu des « copies à 20 » : partie publique (introduction + structure) et page vitrine complète. */
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const fs=require('fs');
const DATA=(()=>{const w={};new Function('window',fs.readFileSync(path.join(ROOT,'philosophie-copies20-public.js'),'utf8'))(w);return w.PHILO_COPIES20||{};})();
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const VITRINE='philosophie-copie-20-s-engager-liberte.html';
const line=(t,f)=>`<p class="c20-s"><span class="c20-t">${t}</span><span class="c20-f">${esc(f)}</span></p>`;
function block(h,rows){return `<div class="c20-block"><h3 class="c20-h">${esc(h)}</h3>${rows}</div>`;}
function teaser(key){
  const c=DATA[key];
  if(!c) return '';
  const free=key==='notion-liberte';
  const intro=block('INTRODUCTION',c.intro.map(([t,f])=>line(esc(t),f)).join(''));
  const suite=c.suite.map(([h,fns])=>block(h,fns.map(f=>line('<span class="c20-bar" aria-hidden="true"></span>',f)).join(''))).join('');
  return `<section class="offer-band c20-teaser" id="copie-20"><div class="kicker">LA COPIE À 20</div><h2>Le devoir le plus court qui mérite 20.</h2>
<p>${c.phrases} phrases, environ ${Math.round(c.mots/10)*10} mots, soit trois pages manuscrites. Chaque phrase a sa fonction dans le plan, écrite en marge. ${free?'Cette copie est en accès libre : lisez-la en entier.':'Voici l’introduction rédigée ; pour la suite, la structure seule.'}</p>
${free?`<p><a class="btn red" href="${VITRINE}">Lire la copie à 20 en entier →</a></p>`:`<div class="c20">${intro}</div>
<div class="c20 c20-locked" aria-label="Structure de la suite de la copie">${suite}</div>
<div class="c20-cover"><p><strong>La copie entière fera partie de l’accès complet, bientôt disponible.</strong> En attendant, une copie à 20 est lisible en entier, phrase par phrase.</p><p><a class="btn red" href="${VITRINE}">Lire une copie à 20 en entier →</a></p></div>`}
</section>
`;
}
function vitrine(data){
  const words=data.reduce((a,[,ss])=>a+ss.reduce((b,[t])=>b+t.split(/\s+/).length,0),0);
  const n=data.reduce((a,[,ss])=>a+ss.length,0);
  const body=data.map(([h,ss])=>block(h,ss.map(([t,f])=>line(esc(t),f)).join(''))).join('');
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Copie à 20 en philosophie, commentée phrase par phrase</title>
<meta name="description" content="Une dissertation de philosophie qui mérite 20, la plus courte possible : « S’engager, est-ce renoncer à sa liberté ? ». Chaque phrase, sa fonction dans le plan.">
<link rel="canonical" href="https://commentaire-plan.com/${VITRINE}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · LA COPIE À 20</div>
<h1>« S’engager, est-ce renoncer à sa liberté ? »</h1>
<p class="lede">Le devoir le plus court qui mérite 20 : ${n} phrases, environ ${Math.round(words/10)*10} mots, soit trois pages manuscrites. Chaque phrase a sa fonction dans le plan ; elle est écrite en marge, avec, aux charnières, le rôle du lien logique.</p>
</div><aside class="side-note"><p><strong>Comment lire ?</strong><br>D’abord avec les fonctions, pour voir la machine. Puis sans, pour voir que c’est une vraie copie.</p><p><button type="button" class="philo-print c20-toggle">Masquer les fonctions</button></p></aside></section>
<section class="offer-band c20">${body}</section>
<section class="offer-band"><div class="kicker">POURQUOI CETTE COPIE MÉRITE 20</div><h2>Rien n’y est décoratif.</h2>
<div class="grid-3"><div><strong>Un problème réel</strong><p>Les deux réponses perdent quelque chose, et la problématique le dit en une seule question.</p></div><div><strong>Un plan qui avance</strong><p>Chaque limite naît de l’idée poussée jusqu’au bout ; chaque transition en fait une question. Aucun « d’abord », aucun « de plus » : les liens sont dans la pensée.</p></div><div><strong>Des auteurs qui travaillent</strong><p>Trois références, et chacune accomplit quelque chose : pousser l’idée, porter la réponse, réaliser l’opération.</p></div></div>
<p><a class="official-link" href="philosophie-notion-liberte.html">L’atelier de la liberté →</a> · <a class="official-link" href="philosophie-dissertation.html#liens">L’architecture logique d’une dissertation →</a></p></section>
</main><script src="site-nav.js"></script>
<script>document.querySelector('.c20-toggle').addEventListener('click',function(){var c=document.querySelector('.c20');c.classList.toggle('c20-plain');this.textContent=c.classList.contains('c20-plain')?'Afficher les fonctions':'Masquer les fonctions';});</script>
</body></html>
`;
}
module.exports={teaser,vitrine,VITRINE};
