#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');const {displayQuote,quoteNote}=require('../philosophie-banque.js');const root=path.resolve(process.argv[2]||'.');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'philo-banque-data.json'),'utf8'));
// The site build adds French non-breaking spaces in the static catalogue.
const typography=s=>s.replace(/\s+/g,' ').replace(/ ?([;:?!])/g,'$1').replace(/« /g,'«').replace(/ »/g,'»');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname),f=path.resolve(root,'.'+(p==='/'?'/index.html':p));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,b)=>{if(err){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});res.end(b);});});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({headless:true,executablePath:process.env.PHILO_BROWSER_EXECUTABLE||undefined});
 try{for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));assert((await page.goto(base+'philosophie-banque.html')).ok());await page.waitForSelector('[data-open]');
  assert.equal(await page.locator('[data-open]').count(),246);assert.equal(await page.locator('#notion option').count(),18);
  await page.selectOption('#author','Rousseau');assert.equal(await page.locator('[data-open]').count(),26);
  await page.fill('#query','Reveries du promeneur solitaire');assert.equal(await page.locator('[data-open]').count(),10);await page.fill('#query','Confessions');assert.equal(await page.locator('[data-open]').count(),15);await page.fill('#query','');
  await page.selectOption('#author','La Fontaine');assert.equal(await page.locator('[data-open]').count(),20);
  await page.selectOption('#author','Simone Weil');assert.equal(await page.locator('[data-open]').count(),2);
  await page.selectOption('#author','Arendt');assert.equal(await page.locator('[data-open]').count(),1);
  await page.selectOption('#author','Simondon');assert.equal(await page.locator('[data-open]').count(),9);
  await page.selectOption('#author','Bachelard');assert.equal(await page.locator('[data-open]').count(),13);
  await page.selectOption('#author','Freud');assert.equal(await page.locator('[data-open]').count(),12);
  await page.selectOption('#author','Corneille');assert.equal(await page.locator('[data-open]').count(),18);
  await page.selectOption('#author','Baudelaire');assert.equal(await page.locator('[data-open]').count(),16);
  await page.selectOption('#author','Racine');assert.equal(await page.locator('[data-open]').count(),17);
  await page.fill('#query','Polynice');assert.equal(await page.locator('[data-open]').count(),1);await page.fill('#query','');
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
   await page.locator('[data-open="'+e.id+'"]').dispatchEvent('click');
   if(e.author==='Cioran'){assert((await page.locator('#bank-reference').textContent()).includes('Écrivain et penseur'));await page.locator('.bank-edition summary').click();assert((await page.locator('.bank-edition').innerText()).includes('Texte original français'));assert(!(await page.locator('.bank-edition').innerText()).includes('à préciser'));}
   assert.equal(await page.locator('.bank-quote strong').textContent(),'« '+displayQuote(e)+' »');
   assert.equal(await page.locator('.bank-card').filter({has:page.locator('[data-open="'+e.id+'"]')}).locator('.bank-preview').textContent(),'« '+displayQuote(e)+' »');
   assert.equal(await page.locator('.bank-use').count(),e.uses.length);
   if(quoteNote(e)){await page.locator('.bank-edition summary').click();assert((await page.locator('.bank-edition').innerText()).includes(quoteNote(e)));}
   assert.deepEqual(await page.locator('.bank-sentence-text').allTextContents(),e.commentary.map(c=>c.sentence));
   const before=await page.locator('.bank-sentence-text').allTextContents();await page.locator('#toggle-functions').dispatchEvent('click');
   assert.deepEqual(await page.locator('.bank-sentence-text').allTextContents(),before);await page.locator('#toggle-functions').dispatchEvent('click');
   assert(await page.locator('.bank-function').first().isVisible());
   assert.equal(await page.locator('#bank-reader a[href=""]').count(),0);
   if(e.quoteSource){assert.equal(await page.locator('#bank-reference .bank-source a').getAttribute('href'),e.quoteSource);assert.equal(await page.locator('#bank-reference .bank-source a').textContent(),e.quoteSourceLabel+' ↗');}
   if(e.situation)assert.equal(await page.locator('#bank-reference .bank-situation').textContent(),e.situation);
   if(e.collection)assert.equal(await page.locator('.bank-work cite').nth(1).textContent(),e.collection);
   if(e.verse){assert.equal(await page.locator('.bank-quote strong').evaluate(el=>getComputedStyle(el).whiteSpace),'pre-line');assert.equal(await page.locator('#bank-commentary h3').textContent(),'Commentaire');if(['Racine','Corneille','La Fontaine'].includes(e.author))assert.equal(await page.locator('#bank-reference .bank-situation').textContent(),e.situation);if(e.collection)assert.equal(await page.locator('.bank-work cite').nth(1).textContent(),e.collection);}
   if(e.quoteSource||e.author==='Rousseau'||e.author==='Simondon'||e.author==='Kant'||e.author==='Bachelard'||e.author==='Freud'||e.verse){const styles=await page.locator('.bank-work cite').evaluateAll(els=>els.map(el=>getComputedStyle(el).fontStyle));assert(styles.length>0&&styles.every(style=>style==='italic'));}
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
  if(process.env.PHILO_SCREENSHOT_DIR){fs.mkdirSync(process.env.PHILO_SCREENSHOT_DIR,{recursive:true});await page.goto(base+'philosophie-banque.html?fiche=baudelaire-nature-et-signes');await page.locator('.bank-edition summary').click();await page.locator('#bank-reader').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(process.env.PHILO_SCREENSHOT_DIR,'bank-'+width+'.png')});}
  await context.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:900}}),p=await nojs.newPage();await p.goto(base+'philosophie-banque.html');assert.equal(await p.locator('.bank-static details').count(),246);for(const e of data.entries){assert.equal(typography(await p.locator('#citation-'+e.id+' blockquote strong').textContent()),typography('« '+displayQuote(e)+' »'));if(quoteNote(e))assert((await p.locator('#citation-'+e.id).textContent()).includes(quoteNote(e)));}await p.locator('.bank-static details').first().locator('summary').click();assert(await p.locator('.bank-static blockquote').first().isVisible());assert(await p.locator('#bank-controls').isHidden());await nojs.close();
  console.log('OK',width,'— 246 fiches, 2 lectures, filtres, annotations, A20, anciens liens, rechargement, sans JavaScript.');
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
