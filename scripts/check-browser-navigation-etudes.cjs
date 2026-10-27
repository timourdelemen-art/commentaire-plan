#!/usr/bin/env node
/* Parcours d'entrée, filtres combinés, liens et accessibilité au clavier. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.');
const pages=['philosophie-explication.html','philosophie-dissertation-parcours.html','philosophie-dissertations.html','hlp.html','hlp-premiere.html','hlp-terminale.html','hlp-ecrire.html'];
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
 if(!f.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'}).end(b);});
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port+'/',browser=await chromium.launch();
 const capture=path.join(root,'browser-audit');fs.mkdirSync(capture,{recursive:true});
 try{
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const file of pages){
    await page.goto(base+file);await page.locator('main h1').waitFor();
    await page.locator('.brand-signature').waitFor();
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('main h1').count(),1);
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,file+' déborde');
    const links=await page.locator('main a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
    for(const href of new Set(links.filter(h=>!/^https?:/.test(h)))){
     const u=new URL(href,page.url()),file=path.join(root,u.pathname);
     assert(fs.existsSync(file),'Page absente : '+href);
     if(u.hash)assert(fs.readFileSync(file,'utf8').includes('id="'+decodeURIComponent(u.hash.slice(1))+'"'),'Ancre absente : '+href);
    }
    await page.screenshot({path:path.join(capture,file.replace('.html','')+'-'+width+'.png')});
    if(process.env.AXE_CORE_PATH){
     await page.addScriptTag({content:fs.readFileSync(process.env.AXE_CORE_PATH,'utf8')});
     const result=await page.evaluate(()=>axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));
     assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],file+' accessibilité du contenu principal');
    }
   }
   await page.goto(base+'philosophie-explication.html');
   assert.equal(await page.locator('main nav.annales-jump a').count(),2);
   assert.equal(await page.locator('#banque .ecrire-card').count(),13);
   assert(await page.evaluate(()=>document.getElementById('banque').compareDocumentPosition(document.getElementById('methode')) & Node.DOCUMENT_POSITION_FOLLOWING));
   assert(!(await page.locator('#methode').evaluate(el=>el.open)));
   await page.getByRole('link',{name:'Comprendre la méthode',exact:true}).click();
   assert(await page.locator('#methode').evaluate(el=>el.open));
   await page.goto(base+'philosophie-explication.html#sources');assert(await page.locator('#sources').evaluate(el=>el.open));
   await page.goto(base+'philosophie-explication.html');
   await page.getByRole('link',{name:'S’entraîner sur ce texte — Nietzsche',exact:true}).click();
   await page.locator('[data-choice]').first().click();
   assert.match(await page.locator('[data-choice-feedback]').innerText(),/Solide|Défendable|À revoir/);
   await page.locator('[data-level="2"]').click();await page.locator('[data-step="0"] textarea').fill('Ma lecture personnelle du texte.');

   await page.goto(base+'philosophie-dissertation-parcours.html');
   assert.deepEqual(await page.locator('main nav.annales-jump a').allTextContents(),['Commencer pas à pas','Choisir un sujet corrigé']);
   await page.getByRole('link',{name:'Choisir un sujet corrigé',exact:true}).click();
   assert.equal(await page.locator('[data-card]').count(),26);
   assert(!/Copies supplémentaires|Dissertation extraordinaire|· Notions/.test(await page.locator('main').innerText()));
   const search=page.getByRole('searchbox',{name:'Un mot du sujet'});
   await search.focus();await page.keyboard.type('VERITE');
   assert((await page.locator('[data-card]:visible').count())>0);
   assert((await page.locator('[data-card]:visible').count())<26);
   await page.getByLabel('Une notion',{exact:true}).selectOption('Technique');
   assert.equal(await page.locator('[data-card]:visible').count(),0);
   assert(await page.locator('[data-empty]').isVisible());
   await page.getByRole('button',{name:'Tout afficher',exact:true}).click();
   assert.equal(await page.locator('[data-card]:visible').count(),26);
   await page.getByLabel('Une notion',{exact:true}).selectOption('Travail');
   assert.equal(await page.locator('[data-card]:visible').count(),1);
   await page.reload();assert.equal(await page.locator('[data-card]:visible').count(),1);
   await page.locator('[data-card]:visible').getByRole('link',{name:'Travailler ce sujet'}).click();
   assert(await page.locator('#sujet-1').isVisible());

   for(const niveau of ['premiere','terminale']){
    await page.goto(base+'hlp.html');
    await page.locator('main a[href="hlp-ecrire.html?niveau='+niveau+'&exercice=interpretation#banque"]').click();
    assert.equal(await page.getByLabel('Votre classe',{exact:true}).inputValue(),niveau);
    assert.equal(await page.getByLabel('Votre exercice',{exact:true}).inputValue(),'interpretation');
    assert.equal(await page.locator('[data-card]:visible').count(),niveau==='premiere'?2:10);
    assert.equal(await page.locator('[data-card]:visible [data-exercice="reflexion"]:visible').count(),0);
    await page.getByLabel('Votre discipline',{exact:true}).selectOption('philosophie');
    const link=page.locator('[data-card]:visible [data-exercice]:visible').first();
    assert.equal(await link.getAttribute('data-discipline'),'philosophie');
    await link.click();assert(await page.locator('#interpretation').isVisible());
    assert(await page.locator('#interpretation').getByRole('link',{name:/Lire le texte et le sujet officiel/}).isVisible());
    await page.locator('#interpretation [data-choice]').first().click();
    assert.match(await page.locator('#interpretation [data-choice-feedback]').innerText(),/Solide|Défendable|À revoir/);
    await page.goto(base+'hlp-'+niveau+'.html');
    const task=page.locator('#entrainements a[href*="exercice=reflexion"]');
    await task.click();
    assert.equal(await page.getByLabel('Votre exercice',{exact:true}).inputValue(),'reflexion');
    await page.locator('[data-card]:visible [data-exercice]:visible').first().click();
    const hash=new URL(page.url()).hash;
    assert(await page.locator(hash).isVisible());
   }
   // Native controls and disclosures work with the keyboard; focus is visibly marked.
   await page.goto(base+'philosophie-explication.html');
   await page.locator('#methode>summary').focus();await page.keyboard.press('Enter');
   assert(await page.locator('#methode').evaluate(el=>el.open));
   assert.equal(await page.locator('#methode>summary').evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
   for(const file of pages){
    await page.goto(base+file);await page.addStyleTag({content:'html{font-size:200%!important}'});
    assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,file+' déborde à 200 %');
   }
   assert.deepEqual(errors,[]);
   console.log(width+' px : 7 entrées, liens et ancres, Nietzsche, 26 dissertations, recherche et filtres, HLP par classe/exercice/discipline, clavier et texte à 200 % : OK.');
   await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),p=await nojs.newPage();
  for(const [file,total] of [['philosophie-dissertations.html',26],['hlp-ecrire.html',12]]){
   await p.goto(base+file);assert.equal(await p.locator('[data-card]:visible').count(),total);assert(await p.locator('form').isHidden());
  }
  await p.goto(base+'philosophie-explication.html');await p.locator('#methode>summary').click();assert(await p.locator('#methode').evaluate(el=>el.open));
  await nojs.close();console.log('Sans JavaScript : catalogues complets et méthode accessibles.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
