import { OPERATION_CONTRACT } from './operation-contract.js';
import COPY20_DATA from '../../../scripts/copies20-data.json' with { type: 'json' };

export const COPY20_STAGE_ORDER = Object.keys(OPERATION_CONTRACT);

function isTransition(functionLabel) {
  return /^(?:la\s+)?transition(?:\s|·|$)/i.test(functionLabel);
}

function getStage(sectionIndex, functionLabel) {
  if (sectionIndex === 0) return 'introduction';
  if (sectionIndex === 4) return 'conclusion';
  if (sectionIndex === 1 && isTransition(functionLabel)) return 'transitionI-II';
  if (sectionIndex === 2 && isTransition(functionLabel)) return 'transitionII-III';

  const part = { 1: 'I', 2: 'II', 3: 'III' }[sectionIndex];
  const subpart = functionLabel.match(new RegExp(`^${part}\\.([123])\\b`));
  if (subpart) return `${part}.${subpart[1]}`;
  if (part === 'III') throw new Error(`Fonction COPY20 non classée en partie III : ${functionLabel}.`);
  return `partie${part}`;
}

function collectCopy20Functions() {
  const groups = Object.fromEntries(COPY20_STAGE_ORDER.map((stage) => [stage, new Set()]));
  const sectionCount = 5;

  for (const [copyId, sections] of Object.entries(COPY20_DATA)) {
    if (!Array.isArray(sections) || sections.length !== sectionCount) {
      throw new Error(`Structure COPY20 invalide pour ${copyId}.`);
    }

    sections.forEach((section, sectionIndex) => {
      if (!Array.isArray(section) || !Array.isArray(section[1])) {
        throw new Error(`Section COPY20 invalide pour ${copyId}.`);
      }

      for (const sentence of section[1]) {
        if (!Array.isArray(sentence) || typeof sentence[1] !== 'string' || !sentence[1].trim()) {
          throw new Error(`Fonction de phrase COPY20 invalide pour ${copyId}.`);
        }

        groups[getStage(sectionIndex, sentence[1])].add(sentence[1]);
      }
    });
  }

  return Object.fromEntries(
    COPY20_STAGE_ORDER.map((stage) => [stage, [...groups[stage]]])
  );
}

const COPY20_FUNCTIONS_BY_STAGE = collectCopy20Functions();

export function getCopy20SentenceFunctions() {
  return Object.fromEntries(
    COPY20_STAGE_ORDER.map((stage) => [stage, [...COPY20_FUNCTIONS_BY_STAGE[stage]]])
  );
}

const COPY20_ARGUMENT_FUNCTIONS_BY_STAGE = {
  introduction: [
    'scène d’ouverture',
    'analyse de la scène',
    'analyse des termes',
    'première réponse',
    'réponse contraire',
    'problématique',
    'annonce du parcours'
  ],
  partieI: ['thèse directrice'],
  'I.1': ['réponse directrice', 'raison', 'exemple analysé'],
  'I.2': ['argument de référence', 'exemple analysé', 'conséquence', 'développement de l’argument'],
  'I.3': ['limite interne : dérivation', 'formulation de la limite'],
  'transitionI-II': ['question de transition'],
  partieII: ['thèse contraire'],
  'II.1': ['exigence nouvelle', 'justification de l’exigence'],
  'II.2': ['argument contraire', 'argument de référence', 'exemple analysé', 'conséquence'],
  'II.3': ['limite interne : dérivation', 'formulation de la limite'],
  'transitionII-III': ['question de transition'],
  'III.1': ['acquis à préserver', 'problème commun'],
  'III.2': [
    'opération',
    'raison de l’opération',
    'exemple analysé',
    'mise à l’épreuve',
    'objection',
    'réponse à l’objection',
    'conséquence'
  ],
  'III.3': ['réponse stabilisée', 'portée et condition', 'reste'],
  conclusion: ['réponse au sujet', 'retour à la scène', 'question nouvelle']
};

export function getCopy20ArgumentFunctions() {
  return Object.fromEntries(
    COPY20_STAGE_ORDER.map((stage) => [stage, [...COPY20_ARGUMENT_FUNCTIONS_BY_STAGE[stage]]])
  );
}

