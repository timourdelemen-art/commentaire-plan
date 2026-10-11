#!/usr/bin/env node
/* Contrôle navigateur sur une copie jetable du site généré. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const root = path.resolve(process.argv[2] || '.');
const pages = ['philosophie-banque.html'];
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
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
  for(const width of [390,1280]){
    const context=await browser.newContext({viewport:{width,height:850}});
    for(const name of pages){
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      const response=await page.goto(base+name,{waitUntil:'domcontentloaded'});
      await page.waitForSelector('[data-open]');
      await page.selectOption('#author','Platon');
      if(await page.locator('[data-open]').count()!==5)throw Error('Filtre auteur');
      await page.locator('[data-open]').first().click();
      await page.locator('[data-choice="0"]').click();
      if(!(await page.locator('#choice-result').innerText()).includes('Solide'))throw Error('Correction');
      await page.fill('#bank-draft','Mon brouillon de contrôle');
      await page.locator('[data-level="2"]').click();
      if(await page.inputValue('#bank-draft'))throw Error('Niveaux non isolés');
      await page.locator('[data-level="1"]').click();
      if(await page.inputValue('#bank-draft')!=='Mon brouillon de contrôle')throw Error('Brouillon perdu');
      await page.reload();
      await page.waitForSelector('#bank-draft');
      if(await page.inputValue('#bank-draft')!=='Mon brouillon de contrôle')throw Error('Reprise perdue');
      await page.locator('#erase').click();
      if(await page.inputValue('#bank-draft'))throw Error('Effacement');
      await page.locator('[data-level="3"]').click();
      if(await page.locator('#bank-exercise details').count()!==1)throw Error('Aide trop visible en autonomie');
      await page.locator('#bank-reset').click();
      if(await page.locator('[data-open]').count()!==15)throw Error('Réinitialisation');
      const result=await page.evaluate(()=>({
        h1:!!document.querySelector('h1'),
        body:document.body.innerText.trim().length,
        overflow:document.documentElement.scrollWidth-innerWidth,
        invalidLinks:[...document.querySelectorAll('a[href]')].filter(a=>['null','undefined','#'].includes(a.getAttribute('href'))).length
      }));
      const bad=!response?.ok()||!result.h1||result.body<150||result.overflow>12||result.invalidLinks>0||errors.length>0;
      if(bad){failures++;console.error(JSON.stringify({name,width,status:response?.status(),...result,errors:errors.slice(0,3)}));}
      else console.log('OK',width,name);
      await page.close();
    }
    await context.close();
  }
  await browser.close();
  if(failures)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
