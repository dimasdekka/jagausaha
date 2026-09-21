import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onScrollToDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToDemo }) => {
  return (
    <section className="relative w-full pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/80 bg-neutral-50 text-xs text-neutral-600 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>AI Autonomous Guardian · AI HackFest 2026</span>
        </div>

        {/* Handhold-Exact Extralight Serif Headline with Italic Accent */}
        <h1 className="font-serif font-extralight text-5xl sm:text-7xl lg:text-[80px] leading-[1.04] tracking-[-0.03em] text-neutral-950 max-w-3xl mx-auto text-balance">
          Ketahui <span className="italic font-normal">napas kas bisnis</span> sebelum uang keluar
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal text-balance">
          AI guardian yang menyimulasikan keputusan belanja, mendeteksi benturan kas hingga 30 hari ke depan, dan mencegah kebangkrutan kas secara otomatis.
        </p>

        {/* Handhold Pill CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onScrollToDemo}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-7 py-3.5 text-sm font-medium transition-all shadow-sm active:scale-95"
          >
            <span>Mulai Uji Coba Gratis</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onScrollToDemo}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 px-6 py-3.5 text-sm font-medium text-neutral-900 transition-all shadow-sm active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
            <span>Lihat AI Demo</span>
          </button>
        </div>

        {/* Handhold-Exact Borderless Metrics Dock */}
        <div className="pt-6 flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-600 bg-neutral-50/80 px-8 py-3 rounded-full border border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-950 text-sm font-mono">14 Hari</span>
              <span className="text-neutral-500">deteksi defisit lebih awal</span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-neutral-300" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-950 text-sm font-mono">0 Beban</span>
              <span className="text-neutral-500">input manual pembukuan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
