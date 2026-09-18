# JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM
*Architectural Blueprint, Product Strategy & Hackathon Defense Document*

---

## 1. START FROM THE PROBLEM — NOT THE SOLUTION

### 1.1 Field Realities of Indonesian UMKM
Indonesian Micro, Small, and Medium Enterprises (UMKM) encompass 64+ million business units contributing 61% of national GDP, yet over 80% fail within their first five years. Field observation across core segments—Warung Sembako, F&B (Kopi Susu, Ayam Geprek, Katering), Small Retail (Toko Pakaian, Kosmetik), Service (Bengkel, Laundry Kiloan), and Online Merchants (Shopee, TikTok Shop)—reveals distinct structural vulnerabilities:

1. **The "Omset Ramai, Duit Hilang" Illusion (Cash vs. Profit Trap)**
   - High daily cash flow creates a deceptive feeling of wealth. Owners look at gross daily receipts (laci kasir or QRIS settlement balance) and treat it as distributable income.
   - Fixed obligations (gaji karyawan, sewa ruko, listrik, cicilan KUR) and upcoming supplier payables (*tempo*) are not accrued in real time.
   - Result: Money is drained for household needs (*uang dapur*) until working capital collapses at payroll or supplier billing time.

2. **The Supplier "Tempo" & Bulk Discount Cash Trap**
   - Raw material suppliers incentivize bulk purchases: *"Beli 1 dus Rp 300rb, beli 5 dus diskon 15% jadi Rp 1,275rb."*
   - The owner takes the discount to optimize margin, unaware they just locked 60% of their liquid cash into illiquid inventory that takes 45 days to sell.
   - Two weeks later, payroll or a major utility bill arrives; the business defaults despite having high gross margins on paper.

3. **Settlement Latency & Receivables Starvation**
   - Offline businesses face customer informal credit (*bon gantung* / *kasbon tetangga* or catering client 30-day net terms).
   - Online/F&B businesses face platform settlement holds: GoFood/GrabFood/ShopeeFood take T+1 to T+3; TikTok Shop/Tokopedia hold funds for 3–7 days post-delivery.
   - Meanwhile, raw ingredient purchases require upfront cash or tight 7-day terms. The resulting liquidity mismatch triggers sudden insolvency.

4. **Silent Margin Compression (Phantom Margins & Input Shock)**
   - Volatile Indonesian staple commodities (minyak goreng, cabai rawit, telur, daging ayam, kemasan plastik, biji kopi) surge 20%–40% overnight.
   - Platform take rates (20% commission + service fee + promo cost) silently erode margins.
   - UMKM owners rarely recalculate their Cost of Goods Sold (Harga Pokok Penjualan / HPP). They maintain selling prices out of fear of losing customers, unwittingly subsidizing every order.

5. **Decision Paralysis & Intuitive Guesswork**
   - Critical decisions are made 100% on gut feeling:
     - *"Bisa nggak ya rekrut 1 barista tambahan gaji Rp 2 juta/bulan?"*
     - *"Bisa nggak beli mesin chiller Rp 15 juta sekarang?"*
     - *"Kalau diskon 20% di GrabFood, kita masih untung atau buntung?"*
   - Existing software (BukuWarung, Mekari Jurnal) only looks backward. They record what was spent, but cannot answer forward-looking *counterfactual* questions.

### 1.2 Problem Ranking Matrix

| Problem | Frequency | Severity | Willingness to Use | Data Availability | AI Agent Suitability | Hackathon Demo Impact | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Illiquidity Trap & Blind CAPEX/Stock Purchases** | High (Weekly) | **Critical (Insolvency in <14 days)** | **Very High** (Directly prevents disaster) | High (Bank mutation, QRIS, self-reported cash) | **Highest** (Counterfactual simulation, risk constraints) | **10/10** (Dramatic visual contrast: Safe vs. Ruin) | **P0 (Hero)** |
| **2. Silent Margin Compression & Fee Leakage** | Continuous | High (Slow bleed over 3–6 months) | High | Medium (Receipts, platform settlement reports) | High (Anomaly detection, dynamic HPP recalculation) | 8/10 | **P1** |
| **3. Working Capital vs. Personal Cash Mixing** | Daily | High (Depletes working capital) | Medium (Behavioral resistance) | Medium (Bank categorization) | Medium (Classification & automated "Duit Dingin" partitioning) | 7/10 | **P1** |
| **4. Receivables Aging & Late Payment Follow-up** | Weekly | Medium | High | Low-Medium (Informal notes, invoices) | High (Automated gentle collection scripts via WhatsApp) | 7/10 | **P2** |
| **5. Tax Compliance & Accounting Bookkeeping** | Monthly/Yearly | Low (Informal sector avoids taxes) | **Extremely Low** (Treated as chore) | Low | Low (Pure rule-based CRUD, not agentic) | 3/10 (Boring, crowded) | **DO NOT BUILD** |

---

## 2. CRITICAL EVALUATION OF THE ORIGINAL IDEA

### 2.1 The Original Hypothesis
> *"JagaUsaha is an AI Business Guardian that continuously understands the condition of a small business, detects risks early, simulates future decisions, and recommends actions before problems become serious."*

### 2.2 Brutal Reality Check & Weak Assumptions

1. **Fatal Flaw: The Data Entry Tax**
   - *Assumption:* The owner will diligently feed transactional data into JagaUsaha to keep the "Business Digital Twin" fresh.
   - *Reality:* 90% of UMKM abandon BukuKas and BukuWarung within 21 days because manual entry has an immediate friction cost with delayed, intangible benefit.
   - *Redesign:* JagaUsaha must operate on **Zero-Effort Exhaust Data**: e-banking PDF statement uploads, QRIS daily recap screenshots, forwarded supplier WhatsApp invoices, and short voice memos (*"Keluar 450rb beli gas dan cup"*).

2. **The "Dashboard + Chat" Trap**
   - *Assumption:* An owner will log into a dashboard, study charts, and ask open-ended questions like *"How is my business today?"*
   - *Reality:* UMKM owners do not want business intelligence dashboards; they are busy serving customers and prepping stock. They only want clear, unambiguous guardrails when a decision arises.
   - *Redesign:* **Proactive Push + Decision Sandbox**. JagaUsaha pushes high-conviction alerts via WhatsApp or a high-contrast mobile screen with two states: **SAFE (Green)** or **WARNING (Amber/Red)** with immediate corrective choices.

3. **The LLM Math Hallucination Risk**
   - *Assumption:* A prompt-engineered LLM can evaluate balance sheets and forecast cash flow.
   - *Reality:* LLMs are probabilistic text generators. They will hallucinate sums, compound interest, runway calculations, and break-even points, destroying trust.
   - *Redesign:* **Strict Separation of Compute and Reasoning**. All math, projections, and liquidity envelopes are computed by a deterministic, zero-hallucination Python engine. The LLM acts purely as an intent parser, scenario constructor, and empathetic Indonesian advisory communicator.

4. **"Digital Twin" Buzzword Inflation**
   - Calling a 5-variable spreadsheet a "Digital Twin" alienates practical judges and confuses users.
   - *Redesign:* Frame it as the **Dynamic Liquidity & Margin Model (DLMM)**—a real-time state vector of unencumbered cash, pending obligations, and burn rate.

---

## 3. COMPETITIVE LANDSCAPE & LOCAL ADAPTATION

