#!/usr/bin/env node
/* Deux nouvelles lectures : texte, écrit, commentaire annoté et présentation aux deux largeurs. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const pages=['bac-commentaire-proust-combray.html','bac-commentaire-ajar-vie-devant-soi.html'];
const sourceHash='73e10a98f13937246fd24b32db1a43d4c4aa8a2b2395d9ba9478d9bf9be02fac';
async function check(root){
 root=path.resolve(root);
 const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  const type={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp'};
  fs.readFile(file,(err,data)=>err?res.writeHead(404).end():res.writeHead(200,{'Content-Type':type[path.extname(file)]||'application/octet-stream'}).end(data));
 });
 let browser;
 const captures=path.join(root,'browser-audit');
 fs.mkdirSync(captures,{recursive:true});
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 try{
  browser=await chromium.launch({headless:true});
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
   for(const file of pages){
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto('http://127.0.0.1:'+server.address().port+'/'+file);
    assert(response.ok(),file);
    await page.locator('.onglets-actifs').waitFor();
    assert.equal(await page.locator('.onglets-barre [role=tab]').count(),3);
    assert(await page.locator('#texte').isVisible());
    if(file.includes('proust')){
     const original=(await page.locator('#texte .literary-text p').textContent()).trim();
     const sha=require('node:crypto').createHash('sha256').update(original,'utf8').digest('hex');
     assert.equal(sha,sourceHash,'Texte Proust doit rester identique à la transcription vérifiée');
     assert(original.startsWith('Je ne quittais pas ma mère des yeux'));
     assert(original.endsWith('donné licence de me suivre.'));
    }else{
     assert((await page.locator('#texte').innerText()).includes("droit d’auteur"));
     assert.equal(await page.locator('#texte .literary-text').count(),0,'Pas de reproduction intégrale d’Ajar');
    }
    await page.getByRole('tab',{name:'S’entraîner'}).click();
    assert(await page.locator('#entrainement').isVisible());
    assert(await page.locator('#entrainement ol li').count()===3);
    await page.getByRole('tab',{name:'Le commentaire modèle'}).click();
    assert(await page.locator('#copie').isVisible());
    const model=page.locator('#copie article.model-commentary');
    assert.equal(await model.locator(':scope > p').count(),13,file+' : introduction, neuf analyses, deux transitions, conclusion');
    assert.equal(await model.locator(':scope > p [data-f]').count(),36);
    await model.locator('.cm-mode[data-mode="f"]').waitFor();
    const annotated=model.locator('.cm-mode[data-mode="f"]'),full=model.locator('.cm-mode[data-mode="e"]');
    await annotated.click();
    assert.equal(await annotated.getAttribute('aria-pressed'),'true');
    assert.equal(await model.locator('.c20-f:visible').count(),36);
    await full.click();
    assert.equal(await full.getAttribute('aria-pressed'),'true');
    assert.equal(await model.locator('.c20-f:visible').count(),0);
    assert(await model.locator(':scope > p').first().isVisible());
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert(overflow<=1,file+' overflow='+overflow);
    assert.deepEqual(errors,[],file+' JS');
    await page.screenshot({path:path.join(captures,file.replace('.html','')+'-'+width+'.png'),fullPage:true});
    console.log(file+' '+width+'px : texte, écrit, 13 paragraphes, 36 fonctions, deux modes, largeur : OK');
    await page.close();
   }
   await context.close();
  }
 }finally{if(browser)await browser.close();await new Promise(ok=>server.close(ok));}
}
module.exports=check;
if(require.main===module)check(process.argv[2]||'.').catch(e=>{console.error(e);process.exitCode=1;});
