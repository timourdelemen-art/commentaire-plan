#!/usr/bin/env python3
"""Audit descriptif interne des sujets, sans publication."""
import argparse
import json
import re
from collections import Counter
from pathlib import Path

PATTERNS = {
    'peut_on': r'\bpeut[- ]on\b',
    'devoir': r'\b(?:doit[- ]on|faut[- ]il)\b',
    'suffisance': r'\bsuffit[- ]il\b',
    'sans': r'\bsans\b',
    'restriction': r'\bseulement\b|\bne\b.{0,65}\bque\b',
    'pourquoi': r'\bpourquoi\b',
    'alternative': r'\bou\b',
}

def main():
    p = argparse.ArgumentParser()
    p.add_argument('source')
    p.add_argument('--output', required=True)
    a = p.parse_args()
    text = Path(a.source).read_text(encoding='utf-8')
    lines = [s.strip() for s in text.splitlines() if 7 <= len(s.strip()) <= 240]
    counts = Counter()
    for line in lines:
        counts.update(k for k, v in PATTERNS.items() if re.search(v, line, re.I))
    result = {'unite': 'lignes candidates, non sujets verifies', 'lignes_candidates': len(lines), 'frequences': dict(counts)}
    Path(a.output).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')

if __name__ == '__main__':
    main()
