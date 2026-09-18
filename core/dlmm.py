"""
Dynamic Liquidity & Margin Model (DLMM)
Deterministic Financial Simulation Core for JagaUsaha.
Zero LLM dependencies. All calculations are exact and reproducible.
"""
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple

@dataclass
class Obligation:
    title: str
    due_day: int # 1 to 30 days from now
    amount: float
    category: str # "payroll", "supplier_tempo", "rent", "loan", "tax"
    is_hard_commitment: bool = True

@dataclass
class Receivable:
    title: str
    due_day: int
    amount: float
    collection_probability: float = 0.85 # Default hazard discount

@dataclass
class BusinessState:
    business_name: str
    current_cash: float # Bank + Cash drawer
    safety_buffer: float # Minimum reserve (e.g. Rp 3.000.000)
    avg_daily_gross_inflow: float # Gross daily sales
    daily_cogs_ratio: float = 0.55 # Daily raw material/operational burn ratio (55% COGS)
    obligations: List[Obligation] = field(default_factory=list)
    receivables: List[Receivable] = field(default_factory=list)

    @property
    def net_daily_operating_cash(self) -> float:
        return self.avg_daily_gross_inflow * (1.0 - self.daily_cogs_ratio)

@dataclass
class Scenario:
    name: str
    one_time_outflow: float = 0.0
    outflow_day: int = 1
    monthly_fixed_delta: float = 0.0
    daily_inflow_multiplier: float = 1.0
    alternative_plans: List[Dict] = field(default_factory=list)

@dataclass
class TrajectoryResult:
    days: List[int]
    baseline_cash: List[float]
    scenario_cash: List[float]
    safe_to_spend: float
    runway_days: int
    min_scenario_cash: float
    insolvency_day: Optional[int]
    breached_rules: List[str]
    is_safe: bool

def calculate_safe_to_spend(state: BusinessState, window_days: int = 14) -> float:
    """
    Safe-to-Spend ("Duit Dingin"):
    Cash - Committed Obligations(window) + Discounted Receivables(window) - Safety Buffer
    """
    committed_outflows = sum(
        ob.amount for ob in state.obligations 
        if ob.due_day <= window_days and ob.is_hard_commitment
    )
    safe_inflows = sum(
        rec.amount * rec.collection_probability 
        for rec in state.receivables 
        if rec.due_day <= window_days
    )
    # ponytail: assume zero revenue expansion within 14-day safety window for strict liquidity protection
    safe_amount = (state.current_cash - committed_outflows + safe_inflows) - state.safety_buffer
    return max(0.0, round(safe_amount, 2))

def calculate_runway(current_cash: float, avg_daily_burn: float) -> int:
    if avg_daily_burn <= 0:
        return 999
    return int(current_cash / avg_daily_burn)

