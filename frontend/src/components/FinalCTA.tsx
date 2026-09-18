import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onStart: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStart }) => {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="h-12 w-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mx-auto shadow-md">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-950 max-w-2xl mx-auto leading-tight">
          Jaga napas bisnis Anda mulai hari ini
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Jangan biarkan keputusan belanja impulsif atau keterlambatan tagihan menenggelamkan usaha yang sudah Anda bangun bertahun-tahun.
        </p>

        <div className="pt-2">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-8 py-3.5 text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <span>Mulai Uji Coba Gratis Sekarang</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-400 font-medium">
          Ditenagai oleh Hermes Agent Runtime di IDwebhost CloudBaik VPS.
        </p>
      </div>
    </section>
  );
};
