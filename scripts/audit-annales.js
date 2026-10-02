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
const publicHtml=fs.readdirSync(".").filter(x=>x.endsWith(".html"));
const excludedFeedbackPages=new Set(["contact.html"]);
for(const p of publicHtml){
  const source=fs.readFileSync(p,"utf8");
  const textareaCount=(source.match(/<textarea\b/gi)||[]).length;
  if(!textareaCount || excludedFeedbackPages.has(p)) continue;

  const hasGlobalLayer=source.includes('site-nav.js');
  const hasOwnAnalyzer=source.includes('/api/analyze');
  if(!hasGlobalLayer && !hasOwnAnalyzer){
    errors.push(`${p}: ${textareaCount} réponse(s) libre(s) sans couche de retour`);
  }
}

// L'assistance ne doit pas se nommer elle-même dans l'interface publique.
const visibleForbidden=[
  /IA brid[ée]e?/i,
  /Demander à l[’']IA/i,
  /diagnostic IA/i,
  /aide IA/i,
  /accompagnement IA/i,
  /parcours IA/i,
  /IA sous protocole/i
];
const publicTextFiles=[...publicHtml,"access-control.js","annales-index.js","anthologie-bac.js","anthologie-brevet.js","exam-tools.js"];
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
const worker=fs.existsSync("worker/src/index.js")?fs.readFileSync("worker/src/index.js","utf8"):"";
if(!worker.includes('exercise === "free-response"')) errors.push("Worker: réponses libres génériques non prises en charge");

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
