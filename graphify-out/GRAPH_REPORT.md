# Graph Report - JagaUsaha  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 563 nodes · 884 edges · 42 communities (26 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ebf5a1cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.py
- JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM
- package.json
- CountUp.tsx
- compilerOptions
- compilerOptions
- DecisionIntelligenceCard.tsx
- What You Must Do When Invoked
- animated-toast-stack.tsx
- 18. FINAL PRODUCT SYNTHESIS
- JagaUsahaLogo.tsx
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
- expanding-arrow-button.tsx
- matrix-orb.tsx
- SpotlightCard.tsx
- App.tsx
- ShinyText.tsx
- animated-badge.tsx
- TrajectoryChart.tsx
- cn
- framer-motion
- react

## God Nodes (most connected - your core abstractions)
1. `react` - 48 edges
2. `cn()` - 33 edges
3. `lucide-react` - 26 edges
4. `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` - 20 edges
5. `framer-motion` - 20 edges
6. `18. FINAL PRODUCT SYNTHESIS` - 20 edges
7. `compilerOptions` - 18 edges
8. `6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES` - 17 edges
9. `compilerOptions` - 15 edges
10. `simulate_trajectory()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `🎨 Komponen UI & Desain Eksternal` --references--> `AgentThinking()`  [INFERRED]
  README.md → frontend/src/components/AgentThinking.tsx
- `🎨 Komponen UI & Desain Eksternal` --references--> `MatrixOrb()`  [INFERRED]
  README.md → frontend/src/components/ui/matrix-orb.tsx
- `ingest_text()` --uses--> `Obligation`  [INFERRED]
  api/server.py → core/dlmm.py
- `ingest_text()` --uses--> `Receivable`  [INFERRED]
  api/server.py → core/dlmm.py
- `simulate_decision()` --uses--> `Scenario`  [INFERRED]
  api/server.py → core/dlmm.py

## Import Cycles
- None detected.

## Communities (42 total, 16 thin omitted)

### Community 0 - "server.py"
Cohesion: 0.05
Nodes (64): get_business_pulse(), get_negotiate_script(), get_nudge_script(), health_check(), ingest_text(), IngestRequest, load_initial_state(), NegotiateRequest (+56 more)

### Community 1 - "JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM"
Cohesion: 0.04
Nodes (46): 10.1 The "Zero-Form" Onboarding Philosophy, 10. DATA REALITY: OVERCOMING THE INDONESIAN UMKM ONBOARDING BARRIER, 11. HACKATHON MVP SCOPE: WHAT TO BUILD VS. WHAT TO CUT, 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT, 13. UI / UX DESIGN ARCHITECTURE, 14.1 Evaluating Hermes Agent Framework, 14.2 Production Stack Specifications, 14.3 Division of Labor: Code vs. LLM (+38 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (42): dependencies, border-beam, clsx, framer-motion, gsap, lucide-react, react, react-dom (+34 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "DecisionIntelligenceCard.tsx"
Cohesion: 0.28
Nodes (6): DecisionIntelligenceCard(), DecisionIntelligenceProps, AnimatedNumber(), AnimatedNumberProps, PulseCards(), PulseCardsProps

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 8 - "animated-toast-stack.tsx"
Cohesion: 0.10
Nodes (19): App(), AnimatedToast, AnimatedToastAction, AnimatedToastStack(), AnimatedToastStackProps, createToast(), POSITION_CLASS, STACK_SPRING (+11 more)

### Community 9 - "18. FINAL PRODUCT SYNTHESIS"
Cohesion: 0.10
Nodes (20): 18. FINAL PRODUCT SYNTHESIS, A. Problem, B. Product, C. One-Sentence Pitch, D. Why Now, E. Target User, F. Core User Journey, G. Hero Feature (+12 more)

### Community 10 - "JagaUsahaLogo.tsx"
Cohesion: 0.50
Nodes (3): Footer(), JagaUsahaLogo(), JagaUsahaLogoProps

### Community 11 - "6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES"
Cohesion: 0.12
Nodes (17): 6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES, Capability 10: "Prediktor Cuaca & Musim Hujan" (Hyperlocal External Shock Adjuster), Capability 11: "Audit Kebocoran Transaksi Kasir" (Cashier Anomaly & Leakage Auditor), Capability 12: "Flash Promo Clearance Engine" (Zero-Loss Margin Liquidation), Capability 13: "Emergency Survival Mode" (One-Tap Cash Freeze Protocol), Capability 14: "Anonymized Local Price Benchmarking" (UMKM Collective Intelligence), Capability 15: "Snapshot Nilai Usaha" (Instant Handover / Investor Valuation Card), Capability 1: "Jebakan Promo Supplier" (Bulk Discount vs. Cash Runway Validator) (+9 more)

### Community 12 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 13 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 15 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 16 - "DecisionStudio.tsx"
Cohesion: 0.19
Nodes (13): DashboardSimulatorViewProps, DecisionStudioProps, PresetScenario, LoginPageProps, MotionButton, MotionButtonProps, Input, InputClassNames (+5 more)

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

### Community 32 - "expanding-arrow-button.tsx"
Cohesion: 0.18
Nodes (9): FinalCTA(), FinalCTAProps, HeroSection(), HeroSectionProps, HeroVisual3D(), ARROW_OPACITY, ExpandingArrowButton, ExpandingArrowButtonProps (+1 more)

### Community 33 - "matrix-orb.tsx"
Cohesion: 0.08
Nodes (26): AgentThinking(), AgentThinkingProps, ThinkingStep, envelope(), intensityOf(), LABELS, MatrixOrb(), MatrixOrbProps (+18 more)

### Community 35 - "App.tsx"
Cohesion: 0.16
Nodes (14): PRESETS, PulseData, DecisionStudio(), FAQSection(), FeatureAgents(), Header(), HeaderProps, LoginPage() (+6 more)

### Community 41 - "animated-badge.tsx"
Cohesion: 0.11
Nodes (18): BoardUIAreaChart(), CashEvent, DashboardAgendaView(), DashboardAgendaViewProps, DashboardAgentsView(), DashboardSimulatorView(), DashboardPage(), DashboardPageProps (+10 more)

### Community 44 - "cn"
Cohesion: 0.05
Nodes (47): BoardUIAreaChartProps, ChartDataPoint, BouncyAccordion(), BouncyAccordionClassNames, BouncyAccordionItem, BouncyAccordionProps, BouncyAccordionRow(), CHEVRON_TRANSITION (+39 more)

### Community 46 - "framer-motion"
Cohesion: 0.29
Nodes (3): BlurTextProps, MagnetProps, framer-motion

### Community 50 - "react"
Cohesion: 0.24
Nodes (8): ActionFeed(), ActionFeedProps, HowItWorksProps, TiltCard(), TiltCardProps, useHoverCapable(), gsap, react

## Knowledge Gaps
- **289 isolated node(s):** `JagaUsahaLogoProps`, `BoardUIAgentThinkingProps`, `ThinkingStep`, `DashboardSimulatorViewProps`, `DecisionStudioProps` (+284 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 355 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `expanding-arrow-button.tsx`, `matrix-orb.tsx`, `package.json`, `App.tsx`, `CountUp.tsx`, `SpotlightCard.tsx`, `DecisionIntelligenceCard.tsx`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `JagaUsahaLogo.tsx`, `ShinyText.tsx`, `cn`, `TrajectoryChart.tsx`, `BoardUIAgentThinking.tsx`, `framer-motion`, `DecisionStudio.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `expanding-arrow-button.tsx`, `matrix-orb.tsx`, `DecisionIntelligenceCard.tsx`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `DecisionStudio.tsx`, `react`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `App.tsx` to `expanding-arrow-button.tsx`, `matrix-orb.tsx`, `package.json`, `DecisionIntelligenceCard.tsx`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `cn`, `BoardUIAgentThinking.tsx`, `DecisionStudio.tsx`, `react`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `JagaUsahaLogoProps`, `BoardUIAgentThinkingProps`, `ThinkingStep` to the rest of the system?**
  _289 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server.py` be split into smaller, more focused modules?**
  _Cohesion score 0.050580997949419004 - nodes in this community are weakly interconnected._
- **Should `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._