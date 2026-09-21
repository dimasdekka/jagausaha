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
    <section className="py-16 sm:py-24 border-t border-slate-200 bg-slate-50/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Step-by-Step Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo font-mono">
            Alur Implementasi Cepat
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-navy-900">
            Mulai dalam hitungan menit
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-normal">
            Tanpa perlu keahlian akuntansi atau konfigurasi software pembukuan yang rumit.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-stripe-card space-y-3">
            <span className="text-2xl font-black font-mono text-brand-indigo">01.</span>
            <h3 className="text-lg font-bold text-navy-900 tracking-tight">
              Kirim Rekap Transaksi
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cukup upload file mutasi PDF KlikBCA/Mandiri atau kirim voice note pengeluaran ke bot WhatsApp JagaUsaha.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-stripe-card space-y-3">
            <span className="text-2xl font-black font-mono text-brand-indigo">02.</span>
            <h3 className="text-lg font-bold text-navy-900 tracking-tight">
              Hitung "Duit Dingin"
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mesin matematis DLMM memisahkan dana terikat (gaji & tempo) dari saldo kas yang benar-benar aman dibelanjakan.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-stripe-card space-y-3">
            <span className="text-2xl font-black font-mono text-brand-indigo">03.</span>
            <h3 className="text-lg font-bold text-navy-900 tracking-tight">
              Simulasi Sebelum Eksekusi
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Sebelum beli mesin atau ambil promo grosir supplier, uji keputusan di sandbox untuk memastikan kas tidak minus.
            </p>
          </div>
        </div>

        {/* Stripe Custom Simulator Tester Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-stripe text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-xs font-bold text-brand-indigo border border-indigo-200">
            <Zap className="h-3.5 w-3.5 text-brand-indigo" />
            <span>Uji Pengeluaran Kustom Anda</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Punya rencana belanja berapa minggu ini?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Masukkan nominal rencana belanja untuk melihat proyeksi dampaknya terhadap kas Kopi Teras Barokah.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">Rp</span>
              <input
                type="text"
                value={customNominal}
                onChange={(e) => setCustomNominal(e.target.value)}
                placeholder="10.000.000"
                className="w-full rounded-full border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-xs sm:text-sm font-bold text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:bg-white transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-brand-indigo hover:bg-brand-violet text-white px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-stripe-card active:scale-95"
            >
              <span>Uji Simulasi</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* 3 Value Points */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Real-Time di CloudBaik VPS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Etika Bahasa Indonesia</span>
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
