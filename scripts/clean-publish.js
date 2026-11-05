#!/usr/bin/env node
/* Dernière étape du build Netlify : retire du site publié tout ce qui n'est pas destiné au public
   (notes de travail .md, théorie, audits, code du worker, scripts de build et leurs données).
   Ne s'exécute QUE sur Netlify (variable NETLIFY=true) : en local, il ne supprime rien. */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
if(process.env.NETLIFY!=='true'){ console.log('clean-publish : hors Netlify, rien supprimé.'); process.exit(0); }
let n=0;

/* Fermeture temporaire de la bibliothèque de philosophie (interrupteur : scripts/acces-reserve.json).
   Les fichiers ne sont retirés que du site publié : ils restent intacts dans le dépôt.
   Une adresse retirée mène à la page de pause (302, temporaire) ; le fichier de données renvoie 404. */
const reserve=JSON.parse(fs.readFileSync(path.join(__dirname,'acces-reserve.json'),'utf8'));
const PAUSE='bibliotheque-philosophie-pause.html';
if(reserve['bibliotheque-philosophie']===true){
  for(const f of ['philosophie-banque.html','philosophie-banque-data.js']){
    const p=path.join(ROOT,f); if(fs.existsSync(p)){ fs.unlinkSync(p); n++; }
  }
  const rules=['/philosophie-banque.html  /'+PAUSE+'  302!','/philosophie-banque  /'+PAUSE+'  302!'].join('\n');
  const red=path.join(ROOT,'_redirects');
  fs.writeFileSync(red,rules+'\n'+(fs.existsSync(red)?fs.readFileSync(red,'utf8'):''));
  const sm=path.join(ROOT,'sitemap.xml');
  if(fs.existsSync(sm)) fs.writeFileSync(sm,fs.readFileSync(sm,'utf8').replace(/\s*<url>\s*<loc>[^<]*\/philosophie-banque\.html<\/loc>[\s\S]*?<\/url>/g,''));
  console.log('clean-publish : bibliothèque de philosophie fermée (page de pause active).');
}else{
  const p=path.join(ROOT,PAUSE); if(fs.existsSync(p)){ fs.unlinkSync(p); n++; }
  const sm=path.join(ROOT,'sitemap.xml');
  if(fs.existsSync(sm)) fs.writeFileSync(sm,fs.readFileSync(sm,'utf8').replace(/\s*<url>\s*<loc>[^<]*\/bibliotheque-philosophie-pause\.html<\/loc>[\s\S]*?<\/url>/g,''));
}

const walk=d=>{ for(const e of fs.readdirSync(d,{withFileTypes:true})){
  const p=path.join(d,e.name);
  if(e.isDirectory()){ if(e.name==='node_modules'||e.name==='.git') continue; walk(p); }
  else if(/\.md$/i.test(e.name)){ fs.unlinkSync(p); n++; }
}};
walk(ROOT);
for(const d of ['worker','scripts']){ const p=path.join(ROOT,d); if(fs.existsSync(p)){ fs.rmSync(p,{recursive:true,force:true}); n++; } }
console.log(`clean-publish : ${n} fichiers ou dossiers retirés du site publié.`);
