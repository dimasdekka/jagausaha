import React from 'react';
import { Play } from 'lucide-react';
import { ExpandingArrowButton } from './motion/expanding-arrow-button';
import { MotionButton } from './motion/button';
import { Marquee } from './motion/marquee';

interface HeroSectionProps {
  onScrollToDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToDemo }) => {
  const ecosystems = [
    { label: "BCA KlikBCA / e-Banking", type: "Bank Terhubung" },
    { label: "Bank Mandiri Livin", type: "Mutasi Otomatis" },
    { label: "BRImo Korporat", type: "Rekening Usaha" },
    { label: "QRIS Nasional", type: "Bon Dinamis" },
    { label: "IDwebhost CloudBaik VPS", type: "Infrastruktur Cloud" },
    { label: "Hermes Agent Framework", type: "Arsitektur AI" },
    { label: "WhatsApp Business API", type: "Komunikasi Santun" },
    { label: "POS Moka & Pawoon", type: "Sinkronisasi Kasir" },
  ];

  return (
    <section className="relative w-full pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7">
        {/* Headline */}
        <h1 className="font-serif font-extralight text-5xl sm:text-7xl lg:text-[80px] leading-[1.04] tracking-[-0.03em] text-neutral-950 max-w-3xl mx-auto text-balance">
          Ketahui <span className="italic font-normal">keamanan arus kas</span> sebelum uang keluar
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal text-balance">
          Simulasikan dampak keputusan belanja modal terhadap jadwal gaji dan tempo supplier hingga 30 hari ke depan secara deterministik.
        </p>

        {/* beUI Expanding CTA & Secondary Button */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <ExpandingArrowButton
            onClick={onScrollToDemo}
            className="h-12 min-w-60 shadow-md"
          >
            Mulai Uji Coba Gratis
          </ExpandingArrowButton>

          <MotionButton
            variant="outline"
            size="lg"
            onClick={onScrollToDemo}
            className="h-12 border-neutral-300"
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

        {/* beUI Infinite Marquee Ecosystem Bar */}
        <div className="pt-10 max-w-3xl mx-auto border-t border-neutral-100/80">
          <div className="text-[11px] font-medium text-neutral-400 mb-3 tracking-wide uppercase">
            Terhubung Langsung dengan Ekosistem Perbankan & UMKM Indonesia
          </div>
          <Marquee speed={25} gap="1.5rem" className="py-1">
            {ecosystems.map((eco, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200/60 text-xs text-neutral-700 whitespace-nowrap shadow-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-neutral-900">{eco.label}</span>
                <span className="text-[10px] text-neutral-400">· {eco.type}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
