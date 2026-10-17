#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DOMAIN = 'https://commentaire-plan.com';
const SKIP_DIRS = new Set(['.git','node_modules','.netlify']);
const EXCLUDE_FROM_SITEMAP = /(?:^|\/)(?:404|merci|confirmation|paiement|checkout|login|connexion|admin|test|draft)(?:[-_.\/]|$)/i;

function walk(dir){
  const out=[];
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(SKIP_DIRS.has(ent.name)) continue;
    const full=path.join(dir,ent.name);
    if(ent.isDirectory()) out.push(...walk(full));
    else if(ent.isFile() && ent.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function rel(file){ return path.relative(ROOT,file).split(path.sep).join('/'); }
function abs(href){ return href.startsWith('/') ? href : '/' + href; }

const bacPages=new Set(['bac.html','anthologie-bac.html','bac-commentaire.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','bac-dissertation.html','bac-dissertation-methode.html','bac-oral.html','bac-mode-examen.html','commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-plan.html','commentaire-bac-procedes-effets.html','commentaire-bac-introduction.html','commentaire-bac-transition.html','commentaire-bac-conclusion.html','oeuvres-integrales.html','pot-bouille.html','pot-bouille-bac-2027.html','pot-bouille-pb01.html','pot-bouille-pb02.html','pot-bouille-pb03.html']);
const philoPages=new Set(['philosophie.html','dissertation-philosophie-bac.html','philosophie-dissertation.html','philosophie-dissertation-entrainement.html','philosophie-problematisation.html','philosophie-operations.html','philosophie-penser-par-soi-meme.html','philosophie-references.html','philosophie-laboratoire.html','philosophie-diagnostic.html','philosophie-annales.html','philosophie-annale.html','philosophie-notions.html']);
const brevetPages=new Set(['brevet.html','anthologie-brevet.html','brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html','brevet-redaction.html','brevet-imagination.html','brevet-reflexion.html']);
const hlpPages=new Set(['hlp.html','hlp-premiere.html','hlp-terminale.html','hlp-annales.html']);
const teacherPages=new Set(['enseignants.html','hlp-professeurs.html','formation.html','bibliotheque.html','pot-bouille-professeurs.html','sequence-pot-bouille.html']);
const manualPages=new Set(['methode-cours.html','methode-brevet.html','methode-seconde.html','methode-hlp.html','manuel-procedes.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','laboratoire-effet-ici.html','parcours.html']);

function portal(file, href,label,sub,items,active,offer){
  return `
    <div class="portal-wrap ${active?'active':''}">
      <a class="portal${active?' active':''}" href="${abs(href)}" aria-haspopup="true">
        <span>${label}</span><small>${sub}</small><i aria-hidden="true">⌄</i>
      </a>
      <div class="portal-dropdown" role="menu">
        <div class="portal-dropdown-head"><strong>Que voulez-vous faire ?</strong></div>
        ${items.map(([u,t,d])=>`<a href="${abs(u)}" role="menuitem"><strong>${t}</strong>${d?`<small>${d}</small>`:''}</a>`).join('')}
        ${offer?`<a class="portal-offer" href="${abs(offer[0])}"><strong>${offer[1]}</strong><small>${offer[2]}</small></a>`:''}
      </div>
    </div>`;
}

function staticHeader(file){
  const base=path.basename(file).toLowerCase();
  const navigation=[
  [
    "bac.html",
    "FRANÇAIS",
    "écrit · oral",
    [
      [
        "bac-commentaire.html",
        "Commentaire",
        "Lire, analyser et rédiger"
      ],
      [
        "bac-dissertation.html",
        "Dissertation",
        "Construire une réflexion sur une œuvre"
      ],
      [
        "bac-oral.html",
        "Oral",
        "Préparer les deux parties de l’épreuve"
      ],
      [
        "methode-cours.html",
        "Méthodes et exercices",
        "Choisir un geste à travailler"
      ]
    ]
  ],
  [
    "philosophie.html",
    "PHILOSOPHIE",
    "dissertation · explication",
    [
      [
        "philosophie-probleme-pas-a-pas.html",
        "1 · Trouver le problème",
        "Commencer par un vrai sujet"
      ],
      [
        "philosophie-plan-pas-a-pas.html",
        "2 · Construire le plan",
        "Faire progresser les réponses"
      ],
      [
        "philosophie-dissertation-entrainement.html",
        "3 · Rédiger",
        "Arguments, transitions et conclusion"
      ],
      [
        "philosophie-laboratoire.html",
        "4 · Reprendre une difficulté",
        "Choisir un atelier ciblé"
      ],
      [
        "philosophie-annales.html",
        "5 · Traiter un sujet du bac",
        "Dissertations et explications de texte"
      ],
      [
        "philosophie-explication.html",
        "Expliquer un texte",
        "Du passage à l’explication rédigée"
      ]
    ]
  ],
  [
    "hlp.html",
    "HLP",
    "première · terminale",
    [
      [
        "hlp-premiere.html",
        "Première",
        "La parole et les représentations du monde"
      ],
      [
        "hlp-terminale.html",
        "Terminale",
        "La recherche de soi, l’Humanité en question"
      ],
      [
        "hlp-ecrire.html",
        "Interprétation et essai",
        "Les exercices propres à HLP"
      ]
    ]
  ],
  [
    "brevet.html",
    "BREVET",
    "lecture · langue · rédaction",
    [
      [
        "brevet-lecture-parcours.html",
        "Comprendre un texte",
        "Justifier et interpréter"
      ],
      [
        "brevet-grammaire.html",
        "Grammaire",
        "Analyser et manipuler"
      ],
      [
        "brevet-reecriture.html",
        "Réécriture",
        "Transformer en conservant les accords"
      ],
      [
        "brevet-redaction.html",
        "Rédaction",
        "Imaginer ou argumenter"
      ]
    ]
  ],
  [
    "bibliotheque.html",
    "BIBLIOTHÈQUE",
    "littérature · philosophie",
    [
      [
        "bibliotheque-litterature.html",
        "Littérature",
        "Œuvres, extraits et parcours de lecture"
      ],
      [
        "philosophie-banque.html",
        "Philosophie",
        "Références commentées et exercices"
      ]
    ]
  ],
  [
    "annales.html",
    "ANNALES",
    "sujets officiels",
    [
      [
        "annales.html#bac",
        "Bac de français",
        "Sujets et corrigés par session"
      ],
      [
        "philosophie-annales.html",
        "Philosophie",
        "Dissertations et explications de texte"
      ],
      [
        "hlp-annales.html",
        "HLP",
        "Interprétation et essai"
      ],
      [
        "annales.html#brevet",
        "Brevet",
        "Sujets officiels de français"
      ]
    ]
  ]
];
function navigationActive(href, base){
  if(href==='bibliotheque.html') return /^bibliotheque/.test(base)||base==='philosophie-banque.html';
  if(href==='annales.html') return /^(annales|anthologie-bac|anthologie-brevet|philosophie-annale|hlp-annales|bac-20|hlp-20|hlp-sujet-zero)/.test(base);
  if(navigationActive('bibliotheque.html',base)||navigationActive('annales.html',base)) return false;
  if(href==='philosophie.html') return /^(philosophie|dissertation-philosophie)/.test(base);
  if(href==='hlp.html') return /^hlp/.test(base);
  if(href==='brevet.html') return /^brevet/.test(base);
  return /^(bac|commentaire|pot-bouille|oeuvres-integrales)/.test(base);
}
const portals=navigation.map(([href,label,sub,items])=>portal(file,href,label,sub,items,navigationActive(href,base))).join('');
  return `<header class="top" data-seo-static-nav="1">
  <div class="wrap mast mast-v3">
    <div class="brand-signature"><a class="brand brand-v2" href="/">COMMENTAIRE<br>PLAN</a><a class="site-wink" href="/clin-oeil.html" aria-label="Le clin d’œil philosophique du site" title="Une pause métaphysique"><img src="/assets/clin-oeil-heidegger-120.webp" width="42" height="53" alt="" decoding="async"></a></div>
    <nav class="nav-portals" aria-label="Navigation principale">${portals}</nav>
    <button class="mobile-nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
  </div>
  <nav id="mobile-nav" class="mobile-nav wrap" aria-label="Navigation mobile" hidden>
    <a href="/bac.html"><strong>Bac français</strong><span>Commentaire · dissertation · oral</span></a>
    <a href="/philosophie.html"><strong>Philosophie</strong><span>Méthode · exercices · annales</span></a>
    <a href="/hlp.html"><strong>HLP</strong><span>Première · Terminale · annales</span></a>
    <a href="/brevet.html"><strong>Brevet</strong><span>Compréhension · langue · rédaction</span></a>
    <a href="/bibliotheque.html"><strong>Bibliothèque</strong><span>Littérature · philosophie</span></a>
    <a href="/annales.html"><strong>Annales</strong><span>Sujets officiels et corrigés</span></a>
  </nav>
</header>`;
}

const footer=`<footer class="site-footer" data-seo-static-footer="1"><div class="wrap"><a href="/enseignants.html">Enseignants</a><a href="/methode-cours.html">Méthodes</a><a href="/plan-du-site.html">Plan du site</a><a href="/apropos.html">La démarche</a><a href="/offre.html">L’offre</a><a href="/contact.html">Contact</a><a href="/mentions-legales.html">Mentions légales</a><a href="/confidentialite.html">Confidentialité</a><a href="/cgv.html">CGV</a></div></footer>`;

function firstH1(html){
  const m=html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? m[1].replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,'\u00a0').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim() : '';
}
function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function crumbSpec(r, title){
  if(r==='index.html') return [];
  const b=path.basename(r);
  const c=[{name:'Accueil',href:'/'}];
  const SERVICE=/^(offre|apropos|merci|contact|plan-du-site|mentions-legales|cgv|confidentialite|annales|entrainement-annale|eleves|ia-laboratoire)\.html$/;
  if(SERVICE.test(b)) { /* pages de service : pas de rubrique */ }
  else if(/^methode-/.test(b)) { if(b!=='methode-cours.html') c.push({name:'Cours de méthode',href:'/methode-cours.html'}); }
  else if(/^brevet|anthologie-brevet/.test(b)) c.push({name:'Brevet',href:'/brevet.html'});
  else if(b==='philosophie-banque.html'||/^bibliotheque/.test(b)) { if(b!=='bibliotheque.html') c.push({name:'Bibliothèque',href:'/bibliotheque.html'}); }
  else if(/^philosophie|^dissertation-philosophie/.test(b)) c.push({name:'Philosophie',href:'/philosophie.html'});
  else if(/^hlp-professeurs/.test(b)) { c.push({name:'Enseignants',href:'/enseignants.html'}); }
  else if(/^hlp/.test(b)) { if(b!=='hlp.html') c.push({name:'HLP',href:'/hlp.html'}); }
  else if(/^enseignants|formation|bibliotheque|pot-bouille-professeurs/.test(b)) c.push({name:'Enseignants',href:'/enseignants.html'});
  else {
    c.push({name:'Bac français',href:'/bac.html'});
    if(/^commentaire-bac|^bac-commentaire|commentaire/.test(b)) c.push({name:'Commentaire',href:'/bac-commentaire.html'});
    else if(/^pot-bouille/.test(b)) c.push({name:'Pot-Bouille',href:'/pot-bouille.html'});
    else if(/^bac-dissertation/.test(b)) c.push({name:'Dissertation',href:'/bac-dissertation.html'});
    else if(/^bac-oral/.test(b)) c.push({name:'Oral',href:'/bac-oral.html'});
  }
  const last=c[c.length-1];
  if(last.href==='/'+b){ last.href=null; return c; }
  c.push({name:title || b.replace(/\.html$/,'').replace(/-/g,' '),href:null});
  return c;
}

function injectBreadcrumbs(html,r){
  if(r==='index.html') return html;
  /* Régénère à chaque build : le fil suit le titre actuel de la page. */
  html=html.replace(/<nav class="seo-breadcrumbs[^"]*"[^>]*>[\s\S]*?<\/nav>\n?/,'');
  html=html.replace(/<script type="application\/ld\+json" data-seo-breadcrumbs="1">[\s\S]*?<\/script>\n?/,'');
  const title=firstH1(html);
  const crumbs=crumbSpec(r,title);
  if(!crumbs.length) return html;
  const nav='<nav class="seo-breadcrumbs wrap" aria-label="Fil d’Ariane">'+crumbs.map((x,i)=>x.href?`<a href="${x.href}">${esc(x.name)}</a><span aria-hidden="true">›</span>`:`<span aria-current="page">${esc(x.name)}</span>`).join('')+'</nav>';
  html=html.replace(/(<main\b[^>]*>)/i,'$1\n'+nav);
  const itemList=crumbs.map((x,i)=>({ '@type':'ListItem', position:i+1, name:x.name, item:x.href ? DOMAIN+x.href : undefined }));
  const json=JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':itemList});
  if(!/"@type"\s*:\s*"BreadcrumbList"/.test(html)) html=html.replace(/<\/head>/i,`<script type="application/ld+json" data-seo-breadcrumbs="1">${json}</script>\n</head>`);
  return html;
}

function canonical(html){
  const m=html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i) ||
          html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i);
  return m ? m[1] : null;
}
function noindex(html){
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}
function absoluteCanonical(can,r){
  if(!can) return null;
  try{return new URL(can, DOMAIN + '/' + r).href;}catch(e){return null;}
}

