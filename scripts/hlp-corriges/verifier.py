#!/usr/bin/env python3
"""Contrôles du protocole HLP (docs/protocole-hlp.md § 5) sur un corrigé : citations, longueurs, phrases."""
import importlib, json, os, re, sys, unicodedata
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
T = json.load(open(os.path.join(ROOT, 'scripts', 'hlp-textes.json'), encoding='utf-8'))
def n(s):
    s = unicodedata.normalize('NFC', s).replace('’', "'").replace(' ', ' ')
    return re.sub(r'\s+', ' ', s)
def check(mod):
    M = importlib.import_module(mod); S = M.SUJET
    texte = n(' '.join(x['t'] for x in T[S['annale']]['items']) + ' ' + ' '.join(x[1] for x in T[S['annale']]['notes']))
    texte = re.sub(r'(?<=\w)\d', '', texte)  # appels de note
    texte += ' ' + n(M.INTERPRETATION['question'] + ' ' + M.ESSAI['question'])
    texte += ' ' + n(' '.join(getattr(M, 'TITRES', [])))  # titres d’œuvres citées, vérifiés
    ok = True; mots = []
    for R in (M.INTERPRETATION, M.ESSAI):
        w = 0
        for p in R['model']:
            for t, f in p:
                w += len(t.split())
                if re.search(r'[.!?] »?\s+[A-ZÉÈÀÂÊÎÔÙÛŒÇ]', t): print('PLUSIEURS PHRASES', t); ok = False
                for c in re.findall(r'«\s*(.*?)\s*»', t):
                    parts = [x.strip() for x in re.split(r'\[[^\]]*\]', n(c)) if x.strip()]
                    if not all(x in texte for x in parts): print('CITATION ABSENTE :', c); ok = False
        sol = [c for c in R['choices'] if c[1] == 'Solide'][0]
        longest = max(len(c[0]) for c in R['choices'])
        print(f"{R['id']}: {w} mots, {len(R['model'])} paragraphes, solide la plus longue : {len(sol[0]) == longest}")
        mots.append(w)
    print('écart', round(abs(mots[0] - mots[1]) / max(mots) * 100), '%', 'OK' if ok else 'ERREURS')
    return ok
if __name__ == '__main__':
    sys.exit(0 if all(check(m) for m in sys.argv[1:]) else 1)
