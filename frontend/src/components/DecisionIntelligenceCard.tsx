import React from 'react';
import { ArrowRight, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';
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
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full space-y-5">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
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

        <h4 className="text-base font-semibold text-neutral-950 tracking-tight leading-snug">
          {isSafe
            ? 'Arus kas usaha tetap aman'
            : 'Risiko gagal bayar gaji & supplier'}
        </h4>

        <p className="text-xs text-neutral-600 leading-relaxed font-normal">
          {isSafe ? (
            <>
              Keputusan <strong>{scenarioName}</strong> tidak mengganggu komitmen operasional. Saldo kas terendah tetap berada di atas cadangan darurat.
            </>
          ) : (
            <>
              Pengeluaran untuk <strong>{scenarioName}</strong> menguras likuiditas sebelum jadwal pembayaran gaji staf (H+6) dan tempo bahan baku (H+11).
            </>
          )}
        </p>
      </div>

      {/* Structured Metrics Table (Clean, Borderless, Tabular) */}
      <div className="space-y-2 border-y border-neutral-100 py-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Batas Duit Dingin Aman</span>
          <span className="font-semibold text-neutral-900 tabular-nums flex items-center gap-0.5">
            <span>Rp</span>
            <AnimatedNumber value={safeToSpend} duration={0.6} />
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Proyeksi Saldo Terendah</span>
          <span className={`font-semibold tabular-nums flex items-center gap-0.5 ${minCash < 0 ? 'text-rose-600 font-bold' : 'text-neutral-900'}`}>
            <span>{minCash < 0 ? '− Rp ' : 'Rp '}</span>
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

      {/* Deficit Warning / Safe Box */}
      {!isSafe ? (
        <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200/80 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-rose-800 font-semibold">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-600" />
            <span>Defisit Teridentifikasi di Hari ke-{insolvencyDay || 6}</span>
          </div>
          <p className="text-[11px] text-rose-700 leading-normal">
            Kas menyentuh angka minus sebelum omset tertagih. Disarankan cicil DP 50% atau nego tempo ke supplier.
          </p>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>Rencana Pengeluaran Terverifikasi Aman</span>
          </div>
          <p className="text-[11px] text-emerald-700 leading-normal">
            Likuiditas terjaga tanpa mengorbankan gaji karyawan atau jatuh tempo operasional.
          </p>
        </div>
      )}

      {/* Action Buttons (High-End SaaS Standard: rounded-xl) */}
      <div className="space-y-2 pt-1">
        {!isSafe ? (
          <>
            <MotionButton
              variant="primary"
              size="md"
              onClick={onApplySafeSolution}
              className="w-full h-10 rounded-xl"
            >
              <span>Terapkan Solusi Aman (DP 50%)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </MotionButton>

            <MotionButton
              variant="outline"
              size="md"
              onClick={onOpenNegotiate}
              className="w-full h-10 rounded-xl border-neutral-300"
            >
              <MessageSquare className="h-3.5 w-3.5 text-neutral-600" />
              <span>Draf Pesan WhatsApp Supplier</span>
            </MotionButton>
          </>
        ) : (
          <div className="flex items-center justify-center text-xs text-neutral-600 bg-neutral-50 py-2.5 rounded-xl border border-neutral-200/80 font-medium">
            <span>Rencana pengeluaran terverifikasi aman</span>
          </div>
        )}
      </div>
    </div>
  );
};
