import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Server, Sparkles } from 'lucide-react';

interface LowerThirdProps {
  title?: string;
  subtitle?: string;
  badge?: string;
}

export const LowerThird: React.FC<LowerThirdProps> = ({
  title = "Infrastruktur: AI Hosting IDwebhost · CloudBaik Cloud VPS",
  subtitle = "4 Core CPU · 4GB RAM · 20GB SSD · Hermes Agent Autonomous Engine",
  badge = "OFFICIAL SPONSOR",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring (frame 10 to 40)
  const enterSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(enterSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className="absolute bottom-16 left-14 z-40 flex items-center shadow-2xl rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/95 text-white"
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* Accent Bar Left */}
      <div className="w-2.5 self-stretch bg-gradient-to-b from-amber-400 via-orange-500 to-emerald-500" />

      <div className="py-4 px-6 flex items-center gap-5">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shrink-0">
          <Server className="h-6 w-6" />
        </div>

        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {badge}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              IDwebhost AI Competition 2026
            </span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight">
            {title}
          </h3>

          <p className="text-xs text-neutral-400 font-medium mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
