import unittest
from core.rag import FinancialRAG

class TestFinancialRAG(unittest.TestCase):
    def setUp(self):
        self.rag = FinancialRAG()

    def test_canonical_knowledge_loaded(self):
        """Verifies canonical documents, bank mutations, and UMKM rules are pre-indexed."""
        self.assertGreaterEqual(len(self.rag.chunks), 10)
        types = set(c.doc_type for c in self.rag.chunks)
        self.assertIn("bank_statement", types)
        self.assertIn("supplier_invoice", types)
        self.assertIn("business_memory", types)
        self.assertIn("regulatory_rule", types)

    def test_search_machine_espresso(self):
        """Verifies search correctly retrieves supplier invoice and memory precedent for espresso machine."""
        results = self.rag.search("mesin espresso tempo DP", top_k=3)
        self.assertGreater(len(results), 0)
        sources = [r.chunk.source for r in results]
        self.assertTrue(any("Mesin_Berkah" in s or "Business Memory" in s for s in sources))

    def test_search_prive_leakage(self):
        """Verifies search retrieves unclassified debit mutation for prive."""
        results = self.rag.search("prive transfer pribadi", top_k=2)
        self.assertGreater(len(results), 0)
        self.assertTrue(any("Rekening_Koran" in r.chunk.source or "Business Memory" in r.chunk.source for r in results))

    def test_query_pph_final_tax(self):
        """Verifies RAG query produces grounded tax explanation with citations."""
        res = self.rag.query("Berapa pajak PPh final UMKM?")
        self.assertIn("0.5%", res.answer)
        self.assertIn("500.000.000", res.answer)
        self.assertGreater(len(res.citations), 0)
        self.assertTrue(any("PP" in c["source"] or "Pajak" in c["source"] for c in res.citations))

    def test_query_qris_mdr(self):
        """Verifies RAG query produces Bank Indonesia QRIS zero MDR rule."""
        res = self.rag.query("Berapa potongan MDR QRIS?")
        self.assertIn("0%", res.answer)
        self.assertIn("100.000", res.answer)
        self.assertGreater(len(res.citations), 0)

    def test_dynamic_document_ingestion(self):
        """Verifies dynamic documents can be ingested and retrieved."""
        initial_count = len(self.rag.chunks)
        self.rag.add_document(
            doc_id="custom-1",
            source="Nota_Pasar_Serang.pdf",
            content="Pembelian biji kopi 50kg dari Petani Banten senilai Rp 5.500.000 tunai.",
            doc_type="uploaded_doc"
        )
        self.assertEqual(len(self.rag.chunks), initial_count + 1)
        results = self.rag.search("Petani Banten", top_k=1)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0].chunk.source, "Nota_Pasar_Serang.pdf")

if __name__ == "__main__":
    unittest.main()
