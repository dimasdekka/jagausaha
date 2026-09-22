import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { AnimatedBadge } from './motion/animated-badge';
import { AnimatedNumber } from './motion/number';
import { MotionButton } from './motion/button';

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
          <span className="text-xs font-medium text-neutral-500">
            Analisis Keputusan
          </span>
          <AnimatedBadge
            status={isSafe ? "success" : "danger"}
            size="sm"
            pulse={!isSafe}
          >
            {isSafe ? 'Kas Aman' : `Defisit Hari ke-${insolvencyDay || 6}`}
          </AnimatedBadge>
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
      <div className="border-y border-neutral-100 py-3.5 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Batas Duit Dingin Aman</span>
          <span className="font-semibold text-neutral-900 tabular-nums flex items-center gap-1">
            <span>Rp</span>
            <AnimatedNumber value={safeToSpend} duration={0.6} />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Proyeksi Saldo Terendah</span>
          <span className={`font-semibold tabular-nums flex items-center gap-1 ${minCash < 0 ? 'text-rose-600' : 'text-neutral-900'}`}>
            <span>{minCash < 0 ? '-Rp' : 'Rp'}</span>
            <AnimatedNumber value={Math.abs(minCash)} duration={0.6} />
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
            <MotionButton
              variant="primary"
              size="md"
              onClick={onApplySafeSolution}
              className="w-full h-11"
            >
              <span>Terapkan Solusi Aman (DP 50%)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </MotionButton>

            <MotionButton
              variant="outline"
              size="md"
              onClick={onOpenNegotiate}
              className="w-full h-11 border-neutral-300"
            >
              <MessageSquare className="h-3.5 w-3.5 text-neutral-600" />
              <span>Draf Pesan WhatsApp Supplier</span>
            </MotionButton>
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
