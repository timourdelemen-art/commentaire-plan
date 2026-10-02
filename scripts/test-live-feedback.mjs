const ENDPOINT="https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze";
const origin="https://commentaire-plan.com";

async function call(body,label){
  const r=await fetch(ENDPOINT,{
    method:"POST",
    headers:{"Content-Type":"application/json","Origin":origin},
    body:JSON.stringify(body)
  });
  const text=await r.text();
  let data;
  try{data=JSON.parse(text);}catch{throw new Error(label+": réponse non JSON ("+r.status+") "+text.slice(0,200));}
  if(!r.ok||!data.ok) throw new Error(label+": échec HTTP "+r.status+" — "+(data.error||text.slice(0,200)));
  const f=data.feedback;
  if(!f||!["acquis","partiel","à reprendre"].includes(f.diagnostic)||!f.point_acquis||!f.manque_principal||!f.question_suivante){
    throw new Error(label+": contrat de retour invalide");
  }
  if(!String(f.question_suivante).trim().endsWith("?")) throw new Error(label+": la relance n'est pas une question");
  console.log("OK",label,"→",f.diagnostic);
}

await call({
  exercise:"hialmar-problematique",
  answer:"Comment le texte transforme-t-il la défaite physique de Hialmar en affirmation héroïque par sa parole ?"
},"Noyau Hialmar");

await call({
  exercise:"annale-guided",
  answer:"Comment Hialmar transforme-t-il une mort subie en maîtrise héroïque ?",
  context:{
    annale_id:"bac-2026-amerique-du-nord-general-commentaire-leconte-de-lisle-le-coeur-de-hialmar",
    examen:"Bac",
    type:"bac-commentaire",
    auteur:"Leconte de Lisle",
    oeuvre:"Le Cœur de Hialmar",
    etape:"problematique",
    kind:"problematique",
    consigne:"Formulez la question qui demande comment le texte produit cette transformation.",
    aide:"La question doit garder ensemble la défaite physique et l'affirmation héroïque.",
    manual_candidates:[]
  }
},"Annale Bac — problématique");

await call({
  exercise:"free-response",
  answer:"Le personnage referme doucement la porte et reste immobile ; cette immobilité peut suggérer une hésitation ou une difficulté à partir.",
  context:{
    page:"brevet-comprehension.html",
    title:"Brevet — compréhension",
    instruction:"Observation puis interprétation : dire ce que fait le personnage et expliquer ce que son immobilité peut suggérer en s'appuyant sur une expression précise.",
    quote:"Il referma doucement la porte, puis resta longtemps immobile sur le palier.",
    response_index:0
  }
},"Réponse libre générique");

console.log("TEST LIVE OK");
