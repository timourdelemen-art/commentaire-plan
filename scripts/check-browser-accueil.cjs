#!/usr/bin/env node
/* De l’accueil à une tâche précise, cinq niveaux, trois besoins. Démo autonome. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.');const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'application/javascript':'text/html; charset=utf-8');res.end(b);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';const browser=await chromium.launch(),captures=path.join(root,'browser-audit');fs.mkdirSync(captures,{recursive:true});
 try{for(const width of [390,1280]){
 const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await ctx.newPage();const errors=[],posts=[];page.on('pageerror',e=>errors.push(e.message));await page.route('**/*.workers.dev/**',r=>{posts.push(r.request().url());return r.abort();});
 await page.goto(base+'index.html');await page.locator('#home-routing').waitFor();assert.equal(await page.locator('main h1').count(),1);assert.equal(await page.locator('main .home-doors').count(),0);
 const destinations=[];
 for(const exam of ['francais','philo','hlp1','hlp2','brevet']){await page.selectOption('#home-exam',exam);for(let i=0;i<3;i++){await page.selectOption('#home-need',String(i));const href=await page.locator('#home-go').getAttribute('href');const url=new URL(href,base);const file=path.join(root,url.pathname.slice(1));assert(fs.existsSync(file),href);if(url.hash)assert(fs.readFileSync(file,'utf8').includes('id="'+url.hash.slice(1)+'"'),href);destinations.push(href);}}
 await page.screenshot({path:path.join(captures,'accueil-depart-'+width+'.png')});
 await page.locator('#home-go').focus();await page.keyboard.press('Enter');await page.waitForURL('**/brevet-reflexion.html#entrainement');assert(await page.locator('#entrainement').isVisible());
 await page.goto(base+'index.html#essayer');for(const state of ['no','def','ok']){await page.locator('[data-home-choice="'+state+'"]').click();assert.match(await page.locator('#home-demo-feedback').innerText(),new RegExp({no:'À revoir',def:'Défendable',ok:'Solide'}[state]));}
 await page.locator('.home-write>summary').click();await page.locator('#home-demo-compare>summary').click();assert.equal(await page.locator('#home-demo-compare').getAttribute('open'),null);assert.match(await page.locator('#home-demo-save').innerText(),/Écrivez un essai/);
 const draft='Vouloir sembler spontané pousse à calculer les gestes que l’on voulait naturels.';await page.locator('#home-demo-answer').fill(draft);await page.locator('#home-demo-compare>summary').click();assert.equal(await page.locator('#home-demo-compare').getAttribute('open'),'');await page.reload();assert.equal(await page.locator('#home-demo-answer').inputValue(),draft);
 assert.equal(await page.locator('form[name="nouveautes"]').count(),1);assert.equal(await page.locator('input[name="consentement"][required]').count(),1);
 assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);console.log('Accueil '+width+' px : 15 destinations, clavier, démonstration, brouillon et formulaire conservé : OK.');await ctx.close();
 }
 const ctx=await browser.newContext({javaScriptEnabled:false}),page=await ctx.newPage();await page.goto(base+'index.html');assert(await page.locator('#home-go').isVisible());assert.equal(await page.locator('noscript a').count(),4);await page.locator('#home-go').click();assert.match(page.url(),/hialmar/);await ctx.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
