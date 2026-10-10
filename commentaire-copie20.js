/* Commentaires à 20 : la fonction de chaque phrase d'un commentaire modèle.
   Source unique : la page elle-même. Dans <article class="model-commentary" data-c20>,
   chaque phrase est un <span data-f="fonction">, et un <p data-h="TITRE"> ouvre un bloc.
   Le script construit la vue annotée avec les classes des copies à 20 de philosophie
   (.c20, .c20-block, .c20-h, .c20-s, .c20-t, .c20-f) et le bouton qui l'affiche.
   Le texte du commentaire n'est jamais recopié ailleurs : il ne peut pas diverger. */
(function(){
  var OUVRIR='Voir la fonction de chaque phrase', FERMER='Revenir au commentaire seul';
  /* typographie : espace insécable avant : ; ! ? » et après « */
  function nb(s){return String(s).replace(/ ([:;!?»])/g,'\u00a0$1').replace(/« /g,'«\u00a0');}
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=nb(txt);return e;}
  function build(art,n){
    var ps=[].slice.call(art.children).filter(function(c){return c.tagName==='P';});
    if(!ps.length)return;
    var view=el('div','c20 c20c-view');view.id='c20c-vue-'+n;view.hidden=true;
    var block=null;
    ps.forEach(function(p){
      if(p.hasAttribute('data-h')||!block){
        block=el('div','c20-block');
        if(p.getAttribute('data-h'))block.appendChild(el('h3','c20-h',p.getAttribute('data-h')));
        view.appendChild(block);
      }
      [].slice.call(p.querySelectorAll('[data-f]')).forEach(function(s){
        var line=el('p','c20-s'),t=el('span','c20-t');
        t.innerHTML=s.innerHTML;
        var w=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),x;
        while((x=w.nextNode()))x.nodeValue=nb(x.nodeValue);
        line.appendChild(t);line.appendChild(el('span','c20-f',s.getAttribute('data-f')));
        block.appendChild(line);
      });
    });
    var bar=el('div','c20c-bar');
    var b=el('button','philo-print c20c-toggle',OUVRIR);
    b.type='button';b.setAttribute('aria-controls',view.id);b.setAttribute('aria-expanded','false');
    var aide=el('p','c20c-aide','Chaque phrase, avec ce qu’elle fait dans la démonstration : ce que le texte installe, le « pourtant », la réponse de chaque partie, les réalisations, les transitions.');
    bar.appendChild(b);bar.appendChild(aide);
    var label=art.querySelector(':scope > .label');
    art.insertBefore(bar,label?label.nextSibling:art.firstChild);
    art.appendChild(view);
    function set(on){
      view.hidden=!on;art.classList.toggle('c20c-on',on);
      b.textContent=on?FERMER:OUVRIR;b.setAttribute('aria-expanded',on?'true':'false');
    }
    b.addEventListener('click',function(){set(view.hidden);});
    if(location.hash==='#'+art.id&&n===0)set(true);
  }
  function init(){[].slice.call(document.querySelectorAll('article.model-commentary[data-c20]')).forEach(build);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
