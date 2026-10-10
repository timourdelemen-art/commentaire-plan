#!/usr/bin/env node
/* Contrôle navigateur sur une copie jetable du site généré. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const root = path.resolve(process.argv[2] || '.');
const pages = ['index.html', 'philosophie.html', 'hlp-annales.html', 'bac.html', 'brevet.html', 'hlp.html'];
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
