#!/usr/bin/env node
/* Vérifie les choix du parcours et la rédaction locale, sans appel au correcteur. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),vm=require('node:vm');
const {chromium}=require('playwright');
async function check(root){
 root=path.resolve(root);require('node:child_process').execFileSync(process.execPath,[path.join(__dirname,'check-commentaire-xy.js'),root],{stdio:'inherit'});const captures=path.join(root,'browser-audit');fs.mkdirSync(captures,{recursive:true});
 const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'annales/catalogue-annales.js'),'utf8'),ctx);
 const catalogue=ctx.window.ANNALES_CATALOGUE;
 const chainCtx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'commentaire-chaine-data.js'),'utf8'),chainCtx);const textes=chainCtx.window.COMMENTAIRE_CHAINE.textes;
 const sourceIds=['bac-2025-asie-general-commentaire-apollinaire-mesange','bac-2024-centre-etranger-general-commentaire-aragon-elsa-au-miroir','bac-2022-metropole-general-commentaire-sylvie-germain-jours-de-colere','bac-2022-amerique-du-nord-general-commentaire-musset-lorenzaccio','bac-2021-metropole-general-commentaire-larbaud-ancienne-gare-cahors'];
 const subjects=Object.values(catalogue).filter(x=>x.type==='bac-commentaire');
 assert.equal(subjects.length,13);
 for(const subject of subjects)assert(/\.pdf$|\/download$/u.test(subject.sourceOfficielle),'Le sujet doit mener à un document précis : '+subject.auteur);
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
   for(const id of sourceIds){
    await page.goto(base+id+'.html');
    assert.equal(await page.getByRole('link',{name:'Voir le sujet officiel'}).getAttribute('href'),catalogue[id].sourceOfficielle);
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,id);
    if(id.includes('aragon')){
     const content=await page.locator('main').innerText();assert(content.includes('2020'));assert(!content.includes('2024'));
     assert((await page.locator('meta[name="description"]').getAttribute('content')).includes('2020'));
     await page.locator('main h1').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(captures,'commentaire-source-aragon-'+width+'.png')});
    }
   }
   await page.goto(base+'annales.html');
   const aragon=page.locator('#transformedAnnales .corpus-card').filter({hasText:'Louis Aragon'});
   // La section utilise content-visibility : la faire entrer dans le viewport avant sa carte.
   await page.locator('#transformedAnnales').locator('..').locator('.archive-head').scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>document.querySelector('#transformedAnnales').innerText.includes('2020'));
   await aragon.scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(captures,'commentaire-catalogue-aragon-'+width+'.png')});
   const cardText=await aragon.innerText();
   assert(cardText.includes('2020'),cardText);assert(!cardText.includes('2024'));
   assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
   // Nouvelle méthode : l’élève accomplit X, Y puis l’analyse, aux trois niveaux.
   for(const texte of textes){
    for(const niveau of [1,2]){
     await page.goto(base+'commentaire-pas-a-pas.html?texte='+texte.id+'&niveau='+niveau);
     for(const [index,etape] of texte.etapes.entries()){
      const solide=etape.o.findIndex(o=>o[1]==='ok');
      if(niveau===2&&etape.w2){
       if(etape.k==='lecture'){
        await page.locator('.comm-compare').click();assert((await page.locator('#comm-app .chaine-fb').innerText()).includes('Écrivez d’abord'));
       }
       await page.locator('#comm-w').fill(etape.o[solide][0]);await page.locator('.comm-compare').click();
       assert((await page.locator('#comm-app .chaine-fb').innerText()).includes('Une réponse possible'));
       await page.locator('.comm-yes').click();
      }else{
       if(etape.k==='lecture'&&niveau===1){
        await page.locator('.chaine-opt[data-k="'+etape.o.findIndex(o=>o[1]==='no')+'"]').click();assert((await page.locator('#comm-app .chaine-fb').innerText()).includes('À revoir'));
       }
       await page.locator('.chaine-opt[data-k="'+solide+'"]').click();await page.locator('.comm-next').click();
      }
     }
     assert((await page.locator('#comm-app').innerText()).includes('Votre plan est construit.'));
     assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);
    }
    await page.goto(base+'commentaire-pas-a-pas.html?texte='+texte.id+'&niveau=3');
    await page.locator('#n3-configuration').fill('Une configuration précise pour '+texte.id);
    await page.locator('#n3-lecture').fill('Une lecture appuyée sur les mots pour '+texte.id);
    await page.locator('#n3-pb').fill('Comment ce passage construit-il cette lecture ?');
    await page.reload();assert.equal(await page.locator('#n3-configuration').inputValue(),'Une configuration précise pour '+texte.id);
    await page.locator('.comm-reveal').click();assert(await page.locator('.cc-modele').first().isVisible());
    assert(!(await page.locator('.cc-form').innerText()).includes('On pouvait attendre'));
    await page.locator('.comm-clear').click();assert.equal(await page.locator('#n3-lecture').inputValue(),'');
   }
   for(const name of ['commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-introduction.html','bac-dissertation-methode.html','brevet-comprehension.html']){
    await page.goto(base+name);assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,name);
    if(name==='commentaire-bac-problematique.html'){
     await page.locator('main h1').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(captures,'methode-xy-'+width+'.png')});
     await page.locator('#prob-qcm [data-st="def"]').click();assert((await page.locator('#prob-fb').innerText()).includes('Défendable'));
     await page.locator('#prob-qcm [data-st="ok"]').click();assert((await page.locator('#prob-fb').innerText()).includes('Solide'));
    }
   }
   await page.goto(base+'bac-dissertation.html');
   for(let i=0;i<10;i++){
    await page.locator('.chaine-sujets button[data-subj="'+i+'"]').click();
    const article=page.locator('.diss-sujet[data-subj="'+i+'"]');
    await article.locator('.diss-step').nth(0).locator('[data-v="ok"]').click();await article.locator('.diss-step').nth(0).getByRole('button',{name:'Continuer'}).click();
    await article.locator('.diss-step').nth(1).locator('[data-v="ok"]').click();await article.locator('.diss-step').nth(1).getByRole('button',{name:'Continuer'}).click();assert(await article.locator('.diss-fin').isVisible());
   }
   await page.locator('.chaine-tabs [data-level="2"]').click();
   await page.locator('.diss-sujet:visible .diss-area').fill('Le sujet demande une lecture précise, que plusieurs passages de cette œuvre permettent de discuter. Quelle est sa portée ?');
   await page.locator('.diss-sujet:visible .diss-compare').click();assert((await page.locator('.diss-sujet:visible .diss-fbm').innerText()).includes('Le problème'));
   for(const id of Object.keys(catalogue).filter(id=>catalogue[id].type==='bac-commentaire')){
    await page.goto(base+'annales/entrainement-annale.html?id='+id+'&mode=targeted&step=attente');
    await page.locator('.annale-workspace').scrollIntoViewIfNeeded();
    await page.locator('#stepTitle').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.getElementById('stepTitle')?.textContent?.length>0,{},{timeout:5000}).catch(()=>{});
    assert(/Y\s*:/u.test(await page.locator('#stepTitle').innerText()),JSON.stringify({id,title:await page.locator('#stepTitle').innerText(),errors,body:(await page.locator('body').innerText()).slice(-2500)}));
    await page.locator('#studentAnswer').fill('Une lecture justifiée du texte '+id);await page.locator('#saveNext').click();
    await page.reload();assert.equal(await page.locator('#studentAnswer').inputValue(),'Une lecture justifiée du texte '+id);
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,id);
   }
   assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
   results.push({width,text:true,draft:true,timer:true,reload:true,subjects:4,download:true,comparison:true,isolatedErase:true,ok:true});await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),p=await nojs.newPage();await p.goto(base+'bac-mode-examen.html');assert.equal(await p.locator('[data-exam-id]:visible').count(),4);assert.equal(await p.locator('[data-exam-id="hialmar"] .vers').count(),36);await nojs.close();
  const denied=await browser.newContext();await denied.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new Error('Storage unavailable');};});const d=await denied.newPage();await d.goto(base+'bac-mode-examen.html?sujet=inconnu');await d.locator('[data-exam-id="hialmar"] textarea').fill('Un brouillon à télécharger.');assert((await d.locator('[data-exam-id="hialmar"] [data-exam-save]').innerText()).includes('indisponible'));await denied.close();
  fs.writeFileSync(path.join(captures,'commentaire-parcours-report.json'),JSON.stringify(results,null,2));console.log('Parcours commentaire : quatre entrées, dix modèles et mode examen à 390/1280 px : OK.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
}
module.exports=check;
if(require.main===module)check(process.argv[2]||'.').catch(e=>{console.error(e);process.exitCode=1;});
