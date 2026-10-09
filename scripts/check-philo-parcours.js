#!/usr/bin/env node
/* Contrôles de non-régression ciblés sur le parcours philosophie.
   Aucune dépendance externe, lecture seule. */
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const failures=[];
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=['philosophie.html','philosophie-dissertation-entrainement.html','philosophie-troisieme-resolutions.html'];
for(const p of pages){
 const html=read(p);
 if(!/<header\b[^>]*data-seo-static-nav="1"/.test(html)) failures.push(p+': menu statique absent');
 if(!/<footer\b[^>]*data-seo-static-footer="1"/.test(html)) failures.push(p+': pied de page statique absent');
 if(!/<main\b/.test(html)) failures.push(p+': élément main absent');
 if((html.match(/<h1\b/g)||[]).length!==1) failures.push(p+': un seul H1 attendu');
 const ids=new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
 for(const m of html.matchAll(/<a\b[^>]*href=["']#([^"']+)["']/g)){
  if(!ids.has(decodeURIComponent(m[1]))) failures.push(p+': ancre absente #'+m[1]);
 }
}
// La navigation principale doit pointer vers des pages présentes dans le dépôt.
const landing=read('philosophie.html');
for(const target of ['philosophie-dissertation.html','philosophie-dissertation-entrainement.html','philosophie-annales.html']){
 if(!fs.existsSync(path.join(root,target))) failures.push('destination absente : '+target);
}
const training=read('philosophie-dissertation-entrainement.html');
if(!training.includes('href="philosophie-troisieme-resolutions.html"')) failures.push('lien vers la gamme III absent');
const nav=read('site-nav.js');
if(!nav.includes("'philosophie-troisieme-resolutions.html'")) failures.push('gamme III absente de la navigation JS');
const progress=read('philosophie-parcours.js');
if(!progress.includes('étape parcourue')) failures.push('suivi de progression ambigu');
if(failures.length){console.error('Contrôles parcours philosophie :\n'+failures.map(x=>' - '+x).join('\n'));process.exitCode=1;}
else console.log('Contrôles parcours philosophie : OK ('+pages.length+' pages, liens internes, navigation, progression).');
