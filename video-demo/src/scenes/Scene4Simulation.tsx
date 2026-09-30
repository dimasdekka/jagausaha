import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from 'remotion';
import { AlertTriangle, ShieldCheck, TrendingDown } from 'lucide-react';
import { AfterEffectsBackground } from '../components/AfterEffectsBackground';
import { AfterEffectsLowerThird } from '../components/AfterEffectsLowerThird';
import { AnimatedCashChart } from '../components/AnimatedCashChart';

export const Scene4Simulation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame: frame - 10, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });
  // Alert card appears at frame 964 (32.1s) when George announces the DLMM deficit alarm
  const alertCardSpring = spring({ frame: frame - 964, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });
  // Solution card appears at frame 1673 (55.8s) when George explains the DP 50% mitigation
  const solCardSpring = spring({ frame: frame - 1673, fps, config: { damping: 26, stiffness: 45, mass: 0.9 } });

  // Deficit shock impact shake (Frames 964 - 989)
  const shakeIntensity = frame >= 964 && frame <= 989 ? Math.sin(frame * 2.8) * 4 : 0;

  // Floating continuous drift
  const floatDrift = Math.sin(frame / 45) * 5;

  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col justify-center items-center px-16 py-12 text-white relative overflow-hidden">
      {/* 1. Deep Space Cyber Grid Background */}
      <AfterEffectsBackground />

      {/* Crimson Alert Flash Vignette on Deficit Impact */}
      {frame >= 750 && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(244, 63, 94, 0.22) 100%)',
            opacity: interpolate(frame, [750, 770, 810], [0, 1, 0.4], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        />
      )}

      {/* 2. Floating Clean Orthogonal Simulation Sandbox Window (Level, No 3D Tilt) */}
      <div
        className="w-[1680px] h-[860px] rounded-3xl overflow-hidden flex flex-col relative z-10"
        style={{
          transform: `scale(0.96) translateY(${floatDrift + shakeIntensity}px)`,
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
            <span>Decision Intelligence Studio</span>
            <span className="text-neutral-600">·</span>
            <span className="text-rose-400">DLMM FastMath v1.0 Core</span>
          </div>
          <div className="text-[11px] text-rose-400 font-bold bg-rose-500/15 px-3 py-0.5 rounded-full border border-rose-500/30">
            Deteksi Defisit Aktif
          </div>
        </div>

        {/* Real App Screenshot Image */}
        <div className="flex-1 w-full overflow-hidden relative bg-neutral-950">
          <Img
            src={staticFile('real_captures/step5_simulation_alert.png')}
            className="w-full h-auto object-cover object-top"
          />
        </div>
      </div>

      {/* 2b. Floating Interactive Animated Cash Chart (After Effects Motion Graphic) */}
      {frame >= 1010 && (
        <div
          className="absolute left-16 bottom-28 z-30 pointer-events-none"
          style={{
            transform: `scale(0.88) translateY(${floatDrift}px)`,
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.95))',
          }}
        >
          <AnimatedCashChart startFrame={1015} showMitigationAt={1673} width={920} height={390} />
        </div>
      )}

      {/* 3. Floating After Effects Highlight Badges */}
      <div className="absolute top-20 right-20 z-30 flex flex-col gap-4 max-w-md pointer-events-none">
        {/* Highlight 1: The Deficit Danger */}
        <div
          className="p-5 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-rose-500/50 shadow-2xl shadow-rose-950/40 space-y-1.5"
          style={{
            transform: `translateX(${interpolate(alertCardSpring, [0, 1], [60, 0])}px)`,
            opacity: alertCardSpring,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[11px] font-black uppercase tracking-wider">
            <AlertTriangle className="h-3 w-3 text-rose-400" />
            <span>Peringatan Bahaya Kas</span>
          </div>
          <h4 className="text-base font-extrabold text-rose-300">Defisit Kas Hari ke-6 (-Rp 3.374.640)</h4>
          <p className="text-xs text-neutral-300 leading-relaxed font-medium">
            Pembelian tunai Rp 14 Jt langsung menenggelamkan saldo kas di bawah batas aman saat gajian barista tiba.
          </p>
        </div>

        {/* Highlight 2: The DP 50% Solution */}
        <div
          className="p-5 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-emerald-500/50 shadow-2xl shadow-emerald-950/40 space-y-1.5"
          style={{
            transform: `translateX(${interpolate(solCardSpring, [0, 1], [60, 0])}px)`,
            opacity: solCardSpring,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span>Rekomendasi AI Preskriptif</span>
          </div>
          <h4 className="text-base font-extrabold text-emerald-300">Terapkan DP 50% (Rp 7 Jt)</h4>
          <p className="text-xs text-neutral-300 leading-relaxed font-medium">
            Saldo kas seketika pulih aman (+Rp 4.2 Jt di atas cadangan), bisnis terlindungi dari risiko kehabisan uang.
          </p>
        </div>
      </div>

      {/* 4. Lower-Third Banner */}
      <AfterEffectsLowerThird
        title="Decision Studio: Safe-to-Spend DLMM FastMath v1.0"
        subtitle="Interaksi Suara (VoiceBeam) · Deteksi Bahaya Defisit H+6 ➔ Solusi Terapkan DP 50%"
        badge="SIMULASI PREDIKTIF"
        badgeColor="rose"
        icon={TrendingDown}
        enterFrame={20}
        exitFrame={990}
      />
    </div>
  );
};
