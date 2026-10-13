/* Plan dynamique : chaque sous-partie possède une fonction démonstrative. */
export function buildDynamicPlan(problem, aporia) {
  return {
    problem,
    aporia,
    parts: {
      I: ['installer la première réponse', 'la renforcer', 'révéler sa limite interne'],
      II: ['introduire la seconde exigence', 'la renforcer', 'révéler sa limite interne'],
      III: ['conserver les acquis', 'effectuer l’opération résolutoire', 'produire et analyser le reste']
    },
    transitions: ['question issue de la limite de I', 'question issue de l’insuffisance commune de I et II']
  };
}
