import React from 'react';
import {
  History,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const DashboardMemoryView: React.FC = () => {
  const memories = [
    {
      id: 'mem-1',
      period: 'Agustus 2026',
      title: 'Restrukturisasi Mesin Espresso: DP 50% vs Tunai 100%',
      category: 'Belanja Modal (CapEx)',
      scenarioTested: 'Beli tunai Rp 14.0 Jt vs DP 50% (Rp 7.0 Jt) dengan tempo sisa 30 hari.',
      rationale: 'Mencegah saldo kas defisit -Rp 3.0 Jt saat tanggal gajian barista (H+6). Menjaga runway tetap aman di atas 24 hari.',
      simulatedBenefit: 'Rp 7.000.000',
      benefitLabel: 'Kas Likuid Terlindungi',
      actualOutcome: 'Kedai sukses melewati jadwal gajian tanpa pinjaman darurat. Pelunasan sisa tempo tertutup lancar dari akumulasi omset harian bulan berikutnya.',
      status: 'Integritas kas terverifikasi aman melalui mutasi rekening BCA.',
      badge: 'Likuiditas Selamat',
      badgeColor: '#16a34a',
    },
    {
      id: 'mem-2',
      period: 'Juli 2026',
      title: 'Akselerasi Penagihan Piutang Pemda via WhatsApp QRIS Santun',
      category: 'Manajemen Piutang (AR)',
      scenarioTested: 'Kirim reminder santun dengan tautan bayar instan QRIS H-3 sebelum tempo sewa toko.',
      rationale: 'Cadangan kas toko menipis menjelang pembayaran perpanjangan sewa ruko Rp 4.000.000.',
      simulatedBenefit: 'Rp 5.000.000',
      benefitLabel: 'Percepatan Inflow Kas',
      actualOutcome: 'Bendahara pemesan melunasi tagihan katering rapat dalam 48 jam. Tidak terjadi benturan defisit saat hari sewa tiba.',
      status: 'Pelunasan invoice tercatat lunas di mutasi bank.',
      badge: 'Piutang Tertagih H+2',
      badgeColor: '#2563eb',
    },
    {
      id: 'mem-3',
      period: 'Juni 2026',
      title: 'Pemisahan Rekening & Pembatasan Penarikan Prive Owner',
      category: 'Tata Kelola Kas Pribadi vs Toko',
      scenarioTested: 'Membatasi penarikan kas pribadi maksimum 25% dari laba kotor toko per minggu.',
      rationale: 'Prive tidak terkontrol menyedot kas hingga Rp 4.8 Jt/bulan, menyebabkan kasir kehabisan modal beli biji kopi grade premium.',
      simulatedBenefit: 'Rp 2.100.000 / bln',
      benefitLabel: 'Penghematan Modal Kerja',
      actualOutcome: 'Kas operasional stabil berkesinambungan. Stok persediaan bahan baku biji kopi tidak pernah kosong mendadak lagi.',
      status: 'Rasio prive terkendali di bawah batas ambang 25%.',
      badge: 'Kebocoran Berhenti',
      badgeColor: '#ea580c',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* ============================================================ */}
      {/* 1. Header Banner — Dub.co High Contrast Editorial Card      */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center shrink-0 shadow-xs">
              <History className="h-4 w-4 text-blue-400" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
              Business Memory (Memori Keputusan & Hasil Nyata)
            </h2>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed font-normal">
            JagaUsaha mencatat setiap rekomendasi dan keputusan strategis yang diambil owner, lalu membandingkan hasil proyeksi model dengan realitas arus kas 30–60 hari kemudian.
          </p>
        </div>

        {/* Total Protected Cash Metric Strip */}
        <div className="rounded-xl bg-neutral-50/80 border border-neutral-200/90 p-4 flex items-center gap-4 shrink-0 shadow-2xs">
          <div className="space-y-0.5">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-neutral-500">
              Total Kas Terlindungi
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 tabular-nums tracking-tight">
              +Rp 14.100.000
            </div>
          </div>
          <div className="h-8 w-px bg-neutral-200" />
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full shadow-2xs">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span>3 Terverifikasi</span>
            </span>
            <div className="text-[10px] text-neutral-500 text-center">100% Realisasi</div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Decision Audit Cards Feed                                */}
      {/* ============================================================ */}
      <div className="space-y-4">
        {memories.map((mem) => (
          <div
            key={mem.id}
            className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-neutral-300 transition-all space-y-4"
          >
            {/* Card Header: Title, Category, Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-neutral-100">
              <div className="flex items-start sm:items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight">
                      {mem.title}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200/60">
                      #{mem.id}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-neutral-700">{mem.period}</span>
                    <span className="text-neutral-300">•</span>
                    <span>{mem.category}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: mem.badgeColor }}
                  />
                  <span>{mem.badge}</span>
                </span>
              </div>
            </div>

            {/* Middle Grid: Chronological Journey (Rencana & Rasional vs Hasil Nyata & Dampak) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kolom Kiri: Skenario & Latar Belakang Rasional */}
              <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-4 flex flex-col justify-between space-y-3.5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200/60">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                      <span>Skenario & Rekomendasi Terpilih</span>
                    </div>
                    <span className="text-[10px] font-medium text-neutral-500 bg-white px-2 py-0.5 rounded border border-neutral-200/70">
                      Rencana Awal
                    </span>
                  </div>

                  <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                    {mem.scenarioTested}
                  </p>

                  {/* Latar Belakang / Rasional di Kolom Kiri (Alur Berpikir Alami) */}
                  <div className="p-3 rounded-lg bg-white border border-neutral-200/70 space-y-1 text-xs text-neutral-600 leading-relaxed shadow-2xs">
                    <div className="text-[10.5px] uppercase font-bold text-neutral-500 tracking-wider">
                      Latar Belakang & Rasional:
                    </div>
                    <p className="text-neutral-700">{mem.rationale}</p>
                  </div>
                </div>

                {/* Target Metric */}
                <div className="pt-2.5 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">
                    Target: {mem.benefitLabel}
                  </span>
                  <span className="text-sm font-bold text-neutral-900">
                    {mem.simulatedBenefit}
                  </span>
                </div>
              </div>

              {/* Kolom Kanan: Hasil Nyata Terverifikasi & Rekonsiliasi Bank */}
              <div className="rounded-xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/30 via-white to-white p-4 flex flex-col justify-between space-y-3.5 shadow-2xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Hasil Nyata Terverifikasi</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200">
                      Sinkron Mutasi Bank
                    </span>
                  </div>

                  <p className="text-xs text-neutral-800 leading-relaxed">
                    {mem.actualOutcome}
                  </p>

                  {/* Status Rekonsiliasi Bank */}
                  <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/70 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-emerald-900 uppercase tracking-wider">
                        Status Rekonsiliasi Bank:
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        100% Valid
                      </span>
                    </div>
                    <p className="text-emerald-800 text-[11.5px] leading-relaxed font-medium">
                      {mem.status}
                    </p>
                  </div>
                </div>

                {/* Real Cash Impact */}
                <div className="pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">
                    Dampak Kas Riil:
                  </span>
                  <span className="text-sm sm:text-base font-bold text-emerald-700">
                    +{mem.simulatedBenefit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
