#!/usr/bin/env node
/* Génère la partie statique des annales HLP à partir de hlp-annales-data.js :
   - les fiches (élève et professeur) écrites directement dans hlp-annales.html et hlp-professeurs.html ;
   - le tableau de répartition par entrée dans hlp-professeurs.html ;
   - une page par sujet (hlp-<année>-<centre>-…-<auteur>.html) avec entraînement guidé.
   Si un PDF a été déposé dans annales/hlp/<id>.pdf, le lien pointe vers ce fichier local
   (voir scripts/telecharger-pdf-hlp.mjs) ; le lien d'origine reste affiché comme source.
   Idempotent : relancer le script remplace le contenu généré. */
const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const DOMAIN='https://commentaire-plan.com';

global.window={};
require(path.join(ROOT,'hlp-annales-data.js'));
const ENTREES=window.HLP_ENTREES;
const DATA=window.HLP_ANNALES.slice().sort((a,b)=>b.y-a.y||order(a)-order(b)||a.c.localeCompare(b.c,'fr')||a.j-b.j||(a.n||0)-(b.n||0));
function order(x){return {normale:0,libres:1,remplacement:2,zero:3}[x.s]??0;}

const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const slug=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const interpLabel=x=>x.it==='L'?'Interprétation littéraire':'Interprétation philosophique';
const essaiLabel=x=>x.it==='L'?'Essai philosophique':'Essai littéraire';
const sessionLabel={normale:'',libres:'candidats libres',remplacement:'remplacement',zero:''};

function when(x){
  if(x.s==='zero') return 'Sujet zéro';
  let t=x.y+' · '+x.c;
  if(x.j) t+=' · jour '+x.j;
  if(sessionLabel[x.s]) t+=' · '+sessionLabel[x.s];
  return t;
}
function fileName(x){
  if(x.s==='zero') return 'hlp-sujet-zero-'+x.id.split('-').pop()+'-'+slug(x.a)+'.html';
  const parts=['hlp',x.y,slug(x.c)];
  if(x.s==='libres') parts.push('candidats-libres');
  if(x.s==='remplacement') parts.push('remplacement');
  if(x.j) parts.push('jour-'+x.j);
  if(x.n) parts.push('sujet-'+x.n);
  parts.push(slug(x.a));
  return parts.join('-')+'.html';
}
function source(url){
  if(!url) return '';
  if(/education\.gouv\.fr\/sites|education\.gouv\.fr\/media/.test(url)) return 'ministère de l’Éducation nationale';
  if(/eduscol/.test(url)) return 'Éduscol';
  if(/ac-lille/.test(url)) return 'académie de Lille';
  if(/ac-nancy-metz/.test(url)) return 'académie de Nancy-Metz';
  if(/ac-toulouse/.test(url)) return 'académie de Toulouse';
  if(/sujets-corriges-bac/.test(url)) return 'sujet officiel';
  return new URL(url).hostname;
}
function localPdf(x){
  const rel='annales/hlp/'+x.id+'.pdf';
  return fs.existsSync(path.join(ROOT,rel))?rel:null;
}
function pdfLink(x){
  const local=localPdf(x);
  if(local) return {href:local,label:'Lire le sujet et le texte (PDF)',src:'copie du sujet officiel, hébergée sur le site'};
  if(x.bank) return {href:x.pdf,label:'Banque de sujets indexée (PDF)',src:source(x.pdf)};
  // Ne jamais présenter un miroir privé comme une source officielle.
  if(/sujets-corriges-bac\.fr/i.test(x.pdf)) return {href:null,label:'PDF officiel à retrouver',src:'référence du sujet conservée ; PDF officiel non localisé'};
  return {href:x.pdf,label:'Lire le sujet et le texte (PDF)',src:source(x.pdf)};
}
const workTitle=x=>esc(x.w)+(x.d?' ('+esc(x.d)+')':'');
const searchText=x=>norm([x.a,x.w,x.iq,x.eq,x.c,x.code,ENTREES[x.e]?.label].join(' '));