def simulate_trajectory(state: BusinessState, scenario: Optional[Scenario] = None, days: int = 30) -> TrajectoryResult:
    """
    Simulate day-by-day cash evolution across specified horizon.
    Compares baseline against hypothetical scenario.
    """
    base_cash = state.current_cash
    scen_cash = state.current_cash
    
    baseline_curve: List[float] = [round(base_cash, 2)]
    scenario_curve: List[float] = [round(scen_cash, 2)]
    day_labels: List[int] = [0]
    
    insolvency_day: Optional[int] = None
    min_scen_cash = scen_cash
    breached_rules: List[str] = []

    # Map obligations & receivables by day
    ob_map: Dict[int, float] = {}
    for ob in state.obligations:
        ob_map[ob.due_day] = ob_map.get(ob.due_day, 0.0) + ob.amount

    rec_map: Dict[int, float] = {}
    for rec in state.receivables:
        rec_map[rec.due_day] = rec_map.get(rec.due_day, 0.0) + (rec.amount * rec.collection_probability)

    for d in range(1, days + 1):
        day_labels.append(d)
        
        # Base daily movement
        outflow_today = ob_map.get(d, 0.0)
        inflow_today = state.net_daily_operating_cash + rec_map.get(d, 0.0)
        
        base_cash = base_cash + inflow_today - outflow_today
        baseline_curve.append(round(base_cash, 2))

        # Scenario movement
        scen_outflow = outflow_today
        if scenario and scenario.outflow_day == d:
            scen_outflow += scenario.one_time_outflow
            
        scen_inflow = (state.net_daily_operating_cash * (scenario.daily_inflow_multiplier if scenario else 1.0)) + rec_map.get(d, 0.0)
        if scenario:
            scen_outflow += (scenario.monthly_fixed_delta / 30.0)

        scen_cash = scen_cash + scen_inflow - scen_outflow
        scenario_curve.append(round(scen_cash, 2))

        if scen_cash < min_scen_cash:
            min_scen_cash = scen_cash

        if scen_cash < 0 and insolvency_day is None:
            insolvency_day = d

    # Evaluate Invariant Breaches
    safe_to_spend = calculate_safe_to_spend(state, window_days=14)
    runway_days = calculate_runway(state.current_cash, state.avg_daily_gross_inflow * state.daily_cogs_ratio)

    if scenario:
        outflow_fmt = f"Rp {scenario.one_time_outflow:,.0f}".replace(",", ".")
        safe_fmt = f"Rp {safe_to_spend:,.0f}".replace(",", ".")
        min_fmt = f"Rp {abs(min_scen_cash):,.0f}".replace(",", ".")
        buf_fmt = f"Rp {state.safety_buffer:,.0f}".replace(",", ".")

        if scenario.one_time_outflow > safe_to_spend:
            breached_rules.append(
                f"Pengeluaran ({outflow_fmt}) melebihi Duit Dingin aman ({safe_fmt})."
            )
        if insolvency_day is not None:
            breached_rules.append(
                f"Insolvensi Kas: Saldo minus {min_fmt} pada Hari ke-{insolvency_day}."
            )
        elif min_scen_cash < state.safety_buffer:
            breached_rules.append(
                f"Cadangan Aman Tergerus: Saldo menyentuh {min_fmt} (di bawah buffer {buf_fmt})."
            )

    is_safe = (insolvency_day is None) and (min_scen_cash >= state.safety_buffer)

    return TrajectoryResult(
        days=day_labels,
        baseline_cash=baseline_curve,
        scenario_cash=scenario_curve,
        safe_to_spend=safe_to_spend,
        runway_days=runway_days,
        min_scenario_cash=round(min_scen_cash, 2),
        insolvency_day=insolvency_day,
        breached_rules=breached_rules,
        is_safe=is_safe
    )

if __name__ == "__main__":
    # Runnable Self-Check for Kopi Teras Barokah
    test_state = BusinessState(
        business_name="Kopi Teras Barokah",
        current_cash=18500000.0,
        safety_buffer=3000000.0,
        avg_daily_gross_inflow=900000.0, # 900rb gross daily omset
        daily_cogs_ratio=0.60, # 60% daily variable expense (beans, milk, cups, syrup, ice)
        obligations=[
            Obligation(title="Gaji 3 Karyawan", due_day=6, amount=7500000.0, category="payroll"),
            Obligation(title="Tempo Biji Kopi Toko Berkah", due_day=11, amount=4200000.0, category="supplier_tempo"),
            Obligation(title="Sewa Tempat Bulanan", due_day=25, amount=4000000.0, category="rent")
        ],
        receivables=[
            Receivable(title="Katering Kantor Pemda", due_day=16, amount=5000000.0, collection_probability=0.9)
        ]
    )

    safe_spend = calculate_safe_to_spend(test_state, window_days=14)
    # Expected: 18.5M - 7.5M (payroll) - 4.2M (tempo) + 0 (rec at day 16 is outside 14d) - 3.0M buffer = 3.8M
    assert abs(safe_spend - 3800000.0) < 1.0, f"Expected 3.8M, got {safe_spend}"

    # Test Scenario: Buy 14M Espresso machine cash on day 1
    scen_bad = Scenario(name="Beli Mesin Espresso Tunai", one_time_outflow=14000000.0, outflow_day=1)
    res_bad = simulate_trajectory(test_state, scen_bad, days=30)
    assert not res_bad.is_safe, "Machine purchase should violate safety"
    assert res_bad.insolvency_day is not None, "Should flag insolvency day"
    
    print(f"[SUCCESS] DLMM Self-Check Passed. Safe-to-Spend: Rp {safe_spend:,.0f}. Invariant crash correctly detected at day {res_bad.insolvency_day} (Min cash: Rp {res_bad.min_scenario_cash:,.0f}).")
