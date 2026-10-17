#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(__dirname,'philo-banque-data.json'),'utf8'));
const provenance=JSON.parse(fs.readFileSync(path.join(__dirname,'philo-banque-provenance.json'),'utf8'));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const {excerptQuote,displayQuote,quoteNote}=require('../philosophie-banque.js');
const ids=new Set(),functions=['Le problème','L’affirmation','Les concepts','La raison','L’exemple','La portée'];
for(const e of data.entries){
 if(ids.has(e.id))throw Error('ID doublon : '+e.id);ids.add(e.id);
 excerptQuote(e); // Every displayed segment must occur in source order, without changing a word.
 for(const k of ['id','author','work','locator','title','edition','editionYear','quote'])if(!e[k])throw Error(e.id+': '+k+' manquant');
 if(e.author==='Cioran'&&(e.originalLanguage!=='français'||e.authorRole!=='Écrivain et penseur'))throw Error(e.id+': langue originale et statut requis');
 if(e.commentary.length!==6||e.commentary.some((c,i)=>c.function!==functions[i]||!c.sentence))throw Error(e.id+': six fonctions complètes requises');
 if(e.verse&&(!['Baudelaire','Racine','Corneille','La Fontaine'].includes(e.author)||e.quote.split('\n').length>2))throw Error(e.id+': un ou deux vers requis');
 if(['Racine','Corneille','La Fontaine'].includes(e.author)&&(!e.speaker||!e.situation||e.situation.split(/\s+/).length>22))throw Error(e.id+': situation dramatique brève requise');
 if(e.quoteSource&&(!/^https:\/\/pedagogie\.ac-montpellier\.fr\/sites\/default\/files\/ressources\/Sujets-textes-philo-1996-2026\.pdf#page=[1-9][0-9]*$/.test(e.quoteSource)||!e.quoteSourceLabel))throw Error(e.id+': source du texte non documentée');
 if(e.uses.length<1||e.uses.length>3)throw Error(e.id+': un à trois sujets requis');
 for(const u of e.uses){
  if(!u.subject||!u.function||!u.reason||!/^https:\/\/(?:www\.)?(?:education\.gouv\.fr|pedagogie\.ac-montpellier\.fr)\//.test(u.source))throw Error(e.id+': usage non documenté');
  if(u.a20&&(!/^philosophie-[a-z0-9-]+\.html$/.test(u.a20)||!fs.existsSync(path.join(root,u.a20))))throw Error(e.id+': copie A20 introuvable');
 }
 const p=provenance.entries.find(p=>p.id===e.id);
 if(!p?.quotation_verified||p.quote_sha256!==crypto.createHash('sha256').update(e.quote).digest('hex'))throw Error(e.id+': citation différente du relevé contrôlé');
}
for(const target of Object.values(data.legacyIds))if(target&&!ids.has(target))throw Error('Ancien lien sans destination : '+target);
const catalogue=data.entries.map(e=>'<details id="citation-'+esc(e.id)+'"><summary>'+esc(e.author)+' · '+esc(e.title)+'</summary><blockquote><strong'+(e.verse?' class="bank-verse"':'')+'>« '+esc(displayQuote(e)).replace(/(\S+)$/,'<span class="bank-nobr">$1 »</span>')+'</strong></blockquote><p><cite>'+esc(e.work)+'</cite>'+(e.collection?' · <cite>'+esc(e.collection)+'</cite>':'')+' · '+esc(e.locator)+(e.speaker?' · '+esc(e.speaker)+' parle':'')+(e.authorRole?' · '+esc(e.authorRole):'')+'</p>'+(e.situation?'<p class="bank-situation">'+esc(e.situation)+'</p>':'')+'<p>'+esc(e.edition)+', '+esc(e.publisher)+', '+esc(e.editionYear)+(e.originalLanguage?' · Texte original '+esc(e.originalLanguage):e.translator?' · Traduction : '+esc(e.translator):' · Traduction individuelle à préciser')+'.'+(e.editionNote?' '+esc(e.editionNote):'')+(quoteNote(e)?' '+esc(quoteNote(e)):'')+'</p>'+(e.quoteSource?'<p class="bank-source"><a href="'+esc(e.quoteSource)+'">'+esc(e.quoteSourceLabel)+'</a></p>':'')+'<h3>Dissertation</h3>'+e.uses.map(u=>'<h4>'+esc(u.subject)+'</h4><p><strong>'+esc(u.function)+'.</strong> '+esc(u.reason)+'</p><p><a href="'+esc(u.source)+'">'+esc(u.sourceLabel)+'</a>'+(u.a20?' · <a href="'+esc(u.a20)+'">Copie A20 · '+esc(u.a20Step)+'</a> — insertion possible':'')+'</p>').join('')+'<h3>Commentaire</h3>'+e.commentary.map(c=>'<p><small>'+esc(c.function)+'</small><br>'+esc(c.sentence)+'</p>').join('')+'</details>').join('\n');
const pagePath=path.join(root,'philosophie-banque.html');let page=fs.readFileSync(pagePath,'utf8');
for(const [key,value] of Object.entries({COUNTS:'<p class="bank-intro-meta">'+data.entries.length+' citations · '+[...new Set(data.entries.map(e=>e.author))].join(', ')+' · Deux lectures : dissertation et commentaire.</p>',CATALOGUE:catalogue})){
 const re=new RegExp('<!-- BANK_'+key+'_START -->[\\s\\S]*?<!-- BANK_'+key+'_END -->');
 if(!re.test(page))throw Error('Emplacement HTML manquant : '+key);
 page=page.replace(re,'<!-- BANK_'+key+'_START -->\n'+value+'\n<!-- BANK_'+key+'_END -->');
}
for(const [dest,out] of [[path.join(root,'philosophie-banque-data.js'),'window.PHILO_BANQUE='+JSON.stringify(data)+';\n'],[pagePath,page]]){
 if(process.argv.includes('--check')){if(fs.readFileSync(dest,'utf8')!==out)throw Error('Génération périmée : '+path.basename(dest));}else fs.writeFileSync(dest,out);
}
console.log(data.entries.length+' citations ; '+data.entries.reduce((n,e)=>n+e.uses.length,0)+' usages ; commentaires et catalogue à jour.');
