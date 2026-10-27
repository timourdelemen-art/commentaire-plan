#!/usr/bin/env node
/* L’élève choisit, écrit, compare, reprend ; le modèle conserve les mêmes phrases. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');const data=require('./commentaires-programme-data.json');
const root=path.resolve(process.argv[2]||'.');
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'application/javascript':'text/html; charset=utf-8');res.end(b);});});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';const browser=await chromium.launch();const captures=path.join(root,'browser-audit');fs.mkdirSync(captures,{recursive:true});
 try{
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage();const errors=[],posts=[];
   page.on('pageerror',e=>errors.push(e.message));await page.route('**/*.workers.dev/**',r=>{posts.push(r.request().url());return r.abort();});
   await page.goto(base+'bac-commentaire.html');
   for(const w of data)assert.equal(await page.locator('main a[href="'+w.file+'#entrainement"]').count(),1);
   for(const w of data){
    await page.goto(base+w.file+'#entrainement');await page.locator('[data-etapes].etapes-actives').waitFor();
    const support=page.locator('#entrainement .programme-reading');assert((await support.innerText()).split(/\s+/).length>=300);
    for(let i=0;i<w.exercises.length;i++){
     await page.locator('[data-etape="'+i+'"]').click();const step=page.locator('.etape:visible'),e=w.exercises[i];
     const opts=step.locator('.chaine-opt');assert.equal(await opts.count(),3);
     for(const status of ['no','def','ok']){await step.locator('[data-v="'+status+'"]').click();assert((await step.locator('.chaine-fb').innerText()).includes({no:'À revoir',def:'Défendable',ok:'Solide'}[status]));}
     await step.getByRole('button',{name:'À vous d’écrire →',exact:true}).click();const area=step.locator('textarea');await area.waitFor();
     await step.locator('[data-after-writing] summary').click();assert((await step.locator('[role="status"]').innerText()).includes('Écrivez un essai'));
     await area.fill('Mon essai personnel, avec les mots du texte et leur effet précis.');await step.locator('[data-after-writing] summary').click();assert.equal(await step.locator('[data-after-writing]').getAttribute('open'),'');
     await page.reload();assert.equal(await page.locator('#reponse-'+e.id).inputValue(),'Mon essai personnel, avec les mots du texte et leur effet précis.');
     await page.locator('.etape:visible [data-recommencer]').click();assert.equal(await page.locator('.etape:visible .chaine-opt:disabled').count(),0);
     assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);
    }
    await page.locator('[data-etape="3"]').click();await page.locator('#copie-personnelle').fill('Mon commentaire entier conservé à part.');
    await page.getByRole('tab',{name:'Le commentaire modèle',exact:true}).click();await page.locator('.cm-bar').waitFor();
    const expected=w.copy.map(p=>p.sentences.map(s=>s.text).join(' '));const norm=s=>s.replace(/\s+/gu,' ').trim();
    assert.deepEqual((await page.locator('#copie .cm-plain>p').allTextContents()).map(norm),expected.map(norm));
    await page.locator('#copie .cm-mode[data-mode="f"]').click();assert.equal(await page.locator('#copie .c20-f:visible').count(),w.copy.reduce((n,p)=>n+p.sentences.length,0));
    await page.locator('#copie .cm-mode[data-mode="e"]').click();assert.equal(await page.locator('#copie .cm-plain>p:visible').count(),13);
    await page.screenshot({path:path.join(captures,w.id+'-modele-'+width+'.png')});
    await page.goto(base+w.dissertation.file+'#entrainement');const fields=page.locator('textarea');assert.equal(await fields.count(),3);
    for(let i=0;i<3;i++){await fields.nth(i).fill('Une lecture à vérifier dans les scènes de l’œuvre.');await page.locator('[data-after-writing] summary').nth(i).click();assert.equal(await page.locator('[data-after-writing]').nth(i).getAttribute('open'),'');}
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);
   }
   assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);console.log('Commentaires des deux œuvres '+width+' px : 6 QCM, écriture, reprise, copie entière/phrases et 6 tâches de dissertation : OK.');await context.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
