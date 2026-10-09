"""Inventaire interne des formulations et liens PDF du parcours philosophie."""
import csv
import html
from pathlib import Path
import re

files = sorted(list(Path(".").glob("philosophie*.html")) + list(Path(".").glob("philosophie*.js")))
patterns = [
    ("mensonge_soi", r"se ment(?:ir)?(?:\s+à\s+soi.même)?|celui qui se ment"),
    ("risque", r"au risque de"),
    ("problematique", r"problématique"),
    ("jargon", r"double aporie|chiasme|reproblématisation"),
]
rows = []
for path in files:
    source = path.read_text(encoding="utf-8")
    for kind, pattern in patterns:
        for match in re.finditer(pattern, source, flags=re.IGNORECASE):
            excerpt = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]*>", " ", source[max(0,match.start()-140):match.end()+240])))
            rows.append([str(path), kind, source.count("\n", 0, match.start()) + 1, excerpt[:420]])
    for match in re.finditer(r'(?:href|src)\s*=\s*["\']([^"\']+\.pdf(?:\?[^"\']*)?)', source, flags=re.IGNORECASE):
        rows.append([str(path), "lien_pdf", source.count("\n", 0, match.start())+1, html.unescape(match.group(1))])
with open("audit-philo-limpidite-pdf.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["fichier", "type", "ligne", "extrait_ou_url"])
    writer.writerows(rows)
print(len(files), "fichiers examines;", len(rows), "occurrences.")
