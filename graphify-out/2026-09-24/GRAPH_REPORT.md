# Graph Report - JagaUsaha  (2026-09-24)

## Corpus Check
- 75 files · ~304,384 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .css 2)

## Summary
- 545 nodes · 827 edges · 48 communities (33 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f4d8b862`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.py
- JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM
- package.json
- CountUp.tsx
- compilerOptions
- compilerOptions
- button.tsx
- What You Must Do When Invoked
- animated-toast-stack.tsx
- 18. FINAL PRODUCT SYNTHESIS
- ease.ts
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
- 19. FINAL CHALLENGE: THE 7-DAY HACKATHON EXECUTION PLAN
- matrix-orb.tsx
- 16. RED TEAM THE IDEA: BRUTAL JUDGE OBJECTIONS & DEFENSES
- react
- 14. TECHNICAL ARCHITECTURE & FRAMEWORK EVALUATION
- ShinyText.tsx
- 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT
- TrajectoryChart.tsx
- 1. START FROM THE PROBLEM — NOT THE SOLUTION
- animated-badge.tsx
- 2. CRITICAL EVALUATION OF THE ORIGINAL IDEA
- 3. COMPETITIVE LANDSCAPE & LOCAL ADAPTATION
- cn
- 7. AGENTIC DESIGN & SYSTEM TOPOLOGY
- framer-motion
- 9. SAFETY ARCHITECTURE & FINANCIAL TRUST BOUNDARIES

## God Nodes (most connected - your core abstractions)
1. `react` - 42 edges
2. `cn()` - 33 edges
3. `lucide-react` - 21 edges
4. `framer-motion` - 20 edges
5. `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` - 20 edges
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
- `simulate_decision()` --uses--> `Scenario`  [INFERRED]
  api/server.py → core/dlmm.py
- `ingest_text()` --uses--> `Obligation`  [INFERRED]
  api/server.py → core/dlmm.py
- `ingest_text()` --uses--> `Receivable`  [INFERRED]
  api/server.py → core/dlmm.py

## Import Cycles
- None detected.

## Communities (48 total, 15 thin omitted)

### Community 0 - "server.py"
Cohesion: 0.05
Nodes (64): get_business_pulse(), get_negotiate_script(), get_nudge_script(), health_check(), ingest_text(), IngestRequest, load_initial_state(), NegotiateRequest (+56 more)

### Community 1 - "JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM"
Cohesion: 0.14
Nodes (13): 10.1 The "Zero-Form" Onboarding Philosophy, 10. DATA REALITY: OVERCOMING THE INDONESIAN UMKM ONBOARDING BARRIER, 11. HACKATHON MVP SCOPE: WHAT TO BUILD VS. WHAT TO CUT, 13. UI / UX DESIGN ARCHITECTURE, 15.1 Real vs. Fabricated Metrics, 15. MEASURABLE IMPACT FRAMEWORK, 17. THE COMPETITIVE MOAT, 4.1 Liquidity Invariant Engine (+5 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (43): dependencies, border-beam, clsx, framer-motion, gsap, lucide-react, react, react-dom (+35 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "button.tsx"
Cohesion: 0.24
Nodes (7): ActionFeed(), ActionFeedProps, Header(), HeaderProps, MotionButton, MotionButtonProps, SPRING_PANEL

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 8 - "animated-toast-stack.tsx"
Cohesion: 0.10
Nodes (19): App(), AnimatedToast, AnimatedToastAction, AnimatedToastStack(), AnimatedToastStackProps, createToast(), POSITION_CLASS, STACK_SPRING (+11 more)

### Community 9 - "18. FINAL PRODUCT SYNTHESIS"
Cohesion: 0.10
Nodes (20): 18. FINAL PRODUCT SYNTHESIS, A. Problem, B. Product, C. One-Sentence Pitch, D. Why Now, E. Target User, F. Core User Journey, G. Hero Feature (+12 more)

### Community 10 - "ease.ts"
Cohesion: 0.20
Nodes (9): WhatsAppModal(), WhatsAppModalProps, EASE_DRAWER, EASE_IN_OUT, EASE_OUT_CSS, SPRING_GLIDE, SPRING_MOUSE, SPRING_PRESS (+1 more)

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
Cohesion: 0.23
Nodes (10): DecisionStudio(), DecisionStudioProps, PresetScenario, Input, InputClassNames, InputProps, SimulationChatModal(), SimulationChatModalProps (+2 more)

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

### Community 32 - "19. FINAL CHALLENGE: THE 7-DAY HACKATHON EXECUTION PLAN"
Cohesion: 0.33
Nodes (6): 19. FINAL CHALLENGE: THE 7-DAY HACKATHON EXECUTION PLAN, Final Product Definition, The 30-Second Pitch, The 7-Day Exact Build Specification, The One Demo Moment Judges Will Remember, What NOT to Build

### Community 33 - "matrix-orb.tsx"
Cohesion: 0.08
Nodes (26): AgentThinking(), AgentThinkingProps, ThinkingStep, envelope(), intensityOf(), LABELS, MatrixOrb(), MatrixOrbProps (+18 more)

### Community 34 - "16. RED TEAM THE IDEA: BRUTAL JUDGE OBJECTIONS & DEFENSES"
Cohesion: 0.40
Nodes (5): 16. RED TEAM THE IDEA: BRUTAL JUDGE OBJECTIONS & DEFENSES, Objection 1: "Isn't this just Mekari or BukuWarung with a ChatGPT wrapper?", Objection 2: "Where does the data come from? Indonesian UMKM keep messy cash in a biscuit tin!", Objection 3: "Why does this require an AGENT? A simple Excel formula can do cash flow projection.", Objection 4: "What if your AI gives wrong advice and causes a business to collapse?"

### Community 35 - "react"
Cohesion: 0.16
Nodes (17): PRESETS, PulseData, FAQSection(), FeatureAgents(), Footer(), HeroSection(), HeroSectionProps, HeroVisual3D() (+9 more)

### Community 36 - "14. TECHNICAL ARCHITECTURE & FRAMEWORK EVALUATION"
Cohesion: 0.50
Nodes (4): 14.1 Evaluating Hermes Agent Framework, 14.2 Production Stack Specifications, 14.3 Division of Labor: Code vs. LLM, 14. TECHNICAL ARCHITECTURE & FRAMEWORK EVALUATION

### Community 38 - "12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT"
Cohesion: 0.67
Nodes (3): 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT, Minute-by-Minute Live Walkthrough, Scenario: "Kopi Teras Barokah" (Small Coffee Shop in South Jakarta)

### Community 40 - "1. START FROM THE PROBLEM — NOT THE SOLUTION"
Cohesion: 0.67
Nodes (3): 1.1 Field Realities of Indonesian UMKM, 1.2 Problem Ranking Matrix, 1. START FROM THE PROBLEM — NOT THE SOLUTION

### Community 41 - "animated-badge.tsx"
Cohesion: 0.11
Nodes (19): DecisionIntelligenceCard(), DecisionIntelligenceProps, AnimatedBadge(), AnimatedBadgeProps, AnimatedBadgeSize, AnimatedBadgeStatus, ICON_CLASS, ICON_ROLL_VARIANTS (+11 more)

### Community 42 - "2. CRITICAL EVALUATION OF THE ORIGINAL IDEA"
Cohesion: 0.67
Nodes (3): 2.1 The Original Hypothesis, 2.2 Brutal Reality Check & Weak Assumptions, 2. CRITICAL EVALUATION OF THE ORIGINAL IDEA

### Community 43 - "3. COMPETITIVE LANDSCAPE & LOCAL ADAPTATION"
Cohesion: 0.67
Nodes (3): 3.1 Global & Domestic Precedents, 3.2 The Unfair Differentiation for JagaUsaha, 3. COMPETITIVE LANDSCAPE & LOCAL ADAPTATION

### Community 44 - "cn"
Cohesion: 0.06
Nodes (44): BoardUIAreaChart(), BoardUIAreaChartProps, ChartDataPoint, FinalCTA(), FinalCTAProps, BouncyAccordion(), BouncyAccordionClassNames, BouncyAccordionItem (+36 more)

### Community 45 - "7. AGENTIC DESIGN & SYSTEM TOPOLOGY"
Cohesion: 0.67
Nodes (3): 7.1 Multi-Agent Specialization vs. Monolithic LLM, 7.2 Component Responsibilities, 7. AGENTIC DESIGN & SYSTEM TOPOLOGY

### Community 46 - "framer-motion"
Cohesion: 0.29
Nodes (3): BlurTextProps, MagnetProps, framer-motion

### Community 47 - "9. SAFETY ARCHITECTURE & FINANCIAL TRUST BOUNDARIES"
Cohesion: 0.67
Nodes (3): 9.1 Risk Classification & Autonomy Gates, 9.2 Hallucination Immunity Protocol, 9. SAFETY ARCHITECTURE & FINANCIAL TRUST BOUNDARIES

## Knowledge Gaps
- **283 isolated node(s):** `deploy_vps.sh script`, `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components` (+278 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 348 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `matrix-orb.tsx`, `package.json`, `CountUp.tsx`, `ShinyText.tsx`, `button.tsx`, `TrajectoryChart.tsx`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `ease.ts`, `cn`, `BoardUIAgentThinking.tsx`, `framer-motion`, `DecisionStudio.tsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `matrix-orb.tsx`, `react`, `button.tsx`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `DecisionStudio.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `react` to `matrix-orb.tsx`, `package.json`, `button.tsx`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `ease.ts`, `cn`, `BoardUIAgentThinking.tsx`, `DecisionStudio.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `deploy_vps.sh script`, `$schema`, `plugins` to the rest of the system?**
  _283 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server.py` be split into smaller, more focused modules?**
  _Cohesion score 0.050580997949419004 - nodes in this community are weakly interconnected._
- **Should `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._