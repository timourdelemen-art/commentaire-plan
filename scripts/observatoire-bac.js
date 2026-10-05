#!/usr/bin/env node
const fs=require('fs'), path=require('path'), vm=require('vm');
const ROOT=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(ROOT,'annales/catalogue-annales.js'),'utf8');
const sandbox={window:{}};vm.createContext(sandbox);vm.runInContext(src,sandbox);
const cat=sandbox.window.ANNALES_CATALOGUE||{};
const rows=Object.entries(cat).map(([id,x])=>({id,examen:x.examen,type:x.type,annee:x.annee,zone:x.zone,serie:x.serie,epreuve:x.epreuve,auteur:x.auteur,oeuvre:x.oeuvre,access:x.access}));
const bac=rows.filter(x=>x.examen==='Bac');
const countBy=k=>Object.fromEntries(Object.entries(bac.reduce((a,x)=>(a[x[k]||'Non renseigné']=(a[x[k]||'Non renseigné']||0)+1,a),{})).sort((a,b)=>b[1]-a[1]));
const out={generatedAt:new Date().toISOString(),totalAnnales:rows.length,totalBac:bac.length,byYear:countBy('annee'),byAuthor:countBy('auteur'),byZone:countBy('zone'),byAccess:countBy('access')};
fs.mkdirSync(path.join(ROOT,'data'),{recursive:true});fs.writeFileSync(path.join(ROOT,'data/observatoire-bac.json'),JSON.stringify(out,null,2));
let md='# Observatoire du Bac — données internes\n\n';
md+=`Annales indexées : **${rows.length}** · Bac : **${bac.length}**\n\n`;
md+='## Par année\n\n'+Object.entries(out.byYear).map(([k,v])=>`- ${k} : ${v}`).join('\n')+'\n\n';
md+='## Auteurs les plus présents dans le corpus actuel\n\n'+Object.entries(out.byAuthor).slice(0,20).map(([k,v])=>`- ${k} : ${v}`).join('\n')+'\n';
fs.writeFileSync(path.join(ROOT,'observatoire-bac-report.md'),md);
console.log(`Observatoire: ${rows.length} annales structurées.`);
