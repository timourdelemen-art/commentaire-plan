#!/usr/bin/env python3
"""Audit lexical descriptif d'un corpus interne; jamais une source de sujets élèves.
Usage: python scripts/audit-philo-semantique.py meles-brut.txt --output analyse.json
ATTENTION : unité de comptage = ligne candidate, pas sujet validé.
"""
import argparse
import collections
import json
import pathlib
import re

PATTERNS = {
    "peut_on": r"\bpeut[- ]on\b",
    "doit_on": r"\b(?:doit[- ]on|faut[- ]il)\b",
    "suffisance": r"\b(?:suffit[- ]il|suffisant|suffire)\b",
    "identification": r"\b(?:est[- ]il|est[- ]elle|sont[- ]ils|sont[- ]elles)\b",
    "dependance": r"\b(?:dépend[- ]il|dépend[- ]elle|dépendre)\b",
    "pourquoi": r"\bpourquoi\b",
    "finalite": r"\bà quoi (?:sert|servent)\b",
    "reconnaissance": r"\bà quoi reconnaît[- ]on\b",
    "existence": r"\by a[- ]t[- ]il\b",
    "sans": r"\bsans\b",
    "restriction": r"\bseulement\b|\buniquement\b|\bne\b.{0,65}\bque\b",
    "universalite": r"\b(?:toujours|jamais|tout|tous|aucun)\b",
    "condition": r"\b(?:à quelles conditions|condition nécessaire|condition suffisante)\b",
    "alternative": r"\bou\b",
    "conjonction": r"\bet\b",
}
def audit(text):
    lines = [re.sub(r"\s+", " ", s).strip() for s in text.splitlines()]
    lines = [s for s in lines if 7 <= len(s) <= 240 and not re.fullmatch(r"\d+", s)]
    counts, co = collections.Counter(), collections.Counter()
    examples = {key: [] for key in PATTERNS}
    for line in lines:
        found = [key for key, pattern in PATTERNS.items() if re.search(pattern, line, re.I)]
        counts.update(found)
        for i, key in enumerate(found):
            if len(examples[key]) < 5:
                examples[key].append(line)
            for other in found[i + 1:]:
                co[(key, other)] += 1
    return {
        "avertissement": "Lignes candidates non validées ; pas de fréquence par sujet. Ne jamais publier les exemples.",
        "lignes_candidates": len(lines),
        "frequences": dict(counts.most_common()),
        "cooccurrences": [{"formes": list(keys), "n": n} for keys, n in co.most_common(60)],
        "exemples_internes_non_publier": examples,
    }
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("texte")
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    result = audit(pathlib.Path(args.texte).read_text(encoding="utf-8"))
    pathlib.Path(args.output).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
