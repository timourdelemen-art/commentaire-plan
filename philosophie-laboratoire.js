(()=> {
const exercises=[
{cat:"problematiser",title:"Quelle problématique survivra ?",desc:"Cinq QCM : choisir la formulation qui passe le test du gant, puis nommer l’erreur de chaque distracteur.",href:"philosophie-problematisation.html",level:"Diagnostic"},
{cat:"problematiser",title:"Ce que chaque réponse détruit",desc:"Repérer sur quelle exigence de la notion une réponse s’appuie et laquelle elle détruit, puis faire de même pour la réponse contraire.",href:"philosophie-dissertation-entrainement.html",level:"Production"},
{cat:"problematiser",title:"Sujet → contradiction → problématique",desc:"Trouver les deux exigences de la notion, montrer que chaque réponse s’appuie sur l’une et détruit l’autre, formuler ce chiasme.",href:"philosophie-problematisation.html",level:"Production"},
{cat:"argumenter",title:"Zéro auteur",desc:"Construire une réponse, une raison, un exemple et une difficulté sans aucun nom propre.",href:"philosophie-penser-par-soi-meme.html",level:"Production"},
{cat:"argumenter",title:"Une raison, pas un nom",desc:"Transformer un argument d’autorité en véritable justification.",href:"philosophie-penser-par-soi-meme.html",level:"Réparation"},
{cat:"argumenter",title:"L’exemple qui pense",desc:"Faire d’un cas concret une épreuve qui oblige à préciser le concept.",href:"philosophie-penser-par-soi-meme.html",level:"Transfert"},
{cat:"parties",title:"Plan interchangeable ?",desc:"Vérifier si les parties sont nécessaires dans cet ordre ou simplement juxtaposées.",href:"philosophie-dissertation-entrainement.html",level:"Diagnostic"},
{cat:"parties",title:"Construire une partie",desc:"Réponse → nécessité → argument → appui → limite.",href:"philosophie-dissertation-entrainement.html",level:"Production"},
{cat:"transitions",title:"Duel de transitions",desc:"Éliminer résumé, annonce et généralité ; garder la question née du manque réel.",href:"philosophie-dissertation-entrainement.html",level:"Diagnostic"},
{cat:"transitions",title:"Partie → manque → question",desc:"Transformer la limite d’une partie en nécessité de la suivante.",href:"philosophie-dissertation-entrainement.html",level:"Production"},
{cat:"troisieme",title:"Bataille des III",desc:"Comparer plusieurs dépassements et choisir celui qui traite vraiment le reste.",href:"philosophie-dissertation-entrainement.html",level:"Diagnostic"},
{cat:"troisieme",title:"Quel III conserve le plus ?",desc:"Tester conservation de I, conservation de II, réponse au reste et absence d’arbitraire.",href:"philosophie-operations.html",level:"Production"},
{cat:"references",title:"Sauvez cette citation",desc:"Donner à une citation une fonction précise dans votre propre raisonnement.",href:"philosophie-references.html",level:"Réparation"},
{cat:"references",title:"Qui pense ici ?",desc:"Repérer le paragraphe qui récite des auteurs au lieu de construire un argument.",href:"philosophie-penser-par-soi-meme.html",level:"Diagnostic"},
{cat:"references",title:"Reprenez la main",desc:"Expliquer après la référence ce qu’elle permet d’établir exactement ici.",href:"philosophie-references.html",level:"Production"},
{cat:"references",title:"Remplacez l’auteur",desc:"Tester si une référence est précise ou si n’importe quel grand nom conviendrait.",href:"philosophie-references.html",level:"Diagnostic"},
{cat:"textes",title:"Énoncé → opération → ce que cela change ici",desc:"Identifier ce qu’un philosophe fait du problème, pas seulement ce qu’il dit.",href:"philosophie-operations.html",level:"Analyse"},
{cat:"textes",title:"Même texte, autre sujet",desc:"Réutiliser une même idée de manière différente selon le problème de dissertation.",href:"philosophie-references.html",level:"Transfert"},
{cat:"annales",title:"Dissertation officielle",desc:"Travailler un sujet du bac 2026 par étapes : mots du sujet, deux exigences, deux réponses et leurs paradoxes, problématique, plan.",href:"philosophie-annales.html",level:"Transfert"},
{cat:"annales",title:"Explication de texte officielle",desc:"Problème, thèse, opération, puis réemploi possible dans une dissertation.",href:"philosophie-annales.html",level:"Transfert"}
];
const labels={all:"Tout",problematiser:"Problématiser",argumenter:"Argumenter",parties:"Construire une partie",transitions:"Transitions",troisieme:"Troisième partie",references:"Références",textes:"Textes",annales:"Annales"};
const filters=document.getElementById("philoLabFilters"),grid=document.getElementById("philoLabGrid"),count=document.getElementById("philoLabCount");
let active="all";
Object.entries(labels).forEach(([key,label])=>{
 const b=document.createElement("button"); b.type="button"; b.className="philo-filter"; b.dataset.cat=key; b.textContent=label;
 b.addEventListener("click",()=>{active=key;render();});
 filters.appendChild(b);
});
function render(){
 [...filters.children].forEach(b=>b.classList.toggle("selected",b.dataset.cat===active));
 const items=active==="all"?exercises:exercises.filter(x=>x.cat===active);
 count.textContent=items.length+" exercice"+(items.length>1?"s":"")+" à essayer.";
 grid.innerHTML=items.map(x=>'<a class="philo-lab-card" href="'+x.href+'"><span>'+x.level+'</span><h2>'+x.title+'</h2><p>'+x.desc+'</p><b>Essayer →</b></a>').join("");
}
render();
})();