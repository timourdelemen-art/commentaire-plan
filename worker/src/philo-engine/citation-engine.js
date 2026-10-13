/* Citation Engine : une citation intervient seulement pour une fonction argumentative identifiée. */
export function selectCitations(argumentStructure) {
  return {
    argumentStructure,
    allowedFunctions: [
      'conceptualiser',
      'renforcer une exigence',
      'construire une objection',
      'soutenir une résolution',
      'éclairer le reste'
    ],
    rules: [
      'la pensée autonome précède la citation',
      'la citation doit être authentifiée',
      'une citation décorative est supprimée'
    ]
  };
}