/* ---------- Fiches ---------- */
function card(x,prof){
  const e=ENTREES[x.e], p=pdfLink(x);
  let h='<article class="hlp-card" id="sujet-'+x.id+'" data-year="'+x.y+'" data-interp="'+x.it+'" data-entree="'+x.e+'" data-search="'+esc(searchText(x))+'">';
  h+='<header><span class="hlp-when">'+esc(when(x))+(x.n?' · sujet '+x.n+' au choix':'')+'</span>';
  if(prof && x.code) h+='<span class="hlp-code">'+esc(x.code)+'</span>';
  h+='</header>';
  h+='<h3><a href="'+fileName(x)+'">'+esc(x.a)+'</a></h3><p class="hlp-work"><em>'+esc(x.w)+'</em>'+(x.d?' ('+esc(x.d)+')':'')+(x.tr?', trad. '+esc(x.tr):'')+'</p>';
  h+='<dl><dt>'+interpLabel(x)+'</dt><dd>'+esc(x.iq)+'</dd><dt>'+essaiLabel(x)+'</dt><dd>'+esc(x.eq)+'</dd></dl>';
  if(e) h+='<p class="hlp-entree">'+(prof?'Entrée : ':'')+esc(e.label)+' <span>· '+esc(e.sem)+'</span></p>';
  if(prof && x.note) h+='<p class="hlp-note">'+esc(x.note)+'</p>';
  h+='<div class="hlp-actions"><a href="'+fileName(x)+'">Travailler ce sujet →</a>'+(p.href?'<a href="'+esc(p.href)+'" rel="noopener">'+esc(p.label)+' ↗</a>':'<span class="micro">'+esc(p.label)+'</span>');
  if(prof && x.cor && !/sujets-corriges-bac/.test(x.cor)) h+='<a href="'+esc(x.cor)+'" rel="noopener">Éléments de correction ↗</a>';
  h+='</div></article>';
  return h;
}
function bank(prof){
  return '<p class="hlp-count" aria-live="polite">'+DATA.length+' sujets</p><div class="hlp-bank">'+DATA.map(x=>card(x,prof)).join('\n')+'</div>';
}
function stats(){
  const rows=Object.entries(ENTREES).map(([k,v])=>{
    const xs=DATA.filter(x=>x.e===k), L=xs.filter(x=>x.it==='L').length;
    return '<tr><td>'+esc(v.label)+'</td><td>'+esc(v.sem)+'</td><td>'+xs.length+'</td><td>'+L+'</td><td>'+(xs.length-L)+'</td></tr>';
  }).join('');
  return '<table class="hlp-stats"><caption class="micro">'+DATA.length+' sujets relevés, sujets zéro compris.</caption><thead><tr><th scope="col">Entrée</th><th scope="col">Semestre</th><th scope="col">Sujets</th><th scope="col">Interpr. littéraire</th><th scope="col">Interpr. philosophique</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function inject(file,marker,html){
  const f=path.join(ROOT,file);
  let s=fs.readFileSync(f,'utf8');
  const re=new RegExp('(<!-- '+marker+':START -->)[\\s\\S]*?(<!-- '+marker+':END -->)');
  if(!re.test(s)) throw new Error(file+' : marqueurs '+marker+' introuvables');
  s=s.replace(re,'$1\n'+html+'\n$2');
  fs.writeFileSync(f,s);
}

