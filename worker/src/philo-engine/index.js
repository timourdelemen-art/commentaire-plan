/*
  Orchestrateur du moteur philosophique du site.

  Chaîne complète :
  sujet -> opérateurs -> double aporie -> scène -> problématique
  -> plan dynamique -> résolution/reste -> citations -> rédaction -> audit
  -> exercices.

  La carte philosophique produite sert de source commune à toutes les sorties
  du site : copie, exercices, corrections et parcours.
*/

export function buildPhiloEngine(services = {}) {
  return {
    async analyze(subject) {
      const operator = await services.operatorEngine?.analyze(subject);
      const aporia = await services.aporiaEngine?.build(subject, operator);
      const scene = await services.sceneEngine?.select(subject, aporia);
      const problem = await services.problemEngine?.formulate(subject, aporia, scene);
      const plan = await services.planEngine?.build(problem, aporia);
      const resolution = await services.resolutionEngine?.compare(plan, aporia);
      const citations = await services.citationEngine?.select(plan, resolution);
      const card = services.cardBuilder?.create(subject, {operator, aporia, scene, problem, plan, resolution, citations});
      const audit = await services.auditEngine?.check(card || {subject, operator, aporia, scene, problem, plan, resolution, citations});
      const exercises = await services.exerciseEngine?.generate(card);

      return {subject, operator, aporia, scene, problem, plan, resolution, citations, card, audit, exercises};
    }
  };
}
