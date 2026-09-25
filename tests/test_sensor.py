import unittest
from core.sensor import SensorAgent

class TestSensorAgent(unittest.TestCase):
    def setUp(self):
        self.sensor = SensorAgent()

    def test_extract_fnb_voice_transcript(self):
        transcript = (
            "Halo JagaUsaha, kedai kopi saya Kopi Nusa di Serang. "
            "Saldo rekening Bank BCA saat ini ada 25 juta, cadangan darurat mau simpan 5 juta. "
            "Karyawan ada 4 barista total gaji 8 juta dibayar tiap tanggal 30. "
            "Ada sewa ruko 3 juta sebulan, dan rata-rata omset harian 1,2 juta."
        )
        res = self.sensor.extract_business_context_from_narrative(transcript)
        self.assertEqual(res["business_name"], "Kopi Nusa")
        self.assertEqual(res["archetype"], "fnb")
        self.assertEqual(res["bank_name"], "BCA")
        self.assertEqual(res["initial_cash"], 25000000.0)
        self.assertEqual(res["safety_buffer"], 5000000.0)
        self.assertEqual(res["payroll_amount"], 8000000.0)
        self.assertEqual(res["payroll_day"], 30)
        self.assertEqual(res["safe_to_spend"], 12000000.0)
        self.assertGreaterEqual(res["confidence"], 0.8)

    def test_extract_retail_olshop(self):
        transcript = (
            "Nama toko saya Butik Hijab Zahrana. Kami pakai rekening Bank Mandiri "
            "dengan saldo kas 32 juta. Buffer darurat wajib ada 6 juta. "
            "Biaya gaji 3 admin 9 juta dibayar tanggal 28. Penjualan per hari 1,5 juta rupiah."
        )
        res = self.sensor.extract_business_context_from_narrative(transcript)
        self.assertIn("Zahrana", res["business_name"])
        self.assertEqual(res["archetype"], "retail")
        self.assertEqual(res["bank_name"], "Bank Mandiri")
        self.assertEqual(res["initial_cash"], 32000000.0)
        self.assertEqual(res["safety_buffer"], 6000000.0)
        self.assertEqual(res["payroll_amount"], 9000000.0)
        self.assertEqual(res["payroll_day"], 28)

    def test_extract_handles_empty_gracefully(self):
        res = self.sensor.extract_business_context_from_narrative("")
        self.assertIsNotNone(res["business_name"])
        self.assertGreater(res["initial_cash"], 0)
        self.assertGreater(res["safety_buffer"], 0)
        self.assertEqual(res["confidence"], 0.65)

    def test_extract_handles_none_gracefully(self):
        res = self.sensor.extract_business_context_from_narrative(None)
        self.assertIsNotNone(res["business_name"])
        self.assertEqual(res["confidence"], 0.65)

if __name__ == "__main__":
    unittest.main()
