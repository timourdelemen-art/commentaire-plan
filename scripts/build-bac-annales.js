#!/usr/bin/env node
/* Annales du bac de français : écrit dans chaque page de sujet, en HTML statique,
   les étapes propres au texte (titre, consigne, aide repliée) tirées de
   annales/catalogue-annales.js. Avant ce script, ce travail n'existait que dans
   l'exercice chargé par JavaScript (entrainement-annale.html?id=…), invisible
   pour les moteurs de recherche.
   - Étapes « free » : titre, consigne, aide dans un bloc replié (l'élève essaie d'abord).
   - Étapes « premium » : titre seulement, avec le lien vers le parcours guidé.
   - Les propositions des QCM (« choix ») ne sont jamais écrites dans la page.
   Idempotent (marqueurs). Source à modifier : annales/catalogue-annales.js. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.join(__dirname,'..');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'annales/catalogue-annales.js'),'utf8'),ctx);
const CAT=ctx.window.ANNALES_CATALOGUE;
const START='<!--etapes-sujet:start-->',END='<!--etapes-sujet:end-->';
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const para=s=>esc(s).split('\n').filter(Boolean).join('<br>');
const titre=s=>esc(String(s||'').replace(/^\d+\.\s*/,''));
let n=0;const manquants=[];
for(const [id,e] of Object.entries(CAT)){
  if(!id.startsWith('bac-')) continue;
  const file=path.join(ROOT,id+'.html');
  if(!fs.existsSync(file)){manquants.push(id);continue;}
  let s=fs.readFileSync(file,'utf8');
  s=s.replace(new RegExp(START+'[\\s\\S]*?'+END+'\\n?'),'');
  const lien=step=>`annales/entrainement-annale.html?id=${id}&amp;mode=targeted&amp;step=${encodeURIComponent(step)}#annaleQuestion`;
  const libres=e.etapes.filter(x=>x.access!=='premium');
  const suite=e.etapes.filter(x=>x.access==='premium');
  const num=x=>e.etapes.indexOf(x)+1;
  const libresHtml=libres.map(x=>`<li class="sujet-etape"><h3><span>${num(x)}</span> ${titre(x.titre)}</h3><p>${para(x.consigne)}</p>${x.aide?`<details><summary>Une aide si vous bloquez</summary><p>${para(x.aide)}</p></details>`:''}<a class="sujet-etape-lien" href="${lien(x.id)}">Faire cette étape →</a></li>`).join('');
  const suiteHtml=suite.length?`<div class="sujet-suite"><p><strong>La suite du parcours sur ce texte :</strong> ${suite.map(x=>`${num(x)}. ${titre(x.titre)}`).join(' · ')}.</p><a class="btn" href="annales/entrainement-annale.html?id=${id}">Faire le parcours guidé →</a></div>`:'';
  // Le texte, quand il est du domaine public et relevé dans le sujet officiel (catalogue : supportText).
  const texte=e.supportText?`<section class="sujet-texte offer-band" id="texte"><div class="kicker">LE TEXTE</div><div class="texte-examen">${e.supportText}</div><p class="micro">${esc(e.supportSource||'')}</p></section>`:'';
  const bloc=`${START}${texte}<section class="sujet-etapes" id="etapes"><div class="kicker">CE SUJET, ÉTAPE PAR ÉTAPE</div><h2>${esc(e.auteur)}, ${esc(e.oeuvre)} : par où commencer.</h2><p>Essayez chaque étape sur votre brouillon avant d’ouvrir l’aide.</p><ol class="sujet-etapes-liste">${libresHtml}</ol>${suiteHtml}</section>${END}\n`;
  const ancre='<section class="annale-seo-method">';
  if(!s.includes(ancre)){manquants.push(id+' (ancre absente)');continue;}
  s=s.replace(ancre,bloc+ancre);
  fs.writeFileSync(file,s);n++;
}
console.log(`Étapes du sujet écrites dans ${n} pages d’annales du bac.`);
require('./bac-annales-index.js')(ROOT,CAT);
if(manquants.length){console.error('Pages non traitées : '+manquants.join(', '));process.exit(1);}

