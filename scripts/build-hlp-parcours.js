#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const data = require('./hlp-parcours-data.json');
const DOMAIN = 'https://commentaire-plan.com';
const {TEXTES, texteHtml} = require('./hlp-texte-html.js');
global.window = global.window || {};
require(path.join(__dirname, '..', 'hlp-annales-data.js'));
/* Le texte du sujet, quand il est relevé dans hlp-textes.json : même code d’examen et même auteur (un PDF peut porter deux sujets). */
function texteDuSujet(s) {
  if (s.level !== 'terminale') return '';
  const nom = s.author.split(' ').pop();
  const a = window.HLP_ANNALES.find(x => x.code === s.code && x.a.includes(nom));
  if (!a || !TEXTES[a.id]) return '';
  return `<section class="offer-band" id="texte"><div class="kicker">LE TEXTE</div>${texteHtml(a.id)}</section>\n`;
}
const labels = {
  interpL: 'Interprétation littéraire', interpP: 'Interprétation philosophique',
  reflexionL: 'Question de réflexion littéraire', reflexionP: 'Question de réflexion philosophique',
  essaiL: 'Essai littéraire', essaiP: 'Essai philosophique'
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const file = s => `hlp-parcours-${s.id}.html`;
const paragraphText = p => p.sentences.map(s => s.text).join(' ');
const words = r => r.model.reduce((n, p) => n + paragraphText(p).trim().split(/\s+/u).length, 0);

function validate() {
  const ids = new Set();
  for (const s of data.subjects) {
    if (ids.has(s.id) || !/^(premiere|terminale)-[a-z]+$/.test(s.id)) throw Error(`Identifiant HLP : ${s.id}`);
    ids.add(s.id);
    if (!/^https:\/\/(?:www\.)?(?:education\.gouv\.fr|eduscol\.education\.(?:fr|gouv\.fr))\//.test(s.source) && !/^annales\/hlp\/[\w-]+\.pdf$/.test(s.source)) throw Error(`Source : ${s.id}`);
    if (s.responses.length !== 2) throw Error(`Deux réponses attendues : ${s.id}`);
    const kinds = s.responses.map(r => r.kind);
    if (!kinds[0].startsWith('interp') || kinds[0].slice(-1) === kinds[1].slice(-1)) throw Error(`Orientations : ${s.id}`);
    if (!kinds[1].startsWith(s.level === 'premiere' ? 'reflexion' : 'essai')) throw Error(`Première/terminale : ${s.id}`);
    for (const r of s.responses) {
      if (!labels[r.kind] || !r.question.endsWith('?') || r.stages.length !== 5 || r.model.length < 4) throw Error(`Réponse incomplète : ${s.id}/${r.id}`);
      if (r.choices.length !== 3 || !r.choices.some(c => c[1] === 'Solide')) throw Error(`Choix : ${s.id}/${r.id}`);
      for (const c of r.choices) if (!['Solide','Défendable','À revoir'].includes(c[1]) || !c[2]) throw Error('Retour de choix incomplet');
      for (const p of r.model) {
        if (!Array.isArray(p.sentences) || !p.sentences.length) throw Error('Paragraphe sans phrases');
        for (const sentence of p.sentences) {
          if (typeof sentence.text !== 'string' || !sentence.text.trim() || typeof sentence.function !== 'string' || !sentence.function.trim()) throw Error(`Phrase sans texte ou fonction : ${s.id}/${r.id}`);
          if (/[.!?] »?\s+[A-ZÉÈÀÂÊÎÔÙÛŒÇ]/u.test(sentence.text)) throw Error(`Plusieurs phrases sous une fonction : ${s.id}/${r.id}`);
          if (/^[»”]/u.test(sentence.text)) throw Error('Guillemet détaché de sa citation');
        }
      }
    }
  }
}

function shell(name, title, description, body) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${DOMAIN}/${name}">
<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="hlp-parcours.css">
${name==='hlp-ecrire.html'?'<link rel="stylesheet" href="navigation-etudes.css">':''}
</head><body><header class="top"></header><main class="wrap ecrire${name==='hlp-ecrire.html'?' etudes-page':''}">${body}</main><script src="hlp-parcours.js"></script><script src="site-nav.js"></script>${name==='hlp-ecrire.html'?'<script src="navigation-etudes.js"></script>':''}</body></html>\n`;
}

function area(id, label, rows = 5, exam = false) {
  return `<label class="ecrire-label" for="${id}">${esc(label)}</label><textarea id="${id}" rows="${rows}" data-draft="${id}" data-feedback="off"${exam ? ' data-sans-dictee="true"' : ''}></textarea>`;
}

function model(r) {
  let number = 0;
  return r.model.map(p => `<p class="ecrire-paragraph" data-model-paragraph>${p.sentences.map(sentence => `<span class="ecrire-row"><span data-model-text>${esc(sentence.text)}</span><span class="ecrire-annotation"><b>Phrase ${++number} · </b>${esc(sentence.function)}</span></span>`).join(' ')}</p>`).join('\n');
}

function response(s, r) {
  const id = `${s.id}-${r.id}`;
  const interp = r.kind.startsWith('interp');
  const stages = r.stages.map(([task, hint, expected], i) => `<article class="ecrire-step" data-step="${i}"${i ? ' hidden' : ''}><p class="kicker">ÉTAPE ${i + 1} / ${r.stages.length}</p><h4>${esc(task)}</h4>
${area(`${id}-etape-${i}`, 'Votre réponse', 5)}<details><summary>Une aide</summary><p>${esc(hint)}</p></details>
<details><summary>Comparer après avoir écrit</summary><p>${esc(expected)}</p><p class="micro">Ce repère n’est pas la seule réponse possible. Reprenez votre texte si une raison ou un appui manque.</p></details></article>`).join('\n');
  return `<section class="exercise-wrap" id="${r.id}" data-parcours="${id}"><div class="kicker">${esc(labels[r.kind])} · 10 POINTS DANS L’ÉPREUVE</div>
<h2>${esc(r.question)}</h2><p><a class="official-link" href="${esc(s.source)}">Lire le texte et le sujet officiel (PDF) ↗</a></p><nav class="ecrire-levels" aria-label="Niveaux : ${esc(labels[r.kind])}">
${['Au clic','J’écris un peu','J’écris tout'].map((x,i) => `<button type="button" data-level="${i+1}" aria-pressed="${i===0}"><b>Niveau ${i+1}</b><span>${x}</span></button>`).join('')}</nav>
<p class="ecrire-storage" data-save-status role="status">Vos brouillons restent dans ce navigateur si l’enregistrement est disponible.</p>
<section data-panel="1"><h3>Choisissez une piste, puis justifiez-la.</h3><p>Quelle piste répond le plus précisément à la question ? Lisez d’abord le texte officiel.</p>
<div class="ecrire-choices">${r.choices.map(([text,status,reason],i)=>`<button type="button" data-choice="${i}" data-outcome="${esc(status)}" data-reason="${esc(reason)}" aria-pressed="false">${esc(text)}</button>`).join('')}</div>
<p data-choice-feedback role="status"></p>${area(`${id}-justification`, 'Justifiez votre choix en une ou deux phrases, avec un appui précis.', 3)}
<p><button type="button" class="btn" data-goto-level="2">Écrire sans propositions →</button></p></section>
<section data-panel="2" hidden><h3>Cinq gestes pour préparer votre réponse.</h3><nav class="ecrire-stages" aria-label="Étapes de rédaction">${r.stages.map((_,i)=>`<button type="button" data-goto-step="${i}" aria-pressed="${i===0}">${i+1}</button>`).join('')}</nav>${stages}
<div class="ecrire-actions"><button type="button" data-previous-step>← Étape précédente</button><button type="button" data-next-step>Étape suivante →</button><button type="button" data-goto-level="3">Rédiger toute la réponse →</button></div></section>
<section data-panel="3" hidden><h3>Rédigez votre réponse complète.</h3><p class="ecrire-question">${esc(r.question)}</p><p>Gardez le texte officiel ouvert. Rédigez sans propositions ni étapes guidées. La longueur dépend de ce que votre réponse doit établir.</p>
${area(`${id}-copie`, 'Votre réponse complète', 18, true)}<p><button type="button" class="btn" data-compare>Comparer après rédaction ↓</button></p></section>
<div class="ecrire-actions"><button type="button" data-previous-level>← Niveau précédent</button><button type="button" data-next-level>Niveau suivant →</button><button type="button" data-restart>Revenir au début</button><button type="button" data-erase>Effacer ces brouillons</button></div>
<details class="ecrire-model" data-model><summary>Réponse modèle, phrase par phrase : ${words(r)} mots</summary>
<p class="micro">Une réponse construite pour cet entraînement, rédigée par le site. Elle n’a pas été notée par un jury. ${words(r)} mots hors annotations : aucune longueur officielle n’est prescrite.</p>
<p class="micro">Chaque annotation explique ce que la phrase apporte à cette réponse. Les fonctions et leur ordre dépendent du sujet ; elles ne sont pas un plan obligatoire.</p>
<button type="button" data-annotations aria-pressed="true">Masquer les annotations</button><div class="ecrire-copy">${model(r)}</div>
<h3>Relisez votre réponse avec trois critères.</h3><ul>${r.criteria.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p>Choisissez une phrase de votre réponse qui satisfait un critère. Dites en une phrase ce qu’elle apporte. Réécrivez ensuite un passage qui manque de précision. Aucune note n’est calculée automatiquement.</p>
${area(`${id}-reprise`, 'Votre passage réécrit', 5)}<p class="micro">${interp?'Le modèle propose une lecture justifiée ; une autre lecture peut être excellente si elle répond à la question et respecte le texte.':'L’ordre des paragraphes appartient à cette réponse ; il ne constitue pas un plan à recopier sur tous les sujets.'}</p></details></section>`;
}

function page(s) {
  const index = data.subjects.indexOf(s);
  const next = data.subjects[(index+1)%data.subjects.length];
  const level = s.level === 'premiere' ? 'Première' : 'Terminale';
  return shell(file(s), `HLP ${level} : écrire avec ${s.author}`,
    `HLP : ${s.author}. Deux réponses, trois niveaux de travail et modèles annotés. Sujet officiel, exercices jusqu’à la rédaction complète.`,
    `<section class="pagehead"><div><div class="kicker">HLP · ${level.toUpperCase()} · ÉCRIRE</div><h1>${esc(s.author)} : deux réponses à construire</h1><p class="lede">${esc(s.session)}. Travaillez l’interprétation et ${s.level==='premiere'?'la réflexion':'l’essai'} séparément, jusqu’à leur rédaction.</p>
<div class="boussole"><p><b>D’où vous partez</b>Le texte et les questions du sujet officiel.</p><p><b>Ce que vous faites</b>Vous choisissez, justifiez, écrivez avec des aides, puis rédigez sans aide.</p><p><b>Ce que vous obtenez</b>Deux réponses personnelles, à comparer à des modèles annotés.</p></div></div>
<aside class="side-note"><p><b>${esc(s.work)}</b><br>${esc(s.code)}</p><p><a href="${esc(s.source)}">Lire le sujet et le texte officiel (PDF) ↗</a></p><p>${esc(s.pages)}</p><p>${esc(s.entry)}</p><p><a href="hlp-ecrire.html">Méthodes et banque HLP →</a></p></aside></section>
${s.level==='premiere'?'<p class="ecrire-note">Ce sujet zéro historique sert à l’entraînement. Pour les élèves scolarisés, HLP en première relève du contrôle continu ; l’évaluation ponctuelle de certains candidats dure deux heures et comporte une interprétation et une question de réflexion.</p>':'<p class="ecrire-note">À l’épreuve de terminale : quatre heures, deux réponses d’ampleur comparable sur deux copies distinctes, chacune notée sur 10. Ici, vous pouvez travailler une seule réponse ou les deux.</p>'}
${texteDuSujet(s)}${s.responses.map(r=>response(s,r)).join('\n')}<section class="offer-band"><h2>Reprendre sur un autre texte.</h2><p><a href="${file(next)}">Sujet suivant : ${esc(next.author)} (${next.level==='premiere'?'première':'terminale'}) →</a> · <a href="hlp-ecrire.html#banque">Choisir un autre sujet →</a> · <a href="hlp-annales.html">Toutes les annales HLP →</a></p><p class="micro">Sur un sujet nouveau, essayez d’abord le niveau 3. Ouvrez ensuite les aides dont vous avez besoin : avoir parcouru les étapes ne prouve pas encore l’autonomie.</p><p class="micro">Tous les sujets traités : ${data.subjects.filter(o=>o!==s).map(o=>`<a href="${file(o)}">${esc(o.author)}</a>`).join(' · ')}.</p></section>`);
}

function hub() {
  const cards = data.subjects.map(s=>`<article class="ecrire-card" data-card data-niveau="${s.level}"><p class="etudes-meta">${s.level==='premiere'?'Première':'Terminale'} · ${esc(s.session)}</p><h3>${esc(s.author)}</h3><p>${esc(s.work)}</p><p>Au clic, avec des aides ou en rédaction complète. Modèles expliqués phrase par phrase.</p><ul>${s.responses.map(r=>`<li>${esc(labels[r.kind])} : ${esc(r.question)}</li>`).join('')}</ul><div class="etudes-actions">${s.responses.map(r=>`<a href="${file(s)}#${r.id}" data-exercice="${r.kind.startsWith('interp')?'interpretation':'reflexion'}" data-discipline="${r.kind.endsWith('L')?'lettres':'philosophie'}" aria-label="${esc(labels[r.kind])} — ${esc(s.author)}">${esc(labels[r.kind])} →</a>`).join('')}</div></article>`).join('\n');
  const premiere=data.subjects.filter(s=>s.level==='premiere').length;
  const terminale=data.subjects.length-premiere;
  return shell('hlp-ecrire.html', 'HLP : méthodes, exercices et modèles annotés',
    `${data.subjects.length} sujets HLP, ${data.subjects.length*2} modèles expliqués et trois niveaux d’écriture. Choisissez votre classe, l’interprétation ou la réflexion et votre discipline.`,
    `<section class="pagehead"><div><div class="kicker">HLP · PREMIÈRE ET TERMINALE · EXERCICES</div><h1>Entraînez-vous à interpréter et à argumenter.</h1><p class="lede">Choisissez votre classe et l’exercice à travailler. Sur chaque sujet, vous pouvez commencer au clic, écrire avec des aides ou rédiger une réponse complète, puis la comparer à un modèle expliqué.</p></div></section>
<nav class="etudes-actions" aria-label="Choisir son travail en HLP"><a class="primary" href="#banque">Choisir un exercice</a><a href="#methodes">Comprendre les exercices</a></nav>
<section class="etudes-section" id="banque" data-catalogue aria-labelledby="hlp-banque-titre"><h2 id="hlp-banque-titre">${data.subjects.length} sujets pour vous entraîner.</h2><p>${premiere} sujets de Première et ${terminale} de Terminale, avec ${data.subjects.length*2} réponses modèles expliquées. Les deux questions d’un sujet restent accessibles séparément.</p>
<form class="catalogue-controls" hidden aria-label="Filtrer les entraînements HLP">
<label>Votre classe<select name="niveau" aria-label="Votre classe"><option value="">Première et Terminale</option><option value="premiere">Première</option><option value="terminale">Terminale</option></select></label>
<label>Votre exercice<select name="exercice" aria-label="Votre exercice"><option value="">Tous les exercices</option><option value="interpretation">Interprétation</option><option value="reflexion">Réflexion / essai</option></select></label>
<label>Votre discipline<select name="discipline" aria-label="Votre discipline"><option value="">Lettres et philosophie</option><option value="lettres">Lettres</option><option value="philosophie">Philosophie</option></select></label>
<button type="reset">Tout afficher</button></form>
<p class="catalogue-count" data-count role="status" aria-live="polite">${data.subjects.length} sujets</p><p class="catalogue-empty" data-empty hidden>Aucun sujet ne correspond à ces choix. Changez un filtre ou choisissez « Tout afficher ».</p>
<div class="ecrire-bank">${cards}</div><p>Pour travailler d’autres textes : <a href="hlp-annales.html">consulter toutes les annales HLP</a>.</p></section>
<details class="etudes-details" id="methodes"><summary>Comprendre les exercices HLP</summary><section class="offer-band"><h2>Quatre exercices, deux disciplines.</h2><div class="ecrire-table"><table><thead><tr><th>Exercice</th><th>Ce que vous faites</th><th>Ce qui rend la réponse forte</th></tr></thead><tbody>
<tr><td>Interprétation littéraire</td><td>Vous défendez une lecture selon la question.</td><td>Vous expliquez comment des détails d’écriture produisent le sens que vous proposez.</td></tr>
<tr><td>Interprétation philosophique</td><td>Vous expliquez un enjeu du texte indiqué par la question.</td><td>Vous rendez précises les idées et les raisons utiles à cette lecture.</td></tr>
<tr><td>Réflexion / essai littéraire</td><td>Vous argumentez sur la question à partir du texte et d’œuvres.</td><td>Vous analysez ce que les œuvres font comprendre, plutôt que raconter leurs histoires.</td></tr>
<tr><td>Réflexion / essai philosophique</td><td>Vous élaborez une réponse personnelle justifiée.</td><td>Vous précisez les mots, construisez des raisons et examinez leur portée.</td></tr></tbody></table></div>
<p>Dans l’interprétation, la question détermine ce qui mérite d’être étudié : choisissez des appuis précis et expliquez-les. Dans l’essai, partez de la question et du texte ; faites progresser votre réponse avec des raisons et des exemples analysés. Les connaissances des deux disciplines peuvent servir.</p><p>Choisissez l’ordre qui permet à votre pensée d’avancer. Deux, trois ou davantage d’étapes peuvent convenir : aucun nombre de parties n’est imposé. Terminez par une réponse justifiée. Le « je » est possible si vous argumentez ; l’ouverture finale reste un choix.</p></section>
<section class="offer-band"><h2>Première et terminale : situer l’entraînement.</h2><p>En première, les élèves scolarisés sont évalués en contrôle continu. Les sujets zéro de 2019 sont des supports historiques d’entraînement. Pour les candidats relevant de l’évaluation ponctuelle, le texte officiel prévoit deux heures, une interprétation et une question de réflexion, chacune sur 10.</p><p>En terminale, l’épreuve dure quatre heures : une interprétation et un essai de disciplines différentes, d’ampleur comparable, sur deux copies distinctes. Chaque réponse est sur 10 ; leur somme est sur 20. Pour la session 2027, l’ensemble du programme de terminale est évaluable.</p><p class="micro">Les entraînements proposés ici comptent ${premiere} sujets de première et ${terminale} de terminale. Elle ne couvre pas encore toutes les entrées du programme. Pour varier les supports : <a href="hlp-annales.html">banque d’annales HLP →</a>.</p></section>
<section class="offer-band"><h2>Des réponses modèles annotées phrase par phrase.</h2><p>Les modèles cherchent une réponse concise, avec une lecture exacte, des raisons développées et une expression claire. Chaque phrase est accompagnée de sa fonction : ce qu’elle apporte à la réponse, par exemple expliquer une image ou préciser une objection. La longueur affichée mesure le texte, pas sa valeur. Ces textes originaux du site n’ont pas été notés par un jury.</p><p>Les fonctions suivent le travail propre à chaque sujet. Vous pouvez défendre une autre lecture ou construire un autre ordre, à condition de les justifier. Un modèle aide à comprendre des choix d’écriture ; il ne fixe pas un nombre de phrases ni de parties.</p><p>Après rédaction, comparez les gestes accomplis, puis réécrivez un passage. Les annotations se masquent pour retrouver le même texte continu. Aucune note automatique ni minimum de mots ne remplace ce travail.</p></section>
</details>
<details class="etudes-details" id="sources"><summary>Références officielles</summary><section class="offer-band"><h2>Les références de la méthode.</h2><ul>
<li><a href="https://www.education.gouv.fr/bo/2026/Hebdo4/MENE2622659N">Définition de l’épreuve HLP à compter de 2027 — BO du 17 septembre 2026</a>.</li>
<li><a href="https://www.education.gouv.fr/bo/21/Hebdo31/MENE2121284N.htm">Évaluation ponctuelle de première — BO du 26 août 2021</a>.</li>
<li><a href="https://eduscol.education.gouv.fr/5805/programmes-et-ressources-en-humanites-litterature-et-philosophie-voie-g">Éduscol : programmes, attendus et questions d’évaluation</a>.</li>
<li><a href="https://site.ac-martinique.fr/lettres/wp-content/uploads/sites/16/2023/03/HLP-Entente-Nationale-Lettres-Philosophie-2023.pdf">Inspection générale : cadrage national de correction HLP, 2023</a>.</li>
<li><a href="https://pedagogie.ac-rennes.fr/sites/pedagogie.ac-rennes.fr/IMG/pdf/compagnonnage_lettres-philosophie_en_specialite_hlp_janvier_24.pdf">Inspection lettres-philosophie de Rennes : compagnonnage HLP, 2024</a>.</li></ul><p class="micro">Cadre et modèles relus le 17 octobre 2026. Les étapes du site sont une proposition pédagogique ; elles ne constituent pas un barème officiel.</p></section></details>`);
}

function build(root = path.resolve(__dirname, '..')) {
  validate();
  fs.writeFileSync(path.join(root, 'hlp-ecrire.html'), hub());
  for (const s of data.subjects) fs.writeFileSync(path.join(root, file(s)), page(s));
  console.log(`HLP écriture : ${data.subjects.length} sujets, ${data.subjects.length*2} modèles annotés.`);
}
module.exports = { build, validate, page, hub, response, model, paragraphText, words, file, labels, data };
if (require.main === module) build();
