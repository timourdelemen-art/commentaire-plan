// Point d'entree stable pour le futur branchement du generateur de copies.
// Ce module sert de passerelle entre le flux de creation de copie et le moteur philosophique.
// Il reste interne tant que le parcours utilisateur n'est pas branche.

import { analyserSujetTest } from './generateur-copies-test.js';

export async function preparerCopieAvecMoteur(sujet) {
  const analyse = await analyserSujetTest(sujet);

  return {
    sujet,
    analyseInterne: analyse.analyseInterne,
    pretPourGeneration: true
  };
}
