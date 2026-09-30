import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Server, ShieldCheck } from 'lucide-react';

export const GlobalWatermark: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Top-Right: Official IDwebhost AI Competition Watermark */}
      <div className="absolute top-10 right-14 flex items-center gap-3.5 bg-neutral-950/85 backdrop-blur-md border border-neutral-800/90 py-2.5 px-5 rounded-2xl shadow-xl">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-white text-base shadow-sm">
          ID
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold text-sm tracking-wide">IDwebhost</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              AI HOSTING
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 font-medium">
            CloudBaik VPS Infrastructure
          </div>
        </div>
      </div>

      {/* Top-Left: JagaUsaha Product Brand & Status */}
      <div className="absolute top-10 left-14 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-neutral-200/90 py-2.5 px-4 rounded-2xl shadow-sm">
        <div className="h-8 w-8 rounded-xl bg-neutral-950 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-950 font-bold text-sm">JagaUsaha</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-[11px] text-neutral-500 font-medium">
            Autonomous Financial Guardian
          </div>
        </div>
      </div>

      {/* Bottom-Right: Live VPS Telemetry */}
      <div className="absolute bottom-10 right-14 flex items-center gap-2.5 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 py-2 px-4 rounded-xl text-xs text-neutral-300 shadow-md">
        <Server className="h-3.5 w-3.5 text-emerald-400" />
        <span className="font-mono text-emerald-400 font-semibold">103.30.146.174:8000</span>
        <span className="text-neutral-600">|</span>
        <span className="text-neutral-400">Hermes Agent</span>
      </div>

      {/* Subtle Progress Bar along Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-200/40">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
