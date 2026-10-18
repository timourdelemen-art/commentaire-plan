#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const data = require('./explication-textes-data.json');
const DOMAIN = 'https://commentaire-plan.com';
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const file = s => `philosophie-explication-${s.id}.html`;
const words = m => m.paragraphs.reduce((n, p) => n + p[1].trim().split(/\s+/u).length, 0);
const sentences = m => m.paragraphs.reduce((n,p)=>n+p[3].length,0);
function validate() {
  const ids = new Set();
  for (const s of data.subjects) {
    if (ids.has(s.id) || !/^[a-z-]+-20\d{2}-[a-z-]+$/.test(s.id) || !s.id.includes(`-${s.year}-`)) throw Error(`Identifiant : ${s.id}`);
    ids.add(s.id);
    if (!/^https:\/\/(www\.education\.gouv\.fr|eduscol\.education\.gouv\.fr)\/sites\/default\/files\/document\//.test(s.source)) throw Error(`Source : ${s.id}`);
    if (s.stages.length !== 5 || s.choices.length !== 3 || !s.choices.some(c=>c[1]==='Solide')) throw Error(`Parcours : ${s.id}`);
    for (const c of s.choices) if (!['Solide','Défendable','À revoir'].includes(c[1]) || !c[2]) throw Error('Retour incomplet');
    if (s.track === 'technologique') {
      if (s.officialQuestions.length !== 8 || s.models.map(m=>m.option).join(',') !== '1,2') throw Error('Options technologiques incomplètes');
      if (s.models[0].paragraphs.map(p=>p[0]).join(',') !== s.officialQuestions.map(q=>q[0]).join(',')) throw Error('Ordre des questions');
    } else if (s.track !== 'generale' || s.models.length !== 1 || s.models[0].option !== 'libre') throw Error('Voie générale');
    for (const m of s.models) for (const p of m.paragraphs) {
      if (p.length !== 4 || !p[1] || !p[3].length || p[3].some(x=>x.length!==2||!x[0]||!x[1])) throw Error('Fonction de phrase incomplète');
      if (p[1] !== p[3].map(x=>x[0]).join(' ')) throw Error(`Texte annoté modifié : ${s.id}`);
    }
    if (s.drills.length!==2 || s.drills.some(x=>!x.extract||!x.task||!x.hint||!x.expected)) throw Error('Exercice incomplet');
    if (!s.models.flatMap(m=>m.paragraphs.flatMap(p=>p[3].map(x=>x[0]))).includes(s.drills[0].extract)) throw Error('Phrase absente du modèle');
  }
}
function shell(name, title, description, body) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>
<meta name="description" content="${esc(description)}"><link rel="canonical" href="${DOMAIN}/${name}"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="philosophie-explication.css">
</head><body><header class="top"></header><main class="wrap ecrire">${body}</main><script src="philosophie-explication.js"></script><script src="site-nav.js"></script></body></html>\n`;
}
function area(id, label, rows=5, exam=false) {
  return `<label class="ecrire-label" for="${id}">${esc(label)}</label><textarea id="${id}" rows="${rows}" data-draft="${id}" data-feedback="off"${exam?' data-sans-dictee="true"':''}></textarea>`;
}
function model(s,m) {
  const technological=s.track==='technologique';
  const movements=m.superstructure||[...new Set(m.paragraphs.flatMap(p=>(p[3]||[]).map(x=>x[2]).filter(x=>x&&x!=='Introduction'&&x!=='Conclusion')))];
  return `<article><h3>${esc(m.title)}</h3>${technological?`<p class="ecrire-declaration">Option n° ${esc(m.option)}</p>`:''}
<p class="micro">${words(m)} mots · ${sentences(m)} phrases, chacune avec sa fonction${technological?' · hors indication de l’option':''}. Modèle original du site visant l’excellence ; la note dépend de l’évaluation globale de la copie.</p>
${movements.length?`<div class="sequence-spec"><p><strong>Superstructure du raisonnement</strong></p><ol>${movements.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`:''}
<div class="ecrire-copy c20">${m.paragraphs.map(([label,text,note,phrases],i)=>`<div class="c20-block">${label?`<h4>${esc(label)} · ${esc(s.officialQuestions.find(q=>q[0]===label)[1])}</h4>`:(i===0||i===m.paragraphs.length-1)?`<h4 class="c20-h">${i===0?'Introduction':'Conclusion'}</h4>`:''}${phrases.map(([sentence,role,movement])=>`<p class="c20-s"><span class="c20-t" data-model-text>${esc(sentence)}</span><span class="c20-f">${movement?`<strong>${esc(movement)}.</strong> `:''}${esc(role)}</span></p>`).join('')}</div>`).join('')}</div></article>`;
}
function page(s) {
  const index=data.subjects.indexOf(s), next=data.subjects[(index+1)%data.subjects.length], id=s.id;
  const tech=s.track==='technologique';
  const questions=tech?`<details><summary>Les huit questions officielles de l’option n° 1</summary><ol>${s.officialQuestions.map(([label,q])=>`<li><b>${esc(label)}</b> — ${esc(q)}</li>`).join('')}</ol></details>`:'';
  const stages=s.stages.map(([task,hint,expected],i)=>`<article class="ecrire-step" data-step="${i}"${i?' hidden':''}><p class="kicker">ÉTAPE ${i+1} / 5</p><h4>${esc(task)}</h4>${area(`${id}-etape-${i}`,'Votre réponse')}
<details><summary>Une aide</summary><p>${esc(hint)}</p></details><details><summary>Comparer après avoir écrit</summary><p>${esc(expected)}</p><p class="micro">Reprenez un passage de votre réponse si une raison ou un appui manque.</p></details></article>`).join('');
  const drills=s.drills.map((x,i)=>`<article class="ecrire-drill"><h3>${esc(x.skill)}</h3><blockquote>${esc(x.extract)}</blockquote><p>${esc(x.task)}</p>${area(`${id}-atelier-${i}`,'Votre essai',4)}<details><summary>Une aide</summary><p>${esc(x.hint)}</p></details><details><summary>Comparer après votre essai</summary><p>${esc(x.expected)}</p><p class="micro">Comparez les raisons, puis réécrivez votre réponse.</p></details></article>`).join('');
  return shell(file(s), `${s.author} : explication de texte, bac ${s.year}`,
    `Explication philosophique : ${s.author}, bac ${s.year}. Copie courte, fonction de chaque phrase, trois niveaux et exercices de réécriture.`,
    `<section class="pagehead"><div><div class="kicker">BAC DE PHILOSOPHIE · ${tech?'TECHNOLOGIQUE':'GÉNÉRAL'}</div><h1>Expliquer le texte de ${esc(s.author)}.</h1><p class="lede">${esc(s.session)} · ${esc(s.work)}. Gardez le texte officiel ouvert : il reste l’objet du travail.</p>
<div class="boussole"><p><b>D’où vous partez</b>L’extrait du sujet officiel.</p><p><b>Ce que vous faites</b>Vous reconstruisez le problème, la réponse et les raisons, puis rédigez.</p><p><b>Ce que vous obtenez</b>Une explication complète, à comparer à un modèle annoté.</p></div></div><aside class="side-note"><p><b>${esc(s.code)}</b></p><p><a href="${esc(s.source)}">Lire le texte et le sujet officiel (PDF) ↗</a></p><p>${esc(s.pages)}</p><p><a href="philosophie-explication.html">Méthode et banque d’explications →</a></p></aside></section>
<p class="ecrire-note">${tech?'Vous choisissez l’option n° 1 (réponses dans l’ordre aux questions) ou l’option n° 2 (développement de votre choix). Indiquez votre option au début de la copie.':'Vous expliquez l’extrait dans son ensemble : le problème, la thèse et les étapes du raisonnement. Vous choisissez l’organisation qui rend le texte intelligible.'} L’épreuve dure quatre heures ; l’explication choisie est notée globalement sur 20.</p>${questions}
<section class="exercise-wrap" data-parcours="${id}"><h2>Du texte à votre explication.</h2><nav class="ecrire-levels" aria-label="Niveaux d’écriture">${['Au clic','J’écris un peu','J’écris tout'].map((x,i)=>`<button type="button" data-level="${i+1}" aria-pressed="${i===0}"><b>Niveau ${i+1}</b><span>${x}</span></button>`).join('')}</nav>
<p class="ecrire-storage" data-save-status role="status">Vos brouillons restent dans ce navigateur si l’enregistrement est disponible.</p>
<section data-panel="1"><h3>Choisissez une thèse, puis justifiez votre lecture.</h3><p>Quelle formulation est la plus précise ?</p><div class="ecrire-choices">${s.choices.map(([text,status,reason],i)=>`<button type="button" data-choice="${i}" data-outcome="${esc(status)}" data-reason="${esc(reason)}" aria-pressed="false">${esc(text)}</button>`).join('')}</div><p data-choice-feedback role="status"></p>
${area(`${id}-justification`,'Justifiez votre choix en deux phrases avec un passage précis du texte.',3)}<p><button type="button" class="btn" data-goto-level="2">Écrire sans propositions →</button></p></section>
<section data-panel="2" hidden><h3>Cinq gestes pour expliquer.</h3><nav class="ecrire-stages" aria-label="Étapes de l’explication">${s.stages.map((_,i)=>`<button type="button" data-goto-step="${i}" aria-pressed="${i===0}">${i+1}</button>`).join('')}</nav>${stages}
<div class="ecrire-actions"><button type="button" data-previous-step>← Étape précédente</button><button type="button" data-next-step>Étape suivante →</button><button type="button" data-goto-level="3">Rédiger toute l’explication →</button></div></section>
<section data-panel="3" hidden><h3>Rédigez votre explication complète.</h3><p>Expliquez le texte de ${esc(s.author)} dans le sujet officiel. Gardez le PDF ouvert. Rédigez sans propositions ni étapes guidées.</p>${tech?'<p>Choisissez votre option et indiquez-la au début. Pour l’option n° 1, répondez aux huit questions officielles dans l’ordre ; pour l’option n° 2, organisez votre développement.</p>':''}${area(`${id}-copie`,'Votre explication complète',20,true)}<p><button type="button" class="btn" data-compare>Comparer après rédaction ↓</button></p></section>
<div class="ecrire-actions"><button type="button" data-previous-level>← Niveau précédent</button><button type="button" data-next-level>Niveau suivant →</button><button type="button" data-restart>Revenir au début</button><button type="button" data-erase>Effacer ces brouillons</button></div>
<section class="offer-band" id="exercices"><h2>Deux ateliers à partir de la copie.</h2><p>Un passage du modèle, puis une phrase à reprendre. Écrivez avant d’ouvrir la comparaison.</p>${drills}</section>
<details class="ecrire-model" data-model id="modele"><summary>${tech?'Deux modèles A20 : les deux options de rédaction':'Modèle A20 : explication complète, phrase par phrase'}</summary><p class="micro">« A20 » désigne un objectif d’excellence, non une note garantie. Une autre explication peut être excellente si elle rend compte précisément du texte.</p><p class="micro">Les annotations décrivent le travail de chaque phrase de la copie, pas un plan imposé. En les masquant, vous devez encore comprendre les raisons, les liens et ce que la copie propose elle-même pour examiner l’argument.</p><button type="button" data-annotations aria-pressed="true">Masquer les fonctions</button>
${s.models.map(m=>model(s,m)).join('')}<h3>Relisez avec les critères.</h3><ul>${s.criteria.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p>Choisissez un passage de votre copie qui explique réellement une raison. Réécrivez ensuite un passage trop proche du résumé. Aucune note automatique n’est calculée.</p>${area(`${id}-reprise`,'Votre passage réécrit')}</details></section>
<section class="offer-band"><h2>Reprendre sur un autre texte.</h2><p><a href="${file(next)}">Texte suivant : ${esc(next.author)} →</a> · <a href="philosophie-explication.html#banque">Choisir un texte →</a> · <a href="philosophie-annales.html">Toutes les annales →</a></p><p class="micro">Sur un texte nouveau, essayez le niveau 3 avant de consulter les aides. Avoir parcouru les étapes ne suffit pas à établir votre autonomie.</p></section>`);
}
function hub() {
  const totalModels=data.subjects.reduce((n,s)=>n+s.models.length,0);
  const totalTasks=data.subjects.reduce((n,s)=>n+s.stages.length+s.drills.length,0);
  const cards=data.subjects.map(s=>`<article class="ecrire-card"><p class="kicker">${s.track==='generale'?'BAC GÉNÉRAL':'BAC TECHNOLOGIQUE'}</p><h3><a href="${file(s)}">${esc(s.author)}</a></h3><p>${esc(s.work)}</p><p>${esc(s.session)} · ${esc(s.code)}</p><p>${s.models.map(m=>`${words(m)} mots · ${sentences(m)} phrases`).join(' / ')}. Fonction de chaque phrase.</p><p><a href="${file(s)}#exercices">Les ateliers de précision →</a></p><a href="${file(s)}">Expliquer ce texte →</a></article>`).join('');
  return shell('philosophie-explication.html','Bac de philosophie : explication de texte et modèles',
    `Explication de texte du bac de philosophie : ${data.subjects.length} annales 2023–2026, ${totalModels} copies courtes annotées phrase par phrase et ${totalTasks} exercices d’écriture.`,
    `<section class="pagehead"><div><div class="kicker">BAC DE PHILOSOPHIE · GÉNÉRAL ET TECHNOLOGIQUE</div><h1>Expliquer une pensée, jusque dans ses raisons.</h1><p class="lede">Votre tâche est de rendre intelligible le problème, la thèse et le cheminement de l’extrait. Le texte détermine l’organisation de votre explication.</p><div class="boussole"><p><b>D’où vous partez</b>Un texte réellement proposé au bac.</p><p><b>Ce que vous faites</b>Vous passez d’une lecture justifiée à des paragraphes, puis à l’explication entière.</p><p><b>Ce que vous obtenez</b>Une copie précise, relue avec un modèle annoté.</p></div></div><aside class="side-note"><p><a href="#banque">Choisir un texte ↓</a></p><p><a href="#methode">Les gestes de l’explication ↓</a></p><p><a href="#sources">Références officielles ↓</a></p></aside></section>
<section class="offer-band ecrire-method" id="methode" aria-labelledby="methode-titre">
<h2 id="methode-titre">Une méthode qui suit le texte.</h2>
<p class="ecrire-method-lead">Expliquez comment l’auteur construit sa réponse à un problème. Chaque passage doit être compris pour lui-même et relié à l’ensemble.</p>
<h3>Lire et préparer : cinq étapes</h3>
<ol class="ecrire-method-steps">
<li><h4>Comprenez le problème.</h4><p>Formulez en une question ce que l’auteur cherche à résoudre.</p><p>Précisez la difficulté : quelles réponses semblent possibles, et pourquoi ne peut-on pas trancher immédiatement ?</p></li>
<li><h4>Formulez la thèse.</h4><p>Énoncez en une phrase la réponse que l’auteur défend : c’est sa <b>thèse</b>.</p><p>Précisez à quoi elle s’applique et sous quelles conditions. Vérifiez les mots qui en limitent ou en renforcent le sens.</p></li>
<li><h4>Repérez les étapes du raisonnement.</h4><p>Délimitez les moments du texte. Pour chacun, indiquez ce que fait l’auteur : affirmer, distinguer, justifier, examiner une objection, donner un exemple ou conclure.</p><p>Expliquez pourquoi il passe au moment suivant. Un connecteur vous aide à repérer le lien ; il reste à en expliquer le sens.</p></li>
<li><h4>Expliquez les mots et les raisons.</h4><p>Pour chaque passage important, précisez le sens des mots dans ce contexte. Montrez sur quoi l’auteur s’appuie et ce qu’il cherche à établir.</p><p>Lorsqu’il donne un exemple, expliquez ce que cet exemple permet de comprendre. Lorsqu’il affirme une idée, reconstruisez la raison qui la soutient à partir du texte.</p></li>
<li><h4>Vérifiez votre lecture.</h4><p>Relisez l’extrait en entier : votre explication rend-elle compte de tous ses moments, y compris de la fin ?</p><p>Reprenez les passages qui résistent à votre interprétation. Ajustez au besoin le problème, la thèse ou le découpage.</p></li>
</ol>
<div class="ecrire-method-writing" aria-labelledby="rediger-titre">
<h3 id="rediger-titre">Rédiger : un raisonnement continu</h3>
<h4>Dans l’introduction</h4><p>Présentez brièvement le problème, la thèse et les étapes du raisonnement. Faites apparaître ce qui rend la question difficile. Une accroche générale ou une biographie de l’auteur n’est pas nécessaire.</p>
<h4>Dans le développement</h4><p>Suivez les articulations du texte. Dans chaque moment, expliquez les idées et leurs raisons en vous appuyant sur des mots ou de courtes citations. Reliez les moments entre eux : qu’a-t-on établi, et pourquoi faut-il poursuivre ?</p>
<h4>Dans la conclusion</h4><p>Rappelez la réponse établie et le chemin qui la justifie. Précisez ce qu’elle permet de mieux comprendre du problème de départ. Une ouverture générale n’est pas nécessaire.</p>
<p class="micro">Ce cadre guide une explication suivie. En voie technologique, l’option n° 1 consiste à répondre aux questions officielles dans l’ordre ; les modalités sont précisées ci-dessous.</p>
</div>
<aside class="ecrire-method-reminders" aria-labelledby="reperes-titre"><h3 id="reperes-titre">Trois repères pour rester près du texte</h3>
<ul><li><b>Expliquez au lieu de reformuler seulement.</b> Une citation ou le résumé d’une idée ne montre pas encore pourquoi l’auteur la soutient.</li>
<li><b>Discutez les raisons avec précision.</b> Un exemple ou une objection peut éclairer un argument ou en interroger une condition. Rattachez-le à un passage précis et examinez ce qu’il change.</li>
<li><b>Adaptez votre plan au texte.</b> Le nombre de parties dépend de sa progression. Un même moment du texte peut demander plusieurs paragraphes d’explication. Aucun plan en trois parties ni aucune partie critique séparée ne sont imposés.</li></ul>
<h4>Attribuez chaque idée avec précision</h4><p>Distinguez ce que l’auteur affirme, la raison implicite que vous reconstruisez à partir du texte et l’exemple ou l’objection que vous proposez. Une raison reconstruite doit rendre compte des mots et du lien entre les idées ; elle ne doit pas inventer une intention à l’auteur. Signalez votre propre examen par une formule claire : « On peut toutefois interroger… » ou « Cet exemple permet d’éprouver… ».</p><p>La connaissance exhaustive de la doctrine de l’auteur n’est pas requise. Vos connaissances servent à éclairer cet extrait ; elles ne remplacent pas son explication.</p></aside>
</section>
<section class="offer-band ecrire-method" id="phrase-expliquee"><h2>Que doit apporter une phrase d’explication ?</h2>
<p>Distinguez ce que fait l’auteur et ce que votre phrase permet de comprendre. S’il donne un exemple, expliquez ce que cet exemple établit et pourquoi.</p>
<h3>Nommer un procédé ne suffit pas</h3><p>Au début du texte de Malebranche, l’auteur expose notre faiblesse ; « Toutefois » introduit ensuite la possibilité d’éviter l’erreur. Écrire seulement « L’auteur oppose deux idées » ne fait pas comprendre le lien entre elles.</p>
<h3>Reconstruire la raison</h3><blockquote class="ecrire-method-example"><p>Être incapable de tout connaître n’oblige pas à affirmer ce qu’on ignore : on peut retenir son jugement. Cette distinction montre pourquoi la faiblesse de l’esprit ne suffit pas, pour Malebranche, à excuser l’erreur.</p></blockquote>
<p>La première phrase distingue les limites de notre connaissance et notre manière de juger. La seconde explique ce que cette distinction établit dans le texte : notre ignorance n’excuse pas tous nos jugements.</p>
<p><a href="philosophie-explication-malebranche-2026-antilles-guyane.html">Lire le sujet officiel et l’explication de Malebranche →</a></p>
<h3>Relire votre propre explication</h3><ul class="ecrire-method-checks"><li>Sur quel mot ou quelle articulation du texte vous appuyez-vous ?</li><li>Quelle idée ou quelle raison faites-vous comprendre ?</li><li>Quel lien établissez-vous avec la suite du raisonnement ?</li></ul>
<p>Ces questions guident la relecture ; elles ne fixent ni un nombre de phrases ni un ordre obligatoire dans chaque paragraphe. Signalez clairement un exemple que vous inventez ou une conséquence que vous déduisez, puis justifiez son lien avec le texte.</p><h3>Lire les annotations du modèle</h3><p>Chaque annotation indique ce que la phrase fait comprendre : définir un mot dans ce passage, justifier un lien, préciser une condition ou examiner un argument. Elle décrit le travail de la copie ; elle n’ajoute pas une explication absente de la phrase.</p><p>Masquez les annotations : les raisons, les enchaînements et le statut de vos remarques doivent rester compréhensibles. Ces fonctions ne forment pas un ordre à reproduire dans tous les paragraphes.</p></section>
<section class="offer-band"><h2>Deux voies, des modalités distinctes.</h2><div class="ecrire-table"><table><thead><tr><th>Voie</th><th>Rédaction</th><th>Évaluation</th></tr></thead><tbody>
<tr><td>Générale</td><td>Une explication organisée de l’ensemble de l’extrait ; développement choisi.</td><td>Note globale sur 20.</td></tr><tr><td>Technologique</td><td>Option 1 : répondre dans l’ordre aux questions A, B et C. Option 2 : développement choisi. Indiquez l’option.</td><td>Note globale sur 20 ; les questions guident, sans barème automatique par réponse.</td></tr></tbody></table></div><p>Dans les deux voies, l’épreuve dure quatre heures et vous choisissez un sujet parmi deux dissertations et une explication. Les questions de la voie technologique accompagnent le texte ; dans cette épreuve, la partie C porte officiellement le nom « Commentaire ».</p><p class="micro">Ce parcours prépare l’explication du bac de philosophie. Les <a href="hlp.html">exercices HLP</a> répondent à d’autres consignes et ont leurs propres méthodes.</p></section>
<section class="offer-band"><h2>${totalModels} copies modèles A20, courtes et annotées phrase par phrase.</h2><p>Chaque modèle vise une explication assez développée pour rendre les raisons intelligibles, et assez courte pour éviter les répétitions. Le nombre de mots est indiqué ; aucune longueur officielle n’est prescrite. Chaque phrase a sa fonction en marge, comme dans les autres copies du site. Masquez les fonctions pour lire une copie continue, sans changer un mot.</p><p>Ces rédactions originales du site ne sont pas des copies d’élèves notées 20 par un jury. Comparez votre lecture, vos raisons et vos appuis, puis réécrivez un passage. Aucune note n’est calculée automatiquement.</p></section>
<section id="banque"><h2>${data.subjects.length} annales récentes, de 2026 à 2023.</h2><div class="ecrire-bank">${cards}</div><p>${totalTasks} exercices d’écriture : cinq gestes guidés et deux ateliers par texte. Ajoutez les choix de thèse et la rédaction entière, sans aides. Les deux options technologiques ont chacune leur modèle.</p></section>
<section class="offer-band" id="sources"><h2>Les références de la méthode.</h2><ul>
<li><a href="https://www.education.gouv.fr/bo/2026/Special4/MENE2622661N">Épreuve de philosophie générale à compter de 2027 — BO du 17 septembre 2026</a>.</li>
<li><a href="https://www.education.gouv.fr/bo/2026/Hebdo4/MENE2622663N">Épreuve de philosophie technologique à compter de 2027 — BO du 17 septembre 2026</a>.</li>
<li><a href="https://eduscol.education.gouv.fr/sites/default/files/document/ra20lyceegtterphiloexercices21307357pdf-83652.pdf">Éduscol : Les exercices en classe de philosophie, 2020, notamment page 4</a>.</li>
<li><a href="https://eduscol.education.gouv.fr/sites/default/files/document/ra20lyceegtterphiloetudestextes1294343pdf-83649.pdf">Éduscol : L’étude des textes et des œuvres, 2020</a>.</li>
<li><a href="https://eduscol.education.gouv.fr/sites/default/files/document/ra20lyceegtterphiloevaluations1318475pdf-83655.pdf">Éduscol : L’évaluation des travaux en classe de philosophie, 2020</a>.</li></ul><p class="micro">Sources et modèles relus le 17 octobre 2026. Les étapes sont une proposition pédagogique du site et ne constituent pas une grille chiffrée de jury.</p></section>`);
}
function build(root=path.resolve(__dirname,'..')) {
  validate();
  fs.writeFileSync(path.join(root,'philosophie-explication.html'),hub());
  for(const s of data.subjects) fs.writeFileSync(path.join(root,file(s)),page(s));
  console.log(`Explication philosophique : ${data.subjects.length} textes, ${data.subjects.reduce((n,s)=>n+s.models.length,0)} modèles.`);
}
module.exports={build,validate,page,hub,model,words,file,data};
if(require.main===module) build();
