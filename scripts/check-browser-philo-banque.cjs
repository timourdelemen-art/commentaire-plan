#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');const root=path.resolve(process.argv[2]||'.');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'philo-banque-data.json'),'utf8'));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname),f=path.resolve(root,'.'+(p==='/'?'/index.html':p));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,b)=>{if(err){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});res.end(b);});});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.PHILO_BROWSER_EXECUTABLE||undefined});
 try{for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));assert((await page.goto(base+'philosophie-banque.html')).ok());await page.waitForSelector('[data-open]');
  assert.equal(await page.locator('[data-open]').count(),101);assert.equal(await page.locator('#notion option').count(),18);
  await page.selectOption('#author','Kant');assert.equal(await page.locator('[data-open]').count(),23);
  await page.fill('#query','faculte de juger');assert.equal(await page.locator('[data-open]').count(),11);await page.fill('#query','');
  await page.selectOption('#author','Cioran');assert.equal(await page.locator('[data-open]').count(),18);
  await page.fill('#query','arbre de vie');assert.equal(await page.locator('[data-open]').count(),6);await page.fill('#query','');
  await page.selectOption('#author','Spinoza');assert.equal(await page.locator('[data-open]').count(),15);
  await page.selectOption('#author','Aristote');assert.equal(await page.locator('[data-open]').count(),15);
  await page.fill('#query','reminiscence');assert.equal(await page.locator('[data-open]').count(),0);assert(await page.locator('.bank-empty').isVisible());
  await page.locator('#bank-reset').click();await page.fill('#query','reminiscence');assert.equal(await page.locator('[data-open]').count(),1);
  await page.locator('[data-open]').click();assert.equal(await page.locator('.bank-sentence').count(),6);
  assert(await page.locator('#bank-commentary').isVisible());assert(await page.locator('#bank-dissertation').isVisible());
  await page.locator('#bank-reset').click();
  // Exercise every complete fiche: exact quotation, annotation text and source links.
  for(const e of data.entries){
   await page.locator('[data-open="'+e.id+'"]').click();
   if(e.author==='Cioran'){assert((await page.locator('#bank-reference').textContent()).includes('Écrivain et penseur'));await page.locator('.bank-edition summary').click();assert((await page.locator('.bank-edition').innerText()).includes('Texte original français'));assert(!(await page.locator('.bank-edition').innerText()).includes('à préciser'));}
   assert.equal(await page.locator('.bank-quote strong').textContent(),'« '+e.quote+' »');
   assert.equal(await page.locator('.bank-use').count(),e.uses.length);
   assert.deepEqual(await page.locator('.bank-sentence-text').allTextContents(),e.commentary.map(c=>c.sentence));
   const before=await page.locator('.bank-sentence-text').allTextContents();await page.locator('#toggle-functions').click();
   assert.deepEqual(await page.locator('.bank-sentence-text').allTextContents(),before);await page.locator('#toggle-functions').click();
   assert(await page.locator('.bank-function').first().isVisible());
   assert.equal(await page.locator('#bank-reader a[href=""]').count(),0);
   if(e.author==='Kant'){const style=await page.locator('.bank-work cite').evaluate(el=>getComputedStyle(el).fontStyle);assert.equal(style,'italic');}
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);assert(overflow<=1,e.id+' overflow '+overflow);
  }
  const last=data.entries.find(e=>e.code==='S14');await page.locator('[data-open="'+last.id+'"]').click();assert((await page.locator('#bank-reader').innerText()).includes('Copie A20')||(await page.locator('#bank-reader').innerText()).includes('copie A20'));
  const href=await page.locator('#bank-reader a[href^="philosophie-"]').first().getAttribute('href');assert((await page.request.get(base+href)).ok());
  await page.reload();assert.equal(await page.locator('.bank-quote strong').textContent(),'« '+last.quote+' »');
  await page.locator('#bank-close').click();assert(await page.locator('#bank-reader').isHidden());
  await page.locator('.bank-subject-filter summary').click();await page.selectOption('#subject','La science doit-elle être utile ?');assert.equal(await page.locator('[data-open]').count(),1);
  await page.locator('#bank-reset').click();await page.goto(base+'philosophie-banque.html?fiche=platon-persuasion');assert((await page.locator('#reader-title').textContent()).includes('Convaincre'));
  await page.goto(base+'philosophie-banque.html?fiche=platon-caverne');assert((await page.locator('#bank-message').textContent()).includes('retirée'));assert(await page.locator('#bank-reader').isHidden());
  await page.goto(base+'philosophie-banque.html?query=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E');assert.equal(await page.locator('#bank-results img').count(),0);
  assert.deepEqual(errors,[]);
  if(process.env.PHILO_SCREENSHOT_DIR){fs.mkdirSync(process.env.PHILO_SCREENSHOT_DIR,{recursive:true});await page.goto(base+'philosophie-banque.html?fiche='+data.entries.find(e=>e.code==='C16').id);await page.screenshot({path:path.join(process.env.PHILO_SCREENSHOT_DIR,'bank-'+width+'.png'),fullPage:true});}
  await context.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:900}}),p=await nojs.newPage();await p.goto(base+'philosophie-banque.html');assert.equal(await p.locator('.bank-static details').count(),101);await p.locator('.bank-static details').first().locator('summary').click();assert(await p.locator('.bank-static blockquote').first().isVisible());assert(await p.locator('#bank-controls').isHidden());await nojs.close();
  console.log('OK',width,'— 101 fiches, 2 lectures, filtres, annotations, A20, anciens liens, rechargement, sans JavaScript.');
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
