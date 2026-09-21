import React from 'react';
import { AlertTriangle, CheckCircle2, MessageSquare, ShieldCheck, Clock } from 'lucide-react';

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
  const formatRupiah = (val: number) => `Rp ${Math.abs(val).toLocaleString('id-ID')}`;

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full space-y-5">
      {/* Status Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Evaluasi Keputusan
          </span>
          {isSafe ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Aman Dijalankan
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-full">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
              Risiko Tinggi (Defisit)
            </span>
          )}
        </div>

        <h4 className="text-base font-semibold text-neutral-900 tracking-tight leading-snug">
          {isSafe
            ? 'Likuiditas Usaha Tetap Terjaga'
            : `Peringatan: Defisit Kas pada Hari ke-${insolvencyDay || 6}`}
        </h4>

        <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
          {isSafe ? (
            <>
              Setelah keputusan <b>{scenarioName}</b> dieksekusi, saldo kas minimum tetap terjaga di{' '}
              <span className="font-semibold text-emerald-700">Rp {minCash.toLocaleString('id-ID')}</span>. 
              Kewajiban gaji dan tempo supplier tetap aman terbayar tepat waktu.
            </>
          ) : (
            <>
              Pengeluaran untuk <b>{scenarioName}</b> menghabiskan cadangan sebelum benturan jadwal{' '}
              <b>Gaji Karyawan (H+6 Rp 7,5 Jt)</b> dan <b>Tempo Kopi (H+11 Rp 4,2 Jt)</b>. Saldo diproyeksikan{' '}
              <span className="font-bold text-rose-600">-Rp {Math.abs(minCash).toLocaleString('id-ID')}</span>.
            </>
          )}
        </p>
      </div>

      {/* Structured Impact Breakdown */}
      <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4 space-y-2.5 text-xs font-sans">
        <div className="flex items-center justify-between text-neutral-600">
          <span>Duit Dingin yang Boleh Dipakai:</span>
          <span className="font-semibold text-neutral-900 font-mono">
            Rp {safeToSpend.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex items-center justify-between text-neutral-600">
          <span>Proyeksi Saldo Terendah:</span>
          <span
            className={`font-semibold font-mono ${
              minCash < 0 ? 'text-rose-600 font-bold' : 'text-emerald-700'
            }`}
          >
            {minCash < 0 ? `-${formatRupiah(minCash)}` : `Rp ${minCash.toLocaleString('id-ID')}`}
          </span>
        </div>
        <div className="flex items-center justify-between text-neutral-600 pt-2 border-t border-neutral-200/60">
          <span>Batas Waktu Intervensi:</span>
          <span className="font-medium text-neutral-800 flex items-center gap-1">
            <Clock className="h-3 w-3 text-neutral-400" />
            <span>Sebelum Hari ke-6</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        {!isSafe ? (
          <>
            <button
              onClick={onApplySafeSolution}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white py-2.5 text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Terapkan Solusi Aman (DP 50%)</span>
            </button>

            <button
              onClick={onOpenNegotiate}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 py-2.5 text-xs font-medium transition-all active:scale-95"
            >
              <MessageSquare className="h-3.5 w-3.5 text-neutral-500" />
              <span>Draf WhatsApp Negosiasi Supplier</span>
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50/80 border border-emerald-200/60 py-2.5 rounded-full">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Rencana belanja aman untuk dieksekusi</span>
          </div>
        )}
      </div>
    </div>
  );
};
