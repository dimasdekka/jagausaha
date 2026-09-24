# Graph Report - JagaUsaha  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 567 nodes · 895 edges · 54 communities (38 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7ee5cc1b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.py
- JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM
- package.json
- CountUp.tsx
- compilerOptions
- compilerOptions
- DecisionStudio.tsx
- What You Must Do When Invoked
- animated-toast-stack.tsx
- 18. FINAL PRODUCT SYNTHESIS
- react
- 6. FIFTEEN UNCONVENTIONAL OUT-OF-THE-BOX AGENT CAPABILITIES
- graphify reference: extra exports and benchmark
- .oxlintrc.json
- BoardUIAgentThinking.tsx
- graphify reference: query, path, explain
- input.tsx
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
- command-palette.tsx
- ShinyText.tsx
- DashboardPage.tsx
- TrajectoryChart.tsx
- text-reveal.tsx
- ease.ts
- 19. FINAL CHALLENGE: THE 7-DAY HACKATHON EXECUTION PLAN
- framer-motion
- 16. RED TEAM THE IDEA: BRUTAL JUDGE OBJECTIONS & DEFENSES
- 14. TECHNICAL ARCHITECTURE & FRAMEWORK EVALUATION
- 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT
- 1. START FROM THE PROBLEM — NOT THE SOLUTION
- 2. CRITICAL EVALUATION OF THE ORIGINAL IDEA
- 3. COMPETITIVE LANDSCAPE & LOCAL ADAPTATION
- 9. SAFETY ARCHITECTURE & FINANCIAL TRUST BOUNDARIES

## God Nodes (most connected - your core abstractions)
1. `react` - 49 edges
2. `cn()` - 33 edges
3. `lucide-react` - 27 edges
4. `framer-motion` - 21 edges
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
- `ingest_text()` --uses--> `Obligation`  [INFERRED]
  api/server.py → core/dlmm.py
- `ingest_text()` --uses--> `Receivable`  [INFERRED]
  api/server.py → core/dlmm.py
- `simulate_decision()` --uses--> `Scenario`  [INFERRED]
  api/server.py → core/dlmm.py

## Import Cycles
- None detected.

## Communities (54 total, 16 thin omitted)

### Community 0 - "server.py"
Cohesion: 0.05
Nodes (64): get_business_pulse(), get_negotiate_script(), get_nudge_script(), health_check(), ingest_text(), IngestRequest, load_initial_state(), NegotiateRequest (+56 more)

