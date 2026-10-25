#!/usr/bin/env node
// Inventaire non destructif des parcours pédagogiques. Ne confond pas une
// réponse modèle avec un véritable retour IA.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const files=fs.readdirSync(root).filter(x=>x.endsWith('.html')&&/^(bac-|commentaire-|philosophie-|brevet-|dissertation-philosophie)/.test(x));
const rows=[];
for(const file of files){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  const main=(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)||[])[1]||'';
  if(!main)continue;
  const title=(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[])[1]?.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()||file;
  const click=/<(?:button|input)\b|data-choice|data-level|type=["']radio|<select\b/i.test(main);
  const write=/<textarea\b|contenteditable|data-feedback-instruction|<input[^>]*type=["']text/i.test(main);
  const aiClaim=/\b(?:retour (?:personnalisé|de l.IA)|correction par l.IA|analyse par l.IA)\b/i.test(main);
  const scripts=[...html.matchAll(/<script[^>]+src=["']([^"']+)/g)].map(m=>m[1]);
  if(!click&&!write&&!aiClaim)continue;
  rows.push({file,title,clickableUi:click,writtenUi:write,aiClaim,scriptReferences:scripts,
    needsReview:(!click||!write||aiClaim)});
}
const summary={pagesExamined:files.length,exerciseCandidates:rows.length,
  clickableUi:rows.filter(x=>x.clickableUi).length,
  writtenUi:rows.filter(x=>x.writtenUi).length,
  aiClaimsToVerify:rows.filter(x=>x.aiClaim).length,
  candidatesForManualReview:rows.filter(x=>x.needsReview).length};
console.log(JSON.stringify({summary,rows},null,2));
