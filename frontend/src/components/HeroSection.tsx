import React from 'react';
import { ArrowRight, Play, Quote } from 'lucide-react';
import { ShinyText } from './reactbits/ShinyText';
import { Magnet } from './reactbits/Magnet';
import { CountUp } from './reactbits/CountUp';

interface HeroSectionProps {
  onScrollToDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToDemo }) => {
  return (
    <section className="relative w-full pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* ReactBits Shiny Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-white text-xs font-medium shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <ShinyText text="AI Autonomous Guardian · AI HackFest 2026" speed={3.5} />
        </div>

        {/* Big Handhold H1 Headline (Crisp, Razor-sharp, Handhold style) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-neutral-950 leading-[1.08] max-w-4xl mx-auto">
          Ketahui napas bisnis sebelum uang keluar
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
          AI agent yang menyimulasikan keputusan belanja, mendeteksi benturan kas hingga 30 hari ke depan, dan menghentikan kebangkrutan sebelum terjadi.
        </p>

        {/* ReactBits Magnet CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Magnet magnetStrength={3} padding={30}>
            <button
              onClick={onScrollToDemo}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 px-6 py-3 text-sm font-medium text-neutral-900 transition-all shadow-sm active:scale-95"
            >
              <Play className="h-4 w-4 fill-neutral-900 text-neutral-900" />
              <span>Lihat AI Demo</span>
            </button>
          </Magnet>

          <Magnet magnetStrength={3} padding={30}>
            <button
              onClick={onScrollToDemo}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-6 py-3 text-sm font-medium transition-all shadow-sm active:scale-95"
            >
              <span>Mulai Uji Coba Gratis</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </Magnet>
        </div>

        {/* Handhold Social Proof & Testimonial Pill */}
        <div className="pt-8 max-w-2xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium text-neutral-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100/80 border border-neutral-200">
              <span className="font-bold text-neutral-950">
                <CountUp to={14} suffix=" Hari" duration={0.8} />
              </span>
              <span className="text-neutral-500">deteksi defisit lebih awal</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100/80 border border-neutral-200">
              <span className="font-bold text-neutral-950">0 Beban</span>
              <span className="text-neutral-500">pencatatan buku kas manual</span>
            </div>
          </div>

          {/* Testimonial Quote Pill */}
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm text-left flex items-start gap-3.5">
            <Quote className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <p className="italic">
                “JagaUsaha menyelamatkan kami dari kebangkrutan saat hampir beli mesin espresso 14 juta tunai tepat 6 hari sebelum jadwal gaji 3 karyawan...”
              </p>
              <div className="mt-2 flex items-center gap-2 not-italic">
                <div className="h-6 w-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
                  A
                </div>
                <span className="font-semibold text-neutral-900">Arif Wicaksono</span>
                <span className="text-neutral-400">·</span>
                <span className="text-neutral-500">Owner Kopi Teras Barokah, Tebet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
