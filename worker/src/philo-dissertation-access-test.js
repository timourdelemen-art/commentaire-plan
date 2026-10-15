import assert from 'node:assert/strict';
import worker from './index.js';

const originalFetch = globalThis.fetch;
let upstreamCalls = 0;
globalThis.fetch = async () => { upstreamCalls += 1; throw new Error('Appel réseau interdit pendant la pause.'); };
const request = (path, body = '{"sujet":"Un bien peut-il sortir d’un mal ?","DISSERTATION_GENERATION_ENABLED":"true"}') => new Request(
  `https://worker.example${path}`, {
    method: 'POST', headers: { Origin: 'https://commentaire-plan.com', 'Content-Type': 'application/json' }, body
  }
);
try {
  for (const value of [undefined, 'false', 'TRUE', '1', true]) {
    const response = await worker.fetch(request('/api/generate-dissertation'), {
      OPENAI_API_KEY: 'test-key', DISSERTATION_GENERATION_ENABLED: value
    });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'dissertation_disabled');
  }
  // Le blocage précède aussi la lecture du corps et la vérification de clé.
  const malformed = await worker.fetch(request('/api/generate-dissertation', '{'), {});
  assert.equal((await malformed.json()).code, 'dissertation_disabled');
  const analyze = await worker.fetch(request('/api/analyze'), {});
  assert.equal((await analyze.json()).setup, true, 'La route de correction conserve son propre parcours.');
  assert.equal(upstreamCalls, 0);
  console.log('OK : génération fermée par défaut, sans appel réseau ; route de correction conservée.');
} finally {
  globalThis.fetch = originalFetch;
}
