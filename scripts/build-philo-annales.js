#!/usr/bin/env node
/* Génère une page statique (indexable) par sujet de philosophie du bac 2026, à partir de philosophie-annales-data.js :
   philosophie-bac-2026-<sujet>.html. L’ancienne adresse philosophie-annale.html?id=… redirige vers ces pages.
   Idempotent : relancer le script réécrit les pages. */
const fs=require('fs');
const path=require('path');
const {annaleFile}=require('./philo-paths');
const ROOT=path.resolve(__dirname,'..');
const DOMAIN='https://commentaire-plan.com';
global.window={};
require(path.join(ROOT,'philosophie-annales-data.js'));
const SETS=window.PHILO_ANNALES_2026||[];
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const PRINT='<p class="print-line"><button type="button" class="philo-print" onclick="document.querySelectorAll(\'details\').forEach(function(d){d.open=true});window.print()">Imprimer la fiche (corrigé compris)</button></p>';

function step(k,h,i,kind,rows){
  return `<section class="exercise-wrap"><article class="exercise"><div class="kicker">${k}</div><h2>${h}</h2><p class="instruction">${i}</p><textarea rows="${rows}" data-feedback-kind="${kind}"></textarea></article></section>\n`;
}
const p=(label,txt)=>txt?`<p><strong>${label} :</strong> ${esc(txt)}</p>`:'';

function dissertation(set,x){
  const parts=x.parties||[], tr=x.transitions||[];
  const partHtml=(pt,n)=>`<p><strong>${['I','II','III'][n]}. ${esc(pt[0])}</strong></p><ul class="plan-sous">${pt.slice(1).map(v=>`<li>${esc(v)}</li>`).join('')}</ul>`;
  const corr=`<section class="exercise-wrap" id="corrige"><article class="exercise"><div class="kicker">APRÈS VOTRE ESSAI</div><h2>Un corrigé possible.</h2>
<details class="correction"><summary>1. Le travail au brouillon</summary>${p('Les mots du sujet',x.mots)}${p('Ce que la notion demande',x.demande)}${p('Première réponse',x.oui)}${p('Réponse contraire',x.non)}${p('Problématique',x.pb)}</details>
<details class="correction"><summary>2. L’introduction rédigée</summary><p>${esc(x.intro)}</p></details>
<details class="correction"><summary>3. Le plan détaillé</summary>${partHtml(parts[0],0)}<p class="plan-transition"><em>Transition.</em> ${esc(tr[0])}</p>${partHtml(parts[1],1)}<p class="plan-transition"><em>Transition.</em> ${esc(tr[1])}</p>${partHtml(parts[2],2)}</details>
<details class="correction"><summary>4. La conclusion rédigée</summary><p>${esc(x.conclusion)}</p></details>
<p class="micro">Ce n’est pas la seule réponse juste : une autre problématique est bonne si elle passe le test du gant. Les auteurs cités ne sont là que parce qu’ils font avancer l’idée ; un devoir sans eux peut être excellent. L’introduction part d’une scène où le problème se voit déjà ; la conclusion y revient.</p>
${PRINT}</article></section>\n`;
  return step('1 · LIRE LE SUJET','Que demandent exactement ses mots ?','Relevez les petits mots qui comptent (« peut-on », « faut-il », « sans », « nous »…). Puis écrivez l’idée que le sujet invite d’abord à accepter.','philo-reponse',4)+
  step('2 · CE QUE LA NOTION DEMANDE','Quelles deux choses la notion demande-t-elle à la fois ?','Sans citer d’auteur, donnez deux choses que la notion principale demande dans son sens courant, et dites pourquoi elles se gênent. <a class="official-link" href="philosophie-notions.html">Les 17 notions →</a>','philo-consequence',4)+
  step('3 · CE QUE CHAQUE RÉPONSE PERD','Poussez chaque réponse jusqu’au bout.','Que perd la première réponse ? Que perd la réponse contraire ? Si une seule perd quelque chose, revenez à l’étape 2.','philo-cout',5)+
  step('4 · LA PROBLÉMATIQUE','Une seule question, qui laisse les deux réponses ouvertes.','Mettez face à face les deux réponses et ce qu’elles perdent. Ne recopiez pas « peut-on » ou « faut-il ».','philo-problematique',4)+
  step('5 · LE PLAN','I → transition → II → transition → III.','Écrivez l’idée de chaque partie et les deux questions de transition. La troisième partie ne choisit pas un camp : elle cherche une réponse qui perde moins. <a class="official-link" href="philosophie-operations.html">Les sept opérations →</a>','philo-plan',10)+
  corr+
  `<section class="offer-band"><div class="kicker">AVANT DE RÉDIGER</div><h2>Le test du gant.</h2><div class="sequence-spec"><p><strong>Aucun doigt ne manque :</strong> chaque mot du sujet travaille-t-il dans ma problématique ?</p><p><strong>Aucun doigt en trop :</strong> ai-je évité d’ajouter une notion que le sujet ne contient pas ?</p><p><strong>Les deux réponses restent ouvertes :</strong> chacune perd-elle quelque chose (pas de « comment pourrait-on… si… ») ?</p><p><strong>On reconnaît le sujet :</strong> le retrouve-t-on sans qu’il soit recopié ?</p><p><strong>D’une traite :</strong> une seule question, une trentaine de mots au plus ?</p><p><strong>Elle donne le plan :</strong> I défend une réponse, II part de ce qu’elle perd, III cherche une réponse qui perde moins ?</p></div><p class="micro"><strong>Sans IA :</strong> les étapes, le corrigé et ce test suffisent. <strong>Avec IA :</strong> « Vérifier ma réponse » donne un retour sur votre travail ; il ne produit jamais le plan à votre place.</p></section>\n`;
}

