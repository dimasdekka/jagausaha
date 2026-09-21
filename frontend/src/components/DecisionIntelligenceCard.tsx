import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface DecisionIntelligenceProps {
  isSafe: boolean;
  insolvencyDay: number | null;
  minCash: number;
  safeToSpend: number;
  scenarioName: string;
  onOpenNegotiate: () => void;
  onApplySafeSolution: () => void;
}

export const DecisionIntelligenceCard: React.FC<DecisionIntelligenceProps> = ({
  isSafe,
  insolvencyDay,
  minCash,
  safeToSpend,
  scenarioName,
  onOpenNegotiate,
  onApplySafeSolution,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
            Analisis Keputusan
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${
              isSafe
                ? 'bg-neutral-100 text-neutral-800'
                : 'bg-neutral-900 text-white'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isSafe ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
              }`}
            />
            <span>{isSafe ? 'Kas Aman' : `Defisit Hari ke-${insolvencyDay || 6}`}</span>
          </span>
        </div>

        <h4 className="text-lg font-semibold text-neutral-950 tracking-tight leading-snug">
          {isSafe
            ? 'Arus kas usaha tetap aman'
            : 'Risiko gagal bayar gaji & supplier'}
        </h4>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          {isSafe ? (
            <>
              Keputusan {scenarioName} tidak mengganggu komitmen operasional. Saldo kas terendah tetap berada di atas cadangan darurat.
            </>
          ) : (
            <>
              Pengeluaran untuk {scenarioName} menguras likuiditas sebelum jadwal pembayaran gaji staf (H+6) dan tempo bahan baku (H+11).
            </>
          )}
        </p>
      </div>

      {/* Structured Metrics Table (Clean, Borderless, Tabular) */}
      <div className="border-y border-neutral-100 py-3.5 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Batas Duit Dingin Aman</span>
          <span className="font-semibold text-neutral-900 font-mono tabular-nums">
            Rp {safeToSpend.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Proyeksi Saldo Terendah</span>
          <span className={`font-semibold font-mono tabular-nums ${minCash < 0 ? 'text-rose-600' : 'text-neutral-900'}`}>
            {minCash < 0 ? `-Rp ${Math.abs(minCash).toLocaleString('id-ID')}` : `Rp ${minCash.toLocaleString('id-ID')}`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Jadwal Pengeluaran Kritis</span>
          <span className="font-medium text-neutral-900">
            Hari ke-6 (Gaji Karyawan)
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {!isSafe ? (
          <>
            <button
              onClick={onApplySafeSolution}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white py-3 text-xs font-medium transition-all shadow-sm active:scale-95"
            >
              <span>Terapkan Solusi Aman (DP 50%)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={onOpenNegotiate}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 py-3 text-xs font-medium transition-all active:scale-95"
            >
              <MessageSquare className="h-3.5 w-3.5 text-neutral-600" />
              <span>Draf Pesan WhatsApp Supplier</span>
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center text-xs text-neutral-600 bg-neutral-50 py-3 rounded-full border border-neutral-200/80 font-medium">
            <span>Rencana pengeluaran terverifikasi aman</span>
          </div>
        )}
      </div>
    </div>
  );
};
