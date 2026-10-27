"""Régression : les quatre vers doivent être réécrits, sans accorder les mauvais sujets."""
import html
import json
from pathlib import Path
import re
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts/brevet-sujets'))
from corriges_annales import CORRIGES, TEXTES
from etapes_parties import PAGES
from reecritures import LIONS_TEXTE

FABLE = 'brevet-2022-metropole-general-la-fontaine-lion-moucheron'
ZOLA = 'brevet-2026-general-zola-cage-betes-feroces'

def norm(text):
    text = re.sub(r'<[^>]+>', '', html.unescape(text)).replace(' / ', ' ')
    return re.sub(r'\s+', ' ', text).strip(' «»')

class Reecritures(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        script = 'global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.ANNALES_CATALOGUE))'
        cls.catalogue = json.loads(subprocess.check_output(['node', '-e', script, str(ROOT/'annales/catalogue-annales.js')]))

    def test_tous_les_changements_des_quatre_vers(self):
        # Construire l'attendu depuis le vrai support, pas depuis un corrigé tronqué.
        source = '\n'.join(TEXTES[FABLE]['texte'].splitlines()[25:29])
        source = re.sub(r'\^\d+', '', source)
        for before, after in [
            ('Le malheureux Lion', 'Les malheureux Lions'),
            ('se déchire lui-même', 'se déchirent eux-mêmes'),
            ('Fait résonner sa queue', 'Font résonner leur queue'),
            ('de ses flancs', 'de leurs flancs'),
            ('Bat l’air', 'Battent l’air'),
            ('sa fureur extrême', 'leur fureur extrême'),
            ('Le fatigue, l’abat : le voilà', 'Les fatigue, les abat : les voilà'),
        ]:
            self.assertEqual(source.count(before), 1, before)
            source = source.replace(before, after)
        self.assertEqual(LIONS_TEXTE, source)
        self.assertEqual(len(LIONS_TEXTE.splitlines()), 4)
        self.assertNotIn('[…]', LIONS_TEXTE)
        self.assertIn('qui n’en peut mais', LIONS_TEXTE)
        self.assertIn('Les fatigue, les abat : les voilà sur les dents.', LIONS_TEXTE)
        self.assertNotRegex(LIONS_TEXTE, r'fatiguent|abattent|peuvent')

    def test_meme_modele_dans_les_trois_acces(self):
        questions = PAGES['brevet-reecriture.html']['etapes'][0]['questions']
        solid = [t for t, verdict, why in questions[0][2] if verdict == 'ok']
        self.assertEqual(solid, [LIONS_TEXTE])
        self.assertEqual(norm(CORRIGES[FABLE]['q11']['correction']), norm(LIONS_TEXTE))
        q11 = next(s for s in self.catalogue[FABLE]['etapes'] if s['id'] == 'q11')
        self.assertEqual(norm(q11['correction']), norm(LIONS_TEXTE))
        self.assertIn('leurs queues', CORRIGES[FABLE]['q11']['accepte'])

    def test_reperage_des_verbes_qui_ne_dependent_pas_des_lions(self):
        question = PAGES['brevet-reecriture.html']['etapes'][0]['questions'][1]
        solid = next(t for t, verdict, why in question[2] if verdict == 'ok')
        for word in ['peut', 'fatigue', 'abat', 'l’air', 'leur fureur extrême']:
            self.assertIn(word, solid)

    def test_zola_reponse_ecrite_integrale(self):
        writing = PAGES['brevet-reecriture.html']['etapes'][0]['ecrit']
        expected = re.search(r'«(.*?)»', writing['corrige']).group(1)
        official = next(q for q in self.catalogue[ZOLA]['etapes'] if q['id'] == 'q10')
        self.assertEqual(norm(expected), norm(official['correction']))
        self.assertNotIn('[…]', expected)
        for changed in ['s’éveille', 'se met', 's’arrête', 'montent', 'ces clameurs', 'faites', 'ressemblent']:
            self.assertIn(changed, expected)

    def test_propositions_distinctes_et_justifiees(self):
        total = 0
        for file in ['brevet-grammaire.html', 'brevet-reecriture.html']:
            unique_longest = 0
            for step in PAGES[file]['etapes']:
                for source, task, options in step['questions']:
                    total += 1
                    self.assertEqual(len(options), 3)
                    self.assertEqual(len({norm(x[0]) for x in options}), 3)
                    self.assertEqual({x[1] for x in options}, {'ok', 'def', 'no'})
                    for text, verdict, why in options:
                        self.assertGreater(len(why.split()), 6)
                    lengths = [len(x[0].split()) for x in options]
                    i = next(i for i, option in enumerate(options) if option[1] == 'ok')
                    unique_longest += lengths[i] > max(n for j, n in enumerate(lengths) if j != i)
            count = sum(len(x['questions']) for x in PAGES[file]['etapes'])
            self.assertLessEqual(unique_longest, count/2, file)
        self.assertEqual(total, 7)

if __name__ == '__main__':
    unittest.main()
