/* Onglets intérieurs des pages, dans le style du menu principal.
   Balisage : <div class="onglets" data-onglets data-defaut="entrainement">
     <div class="onglets-barre" role="tablist" aria-label="…"><button role="tab" aria-controls="sujet">Le sujet</button>…</div>
     <section class="onglet" role="tabpanel" id="sujet">…</section>…</div>
   Sans JavaScript, tous les panneaux restent visibles, les uns sous les autres.
   Une adresse par onglet : page.html#copie ouvre l’onglet « copie » (ou celui qui contient l’ancre). */
(function(){
  'use strict';
  function setup(box){
    if(box.classList.contains('onglets-actifs'))return;
    var tabs=[].slice.call(box.querySelectorAll(':scope > .onglets-barre [role="tab"]'));
    var panels=tabs.map(function(t){return document.getElementById(t.getAttribute('aria-controls'));});
    if(!tabs.length||panels.some(function(p){return !p;}))return;
    box.classList.add('onglets-actifs');
    tabs.forEach(function(t,i){
      t.type='button';t.id=t.id||'onglet-'+panels[i].id;
      panels[i].setAttribute('role','tabpanel');panels[i].setAttribute('aria-labelledby',t.id);panels[i].tabIndex=-1;
    });
    function show(i,focus,push){
      tabs.forEach(function(t,j){var on=i===j;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;panels[j].hidden=!on;});
      if(focus)tabs[i].focus();
      if(push&&history.replaceState)history.replaceState(null,'','#'+panels[i].id);
    }
    function fromHash(){
      var h=decodeURIComponent(location.hash.slice(1));if(!h)return -1;
      var el=document.getElementById(h);if(!el)return -1;
      for(var j=0;j<panels.length;j++){if(panels[j]===el||panels[j].contains(el))return j;}
      return -1;
    }
    var def=box.getAttribute('data-defaut'),start=fromHash();
    if(start<0)start=Math.max(0,panels.findIndex(function(p){return p.id===def;}));
    show(start,false,false);
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){show(i,false,true);});
      t.addEventListener('keydown',function(e){
        var k=e.key,n=tabs.length,j=null;
        if(k==='ArrowRight')j=(i+1)%n;else if(k==='ArrowLeft')j=(i+n-1)%n;else if(k==='Home')j=0;else if(k==='End')j=n-1;
        if(j!==null){e.preventDefault();show(j,true,true);}
      });
    });
    /* Un lien interne vers un onglet (ou vers une ancre qu’il contient) l’ouvre. */
    document.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
      var id=decodeURIComponent(a.getAttribute('href').slice(1)),el=id&&document.getElementById(id);if(!el)return;
      for(var j=0;j<panels.length;j++){if(panels[j]===el||panels[j].contains(el)){show(j,false,false);break;}}
    });
    window.addEventListener('hashchange',function(){var j=fromHash();if(j>=0)show(j,false,false);});
  }
  function init(){[].slice.call(document.querySelectorAll('[data-onglets]')).forEach(setup);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
