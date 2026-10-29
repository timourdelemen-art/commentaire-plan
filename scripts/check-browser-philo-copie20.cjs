/* Vérification ciblée de la copie de philosophie V7.4 en 390/1280 px. */
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root = path.resolve(process.argv[2] || '.');
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2' };
const server = http.createServer((req,res) => {
  let relative;
  try { relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html'; }
  catch (e) { res.writeHead(400).end(); return; }
  const target = path.resolve(root, relative);
  if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(target, (err, bytes) => {
    if (err) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type':mime[path.extname(target)] || 'application/octet-stream' }).end(bytes);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const browser = await chromium.launch({ headless:true });
  try {
    for (const width of [390,1280]) {
      const page = await browser.newPage({ viewport:{ width, height:850 } });
      const errors = [];
      page.on('pageerror',e => errors.push(e.message));
      const url = 'http://127.0.0.1:' + server.address().port + '/philosophie-copie-20-2025-me-verite.html';
      const response = await page.goto(url,{waitUntil:'load'});
      assert.equal(response.status(),200,'page générée trouvée');
      assert.match(await page.locator('h1').innerText(),/vérité est-elle toujours convaincante/i,'titre exact');
      assert.equal(await page.locator('.c20-block').count(),5,'introduction, trois parties, conclusion');
      assert.equal(await page.locator('.c20-bridge').count(),2,'deux transitions visibles');
      assert.ok(await page.locator('.c20-s').count()>=40,'annotations détaillées');
      assert.ok(await page.getByText('EXERCICE · LA PORTÉE DE « TOUJOURS »').count()>=1,'exercice présent');
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
      assert.ok(overflow<=2,'pas de débordement horizontal en '+width+' px : '+overflow+' px');
      const toggle=page.locator('button.c20-toggle').first();
      assert.ok(await toggle.count()>0,'contrôle des fonctions');
      await toggle.click();
      assert.ok(await page.locator('#c20-vitrine.c20-plain').count()>0,'masquage des fonctions');
      await toggle.click();
      assert.equal(await page.locator('#c20-vitrine.c20-plain').count(),0,'réaffichage des fonctions');
      assert.deepEqual(errors,[],'aucune erreur JavaScript');
      const screenshots=path.join(root,'browser-audit');
      fs.mkdirSync(screenshots,{recursive:true});
      await page.screenshot({path:path.join(screenshots,'philo-verite-'+width+'.png'),fullPage:true});
      await page.close();
      console.log('OK copie à 20, '+width+' px, exercice et fonctions.');
    }
  } finally { await browser.close(); }
})().catch(e => {console.error(e);process.exitCode=1;}).finally(() => server.close());
