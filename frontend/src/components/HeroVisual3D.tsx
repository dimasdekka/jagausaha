import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const HeroVisual3D: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none -z-10"
    >
      {/* 1. Ambient Fintech Aurora Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[520px] bg-gradient-to-tr from-emerald-500/10 via-teal-400/8 to-transparent rounded-full blur-3xl opacity-75" />
      <div className="absolute top-1/4 left-1/3 w-[380px] h-[380px] bg-emerald-400/7 rounded-full blur-2xl" />

      {/* 2. Architectural Coordinate Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 3. Left Floating 3D Asset: Ray-Traced Guardian Shield (Transparent Alpha PNG) */}
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -12, 0],
                rotateZ: [0, -2, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-16 left-2 lg:left-6 xl:left-14 hidden md:block w-36 lg:w-44 xl:w-48 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
      >
        <img
          src="/3d/shield-premium.png"
          alt="3D Guardian Shield"
          width={400}
          height={400}
          className="w-full h-auto object-contain transform -rotate-3"
          loading="eager"
        />

        {/* Floating Micro-Badge */}
        <motion.div
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-neutral-200/90 shadow-md backdrop-blur-md text-[11px] font-semibold text-neutral-900"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>JagaUsaha 24/7</span>
        </motion.div>
      </motion.div>

      {/* 4. Right Floating 3D Asset: Ray-Traced Financial Chart (Transparent Alpha PNG) */}
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, 14, 0],
                rotateZ: [0, 2.5, 0],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
        className="absolute top-20 right-2 lg:right-6 xl:right-14 hidden md:block w-36 lg:w-44 xl:w-48 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
      >
        <img
          src="/3d/chart-premium.png"
          alt="3D Financial Cash Chart"
          width={400}
          height={400}
          className="w-full h-auto object-contain transform rotate-6"
          loading="eager"
        />

        {/* Floating Micro-Badge */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-neutral-200/90 shadow-md backdrop-blur-md text-[11px] font-semibold text-neutral-900"
        >
          <span className="text-emerald-600 font-bold">100%</span>
          <span>Deterministik</span>
        </motion.div>
      </motion.div>

      {/* 5. Subtle Foreground Floating Coin Accent */}
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -8, 0],
                rotateZ: [0, 4, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        className="absolute bottom-10 left-1/4 hidden lg:block w-14 xl:w-16 opacity-70 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.06)] pointer-events-none"
      >
        <img
          src="/3d/dollar-premium.png"
          alt="3D Cash Coin"
          width={400}
          height={400}
          className="w-full h-auto object-contain transform rotate-12"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};
