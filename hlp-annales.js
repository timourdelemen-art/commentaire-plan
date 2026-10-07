/* Banque d'annales HLP : filtres (année, interprétation, entrée, recherche) et cartes.
   Le conteneur porte data-audience="eleve" ou "prof" : la version professeur ajoute
   le code d'examen, l'entrée du programme, les éléments de correction et un bilan par entrée. */
(()=>{
  const root=document.getElementById('hlpBank');
  if(!root) return;
  const data=(window.HLP_ANNALES||[]).slice().sort((a,b)=>b.y-a.y||a.c.localeCompare(b.c,'fr')||a.j-b.j||(a.n||0)-(b.n||0));
  const entrees=window.HLP_ENTREES||{};
  const prof=root.dataset.audience==='prof';
  const state={year:'all',interp:'all',entree:'all',q:''};

  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
  const interpLabel=x=>x.it==='L'?'Interprétation littéraire':'Interprétation philosophique';
  const essaiLabel=x=>x.it==='L'?'Essai philosophique':'Essai littéraire';
  const when=x=>{
    if(x.s==='zero') return 'Sujet zéro';
    let t=x.y+' · '+x.c;
    if(x.j) t+=' · jour '+x.j;
    if(x.s==='remplacement') t+=' · remplacement';
    return t;
  };

  const filters=document.createElement('div');
  filters.className='hlp-filters';
  const group=(label,key,options)=>{
    const g=document.createElement('div');
    g.className='hlp-filter-group';
    g.innerHTML='<span class="hlp-filter-label">'+label+'</span>';
    const list=document.createElement('div');
    list.className='manual-choice-list';
    options.forEach(([value,text])=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='manual-choice'+(state[key]===value?' selected':'');
      b.textContent=text;
      b.setAttribute('aria-pressed',String(state[key]===value));
      b.addEventListener('click',()=>{
        state[key]=value;
        list.querySelectorAll('button').forEach(x=>{const on=x===b;x.classList.toggle('selected',on);x.setAttribute('aria-pressed',String(on));});
        render();
      });
      list.appendChild(b);
    });
    g.appendChild(list);
    return g;
  };
  const years=[...new Set(data.map(x=>x.y))].sort((a,b)=>b-a);
  filters.appendChild(group('Session','year',[['all','Toutes'],...years.map(y=>[String(y),y===2020?'Sujet zéro':String(y)])]));
  filters.appendChild(group('Interprétation','interp',[['all','Les deux'],['L','Littéraire'],['P','Philosophique']]));
  filters.appendChild(group('Entrée du programme','entree',[['all','Toutes'],...Object.entries(entrees).map(([k,v])=>[k,v.label])]));
  const search=document.createElement('label');
  search.className='hlp-search';
  search.innerHTML='<span class="hlp-filter-label">Chercher un auteur, une œuvre, un mot de la question</span><input type="search" placeholder="Ex. : Rousseau, violence, lecture…" autocomplete="off">';
  search.querySelector('input').addEventListener('input',e=>{state.q=e.target.value;render();});
  filters.appendChild(search);

  const count=document.createElement('p');
  count.className='hlp-count';
  count.setAttribute('aria-live','polite');
  const list=document.createElement('div');
  list.className='hlp-bank';
  root.append(filters,count,list);

  function card(x){
    const e=entrees[x.e];
    const art=document.createElement('article');
    art.className='hlp-card';
    art.id='sujet-'+x.id;
    const work='<em>'+esc(x.w)+'</em>'+(x.d?' ('+esc(x.d)+')':'')+(x.tr?', trad. '+esc(x.tr):'');
    let html='<header><span class="hlp-when">'+esc(when(x))+(x.n?' · sujet '+x.n+' au choix':'')+'</span>';
    if(prof && x.code) html+='<span class="hlp-code">'+esc(x.code)+'</span>';
    html+='</header>';
    html+='<h3>'+esc(x.a)+'</h3><p class="hlp-work">'+work+'</p>';
    html+='<dl><dt>'+interpLabel(x)+'</dt><dd>'+esc(x.iq)+'</dd><dt>'+essaiLabel(x)+'</dt><dd>'+esc(x.eq)+'</dd></dl>';
    if(e) html+='<p class="hlp-entree">'+(prof?'Entrée : ':'')+esc(e.label)+' <span>· '+esc(e.sem)+'</span></p>';
    html+='<div class="hlp-actions">';
    if(x.src==='page') html+='<a href="'+esc(x.pdf)+'" rel="noopener">Sujets 2026 du ministère ↗</a>';
    else html+='<a href="'+esc(x.pdf)+'" rel="noopener">Lire le sujet et le texte (PDF) ↗</a>';
    if(prof && x.cor) html+='<a href="'+esc(x.cor)+'" rel="noopener">Éléments de correction (PDF) ↗</a>';
    html+='</div>';
    art.innerHTML=html;
    return art;
  }

  function matches(x){
    if(state.year!=='all' && String(x.y)!==state.year) return false;
    if(state.interp!=='all' && x.it!==state.interp) return false;
    if(state.entree!=='all' && x.e!==state.entree) return false;
    if(state.q.trim()){
      const hay=norm([x.a,x.w,x.iq,x.eq,x.c,x.code,(entrees[x.e]||{}).label].join(' '));
      if(!norm(state.q).split(/\s+/).filter(Boolean).every(w=>hay.includes(w))) return false;
    }
    return true;
  }

  function render(){
    const shown=data.filter(matches);
    list.innerHTML='';
    shown.forEach(x=>list.appendChild(card(x)));
    count.textContent=shown.length?(shown.length+' sujet'+(shown.length>1?'s':'')+' sur '+data.length):'Aucun sujet ne correspond à ces filtres.';
  }
  render();

  /* Bilan par entrée, pour la page professeur. */
  const stats=document.getElementById('hlpStats');
  if(stats){
    const rows=Object.entries(entrees).map(([k,v])=>{
      const xs=data.filter(x=>x.e===k);
      const L=xs.filter(x=>x.it==='L').length;
      return '<tr><td>'+esc(v.label)+'</td><td>'+esc(v.sem)+'</td><td>'+xs.length+'</td><td>'+L+'</td><td>'+(xs.length-L)+'</td></tr>';
    }).join('');
    stats.innerHTML='<table class="hlp-stats"><thead><tr><th>Entrée</th><th>Semestre</th><th>Sujets</th><th>Interpr. littéraire</th><th>Interpr. philosophique</th></tr></thead><tbody>'+rows+'</tbody></table>';
  }
})();
