# Graph Report - JagaUsaha  (2026-09-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 551 nodes · 844 edges · 42 communities (29 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0f7ee0b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.py
- JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM
- package.json
- CountUp.tsx
- compilerOptions
- compilerOptions
- cn
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
- expanding-arrow-button.tsx
- matrix-orb.tsx
- text-reveal.tsx
- App.tsx
- react
- animated-badge.tsx
- tabs.tsx
- framer-motion
- bouncy-accordion.tsx
- LoginPage.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 44 edges
2. `cn()` - 33 edges
3. `lucide-react` - 22 edges
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

## Communities (42 total, 13 thin omitted)

### Community 0 - "server.py"
Cohesion: 0.05
Nodes (64): get_business_pulse(), get_negotiate_script(), get_nudge_script(), health_check(), ingest_text(), IngestRequest, load_initial_state(), NegotiateRequest (+56 more)

### Community 1 - "JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM"
Cohesion: 0.04
Nodes (46): 10.1 The "Zero-Form" Onboarding Philosophy, 10. DATA REALITY: OVERCOMING THE INDONESIAN UMKM ONBOARDING BARRIER, 11. HACKATHON MVP SCOPE: WHAT TO BUILD VS. WHAT TO CUT, 12. THE PERFECT 3-MINUTE HACKATHON DEMO SCRIPT, 13. UI / UX DESIGN ARCHITECTURE, 14.1 Evaluating Hermes Agent Framework, 14.2 Production Stack Specifications, 14.3 Division of Labor: Code vs. LLM (+38 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (41): dependencies, border-beam, clsx, framer-motion, gsap, lucide-react, react, react-dom (+33 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "cn"
Cohesion: 0.19
Nodes (11): AnimatedToastStack(), ToastItem, CommandItem, CommandPalette(), CommandPaletteProps, PANEL_SPRING, Marquee(), MarqueeProps (+3 more)

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 8 - "animated-toast-stack.tsx"
Cohesion: 0.12
Nodes (17): App(), AnimatedToast, AnimatedToastAction, AnimatedToastStackProps, createToast(), POSITION_CLASS, STACK_SPRING, STATUS_CLASS (+9 more)

### Community 9 - "18. FINAL PRODUCT SYNTHESIS"
Cohesion: 0.10
Nodes (20): 18. FINAL PRODUCT SYNTHESIS, A. Problem, B. Product, C. One-Sentence Pitch, D. Why Now, E. Target User, F. Core User Journey, G. Hero Feature (+12 more)

### Community 10 - "ease.ts"
Cohesion: 0.17
Nodes (11): reducedVariants, SharedLayoutBg, SharedLayoutBgProps, variants, EASE_DRAWER, EASE_IN_OUT, EASE_OUT_CSS, SPRING_GLIDE (+3 more)

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
Cohesion: 0.20
Nodes (11): ActionFeedProps, DecisionStudio(), DecisionStudioProps, PresetScenario, MotionButton, MotionButtonProps, SimulationChatModal(), SimulationChatModalProps (+3 more)

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
Cohesion: 0.22
Nodes (8): FinalCTA(), FinalCTAProps, ARROW_OPACITY, ExpandingArrowButton, ExpandingArrowButtonProps, TiltCard(), TiltCardProps, useHoverCapable()

### Community 33 - "matrix-orb.tsx"
Cohesion: 0.08
Nodes (26): AgentThinking(), AgentThinkingProps, ThinkingStep, envelope(), intensityOf(), LABELS, MatrixOrb(), MatrixOrbProps (+18 more)

### Community 34 - "text-reveal.tsx"
Cohesion: 0.33
Nodes (6): DEFAULT_SPRING, SplitMode, TextReveal(), TextRevealProps, toWordGroups(), WordGroup

### Community 35 - "App.tsx"
Cohesion: 0.21
Nodes (11): PRESETS, PulseData, ActionFeed(), FAQSection(), FeatureAgents(), Footer(), HeroSection(), HeroSectionProps (+3 more)

### Community 37 - "react"
Cohesion: 0.15
Nodes (8): Header(), HeaderProps, ShinyTextProps, SpotlightCardProps, TrajectoryChartProps, JagaUsahaLogo(), JagaUsahaLogoProps, react

### Community 41 - "animated-badge.tsx"
Cohesion: 0.11
Nodes (19): DecisionIntelligenceCard(), DecisionIntelligenceProps, AnimatedBadge(), AnimatedBadgeProps, AnimatedBadgeSize, AnimatedBadgeStatus, ICON_CLASS, ICON_ROLL_VARIANTS (+11 more)

### Community 44 - "tabs.tsx"
Cohesion: 0.22
Nodes (11): BoardUIAreaChart(), BoardUIAreaChartProps, ChartDataPoint, Tabs(), TabsContext, TabsContextType, TabsList(), TabsTrigger() (+3 more)

### Community 46 - "framer-motion"
Cohesion: 0.18
Nodes (6): BlurTextProps, MagnetProps, WhatsAppModal(), WhatsAppModalProps, SPRING_PRESS, framer-motion

### Community 48 - "bouncy-accordion.tsx"
Cohesion: 0.18
Nodes (11): BouncyAccordion(), BouncyAccordionClassNames, BouncyAccordionItem, BouncyAccordionProps, BouncyAccordionRow(), CHEVRON_TRANSITION, CONTENT_CLOSE_TRANSITION, CONTENT_OPEN_TRANSITION (+3 more)

### Community 50 - "LoginPage.tsx"
Cohesion: 0.24
Nodes (6): HowItWorksProps, LoginPage(), LoginPageProps, Input, InputClassNames, InputProps

## Knowledge Gaps
- **285 isolated node(s):** `SharedLayoutBgProps`, `BoardUIAgentThinkingProps`, `ThinkingStep`, `ActionFeedProps`, `DecisionStudioProps` (+280 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 351 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `expanding-arrow-button.tsx`, `matrix-orb.tsx`, `package.json`, `App.tsx`, `text-reveal.tsx`, `CountUp.tsx`, `cn`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `ease.ts`, `tabs.tsx`, `BoardUIAgentThinking.tsx`, `framer-motion`, `DecisionStudio.tsx`, `bouncy-accordion.tsx`, `LoginPage.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `expanding-arrow-button.tsx`, `matrix-orb.tsx`, `text-reveal.tsx`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `ease.ts`, `tabs.tsx`, `bouncy-accordion.tsx`, `DecisionStudio.tsx`, `LoginPage.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `App.tsx` to `matrix-orb.tsx`, `package.json`, `react`, `cn`, `animated-toast-stack.tsx`, `animated-badge.tsx`, `BoardUIAgentThinking.tsx`, `framer-motion`, `DecisionStudio.tsx`, `bouncy-accordion.tsx`, `LoginPage.tsx`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `SharedLayoutBgProps`, `BoardUIAgentThinkingProps`, `ThinkingStep` to the rest of the system?**
  _285 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server.py` be split into smaller, more focused modules?**
  _Cohesion score 0.050580997949419004 - nodes in this community are weakly interconnected._
- **Should `JAGAUSAHA: AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._