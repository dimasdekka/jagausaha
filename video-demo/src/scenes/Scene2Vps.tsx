import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import {
  Server,
  Terminal,
  Cpu,
  HardDrive,
  CheckCircle2,
  Database,
  ShieldCheck,
  Activity,
  MessageSquare,
  Bot,
  Zap,
} from 'lucide-react';
import { AfterEffectsBackground } from '../components/AfterEffectsBackground';
import { AfterEffectsLowerThird } from '../components/AfterEffectsLowerThird';

export const Scene2Vps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transition: Frame 0 - 1100 (3 AI Agents) -> Frame 1100 - 2505 (Terminal SSH & Hardware Specs)
  const isAgentPhase = frame < 1100;

  // Dynamic state for each agent card: standby, active, or settled
  const getAgentState = (agentIndex: 1 | 2 | 3) => {
    if (agentIndex === 1) {
      if (frame < 420) return { active: false, standby: true, settled: false };
      if (frame >= 420 && frame < 623) return { active: true, standby: false, settled: false };
      return { active: false, standby: false, settled: true };
    }
    if (agentIndex === 2) {
      if (frame < 623) return { active: false, standby: true, settled: false };
      if (frame >= 623 && frame < 878) return { active: true, standby: false, settled: false };
      return { active: false, standby: false, settled: true };
    }
    // agentIndex === 3
    if (frame < 878) return { active: false, standby: true, settled: false };
    if (frame >= 878 && frame < 1100) return { active: true, standby: false, settled: false };
    return { active: false, standby: false, settled: true };
  };

  const state1 = getAgentState(1);
  const state2 = getAgentState(2);
  const state3 = getAgentState(3);

  // Spring animations for Terminal & Specs (enters at frame 1100)
  const vpsHeaderSpring = spring({ frame: frame - 1100, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });
  const terminalSpring = spring({ frame: frame - 1115, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });
  const cardsSpring = spring({ frame: frame - 1135, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });

  // Continuous subtle float drift
  const floatDrift = Math.sin(frame / 45) * 4;

  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col justify-center px-16 py-10 text-white relative overflow-hidden">
      {/* 1. Deep Space Cyber Grid Background */}
      <AfterEffectsBackground />

      {/* ============================================================= */}
      {/* PHASE A: 3 AUTONOMOUS AI AGENTS SHOWCASE (Frames 0 - 1100)     */}
      {/* ============================================================= */}
      {isAgentPhase && (
        <div
          className="flex flex-col items-center justify-center w-full z-20 mx-auto"
          style={{
            opacity: interpolate(frame, [0, 20, 1070, 1100], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {/* Header 3 Agents - Centered */}
          <div
            className="flex flex-col items-center text-center max-w-4xl mb-8 mx-auto"
            style={{
              transform: `translateY(${interpolate(spring({ frame: frame - 10, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } }), [0, 1], [30, 0])}px)`,
              opacity: spring({ frame: frame - 10, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } }),
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider mb-3 shadow-lg shadow-emerald-950/40">
              <Bot className="h-3.5 w-3.5 text-emerald-400" />
              <span>Hermes Autonomous Triad: 3 Agen Otonom JagaUsaha</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
              Arsitektur Tiga Agen Finansial Otonom
            </h2>
            <p className="text-sm text-neutral-300 mt-2 font-medium max-w-2xl leading-relaxed text-center">
              Tiga agen cerdas yang saling berkolaborasi tanpa henti untuk memantau data, mensimulasikan risiko likuiditas, dan mengeksekusi mitigasi taktis.
            </p>
          </div>

          {/* 3 Agents Cards Grid - Centered in Viewport */}
          <div className="grid grid-cols-3 gap-8 w-full max-w-6xl mx-auto justify-center">
            {/* Agent 1: Sensor Agent (Activates at Frame 362 with "Pertama, Sensor Agent...") */}
            <div
              className={`p-6 rounded-3xl bg-neutral-900/90 backdrop-blur-xl shadow-2xl space-y-4 flex flex-col justify-between border transition-all duration-300 ${
                state1.active
                  ? 'border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.45)] ring-2 ring-emerald-400/50 scale-[1.03] -translate-y-2 z-10'
                  : state1.standby
                  ? 'border-neutral-800/80 opacity-40 scale-100'
                  : 'border-emerald-500/30 opacity-90 scale-100'
              }`}
              style={{
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
                    <Activity className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border transition-colors ${
                    state1.active ? 'text-emerald-300 bg-emerald-500/25 border-emerald-400' : 'text-emerald-400/70 bg-emerald-500/10 border-emerald-500/20'
                  }`}>
                    ● Live Ingestion
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Agen 1</div>
                  <h3 className="text-xl font-black text-white">Sensor Agent</h3>
                  <div className="text-xs text-neutral-400 font-semibold mt-0.5">Ekstraksi Mutasi Bank & POS</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                  Membaca rekening koran BCA (PDF) dan laporan kasir POS Moka (Excel) secara otomatis tanpa entri manual.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                <div className="text-emerald-400 font-bold">Latency: 12ms · Multi-Modal</div>
                <div>Parsing Engine: PDF / XLS / Audio</div>
              </div>
            </div>

            {/* Agent 2: Simulator Agent (Activates at Frame 527 with "Kedua, Simulator Agent...") */}
            <div
              className={`p-6 rounded-3xl bg-neutral-900/90 backdrop-blur-xl shadow-2xl space-y-4 flex flex-col justify-between border transition-all duration-300 ${
                state2.active
                  ? 'border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.45)] ring-2 ring-cyan-400/50 scale-[1.03] -translate-y-2 z-10'
                  : state2.standby
                  ? 'border-neutral-800/80 opacity-40 scale-100'
                  : 'border-cyan-500/30 opacity-90 scale-100'
              }`}
              style={{
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/50">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border transition-colors ${
                    state2.active ? 'text-cyan-300 bg-cyan-500/25 border-cyan-400' : 'text-cyan-400/70 bg-cyan-500/10 border-cyan-500/20'
                  }`}>
                    ● 0% Halusinasi
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Agen 2</div>
                  <h3 className="text-xl font-black text-white">Simulator Agent</h3>
                  <div className="text-xs text-neutral-400 font-semibold mt-0.5">Kalkulasi Deterministik DLMM</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                  Menjalankan stress-test likuiditas kas 14 hari dengan formula matematis deterministik bebas risiko halusinasi.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                <div className="text-cyan-400 font-bold">FastMath Drift: 0ms</div>
                <div>Algorithm: Dynamic Liquidity MM</div>
              </div>
            </div>

            {/* Agent 3: Advisor Agent (Activates at Frame 730 with "Dan ketiga, Advisor Agent...") */}
            <div
              className={`p-6 rounded-3xl bg-neutral-900/90 backdrop-blur-xl shadow-2xl space-y-4 flex flex-col justify-between border transition-all duration-300 ${
                state3.active
                  ? 'border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.45)] ring-2 ring-amber-400/50 scale-[1.03] -translate-y-2 z-10'
                  : state3.standby
                  ? 'border-neutral-800/80 opacity-40 scale-100'
                  : 'border-amber-500/30 opacity-90 scale-100'
              }`}
              style={{
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-950/50">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border transition-colors ${
                    state3.active ? 'text-amber-300 bg-amber-500/25 border-amber-400' : 'text-amber-400/70 bg-amber-500/10 border-amber-500/20'
                  }`}>
                    ● Preskriptif
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Agen 3</div>
                  <h3 className="text-xl font-black text-white">Advisor Agent</h3>
                  <div className="text-xs text-neutral-400 font-semibold mt-0.5">Intervensi Taktis WhatsApp</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                  Merumuskan mitigasi preskriptif DP 50% dan langsung menyusun draf negosiasi formal ke vendor secara otomatis.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                <div className="text-amber-400 font-bold">Execution: 1-Click WhatsApp</div>
                <div>Reasoning: Hermes Tactical Loop</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* PHASE B: CLOUDBAIK VPS SSH & HARDWARE SPECS (Frames 1100+)     */}
      {/* ============================================================= */}
      {!isAgentPhase && (
        <div
          className="flex flex-col justify-center w-full z-20"
          style={{
            opacity: interpolate(frame, [1100, 1125], [0, 1], {
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          {/* Header VPS */}
          <div
            className="max-w-3xl mb-6"
            style={{
              transform: `translateY(${interpolate(vpsHeaderSpring, [0, 1], [30, 0])}px)`,
              opacity: vpsHeaderSpring,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider mb-2.5 shadow-lg shadow-emerald-950/40">
              <Server className="h-3.5 w-3.5" />
              <span>Infrastruktur Resmi: IDwebhost AI Hosting & CloudBaik VPS</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
              Infrastruktur CloudBaik VPS & Hermes Agent Engine
            </h2>
            <p className="text-sm text-neutral-300 mt-1 font-medium max-w-2xl leading-relaxed">
              Didukung mesin kalkulasi deterministik bebas halusinasi dan proteksi data finansial 24/7 di data center lokal Indonesia.
            </p>
          </div>

          {/* Main Split: Terminal SSH Console (Left) + VPS Specs Cards (Right) */}
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Terminal Window with Glowing Border */}
            <div
              className="col-span-7 rounded-2xl border border-neutral-700/80 bg-neutral-950/95 shadow-2xl overflow-hidden font-mono text-xs backdrop-blur-xl"
              style={{
                transform: `translateY(${interpolate(terminalSpring, [0, 1], [35, 0]) + floatDrift}px)`,
                opacity: terminalSpring,
                boxShadow: '0 30px 80px -15px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-5 py-3 bg-neutral-900 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/90 shadow-xs shadow-rose-500/50" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/90 shadow-xs shadow-amber-500/50" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-xs shadow-emerald-500/50" />
                </div>
                <div className="text-neutral-300 text-[11px] font-bold flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                  <span>root@cloudbaik-vps:~ (ssh -p 4422 root@103.30.146.174)</span>
                </div>
                <div className="text-emerald-400 text-[10px] font-bold bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                  UBUNTU 24.04 LTS
                </div>
              </div>

              {/* Terminal Body with Real Systemd Telemetry */}
              <div className="p-5 space-y-2 text-neutral-200 leading-relaxed text-[11.5px]">
                <div>
                  <span className="text-emerald-400 font-bold">root@cloudbaik-vps</span>:<span className="text-cyan-400">~#</span> systemctl status jagausaha.service
                </div>

                <div className="space-y-1 pt-1.5 text-[11px] text-neutral-300 border-t border-neutral-800/80">
                  <div className="text-neutral-200 font-semibold">● jagausaha.service - JagaUsaha Core Engine (IDwebhost AI Hosting)</div>
                  <div className="text-neutral-400">   Loaded: loaded (/etc/systemd/system/jagausaha.service; enabled; vendor preset: enabled)</div>
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Active: active (running) since Mon 2026-09-29 02:00:15 WIB · 4h 22m ago</span>
                  </div>
                  <div className="text-neutral-400"> Main PID: 18420 (uvicorn) · Tasks: 4 · Memory: 142.4M (Peak: 186.2M) · CPU: 1.82s</div>
                  <div className="text-neutral-400">   CGroup: /system.slice/jagausaha.service</div>

                  {/* Real Service Execution Logs */}
                  <div className="pt-2 text-[10.5px] text-neutral-300 space-y-0.5 border-t border-neutral-800/80 font-mono">
                    <div className="text-neutral-400">Sep 29 02:00:15 cloudbaik uvicorn[18420]: [INFO] Started backend server process [18420]</div>
                    <div className="text-emerald-400/90">Sep 29 02:00:16 cloudbaik uvicorn[18420]: [INFO] Uvicorn running on http://103.30.146.174:8000</div>
                    <div className="text-cyan-400/90">Sep 29 02:00:17 cloudbaik uvicorn[18420]: [INFO] DLMM FastMath Engine loaded (0ms latency, zero drift)</div>
                    <div className="text-amber-400/90">Sep 29 02:00:18 cloudbaik uvicorn[18420]: [INFO] SQLite WAL Mode enabled: Database integrity verified</div>
                    <div className="text-emerald-400 font-semibold">Sep 29 02:00:19 cloudbaik uvicorn[18420]: [INFO] Autonomous Financial Guardian: ACTIVE & READY</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Server Specification Cards with Context-Accurate Badges */}
            <div
              className="col-span-5 space-y-3"
              style={{
                transform: `translateY(${interpolate(cardsSpring, [0, 1], [35, 0])}px)`,
                opacity: cardsSpring,
              }}
            >
              {/* Spec 1: CPU -> Badge: High-Compute */}
              <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 font-medium">Prosesor Cloud VPS</div>
                    <div className="text-sm font-bold text-white">4 Core AMD EPYC Dedicated</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  High-Compute
                </span>
              </div>

              {/* Spec 2: RAM -> Badge: Low-Latency */}
              <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 font-medium">Kapasitas RAM</div>
                    <div className="text-sm font-bold text-white">4 GB DDR4 Server-Grade</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  Low-Latency
                </span>
              </div>

              {/* Spec 3: Storage -> Badge: High-IOPS */}
              <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <HardDrive className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 font-medium">Media Penyimpanan Cepat</div>
                    <div className="text-sm font-bold text-white">20 GB NVMe Gen4 SSD</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-sky-400 bg-sky-500/15 px-2.5 py-1 rounded-lg border border-sky-500/30">
                  High-IOPS
                </span>
              </div>

              {/* Spec 4: Software Stack -> Badge: Zero-Locking */}
              <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400 font-medium">Basis Data & Keamanan</div>
                    <div className="text-sm font-bold text-white">SQLite WAL Mode & FastAPI</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-purple-400 bg-purple-500/15 px-2.5 py-1 rounded-lg border border-purple-500/30">
                  Zero-Locking
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Lower-Third Banner */}
      <AfterEffectsLowerThird
        title={
          isAgentPhase
            ? 'Hermes Autonomous Triad: Sensor · Simulator · Advisor'
            : 'Infrastruktur: AI Hosting IDwebhost · CloudBaik VPS'
        }
        subtitle={
          isAgentPhase
            ? 'Sensor Transaksi Otomatis ➔ Kalkulasi Deterministik DLMM ➔ Intervensi WhatsApp'
            : 'Port SSH 4422 · Ubuntu 24.04 LTS · 4 Core CPU · 4GB RAM · FastAPI Service Active'
        }
        badge={isAgentPhase ? '3 AGEN OTONOM' : 'INFRASTRUKTUR RESMI'}
        badgeColor={isAgentPhase ? 'emerald' : 'amber'}
        icon={ShieldCheck}
        enterFrame={isAgentPhase ? 20 : 1120}
        exitFrame={isAgentPhase ? 1075 : undefined}
      />
    </div>
  );
};
