#!/usr/bin/env node
/* Accueil sobre : un paragraphe, accès aux rubriques par le menu commun. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.');const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'application/javascript':'text/html; charset=utf-8');res.end(b);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';const browser=await chromium.launch(),captures=path.join(root,'browser-audit');fs.mkdirSync(captures,{recursive:true});
 try{for(const width of [390,1280]){
 const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await ctx.newPage();const errors=[],posts=[];page.on('pageerror',e=>errors.push(e.message));await page.route('**/*.workers.dev/**',r=>{posts.push(r.request().url());return r.abort();});
 await page.goto(base+'index.html');assert.equal(await page.locator('main h1').count(),1);assert.equal(await page.locator('main>p').count(),1);assert.equal(await page.locator('main>p').evaluate(e=>getComputedStyle(e).textAlign),'justify');
 assert.match(await page.locator('main>p').innerText(),/vraies annales.*progression guidée.*rédaction autonome/);assert.match(await page.locator('main>p').innerText(),/excellence/);
 assert.equal(await page.locator('main a,main button,main input,main select,main textarea,main details').count(),0,'Le contenu principal présente le site sans ajouter un autre parcours');
 assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);await page.screenshot({path:path.join(captures,'accueil-minimal-'+width+'.png'),fullPage:true});
 for(const href of ['/bac.html','/philosophie.html','/hlp.html','/brevet.html','/bibliotheque.html','/annales.html']){
  await page.goto(base+'index.html');let link;
  if(width<761){await page.getByRole('button',{name:'Menu',exact:true}).click();link=page.locator('#mobile-nav a[href="'+href+'"]');}
  else link=page.locator('.nav-portals .portal[href="'+href+'"]');
  await link.focus();await page.keyboard.press('Enter');await page.waitForURL(base+href.slice(1));assert(await page.locator('main h1').isVisible());
 }
 await page.goto(base+'enseignants.html');await page.getByRole('link',{name:/Être prévenu des nouveautés/}).click();await page.waitForURL('**/contact.html#prevenu');assert(await page.locator('#prevenu').isVisible());assert.equal(await page.locator('#prevenu input[name="consentement"][required]').count(),1);assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);await page.locator('#prevenu').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(captures,'nouveautes-contact-'+width+'.png')});
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);console.log('Accueil '+width+' px : paragraphe unique, six rubriques au clavier, inscription déplacée et absence de requête de correction : OK.');await ctx.close();
 }
 for(const width of [390,1280]){const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:900}}),page=await ctx.newPage();await page.goto(base+'index.html');assert(await page.locator('main>p').isVisible());const link=page.locator(width<761?'#mobile-nav a[href="/bac.html"]':'.nav-portals .portal[href="/bac.html"]');assert(await link.isVisible());await link.click();assert.match(page.url(),/bac\.html$/);await ctx.close();}
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
