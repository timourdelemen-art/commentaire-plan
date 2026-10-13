/* Analyse des opérateurs du sujet : orientation, jamais recette automatique. */
const OPERATORS={
  "peut-on":"conditions de possibilité",
  "faut-il":"exigence normative et conflit de valeurs",
  "toujours":"universalisation et cas limite",
  "seulement":"test de réduction",
  "sans":"test de séparabilité",
  "suffit-il":"condition nécessaire et suffisante",
  "pourquoi":"explication et reste",
  "à quoi sert":"fonction et dépassement de l'utilité"
};
export function analyzeOperator(subject){
 const s=String(subject||'').toLowerCase();
 const found=Object.keys(OPERATORS).find(k=>s.includes(k));
 return {operator:found||null,function:found?OPERATORS[found]:"analyse libre",principle:"L'opérateur oriente la double aporie sans déterminer la problématique."};
}
