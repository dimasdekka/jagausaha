import React from 'react';
import {
  History,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { AnimatedBadge } from '../motion/animated-badge';

export const DashboardMemoryView: React.FC = () => {
  const memories = [
    {
      id: 'mem-1',
      period: 'Agustus 2026',
      title: 'Restrukturisasi Mesin Espresso: DP 50% vs Tunai 100%',
      category: 'Belanja Modal (CapEx)',
      scenarioTested: 'Beli tunai Rp 14.0 Jt vs DP 50% (Rp 7.0 Jt) tempo 30 hari',
      rationale: 'Mencegah saldo kas defisit -Rp 3.0 Jt saat tanggal gajian barista (H+6)',
      simulatedBenefit: 'Kas likuid terlindungi Rp 7.000.000',
      actualOutcome: 'Toko sukses melewati gajian tanpa pinjaman darurat. Pelunasan sisa tempo tertutup lancar dari omset bulan berikutnya.',
      status: 'VERIFIED_SUCCESS',
      badge: 'Menyelamatkan Likuiditas',
      badgeType: 'success' as const,
    },
    {
      id: 'mem-2',
      period: 'Juli 2026',
      title: 'Akselerasi Penagihan Piutang Pemda via WhatsApp QRIS Santun',
      category: 'Manajemen Piutang (AR)',
      scenarioTested: 'Kirim reminder santun dengan tautan bayar instan QRIS H-3 sebelum tempo sewa',
      rationale: 'Cadangan kas tipis menjelang pembayaran sewa ruko Rp 4.000.000',
      simulatedBenefit: 'Percepatan inflow kas +Rp 5.000.000',
      actualOutcome: 'Bendahara Pemda melunasi dalam 48 jam. Tidak terjadi benturan sewa ruko.',
      status: 'VERIFIED_SUCCESS',
      badge: 'Piutang Cair Lebih Awal',
      badgeType: 'info' as const,
    },
    {
      id: 'mem-3',
      period: 'Juni 2026',
      title: 'Pemisahan Rekening & Pembatasan Penarikan Prive Owner',
      category: 'Tata Kelola Kas Pribadi vs Toko',
      scenarioTested: 'Membatasi penarikan kas pribadi maksimum 25% dari laba kotor toko per minggu',
      rationale: 'Prive tidak terkontrol menyedot kas hingga Rp 4.8 Jt/bulan sehingga toko sering kehabisan modal biji kopi',
      simulatedBenefit: 'Penghematan modal kerja +Rp 2.100.000/bulan',
      actualOutcome: 'Kas operasional stabil, stok biji kopi tidak pernah kosong lagi.',
      status: 'VERIFIED_SUCCESS',
      badge: 'Kebocoran Kas Terhenti',
      badgeType: 'success' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <History className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-950">
              Business Memory (Memori Keputusan & Hasil Nyata)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            JagaUsaha mencatat setiap rekomendasi dan keputusan strategis yang diambil owner, lalu membandingkan hasil proyeksi dengan realitas keuangan 30–60 hari kemudian.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-slate-500 font-medium">Total Kas Terlindungi:</div>
            <div className="text-base font-extrabold text-emerald-700 tabular-nums">
              +Rp 14.100.000
            </div>
          </div>
          <AnimatedBadge status="success" size="sm">
            3 Keputusan Terverifikasi
          </AnimatedBadge>
        </div>
      </div>

      {/* Memory Feed Cards */}
      <div className="space-y-4">
        {memories.map((mem) => (
          <div
            key={mem.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4 transition-all hover:border-slate-300"
          >
            {/* Top Row: Title, Date, Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-800 shrink-0">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-950 tracking-tight">
                    {mem.title}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{mem.period}</span>
                    <span>·</span>
                    <span className="font-medium text-slate-700">{mem.category}</span>
                  </div>
                </div>
              </div>

              <AnimatedBadge status={mem.badgeType} size="sm">
                {mem.badge}
              </AnimatedBadge>
            </div>

            {/* Middle Grid: What was simulated vs What actually happened */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Box A: Scenario & Simulated Benefit */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <span>Skenario & Rekomendasi Awal</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {mem.scenarioTested}
                </p>
                <div className="pt-1 text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                  <span>Proyeksi Hemat:</span>
                  <strong className="text-emerald-950">{mem.simulatedBenefit}</strong>
                </div>
              </div>

              {/* Box B: Verified Real-World Outcome */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Hasil Nyata Setelah Dieksekusi (Verified)</span>
                </div>
                <p className="text-emerald-900/90 leading-relaxed font-normal">
                  {mem.actualOutcome}
                </p>
                <div className="pt-1 text-[11px] text-emerald-800 font-medium">
                  Status: Integritas kas terverifikasi aman melalui sinkronisasi mutasi.
                </div>
              </div>
            </div>

            {/* Bottom Footer Note: Business Intelligence Growth */}
            <div className="text-[11.5px] text-slate-500 font-medium flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                <span>Rasional: {mem.rationale}</span>
              </span>

              <span className="text-[10px] text-slate-400 font-mono">
                Memory ID: #{mem.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
