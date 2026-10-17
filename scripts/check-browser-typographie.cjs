#!/usr/bin/env node
// Audit comparatif de la présentation : mêmes textes, avant/après le bloc CSS.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const marker='/* === Audit typographie et respiration des pages';
const candidates=['index.html','bac.html','bac-commentaire.html','bac-dissertation.html','bac-dissertation-methode.html','bac-dissertation-sujets.html','bac-dissertation-copie-20-balzac.html','bac-dissertation-copie-20-le-menteur.html','bac-dissertation-copie-20-manon-lescaut.html','commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-introduction.html','bac-commentaire-baudelaire-joujou-du-pauvre.html','bac-mode-examen.html','commentaire-pas-a-pas.html','manuel-procedes.html','laboratoire-effet-ici.html','philosophie.html','philosophie-probleme-pas-a-pas.html','philosophie-plan-pas-a-pas.html','philosophie-banque.html','philosophie-exemples.html','philosophie-explication.html','bibliotheque.html','bibliotheque-litterature.html','annales.html','brevet.html','brevet-comprehension.html','brevet-imagination-copies-20.html','brevet-reflexion-copies-20.html','brevet-redaction.html','hlp.html','hlp-annales.html','hlp-ecrire.html','enseignants.html','contact.html'];
const capturePages=new Set(['index.html','bac-dissertation-methode.html','bac-commentaire-baudelaire-joujou-du-pauvre.html','philosophie.html','bibliotheque-litterature.html','brevet-redaction.html','hlp-annales.html','manuel-procedes.html']);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
async function check(root){
 root=path.resolve(root);const out=path.join(root,'browser-audit');fs.mkdirSync(out,{recursive:true});
 const pages=candidates.filter(n=>fs.existsSync(path.join(root,n)));
 const generated=fs.readdirSync(root).filter(n=>/^(hlp-2026-|philosophie-notion-|philosophie-copie-20-|bac-2026-amerique).*\.html$/.test(n));
 for(const prefix of ['hlp-2026-','philosophie-notion-','philosophie-copie-20-','bac-2026-amerique']){const n=generated.find(n=>n.startsWith(prefix));if(n&&!pages.includes(n))pages.push(n);}
 const css=fs.readFileSync(path.join(root,'styles.css'),'utf8'),baseline=css.slice(0,css.indexOf(marker));assert(baseline.length>0);
 const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(file,(e,b)=>e?res.writeHead(404).end():res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(b));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const results=[];
 try{
  browser=await chromium.launch({headless:true});
  for(const width of [390,768,1280]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
   for(const name of pages){
    console.log('TYPO',width,name);const versions={};
    for(const mode of ['avant','apres']){
     const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
     if(mode==='avant')await page.route('**/styles.css',route=>route.fulfill({status:200,contentType:'text/css',body:baseline}));
     const response=await page.goto('http://127.0.0.1:'+server.address().port+'/'+name,{waitUntil:'load'});assert(response.ok(),name);const sourceMain=(await response.text()).match(/<main\b[\s\S]*?<\/main>/i)?.[0];assert(sourceMain,name+' : contenu principal absent');
     // Activer les blocs différés avant de mesurer leur contenu.
     const regions=page.locator('main>section:visible');
     for(let i=0;i<Math.min(await regions.count(),8);i++)await regions.nth(i).scrollIntoViewIfNeeded();
     versions[mode]=await page.evaluate(()=>{
      const visible=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&!e.closest('[hidden],details:not([open]) :not(summary)');};
      const metric=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {text:e.textContent.trim().slice(0,95),size:parseFloat(s.fontSize),leading:parseFloat(s.lineHeight)/parseFloat(s.fontSize),width:Math.round(r.width)};};
      const headings=[...document.querySelectorAll('main h1,main h2,main h3')].filter(visible).map(metric);
      const prose=[...document.querySelectorAll('.prose p,.seo-body>p,.module-card>p,.workbench>p,.exercise>p')].filter(visible).map(metric);
      const clipped=[...document.querySelectorAll('main h1,main h2,main h3,main .btn')].filter(visible).filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.trim().slice(0,95));
      return {overflow:document.documentElement.scrollWidth-innerWidth,headings,prose,clipped,text:document.querySelector('main').textContent.replace(/\s+/g,' ').trim()};
     });
     if(mode==='apres'&&name==='philosophie.html'){
      const cards=page.locator('.philo-choices>a');assert.equal(await cards.count(),2);
      assert.deepEqual(await cards.locator('h3').allTextContents(),['Dissertation','Explication de texte']);
      await cards.first().click();assert(page.url().endsWith('#dissertation'));
      assert(await page.locator('#dissertation').isVisible());
      assert.equal(await page.locator('main [data-parcours]').count(),5);
      assert.equal(await page.locator('.philo-resources a[href="philosophie-notions.html"]').count(),1);
     }
     if(mode==='apres'&&name==='index.html'&&width===1280){
      const portal=page.locator('.portal[href="/philosophie.html"]');await portal.focus();await portal.press('ArrowDown');
      assert.deepEqual(await page.locator('.portal-wrap.open .portal-dropdown [role="menuitem"] strong').allTextContents(),['Dissertation','Explication de texte']);
      await page.keyboard.press('Escape');
     }
     // Les QCM mélangent leurs choix au chargement : comparer la source du contenu, identique dans les deux rendus.
     versions[mode].text=sourceMain;
     assert.deepEqual(errors,[],name+' '+width+' '+mode);
     if(capturePages.has(name)&&width!==768){
      await page.locator('main').evaluate(e=>e.scrollIntoView({block:'start'}));
      await page.screenshot({path:path.join(out,'typo-'+mode+'-'+name+'-'+width+'.png')});
      const interior=page.locator(':is(.seo-body,.workbench,.hlp-grid,.model-commentary,.procedure-library,.method-section):visible').first();
      if(await interior.count()){await interior.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,'typo-interieur-'+mode+'-'+name+'-'+width+'.png')});}
     }
     await page.close();
    }
    assert.equal(versions.apres.text,versions.avant.text,'Le contenu pédagogique doit rester identique : '+name);
    assert(versions.apres.overflow<=Math.max(1,versions.avant.overflow),name+' : nouveau débordement');
    const addedClips=versions.apres.clipped.filter(t=>!versions.avant.clipped.includes(t));assert.deepEqual(addedClips,[],name+' : nouveaux titres tronqués');
    for(const v of Object.values(versions))delete v.text;
    results.push({name,width,...versions});
   }
   await context.close();
  }
  const staticContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:1280,height:900}}),staticPage=await staticContext.newPage();
  await staticPage.goto('http://127.0.0.1:'+server.address().port+'/philosophie.html');
  assert.equal(await staticPage.locator('.philo-choices>a').count(),2);
  assert.deepEqual(await staticPage.locator('.portal[href="/philosophie.html"]').locator('..').locator('[role="menuitem"] strong').allTextContents(),['Dissertation','Explication de texte']);
  await staticContext.close();
  fs.writeFileSync(path.join(out,'typographie-report.json'),JSON.stringify({pages:pages.length,widths:[390,768,1280],results},null,2));
  console.log('Audit typographique : '+pages.length+' pages × 3 largeurs, comparaison avant/après, textes conservés.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
}
module.exports=check;if(require.main===module)check(process.argv[2]||'.').catch(e=>{console.error(e);process.exitCode=1;});
