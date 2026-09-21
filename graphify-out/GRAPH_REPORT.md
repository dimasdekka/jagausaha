# Graph Report - JagaUsaha  (2026-09-21)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 264 nodes · 399 edges · 24 communities (16 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `03eee185`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli_demo.py
- server.py
- package.json
- App.tsx
- compilerOptions
- compilerOptions
- matrix-orb.tsx
- HeroSection.tsx
- devDependencies
- PulseCards.tsx
- SensorAgent
- dependencies
- react
- .oxlintrc.json
- BoardUIAgentThinking.tsx
- BoardUIAreaChart.tsx
- AgentThinking.tsx
- Header.tsx
- tsconfig.json
- api/__init__.py
- core/__init__.py
- deploy_vps.sh

## God Nodes (most connected - your core abstractions)
1. `react` - 25 edges
2. `compilerOptions` - 18 edges
3. `lucide-react` - 16 edges
4. `compilerOptions` - 15 edges
5. `simulate_trajectory()` - 12 edges
6. `AdvisorAgent` - 9 edges
7. `BusinessState` - 9 edges
8. `run_cli()` - 9 edges
9. `calculate_safe_to_spend()` - 9 edges
10. `Scenario` - 6 edges

## Surprising Connections (you probably didn't know these)
- `load_initial_state()` --calls--> `BusinessState`  [EXTRACTED]
  api/server.py → core/dlmm.py
- `simulate_decision()` --uses--> `Scenario`  [INFERRED]
  api/server.py → core/dlmm.py
- `ingest_text()` --uses--> `Obligation`  [INFERRED]
  api/server.py → core/dlmm.py
- `run_cli()` --calls--> `Obligation`  [EXTRACTED]
  cli_demo.py → core/dlmm.py
- `ingest_text()` --uses--> `Receivable`  [INFERRED]
  api/server.py → core/dlmm.py

## Import Cycles
- None detected.

## Communities (24 total, 8 thin omitted)

### Community 0 - "cli_demo.py"
Cohesion: 0.09
Nodes (32): get_business_pulse(), simulate_decision(), print_banner(), Interactive CLI Runner for JagaUsaha. Specifically designed for the IDwebhost…, run_cli(), AdvisorAgent, Any, Advisor Agent & Culturally Tuned Communication Engine for JagaUsaha. Generates… (+24 more)

### Community 1 - "server.py"
Cohesion: 0.12
Nodes (27): get_negotiate_script(), get_nudge_script(), health_check(), ingest_text(), IngestRequest, load_initial_state(), NegotiateRequest, NudgeRequest (+19 more)

### Community 2 - "package.json"
Cohesion: 0.08
Nodes (22): name, private, scripts, build, dev, lint, preview, type (+14 more)

### Community 3 - "App.tsx"
Cohesion: 0.15
Nodes (14): PRESETS, PulseData, ActionFeed(), ActionFeedProps, FAQSection(), FinalCTA(), FinalCTAProps, Footer() (+6 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "matrix-orb.tsx"
Cohesion: 0.17
Nodes (14): envelope(), intensityOf(), LABELS, MatrixOrb(), MatrixOrbProps, MatrixOrbState, ORBITERS, SCALE (+6 more)

### Community 7 - "HeroSection.tsx"
Cohesion: 0.18
Nodes (8): HeroSection(), HeroSectionProps, BlurTextProps, Magnet(), MagnetProps, ShinyText(), ShinyTextProps, framer-motion

### Community 8 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @types/node, @types/react, @types/react-dom (+3 more)

### Community 9 - "PulseCards.tsx"
Cohesion: 0.24
Nodes (7): FeatureAgents(), PulseCards(), PulseCardsProps, CountUp(), CountUpProps, SpotlightCard(), SpotlightCardProps

### Community 10 - "SensorAgent"
Cohesion: 0.25
Nodes (5): ParsedTransaction, Any, Parses standard KlikBCA / m-BCA text export. Example lines: 20/09 TRSF…, Parses natural conversational WhatsApp voice-to-text notes from the owner.…, SensorAgent

### Community 11 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, clsx, framer-motion, lucide-react, react, react-dom, recharts, tailwind-merge

### Community 12 - "react"
Cohesion: 0.29
Nodes (4): TerminalDrawer(), TerminalDrawerProps, TrajectoryChartProps, react

### Community 13 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 14 - "BoardUIAgentThinking.tsx"
Cohesion: 0.33
Nodes (3): BoardUIAgentThinking(), BoardUIAgentThinkingProps, ThinkingStep

### Community 15 - "BoardUIAreaChart.tsx"
Cohesion: 0.33
Nodes (4): BoardUIAreaChart(), BoardUIAreaChartProps, ChartDataPoint, recharts

## Knowledge Gaps
- **99 isolated node(s):** `TerminalDrawerProps`, `TrajectoryChartProps`, `BoardUIAgentThinkingProps`, `BoardUIAreaChartProps`, `ChartDataPoint` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 146 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `App.tsx`, `matrix-orb.tsx`, `HeroSection.tsx`, `PulseCards.tsx`, `BoardUIAgentThinking.tsx`, `BoardUIAreaChart.tsx`, `AgentThinking.tsx`, `Header.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `App.tsx` to `package.json`, `HeroSection.tsx`, `PulseCards.tsx`, `react`, `BoardUIAgentThinking.tsx`, `BoardUIAreaChart.tsx`, `AgentThinking.tsx`, `Header.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `TerminalDrawerProps`, `TrajectoryChartProps`, `BoardUIAgentThinkingProps` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli_demo.py` be split into smaller, more focused modules?**
  _Cohesion score 0.08536585365853659 - nodes in this community are weakly interconnected._
- **Should `server.py` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._