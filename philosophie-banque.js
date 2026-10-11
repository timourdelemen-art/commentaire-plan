/* Banque de références : suggestions explicables, jamais de note automatique. */
(function(root){
'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
const words=s=>norm(s).split(' ').filter(w=>w.length>3);
function select(entries,{query='',author='',notion='',subject='',argument='',function:fn=''}={}){
 const q=words(query),args=new Set(words(argument));
 return entries.filter(e=>(!author||e.author===author)&&(!notion||e.notions.includes(notion))&&q.every(w=>norm([e.title,e.work,e.author,e.problem,e.explanation,e.distinction].join(' ')).includes(w))).map(e=>{
  const eligible=e.uses.filter(u=>(!fn||u.function===fn)&&(!subject||norm(u.subject)===norm(subject)));
  const ranked=eligible.map(u=>({use:u,hits:u.keywords.filter(w=>args.has(norm(w)))})).filter(x=>!argument||x.hits.length).sort((a,b)=>b.hits.length-a.hits.length);
  return {entry:e,use:ranked[0]?.use||null,hits:ranked[0]?.hits||[]};
 }).filter(x=>(!subject&&!fn&&!argument)||x.use).sort((a,b)=>b.hits.length-a.hits.length||a.entry.id.localeCompare(b.entry.id));
}
const key=(id,level)=>'philo-banque:v1:'+id+':'+level;
const api={norm,words,select,key};if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.PhiloBanque=api;
if(typeof document==='undefined')return;
const data=root.PHILO_BANQUE; if(!data)return;
const $=id=>document.getElementById(id),esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selected='',level=1;
const params=new URLSearchParams(location.search);
const sourceState=$('bank-status');
function storeDraft(){const el=$('bank-draft');if(!el)return;try{localStorage.setItem(key(selected,level),el.value);$('draft-state').textContent='Brouillon enregistré dans ce navigateur.';}catch(_){$('draft-state').textContent='La sauvegarde est indisponible. Conservez votre réponse avant de quitter la page.';}}
function readDraft(){try{return localStorage.getItem(key(selected,level))||'';}catch(_){return '';}}
function exercise(e){
 const task=level===1?'Choisissez la lecture la plus précise, puis justifiez-la en une phrase.':level===2?e.exercise.prompt:'Rédigez en six à huit phrases une explication du problème et du raisonnement de ce passage. Précisez une limite de son emploi en dissertation.';
 $('bank-exercise').innerHTML='<h3>Expliquer cette référence</h3><div class="bank-levels" role="group" aria-label="Niveau">'+[1,2,3].map(n=>'<button type="button" data-level="'+n+'" aria-pressed="'+(level===n)+'">Niveau '+n+' · '+['au clic','j’écris un peu','j’écris tout'][n-1]+'</button>').join('')+'</div><p>'+esc(task)+'</p>'+(level===1?'<div class="bank-choices">'+['Distinguer '+e.distinction+'.',e.misreading,'Repérer une idée utile sans préciser encore sa portée.'].map((t,i)=>'<button type="button" data-choice="'+i+'">'+esc(t)+'</button>').join('')+'<p id="choice-result" role="status"></p>':'')+'<label for="bank-draft">Votre réponse</label><textarea id="bank-draft" rows="6" data-sans-feedback="true" data-sans-dictee="true"></textarea><p id="draft-state" class="bank-muted" role="status"></p>'+(level<3?'<details><summary>Un indice</summary><p>'+esc(e.exercise.hint)+'</p></details>':'')+'<details><summary>Comparer avec une explication</summary><p>'+esc(e.exercise.model)+'</p><ul>'+e.exercise.checklist.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul><p>Cette proposition est une explication du site ; elle ne remplace pas la lecture du passage référencé.</p></details><div class="bank-actions"><button type="button" id="restart">Recommencer ce niveau</button><button type="button" id="erase">Effacer ce brouillon</button><button type="button" id="another">Travailler une autre fiche</button></div>';
 $('bank-draft').value=readDraft();$('bank-draft').addEventListener('input',storeDraft);
 document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{storeDraft();level=Number(b.dataset.level);exercise(e);});
 document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.choice);$('choice-result').textContent=[['Solide','La distinction précise ce que le passage permet de comprendre.'],['À revoir',e.misreading+' '+e.explanation],['Défendable','Il faut encore nommer la distinction et expliquer sa fonction dans le raisonnement.']][i].join(' — ');});
 $('restart').onclick=()=>exercise(e);$('erase').onclick=()=>{try{localStorage.removeItem(key(selected,level));}catch(_){}$('bank-draft').value='';$('draft-state').textContent='Brouillon de ce niveau effacé.';};
 $('another').onclick=()=>{$('bank-results').scrollIntoView({behavior:'smooth'});$('bank-results').querySelector('button')?.focus();};
}
function open(id,focus=true){
 storeDraft();const e=data.entries.find(e=>e.id===id);if(!e)return;selected=id;level=1;
 const card=$('bank-reader');card.hidden=false;
 $('bank-reference').innerHTML='<p class="bank-kicker">'+esc(e.author)+'</p><h2 id="reader-title">'+esc(e.title)+'</h2><p class="bank-work"><cite>'+esc(e.work)+'</cite> · '+esc(e.locator)+'</p><p class="bank-muted">Œuvre : '+esc(e.publication)+'<br>Édition consultée : '+esc(e.edition)+', Flammarion, '+esc(e.editionYear)+'.<br>Traduction : '+esc(e.translator)+'.</p><h3>'+esc(e.problem)+'</h3><p>'+esc(e.explanation)+'</p><div class="bank-distinction"><strong>La distinction utile</strong><p>'+esc(e.distinction)+'</p></div><details><summary>Employer cette référence en dissertation</summary>'+e.uses.map(u=>'<p><strong>Sujet :</strong> '+esc(u.subject)+'</p><p><strong>Argument :</strong> '+esc(u.claim)+'</p><p>'+esc(u.reason)+'</p><p><strong>À éviter :</strong> '+esc(u.limit)+'</p>').join('')+'</details><p class="bank-muted">Explication originale du site. La traduction récente du passage n’est pas reproduite ici.</p>';
 exercise(e);syncURL();if(focus){card.scrollIntoView({behavior:'smooth',block:'start'});$('reader-title').setAttribute('tabindex','-1');$('reader-title').focus({preventScroll:true});}
}
function syncURL(){const p=new URLSearchParams();for(const id of ['query','author','notion','subject','argument','function'])if($(id).value)p.set(id,$(id).value);if(selected)p.set('fiche',selected);history.replaceState(null,'',location.pathname+(p.size?'?'+p.toString():''));}
function render(){const opts={};for(const id of ['query','author','notion','subject','argument','function'])opts[id]=$(id).value;const matches=select(data.entries,opts);$('bank-results').innerHTML=matches.map(x=>'<article><p class="bank-kicker">'+esc(x.entry.author)+'</p><h3>'+esc(x.entry.title)+'</h3><p><cite>'+esc(x.entry.work)+'</cite> · '+esc(x.entry.locator)+'</p><p>'+esc(x.use?.reason||x.entry.problem)+'</p>'+(opts.argument?'<p class="bank-muted">Mots rapprochés : '+esc(x.hits.join(', '))+'. Vérifiez le sens de votre argument dans la fiche.</p>':'')+'<button type="button" data-open="'+esc(x.entry.id)+'">Lire et travailler cette fiche →</button></article>').join('');
 sourceState.textContent=matches.length+' fiche'+(matches.length>1?'s':'')+' trouvée'+(matches.length>1?'s':'')+(opts.argument?' · rapprochement lexical, à examiner.':'.');
 if(!matches.length)$('bank-results').innerHTML='<p>Aucun raccord documenté pour ces critères. Retirez un filtre ou cherchez une idée plus précise. Cela ne prouve pas qu’aucun texte pertinent existe.</p>';
 document.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>open(b.dataset.open));syncURL();
}
$('author').innerHTML+=[...new Set(data.entries.map(e=>e.author))].map(a=>'<option>'+esc(a)+'</option>').join('');
$('notion').innerHTML+=Object.entries(root.PHILO_NOTIONS_NOMS||{}).map(([k,n])=>'<option value="'+k+'">'+esc(n)+'</option>').join('');
$('subject').innerHTML+=[...new Set(data.entries.flatMap(e=>e.uses.map(u=>u.subject)))].map(s=>'<option>'+esc(s)+'</option>').join('');
for(const id of ['query','author','notion','subject','argument','function']){const v=params.get(id);if(v)$(id).value=v;$(id).addEventListener(id==='query'||id==='argument'?'input':'change',render);}
$('bank-reset').onclick=()=>{for(const id of ['query','author','notion','subject','argument','function'])$(id).value='';render();};
render();if(params.get('fiche'))open(params.get('fiche'),false);
})(typeof window==='undefined'?globalThis:window);
