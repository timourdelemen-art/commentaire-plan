#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(process.argv[2] || '.');
const pageFile = path.join(root, 'philosophie-creation-copie-ia.html');
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png'
};
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const requested = pathname.endsWith('.html')
    ? path.resolve(root, `.${pathname}`)
    : path.resolve(path.dirname(pageFile), `.${pathname}`);
  if (requested !== pageFile && !requested.startsWith(`${root}${path.sep}`)) {
    res.writeHead(403).end();
    return;
  }
  fs.readFile(requested, (error, content) => {
    if (error) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(requested)] || 'application/octet-stream'
    });
    res.end(content);
  });
});

async function runCase(page, mode) {
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.evaluate((caseMode) => {
    const nativeSetTimeout = window.setTimeout.bind(window);
    window.setTimeout = (callback, delay, ...args) =>
      nativeSetTimeout(callback, delay === 195000 ? 25 : delay, ...args);
    window.__requestAborted = false;
    window.fetch = async (_url, options) => {
      if (caseMode === 'pending-fetch') {
        options.signal.addEventListener('abort', () => {
          window.__requestAborted = true;
        }, { once: true });
        return new Promise(() => {});
      }
      if (caseMode === 'pending-json') {
        options.signal.addEventListener('abort', () => {
          window.__requestAborted = true;
        }, { once: true });
        return { json: () => new Promise(() => {}) };
      }
      if (caseMode === 'http-error') {
        return {
          json: async () => ({
            ok: false,
            error: 'Le moteur IA a refusé la génération.',
            diagnostic: { status: 429, code: 'rate_limit_exceeded' }
          })
        };
      }
      return {
        json: async () => ({
          ok: true,
          copie: 'Copie simulée : réponse visible.'
        })
      };
    };
  }, mode);

  await page.fill('#sujet', 'Peut-on être libre sans être responsable ?');
  await page.locator('#generer').click();
  const status = page.locator('#generation-status');
  if (mode === 'pending-fetch' || mode === 'pending-json') {
    if (!(await page.locator('#generer').isDisabled()) ||
        !(await status.innerText()).includes('Génération en cours')) {
      throw new Error(`L’état d’attente n’est pas visible pour le scénario ${mode}.`);
    }
  }
  if (mode === 'success') {
    await status.getByText('Copie générée.').waitFor();
    if (!(await page.locator('#resultat').innerText()).includes('Copie simulée : réponse visible.')) {
      throw new Error('La réponse simulée de réussite ne s’affiche pas.');
    }
  } else if (mode === 'http-error') {
    await status.getByText('rate_limit_exceeded').waitFor();
  } else {
    await status.getByText('Aucune réponse exploitable', { exact: false }).waitFor();
    if (!(await status.innerText()).includes('browser_timeout')) {
      throw new Error(`Le diagnostic navigateur manque après le scénario ${mode}.`);
    }
    if (!(await page.evaluate(() => window.__requestAborted))) {
      throw new Error(`La requête du scénario ${mode} n’a pas été interrompue.`);
    }
  }
  if (await page.locator('#generer').isDisabled()) {
    throw new Error(`Le bouton reste désactivé après le scénario ${mode}.`);
  }
}

(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ headless: true });
  try {
    const url = `http://127.0.0.1:${server.address().port}/philosophie-creation-copie-ia.html`;
    for (const width of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      for (const mode of ['success', 'http-error', 'pending-fetch', 'pending-json']) {
        await runCase(page, mode);
        console.log(`OK ${width}px ${mode}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
