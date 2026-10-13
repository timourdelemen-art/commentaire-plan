/*
Schéma de la mémoire de citations.
Une citation est indexée par fonction philosophique, pas par célébrité.
*/

export const CITATION_FUNCTIONS = [
  'conceptualisation',
  'construction-exigence',
  'objection',
  'resolution',
  'reste'
];

export function validateCitation(entry) {
  return {
    authentic: Boolean(entry?.source),
    functionDefined: CITATION_FUNCTIONS.includes(entry?.function),
    independentReasoningRequired: true
  };
}
