#!/usr/bin/env python3
"""Audit interne descriptif de l'extraction Mélès, sans prétendre segmenter 11 000 sujets.
Ne jamais transférer les exemples de concours vers le site élève.
"""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
import unicodedata

FORMS = {
    "possibilite": r"\b(?:peut[- ]on|peut[- ]il|peut[- ]elle|pouvons[- ]nous|possible|impossible)\b",
    "obligation": r"\b(?:doit[- ]on|doit[- ]il|faut[- ]il|devons[- ]nous)\b",
    "suffisance": r"\b(?:suffit[- ]il|suffisent[- ]ils|suffire|suffisant)\b",
    "identification": r"\b(?:est[- ]il|est[- ]elle|sont[- ]ils|sont[- ]elles|est[- ]ce)\b",
    "dependance": r"\b(?:dépend[- ]il|dépend[- ]elle|dépendre)\b",
    "pourquoi": r"\bpourquoi\b",
    "finalite": r"\b(?:à quoi (?:sert|servent)|pour quoi faire)\b",
    "reconnaissance": r"\b(?:à quoi reconna[iî]t[- ]on|comment reconna[iî]t[- ]on)\b",
    "existence": r"\b(?:y a[- ]t[- ]il|existe[- ]t[- ]il)\b",
    "sans": r"\bsans\b",
    "restriction": r"\b(?:seulement|uniquement|simplement)\b|\bne\b.{0,70}\bque\b",
    "quantification": r"\b(?:toujours|jamais|tout|tous|toute|toutes|aucun|aucune)\b",
    "alternative": r"\bou\b",
    "conjonction": r"\bet\b",
    "comment": r"\bcomment\b",
    "en_quoi": r"\ben quoi\b",
}
COMPILED = {k: re.compile(v, re.I) for k, v in FORMS.items()}

def normalize(s):
    s = unicodedata.normalize("NFKC", s).replace("\u00ad", "")
    return re.sub(r"\s+", " ", s).strip()

def canonical(s):
    s = unicodedata.normalize("NFKD", s.casefold())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in s if not unicodedata.combining(c)))

def audit(text, min_pages=900):
    pages = text.split("\f")
    if len(pages) < min_pages:
        raise ValueError(f"Extraction non paginée ou incomplète : {len(pages)} fragments")
    raw = []
    for page_num, page in enumerate(pages, start=1):
        for line in page.splitlines():
            s = normalize(line)
            if 7 <= len(s) <= 240 and not re.fullmatch(r"[\d\W]+", s):
                raw.append((page_num, s))
    counts = Counter()
    pairs = Counter()
    page_counts = Counter()
    unique = {}
    for page_num, line in raw:
        page_counts[page_num] += 1
        key = canonical(line)
        if key not in unique:
            unique[key] = (page_num, line)
        found = [name for name, rx in COMPILED.items() if rx.search(line)]
        counts.update(found)
        for i, left in enumerate(found):
            for right in found[i + 1:]:
                pairs[(left, right)] += 1
    distinct_counts = Counter()
    unclassified = []
    for page_num, line in unique.values():
        found = [name for name, rx in COMPILED.items() if rx.search(line)]
        distinct_counts.update(found)
        if not found and len(unclassified) < 100:
            unclassified.append({"page": page_num, "texte_interne": line})
    return {
        "statut": "EXPLORATOIRE_NON_HOMOLOGUE",
        "avertissement": "Comptage de lignes, PAS de sujets segmentes. Sections du PDF repetitives; les doublons exacts normalises ne suffisent pas.",
        "sha256_extraction": hashlib.sha256(text.encode("utf-8")).hexdigest(),
        "pages_fragments": len(pages),
        "lignes_candidates": len(raw),
        "lignes_uniques_normalisees": len(unique),
        "formes_lignes": dict(counts.most_common()),
        "formes_lignes_uniques": dict(distinct_counts.most_common()),
        "cooccurrences_lignes": [{"formes": list(k), "nombre": n} for k, n in pairs.most_common()],
        "densite_par_tranche_100_pages": [
            {"pages": f"{start}-{min(start + 99, len(pages))}",
             "lignes": sum(n for p, n in page_counts.items() if start <= p < start + 100)}
            for start in range(1, len(pages) + 1, 100)
        ],
        "echantillon_interne_lignes_sans_operateur": unclassified,
        "limites": [
            "Pas de segmentation des sujets, ni dedoublonnage semantique",
            "Aucune preuve de couverture de la typologie par sujet",
            "Aucune evaluation de la polysemie, double aporie ou resolution",
            "Echantillon interne uniquement : jamais d'affichage dans les exercices",
        ],
    }

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("texte")
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    result = audit(Path(args.texte).read_text(encoding="utf-8"))
    Path(args.output).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__":
    main()
