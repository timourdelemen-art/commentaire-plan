document.addEventListener('DOMContentLoaded',()=> {
  const header=document.querySelector('header.top');
  if(!header) return;

  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const bacPages=['bac.html','anthologie-bac.html','bac-commentaire.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','bac-dissertation.html','bac-oral.html','bac-mode-examen.html'];
  const brevetPages=['brevet.html','anthologie-brevet.html','brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html','brevet-redaction.html'];
  const teacherPages=['enseignants.html','formation.html'];
  const is=(names)=>names.includes(path);
  const active=(names)=>is(names)?' active':'';

  let context='home';
  if(is(bacPages)) context='bac';
  else if(is(brevetPages)) context='brevet';
  else if(is(teacherPages)) context='teachers';
  else if(path==='annales.html'){
    const hash=(location.hash||'').toLowerCase();
    context=hash.includes('brevet')?'brevet':'bac';
  }

  const tabs={
    home:[
      ['index.html','Accueil'],
      ['anthologie-bac.html','Anthologie Bac'],
      ['anthologie-brevet.html','Anthologie Brevet'],
      ['methode.html','Méthode'],
      ['enseignants.html','Enseignants']
    ],
    bac:[
      ['anthologie-bac.html','Anthologie Bac'],
      ['bac-commentaire.html','Commentaire'],
      ['bac-commentaire-procedes.html','Procédés'],
      ['bac-dissertation.html','Dissertation'],
      ['bac-oral.html','Oral'],
      ['annales.html#bac','Annales'],
      ['bac-mode-examen.html','Mode Bac']
    ],
    brevet:[
      ['anthologie-brevet.html','Anthologie Brevet'],
      ['brevet-comprehension.html','Compréhension'],
      ['brevet-grammaire.html','Grammaire'],
      ['brevet-reecriture.html','Réécriture'],
      ['brevet-redaction.html','Rédaction'],
      ['annales.html#brevet','Annales']
    ],
    teachers:[
      ['enseignants.html#troisieme','3e'],
      ['enseignants.html#seconde','Seconde'],
      ['enseignants.html#premiere','Première'],
      ['formation.html','Parcours'],
      ['bibliotheque.html','Bibliothèque']
    ]
  };

  const currentHref=(href)=>{
    const file=href.split('#')[0].toLowerCase();
    return file===path;
  };

  const contextTabs=(tabs[context]||tabs.home).map(([href,label])=>
    `<a class="${currentHref(href)?'active':''}" href="${href}">${label}</a>`
  ).join('');

  header.innerHTML=`
  <div class="wrap mast mast-v3">
    <a class="brand brand-v2" href="index.html">BAC & BREVET<br>FRANÇAIS</a>
    <nav class="nav-portals" aria-label="Univers">
      <a class="portal${active(bacPages)}" href="bac.html"><span>Bac</span><small>écrit · oral</small></a>
      <a class="portal${active(brevetPages)}" href="brevet.html"><span>Brevet</span><small>comprendre · manipuler · rédiger</small></a>
      <a class="portal${active(['anthologie-bac.html','anthologie-brevet.html'])}" href="anthologie-bac.html"><span>Anthologies</span><small>textes · exercices</small></a>
      <a class="portal${active(teacherPages)}" href="enseignants.html"><span>Enseignants</span><small>3e · 2de · 1re</small></a>
    </nav>
    <a class="nav-offer" href="offre.html">Accès complet</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>
  </div>
  <nav class="context-tabs" aria-label="Exercices du parcours"><div class="wrap">${contextTabs}</div></nav>
  <div id="site-menu" class="site-menu" hidden>
    <div class="wrap site-menu-grid">
      <div><span class="menu-kicker">Bac</span><a href="anthologie-bac.html">Anthologie Bac</a><a href="bac-commentaire.html">Commentaire</a><a href="bac-commentaire-procedes.html">Procédés</a><a href="bac-dissertation.html">Dissertation</a><a href="bac-oral.html">Oral</a></div>
      <div><span class="menu-kicker">Brevet</span><a href="anthologie-brevet.html">Anthologie Brevet</a><a href="brevet-comprehension.html">Compréhension</a><a href="brevet-grammaire.html">Grammaire</a><a href="brevet-reecriture.html">Réécriture</a><a href="brevet-redaction.html">Rédaction</a></div>
      <div><span class="menu-kicker">Ressources</span><a href="annales.html">Annales officielles</a><a href="bibliotheque.html">Bibliothèque</a><a href="enseignants.html">Enseignants</a><a href="offre.html">Accès gratuit / complet</a></div>
    </div>
  </div>`;

  const button=header.querySelector('.menu-toggle');
  const menu=header.querySelector('#site-menu');
  button.addEventListener('click',()=> {
    const open=button.getAttribute('aria-expanded')==='true';
    button.setAttribute('aria-expanded',String(!open));
    menu.hidden=open;
    document.body.classList.toggle('menu-open',!open);
  });
});