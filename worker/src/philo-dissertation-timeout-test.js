import assert from 'node:assert/strict';
import worker from './index.js';

const originalFetch = globalThis.fetch;
const originalInfo = console.info;
const originalError = console.error;
const logs = [];
const sensitiveValues = [
  'test-openai-api-key',
  'sujet-confidentiel-ne-pas-journaliser',
  'copie-confidentielle-ne-pas-journaliser'
];

console.info = (...args) => logs.push(args);
console.error = (...args) => logs.push(args);

async function requestGeneration(fetchMock, clientId) {
  globalThis.fetch = fetchMock;
  return worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': clientId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sujet: `Peut-on penser ${sensitiveValues[1]} ?`
      })
    }
  ), {
    OPENAI_API_KEY: sensitiveValues[0],
    DISSERTATION_OPENAI_TIMEOUT_MS: '1000'
  });
}

try {
  for (const [clientId, fetchMock] of [
    [
      'dissertation-fetch-timeout-test',
      (_url, options) => new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        }, { once: true });
      })
    ],
    [
      'dissertation-body-timeout-test',
      (_url, options) => {
        let streamController;
        const body = new ReadableStream({
          start(controller) {
            streamController = controller;
          }
        });
        options.signal.addEventListener('abort', () => {
          streamController.error(new DOMException('Aborted', 'AbortError'));
        }, { once: true });
        return Promise.resolve(new Response(body, { status: 200 }));
      }
    ]
  ]) {
    const response = await requestGeneration(fetchMock, clientId);
    const result = await response.json();
    assert.equal(response.status, 502);
    assert.deepEqual(result, {
      ok: false,
      error: 'Le moteur IA n’a pas répondu dans le délai maximal de 1 seconde.',
      diagnostic: { code: 'openai_timeout' }
    });
  }

  const serializedLogs = JSON.stringify(logs);
  for (const value of sensitiveValues) {
    assert.equal(serializedLogs.includes(value), false, `Les logs ne doivent pas contenir ${value}.`);
  }
  const generationEvents = logs
    .filter(([message]) => typeof message === 'string')
    .map(([message]) => JSON.parse(message))
    .filter(({ event }) => event === 'dissertation_generation');
  assert.equal(generationEvents.filter(({ stage }) => stage === 'openai_request_started').length, 2);
  assert.equal(generationEvents.filter(({ stage }) => stage === 'openai_timeout').length, 2);
  assert.ok(generationEvents.every(({ duration_ms }) => Number.isInteger(duration_ms) && duration_ms >= 0));
  assert.ok(generationEvents.every(({ stage, error_code }) =>
    stage !== 'openai_timeout' || error_code === 'openai_timeout'
  ));
  console.log('OK : les délais Worker interrompent l’appel et la lecture du corps sans journaliser le contenu.');
} finally {
  globalThis.fetch = originalFetch;
  console.info = originalInfo;
  console.error = originalError;
}
