// Moteur philosophique interne
// Couche de données non affichée : problèmes, matrices et résolutions.
// Ce module prépare les futurs liens avec les annales, auteurs, citations et exercices.

export async function chargerMoteurPhilosophique() {
  const reponse = await fetch('/data/moteur-philosophique.json');
  if (!reponse.ok) {
    throw new Error('Impossible de charger le moteur philosophique');
  }
  return await reponse.json();
}

export function trouverResolution(moteur, id) {
  return moteur.resolutions?.find((resolution) => resolution.id === id) || null;
}

export function trouverProbleme(moteur, id) {
  return moteur.problemes?.find((probleme) => probleme.id === id) || null;
}
