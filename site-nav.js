document.addEventListener('DOMContentLoaded',()=> {
  const header=document.querySelector('header.top');
  if(!header) return;

  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const bacPages=['bac.html','anthologie-bac.html','bac-commentaire.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','bac-dissertation.html','bac-oral.html','bac-mode-examen.html','commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-plan.html','commentaire-bac-procedes-effets.html','commentaire-bac-introduction.html','commentaire-bac-transition.html','commentaire-bac-conclusion.html'];
  const brevetPages=['brevet.html','anthologie-brevet.html','brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html','brevet-redaction.html'];
  const teacherPages=['enseignants.html','formation.html','bibliotheque.html'];
  const manualPages=['manuel-procedes.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','parcours.html'];
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
    portal('bac.html','BAC','écrit · oral',[
      ['bac.html','Tout l’espace Bac','Choisir son entraînement'],
      ['bac-commentaire.html','Commentaire','Méthode · exercices · modèles'],
      ['bac-dissertation.html','Dissertation','Construire et rédiger'],
      ['bac-oral.html','Oral','Préparer l’épreuve'],
      ['annales.html#bac','Annales Bac','Sujets officiels'],
      ['bac-mode-examen.html','Mode examen','S’entraîner sans aide']
    ],is(bacPages)?'active':''),
    portal('brevet.html','BREVET','lire · langue · écrire',[
      ['brevet.html','Tout l’espace Brevet','Choisir son entraînement'],
      ['anthologie-brevet.html','Sujets complets','Faire une annale dans l’ordre'],
      ['brevet-comprehension.html','Compréhension','Répondre · justifier · interpréter'],
      ['brevet-grammaire.html','Grammaire','Analyser · manipuler'],
      ['brevet-reecriture.html','Réécriture','Transformer avec précision'],
      ['brevet-redaction.html','Rédaction','Construire · rédiger · reprendre']
    ],is(brevetPages)?'active':''),
    portal('manuel-procedes.html','MANUEL','méthode · procédés',[
      ['commentaire-bac-methode.html','Méthode du commentaire','De la lecture au plan'],
      ['manuel-procedes.html','Petit manuel des procédés','Définitions · exemples · effets'],
      ['bac-commentaire-procedes.html','Procédés & effets','Comprendre leur fonction'],
      ['bac-commentaire-procedes-entrainement.html','Exercices','Identifier puis expliquer'],
      ['parcours.html','Parcours guidés','Avancer étape par étape']
    ],is(manualPages)?'active':''),
    portal('enseignants.html','ENSEIGNANTS','3e · 2de · 1re',[
      ['enseignants.html#troisieme','Troisième','Brevet · langue · rédaction'],
      ['enseignants.html#seconde','Seconde','Lecture · commentaire · langue'],
      ['enseignants.html#premiere','Première','Bac écrit · oral'],
      ['formation.html','Progressions','Séquences et parcours'],
      ['bibliotheque.html','Bibliothèque','Documents et ressources']
    ],is(teacherPages)?'active':'')
  ].join('');

  header.innerHTML=`
  <div class="wrap mast mast-v3">
    <a class="brand brand-v2" href="index.html">COMMENTAIRE<br>PLAN</a>
    <nav class="nav-portals" aria-label="Navigation principale">
      ${portals}
    </nav>
    <a class="nav-offer" href="offre.html">Accès complet</a>
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