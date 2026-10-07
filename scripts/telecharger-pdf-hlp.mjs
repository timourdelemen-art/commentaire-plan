#!/usr/bin/env node
/* Télécharge une copie de chaque sujet HLP dans annales/hlp/<id>.pdf,
   pour que le site ne dépende plus des sites qui hébergent les PDF.
   À lancer sur votre ordinateur, à la racine du dépôt :
     node scripts/telecharger-pdf-hlp.mjs
   puis : node scripts/build-hlp.js, et publier (git add annales/hlp *.html ; commit ; push).
   Les PDF déjà présents ne sont pas retéléchargés. Les sujets relevés dans la banque
   indexée de Lille (bank:1) sont ignorés : ce n'est pas un PDF propre au sujet. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const OUT=path.join(ROOT,'annales','hlp');
fs.mkdirSync(OUT,{recursive:true});
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(ROOT,'hlp-annales-data.js'),'utf8'),ctx);
const items=ctx.window.HLP_ANNALES.filter(x=>!x.bank && /\.pdf$|\/download$/.test(x.pdf));

let ok=0, skip=0, fail=0;
for(const x of items){
  const dest=path.join(OUT,x.id+'.pdf');
  if(fs.existsSync(dest)){ skip++; continue; }
  try{
    const res=await fetch(x.pdf,{redirect:'follow',headers:{'User-Agent':'Mozilla/5.0 (commentaire-plan.com, archivage des annales)'}});
    const buf=Buffer.from(await res.arrayBuffer());
    if(!res.ok || buf.subarray(0,4).toString()!=='%PDF') throw new Error('réponse '+res.status+' non PDF');
    fs.writeFileSync(dest,buf);
    ok++; console.log('✓',x.id);
  }catch(e){ fail++; console.log('✗',x.id,'—',e.message,'—',x.pdf); }
}
console.log(`\n${ok} téléchargés, ${skip} déjà présents, ${fail} échecs. Lancez ensuite : node scripts/build-hlp.js`);
