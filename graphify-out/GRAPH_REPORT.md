# Graph Report - JagaUsaha  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 660 nodes · 1035 edges · 70 communities (53 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3785e94e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.py
- JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM
- package.json
- CountUp.tsx
- compilerOptions
- compilerOptions
- JagaUsaha — Master Architecture & Product Logic Plan
- What You Must Do When Invoked
- animated-toast-stack.tsx
- 18. FINAL PRODUCT SYNTHESIS
- react
- 6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES
- graphify reference: extra exports and benchmark
- .oxlintrc.json
- BoardUIAgentThinking.tsx
- graphify reference: query, path, explain
- DecisionStudio.tsx
- graphify reference: add a URL and watch a folder
- tsconfig.json
- api/__init__.py
- core/__init__.py
- deploy_vps.sh
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- React + TypeScript + Vite
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- tabs.tsx
- matrix-orb.tsx
- SpotlightCard.tsx
- App.tsx
- bouncy-accordion.tsx
- animated-badge.tsx
- cn
- ease.ts
- JagaUsaha — Canonical Product Flow & Business Architecture Specification
- DashboardPage.tsx
- calculate_safe_to_spend
- text-reveal.tsx
- expanding-arrow-button.tsx
- 19. FINAL CHALLENGE: THE 7-DAY HACKATHON EXECUTION PLAN
- framer-motion
- 16. RED TEAM THE IDEA: BRUTAL JUDGE OBJECTIONS & DEFENSES
- 14. TECHNICAL ARCHITECTURE & FRAMEWORK EVALUATION
- 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT
- 1. START FROM THE PROBLEM — NOT THE SOLUTION
- 2. CRITICAL EVALUATION OF THE ORIGINAL IDEA
- 3. COMPETITIVE LANDSCAPE & LOCAL ADAPTATION
- 9. SAFETY ARCHITECTURE & FINANCIAL TRUST BOUNDARIES
- sensor.py
- cli_demo.py
- simulate_trajectory
- 12. FEATURE FLOWS (SPESIFIKASI 10 FITUR UTAMA)
- AdvisorAgent
- .parse_whatsapp_note
- 15. STATE MACHINES
- 29. REALITY-CHECK: WHERE WOULD THE SYSTEM FAIL TOMORROW & HOW IT IS FIXED?
- 4. NEW USER ONBOARDING FLOW (PROGRESSIVE DISCLOSURE)
- 16. MERMAID FLOW DIAGRAMS
- 7. AGENTIC DESIGN & SYSTEM TOPOLOGY
- 5. DATA INGESTION FLOW (CANONICAL PIPELINE)
- .get_day_inflow_multiplier
- input.tsx
- shared-layout-bg.tsx
- ShinyText.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 51 edges
2. `cn()` - 33 edges
3. `JagaUsaha — Master Architecture & Product Logic Plan` - 30 edges
4. `lucide-react` - 29 edges
5. `framer-motion` - 22 edges
6. `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` - 20 edges
7. `18. FINAL PRODUCT SYNTHESIS` - 20 edges
8. `simulate_trajectory()` - 18 edges
9. `compilerOptions` - 18 edges
10. `6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES` - 17 edges

## Surprising Connections (you probably didn't know these)
- `13. AGENT ARCHITECTURE (HERMES RUNTIME SPECIFICATION)` --references--> `simulate_trajectory()`  [INFERRED]
  .hermes/plans/2026-09-24_jagausaha-master-architecture-plan.md → core/dlmm.py
- `🎨 Komponen UI & Desain Eksternal` --references--> `AgentThinking()`  [INFERRED]
  README.md → frontend/src/components/AgentThinking.tsx
- `🎨 Komponen UI & Desain Eksternal` --references--> `MatrixOrb()`  [INFERRED]
  README.md → frontend/src/components/ui/matrix-orb.tsx
- `13. AGENT ARCHITECTURE (HERMES RUNTIME SPECIFICATION)` --references--> `calculate_safe_to_spend()`  [INFERRED]
  .hermes/plans/2026-09-24_jagausaha-master-architecture-plan.md → core/dlmm.py
- `onboard_new_business()` --uses--> `BusinessState`  [INFERRED]
  api/server.py → core/dlmm.py

## Import Cycles
- None detected.

## Communities (70 total, 17 thin omitted)

