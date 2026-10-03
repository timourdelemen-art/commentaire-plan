document.addEventListener('DOMContentLoaded',()=> {
  const header=document.querySelector('header.top');
  if(!header) return;

  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const bacPages=['bac.html','anthologie-bac.html','bac-commentaire.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','manuel-procedes.html','bac-dissertation.html','bac-oral.html','bac-mode-examen.html','commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-plan.html','commentaire-bac-procedes-effets.html','commentaire-bac-introduction.html','commentaire-bac-transition.html','commentaire-bac-conclusion.html'];
  const brevetPages=['brevet.html','anthologie-brevet.html','brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html','brevet-redaction.html'];
  const teacherPages=['enseignants.html','formation.html','bibliotheque.html'];
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
      ['commentaire-bac-methode.html','Méthode'],
      ['bac-dissertation.html','Dissertation'],
      ['bac-oral.html','Oral'],
      ['annales.html#bac','Annales']
    ],
    brevet:[
      ['anthologie-brevet.html','Sujets complets'],
      ['brevet.html#exercices-cibles','Exercices ciblés']
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

  const portal=(href,label,sub,items,classes='')=>`
    <div class="portal-wrap ${classes}">
      <a class="portal${classes.includes('active')?' active':''}" href="${href}" aria-haspopup="true">
        <span>${label}</span><small>${sub}</small><i aria-hidden="true">⌄</i>
      </a>
      <div class="portal-dropdown" role="menu">
        ${items.map(([u,t,d])=>`<a href="${u}" role="menuitem"><strong>${t}</strong>${d?`<small>${d}</small>`:''}</a>`).join('')}
      </div>
    </div>`;

  const portals=[
    portal('bac.html','Bac','écrit · oral',[
      ['anthologie-bac.html','Anthologie Bac','Entrer par les textes'],
      ['bac-commentaire.html','Commentaire','Exercices et parcours'],
      ['commentaire-bac-methode.html','Méthode du commentaire','Problématique · plan · procédés · rédaction'],
      ['bac-dissertation.html','Dissertation','Construire une démonstration'],
      ['bac-oral.html','Oral','Préparation · explication · entretien'],
      ['annales.html#bac','Annales','Sujets officiels'],
      ['bac-mode-examen.html','Mode Bac','Travailler sans aide']
    ],is(bacPages)?'active':''),
    portal('brevet.html','Brevet','comprendre · manipuler · rédiger',[
      ['anthologie-brevet.html','Sujets complets','Annales dans l’ordre officiel'],
      ['brevet.html#exercices-cibles','Exercices ciblés','Choisir une difficulté'],
      ['brevet-comprehension.html','Compréhension & interprétation','Répondre et justifier'],
      ['brevet-grammaire.html','Langue & grammaire','Analyser et manipuler'],
      ['brevet-reecriture.html','Réécriture','Transformer sans oublier les accords'],
      ['brevet-redaction.html','Rédaction','Construire puis reprendre']
    ],is(brevetPages)?'active':''),
    portal('anthologie-bac.html','Anthologies','textes · exercices',[
      ['anthologie-bac.html','Anthologie Bac','Textes et entraînements'],
      ['anthologie-brevet.html','Anthologie Brevet','Sujets et questions'],
      ['annales.html','Annales officielles','Retrouver tous les sujets']
    ],is(['anthologie-bac.html','anthologie-brevet.html'])?'active':''),
    portal('enseignants.html','Enseignants','3e · 2de · 1re',[
      ['enseignants.html#troisieme','Troisième','Ressources Brevet'],
      ['enseignants.html#seconde','Seconde','Lecture · commentaire · langue'],
      ['enseignants.html#premiere','Première','Bac écrit et oral'],
      ['formation.html','Parcours','Séquences et progressions'],
      ['bibliotheque.html','Bibliothèque','Documents à retrouver']
    ],is(teacherPages)?'active':'')
  ].join('');

  header.innerHTML=`
  <div class="wrap mast mast-v3">
    <a class="brand brand-v2" href="index.html">BAC & BREVET<br>FRANÇAIS</a>
    <nav class="nav-portals" aria-label="Univers">
      ${portals}
    </nav>
    <a class="nav-offer" href="offre.html">Accès complet</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>
  </div>
  <nav class="context-tabs" aria-label="Exercices du parcours"><div class="wrap">${contextTabs}</div></nav>
  <div id="site-menu" class="site-menu" hidden>
    <div class="wrap site-menu-grid">
      <div><span class="menu-kicker">Bac</span><a href="anthologie-bac.html">Anthologie Bac</a><a href="bac-commentaire.html">Commentaire</a><a href="bac-commentaire-procedes.html">Atelier procédés</a><a href="manuel-procedes.html">Petit manuel</a><a href="bac-mode-examen.html">Mode Bac</a><a href="bac-dissertation.html">Dissertation</a><a href="bac-oral.html">Oral</a></div>
      <div><span class="menu-kicker">Brevet</span><a href="anthologie-brevet.html">Sujets complets</a><a href="brevet.html#exercices-cibles">Exercices ciblés</a></div>
      <div><span class="menu-kicker">Ressources</span><a href="annales.html">Annales officielles</a><a href="manuel-procedes.html">Petit manuel des procédés</a><a href="bibliotheque.html">Bibliothèque</a><a href="enseignants.html">Enseignants</a><a href="offre.html">Accès gratuit / complet</a></div>
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

  header.querySelectorAll('.portal-wrap').forEach(wrap=>{
    const main=wrap.querySelector('.portal');
    const drop=wrap.querySelector('.portal-dropdown');
    const close=()=>wrap.classList.remove('open');
    main.addEventListener('focus',()=>wrap.classList.add('open'));
    wrap.addEventListener('mouseenter',()=>wrap.classList.add('open'));
    wrap.addEventListener('mouseleave',close);
    wrap.addEventListener('focusout',e=>{ if(!wrap.contains(e.relatedTarget)) close(); });
    main.addEventListener('keydown',e=>{
      if(e.key==='ArrowDown'){
        e.preventDefault();
        wrap.classList.add('open');
        drop.querySelector('a')?.focus();
      }
      if(e.key==='Escape') close();
    });
    drop.addEventListener('keydown',e=>{
      if(e.key==='Escape'){ close(); main.focus(); }
    });
  });

  if(!location.pathname.includes('/annales/')){ const s=document.createElement('script'); s.src='free-response.js'; document.body.appendChild(s); }
});