### 3.1 Global & Domestic Precedents

| Category | Products | Core Limitation for Indonesian UMKM |
| :--- | :--- | :--- |
| **Enterprise AI CFO / FP&A** | Runway Financial, Brex AI, Pilot, Fathom | Requires clean NetSuite/QuickBooks double-entry ledgers; pricing is enterprise-tier; completely detached from informal cash economies. |
| **Indonesian Bookkeeping / Ledger** | BukuWarung, BukuKas (rebranded to payment/fintech) | Retrospective record keeping; high churn from manual data entry fatigue; zero simulation capability; pivoted to selling high-interest loans. |
| **Indonesian SME Accounting / SaaS** | Mekari Jurnal, Accurate Online | Designed for professional accountants; rigid chart of accounts; no predictive forward guidance for micro-operators. |
| **POS Systems** | Moka POS, Majoo, Pawoon, Olsera | Excellent at in-store checkout point; completely blind to external bank movements, supplier terms (*tempo*), tax, and personal owner withdrawals. |

### 3.2 The Unfair Differentiation for JagaUsaha
JagaUsaha does not compete on *recording the past*. It occupies an uncrowded white space:
1. **Decision Sandbox over Record Keeping:** Answers *"Can I afford this?"* before money leaves the bank.
2. **Exhaust Data Ingestion:** Extracts operational state from existing artifacts (Bank mutation PDFs, QRIS settlement reports, WhatsApp receipts) rather than asking for manual ledgers.
3. **Deterministic Financial Bounds + Agentic Reasoning:** Hard mathematical guarantees on cash runway combined with natural Indonesian negotiation and advisory synthesis.

---

## 4. CORE INTELLIGENCE: DYNAMIC LIQUIDITY & MARGIN MODEL (DLMM)

Instead of a nebulous "Digital Twin", the system maintains a structured **State Vector**:

$$\mathbf{S}_t = \langle C_t, O_{t 	o t+k}, P_{t 	o t+k}, R_{t 	o t+k}, \mu_{	ext{inflow}}, \sigma_{	ext{inflow}}, 	ext{HPP}_m angle$$

Where:
- $C_t$: Liquid unencumbered cash (bank accounts + cash in drawer - committed floats).
- $O_{t 	o t+k}$: Hard fixed obligations scheduled over horizon $k$ (payroll, rent, debt service, utilities).
- $P_{t 	o t+k}$: Supplier payables and upcoming purchase obligations with payment terms (*tempo*).
- $R_{t 	o t+k}$: Pending receivables discounted by historical customer/platform settlement hazard rate $h(t)$.
- $\mu_{	ext{inflow}}, \sigma_{	ext{inflow}}$: Stochastic daily revenue run-rate modeled via Poisson-Gamma distribution.
- $	ext{HPP}_m$: Dynamic Cost of Goods Sold per core SKU reflecting latest material input price changes.

### 4.1 Liquidity Invariant Engine
The system defines a fundamental survival condition:
$$	ext{Safe-to-Spend}_t = C_t - \sum_{i=1}^{k} \left( O_{t+i} + P_{t+i} ight) + \sum_{i=1}^{k} \hat{R}_{t+i}^{p=0.90} - 	ext{Safety Buffer}_{	ext{min}}$$

If an owner attempts an expense $E > 	ext{Safe-to-Spend}_t$, the **Invariant Violation Alarm** triggers immediately.

---

## 5. DIFFERENTIATING FEATURE DEEP DIVE

### 5.1 Evaluated Core Features
1. **Business Health / Risk Score (Replaced by 3-Pillar Pulse)**
   - *Verdict:* A single composite number (e.g., "78/100") is misleading and dangerous. An owner with a score of 85 might feel safe while facing a fatal liquidity squeeze in 7 days due to lumpy debt repayment.
   - *Architecture:* Replace with **3-Dial Vital Signs**:
     1. **Cash Runway Days:** $rac{	ext{Liquid Reserves}}{	ext{Net Daily Burn}}$ (under zero-revenue stress).
     2. **14-Day Liquidity Gap:** Deterministic surplus/deficit taking into account scheduled payroll and supplier tempo.
     3. **Gross Margin Integrity:** Percentage change in real HPP vs. menu/retail pricing.

2. **Future Simulator ("Bisa Beli Nggak?" Sandbox) [HERO FEATURE]**
   - Enables the owner to simulate hypothetical scenarios in 3 taps:
     - *"Beli mesin sangrai kopi Rp 12 juta tunai vs cicilan 6 bulan."*
     - *"Rekrut 1 karyawan baru Rp 2,2 juta/bulan."*
     - *"Ambil promo supplier beli 10 sak gula diskon 15%."*
   - Engine runs three trajectories: **Expected Case**, **Pessimistic Case (-25% sales)**, and **Stress Case (Late receivables + raw material shock)**.
   - Clearly flags the exact calendar day where cash balance turns negative.

3. **Business Fire Drill (Automated Stress-Testing)**
   - Agent routinely injects external shocks into the DLMM:
     - *Shock A:* What if raw chicken prices spike 30% for 3 weeks?
     - *Shock B:* What if ShopeeFood/GrabFood settlement is delayed by 5 business days over Lebaran?
   - Identifies structural failure points before they manifest in reality.

4. **Business Pre-Mortem ("Kenapa Toko Ini Bangkrut?")**
   - The agent projects current burn and inventory obsolescence 90–180 days forward.
   - Generates a narrative failure autopsy: *"Jika tren penurunan omset 5% per minggu berlanjut dan stok sirup rasa premium senilai Rp 8 juta tetap macet, uang kas habis per 14 November karena jatuh tempo sewa ruko."*
   - Outlines the 2 highest-leverage interventions to avert failure.

5. **Silent Leak Detector (Phantom Fee & Margin Shrinkage)**
   - Automatically tracks unit economics. Compares invoice unit prices over time.
   - Flags hidden costs: Platform commissions, promotional discount co-funding, ice cube/oil price creep, and unrecorded personal withdrawals.

6. **"Duit Dingin" (Safe-to-Spend) Partitioning**
   - Solves the #1 behavioral illness of Indonesian UMKM: mixing business and personal funds.
   - Displays a prominent widget: *"Total di Rekening: Rp 24.500.000, tapi **Duit Dingin yang Boleh Dipakai: Rp 4.200.000**."* The remaining Rp 20.300.000 is locked for upcoming payroll (Rp 12M) and supplier tempo (Rp 8.3M).

7. **Business Memory (Event-Aware Temporal Context)**
   - Stores temporal patterns in local SQLite vector + key-value store:
     - *"Setiap tanggal 25–28 omset naik 45% (gajian karyawan kantor sekitar)."*
     - *"Bulan puasa minggu 1-2 penjualan sepi, minggu 3-4 melonjak 300%."*
   - Provides context when explaining anomalies so the owner doesn't panic unnecessarily.

---

## 6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES

