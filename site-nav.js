document.addEventListener('DOMContentLoaded',()=> {
  const header=document.querySelector('header.top');
  if(!header) return;

  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const bacPages=['bac.html','anthologie-bac.html','bac-commentaire.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','bac-dissertation.html','bac-oral.html','bac-mode-examen.html','commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-plan.html','commentaire-bac-procedes-effets.html','commentaire-bac-introduction.html','commentaire-bac-transition.html','commentaire-bac-conclusion.html'];
  const brevetPages=['brevet.html','anthologie-brevet.html','brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html','brevet-redaction.html'];
  const teacherPages=['enseignants.html','formation.html','bibliotheque.html'];
  const trainingPages=['parcours.html','bac-commentaire-procedes-entrainement.html','bac-mode-examen.html','annales.html'];
  const manualPages=['manuel-procedes.html','bac-commentaire-procedes.html'];
  const is=(names)=>names.includes(path);

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
      ['bac.html','Espace Bac','Tous les entraînements'],
      ['anthologie-bac.html','Textes Bac','Entrer par les textes'],
      ['bac-commentaire.html','Commentaire','Méthode et exercices'],
      ['commentaire-bac-methode.html','Méthode du commentaire','Problématique · plan · analyse · rédaction'],
      ['annales.html#bac','Annales Bac','Sujets officiels transformés en entraînements']
    ],is(bacPages)?'active':''),
    portal('brevet.html','Brevet','comprendre · écrire',[
      ['brevet.html','Espace Brevet','Tous les entraînements'],
      ['brevet-comprehension.html','Compréhension & interprétation','Répondre et justifier'],
      ['brevet-grammaire.html','Grammaire','Analyser et manipuler'],
      ['brevet-reecriture.html','Réécriture','Transformer sans oublier les accords'],
      ['brevet-redaction.html','Rédaction','Construire puis reprendre'],
      ['annales.html#brevet','Annales Brevet','Sujets officiels transformés en entraînements']
    ],is(brevetPages)?'active':''),
    portal('parcours.html','S’entraîner','parcours · examen',[
      ['parcours.html','Parcours guidés','Avancer étape par étape'],
      ['bac-commentaire-procedes-entrainement.html','Exercices rapides','Procédés et effets'],
      ['annales.html','Annales','Choisir un sujet officiel'],
      ['bac-mode-examen.html','Mode examen','Travailler sans aide']
    ],is(trainingPages)?'active':''),
    portal('manuel-procedes.html','Manuel','procédés · effets',[
      ['manuel-procedes.html','Petit manuel des procédés','Un outil de recherche'],
      ['bac-commentaire-procedes.html','Procédés & effets','Comprendre la méthode'],
      ['bac-commentaire-procedes-entrainement.html','S’entraîner','Identifier puis expliquer']
    ],is(manualPages)?'active':''),
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
    <a class="brand brand-v2" href="index.html">COMMENTAIRE<br>PLAN</a>
    <nav class="nav-portals" aria-label="Navigation principale">
      ${portals}
    </nav>
    <a class="nav-offer" href="offre.html">Accès complet</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>
  </div>
  <div id="site-menu" class="site-menu" hidden>
    <div class="wrap site-menu-grid">
      <div><span class="menu-kicker">Bac</span><a href="bac.html">Espace Bac</a><a href="bac-commentaire.html">Commentaire</a><a href="annales.html#bac">Annales Bac</a></div>
      <div><span class="menu-kicker">Brevet</span><a href="brevet.html">Espace Brevet</a><a href="brevet-comprehension.html">Compréhension</a><a href="annales.html#brevet">Annales Brevet</a></div>
      <div><span class="menu-kicker">Outils</span><a href="parcours.html">S’entraîner</a><a href="manuel-procedes.html">Manuel des procédés</a><a href="enseignants.html">Enseignants</a></div>
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

  if(!location.pathname.includes('/annales/')){
    const s=document.createElement('script');
    s.src='free-response.js';
    document.body.appendChild(s);
  }
});