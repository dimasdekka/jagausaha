import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Server } from 'lucide-react';

export const AfterEffectsWatermark: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* 1. Corner Sponsor Watermark (IDwebhost AI Competition 2026) */}
      <div className="absolute top-8 right-12 flex items-center gap-3.5 bg-neutral-950/90 backdrop-blur-xl border border-neutral-700/80 py-2.5 px-5 rounded-2xl shadow-2xl shadow-black/80">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="text-white font-extrabold text-sm tracking-tight">
              IDwebhost AI Hosting
            </span>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 tracking-wider">
              HACKATHON 2026
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5 mt-0.5">
            <Server className="h-3 w-3 text-sky-400" />
            <span>CloudBaik VPS · 103.30.146.174</span>
          </div>
        </div>
      </div>

      {/* 2. Global Bottom Gradient Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-900/60 backdrop-blur-xs">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 shadow-[0_0_12px_#10B981]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