### Capability 1: "Jebakan Promo Supplier" (Bulk Discount vs. Cash Runway Validator)
- **Problem:** Supplier offers 15% discount for ordering 10 units instead of 2. Owner feels it is smart savings, but drains cash right before tax/payroll.
- **Agent Behavior:** Intercepts purchase intent. Calculates holding cost, turnover velocity, and liquidity cliff. Tells owner: *"Diskon 15% menghemat Rp 300rb, tapi kas Anda minus di hari ke-12 saat tempo susu kental manis jatuh tempo. Maksimal beli 3 unit."*
- **User Value:** Prevents cash lockup in slow-moving inventory.
- **Technical Feasibility:** High (deterministic cash projection + inventory holding cost formula).
- **Demo Wow Factor:** 9.5/10 (Counter-intuitive insight: why "saving money" can cause bankruptcy).
- **Safety Risk:** Low (pure advisory boundary).

### Capability 2: "Kolektor Bon Santun" (Agentic Receivables Nudge via WhatsApp)
- **Problem:** Indonesian cultural reluctance to collect debts (*"nggak enakan sama tetangga / langganan"*). Bon gantung piles up to tens of millions.
- **Agent Behavior:** Monitors unpaid aging receivables. Drafts contextual, culturally respectful Indonesian WhatsApp payment reminders with polite tiered phrasing (Tingkat 1: Pengingat Halus -> Tingkat 2: Konfirmasi Rekonsiliasi -> Tingkat 3: Batas Tempo Order Baru) with direct QRIS payment links.
- **User Value:** Unlocks trapped cash without alienating valued regular customers.
- **Technical Feasibility:** High (LLM prompt engineering with tone constraints + QRIS dynamic generation).
- **Demo Wow Factor:** 9/10 (Live interactive generation of Indonesian polite collection messages).
- **Safety Risk:** Medium (Human-in-the-loop: owner must tap "Send" in WhatsApp; AI never spams autonomously).

### Capability 3: "Filter Uang Dapur vs Uang Usaha" (Zero-Effort Personal Drain Auditor)
- **Problem:** Owner uses the business BCA/Mandiri account to pay for Indomaret personal snacks, PLN rumah, and school fees.
- **Agent Behavior:** Classifies bank mutation patterns via fine-tuned NLP heuristics. Segregates operational expenses (OPEX) from personal drawings (*prive*). Calculates the "Laju Bocor Dapur" (household bleed rate).
- **User Value:** Shows the owner the brutal truth: *"Usaha Anda untung Rp 14 juta bulan ini, tapi Rp 11 juta tersedot untuk kebutuhan rumah pribadi secara bertahap."*
- **Technical Feasibility:** High (Regex + transaction categorization heuristics + LLM fallback).
- **Demo Wow Factor:** 8.5/10 (Eye-opening transparency for UMKM owners).
- **Safety Risk:** Low (Strictly internal audit classification).

### Capability 4: "Audit Margin Platform" (GoFood/GrabFood/ShopeeFood Take-Rate Dissector)
- **Problem:** F&B merchants see high online sales, but bank disbursements are 25%–35% lower than menu price due to stacked platform commission, merchant promo participation, and algorithm fees.
- **Agent Behavior:** Parses daily settlement CSV/PDF. Deconstructs gross vs. net payout per menu item. Highlights items where net margin is negative after platform cut.
- **User Value:** Stops merchants from selling high-volume loss-leaders on food apps.
- **Technical Feasibility:** High (Settlement statement PDF parser + deterministic fee breakdown).
- **Demo Wow Factor:** 8.5/10 (Shows a popular menu item that actually loses Rp 2,500 per sale).
- **Safety Risk:** Low.

### Capability 5: "Radar Kenaikan Harga Vendor" (Vendor Price Creep Watchdog)
- **Problem:** Suppliers quietly raise raw material prices by Rp 1,500 - Rp 3,000 per kilo across deliveries without explicit notice.
- **Agent Behavior:** OCRs handwritten or printed supplier *nota*, extracts line-item unit costs, and tracks price trajectories. Alerts: *"Harga Minyak Curah naik 8% dalam 3 minggu terakhir dari Toko Berkah. Margin gorengan Anda turun 4,2%."*
- **User Value:** Restores bargaining power; signals when to renegotiate or update retail prices.
- **Technical Feasibility:** Medium (Vision OCR on messy Indonesian receipts).
- **Demo Wow Factor:** 8/10.
- **Safety Risk:** Low.

### Capability 6: "Simulasi Nombok Gaji" (Payroll Shortfall Countdown)
- **Problem:** Payroll is due on the 25th or 1st. Owner realizes they cannot pay on the 24th night, leading to emergency loans or staff conflict.
- **Agent Behavior:** Continuously forecasts cumulative net cash inflow against scheduled payroll date. Calculates the exact probability of shortfall 14 days in advance and suggests micro-interventions (e.g., promo clearance, holding discretionary stock purchase).
- **User Value:** Eliminates panic; grants a 2-week window to solve working capital gaps.
- **Technical Feasibility:** High (Monte Carlo probability calculation on daily cashflow).
- **Demo Wow Factor:** 9/10.
- **Safety Risk:** Low.

### Capability 7: "Menu Engineering Killer" (Low-Margin / Dead Stock Menu Pruner)
- **Problem:** Cafes and warungs maintain 50+ menu items. 15 items order ingredients that expire and spoil, contributing less than 2% of profit.
- **Agent Behavior:** Correlates ingredient shelf-life with sales volume. Recommends: *"Hapus 4 varian teh buah ini: bahan baku sirup mangga basi sebelum habis terpakai, menyebabkan pemborosan Rp 350.000/bulan."*
- **User Value:** Reduces inventory bloat and spoilage waste (*food waste*).
- **Technical Feasibility:** Medium-High.
- **Demo Wow Factor:** 7.5/10.
- **Safety Risk:** Low.

### Capability 8: "Script Negosiasi Tempo Supplier" (Restructuring Script Generator)
- **Problem:** Cash crunch occurs; owner evades supplier phone calls out of shame, losing trade credit permanently.
- **Agent Behavior:** Knowing the exact cash gap, the agent generates a realistic debt restructuring proposal in formal/polite Indonesian: *"Mohon maaf Pak Haji, kas kami tertahan invoice katering pemda. Kami cicil 40% hari ini (Rp 2 juta), sisanya tanggal 10 setelah pencairan. Ini bukti mutasi kas kami."*
- **User Value:** Preserves critical supplier relationships during temporary illiquidity.
- **Technical Feasibility:** High (LLM negotiation prompt tied to real cash-flow parameters).
- **Demo Wow Factor:** 8.5/10.
- **Safety Risk:** Medium (User must review and send).

### Capability 9: "QRIS Settlement Delay Arbitrage" (Timing Invariant Manager)
- **Problem:** QRIS funds received on Friday evening are often not disbursed by the acquiring bank until Monday or Tuesday. Owners write cheques or plan payments on Saturday and bounce them.
- **Agent Behavior:** Models banking clearing calendars and Indonesian bank cutoffs (BI-FAST vs. batch clearing delays). Explicitly locks funds until physical settlement reaches the operative account.
- **User Value:** Eliminates bounced payments and overdraft penalties.
- **Technical Feasibility:** High (Deterministic banking holiday & clearing rules engine).
- **Demo Wow Factor:** 7/10.
- **Safety Risk:** Low.

