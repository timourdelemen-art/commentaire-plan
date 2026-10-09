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

/* 1 bis. Bande du parcours (étapes 1 à 5) et script de progression */
const STEPS=[['philosophie-diagnostic.html','Faire le point'],['philosophie-problematisation.html','Trouver le problème'],['philosophie-dissertation.html','Construire la dissertation'],['philosophie-dissertation-entrainement.html','S’entraîner'],['philosophie-annales.html','Un sujet du bac']];
const stepOf={};STEPS.forEach(([f],k)=>stepOf[f]=k+1);
fs.readdirSync(ROOT).filter(f=>/^philosophie-bac-2026-.*\.html$/.test(f)).forEach(f=>stepOf[f]=5);
const SCRIPT='<script src="philosophie-parcours.js" defer></script>';
for(const [page,n] of Object.entries(stepOf)){
  const f=path.join(ROOT,page); let s=fs.readFileSync(f,'utf8');
  s=s.replace(/<nav class="parcours-strip"[\s\S]*?<\/nav><!--\/parcours-strip-->\n?/,'');
  const strip=`<nav class="parcours-strip" data-step="${n}" aria-label="Le parcours en cinq étapes"><a class="parcours-home" href="philosophie.html#parcours">Le parcours</a>${STEPS.map(([h,l],k)=>`<a href="${h}" data-n="${k+1}"${k+1===n?' aria-current="step"':''}><b>${k+1}</b><span>${l}</span></a>`).join('')}</nav><!--/parcours-strip-->\n`;
  const i=s.indexOf('<section class="pagehead">'); if(i<0) throw new Error('pagehead introuvable : '+page);
  s=s.slice(0,i)+strip+s.slice(i);
  if(!s.includes(SCRIPT)) s=s.replace('</main>','</main>'+SCRIPT);
  fs.writeFileSync(f,s);
}
{ const f=path.join(ROOT,'philosophie.html'); let s=fs.readFileSync(f,'utf8'); if(!s.includes(SCRIPT)){s=s.replace('</main>','</main>'+SCRIPT);fs.writeFileSync(f,s);} }

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

<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · JE BLOQUE SUR…</div>
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
console.log(`Boussoles : ${injected} exercices ; page « Je bloque sur… » : ${GROUPS.length} difficultés.`);
