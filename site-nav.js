document.addEventListener('DOMContentLoaded',()=> {
  const header=document.querySelector('header.top');
  if(!header) return;

  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const bacPages=['bac.html','anthologie-bac.html','bac-commentaire.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','bac-dissertation.html','bac-dissertation-methode.html','bac-oral.html','bac-mode-examen.html','commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-plan.html','commentaire-bac-procedes-effets.html','commentaire-bac-introduction.html','commentaire-bac-transition.html','commentaire-bac-conclusion.html','oeuvres-integrales.html','pot-bouille.html','pot-bouille-pb01.html','pot-bouille-pb02.html','pot-bouille-pb03.html'];
  const brevetPages=['brevet.html','anthologie-brevet.html','brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html','brevet-redaction.html','brevet-imagination.html','brevet-reflexion.html'];
  const teacherPages=['enseignants.html','formation.html','bibliotheque.html','pot-bouille-professeurs.html'];
  const manualPages=['manuel-procedes.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','parcours.html'];
  const is=(names)=>names.includes(path);

  const portal=(href,label,sub,items,classes='',offer=null)=>`
    <div class="portal-wrap ${classes}">
      <a class="portal${classes.includes('active')?' active':''}" href="${href}" aria-haspopup="true">
        <span>${label}</span><small>${sub}</small><i aria-hidden="true">⌄</i>
      </a>
      <div class="portal-dropdown" role="menu">
        <div class="portal-dropdown-head"><strong>Que voulez-vous faire ?</strong></div>
        ${items.map(([u,t,d])=>`<a href="${u}" role="menuitem"><strong>${t}</strong>${d?`<small>${d}</small>`:''}</a>`).join('')}
        ${offer?`<a class="portal-offer" href="${offer[0]}"><strong>${offer[1]}</strong><small>${offer[2]}</small></a>`:''}
      </div>
    </div>`;

  const portals=[
    portal('bac.html','BAC','écrit · oral',[
      ['bac-commentaire.html','Préparer le commentaire','Comprendre la méthode et s’entraîner étape par étape'],
      ['bac-dissertation.html','Préparer la dissertation','Construire une réflexion et rédiger'],
      ['bac-oral.html','Préparer l’oral','Travailler les attentes de l’épreuve'],
      ['annales.html#bac','Faire une annale','S’entraîner sur un sujet officiel'],
      ['bac-mode-examen.html','Se mettre en condition','Travailler sans aide, avec chrono']
    ],is(bacPages)?'active':'',['offre.html','Accéder à tous les entraînements','Plus de parcours, d’annales et de reprises accompagnées']),
    portal('brevet.html','BREVET','comprendre · langue · rédiger',[
      ['anthologie-brevet.html','Faire un sujet complet','Une annale officielle, question après question'],
      ['brevet-comprehension.html','Travailler la compréhension','Répondre, justifier, interpréter'],
      ['brevet-grammaire.html','Travailler la grammaire','Analyser et manipuler'],
      ['brevet-reecriture.html','Travailler la réécriture','Transformer sans perdre les accords'],
      ['brevet-redaction.html','Travailler la rédaction','Sujet d’imagination ou sujet de réflexion']
    ],is(brevetPages)?'active':'',['offre.html','Accéder à tous les sujets et exercices','Davantage d’annales, de séries ciblées et de reprises']),
    portal('manuel-procedes.html','MÉTHODE','commentaire · procédés',[
      ['commentaire-bac-methode.html','Comprendre la méthode','De la lecture à la problématique et au plan'],
      ['manuel-procedes.html','Chercher un procédé','Définitions, exemples et effets'],
      ['bac-commentaire-procedes.html','Comprendre procédés et effets','Relier forme, effet et interprétation'],
      ['bac-commentaire-procedes-entrainement.html','S’entraîner sur les procédés','Identifier puis expliquer précisément'],
      ['parcours.html','Suivre un parcours guidé','Avancer étape par étape']
    ],is(manualPages)?'active':''),
    portal('enseignants.html','ENSEIGNANTS','3e · 2de · 1re',[
      ['enseignants.html#troisieme','Ressources de 3e','Brevet, langue et rédaction'],
      ['enseignants.html#seconde','Ressources de Seconde','Lecture, commentaire et langue'],
      ['enseignants.html#premiere','Ressources de Première','Bac écrit et oral'],
      ['bibliotheque.html','Ouvrir la bibliothèque','Retrouver les documents et ressources']
    ],is(teacherPages)?'active':'')
  ].join('');

  header.innerHTML=`
  <div class="wrap mast mast-v3">
    <a class="brand brand-v2" href="index.html">COMMENTAIRE<br>PLAN</a>
    <nav class="nav-portals" aria-label="Navigation principale">
      ${portals}
    </nav>
  </div>`;

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