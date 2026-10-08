#!/usr/bin/env node
/* Génère les pages « notions » de philosophie à partir de philosophie-notions-data.js :
   - philosophie-notions.html (les 17 notions) ;
   - philosophie-notion-<slug>.html (une page par notion : ce qu’elle demande, repères, cinq sujets du bac, un corrigé complet).
   Les corrigés « annale » renvoient au corrigé 2026 de philosophie-annales-data.js.
   Idempotent : relancer le script réécrit les pages. */
const fs=require('fs');
const path=require('path');
const {annaleFile}=require('./philo-paths');
const C20=require('./philo-copie20');
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


function atelierHtml(n,corr){
  const A=n.atelier, E=A.essentiel, T=6;
  const stepHead=(k,h)=>`<div class="atelier-progress">Étape ${k} sur ${T}</div><h2>${h}</h2>`;
  const next=k=>k<T?`<p class="atelier-nav"><button type="button" class="btn red atelier-next">Étape suivante →</button></p>`:'';
  const essentiel=`<section class="offer-band" id="essentiel"><div class="kicker">L’ESSENTIEL EN CINQ MINUTES</div><h2>Trois distinctions, trois auteurs.</h2>
<div class="grid-3">${E.distinctions.map(d=>`<div><strong>${esc(d[0])}</strong><p>${esc(d[1])}</p></div>`).join('')}</div>
<h3 class="essentiel-sub">Trois auteurs, et ce qu’ils permettent de faire</h3>
<div class="sequence-spec">${E.auteurs.map(a=>`<p><strong>${esc(a[0])}</strong>, <em>${esc(a[1])}</em>. ${esc(a[2])} <span class="essentiel-use">Ce qu’il permet : ${esc(a[3])}</span></p>`).join('')}</div>
<p class="micro">Un auteur n’est utile que s’il fait avancer votre raisonnement. Un devoir sans auteur peut être excellent ; ces trois-là sont des outils, pas des passages obligés.</p>
<p>Le plus souvent, ${esc(lower(n))} demande deux choses qui se gênent : ${esc(n.d1)}, et ${esc(n.d2)}. Mais attention : selon les mots du sujet, ce qui coince peut changer. C’est l’objet de l’étape 2 de l’atelier.</p>
</section>`;
  const q=A.qcm;
  const s1=`<section class="exercise-wrap atelier-step" data-step="1"><article class="exercise">${stepHead(1,'Choisir la problématique, puis nommer les erreurs.')}
<p class="quote">Sujet : « ${esc(q.sujet)} »</p><p class="instruction">Cliquez sur la formulation qui passe le test du gant. Pour chacune des trois autres, choisissez son erreur dans la liste.</p>
<div class="philo-qcm"><ol class="qcm-options">${q.options.map(o=>o[0]==='ok'?`<li data-ok="1" data-why="${esc(o[2])}">${esc(o[1])}</li>`:`<li data-error="${o[0]}" data-why="${esc(o[2])}">${esc(o[1])}</li>`).join('')}</ol></div>
${next(1)}</article></section>`;
  const s2=`<section class="exercise-wrap atelier-step" data-step="2"><article class="exercise">${stepHead(2,'Même notion, autre sujet : ce qui coince change.')}
<p class="instruction">Pour chaque sujet, choisissez la tension qui vient vraiment de ses mots.</p>
${A.autre.map(a=>`<p class="quote">« ${esc(a.sujet)} »</p><div class="atelier-choice">${a.options.map(o=>`<button type="button" class="choice" data-ok="${o[1]}" data-why="${esc(o[2])}">${esc(o[0])}</button>`).join('')}<div class="atelier-why" aria-live="polite"></div></div>`).join('')}
<p class="micro">Retenez-le : on ne plaque pas sur un sujet les deux exigences apprises par cœur. On les cherche dans les mots du sujet.</p>
${next(2)}</article></section>`;
  const s3=`<section class="exercise-wrap atelier-step" data-step="3"><article class="exercise">${stepHead(3,'Retrouver le mouvement d’une partie.')}
<p class="instruction">Voici les trois paragraphes d’une partie, dans le désordre (sujet : « ${esc(n.corrige.pb?n.sujets[0][0]:'')} »). Pour chacun, dites à quoi il sert. Une partie n’est pas une liste d’arguments : elle avance.</p>
${A.ordre.map(o=>`<div class="atelier-ordre"><p><strong>${esc(o.titre)}</strong></p>${o.items.map(it=>`<div class="ordre-item"><p>${esc(it[1])}</p><label>Ce paragraphe : <select data-role="${it[0]}"><option value="">choisir…</option>${o.roles.map((r,k)=>`<option value="${k}">${esc(r)}</option>`).join('')}</select></label></div>`).join('')}<p><button type="button" class="philo-print ordre-check">Vérifier</button></p><div class="atelier-why" aria-live="polite"></div></div>`).join('')}
${next(3)}</article></section>`;
  const t=A.transition;
  const s4=`<section class="exercise-wrap atelier-step" data-step="4"><article class="exercise">${stepHead(4,'Écrire la transition.')}
<p class="quote">Sujet : « ${esc(t.sujet)} »</p>
<p class="instruction">${esc(t.acquis)} ${esc(t.limite)} Écrivez la transition vers la partie II, en deux phrases : ce que nous venons d’établir ; mais ce que cela perd. Puis une question ouverte sur ce reste.</p>
<textarea rows="4" data-feedback-kind="philo-transition" data-feedback-quote="${esc(t.sujet)}" aria-label="Votre transition"></textarea>
<details class="correction"><summary>Comparer avec une transition possible</summary><p>${esc(t.corrige)}</p><p class="micro">La question ne contient pas sa réponse : elle ouvre la partie II.</p></details>
${next(4)}</article></section>`;
  const sc=A.scene;
  const s5=`<section class="exercise-wrap atelier-step" data-step="5"><article class="exercise">${stepHead(5,'Trouver une scène pour l’introduction.')}
<p class="quote">Sujet : « ${esc(sc.sujet)} »</p>
<p class="instruction">Trouvez une scène (un roman, un film, un moment d’histoire, une anecdote) où le problème se voit. Racontez-la en deux ou trois phrases, puis dites en une phrase ce qu’elle montre. Une bonne scène contient déjà les deux réponses, pas seulement le thème.</p>
<textarea rows="5" data-feedback-kind="philo-scene" data-feedback-quote="${esc(sc.sujet)}" aria-label="Votre scène"></textarea>
<details class="correction"><summary>Comparer avec une scène possible</summary><p>${esc(sc.corrige)}</p><p><strong>Ce qu’elle montre :</strong> ${esc(sc.montre)}</p></details>
${next(5)}</article></section>`;
  const s6=`<section class="exercise-wrap atelier-step" data-step="6" id="corrige"><article class="exercise">${stepHead(6,'Une dissertation complète, du brouillon à la conclusion.')}
${corr}
<p class="atelier-done">Atelier terminé. Pour aller plus loin, les cinq sujets ci-dessous attendent votre problématique.</p></article></section>`;
  return essentiel+`
<section class="offer-band atelier-intro" id="atelier"><div class="kicker">L’ATELIER</div><h2>Six étapes, une à la fois.</h2><p>De la problématique à la dissertation complète. Chaque étape se corrige avant de passer à la suivante. Comptez environ une heure, en une ou plusieurs fois. <button type="button" class="atelier-all philo-print">Afficher tout l’atelier</button></p></section>
`+s1+s2+s3+s4+s5+s6;
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
<p class="lede">${n.atelier?'L’essentiel en cinq minutes, un atelier en six étapes de la problématique à la dissertation complète, puis cinq vrais sujets du bac pour s’entraîner.':'Ce que la notion demande, les repères du programme qui l’éclairent, cinq vrais sujets du bac pour s’entraîner, et un sujet traité en entier.'}</p>
</div><aside class="side-note"><p><strong>Comment travailler ?</strong><br>Pour chaque sujet, cherchez d’abord seul ; n’ouvrez les pistes qu’ensuite. Les pistes suffisent sans IA ; « Vérifier ma réponse » donne en plus un retour sur votre problématique.</p><p><a href="philosophie-notions.html">← Les 17 notions</a></p></aside></section>

${n.atelier?atelierHtml(n,corr)+`
<section class="exercise-wrap" id="sujets"><div class="exercise-intro"><div><div class="kicker">CINQ VRAIS SUJETS DU BAC</div><h2>S’entraîner à trouver le problème.</h2></div><p>Tous ces sujets ont été donnés au baccalauréat. ${n.corrige.annale?'Plus bas, un sujet de 2026 est traité en entier.':'Le premier est traité en entier plus bas.'}</p></div>
${sujets}
</section>

`:`<section class="offer-band"><div class="kicker">CE QUE LA NOTION DEMANDE</div><h2>Deux exigences qui se gênent.</h2>
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

`}
${n.corrige.annale?'':C20.teaser('notion-'+n.slug)}<section class="offer-band"><div class="kicker">ET ENSUITE ?</div><h2>Continuer le travail.</h2>
<div class="seo-links">
<a href="philosophie-dissertation.html"><strong>Construire la dissertation</strong><span>Introduction, trois parties, transitions, conclusion →</span></a>
<a href="philosophie-dissertation-entrainement.html"><strong>S’entraîner geste par geste</strong><span>Des exercices courts, chacun corrigé →</span></a>
<a href="${file(prev)}"><strong>← ${esc(prev.nom)}</strong><span>Notion précédente</span></a>
<a href="${file(next)}"><strong>${esc(next.nom)} →</strong><span>Notion suivante</span></a>
</div></section>
`+(n.atelier?'<script src="philosophie-qcm.js"></script><script src="philosophie-atelier.js"></script>':'')+foot;
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
fs.writeFileSync(path.join(ROOT,C20.VITRINE),C20.vitrine());
console.log(`Notions philosophie : ${NOTIONS.length} pages + philosophie-notions.html`);
