#!/usr/bin/env node
const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const DOMAIN='https://commentaire-plan.com';
const SKIP=new Set(['.git','node_modules','.netlify']);
function walk(d){const o=[];for(const e of fs.readdirSync(d,{withFileTypes:true})){if(SKIP.has(e.name))continue;const f=path.join(d,e.name);if(e.isDirectory())o.push(...walk(f));else if(e.isFile()&&e.name.endsWith('.html'))o.push(f);}return o;}
const files=walk(ROOT), byRel=new Map(files.map(f=>[path.relative(ROOT,f).split(path.sep).join('/'),f]));
const pages={}; const errors=[]; const warnings=[];
const PRIORITY=new Set([
  'index.html','bac.html','brevet.html','bac-commentaire.html','bac-dissertation.html','bac-oral.html',
  'commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-plan.html',
  'commentaire-bac-procedes-effets.html','commentaire-bac-introduction.html','commentaire-bac-transition.html',
  'commentaire-bac-conclusion.html','annales.html','manuel-procedes.html','pot-bouille.html'
]);
const COMMENTAIRE_CORE=/^(?:bac-commentaire(?:-[^/]*)?|commentaire-bac-[^/]+)\.html$/;
const strict=/^(index|bac|brevet|bac-commentaire|commentaire-bac-(methode|problematique|plan|procedes-effets|introduction|transition|conclusion)|manuel-procedes|annales|pot-bouille)\.html$/;
function stripHashQuery(x){return x.split('#')[0].split('?')[0];}
for(const [r,f] of byRel){
 const h=fs.readFileSync(f,'utf8');
 const title=(h.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]?.trim();
 const h1=(h.match(/<h1\b[^>]*>/gi)||[]).length;
 const desc=(h.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)||[])[1];
 const can=(h.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)||h.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical/i)||[])[1];
 const isNoindex=/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(h);
 if(!isNoindex && strict.test(r)){ if(!title)errors.push(r+': title manquant'); if(h1!==1)errors.push(r+': H1 attendu exactement une fois, trouvé '+h1); if(!desc)errors.push(r+': meta description manquante'); if(!can)errors.push(r+': canonical manquante');}
 else if(!isNoindex) {if(!title)warnings.push(r+': title manquant'); if(h1===0)warnings.push(r+': H1 manquant'); if(!can)warnings.push(r+': canonical manquante');}
 const links=[...h.matchAll(/<a\b[^>]+href=["']([^"'#][^"']*)["']/gi)].map(m=>m[1]);
 pages[r]={title:title||r,can,links,inbound:0,depth:Infinity,noindex:isNoindex};
}
for(const [r,p] of Object.entries(pages)){
 for(const raw of p.links){
  if(/^(?:https?:|mailto:|tel:|javascript:)/i.test(raw))continue;
  const clean=stripHashQuery(raw); if(!clean)continue;
  let target;
  if(clean.startsWith('/')) target=clean.slice(1)||'index.html';
  else target=path.posix.normalize(path.posix.join(path.posix.dirname(r),clean));
  if(target.endsWith('/')) target+= 'index.html';
  if(!target.endsWith('.html')) continue;
  if(pages[target]) pages[target].inbound++;
  else warnings.push(r+': lien local non résolu -> '+raw);
 }
}
if(pages['index.html']){
 pages['index.html'].depth=0; const q=['index.html'];
 while(q.length){const r=q.shift(),d=pages[r].depth;for(const raw of pages[r].links){if(/^(?:https?:|mailto:|tel:|javascript:|#)/i.test(raw))continue;let c=stripHashQuery(raw);if(!c)continue;let t=c.startsWith('/')?c.slice(1)||'index.html':path.posix.normalize(path.posix.join(path.posix.dirname(r),c));if(t.endsWith('/'))t+='index.html';if(pages[t]&&pages[t].depth>d+1){pages[t].depth=d+1;q.push(t);}}}
}
const canonSeen=new Map();
for(const [r,p] of Object.entries(pages)){
 if(p.noindex) continue;
 if(p.can){
   let absCan;
   try{absCan=new URL(p.can, DOMAIN+'/'+r).href;}catch(e){absCan=p.can;}
   if(!absCan.startsWith(DOMAIN+'/'))warnings.push(r+': canonical hors domaine '+p.can);
   if(canonSeen.has(absCan))errors.push('canonical dupliquée: '+absCan+' ('+canonSeen.get(absCan)+', '+r+')'); else canonSeen.set(absCan,r);
 }
 if(p.inbound===0&&r!=='index.html')warnings.push(r+': aucune liaison interne entrante détectée');
 if(Number.isFinite(p.depth)&&p.depth>3)warnings.push(r+': profondeur '+p.depth+' clics');
 if(PRIORITY.has(r)){
   if(p.inbound<1 && r!=='index.html')errors.push(r+': page prioritaire orpheline ('+p.inbound+' lien entrant)');
   if(!Number.isFinite(p.depth) || p.depth>3)errors.push(r+': page prioritaire trop profonde ('+(Number.isFinite(p.depth)?p.depth:'inconnue')+')');
 }
 if(COMMENTAIRE_CORE.test(r)){
   const source=fs.readFileSync(byRel.get(r),'utf8');
   if(/\bsolution(?:s)? nécessaire(?:s)?\b/i.test(source) || /NÉCESSITÉ DE LA SOLUTION/i.test(source) || /employer SOLUTION/i.test(source)){
     errors.push(r+': ancienne terminologie « solution » détectée — employer « réponse »');
   }
 }
}
const terminologyFiles=['annales/catalogue-annales.js','annales/entrainement-annale.js'];
for(const r of terminologyFiles){
  const f=path.join(ROOT,r);
  if(!fs.existsSync(f)) continue;
  const source=fs.readFileSync(f,'utf8');
  if(/\bsolution(?:s)? nécessaire(?:s)?\b/i.test(source) || /NÉCESSITÉ DE LA SOLUTION/i.test(source) || /employer SOLUTION/i.test(source)){
    errors.push(r+': ancienne terminologie « solution » détectée — employer « réponse »');
  }
}
const ranked=Object.entries(pages).sort((a,b)=>b[1].inbound-a[1].inbound).slice(0,20);
const low=Object.entries(pages).filter(([r,p])=>r!=='index.html'&&!p.noindex&&p.inbound<2).sort((a,b)=>a[1].inbound-b[1].inbound).slice(0,40);
let md='# Rapport SEO interne\n\n';
md+='Pages analysées : **'+files.length+'**  \nErreurs : **'+errors.length+'**  \nAvertissements : **'+warnings.length+'**\n\n';
md+='## Pages les plus soutenues\n\n| Page | Liens entrants | Profondeur |\n|---|---:|---:|\n'+ranked.map(([r,p])=>'| '+r+' | '+p.inbound+' | '+(Number.isFinite(p.depth)?p.depth:'—')+' |').join('\n')+'\n\n';
md+='## Pages à renforcer\n\n'+low.map(([r,p])=>'- '+r+' — '+p.inbound+' lien(s) entrant(s), profondeur '+(Number.isFinite(p.depth)?p.depth:'inconnue')).join('\n')+'\n\n';
if(errors.length) md+='## Erreurs\n\n'+errors.map(x=>'- '+x).join('\n')+'\n\n';
if(warnings.length) md+='## Avertissements\n\n'+warnings.slice(0,120).map(x=>'- '+x).join('\n')+'\n';
fs.writeFileSync(path.join(ROOT,'seo-report.md'),md);
console.log(md);
if(errors.length){console.error('\nSEO audit found '+errors.length+' issue(s). Deployment is not blocked; review seo-report.md.');}
