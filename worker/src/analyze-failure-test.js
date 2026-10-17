import assert from 'node:assert/strict';
import worker from './index.js';

const originalFetch = globalThis.fetch;
const request = () => new Request('https://worker.example/api/analyze', {
  method: 'POST', headers: { Origin: 'https://commentaire-plan.com', 'Content-Type': 'application/json' },
  body: JSON.stringify({ exercise: 'free-response', answer: 'Pour être juste, il ne suffit pas d’obéir aux lois. Un homme peut obéir seulement par peur. Obéir est nécessaire mais il faut aussi juger les lois.', context: {
    page: 'philosophie-dissertation-entrainement.html', kind: 'lecture', philo_kind: 'philo-reponse',
    quote: 'Pour être juste, suffit-il d’obéir aux lois ?',
    instruction: 'Répondez en une phrase, donnez un cas où l’on obéit sans être juste, puis complétez : Obéir aux lois est sans doute nécessaire pour être juste, mais…'
  } })
});
try {
  for (const [status, error, expected] of [
    [429, { code: 'insufficient_quota' }, 'ai_quota_exhausted'],
    [429, { type: 'insufficient_quota' }, 'ai_quota_exhausted'],
    [429, { code: 'rate_limit_exceeded' }, 'ai_busy'],
    [401, {}, 'ai_configuration'], [403, {}, 'ai_configuration'], [500, {}, 'ai_upstream_error']
  ]) {
    globalThis.fetch = async () => Response.json({ error: { ...error, message: 'secret-test-do-not-leak' } }, { status });
    const r = await worker.fetch(request(), { OPENAI_API_KEY: 'secret-test-do-not-leak' });
    const data = await r.json();
    assert.equal(r.status, 502); assert.equal(data.ok, false); assert.equal(data.code, expected);
    assert(!JSON.stringify(data).includes('secret-test-do-not-leak'));
  }
  globalThis.fetch = async () => { throw new TypeError('network secret-test-do-not-leak'); };
  assert.equal((await (await worker.fetch(request(), { OPENAI_API_KEY: 'test' })).json()).code, 'ai_connection');
  for (const upstream of [Response.json({ output: [] }), new Response('not JSON')]) {
    globalThis.fetch = async () => upstream;
    const r = await worker.fetch(request(), { OPENAI_API_KEY: 'test' });
    const data = await r.json();
    assert.equal(r.status, 502); assert.equal(data.code, 'ai_invalid_response'); assert(!data.feedback);
  }
  let prompt;
  globalThis.fetch = async (_url, options) => {
    prompt = JSON.parse(options.body).instructions;
    return Response.json({ output_text: JSON.stringify({ diagnostic: 'acquis', point_acquis: 'Vous distinguez conformité et justice.', manque_principal: 'Rien d’essentiel ne manque.', question_suivante: 'Quel autre cas permettrait de vérifier cette distinction ?' }) });
  };
  const valid = await worker.fetch(request(), { OPENAI_API_KEY: 'test' });
  assert.equal(valid.status, 200); assert.equal((await valid.json()).feedback.diagnostic, 'acquis');
  assert(prompt.includes('Ne jamais exiger la formule'));
  assert(prompt.includes('Obéir aux lois est sans doute nécessaire'));
  console.log('OK : crédit, surcharge, accès, connexion, réponse invalide, absence de fuite et respect de la consigne locale.');
} finally { globalThis.fetch = originalFetch; }
