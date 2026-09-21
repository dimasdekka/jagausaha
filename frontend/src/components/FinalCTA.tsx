import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onStart: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStart }) => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-indigo to-brand-violet text-white flex items-center justify-center mx-auto shadow-stripe">
          <ShieldCheck className="h-7 w-7 text-white" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-navy-900 max-w-2xl mx-auto leading-tight">
          Jaga napas kas bisnis Anda mulai hari ini
        </h2>

        <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
          Jangan biarkan keputusan belanja impulsif atau ilusi omset ramai menenggelamkan usaha yang sudah Anda rintis bertahun-tahun.
        </p>

        <div className="pt-2">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2.5 rounded-full bg-brand-indigo hover:bg-brand-violet text-white px-8 py-3.5 text-sm font-bold transition-all shadow-stripe hover:shadow-stripe-hover hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Mulai Uji Coba Gratis Sekarang</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Ditenagai oleh Hermes Agent Runtime di IDwebhost CloudBaik VPS.
        </p>
      </div>
    </section>
  );
};
