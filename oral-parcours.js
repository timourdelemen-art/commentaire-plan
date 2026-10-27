/* Choisir un support lisible et conserver les transcriptions, sans attendre le correcteur. */
document.addEventListener('DOMContentLoaded',()=>{
 const select=document.getElementById('oral-sample'),text=document.getElementById('oral-source-text'),status=document.getElementById('oral-source-status');if(!select||!text)return;
 const samples={
 'pot-bouille':{url:'bac-commentaire-zola-pot-bouille-cour.html',author:'Émile Zola',work:'Pot-Bouille',lines:'Chapitre VI · la cour des cuisines',grammar:'Analysez la proposition subordonnée « qui en charriait les hontes » dans la phrase sur « l’égout de la maison ».'},
 lancelot:{url:'bac-commentaire-lancelot-charrette.html',author:'Chrétien de Troyes',work:'Le Chevalier de la charrette',lines:'L’épisode de la charrette · traduction de travail',grammar:'Analysez la proposition commençant par « Si tu veux monter » dans la réplique du nain.'}
 };
 const label=text.closest('label'),editor=document.createElement('details'),summary=document.createElement('summary');editor.className='oral-editor';summary.textContent='Coller ou modifier le texte';editor.append(summary);label.before(editor);editor.append(label);editor.open=!text.value.trim();
 const preview=document.createElement('div');preview.className='oral-selected-text';preview.id='oral-selected-text';editor.before(preview);
 function renderText(){preview.replaceChildren();preview.hidden=editor.open||!text.value.trim();if(preview.hidden)return;for(const p of text.value.split(/\n\s*\n/)){const node=document.createElement('p');node.textContent=p;preview.append(node);}}
 editor.addEventListener('toggle',renderText);text.addEventListener('input',renderText);renderText();
 select.addEventListener('change',async()=>{
  const s=samples[select.value];if(!s){editor.open=true;text.focus();return;}
  select.disabled=true;status.textContent='Ouverture du texte…';
  try{const res=await fetch(s.url);if(!res.ok)throw Error();const doc=new DOMParser().parseFromString(await res.text(),'text/html');const body=doc.querySelector('#texte .programme-reading');if(!body)throw Error();text.value=[...body.querySelectorAll('p')].map(p=>p.textContent.trim()).join('\n\n');
   for(const [id,value]of [['oral-author',s.author],['oral-text-work',s.work],['oral-lines',s.lines],['oral-grammar-question',s.grammar]]){const el=document.getElementById(id);el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));}
   text.dispatchEvent(new Event('input',{bubbles:true}));editor.open=false;renderText();status.textContent='Texte prêt. Lisez-le, puis passez à la préparation.';
  }catch{status.textContent='Le texte n’a pas pu s’ouvrir. Vous pouvez le copier dans la zone de texte.';editor.open=true;}finally{select.disabled=false;}
 });
 const ids=['oral-grammar-question','oral-part1-transcript','oral-interview-transcript','oral-answer-transcript','oral-work'],key='oral-transcriptions-v2';let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{}
 for(const id of ids){const field=document.getElementById(id);if(typeof saved[id]==='string')field.value=saved[id];field.addEventListener('input',()=>{try{localStorage.setItem(key,JSON.stringify(Object.fromEntries(ids.map(id=>[id,document.getElementById(id).value]))));}catch{status.textContent='La sauvegarde est indisponible. Copiez votre texte et vos transcriptions pour les conserver.';}});}
 document.getElementById('oral-restart')?.addEventListener('click',()=>{try{localStorage.removeItem(key);localStorage.removeItem('oral-dialogue-v1');}catch{}},{capture:true});
 let pdfURL;document.getElementById('oral-pdf-file')?.addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;if(pdfURL)URL.revokeObjectURL(pdfURL);pdfURL=URL.createObjectURL(file);const a=document.createElement('a');a.href=pdfURL;a.target='_blank';a.rel='noopener';a.textContent='Ouvrir le PDF pour copier l’extrait ↗';status.replaceChildren(a,document.createTextNode(' Puis collez le passage dans la zone de texte.'));editor.open=true;});
});
