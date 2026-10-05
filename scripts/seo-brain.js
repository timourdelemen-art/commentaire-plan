#!/usr/bin/env node
const fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const SKIP=new Set(['.git','node_modules','.netlify']);
const STOP=new Set('a à au aux avec ce ces dans de des du elle en et eux il je la le les leur lui ma mais me même mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous y est sont être avoir fait faire plus moins très comme cette cet ces entre puis donc car ni si'.split(/\s+/));
function walk(d){let o=[];for(const e of fs.readdirSync(d,{withFileTypes:true})){if(SKIP.has(e.name))continue;const f=path.join(d,e.name);if(e.isDirectory())o=o.concat(walk(f));else if(e.isFile()&&e.name.endsWith('.html'))o.push(f);}return o;}
function cleanHtml(h){return h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim();}
function toks(s){return (s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/[a-z]{3,}/g)||[]).filter(x=>!STOP.has(x));}
function links(h,r){const a=[];for(const m of h.matchAll(/<a\b[^>]+href=["']([^"'#]+)["']/gi)){let x=m[1];if(/^(https?:|mailto:|tel:|javascript:)/i.test(x))continue;x=x.split('?')[0];if(x.startsWith('/'))x=x.slice(1)||'index.html';else x=path.posix.normalize(path.posix.join(path.posix.dirname(r),x));if(x.endsWith('/'))x+='index.html';if(x.endsWith('.html'))a.push(x);}return [...new Set(a)];}
const files=walk(ROOT);
const pages={};
for(const f of files){const r=path.relative(ROOT,f).split(path.sep).join('/');const h=fs.readFileSync(f,'utf8');if(/name=["']robots["'][^>]+noindex/i.test(h))continue;const text=cleanHtml(h);pages[r]={r,h,text,tokens:toks(text),links:links(h,r)};}
const names=Object.keys(pages);
const df={}; for(const p of Object.values(pages)){for(const t of new Set(p.tokens))df[t]=(df[t]||0)+1;}
for(const p of Object.values(pages)){const tf={};for(const t of p.tokens)tf[t]=(tf[t]||0)+1;const v={};let norm=0;for(const [t,c] of Object.entries(tf)){const w=(1+Math.log(c))*Math.log((names.length+1)/((df[t]||0)+1));if(w>0){v[t]=w;norm+=w*w;}}p.v=v;p.norm=Math.sqrt(norm)||1;}
function sim(a,b){let s=0;const av=pages[a].v,bv=pages[b].v;const small=Object.keys(av).length<Object.keys(bv).length?av:bv,big=small===av?bv:av;for(const [t,w] of Object.entries(small))if(big[t])s+=w*big[t];return s/(pages[a].norm*pages[b].norm);}
let pr=Object.fromEntries(names.map(n=>[n,1/names.length]));
for(let iter=0;iter<40;iter++){const next=Object.fromEntries(names.map(n=>[n,(1-.85)/names.length]));let dangling=0;for(const n of names){const outs=pages[n].links.filter(x=>pages[x]);if(!outs.length){dangling+=pr[n];continue;}for(const o of outs)next[o]+=.85*pr[n]/outs.length;}if(dangling){for(const n of names)next[n]+=.85*dangling/names.length;}pr=next;}
const inbound=Object.fromEntries(names.map(n=>[n,0]));for(const n of names)for(const o of pages[n].links)if(inbound[o]!=null)inbound[o]++;
const candidates=[];
for(const source of names){
  const existing=new Set(pages[source].links);
  const scored=[];
  for(const target of names){if(target===source||existing.has(target))continue;const s=sim(source,target);if(s>=0.16)scored.push({target,sim:s,authority:pr[target],inbound:inbound[target]});}
  scored.sort((a,b)=>(b.sim*(1+Math.log1p(b.authority*names.length)))-(a.sim*(1+Math.log1p(a.authority*names.length))));
  for(const x of scored.slice(0,3))candidates.push({source,...x});
}
candidates.sort((a,b)=>b.sim-a.sim);
const topPR=names.map(n=>({page:n,score:pr[n],inbound:inbound[n]})).sort((a,b)=>b.score-a.score).slice(0,25);
let md='# SEO Brain — graphe interne et proximité sémantique\n\n';
md+='Calcul **hors navigateur**, sans impact sur le site public. Les suggestions ne sont jamais injectées automatiquement.\n\n';
md+='## Pages les plus centrales\n\n| Page | PageRank interne | Liens entrants |\n|---|---:|---:|\n'+topPR.map(x=>`| ${x.page} | ${x.score.toFixed(5)} | ${x.inbound} |`).join('\n')+'\n\n';
md+='## Opportunités de liens sémantiques à relire éditorialement\n\n| Source | Cible suggérée | Similarité | Entrants cible |\n|---|---|---:|---:|\n'+candidates.slice(0,60).map(x=>`| ${x.source} | ${x.target} | ${x.sim.toFixed(3)} | ${x.inbound} |`).join('\n')+'\n';
fs.writeFileSync(path.join(ROOT,'seo-brain-report.md'),md);
fs.writeFileSync(path.join(ROOT,'seo-brain.json'),JSON.stringify({generatedAt:new Date().toISOString(),pages:names.length,topPR,candidates:candidates.slice(0,200)},null,2));
console.log(`SEO Brain: ${names.length} pages, ${candidates.length} link opportunities.`);
