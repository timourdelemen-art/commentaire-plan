#!/usr/bin/env node
/* Injecte la « boussole » (d'où vous partez / ce que vous faites / ce que vous obtenez) avant chaque exercice,
   et génère la page « Je bloque sur… » (philosophie-laboratoire.html). Idempotent. */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const {GROUPS,EX,EXTRA}=require('./philo-exercices.js');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const typo=s=>s.replace(/ ([;:?!»])/g,' $1').replace(/« /g,'« ');
const T=s=>typo(esc(s));
const LAB='philosophie-laboratoire.html';

/* 1. Boussoles */
const byPage={};
EX.forEach(x=>(byPage[x[0]]=byPage[x[0]]||[]).push(x));
let injected=0;
for(const [page,list] of Object.entries(byPage)){
  const f=path.join(ROOT,page); let s=fs.readFileSync(f,'utf8');
  s=s.replace(/<div class="boussole"[^>]*>[\s\S]*?<\/div><!--\/boussole-->\n?/g,'');
  for(const [,id,,title,dep,geste,res] of list){
    const open=`<section class="exercise-wrap" id="${id}">`;
    const i=s.indexOf(open); if(i<0) throw new Error(`Exercice introuvable : ${page}#${id}`);
    const a=s.indexOf('<article',i); const end=s.indexOf('</section>',i);
    if(a<0||a>end) throw new Error(`Pas d’article dans ${page}#${id}`);
    const b=`<div class="boussole" aria-label="Avant de commencer"><p><b>D’où vous partez</b>${T(dep)}</p><p><b>Ce que vous faites</b>${T(geste)}</p><p><b>Ce que vous obtenez</b>${T(res)}</p><p class="boussole-back"><a href="${LAB}">Pas votre difficulté ? Je bloque sur… →</a></p></div><!--/boussole-->\n`;
    s=s.slice(0,a)+b+s.slice(a); injected++;
  }
  fs.writeFileSync(f,s);
}

/* 2. Page « Je bloque sur… » */
const card=(href,title,dep,res)=>`<a class="bloque-card" href="${href}"><strong>${T(title)}</strong>${dep?`<span><b>Vous partez de :</b> ${T(dep.replace(/^Vous /,'').replace(/^./,c=>c.toLowerCase()))}</span>`:''}<span><b>Vous obtenez :</b> ${T(res)}</span><i>Faire l’exercice →</i></a>`;
const sections=GROUPS.map(([key,label,hint])=>{
  const items=EX.filter(x=>x[2].includes(key)).map(x=>card(`${x[0]}#${x[1]}`,x[3],null,x[6]));
  const ex=EXTRA[key]||[];
  const xc=([h,t,d,cta])=>`<a class="bloque-card bloque-extra${cta?' bloque-first':''}" href="${h}"><strong>${T(t)}</strong><span>${T(d)}</span><i>${cta?T(cta):'Lire →'}</i></a>`;
  const first=ex.filter(x=>x[3]).map(xc), extra=ex.filter(x=>!x[3]).map(xc);
  items.unshift(...first);
  return `<section class="offer-band bloque-group" id="${key}"><div class="kicker">« ${T(label.toUpperCase())} »</div><h2>${T(hint)}</h2>
<div class="bloque-grid">${items.concat(extra).join('\n')}</div></section>`;
}).join('\n\n');
const nav=`<nav class="bloque-nav" aria-label="Choisir une difficulté"><p><strong>Choisissez la phrase qui vous ressemble :</strong></p><ul>${GROUPS.map(([k,l])=>`<li><a href="#${k}">« ${T(l)} »</a></li>`).join('')}</ul></nav>`;
const html=`<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Philosophie : je bloque sur… Un exercice pour chaque difficulté</title>
<meta name="description" content="Problème introuvable, plan en liste, transitions, troisième partie, citations : choisissez ce qui vous bloque en dissertation de philosophie, et faites l’exercice corrigé qui y répond.">
<link rel="canonical" href="https://commentaire-plan.com/${LAB}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">

<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · ÉTAPE 4 SUR 5 · JE BLOQUE SUR…</div>
<h1>Qu’est-ce qui<br>vous bloque ?</h1>
<p class="lede">Chaque exercice dit d’où vous partez, ce que vous allez faire, et ce que vous aurez à la fin. Dix à vingt minutes, avec un corrigé.</p>
${nav}
</div><aside class="side-note"><p><strong>Vous ne savez pas ce qui vous bloque ?</strong><br>Cinq questions, cinq minutes : <a href="philosophie-diagnostic.html">faire le diagnostic →</a></p><p><strong>Vous débutez ?</strong><br>Suivez plutôt <a href="philosophie.html#parcours">le parcours en cinq étapes →</a></p></aside></section>

${sections}

<section class="offer-band"><div class="kicker">UNE SEULE RÈGLE</div><h2>Réussi une fois, refait une fois.</h2>
<p>Un exercice réussi ne prouve pas encore que le geste est acquis. Refaites-le sur un autre sujet : un des cinq sujets d’une <a href="philosophie-notions.html">notion</a>, ou un <a href="philosophie-annales.html">sujet du bac 2026</a>.</p></section>

</main><script src="site-nav.js"></script></body></html>
`;
fs.writeFileSync(path.join(ROOT,LAB),html);
/* 3. Bande du parcours (cinq gestes), navigation précédent/suivant et script de progression.
   Source unique des libellés : STEPS (identiques dans site-nav.js et scripts/seo-build.js).
   Le diagnostic et les cours sont des ressources : bande sans étape courante, pas de numéro. */
