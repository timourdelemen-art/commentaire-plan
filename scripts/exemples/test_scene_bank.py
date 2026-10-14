import json
import hashlib
import tempfile
import unittest
from pathlib import Path

import build_exemples as builder


ROOT = Path(__file__).resolve().parents[2]


class SceneBankBuild(unittest.TestCase):
    def test_candidate_bank_matches_browser_examples(self):
        browser_text = (ROOT / 'philosophie-exemples-data.js').read_text(encoding='utf-8')
        browser_examples = json.loads(browser_text.split('=', 1)[1].strip().rstrip(';'))
        browser_by_id = {item['id']: item for item in browser_examples}

        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp) / 'scene-bank.json'
            candidates = builder.build_scene_bank(output)
            saved = json.loads(output.read_text(encoding='utf-8'))

        self.assertEqual(saved, candidates)
        self.assertEqual(len(candidates), 6)
        for candidate in candidates:
            source = browser_by_id[candidate['id']]
            self.assertEqual(candidate['scene'], source['scene'])
            self.assertEqual(candidate['oeuvre'], source['oeuvre'])
            self.assertEqual(
                candidate['scene_description_sha256'],
                hashlib.sha256(source['scene'].encode('utf-8')).hexdigest()
            )
            expected_links = [
                subject for subject in source.get('sujets', [])
                if subject.get('limite1') and subject.get('limite2')
            ]
            actual_links = [
                {key: value for key, value in link.items() if key != 'audit'}
                for link in candidate['sujets']
            ]
            self.assertEqual(actual_links, expected_links)

    def test_bank_does_not_promote_unreviewed_scenes(self):
        with tempfile.TemporaryDirectory() as temp:
            candidates = builder.build_scene_bank(Path(temp) / 'scene-bank.json')
        self.assertTrue(candidates)
        for candidate in candidates:
            self.assertFalse(candidate['audit']['homologation_ouverture'])
            self.assertNotIn('sha256_source', candidate['audit']['source_narrative'] or {})
            self.assertFalse(candidate['audit']['description_fidelity_verified'])
            self.assertIsNone(candidate['audit']['verified_scene_description_sha256'])


if __name__ == '__main__':
    unittest.main()
