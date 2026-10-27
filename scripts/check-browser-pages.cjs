#!/usr/bin/env node
/* Contrôle navigateur sur une copie jetable du site généré. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const root = path.resolve(process.argv[2] || '.');
const pages = ['index.html', 'philosophie.html', 'hlp-annales.html', 'bac.html', 'brevet.html', 'hlp.html', 'philosophie-creation-copie-ia.html', 'clin-oeil.html'];
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.webp':'image/webp'};
const server = http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if (!file.startsWith(root+path.sep)) {res.writeHead(403).end();return;}
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404).end('Not found');return;}
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});
    res.end(data);
  });
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port+'/';
  const browser=await chromium.launch({headless:true});
  let failures=0;
  const captures=path.join(root,'browser-audit');fs.mkdirSync(captures,{recursive:true});
  for(const width of [320,390,1051,1280]){
    const context=await browser.newContext({viewport:{width,height:850}});
    for(const name of pages){
      const page=await context.newPage();
      const errors=[];
      let generationRequests=0,largeImageRequests=0;
      page.on('request',request=>{if(new URL(request.url()).pathname==='/assets/clin-oeil-heidegger.webp')largeImageRequests++;});
      page.on('request',request=>{if(new URL(request.url()).pathname==='/api/generate-dissertation')generationRequests++;});
      page.on('pageerror',e=>errors.push(e.message));
      const response=await page.goto(base+name,{waitUntil:'domcontentloaded'});
      const result=await page.evaluate(()=>({
        h1:!!document.querySelector('h1'),
        body:document.body.innerText.trim().length,
        overflow:document.documentElement.scrollWidth-innerWidth,
        invalidLinks:[...document.querySelectorAll('a[href]')].filter(a=>['null','undefined','#'].includes(a.getAttribute('href'))).length
      }));
      let winkInvalid=false;
      const wink=page.getByRole('link',{name:'Was heißt Denken ?'});
      if(await wink.count()!==1) winkInvalid=await page.locator('header.top').count()>0;
      else {
        const brand=page.locator('header.top .brand');
        const brandText=(await brand.innerText()).replace(/\s+/g,' ').trim();
        const mast=await page.locator('header.top .mast').evaluate(el=>{
          const brand=el.querySelector('.brand-signature').getBoundingClientRect();
          const nav=el.querySelector('.nav-portals');
          const menu=el.querySelector('.mobile-nav-toggle');
          const target=getComputedStyle(nav).display==='none'?menu:nav;
          return {right:brand.right,next:target.getBoundingClientRect().left};
        });
        winkInvalid=brandText!=='LA PHRASE JUSTE'||mast.right>mast.next;
        if(name==='index.html'){
          winkInvalid=winkInvalid||(await page.locator('.home-site-tagline').innerText())!=='Lire, penser, écrire — du brevet au bac.';
        }else if(await page.locator('.home-site-tagline').count())winkInvalid=true;
        const loaded=await wink.locator('img').evaluate(async img=>{await img.decode();return img.naturalWidth>0;});
        winkInvalid=winkInvalid||!loaded || (name!=='clin-oeil.html' && largeImageRequests!==0);
        if(name==='index.html'){
          await page.screenshot({path:path.join(captures,`icone-accueil-${width}.png`)});
          await wink.focus();await page.keyboard.press('Enter');await page.waitForURL('**/clin-oeil.html');
          winkInvalid=winkInvalid||!await page.locator('main img').evaluate(async img=>{await img.decode();return img.naturalWidth===1117;});
          winkInvalid=winkInvalid||(await page.locator('main h1').innerText())!=='Was heißt Denken ?'||(await page.locator('main figcaption,main .kicker,main .lede').count())!==0;
          await page.screenshot({path:path.join(captures,`icone-clin-oeil-${width}.png`)});
          await page.locator('.wink-back').click();await page.waitForURL('**/index.html');
        }
      }
      let pauseInvalid=false;
      if(name==='philosophie-creation-copie-ia.html'){
        pauseInvalid=await page.locator('.pause-main button, .pause-main textarea, .pause-main input').count()>0 ||
          !await page.locator('h1').innerText().then(text=>text.includes('en pause'));
        await page.getByRole('link',{name:'Consulter les ressources de philosophie'}).click();
        pauseInvalid=pauseInvalid||!page.url().endsWith('/philosophie.html')||generationRequests>0;
      }
      const bad=!response?.ok()||!result.h1||result.body<150||result.overflow>12||result.invalidLinks>0||errors.length>0||pauseInvalid||winkInvalid;
      if(bad){failures++;console.error(JSON.stringify({name,width,status:response?.status(),...result,winkInvalid,errors:errors.slice(0,3)}));}
      else console.log('OK',width,name);
      await page.close();
    }
    await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:850}});
  const staticPage=await nojs.newPage();await staticPage.goto(base+'index.html');
  await staticPage.getByRole('link',{name:'Was heißt Denken ?'}).click();
  if(!staticPage.url().endsWith('/clin-oeil.html')){failures++;console.error('Le lien vers Was heißt Denken ? sans JavaScript ne fonctionne pas');}
  await nojs.close();
  await browser.close();
  await require('./check-browser-typographie.cjs')(root);
  await require('./check-browser-commentaires.cjs')(root);
  await require('./check-browser-commentaire-parcours.cjs')(root);
  require('node:child_process').execFileSync('python3',[path.join(__dirname,'test-commentaires-programme.py')],{stdio:'inherit'});
  require('node:child_process').execFileSync(process.execPath,[path.join(__dirname,'check-browser-commentaires-programme.cjs'),root],{stdio:'inherit'});
  if(failures)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