export function reconstructCopy20Dissertation(stagedPhrases) {
  const textFor = (...stages) => stages.flatMap((stage) => {
    const entries = stagedPhrases?.[stage];
    if (!Array.isArray(entries)) return '';
    return entries
      .filter((entry) => entry && typeof entry.phrase === 'string')
      .map((entry) => entry.phrase);
  }).join(' ');
  const paragraphs = [
    [textFor('introduction')],
    [
      textFor('partieI', 'I.1'),
      textFor('I.2'),
      textFor('I.3')
    ],
    [textFor('transitionI-II')],
    [
      textFor('partieII', 'II.1'),
      textFor('II.2'),
      textFor('II.3')
    ],
    [textFor('transitionII-III')],
    [
      textFor('III.1'),
      textFor('III.2'),
      textFor('III.3')
    ],
    [textFor('conclusion')]
  ];

  return paragraphs
    .map((group) => group.filter(Boolean).join('\n'))
    .filter(Boolean)
    .join('\n\n');
}

function sentenceList(copy) {
  const body = copy
    .split(/\r?\n/)
    .filter((line) => !/^\s*(?:INTRODUCTION|CONCLUSION\.?|I{1,3}(?:\.\d+)?\.?\s+\S.*)\s*$/iu.test(line))
    .join('\n');
  const sentences = [];
  let start = 0;

  for (let index = 0; index < body.length; index += 1) {
    if (!'.!?'.includes(body[index])) continue;

    let end = index + 1;
    while (end < body.length && /[”»"'’)\]]/u.test(body[end])) end += 1;
    if (end < body.length && !/\s/u.test(body[end])) continue;

    const sentence = body.slice(start, end).trim();
    if (sentence) sentences.push(sentence.replace(/\s+/gu, ' '));
    while (end < body.length && /\s/u.test(body[end])) end += 1;
    start = end;
    index = end - 1;
  }

  const last = body.slice(start).trim();
  if (last) sentences.push(last.replace(/\s+/gu, ' '));
  return sentences;
}

export function validateCopy20Annotations(copy, stagedPhrases, { compareText = true } = {}) {
  const problems = [];
  const stageKeys = stagedPhrases && typeof stagedPhrases === 'object' && !Array.isArray(stagedPhrases)
    ? Object.keys(stagedPhrases)
    : [];

  if (stageKeys.length !== COPY20_STAGE_ORDER.length ||
      stageKeys.some((stage, index) => stage !== COPY20_STAGE_ORDER[index])) {
    problems.push('Les étapes des annotations COPY20 sont absentes ou désordonnées.');
  }

  const phrases = [];
  for (const stage of COPY20_STAGE_ORDER) {
    const entries = stagedPhrases?.[stage];
    if (!Array.isArray(entries) || (entries.length === 0 && !['partieI', 'partieII'].includes(stage))) {
      problems.push(`La liste des phrases de l’étape ${stage} est absente.`);
      continue;
    }

    for (const entry of entries) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry) ||
          ![3, 4].includes(Object.keys(entry).length) ||
          (Object.keys(entry).length === 4 && !Object.hasOwn(entry, 'operations')) ||
          typeof entry.phrase !== 'string' || !entry.phrase.trim() ||
          entry.phrase !== entry.phrase.trim() ||
          /[\r\n]/u.test(entry.phrase) ||
          typeof entry.fonction !== 'string' ||
          typeof entry.operation !== 'string' ||
          !entry.operation.trim()) {
        problems.push(`Une annotation de l’étape ${stage} n’a pas le format {phrase, fonction, operation}.`);
        continue;
      }
      if (!COPY20_ARGUMENT_FUNCTIONS_BY_STAGE[stage].includes(entry.fonction)) {
        problems.push(`Fonction COPY20 non autorisée pour l’étape ${stage}.`);
      }
      phrases.push({
        phrase: entry.phrase,
        fonction: entry.fonction,
        operation: entry.operation,
        ...(Object.hasOwn(entry, 'operations') ? { operations: entry.operations } : {})
      });
    }
  }

  const sentences = compareText && typeof copy === 'string' ? sentenceList(copy) : [];
  if (compareText) {
    const normalizedPhrases = phrases.map(({ phrase }) => phrase.replace(/\s+/gu, ' '));
    if (normalizedPhrases.length !== sentences.length ||
        normalizedPhrases.some((phrase, index) => phrase !== sentences[index])) {
      problems.push('Les annotations ne correspondent pas exactement, phrase par phrase, à la copie.');
    }
  }

  return {
    ok: problems.length === 0,
    problems,
    phrases,
    annotationCount: phrases.length,
    sentenceCount: compareText ? sentences.length : phrases.length,
    philosophicalNecessityEvaluated: false
  };
}