### Community 0 - "server.py"
Cohesion: 0.10
Nodes (32): get_agents_telemetry(), get_business_memories(), get_data_inbox(), get_negotiate_script(), get_nudge_script(), health_check(), ingest_text(), IngestRequest (+24 more)

### Community 1 - "JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM"
Cohesion: 0.14
Nodes (13): 10.1 The "Zero-Form" Onboarding Philosophy, 10. DATA REALITY: OVERCOMING THE INDONESIAN UMKM ONBOARDING BARRIER, 11. HACKATHON MVP SCOPE: WHAT TO BUILD VS. WHAT TO CUT, 13. UI / UX DESIGN ARCHITECTURE, 15.1 Real vs. Fabricated Metrics, 15. MEASURABLE IMPACT FRAMEWORK, 17. THE COMPETITIVE MOAT, 4.1 Liquidity Invariant Engine (+5 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (41): dependencies, border-beam, clsx, framer-motion, gsap, lucide-react, react, react-dom (+33 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "JagaUsaha — Master Architecture & Product Logic Plan"
Cohesion: 0.08
Nodes (23): 10. GUARDIAN MONITORING ENGINE (THE CONTINUOUS LOOP), 11. SIGNAL → RISK LOGIC (DARI ANOMALI KE RISIKO BERMAKNA), 14. HUMAN APPROVAL & FINANCIAL SAFETY TIERS, 17. UI SCREEN MAP (INFORMATION ARCHITECTURE), 18. EDGE CASES (PENANGANAN KONDISI REALISTIS UMKM), 19. HACKATHON MVP (VERTICAL SLICE PRIORITY), 1. PRODUCT NORTH STAR, 20. DATABASE PLAN (POSTGRESQL RELATIONAL SCHEMA) (+15 more)

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 8 - "animated-toast-stack.tsx"
Cohesion: 0.12
Nodes (17): App(), AnimatedToast, AnimatedToastAction, AnimatedToastStackProps, createToast(), POSITION_CLASS, STACK_SPRING, STATUS_CLASS (+9 more)

### Community 9 - "18. FINAL PRODUCT SYNTHESIS"
Cohesion: 0.10
Nodes (20): 18. FINAL PRODUCT SYNTHESIS, A. Problem, B. Product, C. One-Sentence Pitch, D. Why Now, E. Target User, F. Core User Journey, G. Hero Feature (+12 more)

### Community 10 - "react"
Cohesion: 0.25
Nodes (9): ActionFeedProps, HeaderProps, LoginPage(), LoginPageProps, MotionButton, MotionButtonProps, JagaUsahaLogo(), JagaUsahaLogoProps (+1 more)

### Community 11 - "6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES"
Cohesion: 0.12
Nodes (17): 6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES, Capability 10: "Prediktor Cuaca & Musim Hujan" (Hyperlocal External Shock Adjuster), Capability 11: "Audit Kebocoran Transaksi Kasir" (Cashier Anomaly & Leakage Auditor), Capability 12: "Flash Promo Clearance Engine" (Zero-Loss Margin Liquidation), Capability 13: "Emergency Survival Mode" (One-Tap Cash Freeze Protocol), Capability 14: "Anonymized Local Price Benchmarking" (UMKM Collective Intelligence), Capability 15: "Snapshot Nilai Usaha" (Instant Handover / Investor Valuation Card), Capability 1: "Jebakan Promo Supplier" (Bulk Discount vs. Cash Runway Validator) (+9 more)

### Community 12 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 13 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 14 - "BoardUIAgentThinking.tsx"
Cohesion: 0.19
Nodes (3): BoardUIAgentThinkingProps, ThinkingStep, TrajectoryChartProps

### Community 15 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 16 - "DecisionStudio.tsx"
Cohesion: 0.16
Nodes (14): DecisionIntelligenceCard(), DecisionIntelligenceProps, DecisionStudio(), DecisionStudioProps, PresetScenario, AnimatedBadge(), AnimatedNumber(), AnimatedNumberProps (+6 more)

### Community 17 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 24 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 25 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 26 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the Oxlint configuration, React Compiler, React + TypeScript + Vite

### Community 32 - "tabs.tsx"
Cohesion: 0.22
Nodes (11): BoardUIAreaChart(), BoardUIAreaChartProps, ChartDataPoint, Tabs(), TabsContext, TabsContextType, TabsList(), TabsTrigger() (+3 more)

### Community 33 - "matrix-orb.tsx"
Cohesion: 0.08
Nodes (26): AgentThinking(), AgentThinkingProps, ThinkingStep, envelope(), intensityOf(), LABELS, MatrixOrb(), MatrixOrbProps (+18 more)

### Community 35 - "App.tsx"
Cohesion: 0.19
Nodes (12): PRESETS, PulseData, ActionFeed(), DashboardPage(), FeatureAgents(), Footer(), Header(), HeroSection() (+4 more)

### Community 36 - "bouncy-accordion.tsx"
Cohesion: 0.16
Nodes (12): FAQSection(), BouncyAccordion(), BouncyAccordionClassNames, BouncyAccordionItem, BouncyAccordionProps, BouncyAccordionRow(), CHEVRON_TRANSITION, CONTENT_CLOSE_TRANSITION (+4 more)

### Community 37 - "animated-badge.tsx"
Cohesion: 0.20
Nodes (9): AnimatedBadgeProps, AnimatedBadgeSize, AnimatedBadgeStatus, ICON_CLASS, ICON_ROLL_VARIANTS, ICONS, SIZE_CLASS, STATUS_CLASS (+1 more)

### Community 38 - "cn"
Cohesion: 0.19
Nodes (11): AnimatedToastStack(), ToastItem, CommandItem, CommandPalette(), CommandPaletteProps, PANEL_SPRING, Marquee(), MarqueeProps (+3 more)

### Community 39 - "ease.ts"
Cohesion: 0.16
Nodes (12): TerminalDrawer(), TerminalDrawerProps, WhatsAppModal(), WhatsAppModalProps, EASE_DRAWER, EASE_IN_OUT, EASE_OUT, EASE_OUT_CSS (+4 more)

### Community 40 - "JagaUsaha — Canonical Product Flow & Business Architecture Specification"
Cohesion: 0.18
Nodes (10): 1. Product North Star, 2. Aktor & Tanggung Jawab Sistem, 3. End-to-End Lifecycle, 4. Progressive Cold-Start Onboarding (Zero Historical Data), 5. Formula Matematis Deterministik (DLMM Core), 6. Sinyal Anomali $\to$ Kasus Risiko (*RiskCase*), 7. Data Confidence & Data Inbox, 8. Human Approval & Financial Safety (+2 more)

### Community 41 - "DashboardPage.tsx"
Cohesion: 0.15
Nodes (12): CashEvent, DashboardAgendaView(), DashboardAgendaViewProps, DashboardAgentsView(), DashboardMemoryView(), DashboardPageProps, DataInboxItem, DataInboxModal() (+4 more)

### Community 42 - "calculate_safe_to_spend"
Cohesion: 0.40
Nodes (4): get_business_pulse(), calculate_safe_to_spend(), Safe-to-Spend ("Duit Dingin"): Cash - Committed Obligations(window) +…, 13. AGENT ARCHITECTURE (HERMES RUNTIME SPECIFICATION)

### Community 43 - "text-reveal.tsx"
Cohesion: 0.33
Nodes (6): DEFAULT_SPRING, SplitMode, TextReveal(), TextRevealProps, toWordGroups(), WordGroup

### Community 44 - "expanding-arrow-button.tsx"
Cohesion: 0.20
Nodes (9): FinalCTA(), FinalCTAProps, ARROW_OPACITY, ExpandingArrowButton, ExpandingArrowButtonProps, TiltCard(), TiltCardProps, SPRING_MOUSE (+1 more)

### Community 45 - "19. FINAL CHALLENGE: THE 7-DAY HACKATHON EXECUTION PLAN"
Cohesion: 0.33
Nodes (6): 19. FINAL CHALLENGE: THE 7-DAY HACKATHON EXECUTION PLAN, Final Product Definition, The 30-Second Pitch, The 7-Day Exact Build Specification, The One Demo Moment Judges Will Remember, What NOT to Build

### Community 46 - "framer-motion"
Cohesion: 0.29
Nodes (3): BlurTextProps, MagnetProps, framer-motion

### Community 47 - "16. RED TEAM THE IDEA: BRUTAL JUDGE OBJECTIONS & DEFENSES"
Cohesion: 0.40
Nodes (5): 16. RED TEAM THE IDEA: BRUTAL JUDGE OBJECTIONS & DEFENSES, Objection 1: "Isn't this just Mekari or BukuWarung with a ChatGPT wrapper?", Objection 2: "Where does the data come from? Indonesian UMKM keep messy cash in a biscuit tin!", Objection 3: "Why does this require an AGENT? A simple Excel formula can do cash flow projection.", Objection 4: "What if your AI gives wrong advice and causes a business to collapse?"

### Community 48 - "14. TECHNICAL ARCHITECTURE & FRAMEWORK EVALUATION"
Cohesion: 0.50
Nodes (4): 14.1 Evaluating Hermes Agent Framework, 14.2 Production Stack Specifications, 14.3 Division of Labor: Code vs. LLM, 14. TECHNICAL ARCHITECTURE & FRAMEWORK EVALUATION

### Community 49 - "12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT"
Cohesion: 0.67
Nodes (3): 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT, Minute-by-Minute Live Walkthrough, Scenario: "Kopi Teras Barokah" (Small Coffee Shop in South Jakarta)

### Community 50 - "1. START FROM THE PROBLEM — NOT THE SOLUTION"
Cohesion: 0.67
Nodes (3): 1.1 Field Realities of Indonesian UMKM, 1.2 Problem Ranking Matrix, 1. START FROM THE PROBLEM — NOT THE SOLUTION

### Community 51 - "2. CRITICAL EVALUATION OF THE ORIGINAL IDEA"
Cohesion: 0.67
Nodes (3): 2.1 The Original Hypothesis, 2.2 Brutal Reality Check & Weak Assumptions, 2. CRITICAL EVALUATION OF THE ORIGINAL IDEA

### Community 52 - "3. COMPETITIVE LANDSCAPE & LOCAL ADAPTATION"
Cohesion: 0.67
Nodes (3): 3.1 Global & Domestic Precedents, 3.2 The Unfair Differentiation for JagaUsaha, 3. COMPETITIVE LANDSCAPE & LOCAL ADAPTATION

### Community 53 - "9. SAFETY ARCHITECTURE & FINANCIAL TRUST BOUNDARIES"
Cohesion: 0.67
Nodes (3): 9.1 Risk Classification & Autonomy Gates, 9.2 Hallucination Immunity Protocol, 9. SAFETY ARCHITECTURE & FINANCIAL TRUST BOUNDARIES

### Community 54 - "sensor.py"
Cohesion: 0.22
Nodes (7): ParsedTransaction, Sensor Agent & Multimodal Ingestion Module for JagaUsaha. Parses Indonesian…, Parses standard KlikBCA / m-BCA text export. Example lines: 20/09 TRSF…, SensorAgent, dataclasses, re, typing

### Community 55 - "cli_demo.py"
Cohesion: 0.18
Nodes (11): print_banner(), Interactive CLI Runner for JagaUsaha. Specifically designed for the IDwebhost…, Advisor Agent & Culturally Tuned Communication Engine for JagaUsaha. Generates…, os, rich_console, rich_panel, rich_progress, rich_prompt (+3 more)

### Community 56 - "simulate_trajectory"
Cohesion: 0.19
Nodes (16): load_initial_state(), run_cli(), BusinessState, calculate_prive_leakage(), calculate_runway(), Obligation, Dynamic Liquidity & Margin Model (DLMM) Deterministic Financial Simulation Core…, Business Fire Drill: 2 automated stress tests 1. Drop revenue by 20% 2. Zero… (+8 more)

### Community 57 - "12. FEATURE FLOWS (SPESIFIKASI 10 FITUR UTAMA)"
Cohesion: 0.18
Nodes (11): 10. Ask JagaUsaha (Asisten Konsultasi Finansial Kontekstual), 12. FEATURE FLOWS (SPESIFIKASI 10 FITUR UTAMA), 1. Business Pulse (Homepage Keamanan Kas), 2. Guardian Feed (Pusat Intervensi & Berkas Kasus), 3. Silent Leak Detector (Detektor Kebocoran Kas Halus), 4. Safe-to-Spend Calculator (Duit Dingin Aman Belanja), 5. Future Simulator (Decision Sandbox), 6. Business Fire Drill (Uji Ketahanan Krisis Otomatis) (+3 more)

### Community 58 - "AdvisorAgent"
Cohesion: 0.22
Nodes (6): AdvisorAgent, Any, Translates raw mathematical TrajectoryResult into plain Indonesian actionable…, 'Kolektor Bon Santun': Culturally tuned polite Indonesian debt collection for…, 'Script Negosiasi Tempo Supplier': Counter-offer to restructure upfront CAPEX…, TrajectoryResult

### Community 60 - "15. STATE MACHINES"
Cohesion: 0.50
Nodes (4): 15. STATE MACHINES, A. RiskCase Lifecycle, B. Recommendation Lifecycle, C. DataInbox Item Lifecycle

### Community 61 - "29. REALITY-CHECK: WHERE WOULD THE SYSTEM FAIL TOMORROW & HOW IT IS FIXED?"
Cohesion: 0.50
Nodes (4): 29. REALITY-CHECK: WHERE WOULD THE SYSTEM FAIL TOMORROW & HOW IT IS FIXED?, Tantangan Nyata 1: "Owner bayar supplier pakai uang tunai dari laci kasir, tidak lewat rekening bank.", Tantangan Nyata 2: "Omset UMKM sangat fluktuatif (Sabtu-Minggu ramai 2.5 Jt, Senin-Rabu sepi 500rb).", Tantangan Nyata 3: "Owner merasa tersinggung jika AI menuduh mereka 'korupsi' uang toko sendiri saat tarik prive."

### Community 62 - "4. NEW USER ONBOARDING FLOW (PROGRESSIVE DISCLOSURE)"
Cohesion: 0.50
Nodes (4): 4. NEW USER ONBOARDING FLOW (PROGRESSIVE DISCLOSURE), Step 1: Identitas Bisnis & Archetype, Step 2: Pilih Metode Input Data (Fleksibel & Anti-Gagal), Step 3: Penetapan Data Confidence & First Baseline

### Community 63 - "16. MERMAID FLOW DIAGRAMS"
Cohesion: 0.67
Nodes (3): 16. MERMAID FLOW DIAGRAMS, Diagram 1: Continuous Guardian & Decision Simulation Loop, Diagram 2: Cold-Start Onboarding Flow (Zero Historical Data)

### Community 64 - "7. AGENTIC DESIGN & SYSTEM TOPOLOGY"
Cohesion: 0.67
Nodes (3): 7.1 Multi-Agent Specialization vs. Monolithic LLM, 7.2 Component Responsibilities, 7. AGENTIC DESIGN & SYSTEM TOPOLOGY

### Community 67 - "input.tsx"
Cohesion: 0.24
Nodes (6): DashboardSimulatorView(), DashboardSimulatorViewProps, HowItWorksProps, Input, InputClassNames, InputProps

### Community 68 - "shared-layout-bg.tsx"
Cohesion: 0.33
Nodes (5): reducedVariants, SharedLayoutBg, SharedLayoutBgProps, variants, SPRING_LAYOUT

## Knowledge Gaps
- **345 isolated node(s):** `ActionFeedProps`, `HeaderProps`, `LoginPageProps`, `MotionButtonProps`, `JagaUsahaLogoProps` (+340 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 418 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `CountUp.tsx`, `animated-toast-stack.tsx`, `BoardUIAgentThinking.tsx`, `DecisionStudio.tsx`, `tabs.tsx`, `matrix-orb.tsx`, `SpotlightCard.tsx`, `App.tsx`, `bouncy-accordion.tsx`, `animated-badge.tsx`, `cn`, `ease.ts`, `DashboardPage.tsx`, `text-reveal.tsx`, `expanding-arrow-button.tsx`, `framer-motion`, `input.tsx`, `shared-layout-bg.tsx`, `ShinyText.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `JagaUsaha — Master Architecture & Product Logic Plan` connect `JagaUsaha — Master Architecture & Product Logic Plan` to `5. DATA INGESTION FLOW (CANONICAL PIPELINE)`, `calculate_safe_to_spend`, `12. FEATURE FLOWS (SPESIFIKASI 10 FITUR UTAMA)`, `15. STATE MACHINES`, `29. REALITY-CHECK: WHERE WOULD THE SYSTEM FAIL TOMORROW & HOW IT IS FIXED?`, `4. NEW USER ONBOARDING FLOW (PROGRESSIVE DISCLOSURE)`, `16. MERMAID FLOW DIAGRAMS`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `13. AGENT ARCHITECTURE (HERMES RUNTIME SPECIFICATION)` connect `calculate_safe_to_spend` to `simulate_trajectory`, `JagaUsaha — Master Architecture & Product Logic Plan`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `ActionFeedProps`, `HeaderProps`, `LoginPageProps` to the rest of the system?**
  _345 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server.py` be split into smaller, more focused modules?**
  _Cohesion score 0.10416666666666667 - nodes in this community are weakly interconnected._
- **Should `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._