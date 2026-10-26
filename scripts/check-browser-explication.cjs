#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {data,file}=require('./build-explication-textes');
const root=path.resolve(process.argv[2]||'.');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
const server=http.createServer((req,res)=>{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname),f=path.resolve(root,'.'+(p==='/'?'/index.html':p));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,b)=>{if(err){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});res.end(b);});});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.PHILO_BROWSER_EXECUTABLE||undefined});
 try{for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'philosophie-explication.html');assert.equal(await page.locator('.ecrire-card').count(),data.subjects.length+5); // 8 sujets guidés + 5 pages écrites à la main (Pascal, Platon, Mill, Aristote, Bergson)
 await page.locator('#banque').scrollIntoViewIfNeeded();
  assert((await page.locator('main').textContent()).replace(/\s+/g,' ').includes('56 exercices'));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  for(const s of data.subjects){
   await page.goto(base+file(s));
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('.ecrire-drill').count(),2);
   for(const b of await page.locator('[data-choice]').all()){await b.click();assert.match(await page.locator('[data-choice-feedback]').innerText(),/Solide|Défendable|À revoir/);}
   await page.locator('[data-level="2"]').click();
   for(let i=0;i<5;i++){
    await page.locator(`[data-goto-step="${i}"]`).click();
    const step=page.locator(`[data-step="${i}"]`);assert(await step.isVisible());
    await step.locator('textarea').fill('Mon analyse du passage '+i);
    for(const details of await step.locator('details').all()){await details.locator('summary').click();assert(await details.evaluate(e=>e.open));}
   }
   for(const drill of await page.locator('.ecrire-drill').all()){
    await drill.locator('textarea').fill('Ma reprise personnelle.');
    for(const details of await drill.locator('details').all())await details.locator('summary').click();
   }
   await page.locator('[data-level="3"]').click();await page.locator('[data-panel="3"] textarea').fill('Ma copie entière.');
   await page.locator('[data-compare]').click();assert(await page.locator('[data-model]').evaluate(e=>e.open));
   const before=await page.locator('[data-model-text]').allTextContents();
   assert.equal(before.length,s.models.reduce((n,m)=>n+m.paragraphs.reduce((n,p)=>n+p[3].length,0),0));
   // Deux modes communs au site (copie-modes.js) : la copie entière par défaut, puis la fonction de chaque phrase.
   assert.equal(await page.locator('.c20-f').count(),before.length);
   await page.locator('[data-model] .cm-bar').first().waitFor();
   assert(!(await page.locator('[data-model] .c20-f').first().isVisible()));
   const entiere=(await page.locator('[data-model] .cm-plain p').allTextContents()).join(' ').replace(/\s+/g,' ').trim();
   assert.equal(entiere,before.join(' ').replace(/\s+/g,' ').trim(),'La copie entière reprend exactement les phrases');
   assert.equal(await page.locator('[data-model] .cm-plain p').first().evaluate(e=>getComputedStyle(e).textAlign),'justify');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),s.id+' débordement sans fonctions');
   for(const b of await page.locator('[data-model] .cm-mode[data-mode="f"]').all())await b.click();
   assert(await page.locator('[data-model] .c20-f').first().isVisible());
   assert.deepEqual(await page.locator('[data-model-text]').allTextContents(),before);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),s.id+' débordement avec fonctions');
   // Tous les liens locaux du module résolvent une vraie page ou une ancre existante.
   const links=await page.locator('main a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
   for(const href of links.filter(h=>!/^https?:/.test(h))){const u=new URL(href,base);assert((await page.request.get(u.href)).ok(),href);}
   await page.reload();await page.locator('#onglet-entrainement').click();await page.locator('[data-level="3"]').click();assert.equal(await page.locator('[data-panel="3"] textarea').inputValue(),'Ma copie entière.');
   assert.equal(await page.locator('.ecrire-drill textarea').first().inputValue(),'Ma reprise personnelle.');
   await page.locator('[data-restart]').click();assert(await page.locator('[data-panel="1"]').isVisible());
   assert.equal(await page.locator('.ecrire-drill textarea').first().inputValue(),'Ma reprise personnelle.');
   page.once('dialog',dialog=>dialog.accept());await page.locator('[data-erase]').click();assert.equal(await page.locator('.ecrire-drill textarea').first().inputValue(),'');
  }
  assert.deepEqual(errors,[],width+' erreurs JavaScript');
  // Refus du stockage : les exercices demeurent utilisables et le message est explicite.
  const blocked=await context.newPage();await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('Refus');}});});
  await blocked.goto(base+file(data.subjects[0]));assert.match(await blocked.locator('[data-save-status]').innerText(),/indisponible/);await blocked.locator('[data-level="3"]').click();assert(await blocked.locator('[data-panel="3"] textarea').isVisible());
  await page.goto(base+file(data.subjects[0]));await page.locator('#onglet-corrige-onglet').click();await page.locator('[data-model] > summary').click();
  await page.locator('[data-model]').scrollIntoViewIfNeeded();
  if(process.env.PHILO_SCREENSHOT_DIR){fs.mkdirSync(process.env.PHILO_SCREENSHOT_DIR,{recursive:true});await page.screenshot({path:path.join(process.env.PHILO_SCREENSHOT_DIR,`explication-${width}.png`)});}
  console.log(`${width}px : huit textes, neuf modèles, niveaux, choix, aides, ateliers, fonctions, copie continue, liens et brouillons vérifiés.`);
  await context.close();
 }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
