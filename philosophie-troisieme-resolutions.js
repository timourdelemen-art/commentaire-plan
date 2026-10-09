/* Gamme de troisième partie : comparer plusieurs résolutions sans prétendre les noter automatiquement. */
(()=>{
const root=document.getElementById('resolutions-app');if(!root)return;
const cases=[
 {sujet:'Être libre, est-ce faire ce que l’on veut ?',i:'Faire ce que je veux paraît manifester ma liberté ; mais mes désirs peuvent m’être imposés par des causes que j’ignore.',ii:'Prendre distance avec mes désirs paraît me libérer ; mais vouloir m’affranchir de toute détermination rend l’action elle-même incompréhensible.',question:'Comment une action déterminée peut-elle néanmoins être la mienne ?',pistes:[
 {titre:'Distinguer désir immédiat et volonté réfléchie',gain:'Garde la possibilité d’agir et l’exigence de ne pas suivre aveuglément chaque désir.',cout:'La réflexion peut elle-même être déterminée : comment reconnaître des raisons vraiment miennes ?',analyse:'Une piste forte si la réflexion transforme le rapport aux causes, plutôt que de prétendre les supprimer.'},
 {titre:'Opposer la liberté au déterminisme',gain:'Affirme clairement la valeur de l’indépendance.',cout:'Ne répond pas à la difficulté : comment agir sans aucune cause ni raison ?',analyse:'Piste insuffisante ici : elle efface l’acquis de la deuxième partie.'},
 {titre:'Distinguer liberté politique et liberté intérieure',gain:'Montre deux dimensions importantes de la liberté.',cout:'Peut déplacer le sujet sans résoudre la question de l’origine de ma volonté.',analyse:'Piste possible à condition de prouver pourquoi cette distinction traite précisément la double aporie.'}
 ],prefer:0,conclusion:'Être libre ne signifie pas agir sans causes, mais pouvoir examiner et reconnaître les raisons de son action. Reste à savoir comment distinguer une raison que je fais mienne d’une influence dont je ne perçois pas la force.'},
 {sujet:'La science doit-elle être utile ?',i:'Exiger l’utilité paraît justifier les moyens consacrés à la recherche ; mais une découverte majeure peut être impossible à prévoir.',ii:'Défendre une recherche libre permet l’inattendu ; mais peut-elle se soustraire à toute responsabilité envers ceux qui la rendent possible ?',question:'Comment préserver l’indépendance de la recherche sans renoncer à répondre de ses effets ?',pistes:[
 {titre:'Distinguer la recherche et ses applications',gain:'Protège l’enquête libre et demande des comptes sur les usages.',cout:'Les choix de recherche et leur financement ont déjà des conséquences avant toute application.',analyse:'Distinction utile, mais sa frontière n’est pas absolue.'},
 {titre:'Imposer une utilité immédiate à chaque recherche',gain:'Rend l’objectif social immédiatement lisible.',cout:'Sacrifie les découvertes imprévisibles que la première partie a rendues nécessaires.',analyse:'Piste trop coûteuse : elle revient au premier camp sans traiter sa limite.'},
 {titre:'Penser une responsabilité publique sans utilité prédéfinie',gain:'Maintient la liberté des questions tout en exigeant des justifications sur les moyens et les risques.',cout:'Qui peut légitimement fixer les limites d’une recherche dont les bénéfices sont encore inconnus ?',analyse:'Résolution défendable si la délibération publique ne se transforme pas en censure de l’inconnu.'}
 ],prefer:2,conclusion:'La science ne doit pas être réduite à une utilité connue d’avance, mais sa liberté ne la dispense pas de répondre publiquement de ses moyens et de ses risques. Reste à savoir qui peut décider des limites d’une recherche dont les découvertes sont, par définition, imprévisibles.'}
];
let index=0,chosen=-1;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
 const d=cases[index];
 root.innerHTML='<p><strong>Sujet '+(index+1)+' sur '+cases.length+' :</strong> '+esc(d.sujet)+'</p>'+
 '<p><strong>I.</strong> '+esc(d.i)+'</p><p><strong>II.</strong> '+esc(d.ii)+'</p><p><strong>Le reste commun :</strong> '+esc(d.question)+'</p>'+
 '<p><strong>Quelle piste traiteriez-vous en priorité ?</strong> Toutes les pistes ne se valent pas, mais plusieurs peuvent éclairer le problème.</p>'+
 '<div class="chaine-opts">'+d.pistes.map((p,k)=>'<button type="button" class="chaine-opt" data-piste="'+k+'" aria-pressed="'+(chosen===k)+'">'+esc(p.titre)+'</button>').join('')+'</div>'+
 '<div id="resolutions-retour" class="chaine-fb" aria-live="polite"></div>'+
 '<p><button type="button" class="btn red small" id="resolutions-change">Autre sujet →</button> <button type="button" class="home-text-link" id="resolutions-reset">Recommencer ce sujet</button></p>';
 root.querySelectorAll('[data-piste]').forEach(b=>b.addEventListener('click',()=>{chosen=Number(b.dataset.piste);render();feedback();}));
 root.querySelector('#resolutions-change').addEventListener('click',()=>{index=(index+1)%cases.length;chosen=-1;render();});
 root.querySelector('#resolutions-reset').addEventListener('click',()=>{chosen=-1;render();});
}
function feedback(){
 const d=cases[index],p=d.pistes[chosen],f=root.querySelector('#resolutions-retour');
 f.className='chaine-fb show def';
 f.innerHTML='<p><strong>Ce que cette piste sauve :</strong> '+esc(p.gain)+'</p><p><strong>Son coût :</strong> '+esc(p.cout)+'</p><p><strong>À discuter :</strong> '+esc(p.analyse)+'</p>'+
 '<p><strong>Votre tâche :</strong> avant de regarder le modèle, expliquez pourquoi vous conserveriez cette piste ou lui préféreriez une autre. Puis écrivez la question qui subsiste.</p>'+
 '<label for="resolutions-note"><strong>Votre justification et votre reste</strong></label><textarea id="resolutions-note" rows="4"></textarea>'+
 '<p><button type="button" class="btn red small" id="resolutions-model">Comparer après mon essai</button></p><div id="resolutions-model-output" aria-live="polite"></div>';
 f.querySelector('#resolutions-model').addEventListener('click',()=>{
 const t=f.querySelector('#resolutions-note').value.trim(),o=f.querySelector('#resolutions-model-output');
 if(t.length<15){o.textContent='Écrivez d’abord une justification et un reste précis (au moins quelques mots).';return;}
 o.innerHTML='<p><strong>Une préférence argumentable :</strong> '+esc(d.pistes[d.prefer].titre)+'. '+esc(d.pistes[d.prefer].analyse)+'</p><p><strong>Une conclusion possible :</strong> '+esc(d.conclusion)+'</p><p class="micro">Ce modèle n’est pas une correction automatique : comparez ce que vous avez effectivement justifié, sauvé et laissé ouvert.</p>';
 });
}
render();
})();