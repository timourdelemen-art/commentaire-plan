// Ne transmettre au navigateur ni erreur brute, ni requête, ni secret.
export async function analyzeFailure(response) {
  let detail;
  try { detail = (await response.json())?.error; } catch {}
  const code = typeof detail?.code === 'string' ? detail.code : '';
  const type = typeof detail?.type === 'string' ? detail.type : '';
  if ([code, type].includes('insufficient_quota') || [code, type].includes('billing_hard_limit_reached')) {
    return { code: 'ai_quota_exhausted', error: 'Le crédit du service de correction est épuisé. Le responsable du site doit le réapprovisionner.' };
  }
  if (response.status === 429) {
    return { code: 'ai_busy', error: 'Le service de correction reçoit trop de demandes. Réessayez dans quelques instants.' };
  }
  if ([401, 403].includes(response.status)) {
    return { code: 'ai_configuration', error: 'L’accès au service de correction doit être rétabli par le responsable du site.' };
  }
  return { code: 'ai_upstream_error', error: 'Le service de correction rencontre un incident. Réessayez dans quelques instants.' };
}
