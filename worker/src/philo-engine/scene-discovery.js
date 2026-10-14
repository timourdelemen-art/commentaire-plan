const WIKISOURCE_API = 'https://fr.wikisource.org/w/api.php';
const INTERNET_ARCHIVE_SEARCH = 'https://archive.org/advancedsearch.php';
const INTERNET_ARCHIVE_METADATA = 'https://archive.org/metadata/';
const MAX_QUERIES = 3;
const RESULTS_PER_QUERY = 4;
const MAX_CANDIDATES = 12;
const MAX_OCR_BYTES = 2_000_000;
const STOP_WORDS = new Set([
  'alors', 'avec', 'ceci', 'cela', 'cette', 'comme', 'dans', 'donc', 'elle',
  'elles', 'entre', 'être', 'faire', 'faut', 'leur', 'leurs', 'mais', 'même',
  'moins', 'nous', 'parce', 'peut', 'peut-on', 'pour', 'pourquoi', 'quand',
  'sans', 'serait', 'sont', 'sous', 'tous', 'tout', 'toute', 'toutes', 'une',
  'vous', 'dans', 'avec', 'est-ce'
]);

function words(value) {
  return [...new Set(
    String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .match(/[a-z]{4,}/g) || []
  )].filter((word) => !STOP_WORDS.has(word));
}

function requireAporia(aporia) {
  const fields = [
    'firstResponse',
    'firstDifficulty',
    'contraryResponse',
    'contraryDifficulty'
  ];
  if (!aporia || fields.some((field) =>
    typeof aporia[field] !== 'string' || aporia[field].trim().length < 8
  )) {
    throw new Error('La double aporie est incomplète : la recherche documentaire est impossible.');
  }
}

export function buildSceneSearchQueries(subject, aporia) {
  requireAporia(aporia);
  const queryGroups = [
    words(subject),
    words(`${aporia.firstResponse} ${aporia.firstDifficulty}`),
    words(`${aporia.contraryResponse} ${aporia.contraryDifficulty}`)
  ];
  const queries = queryGroups
    .map((group) => group.slice(0, 8).join(' '))
    .filter((query) => query.split(' ').length >= 2);
  if (queries.length === 0) {
    throw new Error('Le sujet ne fournit pas assez de termes pour une recherche documentaire.');
  }
  return [...new Set(queries)].slice(0, MAX_QUERIES);
}

function decodeSnippet(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (match, number) => {
      const codePoint = Number(number);
      return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : match;
    })
    .replace(/&#x([a-f\d]+);/gi, (match, number) => {
      const codePoint = Number.parseInt(number, 16);
      return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : match;
    })
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function apiUrl(base, params) {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  return url;
}

async function fetchJson(fetcher, url, source) {
  const response = await fetcher(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) {
    throw new Error(`${source} a répondu HTTP ${response.status}.`);
  }
  return response.json();
}

async function searchWikisource(queries, fetcher) {
  const rightsData = await fetchJson(fetcher, apiUrl(WIKISOURCE_API, {
    action: 'query',
    meta: 'siteinfo',
    siprop: 'rightsinfo',
    format: 'json'
  }), 'Wikisource');
  const platformLicense = rightsData?.query?.rightsinfo;
  if (typeof platformLicense?.url !== 'string' ||
      typeof platformLicense?.text !== 'string') {
    throw new Error('Wikisource ne fournit pas ses métadonnées de licence.');
  }

  const errors = [];
  const searchResults = (await Promise.all(queries.map(async (query) => {
    try {
      const data = await fetchJson(fetcher, apiUrl(WIKISOURCE_API, {
        action: 'query',
        list: 'search',
        srsearch: query,
        srnamespace: 0,
        srlimit: RESULTS_PER_QUERY,
        format: 'json',
        utf8: 1
      }), 'Wikisource');
      return (data?.query?.search || []).map((result) => ({ ...result, matchedQuery: query }));
    } catch (error) {
      errors.push({ query, message: error.message });
      return [];
    }
  }))).flat();
  const pageIds = [...new Set(
    searchResults.map((result) => result.pageid).filter(Number.isInteger)
  )];
  const pageData = pageIds.length
    ? await fetchJson(fetcher, apiUrl(WIKISOURCE_API, {
      action: 'query',
      prop: 'info',
      inprop: 'url',
      pageids: pageIds.join('|'),
      format: 'json'
    }), 'Wikisource').catch((error) => {
      errors.push({ query: null, message: error.message });
      return {};
    })
    : {};
  const pagesById = new Map(
    Object.values(pageData?.query?.pages || {}).map((page) => [page.pageid, page])
  );
  const documents = [];
  for (const result of searchResults) {
    const canonicalUrl = pagesById.get(result.pageid)?.fullurl;
    if (typeof canonicalUrl !== 'string' ||
        !canonicalUrl.startsWith('https://fr.wikisource.org/wiki/')) {
      errors.push({
        query: result.matchedQuery,
        message: `Wikisource n’a pas fourni d’URL canonique vérifiable pour ${result.title}.`
      });
      continue;
    }
    documents.push({
      id: `wikisource:${result.pageid}`,
      provider: 'Wikisource',
      title: result.title,
      author: null,
      locator: canonicalUrl,
      sourceUrl: canonicalUrl,
      excerpt: decodeSnippet(result.snippet),
      excerptKind: 'search-index-snippet',
      sourceEvidenceStatus: 'search-result-not-checked-against-full-text',
      candidateStatus: 'document-lead-not-scene',
      platformLicense: {
        name: platformLicense.text,
        url: platformLicense.url
      },
      underlyingWorkRights: 'not-established',
      usageEligibility: 'human-copyright-review-required',
      matchedQuery: result.matchedQuery
    });
  }
  return { documents, errors };
}

