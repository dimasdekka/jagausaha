import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from 'remotion';
import { MessageSquare, Sparkles } from 'lucide-react';
import { AfterEffectsBackground } from '../components/AfterEffectsBackground';
import { AfterEffectsLowerThird } from '../components/AfterEffectsLowerThird';

export const Scene5Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame: frame - 10, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });
  const grandClosingSpring = spring({ frame: frame - 945, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });

  // Floating continuous drift
  const floatDrift = Math.sin(frame / 45) * 5;

  const showGrandBanner = frame >= 1100;

  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col justify-center items-center px-16 py-12 text-white relative overflow-hidden">
      {/* 1. Deep Space Cyber Grid Background */}
      <AfterEffectsBackground />

      {/* 2. Floating Clean Orthogonal WhatsApp Modal Window (Level, No 3D Tilt) */}
      {!showGrandBanner && (
        <div
          className="w-[1680px] h-[860px] rounded-3xl overflow-hidden flex flex-col relative z-10"
          style={{
            transform: `scale(0.96) translateY(${floatDrift}px)`,
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.12)',
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
              <span>Otomasi Lapangan — Negosiasi Vendor WhatsApp</span>
              <span className="text-neutral-600">·</span>
              <span className="text-emerald-400">1-Klik Salin Draf</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/30">
              Mitigasi Real-Time
            </div>
          </div>

          {/* Real App Screenshot Image */}
          <div className="flex-1 w-full overflow-hidden relative bg-neutral-950">
            <Img
              src={staticFile('real_captures/step6_whatsapp_modal.png')}
              className="w-full h-auto object-cover object-top"
            />
          </div>
        </div>
      )}

      {/* 3. Final Grand Closing Showcase Banner (Frames 950+) */}
      {showGrandBanner && (
        <div
          className="relative z-30 flex flex-col items-center max-w-4xl p-12 rounded-3xl bg-neutral-950/95 backdrop-blur-2xl border border-emerald-500/50 shadow-2xl text-center"
          style={{
            transform: `scale(${interpolate(grandClosingSpring, [0, 1], [0.88, 1.0])})`,
            opacity: grandClosingSpring,
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.95), 0 0 60px rgba(16,185,129,0.2)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider mb-5">
            <Sparkles className="h-4 w-4" />
            <span>IDwebhost AI Competition 2026 Showcase</span>
          </div>

          <h2 className="text-5xl font-black text-white tracking-tight leading-tight mb-3">
            JagaUsaha — Autonomous Financial Guardian
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Melindungi jutaan UMKM Indonesia dari krisis likuiditas kas melalui sensor transaksi riil, kalkulasi deterministik DLMM, dan otomasi negosiasi bisnis.
          </p>

          <div className="grid grid-cols-3 gap-5 w-full text-left mb-8">
            <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                Infrastruktur Utama
              </div>
              <div className="text-base font-extrabold text-white">CloudBaik Cloud VPS</div>
              <div className="text-xs text-neutral-400 mt-1">Ubuntu 24.04 · Port 4422</div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Komputasi & AI Engine
              </div>
              <div className="text-base font-extrabold text-white">IDwebhost AI Hosting</div>
              <div className="text-xs text-neutral-400 mt-1">Hermes Agent Framework</div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                Akses Demo Publik
              </div>
              <div className="text-base font-extrabold text-white">103.30.146.174:8000</div>
              <div className="text-xs text-neutral-400 mt-1">Kreator: Dimas Dekananta</div>
            </div>
          </div>

          <div className="text-xs text-neutral-400 font-medium">
            Terima kasih kepada IDwebhost & CloudBaik atas penyelenggaraan kompetisi ini.
          </div>
        </div>
      )}

      {/* 4. Lower-Third Banner */}
      <AfterEffectsLowerThird
        title="Otomasi Lapangan: Generator Negosiasi WhatsApp"
        subtitle="Draf Pesan Diplomatis Santun · Live URL: http://103.30.146.174:8000"
        badge="AKSI LAPANGAN"
        badgeColor="emerald"
        icon={MessageSquare}
        enterFrame={20}
      />
    </div>
  );
};
