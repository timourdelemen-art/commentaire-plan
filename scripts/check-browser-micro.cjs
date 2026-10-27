#!/usr/bin/env node
/* Vérifie une vraie piste audio avec le micro factice de Chromium.
   Le témoin fermé doit échouer malgré l’autorisation du contexte ; le site doit réussir.
   Ce contrôle ne prétend pas tester le service distant de transcription vocale. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'.');const toml=fs.readFileSync(path.join(root,'netlify.toml'),'utf8');const policy=toml.match(/Permissions-Policy\s*=\s*"([^"]+)"/)?.[1];
assert.equal(policy,'camera=(), microphone=(self), geolocation=()');
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');res.setHeader('Permissions-Policy',url.pathname==='/micro-interdit'?'camera=(), microphone=(), geolocation=()':policy);
 if(url.pathname==='/micro-interdit')return res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}).end('<!doctype html><html lang="fr"><title>Témoin micro</title><h1>Micro interdit</h1></html>');
 const f=path.resolve(root,'.'+url.pathname);if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(e,b)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'application/javascript':'text/html; charset=utf-8');res.end(b);});
});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/';const browser=await chromium.launch({args:['--use-fake-device-for-media-stream']});
 try{for(const width of [390,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},permissions:['microphone']}),page=await ctx.newPage();
  async function capture(){return page.evaluate(async()=>{const p=document.permissionsPolicy||document.featurePolicy;try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});const track=stream.getAudioTracks()[0],live=track.readyState;stream.getTracks().forEach(t=>t.stop());return {allowed:p.allowsFeature('microphone'),live,ended:track.readyState,camera:p.allowsFeature('camera'),geo:p.allowsFeature('geolocation')};}catch(e){return {allowed:p.allowsFeature('microphone'),error:e.name};}});}
  await page.goto(base+'micro-interdit');assert.deepEqual(await capture(),{allowed:false,error:'NotAllowedError'});
  for(const file of ['bac-oral.html','brevet-comprehension.html']){const response=await page.goto(base+file);assert.equal(response.headers()['permissions-policy'],policy);assert.deepEqual(await capture(),{allowed:true,live:'live',ended:'ended',camera:false,geo:false});}
  console.log('Micro '+width+' px : blocage reproduit, vraie piste audio autorisée sur oral et exercice, caméra et localisation interdites : OK.');await ctx.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
