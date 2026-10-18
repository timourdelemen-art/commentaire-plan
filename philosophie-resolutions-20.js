/* Exercices de plan : comprendre chaque geste avant de comparer des troisièmes parties. */
(()=>{
 const root=document.getElementById('resolutions-20-app'),data=window.PHILO_RESOLUTION_CASES;
 if(!root||!data)return;
 let idx=0,stage=0,chosen=null,checked=false;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const steps=[
  ['Comprendre la première partie','Repérez la réponse qui paraît d’abord juste et ce qu’elle ne suffit pas à expliquer.'],
  ['Comprendre la deuxième partie','Repérez la réponse opposée et sa propre difficulté.'],
  ['Choisir une troisième partie','Comparez trois façons de conserver ce que les deux parties ont établi.'],
  ['Préparer la conclusion','Formulez la difficulté que votre solution laisse ouverte.']
 ];
 function render(){
  const d=data.cases[idx],step=steps[stage];
  root.innerHTML='<label for="res20-sujet"><strong>Choisissez une dissertation</strong></label><select id="res20-sujet">'+data.cases.map((x,i)=>'<option value="'+i+'"'+(idx===i?' selected':'')+'>'+esc(x.subject)+'</option>').join('')+'</select>'+
   '<p class="micro">Étape '+(stage+1)+' sur 4</p><h3>'+esc(step[0])+'</h3><p>'+esc(step[1])+'</p>'+
   '<p><strong>Le problème :</strong> '+esc(d.requirements[0])+' ; mais aussi '+esc(d.requirements[1])+'.</p>'+
   '<div id="res20-work"></div><p id="res20-actions"><button type="button" id="res20-back"'+(stage===0?' disabled':'')+'>← Étape précédente</button> <button type="button" id="res20-next"'+(stage===3?' disabled':'')+'>Étape suivante →</button></p>';
  root.querySelector('#res20-sujet').addEventListener('change',e=>{idx=Number(e.target.value);stage=0;chosen=null;checked=false;render()});
  root.querySelector('#res20-back').addEventListener('click',()=>{stage--;chosen=null;checked=false;render()});
  root.querySelector('#res20-next').addEventListener('click',()=>{stage++;chosen=null;checked=false;render()});
  const w=root.querySelector('#res20-work');
  if(stage===0||stage===1){const part=stage===0?d.first:d.second;w.innerHTML='<p><strong>La réponse :</strong> '+esc(part.idea)+'</p><p><strong>Sa limite :</strong> '+esc(part.limit)+'</p><label for="res20-reason">En une phrase, pourquoi faut-il poursuivre ?</label><textarea id="res20-reason" rows="3"></textarea><details><summary>Comparer avec le corrigé</summary><p>La limite ne détruit pas tout ce que la partie établit : elle oblige à chercher une réponse qui préserve aussi '+esc(stage===0?d.requirements[1]:d.requirements[0])+'.</p></details>';return}
  if(stage===2){
   w.innerHTML='<p><strong>Que doit sauver la suite ?</strong> '+esc(d.requirements[0])+' et '+esc(d.requirements[1])+'.</p><div class="chaine-opts">'+d.solutions.map((s,i)=>'<button type="button" class="chaine-opt" data-solution="'+i+'" aria-pressed="'+(chosen===i)+'">'+esc(s.title)+'</button>').join('')+'</div><div id="res20-feedback" aria-live="polite"></div>';
   w.querySelectorAll('[data-solution]').forEach(b=>b.addEventListener('click',()=>{chosen=Number(b.dataset.solution);checked=false;render();feedback()}));
   if(chosen!==null)feedback();
   return;
  }
  w.innerHTML='<p><strong>La difficulté de la solution retenue :</strong> '+esc(d.solutions.find(s=>s.id===d.preferred)?.cost||'')+'</p><label for="res20-conclusion">Transformez cette difficulté en question, en une phrase.</label><textarea id="res20-conclusion" rows="3"></textarea><details><summary>Comparer après votre essai</summary><p>'+esc(d.conclusion)+'</p></details>';
 }
 function feedback(){
  const d=data.cases[idx],s=d.solutions[chosen],f=root.querySelector('#res20-feedback');if(!f)return;
  f.innerHTML='<p><strong>Ce que cette réponse préserve :</strong> '+esc(s.keeps.join(' ; '))+'.</p><p><strong>Son prix :</strong> '+esc(s.cost)+'</p><p><strong>Ce qui reste difficile :</strong> '+esc(s.remaining)+'</p><label for="res20-why">Pourquoi garderiez-vous cette solution ? Une phrase.</label><textarea id="res20-why" rows="3"></textarea><button type="button" id="res20-compare">Comparer après mon essai</button><div id="res20-model" aria-live="polite"></div>';
  f.querySelector('#res20-compare').addEventListener('click',()=>{
   const value=f.querySelector('#res20-why').value.trim(),target=f.querySelector('#res20-model');
   if(value.length<12){target.textContent='Écrivez d’abord une justification en une phrase.';return}
   target.innerHTML='<p><strong>Une solution défendable :</strong> '+esc(d.solutions.find(x=>x.id===d.preferred)?.title||'')+'</p><p>'+esc(d.reason)+'</p><p class="micro">Ce choix reste à confronter aux autres possibilités. Une réponse différente peut être solide si vous justifiez ce qu’elle conserve, son prix et sa limite.</p>';
  });
 }
 render();
})();
