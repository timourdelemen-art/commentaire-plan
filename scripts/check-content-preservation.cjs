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
const getLinks=s=>[...s.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi)].map(m=>m[1]);
const relevant=p=>/(?:copie-20|corrig|modele|modèle|annale|exercice|entrainement|entraînement|dissertation|commentaire|explication|brevet|hlp)/i.test(p);
const signature=s=>({
 textareas:(s.match(/<textarea\b/gi)||[]).length,
 choiceButtons:(s.match(/data-choice\b|data-subj\b|data-level\b/gi)||[]).length,
 scripts:[...s.matchAll(/<script[^>]*src=["']([^"']+)["']/gi)].map(x=>x[1]).filter(x=>!/(?:site-nav|script\.js)/.test(x)),
 links:getLinks(s).filter(h=>relevant(h)&&!h.startsWith('http'))
});
const findings=[];
for(const file of files){
 if(!relevant(file))continue;
 const dest=path.join(root,file);
 if(!fs.existsSync(dest)){findings.push({file,type:'PAGE_ABSENTE'});continue;}
 const before=signature(readOld(file)),after=signature(fs.readFileSync(dest,'utf8'));
 for(const key of ['textareas','choiceButtons']){
  if(after[key]<before[key])findings.push({file,type:'COMPTEUR_EN_BAISSE',element:key,avant:before[key],apres:after[key]});
 }
 for(const key of ['scripts','links']){
  const lost=[...new Set(before[key])].filter(x=>!after[key].includes(x));
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