function licenseStatus(record) {
  const rawLicense = String(record.licenseurl || '');
  let licenseUrl;
  try {
    licenseUrl = new URL(rawLicense);
  } catch {
    licenseUrl = null;
  }
  const allowedLicenses = new Set([
    '/licenses/by/4.0/',
    '/licenses/by-sa/4.0/',
    '/publicdomain/mark/1.0/',
    '/publicdomain/zero/1.0/'
  ]);
  const explicitOpenLicense = licenseUrl?.protocol === 'https:' &&
    licenseUrl.hostname === 'creativecommons.org' &&
    allowedLicenses.has(licenseUrl.pathname);
  const declaredPublicDomain = /public domain|domaine public/i.test(
    String(record.rights || '')
  );
  return {
    eligible: explicitOpenLicense || declaredPublicDomain,
    label: String(record.rights || (explicitOpenLicense ? rawLicense : '')).slice(0, 300),
    url: explicitOpenLicense ? licenseUrl.href : null
  };
}

async function readBoundedText(response, maxBytes) {
  if (!response.ok) throw new Error(`Internet Archive a répondu HTTP ${response.status}.`);
  const declaredSize = Number(response.headers.get('content-length') || 0);
  if (declaredSize > maxBytes) throw new Error('Fichier OCR au-delà de la limite de taille.');
  if (!response.body) throw new Error('Le fichier OCR n’a pas de contenu lisible.');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new Error('Fichier OCR au-delà de la limite de taille.');
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

function excerptFromText(text, aporia) {
  const terms = [
    ...words(aporia.firstResponse),
    ...words(aporia.firstDifficulty),
    ...words(aporia.contraryResponse),
    ...words(aporia.contraryDifficulty)
  ];
  let normalized = '';
  const rawOffsets = [];
  for (let rawOffset = 0; rawOffset < text.length;) {
    const character = String.fromCodePoint(text.codePointAt(rawOffset));
    const folded = character.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    for (const foldedCharacter of folded) {
      normalized += foldedCharacter;
      rawOffsets.push(rawOffset);
    }
    rawOffset += character.length;
  }
  const matchIndexes = terms
    .map((term) => normalized.indexOf(term))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b);
  if (matchIndexes.length === 0) return { excerpt: '', characterOffset: null };
  const index = rawOffsets[matchIndexes[0]];
  const start = Math.max(0, index - 240);
  return {
    excerpt: text.slice(start, Math.min(text.length, index + 480))
      .replace(/\s+/g, ' ')
      .trim(),
    characterOffset: start
  };
}

async function internetArchiveExcerpt(identifier, fetcher, aporia) {
  const metadata = await fetchJson(
    fetcher,
    new URL(encodeURIComponent(identifier), INTERNET_ARCHIVE_METADATA),
    'Internet Archive'
  );
  const files = Array.isArray(metadata.files) ? metadata.files : [];
  const textFile = files.find((file) =>
    typeof file.name === 'string' &&
    /^[\w.-]+$/.test(file.name) &&
    (file.name.endsWith('_djvu.txt') || file.format === 'Text') &&
    Number(file.size || 0) <= MAX_OCR_BYTES
  );
  if (!textFile) return { excerpt: '', excerptKind: 'no-bounded-ocr-found' };

  const textUrl = new URL(
    `${encodeURIComponent(identifier)}/${encodeURIComponent(textFile.name)}`,
    'https://archive.org/download/'
  );
  const response = await fetcher(textUrl, { signal: AbortSignal.timeout(8000) });
  const text = await readBoundedText(response, MAX_OCR_BYTES);
  return {
    ...excerptFromText(text, aporia),
    excerptKind: 'archive-ocr-excerpt',
    ocrFile: textFile.name,
    ocrSourceUrl: textUrl.href
  };
}