function texte(set,x){
  const corr=`<section class="exercise-wrap" id="corrige"><article class="exercise"><div class="kicker">APRÈS VOTRE ESSAI</div><h2>Un corrigé possible.</h2><details class="correction"><summary>Comparer avec votre travail</summary>${p('Le problème',x.probleme)}${p('La thèse',x.these)}${(x.moments||[]).length?'<p><strong>Les moments du texte :</strong></p><ol>'+x.moments.map(m=>'<li>'+esc(m)+'</li>').join('')+'</ol>':''}${p('Ce que fait le texte',x.operation)}${p('Dans une dissertation',x.reemploi)}<p class="micro">Ce corrigé résume le texte avec nos mots : relisez toujours le texte lui-même dans le sujet officiel.</p></details>
${PRINT}</article></section>\n`;
  return step('1 · LE PROBLÈME','À quelle difficulté le texte répond-il ?','En une ou deux phrases : quelle question l’auteur se pose-t-il, et pourquoi n’a-t-elle pas de réponse évidente ?','philo-texte-probleme',4)+
  step('2 · LA THÈSE','Quelle réponse l’auteur défend-il ?','Une phrase précise, sans résumer tout le passage.','philo-texte-these',3)+
  step('3 · LES MOMENTS','Comment le texte avance-t-il ?','Découpez le texte en trois à cinq moments. Pour chacun, une phrase : ce que l’auteur fait à cet endroit (il affirme, explique, donne un exemple, répond à une objection, conclut).','philo-texte-moments',6)+
  step('4 · CE QUE FAIT LE TEXTE','Quelle opération l’auteur accomplit-il ?','Distingue-t-il deux plans, inverse-t-il un rapport, déplace-t-il la difficulté, transforme-t-il un concept ? Dites ce que cela lui permet de résoudre.','philo-operation',5)+
  step('5 · DANS UNE DISSERTATION','À quoi ce texte pourrait-il servir ?','Choisissez un sujet de dissertation, puis expliquez en une phrase dans quelle partie et pour quoi faire vous utiliseriez ce texte.','philo-reemploi',4)+
  corr+
  `<section class="offer-band"><div class="kicker">AVANT DE RÉDIGER</div><h2>Quatre vérifications.</h2><div class="sequence-spec"><p>Mon problème explique-t-il pourquoi le texte avait quelque chose à résoudre ?</p><p>Ma thèse dit-elle ce que l’auteur établit, sans résumer le passage ?</p><p>Mes moments suivent-ils l’ordre du texte, chacun avec son rôle ?</p><p>L’opération repérée est-elle précise, et liée à ce qu’elle résout ici ?</p></div></section>\n`;
}

function page(set,x,all){
  const diss=x.type==='dissertation';
  let title=diss?`${x.title} Corrigé bac philo 2026`:`${x.title.replace(/\s*\(\d{4}\)/,'')} : bac philo 2026`;
  if(title.length>60) title=diss?`${x.title} Bac philo 2026`:title;
  if(title.length>60) title=x.title;
  const desc=diss?`Bac de philosophie 2026 (${set.center}) : « ${x.title} ». Travail guidé en cinq étapes, puis corrigé complet : problématique, introduction, plan détaillé, conclusion.`:`Bac de philosophie 2026 (${set.center}) : explication du texte de ${x.title}. Travail guidé en cinq étapes, puis corrigé : problème, thèse, moments du texte.`;
  const others=all.filter(o=>o.x.id!==x.id).map(o=>`<a href="${annaleFile(o.x)}"><strong>${esc(o.x.title)}</strong><span>${esc(o.set.center)} · ${o.x.type==='dissertation'?'Dissertation':'Explication de texte'} →</span></a>`).join('\n');
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc.slice(0,155))}">
<link rel="canonical" href="${DOMAIN}/${annaleFile(x)}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · BAC 2026 · ${esc(set.center.toUpperCase())}</div><h1>${esc(x.title)}</h1><p class="lede">${diss?'Travaillez le sujet en cinq étapes, sur un brouillon. Le corrigé est en bas : ne l’ouvrez qu’après votre essai.':'Lisez d’abord le texte dans le sujet officiel, deux fois, crayon en main. Puis travaillez-le en cinq étapes. Le corrigé est en bas : ne l’ouvrez qu’après votre essai.'}</p></div><aside class="side-note"><p><strong>${diss?'Dissertation':'Explication de texte'}</strong><br>${esc(set.code)}</p><p><a href="${esc(set.source)}">Sujet officiel (PDF) ↗</a></p><p><a href="#corrige">Aller directement au corrigé ↓</a></p></aside></section>
${diss?dissertation(set,x):texte(set,x)}
<section class="offer-band"><div class="kicker">LES AUTRES SUJETS 2026</div><h2>Continuer sur un autre sujet.</h2><div class="seo-links">
${others}
</div><p><a href="philosophie-annales.html">← Toutes les annales</a> · <a href="philosophie-notions.html">Les 17 notions →</a></p></section>
</main><script src="site-nav.js"></script></body></html>
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
