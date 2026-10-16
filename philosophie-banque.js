/* Citations : un sens expliqué et des emplois argumentatifs précis. */
(function(root){
'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
const words=s=>norm(s).split(' ').filter(Boolean);
function select(entries,{query='',author='',notion='',subject=''}={}){
 const q=words(query);
 return entries.filter(e=>(!author||e.author===author)&&(!notion||e.notions.includes(notion))&&(!subject||e.uses.some(u=>norm(u.subject)===norm(subject)))&&q.every(w=>norm([e.title,e.quote,e.author,e.work,e.collection,e.locator,e.speaker,e.situation,...e.commentary.map(c=>c.sentence),...e.uses.flatMap(u=>[u.subject,u.function,u.reason])].join(' ')).includes(w)));
}
function resolveId(data,id){return Object.hasOwn(data.legacyIds,id)?data.legacyIds[id]:id;}
const api={norm,words,select,resolveId};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.PhiloBanque=api;
if(typeof document==='undefined'||!root.PHILO_BANQUE)return;
const data=root.PHILO_BANQUE,$=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const phrase=s=>esc(s).replace(/(\S+) ([?!])$/,'<span class="bank-nobr">$1 $2</span>');
const safeHref=s=>/^(?:https:\/\/(?:www\.)?(?:education\.gouv\.fr|pedagogie\.ac-montpellier\.fr)\/|philosophie-[a-z0-9-]+\.html$)/.test(s)?esc(s):'';
const names={art:'L’art',bonheur:'Le bonheur',conscience:'La conscience',devoir:'Le devoir',etat:'L’État',inconscient:'L’inconscient',justice:'La justice',langage:'Le langage',liberte:'La liberté',nature:'La nature',raison:'La raison',religion:'La religion',science:'La science',technique:'La technique',temps:'Le temps',travail:'Le travail',verite:'La vérité'};
let selected='',annotated=true,matches=[];const fields=['query','author','notion','subject'];
function syncURL(){const p=new URLSearchParams();for(const k of fields)if($(k).value)p.set(k,$(k).value);if(selected)p.set('fiche',selected);history.replaceState(null,'',location.pathname+(p.size?'?'+p.toString():''));}
function renderReader(e){
 $('bank-reader').hidden=false;
 $('bank-reference').innerHTML='<p class="bank-kicker">'+esc(e.author)+(e.authorRole?' · '+esc(e.authorRole):'')+(e.speaker?' · '+esc(e.speaker)+' parle':'')+'</p><h2 id="reader-title">'+esc(e.title)+'</h2><blockquote class="bank-quote"><p><strong'+(e.verse?' class="bank-verse"':'')+'>« '+esc(e.quote).replace(/(\S+)$/,'<span class="bank-nobr">$1 »</span>')+'</strong></p></blockquote><p class="bank-work"><cite>'+esc(e.work)+'</cite>'+(e.collection?' · <cite>'+esc(e.collection)+'</cite>':'')+' · '+esc(e.locator)+'</p>'+(e.situation?'<p class="bank-situation">'+esc(e.situation)+'</p>':'')+'<details class="bank-edition"><summary>L’édition de cette citation</summary><p>'+esc(e.edition)+', '+esc(e.publisher)+', '+esc(e.editionYear)+'.<br>'+(e.originalLanguage?'Texte original '+esc(e.originalLanguage):'Traduction : '+esc(e.translator||'attribution individuelle à préciser dans cette édition'))+'.'+(e.editionNote?'<br>'+esc(e.editionNote):'')+'</p></details>'+(e.quoteSource?'<p class="bank-source"><a href="'+safeHref(e.quoteSource)+'" target="_blank" rel="noopener">'+esc(e.quoteSourceLabel)+' ↗</a></p>':'');
 $('bank-dissertation').innerHTML='<div class="bank-section-head"><span class="bank-number" aria-hidden="true">01</span><div><h3>Dissertation</h3><p>Ce que cette phrase peut faire dans votre raisonnement.</p></div></div><div class="bank-uses">'+e.uses.map(u=>'<article class="bank-use"><h4>'+phrase(u.subject)+'</h4><p><strong>'+esc(u.function)+'.</strong> '+esc(u.reason)+'</p><div class="bank-source"><a href="'+safeHref(u.source)+'" target="_blank" rel="noopener">'+esc(u.sourceLabel)+' ↗</a>'+(u.a20?' · <a href="'+safeHref(u.a20)+'">Voir la copie A20 · '+esc(u.a20Step)+' →</a>':'')+'</div>'+(u.a20?'<p class="bank-a20-note">Une insertion possible dans cette copie.</p>':'')+'</article>').join('')+'</div><p class="bank-note">La fonction dépend de l’argument que vous construisez, pas seulement du thème du sujet.</p>';
 $('bank-commentary').innerHTML='<div class="bank-section-head"><span class="bank-number" aria-hidden="true">02</span><div><h3>Commentaire</h3><p>Comprendre la phrase, ses raisons et sa portée.</p></div></div><button type="button" id="toggle-functions" class="bank-text-button" aria-pressed="'+annotated+'" aria-controls="bank-paragraph">'+(annotated?'Lire sans les fonctions':'Voir la fonction des phrases')+'</button><p id="bank-paragraph" class="bank-paragraph'+(annotated?' is-annotated':'')+'">'+e.commentary.map(c=>'<span class="bank-sentence"><span class="bank-function">'+esc(c.function)+'</span><span class="bank-sentence-text">'+phrase(c.sentence)+'</span></span> ').join('')+'</p><p class="bank-note">Dans une explication de texte, adaptez cette lecture au rôle de la phrase dans le passage étudié.</p>';
 $('toggle-functions').onclick=()=>{annotated=!annotated;$('bank-paragraph').classList.toggle('is-annotated',annotated);$('toggle-functions').setAttribute('aria-pressed',String(annotated));$('toggle-functions').textContent=annotated?'Lire sans les fonctions':'Voir la fonction des phrases';};
}
function open(id,focus=true){
 const actual=resolveId(data,id),e=data.entries.find(e=>e.id===actual);
 if(!e){$('bank-message').textContent='Cette ancienne fiche a été retirée. Choisissez une citation dans le nouveau recueil.';return;}
 selected=e.id;$('bank-message').textContent='';renderReader(e);syncURL();document.querySelectorAll('[data-open]').forEach(a=>{if(a.dataset.open===selected)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
 if(focus){$('reader-title').setAttribute('tabindex','-1');$('reader-title').focus({preventScroll:true});$('bank-reader').scrollIntoView({behavior:'smooth',block:'start'});}
}
function render(){
 matches=select(data.entries,Object.fromEntries(fields.map(k=>[k,$(k).value])));
 $('bank-status').textContent=matches.length+' citation'+(matches.length>1?'s':'')+(matches.length===1?' trouvée.':' trouvées.');
 $('bank-results').innerHTML=matches.length?matches.map(e=>'<article class="bank-card"><p class="bank-kicker">'+esc(e.author)+'</p><h3><a href="?fiche='+esc(e.id)+'" data-open="'+esc(e.id)+'"'+(e.id===selected?' aria-current="true"':'')+'>'+esc(e.title)+'</a></h3><p class="bank-preview'+(e.verse?' bank-verse':'')+'">« '+esc(e.quote)+' »</p><p class="bank-card-reference"><cite>'+esc(e.work)+'</cite> · '+esc(e.locator)+'</p><span class="bank-read" aria-hidden="true">Lire la fiche →</span></article>').join(''):'<p class="bank-empty">Aucune citation pour ces critères. Retirez un filtre ou choisissez une autre formulation.</p>';
 document.querySelectorAll('[data-open]').forEach(a=>a.onclick=ev=>{if(ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey)return;ev.preventDefault();open(a.dataset.open);});
 if(selected&&!matches.some(e=>e.id===selected)){selected='';$('bank-reader').hidden=true;}syncURL();
}
for(const a of [...new Set(data.entries.map(e=>e.author))])$('author').add(new Option(a,a));
for(const [k,v] of Object.entries(names))if(data.entries.some(e=>e.notions.includes(k)))$('notion').add(new Option(v,k));
for(const s of [...new Set(data.entries.flatMap(e=>e.uses.map(u=>u.subject)))].sort((a,b)=>a.localeCompare(b,'fr')))$('subject').add(new Option(s,s));
const initial=new URLSearchParams(location.search);
for(const k of fields){const v=initial.get(k);if(v)$(k).value=v;$(k).addEventListener(k==='query'?'input':'change',render);}
$('bank-reset').onclick=()=>{for(const k of fields)$(k).value='';$('bank-message').textContent='';render();};
$('bank-close').onclick=()=>{selected='';$('bank-reader').hidden=true;syncURL();$('find-title').setAttribute('tabindex','-1');$('find-title').focus();};
$('bank-controls').hidden=false;document.documentElement.classList.add('bank-ready');render();if(initial.get('fiche'))open(initial.get('fiche'),false);
})(typeof window==='undefined'?globalThis:window);
