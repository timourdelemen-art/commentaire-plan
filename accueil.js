/* Une destination précise selon le niveau et le geste choisi. Démonstration locale. */
(()=>{'use strict';
 const routes={
 francais:[['Comprendre un texte','bac-commentaire-leconte-de-lisle-hialmar.html#etape-probleme','Un texte, une question, des choix expliqués.'],['Préparer une dissertation','bac-dissertation.html#diss-demarrer','Choisir votre œuvre et travailler un sujet.'],['Préparer l’oral','bac-oral.html','Choisir un texte et préparer votre prise de parole.']],
 philo:[['Trouver le problème','philosophie-probleme-pas-a-pas.html','Faire apparaître la difficulté d’un sujet.'],['Expliquer un texte','philosophie-explication.html#banque','Choisir un extrait et entrer dans ses raisons.'],['Construire le plan','philosophie-plan-pas-a-pas.html','Des parties qui se répondent, une pensée qui avance.']],
 hlp1:[['Interpréter un texte','hlp-parcours-premiere-moliere.html#interpretation','Lire un passage de Molière et justifier son interprétation.'],['Préparer une réflexion','hlp-parcours-premiere-moliere.html#reflexion','Appuyer une réflexion sur le texte et votre culture.'],['Travailler l’écriture','hlp-ecrire.html?niveau=premiere&exercice=interpretation#banque','Choisir un exercice d’interprétation de Première.']],
 hlp2:[['Interpréter un texte','hlp-parcours-terminale-riviere.html#interpretation','Construire une interprétation à partir du texte.'],['Préparer un essai','hlp-parcours-terminale-riviere.html#essai','Examiner une question avec des appuis précis.'],['Travailler l’écriture','hlp-ecrire.html?niveau=terminale&exercice=essai#banque','Choisir un exercice d’essai de Terminale.']],
 brevet:[['Comprendre un texte','brevet-comprehension.html#entrainement','Répondre à une question en revenant au passage utile.'],['Réviser la grammaire','brevet-grammaire.html#entrainement','Choisir, manipuler, puis expliquer sa réponse.'],['Préparer une rédaction','brevet-reflexion.html#entrainement','Construire une réponse argumentée, étape par étape.']]
 };
 const exam=document.getElementById('home-exam'),need=document.getElementById('home-need'),go=document.getElementById('home-go'),note=document.getElementById('home-route-note');
 function updateOptions(){need.replaceChildren(...routes[exam.value].map((r,i)=>new Option(r[0],String(i))));updateLink();}
 function updateLink(){const r=routes[exam.value][Number(need.value)];go.href=r[1];note.textContent=r[2];}
 exam.addEventListener('change',updateOptions);need.addEventListener('change',updateLink);document.getElementById('home-routing').hidden=false;
 const feedback=document.getElementById('home-demo-feedback');
 const states={ok:['Solide','L’effort pour contrôler l’impression produite détruit la spontanéité recherchée : vous expliquez bien la difficulté.'],def:['Défendable','La distinction est juste. Précisez comment le désir de produire une image de soi contrarie le naturel.'],no:['À revoir','La maxime montre justement ce que cet effort risque de faire perdre : la spontanéité. Comparez « être » et « paraître ».']};
 document.getElementById('home-demo-choices').hidden=false;
 document.querySelectorAll('[data-home-choice]').forEach(b=>b.addEventListener('click',()=>{const v=states[b.dataset.homeChoice];feedback.replaceChildren();const strong=document.createElement('strong');strong.textContent=v[0]+'. ';feedback.append(strong,document.createTextNode(v[1]));feedback.hidden=false;document.querySelectorAll('[data-home-choice]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
 const area=document.getElementById('home-demo-answer'),save=document.getElementById('home-demo-save');const key='accueil-naturel-brouillon';
 try{area.value=localStorage.getItem(key)||'';}catch{}
 area.addEventListener('input',()=>{try{localStorage.setItem(key,area.value);save.textContent='Brouillon conservé dans ce navigateur.';}catch{save.textContent='Copiez votre réponse pour la conserver : la sauvegarde est indisponible.';}});
 document.querySelector('#home-demo-compare>summary').addEventListener('click',e=>{if(!area.value.trim()){e.preventDefault();save.textContent='Écrivez un essai avant de comparer.';area.focus();}});
})();
