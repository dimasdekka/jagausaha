import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from 'remotion';
import { Zap, FileText, CheckCircle2 } from 'lucide-react';
import { AfterEffectsBackground } from '../components/AfterEffectsBackground';
import { AfterEffectsLowerThird } from '../components/AfterEffectsLowerThird';

export const Scene3Onboarding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame: frame - 10, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });
  // Card 1 appears at frame 729 (24.3s) when George explains uploading BCA PDF & Moka Excel
  const card1Spring = spring({ frame: frame - 729, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });
  // Card 2 appears at frame 1355 (45.2s) when George explains the Digital Twin & Safe-to-Spend
  const card2Spring = spring({ frame: frame - 1355, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });

  // Floating continuous drift
  const floatDrift = Math.sin(frame / 40) * 5;

  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col justify-center items-center px-16 py-12 text-white relative overflow-hidden">
      {/* 1. Deep Space Cyber Grid Background */}
      <AfterEffectsBackground />

      {/* 2. Floating Clean Orthogonal Modal Window Frame (Level, No 3D Tilt) */}
      <div
        className="w-[1680px] h-[860px] rounded-3xl overflow-hidden flex flex-col relative z-10"
        style={{
          transform: `scale(0.96) translateY(${floatDrift}px)`,
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.12)',
          backgroundColor: '#0c0f17',
          opacity: enterSpring,
        }}
      >
        {/* Studio Window Chrome Header */}
        <div className="h-11 bg-neutral-900/95 backdrop-blur-md px-6 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-xs font-mono text-neutral-300 font-bold flex items-center gap-2">
            <span>Unified Multi-Modal Onboarding</span>
            <span className="text-neutral-600">·</span>
            <span className="text-emerald-400">Sensor Ekstraksi Aktif</span>
          </div>
          <div className="text-[11px] text-teal-400 font-bold bg-teal-500/10 px-3 py-0.5 rounded-full border border-teal-500/30">
            Ekstraksi Otomatis
          </div>
        </div>

        {/* Real App Screenshot Image */}
        <div className="flex-1 w-full overflow-hidden relative bg-neutral-950">
          <Img
            src={staticFile('real_captures/step3_onboarding_modal.png')}
            className="w-full h-auto object-cover object-top"
          />
        </div>
      </div>

      {/* 3. Floating After Effects Highlight Cards */}
      <div className="absolute top-20 right-20 z-30 flex flex-col gap-4 max-w-md pointer-events-none">
        {/* Highlight 1: Multi-Modal Ingest */}
        <div
          className="p-5 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-teal-500/40 shadow-2xl space-y-1.5"
          style={{
            transform: `translateX(${interpolate(card1Spring, [0, 1], [60, 0])}px)`,
            opacity: card1Spring,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[11px] font-black uppercase tracking-wider">
            <FileText className="h-3 w-3" />
            <span>Dokumen Riil Transaksi</span>
          </div>
          <h4 className="text-base font-extrabold text-white">Mutasi BCA & POS Moka</h4>
          <p className="text-xs text-neutral-300 leading-relaxed font-medium">
            Mengekstrak otomatis rekening koran PDF dan laporan penjualan Excel menjadi profil likuiditas tanpa entri manual.
          </p>
        </div>

        {/* Highlight 2: Digital Twin */}
        <div
          className="p-5 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-emerald-500/40 shadow-2xl space-y-1.5"
          style={{
            transform: `translateX(${interpolate(card2Spring, [0, 1], [60, 0])}px)`,
            opacity: card2Spring,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider">
            <CheckCircle2 className="h-3 w-3" />
            <span>Digital Twin Usaha</span>
          </div>
          <h4 className="text-base font-extrabold text-white">Parameter Likuiditas Presisi</h4>
          <p className="text-xs text-neutral-300 leading-relaxed font-medium">
            Saldo kas Rp 18.5 Jt, komitmen gaji Rp 7.5 Jt, dan sewa Rp 4.2 Jt langsung siap dipetakan ke dashboard.
          </p>
          <div className="mt-2.5 p-3 rounded-xl bg-neutral-900/90 border border-emerald-500/40 text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Kalkulasi Safe-to-Spend</span>
              <span className="text-emerald-400 font-black text-xs">Rp 3.800.000</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              = Saldo (18.5 Jt) - Gaji (7.5 Jt) - Sewa (4.2 Jt) - Cadangan (3 Jt)
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lower-Third Banner */}
      <AfterEffectsLowerThird
        title="Unified Multi-Modal Onboarding: Inisialisasi Profil 1-Pintu"
        subtitle="Ekstraksi Transaksi BCA (PDF) & POS Moka (Excel) ➔ Pembentukan Digital Twin Likuiditas"
        badge="MULTI-MODAL INGEST"
        badgeColor="blue"
        icon={Zap}
        enterFrame={20}
      />
    </div>
  );
};
