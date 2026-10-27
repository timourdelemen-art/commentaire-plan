'use strict';
// Régressions de contenu et parcours de rédaction ; les retours distants sont simulés.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.'),norm=t=>t.replace(/\s+/gu,' ').trim();
const subjects=JSON.parse(fs.readFileSync(path.join(__dirname,'brevet-sujets/sujets.json'),'utf8')).filter(s=>s.type==='reflexion');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'};
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
 if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(file,(e,b)=>e?res.writeHead(404).end():res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(b));
});
async function linksExist(page,name){
 for(const href of await page.locator('main a[href]').evaluateAll(es=>es.map(e=>e.getAttribute('href')))){
  const url=new URL(href,'http://local/'+name);if(url.origin!=='http://local')continue;
  const file=path.join(root,decodeURIComponent(url.pathname));assert(fs.existsSync(file),'Lien absent : '+href);
  if(url.hash){const id=decodeURIComponent(url.hash.slice(1));assert(fs.readFileSync(file,'utf8').includes('id="'+id+'"'),'Ancre absente : '+href);}
 }
}
async function modes(page,selector,kind){
 const texts={};
 for(const model of await page.locator(selector).all()){
  const id=await model.getAttribute('id'),sentences=model.locator(kind==='mr'?'.mr-text':'.c20-t');
  const expected=norm((await sentences.allTextContents()).join(' '));texts[id]=expected;
  const plain=page.locator('[id="'+id+'-entiere"]');assert(await plain.isVisible(),'Copie entière par défaut');
  await plain.scrollIntoViewIfNeeded();
  assert.equal(norm((await plain.locator('p').allTextContents()).join(' ')),expected,'Texte identique entre les modes');
  assert.equal(await plain.locator('p').count(),7,'Sept paragraphes dans ces modèles de brevet');
  const blocks=model.locator(kind==='mr'?'.mr-paragraphe':'.c20-block');
  for(const i of [2,4]){
   const text=norm((await blocks.nth(i).locator(kind==='mr'?'.mr-text':'.c20-t').allTextContents()).join(' '));
   assert(text.endsWith('?'),'Transition sous forme de question');
   assert(/^(Mais |Cependant, |Et |Alors, )?(Comment|Pourquoi|Que |Qu’|Quels|Quelles?|À quelle|Sous quelles|Dans quelles|D’où)/ui.test(text),'Question ouverte : '+text);
  }
  const functions=page.locator('.cm-mode[data-mode="f"][aria-controls="'+id+'"]');
  await functions.focus();await functions.press('Enter');
  assert(await model.locator(kind==='mr'?'.mr-note':'.c20-f').first().isVisible(),'Fonctions visibles au clavier');
  assert.equal(norm((await sentences.allTextContents()).join(' ')),expected);
  await page.locator('.cm-mode[data-mode="e"][aria-controls="'+id+'"]').click();assert(await plain.isVisible());
 }
 return texts;
}
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({headless:true});const report=[];
 try{
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));let requests=0;
   await page.route('**/api/analyze',route=>{requests++;const sent=route.request().postDataJSON();assert.equal(sent.context.kind,'brevet-redaction');return route.fulfill({json:{ok:true,feedback:{diagnostic:'partiel',point_acquis:'Une réponse au sujet.',manque_principal:'Développer un exemple.',question_suivante:'Quel détail pouvez-vous expliquer ?'}}});});
   await page.goto(base+'brevet-redaction.html');
   const cards=page.locator('.brevet-writing-doors > article');assert.equal(await cards.count(),2);
   for(const card of await cards.all()){
    for(const hash of ['entrainement','methode']){
     const link=card.locator('a[href$="#'+hash+'"]'),href=await link.getAttribute('href');
     const dest=await context.newPage();await dest.goto(base+href);assert(await dest.locator('#'+hash).isVisible(),'Destination ouverte : '+href);await dest.close();
    }
   }
   await linksExist(page,'brevet-redaction.html');assert(!(await page.locator('.brevet-writing-details').evaluate(e=>e.open)));
   await page.locator('a[href="#redaction-entiere"]').click();assert(await page.locator('#brevet-writing').isVisible());
   assert.equal(await page.locator('.timer-display').innerText(),'1:30:00');await page.locator('.timer-start').click();assert.equal(await page.locator('.timer-start').innerText(),'Pause');await page.locator('.timer-reset').click();
   await page.locator('#finish-brevet-writing').click();assert.equal(requests,0,'Pas de demande pour un texte vide');
   const draft='Un comportement héroïque peut être accessible à chacun. Dans Les Misérables, Jean Valjean sauve Fauchelevent au risque de révéler son identité. Ce détail montre que le courage consiste aussi à accepter un risque pour aider autrui.';
   await page.fill('#brevet-writing',draft);assert.match(await page.locator('#word-count').innerText(),/[1-9]/);
   await page.locator('#finish-brevet-writing').click();await page.getByText('Une réponse au sujet.',{exact:false}).waitFor();assert.equal(requests,1);assert.equal(await page.locator('#brevet-writing').inputValue(),draft);
   await page.goto(base+'brevet-redaction.html#redaction-entiere');assert(await page.locator('#brevet-writing').isVisible(),'Lien direct vers le sujet');
   await page.goto(base+'brevet.html');assert(await page.locator('#exercices').isVisible());assert(!(await page.locator('#brevet-sujets').isVisible()));
   await page.getByRole('tab',{name:/Choisir un sujet complet/}).click();assert(await page.locator('#brevet-sujets').isVisible());
   await page.goto(base+'brevet.html#brevet-sujets');assert(await page.locator('#brevet-sujets').isVisible(),'Ancien lien des annales conservé');
   await page.goto(base+'brevet-reflexion-copies-20.html');
   assert.equal(await page.locator('.bc20-sommaire nav li a').count(),11,'Sommaire complet');
   const texts=await modes(page,'.bc20-texte','c20');assert.equal(Object.keys(texts).length,11);
   const first=texts['copie-autre-epoque-texte'];assert.match(first,/L’Homme foudroyé, récit autobiographique/);assert.match(first,/Blaise Cendrars/);assert.match(first,/Les Sentiers de la gloire, Stanley Kubrick/);assert(!first.includes('qu’apporte un roman'));
   for(const subject of subjects){
    await page.goto(base+'brevet-sujet-'+subject.id+'.html#copie');const copy=page.locator('.bc20-texte');
    const id=(await copy.getAttribute('id')).replace(/-sujet$/,'');assert.equal(norm((await copy.locator('.c20-t').allTextContents()).join(' ')),texts[id],'Même copie dans le sujet et la banque : '+subject.id);
   }
   await page.goto(base+'brevet-reflexion-modele.html');assert.equal(Object.keys(await modes(page,'.mr-texte','mr')).length,2);await linksExist(page,'brevet-reflexion-modele.html');
   await page.goto(base+'brevet-imagination-copies-20.html');assert.equal(await page.locator('.bc20-sommaire nav li a').count(),9);
   for(const name of ['brevet-redaction.html','brevet.html','philosophie.html','brevet-reflexion-copies-20.html']){
    await page.goto(base+name);assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=1,'Débordement : '+name);
    await linksExist(page,name);
    if(process.env.AXE_PATH){await page.addScriptTag({path:process.env.AXE_PATH});const a11y=await page.evaluate(()=>axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));assert.deepEqual(a11y.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[],'Accessibilité : '+name);}
    fs.mkdirSync(path.join(root,'browser-audit'),{recursive:true});await page.screenshot({path:path.join(root,'browser-audit',name.replace('.html','-redaction-'+width+'.png')),fullPage:true});
   }
   assert.deepEqual(errors,[]);report.push({width,models:13,transitions:26,subjects:11,ok:true});await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),page=await nojs.newPage();
  await page.goto(base+'brevet-redaction.html');await page.locator('.brevet-writing-details > summary').click();assert(await page.locator('#brevet-writing').isVisible());
  await page.goto(base+'brevet-reflexion-copies-20.html');assert(await page.locator('.c20-t').first().isVisible());await page.locator('.bc20-sommaire > summary').click();assert(await page.locator('.bc20-sommaire nav a').last().isVisible());await nojs.close();
  fs.writeFileSync(path.join(root,'browser-audit/brevet-redaction-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
