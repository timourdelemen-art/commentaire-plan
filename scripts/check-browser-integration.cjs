#!/usr/bin/env node
// Real journeys on the integrated build; no claim of automatic philosophical grading.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.');
const pages=[...new Set(['index.html','bibliotheque.html','bibliotheque-litterature.html','annales.html','philosophie.html','philosophie-banque.html','philosophie-explication.html','philosophie-exemples.html','philosophie-troisieme-resolutions.html','hlp.html','hlp-premiere.html','hlp-terminale.html','hlp-ecrire.html','brevet.html','brevet-lecture-parcours.html',...fs.readdirSync(root).filter(n=>/^(hlp-parcours-.*|philosophie-explication-.+|philosophie-copie-20-.+|philosophie-notion-.+|philosophie-bac-2026-.+)\.html$/.test(n))])];
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(file,(e,b)=>{if(e)return res.writeHead(404).end();res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(b);});});
const results=[];
async function checkNavigation(page,name){
 const navs=page.locator('main nav.annales-jump');
 assert((await navs.count())<=1,'Barres d’accès rapide dupliquées : '+name);
 const links=page.locator('main nav.annales-jump a[href]');
 for(const link of await links.all()){
  const href=await link.getAttribute('href');
  if(!href||href.startsWith('http'))continue;
  const url=new URL(href,page.url());
  const current=new URL(page.url());
  if(url.pathname===current.pathname&&url.hash){
   const id=decodeURIComponent(url.hash.slice(1));
   assert(await page.locator('[id]').evaluateAll((els,target)=>els.some(el=>el.id===target),id),'Ancre introuvable : '+name+' '+href);
  }
 }
 if(name==='philosophie.html'){
  assert.equal(await page.locator('.sequence-spec [data-parcours] .parcours-check').count(),0,'Anciennes cases de suivi');
  const sections=page.locator('#comprendre details');
  assert.equal(await sections.count(),2,'Les deux sections facultatives doivent être présentes');
  for(const section of await sections.all()){
   assert(!(await section.evaluate(el=>el.open)),'Section théorique ouverte par défaut');
   await section.locator('summary').click();
   assert(await section.evaluate(el=>el.open),'Section théorique non ouvrable');
   await section.locator('summary').click();
  }
  for(const href of ['philosophie-probleme-pas-a-pas.html','philosophie-problematisation.html','philosophie-dissertation-entrainement.html','philosophie-dissertation.html']){
   const link=page.locator('.sequence-spec a[href="'+href+'"]');
   assert(await link.count()>0,'Lien de cours ou exercice absent : '+href);
   await link.first().scrollIntoViewIfNeeded();
   assert(await link.first().isVisible(),'Lien non visible : '+href);
  }
 }
}
async function journeys(page,name,width){
 if(name==='index.html'){
  if(width===390){await page.locator('.mobile-nav-toggle').click();assert.equal(await page.locator('#mobile-nav a').count(),6);await page.locator('#mobile-nav a[href="/bibliotheque.html"]').click();assert.match(page.url(),/bibliotheque/);await page.goBack();}
  else {
   assert.equal(await page.locator('.nav-portals>.portal-wrap').count(),6);
   const clips=await page.locator('.nav-portals .portal>span').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent));assert.deepEqual(clips,[],'Intitulé tronqué');
   const portal=page.locator('.portal[href="/bibliotheque.html"]');await portal.focus();await portal.press('ArrowDown');assert.equal(await page.locator('.portal-wrap.open .portal-dropdown a').first().evaluate(e=>e===document.activeElement),true);await page.keyboard.press('Escape');assert.equal(await page.locator('.portal-wrap.open').count(),0,'Échap doit fermer le menu');
  }
 }
 const boxes=page.locator('.ecrire [data-parcours]');
 for(let i=0;i<await boxes.count();i++){
  const box=boxes.nth(i);const id=await box.getAttribute('data-parcours');
  for(const choice of await box.locator('[data-choice]').all()){await choice.click();assert.match(await box.locator('[data-choice-feedback]').innerText(),/Solide|Défendable|À revoir/);}
  const first=box.locator('[data-panel="1"] [data-draft]').first();const draft='Brouillon '+id;await first.fill(draft);await box.locator('[data-level="2"]').click();
  const partial=box.locator('[data-panel="2"] [data-step]');
  for(let j=0;j<await partial.count();j++){await assert.doesNotReject(()=>partial.nth(j).waitFor({state:'visible'}));await partial.nth(j).locator('textarea').first().fill('Une justification précise, avec un appui du texte.');if(j+1<await partial.count())await box.locator('[data-next-step]').click();}
  await box.locator('[data-level="3"]').click();await box.locator('[data-panel="3"] textarea').first().fill('Ma rédaction complète, après les étapes préparatoires.');
  await box.locator('[data-compare]').click();assert.equal(await box.locator('[data-model]').getAttribute('open'),'');
  await box.locator('[data-annotations]').click();assert.equal(await box.locator('.ecrire-copy.sans-annotations').count(),await box.locator('.ecrire-copy').count());await box.locator('[data-annotations]').click();
  await box.locator('[data-restart]').click();assert.equal(await first.inputValue(),draft,'Recommencer ne doit pas effacer');
 }
 if(await boxes.count()){
  const saved=await boxes.first().locator('[data-panel="1"] [data-draft]').first().inputValue();await page.reload();assert.equal(await page.locator('.ecrire [data-parcours]').first().locator('[data-panel="1"] [data-draft]').first().inputValue(),saved);
  const box=page.locator('.ecrire [data-parcours]').first();page.once('dialog',d=>d.accept());await box.locator('[data-erase]').click();assert.equal(await box.locator('[data-draft]').first().inputValue(),'');
 }
 if(name==='philosophie-exemples.html'){
  const subject=await page.locator('#ex-sujet option').evaluateAll(es=>es.find(e=>e.textContent.includes('convaincre')).value);await page.selectOption('#ex-sujet',subject);
  const buttons=page.locator('[data-compare]');assert(await buttons.count()>0);await buttons.first().click();const draft=page.locator('[data-draft-field="preference"]');await draft.fill('Cette scène distingue validité et réception des raisons.');await page.reload();assert.equal(await page.locator('[data-draft-field="preference"]').inputValue(),'Cette scène distingue validité et réception des raisons.');
 }
 if(name==='philosophie-troisieme-resolutions.html'){
  await page.locator('[data-piste]').first().click();await page.fill('#resolutions-note','La piste préserve les deux exigences, mais garde une difficulté précise.');await page.locator('#resolutions-model').click();assert((await page.locator('#resolutions-model-output').innerText()).includes('Une préférence'));await page.locator('#resolutions-change').click();await page.locator('[data-piste="2"]').click();await page.fill('#resolutions-conclusion','Une réponse, sa difficulté restante, et une nouvelle question.');
 }
 if(name.startsWith('philosophie-copie-20-')){const b=page.locator('.c20-toggle');if(await b.count()){await b.click();assert.equal(await b.innerText(),'Afficher les fonctions');await b.click();}}
}
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';const browser=await chromium.launch({headless:true});fs.mkdirSync(path.join(root,'browser-audit'),{recursive:true});
 for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:900}});
  for(const name of pages){
   const page=await context.newPage(),errors=[];page.setDefaultTimeout(5000);page.on('pageerror',e=>errors.push(e.message));
   try{
    const response=await page.goto(base+name,{waitUntil:'load'});assert(response.ok());await journeys(page,name,width);await checkNavigation(page,name);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);assert(overflow<=12,`Débordement ${overflow}px`);assert.equal(errors.length,0,errors.join('; '));
    if(['index.html','bibliotheque.html','bibliotheque-litterature.html','philosophie-banque.html'].includes(name))await page.screenshot({path:path.join(root,'browser-audit',`${name}-${width}.png`),fullPage:true});
    results.push({name,width,ok:true});console.log('OK',width,name);
   }catch(e){results.push({name,width,ok:false,error:e.message,errors});console.error('FAIL',width,name,e.message);await page.screenshot({path:path.join(root,'browser-audit',`FAIL-${name}-${width}.png`),fullPage:true});}
   await page.close();
  }
  await context.close();
 }
 await browser.close();fs.writeFileSync(path.join(root,'browser-audit/report.json'),JSON.stringify(results,null,2));if(results.some(r=>!r.ok))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