### Capability 10: "Prediktor Cuaca & Musim Hujan" (Hyperlocal External Shock Adjuster)
- **Problem:** Outdoor warung, tenda, or coffee shops lose 50% revenue on heavy rainy days, leaving perishable ingredients to spoil.
- **Agent Behavior:** Integrates BMKG weather forecasts into daily sales projections. If 4 consecutive rain days are forecast, flags: *"Kurangi belanja ayam potong harian dari 15 kg menjadi 9 kg untuk 3 hari ke depan."*
- **User Value:** Direct cost reduction on raw materials during expected seasonal dips.
- **Technical Feasibility:** High (Public BMKG weather API + demand elasticity coefficient).
- **Demo Wow Factor:** 8/10.
- **Safety Risk:** Low.

### Capability 11: "Audit Kebocoran Transaksi Kasir" (Cashier Anomaly & Leakage Auditor)
- **Problem:** Petty theft or unrecorded transactions in cash drawers (*laci kasir*).
- **Agent Behavior:** Compares expected inventory consumption against recorded transactions. Highlights discrepancies: *"Jumlah cup kopi terpakai 120, tapi penjualan tercatat 95 transaksi. Selisih 25 cup (potensi kehilangan omset Rp 450.000)."*
- **User Value:** Eliminates silent operational leakage without expensive CCTV monitoring software.
- **Technical Feasibility:** Medium (Requires daily stock opname delta inputs).
- **Demo Wow Factor:** 9/10.
- **Safety Risk:** Medium (Accusation risk; must frame as "discrepancy" rather than theft).

### Capability 12: "Flash Promo Clearance Engine" (Zero-Loss Margin Liquidation)
- **Problem:** Perishable or near-expiry stock sits in storage while cash is starved.
- **Agent Behavior:** Detects aging inventory nearing expiration. Calculates the mathematical break-even clearance price that recovers raw material cash without losing money. Auto-generates WhatsApp promo broadcast copy.
- **User Value:** Liquidates dead stock into working capital within 24 hours.
- **Technical Feasibility:** High (Mathematical pricing boundary + copy generation).
- **Demo Wow Factor:** 8.5/10.
- **Safety Risk:** Low.

### Capability 13: "Emergency Survival Mode" (One-Tap Cash Freeze Protocol)
- **Problem:** Unexpected sudden shock (e.g., fire, sudden road closure, health emergency).
- **Agent Behavior:** Triggered by user button: *"Mode Darurat Aktif"*. Freezes all non-essential expenditure, drafts postponement requests for rent and suppliers, calculates absolute bare-minimum survival burn rate, and lists immediate receivables to liquidate.
- **User Value:** Instant structured playbook when the owner is in psychological panic.
- **Technical Feasibility:** High (Deterministic playbook execution + script generation).
- **Demo Wow Factor:** 9.5/10 (High emotional and practical resonance).
- **Safety Risk:** Low (Strictly defensive recommendations).

### Capability 14: "Anonymized Local Price Benchmarking" (UMKM Collective Intelligence)
- **Problem:** A solo warung pays Rp 16.500/kg for flour because they don't know neighboring shops buy it for Rp 13.800/kg from a nearby distributor.
- **Agent Behavior:** Anonymously aggregates purchase prices across local network. Alerts: *"Anda membayar 18% lebih mahal untuk telur ayam dibanding rata-rata UMKM di radius 3 km. Rekomendasi supplier alternatif: Agen Barokah."*
- **User Value:** Immediate margin expansion without changing retail prices.
- **Technical Feasibility:** Medium-High (Requires multi-tenant anonymized data aggregation).
- **Demo Wow Factor:** 9.5/10.
- **Safety Risk:** High (Privacy protection, merchant collusion concerns; must be strictly aggregated).

### Capability 15: "Snapshot Nilai Usaha" (Instant Handover / Investor Valuation Card)
- **Problem:** Owner wants to sell a branch, bring in a partner, or apply for KUR bank loan, but has zero audited financial statements.
- **Agent Behavior:** Synthesizes 6 months of DLMM operational data into a standardized, certified 1-page financial health certificate showing normalized EBITDA, working capital velocity, and verified cash generation.
- **User Value:** Bridges the informal UMKM sector with formal banking and investor capital.
- **Technical Feasibility:** High (Standardized financial reporting compilation).
- **Demo Wow Factor:** 8.5/10.
- **Safety Risk:** Low (Clear disclaimer: internal management report, not audited public accounting).

### Capability Ranking Matrix

| Rank | Capability | Strategic Value | Hackathon Wow Factor | MVP Feasibility |
| :---: | :--- | :---: | :---: | :---: |
| **1** | **#1 Jebakan Promo Supplier (Bulk vs. Runway)** | **Critical** | **9.5** | **Immediate (MVP Hero Engine)** |
| **2** | **#6 Simulasi Nombok Gaji (Payroll Countdown)** | **Critical** | **9.0** | **Immediate (MVP Core)** |
| **3** | **#2 Kolektor Bon Santun (WhatsApp Nudge)** | **High** | **9.0** | **Immediate (MVP Core)** |
| **4** | **#3 Filter Uang Dapur vs Uang Usaha** | **High** | **8.5** | **Immediate (MVP Core)** |
| **5** | **#13 Emergency Survival Mode (One-Tap Freeze)**| **High** | **9.5** | **High (MVP Bonus)** |
| 6 | #4 Audit Margin Platform (GoFood/GrabFood) | High | 8.5 | Post-Hackathon Phase 1 |
| 7 | #5 Radar Kenaikan Harga Vendor (OCR) | Medium | 8.0 | Post-Hackathon Phase 1 |
| 8 | #14 Anonymized Local Price Benchmarking | Very High | 9.5 | Network Effect Phase 2 |

---

## 7. AGENTIC DESIGN & SYSTEM TOPOLOGY

### 7.1 Multi-Agent Specialization vs. Monolithic LLM
A monolithic LLM fails in financial decision support because it conflates unstructured perception, mathematical simulation, policy enforcement, and client-facing communication. JagaUsaha decomposes responsibility into 4 lean, specialized agents with a deterministic math core:

```
                          [ UNSTRUCTURED INGESTION ]
                (Bank Mutasi PDF, QRIS Screenshot, WA Voice)
                                     │
                                     ▼
                        ┌────────────────────────┐
                        │   1. SENSOR AGENT      │  (Multimodal Parser & Normalizer)
                        └────────────┬───────────┘
                                     │ Normalized JSON Events
                                     ▼
                        ┌────────────────────────┐
                        │ DETERMINISTIC MATH     │  (Pure Python/NumPy - Zero LLM)
                        │     CORE (DLMM)        │  - Cash Runway Invariant
                        └────────────┬───────────┘  - Monte Carlo Liquidity Envelope
                                     │
                 ┌───────────────────┴───────────────────┐
                 │ State Vector (St)                     │
                 ▼                                       ▼
    ┌────────────────────────┐              ┌────────────────────────┐
    │  2. GUARDIAN AGENT     │              │  3. SIMULATOR AGENT    │
    │  (Autonomous Watcher)  │              │  (Counterfactual 'What │
    │  - Evaluates Invariants│              │   If' Branching Engine)│
    └────────────┬───────────┘              └────────────┬───────────┘
                 │ Breached Rule                         │ Delta Trajectory
                 └───────────────────┬───────────────────┘
                                     │
                                     ▼
                        ┌────────────────────────┐
                        │  4. ADVISOR AGENT      │  (Indonesian Communicator)
                        │  - Action Proposals    │  - Tone & Empathy Engine
                        │  - Human-in-the-Loop   │  - WA Action Cards
                        └────────────────────────┘
```

