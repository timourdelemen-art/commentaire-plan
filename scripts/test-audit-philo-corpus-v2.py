#!/usr/bin/env python3
"""Tests sans accès au corpus : ne valident pas la segmentation réelle."""
import importlib.util
from pathlib import Path
import unittest

SCRIPT = Path(__file__).with_name("audit-philo-corpus-v2.py")
spec = importlib.util.spec_from_file_location("audit_philo_v2", SCRIPT)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class AuditCorpusTests(unittest.TestCase):
    def test_refuse_extraction_non_paginee(self):
        with self.assertRaises(ValueError):
            module.audit("Peut-on savoir ?\n")

    def test_compte_formes_et_signale_limites(self):
        text = "\f".join(["Peut-on être libre sans loi ?\nLa liberté et la loi\n"] * 900)
        result = module.audit(text, min_pages=900)
        self.assertEqual(result["pages_fragments"], 900)
        self.assertEqual(result["lignes_uniques_normalisees"], 2)
        self.assertGreater(result["formes_lignes"]["possibilite"], 0)
        self.assertGreater(result["formes_lignes"]["conjonction"], 0)
        self.assertEqual(result["statut"], "EXPLORATOIRE_NON_HOMOLOGUE")
        self.assertNotIn("sujets_valides", result)

if __name__ == "__main__":
    unittest.main()