### Community 1 - "JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM"
Cohesion: 0.12
Nodes (16): 10.1 The "Zero-Form" Onboarding Philosophy, 10. DATA REALITY: OVERCOMING THE INDONESIAN UMKM ONBOARDING BARRIER, 11. HACKATHON MVP SCOPE: WHAT TO BUILD VS. WHAT TO CUT, 13. UI / UX DESIGN ARCHITECTURE, 15.1 Real vs. Fabricated Metrics, 15. MEASURABLE IMPACT FRAMEWORK, 17. THE COMPETITIVE MOAT, 4.1 Liquidity Invariant Engine (+8 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (41): dependencies, border-beam, clsx, framer-motion, gsap, lucide-react, react, react-dom (+33 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "DecisionStudio.tsx"
Cohesion: 0.18
Nodes (12): DecisionIntelligenceCard(), DecisionIntelligenceProps, DecisionStudioProps, PresetScenario, AnimatedNumber(), AnimatedNumberProps, PulseCards(), PulseCardsProps (+4 more)

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 8 - "animated-toast-stack.tsx"
Cohesion: 0.13
Nodes (15): App(), AnimatedToast, AnimatedToastAction, AnimatedToastStackProps, createToast(), POSITION_CLASS, STACK_SPRING, STATUS_CLASS (+7 more)

### Community 9 - "18. FINAL PRODUCT SYNTHESIS"
Cohesion: 0.10
Nodes (20): 18. FINAL PRODUCT SYNTHESIS, A. Problem, B. Product, C. One-Sentence Pitch, D. Why Now, E. Target User, F. Core User Journey, G. Hero Feature (+12 more)

### Community 10 - "react"
Cohesion: 0.25
Nodes (9): ActionFeedProps, Header(), HeaderProps, LoginPageProps, MotionButton, MotionButtonProps, JagaUsahaLogo(), JagaUsahaLogoProps (+1 more)

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

### Community 16 - "input.tsx"
Cohesion: 0.24
Nodes (6): DashboardSimulatorView(), DashboardSimulatorViewProps, HowItWorksProps, Input, InputClassNames, InputProps

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
Cohesion: 0.24
Nodes (10): BoardUIAreaChartProps, ChartDataPoint, Tabs(), TabsContext, TabsContextType, TabsList(), TabsTrigger(), useTabsContext() (+2 more)

### Community 33 - "matrix-orb.tsx"
Cohesion: 0.08
Nodes (26): AgentThinking(), AgentThinkingProps, ThinkingStep, envelope(), intensityOf(), LABELS, MatrixOrb(), MatrixOrbProps (+18 more)

### Community 35 - "App.tsx"
Cohesion: 0.13
Nodes (18): PRESETS, PulseData, ActionFeed(), DashboardPage(), DecisionStudio(), FAQSection(), Footer(), HeroSection() (+10 more)

### Community 36 - "bouncy-accordion.tsx"
Cohesion: 0.18
Nodes (11): BouncyAccordion(), BouncyAccordionClassNames, BouncyAccordionItem, BouncyAccordionProps, BouncyAccordionRow(), CHEVRON_TRANSITION, CONTENT_CLOSE_TRANSITION, CONTENT_OPEN_TRANSITION (+3 more)

### Community 37 - "animated-badge.tsx"
Cohesion: 0.20
Nodes (9): AnimatedBadgeProps, AnimatedBadgeSize, AnimatedBadgeStatus, ICON_CLASS, ICON_ROLL_VARIANTS, ICONS, SIZE_CLASS, STATUS_CLASS (+1 more)

### Community 38 - "cn"
Cohesion: 0.28
Nodes (7): AnimatedToastStack(), ToastItem, Marquee(), MarqueeProps, cn(), clsx, tailwind-merge

### Community 39 - "command-palette.tsx"
Cohesion: 0.25
Nodes (6): CommandItem, CommandPalette(), CommandPaletteProps, PANEL_SPRING, frontend_src_index, react-dom

### Community 41 - "DashboardPage.tsx"
Cohesion: 0.20
Nodes (10): BoardUIAreaChart(), CashEvent, DashboardAgendaView(), DashboardAgendaViewProps, DashboardAgentsView(), DashboardPageProps, AnimatedBadge(), BusinessContextData (+2 more)

### Community 43 - "text-reveal.tsx"
Cohesion: 0.33
Nodes (6): DEFAULT_SPRING, SplitMode, TextReveal(), TextRevealProps, toWordGroups(), WordGroup

### Community 44 - "ease.ts"
Cohesion: 0.09
Nodes (22): FeatureAgents(), FinalCTA(), FinalCTAProps, ARROW_OPACITY, ExpandingArrowButton, ExpandingArrowButtonProps, reducedVariants, SharedLayoutBg (+14 more)

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

## Knowledge Gaps
- **290 isolated node(s):** `ActionFeedProps`, `HeaderProps`, `LoginPageProps`, `MotionButtonProps`, `JagaUsahaLogoProps` (+285 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 356 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `CountUp.tsx`, `DecisionStudio.tsx`, `animated-toast-stack.tsx`, `BoardUIAgentThinking.tsx`, `input.tsx`, `tabs.tsx`, `matrix-orb.tsx`, `SpotlightCard.tsx`, `App.tsx`, `bouncy-accordion.tsx`, `animated-badge.tsx`, `cn`, `command-palette.tsx`, `ShinyText.tsx`, `DashboardPage.tsx`, `TrajectoryChart.tsx`, `text-reveal.tsx`, `ease.ts`, `framer-motion`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `tabs.tsx`, `matrix-orb.tsx`, `bouncy-accordion.tsx`, `animated-badge.tsx`, `DecisionStudio.tsx`, `command-palette.tsx`, `animated-toast-stack.tsx`, `DashboardPage.tsx`, `react`, `text-reveal.tsx`, `ease.ts`, `input.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `App.tsx` to `matrix-orb.tsx`, `package.json`, `bouncy-accordion.tsx`, `animated-badge.tsx`, `DecisionStudio.tsx`, `command-palette.tsx`, `animated-toast-stack.tsx`, `DashboardPage.tsx`, `react`, `ease.ts`, `BoardUIAgentThinking.tsx`, `input.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `ActionFeedProps`, `HeaderProps`, `LoginPageProps` to the rest of the system?**
  _290 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server.py` be split into smaller, more focused modules?**
  _Cohesion score 0.050580997949419004 - nodes in this community are weakly interconnected._
- **Should `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._