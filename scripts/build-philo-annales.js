#!/usr/bin/env node
/* Génère une page statique (indexable) par sujet de philosophie du bac 2026, à partir de philosophie-annales-data.js :
   philosophie-bac-2026-<sujet>.html. L’ancienne adresse philosophie-annale.html?id=… redirige vers ces pages.
   Idempotent : relancer le script réécrit les pages. */
const fs=require('fs');
const path=require('path');
const {annaleFile}=require('./philo-paths');
const C20=require('./philo-copie20');
const EXPLICATIONS=require('./build-explication-textes');
const EXPLICATION_IDS={'2026-an-freud':'freud-2026-amerique-du-nord','2026-me-nietzsche':'nietzsche-2026-metropole','2026-g1-weil':'weil-2026-centres-etrangers','2026-asie-tocqueville':'tocqueville-2026-asie'};
const ROOT=path.resolve(__dirname,'..');
const DOMAIN='https://commentaire-plan.com';
global.window={};
require(path.join(ROOT,'philosophie-annales-data.js'));
const SETS=window.PHILO_ANNALES_2026||[];
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const PRINT='<p class="print-line"><button type="button" class="philo-print" onclick="document.querySelectorAll(\'details\').forEach(function(d){d.open=true});window.print()">Imprimer la fiche (corrigé compris)</button></p>';

function step(k,h,i,kind,rows,help=''){
  return `<section class="exercise-wrap"><article class="exercise"><div class="kicker">${k}</div><h2>${h}</h2><div class="instruction">${i}</div>${help?`<details><summary>Une aide pour commencer</summary><p>${help}</p></details>`:''}<textarea rows="${rows}" aria-label="${esc(h)}" data-feedback-instruction="${esc(i.replace(/<[^>]*>/g, ' '))}"${kind.startsWith('philo-texte-')?' data-feedback="off"':''} data-feedback-kind="${kind}"></textarea></article></section>\n`;
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
  const train=niveaux(x)+step('1 · LIRE LE SUJET','Votre première réponse.','<ol class="consigne-simple"><li>Répondez au sujet en une phrase qui reprend ses mots.</li><li>Expliquez en une phrase le rôle d’un petit mot du sujet.</li></ol>','philo-reponse',4,'Des mots comme « toujours », « sans » ou « seulement » changent ce qu’il faut examiner. « Suffire » signifie qu’aucune autre condition ne serait nécessaire.')+
  step('2 · CE QUE LA NOTION DEMANDE','Deux exigences à examiner.','<ol class="consigne-simple"><li>Écrivez deux choses que l’on attend de la notion, une phrase chacune.</li><li>Décrivez en une phrase un cas où ces attentes se gênent.</li></ol>','philo-consequence',4,'Une exigence, c’est ce qu’on attend du grand mot du sujet. Par exemple, de la liberté, on attend de pouvoir suivre ses désirs, mais aussi de ne pas en être l’esclave. Cherchez ce que les mots de votre sujet demandent précisément.')+
  step('3 · CE QUE CHAQUE RÉPONSE PERD','Examinez les deux réponses.','<p>Pour chaque réponse, expliquez en une phrase ce qu’elle préserve et la difficulté qu’elle rencontre.</p>','philo-cout',5)+
  BROUILLON(3)+step('4 · LA PROBLÉMATIQUE','Formulez le problème.','<p>À partir des deux difficultés relevées, formulez le problème en une question.</p>','philo-problematique',4)+
  BROUILLON(4)+step('5 · LE PLAN','Trois réponses et deux questions de transition.','<ol class="consigne-simple"><li>Écrivez la réponse de I, de II et de III, une phrase chacune.</li><li>Entre deux parties, écrivez la question à laquelle la suivante répondra.</li></ol>','philo-plan',10);
  const gant=
  `<section class="offer-band"><div class="kicker">AVANT DE RÉDIGER</div><h2>Le test du gant.</h2><div class="sequence-spec"><p><strong>Aucun doigt ne manque :</strong> chaque mot du sujet travaille-t-il dans ma problématique ?</p><p><strong>Aucun doigt en trop :</strong> ai-je évité d’ajouter une notion que le sujet ne contient pas ?</p><p><strong>Les deux réponses restent ouvertes :</strong> chacune perd-elle quelque chose (pas de « comment pourrait-on… si… ») ?</p><p><strong>On reconnaît le sujet :</strong> le retrouve-t-on sans qu’il soit recopié ?</p><p><strong>D’une traite :</strong> une seule question, une trentaine de mots au plus ?</p><p><strong>Elle donne le plan :</strong> I défend une réponse, II part de ce qu’elle perd, III cherche une réponse qui perde moins ?</p></div><p class="micro"><strong>Sans IA :</strong> les questions, le corrigé et ce test suffisent. <strong>Avec IA :</strong> « Vérifier ma réponse » donne un retour sur votre travail ; il ne produit jamais le plan à votre place.</p></section>\n`;
  return {train:train+gant, corr};
}

