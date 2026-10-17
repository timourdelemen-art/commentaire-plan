'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),http=require('node:http'),vm=require('node:vm');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.'),repo=path.resolve(__dirname,'..');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(repo,'lettres-dissertation-data.js'),'utf8'),sandbox);const data=sandbox.window.LETTRES_CORPUS;
const norm=t=>t.normalize('NFC').replace(/’/g,"'").replace(/\s+/gu,' ').trim();
function strings(v){if(typeof v==='string')return[v];if(v&&typeof v==='object')return Object.values(v).flatMap(strings);return[];}
const evidence=['lettres-verification.json','lettres-annales-verification.json','lettres-citations-revision.json'].flatMap(f=>strings(JSON.parse(fs.readFileSync(path.join(__dirname,f),'utf8')))).join('\n');
const plainEvidence=norm(evidence.replace(/L\d+(?:@P[\d-]+)?: /g,'').replace(/【[^】]*】/g,''));
assert.equal(data.cards.length,27);assert.equal(Object.keys(data.works).length,9);assert.equal(data.exercises.length,18);
for(const c of data.cards){assert(plainEvidence.includes(norm(c.quote)),'citation absente : '+c.id);assert(/^https:\/\/fr.wikisource.org\//.test(c.source));assert(c.author&&c.context);assert.equal(c.commentary.length,4);assert(c.uses.length>0&&c.uses.length<=3);for(const u of c.uses){assert(data.annales[u.subjectId]);assert(u.stage&&u.function&&u.reason&&u.paragraph&&u.limit);assert.equal(u.mode,c.work===data.annales[u.subjectId].work?'preuve':'comparaison');}for(const line of c.commentary){assert(line.function&&line.sentence);}}
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'lettres-sources.json'),'utf8'));
for(const m of manifest.models)for(const quote of m.quotes)assert(plainEvidence.includes(norm(quote)),'citation modèle absente : '+quote);
for(const [key,s] of Object.entries(data.annales)){assert(plainEvidence.includes(norm(s.question)),'libellé officiel absent : '+key);if(s.setup)assert(plainEvidence.includes(norm(s.setup)),'citation du sujet absente : '+key);}assert.equal(Object.keys(data.annales).length,12);assert.equal(data.cards.reduce((n,c)=>n+c.uses.length,0),45);
let longest=0;const solidPositions=new Set();for(const x of data.exercises){assert.equal(x.options.length,3);solidPositions.add(x.options.findIndex(o=>o[1]==='Solide'));if(x.options.find(o=>o[1]==='Solide')[0].length===Math.max(...x.options.map(o=>o[0].length)))longest++;assert(x.short&&x.help&&x.model&&x.independent&&x.solution);assert.equal(x.criteria.length,3);}
assert.equal(solidPositions.size,3);assert(longest<13,'La réponse solide est presque toujours la plus longue.');
const pages=process.env.LETTRES_LIBRARY_ONLY?['bibliotheque-dissertation.html']:['bibliotheque-dissertation.html','lettres-exercices.html','bac-dissertation-copie-20-balzac.html','bac-dissertation-copie-20-rabelais.html'];
(async()=>{
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,d)=>e?res.writeHead(404).end():res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'})[path.extname(f)]||'application/octet-stream'}).end(d));});let browser;
try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({headless:true,executablePath:process.env.MODELES_CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 fs.mkdirSync(path.join(root,'browser-audit'),{recursive:true});
 for(const width of [390,1280]){
 const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(12000);
 for(const file of pages){
  await page.goto(base+'/'+file,{waitUntil:'networkidle'});assert.equal(await page.locator('h1').count(),1);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'débordement '+file);
  // All local links, including anchors, must point to something real.
  const links=await page.locator('main a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
  for(const href of links){if(/^(https?:|mailto:)/.test(href))continue;const u=new URL(href,base+'/'+file),target=path.join(root,decodeURIComponent(u.pathname));assert(fs.existsSync(target),'lien absent '+href);if(u.hash){const html=fs.readFileSync(target,'utf8');assert(html.includes('id="'+decodeURIComponent(u.hash.slice(1))+'"'),'ancre absente '+href);}}
  if(file==='bibliotheque-dissertation.html'){
   assert.equal(await page.locator('.lettres-result:visible').count(),27);assert.equal(await page.locator('.lettres-card:visible').count(),0);
   for(const c of data.cards){
    if(process.env.LETTRES_TRACE)console.log(width,c.id);
    await page.locator('[data-open="'+c.id+'"]').click();assert.equal(await page.locator('.lettres-card:visible').count(),1);
    if(process.env.LETTRES_TRACE)console.log('opened',c.id);const card=page.locator('#'+c.id);assert.equal(norm(await card.locator('blockquote').textContent()),norm(c.quote));assert((await card.locator('.lettres-author').textContent()).includes(c.author));
    assert.deepEqual(await card.locator('.lettres-section-heading h3').allTextContents(),['Dissertation','Commentaire']);
    assert.equal(await card.locator('.lettres-use:visible').count(),c.uses.length);
    for(let i=0;i<c.uses.length;i++){const use=card.locator('.lettres-use').nth(i),u=c.uses[i],subject=data.annales[u.subjectId];assert((await use.locator('h4').textContent()).includes(subject.question));assert((await use.textContent()).includes(u.stage));assert((await use.textContent()).includes(u.function));await use.locator('summary').click();assert((await use.locator('.lettres-insertion').textContent()).includes(u.paragraph));await use.locator('summary').click();}
    if(process.env.LETTRES_TRACE)console.log('uses done',c.id);const text=await card.locator('.lettres-sentence-text').allTextContents();assert.deepEqual(text,[...c.commentary.map(x=>x.sentence)]);
    await card.locator('.lettres-functions').click();assert.equal(await card.locator('.lettres-function:visible').count(),4);assert.deepEqual(await card.locator('.lettres-sentence-text').allTextContents(),text);await card.locator('.lettres-functions').click();assert.equal(await card.locator('.lettres-function:visible').count(),0);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'fiche overflow '+c.id);
    if(process.env.LETTRES_TRACE)console.log('annotations done',c.id);await page.locator('.lettres-close').click();assert.equal(await page.locator('.lettres-card:visible').count(),0);
   }
   for(const key of Object.keys(data.works)){await page.selectOption('#lettres-work',key);assert.equal(await page.locator('.lettres-result:visible').count(),3);}
   await page.locator('button[type=reset]').click();
   for(const [id,subject]of Object.entries(data.annales)){await page.selectOption('#lettres-subject',id);const expected=data.cards.filter(c=>c.uses.some(u=>u.subjectId===id));assert.equal(await page.locator('.lettres-result:visible').count(),expected.length);await page.locator('[data-open="'+expected[0].id+'"]').click();assert.equal(await page.locator('.lettres-use:visible').count(),expected[0].uses.filter(u=>u.subjectId===id).length);await page.locator('.lettres-close').click();}
   await page.locator('button[type=reset]').click();await page.selectOption('#lettres-use','preuve');assert.equal(await page.locator('.lettres-result:visible').count(),18);await page.selectOption('#lettres-use','comparaison');assert.equal(await page.locator('.lettres-result:visible').count(),9);
   await page.locator('button[type=reset]').click();await page.selectOption('#lettres-programme','actuel');assert.equal(await page.locator('.lettres-result:visible').count(),18);await page.selectOption('#lettres-programme','archive');assert.equal(await page.locator('.lettres-result:visible').count(),9);
   await page.fill('#lettres-search','zzzzintrouvable');assert(await page.locator('#lettres-empty').isVisible());await page.locator('button[type=reset]').click();assert.equal(await page.locator('.lettres-result:visible').count(),27);
   await page.fill('#lettres-search','liberte');assert((await page.locator('.lettres-result:visible').count())>0);await page.locator('#lettres-search').press('Enter');assert.equal(await page.locator('#lettres-search').inputValue(),'liberte');await page.locator('button[type=reset]').click();
   await page.goto(base+'/'+file+'#prevost-2',{waitUntil:'networkidle'});assert.equal(await page.locator('.lettres-card:visible').count(),1);assert(await page.locator('#prevost-2').isVisible());
  }else if(file==='lettres-exercices.html'){
   assert.equal(await page.locator('.lettres-exercise').count(),18);assert.equal(await page.locator('textarea').count(),36);
   for(const x of data.exercises){const e=page.locator('#'+x.id);for(const state of ['Solide','Défendable','À revoir']){await e.locator('.lettres-options button').filter({hasText:x.options.find(o=>o[1]===state)[0]}).click();assert((await e.locator('.lettres-feedback').textContent()).startsWith(state+' —'));}
    await e.locator('.lettres-next').click();assert(await e.locator('textarea').nth(0).isVisible());await e.locator('textarea').nth(0).fill('Mon raisonnement '+x.id);await e.locator('.lettres-level').nth(1).locator('summary').nth(0).click();await e.locator('.lettres-level').nth(1).locator('.lettres-compare summary').click();
    await e.locator('.lettres-next').click();assert(await e.locator('textarea').nth(1).isVisible());await e.locator('textarea').nth(1).fill('Ma reprise autonome '+x.id);await e.locator('.lettres-level').nth(2).locator('summary').nth(0).click();await e.locator('.lettres-level').nth(2).locator('.lettres-compare summary').click();
    await e.locator('.lettres-previous').click();assert(await e.locator('textarea').nth(0).isVisible());await e.locator('.lettres-reset').click();assert(await e.locator('.lettres-level').nth(0).isVisible());assert.equal(await e.locator('.lettres-feedback').textContent(),'');await e.locator('[data-level="3"]').click();assert.equal(await e.locator('textarea').nth(1).inputValue(),'Ma reprise autonome '+x.id);
   }
   await page.reload({waitUntil:'networkidle'});await page.locator('#imagination-1 [data-level="2"]').click();assert.equal(await page.locator('#imagination-1-draft-2').inputValue(),'Mon raisonnement imagination-1');
  }else{
   const texts=await page.locator('.mr-text').allTextContents(),notes=page.locator('.mr-note');assert.equal(await notes.count(),texts.length);assert.equal(await page.locator('.mr-paragraphe[data-stage="Introduction"] .mr-text').count(),6);
   assert.equal(await page.locator('[data-step]').count(),file.includes('rabelais')?6:9);for(const q of await page.locator('[data-quote]').evaluateAll(es=>es.map(e=>e.dataset.quote)))assert(plainEvidence.includes(norm(q)));
   await page.locator('.mr-toggle').click();assert.equal(await page.locator('.mr-note:visible').count(),texts.length);assert.deepEqual(await page.locator('.mr-text').allTextContents(),texts);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'annotation overflow');await page.locator('.mr-toggle').click();
  }
  await page.screenshot({path:path.join(root,'browser-audit',file.replace('.html','')+'-'+width+'.png'),fullPage:false});
 }
 assert.deepEqual(errors,[]);await context.close();console.log(width+'px : bibliothèque, filtres, 18 gestes × 3 niveaux, brouillons, 2 copies : OK');
 }
 const context=await browser.newContext({javaScriptEnabled:false}),p=await context.newPage();for(const file of pages){await p.goto(base+'/'+file);assert((await p.locator('main').textContent()).length>1500);if(file==='lettres-exercices.html')assert.equal(await p.locator('textarea:visible').count(),36);if(file==='bibliotheque-dissertation.html')assert.equal(await p.locator('.lettres-card:visible').count(),27);}await context.close();console.log('Sans JavaScript : corpus et 54 niveaux accessibles. 27 citations, 12 sujets, 45 emplois, 108 phrases de commentaire vérifiés.');
}catch(error){console.error(error);throw error;}finally{if(browser)await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
