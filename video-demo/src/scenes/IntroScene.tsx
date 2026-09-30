import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { AfterEffectsBackground } from '../components/AfterEffectsBackground';
import { KineticHeroHook } from '../components/KineticHeroHook';
import { AfterEffectsWindow3D } from '../components/AfterEffectsWindow3D';
import { AfterEffectsLowerThird } from '../components/AfterEffectsLowerThird';
import { ShieldCheck } from 'lucide-react';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reveal real application window ONLY after Phase 3 finishes at frame 1728 (57.6s)
  // Audio: "Seluruh platform canggih ini di-hosting di CloudBaik Cloud VPS..."
  const windowEnterFrame = 1728;
  const windowEnterSpring = spring({
    frame: frame - windowEnterFrame,
    fps,
    config: { damping: 26, stiffness: 45, mass: 0.9 },
  });

  const windowOpacity = interpolate(windowEnterSpring, [0, 1], [0, 1]);
  const windowScale = interpolate(windowEnterSpring, [0, 1], [0.94, 1.0]);
  const windowTranslateY = interpolate(windowEnterSpring, [0, 1], [30, 0]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-neutral-950 flex items-center justify-center">
      {/* 1. Deep Space Cyber Grid Background */}
      <AfterEffectsBackground />

      {/* 2. Kinetic Typography Hero Hook (Frames 0 - 1400 / 0s - 46.7s) */}
      <KineticHeroHook />

      {/* 3. 3D Perspective Floating Live Application Window (Frames 1400 - 1716 / 46.7s - 57.2s) */}
      {frame >= windowEnterFrame && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: windowOpacity,
            transform: `scale(${windowScale}) translateY(${windowTranslateY}px)`,
          }}
        >
          <AfterEffectsWindow3D
            imageSrc="real_captures/step1_landing_hero.png"
            title="Landing Page & Problem Analysis"
            badge="CloudBaik VPS Live"
            startFrame={windowEnterFrame}
            durationFrames={2107 - windowEnterFrame}
            panZoom={{
              scaleStart: 0.96,
              scaleEnd: 1.04,
              translateYStart: 15,
              translateYEnd: -25,
            }}
          />
        </div>
      )}

      {/* 4. Lower-Third Banner (Appears at frame 1748) */}
      {frame >= 1748 && (
        <AfterEffectsLowerThird
          title="JagaUsaha — Solusi Mandiri Likuiditas Kas UMKM"
          subtitle="Autonomous Financial Guardian · Infrastructure: CloudBaik Cloud VPS & IDwebhost AI Hosting"
          badge="PRODUK RESMI"
          badgeColor="emerald"
          icon={ShieldCheck}
          enterFrame={1748}
        />
      )}
    </div>
  );
};
