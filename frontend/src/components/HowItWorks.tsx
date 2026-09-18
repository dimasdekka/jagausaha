import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface HowItWorksProps {
  onSimulateCustom: (name: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onSimulateCustom }) => {
  const [businessInput, setBusinessInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessInput.trim()) {
      onSimulateCustom(businessInput.trim());
    }
  };

  return (
    <section className="py-16 sm:py-24 border-t border-neutral-200/80 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Step-by-Step Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-600">
            Alur Mudah
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-neutral-950">
            Mulai dalam hitungan menit
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Tanpa perlu pelatihan akuntansi atau konfigurasi software pembukuan yang rumit.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-sm space-y-3">
            <span className="text-2xl font-bold font-mono text-neutral-400">01.</span>
            <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
              Kirim Rekap Transaksi
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Upload mutasi rekening BCA/BRI atau cukup kirim voice note pengeluaran ke nomor WhatsApp bot JagaUsaha.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-sm space-y-3">
            <span className="text-2xl font-bold font-mono text-neutral-400">02.</span>
            <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
              JagaUsaha Hitung Duit Dingin
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Mesin matematis DLMM memisahkan dana terikat (gaji & tempo) dari uang tunai yang benar-benar aman dibelanjakan.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-sm space-y-3">
            <span className="text-2xl font-bold font-mono text-neutral-400">03.</span>
            <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
              Uji Keputusan Sebelum Eksekusi
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Saat ingin beli mesin, rekrut orang, atau ambil promo supplier, tanyakan ke agen dan lihat proyeksi kas 30 hari seketika.
            </p>
          </div>
        </div>

        {/* Handhold-Style Interactive Generator Card */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 shadow-card text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-800 border border-emerald-200/60">
            <Zap className="h-3.5 w-3.5 text-emerald-600" />
            <span>Simulasi Instan Bisnis Anda</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-tight">
              Berapa Duit Dingin usaha Anda hari ini?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              Tanpa akun. Tanpa biaya. Coba model keputusan cerdas dalam hitungan detik.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="text"
              value={businessInput}
              onChange={(e) => setBusinessInput(e.target.value)}
              placeholder="Nama Usaha (misal: Ayam Geprek Bu Siti)"
              className="w-full rounded-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-6 py-3 text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95"
            >
              <span>Simulasikan</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* 3 Value Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Siaga 24/7 di CloudBaik VPS</span>
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
