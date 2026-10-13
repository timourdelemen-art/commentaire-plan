/*
  Orchestrateur du moteur philosophique du site.
  Architecture :
  sujet -> opérateurs -> double aporie -> scène -> problématique -> plan dynamique
  -> résolution/reste -> citations -> rédaction -> audit.

  Les sous-moteurs restent séparés pour permettre la génération de copies
  et la génération industrielle d'exercices à partir d'une même carte philosophique.
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
      const audit = await services.auditEngine?.check({subject, aporia, scene, plan, resolution, citations});

      return {subject, operator, aporia, scene, problem, plan, resolution, citations, audit};
    }
  };
}
