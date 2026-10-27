#!/usr/bin/env node
/* Contrôle rétrospectif non destructif : ressources et exercices conservés.
 * Compare le dépôt actuel à un commit antérieur, sans écrire dans les pages.
 * Usage : node scripts/check-content-preservation.cjs <commit-de-reference>
 */
const cp=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const base=process.argv[2];
if(!base||!/^[a-f0-9]{7,40}$/i.test(base)){
 console.error('Usage : node scripts/check-content-preservation.cjs <SHA Git de référence>');
 process.exit(2);
}
const git=(...args)=>cp.execFileSync('git',args,{cwd:root,encoding:'utf8',maxBuffer:40*1024*1024});
const files=git('ls-tree','-r','--name-only',base).split('\n').filter(p=>p.endsWith('.html'));
const readOld=p=>git('show',base+':'+p);
const getLinks=s=>[
 ...[...s.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]),
 // Un onglet reste un accès à une section, même quand il remplace un lien du bandeau.
 ...[...s.matchAll(/<button\b[^>]*\brole=["']tab["'][^>]*>/gi)].map(m=>m[0].match(/\baria-controls=["']([^"']+)["']/)?.[1]).filter(Boolean).map(id=>'#'+id)
];
const relevant=p=>/(?:copie-20|corrig|modele|modèle|annale|exercice|entrainement|entraînement|dissertation|commentaire|explication|brevet|hlp)/i.test(p);
const signature=s=>({
 textareas:(s.match(/<textarea\b/gi)||[]).length,
 choiceButtons:(s.match(/data-choice\b|data-subj\b|data-level\b/gi)||[]).length,
 scripts:[...s.matchAll(/<script[^>]*src=["']([^"']+)["']/gi)].map(x=>x[1]).filter(x=>!/(?:site-nav|script\.js)/.test(x)),
 links:getLinks(s).filter(h=>relevant(h)&&!h.startsWith('http'))
});
const findings=[];
/* Contenus déplacés volontairement : un lien remplacé par sa nouvelle adresse, ou une section partie sur une autre page,
   ne compte pas comme une perte. Chaque entrée renvoie à la PR qui a fait le déplacement. */
const MOVED_LINKS={ // ancienne adresse → nouvelle (menu Annales, 26 octobre 2026)
 'annales.html#bac':'annales-bac.html','/annales.html#bac':'/annales-bac.html',
 'annales.html#annales-bac-fiches':'annales-bac.html#annales-bac-fiches','annales.html#annales-recherche':'annales-bac.html#annales-recherche',
 'annales.html#brevet':'brevet.html#brevet-sujets','/annales.html#brevet':'/brevet.html#brevet-sujets',
 'annales.html::#hlp':'hlp-annales.html','annales.html::#brevet':'brevet.html#brevet-sujets' // ancres internes devenues des portes
};
const MOVED_PAGES={'annales.html':['annales-bac.html','brevet.html']}; // sections reprises par ces pages
// Déplacements explicites de la PR nº 222 : aucune ressource n'est ignorée globalement.
Object.assign(MOVED_LINKS,require('./content-moves-2026-10-27.json'));
for(const [source,target] of Object.entries(require('./content-moves-2026-10-27.json'))){
 const page=source.split('::')[0],url=new URL(target.replace(/&amp;/g,'&'),'https://local.invalid/'+page);
 const dest=path.join(root,decodeURIComponent(url.pathname));
 if(!fs.existsSync(dest))throw Error('Destination de déplacement absente : '+target);
 if(url.hash&&!fs.readFileSync(dest,'utf8').includes('id="'+decodeURIComponent(url.hash.slice(1))+'"'))throw Error('Ancre de déplacement absente : '+target);
}
const signatureOf=f=>fs.existsSync(path.join(root,f))?signature(fs.readFileSync(path.join(root,f),'utf8')):{scripts:[],links:[]};
for(const file of files){
 if(!relevant(file))continue;
 const dest=path.join(root,file);
 if(!fs.existsSync(dest)){findings.push({file,type:'PAGE_ABSENTE'});continue;}
 const before=signature(readOld(file)),after=signature(fs.readFileSync(dest,'utf8'));
 for(const key of ['textareas','choiceButtons']){
  if(after[key]<before[key])findings.push({file,type:'COMPTEUR_EN_BAISSE',element:key,avant:before[key],apres:after[key]});
 }
 for(const key of ['scripts','links']){
  const elsewhere=(MOVED_PAGES[file]||[]).flatMap(f=>signatureOf(f)[key]);
  const lost=[...new Set(before[key])].filter(x=>!after[key].includes(x)&&!((m=>m&&after[key].includes(m))(MOVED_LINKS[file+'::'+x]||MOVED_LINKS[x]))&&!elsewhere.includes(x));
  if(lost.length)findings.push({file,type:'REFERENCES_DISPARUES_A_VERIFIER',element:key,valeurs:lost});
 }
}
// Vérifier aussi les exercices conservés dans le catalogue JavaScript.
const vm=require('node:vm');
const catalogPath='annales/catalogue-annales.js';
function catalogIds(source){
 const context={window:{}};vm.runInNewContext(source,context,{timeout:3000});
 return context.window.ANNALES_CATALOGUE||{};
}
if(fs.existsSync(path.join(root,catalogPath))){
 try{
  const old=catalogIds(readOld(catalogPath));
  const now=catalogIds(fs.readFileSync(path.join(root,catalogPath),'utf8'));
  for(const [id,exercise] of Object.entries(old)){
   if(!now[id]){findings.push({file:catalogPath,type:'EXERCICE_CATALOGUE_ABSENT',id});continue;}
   const before=(exercise.etapes||[]).map(x=>x.id);
   const after=new Set((now[id].etapes||[]).map(x=>x.id));
   const missing=before.filter(id=>!after.has(id));
   if(missing.length)findings.push({file:catalogPath,type:'ETAPES_DISPARUES',id,etapes:missing});
  }
 }catch(e){findings.push({file:catalogPath,type:'CATALOGUE_NON_VERIFIABLE',message:e.message});}
}
const result={reference:base,pagesComparees:files.filter(relevant).length,alertes:findings.length,findings};
console.log(JSON.stringify(result,null,2));
if(findings.length)process.exitCode=1;
