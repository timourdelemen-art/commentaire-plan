#!/usr/bin/env node
/* Génère les pages « notions » de philosophie à partir de philosophie-notions-data.js :
   - philosophie-notions.html (les 17 notions) ;
   - philosophie-notion-<slug>.html (une page par notion : ce qu’elle demande, repères, cinq sujets du bac, un corrigé complet).
   Les corrigés « annale » renvoient au corrigé 2026 de philosophie-annales-data.js.
   Idempotent : relancer le script réécrit les pages. */
const fs=require('fs');
const path=require('path');
const {annaleFile}=require('./philo-paths');
const ROOT=path.resolve(__dirname,'..');
const DOMAIN='https://commentaire-plan.com';
global.window={};
require(path.join(ROOT,'philosophie-notions-data.js'));
require(path.join(ROOT,'philosophie-annales-data.js'));
const NOTIONS=window.PHILO_NOTIONS;
const ANNALES=(window.PHILO_ANNALES_2026||[]).flatMap(s=>s.subjects.map(x=>Object.assign({center:s.center},x)));
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const file=n=>'philosophie-notion-'+n.slug+'.html';
const PRINT='<p class="print-line"><button type="button" class="philo-print" onclick="document.querySelectorAll(\'details\').forEach(function(d){d.open=true});window.print()">Imprimer la fiche (pistes et corrigé compris)</button></p>';
const lower=n=>n.nom.replace(/^L’/,'l’').replace(/^La /,'la ').replace(/^Le /,'le ');

