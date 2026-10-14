import assert from 'node:assert/strict';
import worker from './index.js';

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const logEntries = [];
const sensitiveValues = [
  'test-openai-api-key',
  'sujet-confidentiel',
  'prompt-confidentiel',
  'donnee_personnelle'
];
const sujet = 'sujet-confidentiel suffisamment long donnee_personnelle';
let upstreamError = {
  error: {
    code: 'rate_limit_exceeded',
    type: 'rate_limit_error',
    message: sensitiveValues.join(' '),
    param: sensitiveValues.join(' '),
    response: sensitiveValues.join(' ')
  },
  instructions: sensitiveValues.join(' '),
  subject: sensitiveValues.join(' '),
  output: sensitiveValues.join(' ')
};

globalThis.fetch = async () => new Response(JSON.stringify(upstreamError), {
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
      body: JSON.stringify({ sujet })
    }
  ), { OPENAI_API_KEY: 'test-openai-api-key' });
  const body = await response.json();

  assert.equal(response.status, 502);
  assert.deepEqual(body, {
    ok: false,
    error: 'Le moteur IA a refusé la génération.',
    diagnostic: {
      status: 429,
      code: 'rate_limit_exceeded',
      type: 'rate_limit_error'
    }
  });

  const browserText = JSON.stringify(body);
  for (const value of sensitiveValues) {
    assert.equal(browserText.includes(value), false, `Le diagnostic ne doit pas contenir ${value}.`);
  }

  upstreamError = {
    error: {
      code: 'donnee_personnelle',
      type: 'rate_limit_error',
      message: sensitiveValues.join(' ')
    }
  };
  const secondResponse = await worker.fetch(new Request(
    'https://worker.example/api/generate-dissertation',
    {
      method: 'POST',
      headers: {
        Origin: 'https://commentaire-plan.com',
        'CF-Connecting-IP': 'openai-error-diagnostics-test',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sujet })
    }
  ), { OPENAI_API_KEY: 'test-openai-api-key' });
  const secondBody = await secondResponse.json();
  assert.deepEqual(secondBody.diagnostic, {
    status: 429,
    code: null,
    type: 'rate_limit_error'
  });
  const secondBrowserText = JSON.stringify(secondBody);
  for (const value of sensitiveValues) {
    assert.equal(secondBrowserText.includes(value), false, `Le diagnostic ne doit pas contenir ${value}.`);
  }

  assert.equal(logEntries.length, 2);
  assert.deepEqual(JSON.parse(logEntries[0][1]), {
    status: 429,
    code: 'rate_limit_exceeded',
    type: 'rate_limit_error',
    requestId: 'req_diagnostic_test_123'
  });
  assert.deepEqual(JSON.parse(logEntries[1][1]), {
    status: 429,
    code: null,
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
