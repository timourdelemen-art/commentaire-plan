#!/usr/bin/env node
/* Accès réel Annales > Français > texte > réponse, puis changement d’étape. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.');
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'application/javascript':'text/html; charset=utf-8');res.end(b);});});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch();const capture=path.join(root,'browser-audit');fs.mkdirSync(capture,{recursive:true});
 try{
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage();const errors=[],posts=[];
   page.on('pageerror',e=>errors.push(e.message));await page.route('**/*.workers.dev/**',r=>{posts.push(r.request().url());return r.abort();});
   await page.goto(base+'annales.html');await page.locator('main a[href="annales-bac.html"]').first().click();
   await page.locator('#annales-author').waitFor();assert.equal(await page.locator('#transformedAnnales .corpus-card').count(),13);
   await page.locator('#annales-author').selectOption('Leconte de Lisle');assert.equal(await page.locator('#transformedAnnales .corpus-card:visible').count(),1);
   const start=page.locator('#transformedAnnales .corpus-card:visible .btn');assert((await start.getAttribute('href')).includes('#annaleQuestion'));
   await start.click();await page.locator('#studentAnswer').waitFor();
   assert(new URL(page.url()).pathname.endsWith('/entrainement-annale.html'));assert.equal(new URL(page.url()).searchParams.get('step'),'donne');
   assert.match(await page.locator('#stepTitle').innerText(),/X|présente/);assert((await page.locator('#supportText').innerText()).includes('Hialmar'));
   await page.waitForFunction(()=>document.getElementById('stepTitle').getBoundingClientRect().top<350);const top=(await page.locator('#stepTitle').boundingBox()).y;assert(top>=0&&top<350,'La première question doit être immédiatement visible : '+top);
   assert.equal(await page.locator('#stepOptions').getAttribute('open'),null);assert.equal(await page.locator('#stepTimer').textContent(),'00:00');
   await page.screenshot({path:path.join(capture,'annales-question-'+width+'.png')});
   const draft='Le poème présente un guerrier blessé qui parle avant de mourir.';
   await page.locator('#studentAnswer').fill(draft);await page.locator('#saveNext').click();
   const second=new URL(page.url()).searchParams.get('step');assert.notEqual(second,'donne');
   assert((await page.locator('#stepTitle').boundingBox()).y<350);
   await page.reload();assert.equal(new URL(page.url()).searchParams.get('step'),second);
   await page.getByRole('button',{name:'← Étape précédente',exact:true}).click();assert.equal(await page.locator('#studentAnswer').inputValue(),draft);
   await page.getByRole('button',{name:'Étape suivante →',exact:true}).click();
   assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);
   await page.goto(base+'annales-bac.html#dissertations');await page.locator('#dissertations').waitFor();
   assert.equal(await page.locator('#dissertations .corpus-card').count(),6);
   const models=await page.locator('#dissertations .corpus-card .btn').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
   for(const model of models){await page.goto(base+model);assert(await page.locator('#entrainement').isVisible(),model);}
   await page.goto(base+'annales-bac.html');await page.getByRole('tab',{name:'Commentaires',exact:true}).focus();await page.keyboard.press('ArrowRight');assert(await page.locator('#dissertations').isVisible());
   // Un exercice ciblé conserve son étape après enregistrement et rechargement.
   await page.goto(base+'annales/entrainement-annale.html?id=bac-2026-amerique-du-nord-general-commentaire-leconte-de-lisle-le-coeur-de-hialmar&mode=targeted&step=problematique#annaleQuestion');
   await page.locator('#studentAnswer').fill('Comment la parole du mourant construit-elle sa grandeur ?');await page.locator('#saveNext').click();assert.equal(await page.locator('#stepOptions').getAttribute('open'),null);
   await page.reload();assert.equal(new URL(page.url()).searchParams.get('step'),'problematique');assert.match(await page.locator('#studentAnswer').inputValue(),/grandeur/);
   assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);await context.close();
   console.log('Annales '+width+' px : accès direct, texte, étapes libres, brouillons, 6 dissertations et clavier : OK.');
  }
  const nojs=await browser.newContext({javaScriptEnabled:false});const p=await nojs.newPage();await p.goto(base+'annales-bac.html');assert.equal(await p.locator('#transformedAnnales .btn').count(),13);assert.equal(await p.locator('#dissertations .btn').count(),6);await nojs.close();
  const broken=await browser.newContext();await broken.addInitScript(()=>{Storage.prototype.getItem=()=>'{cassé';Storage.prototype.setItem=()=>{throw new Error('stockage indisponible');};});const p2=await broken.newPage();await p2.goto(base+'annales/entrainement-annale.html?id=bac-2026-amerique-du-nord-general-commentaire-leconte-de-lisle-le-coeur-de-hialmar');await p2.locator('#studentAnswer').fill('Mon brouillon');assert.match(await p2.locator('.annale-save-status').innerText(),/indisponible/);await broken.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
