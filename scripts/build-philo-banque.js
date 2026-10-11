#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'philo-banque-data.json'),'utf8'));
const ids=new Set;for(const e of data.entries){if(ids.has(e.id))throw Error('ID doublon');ids.add(e.id);for(const k of ['id','author','work','locator','title','edition','editionYear','translator','explanation','distinction'])if(!e[k])throw Error(e.id+': '+k+' manquant');if(e.text||e.quotations.length)throw Error('Reproduction non validée : '+e.id);if(e.author==='Hegel')throw Error('Hegel attend les textes choisis par le propriétaire.');}
const out='window.PHILO_BANQUE='+JSON.stringify(data)+';\n';const dest=path.join(root,'philosophie-banque-data.js');
if(process.argv.includes('--check')){if(fs.readFileSync(dest,'utf8')!==out)throw Error('Données publiques périmées');}else fs.writeFileSync(dest,out);
console.log(data.entries.length+' références commentées ; zéro citation prétendue vérifiée.');
