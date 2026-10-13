/* Adaptateurs vers les ressources déjà présentes dans le site.
   Le moteur central ne remplace pas les données éditoriales : il les orchestre.
*/
export const SOURCES = {
  corpus: 'data/philosophie-matrices.json + corpus des 11000 sujets à analyser',
  scenes: 'philosophie-exemples-data.js',
  copies20: 'scripts/copies20-resolutions.json',
  plans: 'PHILOSOPHIE-THEORIE-PLAN.md',
  citations: 'base philosophes authentifiés à construire'
};

export function createPhiloCard(subject, modules={}) {
  return {
    subject,
    operator: modules.operator || null,
    aporia: modules.aporia || null,
    scene: modules.scene || null,
    problem: modules.problem || null,
    dynamicPlan: modules.dynamicPlan || null,
    resolution: modules.resolution || null,
    citations: modules.citations || [],
    audit: modules.audit || null
  };
}
