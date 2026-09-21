import React from 'react';
import { ArrowRight, Play, Shield, Calendar, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToDemo }) => {
  return (
    <section className="relative w-full pt-14 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Stripe Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
          <span>AI Autonomous Guardian · AI HackFest 2026</span>
          <span className="text-slate-300">|</span>
          <span className="text-brand-indigo font-bold">Business Automation</span>
        </div>

        {/* Stripe Authority Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-navy-900 leading-[1.08] max-w-4xl mx-auto font-sans">
          Ketahui napas kas bisnis <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-indigo via-brand-violet to-navy-900">
            sebelum uang keluar
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
          JagaUsaha menyimulasikan dampak keputusan belanja terhadap jadwal gaji dan tempo supplier hingga 30 hari ke depan secara deterministik.
        </p>

        {/* Stripe CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onScrollToDemo}
            className="inline-flex items-center gap-2.5 rounded-full bg-brand-indigo hover:bg-brand-violet text-white px-7 py-3.5 text-sm font-bold transition-all shadow-stripe hover:shadow-stripe-hover hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Uji Sandbox Simulasi Kas</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onScrollToDemo}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-all shadow-sm active:scale-95"
          >
            <Play className="h-4 w-4 fill-navy-900 text-navy-900" />
            <span>Lihat Alur Kerja AI</span>
          </button>
        </div>

        {/* Floating Value Bar */}
        <div className="pt-6 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-stripe backdrop-blur-md flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-navy-900">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Duit Dingin</div>
                <div className="text-xs font-bold text-emerald-700">Safe-to-Spend</div>
              </div>
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Peringatan Defisit</div>
                <div className="text-xs font-bold text-amber-700">14 Hari Sebelum Crash</div>
              </div>
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-50 text-brand-indigo flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Akurasi Perhitungan</div>
                <div className="text-xs font-bold text-brand-indigo">100% Deterministik</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
