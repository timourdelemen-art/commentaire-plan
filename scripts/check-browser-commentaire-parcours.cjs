#!/usr/bin/env node
/* Vérifie les choix du parcours et la rédaction locale, sans appel au correcteur. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),vm=require('node:vm');
const {chromium}=require('playwright');
async function check(root){
 root=path.resolve(root);const captures=path.join(root,'browser-audit');fs.mkdirSync(captures,{recursive:true});
 const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,b)=>e?res.writeHead(404).end():res.writeHead(200,{'Content-Type':f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':'text/html; charset=utf-8'}).end(b));});
 let browser;const results=[];
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';browser=await chromium.launch({headless:true});
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',acceptDownloads:true});const page=await context.newPage(),errors=[],posts=[];
   page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
   await page.goto(base+'bac-commentaire.html');assert.equal(await page.locator('.commentaire-choices').first().locator(':scope > a').count(),4);
   for(const a of await page.locator('main a[href]').all()){
    const href=await a.getAttribute('href');if(href.startsWith('http'))continue;
    const u=new URL(href,base+'bac-commentaire.html');const file=u.pathname==='/'?'index.html':u.pathname.slice(1);
    assert(fs.existsSync(path.join(root,file)),href);
    if(u.hash)assert(fs.readFileSync(path.join(root,file),'utf8').includes('id="'+u.hash.slice(1)+'"'),href);
   }
   await page.screenshot({path:path.join(captures,'commentaire-parcours-'+width+'.png')});
   await page.getByRole('link',{name:'Choisir un modèle'}).click();
   assert.equal(await page.locator('.commentaire-choices .module-card').count(),10);
   await page.goto(base+'bac-mode-examen.html');
   const exam=id=>page.locator('[data-exam-id="'+id+'"]'),h=exam('hialmar'),m=exam('montaigne');
   assert(await h.isVisible());assert(!(await m.isVisible()));assert.equal(await h.locator('.vers').count(),36);
   assert((await h.locator('.texte-examen').innerText()).includes('Je vais m’asseoir parmi les Dieux'));
   assert(!(await h.locator('[data-exam-after]').isVisible()));assert.equal(await page.getByRole('button',{name:'Dicter',exact:true}).count(),0);
   await h.locator('[data-exam-draft]').fill('Ma lecture personnelle du poème, avec une réponse et des preuves précises.');
   await h.locator('[data-exam-start]').click();await page.waitForFunction(()=>document.querySelector('[data-exam-id="hialmar"] [data-exam-clock]').textContent!=='00:00:00');
   await page.reload();assert.equal(await h.locator('[data-exam-draft]').inputValue(),'Ma lecture personnelle du poème, avec une réponse et des preuves précises.');
   assert(await h.locator('[data-exam-start]').isDisabled());
   await page.selectOption('#exam-subject','montaigne');assert(await m.isVisible());assert.equal(await m.locator('[data-exam-draft]').inputValue(),'');
   assert.equal((await m.getByRole('link',{name:'Ouvrir le texte et la consigne dans le PDF officiel'}).getAttribute('href')).endsWith('.pdf'),true);
   await m.locator('[data-exam-draft]').fill('Une autre copie, conservée séparément.');
   await page.selectOption('#exam-subject','hialmar');assert(!(await h.locator('[data-exam-start]').isDisabled()));
   const download=page.waitForEvent('download');await h.locator('[data-exam-download]').click();const file=await download;
   assert(fs.readFileSync(await file.path(),'utf8').includes('Ma lecture personnelle du poème'));
   await h.locator('[data-exam-finish]').click();assert(await h.locator('[data-exam-after]').isVisible());
   assert((await h.locator('[data-exam-after] a').first().getAttribute('href')).includes('id=bac-2026-'));
   await page.reload();assert(await h.locator('[data-exam-after]').isVisible());
   await page.screenshot({path:path.join(captures,'commentaire-examen-redaction-'+width+'.png')});
   await h.locator('h2').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(captures,'commentaire-examen-texte-'+width+'.png')});
   page.once('dialog',d=>d.accept());await h.locator('[data-exam-erase]').click();assert.equal(await h.locator('[data-exam-draft]').inputValue(),'');
   await page.selectOption('#exam-subject','montaigne');assert.equal(await m.locator('[data-exam-draft]').inputValue(),'Une autre copie, conservée séparément.');
   for(const id of ['racine','perec']){await page.selectOption('#exam-subject',id);assert(await exam(id).isVisible());assert((await exam(id).getByRole('link',{name:'Ouvrir le texte et la consigne dans le PDF officiel'}).getAttribute('href')).endsWith('.pdf'));}
   assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
   results.push({width,text:true,draft:true,timer:true,reload:true,subjects:4,download:true,comparison:true,isolatedErase:true,ok:true});await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),p=await nojs.newPage();await p.goto(base+'bac-mode-examen.html');assert.equal(await p.locator('[data-exam-id]:visible').count(),4);assert.equal(await p.locator('[data-exam-id="hialmar"] .vers').count(),36);await nojs.close();
  const denied=await browser.newContext();await denied.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new Error('Storage unavailable');};});const d=await denied.newPage();await d.goto(base+'bac-mode-examen.html?sujet=inconnu');await d.locator('[data-exam-id="hialmar"] textarea').fill('Un brouillon à télécharger.');assert((await d.locator('[data-exam-id="hialmar"] [data-exam-save]').innerText()).includes('indisponible'));await denied.close();
  fs.writeFileSync(path.join(captures,'commentaire-parcours-report.json'),JSON.stringify(results,null,2));console.log('Parcours commentaire : quatre entrées, dix modèles et mode examen à 390/1280 px : OK.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
}
module.exports=check;
if(require.main===module)check(process.argv[2]||'.').catch(e=>{console.error(e);process.exitCode=1;});