/* ---------- Page par sujet ---------- */
const CHECK={
  interpL:['La réponse porte sur la question posée, pas sur tout le texte.','Chaque étape s’appuie sur des citations précises, analysées (procédé → effet ici), et revient à la question.','Les étapes progressent : la deuxième dit quelque chose que la première ne disait pas.','Le texte est lu comme un texte littéraire : énonciation, images, rythme, composition comptent.'],
  interpP:['La thèse de l’auteur est reformulée avec précision, sans la répéter mot pour mot.','Le raisonnement est reconstitué : distinctions, arguments, exemples, objections éventuelles.','Chaque étape cite le texte et explique ce que la phrase citée fait dans l’argument.','La réponse à la question est explicite en conclusion.'],
  essaiP:['Les mots du sujet sont définis, et vous avez repéré ce que la question tient pour acquis.','Une première réponse plausible est défendue sérieusement avant d’être discutée.','La difficulté naît de cette réponse poussée jusqu’au bout, pas d’une opposition plaquée.','Les références (philosophiques, littéraires, artistiques) font avancer l’argument au lieu de l’illustrer.'],
  essaiL:['La question est rapportée à la littérature et aux arts, pas seulement à des idées générales.','Chaque partie s’appuie sur des œuvres précises, lues pendant l’année ou personnellement.','Les exemples sont analysés : on dit ce que l’œuvre fait, pas seulement ce qu’elle raconte.','La réflexion avance : chaque partie répond à une limite de la précédente.']
};
function step(n,title,task,kind,checks,rows=4){
  return '<article class="exercise hlp-step"><div class="kicker">ÉTAPE '+n+'</div><h3>'+title+'</h3><p class="instruction">'+task+'</p>'
   +'<textarea rows="'+rows+'" aria-label="'+esc(title)+'" data-hlp-save="'+n+'" data-feedback-kind="'+kind+'" data-feedback-instruction="'+esc(task.replace(/<br>/g,' '))+'"></textarea>'
   +'<details class="correction"><summary>Vérifier avec la grille</summary><ul>'+checks.map(c=>'<li>'+c+'</li>').join('')+'</ul></details></article>';
}
function related(x){
  const same=DATA.filter(o=>o.id!==x.id&&o.e===x.e);
  const pick=[...same.filter(o=>o.it!==x.it),...same.filter(o=>o.it===x.it)].sort((a,b)=>Math.abs(a.y-x.y)-Math.abs(b.y-x.y)).slice(0,6);
  return pick.map(o=>'<a href="'+fileName(o)+'"><strong>'+esc(o.a)+', <em>'+esc(o.w)+'</em></strong><span>'+esc(when(o))+' · '+(o.it==='L'?'interprétation littéraire':'interprétation philosophique')+' →</span></a>').join('');
}
function page(x){
  const e=ENTREES[x.e], p=pdfLink(x), file=fileName(x), url=DOMAIN+'/'+file;
  const yearTxt=x.s==='zero'?'sujet zéro':'bac '+x.y;
  let title=x.a+', '+x.w+' : sujet HLP '+(x.s==='zero'?'zéro':x.y);
  if(title.length>60) title=x.a+' : sujet HLP '+(x.s==='zero'?'zéro':x.y)+(x.c&&x.s!=='zero'?' '+x.c:'');
  const twin=DATA.some(o=>o.id!==x.id&&o.a===x.a&&o.w===x.w&&o.y===x.y);
  if(twin&&x.c&&!title.includes(x.c)) title=title+' ('+x.c+')';
  const desc=('Spécialité HLP, '+yearTxt+(x.s!=='zero'?' ('+x.c+(x.j?', jour '+x.j:'')+')':'')+' : '+x.a+', '+x.w+'. '+interpLabel(x)+' : « '+x.iq.replace(/^«\s*|\s*»$/g,'')+' » Essai et entraînement guidé.').replace(/\s+/g,' ');
  const head='Sujet HLP '+(x.s==='zero'?'zéro':x.y+' ('+x.c+(x.j?', jour '+x.j:'')+')')+' : '+x.a+', '+x.w+'.';
  const tails=[' Sujet officiel en PDF, questions et entraînement guidé.',' Sujet officiel et entraînement guidé.',' Entraînement guidé.',''];
  let descShort=head+tails.find(t=>(head+t).length<=155);
  if(descShort.length>155) descShort=descShort.slice(0,152).replace(/\s+\S*$/,'')+'…';
  const ld={'@context':'https://schema.org','@type':'LearningResource','name':title,'inLanguage':'fr','url':url,
    'learningResourceType':'Sujet d’examen','educationalLevel':'Terminale générale','teaches':['Interprétation de texte','Essai argumenté'],
    'about':['Humanités, littérature et philosophie',e?e.label:''].filter(Boolean),
    'isBasedOn':{'@type':'CreativeWork','name':x.w,'author':{'@type':'Person','name':x.a}},
    'hasPart':[{'@type':'Question','name':x.iq},{'@type':'Question','name':x.eq}]};
  const iKind=x.it==='L'?'interpL':'interpP', eKind=x.it==='L'?'essaiP':'essaiL';
  const steps=[
    step(1,'Lire la question d’interprétation','Recopiez le mot ou l’expression qui porte la question.<br>En une phrase : que faut-il montrer ?<br>En une phrase : que la question ne demande-t-elle pas ?','hlp-interp-question',['Le mot recopié est bien celui sur lequel porte la question.','Ce qu’il faut montrer est dit en une phrase, avec les mots de la question.','Vous avez écarté ce que la question ne demande pas : un résumé du texte, un avis personnel.']),
    step(2,'Repérer les appuis dans le texte','Relevez trois passages qui répondent à la question.<br>Pour chacun, écrivez en une phrase ce qu’il apporte de différent.','hlp-interp-reperage',['Les trois passages ne disent pas la même chose.','Chacun est lié à la question par une phrase de votre main.','Vous avez situé les passages dans le mouvement du texte.'],5),
    step(3,'Construire la réponse','Écrivez deux ou trois étapes de réponse, une phrase chacune.<br>Rangez-les pour que chaque étape s’appuie sur la précédente.','hlp-interp-plan',['Chaque étape répond à la question, avec ses mots.','Chaque étape s’appuie sur un passage relevé à l’étape 2.','La dernière étape dit ce que les premières ne suffisaient pas à montrer.'],6),
    step(4,'Comprendre le sujet d’essai','Définissez en une phrase chacun des mots importants du sujet.<br>Puis dites, en une phrase, ce que le sujet oblige à examiner.','hlp-essai-comprendre',['Chaque mot important est défini dans son sens courant.','Vous dites ce que le sujet oblige à examiner, pas seulement de quoi il parle.']),
    step(5,'Construire l’idée','Donnez la première réponse qui paraît juste, avec la raison qui la rend plausible.','hlp-essai-idee',['La réponse est nette (oui, non, à certaines conditions).','La raison est précise et pourrait convaincre quelqu’un.']),
    step(6,'La pousser jusqu’au bout et chercher la difficulté','En une phrase : si cette réponse est vraie, que faut-il admettre ?<br>En une phrase : qu’est-ce qu’elle oblige à sacrifier, ou laisse sans explication ?','hlp-essai-difficulte',['La conséquence découle vraiment de la première réponse.','La difficulté est propre à ce sujet, pas une objection générale.'],5),
    step(7,'Formuler le problème et le plan','Écrivez la problématique en une seule question.<br>Puis écrivez les trois parties, une phrase chacune.','hlp-essai-plan',CHECK[eKind],6)
  ].join('');
  const noteHtml=x.note?'<p class="hlp-note">'+esc(x.note)+'</p>':'';
  const bankNote=x.bank?'<p class="micro">Libellés relevés dans la banque de sujets indexée de l’académie de Lille : le PDF isolé de ce sujet n’est pas en ligne.</p>':'';
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(descShort)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article"><meta property="og:locale" content="fr_FR"><meta property="og:site_name" content="Commentaire Plan">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(descShort)}"><meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<link rel="stylesheet" href="styles.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head><body><header class="top"></header><main class="wrap annale-seo-page hlp-sujet-page">

<section class="pagehead"><div><div class="kicker">ANNALE HLP · ${esc(when(x).toUpperCase())}${x.n?' · SUJET '+x.n+' AU CHOIX':''}</div>
<h1>${esc(x.a)}<br><span>${esc(x.w)}</span></h1>
<p class="lede">${x.s==='zero'?'Sujet zéro publié pour présenter l’épreuve.':'Sujet officiel de la spécialité HLP.'} Un texte, deux questions : ${interpLabel(x).toLowerCase()}, puis ${essaiLabel(x).toLowerCase()}.</p><div class="boussole" aria-label="Avant de commencer"><p><b>D’où vous partez</b>Le texte du sujet, lu deux fois, crayon en main.</p><p><b>Ce que vous faites</b>Sept étapes courtes : trois pour l’interprétation, quatre pour l’essai.</p><p><b>Ce que vous obtenez</b>Un plan pour chacune des deux questions, vérifié avec une grille.</p></div>
</div><aside class="side-note">
${x.code?'<p><strong>Code :</strong> '+esc(x.code)+'</p>':''}<p><strong>Texte :</strong> ${esc(x.a)}, <em>${workTitle(x)}</em>${x.tr?', trad. '+esc(x.tr):''}.</p>
${e?'<p><strong>Entrée du programme :</strong> '+esc(e.label)+' <span class="micro">('+esc(e.sem)+', classement du site)</span></p>':''}
<p>${p.href?`<a class="official-link" href="${esc(p.href)}" rel="noopener">${esc(p.label)} ↗</a>`:`<span class="micro">${esc(p.label)}</span>`}<br><span class="micro">Source : ${esc(p.src)}</span></p>
${noteHtml}${bankNote}</aside></section>

<section class="offer-band"><div class="kicker">LES DEUX QUESTIONS</div><h2>Ce que le sujet demande.</h2>
<div class="grid-2 hlp-questions">
<div><span class="hlp-filter-label">Première partie · ${interpLabel(x)} · 10 points</span><p class="hlp-q">${esc(x.iq)}</p></div>
<div><span class="hlp-filter-label">Deuxième partie · ${essaiLabel(x)} · 10 points</span><p class="hlp-q">${esc(x.eq)}</p></div>
</div>
<p class="micro">${p.href?"Lisez d’abord le texte dans le PDF du sujet. Les questions sont reproduites telles qu’elles figurent sur le sujet.":"Le PDF officiel de ce sujet reste à retrouver. Les questions sont indiquées pour référence ; vérifiez le texte avant de commencer l’exercice."}</p>
</section>

<section class="exercise-wrap hlp-training" data-hlp-id="${x.id}"><div class="exercise-intro"><div><div class="kicker">S’ENTRAÎNER</div><h2>Sept étapes, de la question au plan.</h2></div>
<p>Écrivez avant d’ouvrir la grille : elle ne s’ouvre qu’après une tentative. Vos réponses restent sur cet appareil. En 20 minutes, faites les étapes 1, 4 et 5 ; en une heure, toutes ; en quatre heures, rédigez ensuite le devoir complet sans aide.</p></div>
${steps}
<p><button type="button" class="btn small hlp-clear">Effacer mes réponses</button></p>
</section>

<section class="offer-band"><div class="kicker">MÊME ENTRÉE DU PROGRAMME</div><h2>Sujets proches pour réviser.</h2>
<div class="seo-links">${related(x)}</div>
<p><a class="official-link" href="hlp-annales.html">Tous les sujets HLP →</a> · <a class="official-link" href="hlp-terminale.html">Programme et épreuve de Terminale →</a> · <a class="official-link" href="philosophie-problematisation.html">Construire un problème →</a></p>
</section>

</main>
<script src="hlp-sujet.js"></script>
<script src="site-nav.js"></script>
</body></html>
`;
}

/* ---------- Écriture ---------- */
const keep=new Set(DATA.map(fileName));
if(keep.size!==DATA.length) throw new Error('Deux sujets donnent le même nom de page');
for(const f of fs.readdirSync(ROOT)){
  if(/^hlp-(\d{4}|sujet-zero)-.*\.html$/.test(f) && !keep.has(f)) fs.unlinkSync(path.join(ROOT,f));
}
for(const x of DATA) fs.writeFileSync(path.join(ROOT,fileName(x)),page(x));
inject('hlp-annales.html','HLP-BANK',bank(false));
inject('hlp-professeurs.html','HLP-BANK',bank(true));
inject('hlp-professeurs.html','HLP-STATS',stats());
inject('hlp-annales.html','HLP-COUNT',String(DATA.length));
console.log('HLP : '+DATA.length+' sujets, '+keep.size+' pages générées, '+DATA.filter(localPdf).length+' PDF locaux.');
