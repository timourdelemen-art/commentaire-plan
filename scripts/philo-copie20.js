/* Rendu des « copies à 20 » : la copie complète, chaque phrase avec sa fonction en marge. */
const fs=require('fs');
const path=require('path');
const DATA=JSON.parse(fs.readFileSync(path.join(__dirname,'copies20-data.json'),'utf8'));
const ADDITIONAL=JSON.parse(fs.readFileSync(path.join(__dirname,'copies20-additional.json'),'utf8'));
const LEDGER=JSON.parse(fs.readFileSync(path.join(__dirname,'copies20-resolutions.json'),'utf8'));
require('./check-copies20').assertValid(DATA,LEDGER,ADDITIONAL);
// Typographie : espaces insécables avant ; : ! ? » et après «
const nb=s=>String(s).replace(/ ([;:!?»])/g,' $1').replace(/« /g,'« ');
const esc=s=>nb(String(s==null?'':s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const VITRINE='philosophie-copie-20-s-engager-liberte.html';
// Le numéro du protocole (II.1, III.3…) reste dans les données, jamais dans la page publique.
const fnLabel=f=>String(f).replace(/^\s*(I|II|III)\.\d\s+/u,'');
const dynamicSub=f=>(String(f).match(/^\s*(I|II|III)\.(1|2|3)\s/u)||[]).slice(1).join('.');
const line=(t,f)=>`<p class="c20-s"${dynamicSub(f)?` data-dynamic-sub="${dynamicSub(f)}"`:''}><span class="c20-t">${esc(t)}</span><span class="c20-f">${esc(fnLabel(f))}</span></p>`;
const FUNCTIONS={I:['Établir la première réponse','Fonder cette réponse','Éprouver son fondement'],II:['Établir la seconde réponse','Fonder cette seconde réponse','Éprouver son fondement'],III:['Introduire le travail philosophique nouveau','Démontrer ce qu’il apporte','Répondre au sujet et en mesurer la portée']};
const block=(h,ss,tag)=>{
  let last='';
  const sentences=ss.map(([t,f])=>{
    const sub=dynamicSub(f);
    const prefix=sub&&sub.split('.')[0];
    const n=sub&&Number(sub.split('.')[1]);
    const header=sub!==last&&prefix&&FUNCTIONS[prefix]?
      `<h4 class="c20-subhead" data-dynamic-function="${sub}">${esc(FUNCTIONS[prefix][n-1])}</h4>`:'';
    if(sub)last=sub;
    return header+line(t,f);
  }).join('');
  return `<div class="c20-block"><${tag} class="c20-h">${esc(h)}</${tag}>${sentences}</div>`;
};
// Une transition est une charnière autonome entre deux parties, jamais une phrase de la partie précédente.
const isTransition=pair=>/^Transition\b/i.test(String(pair[1]).trim());
const renderCopy=(d,tag)=>d.map(([heading,sentences])=>{
  const body=sentences.filter(pair=>!isTransition(pair));
  const transitions=sentences.filter(isTransition);
  const bridge=transitions.map(([sentence,functionLabel])=>
    '<div class="c20-bridge" role="group" aria-label="Transition entre les parties">'+
    '<p class="c20-bridge-label">TRANSITION</p>'+line(sentence,functionLabel)+'</div>'
  ).join('');
  return block(heading,body,tag)+bridge;
}).join('');

// Exercice relié à la copie : retrouver les possibilités découvertes avant de lire leur formulation.
function openingExercise(copy, key) {
  const names = ['Première partie', 'Deuxième partie', 'Troisième partie'];
  const markers = [/Ce que la preuve ouvre/, /La possibilité que la seconde preuve révèle/, /Ce que la transformation fait comprendre/];
  const discovered = names.map((name, i) => {
    const P = ['I','II','III'][i];
    const pair = (copy[i+1]?.[1] || []).find(([, fn]) => fn.startsWith(P+'.2') && markers[i].test(fn));
    return {name, text:pair?.[0] || ''};
  });
  if (discovered.some(d => !d.text)) throw new Error('Acquis non retrouvé dans la copie : ' + key);
  const answers = discovered.map(d => '<p><strong>'+esc(d.name)+' :</strong> '+esc(d.text)+'</p>').join('');
  return '<section class="offer-band c20-opening-work" id="decouvertes-'+esc(key)+'">'+
    '<div class="kicker">EXERCICE · PORTÉE DU RAISONNEMENT</div>'+
    '<h2>Ce que chaque partie permet de penser</h2>'+
    '<p>Cachez la copie, puis écrivez vos réponses avant d’ouvrir l’aide.</p>'+
    '<ol>'+
    '<li>Après la première partie, écrivez en une phrase ce qui devient pensable grâce au raisonnement, sans dépasser ce qu’il prouve.</li>'+
    '<li>Après la deuxième partie, écrivez en une phrase ce que son fondement permet d’établir et que le premier n’établissait pas.</li>'+
    '<li>Après la troisième partie, expliquez en une phrase ce que l’opération nouvelle permet précisément de penser et de justifier.</li>'+
    '<li>Reprenez les fins des parties I et II. Énoncez ce que chaque fondement ne permet pas d’établir, puis le travail distinct qu’appelle la transition.</li>'+
    '</ol>'+
    '<details><summary>Comparer avec les acquis des trois parties</summary>'+answers+
    '<p>Vérifiez ensuite : la difficulté finale d’une partie détermine ce que sa preuve ne démontre pas ; la transition formule le travail qui devient nécessaire.</p></details>'+
    '</section>';
}

const BRIDGE_CSS='<style>.c20-subhead{margin:1.2rem 0 .4rem;font-size:.85rem;font-weight:700;letter-spacing:.02em;color:var(--muted,#666)}.c20-bridge{clear:both;margin:1.6rem 0;padding:1rem 1.15rem;border-block:1px solid currentColor}.c20-bridge-label{font-size:.75rem;font-weight:700;letter-spacing:.08em;margin:0 0 .65rem}.c20-bridge .c20-s{margin-bottom:0}</style>';
const stats=d=>({n:d.reduce((a,[,ss])=>a+ss.length,0),w:d.reduce((a,[,ss])=>a+ss.reduce((b,[t])=>b+t.split(/\s+/).length,0),0)});
const TOGGLE=`<script>document.querySelectorAll('.c20-toggle').forEach(function(b){b.addEventListener('click',function(){var c=document.getElementById(b.getAttribute('aria-controls'));c.classList.toggle('c20-plain');b.textContent=c.classList.contains('c20-plain')?'Afficher les fonctions':'Masquer les fonctions';});});</script>`;
function section(key){
  const d=DATA[key]; if(!d) return '';
  const {n,w}=stats(d);
  const pilote=key==="2026-an-artiste-sait";
  return `<section class="offer-band c20-teaser" id="copie-20"><div class="kicker">${pilote?"DISSERTATION DE RÉFÉRENCE":"LA COPIE À 20"}</div><h2>${pilote?"Une dissertation argumentée, construite pour faire progresser le problème.":"Le devoir le plus court qui mérite 20."}</h2>
<p>${pilote?`Environ ${Math.round(w/10)*10} mots. Chaque étape indique sa fonction. Cette proposition n’est pas un modèle unique ni la promesse d’une note.`:`${n} segments annotés, environ ${Math.round(w/10)*10} mots. Chaque segment a sa fonction dans le plan, écrite en marge ; aux charnières, le rôle du lien logique. Lisez-la d’abord avec les fonctions, pour voir la machine, puis sans, pour voir que c’est une vraie copie.`}</p>
<p><button type="button" class="philo-print c20-toggle" aria-controls="c20-${key}">Masquer les fonctions</button></p>
<div class="c20" id="c20-${key}">${renderCopy(d,'h3')}</div>
</section>
${openingExercise(d,key)}
${BRIDGE_CSS}
${TOGGLE}
`;
}
function vitrine(key='notion-liberte',meta=null){
  const d=DATA[key]; const {n,w}=stats(d);
  const subject=meta?meta.title:'S’engager, est-ce renoncer à sa liberté ?';
  const filename=meta?meta.file:VITRINE;
  const extraLinks=Object.entries(ADDITIONAL).map(([k,m])=>`<li><a href="${esc(m.file)}">${esc(m.title)}</a> · ${esc(m.exam)}</li>`).join('');
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(subject)} : copie à 20 en philosophie</title>
<meta name="description" content="Une dissertation de philosophie qui mérite 20, la plus courte possible : « ${esc(subject)} ». Chaque segment annoté, sa fonction dans le plan.">
<link rel="canonical" href="https://commentaire-plan.com/${filename}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · LA COPIE À 20</div>
<h1>« ${esc(subject)} »</h1>
${meta?`<p class="micro">${esc(meta.exam)} · ${esc(meta.code)} · <a class="official-link" href="${esc(meta.source)}">Annales officielles →</a></p>`:''}
<p class="lede">Le devoir le plus court qui mérite 20 : ${n} segments annotés, environ ${Math.round(w/10)*10} mots. Chaque segment a sa fonction dans le plan ; elle est écrite en marge, avec, aux charnières, le rôle du lien logique.</p>
</div><aside class="side-note"><p><strong>Comment lire ?</strong><br>D’abord avec les fonctions, pour voir la machine. Puis sans, pour voir que c’est une vraie copie.</p><p><button type="button" class="philo-print c20-toggle" aria-controls="c20-vitrine">Masquer les fonctions</button></p></aside></section>
<section class="offer-band c20" id="c20-vitrine">${renderCopy(d,'h2')}</section>
${openingExercise(d,key)}
<section class="offer-band"><div class="kicker">POURQUOI CETTE COPIE MÉRITE 20</div><h2>Rien n’y est décoratif.</h2>
<div class="grid-3"><div><strong>Un problème réel</strong><p>Les deux réponses perdent quelque chose, et la problématique le dit en une seule question.</p></div><div><strong>Un plan qui avance</strong><p>Chaque limite naît de l’idée poussée jusqu’au bout ; chaque transition en fait une question. Aucun « d’abord », aucun « de plus » : les liens sont dans la pensée.</p></div><div><strong>Des auteurs qui travaillent</strong><p>Les références sont choisies pour accomplir quelque chose : pousser l’idée, porter la réponse, réaliser l’opération.</p></div></div>
<p>Les copies à 20 : sur les pages des sujets du bac 2026 (<a class="official-link" href="philosophie-annales.html">les annales →</a>) et de chaque notion (<a class="official-link" href="philosophie-notions.html">les 17 notions →</a>).</p>
${key==='2025-me-verite'?`<section class="offer-band"><div class="kicker">EXERCICE · LA PORTÉE DE « TOUJOURS »</div><h2>Une vérité qui ne convainc pas</h2>
<ol>
<li>Écrivez en une phrase une affirmation vraie qu'une personne refuse de reconnaître.</li>
<li>Expliquez en une phrase pourquoi ce refus ne rend pas l'affirmation fausse.</li>
<li>Expliquez en une phrase pourquoi ce cas suffit à contester « toujours ».</li>
<li>Proposez en deux phrases une manière de rendre une preuve vérifiable par autrui.</li>
<li>Expliquez en une phrase pourquoi cette vérification ne garantit pas l'accord.</li>
</ol>
<details><summary>Vérifier votre raisonnement</summary><p>Le refus d'un interlocuteur n'invalide pas la preuve : il réfute seulement l'affirmation qu'une vérité entraîne toujours l'adhésion. Une explication peut rendre les raisons accessibles, mais ne produit pas automatiquement leur examen.</p></details>
</section>`:''}
<h3>Trois nouveaux sujets, pour refaire le travail</h3><ul>${extraLinks}</ul>
<p><a class="official-link" href="philosophie-notion-${meta?esc(meta.notion):'liberte'}.html">Travailler la notion →</a> · <a class="official-link" href="philosophie-dissertation.html#liens">L’architecture logique d’une dissertation →</a></p></section>
</main><script src="site-nav.js"></script>
${BRIDGE_CSS}
${TOGGLE}
</body></html>
`;
}
function writeAdditional(root){
  for(const [key,meta]of Object.entries(ADDITIONAL))fs.writeFileSync(path.join(root,meta.file),vitrine(key,meta));
}
module.exports={teaser:section,section,vitrine,writeAdditional,VITRINE,has:k=>Boolean(DATA[k]),renderCopy,openingExercise,BRIDGE_CSS,TOGGLE};
