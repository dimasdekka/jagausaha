import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, staticFile, Img } from 'remotion';
import { TrendingDown } from 'lucide-react';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame: frame - 10, fps, config: { damping: 15 } });

  // Pan and zoom on the real dashboard showing the cash dilemma
  const scale = interpolate(frame, [0, 1800], [1, 1.15]);
  const translateY = interpolate(frame, [0, 1800], [0, -80]);

  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col justify-center items-center px-16 py-12 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-rose-500/10 blur-[150px] pointer-events-none" />

      {/* Real Application Window showing actual Dashboard & Deficit Simulation */}
      <div
        className="w-[1720px] h-[860px] rounded-3xl border border-neutral-700/80 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col relative z-10"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity: enterSpring,
        }}
      >
        {/* Browser Top Bar */}
        <div className="h-11 bg-neutral-900 px-6 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-xs font-mono text-neutral-400">
            JagaUsaha App — Dashboard Kas & Sandbox Simulasi
          </div>
          <div className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
            Uji Skenario Belanja Modal
          </div>
        </div>

        {/* Real Captured Screen */}
        <div className="flex-1 w-full overflow-hidden relative">
          <Img
            src={staticFile('real_captures/step5_simulation_alert.png')}
            className="w-full h-auto object-cover object-top"
          />
        </div>
      </div>

      {/* Floating Explainer Card on Bottom-Left */}
      <div
        className="absolute bottom-12 left-16 z-30 max-w-xl p-5 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-rose-500/40 shadow-2xl space-y-2"
        style={{
          opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <TrendingDown className="h-3.5 w-3.5" />
          Dilema Kas Nyata: Kopi Teras Barokah
        </div>
        <h3 className="text-xl font-extrabold text-white">
          Saldo BCA Rp 18.5 Jt, Belanja Mesin Rp 14 Jt ➔ Kas Defisit -Rp 2.14 Jt
        </h3>
        <p className="text-xs text-neutral-300 leading-relaxed">
          Kalkulasi real-time mendeteksi bahwa pengeluaran tunai langsung memicu kegagalan bayar gaji barista saat tanggal 30 (H+6).
        </p>
      </div>
    </div>
  );
};
