(()=> {
/* Cinq mini-situations. Chaque option : [texte, statut (true = solide, "def" = défendable, false = à revoir), explication]. */
const qs=[
{skill:"problematiser",title:"Quelle problématique est la plus juste ?",context:"Sujet : « Peut-on se mentir à soi-même ? »",options:[
["Se mentir ne suppose-t-il pas de connaître la vérité qu’on se cache, ce qui rendrait le mensonge à soi-même impossible ?","def","Défendable : c’est une vraie difficulté, mais la question n’examine que la réponse « non » et conclut avant d’avoir examiné l’autre."],
["Celui qui se ment connaît-il la vérité qu’il se cache, au risque de ne plus s’y tromper, ou l’ignore-t-il, au risque de n’être plus qu’un homme qui se trompe ?",true,"C’est la bonne : chaque réponse perd quelque chose. Si je sais la vérité, je ne peux pas vraiment me tromper ; si je l’ignore, ce n’est plus un mensonge, seulement une erreur."],
["Comment pourrait-on se mentir à soi-même, puisque celui qui ment sait toujours, au fond, ce qu’il cherche à se cacher ?",false,"« Comment pourrait-on… puisque… » : la réponse est déjà dans la question."],
["Le mensonge à soi-même est-il toujours une faute, même lorsqu’il ne fait de tort à personne d’autre que soi ?",false,"Hors sujet : le sujet demande si c’est possible, pas si c’est une faute."]]},
{skill:"argumenter",title:"Quel passage argumente vraiment ?",context:"Vous voulez défendre l’idée que suivre ses désirs ne suffit pas à être libre.",options:[
["Spinoza l’a montré : suivre ses désirs n’est pas être libre, et c’est l’un des plus grands philosophes de l’histoire.",false,"Un nom n’est pas une raison : on sait qui le dit, pas pourquoi c’est vrai."],
["Un désir peut être produit par des causes que je ne maîtrise pas ; l’accomplir ne suffit donc pas à prouver que j’en suis vraiment l’auteur.",true,"C’est la bonne : une raison, puis une conséquence qui en découle. On peut la discuter, donc elle pense."],
["Par exemple, un fumeur qui a envie d’une cigarette la fume aussitôt, mais il n’est pas libre pour autant.","def","L’exemple est bien choisi, mais il ne dit pas pourquoi le fumeur n’est pas libre : il illustre sans argumenter."],
["La liberté est une notion complexe, qui a fait débattre les philosophes depuis l’Antiquité.",false,"Une généralité vraie, mais qui ne défend aucune idée précise."]]},
{skill:"transitions",title:"Quelle transition fait avancer le devoir ?",context:"Acquis de la partie I : nos désirs nous poussent vers ce qui nous manque. Limite : une fois satisfaits, ils s’éteignent, et l’ennui revient.",options:[
["Nous avons vu que le désir vise ce qui nous manque ; voyons maintenant quelles sont ses limites et ses dangers.",false,"Elle annonce la suite sans dire quel problème la rend nécessaire."],
["Mais comment pourrait-on être heureux en désirant, si tout désir, une fois satisfait, finit dans l’ennui ?",false,"La réponse est déjà dans la question : la partie II n’a plus rien à chercher."],
["Si le désir s’éteint dès qu’il est satisfait, que cherchons-nous vraiment en désirant : l’objet, ou le fait même de désirer ?",true,"C’est la bonne : elle part exactement de la limite et pose une question vraiment ouverte, qui ouvre la partie II."],
["Le désir est donc une question complexe, qui touche tous les aspects de l’existence humaine, du corps à l’esprit.",false,"Une généralité qui quitte la difficulté précise."]]},
{skill:"troisieme",title:"Quelle troisième partie est la plus forte ?",context:"I : une loi générale garantit l’égalité, la même règle pour tous. II : mais elle ne voit pas les situations particulières, et peut produire une injustice. Reste : comment être juste avec chacun sans cesser de l’être pour tous ?",options:[
["Il faut donc appliquer les lois à moitié : un peu de règle commune, un peu d’exception selon les cas.",false,"Couper la poire en deux n’explique rien : on renonce au problème au lieu de le traiter."],
["Finalement, il faut supprimer les lois générales et juger chaque cas séparément, selon sa situation.",false,"Choisir un camp efface ce que la partie I avait montré : l’égalité devant la règle."],
["Il faut distinguer deux plans : la loi fixe la règle pour tous, le juge l’applique avec équité à chaque cas, sans la contredire.",true,"C’est la bonne : elle garde l’acquis de I et de II en distinguant deux plans, la règle et son application."],
["La justice coûte cher à l’État, et ce coût pose un autre problème, celui des moyens des tribunaux.",false,"Elle change de sujet au lieu de répondre au reste."]]},
{skill:"references",title:"Quelle référence travaille vraiment ?",context:"Vous voulez montrer qu’un objet ne nous attire pas toujours parce qu’il a d’abord de la valeur.",options:[
["Spinoza, dans l’Éthique, parle longuement du désir et de ses causes, ce qui montre bien l’importance de la question.",false,"Le nom et le titre sont exacts, mais la référence ne fait rien dans le raisonnement."],
["Pour Spinoza, le désir est l’essence même de l’homme : c’est lui qui nous fait agir avant tout jugement.","def","Défendable : la phrase est exacte et va dans le bon sens, mais elle n’établit pas encore ce que vous voulez montrer, le renversement entre valeur et désir."],
["Spinoza renverse le rapport habituel : ce n’est pas parce qu’une chose est bonne que nous la désirons, c’est parce que nous la désirons que nous la jugeons bonne.",true,"C’est la bonne : la référence accomplit exactement l’opération dont votre argument a besoin, un renversement."],
["Comme le disait Spinoza, il faut toujours désirer ce qui est bon, et seulement ce qui est bon pour nous.",false,"Contresens : Spinoza dit presque l’inverse. Une référence mal comprise affaiblit le devoir."]]}
];
/* Banque de situations : même geste intellectuel, sujets différents. */
const problemes=[
{context:"Sujet : « Peut-on se mentir à soi-même ? »",options:qs[0].options},
{context:"Sujet : « Faut-il toujours dire la vérité ? »",options:[
["Dire la vérité est-il toujours préférable au mensonge ?",false,"C’est presque le sujet répété : aucune difficulté des deux réponses n’est formulée."],
["Dire la vérité respecte-t-il autrui, au risque de le blesser inutilement, ou le mensonge le protège-t-il, au risque de lui retirer la possibilité de décider en connaissance de cause ?",true,"Dire la vérité respecte la liberté d’autrui mais peut lui nuire ; mentir peut le protéger mais lui retire le choix éclairé. La question relie ces deux risques."],
["Pourquoi le mensonge est-il toujours condamnable ?",false,"La question suppose déjà que mentir est toujours condamnable ; elle écarte la réponse contraire."],
["La vérité peut-elle blesser ?", "def","Cette question ouvre une difficulté réelle de la franchise, mais elle n’examine pas le risque propre au mensonge protecteur."]]},
{context:"Sujet : « La liberté consiste-t-elle à faire ce que l’on veut ? »",options:[
["Être libre, est-ce faire ce que l’on désire, au risque d’obéir à des désirs que l’on ne choisit pas, ou maîtriser ses désirs, au risque de renoncer à ce que l’on veut ?",true,"Suivre ses désirs semble libre mais peut nous soumettre à eux ; les maîtriser rend autonome mais paraît limiter notre volonté. Les deux exigences se heurtent."],
["Peut-on être libre si l’on suit ses désirs ?", "def","Vous examinez la dépendance aux désirs, mais pas la difficulté inverse : la maîtrise de soi peut sembler contredire la liberté de vouloir."],
["La liberté est-elle importante pour les êtres humains ?",false,"La question quitte le sens précis de « faire ce que l’on veut »."],
["Pourquoi faut-il absolument maîtriser ses désirs pour être libre ?",false,"La réponse est présupposée ; l’autre conception de la liberté n’est pas examinée."]]},
{context:"Sujet : « Pour être juste, suffit-il d’obéir aux lois ? »",options:[
["La loi garantit-elle toujours la justice ?", "def","La possibilité d’une loi injuste est bien identifiée, mais le risque de juger chacun selon son seul avis reste absent."],
["Pourquoi les lois sont-elles nécessaires ?",false,"Cette question défend l’utilité des lois sans examiner ce qui rend leur obéissance insuffisante."],
["Obéir à la loi commune garantit-il la justice, au risque de suivre une loi injuste, ou faut-il juger la loi, au risque de perdre une règle commune à tous ?",true,"Obéir préserve une règle commune mais peut imposer l’injustice ; juger la loi préserve l’exigence du juste mais menace la règle partagée. Les deux pertes sont reliées."],
["Comment désobéir à une loi injuste ?",false,"La question suppose déjà que la loi est injuste et que la désobéissance est la réponse."]]},
{context:"Sujet : « La science doit-elle être utile ? »",options:[
["La science vaut-elle par ses applications, au risque de négliger les vérités sans usage immédiat, ou par la recherche désintéressée du vrai, au risque d’oublier qu’elle transforme aussi le monde ?",true,"Exiger l’utilité peut sacrifier la recherche libre ; refuser toute finalité pratique peut masquer le pouvoir d’action de la science. Les deux difficultés sont mises en relation."],
["Pourquoi la science doit-elle aider les hommes ?",false,"L’obligation d’être utile est posée d’avance ; la recherche libre n’est pas examinée."],
["La science peut-elle être dangereuse ?",false,"C’est une autre question : le danger n’est pas identique à l’obligation d’être utile."],
["La science perd-elle sa liberté quand on exige son utilité ?", "def","C’est une difficulté pertinente de l’exigence d’utilité, mais l’autre position n’est pas mise à l’épreuve."]]},
{context:"Sujet : « L’artiste sait-il ce qu’il fait ? »",options:[
["L’art est-il un métier ou une inspiration ?", "def","Deux réponses apparaissent, mais on ne comprend pas encore ce que chacune risque de perdre."],
["Comment l’artiste pourrait-il créer sans savoir-faire ?",false,"La question privilégie d’avance le savoir-faire et ferme la possibilité de l’invention."],
["L’artiste maîtrise-t-il son œuvre, au risque de n’y laisser aucune invention, ou crée-t-il sans tout prévoir, au risque de ne plus être pleinement l’auteur de ce qu’il produit ?",true,"La maîtrise assure le savoir-faire mais menace la nouveauté ; l’invention échappe au calcul mais interroge la responsabilité de l’auteur. La question relie les deux pertes."],
["Les artistes ont-ils besoin d’apprendre à dessiner ?",false,"Cette question réduit l’art à une technique particulière et ne traite pas le savoir de l’artiste en général."]]}
];
/* Deuxième série : renouveler aussi les quatre autres gestes au redémarrage. */
const autresSituations={
argumenter:{context:"Vous voulez montrer que l'habitude ne garantit pas qu'une action soit juste.",options:[
["Une action répétée devient familière ; mais cette familiarité ne dit pas si elle respecte autrui.",true,"La familiarité explique pourquoi l'on agit, pas pourquoi l'acte est juste : une raison précise distingue habitude et justification."],
["Aristote a beaucoup parlé de l'habitude et de la vertu.",false,"Un auteur cité ne fournit pas encore l'argument."],
["Par exemple, quelqu'un peut prendre tous les jours la même décision.",false,"L'exemple ne montre pas en quoi la décision est juste ou injuste."],
["Les habitudes sont importantes dans la vie de chacun.","def","L'idée peut servir d'introduction, mais ne soutient pas la thèse annoncée."]]},
transitions:{context:"Partie I : la technique nous donne du pouvoir sur la nature. Limite : ce pouvoir peut produire des dommages que nous ne savons pas réparer.",options:[
["Après avoir étudié la technique, nous parlerons de la nature.",false,"Simple annonce : aucune difficulté ne rend la suite nécessaire."],
["Puisque la technique détruit la nature, il faut y renoncer.",false,"La réponse est décidée avant l'examen de la seconde partie."],
["Si notre puissance technique peut provoquer des dommages irréversibles, suffit-il de pouvoir agir pour être autorisé à le faire ?",true,"La limite du pouvoir technique devient une question ouverte sur la responsabilité."],
["La technique a de nombreux avantages et inconvénients.","def","Le contraste est réel, mais la difficulté précise des dommages irréversibles disparaît."]]},
troisieme:{context:"I : dire la vérité respecte l'autre. II : une vérité brutale peut lui nuire. Reste : comment respecter l'autre sans le tromper ni l'écraser ?",options:[
["Il faut mentir une fois sur deux pour ne blesser personne.",false,"Un compromis quantitatif ne résout pas la tension."],
["Il faut distinguer le devoir de ne pas tromper et la manière de dire : la sincérité oblige, mais n'autorise pas la brutalité.",true,"La distinction préserve l'exigence de vérité et le souci d'autrui sans les confondre."],
["Il faut toujours dire la vérité, quelles que soient les conséquences.",false,"La difficulté de la seconde partie est supprimée."],
["La vérité est un sujet très ancien.","def","La phrase est vraie, mais elle ne répond pas au problème restant."]]},
references:{context:"Vous voulez montrer que douter peut être une méthode pour rechercher une certitude.",options:[
["Descartes est un grand philosophe du doute.",false,"Le nom ne fait pas comprendre comment le doute aide à connaître."],
["Descartes doute de ce qu'il croit savoir afin de découvrir une vérité qui résiste au doute lui-même.",true,"La référence explique une opération : mettre les croyances à l'épreuve pour chercher un point certain."],
["Descartes a écrit le Discours de la méthode.","def","Le titre est pertinent, mais il ne fournit pas l'idée nécessaire à l'argument."],
["Selon Descartes, il faut douter de tout pour toujours.",false,"Contresens : le doute est une étape de recherche, non une fin en soi."]]}
};
const questionsInitiales=qs.slice(1).map(q=>({...q}));
let numeroProbleme=0;
try{numeroProbleme=Number(sessionStorage.getItem("philo-probleme-numero")||"0")||0;}catch(e){}
function choisirProbleme(){
 const p=problemes[numeroProbleme%problemes.length];
 qs[0]={...qs[0],context:p.context,options:p.options};
 questionsInitiales.forEach((original,j)=>{const alt=autresSituations[original.skill];qs[j+1]=numeroProbleme%2===0?{...original}:{...original,context:alt.context,options:alt.options};});
 try{sessionStorage.setItem("philo-probleme-numero",String(numeroProbleme+1));}catch(e){}
 numeroProbleme++;
}
function recommencer(){i=0;Object.keys(scores).forEach(k=>delete scores[k]);choisirProbleme();show();}
const labels={problematiser:"Trouver le problème d’un sujet",argumenter:"Argumenter",transitions:"Construire les transitions",troisieme:"Construire la troisième partie",references:"Utiliser les références"};
const links={problematiser:"philosophie-probleme-pas-a-pas.html",argumenter:"philosophie-penser-par-soi-meme.html",transitions:"philosophie-dissertation-entrainement.html#ex-transition",troisieme:"philosophie-dissertation-entrainement.html#bataille-iii",references:"philosophie-references.html"};
let i=0; const scores={}; const stage=document.getElementById("diagStage"),prog=document.getElementById("diagProgress");
const esc=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function show(){
 if(i>=qs.length){finish();return;}
 const q=qs[i]; prog.textContent="QUESTION "+(i+1)+" / "+qs.length;
 stage.innerHTML='<div class="diag-context">'+esc(q.context)+'</div><h2 class="diag-question">'+esc(q.title)+'</h2><div class="diag-options">'+q.options.map((o,n)=>'<button class="diag-option" data-n="'+n+'">'+String.fromCharCode(65+n)+'. '+esc(o[0])+'</button>').join("")+'</div><div class="diag-feedback" aria-live="polite"></div>';
 const fb=stage.querySelector(".diag-feedback");
 stage.querySelectorAll(".diag-option").forEach(b=>b.onclick=()=>{
  const n=Number(b.dataset.n), o=q.options[n], good=q.options.findIndex(x=>x[1]===true);
  const st=o[1]===true?"ok":(o[1]==="def"?"def":"no");
  scores[q.skill]=st==="ok"?1:0;
  stage.querySelectorAll(".diag-option").forEach(x=>{x.disabled=true;});
  b.classList.add(st==="ok"?"is-good":(st==="def"?"is-def":"is-wrong"));
  if(st!=="ok") stage.querySelectorAll(".diag-option")[good].classList.add("is-good");
  const lab={ok:"Solide.",def:"Défendable.",no:"À revoir."}[st];
  fb.className="diag-feedback chaine-fb show "+st;
  const detail=v=>esc(String(v[2]).replace(/^(Défendable : |C’est la bonne : )/,''));
  const lesson='<ol>'+q.options.map((v,k)=>'<li><strong>'+String.fromCharCode(65+k)+' · '+(v[1]===true?'Solide':v[1]==='def'?'Défendable':'À revoir')+'</strong> — '+detail(v)+'</li>').join('')+'</ol>';
  fb.innerHTML=(q.skill==='problematiser'?'<p><strong>'+lab+'</strong> Comparez les quatre formulations :</p>'+lesson:'<p><strong>'+lab+'</strong> '+detail(o)+'</p>'+(st==='ok'?'':'<p><strong>La plus solide ('+String.fromCharCode(65+good)+') :</strong> '+detail(q.options[good])+'</p>'))+'<button type="button" class="btn red diag-next">'+(i+1<qs.length?'Question suivante →':'Voir le résultat →')+'</button>';
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
 document.getElementById("diagReset").onclick=()=>{recommencer();};
}
function prescription(k){
 return {
 problematiser:"Commencez au clic : un vrai sujet, sept questions, la problématique au bout. Refaites-le sur deux autres sujets, puis passez au niveau 2.",
 argumenter:"Commencez par « Zéro auteur » : une réponse, une raison, un exemple, une difficulté, sans aucun nom propre.",
 transitions:"Faites l’exercice 7 et le « Duel de transitions », puis écrivez vous-même une transition sur un sujet d’annale.",
 troisieme:"Faites la « Bataille des III », puis relisez les sept opérations de la troisième partie.",
 references:"Commencez par « Sauvez cette citation », puis appliquez le test : retirez le nom, le raisonnement tient-il encore ?"
 }[k];
}
document.getElementById("diagRestartAlways").addEventListener("click",()=>{recommencer();document.getElementById("philoDiagnostic").scrollIntoView({block:"start"});});
choisirProbleme();
show();
})();
