#!/usr/bin/env node
/* Génère une page statique (indexable) par sujet de philosophie du bac 2026, à partir de philosophie-annales-data.js :
   philosophie-bac-2026-<sujet>.html. L’ancienne adresse philosophie-annale.html?id=… redirige vers ces pages.
   Idempotent : relancer le script réécrit les pages. */
const fs=require('fs');
const path=require('path');
const {annaleFile}=require('./philo-paths');
const C20=require('./philo-copie20');
const ROOT=path.resolve(__dirname,'..');
const DOMAIN='https://commentaire-plan.com';
global.window={};
require(path.join(ROOT,'philosophie-annales-data.js'));
const SETS=window.PHILO_ANNALES_2026||[];
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const PRINT='<p class="print-line"><button type="button" class="philo-print" onclick="document.querySelectorAll(\'details\').forEach(function(d){d.open=true});window.print()">Imprimer la fiche (corrigé compris)</button></p>';

function step(k,h,i,kind,rows){
  return `<section class="exercise-wrap"><article class="exercise"><div class="kicker">${k}</div><h2>${h}</h2><div class="instruction">${i}</div><textarea rows="${rows}" data-feedback-kind="${kind}"></textarea></article></section>\n`;
}
const p=(label,txt)=>txt?`<p><strong>${label} :</strong> ${esc(txt)}</p>`:'';

