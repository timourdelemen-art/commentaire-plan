#!/usr/bin/env node
/* Bloque un déploiement lorsque les pages servies contiennent une copie A20
   périmée au lieu de la dissertation V16 corrigée. À exécuter après les
   constructeurs des annales, des notions et des pages autonomes. */
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const {load,check}=require('./dissertations-v16');
const C20=require('./philo-copie20');
const sources=load();
const pages=fs.readdirSync(ROOT)
  .filter(name=>name.endsWith('.html'))
  .map(name=>({name,html:fs.readFileSync(path.join(ROOT,name),'utf8')}));
const errors=[];
let passed=0;
for(const [id,d] of Object.entries(sources)){
  const issues=check(d);
  if(issues.length){errors.push(...issues);continue;}
  const expectedH2=C20.renderCopy(d.copy,'h2');
  const expectedH3=C20.renderCopy(d.copy,'h3');
  const matched=pages.find(p=>p.html.includes(expectedH2)||p.html.includes(expectedH3));
  if(!matched)errors.push(id+': aucune page publique ne contient la copie V16 intégrale et exacte');
  else passed++;
}
if(errors.length){
  console.error('Synchronisation V16/pages publiques échouée :\n'+errors.join('\n'));
  process.exitCode=1;
}else console.log('V16 publication : '+passed+' copies corrigées trouvées intégralement dans les pages générées.');
