document.addEventListener('DOMContentLoaded',()=> {
  const header=document.querySelector('header.top');
  if(!header) return;
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const is=(names)=>names.some(n=>path===n);
  const active=(names)=>is(names)?' active':'';
  header.innerHTML=`
  <div class="wrap mast mast-v2">
    <a class="brand brand-v2" href="index.html">BAC & BREVET<br>FRANÇAIS</a>
    <div class="nav-portals" aria-label="Accès principaux">
      <a class="portal${active(['bac.html','bac-oral.html','mode-bac.html','dissertation.html'])}" href="bac.html"><span>Bac</span><small>écrit · oral · annales</small></a>
      <a class="portal${active(['brevet.html','brevet-comprehension.html','brevet-grammaire.html','brevet-reecriture.html','brevet-redaction.html'])}" href="brevet.html"><span>Brevet</span><small>comprendre · manipuler · rédiger</small></a>
      <a class="portal${active(['eleves.html','gammes.html','entrainement.html','parcours.html','diagnostic.html','bibliotheque.html','hialmar.html','joujou-du-pauvre.html','cioran-spermatozoide.html','aphorismes-problematique.html'])}" href="eleves.html"><span>Élèves</span><small>textes · exercices · corrigés</small></a>
      <a class="portal${active(['enseignants.html','formation.html'])}" href="enseignants.html"><span>Enseignants</span><small>séquences · ressources · formation</small></a>
    </div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>
  </div>
  <div id="site-menu" class="site-menu" hidden>
    <div class="wrap site-menu-grid">
      <div><span class="menu-kicker">Travailler</span><a href="methode.html">Méthode</a><a href="gammes.html">Gammes</a><a href="parcours.html">Parcours complet</a><a href="diagnostic.html">Diagnostic</a></div>
      <div><span class="menu-kicker">Textes</span><a href="bibliotheque.html">Bibliothèque</a><a href="annales.html">Annales officielles</a><a href="joujou-du-pauvre.html">Baudelaire</a><a href="hialmar.html">Hialmar</a></div>
      <div><span class="menu-kicker">Le site</span><a href="offre.html">Accès gratuit / complet</a><a href="formation.html">Formation</a><a href="apropos.html">À propos</a><a href="contact.html">Contact</a></div>
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