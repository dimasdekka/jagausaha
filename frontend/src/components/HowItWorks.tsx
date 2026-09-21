import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface HowItWorksProps {
  onSimulateCustom: (amount: number) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onSimulateCustom }) => {
  const [customNominal, setCustomNominal] = useState('10000000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = parseFloat(customNominal.replace(/[^0-9]/g, ''));
    if (!isNaN(cleanNum) && cleanNum > 0) {
      onSimulateCustom(cleanNum);
    }
  };

  return (
    <section className="py-20 sm:py-28 border-t border-neutral-100 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Step-by-Step Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
            Get started in minutes
          </span>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-[-0.03em] leading-tight">
            Mulai dalam hitungan menit
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal">
            Tanpa perlu keahlian akuntansi atau konfigurasi software pembukuan yang rumit.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-sm space-y-3">
            <span className="text-3xl font-extralight font-serif text-neutral-400">1.</span>
            <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
              Kirim Rekap Transaksi
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Upload file mutasi PDF KlikBCA/Mandiri atau kirim voice note pengeluaran ke bot WhatsApp JagaUsaha.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-sm space-y-3">
            <span className="text-3xl font-extralight font-serif text-neutral-400">2.</span>
            <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
              Hitung "Duit Dingin"
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Mesin matematis DLMM memisahkan dana terikat (gaji & tempo) dari saldo kas yang benar-benar aman dibelanjakan.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-sm space-y-3">
            <span className="text-3xl font-extralight font-serif text-neutral-400">3.</span>
            <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
              Simulasi Sebelum Belanja
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Sebelum beli mesin atau ambil promo grosir supplier, uji keputusan di sandbox untuk memastikan kas tidak minus.
            </p>
          </div>
        </div>

        {/* Handhold-Style Interactive Generator Card */}
        <div className="rounded-3xl border border-neutral-200/90 bg-white p-8 sm:p-12 shadow-handhold text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 text-xs font-medium text-neutral-700 border border-neutral-200/60">
            <Zap className="h-3.5 w-3.5 text-neutral-900" />
            <span>Simulasi Instan Bisnis Anda</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-extralight text-3xl sm:text-4xl text-neutral-950 tracking-[-0.02em]">
              Punya rencana belanja berapa minggu ini?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              Masukkan nominal rencana belanja untuk melihat proyeksi dampaknya terhadap kas Kopi Teras Barokah.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 font-mono">Rp</span>
              <input
                type="text"
                value={customNominal}
                onChange={(e) => setCustomNominal(e.target.value)}
                placeholder="10.000.000"
                className="w-full rounded-full border border-neutral-300 bg-neutral-50 pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:bg-white transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-6 py-3 text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95"
            >
              <span>Uji Simulasi</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* 3 Value Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Real-Time di CloudBaik VPS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Bahasa Indonesia Beretika</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>100% Deterministik Tanpa Halusinasi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
