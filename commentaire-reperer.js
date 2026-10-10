/* Repérer les éléments du plan : correction en couleurs d'un commentaire modèle.
   Source unique : le commentaire lui-même (<article class="model-commentary">). Dans ses phrases,
   un <span data-k="…"> marque un élément du plan :
     rep = réponse, nec = nécessité, tr = transition, rea = réalisation,
     el = éléments textuels, pro = procédés, eff = effets.
   Un procédé qui a une fiche dans le Petit manuel porte data-m="ancre" : il devient un lien
   vers manuel-procedes.html#ancre. La section <section data-reperer="id-du-commentaire">
   reçoit le bouton et la vue ; le texte est copié du commentaire, jamais réécrit. */
(function(){
  var CATS=[['rep','Réponse'],['nec','Nécessité'],['tr','Transition'],['rea','Réalisation'],['el','Éléments textuels'],['pro','Procédés'],['eff','Effets']];
  var OUVRIR='Voir la correction en couleurs', FERMER='Masquer la correction';
  function nb(s){return String(s).replace(/ ([:;!?»])/g,' $1').replace(/« /g,'« ');}
  function lier(root){
    [].slice.call(root.querySelectorAll('span[data-m]')).forEach(function(s){
      var a=document.createElement('a');
      [].slice.call(s.attributes).forEach(function(x){a.setAttribute(x.name,x.value);});
      a.href='manuel-procedes.html#'+s.getAttribute('data-m');
      a.className='rep-manuel';a.title='Fiche du Petit manuel des procédés';
      a.innerHTML=s.innerHTML;s.parentNode.replaceChild(a,s);
    });
  }
  function marge(h){
    if(!h||h==='TRANSITION')return '';
    var m=/^RÉPONSE\s+(.+)$/.exec(h);
    return m?m[1]:h;
  }
  function build(sec,n){
    var art=document.getElementById(sec.getAttribute('data-reperer'));
    var zone=sec.querySelector('.rep-zone');
    if(!art||!zone)return;
    var view=document.createElement('div');
    view.className='rep-view';view.id='rep-vue-'+n;view.hidden=true;
    /* légende : une étiquette par élément ; toucher une étiquette n'affiche que cet élément */
    var leg=document.createElement('div');leg.className='rep-chips';leg.setAttribute('role','group');leg.setAttribute('aria-label','Légende : afficher un seul élément');
    var solo=null,chips={};
    function maj(){
      CATS.forEach(function(c){
        var on=!solo||solo===c[0];
        view.classList.toggle('rep-off-'+c[0],!on);
        chips[c[0]].setAttribute('aria-pressed',on?'true':'false');
      });
      tout.hidden=!solo;
    }
    CATS.forEach(function(c){
      var b=document.createElement('button');b.type='button';b.className='rep-chip';b.setAttribute('data-k',c[0]);
      b.textContent=c[1];b.addEventListener('click',function(){solo=(solo===c[0])?null:c[0];maj();});
      chips[c[0]]=b;leg.appendChild(b);
    });
    var tout=document.createElement('button');tout.type='button';tout.className='rep-chip rep-tout';tout.textContent='Tout afficher';tout.hidden=true;
    tout.addEventListener('click',function(){solo=null;maj();});
    leg.appendChild(tout);
    view.appendChild(leg);
    [].slice.call(art.children).filter(function(c){return c.tagName==='P';}).forEach(function(p){
      var row=document.createElement('div');
      row.className='rep-p'+(p.classList.contains('transition-question')?' rep-p-tr':'');
      var m=document.createElement('span');m.className='rep-marge';m.textContent=marge(p.getAttribute('data-h'));
      var body=document.createElement('p');body.innerHTML=p.innerHTML;
      [].slice.call(body.querySelectorAll('[id]')).forEach(function(x){x.removeAttribute('id');});
      [].slice.call(body.querySelectorAll('[data-f]')).forEach(function(x){x.removeAttribute('data-f');});
      lier(body);
      var w=document.createTreeWalker(body,NodeFilter.SHOW_TEXT),x;
      while((x=w.nextNode()))x.nodeValue=nb(x.nodeValue);
      row.appendChild(m);row.appendChild(body);view.appendChild(row);
    });
    var b=document.createElement('button');b.type='button';b.className='philo-print rep-toggle';b.textContent=OUVRIR;
    b.setAttribute('aria-controls',view.id);b.setAttribute('aria-expanded','false');
    b.addEventListener('click',function(){
      var on=view.hidden;view.hidden=!on;
      b.textContent=on?FERMER:OUVRIR;b.setAttribute('aria-expanded',on?'true':'false');
    });
    zone.appendChild(b);zone.appendChild(view);
    maj();
  }
  function init(){[].slice.call(document.querySelectorAll('section[data-reperer]')).forEach(build);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
