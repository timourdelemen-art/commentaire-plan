import { buildPhiloGenerationInstruction } from './philo-dissertation-generator.js';
import { auditPhiloCopySentences } from './philo-sentence-audit.js';

function extractOutputText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) return data.output_text.trim();
  for (const item of data.output || []) {
    for (const part of item.content || []) {
      if (part.type === 'output_text' && typeof part.text === 'string') return part.text.trim();
    }
  }
  return '';
}

export async function generatePhilosophicalDissertation(sujet, env) {
  const moteur = buildPhiloGenerationInstruction(sujet);

  const payload = {
    model: env.OPENAI_MODEL || 'gpt-5-mini',
    instructions:
      'Tu es le générateur de dissertation philosophique du site Commentaire Plan.\n' +
      'Utilise le moteur philosophique fourni pour construire une dissertation complète.\n\n' +
      moteur,
    input: [
      {
        role: 'user',
        content: [
          { type: 'input_text', text: 'Sujet de dissertation : ' + sujet }
        ]
      }
    ],
    max_output_tokens: 6000,
    store: false
  };

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + env.OPENAI_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Le moteur IA a refusé la génération.');
  }

  const data = await response.json();
  const copie = extractOutputText(data);

  return {
    copie,
    audit: auditPhiloCopySentences(copie)
  };
}
