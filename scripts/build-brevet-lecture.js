#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path');
const data=require('./brevet-lecture-data.json');
const repartir=require('./repartir-choix');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={lecture:'Lecture et interprétation',reecriture:'Réécriture'};
const words=r=>r.model.reduce((n,p)=>n+p[0].trim().split(/\s+/u).length,0);
function validate(){
 const ids=new Set();for(const r of data.cases){
 if(ids.has(r.id)||!/^20(22|23)-q[0-9]+[a-c]?$/.test(r.id))throw Error('Identifiant : '+r.id);ids.add(r.id);
 if(!r.source.startsWith('https://www.education.gouv.fr/')||!r.code||!r.question||r.stages.length!==3||r.criteria.length!==3||!r.model.length)throw Error('Cas incomplet : '+r.id);
 if(r.choices.length!==3||new Set(r.choices.map(c=>c[1])).size!==3)throw Error('Trois états : '+r.id);
 for(const c of r.choices)if(!['Solide','Défendable','À revoir'].includes(c[1])||!c[2])throw Error('Retour absent');
 for(const p of r.model)if(p.length!==2||!p.every(Boolean))throw Error('Annotation absente');
 }
}
function area(id, label, rows = 5, exam = false) {
  return `<label class="ecrire-label" for="${id}">${esc(label)}</label><textarea id="${id}" rows="${rows}" data-draft="${id}" data-feedback="off"${exam ? ' data-sans-dictee="true"' : ''}></textarea>`;
}

function response(s, r) {
  const id = `${s.id}-${r.id}`;
  const interp = true;
  const stages = r.stages.map(([task, hint, expected], i) => `<article class="ecrire-step" data-step="${i}"${i ? ' hidden' : ''}><p class="kicker">ÉTAPE ${i + 1} / ${r.stages.length}</p><h4>${esc(task)}</h4>
${area(`${id}-etape-${i}`, 'Votre réponse', 5)}<details><summary>Une aide</summary><p>${esc(hint)}</p></details>
<details><summary>Comparer après avoir écrit</summary><p>${esc(expected)}</p><p class="micro">Ce repère n’est pas la seule réponse possible. Reprenez votre texte si une raison ou un appui manque.</p></details></article>`).join('\n');
  return `<section class="exercise-wrap" id="${r.id}" data-parcours="${id}"><div class="kicker">${esc(labels[r.kind])} · QUESTION OFFICIELLE · BREVET</div>
<h2>${esc(r.question)}</h2><nav class="ecrire-levels" aria-label="Niveaux : ${esc(labels[r.kind])}">
${['Au clic','J’écris un peu','J’écris tout'].map((x,i) => `<button type="button" data-level="${i+1}" aria-pressed="${i===0}"><b>Niveau ${i+1}</b><span>${x}</span></button>`).join('')}</nav>
<p class="ecrire-storage" data-save-status role="status">Vos brouillons restent dans ce navigateur si l’enregistrement est disponible.</p>
<section data-panel="1"><h3>Choisissez une piste, puis justifiez-la.</h3><p>Quelle piste répond le plus précisément à la question ? Lisez d’abord le texte officiel.</p>
<div class="ecrire-choices">${repartir(r.choices,data.cases.findIndex(x=>x.id===r.id)).map(({choice:[text,status,reason],index:i})=>`<button type="button" data-choice="${i}" data-outcome="${esc(status)}" data-reason="${esc(reason)}" aria-pressed="false">${esc(text)}</button>`).join('')}</div>
<p data-choice-feedback role="status"></p>${area(`${id}-justification`, r.kind==='reecriture' ? 'Expliquez en une phrase un changement de pronom ou d’accord.' : 'Justifiez votre choix en une ou deux phrases avec les mots du texte.', 3)}
<p><button type="button" class="btn" data-goto-level="2">Écrire sans propositions →</button></p></section>
<section data-panel="2" hidden><h3>Trois gestes pour préparer votre réponse.</h3><nav class="ecrire-stages" aria-label="Étapes de rédaction">${r.stages.map((_,i)=>`<button type="button" data-goto-step="${i}" aria-pressed="${i===0}">${i+1}</button>`).join('')}</nav>${stages}
<div class="ecrire-actions"><button type="button" data-previous-step>← Étape précédente</button><button type="button" data-next-step>Étape suivante →</button><button type="button" data-goto-level="3">Rédiger toute la réponse →</button></div></section>
<section data-panel="3" hidden><h3>Rédigez votre réponse complète.</h3><p class="ecrire-question">${esc(r.question)}</p><p>Gardez le texte officiel ouvert. Rédigez sans propositions ni étapes guidées. La longueur dépend de ce que votre réponse doit établir.</p>
${area(`${id}-copie`, 'Votre réponse complète', 18, true)}<p><button type="button" class="btn" data-compare>Comparer après rédaction ↓</button></p></section>
<div class="ecrire-actions"><button type="button" data-previous-level>← Niveau précédent</button><button type="button" data-next-level>Niveau suivant →</button><button type="button" data-restart>Revenir au début</button><button type="button" data-erase>Effacer ces brouillons</button></div>
<details class="ecrire-model" data-model><summary>Réponse modèle annotée : ${words(r)} mots pour cette réponse</summary>
<p class="micro">Réponse originale du site à la question officielle. Rédaction originale du site, non copie d’élève notée par un jury. ${words(r)} mots hors annotations : la quantité demandée par la question reste prioritaire.</p>
<button type="button" data-annotations aria-pressed="true">Masquer les annotations</button><div class="ecrire-copy">${r.model.map(([text,note])=>`<div class="ecrire-row"><p data-model-text>${esc(text).replace(/\n/g,'<br>')}</p><aside class="ecrire-annotation">${esc(note)}</aside></div>`).join('')}</div>
<h3>Relisez votre réponse avec trois critères.</h3><ul>${r.criteria.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p>Reprenez un passage de votre réponse pour satisfaire l’un de ces critères. Aucune note n’est calculée automatiquement.</p>
${area(`${id}-reprise`, 'Votre passage réécrit', 5)}<p class="micro">${interp?'Le modèle propose une lecture justifiée ; une autre lecture peut être excellente si elle répond à la question et respecte le texte.':'L’ordre des paragraphes appartient à cette réponse ; il ne constitue pas un plan à recopier sur tous les sujets.'}</p></details></section>`;
}

