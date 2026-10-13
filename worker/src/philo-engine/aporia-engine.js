/* Double aporie : noyau méthodologique prioritaire. */
export function buildAporia(subject, operator) {
  return {
    subject,
    operator,
    requirements: [],
    test: 'Deux exigences légitimes doivent être construites avant toute résolution.',
    status: 'structure'
  };
}
