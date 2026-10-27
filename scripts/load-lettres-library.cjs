'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
module.exports=function load(root){
 const sandbox={window:{}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'lettres-dissertation-data.js'),'utf8'),sandbox);
 const data=sandbox.window.LETTRES_CORPUS;
 const supplement=JSON.parse(fs.readFileSync(path.join(root,'scripts/cioran-cahiers-lettres.json'),'utf8'));
 const bank=JSON.parse(fs.readFileSync(path.join(root,'scripts/philo-banque-data.json'),'utf8'));
 data.works[supplement.work]=['Cioran','Cahiers 1957–1972','complement','Gallimard, édition numérique 2013, sans pagination fixe','',''];
 for(const entry of supplement.cards){
  const p=bank.entries.find(p=>p.id===entry.philoId);
  if(!p||p.author!=='Cioran'||p.work!=='Cahiers 1957–1972'||p.literaryUrl!=='bibliotheque-dissertation.html#'+p.id)throw Error('Double lecture sans citation commune : '+entry.philoId);
  data.cards.push({...entry,id:p.id,work:supplement.work,author:p.author,quote:p.quote,locator:p.locator,source:null,sourceType:'provided-epub',philoUrl:'philosophie-banque.html?fiche='+p.id});
 }
 return data;
};
