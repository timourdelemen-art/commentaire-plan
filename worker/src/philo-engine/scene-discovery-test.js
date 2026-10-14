import assert from 'node:assert/strict';
import {
  buildSceneSearchQueries,
  deriveDoubleAporia,
  discoverSceneDocuments
} from './scene-discovery.js';

const subject = 'L’expérience est-elle toujours préférable à l’observation ?';
const aporia = {
  firstRequirement: 'Établir les causes avec précision.',
  firstResponse: 'L’expérience isole les causes par une intervention réglée.',
  firstDifficulty: 'Cette intervention peut modifier le phénomène observé.',
  contraryRequirement: 'Observer le phénomène sans le perturber.',
  contraryResponse: 'L’observation préserve le phénomène dans son cours.',
  contraryDifficulty: 'Sans intervention, les causes restent difficiles à isoler.',
  problematic: 'Comment connaître les causes sans altérer le phénomène ?'
};

const queries = buildSceneSearchQueries(subject, aporia);
assert.equal(queries.length, 3);
assert.throws(() => buildSceneSearchQueries(subject, { firstResponse: 'court' }),
  /double aporie est incomplète/);

let aporiaRequest;
const derived = await deriveDoubleAporia(subject, { OPENAI_API_KEY: 'test-key' },
  async (_url, options) => {
    aporiaRequest = JSON.parse(options.body);
    return new Response(JSON.stringify({
      output_text: JSON.stringify(aporia)
    }), { status: 200 });
  });
assert.match(aporiaRequest.instructions, /N’invente aucune scène ni source/);
assert.equal(derived.status, 'model-interpretation-not-source-verified');
assert.equal(derived.subject, subject);

const requests = [];
const discovery = await discoverSceneDocuments(subject, aporia, async (input) => {
  const url = new URL(input);
  requests.push(url);
  if (url.hostname === 'fr.wikisource.org') {
    if (url.searchParams.has('siprop')) {
      return new Response(JSON.stringify({
        query: {
          rightsinfo: {
            url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
            text: 'Creative Commons Attribution-Share Alike 4.0'
          }
        }
      }), { status: 200 });
    }
    if (url.searchParams.get('list') === 'search') {
      return new Response(JSON.stringify({
        query: {
          search: [{
            pageid: 83129,
            title: 'Claude Bernard/Introduction à l’étude de la médecine expérimentale',
            snippet: 'L’expérience <span class="searchmatch">isole</span> les causes.'
          }]
        }
      }), { status: 200 });
    }
    return new Response(JSON.stringify({
      query: {
        pages: {
          '83129': {
            pageid: 83129,
            fullurl: 'https://fr.wikisource.org/wiki/Claude_Bernard/Introduction_%C3%A0_l%E2%80%99%C3%A9tude_de_la_m%C3%A9decine_exp%C3%A9rimentale'
          }
        }
      }
    }), { status: 200 });
  }
  if (url.pathname === '/advancedsearch.php') {
    return new Response(JSON.stringify({
      response: {
        docs: [
          {
            identifier: 'open-book',
            title: 'Observation et expérience',
            creator: 'Auteur vérifiable',
            date: '1900',
            rights: 'Public Domain Mark'
          },
          {
            identifier: 'unlicensed-book',
            title: 'Document sans licence',
            creator: 'Auteur',
            date: '2000'
          }
        ]
      }
    }), { status: 200 });
  }
  if (url.pathname === '/metadata/open-book') {
    return new Response(JSON.stringify({
      files: [{ name: 'open-book_djvu.txt', format: 'DjVuTXT', size: '500' }]
    }), { status: 200 });
  }
  if (url.pathname === '/download/open-book/open-book_djvu.txt') {
    return new Response(
      'L’expérience isole parfois les causes, mais l’observation préserve le phénomène.',
      { status: 200 }
    );
  }
  throw new Error(`URL inattendue dans le test : ${url}`);
});

assert.equal(requests.filter((url) => url.hostname === 'fr.wikisource.org').length, 5);
assert.equal(discovery.status, 'research-leads-found');
assert.equal(discovery.documents.length, 2);
assert.equal(discovery.excludedRecords.length, 1);
assert.equal(discovery.sceneSelection.status, 'not-selected');
assert.equal(discovery.documents.some((document) =>
  document.excerptKind === 'archive-ocr-excerpt' &&
  document.excerpt.includes('L’expérience') &&
  document.ocrSourceUrl === 'https://archive.org/download/open-book/open-book_djvu.txt' &&
  document.ocrCharacterOffset === 0
), true);
const wikisource = discovery.documents.find((document) => document.provider === 'Wikisource');
assert.equal(wikisource.underlyingWorkRights, 'not-established');
assert.match(wikisource.excerpt, /isole les causes/);
assert.match(wikisource.locator, /^https:\/\/fr\.wikisource\.org\/wiki\//);
assert.match(discovery.documents[0].researchRelevance.rankingBasis, /lexical overlap only/);
assert.ok(discovery.requiresHumanReview.some((item) => /fidélité/.test(item)));
assert.ok(discovery.requiresHumanReview.some((item) => /puissance littéraire/.test(item)));

const unavailableDiscovery = await discoverSceneDocuments(subject, aporia, async () =>
  new Response('Source indisponible', { status: 503 })
);
assert.equal(unavailableDiscovery.status, 'no-document-leads-found');
assert.deepEqual(
  [...new Set(unavailableDiscovery.sourceErrors.map((error) => error.provider))].sort(),
  ['Internet Archive', 'Wikisource']
);

console.log('OK : recherche documentaire bornée, licence, OCR, classement exploratoire et refus d’homologation validés.');
