import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExpandingArrowButton } from './motion/expanding-arrow-button';
import { MotionButton } from './motion/button';
import { HeroVisual3D } from './HeroVisual3D';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onScrollToDemo: () => void;
  onStartTrial?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToDemo, onStartTrial }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Container Scrub Parallax
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          y: 50,
          opacity: 0.85,
          scale: 0.98,
          ease: 'none',
        });

        // 2. Left 3D Cluster Scrub Floating & Outward Rotation
        gsap.to('#hero-3d-left', {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: -80,
          x: -30,
          rotate: -8,
          opacity: 0.45,
          ease: 'power1.out',
        });

        // 3. Right 3D Cluster Scrub Floating & Outward Rotation
        gsap.to('#hero-3d-right', {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: -80,
          x: 30,
          rotate: 8,
          opacity: 0.45,
          ease: 'power1.out',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden will-change-transform"
    >
      {/* 3D Glassmorphic Assets & Coordinate Grid */}
      <HeroVisual3D />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7">
        {/* Animated Editorial Headline with Living Shimmer Effect */}
        <h1 className="font-serif font-extralight text-5xl sm:text-7xl lg:text-[80px] leading-[1.04] tracking-[-0.03em] text-neutral-950 max-w-3xl mx-auto text-balance select-none">
          Ketahui{' '}
          <span className="italic font-normal animate-text-shimmer drop-shadow-2xs">
            keamanan arus kas
          </span>{' '}
          sebelum uang keluar
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal text-balance">
          Simulasikan dampak keputusan belanja modal terhadap jadwal gaji dan tempo supplier hingga 30 hari ke depan secara deterministik.
        </p>

        {/* beUI Expanding CTA & Secondary Button */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <ExpandingArrowButton
            onClick={onStartTrial || onScrollToDemo}
            className="h-12 min-w-60 shadow-md cursor-pointer"
          >
            Mulai Uji Coba Gratis
          </ExpandingArrowButton>

          <MotionButton
            variant="outline"
            size="lg"
            onClick={onScrollToDemo}
            className="h-12 border-neutral-300 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
            <span>Lihat Demo Interaktif</span>
          </MotionButton>
        </div>

        {/* Handhold-Style Metrics Display */}
        <div className="pt-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-neutral-100 pt-8">
            <div className="text-center sm:text-left space-y-1">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums">
                14 Hari
              </div>
              <div className="text-xs text-neutral-500 leading-normal font-normal">
                Deteksi dini defisit kas sebelum jatuh tempo
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums">
                100%
              </div>
              <div className="text-xs text-neutral-500 leading-normal font-normal">
                Kalkulasi matematis deterministik tanpa halusinasi
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums">
                0 Beban
              </div>
              <div className="text-xs text-neutral-500 leading-normal font-normal">
                Ekstraksi otomatis dari mutasi bank & audio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
