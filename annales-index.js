/* Les cartes existent sans JavaScript. Les filtres ne font que les masquer. */
(() => {
 const host=document.getElementById('transformedAnnales'), controls=document.getElementById('annalesControls');
 if(!host||!controls)return;
 const cards=[...host.querySelectorAll('[data-author]')];
 const author=document.getElementById('annales-author'), work=document.getElementById('annales-work');
 const count=document.getElementById('annales-count');
 function works(){
  work.replaceChildren(new Option('Toutes les œuvres','all'));
  [...new Set(cards.filter(c=>author.value==='all'||c.dataset.author===author.value).map(c=>c.dataset.work))].sort((a,b)=>a.localeCompare(b,'fr')).forEach(w=>work.add(new Option(w,w)));
 }
 function filter(){
  let n=0;cards.forEach(c=>{c.hidden=!(author.value==='all'||c.dataset.author===author.value)||!(work.value==='all'||c.dataset.work===work.value);if(!c.hidden)n++;});
  count.textContent=n+' texte'+(n>1?'s':'')+' disponible'+(n>1?'s':'');
 }
 author.addEventListener('change',()=>{works();filter();});work.addEventListener('change',filter);
 document.getElementById('annales-reset').addEventListener('click',()=>{author.value='all';works();filter();});
 controls.hidden=false;works();filter();
})();
