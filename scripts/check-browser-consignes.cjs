#!/usr/bin/env node
/* Vérifie les parcours écrits et les comparaisons locales, sans appeler l’IA.
   La justesse philosophique ou littéraire reste une relecture distincte. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),vm=require('node:vm');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.');
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
 if(!f.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'}).end(b)});
});
const pages=['philosophie-dissertation-parcours.html','philosophie-dissertation-entrainement.html','philosophie-problematisation.html','philosophie-references.html','philosophie-penser-par-soi-meme.html','philosophie-operations.html','philosophie-bac-2026-peut-on-etre-certain-d-avoir-bien-agi.html','philosophie-notion-liberte.html','philosophie-explication-freud-2026-amerique-du-nord.html','philosophie-explication-mill-2025-metropole-secours.html','philosophie-dissertation-machine-peut-elle-penser.html','bac-dissertation-copie-20-ponge.html','bac-commentaire-leconte-de-lisle-hialmar.html','pot-bouille-dissertation.html','hlp-parcours-terminale-voltaire.html','hlp-2026-metropole-jour-1-jean-giono.html','brevet-imagination.html','brevet-reflexion.html','brevet-grammaire.html','brevet-sujet-2026-metropole-imagination.html','brevet-lecture-parcours.html','lettres-exercices.html'];
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch(),base='http://127.0.0.1:'+server.address().port+'/';
 const captures=path.join(root,'browser-audit');fs.mkdirSync(captures,{recursive:true});
 try{
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   let calls=0;await page.route('**/api/**',route=>{calls++;return route.abort()});
   for(const file of pages){
    await page.goto(base+file);await page.locator('main h1').waitFor();
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,file+' déborde');
    const missing=await page.locator('main textarea').evaluateAll(as=>as.filter(a=>!a.labels.length&&!a.getAttribute('aria-label')&&!a.getAttribute('aria-labelledby')).map(a=>a.id));
    assert.deepEqual(missing,[],file+' : champs sans nom');
   }
   await page.goto(base+'philosophie-dissertation-parcours.html');
   assert.equal(await page.locator('main nav.annales-jump a').count(),2);
   await page.getByRole('link',{name:'Commencer pas à pas',exact:true}).click();
   assert(page.url().endsWith('philosophie-probleme-pas-a-pas.html'));
   await page.goto(base+'philosophie-dissertation-entrainement.html#ex-mots');
   const first=page.locator('#ex-mots');assert.equal(await first.locator('.consigne-simple>li').count(),3);
   assert(!(await first.locator('.exercice-reperes').evaluate(el=>el.open)));
   await first.locator('.exercice-reperes>summary').focus();await page.keyboard.press('Enter');
   assert(await first.locator('.boussole').isVisible());await page.keyboard.press('Enter');
   assert(!(await first.locator('.boussole').isVisible()));
   await first.locator('textarea').fill('L’obéissance seule ne suffit pas. Une loi peut être injuste. Il faut donc examiner la justice de la règle.');
   await first.locator('.correction>summary').click();assert(await first.locator('.correction').evaluate(el=>el.open));
   await page.locator('#bataille-iii').scrollIntoViewIfNeeded();
   assert(!/Classez/.test(await page.locator('#bataille-iii .consigne-simple').innerText()));
   await page.locator('#duel-transitions').scrollIntoViewIfNeeded();
   assert.match(await page.locator('#duel-transitions article').innerText(),/Comment l’art peut-il/);
   assert.equal(await page.locator('#duel-transitions textarea').getAttribute('data-feedback'),'off','Une analyse de choix ne doit pas être corrigée comme une transition rédigée');
   await page.screenshot({path:path.join(captures,'consignes-philo-'+width+'.png'),fullPage:false});
   await page.goto(base+'bac-dissertation-copie-20-ponge.html');
   await page.locator('#etape-probleme .etape-direct').click();
   const literary=page.locator('#etape-probleme .etape-ecrit');
   assert(await literary.isVisible());assert(!/Écrivez « On pourrait penser|puis « Pourtant/.test(await literary.innerText()));
   await literary.locator('textarea').last().fill('Le sujet propose une lecture. Un passage permet de la préciser. Quelle question faut-il résoudre ?');
   await page.goto(base+'brevet-imagination.html');
   await page.locator('#ex-contraintes .etape-direct').click();
   assert.match(await page.locator('#ex-contraintes .etape-ecrit').innerText(),/2023/);
   assert(!/consigne inventée|entrer dans la maison/.test(await page.locator('main').innerText()));
   await page.locator('#ex-contraintes textarea').fill('Un jeu devient une aventure imaginaire. Le récit est à la première personne. Les enrichissements sont possibles. Je choisis le jeu et les détails.');
   await page.goto(base+'brevet-lecture-parcours.html');
   const places=await page.locator('.ecrire-choices').evaluateAll(boxes=>boxes.map(box=>Array.from(box.children).findIndex(b=>b.dataset.outcome==='Solide')));
   assert.deepEqual(places,[0,1,2,0,1,2,0,1],'La position de la réponse solide doit varier');
   const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'procedes-data.js'),'utf8'),sandbox);
   const modes=sandbox.window.PROCEDES_MODES;
   for(const [mode,definition] of Object.entries(modes)){
    if(definition.kind.startsWith('qcm-'))continue;
    await page.goto(base+'bac-commentaire-procedes-entrainement.html?mode='+mode);
    if(definition.kind==='effect-reference'){
     const expected=sandbox.window.PROCEDES_CORPUS[0].procedures;
     for(const option of await page.locator('#proc-task input[type=checkbox]').all())if(expected.includes(await option.inputValue()))await option.check();
     await page.locator('#validate-procedures').click();assert(await page.locator('#effect-answer').isVisible());
     await page.locator('#effect-answer').fill('Les mots du passage rendent cette perception sensible.');
     await page.locator('#compare-effect').click();
    }else{
     await page.locator('#reveal-answer').click();
     assert.match(await page.locator('#proc-feedback').innerText(),/Écrivez votre réponse/);
     for(const field of await page.locator('#proc-task textarea').all())await field.fill('Un choix d’écriture produit un effet à préciser dans ce passage.');
     await page.locator('#reveal-answer').click();
     assert.match(await page.locator('#proc-feedback').innerText(),/Une réponse possible/);
     assert(!/^Oui\./.test(await page.locator('#proc-feedback').innerText()));
    }
    assert(!/undefined/.test(await page.locator('#proc-feedback').innerText()));
   }
   assert.equal(calls,0,'Une comparaison locale ne doit pas appeler une IA');assert.deepEqual(errors,[]);
   console.log(width+' px : '+pages.length+' pages, champs nommés, consignes, clavier, aides, écrit en français et brevet, modes de procédés et comparaisons sans IA : OK.');
   await context.close();
  }
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