async function searchInternetArchive(queries, aporia, fetcher) {
  const recordsByIdentifier = new Map();
  const excludedRecords = [];
  const errors = [];
  await Promise.all(queries.map(async (query) => {
    try {
      const searchUrl = apiUrl(INTERNET_ARCHIVE_SEARCH, {
        q: `mediatype:texts AND (${query.split(' ').map((term) => `"${term}"`).join(' OR ')})`,
        fl: 'identifier,title,creator,date,licenseurl,rights',
        rows: RESULTS_PER_QUERY,
        page: 1,
        output: 'json'
      });
      const data = await fetchJson(fetcher, searchUrl, 'Internet Archive');
      for (const record of data?.response?.docs || []) {
        const identifier = String(record.identifier || '');
        if (!/^[\w.-]+$/.test(identifier)) continue;
        const rights = licenseStatus(record);
        if (!rights.eligible) {
          excludedRecords.push({
            identifier,
            title: record.title,
            reason: 'Aucune licence ouverte ou mention de domaine public exploitable dans les métadonnées.'
          });
          continue;
        }
        if (!recordsByIdentifier.has(identifier)) {
          recordsByIdentifier.set(identifier, { record, rights, matchedQuery: query });
        }
      }
    } catch (error) {
      errors.push({ query, message: error.message });
    }
  }));

  const documents = [...recordsByIdentifier.values()].map(({ record, rights, matchedQuery }) => {
    const identifier = String(record.identifier);
    return {
      id: `archive:${identifier}`,
      provider: 'Internet Archive',
      title: String(record.title || ''),
      author: Array.isArray(record.creator)
        ? record.creator.join('; ')
        : String(record.creator || ''),
      date: String(record.date || ''),
      locator: `https://archive.org/details/${encodeURIComponent(identifier)}`,
      sourceUrl: `https://archive.org/details/${encodeURIComponent(identifier)}`,
      excerpt: '',
      excerptKind: 'metadata-only',
      ocrFile: null,
      ocrSourceUrl: null,
      ocrCharacterOffset: null,
      license: rights,
      sourceEvidenceStatus: 'item-metadata-and-bounded-ocr',
      candidateStatus: 'document-lead-not-scene',
      licenseDeclarationSource: 'Internet Archive item metadata; not independently verified',
      underlyingWorkRights: 'source-metadata-declares-open-license',
      usageEligibility: 'source-license-claim-needs-human-rights-review',
      matchedQuery
    };
  });
  await Promise.all(documents.slice(0, 2).map(async (document) => {
    try {
      const excerpt = await internetArchiveExcerpt(
        document.id.slice('archive:'.length),
        fetcher,
        aporia
      );
      Object.assign(document, {
        excerpt: excerpt.excerpt,
        excerptKind: excerpt.excerptKind,
        ocrFile: excerpt.ocrFile || null,
        ocrSourceUrl: excerpt.ocrSourceUrl || null,
        ocrCharacterOffset: excerpt.characterOffset
      });
    } catch (error) {
      errors.push({
        identifier: document.id.slice('archive:'.length),
        message: error.message
      });
    }
  }));
  return { documents, excludedRecords, errors };
}

function rankResearchLeads(documents, subject, aporia) {
  const terms = new Set([
    ...words(subject),
    ...words(aporia.firstResponse),
    ...words(aporia.firstDifficulty),
    ...words(aporia.contraryResponse),
    ...words(aporia.contraryDifficulty)
  ]);
  return documents
    .map((document) => {
      const searchable = words(`${document.title} ${document.author} ${document.excerpt}`);
      const matches = [...new Set(searchable)].filter((word) => terms.has(word));
      return {
        ...document,
        researchRelevance: {
          matchedTerms: matches,
          score: matches.length,
          rankingBasis: 'lexical overlap only; not an aesthetic or philosophical assessment'
        }
      };
    })
    .sort((a, b) =>
      b.researchRelevance.score - a.researchRelevance.score ||
      a.provider.localeCompare(b.provider) ||
      a.title.localeCompare(b.title)
    )
    .slice(0, MAX_CANDIDATES);
}

