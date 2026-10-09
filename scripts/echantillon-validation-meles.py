import csv
import random
import sys
from pathlib import Path

pages = Path(sys.argv[1]).read_text(encoding='utf-8').split('\f')
assert len(pages) >= 900
rng = random.Random(20261009)
rows = []
for index in sorted(rng.sample(range(len(pages)), 240)):
    lines = [x.strip() for x in pages[index].splitlines() if 7 <= len(x.strip()) <= 240]
    if lines:
        rows.append([index + 1, rng.choice(lines), '', ''])
with open(sys.argv[2], 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['page_pdf', 'ligne', 'etiquette', 'commentaire'])
    writer.writerows(rows)
print(len(rows), 'lignes pour annotation manuelle; sujets non certifies')
