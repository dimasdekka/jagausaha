import React from 'react';
import { useCurrentFrame } from 'remotion';

export const AfterEffectsBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Floating ambient glow orbs with smooth mathematical sine/cosine drift
  const orb1X = Math.sin(frame / 60) * 120;
  const orb1Y = Math.cos(frame / 75) * 80;

  const orb2X = Math.cos(frame / 80) * 140;
  const orb2Y = Math.sin(frame / 65) * 100;

  const orb3X = Math.sin(frame / 90) * 100;
  const orb3Y = Math.sin(frame / 70) * 90;

  // Perspective grid scroll
  const gridOffsetY = (frame * 1.5) % 80;

  // Subtle breathing scale
  const bgScale = 1 + Math.sin(frame / 100) * 0.02;

  return (
    <div className="absolute inset-0 bg-[#05070e] overflow-hidden pointer-events-none z-0">
      {/* 1. Deep Space Vignette Base */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #0d1527 0%, #070a14 55%, #030408 100%)',
          transform: `scale(${bgScale})`,
        }}
      />

      {/* 2. Floating Radiant Color Orbs (After Effects Glow Aesthetic) */}
      {/* Emerald Glow (Fintech Growth & Safety) */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[160px] opacity-25"
        style={{
          top: `calc(15% + ${orb1Y}px)`,
          left: `calc(20% + ${orb1X}px)`,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0) 70%)',
        }}
      />

      {/* Deep Cyan / Azure Glow (CloudBaik VPS & AI Infrastructure) */}
      <div
        className="absolute w-[750px] h-[750px] rounded-full blur-[170px] opacity-20"
        style={{
          bottom: `calc(10% + ${orb2Y}px)`,
          right: `calc(15% + ${orb2X}px)`,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0) 70%)',
        }}
      />

      {/* Warm Amber / Gold Glow (Cash Capital & IDwebhost Competition) */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-15"
        style={{
          top: `calc(50% + ${orb3Y}px)`,
          left: `calc(50% + ${orb3X}px)`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, rgba(217, 119, 6, 0) 70%)',
        }}
      />

      {/* 3. 3D Perspective Grid Floor (Cyber Depth) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45%] opacity-15 overflow-hidden"
        style={{
          perspective: '600px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0 w-[200%] -left-[50%] h-[300%]"
          style={{
            transform: 'rotateX(72deg) translateY(-10%)',
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: `0px ${gridOffsetY}px`,
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          }}
        />
      </div>

      {/* 4. Fine Digital Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
