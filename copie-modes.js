/* Copies à 20 : deux modes de lecture, partout les mêmes.
   1. « La copie entière » : la copie telle qu’on la rend, en paragraphes justifiés,
      avec un alinéa, sans titres ni annotations.
   2. « La fonction de chaque phrase » : la même copie, phrase par phrase,
      avec le rôle de chaque phrase en marge.
   Le script lit la copie déjà présente dans la page (copies .c20, copies .mr-texte,
   commentaires .model-commentary) : le texte n’est jamais recopié dans une autre source.
   Les paragraphes viennent des blocs de la copie ; à défaut, des repères I.1, I.2…
   écrits dans les fonctions, ou des titres de partie. */
(function(){
  'use strict';
  var ENTIERE='La copie entière', FONCTIONS='La fonction de chaque phrase';
  var MIN=6; /* en dessous : un extrait, pas une copie */
  var n=0;

  function txt(node){
    var c=node.cloneNode(true);
    [].slice.call(c.querySelectorAll('.c20-f,.mr-note,[hidden]')).forEach(function(x){x.remove();});
    return c.innerHTML.trim();
  }
  function sub(f){var m=/^\s*(IV|III|II|I)\s*\.\s*(\d)/.exec(f||'');return m?m[1]+'.'+m[2]:'';}
  function isTransition(f){return /^\s*transition/i.test(f||'');}

  /* Copie au format .c20 : liste de paragraphes, chacun = liste de phrases HTML.
     Un paragraphe s’ouvre à chaque bloc, à chaque titre, à chaque transition,
     et quand le repère de sous-partie change (I.1, puis I.2…). */
  function parasC20(root){
    var out=[],cur=null,lastSub='',part=true,block=false;
    function open(np,tr){cur={s:[],newPart:np,tr:!!tr};out.push(cur);}
    [].slice.call(root.querySelectorAll('.c20-block,.c20-h,h2,h3,h4,.c20-s,.bridge,aside.transition')).forEach(function(e){
      if(e.classList.contains('c20-block')){block=true;return;}
      if(e.classList.contains('bridge')||e.matches('aside.transition')){var p=e.querySelector('p');if(p){open(true,true);cur.s.push(p.innerHTML.trim());}part=true;cur=null;return;}
      if(!e.classList.contains('c20-s')){if(!e.closest('.bridge,aside.transition')){part=true;lastSub='';}return;}
      var fe=e.querySelector('.c20-f'),f=fe?fe.textContent:'',sb=sub(f),tr=isTransition(f);
      if(!cur||part||block||tr||cur.tr||(sb&&lastSub&&sb!==lastSub)){
        open(part||tr||(cur&&cur.tr)||!cur,tr);
      }
      if(sb)lastSub=sb;
      part=false;block=false;
      cur.s.push(txt(e.querySelector('.c20-t')||e));
    });
    return out.filter(function(p){return p.s.length;});
  }
  function parasMr(root){
    var ps=[].slice.call(root.querySelectorAll('.mr-paragraphe'));
    return ps.map(function(p,i){
      var st=p.dataset.stage||'',pv=i?(ps[i-1].dataset.stage||''):'';
      return {s:[].slice.call(p.querySelectorAll('.mr-text')).map(txt),
        newPart:i>0&&(/^(Transition|Conclusion)/i.test(st)||/^(I|II|III)\.1\b/.test(st)||/^Transition/i.test(pv)||!/^(I|II|III)\.\d/.test(st))};
    });
  }
  /* Modèles des parcours (HLP, brevet) : .ecrire-copy > .ecrire-paragraph > [data-model-text]. */
  function parasEcrire(root){
    if(!root.querySelector('.ecrire-paragraph'))return [{s:[].slice.call(root.querySelectorAll('[data-model-text]')).map(function(t){return t.innerHTML.trim();}),newPart:false}];
    return [].slice.call(root.querySelectorAll('.ecrire-paragraph')).map(function(p,i){
      return {s:[].slice.call(p.querySelectorAll('[data-model-text]')).map(function(t){return t.innerHTML.trim();}),newPart:false};
    }).filter(function(p){return p.s.length;});
  }

  function plainView(paras){
    var d=document.createElement('div');d.className='cm-plain';d.lang='fr';
    paras.forEach(function(p,i){
      var e=document.createElement('p');
      if(p.newPart&&i)e.className='cm-part';
      e.innerHTML=p.s.join(' ');
      d.appendChild(e);
    });
    return d;
  }

  function bar(id){
    var b=document.createElement('div');b.className='cm-bar';b.setAttribute('role','group');b.setAttribute('aria-label','Mode de lecture de la copie');
    [ENTIERE,FONCTIONS].forEach(function(l,i){
      var x=document.createElement('button');x.type='button';x.className='cm-mode';x.textContent=l;
      x.setAttribute('aria-pressed',i?'false':'true');x.setAttribute('aria-controls',id);x.dataset.mode=i?'f':'e';
      b.appendChild(x);
    });
    return b;
  }

  function hideOldToggles(ids){
    [].slice.call(document.querySelectorAll('.dc20-toggle,.c20-toggle,.mr-toggle,.c20c-toggle,[data-annotations],#toggle-annotations')).forEach(function(t){
      var c=t.getAttribute('aria-controls')||(t.id==='toggle-annotations'?'copy':null);
      var ok=c?ids.indexOf(c)>-1:!!((t.closest('[data-model], details, section')||t.parentElement).querySelector('[data-cm]'));
      if(ok){t.hidden=true;t.classList.add('cm-old');}
    });
  }

  function setup(root,kind){
    if(root.dataset.cm)return null;
    var sentences=root.querySelectorAll(kind==='mr'?'.mr-phrase':kind==='ecrire'?'[data-model-text]':'.c20-s');
    if(sentences.length<(kind==='ecrire'?1:MIN))return null;
    if(root.closest('.home-proof-gap,.c20-locked,[data-cm="off"]'))return null;
    root.dataset.cm='1';
    if(!root.id)root.id='cm-copie-'+(n++);
    var paras=kind==='mr'?parasMr(root):kind==='ecrire'?parasEcrire(root):parasC20(root);
    var plain=plainView(paras);plain.id=root.id+'-entiere';
    root.parentNode.insertBefore(plain,root);
    var b=bar(root.id);
    root.parentNode.insertBefore(b,plain);
    function mode(f){
      plain.hidden=f;root.hidden=!f;
      if(kind==='c20'){root.classList.remove('c20-plain');}
      if(kind==='ecrire'){root.classList.remove('sans-annotations');}
      if(kind==='mr'){root.classList.toggle('mr-annotated',f);[].slice.call(root.querySelectorAll('.mr-note')).forEach(function(x){x.hidden=!f;});}
      root.classList.add('cm-detail');
      [].slice.call(b.children).forEach(function(x){x.setAttribute('aria-pressed',String((x.dataset.mode==='f')===f));});
    }
    b.addEventListener('click',function(e){var x=e.target.closest('.cm-mode');if(x)mode(x.dataset.mode==='f');});
    mode(false);
    return root.id;
  }

  /* Commentaires : le texte rédigé est déjà dans la page ; la vue annotée est construite
     par commentaire-copie20.js. On n’en garde ici que la commande commune. */
  function setupCommentaire(art){
    if(art.dataset.cm)return;
    var view=art.querySelector('.c20c-view'),old=art.querySelector('.c20c-toggle');
    if(!view||!old)return;
    art.dataset.cm='1';art.classList.add('cm-commentaire');
    var b=bar(view.id);
    old.parentNode.insertBefore(b,old);old.hidden=true;old.classList.add('cm-old');
    function mode(f){
      if(!view.hidden!==f)old.click();
      view.classList.add('cm-detail');
      [].slice.call(b.children).forEach(function(x){x.setAttribute('aria-pressed',String((x.dataset.mode==='f')===f));});
    }
    b.addEventListener('click',function(e){var x=e.target.closest('.cm-mode');if(x)mode(x.dataset.mode==='f');});
    mode(!view.hidden);
  }

  function init(){
    var ids=[];
    [].slice.call(document.querySelectorAll('.mr-texte')).forEach(function(r){var id=setup(r,'mr');if(id)ids.push(id);});
    [].slice.call(document.querySelectorAll('.ecrire-copy:not(.c20)')).forEach(function(r){var id=setup(r,'ecrire');if(id)ids.push(id);});
    var roots=[].slice.call(document.querySelectorAll('.c20')).filter(function(r){return !r.closest('.model-commentary')&&!r.parentElement.closest('.c20');});
    /* copies sans conteneur .c20 : les sections du corrigé intégral et leurs transitions */
    var flat=document.getElementById('corrige-integral'),wrap=flat&&flat.closest('section');
    if(wrap&&!wrap.closest('.c20')){
      var list=[];
      for(var e=wrap;e;e=e.nextElementSibling){
        var ok=e.querySelector('.c20-s')||e.classList.contains('bridge')||e.matches('aside.transition')||(e.tagName==='SECTION'&&!e.textContent.trim());
        if(!ok)break;list.push(e);
      }
      var host=document.createElement('div');host.className='c20 cm-flat';
      wrap.parentElement.insertBefore(host,wrap);
      list.forEach(function(x){host.appendChild(x);});
      roots.push(host);
    }
    roots.forEach(function(r){var id=setup(r,'c20');if(id)ids.push(id);});
    hideOldToggles(ids);
    [].slice.call(document.querySelectorAll('article.model-commentary')).forEach(setupCommentaire);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