export async function discoverSceneDocuments(subject, aporia, fetcher = fetch) {
  const queries = buildSceneSearchQueries(subject, aporia);
  const [wikisourceResult, archiveResult] = await Promise.all([
    searchWikisource(queries, fetcher).catch((error) => ({
      documents: [],
      errors: [{ query: null, message: error.message }]
    })),
    searchInternetArchive(queries, aporia, fetcher).catch((error) => ({
      documents: [],
      excludedRecords: [],
      errors: [{ query: null, message: error.message }]
    }))
  ]);
  const uniqueDocuments = new Map();
  for (const document of [...wikisourceResult.documents, ...archiveResult.documents]) {
    const existing = uniqueDocuments.get(document.id);
    if (!existing || words(document.excerpt).length > words(existing.excerpt).length) {
      uniqueDocuments.set(document.id, document);
    }
  }
  const documents = rankResearchLeads(
    [...uniqueDocuments.values()],
    subject,
    aporia
  );
  const uniqueExcludedRecords = [...new Map(
    archiveResult.excludedRecords.map((record) => [record.identifier, record])
  ).values()];
  const sourceErrors = [
    ...wikisourceResult.errors.map((error) => ({ provider: 'Wikisource', ...error })),
    ...archiveResult.errors.map((error) => ({ provider: 'Internet Archive', ...error }))
  ];
  return {
    status: documents.length > 0 ? 'research-leads-found' : 'no-document-leads-found',
    subject,
    aporiaStatus: aporia.status || 'caller-provided-not-source-verified',
    queries,
    documents,
    excludedRecords: uniqueExcludedRecords,
    sourceErrors,
    sceneSelection: {
      status: 'not-selected',
      reason: 'Les résultats documentaires ne prouvent pas à eux seuls la fidélité d’une scène ni sa puissance philosophique ou esthétique. Une validation humaine est requise avant de les soumettre au sélecteur.'
    },
    automated: [
      'création de requêtes à partir du sujet, des deux réponses et de leurs difficultés',
      'recherche documentaire dans Wikisource et Internet Archive',
      'capture des métadonnées, licences déclarées et extraits ou OCR disponibles',
      'classement exploratoire par recouvrement lexical'
    ],
    requiresHumanReview: [
      'confirmation que le document décrit la scène et non une mention incidente',
      'fidélité de la scène à l’œuvre originale',
      'droits de l’œuvre sous-jacente pour Wikisource',
      'deux réponses défendables et difficulté interne de chacune',
      'puissance littéraire, dramatique, cinématographique ou scientifique',
      'généralisation de la situation à la problématique'
    ]
  };
}

export async function deriveDoubleAporia(subject, env, fetcher = fetch) {
  if (!env?.OPENAI_API_KEY) throw new Error('La clé du moteur IA est absente.');
  const response = await fetcher('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || 'gpt-5-mini',
      instructions: [
        'Analyse le sujet philosophique sans rédiger de dissertation.',
        'Fournis deux réponses défendables et, pour chacune, sa difficulté interne.',
        'Les formulations sont des interprétations philosophiques provisoires, pas des faits documentaires.',
        'Respecte exactement l’opérateur et les termes du sujet. N’invente aucune scène ni source.',
        'Réponds en JSON avec firstRequirement, firstResponse, firstDifficulty,',
        'contraryRequirement, contraryResponse, contraryDifficulty et problematic.'
      ].join(' '),
      input: `Sujet : ${subject}`,
      text: { format: { type: 'json_object' } },
      max_output_tokens: 1200,
      store: false
    })
  });
  if (!response.ok) {
    throw new Error(`L’analyse de la double aporie a échoué (HTTP ${response.status}).`);
  }
  const data = await response.json();
  const output = typeof data.output_text === 'string'
    ? data.output_text
    : (data.output || []).flatMap((item) => item.content || [])
      .find((part) => part.type === 'output_text')?.text || '';
  let aporia;
  try {
    aporia = JSON.parse(output);
  } catch {
    throw new Error('L’analyse de la double aporie ne respecte pas le format JSON.');
  }
  const fields = [
    'firstRequirement',
    'firstResponse',
    'firstDifficulty',
    'contraryRequirement',
    'contraryResponse',
    'contraryDifficulty',
    'problematic'
  ];
  if (!aporia || fields.some((field) =>
    typeof aporia[field] !== 'string' || aporia[field].trim().length < 8
  )) {
    throw new Error('L’analyse de la double aporie est incomplète.');
  }
  return { ...aporia, subject, status: 'model-interpretation-not-source-verified' };
}
