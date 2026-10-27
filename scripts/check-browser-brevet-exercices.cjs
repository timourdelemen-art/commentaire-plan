#!/usr/bin/env node
/* Extraits lisibles, banque et choix de grammaire sans appel IA. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.');
const server=http.createServer((req,res)=>{
 const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
 if(!f.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'application/javascript':'text/html; charset=utf-8');res.end(b);});
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch();
 const capture=path.join(root,'browser-audit');fs.mkdirSync(capture,{recursive:true});
 try{
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900}});
   const page=await context.newPage(), errors=[], posts=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.route('**/*.workers.dev/**',route=>{posts.push(route.request().url());return route.abort();});
   for(const file of ['brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html']){
    await page.goto(base+file);await page.locator('[data-etapes]').waitFor();
    const steps=page.locator('.etapes-nav button');
    for(let i=0;i<await steps.count();i++){
     await steps.nth(i).click();
     const step=page.locator('.etape:visible');
     const reading=step.locator('.etape-q .brevet-extrait');
     await reading.waitFor();assert((await reading.innerText()).length>150);
     await step.locator('.etape-direct').click();
     const writing=step.locator('.etape-ecrit .brevet-extrait');
     await writing.waitFor();assert((await writing.innerText()).length>150);
     if(file==='brevet-comprehension.html'&&i===1){
      assert.equal(await writing.locator('.vers').count(),21);
      assert((await writing.innerText()).includes('L’invisible ennemi triomphe'));
      await writing.screenshot({path:path.join(capture,'brevet-extrait-'+width+'.png')});
     }
     assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,file+' déborde');
    }
    await page.getByRole('tab',{name:/Les annales/}).click();
    const bank=page.locator('#brevetTargetedBank');
    await bank.locator('a').first().waitFor();
    assert(!/GRATUIT|Correction locale/.test(await bank.innerText()));
    const box=await bank.boundingBox();assert(box.width>width*.75);
    if(file==='brevet-grammaire.html')await bank.screenshot({path:path.join(capture,'brevet-banque-'+width+'.png')});
   }
   for(const step of ['q7a','q7b','q8a','q8b']){
    const url=base+'annales/entrainement-annale.html?id=brevet-2026-general-zola-cage-betes-feroces&mode=targeted&step='+step;
    await page.goto(url);await page.getByRole('button',{name:'Je choisis',exact:true}).waitFor();
    assert(await page.locator('#aiCheck').isHidden());
    const draft='Mon brouillon personnel pour '+step;
    await page.locator('#studentAnswer').fill(draft);
    await page.getByRole('button',{name:'Je choisis',exact:true}).click();
    assert(await page.locator('#studentAnswer').isHidden());
    const opts=page.locator('.brevet-choix button');assert.equal(await opts.count(),3);
    const verdicts=[];
    for(const opt of await opts.all()){
     await opt.click();verdicts.push((await page.locator('.brevet-choix .chaine-fb').innerText()).split('.')[0]);
    }
    assert.deepEqual(verdicts.sort(),['À revoir','Défendable','Solide'].sort());
    await page.getByRole('button',{name:'Je rédige',exact:true}).click();
    assert.equal(await page.locator('#studentAnswer').inputValue(),draft);
    await page.locator('#helpButton').click();await page.locator('#helpButton').click();
    assert((await page.locator('#manualHelp').innerText()).includes('CORRECTION EXPLIQUÉE'));
    await page.locator('#saveNext').click();
    await page.reload();assert.equal(await page.locator('#studentAnswer').inputValue(),draft);
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);
   }
   // Une autre annale ne reçoit pas les choix de Zola.
   await page.goto(base+'annales/entrainement-annale.html?id=brevet-2022-metropole-general-la-fontaine-lion-moucheron&mode=targeted&step=q8a');
   await page.locator('#stepTitle').waitFor();assert.equal(await page.locator('.brevet-reponse-modes').count(),0);
   assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
   console.log('Brevet '+width+' px : 10 étapes avec extraits, banque lisible, 4 QCM, corrections sans IA et brouillons : OK.');
   await context.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
