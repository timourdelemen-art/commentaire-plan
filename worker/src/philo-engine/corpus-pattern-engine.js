/*
Analyse structurelle du corpus des 11000 sujets.
Le corpus sert à reconnaître des familles de problèmes, jamais à imposer une réponse.
*/

export function analyzeCorpusPattern(subject, corpus = []) {
  const operators = [
    'peut-on',
    'faut-il',
    'toujours',
    'sans',
    'seulement',
    'suffit-il'
  ];

  const foundOperators = operators.filter(op =>
    String(subject).toLowerCase().includes(op)
  );

  return {
    subject,
    operators: foundOperators,
    families: [],
    hypotheses: [],
    validationRule:
      'Toute hypothèse issue du corpus doit être validée par la construction effective d’une double aporie.'
  };
}
