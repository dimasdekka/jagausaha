import React from 'react';
import { ExpandingArrowButton } from './motion/expanding-arrow-button';

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

        <div className="pt-2 flex justify-center">
          <ExpandingArrowButton
            onClick={onStart}
            className="h-14 min-w-64 shadow-lg shadow-neutral-900/10"
          >
            Mulai Uji Coba Gratis
          </ExpandingArrowButton>
        </div>

        <p className="text-xs text-neutral-400 font-normal">
          Ditenagai oleh Hermes Agent Runtime di IDwebhost CloudBaik VPS.
        </p>
      </div>
    </section>
  );
};