### 7.2 Component Responsibilities

1. **Sensor Agent (Perception)**
   - *Input:* OCR text of paper receipts, PDF bank mutations (BCA, Mandiri, BRI), WhatsApp audio transcription.
   - *Tools:* Regex extractor, date normalizer, vendor entity matcher, category classifier.
   - *Output:* Typed JSON ledger event (`{timestamp, type: INFLOW|OUTFLOW, amount, counterparty, category, confidence}`).

2. **Deterministic Math Core (DLMM State Machine)**
   - **NO LLM INVOLVED.** Pure Python algorithms.
   - Maintains cumulative cash projections, dynamic HPP, and calculates exact calendar dates of zero-cash crossings.

3. **Guardian Agent (Autonomous Policy Enforcement)**
   - *Trigger:* Run on every new ledger event or scheduled daily cron (06:00 and 21:00 WIB).
   - *Invariant Checks:*
     - Rule 1: $	ext{Cash}_{t+14} < 	ext{Payroll}_{t+14} + 	ext{Minimum Float}$.
     - Rule 2: $	ext{Current HPP} / 	ext{Retail Price} > 0.65$ (Margin Erosion).
     - Rule 3: $	ext{Prive Ratio} > 0.35 	imes 	ext{Net Operating Cashflow}$.

