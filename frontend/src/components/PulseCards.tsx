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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
      {/* 1. Saldo Rekening Kas Aktif */}
      <div className="rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50/40 via-white to-white p-5 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
            <div className="p-1 rounded-md bg-blue-100 text-blue-700">
              <Wallet className="h-3.5 w-3.5" />
            </div>
            Kas Rekening BCA
          </span>
          <AnimatedBadge status="info" size="sm">
            Kas Aktif
          </AnimatedBadge>
        </div>

        <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight flex items-baseline gap-1">
          <span className="text-base font-semibold text-slate-400">Rp</span>
          <AnimatedNumber value={currentCash} duration={0.8} />
        </div>

        <p className="text-xs text-slate-600 leading-normal font-normal border-t border-blue-100/60 pt-2">
          Cadangan darurat aman: <strong className="text-slate-800">Rp {safetyBuffer.toLocaleString('id-ID')}</strong>.
        </p>
      </div>

      {/* 2. Duit Dingin Aman (Safe-to-Spend) */}
      <div className="rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/50 via-white to-white p-5 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
            <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            Duit Dingin Aman
          </span>
          <AnimatedBadge status="success" size="sm">
            Safe-to-Spend
          </AnimatedBadge>
        </div>

        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight flex items-baseline gap-1">
          <span className="text-base font-semibold text-emerald-600/70">Rp</span>
          <AnimatedNumber value={safeToSpend} duration={0.8} />
        </div>

        <p className="text-xs text-emerald-900/80 leading-normal font-normal border-t border-emerald-100/60 pt-2">
          Batas belanja aman tanpa mengganggu gaji & tempo supplier.
        </p>
      </div>

      {/* 3. Proyeksi Dampak Skenario Terpilih */}
      <div
        className={`rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-3 transition-colors ${
          !isSafe
            ? 'border-rose-200/90 bg-gradient-to-br from-rose-50/60 via-white to-white'
            : 'border-teal-200/90 bg-gradient-to-br from-teal-50/50 via-white to-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              !isSafe ? 'text-rose-950' : 'text-teal-950'
            }`}
          >
            <div
              className={`p-1 rounded-md ${
                !isSafe ? 'bg-rose-100 text-rose-700' : 'bg-teal-100 text-teal-700'
              }`}
            >
              {!isSafe ? (
                <AlertTriangle className="h-3.5 w-3.5" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
            </div>
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
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight flex items-baseline gap-1 ${
            !isSafe ? 'text-rose-600' : 'text-teal-900'
          }`}
        >
          <span className="text-base font-semibold opacity-75">
            {!isSafe ? '− Rp' : 'Rp'}
          </span>
          <AnimatedNumber value={Math.abs(minCash)} duration={0.8} />
        </div>

        <p
          className={`text-xs leading-normal font-normal border-t pt-2 ${
            !isSafe
              ? 'text-rose-800/90 border-rose-100/70'
              : 'text-teal-900/80 border-teal-100/70'
          }`}
        >
          {!isSafe
            ? `Kas defisit pada Hari ke-${insolvencyDay || 6} (bentrok gaji Rp 7,5 Jt).`
            : 'Kas operasional terendah terlindungi di atas cadangan darurat.'}
        </p>
      </div>
    </div>
  );
};
