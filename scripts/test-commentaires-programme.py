#!/usr/bin/env python3
"""Contrôles de cohérence : citations du modèle présentes dans le support, structure et exercices."""
import unittest,json,re,html
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
DATA=json.loads((ROOT/'scripts/commentaires-programme-data.json').read_text())
class CommentairesProgramme(unittest.TestCase):
 def test_citations_exactes_dans_le_support(self):
  for w in DATA:
   support=html.unescape(re.sub('<[^>]*>',' ',w['support']))
   quotes=[q for p in w['copy'] for s in p['sentences'] for q in re.findall('« ([^»]+) »',s['text'])]
   self.assertGreaterEqual(len(quotes),8)
   for q in quotes:self.assertIn(q,support,(w['id'],q))
 def test_neuf_sous_parties_deux_transitions_et_fonctions(self):
  expected=['INTRODUCTION','I.1','I.2','I.3','TRANSITION I → II','II.1','II.2','II.3','TRANSITION II → III','III.1','III.2','III.3','CONCLUSION']
  for w in DATA:
   self.assertEqual([p['heading'] for p in w['copy']],expected)
   for p in w['copy']:
    self.assertTrue(all(s['function'] and s['text'] for s in p['sentences']))
    if p['heading'].startswith('TRANSITION'):self.assertTrue(p['sentences'][0]['text'].endswith('?'))
   self.assertLess(sum(len(s['text'].split()) for p in w['copy'] for s in p['sentences']),1000)
 def test_choix_expliques_et_non_reconnaissables_a_leur_longueur(self):
  longest=0;total=0
  for w in DATA:
   for e in w['exercises']:
    total+=1;choices=e['choices'];self.assertEqual(sorted(c[1] for c in choices),['def','no','ok'])
    self.assertEqual(len(set(c[0] for c in choices)),3);self.assertTrue(all(c[2] for c in choices))
    good=next(c for c in choices if c[1]=='ok');longest+=len(good[0])>max(len(c[0]) for c in choices if c[1]!='ok')
    self.assertTrue(e['write'] and e['model'] and e['checks'])
  self.assertLess(longest,total)
 def test_publication_avec_extraits_et_sources(self):
  for w in DATA:
   s=(ROOT/w['file']).read_text();self.assertIn(w['support'],s)
   self.assertIn('data-ecrit-label="À vous d’écrire →"',s);self.assertIn('data-programme-draft',s)
   self.assertIn('source',s.lower());self.assertIn('NON OFFICIEL',(ROOT/w['dissertation']['file']).read_text())
if __name__=='__main__':unittest.main()
