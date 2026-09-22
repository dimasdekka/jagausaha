import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onScrollToDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToDemo }) => {
  return (
    <section className="relative w-full pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7">
        {/* Headline */}
        <h1 className="font-serif font-extralight text-5xl sm:text-7xl lg:text-[80px] leading-[1.04] tracking-[-0.03em] text-neutral-950 max-w-3xl mx-auto text-balance">
          Ketahui <span className="italic font-normal">napas kas bisnis</span> sebelum uang keluar
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal text-balance">
          Simulasikan dampak keputusan belanja modal terhadap jadwal gaji dan tempo supplier hingga 30 hari ke depan secara deterministik.
        </p>

        {/* CTA Buttons */}
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
            <span>Lihat Demo Interaktif</span>
          </button>
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
