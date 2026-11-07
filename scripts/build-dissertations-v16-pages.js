#!/usr/bin/env node
/* Pages autonomes des dissertations V16 (sources : scripts/dissertations-v16/).
   Chaque page reprend la copie complète, phrase par phrase, avec sa fonction en marge. */
const fs = require('fs');
const path = require('path');
const { load, check } = require('./dissertations-v16');
const C = require('./philo-copie20');

const ROOT = path.resolve(__dirname, '..');
const STANDALONE = ['2023-me-paix-justice', '2024-an-parler-sans-savoir', '2024-an-rien-dure', '2025-g1-art-voir', '2025-g1-douter-raison', 'machine-peut-elle-penser'];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function page(d) {
  const title = d.subject;
  return `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} : dissertation annotée en philosophie</title>
<meta name="description" content="Dissertation de philosophie sur « ${esc(title)} » : la copie complète, avec la fonction de chaque phrase dans le plan.">
<link rel="canonical" href="https://commentaire-plan.com/${d.page}">
<link rel="stylesheet" href="styles.css">
</head><body><header class="top"></header><main class="wrap">
<section class="pagehead"><div><div class="kicker">PHILOSOPHIE · DISSERTATION ANNOTÉE</div>
<h1>« ${esc(title)} »</h1>
<p class="lede">La copie complète, phrase par phrase. Chaque phrase a sa fonction dans le plan, écrite en marge.</p>
</div><aside class="side-note"><p><strong>Comment lire ?</strong><br>D’abord avec les fonctions, pour voir comment le devoir avance. Puis sans, pour le lire comme une copie.</p><p><button type="button" class="philo-print c20-toggle" aria-controls="c20-${d.id}">Masquer les fonctions</button></p></aside></section>
<section class="offer-band" id="corrige"><div class="c20" id="c20-${d.id}">${C.renderCopy(d.copy, 'h2')}</div></section>
<section class="offer-band"><div class="kicker">POUR TRAVAILLER LE SUJET</div><h2>Avant de lire la copie, écrivez la vôtre.</h2>
<p>Les exercices qui mènent à ce plan sont sur la page du sujet et dans la <a class="official-link" href="philosophie-dissertation.html#liens">méthode de la dissertation →</a></p></section>
</main><script src="site-nav.js"></script>
${C.BRIDGE_CSS}
${C.TOGGLE}
</body></html>
`;
}

const all = load();
const errors = STANDALONE.flatMap(k => all[k] ? check(all[k]) : [`${k} : source absente`]);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else {
  for (const k of STANDALONE) fs.writeFileSync(path.join(ROOT, all[k].page), page(all[k]));
  console.log(`Pages dissertations V16 : ${STANDALONE.length} pages écrites.`);
}
