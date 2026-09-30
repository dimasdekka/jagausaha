import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';
import { Server } from 'lucide-react';

export interface Window3DProps {
  imageSrc: string;
  title: string;
  badge?: string;
  panZoom?: {
    scaleStart?: number;
    scaleEnd?: number;
    translateYStart?: number;
    translateYEnd?: number;
    rotateXStart?: number;
    rotateXEnd?: number;
    rotateYStart?: number;
    rotateYEnd?: number;
  };
  startFrame?: number;
  durationFrames?: number;
}

export const AfterEffectsWindow3D: React.FC<Window3DProps> = ({
  imageSrc,
  title,
  badge = 'Live CloudBaik VPS',
  panZoom = {},
  startFrame = 0,
  durationFrames = 1800,
}) => {
  const frame = useCurrentFrame();

  const {
    scaleStart = 0.95,
    scaleEnd = 1.03,
    translateYStart = 20,
    translateYEnd = -20,
  } = panZoom;

  const safeDuration = Math.max(10, durationFrames);
  const endFrame = startFrame + safeDuration;

  const currentScale = interpolate(frame, [startFrame, endFrame], [scaleStart, scaleEnd], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentTranslateY = interpolate(frame, [startFrame, endFrame], [translateYStart, translateYEnd], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle continuous breathing drift (After Effects natural physics)
  const floatDrift = Math.sin(frame / 40) * 6;

  // Animated border-beam sweep along the outer edge
  const beamAngle = (frame * 1.5) % 360;

  return (
    <div
      className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none"
    >
      {/* Level, Clean Orthogonal Container with Multi-Layer Studio Shadows (No 3D Tilt) */}
      <div
        className="w-[1720px] h-[900px] rounded-3xl overflow-hidden flex flex-col relative"
        style={{
          transform: `
            scale(${currentScale}) 
            translateY(${currentTranslateY + floatDrift}px)
          `,
          boxShadow: `
            0 45px 120px -20px rgba(0, 0, 0, 0.95),
            0 0 0 1px rgba(255, 255, 255, 0.12),
            0 0 50px -10px rgba(16, 185, 129, 0.15)
          `,
          backgroundColor: '#0c0f17',
        }}
      >
        {/* Animated Border Beam Rim */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-30"
          style={{
            padding: '1.5px',
            background: `conic-gradient(from ${beamAngle}deg at 50% 50%, transparent 0deg, rgba(16, 185, 129, 0.9) 60deg, rgba(56, 189, 248, 0.9) 120deg, transparent 180deg)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
          }}
        />

        {/* Studio Window Chrome Header */}
        <div className="h-12 bg-neutral-900/95 backdrop-blur-md px-6 flex items-center justify-between border-b border-neutral-800 shrink-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full bg-rose-500/80 shadow-xs shadow-rose-500/50" />
            <span className="h-3.5 w-3.5 rounded-full bg-amber-500/80 shadow-xs shadow-amber-500/50" />
            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/80 shadow-xs shadow-emerald-500/50" />
          </div>

          <div className="flex items-center gap-3 bg-neutral-950/80 px-4 py-1 rounded-xl border border-neutral-800 text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              103.30.146.174:8000
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-400 font-medium">{title}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            <Server className="h-3.5 w-3.5" />
            <span>{badge} · 14ms</span>
          </div>
        </div>

        {/* Real App Screenshot Image with Cinematic Vignette */}
        <div className="flex-1 w-full overflow-hidden relative bg-neutral-950">
          <Img
            src={staticFile(imageSrc)}
            className="w-full h-auto object-cover object-top"
          />

          {/* Bottom subtle edge vignette */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-950/80 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
