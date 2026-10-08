#!/usr/bin/env node
/* Typographie française dans le texte visible des pages de philosophie :
   espace insécable avant ; : ? ! » et après «. Ne touche ni aux balises, ni aux scripts, ni aux styles. Idempotent. */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const NB=' ';
const fix=t=>t.replace(/ ([;:?!»])/g,NB+'$1').replace(/« /g,'«'+NB);
let n=0;
for(const f of fs.readdirSync(ROOT).filter(f=>/^philosophie.*\.html$/.test(f))){
  const p=path.join(ROOT,f); const s=fs.readFileSync(p,'utf8');
  const a=s.indexOf('<main'), b=s.indexOf('</main>'); if(a<0||b<0) continue;
  let main=s.slice(a,b);
  /* découpe : blocs à laisser intacts, puis balises / texte */
  main=main.replace(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<textarea[\s\S]*?<\/textarea>)|(<[^>]+>)|([^<]+)/g,(m,keep,tag,text)=>keep||tag||fix(text));
  const out=s.slice(0,a)+main+s.slice(b);
  if(out!==s){fs.writeFileSync(p,out);n++;}
}
console.log(`Typographie : ${n} pages corrigées.`);
