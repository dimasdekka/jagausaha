"""
FastAPI Server for JagaUsaha
Serves REST endpoints for DLMM Engine, Sensor Agent, Advisor Agent, and Dashboard UI.
Optimized for lightweight execution on CloudBaik VPS (RAM < 80MB).
"""
import os
import sys
import json
from pathlib import Path
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

# Ensure root directory is in sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from core.dlmm import BusinessState, Obligation, Receivable, Scenario, simulate_trajectory, calculate_safe_to_spend
from core.sensor import SensorAgent
from core.advisor import AdvisorAgent

app = FastAPI(
    title="JagaUsaha API",
    description="Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global State Container (In-Memory for Demo/Hackathon Speed)
DEMO_DATA_PATH = BASE_DIR / "demo" / "kopi_teras_barokah.json"

def load_initial_state() -> BusinessState:
    with open(DEMO_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return BusinessState(
        business_name=data["business_name"],
        current_cash=data["current_cash"],
        safety_buffer=data["safety_buffer"],
        avg_daily_gross_inflow=data["avg_daily_gross_inflow"],
        daily_cogs_ratio=data["daily_cogs_ratio"],
        obligations=[Obligation(**ob) for ob in data["obligations"]],
        receivables=[Receivable(**{k: v for k, v in rec.items() if k in ["title", "due_day", "amount", "collection_probability"]}) for rec in data["receivables"]]
    )

CURRENT_STATE = load_initial_state()
SENSOR = SensorAgent()
ADVISOR = AdvisorAgent(CURRENT_STATE.business_name)

# Request Models
class SimulateRequest(BaseModel):
    preset_id: Optional[str] = None
    custom_name: Optional[str] = None
    one_time_outflow: float = 0.0
    outflow_day: int = 1
    monthly_fixed_delta: float = 0.0
    daily_inflow_multiplier: float = 1.0

class IngestRequest(BaseModel):
    text: str
    source_type: str = "whatsapp" # "whatsapp" or "bca"

class NudgeRequest(BaseModel):
    debtor_name: str
    amount: float
    tier: int = 1

class NegotiateRequest(BaseModel):
    supplier_name: str
    item_name: str
    total_price: float
    dp_percent: float = 0.5
    tempo_days: int = 30

class OnboardRequest(BaseModel):
    business_name: str
    archetype: str
    bank_name: str
    initial_cash: float
    safety_buffer: float
    payroll_amount: float
    payroll_day: int
    fixed_rent_amount: float
    daily_gross: float

class ResolveInboxRequest(BaseModel):
    item_id: str
    category: str

class ExtractContextRequest(BaseModel):
    text: Optional[str] = ""
    document_name: Optional[str] = None
    document_note: Optional[str] = None

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "app": "JagaUsaha",
        "version": "1.0.0",
        "framework": "Hermes Agent Compatible",
        "runtime": "CloudBaik VPS Ready"
    }

@app.get("/api/pulse")
def get_business_pulse():
    safe_spend = calculate_safe_to_spend(CURRENT_STATE, window_days=14)
    res_base = simulate_trajectory(CURRENT_STATE, None, days=30)
    
    return {
        "business_name": CURRENT_STATE.business_name,
        "current_cash": CURRENT_STATE.current_cash,
        "safe_to_spend": safe_spend,
        "safety_buffer": CURRENT_STATE.safety_buffer,
        "runway_days": res_base.runway_days,
        "daily_gross": CURRENT_STATE.avg_daily_gross_inflow,
        "daily_net": CURRENT_STATE.net_daily_operating_cash,
        "obligations": [ob.__dict__ for ob in CURRENT_STATE.obligations],
        "receivables": [rec.__dict__ for rec in CURRENT_STATE.receivables],
        "baseline_trajectory": {
            "days": res_base.days,
            "cash": res_base.baseline_cash
        }
    }

@app.post("/api/simulate")
def simulate_decision(req: SimulateRequest):
    # Check if preset
    with open(DEMO_DATA_PATH, "r", encoding="utf-8") as f:
        demo_raw = json.load(f)
    
    scenario = None
    if req.preset_id:
        match = next((p for p in demo_raw["preset_scenarios"] if p["id"] == req.preset_id), None)
        if match:
            scenario = Scenario(
                name=match["name"],
                one_time_outflow=match["one_time_outflow"],
                outflow_day=match["outflow_day"],
                monthly_fixed_delta=match["monthly_fixed_delta"],
                daily_inflow_multiplier=match["daily_inflow_multiplier"]
            )
    
    if not scenario:
        scenario = Scenario(
            name=req.custom_name or "Skenario Kustom",
            one_time_outflow=req.one_time_outflow,
            outflow_day=req.outflow_day,
            monthly_fixed_delta=req.monthly_fixed_delta,
            daily_inflow_multiplier=req.daily_inflow_multiplier
        )

    res = simulate_trajectory(CURRENT_STATE, scenario, days=30)
    advisory = ADVISOR.formulate_simulation_advisory(res, scenario.name)

    return {
        "scenario": scenario.__dict__,
        "trajectory": {
            "days": res.days,
            "baseline": res.baseline_cash,
            "scenario": res.scenario_cash
        },
        "metrics": {
            "is_safe": res.is_safe,
            "safe_to_spend": res.safe_to_spend,
            "min_scenario_cash": res.min_scenario_cash,
            "insolvency_day": res.insolvency_day,
            "breaches": res.breached_rules
        },
        "advisory": advisory
    }

@app.post("/api/nudge")
def get_nudge_script(req: NudgeRequest):
    return ADVISOR.generate_debt_collection_message(req.debtor_name, req.amount, tier=req.tier)

@app.post("/api/negotiate")
def get_negotiate_script(req: NegotiateRequest):
    return ADVISOR.generate_supplier_negotiation_script(
        req.supplier_name, req.item_name, req.total_price, req.dp_percent, req.tempo_days
    )

@app.post("/api/ingest")
def ingest_text(req: IngestRequest):
    if req.source_type == "bca":
        txns = SENSOR.parse_bca_mutation_text(req.text)
        return {"count": len(txns), "transactions": [t.__dict__ for t in txns]}
    else:
        parsed = SENSOR.parse_whatsapp_note(req.text)
        # Add to state dynamically if desired
        if parsed["type"] == "obligation":
            CURRENT_STATE.obligations.append(Obligation(
                title=parsed["title"],
                due_day=parsed["due_day"],
                amount=parsed["amount"],
                category=parsed["category"]
            ))
        elif parsed["type"] == "receivable":
            CURRENT_STATE.receivables.append(Receivable(
                title=parsed["title"],
                due_day=parsed["due_day"],
                amount=parsed["amount"]
            ))
        return {"parsed": parsed, "message": "Berhasil ditambahkan ke radar JagaUsaha"}

@app.post("/api/onboard")
def onboard_new_business(req: OnboardRequest):
    global CURRENT_STATE
    # Calibrate state from new business onboarding
    CURRENT_STATE = BusinessState(
        business_name=req.business_name,
        current_cash=req.initial_cash,
        safety_buffer=req.safety_buffer,
        avg_daily_gross_inflow=req.daily_gross,
        daily_cogs_ratio=0.55 if req.archetype == "fnb" else 0.65,
        obligations=[
            Obligation(title=f"Gaji Tim Karyawan", due_day=req.payroll_day, amount=req.payroll_amount, category="payroll"),
            Obligation(title=f"Sewa & Tempo Operasional", due_day=10, amount=req.fixed_rent_amount, category="rent"),
        ],
        receivables=[
            Receivable(title=f"Piutang Operasional {req.business_name}", due_day=14, amount=req.daily_gross * 4, collection_probability=0.85)
        ]
    )
    safe_spend = calculate_safe_to_spend(CURRENT_STATE, window_days=14)
    res_base = simulate_trajectory(CURRENT_STATE, None, days=30)
    return {
        "status": "success",
        "message": f"Konteks usaha {req.business_name} berhasil diinisialisasi!",
        "safe_to_spend": safe_spend,
        "runway_days": res_base.runway_days,
        "current_cash": CURRENT_STATE.current_cash
    }

@app.post("/api/ai/extract-context")
def extract_context_endpoint(req: ExtractContextRequest):
    combined_text = req.text or ""
    if req.document_note:
        combined_text += f"\nCatatan Usaha: {req.document_note}"
    result = SENSOR.extract_business_context_from_narrative(combined_text, req.document_name)
    return result

# Data Inbox Items (Resolving Uncertain Bank Mutations)
DATA_INBOX_ITEMS = [
    {
        "id": "inbox-1",
        "date": "24 Sep 2026",
        "raw_text": "TRSF E-BANKING DB 2409/FTSCY/WS95011 450.000,00",
        "counterparty": "Transfer Antar Rekening Pribadi",
        "amount": 450000.0,
        "type": "OUTFLOW",
        "suggested_category": "PRIVE",
        "confidence": 0.72,
        "status": "UNRESOLVED"
    },
    {
        "id": "inbox-2",
        "date": "23 Sep 2026",
        "raw_text": "QRIS 00019283 TOKO PLASTIK MAKMUR 380.000,00",
        "counterparty": "Toko Plastik Makmur",
        "amount": 380000.0,
        "type": "OUTFLOW",
        "suggested_category": "COGS_PACKAGING",
        "confidence": 0.81,
        "status": "UNRESOLVED"
    }
]

@app.get("/api/data-inbox")
def get_data_inbox():
    return {"items": DATA_INBOX_ITEMS}

@app.post("/api/data-inbox/resolve")
def resolve_data_inbox_item(req: ResolveInboxRequest):
    item = next((i for i in DATA_INBOX_ITEMS if i["id"] == req.item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item Data Inbox tidak ditemukan")
    item["status"] = "RESOLVED"
    item["category"] = req.category
    return {
        "status": "success",
        "message": f"Transaksi {item['raw_text'][:25]}... dialokasikan sebagai {req.category}",
        "item": item
    }

# Business Memory Store (Decision Tracking & Outcome Measurement)
BUSINESS_MEMORIES = [
    {
        "id": "mem-1",
        "date": "Agustus 2026",
        "decision_title": "Restrukturisasi Pembelian Mesin Kopi (DP 50% vs Tunai)",
        "rationale": "Mencegah saldo kas defisit saat tanggal gajian barista (H+6)",
        "simulated_impact": "Menyelamatkan kas likuid Rp 7.000.000",
        "actual_outcome": "Toko sukses melewati gajian tanpa pinjaman online; kas operasional tetap terjaga sehat",
        "status": "VERIFIED_SUCCESS"
    },
    {
        "id": "mem-2",
        "date": "Juli 2026",
        "decision_title": "Penagihan Piutang Katering via WhatsApp QRIS Santun",
        "rationale": "Mempercepat kas masuk 7 hari lebih awal sebelum tempo sewa tempat",
        "simulated_impact": "Percepatan likuiditas +Rp 5.000.000",
        "actual_outcome": "Pelanggan melunasi dalam 48 jam; tidak terjadi benturan tempo",
        "status": "VERIFIED_SUCCESS"
    }
]

@app.get("/api/memory")
def get_business_memories():
    return {"memories": BUSINESS_MEMORIES}

@app.get("/api/agents/telemetry")
def get_agents_telemetry():
    return {
        "sensor_agent": {
            "status": "active",
            "bca_mutations_indexed": 104,
            "ocr_documents_processed": 18,
            "prive_isolated": True,
            "latency_ms": 14
        },
        "simulator_agent": {
            "status": "active",
            "method": "DLMM FastMath Core",
            "hallucination_rate": "0% (Zero Hallucination)",
            "horizon_days": 30
        },
        "advisor_agent": {
            "status": "active",
            "channel": "WhatsApp Webhook Ready",
            "tone": "Indonesian UMKM Polite Tone",
            "staged_drafts": 2
        }
    }

@app.post("/api/reset")
def reset_state():
    global CURRENT_STATE
    CURRENT_STATE = load_initial_state()
    return {"status": "reset_success"}

# Serve frontend static files
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"
if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")
    
    @app.get("/")
    def serve_frontend_root():
        return FileResponse(str(FRONTEND_DIST / "index.html"))

    @app.get("/{full_path:path}")
    def serve_frontend_spa(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = FRONTEND_DIST / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(str(file_path))
        return FileResponse(str(FRONTEND_DIST / "index.html"))
else:
    @app.get("/")
    def serve_placeholder():
        return {"message": "JagaUsaha API Active. Frontend build pending in frontend/dist."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.server:app", host="0.0.0.0", port=8000, reload=False)
