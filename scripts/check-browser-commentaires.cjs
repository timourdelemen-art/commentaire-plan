#!/usr/bin/env node
/* Les fonctions et le repérage doivent montrer la même copie, aux deux largeurs. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const normalize=s=>s.replace(/\s+/gu,' ').trim();
async function check(root){
  root=path.resolve(root);
  const pages=fs.readdirSync(root).filter(n=>n.endsWith('.html')&&fs.readFileSync(path.join(root,n),'utf8').includes('class="model-commentary" data-c20'));
  assert.equal(pages.length,10);
  const server=http.createServer((req,res)=>{
    const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
    const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'};
    fs.readFile(file,(e,b)=>e?res.writeHead(404).end():res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(b));
  });
  let browser;
  const report=[],captures=path.join(root,'browser-audit');fs.mkdirSync(captures,{recursive:true});
  try{
    await new Promise(r=>server.listen(0,'127.0.0.1',r));
    browser=await chromium.launch({headless:true});
    for(const width of [390,1280]){
      const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
      for(const name of pages){
        const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
        assert((await page.goto(`http://127.0.0.1:${server.address().port}/${name}#phrase-par-phrase`)).ok());
        const art=page.locator('article[data-c20]'),source=art.locator(':scope > p [data-f]');
        const expected=(await source.allTextContents()).map(normalize),functions=await source.evaluateAll(xs=>xs.map(x=>x.getAttribute('data-f')));
        assert(expected.length>0);
        assert.deepEqual((await art.locator('.c20-t').allTextContents()).map(normalize),expected,'Même texte dans la vue annotée');
        assert.deepEqual((await art.locator('.c20-f').allTextContents()).map(normalize),functions.map(normalize),'Chaque phrase a sa fonction');
        assert.equal(await art.locator('.c20-f:visible').count(),expected.length);
        const ending=art.locator(':scope > p[data-h="CONCLUSION"]');
        assert.equal(await ending.locator('[data-f^="Ouverture :"]').count(),2);
        const reference=page.locator('#source-ouverture');
        assert.equal(await reference.count(),1);
        assert(!(await reference.locator('p').first().isVisible()),'La source reste repliée au départ');
        await reference.locator('summary').click();
        assert(await reference.getByRole('link',{name:'Lire le texte de référence',exact:true}).isVisible());
        assert((await reference.getByRole('link',{name:'Lire le texte de référence',exact:true}).getAttribute('href')).startsWith('https://'));
        if(name==='bac-commentaire-baudelaire-joujou-du-pauvre.html'){
          await art.locator('.c20-s').last().scrollIntoViewIfNeeded();await page.screenshot({path:path.join(captures,`commentaire-ouverture-${width}.png`)});
        }
        await reference.locator('summary').click();
        assert(!functions.some(f=>/établissement|reprise du mot clé|l’acquis/i.test(f)));
        const toggle=art.locator('.c20c-toggle');await toggle.focus();await page.keyboard.press('Enter');
        assert.equal(await toggle.getAttribute('aria-expanded'),'false');
        assert.equal(await art.locator('.c20-f:visible').count(),0);
        assert(await art.locator(':scope > p').first().isVisible());
        await toggle.click();assert.equal(await art.locator('.c20-f:visible').count(),expected.length);
        await art.locator('.c20c-guide summary').click();assert(await art.locator('.c20c-guide p').first().isVisible());
        assert((await art.locator('.c20c-guide').innerText()).includes('L’effet ici'));
        await art.locator('.c20c-guide summary').click();
        for(const a of await art.locator('.c20-t a.rep-manuel').all()){
          const href=await a.getAttribute('href'),[file,anchor]=href.split('#');
          assert(fs.readFileSync(path.join(root,file),'utf8').includes(`id="${anchor}"`),href);
        }
        const rep=page.locator('[data-reperer="phrase-par-phrase"]');
        await rep.locator('.rep-toggle').click();
        const original=(await art.locator(':scope > p').allTextContents()).map(normalize);
        assert.deepEqual((await rep.locator('.rep-p > p').allTextContents()).map(normalize),original,'Même texte dans le repérage');
        await rep.locator('.rep-chip[data-k="eff"]').click();
        assert.equal(await rep.locator('.rep-chip[data-k="eff"]').getAttribute('aria-pressed'),'true');
        await rep.locator('.rep-tout').click();
        assert.equal(await rep.locator('.rep-chip[aria-pressed="true"]').count(),7);
        for(const q of await art.locator(':scope > p.transition-question').allTextContents()){
          assert(/\?$/.test(q.trim()));assert(!q.includes(' : '),'Question directe sans bilan préalable');
        }
        assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,'Débordement horizontal');
        assert.deepEqual(errors,[]);
        if(name==='bac-commentaire-baudelaire-joujou-du-pauvre.html'){
          await art.locator('.c20c-bar').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(captures,`commentaire-fonctions-${width}.png`)});
          await art.locator('.c20c-guide summary').click();
          await art.getByRole('link',{name:'Conclure : réponse, portée et ouverture'}).click();
          assert(page.url().endsWith('/commentaire-bac-conclusion.html'));
          assert.equal(await page.locator('main dl dt').count(),3);
          assert((await page.locator('main').innerText()).includes('l’ouverture n’est pas un attendu'));
          assert(await page.getByRole('link',{name:'FAQ des EAF 2025 de l’académie d’Aix-Marseille, page 7'}).isVisible());
          assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1);
          await page.locator('main h1').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(captures,`commentaire-conclusion-${width}.png`)});
        }
        report.push({page:name,width,phrases:expected.length,ok:true});await page.close();
      }
      await context.close();
    }
    const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),page=await context.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/${pages[0]}`);
    assert(await page.locator('article[data-c20] > p').first().isVisible(),'La copie reste lisible sans JavaScript');
    await context.close();
    fs.writeFileSync(path.join(captures,'commentaires-fonctions-report.json'),JSON.stringify(report,null,2));
    console.log(`Commentaires : ${pages.length} copies, ${report.filter(r=>r.width===390).reduce((n,r)=>n+r.phrases,0)} fonctions, ouvertures sourcées, lecture continue, repérage et manuel à 390/1280 px : OK.`);
  } finally {if(browser)await browser.close();await new Promise(r=>server.close(r));}
}
module.exports=check;
if(require.main===module)check(process.argv[2]||'.').catch(e=>{console.error(e);process.exitCode=1;});
