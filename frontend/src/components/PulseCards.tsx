import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { CountUp } from './reactbits/CountUp';

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
  runwayDays,
  dailyGross,
  safetyBuffer,
}) => {
  const lockedCash = currentCash - safeToSpend;

  const formatRupiah = (val: number) => {
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 1. Duit Dingin (Safe-to-Spend) */}
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.14)"
        className="border-emerald-200 bg-gradient-to-b from-emerald-50/40 to-white"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-800 tracking-tight flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Duit Dingin (Boleh Dipakai)
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-300/60">
              Aman
            </span>
          </div>

          <div className="text-3xl font-semibold text-neutral-900 tracking-tight mb-2">
            <CountUp to={safeToSpend} prefix="Rp " duration={1.0} />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 pt-2 border-t border-emerald-100/60">
          <Lock className="h-3 w-3 text-neutral-400 shrink-0" />
          <span className="truncate">{formatRupiah(lockedCash)} terkunci untuk gaji & tempo</span>
        </div>
      </SpotlightCard>

      {/* 2. Napas Kas (Runway) */}
      <SpotlightCard
        spotlightColor="rgba(59, 130, 246, 0.10)"
        className="border-neutral-200/80 bg-white"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-neutral-500 tracking-tight">
              Napas Kas Bisnis
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              Runway
            </span>
          </div>
          <div className="text-3xl font-semibold text-neutral-900 tracking-tight mb-1">
            <CountUp to={runwayDays} suffix=" Hari" duration={0.8} />
          </div>
        </div>
        <p className="text-xs text-neutral-400 tracking-tight pt-2 border-t border-neutral-100">
          Ketahanan operasional tanpa omset baru
        </p>
      </SpotlightCard>

      {/* 3. Saldo Bank Total */}
      <SpotlightCard
        spotlightColor="rgba(245, 158, 11, 0.10)"
        className="border-neutral-200/80 bg-white"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-neutral-500 tracking-tight">
              Saldo Bank BCA Aktif
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              Total Kas
            </span>
          </div>
          <div className="text-3xl font-semibold text-neutral-900 tracking-tight mb-1">
            <CountUp to={currentCash} prefix="Rp " duration={1.0} />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-400 tracking-tight pt-2 border-t border-neutral-100">
          <span>Omset: {formatRupiah(dailyGross)}/hari</span>
          <span>Buffer: {formatRupiah(safetyBuffer)}</span>
        </div>
      </SpotlightCard>
    </div>
  );
};
