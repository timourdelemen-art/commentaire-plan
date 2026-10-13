/*
  Une carte philosophique peut alimenter le site :
  - copie complète
  - problématique
  - plan
  - résolution
  - citation
  - scène
*/
export function buildExercises(card){
 return [
  {type:'problematique', source:card.problem},
  {type:'plan-dynamique', source:card.dynamicPlan},
  {type:'resolution', source:card.resolution},
  {type:'citation-fonction', source:card.citations},
  {type:'scene-ouverture', source:card.scene}
 ];
}
