(()=> {
const qs=[
{skill:"problematiser",title:"Quelle problématique est la plus forte ?",context:"Sujet : « Peut-on être heureux sans être libre ? »",options:[
["Le bonheur est-il vraiment ce que tous les hommes recherchent avant toute autre chose ?","non"],
["Le bonheur exige-t-il de n’avoir plus rien à choisir, au risque de n’être plus éprouvé comme le nôtre, ou suppose-t-il la liberté qui, en gardant ouvert un autre possible, l’empêche d’être jamais complet ?","oui"],
["Comment pourrait-on être vraiment heureux sans avoir choisi la vie que l’on mène, puisqu’un bonheur imposé n’est qu’une satisfaction subie ?","non"],
["Faut-il préférer le bonheur, qui apaise, à la liberté, qui inquiète, ou renoncer au repos pour rester libre ?","non"]]},
{skill:"argumenter",title:"Quel passage pense vraiment ?",context:"Vous devez défendre l’idée que suivre ses désirs ne suffit pas à être libre.",options:[
["Sartre parle beaucoup de liberté, donc la liberté est importante.","non"],
["Un désir peut être produit par des causes que je ne maîtrise pas ; l’accomplir ne suffit donc pas à prouver que j’en suis véritablement l’auteur.","oui"],
["Depuis toujours, les philosophes s’interrogent sur la liberté.","non"],
["La liberté est une grande notion philosophique.","non"]]},
{skill:"transitions",title:"Quelle transition devient nécessaire ?",context:"Acquis : une règle générale protège l’égalité. Limite : des situations différentes peuvent exiger un traitement différent.",options:[
["Nous allons maintenant parler de l’équité.","non"],
["Une règle qui doit valoir pour tous peut-elle tenir compte des différences pertinentes sans cesser d’être la même pour tous ?","oui"],
["Après avoir vu la loi, voyons ses limites.","non"],
["La justice est un problème très complexe.","non"]]},
{skill:"troisieme",title:"Quel III est le plus fort ?",context:"I : liberté = absence d’obstacle. II : nos désirs peuvent eux-mêmes nous déterminer. Reste : comment être auteur de son action sans être sans cause ?",options:[
["Il faut être un peu libre et un peu déterminé.","non"],
["La liberté est finalement plus importante.","non"],
["Il faut transformer la liberté : non absence de cause, mais capacité à se déterminer par des raisons reconnues comme siennes.","oui"],
["La société limite aussi la liberté.","non"]]},
{skill:"references",title:"Quelle référence est réellement au service de la pensée ?",context:"Vous voulez montrer qu’un désir n’est pas nécessairement causé par la valeur préalable de son objet.",options:[
["Spinoza est un grand philosophe du désir.","non"],
["Spinoza dit beaucoup de choses sur le désir.","non"],
["En inversant le rapport habituel — ce n’est plus le bien qui cause le désir, mais le désir qui fait juger l’objet bon — Spinoza permet de déplacer l’origine de la valeur vers l’activité désirante.","oui"],
["Comme disait Spinoza, le désir existe.","non"]]}
];
const labels={problematiser:"Problématiser",argumenter:"Argumenter",transitions:"Construire les transitions",troisieme:"Construire la troisième partie",references:"Utiliser les références"};
const links={problematiser:"philosophie-problematisation.html",argumenter:"philosophie-penser-par-soi-meme.html",transitions:"philosophie-dissertation-entrainement.html",troisieme:"philosophie-dissertation-entrainement.html",references:"philosophie-references.html"};
let i=0; const scores={}; const stage=document.getElementById("diagStage"),prog=document.getElementById("diagProgress");
function show(){
 if(i>=qs.length){finish();return;}
 const q=qs[i]; prog.textContent="QUESTION "+(i+1)+" / "+qs.length;
 stage.innerHTML='<div class="diag-context">'+q.context+'</div><h2 class="diag-question">'+q.title+'</h2><div class="diag-options">'+q.options.map((o,n)=>'<button class="diag-option" data-n="'+n+'">'+String.fromCharCode(65+n)+'. '+o[0]+'</button>').join("")+'</div>';
 stage.querySelectorAll(".diag-option").forEach(b=>b.onclick=()=>{const o=q.options[Number(b.dataset.n)]; scores[q.skill]=(o[1]==="oui"?1:0); i++; show();});
}
function finish(){
 prog.textContent="DIAGNOSTIC TERMINÉ";
 const order=["problematiser","argumenter","transitions","troisieme","references"];
 const weak=order.filter(k=>!scores[k]);
 const solid=order.filter(k=>scores[k]);
 if(!weak.length){
   stage.innerHTML='<div class="diag-result"><div class="kicker">LES CINQ GESTES RÉSISTENT</div><h2>Passez au transfert.</h2><p>Vous avez réussi les cinq mini-situations. Le bon test maintenant est un sujet complet, sans guidage initial.</p><div class="prescription"><strong>Travail conseillé :</strong><br>Choisissez une annale, construisez seul la problématique et le mouvement du plan, puis revenez au laboratoire seulement sur le geste qui résiste.</div><a class="btn red" href="philosophie-annales.html">Choisir une annale →</a> <a class="home-text-link" href="philosophie-laboratoire.html">Voir le laboratoire →</a><p class="micro"><button type="button" class="philo-reset" id="diagReset">Recommencer le diagnostic</button></p></div>';
 }else{
   const priority=weak[0];
   stage.innerHTML='<div class="diag-result"><div class="kicker">VOTRE PRIORITÉ</div><h2>'+labels[priority]+'</h2><p>Vous avez réussi '+solid.length+' geste'+(solid.length>1?"s":"")+' sur 5. Le diagnostic ne donne pas une note : il indique où commencer.</p><div class="prescription"><strong>Travail conseillé :</strong><br>'+prescription(priority)+'</div><a class="btn red" href="'+links[priority]+'">Travailler cette priorité →</a> <a class="home-text-link" href="philosophie-laboratoire.html">Voir tous les exercices →</a><p class="micro"><button type="button" class="philo-reset" id="diagReset">Recommencer le diagnostic</button></p></div>';
 }
 document.getElementById("diagReset").onclick=()=>{i=0;Object.keys(scores).forEach(k=>delete scores[k]);show();};
}
function prescription(k){
 return {
 problematiser:"Faites les cinq QCM de la page Problématisation en nommant chaque erreur, puis appliquez le questionnaire et les sept tests à une annale.",
 argumenter:"Commencez par « Zéro auteur » : une réponse, une raison, un exemple, une difficulté sans référence.",
 transitions:"Faites le « Duel de transitions » puis produisez vous-même une question de manque.",
 troisieme:"Faites la « Bataille des III » : conservation de I, conservation de II, réponse au reste, absence d’arbitraire.",
 references:"Commencez par « Sauvez cette citation » puis appliquez le test : retirez le nom, le raisonnement tient-il encore ?"
 }[k];
}
show();
})();