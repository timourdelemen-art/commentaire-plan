"""Ajoute le contexte de chaque ligne echantillonnee, sans valider son statut."""
import csv
import sys
from pathlib import Path

def main():
    if len(sys.argv) != 4:
        raise SystemExit("Usage: contexte-validation-meles.py extraction.txt echantillon.csv sortie.csv")
    pages = Path(sys.argv[1]).read_text(encoding="utf-8").split("\f")
    with open(sys.argv[2], encoding="utf-8", newline="") as f:
        sample = list(csv.DictReader(f))
    result = []
    for row in sample:
        page = int(row["page_pdf"])
        if page < 1 or page > len(pages):
            raise ValueError("Page hors extraction")
        lines = [s.strip() for s in pages[page - 1].splitlines()]
        target = row["ligne"].strip()
        indices = [i for i, line in enumerate(lines) if line == target]
        if not indices:
            raise ValueError(f"Ligne introuvable dans la page {page}: {target[:60]}")
        index = indices[0]
        row["occurrences_dans_page"] = len(indices)
        row["lignes_avant"] = " | ".join(s for s in lines[max(0, index - 3):index] if s)
        row["lignes_apres"] = " | ".join(s for s in lines[index + 1:index + 4] if s)
        result.append(row)
    with open(sys.argv[3], "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(result[0]))
        writer.writeheader()
        writer.writerows(result)
    print(f"{len(result)} lignes contextualisees; aucune annotation automatique")

if __name__ == "__main__":
    main()
