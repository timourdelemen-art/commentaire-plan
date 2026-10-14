import { discoverSceneDocuments } from '../../worker/src/philo-engine/scene-discovery.js';

const subject = 'L’expérience permet-elle de mieux connaître la nature ?';
const aporia = {
  status: 'test-interpretation-not-source-verified',
  firstRequirement: 'Isoler les causes pour les établir.',
  firstResponse: 'L’expérience intervient sur la nature afin de distinguer les causes.',
  firstDifficulty: 'L’intervention risque de modifier le phénomène qu’elle veut connaître.',
  contraryRequirement: 'Conserver le phénomène dans son cours propre.',
  contraryResponse: 'L’observation laisse la nature se manifester sans intervention.',
  contraryDifficulty: 'Sans expérience, les causes restent difficiles à distinguer.',
  problematic: 'Comment établir les causes sans altérer le phénomène naturel ?'
};

const discovery = await discoverSceneDocuments(subject, aporia);
console.log(JSON.stringify({
  subject,
  aporia: {
    ...aporia,
    status: 'test-interpretation-not-source-verified'
  },
  discovery: {
    status: discovery.status,
    queries: discovery.queries,
    documentLeadCount: discovery.documents.length,
    documents: discovery.documents.slice(0, 5).map((document) => ({
      provider: document.provider,
      title: document.title,
      author: document.author,
      sourceUrl: document.sourceUrl,
      excerpt: document.excerpt,
      excerptKind: document.excerptKind,
      ocrSourceUrl: document.ocrSourceUrl || null,
      ocrCharacterOffset: document.ocrCharacterOffset || null,
      researchRelevance: document.researchRelevance,
      platformLicense: document.platformLicense || null,
      license: document.license || null,
      underlyingWorkRights: document.underlyingWorkRights
    })),
    excludedRecordCount: discovery.excludedRecords.length,
    sourceErrors: discovery.sourceErrors,
    sceneSelection: discovery.sceneSelection,
    requiresHumanReview: discovery.requiresHumanReview
  }
}, null, 2));
