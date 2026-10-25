'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const pages=['brevet-imagination-modele.html','brevet-reflexion-modele.html','bac-dissertation-copie-20-manon-lescaut.html'];
const root=path.resolve(process.argv[2]||'.');
const normalize=t=>t.normalize('NFC').replace(/’/g,"'").replace(/\s+/gu,' ').trim();
const source=normalize(JSON.parse(fs.readFileSync(path.join(__dirname,'manon-citations-source.json'),'utf8')).retrieval.join('\n')+'\n'+fs.readFileSync(path.join(__dirname,'manon-source-supplement.txt'),'utf8'));
(async()=>{
 const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'};
  fs.readFile(file,(err,data)=>err?res.writeHead(404).end():res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'}).end(data));
 });
 let browser;const report=[];
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));browser=await chromium.launch({headless:true,executablePath:process.env.MODELES_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
  const base=`http://127.0.0.1:${server.address().port}`;
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
   for(const name of pages){
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    assert((await page.goto(base+'/'+name)).ok());
    const articles=page.locator('.mr-texte');
    for(const article of await articles.all()){
     const id=await article.getAttribute('id'),expected=(await article.locator('.mr-text').allTextContents()).map(normalize);
     assert(expected.length>=18);assert.equal(await article.locator('.mr-note:visible').count(),0);
     assert.equal(await article.locator('.mr-note strong').count(),expected.length);
     for(const f of await article.locator('.mr-note strong').allTextContents())assert(f.trim().length>10);
     assert.equal(await article.locator('h1,h2,h3,h4').count(),0,'Aucun titre dans la copie');
     // Deux modes communs au site (copie-modes.js) : la copie entière par défaut, puis la fonction de chaque phrase.
     const entiere=page.locator(`#${id}-entiere`);await entiere.waitFor();
     assert.equal(await entiere.locator('p').count(),await article.locator('.mr-paragraphe').count(),'Un paragraphe par étape dans la copie entière');
     assert.equal(await entiere.locator('p').first().evaluate(p=>getComputedStyle(p).textAlign),'justify');
     assert.equal(normalize((await entiere.textContent())),normalize(expected.join(' ')),'La copie entière reprend exactement les phrases');
     const toggle=page.locator(`.cm-mode[data-mode="f"][aria-controls="${id}"]`),back=page.locator(`.cm-mode[data-mode="e"][aria-controls="${id}"]`);
     await toggle.focus();await page.keyboard.press('Enter');
     assert.equal(await toggle.getAttribute('aria-pressed'),'true');assert.equal(await article.locator('.mr-note:visible').count(),expected.length);
     assert.deepEqual((await article.locator('.mr-text').allTextContents()).map(normalize),expected,'Le texte reste strictement identique dans les deux vues');
     await back.click();assert.equal(await article.locator('.mr-note:visible').count(),0);assert(await entiere.isVisible());
     if(name.includes('manon')){
      assert.deepEqual(await article.locator('[data-step]').evaluateAll(xs=>xs.map(x=>x.dataset.step)),['I.1','I.2','I.3','II.1','II.2','II.3','III.1','III.2','III.3']);
      for(const p of await article.locator('[data-stage^="Transition"]').allTextContents())assert(normalize(p).includes('?'),'Transitions sous forme de questions');
      for(const text of expected)for(const match of text.matchAll(/«\s*(.*?)\s*»/gu))assert(source.includes(normalize(match[1])),'Citation absente de la source vérifiée : '+match[1]);
     }
     report.push({page:name,width,id,phrases:expected.length,mots:expected.join(' ').split(/\s+/u).length});
    }
    // Les sources et les trois niveaux sont réellement accessibles sans blocage.
    for(const detail of await page.locator('.mr-guide').all()){await detail.locator(':scope > summary').click();assert(await detail.evaluate(e=>e.open));await detail.locator(':scope > summary').click();}
    const level1=page.locator('.mr-exercises > details').nth(0);await level1.locator('summary').click();
    for(const choice of await page.locator('.mr-choice').all()){
     await choice.click();assert((await page.locator('.mr-feedback').textContent()).startsWith(await choice.getAttribute('data-state')));
    }
    const level2=page.locator('.mr-exercises > details').nth(1);await level2.locator(':scope > summary').click();
    const writing=level2.locator('textarea');await writing.fill('Mon texte à conserver.');
    await level2.locator('.mr-compare summary').click();assert(await level2.locator('.mr-compare').evaluate(e=>e.open));
    await page.locator('.mr-reset').click();assert.equal(await writing.inputValue(),'Mon texte à conserver.');assert.equal(await page.locator('.mr-choice[aria-pressed="true"]').count(),0);
    const level3=page.locator('.mr-exercises > details').nth(2);await level3.locator('summary').click();assert(await level3.locator('textarea').isVisible());
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,'Débordement horizontal '+name+' '+width);
    // Vérifier tous les liens locaux, y compris les ancres, après le build.
    for(const href of await page.locator('main a[href]').evaluateAll(xs=>xs.map(x=>x.getAttribute('href')))){
     if(/^(https?:|mailto:)/.test(href))continue;
     const [file,hash]=href.split('#'),local=file?path.join(root,file.replace(/^\//,'')):path.join(root,name);
     assert(fs.existsSync(local),href+' manquant');
     if(hash){const t=fs.readFileSync(local,'utf8');assert(t.includes(`id="${hash}"`)||t.includes(`id='${hash}'`),href+' ancre manquante');}
    }
    assert.deepEqual(errors,[]);fs.mkdirSync(path.join(root,'browser-audit'),{recursive:true});
    await page.locator('h1').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'browser-audit',name.replace('.html',`-${width}.png`))});
    if(name.includes('manon')){await page.locator('.mr-toggle').click();await page.locator('.mr-texte').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'browser-audit',`manon-fonctions-${width}.png`)});}
    await page.close();
   }
   await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  for(const name of pages){const p=await nojs.newPage();await p.goto(base+'/'+name);assert(await p.locator('.mr-text').first().isVisible());assert.equal(await p.locator('.mr-note:visible').count(),0);await p.close();}
  await nojs.close();fs.writeFileSync(path.join(root,'browser-audit/modeles-redaction-report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));console.log('Citations, fonctions, neuf sous-parties, lecture continue, trois niveaux, liens et affichage 390/1280 : OK.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1});
