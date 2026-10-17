#!/usr/bin/env node
// Vérifie le rendu phrase/fonction et la lecture continue sur le build publié.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const data=require('./hlp-parcours-data.json');
const root=path.resolve(process.argv[2]||'.');
const normalize=s=>s.replace(/\s+/gu,' ').trim();
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
 if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(file,(e,b)=>e?res.writeHead(404).end():res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(b));
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true});
 const report=[],capture=path.join(root,'browser-audit');fs.mkdirSync(capture,{recursive:true});
 try {
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
   for(const subject of data.subjects){
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    assert((await page.goto(`http://127.0.0.1:${server.address().port}/hlp-parcours-${subject.id}.html`)).ok());
    for(const [i,response] of subject.responses.entries()){
     const box=page.locator('[data-parcours]').nth(i),model=box.locator('[data-model]');
     await box.locator('[data-level="3"]').click();await box.locator('[data-compare]').click();
     const sentences=response.model.flatMap(p=>p.sentences);
     assert.equal(await model.locator('[data-model-text]').count(),sentences.length);
     assert.equal(await model.locator('.ecrire-annotation:visible').count(),sentences.length);
     assert.deepEqual(await model.locator('[data-model-text]').allTextContents(),sentences.map(s=>s.text));
     const before=await model.locator('[data-model-text]').allTextContents();
     const toggle=model.locator('[data-annotations]');await toggle.focus();await page.keyboard.press('Enter');
     assert.equal(await toggle.getAttribute('aria-pressed'),'false');
     assert.equal(await model.locator('.ecrire-annotation:visible').count(),0);
     const plain=(await model.locator('[data-model-paragraph]').allInnerTexts()).map(normalize);
     assert.deepEqual(plain,response.model.map(p=>normalize(p.sentences.map(s=>s.text).join(' '))),'Même texte et mêmes paragraphes en lecture continue');
     assert.equal(await model.locator('.ecrire-row').first().evaluate(e=>getComputedStyle(e).display),'inline');
     await toggle.click();assert.deepEqual(await model.locator('[data-model-text]').allTextContents(),before);
     assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,'Débordement horizontal');
     if(i===0&&subject.id==='premiere-moliere'){
      await model.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(capture,`hlp-phrases-${width}.png`)});
      await toggle.click();await page.screenshot({path:path.join(capture,`hlp-continu-${width}.png`)});await toggle.click();
     }
    }
    assert.deepEqual(errors,[]);report.push({subject:subject.id,width,ok:true});await page.close();
   }
   const page=await context.newPage();
   for(const name of ['hlp-sujet-zero-1-alain.html','hlp-2025-metropole-jour-1-condorcet.html']){
    await page.goto(`http://127.0.0.1:${server.address().port}/${name}`);
    assert.equal(await page.locator('textarea[data-feedback="off"]').count(),7);
    assert(!/Puis écrivez les trois parties/.test(await page.locator('main').innerText()));
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);
   }
   await page.close();await context.close();
  }
  // Sans JavaScript, le lecteur peut toujours déplier les modèles et lire les fonctions.
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),page=await context.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/hlp-parcours-premiere-moliere.html`);
  await page.locator('[data-model] summary').first().click();assert(await page.locator('.ecrire-annotation').first().isVisible());await context.close();
  fs.writeFileSync(path.join(capture,'hlp-phrases-report.json'),JSON.stringify(report,null,2));
  console.log('HLP : 12 modèles à 390 et 1280 px, fonctions, clavier, paragraphes continus, annales et lecture sans JavaScript : OK.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
