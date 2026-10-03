#!/usr/bin/env node
const fs=require("fs");
const vm=require("vm");

function loadCatalogue(){
  const code=fs.readFileSync("annales/catalogue-annales.js","utf8");
  const sandbox={window:{}};
  vm.createContext(sandbox);
  vm.runInContext(code,sandbox);
  return sandbox.window.ANNALES_CATALOGUE||{};
}

const cat=loadCatalogue();
const errors=[];
const warnings=[];
let steps=0, aiSteps=0, freeSteps=0, premiumSteps=0;
const ids=new Set();

for(const [id,item] of Object.entries(cat)){
  if(ids.has(id)) errors.push(`ID dupliqué: ${id}`);
  ids.add(id);
  for(const field of ["examen","type","annee","zone","serie","epreuve","access","auteur","oeuvre","sourceOfficielle","contexte"]){
    if(item[field]===undefined || item[field]===null || item[field]==="") errors.push(`${id}: champ manquant ${field}`);
  }
  if(!["free","premium"].includes(item.access)) errors.push(`${id}: access invalide`);
  if(item.ia!==true) errors.push(`${id}: IA non activée`);
  if(!Array.isArray(item.etapes)||!item.etapes.length){errors.push(`${id}: aucune étape`);continue;}
  const stepIds=new Set();
  for(const s of item.etapes){
    steps++;
    if(stepIds.has(s.id)) errors.push(`${id}: étape dupliquée ${s.id}`);
    stepIds.add(s.id);
    for(const field of ["id","kind","titre","consigne","aide","access"]){
      if(s[field]===undefined || s[field]===null || s[field]==="") errors.push(`${id}/${s.id}: champ manquant ${field}`);
    }
    if(!["free","premium"].includes(s.access)) errors.push(`${id}/${s.id}: access invalide`);
    if(s.access==="free") freeSteps++; else if(s.access==="premium") premiumSteps++;
    aiSteps++;
    if(/établissement/i.test(JSON.stringify(s))) errors.push(`${id}/${s.id}: ancien vocabulaire « établissement » détecté`);
    if(s.kind==="transition" && !/question/i.test(s.consigne+" "+s.aide)) warnings.push(`${id}/${s.id}: transition à vérifier`);
    if(item.type==="brevet" && s.points===undefined) warnings.push(`${id}/${s.id}: barème non renseigné`);
  }
}

const files=[
  "annales/entrainement-annale.html",
  "annales/entrainement-annale.js",
  "worker/src/index.js",
  "access-control.js",
  "manuel-procedes.html"
];
for(const p of files) if(!fs.existsSync(p)) errors.push(`Fichier requis absent: ${p}`);

const html=fs.existsSync("annales/entrainement-annale.html")?fs.readFileSync("annales/entrainement-annale.html","utf8"):"";
const js=fs.existsSync("annales/entrainement-annale.js")?fs.readFileSync("annales/entrainement-annale.js","utf8"):"";
for(const needle of ['id="studentAnswer"','id="aiCheck"','id="aiFeedback"']){
  if(!html.includes(needle)) errors.push(`Interface annale: ${needle} absent`);
}
if(!html.includes("Vérifier ma réponse")) errors.push("Interface annale: bouton de vérification absent");
if(!js.includes("/api/analyze")) errors.push("Interface annale: moteur de retour absent");


