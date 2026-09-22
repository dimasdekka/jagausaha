import React from 'react';
import { Sparkles, Wallet, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AnimatedNumber } from './motion/number';
import { AnimatedBadge } from './motion/animated-badge';

interface PulseCardsProps {
  safeToSpend: number;
  currentCash: number;
  runwayDays?: number;
  dailyGross?: number;
  safetyBuffer: number;
  minCash?: number;
  isSafe?: boolean;
  insolvencyDay?: number | null;
}

export const PulseCards: React.FC<PulseCardsProps> = ({
  safeToSpend,
  currentCash,
  safetyBuffer,
  minCash = -3042000,
  isSafe = false,
  insolvencyDay = 6,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5 sm:p-6 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-start divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/70">
        {/* 1. Saldo Rekening Kas Aktif */}
        <div className="space-y-1.5 sm:pr-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-neutral-400" />
              Kas Rekening BCA
            </span>
            <AnimatedBadge status="info" size="sm">
              Kas Aktif
            </AnimatedBadge>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight flex items-baseline gap-1 pt-0.5">
            <span className="text-lg font-semibold text-neutral-400">Rp</span>
            <AnimatedNumber value={currentCash} duration={0.8} />
          </div>

          <p className="text-[11px] text-neutral-500 leading-normal font-normal">
            Termasuk cadangan darurat minimum Rp {safetyBuffer.toLocaleString('id-ID')}.
          </p>
        </div>

        {/* 2. Duit Dingin Aman (Safe-to-Spend) */}
        <div className="space-y-1.5 pt-4 sm:pt-0 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-neutral-400" />
              Duit Dingin Aman
            </span>
            <AnimatedBadge status="success" size="sm">
              Safe-to-Spend
            </AnimatedBadge>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight flex items-baseline gap-1 pt-0.5">
            <span className="text-lg font-semibold text-neutral-400">Rp</span>
            <AnimatedNumber value={safeToSpend} duration={0.8} />
          </div>

          <p className="text-[11px] text-neutral-500 leading-normal font-normal">
            Batas belanja tanpa mengorbankan gaji karyawan & tempo supplier.
          </p>
        </div>

        {/* 3. Proyeksi Dampak Skenario Terpilih */}
        <div className="space-y-1.5 pt-4 sm:pt-0 sm:pl-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              {isSafe ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
              )}
              Dampak Skenario
            </span>
            <AnimatedBadge
              status={isSafe ? "success" : "danger"}
              size="sm"
              pulse={!isSafe}
            >
              {isSafe ? 'Kas Aman' : `Defisit H+${insolvencyDay || 6}`}
            </AnimatedBadge>
          </div>

          <div
            className={`text-2xl sm:text-3xl font-bold tracking-tight flex items-baseline gap-1 pt-0.5 ${
              !isSafe ? 'text-rose-600 font-extrabold' : 'text-neutral-950'
            }`}
          >
            <span className="text-lg font-semibold opacity-75">
              {!isSafe ? '− Rp' : 'Rp'}
            </span>
            <AnimatedNumber value={Math.abs(minCash)} duration={0.8} />
          </div>

          <p className="text-[11px] text-neutral-500 leading-normal font-normal">
            {!isSafe
              ? `Kas minus pada Hari ke-${insolvencyDay || 6} (bentrok gaji Rp 7,5 Jt).`
              : 'Kas terendah tetap di atas cadangan darurat minimum.'}
          </p>
        </div>
      </div>
    </div>
  );
};
