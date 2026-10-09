#!/usr/bin/env node
/* Inventaire statique de toutes les pages publiées : lecture seule des pages,
   écrit un rapport Markdown ; ne remplace pas les tests navigateur. */
const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const SKIP=new Set(['.git','node_modules','.netlify','worker']);
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 if(SKIP.has(e.name))continue;
 const full=path.join(dir,e.name);
 if(e.isDirectory())walk(full);
 else if(e.isFile()&&e.name.endsWith('.html'))files.push(full);
}}
walk(ROOT);
const rel=p=>path.relative(ROOT,p).split(path.sep).join('/');
const pages=new Map(files.map(p=>[rel(p),p]));
const errors=[],warnings=[];
const issue=(arr,p,reason)=>arr.push({page:p,reason});
const exists=p=>fs.existsSync(path.join(ROOT,p));
const decode=s=>{try{return decodeURIComponent(s)}catch{return s}};
function localTarget(from,url){
 if(!url||url.startsWith('#')||/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url))return null;
 let u;try{u=new URL(url,'https://local.invalid/'+from)}catch{return {invalid:true}};
 if(u.hostname!=='local.invalid')return null;
 let target=decode(u.pathname.replace(/^\//,''));
 if(!target||target.endsWith('/'))target+='index.html';
 return {target,hash:decode(u.hash.slice(1))};
}
for(const [page,file] of pages){
 const html=fs.readFileSync(file,'utf8');
 const ids=[...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]);
 const idSet=new Set(ids);
 for(const id of idSet)if(ids.filter(x=>x===id).length>1)issue(errors,page,'id dupliqué : '+id);
 const h1=(html.match(/<h1\b/gi)||[]).length;
 if(h1!==1)issue(warnings,page,'nombre de H1 : '+h1);
 const tags=[...html.matchAll(/<(a|script|link|img)\b[^>]*>/gi)];
 for(const m of tags){
  const tag=m[1].toLowerCase(),raw=m[0];
  const attr=tag==='a'?'href':tag==='script'?'src':tag==='img'?'src':'href';
  const v=raw.match(new RegExp('\\b'+attr+'\\s*=\\s*["\\x27]([^"\\x27]*)["\\x27]','i'));
  if(!v)continue;
  if(tag==='link'&&!/\brel\s*=\s*["'][^"']*(?:stylesheet|icon|manifest)[^"']*["']/i.test(raw))continue;
  if(tag==='a'&&v[1].startsWith('#')){
   const anchor=decode(v[1].slice(1));
   if(anchor&&!idSet.has(anchor))issue(warnings,page,'ancre locale non trouvée : #'+anchor);
   continue;
  }
  const target=localTarget(page,v[1]);
  if(!target)continue;
  if(target.invalid){issue(warnings,page,'URL locale invalide : '+v[1]);continue;}
  if(!exists(target.target))issue(errors,page,tag+' : fichier introuvable '+v[1]);
  else if(tag==='a'&&target.hash&&pages.has(target.target)){
   const other=fs.readFileSync(pages.get(target.target),'utf8');
   if(![...other.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].some(m=>m[1]===target.hash))
    issue(warnings,page,'ancre distante non trouvée : '+v[1]);
  }
 }
}
const limit=160;
let report='# Contrôle global des pages HTML\n\n';
report+='Pages analysées : **'+pages.size+'**  \nErreurs : **'+errors.length+'**  \nAvertissements : **'+warnings.length+'**\n\n';
report+='Ce contrôle statique inspecte les fichiers, liens locaux, ancres et identifiants HTML. Les ancres créées par JavaScript peuvent produire de faux positifs. Il ne vérifie ni les requêtes réseau, ni le rendu, ni la pédagogie.\n\n';
for(const [title,arr] of [['Erreurs',errors],['Avertissements',warnings]]){
 report+='## '+title+'\n\n';
 report+=(arr.length?arr.slice(0,limit).map(x=>'- `'+x.page+'` — '+x.reason).join('\n'):'Aucun problème détecté.')+'\n';
 if(arr.length>limit)report+='\n… '+(arr.length-limit)+' autres résultats omis.\n';
 report+='\n';
}
fs.writeFileSync(path.join(ROOT,'controle-global-report.md'),report);
console.log('Contrôle global : '+pages.size+' pages, '+errors.length+' erreurs, '+warnings.length+' avertissements. Voir controle-global-report.md.');
if(errors.length&&process.env.AUDIT_STRICT==='1')process.exitCode=1;
