#!/usr/bin/env python3
"""Commentaires et exercices originaux sur deux extraits exacts d’annales officielles.
Les données font foi ; les pages produites sont versionnées, comme celles du programme.
"""
import json, runpy
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
commentary=runpy.run_path(str(ROOT/'scripts/build-commentaires-programme.py'))['commentary']
if __name__=='__main__':
 data=json.loads((ROOT/'scripts/commentaires-annales-data.json').read_text())
 for i,w in enumerate(data):commentary(w,data[1-i])
 print('Deux commentaires d’annales avec texte intégral et exercices générés.')