function renderModel(x){
  const shared=EXPLICATIONS.data.subjects.find(s=>s.id===EXPLICATION_IDS[x.id]);
  if(shared)return '<details class="correction"><summary>Lire l’explication rédigée et ses fonctions</summary>'+EXPLICATIONS.model(shared,shared.models[0])+'</details>';
  if(!x.modele||!x.modele.length)return '';
  const rows=x.modele.map(([sentence,fn])=>'<li><p>'+esc(sentence)+'</p><p class="micro"><strong>Fonction.</strong> '+esc(fn)+'</p></li>').join('');
  return '<details class="correction"><summary>Premiers repères pour construire l’explication</summary><ol class="philo-reading-notes" data-reading-notes="'+esc(x.id)+'">'+rows+'</ol></details>';
}
function texte(set,x){
  const modelIds=EXPLICATION_IDS;
  const modelHref=modelIds[x.id]?`philosophie-explication-${modelIds[x.id]}.html#modele`:'philosophie-explication.html';
  const corr=`<section class="exercise-wrap" id="corrige"><article class="exercise"><div class="kicker">APRÈS VOTRE EXPLICATION</div><h2>Un corrigé possible.</h2><details class="correction"><summary>Comparer avec votre travail</summary>${p('Le problème',x.probleme)}${p('La thèse',x.these)}${(x.moments||[]).length?'<p><strong>Les moments du texte :</strong></p><ol>'+x.moments.map(m=>'<li>'+esc(m)+'</li>').join('')+'</ol>':''}${renderModel(x)}${p('Ce que fait le texte',x.operation)}<p class="micro">Ce corrigé résume le texte avec nos mots : relisez toujours le texte lui-même dans le sujet officiel.</p></details><details><summary>Après l’explication : réemploi facultatif en dissertation</summary>${p('Un usage possible',x.reemploi)}</details>
${PRINT}</article></section>\n`;
  const train=step('1 · LE PROBLÈME','À quelle difficulté le texte répond-il ?','<ol class="consigne-simple"><li>Écrivez la question que l’auteur se pose. Une phrase.</li><li>Écrivez pourquoi elle n’a pas de réponse évidente. Une phrase.</li></ol>','philo-texte-probleme',4)+
  step('2 · LA THÈSE','Quelle réponse l’auteur défend-il ?','<p>Écrivez en une phrase la réponse que l’auteur défend, sans résumer tout le passage.</p>','philo-texte-these',3)+
  step('3 · LES MOMENTS','Comment le texte avance-t-il ?','<p>Découpez le texte selon les étapes de son raisonnement. Pour chacune, écrivez une phrase : ce que l’auteur fait là (il affirme, explique, donne un exemple, répond à une objection, conclut). Le nombre dépend de ce texte.</p>','philo-texte-moments',6)+
  step('4 · EXPLIQUER UNE RAISON','Pourquoi l’auteur soutient-il cette idée ?','<ol class="consigne-simple"><li>Choisissez une phrase importante du texte et recopiez-la.</li><li>Précisez le sens d’un mot décisif, puis expliquez la raison que cette phrase donne.</li><li>Reliez-la au mouvement du texte. Rédigez six à dix phrases pour l’ensemble.</li></ol>','philo-texte-argument',8)+
  step('5 · L’EXPLICATION ENTIÈRE','Rédigez votre explication complète.','<p>Reprenez votre brouillon et gardez le texte officiel ouvert. Expliquez son problème, sa thèse et ses raisons dans leur mouvement. Choisissez l’organisation qui rend cet extrait intelligible. Terminez par ce qu’il établit et par sa portée.</p>'+(modelIds[x.id]?'<p class="micro">Pour comparer une copie entièrement rédigée : <a href="'+modelHref+'">une copie courte, phrase par phrase →</a>. Aucune note automatique n’est calculée ici.</p>':'<p class="micro">Dans l’onglet « Le corrigé », les premiers repères vous aident à reprendre votre rédaction. Vérifiez les mots, les raisons et la place de chaque idée dans le texte.</p>'),'philo-texte-copie',20)+
  `<section class="offer-band"><div class="kicker">APRÈS RÉDACTION</div><h2>Quatre vérifications.</h2><div class="sequence-spec"><p>Mon problème explique-t-il pourquoi le texte doit argumenter ?</p><p>Ma thèse dit-elle ce que l’auteur établit précisément ?</p><p>Mon explication rend-elle compte des moments et de leurs rôles ?</p><p>Chaque passage important est-il expliqué par ses mots, ses raisons et sa place dans le texte ?</p></div></section>\n`;
  return {train, corr};
}