const CHAINE={'2026-asie-inconscient-bonheur':'inconscient-heureux','2026-g1-bien-agir':'certain-bien-agi','2026-an-science-utile':'science-utile','2026-an-artiste-sait':'artiste-sait','2026-asie-langage':'prisonniers-langage'};
function niveaux(x){
  const id=CHAINE[x.id];
  const n1=id&&id!=='prisonniers-langage'?`philosophie-probleme-pas-a-pas.html?niveau=1&sujet=${id}`:'philosophie-probleme-pas-a-pas.html?niveau=1';
  const n2=id==='prisonniers-langage'?`philosophie-probleme-pas-a-pas.html?niveau=2&sujet=${id}`:'philosophie-probleme-pas-a-pas.html?niveau=2';
  return `<section class="exercise-wrap annale-niveaux"><nav class="chaine-tabs" aria-label="Niveaux"><a href="${n1}"><b>Niveau 1</b><span>Au clic${id&&id!=='prisonniers-langage'?' : ce sujet':''}</span></a><a href="${n2}"><b>Niveau 2</b><span>J’écris un peu${id==='prisonniers-langage'?' : ce sujet':''}</span></a><a class="on" aria-current="page"><b>Niveau 3</b><span>J’écris tout : ici</span></a></nav><p class="micro">Trop difficile ? Commencez au niveau 1 : le même chemin, au clic, sans rien écrire.</p></section>\n`;
}
const BROUILLON=n=>`<aside class="brouillon-annale" data-avant="${n}" hidden><div class="kicker">VOTRE BROUILLON</div><div class="brouillon-annale-body"></div></aside>\n`;
const SCRIPT_BROUILLON=id=>`<script>(function(){var k='philo-annale:${id}:',a=[].slice.call(document.querySelectorAll('main textarea[data-feedback-kind]')),L=['Première réponse','Ce que la notion demande','Ce que chaque réponse perd','Problématique'];function g(i){try{return localStorage.getItem(k+i)||''}catch(e){return''}}function show(){[].forEach.call(document.querySelectorAll('.brouillon-annale'),function(b){var n=+b.dataset.avant,h='';for(var i=0;i<n&&i<a.length;i++){var v=a[i].value.trim();if(v)h+='<p><b>'+L[i]+'</b>'+v.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})+'</p>'}b.querySelector('.brouillon-annale-body').innerHTML=h;b.hidden=!h})}a.forEach(function(t,i){var v=g(i);if(v&&!t.value)t.value=v;t.addEventListener('input',function(){try{localStorage.setItem(k+i,t.value)}catch(e){}show()})});show()})();</script>`;
function dissertation(set,x){
  const parts=x.parties||[], tr=x.transitions||[];
  const partHtml=(pt,n)=>`<p><strong>${['I','II','III'][n]}. ${esc(pt[0])}</strong></p><ul class="plan-sous">${pt.slice(1).map(v=>`<li>${esc(v)}</li>`).join('')}</ul>`;
  const corr=`<section class="exercise-wrap" id="corrige"><article class="exercise"><div class="kicker">APRÈS VOTRE ESSAI</div><h2>Un corrigé possible.</h2>
<details class="correction"><summary>1. Le travail au brouillon</summary>${p('Les mots du sujet',x.mots)}${p('Ce que la notion demande',x.demande)}${p('Première réponse',x.oui)}${p('Réponse contraire',x.non)}${p('Problématique',x.pb)}</details>
${C20.has&&C20.has(x.id)?'<p class="micro"><strong>2. L’introduction rédigée</strong> : elle ouvre la copie à 20, plus bas.</p>':`<details class="correction"><summary>2. L’introduction rédigée</summary><p>${esc(x.intro)}</p></details>`}
<details class="correction"><summary>3. Le plan détaillé</summary>${partHtml(parts[0],0)}<p class="plan-transition"><em>Transition.</em> ${esc(tr[0])}</p>${partHtml(parts[1],1)}<p class="plan-transition"><em>Transition.</em> ${esc(tr[1])}</p>${partHtml(parts[2],2)}</details>
${C20.has&&C20.has(x.id)?'<p class="micro"><strong>4. La conclusion rédigée</strong> : elle termine la copie à 20, plus bas.</p>':`<details class="correction"><summary>4. La conclusion rédigée</summary><p>${esc(x.conclusion)}</p></details>`}
<p class="micro">Ce n’est pas la seule réponse juste : une autre problématique est bonne si elle passe le test du gant. Les auteurs cités ne sont là que parce qu’ils font avancer l’idée ; un devoir sans eux peut être excellent. L’introduction part d’une scène où le problème se voit déjà ; la conclusion y revient.</p>
${PRINT}</article></section>\n`;
  return niveaux(x)+step('1 · LIRE LE SUJET','Votre première réponse, puis le petit mot qui la fait vaciller.','<ol class="consigne-simple"><li>Répondez au sujet en une phrase qui reprend ses mots : par oui, par non (en tenant compte des petits mots, comme « toujours »), ou en montrant que la question est mal posée.</li><li>Soulignez les petits mots du sujet : « peut-on », « faut-il », « suffit-il », « sans »… Lequel change la question ? Une phrase.</li><li>Complétez : « Au premier abord, on répondrait…, mais… »</li></ol><p class="micro"><strong>Exemple sur un autre sujet.</strong> « Peut-on être heureux sans être libre ? » → « On peut être heureux sans être libre. » Puis : « peut-on » demande-t-il si c’est possible, ou si on en a le droit ?</p>','philo-reponse',4)+
  step('2 · CE QUE LA NOTION DEMANDE','Qu’attend-on, en même temps, de la notion du sujet ?','<p>Prenez la notion principale du sujet : le mot qui dit de quoi l’on parle. Sans citer d’auteur :</p><ol class="consigne-simple"><li>Écrivez une chose qu’on attend de lui dans la vie courante. Une phrase.</li><li>Écrivez une deuxième attente, tout aussi normale, qui va dans l’autre sens. Une phrase.</li><li>Complétez : « On attend du… qu’il…, mais aussi qu’il… ; les deux se gênent quand… »</li></ol><p class="micro"><strong>Exemple sur un autre mot.</strong> Du bonheur, on attend un repos où rien ne manque, mais aussi de se savoir heureux ; or celui qui voit clair voit aussi ce qui menace son repos. <a class="official-link" href="philosophie-notions.html">Les 17 notions →</a></p>','philo-consequence',4)+
  step('3 · CE QUE CHAQUE RÉPONSE PERD','Poussez chaque réponse jusqu’au bout.','<ol class="consigne-simple"><li>Imaginez quelqu’un qui applique votre première réponse dans tous les cas, sans exception. Qu’a-t-il dû abandonner ? Une phrase.</li><li>Même question pour la réponse contraire. Une phrase.</li><li>Complétez : « Si l’on répond oui, on garde…, mais on perd… ; si l’on répond non, on garde…, mais on perd… »</li></ol><p class="micro">Si une seule réponse perd quelque chose, revenez à la question 2 : il vous manque une attente.</p>','philo-cout',5)+
  BROUILLON(3)+step('4 · LA PROBLÉMATIQUE','Une seule question, qui laisse les deux réponses ouvertes.','<p>La problématique est la question qui montre pourquoi le sujet n’a pas de réponse facile. Reprenez votre phrase de la question 3 et écrivez-en une seule question, sur ce modèle : « …, est-ce…, au risque de…, ou…, au risque de… ? » Ne recopiez pas « peut-on » ni « faut-il ».</p><p class="micro"><strong>Exemple sur un autre sujet.</strong> « Pour être juste, suffit-il d’obéir aux lois ? » → « Être juste, est-ce respecter la loi commune, au risque d’obéir à des lois injustes, ou juger les lois, au risque de ruiner la règle commune ? »</p>','philo-problematique',4)+
  BROUILLON(4)+step('5 · LE PLAN','Trois parties, deux transitions.','<p>Écrivez une phrase pour chaque ligne :</p><ol class="consigne-simple"><li>I : la première réponse, défendue de son mieux.</li><li>Transition : ce qu’elle perd, et qui oblige à passer à II.</li><li>II : la réponse contraire, qui garde ce que I perdait.</li><li>Transition : ce que II perd à son tour.</li><li>III : une réponse qui garde l’essentiel des deux, par exemple en montrant qu’elles ne parlent pas du même moment ou du même point de vue.</li></ol><p class="micro">La troisième partie ne choisit pas un camp et ne coupe pas la poire en deux. <a class="official-link" href="philosophie-operations.html">Des façons de la trouver →</a></p>','philo-plan',10)+
  corr+
  `<section class="offer-band"><div class="kicker">AVANT DE RÉDIGER</div><h2>Le test du gant.</h2><div class="sequence-spec"><p><strong>Aucun doigt ne manque :</strong> chaque mot du sujet travaille-t-il dans ma problématique ?</p><p><strong>Aucun doigt en trop :</strong> ai-je évité d’ajouter une notion que le sujet ne contient pas ?</p><p><strong>Les deux réponses restent ouvertes :</strong> chacune perd-elle quelque chose (pas de « comment pourrait-on… si… ») ?</p><p><strong>On reconnaît le sujet :</strong> le retrouve-t-on sans qu’il soit recopié ?</p><p><strong>D’une traite :</strong> une seule question, une trentaine de mots au plus ?</p><p><strong>Elle donne le plan :</strong> I défend une réponse, II part de ce qu’elle perd, III cherche une réponse qui perde moins ?</p></div><p class="micro"><strong>Sans IA :</strong> les questions, le corrigé et ce test suffisent. <strong>Avec IA :</strong> « Vérifier ma réponse » donne un retour sur votre travail ; il ne produit jamais le plan à votre place.</p></section>\n`;
}

