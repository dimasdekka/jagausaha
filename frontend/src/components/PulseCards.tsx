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
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-600 tracking-tight flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-neutral-400" />
            Duit Dingin (Safe-to-Spend)
          </span>
          <span className="text-xs font-medium text-neutral-500">
            Boleh Belanja
          </span>
        </div>

        <div className="text-3xl font-bold text-neutral-950 tracking-tight tabular-nums">
          Rp {safeToSpend.toLocaleString('id-ID')}
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed pt-2.5 border-t border-neutral-100">
          Batas aman belanja tanpa mengorbankan gaji & tempo.
        </p>
      </div>

      {/* 2. Komitmen Wajib Terjadwal */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-600 tracking-tight flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-neutral-400" />
            Komitmen Wajib (14 Hari)
          </span>
          <span className="text-xs font-medium text-neutral-500">
            Terkunci
          </span>
        </div>

        <div className="text-3xl font-bold text-neutral-950 tracking-tight tabular-nums">
          Rp {committedObligations.toLocaleString('id-ID')}
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed pt-2.5 border-t border-neutral-100 flex items-center gap-1.5">
          <Lock className="h-3 w-3 text-neutral-400 shrink-0" />
          <span>Gaji 3 Staf (Rp 7,5 Jt) + Tempo Kopi (Rp 4,2 Jt)</span>
        </p>
      </div>

      {/* 3. Saldo Bank Total */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-600 tracking-tight flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5 text-neutral-400" />
            Saldo Rekening BCA
          </span>
          <span className="text-xs font-medium text-neutral-500">
            Kas Aktif
          </span>
        </div>

        <div className="text-3xl font-bold text-neutral-950 tracking-tight tabular-nums">
          Rp {currentCash.toLocaleString('id-ID')}
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed pt-2.5 border-t border-neutral-100">
          Termasuk cadangan darurat minimum Rp {safetyBuffer.toLocaleString('id-ID')}.
        </p>
      </div>
    </div>
  );
};
