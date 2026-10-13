/*
Couche corpus 11000 sujets.
Le corpus sert à cartographier les formes de problèmes,
jamais à remplacer l'analyse philosophique du sujet.
*/

export function analyzeCorpusPattern(subject, corpus = []) {
  return {
    subject,
    possibleFamilies: [],
    operators: [],
    hypotheses: [],
    rule: "Les hypothèses issues du corpus doivent être validées par la double aporie."
  };
}