function gitDate(file){
  try{
    const d=cp.execFileSync('git',['log','-1','--format=%cs','--',file],{cwd:ROOT,encoding:'utf8'}).trim();
    if(/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  }catch(e){}
  return new Date().toISOString().slice(0,10);
}

const pages=walk(ROOT);
let changed=0;
for(const file of pages){
  let html=fs.readFileSync(file,'utf8');
  const before=html;
  if(/<header class=["']top["']>\s*<\/header>/i.test(html)){
    html=html.replace(/<header class=["']top["']>\s*<\/header>/i, staticHeader(file));
  } else {
    /* En-tête déjà généré (menu à rafraîchir) ou en-tête de l'ancien site : on le remplace par l'en-tête actuel. */
    const m=html.match(/<header class=["']top["'][^>]*>[\s\S]*?<\/header>/i);
    if(m && (/data-seo-static-nav/.test(m[0]) || /BAC (&amp;|&) BREVET|Atelier(<br>|\s)+du commentaire|Nous contacter/i.test(m[0]))) html=html.replace(m[0], staticHeader(file));
  }
  html=html.replace(/(<title>[^<]*?)\s*(\||—|–)\s*(BAC (&amp;|&) BREVET( —)? FRANÇAIS|L’Atelier du commentaire|L'Atelier du commentaire|COMMENTAIRE PLAN)\s*(<\/title>)/i,'$1 | Commentaire Plan$6');
  if(/data-seo-static-nav/.test(html) && !/site-nav\.js/.test(html)) html=html.replace(/<\/body>/i,'<script src="/site-nav.js"></script>\n</body>');
  html=html.replace(/<footer class="site-footer" data-seo-static-footer="1">[\s\S]*?<\/footer>/,footer);
  if(!/class=["'][^"']*site-footer/.test(html) && /<\/body>/i.test(html)){
    html=html.replace(/<\/body>/i,footer+'\n</body>');
  }
  const r=rel(file);
  if(!noindex(html) && !canonical(html)){
    const self = r==='index.html' ? DOMAIN+'/' : DOMAIN+'/'+r;
    html=html.replace(/<\/head>/i,'<link rel="canonical" href="'+self+'">\n</head>');
  }
  /* Image de partage (réseaux, messageries) : une seule image pour tout le site. */
  if(!noindex(html) && !/property=["']og:image["']/.test(html)){
    html=html.replace(/<\/head>/i,'<meta property="og:image" content="'+DOMAIN+'/og-image.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Commentaire Plan : la copie la plus courte qui mérite 20."><meta name="twitter:card" content="summary_large_image">\n</head>');
  }
  html=injectBreadcrumbs(html,r);
  if(!/type=["']speculationrules["']/.test(html)){
    const speculation='<script type="speculationrules" data-seo-speculation="1">{"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"selector_matches":"[download],.no-prefetch"}}]},"eagerness":"moderate"}]}<\/script>';
    html=html.replace(/<\/head>/i,speculation+'\n</head>');
  }
  if(html!==before){ fs.writeFileSync(file,html); changed++; }
}

const sitemap=[];
for(const file of pages){
  const r=rel(file);
  if(EXCLUDE_FROM_SITEMAP.test(r)) continue;
  const html=fs.readFileSync(file,'utf8');
  if(noindex(html)) continue;
  const can=absoluteCanonical(canonical(html),r);
  if(!can || !can.startsWith(DOMAIN+'/')) continue;
  sitemap.push({loc:can,lastmod:gitDate(file)});
}
const uniq=[...new Map(sitemap.map(x=>[x.loc,x])).values()].sort((a,b)=>a.loc.localeCompare(b.loc));
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+
  uniq.map(x=>`  <url><loc>${x.loc.replace(/&/g,'&amp;')}</loc><lastmod>${x.lastmod}</lastmod></url>`).join('\n')+
  '\n</urlset>\n';
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),xml);

const redirectLines=['/index.html  /  301!'];
for(const file of pages){
  const r=rel(file), html=fs.readFileSync(file,'utf8');
  if(!noindex(html)) continue;
  const can=absoluteCanonical(canonical(html),r);
  if(!can || !can.startsWith(DOMAIN+'/')) continue;
  const target=new URL(can).pathname;
  const source='/'+r;
  if(source!==target) redirectLines.push(source+'  '+target+'  301!');
}
fs.writeFileSync(path.join(ROOT,'_redirects'),[...new Set(redirectLines)].join('\n')+'\n');
console.log(`SEO build: ${pages.length} HTML pages scanned, ${changed} enhanced, ${uniq.length} sitemap URLs, ${redirectLines.length} canonical redirects.`);
