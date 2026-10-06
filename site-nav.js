document.addEventListener('DOMContentLoaded',()=> {
  const header=document.querySelector('header.top');
  if(!header) return;

  if(!document.querySelector('.skip-link')){
    const skip=document.createElement('a');
    skip.className='skip-link';
    skip.href='#main-content';
    skip.textContent='Aller au contenu';
    document.body.prepend(skip);
  }
  const mainContent=document.querySelector('main');
  if(mainContent && !mainContent.id) mainContent.id='main-content';

  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const bacPages=['bac.html','anthologie-bac.html','bac-commentaire.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','bac-dissertation.html','bac-dissertation-methode.html','bac-oral.html','bac-mode-examen.html','commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-plan.html','commentaire-bac-procedes-effets.html','commentaire-bac-introduction.html','commentaire-bac-transition.html','commentaire-bac-conclusion.html','oeuvres-integrales.html','pot-bouille.html','pot-bouille-pb01.html','pot-bouille-pb02.html','pot-bouille-pb03.html'];
  const philoPages=['philosophie.html','philosophie-dissertation.html','philosophie-dissertation-entrainement.html','philosophie-problematisation.html','philosophie-operations.html','philosophie-penser-par-soi-meme.html','philosophie-references.html','philosophie-laboratoire.html','philosophie-diagnostic.html','philosophie-annales.html','philosophie-annale.html'];
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
    ],is(bacPages)?'active':''),
    portal('philosophie.html','PHILO','Terminale',[
      ['philosophie-diagnostic.html','Faire le diagnostic','5 minutes pour trouver votre priorité'],
      ['philosophie-dissertation.html','Construire la dissertation','Du sujet au problème puis aux réponses nécessaires'],
      ['philosophie-dissertation-entrainement.html','S’entraîner geste par geste','Problématique, argumentation, transition, III'],
      ['philosophie-references.html','Travailler les références','Faire réellement agir un auteur dans le raisonnement'],
      ['philosophie-operations.html','Travailler les opérations','Distinguer, inverser, déplacer, transformer…'],
      ['philosophie-annales.html','Faire une annale','Dissertation ou explication de texte, sujet par sujet']
    ],is(philoPages)?'active':''),
    portal('brevet.html','BREVET','comprendre · langue · rédiger',[
      ['anthologie-brevet.html','Faire un sujet complet','Une annale officielle, question après question'],
      ['brevet-comprehension.html','Travailler la compréhension','Répondre, justifier, interpréter'],
      ['brevet-grammaire.html','Travailler la grammaire','Analyser et manipuler'],
      ['brevet-reecriture.html','Travailler la réécriture','Transformer sans perdre les accords'],
      ['brevet-redaction.html','Travailler la rédaction','Sujet d’imagination ou sujet de réflexion']
    ],is(brevetPages)?'active':''),
    portal('manuel-procedes.html','MÉTHODE','commentaire · procédés',[
      ['commentaire-bac-methode.html','Comprendre la méthode','De la lecture à la problématique et au plan'],
      ['manuel-procedes.html','Chercher un procédé','Définitions, exemples et effets'],
      ['bac-commentaire-procedes.html','Comprendre procédés et effets','Relier forme, effet et interprétation'],
      ['bac-commentaire-procedes-entrainement.html','S’entraîner sur les procédés','Identifier puis expliquer précisément'],['laboratoire-effet-ici.html','Laboratoire de l’effet ici','28 exemples contextualisés et filtrables'],
      ['parcours.html','Suivre un parcours guidé','Avancer étape par étape']
    ],is(manualPages)?'active':''),
    portal('enseignants.html','ENSEIGNANTS','3e · 2de · 1re · Tle',[
      ['enseignants.html#troisieme','Ressources de 3e','Brevet, langue et rédaction'],
      ['enseignants.html#seconde','Ressources de Seconde','Lecture, commentaire et langue'],
      ['enseignants.html#premiere','Ressources de Première','Bac écrit et oral'],
      ['philosophie.html','Ressources de Terminale','Philosophie : problématisation et dissertation'],
      ['bibliotheque.html','Ouvrir la bibliothèque','Retrouver les documents et ressources']
    ],is(teacherPages)?'active':'')
  ].join('');

  if(!header.innerHTML.trim()) header.innerHTML=`
  <div class="wrap mast mast-v3">
    <a class="brand brand-v2" href="index.html">COMMENTAIRE<br>PLAN</a>
    <nav class="nav-portals" aria-label="Navigation principale">
      ${portals}
    </nav>
    <button class="mobile-nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
  </div>
  <nav id="mobile-nav" class="mobile-nav wrap" aria-label="Navigation mobile" hidden>
    <a href="bac.html"><strong>Bac français</strong><span>Commentaire · dissertation · oral</span></a>
    <a href="philosophie.html"><strong>Philosophie</strong><span>Méthode · exercices · annales</span></a>
    <a href="brevet.html"><strong>Brevet</strong><span>Compréhension · langue · rédaction</span></a>
    <a href="manuel-procedes.html"><strong>Méthode</strong><span>Commentaire · procédés</span></a>
    <a href="enseignants.html"><strong>Enseignants</strong><span>Ressources et séquences</span></a>
  </nav>`;

  const mobileToggle=header.querySelector('.mobile-nav-toggle');
  const mobileNav=header.querySelector('#mobile-nav');
  if(mobileToggle && mobileNav){
    const setMobileOpen=(open)=>{
      mobileToggle.setAttribute('aria-expanded',String(open));
      mobileToggle.textContent=open?'Fermer':'Menu';
      mobileNav.hidden=!open;
    };
    mobileToggle.addEventListener('click',()=>setMobileOpen(mobileNav.hidden));
    mobileNav.addEventListener('keydown',e=>{
      if(e.key==='Escape'){ setMobileOpen(false); mobileToggle.focus(); }
    });
  }

  header.querySelectorAll('.portal-wrap').forEach(wrap=>{
    const main=wrap.querySelector('.portal');
    const drop=wrap.querySelector('.portal-dropdown');
    const setOpen=(open)=>{
      wrap.classList.toggle('open',open);
      main.setAttribute('aria-expanded',String(open));
    };
    main.setAttribute('aria-expanded','false');
    const close=()=>setOpen(false);
    main.addEventListener('focus',()=>setOpen(true));
    wrap.addEventListener('mouseenter',()=>setOpen(true));
    wrap.addEventListener('mouseleave',close);
    wrap.addEventListener('focusout',e=>{ if(!wrap.contains(e.relatedTarget)) close(); });
    main.addEventListener('keydown',e=>{
      if(e.key==='ArrowDown'){
        e.preventDefault();
        setOpen(true);
        drop.querySelector('a')?.focus();
      }
      if(e.key==='Escape') close();
    });
    drop.addEventListener('keydown',e=>{
      if(e.key==='Escape'){ close(); main.focus(); }
    });
  });

  // Protocole global : aucun corrigé détaillé avant une tentative réelle.
  document.querySelectorAll('details.correction').forEach(details=>{
    const scope=details.closest('article,section,.workbench,.exercise,.qcm-full,.stage-card')||details.parentElement;
    const fields=[...(scope?.querySelectorAll('textarea,input:not([type="hidden"]),select')||[])].filter(el=>!details.contains(el));
    if(!fields.length) return;

    const hasAttempt=()=>fields.some(el=>{
      if(el.matches('input[type="radio"],input[type="checkbox"]')) return el.checked;
      return String(el.value||'').trim().length>=2;
    });

    let note=null;
    const showNote=()=>{
      if(!note){
        note=document.createElement('p');
        note.className='micro correction-lock-note';
        note.textContent='Répondez d’abord. Le corrigé ne s’ouvre qu’après une tentative réelle.';
        details.insertAdjacentElement('beforebegin',note);
      }
    };

    details.addEventListener('toggle',()=>{
      if(details.open && !hasAttempt()){
        details.open=false;
        showNote();
      }else if(details.open && note){
        note.remove();
        note=null;
      }
    });
  });

  // Attribution légère pour les formulaires Netlify : page d'arrivée, source et campagne.
  const params=new URLSearchParams(location.search);
  document.querySelectorAll('form[data-netlify="true"]').forEach(form=>{
    const values={
      landing_page:location.pathname+location.search,
      source:params.get('utm_source')||params.get('source')||(document.referrer?new URL(document.referrer).hostname:'direct'),
      campaign:params.get('utm_campaign')||'',
      referrer:document.referrer||''
    };
    Object.entries(values).forEach(([name,value])=>{
      const field=form.querySelector('[name="'+name+'"]');
      if(field) field.value=value;
    });
  });

  if(!document.querySelector('footer.site-footer')){
    const footer=document.createElement('footer');
    footer.className='site-footer';
    footer.innerHTML='<div class="wrap"><a href="plan-du-site.html">Plan du site</a><a href="apropos.html">La démarche</a><a href="mentions-legales.html">Mentions légales</a><a href="confidentialite.html">Confidentialité</a><a href="cgv.html">CGV</a></div>';
    document.body.appendChild(footer);
  }

  if(!location.pathname.includes('/annales/') && document.querySelector('[data-feedback-kind], [data-feedback-instruction]')){
    const feedbackScript=document.createElement('script');
    feedbackScript.src='free-response.js';
    feedbackScript.async=true;
    document.body.appendChild(feedbackScript);
  }
});