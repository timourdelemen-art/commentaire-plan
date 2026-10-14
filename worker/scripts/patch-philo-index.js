import fs from 'node:fs';

const path = 'worker/src/index.js';

let content = fs.readFileSync(path, 'utf8');

const importAnchor = "import { PHILO_GENERATION_POLICY } from './philo-generation-policy.js';";
const newImport = importAnchor + "\nimport { generatePhilosophicalDissertation } from './philo-dissertation-route.js';";

if (!content.includes("generatePhilosophicalDissertation")) {
  if (!content.includes(importAnchor)) {
    throw new Error('Import anchor not found');
  }
  content = content.replace(importAnchor, newImport);
}

const oldBlock = `const payload = {\n        model: env.OPENAI_MODEL || "gpt-5-mini",\n        instructions: PHILO_GENERATION_POLICY,`;

if (content.includes(oldBlock)) {
  const newBlock = `const result = await generatePhilosophicalDissertation(sujet, env);\n      return json({\n        ok: true,\n        sujet,\n        copie: result.copie,\n        audit: result.audit\n      }, 200, origin);`;
  content = content.replace(oldBlock, newBlock);
}

fs.writeFileSync(path, content);
console.log('Patch philosophique appliqué à index.js');