// Audit de toutes les réponses libres du site public.
function walk(dir="."){
  const out=[];
  for(const name of fs.readdirSync(dir)){
    if(name===".git"||name==="node_modules"||name==="worker") continue;
    const p=dir==="."?name:dir+"/"+name;
    const st=fs.statSync(p);
    if(st.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}
const allPublicFiles=walk(".");
const publicHtml=allPublicFiles.filter(x=>x.endsWith(".html"));
const excludedFeedbackPages=new Set(["contact.html"]);
for(const p of publicHtml){
  const source=fs.readFileSync(p,"utf8");
  const textareas=[...source.matchAll(/<textarea\b[^>]*>/gi)].map(m=>m[0]);
  if(!textareas.length || excludedFeedbackPages.has(p)) continue;

  const hasGlobalLayer=source.includes('site-nav.js');
  const hasOwnAnalyzer=source.includes('/api/analyze') || source.includes('entrainement-annale.js');
  const hasDedicated=/(feedback\.js|writing-feedback\.js)/i.test(source);
  const answerTextareas=textareas.filter(tag=>!/data-feedback=["']off["']/i.test(tag));
  if(answerTextareas.length && !hasGlobalLayer && !hasOwnAnalyzer && !hasDedicated){
    errors.push(`${p}: ${answerTextareas.length} réponse(s) libre(s) sans couche de retour`);
  }

  const disabledTextareas=textareas.filter(tag=>/data-feedback=["']off["']/i.test(tag));
  if(disabledTextareas.length && p==="brevet-redaction.html" && !source.includes("brevet-writing-feedback.js")){
    errors.push("brevet-redaction.html: composition sans bilan final dédié");
  }
}

// Les zones de réponse créées dynamiquement par JavaScript doivent elles aussi être couvertes.
const jsWithDynamicTextareas=allPublicFiles.filter(x=>x.endsWith(".js") && fs.readFileSync(x,"utf8").includes("<textarea"));
for(const jsPath of jsWithDynamicTextareas){
  const pages=publicHtml.filter(p=>fs.readFileSync(p,"utf8").includes(jsPath.split("/").pop()));
  for(const p of pages){
    const source=fs.readFileSync(p,"utf8");
    if(!source.includes("site-nav.js") && !source.includes("/api/analyze")){
      errors.push(`${p}: réponses libres dynamiques de ${jsPath} sans couche de retour`);
    }
  }
}

// Le site peut expliquer l’usage de l’IA, mais ne doit jamais la présenter comme un substitut au travail de l’élève.
const visibleForbidden=[
  /\b(?:IA\s+)?brid[ée]e?\b/i,
  /\bdébrid[ée]e?\b/i,
  /\bdiabrid[ée]e?\b/i,
  /Demander à l[’']IA/i,
  /diagnostic IA/i,
  /aide IA/i,
  /accompagnement IA/i,
  /parcours IA/i,
  /IA sous protocole/i
];
const publicTextFiles=[...publicHtml,"access-control.js","annales-index.js","anthologie-bac.js","anthologie-brevet.js","exam-tools.js","free-response.js","brevet-writing-feedback.js"];
for(const p of publicTextFiles){
  if(!fs.existsSync(p)) continue;
  const source=fs.readFileSync(p,"utf8");
  for(const re of visibleForbidden){
    if(re.test(source)) errors.push(`${p}: mention publique interdite (${re})`);
  }
}

if(!fs.existsSync("free-response.js")) errors.push("Couche globale de retour libre absente");
else {
  const free=fs.readFileSync("free-response.js","utf8");
  if(!free.includes("Vérifier ma réponse")) errors.push("Couche globale: bouton de vérification absent");
  if(!free.includes("/api/analyze")) errors.push("Couche globale: moteur de retour absent");
}
const syntaxFiles=["free-response.js","brevet-writing-feedback.js","annales/entrainement-annale.js","worker/src/index.js","site-nav.js","exam-tools.js"];
for(const p of syntaxFiles){
  if(!fs.existsSync(p)) continue;
  try{ new Function(fs.readFileSync(p,"utf8").replace(/^export default\s*/m,"return ")); }
  catch(e){ if(p!=="worker/src/index.js") errors.push(`${p}: erreur de syntaxe — ${e.message}`); }
}

const worker=fs.existsSync("worker/src/index.js")?fs.readFileSync("worker/src/index.js","utf8"):"";
if(!worker.includes('exercise === "free-response"')) errors.push("Worker: réponses libres génériques non prises en charge");
if(!worker.includes('reason: "off_topic"') || !worker.includes('lock_hours: 24')) errors.push("Worker: suspension 24 h hors sujet absente");

const nav=fs.existsSync("site-nav.js")?fs.readFileSync("site-nav.js","utf8"):"";
if(!nav.includes("details.correction") || !nav.includes("tentative réelle")) errors.push("Navigation: verrouillage global des corrigés avant tentative absent");

if(!js.includes("suspensions") || !js.includes("L’aide ne s’ouvre qu’après une tentative réelle")) errors.push("Annales: tentative obligatoire / suspension locale absente");

const oralHtml=fs.existsSync("bac-oral.html")?fs.readFileSync("bac-oral.html","utf8"):"";
const oralJs=fs.existsSync("exam-tools.js")?fs.readFileSync("exam-tools.js","utf8"):"";
for(const id of ["oral-part1-done","oral-interview-first-done","oral-answer-done","oral-interview-finish"]){
  if(!oralHtml.includes(id)) errors.push(`Oral: contrôle ${id} absent de la page`);
  if(!oralJs.includes(id)) errors.push(`Oral: contrôle ${id} non câblé dans exam-tools.js`);
}

console.log(`Annales cataloguées: ${Object.keys(cat).length}`);
console.log(`Étapes/exercices: ${steps}`);
console.log(`Étapes avec retour: ${aiSteps}/${steps}`);
console.log(`Étapes gratuites: ${freeSteps}`);
console.log(`Étapes premium: ${premiumSteps}`);
if(warnings.length){
  console.log("\nAVERTISSEMENTS:");
  warnings.forEach(x=>console.log(" - "+x));
}
if(errors.length){
  console.error("\nÉCHECS:");
  errors.forEach(x=>console.error(" - "+x));
  process.exit(1);
}
console.log("\nAUDIT OK — chaque étape cataloguée possède une réponse attendue côté interface et un retour actif ; les réponses libres du site sont également couvertes.");
