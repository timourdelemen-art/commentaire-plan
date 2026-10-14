import assert from 'node:assert/strict';
import worker from './index.js';

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const logEntries = [];
const sensitiveValues = [
  'test-openai-api-key',
  'sujet-confidentiel',
  'prompt-confidentiel',
  'donnee-personnelle'
];

globalThis.fetch = async () => new Response(JSON.stringify({
  error: {
    code: 'rate_limit_exceeded',
    type: 'rate_limit_error',
    message: sensitiveValues.join(' ')
  }
}), {
  status: 429,
  headers: { 'x-request-id': 'req_diagnostic_test_123' }
});
console.error = (...args) => logEntries.push(args);

try {
  const response = await worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': 'openai-error-diagnostics-test',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sujet: 'sujet-confidentiel suffisamment long' })
    }
  ), { OPENAI_API_KEY: 'test-openai-api-key' });
  const body = await response.json();

  assert.equal(response.status, 502);
  assert.deepEqual(body, { ok: false, error: 'Le moteur IA a refusé la génération.' });
  assert.equal(logEntries.length, 1);
  assert.deepEqual(JSON.parse(logEntries[0][1]), {
    status: 429,
    code: 'rate_limit_exceeded',
    type: 'rate_limit_error',
    requestId: 'req_diagnostic_test_123'
  });

  const loggedText = JSON.stringify(logEntries);
  for (const value of sensitiveValues) {
    assert.equal(loggedText.includes(value), false, `Les logs ne doivent pas contenir ${value}.`);
  }
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
}

console.log('OK : diagnostic HTTP OpenAI journalisé sans fuite de données sensibles.');
