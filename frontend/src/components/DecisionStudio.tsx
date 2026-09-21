import React from 'react';
import { PulseCards } from './PulseCards';
import { BoardUIAreaChart } from './BoardUIAreaChart';
import { DecisionIntelligenceCard } from './DecisionIntelligenceCard';
import { MatrixOrb, type MatrixOrbState } from './ui/matrix-orb';
import { Mic, Sparkles } from 'lucide-react';

interface PresetScenario {
  id: string;
  label: string;
  outflow: number;
  dangerous: boolean;
}

interface DecisionStudioProps {
  businessName: string;
  currentCash: number;
  safeToSpend: number;
  safetyBuffer: number;
  runwayDays: number;
  dailyGross: number;
  baselineDays: number[];
  baselineCash: number[];
  scenarioCash?: number[];
  insolvencyDay: number | null;
  scenarioName: string;
  activePreset: string;
  presets: PresetScenario[];
  orbState: MatrixOrbState;
  voiceTranscript: string;
  onSelectPreset: (id: string, amount: number) => void;
  onTriggerVoiceSim: () => void;
  onOpenNegotiate: () => void;
  onApplySafeSolution: () => void;
}

export const DecisionStudio: React.FC<DecisionStudioProps> = ({
  businessName,
  currentCash,
  safeToSpend,
  safetyBuffer,
  runwayDays,
  dailyGross,
  baselineDays,
  baselineCash,
  scenarioCash,
  insolvencyDay,
  scenarioName,
  activePreset,
  presets,
  orbState,
  voiceTranscript,
  onSelectPreset,
  onTriggerVoiceSim,
  onOpenNegotiate,
  onApplySafeSolution,
}) => {
  const isSafe = insolvencyDay === null;
  const minCash = scenarioCash ? Math.min(...scenarioCash) : Math.min(...baselineCash);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-stripe overflow-hidden">
      {/* 1. Stripe Window Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-400/90" />
            <span className="h-3 w-3 rounded-full bg-amber-400/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
          </div>
          <span className="text-xs font-mono text-slate-500 pl-2.5 border-l border-slate-200">
            jagausaha.app/sandbox — {businessName} (Tebet, Jaksel)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Kas Terpantau Real-Time
          </span>
        </div>
      </div>

      {/* 2. Studio Body */}
      <div className="p-6 sm:p-8 space-y-7">
        {/* Scenario Selector Tabs */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-indigo" />
              Pilih Skenario Keputusan Bisnis:
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Uji dampak pengeluaran terhadap jadwal gaji & tempo 30 hari
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {presets.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset.id, preset.outflow)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-150 active:scale-[0.98] ${
                    isSelected
                      ? 'border-brand-indigo bg-navy-950 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300 text-navy-900'
                  }`}
                >
                  <div className="text-xs font-bold tracking-tight truncate">
                    {preset.label}
                  </div>
                  <div className={`text-[11px] font-mono mt-0.5 ${isSelected ? 'text-brand-teal font-semibold' : 'text-slate-500'}`}>
                    {preset.outflow > 0 ? `Rp ${(preset.outflow / 1_000_000).toFixed(1)} Jt` : 'Rutin Bulanan'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Three Clean Financial Metric Cards */}
        <PulseCards
          safeToSpend={safeToSpend}
          currentCash={currentCash}
          runwayDays={runwayDays}
          dailyGross={dailyGross}
          safetyBuffer={safetyBuffer}
        />

        {/* 4. Main Two-Column View (Chart + Decision Intelligence) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Recharts Area Chart */}
          <div className="lg:col-span-7 flex flex-col">
            <BoardUIAreaChart
              days={baselineDays}
              baseline={baselineCash}
              scenario={scenarioCash}
              insolvencyDay={insolvencyDay}
              scenarioName={scenarioName}
              safetyBuffer={safetyBuffer}
            />
          </div>

          {/* Right: Decision Intelligence & Action Plan */}
          <div className="lg:col-span-5 flex flex-col">
            <DecisionIntelligenceCard
              isSafe={isSafe}
              insolvencyDay={insolvencyDay}
              minCash={minCash}
              safeToSpend={safeToSpend}
              scenarioName={scenarioName}
              onOpenNegotiate={onOpenNegotiate}
              onApplySafeSolution={onApplySafeSolution}
            />
          </div>
        </div>

        {/* 5. Voice AI Note Assistant Bar */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              onClick={onTriggerVoiceSim}
              className="cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95"
              title="Klik untuk Simulasi Pesan Suara"
            >
              <MatrixOrb
                state={orbState}
                size={54}
                color={!isSafe ? '#DF1B41' : '#10B981'}
                dots={9}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-navy-900">
                  Konsultasi Suara (WhatsApp Voice Note)
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.2 rounded-full bg-white border border-slate-200 text-brand-indigo">
                  Whisper Ingestion
                </span>
              </div>
              <p className="text-xs text-slate-700 italic mt-0.5 line-clamp-1">
                {voiceTranscript}
              </p>
            </div>
          </div>

          <button
            onClick={onTriggerVoiceSim}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-brand-indigo hover:bg-brand-violet text-white px-5 py-2.5 text-xs font-bold transition-all shadow-stripe-card active:scale-95"
          >
            <Mic className="h-3.5 w-3.5 text-brand-teal" />
            <span>Simulasi Voice Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};
