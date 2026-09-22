# Graph Report - JagaUsaha  (2026-09-22)

## Corpus Check
- 72 files · ~191,353 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .css 2)

## Summary
- 522 nodes · 784 edges · 38 communities (27 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bc4a00f2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.py
- JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM
- package.json
- react
- compilerOptions
- compilerOptions
- What You Must Do When Invoked
- animated-toast-stack.tsx
- 18. FINAL PRODUCT SYNTHESIS
- ease.ts
- 6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES
- graphify reference: extra exports and benchmark
- .oxlintrc.json
- lucide-react
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
- Header.tsx
- matrix-orb.tsx
- DecisionIntelligenceCard.tsx
- animated-badge.tsx
- cn
- App.tsx
- framer-motion

## God Nodes (most connected - your core abstractions)
1. `react` - 39 edges
2. `cn()` - 28 edges
3. `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` - 20 edges
4. `18. FINAL PRODUCT SYNTHESIS` - 20 edges
5. `framer-motion` - 18 edges
6. `compilerOptions` - 18 edges
7. `lucide-react` - 17 edges
8. `6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES` - 17 edges
9. `compilerOptions` - 15 edges
10. `simulate_trajectory()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `🎨 Komponen UI & Desain Eksternal` --references--> `AgentThinking()`  [INFERRED]
  README.md → frontend/src/components/AgentThinking.tsx
- `🎨 Komponen UI & Desain Eksternal` --references--> `MatrixOrb()`  [INFERRED]
  README.md → frontend/src/components/ui/matrix-orb.tsx
- `simulate_decision()` --uses--> `Scenario`  [INFERRED]
  api/server.py → core/dlmm.py
- `ingest_text()` --uses--> `Obligation`  [INFERRED]
  api/server.py → core/dlmm.py
- `ingest_text()` --uses--> `Receivable`  [INFERRED]
  api/server.py → core/dlmm.py

## Import Cycles
- None detected.

## Communities (38 total, 11 thin omitted)

### Community 0 - "server.py"
Cohesion: 0.05
Nodes (64): get_business_pulse(), get_negotiate_script(), get_nudge_script(), health_check(), ingest_text(), IngestRequest, load_initial_state(), NegotiateRequest (+56 more)

### Community 1 - "JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM"
Cohesion: 0.04
Nodes (46): 10.1 The "Zero-Form" Onboarding Philosophy, 10. DATA REALITY: OVERCOMING THE INDONESIAN UMKM ONBOARDING BARRIER, 11. HACKATHON MVP SCOPE: WHAT TO BUILD VS. WHAT TO CUT, 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT, 13. UI / UX DESIGN ARCHITECTURE, 14.1 Evaluating Hermes Agent Framework, 14.2 Production Stack Specifications, 14.3 Division of Labor: Code vs. LLM (+38 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (39): dependencies, clsx, framer-motion, gsap, lucide-react, react, react-dom, recharts (+31 more)

### Community 3 - "react"
Cohesion: 0.15
Nodes (5): CountUpProps, ShinyTextProps, SpotlightCardProps, TrajectoryChartProps, react

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 8 - "animated-toast-stack.tsx"
Cohesion: 0.11
Nodes (18): App(), AnimatedToast, AnimatedToastAction, AnimatedToastStack(), AnimatedToastStackProps, createToast(), POSITION_CLASS, STACK_SPRING (+10 more)

### Community 9 - "18. FINAL PRODUCT SYNTHESIS"
Cohesion: 0.10
Nodes (20): 18. FINAL PRODUCT SYNTHESIS, A. Problem, B. Product, C. One-Sentence Pitch, D. Why Now, E. Target User, F. Core User Journey, G. Hero Feature (+12 more)

### Community 10 - "ease.ts"
Cohesion: 0.16
Nodes (12): FAQSection(), TerminalDrawer(), TerminalDrawerProps, WhatsAppModal(), WhatsAppModalProps, EASE_DRAWER, EASE_IN_OUT, EASE_OUT (+4 more)

### Community 11 - "6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES"
Cohesion: 0.12
Nodes (17): 6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES, Capability 10: "Prediktor Cuaca & Musim Hujan" (Hyperlocal External Shock Adjuster), Capability 11: "Audit Kebocoran Transaksi Kasir" (Cashier Anomaly & Leakage Auditor), Capability 12: "Flash Promo Clearance Engine" (Zero-Loss Margin Liquidation), Capability 13: "Emergency Survival Mode" (One-Tap Cash Freeze Protocol), Capability 14: "Anonymized Local Price Benchmarking" (UMKM Collective Intelligence), Capability 15: "Snapshot Nilai Usaha" (Instant Handover / Investor Valuation Card), Capability 1: "Jebakan Promo Supplier" (Bulk Discount vs. Cash Runway Validator) (+9 more)

### Community 12 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 13 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 14 - "lucide-react"
Cohesion: 0.20
Nodes (5): AgentThinkingProps, ThinkingStep, BoardUIAgentThinkingProps, ThinkingStep, lucide-react

### Community 15 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 16 - "DecisionStudio.tsx"
Cohesion: 0.21
Nodes (10): DecisionStudioProps, PresetScenario, HowItWorks(), HowItWorksProps, Input, InputClassNames, InputProps, SimulationChatModal() (+2 more)

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

### Community 32 - "Header.tsx"
Cohesion: 0.22
Nodes (8): Header(), HeaderProps, reducedVariants, SharedLayoutBg, SharedLayoutBgProps, variants, SPRING_LAYOUT, SPRING_PANEL

### Community 33 - "matrix-orb.tsx"
Cohesion: 0.09
Nodes (23): AgentThinking(), envelope(), intensityOf(), LABELS, MatrixOrb(), MatrixOrbProps, ORBITERS, SCALE (+15 more)

### Community 40 - "DecisionIntelligenceCard.tsx"
Cohesion: 0.27
Nodes (7): DecisionIntelligenceCard(), DecisionIntelligenceProps, AnimatedBadge(), AnimatedNumber(), AnimatedNumberProps, PulseCards(), PulseCardsProps

### Community 41 - "animated-badge.tsx"
Cohesion: 0.20
Nodes (9): AnimatedBadgeProps, AnimatedBadgeSize, AnimatedBadgeStatus, ICON_CLASS, ICON_ROLL_VARIANTS, ICONS, SIZE_CLASS, STATUS_CLASS (+1 more)

### Community 44 - "cn"
Cohesion: 0.08
Nodes (32): BoardUIAreaChart(), BoardUIAreaChartProps, ChartDataPoint, FinalCTA(), FinalCTAProps, ToastItem, ARROW_OPACITY, ExpandingArrowButton (+24 more)

### Community 45 - "App.tsx"
Cohesion: 0.17
Nodes (12): PRESETS, PulseData, ActionFeed(), ActionFeedProps, DecisionStudio(), FeatureAgents(), Footer(), HeroSection() (+4 more)

### Community 46 - "framer-motion"
Cohesion: 0.29
Nodes (3): BlurTextProps, MagnetProps, framer-motion

## Knowledge Gaps
- **270 isolated node(s):** `deploy_vps.sh script`, `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components` (+265 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 335 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `Header.tsx`, `matrix-orb.tsx`, `package.json`, `DecisionIntelligenceCard.tsx`, `animated-badge.tsx`, `ease.ts`, `animated-toast-stack.tsx`, `cn`, `App.tsx`, `lucide-react`, `framer-motion`, `DecisionStudio.tsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` connect `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` to `18. FINAL PRODUCT SYNTHESIS`, `6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `MatrixOrb()` connect `matrix-orb.tsx` to `DecisionStudio.tsx`, `cn`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `deploy_vps.sh script`, `$schema`, `plugins` to the rest of the system?**
  _270 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server.py` be split into smaller, more focused modules?**
  _Cohesion score 0.050580997949419004 - nodes in this community are weakly interconnected._
- **Should `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._