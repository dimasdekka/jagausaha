import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onStart: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStart }) => {
  return (
    <section className="py-24 sm:py-36 bg-neutral-50/60 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7">
        <h2 className="font-serif font-extralight text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] text-neutral-950 max-w-2xl mx-auto leading-[1.08] text-balance">
          Lindungi ketahanan arus kas usaha Anda mulai hari ini
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal text-balance">
          Jangan biarkan keputusan belanja impulsif atau keterlambatan tagihan menenggelamkan usaha yang sudah Anda rintis bertahun-tahun.
        </p>

        <div className="pt-2">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-7 py-3.5 text-sm font-medium transition-all shadow-sm active:scale-95"
          >
            <span>Mulai Uji Coba Gratis</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-400 font-mono">
          Ditenagai oleh Hermes Agent Runtime di IDwebhost CloudBaik VPS.
        </p>
      </div>
    </section>
  );
};
