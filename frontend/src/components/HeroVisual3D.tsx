import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, TrendingUp, CheckCircle2, Zap } from 'lucide-react';

export const HeroVisual3D: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none -z-10"
    >
      {/* 1. Ambient Fintech Aurora Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[840px] h-[560px] bg-gradient-to-tr from-emerald-500/12 via-teal-400/8 to-transparent rounded-full blur-3xl opacity-80" />
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-emerald-400/8 rounded-full blur-2xl" />

      {/* 2. Architectural Coordinate Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* ========================================================================= */}
      {/* 3. LEFT 3D CLUSTER: Guardian & Security Suite (Mirrors image_f91f3c.png)   */}
      {/* ========================================================================= */}
      <div className="absolute top-12 left-0 sm:left-2 lg:left-6 xl:left-12 hidden md:block w-64 lg:w-72 xl:w-80 h-[480px]">
        {/* Main 3D Asset: Ray-Traced Guardian Shield */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -12, 0],
                  rotateZ: [-3, -1, -3],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-8 left-6 w-36 lg:w-44 xl:w-48 filter drop-shadow-[0_24px_45px_rgba(0,0,0,0.12)]"
        >
          <img
            src="/3d/shield-premium.png"
            alt="3D Guardian Shield"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </motion.div>

        {/* Secondary 3D Asset: Gold Shackle Security Padlock */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, 10, 0],
                  rotateZ: [8, 12, 8],
                }
          }
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
          className="absolute top-44 left-0 w-24 lg:w-28 xl:w-32 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.14)]"
        >
          <img
            src="/3d/lock-premium.png"
            alt="3D Security Lock"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </motion.div>

        {/* Floating Accent: 3D Gold Coin */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -8, 0],
                  rotateZ: [15, 20, 15],
                }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
          className="absolute top-2 left-36 w-14 lg:w-16 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.1)]"
        >
          <img
            src="/3d/dollar-premium.png"
            alt="3D Cash Token"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Tilted Floating Telemetry Sticker: BCA Terhubung (Mirrors sticker tags) */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, 6, 0],
                  rotateZ: [-5, -3, -5],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute top-28 left-24 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 border border-neutral-200/90 shadow-xl shadow-neutral-900/[0.06] backdrop-blur-xl"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <Shield className="h-3.5 w-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold text-neutral-950 flex items-center gap-1">
              <span>BCA Terhubung</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[9.5px] text-neutral-500 font-medium leading-none mt-0.5">
              Proteksi Kas 24/7
            </div>
          </div>
        </motion.div>

        {/* Second Tilted Micro-Badge: Verifikasi Aman */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -6, 0],
                  rotateZ: [4, 6, 4],
                }
          }
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-72 left-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-neutral-200/80 shadow-md backdrop-blur-md text-[10.5px] font-semibold text-neutral-800"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>Anti-Defisit Aktif</span>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 4. RIGHT 3D CLUSTER: Treasury & Forecast Suite (Mirrors image_f91f3c.png) */}
      {/* ========================================================================= */}
      <div className="absolute top-12 right-0 sm:right-2 lg:right-6 xl:right-12 hidden md:block w-64 lg:w-72 xl:w-80 h-[480px]">
        {/* Main 3D Asset: Ray-Traced Leather Wallet & Gold Cards */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, 14, 0],
                  rotateZ: [6, 4, 6],
                }
          }
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          className="absolute top-10 right-4 w-36 lg:w-44 xl:w-48 filter drop-shadow-[0_24px_45px_rgba(0,0,0,0.12)]"
        >
          <img
            src="/3d/wallet-premium.png"
            alt="3D Cash Wallet & Cards"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </motion.div>

        {/* Secondary 3D Asset: Metallic Tiered Cash Flow Chart */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -10, 0],
                  rotateZ: [-6, -9, -6],
                }
          }
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
          className="absolute top-48 right-2 w-28 lg:w-32 xl:w-36 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.13)]"
        >
          <img
            src="/3d/chart-premium.png"
            alt="3D Financial Cash Chart"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </motion.div>

        {/* Floating Accent: 3D Fast Alert Flash */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, 8, 0],
                  rotateZ: [-12, -16, -12],
                }
          }
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.9,
          }}
          className="absolute top-4 right-36 w-14 lg:w-16 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.1)]"
        >
          <img
            src="/3d/flash-premium.png"
            alt="3D Fast Alert Token"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Tilted Floating Telemetry Sticker: Proyeksi Kas 30 Hari */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -6, 0],
                  rotateZ: [5, 3, 5],
                }
          }
          transition={{
            duration: 5.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
          className="absolute top-32 right-24 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 border border-neutral-200/90 shadow-xl shadow-neutral-900/[0.06] backdrop-blur-xl"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
            <TrendingUp className="h-3.5 w-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold text-neutral-950 flex items-center gap-1">
              <span>Runway: 30 Hari</span>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">Aman</span>
            </div>
            <div className="text-[9.5px] text-neutral-500 font-medium leading-none mt-0.5">
              100% Deterministik
            </div>
          </div>
        </motion.div>

        {/* Second Tilted Micro-Badge: Deteksi Dini */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, 6, 0],
                  rotateZ: [-4, -6, -4],
                }
          }
          transition={{
            duration: 6.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.1,
          }}
          className="absolute top-72 right-12 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-neutral-200/80 shadow-md backdrop-blur-md text-[10.5px] font-semibold text-neutral-800"
        >
          <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span>Deteksi H-14 Dini</span>
        </motion.div>
      </div>
    </div>
  );
};