function page(){
const sections=data.cases.map(r=>`<div class="ecrire-reference"><p class="kicker">${esc(r.author)} · ${r.year} · ${esc(r.code)}</p><p>${esc(r.work)}. <a href="${esc(r.source)}" target="_blank" rel="noopener">Lire le sujet officiel (PDF) ↗</a> — ${esc(r.sourcePages)}</p><p>La question est recopiée du sujet. Les aides et modèles sont une proposition du site, pas un corrigé officiel.</p></div>`+response({id:'brevet'}, {...r,kind:r.id==='2022-q11'||r.id==='2023-q10'?'reecriture':'lecture'})).join('\n');
return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Brevet : huit questions, trois niveaux, réponses annotées</title><meta name="description" content="Lecture et réécriture du brevet : huit questions officielles de La Fontaine et George Sand, aides progressives et modèles annotés."><link rel="canonical" href="https://commentaire-plan.com/brevet-lecture-parcours.html"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="brevet-lecture-parcours.css"></head><body><header class="top"></header><main class="wrap ecrire">
<section class="pagehead"><div><div class="kicker">COLLÈGE · PRÉPARER LE BREVET</div><h1>Lire précisément.<br>Écrire une réponse prouvée.</h1><p class="lede">Huit questions officielles, avec des aides que vous pouvez ouvrir ou laisser fermées.</p><div class="boussole"><p><b>D’où vous partez</b>Un texte du brevet et une question précise.</p><p><b>Ce que vous faites</b>Vous choisissez et justifiez, vous écrivez avec des aides, puis vous répondez seul.</p><p><b>Ce que vous obtenez</b>Une réponse à relire avec un modèle annoté, puis à refaire sur une autre question.</p></div></div><aside class="side-note"><a href="#questions">Choisir une question ↓</a><p><a href="brevet-comprehension.html">La méthode de lecture →</a></p><p><a href="brevet-reecriture.html">La méthode de réécriture →</a></p></aside></section>
<section class="offer-band"><h2>La consigne décide de la réponse.</h2><p>Avant d’écrire, repérez le verbe et la quantité demandée : trois indices, deux idées, une phrase à transformer. Une citation ne suffit pas : expliquez ce qu’elle prouve. Pour la réécriture, gardez les mots que la consigne ne demande pas de modifier.</p><p>Ouvrez le PDF officiel à côté de l’exercice. Vous pouvez commencer directement au niveau 3 et revenir aux aides. Le modèle donne une réponse possible, sans note automatique. Avoir réussi au clic ne prouve pas encore que vous saurez écrire seul.</p></section>
<nav class="offer-band" id="questions" aria-label="Choisir une question"><h2>Six questions de lecture, deux réécritures.</h2><ul>${data.cases.map(r=>`<li><a href="#${esc(r.id)}">${r.year} · ${esc(r.author)} · question ${esc(r.step.slice(1))}</a></li>`).join('')}</ul></nav>
${sections}
<section class="offer-band"><h2>Refaire le geste sur un autre sujet.</h2><p>Choisissez une autre question ci-dessus et commencez sans aide. Pour un nouveau texte : <a href="annales/entrainement-annale.html?id=brevet-2026-general-zola-cage-betes-feroces&amp;mode=targeted&amp;step=q5">Zola, brevet 2026 : expliquer le point de vue des animaux →</a>.</p><p><a href="anthologie-brevet.html">Faire une annale →</a> · <a href="brevet-redaction.html">Passer à la rédaction →</a></p><p class="micro">Ces exercices préparent les gestes de lecture et de réécriture de fin de collège ; ils ne constituent pas une progression complète de la 6e à la 3e.</p></section></main><script src="brevet-lecture-parcours.js"></script><script src="site-nav.js"></script></body></html>\n`;
}
function build(root=path.resolve(__dirname,'..')){validate();fs.writeFileSync(path.join(root,'brevet-lecture-parcours.html'),page());console.log('Brevet lecture : '+data.cases.length+' modèles, '+data.cases.reduce((n,r)=>n+r.stages.length,0)+' tâches partielles.');}
module.exports={data,build,validate,page,words};if(require.main===module)build();
