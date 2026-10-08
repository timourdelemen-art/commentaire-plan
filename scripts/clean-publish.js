#!/usr/bin/env node
/* Dernière étape du build Netlify : retire du site publié tout ce qui n'est pas destiné au public
   (notes de travail .md, théorie, audits, code du worker, scripts de build et leurs données).
   Ne s'exécute QUE sur Netlify (variable NETLIFY=true) : en local, il ne supprime rien. */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
if(process.env.NETLIFY!=='true'){ console.log('clean-publish : hors Netlify, rien supprimé.'); process.exit(0); }
let n=0;
const walk=d=>{ for(const e of fs.readdirSync(d,{withFileTypes:true})){
  const p=path.join(d,e.name);
  if(e.isDirectory()){ if(e.name==='node_modules'||e.name==='.git') continue; walk(p); }
  else if(/\.md$/i.test(e.name)){ fs.unlinkSync(p); n++; }
}};
walk(ROOT);
for(const d of ['worker','scripts']){ const p=path.join(ROOT,d); if(fs.existsSync(p)){ fs.rmSync(p,{recursive:true,force:true}); n++; } }
console.log(`clean-publish : ${n} fichiers ou dossiers retirés du site publié.`);
