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
  const bacPages=['bac.html','anthologie-bac.html','bac-commentaire.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','bac-dissertation.html','bac-dissertation-methode.html','bac-oral.html','bac-mode-examen.html','commentaire-bac-methode.html','commentaire-bac-problematique.html','commentaire-bac-plan.html','commentaire-bac-procedes-effets.html','commentaire-bac-introduction.html','commentaire-bac-transition.html','commentaire-bac-conclusion.html','oeuvres-integrales.html','pot-bouille.html','pot-bouille-bac-2027.html','pot-bouille-pb01.html','pot-bouille-pb02.html','pot-bouille-pb03.html'];
  const philoPages=['philosophie.html','dissertation-philosophie-bac.html','philosophie-dissertation.html','philosophie-dissertation-entrainement.html','philosophie-problematisation.html','philosophie-operations.html','philosophie-penser-par-soi-meme.html','philosophie-references.html','philosophie-laboratoire.html','philosophie-diagnostic.html','philosophie-annales.html','philosophie-annale.html','philosophie-notions.html','philosophie-troisieme-resolutions.html'];
  const hlpPages=['hlp.html','hlp-premiere.html','hlp-terminale.html','hlp-annales.html'];
  const brevetPages=['brevet.html','anthologie-brevet.html','brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html','brevet-redaction.html','brevet-imagination.html','brevet-reflexion.html'];
  const teacherPages=['enseignants.html','hlp-professeurs.html','formation.html','bibliotheque.html','pot-bouille-professeurs.html','sequence-pot-bouille.html'];
  const manualPages=['methode-cours.html','methode-brevet.html','methode-seconde.html','methode-hlp.html','manuel-procedes.html','bac-commentaire-procedes.html','bac-commentaire-procedes-entrainement.html','parcours.html'];
  const is=(names)=>names.includes(path)||(names===hlpPages&&/^hlp-(\d{4}|sujet-zero)-/.test(path))||(names===philoPages&&/^philosophie-/.test(path));

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
const portals=navigation.map(([href,label,sub,items])=>portal(href,label,sub,items,navigationActive(href,path)?'active':'')).join('');

  if(!header.innerHTML.trim()) header.innerHTML=`
  <div class="wrap mast mast-v3">
    <div class="brand-signature"><a class="brand brand-v2" href="index.html">COMMENTAIRE<br>PLAN</a><a class="site-wink" href="/clin-oeil.html" aria-label="Le clin d’œil philosophique du site" title="Une pause métaphysique"><img src="/assets/clin-oeil-heidegger-120.webp" width="42" height="53" alt="" decoding="async"></a></div>
    <nav class="nav-portals" aria-label="Navigation principale">
      ${portals}
    </nav>
    <button class="mobile-nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
  </div>
  <nav id="mobile-nav" class="mobile-nav wrap" aria-label="Navigation mobile" hidden>
    <a href="bac.html"><strong>Bac français</strong><span>Commentaire · dissertation · oral</span></a>
    <a href="philosophie.html"><strong>Philosophie</strong><span>Méthode · exercices · annales</span></a>
    <a href="hlp.html"><strong>HLP</strong><span>Première · Terminale · annales</span></a>
    <a href="brevet.html"><strong>Brevet</strong><span>Compréhension · langue · rédaction</span></a>
    <a href="bibliotheque.html"><strong>Bibliothèque</strong><span>Littérature · philosophie</span></a>
    <a href="annales.html"><strong>Annales</strong><span>Sujets officiels et corrigés</span></a>
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
      if(e.key==='Escape'){ e.preventDefault(); main.focus(); close(); }
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

    const clearNote=()=>{ if(note && hasAttempt()){ note.remove(); note=null; } };
    fields.forEach(el=>{ el.addEventListener('input',clearNote); el.addEventListener('change',clearNote); });
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
  let firstPage=location.pathname+location.search;
  try{ const k='cp-landing'; const v=sessionStorage.getItem(k); if(v) firstPage=v; else sessionStorage.setItem(k,firstPage); }catch(e){}
  document.querySelectorAll('form[data-netlify="true"]').forEach(form=>{
    const pageSource=form.querySelector('[name="source"]')?.value||'';
    const ext=document.referrer&&!document.referrer.includes(location.host)?new URL(document.referrer).hostname:'';
    const values={
      landing_page:firstPage,
      source:[params.get('utm_source')||params.get('source')||ext||'',pageSource||location.pathname.replace(/^\//,'')].filter(Boolean).join(' · '),
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
    footer.innerHTML='<div class="wrap"><a href="enseignants.html">Enseignants</a><a href="methode-cours.html">Méthodes</a><a href="plan-du-site.html">Plan du site</a><a href="apropos.html">La démarche</a><a href="offre.html">L’offre</a><a href="contact.html">Contact</a><a href="mentions-legales.html">Mentions légales</a><a href="confidentialite.html">Confidentialité</a><a href="cgv.html">CGV</a></div>';
    document.body.appendChild(footer);
  }

  /* Dictée : seulement si le navigateur sait transcrire la voix, et jamais en mode examen. */
  if((window.SpeechRecognition||window.webkitSpeechRecognition) && !/mode-examen|bac-oral/.test(location.pathname)){
    const d=document.createElement('script'); d.src='/dictee.js'; d.async=true; document.body.appendChild(d);
  }

  if(!location.pathname.includes('/annales/') && document.querySelector('[data-feedback-kind], [data-feedback-instruction]')){
    const feedbackScript=document.createElement('script');
    feedbackScript.src='free-response.js';
    feedbackScript.async=true;
    document.body.appendChild(feedbackScript);
  }
});
