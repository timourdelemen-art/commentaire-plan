#!/usr/bin/env node
/* Inscription « nouveautés » en bas des pages où l'élève vient de recevoir quelque chose :
   sujets corrigés (bac, philosophie, HLP), notions, copies à 20. Idempotent (marqueurs). */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const RULES=[
 [/^philosophie-bac-2026-.*\.html$/,'Un autre sujet de philosophie ?','Les nouveaux sujets corrigés, au fil de l’année.'],
 [/^philosophie-notion-.*\.html$/,'D’autres sujets sur cette notion ?','Les nouveaux sujets corrigés, au fil de l’année.'],
 [/^philosophie-copie-20-.*\.html$/,'D’autres copies à 20 ?','Les nouvelles copies et les nouveaux sujets corrigés.'],
 [/^hlp-20\d\d-.*\.html$/,'Un autre sujet de HLP ?','Les nouveaux sujets et les nouveaux outils, au fil de l’année.'],
 [/^philosophie-probleme-pas-a-pas\.html$/,'De nouveaux sujets à faire au clic ?','Les nouveaux sujets pas à pas, au fil de l’année.'],
 [/^bac-20\d\d-.*\.html$/,'Un autre sujet du bac ?','Les nouveaux sujets corrigés, au fil de l’année.'],
];
const START='<!--capture:start-->',END='<!--capture:end-->';
const block=(file,kick,h2)=>`${START}<section class="offer-band capture" id="prevenu"><div class="section-intro"><div><div class="kicker">${kick.toUpperCase()}</div><h2>${h2}</h2></div><p>Laissez une adresse : vous êtes prévenu quand de nouveaux sujets corrigés sont en ligne, et à l’ouverture de l’accès complet. Au plus un message par mois.</p></div>
<form name="nouveautes" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" action="/merci.html" class="lead-form capture-form">
<input type="hidden" name="form-name" value="nouveautes"><input type="hidden" name="landing_page" value=""><input type="hidden" name="source" value="${file}"><input type="hidden" name="campaign" value=""><input type="hidden" name="referrer" value="">
<p class="hidden-field"><label>Ne pas remplir <input name="bot-field"></label></p>
<label>Vous êtes <select name="profil" required><option value="">Choisir</option><option>Élève</option><option>Parent</option><option>Enseignant</option><option>Autre</option></select></label>
<label>Adresse e-mail<input type="email" name="email" required autocomplete="email" placeholder="vous@exemple.fr"></label>
<label class="lead-consent"><input type="checkbox" name="consentement" required> J’accepte de recevoir, au plus une fois par mois, les nouveautés de Commentaire Plan.</label>
<button class="btn red" type="submit">Être prévenu →</button>
<p class="micro">Désinscription sur simple demande. Aucune revente d’adresse. <a href="confidentialite.html">Confidentialité</a>. Pendant le lancement, tout le site est ouvert : <a href="offre.html">voir l’offre</a>.</p>
</form></section>${END}\n`;
let n=0;
for(const f of fs.readdirSync(ROOT)){
  const r=RULES.find(([re])=>re.test(f)); if(!r) continue;
  const p=path.join(ROOT,f); let s=fs.readFileSync(p,'utf8');
  s=s.replace(new RegExp(START+'[\\s\\S]*?'+END+'\\n?'),'');
  if(s.includes('id="prevenu"')||!s.includes('</main>')) continue;
  s=s.replace('</main>',block(f,r[1],r[2])+'</main>');
  fs.writeFileSync(p,s); n++;
}
console.log(`Inscription ajoutée sur ${n} pages.`);