/* Trois onglets : le sujet, l’entraînement (ouvert par défaut), le corrigé et la copie à 20. */
function onglets(set,x,diss){
  const w=diss?dissertation(set,x):texte(set,x);
  const has20=diss&&C20.has&&C20.has(x.id);
  const sujet=`<section class="onglet offer-band" id="sujet"><div class="kicker">LE SUJET</div><p class="sujet-libelle">${esc(x.title)}</p><p class="micro">${esc(set.center)} · ${esc(set.code)} · ${diss?'dissertation':'explication de texte'}.</p><p><a class="official-link" href="${esc(set.source)}">Le sujet officiel (PDF) →</a></p>${diss?'':'<p>Lisez le texte dans le sujet officiel, deux fois, crayon en main, avant de commencer.</p>'}<p><a class="btn red small" href="#entrainement">Commencer l’entraînement →</a></p></section>\n`;
  const barre=`<div class="onglets-barre" role="tablist" aria-label="Ce sujet"><button role="tab" aria-controls="sujet"><b>Le sujet</b><small>${diss?'Libellé officiel':'Texte officiel'}</small></button><button role="tab" aria-controls="entrainement"><b>S’entraîner</b><small>Cinq étapes</small></button><button role="tab" aria-controls="corrige-onglet"><b>${has20?'Corrigé et copie à 20':'Le corrigé'}</b><small>Après votre essai</small></button></div>`;
  return `<div class="onglets" data-onglets data-defaut="entrainement">\n${barre}\n${sujet}<section class="onglet" id="entrainement">\n${w.train}</section>\n<section class="onglet" id="corrige-onglet">\n${w.corr}${diss?C20.teaser(x.id):''}</section>\n</div>\n`;
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
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · BAC 2026 · ${esc(set.center.toUpperCase())}</div><h1>${esc(x.title)}</h1><p class="lede">${diss?'Travaillez le sujet en cinq questions, sur un brouillon. Le corrigé est dans le troisième onglet : ne l’ouvrez qu’après votre essai.':'Lisez d’abord le texte dans le sujet officiel, deux fois, crayon en main. Puis préparez et rédigez votre explication en cinq étapes. Le corrigé est dans le troisième onglet : ne l’ouvrez qu’après votre rédaction.'}</p></div><aside class="side-note"><p><strong>${diss?'Dissertation':'Explication de texte'}</strong><br>${esc(set.code)}</p><p><a href="${esc(set.source)}">Sujet officiel (PDF) ↗</a></p><p><a href="#corrige">Aller directement au corrigé →</a></p>${diss?'<p class="ici"><b>Où vous êtes</b>L’étape 5 du parcours : un vrai sujet du bac. Vous débutez ? <a href="philosophie-dissertation-parcours.html#parcours">Le parcours en cinq étapes →</a></p>':'<p class="ici"><b>Où vous êtes</b>Un vrai texte du bac à expliquer. <a href="philosophie-explication.html">Méthode, trois niveaux et copies annotées →</a></p><p class="micro">Les cinq étapes conduisent du problème et de la thèse aux raisons du texte, puis à une explication entièrement rédigée.</p>'}</aside></section>
${onglets(set,x,diss)}
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
<a href="philosophie-dissertation-2024-an-rien-dure.html"><strong>Comment être heureux, si rien ne dure ?</strong><span>Dissertation annotée · lire le sujet →</span></a>
<a href="philosophie-dissertation-2024-an-parler-sans-savoir.html"><strong>Peut-on parler sans savoir ?</strong><span>Dissertation annotée · lire le sujet →</span></a>
<a href="philosophie-dissertation-2025-g1-douter-raison.html"><strong>Peut-on douter des pouvoirs de la raison ?</strong><span>Dissertation annotée · lire le sujet →</span></a>
<a href="philosophie-dissertation-2025-g1-art-voir.html"><strong>L’art peut-il nous apprendre à voir le monde autrement ?</strong><span>Dissertation annotée · lire le sujet →</span></a>
<a href="philosophie-dissertation-2023-me-paix-justice.html"><strong>Vouloir la paix, est-ce vouloir la justice ?</strong><span>Dissertation annotée · lire le sujet →</span></a>
<a href="philosophie-dissertation-machine-peut-elle-penser.html"><strong>Une machine peut-elle penser ?</strong><span>Dissertation annotée · lire le sujet →</span></a>
</div>
<h3 class="annales-group">Explications de texte</h3>
<p><a href="philosophie-explication.html">De la lecture à la copie entière : trois niveaux et modèles annotés →</a></p>
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
require('./build-explication-textes').build(ROOT);
