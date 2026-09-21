import React from 'react';
import { Lock, Sparkles, Calendar, Wallet } from 'lucide-react';

interface PulseCardsProps {
  safeToSpend: number;
  currentCash: number;
  runwayDays: number;
  dailyGross: number;
  safetyBuffer: number;
}

export const PulseCards: React.FC<PulseCardsProps> = ({
  safeToSpend,
  currentCash,
  safetyBuffer,
}) => {
  const committedObligations = currentCash - safeToSpend - safetyBuffer;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 1. Duit Dingin (Safe-to-Spend) */}
      <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/50 via-white to-white p-5 shadow-stripe-card transition-all hover:shadow-stripe">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800 tracking-tight flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Duit Dingin (Safe-to-Spend)
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60">
              Aman Dibelanjakan
            </span>
          </div>

          <div className="text-3xl font-extrabold text-navy-950 tracking-tight tabular-nums">
            Rp {safeToSpend.toLocaleString('id-ID')}
          </div>

          <p className="text-xs text-slate-700 leading-relaxed pt-2.5 border-t border-emerald-100/80">
            Batas pengeluaran aman tanpa memicu risiko gagal bayar gaji atau tempo.
          </p>
        </div>
      </div>

      {/* 2. Komitmen Wajib Terjadwal */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-stripe-card transition-all hover:shadow-stripe">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 tracking-tight flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              Komitmen Terjadwal (14 Hari)
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Wajib Terkunci
            </span>
          </div>

          <div className="text-3xl font-extrabold text-navy-950 tracking-tight tabular-nums">
            Rp {committedObligations.toLocaleString('id-ID')}
          </div>

          <p className="text-xs text-slate-700 leading-relaxed pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>Gaji 3 Staf (Rp 7,5 Jt) + Tempo Kopi (Rp 4,2 Jt)</span>
          </p>
        </div>
      </div>

      {/* 3. Saldo Bank Total */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-stripe-card transition-all hover:shadow-stripe">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 tracking-tight flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-brand-indigo" />
              Saldo Rekening BCA
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Total Kas
            </span>
          </div>

          <div className="text-3xl font-extrabold text-navy-950 tracking-tight tabular-nums">
            Rp {currentCash.toLocaleString('id-ID')}
          </div>

          <p className="text-xs text-slate-700 leading-relaxed pt-2.5 border-t border-slate-100">
            Termasuk cadangan darurat minimum Rp {safetyBuffer.toLocaleString('id-ID')}.
          </p>
        </div>
      </div>
    </div>
  );
};
