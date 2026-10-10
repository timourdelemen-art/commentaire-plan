#!/usr/bin/env node
/* Contrôles de non-régression ciblés sur le parcours philosophie.
   Aucune dépendance externe, lecture seule. */
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const failures=[];
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/[\u00a0\u202f]/g,' ');
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
for(const target of ['philosophie-dissertation.html','philosophie-dissertation-entrainement.html','philosophie-annales.html']){
 if(!fs.existsSync(path.join(root,target))) failures.push('destination absente : '+target);
}
const training=read('philosophie-dissertation-entrainement.html');
if(!training.includes('href="philosophie-troisieme-resolutions.html"')) failures.push('lien vers la gamme III absent');
const nav=read('site-nav.js');
if(!nav.includes("'philosophie-troisieme-resolutions.html'")) failures.push('gamme III absente de la navigation JS');
const progress=read('philosophie-parcours.js');
if(!progress.includes('étape parcourue')) failures.push('suivi de progression ambigu');
// Parcours en cinq gestes : mêmes pages, même ordre, mêmes libellés partout.
const {PHILO_STEPS,PHILO_RESOURCES}=require('./philo-paths.js');
const seo=read('scripts/seo-build.js');
PHILO_STEPS.forEach(([file,label],k)=>{
 const n=k+1, html=read(file);
 const strip=(html.match(/<nav class="parcours-strip"[\s\S]*?<\/nav>/)||[''])[0];
 if(!strip.includes('data-step="'+n+'"')) failures.push(file+': bande du parcours absente ou mauvais numéro (attendu '+n+')');
 if(!new RegExp('href="'+file.replace(/\./g,'\\.')+'" data-n="'+n+'" aria-current="step"').test(strip)) failures.push(file+': étape courante non marquée');
 if(!html.includes('Étape '+n+' sur 5 : '+label)) failures.push(file+': navigation précédent/suivant absente');
 for(const [name,src] of [['site-nav.js',nav],['seo-build.js',seo]]) if(!src.includes("'"+file+"','"+n+' · '+label+"'")) failures.push(name+': libellé du menu différent pour l’étape '+n+' (« '+n+' · '+label+' » attendu)');
});
PHILO_RESOURCES.forEach(file=>{const html=read(file);if(/<nav class="parcours-strip"[^>]*data-step=/.test(html)) failures.push(file+': une ressource ne doit pas porter de numéro d’étape');});
// Vocabulaire réservé aux documents internes (AGENTS.md § 2) : jamais sur une page élève de philosophie.
for(const f of fs.readdirSync(root).filter(f=>/^philosophie.*\.html$/.test(f))){
 const text=read(f).replace(/<(script|style)[\s\S]*?<\/\1>/g,' ').replace(/<[^>]+>/g,' ');
 const m=text.match(/\b(double aporie|aporie|chiasme|reprobl[ée]matisation)\b/i); if(m) failures.push(f+': terme réservé « '+m[1]+' »');
}
if(failures.length){console.error('Contrôles parcours philosophie :\n'+failures.map(x=>' - '+x).join('\n'));process.exitCode=1;}
else console.log('Contrôles parcours philosophie : OK ('+pages.length+' pages, liens internes, navigation, progression).');
