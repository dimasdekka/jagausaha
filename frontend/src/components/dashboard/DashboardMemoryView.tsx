import React from 'react';
import {
  History,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
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
      <div className="rounded-[16px] border border-[#e5e5e5] bg-[#ffffff] p-6 sm:p-7 shadow-dub-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-[8px] bg-[#0a0a0a] text-white flex items-center justify-center shrink-0 shadow-dub-subtle">
              <History className="h-4 w-4 text-[#2563eb]" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#0a0a0a] tracking-tight">
              Business Memory (Memori Keputusan & Hasil Nyata)
            </h2>
          </div>
          <p className="text-xs text-[#525252] leading-relaxed">
            JagaUsaha mencatat setiap rekomendasi dan keputusan strategis yang diambil owner, lalu membandingkan hasil proyeksi model dengan realitas arus kas 30–60 hari kemudian.
          </p>
        </div>

        {/* Total Protected Cash Metric Strip */}
        <div className="rounded-[12px] bg-[#f5f5f5] border border-[#e5e5e5] p-4 flex items-center gap-4 shrink-0 shadow-dub-subtle">
          <div className="space-y-0.5">
            <div className="text-[10.5px] uppercase tracking-wider font-semibold text-[#737373]">
              Total Kas Terlindungi
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#16a34a] tabular-nums tracking-tight">
              +Rp 14.100.000
            </div>
          </div>
          <div className="h-8 w-px bg-[#e5e5e5]" />
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#166534] bg-[#dcfce7] border border-[#bbf7d0] px-2.5 py-1 rounded-full">
              <CheckCircle2 className="h-3 w-3 text-[#16a34a]" />
              <span>3 Terverifikasi</span>
            </span>
            <div className="text-[10px] text-[#737373] text-center font-mono">100% Realisasi</div>
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
            className="rounded-[16px] border border-[#e5e5e5] bg-[#ffffff] p-5 sm:p-6 shadow-dub-subtle space-y-4.5 transition-all hover:border-[#d4d4d4]"
          >
            {/* Card Header: Title, Category, Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e5e5]">
              <div className="flex items-start sm:items-center gap-3">
                <div className="h-9 w-9 rounded-[8px] bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4 text-[#16a34a]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0a0a0a] tracking-tight">
                    {mem.title}
                  </h3>
                  <div className="text-xs text-[#525252] flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-[#171717]">{mem.period}</span>
                    <span className="text-[#a3a3a3]">·</span>
                    <span className="text-[#525252]">{mem.category}</span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f5f5] border border-[#e5e5e5] text-[#0a0a0a] shadow-dub-subtle">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: mem.badgeColor }}
                  />
                  <span>{mem.badge}</span>
                </span>
              </div>
            </div>

            {/* Middle Grid: Initial Recommendation vs Verified Real Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box A: Initial Scenario & Plan */}
              <div className="p-4 rounded-[12px] bg-[#ffffff] border border-[#e5e5e5] flex flex-col justify-between space-y-3.5 shadow-dub-subtle">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0a0a0a] pb-2 border-b border-[#f5f5f5]">
                    <Sparkles className="h-3.5 w-3.5 text-[#2563eb]" />
                    <span>Skenario & Rekomendasi Awal</span>
                  </div>
                  <p className="text-xs text-[#404040] leading-relaxed">
                    {mem.scenarioTested}
                  </p>
                </div>

                {/* Stat Block for Projected Benefit */}
                <div className="rounded-[8px] bg-[#f5f5f5] border border-[#e5e5e5] p-3 space-y-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#525252]">
                      {mem.benefitLabel}
                    </span>
                    <div className="h-6 w-6 rounded-[6px] bg-white border border-[#e5e5e5] flex items-center justify-center text-[#2563eb]">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="text-base sm:text-lg font-bold font-mono text-[#0a0a0a] tabular-nums">
                    {mem.simulatedBenefit}
                  </div>
                </div>
              </div>

              {/* Box B: Verified Real-World Outcome */}
              <div className="p-4 rounded-[12px] bg-[#dcfce7]/20 border border-[#bbf7d0] flex flex-col justify-between space-y-3.5 shadow-dub-subtle">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#bbf7d0]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532d]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
                      <span>Hasil Nyata Terverifikasi</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#166534] bg-white px-2 py-0.5 rounded-full border border-[#bbf7d0]">
                      Sinkron Mutasi Bank
                    </span>
                  </div>
                  <p className="text-xs text-[#166534] leading-relaxed font-normal">
                    {mem.actualOutcome}
                  </p>
                </div>

                {/* Outcome Status Sub-box with 2-tier layout (Zero Truncation Guarantee) */}
                <div className="rounded-[8px] bg-white border border-[#bbf7d0] p-3 space-y-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] uppercase tracking-wider font-bold text-[#14532d]">
                      Status Rekonsiliasi Bank
                    </span>
                    <span className="text-[10px] font-bold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full border border-[#bbf7d0] flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>100% Valid</span>
                    </span>
                  </div>
                  <div className="text-xs text-[#166534] font-medium leading-relaxed">
                    {mem.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Rationale & Audit Trail */}
            <div className="rounded-[8px] border-l-3 border-[#ea580c] bg-[#f5f5f5] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-[#404040] leading-relaxed">
                <strong className="text-[#171717] font-semibold">Rasional Keputusan: </strong>
                <span>{mem.rationale}</span>
              </div>
              <span className="font-mono text-[11px] text-[#525252] bg-white px-2 py-1 rounded border border-[#e5e5e5] shrink-0 self-start sm:self-auto shadow-dub-subtle">
                ID: #{mem.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
