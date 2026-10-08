(()=> {
/* Cinq mini-situations. Chaque option : [texte, juste ?, explication affichée après le choix]. */
const qs=[
{skill:"problematiser",title:"Quelle problématique est la plus juste ?",context:"Sujet : « Peut-on se mentir à soi-même ? »",options:[
["Se mentir ne suppose-t-il pas de connaître la vérité qu’on se cache, ce qui rend le mensonge à soi-même impossible ?",false,"La question penche déjà d’un côté : elle examine seulement la réponse « non » et conclut avant d’avoir examiné l’autre."],
["Celui qui se ment doit-il connaître la vérité qu’il se cache, au risque de ne plus pouvoir s’y tromper, ou l’ignorer vraiment, au risque de n’être plus qu’un homme qui se trompe ?",true,"C’est la bonne : chaque réponse perd quelque chose. Si je sais la vérité, je ne peux pas vraiment me tromper ; si je l’ignore, ce n’est plus un mensonge, seulement une erreur."],
["Comment pourrait-on se mentir à soi-même, puisque celui qui ment sait toujours ce qu’il cherche à cacher ?",false,"« Comment pourrait-on… puisque… » : la réponse est déjà dans la question."],
["Le mensonge est-il toujours une faute, même lorsqu’il ne fait de tort à personne d’autre que soi ?",false,"Hors sujet : le sujet demande si c’est possible, pas si c’est une faute."]]},
{skill:"argumenter",title:"Quel passage argumente vraiment ?",context:"Vous voulez défendre l’idée que suivre ses désirs ne suffit pas à être libre.",options:[
["Spinoza l’a montré : suivre ses désirs n’est pas être libre, et c’est l’un des plus grands philosophes.",false,"Un nom n’est pas une raison : on sait qui le dit, pas pourquoi c’est vrai."],
["Un désir peut être produit par des causes que je ne maîtrise pas ; l’accomplir ne suffit donc pas à prouver que j’en suis vraiment l’auteur.",true,"C’est la bonne : une raison, puis une conséquence qui en découle. On peut la discuter, donc elle pense."],
["Par exemple, un fumeur qui a envie d’une cigarette la fume, mais il n’est pas libre pour autant.",false,"L’exemple est bien choisi, mais il ne dit pas pourquoi le fumeur n’est pas libre : il illustre sans argumenter."],
["La liberté est une notion complexe, qui a fait débattre les philosophes depuis l’Antiquité.",false,"Une généralité vraie, mais qui ne défend aucune idée précise."]]},
{skill:"transitions",title:"Quelle transition fait avancer le devoir ?",context:"Acquis de la partie I : le travail nous libère du besoin. Limite : il peut aussi absorber toute la vie.",options:[
["Nous avons vu que le travail libère ; voyons maintenant ses limites.",false,"Elle annonce la suite sans dire quel problème la rend nécessaire."],
["Mais comment le travail pourrait-il libérer, s’il absorbe toute notre vie ?",false,"La réponse est déjà dans la question : la partie II n’a plus rien à chercher."],
["Ce qui nous donne les moyens de vivre peut-il devenir le but de notre vie sans cesser de nous libérer ?",true,"C’est la bonne : elle part exactement de la limite et pose une question vraiment ouverte."],
["Le travail est donc une question complexe, qui touche tous les aspects de l’existence.",false,"Une généralité qui quitte la difficulté précise."]]},
{skill:"troisieme",title:"Quelle troisième partie est la plus forte ?",context:"I : être libre, c’est ne pas rencontrer d’obstacle. II : mais nos désirs eux-mêmes peuvent nous être imposés. Reste : comment une action peut-elle être vraiment la mienne sans être sans cause ?",options:[
["Il faut donc être un peu libre et un peu déterminé : la vérité est entre les deux.",false,"Couper la poire en deux n’explique rien : on renonce au problème au lieu de le traiter."],
["Finalement, la liberté est une illusion : nous sommes entièrement déterminés.",false,"Choisir un camp efface ce que la partie I avait montré."],
["Il faut changer de définition : être libre, ce n’est pas être sans cause, c’est agir selon des raisons qu’on reconnaît comme siennes.",true,"C’est la bonne : elle garde l’acquis de I et de II, et transforme le concept de liberté pour répondre au reste."],
["La société aussi limite notre liberté, ce qui pose un autre problème.",false,"Elle change de sujet au lieu de répondre au reste."]]},
{skill:"references",title:"Quelle référence travaille vraiment ?",context:"Vous voulez montrer qu’un objet ne nous attire pas toujours parce qu’il a d’abord de la valeur.",options:[
["Spinoza, dans l’Éthique, parle longuement du désir, ce qui montre l’importance de la question.",false,"Le nom et le titre sont exacts, mais la référence ne fait rien dans le raisonnement."],
["Pour Spinoza, le désir est l’essence même de l’homme.",false,"La phrase est exacte, mais elle ne répond pas à ce que vous voulez montrer."],
["Spinoza renverse le rapport habituel : ce n’est pas parce qu’une chose est bonne que nous la désirons, c’est parce que nous la désirons que nous la jugeons bonne.",true,"C’est la bonne : la référence accomplit exactement l’opération dont votre argument a besoin, un renversement."],
["Comme le disait Spinoza, il faut toujours désirer ce qui est bon.",false,"Contresens : Spinoza dit presque l’inverse. Une référence mal comprise affaiblit le devoir."]]}
];
const labels={problematiser:"Trouver le problème d’un sujet",argumenter:"Argumenter",transitions:"Construire les transitions",troisieme:"Construire la troisième partie",references:"Utiliser les références"};
const links={problematiser:"philosophie-problematisation.html",argumenter:"philosophie-penser-par-soi-meme.html",transitions:"philosophie-dissertation-entrainement.html#ex-transition",troisieme:"philosophie-dissertation-entrainement.html#bataille-iii",references:"philosophie-references.html"};
let i=0; const scores={}; const stage=document.getElementById("diagStage"),prog=document.getElementById("diagProgress");
const esc=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function show(){
 if(i>=qs.length){finish();return;}
 const q=qs[i]; prog.textContent="QUESTION "+(i+1)+" / "+qs.length;
 stage.innerHTML='<div class="diag-context">'+esc(q.context)+'</div><h2 class="diag-question">'+esc(q.title)+'</h2><div class="diag-options">'+q.options.map((o,n)=>'<button class="diag-option" data-n="'+n+'">'+String.fromCharCode(65+n)+'. '+esc(o[0])+'</button>').join("")+'</div><div class="diag-feedback" aria-live="polite"></div>';
 const fb=stage.querySelector(".diag-feedback");
 stage.querySelectorAll(".diag-option").forEach(b=>b.onclick=()=>{
  const n=Number(b.dataset.n), o=q.options[n], good=q.options.findIndex(x=>x[1]);
  scores[q.skill]=o[1]?1:0;
  stage.querySelectorAll(".diag-option").forEach(x=>{x.disabled=true;});
  b.classList.add(o[1]?"is-good":"is-wrong");
  if(!o[1]) stage.querySelectorAll(".diag-option")[good].classList.add("is-good");
  fb.innerHTML='<p><strong>'+(o[1]?"Juste.":"Pas celle-ci.")+'</strong> '+esc(o[2])+'</p>'+(o[1]?'':'<p><strong>La bonne réponse ('+String.fromCharCode(65+good)+') :</strong> '+esc(q.options[good][2])+'</p>')+'<button type="button" class="btn red diag-next">'+(i+1<qs.length?"Question suivante →":"Voir le résultat →")+'</button>';
  fb.querySelector(".diag-next").onclick=()=>{i++;show();};
 });
}
function finish(){
 prog.textContent="DIAGNOSTIC TERMINÉ";
 const order=["problematiser","argumenter","transitions","troisieme","references"];
 const weak=order.filter(k=>!scores[k]);
 const solid=order.filter(k=>scores[k]);
 if(!weak.length){
   stage.innerHTML='<div class="diag-result"><div class="kicker">LES CINQ GESTES TIENNENT</div><h2>Passez à un vrai sujet.</h2><p>Vous avez réussi les cinq situations. Le bon test maintenant est un sujet complet, sans aide au départ.</p><div class="prescription"><strong>Travail conseillé :</strong><br>Choisissez une annale, trouvez seul le problème et le plan, puis comparez avec le corrigé.</div><a class="btn red" href="philosophie-annales.html">Choisir une annale →</a><p class="micro"><button type="button" class="philo-reset" id="diagReset">Recommencer le diagnostic</button></p></div>';
 }else{
   const priority=weak[0];
   stage.innerHTML='<div class="diag-result"><div class="kicker">VOTRE PRIORITÉ</div><h2>'+labels[priority]+'</h2><p>Vous avez réussi '+solid.length+' situation'+(solid.length>1?"s":"")+' sur 5. Ce n’est pas une note : c’est l’endroit où commencer.</p><div class="prescription"><strong>Travail conseillé :</strong><br>'+prescription(priority)+'</div><a class="btn red" href="'+links[priority]+'">Travailler cette priorité →</a> <a class="home-text-link" href="philosophie.html">Revoir le parcours →</a><p class="micro"><button type="button" class="philo-reset" id="diagReset">Recommencer le diagnostic</button></p></div>';
 }
 document.getElementById("diagReset").onclick=()=>{i=0;Object.keys(scores).forEach(k=>delete scores[k]);show();};
}
function prescription(k){
 return {
 problematiser:"Suivez l’exemple de la page « Trouver le problème », puis faites les cinq QCM en nommant chaque erreur.",
 argumenter:"Commencez par « Zéro auteur » : une réponse, une raison, un exemple, une difficulté, sans aucun nom propre.",
 transitions:"Faites l’exercice 7 et le « Duel de transitions », puis écrivez vous-même une transition sur un autre sujet.",
 troisieme:"Faites la « Bataille des III », puis relisez les sept opérations de la troisième partie.",
 references:"Commencez par « Sauvez cette citation », puis appliquez le test : retirez le nom, le raisonnement tient-il encore ?"
 }[k];
}
show();
})();