4. **Simulator Agent (Counterfactual Exploration)**
   - *Trigger:* User scenario query or Guardian proactive risk mitigation.
   - Clones state $\mathbf{S}_t$ into branched sandboxes ($\mathbf{S}'_{	ext{baseline}}$, $\mathbf{S}'_{	ext{decision}}$, $\mathbf{S}'_{	ext{stress}}$).
   - Simulates day-by-day cash evolution across $k=30$ days.

5. **Advisor Agent (Synthesis & Negotiation)**
   - Translates raw mathematical deltas into crisp, empathetic Bahasa Indonesia.
   - Packages responses with **concrete action choices** (A/B/C) rather than vague philosophical advice.

---

## 8. PROACTIVE BEHAVIOR: THE AUTONOMOUS GUARDIAN LOOP

The owner rarely initiates analysis. The system operates autonomously:

```
[ EVENT DETECTED ]
Raw chicken price increases by Rp 6,000/kg across 2 consecutive invoices
       │
       ▼
[ SENSOR NORMALIZES ]
Delta recorded: HPP per Ayam Geprek portion jumps from Rp 9,200 to Rp 11,400
       │
       ▼
[ MATH ENGINE RECOMPUTES ]
Gross margin compresses from 42% to 28%. Projected monthly net profit drops by Rp 3.2M.
       │
       ▼
[ GUARDIAN CHECKS INVARIANTS ]
Rule Breached: "Margin compression threatens 30-day fixed rent reserve."
       │
       ▼
[ SIMULATOR RUNS 3 COUNTERMEASURES ]
Option A: Raise menu price Rp 2,000 (Simulated demand drop: -8% -> Net profit +Rp 1.8M).
Option B: Reduce portion size 10% (Margin restored, zero price shock).
Option C: Switch to Supplier B (Toko Berkah, current quote Rp 32.000/kg).
       │
       ▼
[ ADVISOR PUSHES ACTION CARD ]
Delivers high-conviction WhatsApp alert with pre-drafted supplier order or menu update.
```

---

## 9. SAFETY ARCHITECTURE & FINANCIAL TRUST BOUNDARIES

### 9.1 Risk Classification & Autonomy Gates

| Tier | Risk Level | Actions Included | Autonomy Policy |
| :--- | :--- | :--- | :--- |
| **Tier 1** | **Low Risk (Informational)** | Transaction categorization, OCR parsing, cash runway projection, draft generation. | **Fully Autonomous** |
| **Tier 2** | **Medium Risk (Communication)** | Sending WhatsApp payment reminders to debtors, supplier order drafts, stock clearance alerts. | **Human-in-the-Loop (1-Tap Approval)** |
| **Tier 3** | **High Risk (Capital & Pricing)** | Price increases on POS, canceling supplier contracts, taking working capital loans, moving money. | **STRICT RECOMMENDATION ONLY** (Never automated; requires explicit human execution) |

### 9.2 Hallucination Immunity Protocol
1. **Mathematical Isolation:** Prompts NEVER calculate interest, totals, or balances. Numbers are passed *into* the LLM as immutable template variables from the Python Math Core.
2. **Confidence Flooring:** If data completeness is $<70\%$ (e.g., untracked cash drawer or unrecorded expenses), the system displays explicit uncertainty bands: *"Proyeksi ini memiliki tingkat kepastian 65% karena pengeluaran tunai 5 hari terakhir belum tercatat."*
3. **Audit Trail:** Every simulated outcome logs exact parameters, formulas, and data inputs for verifiable reproducibility.

---

## 10. DATA REALITY: OVERCOMING THE INDONESIAN UMKM ONBOARDING BARRIER

### 10.1 The "Zero-Form" Onboarding Philosophy
Traditional SaaS demands 40 configuration fields (COGS, inventory counts, tax IDs). JagaUsaha activates with **Zero Manual Forms**:

1. **The 30-Second Cold Start:**
   - User provides only 3 numbers:
     1. Uang Kas Saat Ini (Bank balance + cash).
     2. Estimasi Omset Harian (Average daily sales).
     3. Beban Wajib Bulanan (Rent + total payroll).
   - JagaUsaha immediately activates the basic Safe-to-Spend ("Duit Dingin") gauge.

2. **Multimodal Ingestion Pipeline:**
   - **Bank Mutation PDFs:** Native parsers for BCA KlikBCA, Mandiri Livin, BRImo statement exports.
   - **QRIS Settlement Recaps:** Screenshot parser for GoBiz, GrabMerchant, and ShopeePay daily settlement notification screens.
   - **Informal Paper *Nota*:** Vision-based OCR extracting date, line items, and total amount.
   - **Natural Voice Memos:** WhatsApp voice message: *"Mas JagaUsaha, barusan bayar sewa ruko Rp 3 juta sama belanja beras Rp 800 ribu tempo seminggu."* Whisper model transcribes and Sensor Agent parses intent.

---

## 11. HACKATHON MVP SCOPE: WHAT TO BUILD VS. WHAT TO CUT

| Feature | Hackathon Classification | Implementation Details |
| :--- | :--- | :--- |
| **"Bisa Beli Nggak?" (Decision Simulator)** | **MUST BUILD (HERO)** | Dynamic what-if sandbox testing 3 real scenarios (CAPEX, bulk inventory, hiring) against cash runway. |
| **"Duit Dingin" (Safe-to-Spend Widget)** | **MUST BUILD** | Visual partition separating operational bank balance from unencumbered cash. |
| **14-Day Invariant Breach Engine** | **MUST BUILD** | Deterministic detector calculating exact calendar day of insolvency if commitments stay unchanged. |
| **Multimodal Parser (Mock/Light)** | **SHOULD BUILD** | Ingest 1 real BCA statement PDF + 1 voice note audio into structured ledger. |
| **Kolektor Bon Santun (WhatsApp Nudge)**| **SHOULD BUILD** | Pre-generated empathetic collection message with dynamic QRIS mockup. |
| **Live Bank API Integration (Open Banking)**| **FAKE / SIMULATE** | Pre-load clean JSON fixtures for demo speed and deterministic reliability. |
| **Multi-Tenant Price Benchmarking** | **POST-HACKATHON** | Requires large active merchant network. |
| **Full Accounting Ledger (Jurnal/Neraca)** | **NEVER BUILD** | Solves wrong problem; destroys UX. |

---

## 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT

### Scenario: "Kopi Teras Barokah" (Small Coffee Shop in South Jakarta)
- **Starting State:** Bank BCA balance reads **Rp 18.500.000**. The owner feels flush with cash.
- **The Temptation:** A coffee equipment supplier offers a flash 25% discount on an Italian 2-group espresso machine for **Rp 14.000.000 cash today** (regular price Rp 18.5M).

### Minute-by-Minute Live Walkthrough

```
[00:00 - 00:45] THE HOOK (The Illusion of Wealth)
Presenter (pointing to UI):
"Meet Mas Arif, owner of Kopi Teras Barokah. He opens his mobile banking: Rp 18.5 million.
He receives a supplier promo: an espresso machine for Rp 14 million cash.
His intuition says: 'I have 18.5M, the machine is 14M, I will still have 4.5M left. Let's buy it!'
Most accounting apps would say: 'Sure, record it as a fixed asset.'
Let's see what JagaUsaha does."

[00:45 - 01:45] THE WOW MOMENT (The Invariant Trap Detected)
Presenter taps: "Simulasi Keputusan: Beli Mesin Rp 14.000.000 Tunai"
Instantly, the UI flashes AMBER, then a red trajectory graph appears:
"JagaUsaha runs the deterministic cash projection:
- In 6 days (25th): Payroll for 3 staff is due = Rp 7.500.000.
- In 11 days (30th): Roasted coffee beans supplier tempo is due = Rp 4.200.000.
- QRIS settlement delay: Weekend sales of Rp 3.1M won't hit until Tuesday.
The Result:
On Day 12, Kopi Teras Barokah's bank account will be NEGATIVE Rp 4.100.000!
Mas Arif would be forced to take an emergency pinjol (online loan) at 20% interest just to pay his staff."

[01:45 - 02:45] THE AGENTIC INTERVENTION (The Safe Path)
Presenter:
"JagaUsaha doesn't just say 'No'. It offers three actionable alternatives:
1. OPTION A (Installment): Buy with 3-month installment (Rp 4.9M/mo). Result: Minimum cash stays above Rp 3.2M buffer. SAFE.
2. OPTION B (Defer): Wait 16 days until corporate catering receivable (Rp 6M) clears. SAFE.
3. OPTION C (Counter-offer): Auto-generates WhatsApp message to supplier offering 50% cash now, 50% tempo 30 days."

Presenter taps: "Pilih Opsi C"
JagaUsaha instantly generates the polite Indonesian WhatsApp message:
'Siang Pak Hendra, mesinnya kami ambil tapi skema DP 50% hari ini (Rp 7jt), pelunasan 30 hari ya Pak sesuai siklus kas kami. Nuhun.'

[02:45 - 03:00] THE CONCLUSION
Presenter:
"BukuWarung records your bankruptcy after it happens.
JagaUsaha stops you from going bankrupt in the first place.
Thank you."
```

---

## 13. UI / UX DESIGN ARCHITECTURE

The interface is strictly designed for single-thumb smartphone operation in bright sunlight:

1. **Top Anchor: "Status Napas Bisnis" (Business Pulse Card)**
   - **Duit Dingin (Safe-to-Spend):** Displayed in large 32pt bold font: `Rp 3.850.000`.
   - **Napas Kas (Runway):** `26 Hari` (Pill badge: Green).
   - **Subtext:** `Total Saldo Bank: Rp 18.500.000 (Rp 14.650.000 terkunci untuk gaji & tempo)`.

2. **Hero Center: "Kotak Simulasi: Bisa Beli Nggak?" (Decision Sandbox)**
   - Quick action chips: `[+ Rekrut Karyawan]` `[+ Beli Alat/Mesin]` `[+ Ambil Promo Stok]` `[+ Turunkan Harga]`.
   - Interactive slider: Adjust expense amount `Rp 1M -> Rp 25M`.
   - Visual trajectory: Dual-line chart showing *Baseline Cash* vs. *Scenario Cash* dipping below the zero redline.

3. **Bottom Stream: "Jaga Feed" (Actionable Intelligence Cards)**
   - High-contrast, dismissable cards. Each card has exactly two buttons: `[Setujui / Kirim]` and `[Abaikan]`.
   - Zero endless tables or accounting spreadsheets.

---

## 14. TECHNICAL ARCHITECTURE & FRAMEWORK EVALUATION

### 14.1 Evaluating Hermes Agent Framework
Hermes Agent is extraordinarily well-suited for JagaUsaha due to four fundamental capabilities:
1. **Deterministic Tool Execution:** Hermes orchestrates external Python tools with typed return contracts, ensuring mathematical computations are insulated from LLM drift.
2. **Persistent Structured Memory:** Hermes manages local profile memory, allowing historical vendor prices, supplier terms, and seasonal cycles to persist without complex vector database overhead.
3. **Subagent Delegation:** Enables parallel background execution (e.g., Sensor Agent running OCR/parser while Simulator Agent branches hypothetical scenarios).
4. **Local / Hybrid Deployment:** Can run fully on local edge hardware or cloud VM, crucial for merchant data privacy.

### 14.2 Production Stack Specifications

```
[ FRONTEND ]
Next.js 15 (App Router) + Tailwind CSS + Lucide Icons + Recharts (Mobile Viewport Optimized)
                                │
                                ▼ REST / WebSocket
[ API GATEWAY / BACKEND ]
FastAPI (Python 3.11)
  ├── Auth & Session Management
  ├── Ingestion & Webhook Receivers
  └── Math Simulation Engine (Pure NumPy/Polars, Zero LLM)
                                │
                                ▼
[ AGENT ORCHESTRATION LAYER ]
Hermes Agent Core
  ├── Sensor Subagent (Whisper + Vision OCR + Heuristic Normalizer)
  ├── Guardian Subagent (Continuous Invariant Checker)
  ├── Simulator Subagent (State Vector Branching)
  └── Advisor Subagent (Indonesian Cultural Prompt Engine)
                                │
                                ▼
[ PERSISTENCE & CACHE ]
SQLite (Local-first / Edge) + DuckDB (Fast analytics on cash transactions)
```

### 14.3 Division of Labor: Code vs. LLM

| Responsibility | Executed By | Rationale |
| :--- | :--- | :--- |
| Cash flow sums, compounding, runway projection | **Pure Python / NumPy** | Absolute deterministic precision; zero hallucination. |
| Invariant rule evaluation ($C_t < O_t$) | **Python Rules Engine** | Instantaneous Boolean checks; deterministic safety. |
| Bank statement regex & transaction parsing | **Python Parsers** | Known banking formats are 100% regex-definable. |
| Voice memo intent & dirty invoice OCR | **LLM / Vision Model** | High semantic noise handling and contextual extraction. |
| Empathetic Indonesian advisory & WhatsApp drafts | **LLM (Claude / DeepSeek)** | Natural language nuance, cultural hierarchy, negotiation finesse. |

---

## 15. MEASURABLE IMPACT FRAMEWORK

### 15.1 Real vs. Fabricated Metrics
Never claim fictitious metrics like *"Saved UMKM Rp 50 billion."* Measure real operational invariants:

1. **Measured Primary Invariant: "Lead Time to Liquidity Crunch"**
   - *Definition:* Number of days in advance an insolvency or payroll gap is flagged.
   - *Target:* Increase advance warning from 1.5 days (status quo emergency) to **>14 days**.
2. **Measured Secondary Invariant: "Unencumbered Cash Visibility"**
   - *Definition:* Reduction in personal withdrawals that breach the Safe-to-Spend limit.
3. **Estimated Business Metric: "Interest Expense Avoided"**
   - *Definition:* Estimated interest saved by preventing emergency predatory loan uptake (*pinjol ilegal* charging 0.4% - 0.8% per day).

---

## 16. RED TEAM THE IDEA: BRUTAL JUDGE OBJECTIONS & DEFENSES

### Objection 1: "Isn't this just Mekari or BukuWarung with a ChatGPT wrapper?"
- **Judge Attack:** *"Mekari already has cash flow reports. If they hook up an OpenAI API key, JagaUsaha is dead tomorrow."*
- **Bulletproof Defense:** *"Mekari is an enterprise accounting software built for accountants who look backward at historical compliance. UMKM owners do not understand double-entry bookkeeping and abandon these apps within 3 weeks. Furthermore, an LLM wrapper on accounting software is dangerous because LLMs hallucinate numbers. JagaUsaha is fundamentally different: we built a deterministic counterfactual simulation engine that tests decisions BEFORE they happen. We don't record the past; we sandbox the future."*

### Objection 2: "Where does the data come from? Indonesian UMKM keep messy cash in a biscuit tin!"
- **Judge Attack:** *"If the data is garbage, your simulations will produce garbage. How can you claim accuracy for informal warungs?"*
- **Bulletproof Defense:** *"We don't demand full ledgers. We anchor on verifiable hard anchors: the Bank mutation PDF and QRIS daily settlement recap, which represent 75%+ of urban/semi-urban transactions today. For cash, we use a 3-number cold-start initialization and voice notes. Even with 70% data completeness, simulating the payroll cliff prevents fatal cashouts. Asymmetric upside: an approximate 14-day warning on a payroll deficit is infinitely more valuable than an accurate autopsy after the business has closed."*

### Objection 3: "Why does this require an AGENT? A simple Excel formula can do cash flow projection."
- **Judge Attack:** *"A formula does cash projection. Why do you need autonomous agents?"*
- **Bulletproof Defense:** *"Excel cannot proactively read an incoming raw invoice image, detect a 12% margin creep on cooking oil, autonomously spawn three alternative mitigation scenarios, formulate an empathetic Indonesian debt-collection message with a dynamic QRIS link, and adapt to supplier negotiation styles. The deterministic math core computes the runway; the multi-agent system provides perception, invariant surveillance, and autonomous negotiation synthesis."*

### Objection 4: "What if your AI gives wrong advice and causes a business to collapse?"
- **Judge Attack:** *"You tell an owner to defer inventory and they run out of stock and lose their best clients. Who is liable?"*
- **Bulletproof Defense:** *"Our Safety Architecture enforces that JagaUsaha never executes autonomous financial transactions or binding contracts. Tier 3 decisions are strictly recommendation-only with transparent assumptions and explicit uncertainty bounds. We present A/B/C trade-offs with their respective stress points, leaving the sovereign decision with the owner."*

---

## 17. THE COMPETITIVE MOAT

1. **The Decision-Outcome Feedback Loop:** Every time an owner tests a decision (*"Beli mesin 14 juta"*) and either accepts or modifies the agent's proposal, JagaUsaha logs the decision and tracks the resulting 30-day cash trajectory. Over time, JagaUsaha learns the true operational elasticity of micro-businesses.
2. **Proprietary Hyperlocal Transaction Ontologies:** Deep semantic mapping of informal Indonesian SME terminology (*"tempo 2 minggu", "uang koordinasi", "DP 30% sisa kliring", "harga partai"*) that global SaaS and vanilla LLMs fail to parse.
3. **Anonymized Purchasing Intelligence Network:** As density grows within a commercial district (e.g., Pasar Tebet or Pasar Tanah Abang), the anonymized benchmarking of commodity prices creates network effects that cannot be replicated by single-player tools.

---

## 18. FINAL PRODUCT SYNTHESIS

### A. Problem
Indonesian UMKM owners suffer from the "Omset Ramai, Duit Hilang" illusion, conflating daily gross receipts with profit and mixing business cash with personal needs. Because existing accounting software only records past transactions through tedious manual entry, owners make critical capital and inventory decisions purely on intuition—frequently walking into fatal illiquidity traps when supplier payables and payroll collide.

### B. Product
JagaUsaha is an AI Autonomous Financial Guardian and Decision Sandbox that continuously protects small businesses from insolvency. Operating on zero-effort exhaust data (bank statements, QRIS screenshots, voice memos), it maintains a real-time liquidity model, autonomously detects silent margin leaks and payroll cliffs 14 days in advance, and enables owners to test "Can I afford this?" decisions in an interactive counterfactual sandbox before spending cash.

### C. One-Sentence Pitch
**"JagaUsaha adalah co-pilot finansial otonom yang menghentikan UMKM dari kebangkrutan dengan menyimulasikan dampak keputusan uang sebelum uangnya keluar."**

### D. Why Now
1. Massive QRIS adoption (30+ million merchants in Indonesia) creates a digital transaction exhaust for previously unrecorded informal businesses.
2. Multimodal LLMs enable zero-friction ingestion of messy Indonesian receipts, bank PDFs, and audio notes.
3. Small business operating margins are squeezed by platform take-rates and commodity volatility, making intuitive guesswork fatal.

### E. Target User
Indonesian F&B and micro-retail operators (revenue Rp 15M - Rp 150M/month, 2-10 employees) who operate primarily via bank transfers and QRIS, but lack a dedicated finance manager.

### F. Core User Journey
1. **Connect:** User uploads last month's BCA/Mandiri PDF or inputs 3 baseline numbers.
2. **Glance:** User checks the "Duit Dingin" (Safe-to-Spend) gauge daily on their phone.
3. **Simulate:** Before making an expense, owner asks: *"Bisa beli mesin Rp 14 juta?"* and reviews the 30-day runway trajectory.
4. **Intervene:** When a risk is detected, JagaUsaha proactively alerts the owner with 1-tap actionable remedies (e.g., restructured payment script or gentle collection WhatsApp).

### G. Hero Feature
**The "Bisa Beli Nggak?" (Decision Sandbox):** A dynamic counterfactual simulator that tests CAPEX, inventory bulk-buys, and hiring decisions against future fixed obligations, proving mathematically whether an action causes a cashout.

### H. Supporting Features (Max 5)
1. **Duit Dingin (Safe-to-Spend) Indicator:** Real-time partitioning of total bank balance into committed operating reserves vs. unencumbered cash.
2. **Kolektor Bon Santun:** Culturally tuned Indonesian WhatsApp receivable collection drafts with integrated QRIS payment links.
3. **Radar Kenaikan Harga Vendor & Bocor Halus:** Line-item HPP tracking from receipts to detect margin erosion.
4. **Simulasi Nombok Gaji 14-Hari:** Predictive countdown alerting owners to payroll deficits with sufficient lead time to intervene.
5. **Mode Bertahan Darurat (Emergency Freeze):** One-tap operational playbook freezing non-essential cash burn during sudden shocks.

### I. Agent Architecture Topology
```
[User Audio / Nota OCR / Bank PDF]
                │
                ▼
      ┌──────────────────┐
      │   Sensor Agent   │  (Multimodal normalization)
      └─────────┬────────┘
                │ Normalized Event Stream
                ▼
      ┌──────────────────┐
      │ Deterministic    │  (NumPy / Polars Engine)
      │ Math Core (DLMM) │  - Safe-to-Spend & Invariants
      └─────────┬────────┘
                │ Real-time State Vector
        ┌───────┴───────┐
        ▼               ▼
┌──────────────┐ ┌──────────────┐
│Guardian Agent│ │Simulator Agt │
│(Surveillance)│ │(What-If Sand)│
└───────┬──────┘ └──────┬───────┘
        │ Trigger       │ Trajectory
        └───────┬───────┘
                ▼
      ┌──────────────────┐
      │  Advisor Agent   │  (Culturally tuned Indonesian Copilot)
      └─────────┬────────┘
                │ Interactive Decision Cards & WhatsApp Actions
                ▼
      [Owner Sovereign Choice]
```

### J. Safety Architecture
Three-tier autonomy gates ensure the system never moves funds or binds contracts. Calculations are executed in deterministic Python to eliminate LLM hallucinations. All projections display explicit confidence intervals based on data completeness.

### K. Data Architecture
Edge-first local database (SQLite + DuckDB) storing transaction event vectors. Personal identifiable financial information is isolated; LLM receives only anonymized numerical state arrays and operational tags.

### L. MVP Scope
- **Must Build:** Decision Simulator engine, Safe-to-Spend gauge, 14-day cashout alert, mobile-responsive dashboard.
- **Should Build:** Voice memo ingestion via Whisper, WhatsApp collection generator.
- **Simulate:** Real-time bank webhooks (use realistic BCA/Mandiri JSON fixtures).
- **Cut:** Tax compliance, double-entry bookkeeping, multi-store consolidation.

### M. 3-Minute Demo Script
*(Detailed in Section 12: Kopi Teras Barokah espresso machine decision dilemma).*

### N. Competitive Differentiation
Not a ledger of past transactions (BukuWarung/Mekari). An active simulation sandbox for future liquidity with zero manual bookkeeping burden.

### O. Business Model
Freemium SaaS:
- **Free Tier:** Safe-to-Spend gauge, basic receipt parsing, 3 simulations/month.
- **Pro Tier (Rp 79.000/month):** Unlimited simulations, proactive margin creep detection, WhatsApp collector agent, bank PDF auto-sync.
- **Fintech B2B Referral:** Commission on pre-underwritten working capital credit lines when JagaUsaha certifies verified cash flow health to partner banks (BCA/BRI).

### P. Potential Moat
Aggregated anonymized commodity pricing benchmarks across micro-districts and proprietary decision-outcome feedback loops.

### Q. Impact Metrics
- **Primary:** Average lead time to cashflow insolvency increased from 1.5 days to 14 days.
- **Secondary:** Reduction in emergency high-interest loan (pinjol) uptake by 60%.

### R. Biggest Risks
- **Data Incompleteness:** Unrecorded cash drawer transactions distorting runway calculations.
  - *Mitigation:* Explicit conservative safety buffers and confidence indicators.
- **User Churn:** Failure to build a daily habit.
  - *Mitigation:* Passive WhatsApp daily morning pulse (*"Duit Dingin Anda hari ini Rp X"*) without requiring app login.

### S. Post-Hackathon Roadmap
- **Month 1:** Live pilot with 30 F&B merchants in Pasar Tebet / Blok M.
- **Month 2-3:** Direct WhatsApp Business conversational interface (chat-native interaction).
- **Month 4-6:** Open Finance bank mutation sync (via Brankas / Brick API).

---

## 19. FINAL CHALLENGE: THE 7-DAY HACKATHON EXECUTION PLAN

### What NOT to Build
- Do NOT build user authentication with multi-tenancy roles.
- Do NOT build an accounting general ledger (no debit/credit balance sheets).
- Do NOT build custom bank scraping integrations.
- Do NOT build an inventory barcode scanner.

### The 7-Day Exact Build Specification
- **Day 1-2:** Deterministic Math Core (`dlmm_engine.py`): 30-day cash projection, invariant checks, and counterfactual scenario branching.
- **Day 3:** Sensor Parser (`ingest.py`): PDF bank statement extractor (BCA/Mandiri regex) + 1 Whisper voice note endpoint.
- **Day 4:** Hermes Agent integration (`advisor.py`): Scenario synthesis, failure analysis, and Indonesian polite collection copy generator.
- **Day 5-6:** Mobile UI (`Next.js + Tailwind`): Dual-line trajectory chart (Baseline vs. Scenario), Safe-to-Spend card, and slider controls.
- **Day 7:** Demo rehearsal with realistic "Kopi Teras Barokah" dataset; latency optimization (<1.5s response).

---

### Final Product Definition
**JagaUsaha**
*Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM.*

**Problem → Intelligence → Prediction → Action → Impact**
- **Problem:** UMKM owners conflate bank balance with profit and make blind spending decisions that trigger fatal payroll and supplier defaults.
- **Intelligence:** Deterministic Dynamic Liquidity & Margin Model (DLMM) fed by multimodal zero-effort exhaust data.
- **Prediction:** Flags exact calendar days where scheduled obligations breach cash reserves under baseline and simulated stress scenarios.
- **Action:** Intercepts dangerous purchases, simulates safe financing alternatives, and generates culturally tuned negotiation and collection copy.
- **Impact:** Extends insolvency warning horizon from 24 hours to 14+ days, keeping Indonesian small businesses alive.

---

### The 30-Second Pitch
> "Di Indonesia, 80% UMKM tutup bukan karena produknya jelek, tapi karena kehabisan uang kas mendadak. Mereka lihat saldo bank Rp 18 juta, merasa kaya, lalu belanja mesin baru—tanpa sadar 6 hari lagi ada tagihan gaji karyawan dan tempo supplier. BukuWarung mencatat kebangkrutan setelah itu terjadi. JagaUsaha menghentikan kebangkrutan sebelum terjadi. Cukup upload mutasi bank atau kirim voice note, JagaUsaha langsung menghitung 'Duit Dingin' Anda dan menyimulasikan dampak setiap pengeluaran sebelum uangnya keluar. JagaUsaha: Penjaga napas bisnis Anda."

---

### The One Demo Moment Judges Will Remember
> **The Live Redline Collision:**
> The presenter types *"Beli Mesin Kopi Rp 14 Juta Tunai"* into the simulator while the current bank balance clearly shows a healthy **Rp 18.5 Juta**.
>
> In less than one second, the green projection chart violently plummets into a red deficit zone, flashing a bold calendar warning:
> **"PERINGATAN: Pada 30 September, kas Anda minus Rp 4.100.000 karena jatuh tempo gaji dan tempo biji kopi. Usaha Anda bangkrut dalam 12 hari jika transaksi ini dilakukan."**
>
> Then, with a single tap on *"Rekomendasi Aman"*, the system restructures the purchase into a 50% DP scheme and instantly drafts the exact polite WhatsApp message ready to send to the supplier.