function texte(set,x){
  const corr=`<section class="exercise-wrap" id="corrige"><article class="exercise"><div class="kicker">APRÈS VOTRE ESSAI</div><h2>Un corrigé possible.</h2><details class="correction"><summary>Comparer avec votre travail</summary>${p('Le problème',x.probleme)}${p('La thèse',x.these)}${(x.moments||[]).length?'<p><strong>Les moments du texte :</strong></p><ol>'+x.moments.map(m=>'<li>'+esc(m)+'</li>').join('')+'</ol>':''}${p('Ce que fait le texte',x.operation)}${p('Dans une dissertation',x.reemploi)}<p class="micro">Ce corrigé résume le texte avec nos mots : relisez toujours le texte lui-même dans le sujet officiel.</p></details>
${PRINT}</article></section>\n`;
  return step('1 · LE PROBLÈME','À quelle difficulté le texte répond-il ?','<ol class="consigne-simple"><li>Écrivez la question que l’auteur se pose. Une phrase.</li><li>Écrivez pourquoi elle n’a pas de réponse évidente. Une phrase.</li></ol>','philo-texte-probleme',4)+
  step('2 · LA THÈSE','Quelle réponse l’auteur défend-il ?','<p>Écrivez en une phrase la réponse que l’auteur défend, sans résumer tout le passage.</p>','philo-texte-these',3)+
  step('3 · LES MOMENTS','Comment le texte avance-t-il ?','<p>Découpez le texte en trois à cinq moments. Pour chacun, écrivez une phrase : ce que l’auteur fait là (il affirme, explique, donne un exemple, répond à une objection, conclut).</p>','philo-texte-moments',6)+
  step('4 · CE QUE FAIT LE TEXTE','Quel geste l’auteur fait-il pour s’en sortir ?','<p>Un philosophe ne fait pas qu’affirmer : il fait un geste pour sortir de la difficulté.</p><ol class="consigne-simple"><li>Choisissez le geste qui ressemble au texte : sépare-t-il deux choses qu’on confondait (« légal » et « juste ») ? renverse-t-il la cause et l’effet ? montre-t-il que le vrai problème est ailleurs ? change-t-il le sens d’un mot ?</li><li>Complétez : « L’auteur… ; cela lui permet de… »</li></ol>','philo-operation',5)+
  step('5 · DANS UNE DISSERTATION','À quoi ce texte pourrait-il servir ?','<ol class="consigne-simple"><li>Choisissez un sujet de dissertation parmi les sujets 2026 en bas de cette page, et recopiez-le. Exemple : « Peut-on concevoir une humanité sans religion ? »</li><li>Écrivez dans quelle partie vous utiliseriez ce texte, et pour quoi faire. Une phrase.</li></ol>','philo-reemploi',4)+
  corr+
  `<section class="offer-band"><div class="kicker">AVANT DE RÉDIGER</div><h2>Quatre vérifications.</h2><div class="sequence-spec"><p>Mon problème explique-t-il pourquoi le texte avait quelque chose à résoudre ?</p><p>Ma thèse dit-elle ce que l’auteur établit, sans résumer le passage ?</p><p>Mes moments suivent-ils l’ordre du texte, chacun avec son rôle ?</p><p>Le geste de l’auteur (question 4) est-il précis, et lié à ce qu’il résout ici ?</p></div></section>\n`;
}

