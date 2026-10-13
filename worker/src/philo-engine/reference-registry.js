/* Registre des sources à raccorder progressivement.
   Le moteur distingue les données validées des ressources à analyser.
*/

export const PHILO_REFERENCE_REGISTRY = {
  corpus11000: {
    role: 'analyser les formes de sujets et familles de problèmes',
    priority: 'structurelle'
  },
  scenes: {
    role: 'sélectionner des scènes authentiques capables de déployer la double aporie',
    priority: 'illustration philosophique contrôlée'
  },
  resolutions: {
    role: 'comparer les opérations selon acquis, coût et reste',
    priority: 'troisième partie'
  },
  citations: {
    role: 'sélectionner des références selon une fonction argumentative précise',
    priority: 'après construction du raisonnement'
  }
};
