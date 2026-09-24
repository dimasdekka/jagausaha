import unittest
from core.dlmm import (
    BusinessState,
    Obligation,
    Receivable,
    Scenario,
    calculate_safe_to_spend,
    calculate_runway,
    simulate_trajectory,
    run_fire_drill,
    calculate_prive_leakage,
)

class TestDLMMCore(unittest.TestCase):
    def setUp(self):
        self.state = BusinessState(
            business_name="Kopi Nusa",
            current_cash=18500000.0,
            safety_buffer=3000000.0,
            avg_daily_gross_inflow=900000.0,
            daily_cogs_ratio=0.60,
            obligations=[
                Obligation(title="Gaji Barista", due_day=6, amount=7500000.0, category="payroll"),
                Obligation(title="Tempo Biji Kopi Toko Berkah", due_day=11, amount=4200000.0, category="supplier_tempo"),
                Obligation(title="Sewa Tempat", due_day=25, amount=4000000.0, category="rent"),
            ],
            receivables=[
                Receivable(title="Katering Kantor Pemda", due_day=16, amount=5000000.0, collection_probability=0.9),
            ],
        )

    def test_safe_to_spend_exact_formula(self):
        # Within 14 days: Payroll (7.5M) + Tempo (4.2M) = 11.7M
        # Cash (18.5M) - 11.7M - Buffer (3.0M) = 3.8M
        safe_spend = calculate_safe_to_spend(self.state, window_days=14)
        self.assertEqual(safe_spend, 3800000.0)

    def test_seasonality_multipliers(self):
        # Days 5, 6 (Saturday, Sunday) should have 1.55x traffic
        self.assertEqual(self.state.get_day_inflow_multiplier(5), 1.55)
        self.assertEqual(self.state.get_day_inflow_multiplier(6), 1.55)
        # Weekday should have 0.78x traffic
        self.assertEqual(self.state.get_day_inflow_multiplier(1), 0.78)

    def test_cash_outflow_insolvency_detection(self):
        # Buying machine cash for 14M on Day 1 will breach payroll on Day 6
        scen_cash = Scenario(name="Beli Mesin Tunai", one_time_outflow=14000000.0, outflow_day=1)
        res = simulate_trajectory(self.state, scen_cash, days=30)
        self.assertFalse(res.is_safe)
        self.assertEqual(res.insolvency_day, 6)
        self.assertLess(res.min_scenario_cash, 0)

    def test_restructured_dp_is_safe(self):
        # Restructured: DP 50% (7M) on Day 1
        scen_dp = Scenario(name="Beli Mesin DP 50%", one_time_outflow=7000000.0, outflow_day=1)
        res = simulate_trajectory(self.state, scen_dp, days=30)
        self.assertIsNone(res.insolvency_day)
        self.assertGreater(res.min_scenario_cash, 0)

    def test_fire_drill_shocks(self):
        drill_results = run_fire_drill(self.state)
        self.assertIn("revenue_shock_20pct", drill_results)
        self.assertIn("receivable_delay_shock", drill_results)
        self.assertIsInstance(drill_results["revenue_shock_20pct"]["is_safe"], bool)

    def test_prive_leakage_detection(self):
        # Monthly gross profit 15M, owner draws 6M (40% > 35% threshold)
        draws = [1500000.0, 2000000.0, 2500000.0]
        res = calculate_prive_leakage(draws, gross_profit=15000000.0)
        self.assertTrue(res["is_excessive"])
        self.assertEqual(res["total_prive"], 6000000.0)
        self.assertEqual(res["leakage_ratio"], 0.4)

if __name__ == "__main__":
    unittest.main()