function page(set,x,all){
  const diss=x.type==='dissertation';
  let title=diss?`${x.title} Corrigé bac philo 2026`:`${x.title.replace(/\s*\(\d{4}\)/,'')} : bac philo 2026`;
  if(title.length>60) title=diss?`${x.title} Bac philo 2026`:title;
  if(title.length>60) title=x.title;
  const desc=diss?`Bac de philosophie 2026 (${set.center}) : « ${x.title} ». Travail guidé en cinq questions, puis corrigé complet : problématique, introduction, plan détaillé, conclusion.`:`Bac de philosophie 2026 (${set.center}) : explication du texte de ${x.title}. Travail guidé en cinq questions, puis corrigé : problème, thèse, moments du texte.`;
  const others=all.filter(o=>o.x.id!==x.id).map(o=>`<a href="${annaleFile(o.x)}"><strong>${esc(o.x.title)}</strong><span>${esc(o.set.center)} · ${o.x.type==='dissertation'?'Dissertation':'Explication de texte'} →</span></a>`).join('\n');
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc.slice(0,155))}">
<link rel="canonical" href="${DOMAIN}/${annaleFile(x)}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · BAC 2026 · ${esc(set.center.toUpperCase())}</div><h1>${esc(x.title)}</h1><p class="lede">${diss?'Travaillez le sujet en cinq questions, sur un brouillon. Le corrigé est en bas : ne l’ouvrez qu’après votre essai.':'Lisez d’abord le texte dans le sujet officiel, deux fois, crayon en main. Puis travaillez-le en cinq questions. Le corrigé est en bas : ne l’ouvrez qu’après votre essai.'}</p></div><aside class="side-note"><p><strong>${diss?'Dissertation':'Explication de texte'}</strong><br>${esc(set.code)}</p><p><a href="${esc(set.source)}">Sujet officiel (PDF) ↗</a></p><p><a href="#corrige">Aller directement au corrigé ↓</a></p><p class="ici"><b>Où vous êtes</b>L’étape 5 du parcours : un vrai sujet du bac. Vous débutez ? <a href="philosophie.html#parcours">Le parcours en cinq étapes →</a></p>${diss?'':'<p class="micro">Les cinq questions suivent l’ordre d’une explication de texte : le problème, la thèse, les moments, le geste de l’auteur, puis ce que le texte vous apporte pour une dissertation.</p>'}</aside></section>
${diss?dissertation(set,x)+C20.teaser(x.id):texte(set,x)}
<section class="offer-band"><div class="kicker">LES AUTRES SUJETS 2026</div><h2>Continuer sur un autre sujet.</h2><div class="seo-links">
${others}
</div><p><a href="philosophie-annales.html">← Toutes les annales</a> · <a href="philosophie-notions.html">Les 17 notions →</a></p></section>
</main>${diss?SCRIPT_BROUILLON(x.id):''}<script src="site-nav.js"></script></body></html>
`;
}

const all=SETS.flatMap(set=>set.subjects.map(x=>({set,x})));
for(const {set,x} of all) fs.writeFileSync(path.join(ROOT,annaleFile(x)),page(set,x,all));
// Liste statique dans philosophie-annales.html (entre les marqueurs)
const card=o=>`<a href="${annaleFile(o.x)}"><strong>${esc(o.x.title)}</strong><span>${esc(o.set.center)} · ${esc(o.set.code)} · travailler ce sujet →</span></a>`;
const listHtml=`<!--annales-2026:start-->
<h3 class="annales-group">Dissertations</h3>
<div class="annales-static-links">
${all.filter(o=>o.x.type==='dissertation').map(card).join('\n')}
</div>
<h3 class="annales-group">Explications de texte</h3>
<div class="annales-static-links">
${all.filter(o=>o.x.type!=='dissertation').map(card).join('\n')}
</div>
<!--annales-2026:end-->`;
const listFile=path.join(ROOT,'philosophie-annales.html');
let lf=fs.readFileSync(listFile,'utf8');
if(lf.includes('<!--annales-2026:start-->')) lf=lf.replace(/<!--annales-2026:start-->[\s\S]*?<!--annales-2026:end-->/,listHtml);
else lf=lf.replace('<div class="filters" id="philoAnnalesFilters"></div>\n<div class="annales-static-links" id="philoAnnalesList"></div>',listHtml);
lf=lf.replace('<script src="philosophie-annales-data.js"></script>\n<script src="philosophie-annales.js"></script>\n','');
fs.writeFileSync(listFile,lf);
// Ancienne adresse philosophie-annale.html?id=… → page statique
const map=Object.fromEntries(all.map(o=>[o.x.id,annaleFile(o.x)]));
fs.writeFileSync(path.join(ROOT,'philosophie-annale.html'),`<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Annale de philosophie | Commentaire Plan</title>
<meta name="robots" content="noindex,follow">
<link rel="stylesheet" href="styles.css">
<script>(function(){var m=${JSON.stringify(map)};var id=new URLSearchParams(location.search).get("id");location.replace(m[id]||"philosophie-annales.html");})();</script>
</head><body><header class="top"></header><main class="wrap"><section class="pagehead"><div><h1>Redirection…</h1><p><a href="philosophie-annales.html">Toutes les annales de philosophie →</a></p></div></section></main><script src="site-nav.js"></script></body></html>
`);
console.log(`Annales philosophie 2026 : ${all.length} pages statiques`);
