/* Pages de sujet : les étapes d’entraînement, une à la fois.
   Chaque étape : niveau 1 « Je choisis » (propositions au clic, chacune expliquée : Solide, Défendable, À revoir),
   puis niveau 2 « J’écris, sur un autre sujet » (la même opération sur un sujet que l’élève n’a pas vu).
   Le contenu (questions, propositions, explications, corrigés) est dans la page ; ce script ne fait que
   mélanger les propositions, afficher les retours et naviguer. Sans JavaScript, tout reste visible. */
(function(){
  'use strict';
  var LABEL={ok:'Solide',def:'Défendable',no:'À revoir'};
  function shuffle(box){var k=[].slice.call(box.children);for(var i=k.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=k[i];k[i]=k[j];k[j]=t;}k.forEach(function(x){box.appendChild(x);});}
  function btn(cls,txt){var b=document.createElement('button');b.type='button';b.className=cls;b.textContent=txt;return b;}

  function setupEtape(et){
    var qs=[].slice.call(et.querySelectorAll('.etape-q')),ecrit=et.querySelector('.etape-ecrit');
    qs.forEach(function(q,i){
      q.hidden=i>0;
      var opts=q.querySelector('.chaine-opts'),fb=q.querySelector('.chaine-fb');shuffle(opts);
      [].slice.call(opts.querySelectorAll('.chaine-opt')).forEach(function(b){
        b.addEventListener('click',function(){
          var v=b.dataset.v;
          [].slice.call(opts.querySelectorAll('.chaine-opt')).forEach(function(x){x.classList.remove('picked');});
          b.classList.add('picked',v);if(v==='no')b.disabled=true;
          fb.className='chaine-fb show '+v;fb.innerHTML='<strong>'+LABEL[v]+'.</strong> ';
          fb.appendChild(document.createTextNode(b.dataset.why||''));
          if(v==='no'){fb.appendChild(document.createTextNode(' Essayez une autre proposition.'));return;}
          if(v==='def')fb.appendChild(document.createTextNode(' Vous pouvez continuer, ou chercher une proposition plus précise.'));
          var last=i===qs.length-1,next=btn('btn red small',last?(et.closest('[data-etapes]').dataset.ecritLabel||'À vous d’écrire, sur un autre sujet →'):'Question suivante →');
          next.addEventListener('click',function(){
            if(last){ecrit.hidden=false;ecrit.scrollIntoView({behavior:'smooth',block:'start'});var ta=ecrit.querySelector('textarea');if(ta)ta.focus({preventScroll:true});}
            else{qs[i+1].hidden=false;qs[i+1].scrollIntoView({behavior:'smooth',block:'start'});}
            next.remove();
          });
          fb.appendChild(document.createElement('br'));fb.appendChild(next);
        });
      });
    });
    if(ecrit){
      ecrit.hidden=true;
      var direct=et.querySelector('.etape-direct');
      if(direct){direct.hidden=false;direct.addEventListener('click',function(){qs.forEach(function(q){q.hidden=false;});ecrit.hidden=false;ecrit.scrollIntoView({behavior:'smooth',block:'start'});});}
    }
  }

  function setup(root){
    var etapes=[].slice.call(root.querySelectorAll('.etape')),nav=[].slice.call(root.querySelectorAll('.etapes-nav [data-etape]'));
    if(!etapes.length)return;
    root.classList.add('etapes-actives');
    etapes.forEach(setupEtape);
    function show(n,scroll){
      etapes.forEach(function(e,i){e.hidden=i!==n;});
      nav.forEach(function(b,i){var on=i===n;b.setAttribute('aria-current',on?'step':'false');b.classList.toggle('on',on);});
      if(scroll)root.scrollIntoView({behavior:'smooth',block:'start'});
    }
    nav.forEach(function(b,i){b.addEventListener('click',function(){show(i,true);});});
    [].slice.call(root.querySelectorAll('.etape-suivante')).forEach(function(b){
      b.addEventListener('click',function(){var i=etapes.indexOf(b.closest('.etape'));show(Math.min(i+1,etapes.length-1),true);});
    });
    function fromHash(){var h=decodeURIComponent(location.hash.slice(1)),el=h&&document.getElementById(h);if(!el)return -1;var e=el.closest('.etape');return e?etapes.indexOf(e):-1;}
    var j=fromHash();show(j>=0?j:0,false);
    var top=root.closest('.onglet')||root;
    if(j>0)setTimeout(function(){top.scrollIntoView({block:'start'});},0);
    window.addEventListener('hashchange',function(){var k=fromHash();if(k>=0){show(k,false);top.scrollIntoView({block:'start'});}});
  }
  function init(){[].slice.call(document.querySelectorAll('[data-etapes]')).forEach(setup);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
