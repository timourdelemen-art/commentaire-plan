#!/usr/bin/env node
const fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const SKIP=new Set(['.git','node_modules','.netlify']);
const LIMITS={html:350*1024,jsPerPage:350*1024,cssPerPage:300*1024,scripts:12};
function walk(d){let o=[];for(const e of fs.readdirSync(d,{withFileTypes:true})){if(SKIP.has(e.name))continue;const f=path.join(d,e.name);if(e.isDirectory())o=o.concat(walk(f));else if(e.isFile()&&e.name.endsWith('.html'))o.push(f);}return o;}
function local(ref,r){if(/^(https?:|data:|\/\/)/i.test(ref))return null;const clean=ref.split('?')[0].split('#')[0];return clean.startsWith('/')?clean.slice(1):path.posix.normalize(path.posix.join(path.posix.dirname(r),clean));}
const errors=[], rows=[];
for(const f of walk(ROOT)){const r=path.relative(ROOT,f).split(path.sep).join('/'),h=fs.readFileSync(f,'utf8');const html=Buffer.byteLength(h);const scripts=[...h.matchAll(/<script\b[^>]*src=["']([^"']+)["']/gi)].map(m=>m[1]);const styles=[...h.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].map(m=>m[1]);let js=0,css=0;
 for(const x of scripts){const p=local(x,r);if(p){const abs=path.join(ROOT,p);if(fs.existsSync(abs))js+=fs.statSync(abs).size;}}
 for(const x of styles){const p=local(x,r);if(p){const abs=path.join(ROOT,p);if(fs.existsSync(abs))css+=fs.statSync(abs).size;}}
 rows.push({page:r,html,js,css,scripts:scripts.length});
 if(html>LIMITS.html)errors.push(`${r}: HTML ${Math.round(html/1024)} KB > ${LIMITS.html/1024} KB`);
 if(js>LIMITS.jsPerPage)errors.push(`${r}: JS local chargé ${Math.round(js/1024)} KB > ${LIMITS.jsPerPage/1024} KB`);
 if(css>LIMITS.cssPerPage)errors.push(`${r}: CSS local chargé ${Math.round(css/1024)} KB > ${LIMITS.cssPerPage/1024} KB`);
 if(scripts.length>LIMITS.scripts)errors.push(`${r}: ${scripts.length} scripts > ${LIMITS.scripts}`);
}
rows.sort((a,b)=>(b.html+b.js+b.css)-(a.html+a.js+a.css));
let md='# Budget performance\n\n';
md+='Objectif : empêcher qu’une offensive SEO alourdisse le site. Aucun outil analytique SEO n’est livré au navigateur.\n\n';
md+='| Page | HTML KB | JS local KB | CSS local KB | Scripts |\n|---|---:|---:|---:|---:|\n'+rows.slice(0,40).map(x=>`| ${x.page} | ${(x.html/1024).toFixed(1)} | ${(x.js/1024).toFixed(1)} | ${(x.css/1024).toFixed(1)} | ${x.scripts} |`).join('\n')+'\n\n';
if(errors.length)md+='## Régressions bloquantes\n\n'+errors.map(x=>'- '+x).join('\n')+'\n';
fs.writeFileSync(path.join(ROOT,'performance-report.md'),md);
console.log(md);
if(errors.length){console.error('Performance budget failed.');process.exit(1);}
