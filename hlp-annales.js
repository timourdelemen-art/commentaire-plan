/* Banque d'annales HLP : les fiches sont écrites dans le HTML par scripts/build-hlp.js.
   Ce script ajoute seulement les filtres (session, interprétation, entrée) et la recherche,
   en masquant ou affichant les fiches existantes. */
(()=>{
  const root=document.getElementById('hlpBank');
  if(!root) return;
  const cards=[...root.querySelectorAll('.hlp-card')];
  const count=root.querySelector('.hlp-count');
  if(!cards.length) return;
  const ENTREES=[
    ['edu','Éducation, transmission et émancipation'],
    ['sens','Les expressions de la sensibilité'],
    ['moi','Les métamorphoses du moi'],
    ['crea','Création, continuités et ruptures'],
    ['hist','Histoire et violence'],
    ['lim','L’humain et ses limites']
  ];
  const state={year:'all',interp:'all',entree:'all',q:''};
  const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();

  const filters=document.createElement('div');
  filters.className='hlp-filters';
  const group=(label,key,options)=>{
    const g=document.createElement('div');
    g.className='hlp-filter-group';
    g.setAttribute('role','group');
    g.setAttribute('aria-label',label);
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
        apply();
      });
      list.appendChild(b);
    });
    g.appendChild(list);
    return g;
  };
  const years=[...new Set(cards.map(c=>c.dataset.year))].sort((a,b)=>b-a);
  filters.appendChild(group('Session','year',[['all','Toutes'],...years.map(y=>[y,y==='2020'?'Sujets zéro':y])]));
  filters.appendChild(group('Interprétation','interp',[['all','Les deux'],['L','Littéraire'],['P','Philosophique']]));
  filters.appendChild(group('Entrée du programme','entree',[['all','Toutes'],...ENTREES]));
  const search=document.createElement('label');
  search.className='hlp-search';
  search.innerHTML='<span class="hlp-filter-label">Chercher un auteur, une œuvre, un mot de la question</span><input type="search" placeholder="Ex. : Rousseau, violence, lecture…" autocomplete="off">';
  search.querySelector('input').addEventListener('input',e=>{state.q=e.target.value;apply();});
  filters.appendChild(search);
  root.prepend(filters);

  function apply(){
    const words=norm(state.q).split(/\s+/).filter(Boolean);
    let n=0;
    cards.forEach(c=>{
      const ok=(state.year==='all'||c.dataset.year===state.year)
        &&(state.interp==='all'||c.dataset.interp===state.interp)
        &&(state.entree==='all'||c.dataset.entree===state.entree)
        &&words.every(w=>c.dataset.search.includes(w));
      c.hidden=!ok;
      if(ok) n++;
    });
    if(count) count.textContent=n?(n+' sujet'+(n>1?'s':'')+' sur '+cards.length):'Aucun sujet ne correspond à ces filtres.';
  }
  apply();
})();
