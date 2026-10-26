#!/usr/bin/env python3
"""Ajoute (ou remplace) les corrigés de ce dossier dans scripts/hlp-parcours-data.json.
Usage : python3 -I scripts/hlp-corriges/integrer.py voltaire diderot …"""
import importlib, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
P = os.path.join(ROOT, 'scripts', 'hlp-parcours-data.json')
data = json.load(open(P, encoding='utf-8'))
def reponse(R):
    return {'id': R['id'], 'kind': R['kind'], 'question': R['question'], 'choices': R['choices'], 'stages': R['stages'],
            'criteria': R['criteria'], 'model': [{'sentences': [{'text': t, 'function': f} for t, f in p]} for p in R['model']]}
for m in sys.argv[1:]:
    M = importlib.import_module(m); S = M.SUJET
    sujet = {k: S[k] for k in ('id', 'level', 'author', 'work', 'session', 'code')}
    sujet['source'] = S.get('source') or f"annales/hlp/{S['annale']}.pdf"
    sujet.update({'pages': S['pages'], 'entry': S['entry'], 'responses': [reponse(M.INTERPRETATION), reponse(M.ESSAI)]})
    data['subjects'] = [x for x in data['subjects'] if x['id'] != S['id']] + [sujet]
json.dump(data, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
open(P, 'a').write('\n')
print(len(data['subjects']), 'sujets')