// Mode examen : le texte et les sources viennent du même catalogue que l’annale.
// Aucune aide, correction ou donnée du correcteur n’est chargée dans cette page.
const examFile=path.join(ROOT,'bac-mode-examen.html');
const examSubjects=[
  ['hialmar','bac-2026-amerique-du-nord-general-commentaire-leconte-de-lisle-le-coeur-de-hialmar'],
  ['montaigne','bac-2025-amerique-du-nord-general-commentaire-montaigne-essais'],
  ['racine','bac-2023-amerique-du-nord-general-commentaire-racine-berenice'],
  ['perec','bac-2021-metropole-general-commentaire-perec-les-choses']
];
const examHtml=examSubjects.map(([key,id])=>{
  const e=CAT[id];if(!e)throw new Error('Sujet absent : '+id);
  const official=`<a href="${esc(e.sourceOfficielle)}" target="_blank" rel="noopener">Ouvrir le texte et la consigne dans le PDF officiel ↗</a>`;
  const text=e.supportText?`<div class="texte-examen">${e.supportText}</div><p class="micro">${esc(e.supportSource)}</p><p>${official}</p>`:`<p>Le texte de ce sujet se lit dans le PDF officiel. Ouvrez-le avant de commencer et gardez-le à côté de votre copie.</p><p>${official}</p>`;
  return `<section class="exam-panel" data-exam-id="${key}" aria-labelledby="exam-title-${key}"><div class="kicker">${esc(e.annee)} · ${esc(e.zone)} · VOIE GÉNÉRALE</div><h2 id="exam-title-${key}">${esc(e.auteur)} — <em>${esc(e.oeuvre)}</em></h2><div class="exam-layout"><section class="exam-source" id="texte-${key}" aria-label="Le texte du sujet"><h3>Le texte</h3>${text}</section><section class="exam-writing" aria-label="Votre rédaction"><h3>Votre commentaire</h3><p>Rédigez un commentaire organisé du texte proposé. Vous pouvez écrire sur papier ou dans cet espace.</p><div data-exam-controls hidden><span>Temps écoulé · durée de référence : 4 h</span><output class="exam-clock" data-exam-clock aria-label="Temps écoulé">00:00:00</output><p class="micro" data-exam-timer-note>Chronomètre en pause.</p><div class="exam-controls"><button type="button" data-exam-start>Démarrer le chronomètre</button><button type="button" data-exam-pause disabled>Pause</button></div></div><label for="copie-${key}">Votre copie</label><textarea id="copie-${key}" data-exam-draft data-sans-dictee spellcheck="false" placeholder="Rédigez votre commentaire…"></textarea><p class="exam-status" data-exam-save role="status"></p><p class="micro">Votre rédaction reste dans ce navigateur. Téléchargez-la pour en garder une copie. Aucune correction automatique pendant l’épreuve.</p><p><a href="#texte-${key}">Revenir au texte ↑</a></p><div class="exam-controls" data-exam-controls hidden><button type="button" data-exam-finish>Terminer et comparer</button><button type="button" data-exam-download>Télécharger ma copie</button><button type="button" data-exam-erase>Effacer ce sujet</button></div><section class="exam-after" data-exam-after><h3>Après la rédaction</h3><p>Vérifiez votre réponse à la problématique, la progression du plan et la précision de vos analyses. La comparaison ne donne pas une note.</p><a href="annales/entrainement-annale.html?id=${id}">Reprendre ce sujet avec les étapes guidées →</a>${key==='hialmar'?'<a href="bac-commentaire-leconte-de-lisle-hialmar.html#phrase-par-phrase">Comparer avec le modèle annoté →</a>':''}${e.modeleCommentaire?`<a href="${esc(e.modeleCommentaire)}#copie">Comparer avec le commentaire modèle →</a>`:''}<a href="commentaire-bac-methode.html">Revoir la méthode →</a></section></section></div></section>`;
}).join('\n');
let exam=fs.readFileSync(examFile,'utf8');
const examPattern=/<!--examens-commentaire:start-->[\s\S]*?<!--examens-commentaire:end-->/;
if(!examPattern.test(exam))throw new Error('Marqueurs du mode examen absents');
exam=exam.replace(examPattern,`<!--examens-commentaire:start-->${examHtml}<!--examens-commentaire:end-->`);
fs.writeFileSync(examFile,exam);
console.log('Mode examen : quatre sujets, texte de Hialmar et accès direct aux PDF officiels.');