function head(title,desc,canon){
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${DOMAIN}/${canon}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
`;
}
const foot='\n</main><script src="site-nav.js"></script></body></html>\n';

function corrigeBlocks(c){
  const p=(l,t)=>t?`<p><strong>${l} :</strong> ${esc(t)}</p>`:'';
  const part=(pt,i)=>`<p><strong>${['I','II','III'][i]}. ${esc(pt[0])}</strong></p><ul class="plan-sous">${pt.slice(1).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  return `<details class="correction"><summary>1. Le travail au brouillon</summary>${p('Les mots du sujet',c.mots)}${p('Ce que la notion demande',c.demande)}${p('Première réponse',c.oui)}${p('Réponse contraire',c.non)}${p('Problématique',c.pb)}</details>
<details class="correction"><summary>2. L’introduction rédigée</summary><p>${esc(c.intro)}</p></details>
<details class="correction"><summary>3. Le plan détaillé</summary>${part(c.parties[0],0)}<p class="plan-transition"><em>Transition.</em> ${esc(c.transitions[0])}</p>${part(c.parties[1],1)}<p class="plan-transition"><em>Transition.</em> ${esc(c.transitions[1])}</p>${part(c.parties[2],2)}</details>
<details class="correction"><summary>4. La conclusion rédigée</summary><p>${esc(c.conclusion)}</p></details>`;
}

function notionPage(n,i){
  const prev=NOTIONS[(i+NOTIONS.length-1)%NOTIONS.length], next=NOTIONS[(i+1)%NOTIONS.length];
  const title=`${n.nom.replace(/^./,c=>c.toUpperCase())} : sujets du bac de philo et corrigé`;
  const desc=`${n.nom} en philosophie : ce que la notion demande, cinq vrais sujets du bac avec une piste et une scène d’ouverture, et une dissertation entièrement corrigée.`;
  let corr;
  if(n.corrige.annale){
    const a=ANNALES.find(x=>x.id===n.corrige.annale);
    if(!a) throw new Error('Annale introuvable : '+n.corrige.annale);
    corr=`<p class="quote">« ${esc(a.title)} »</p><p class="instruction">Sujet du bac 2026 (${esc(a.center)}). Le corrigé complet est sur sa page : le travail au brouillon, l’introduction rédigée, le plan détaillé en trois parties et la conclusion.</p>
<p><strong>Sa problématique :</strong> ${esc(a.pb)}</p>
<p><a class="btn red" href="${annaleFile(a)}">Travailler ce sujet et lire le corrigé →</a></p>`;
  }else{
    const s=n.sujets[0][0];
    corr=`<p class="quote">« ${esc(s)} »</p><p class="instruction">Faites d’abord le travail vous-même, au brouillon : les mots du sujet, ce que chaque réponse perd, la problématique, le plan. Ouvrez ensuite le corrigé, étape par étape.</p>
${corrigeBlocks(n.corrige)}
<p class="micro">Ce n’est pas la seule réponse juste : une autre problématique est bonne si elle passe le test du gant. Les auteurs cités ne sont là que parce qu’ils font avancer l’idée ; un devoir sans eux peut être excellent.</p>`;
  }
  corr+=PRINT;
  const sujets=n.sujets.map((s,k)=>`<article class="exercise notion-sujet"><div class="kicker">SUJET ${k+1}</div><p class="quote">« ${esc(s[0])} »</p>
<p class="instruction">Avant d’ouvrir les pistes : quelle première réponse vient à l’esprit, et que perd-elle si on la pousse jusqu’au bout ? Même question pour la réponse contraire. Puis écrivez votre problématique : une seule question, qui laisse les deux réponses ouvertes.</p>
<textarea rows="4" data-feedback-kind="philo-problematique" data-feedback-quote="${esc(s[0])}" data-feedback-instruction="Sujet de dissertation : « ${esc(s[0])} ». L’élève propose sa problématique : une seule question qui fait voir ce que chaque réponse perd et laisse les deux réponses ouvertes." aria-label="Votre problématique pour ce sujet"></textarea>
<details class="correction"><summary>Ce qui coince</summary><p>${esc(s[1])}</p></details>
<details class="correction"><summary>Une scène pour l’introduction</summary><p>${esc(s[2])}</p><p class="micro">Une bonne scène contient déjà le problème : à vous de montrer en quoi.</p></details></article>`).join('\n');
  return head(title,desc,file(n))+`
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · LES 17 NOTIONS</div>
<h1>${esc(n.nom)}.</h1>
<p class="lede">Ce que la notion demande, les repères du programme qui l’éclairent, cinq vrais sujets du bac pour s’entraîner, et un sujet traité en entier.</p>
</div><aside class="side-note"><p><strong>Comment travailler ?</strong><br>Pour chaque sujet, cherchez d’abord seul ; n’ouvrez les pistes qu’ensuite. Les pistes suffisent sans IA ; « Vérifier ma réponse » donne en plus un retour sur votre problématique.</p><p><a href="philosophie-notions.html">← Les 17 notions</a></p></aside></section>

<section class="offer-band"><div class="kicker">CE QUE LA NOTION DEMANDE</div><h2>Deux exigences qui se gênent.</h2>
<div class="grid-3">
<div><strong>Elle demande…</strong><p>${esc(n.d1)}.</p></div>
<div><strong>…et aussi</strong><p>${esc(n.d2)}.</p></div>
<div><strong>Pourquoi ça coince</strong><p>${esc(n.coince.replace(/^./,c=>c.toUpperCase()))}.</p></div>
</div>
<p>Presque tous les sujets sur ${esc(lower(n))} viennent de là : chaque réponse s’appuie sur l’une de ces exigences et risque de sacrifier l’autre. Votre problématique doit faire voir ce double risque. <a class="official-link" href="philosophie-problematisation.html">Trouver le problème d’un sujet →</a></p>
</section>

<section class="offer-band"><div class="kicker">LES REPÈRES DU PROGRAMME</div><h2>Deux distinctions utiles ici.</h2>
<div class="sequence-spec">${n.reperes.map(r=>`<p><strong>${esc(r[0])}.</strong> ${esc(r[1])}</p>`).join('')}</div>
<p class="micro">Le programme de Terminale donne une liste de « repères », des distinctions à savoir employer. Ils servent souvent à construire la troisième partie.</p>
</section>

<section class="exercise-wrap" id="sujets"><div class="exercise-intro"><div><div class="kicker">CINQ VRAIS SUJETS DU BAC</div><h2>S’entraîner à trouver le problème.</h2></div><p>Tous ces sujets ont été donnés au baccalauréat. ${n.corrige.annale?'Plus bas, un sujet de 2026 est traité en entier.':'Le premier est traité en entier plus bas.'}</p></div>
${sujets}
</section>

<section class="exercise-wrap" id="corrige"><article class="exercise"><div class="kicker">UN SUJET TRAITÉ EN ENTIER</div><h2>Une dissertation, du brouillon à la conclusion.</h2>
${corr}
</article></section>

<section class="offer-band"><div class="kicker">ET ENSUITE ?</div><h2>Continuer le travail.</h2>
<div class="seo-links">
<a href="philosophie-dissertation.html"><strong>Construire la dissertation</strong><span>Introduction, trois parties, transitions, conclusion →</span></a>
<a href="philosophie-dissertation-entrainement.html"><strong>S’entraîner geste par geste</strong><span>Des exercices courts, chacun corrigé →</span></a>
<a href="${file(prev)}"><strong>← ${esc(prev.nom)}</strong><span>Notion précédente</span></a>
<a href="${file(next)}"><strong>${esc(next.nom)} →</strong><span>Notion suivante</span></a>
</div></section>
`+foot;
}

function hub(){
  return head('Les 17 notions de philosophie : sujets du bac','Les 17 notions du programme de philosophie de Terminale : pour chacune, ce qu’elle demande, cinq vrais sujets du bac et une dissertation corrigée.','philosophie-notions.html')+`
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · TERMINALE</div>
<h1>Les 17 notions<br>du programme.</h1>
<p class="lede">Vous avez un devoir sur la liberté, le travail ou la vérité ? Choisissez la notion : vous y trouverez ce qu’elle demande, cinq vrais sujets du bac pour vous entraîner, et une dissertation corrigée en entier.</p>
</div><aside class="side-note"><p><strong>Une notion, deux exigences.</strong><br>Chaque notion demande deux choses qui se gênent. C’est de là que viennent presque tous les sujets.</p><p><a href="philosophie.html">← Le parcours en cinq étapes</a></p></aside></section>

<section class="offer-band"><div class="kicker">CHOISIR UNE NOTION</div><h2>Ce qui coince, notion par notion.</h2>
<div class="seo-links">
${NOTIONS.map(n=>`<a href="${file(n)}"><strong>${esc(n.nom)}</strong><span>${esc(n.coince.replace(/^./,c=>c.toUpperCase()))} →</span></a>`).join('\n')}
</div></section>

<section class="offer-band"><div class="kicker">D’OÙ VIENNENT LES SUJETS ?</div><h2>Uniquement des sujets donnés au bac.</h2>
<p>Tous les sujets proposés ici ont été réellement donnés au baccalauréat, entre 1996 et 2026. Ils viennent du recueil de l’académie de Montpellier, classé selon les notions du programme, et des sujets officiels de 2026. <a class="official-link" href="philosophie-annales.html">Toutes les annales →</a></p>
</section>
`+foot;
}

NOTIONS.forEach((n,i)=>fs.writeFileSync(path.join(ROOT,file(n)),notionPage(n,i)));
fs.writeFileSync(path.join(ROOT,'philosophie-notions.html'),hub());
console.log(`Notions philosophie : ${NOTIONS.length} pages + philosophie-notions.html`);
