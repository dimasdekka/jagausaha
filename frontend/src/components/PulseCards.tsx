import React from 'react';
import { Lock, Sparkles, Calendar, Wallet } from 'lucide-react';
import { SpotlightCard } from './reactbits/SpotlightCard';

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
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.14)"
        className="border-emerald-200/90 bg-gradient-to-b from-emerald-50/40 to-white"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800 tracking-tight flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Duit Dingin (Safe-to-Spend)
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60">
              Aman Dibelanjakan
            </span>
          </div>

          <div className="text-3xl font-bold text-neutral-950 tracking-tight">
            Rp {safeToSpend.toLocaleString('id-ID')}
          </div>

          <p className="text-xs text-neutral-600 leading-normal pt-2 border-t border-emerald-100/80">
            Batas belanja maksimal tanpa risiko gagal bayar gaji & tempo supplier.
          </p>
        </div>
      </SpotlightCard>

      {/* 2. Komitmen Wajib Terjadwal */}
      <SpotlightCard
        spotlightColor="rgba(245, 158, 11, 0.10)"
        className="border-neutral-200/90 bg-white"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-700 tracking-tight flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              Komitmen Terjadwal (14 Hari)
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Wajib Terkunci
            </span>
          </div>

          <div className="text-3xl font-bold text-neutral-950 tracking-tight">
            Rp {committedObligations.toLocaleString('id-ID')}
          </div>

          <p className="text-xs text-neutral-500 leading-normal pt-2 border-t border-neutral-100 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
            <span>Gaji 3 Staf (Rp 7,5 Jt) + Tempo Kopi (Rp 4,2 Jt)</span>
          </p>
        </div>
      </SpotlightCard>

      {/* 3. Saldo Bank Total */}
      <SpotlightCard
        spotlightColor="rgba(59, 130, 246, 0.10)"
        className="border-neutral-200/90 bg-white"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-700 tracking-tight flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-blue-600" />
              Saldo Rekening BCA
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
              Kas Aktif
            </span>
          </div>

          <div className="text-3xl font-bold text-neutral-950 tracking-tight">
            Rp {currentCash.toLocaleString('id-ID')}
          </div>

          <p className="text-xs text-neutral-500 leading-normal pt-2 border-t border-neutral-100">
            Termasuk cadangan buffer darurat minimum Rp {safetyBuffer.toLocaleString('id-ID')}.
          </p>
        </div>
      </SpotlightCard>
    </div>
  );
};
