"""Regression tests: a false quotation must never keep a verified badge."""
import unittest,tempfile,os
from pathlib import Path
import build_exemples as v
class Verification(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();v.C=self.tmp.name;v.cache.clear()
        p=Path(v.C)/'fredracor/tei';p.mkdir(parents=True)
        (p/'fixture.xml').write_text('<TEI><teiHeader>Fausses paroles.</teiHeader><text><p>Je suis maître de moi.</p><note>Note seulement.</note></text></TEI>')
    def tearDown(self):self.tmp.cleanup();v.cache.clear()
    def quote(self,t,n='Je suis maître de moi.'):
        return dict(t=t,n=n,src='fredracor/tei/fixture.xml',qui='Personnage')
    def test_exact(self):self.assertIsNotNone(v.checked(self.quote('Je suis maître de moi.'))[0])
    def test_typography(self):self.assertIsNotNone(v.checked(self.quote('Je suis maître de moi.'))[0])
    def test_changed_words(self):self.assertIsNone(v.checked(self.quote('Je suis maître du monde.'))[0])
    def test_changed_case(self):self.assertIsNone(v.checked(self.quote('je suis maître de moi.'))[0])
    def test_missing_needle(self):self.assertIsNone(v.checked(self.quote('Je suis maître de moi.','Paroles absentes.'))[0])
    def test_notes_not_quote(self):self.assertIsNone(v.checked(self.quote('Note seulement.','Note seulement.'))[0])
    def test_missing_file(self):
        c=self.quote('Je suis maître de moi.');c['src']='fredracor/absent.xml';self.assertIsNone(v.checked(c)[0])
    def test_build_fails_without_badge(self):
        old=v.E;v.E=[dict(id='test',cit=self.quote('Je suis maître du monde.'))]
        try:
            dest=Path(self.tmp.name)/'out.js';self.assertEqual(v.build(dest),1)
            self.assertIn('"citation": null',dest.read_text());self.assertNotIn('"verif"',dest.read_text())
        finally:v.E=old
if __name__=='__main__':unittest.main()