const {PHILO_STEPS:STEPS,PHILO_RESOURCES:RESOURCES}=require('./philo-paths.js');
const stepOf={};STEPS.forEach(([f],k)=>stepOf[f]=k+1);
RESOURCES.forEach(f=>stepOf[f]=0);
fs.readdirSync(ROOT).filter(f=>/^philosophie-bac-2026-.*\.html$/.test(f)).forEach(f=>stepOf[f]=5);
const SCRIPT='<script src="philosophie-parcours.js" defer></script>';
const NAVSTYLE='display:flex;flex-wrap:wrap;gap:.6rem 1.2rem;align-items:center;margin:1.2rem 0;padding:.9rem 1rem;border:1px solid #c9bfb0;background:#fffdf8';
for(const [page,n] of Object.entries(stepOf)){
  const f=path.join(ROOT,page); let s=fs.readFileSync(f,'utf8');
  s=s.replace(/<nav class="parcours-strip"[\s\S]*?<\/nav><!--\/parcours-strip-->\n?/,'');
  s=s.replace(/<nav class="parcours-navigation"[\s\S]*?<\/nav>(<!--\/parcours-navigation-->)?\n?/g,'');
  const strip=`<nav class="parcours-strip"${n?` data-step="${n}"`:''} aria-label="Le parcours en cinq étapes"><a class="parcours-home" href="philosophie.html#parcours">Le parcours</a>${STEPS.map(([h,l],k)=>`<a href="${h}" data-n="${k+1}"${k+1===n?' aria-current="step"':''}><b>${k+1}</b><span>${l}</span></a>`).join('')}</nav><!--/parcours-strip-->\n`;
  const head=s.match(/<section class="pagehead[^"]*">/); if(!head) throw new Error('pagehead introuvable : '+page);
  const i=head.index;
  s=s.slice(0,i)+strip+s.slice(i);
  if(n && STEPS[n-1][0]===page){
    const prev=STEPS[n-2], next=STEPS[n];
    const nav=`<nav class="parcours-navigation" aria-label="Se déplacer entre les étapes du parcours" style="${NAVSTYLE}"><a href="philosophie.html#parcours">Les cinq étapes</a>${prev?`<a href="${prev[0]}">← Étape ${n-1} : ${prev[1]}</a>`:''}<strong aria-current="step">Étape ${n} sur 5 : ${STEPS[n-1][1]}</strong>${next?`<a href="${next[0]}">Étape ${n+1} : ${next[1]} →</a>`:''}</nav><!--/parcours-navigation-->\n`;
    const h=s.indexOf('</section>',s.search(/<section class="pagehead[^"]*">/))+'</section>'.length;
    s=s.slice(0,h)+'\n'+nav+s.slice(h);
  }
  if(!s.includes(SCRIPT)) s=s.replace('</main>','</main>'+SCRIPT);
  fs.writeFileSync(f,s);
}
{ const f=path.join(ROOT,'philosophie.html'); let s=fs.readFileSync(f,'utf8'); if(!s.includes(SCRIPT)){s=s.replace('</main>','</main>'+SCRIPT);fs.writeFileSync(f,s);} }

console.log(`Boussoles : ${injected} exercices ; page « Je bloque sur… » : ${GROUPS.length} difficultés.`);
