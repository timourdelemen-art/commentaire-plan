#!/usr/bin/env node
/* Annales du bac de français : écrit dans chaque page de sujet, en HTML statique,
   les étapes propres au texte (titre, consigne, aide repliée) tirées de
   annales/catalogue-annales.js. Avant ce script, ce travail n'existait que dans
   l'exercice chargé par JavaScript (entrainement-annale.html?id=…), invisible
   pour les moteurs de recherche.
   - Étapes « free » : titre, consigne, aide dans un bloc replié (l'élève essaie d'abord).
   - Étapes « premium » : titre seulement, avec le lien vers le parcours guidé.
   - Les propositions des QCM (« choix ») ne sont jamais écrites dans la page.
   Idempotent (marqueurs). Source à modifier : annales/catalogue-annales.js. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.join(__dirname,'..');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'annales/catalogue-annales.js'),'utf8'),ctx);
const CAT=ctx.window.ANNALES_CATALOGUE;
const START='<!--etapes-sujet:start-->',END='<!--etapes-sujet:end-->';
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const para=s=>esc(s).split('\n').filter(Boolean).join('<br>');
const titre=s=>esc(String(s||'').replace(/^\d+\.\s*/,''));
let n=0;const manquants=[];
for(const [id,e] of Object.entries(CAT)){
  if(!id.startsWith('bac-')) continue;
  const file=path.join(ROOT,id+'.html');
  if(!fs.existsSync(file)){manquants.push(id);continue;}
  let s=fs.readFileSync(file,'utf8');
  s=s.replace(new RegExp(START+'[\\s\\S]*?'+END+'\\n?'),'');
  const lien=step=>`annales/entrainement-annale.html?id=${id}&amp;mode=targeted&amp;step=${encodeURIComponent(step)}`;
  const libres=e.etapes.filter(x=>x.access!=='premium');
  const suite=e.etapes.filter(x=>x.access==='premium');
  const num=x=>e.etapes.indexOf(x)+1;
  const libresHtml=libres.map(x=>`<li class="sujet-etape"><h3><span>${num(x)}</span> ${titre(x.titre)}</h3><p>${para(x.consigne)}</p>${x.aide?`<details><summary>Une aide si vous bloquez</summary><p>${para(x.aide)}</p></details>`:''}<a class="sujet-etape-lien" href="${lien(x.id)}">Faire cette étape →</a></li>`).join('');
  const suiteHtml=suite.length?`<div class="sujet-suite"><p><strong>La suite du parcours sur ce texte :</strong> ${suite.map(x=>`${num(x)}. ${titre(x.titre)}`).join(' · ')}.</p><a class="btn" href="annales/entrainement-annale.html?id=${id}">Faire le parcours guidé →</a></div>`:'';
  const bloc=`${START}<section class="sujet-etapes" id="etapes"><div class="kicker">CE SUJET, ÉTAPE PAR ÉTAPE</div><h2>${esc(e.auteur)}, ${esc(e.oeuvre)} : par où commencer.</h2><p>Essayez chaque étape sur votre brouillon avant d’ouvrir l’aide.</p><ol class="sujet-etapes-liste">${libresHtml}</ol>${suiteHtml}</section>${END}\n`;
  const ancre='<section class="annale-seo-method">';
  if(!s.includes(ancre)){manquants.push(id+' (ancre absente)');continue;}
  s=s.replace(ancre,bloc+ancre);
  fs.writeFileSync(file,s);n++;
}
console.log(`Étapes du sujet écrites dans ${n} pages d’annales du bac.`);
if(manquants.length){console.error('Pages non traitées : '+manquants.join(', '));process.exit(1);}
