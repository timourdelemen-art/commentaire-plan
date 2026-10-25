#!/usr/bin/env node
// Inventaire non destructif des parcours pédagogiques. Ne confond pas une
// réponse modèle avec un véritable retour IA.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(ent=>{
    if(['.git','node_modules','.netlify'].includes(ent.name))return [];
    const full=path.join(dir,ent.name);
    if(ent.isDirectory())return walk(full);
    return ent.isFile()&&ent.name.endsWith('.html')?[full]:[];
  });
}
const files=walk(root).filter(x=>/^(bac-|commentaire-|philosophie-|brevet-|dissertation-philosophie|hlp-|entrainement-annale)/.test(path.basename(x)));
const rows=[];
for(const file of files){
  const html=fs.readFileSync(file,'utf8');
  const main=(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)||[])[1]||'';
  if(!main)continue;
  const title=(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[])[1]?.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()||file;
  const click=/<(?:button|input)\b|data-choice|data-level|type=["']radio|<select\b/i.test(main);
  const write=/<textarea\b|contenteditable|data-feedback-instruction|<input[^>]*type=["']text/i.test(main);
  const aiClaim=/\b(?:retour (?:personnalisé|de l.IA)|correction par l.IA|analyse par l.IA)\b/i.test(main);
  const scripts=[...html.matchAll(/<script[^>]+src=["']([^"']+)/g)].map(m=>m[1]);
  if(!click&&!write&&!aiClaim)continue;
  rows.push({file:path.relative(root,file).split(path.sep).join('/'),title,clickableUi:click,writtenUi:write,aiClaim,scriptReferences:scripts,
    needsReview:(!click||!write||aiClaim)});
}
const summary={pagesExamined:files.length,exerciseCandidates:rows.length,
  clickableUi:rows.filter(x=>x.clickableUi).length,
  writtenUi:rows.filter(x=>x.writtenUi).length,
  aiClaimsToVerify:rows.filter(x=>x.aiClaim).length,
  candidatesForManualReview:rows.filter(x=>x.needsReview).length};
console.log(JSON.stringify({summary,rows},null,2));
