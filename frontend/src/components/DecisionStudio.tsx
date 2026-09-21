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
    <div className="rounded-3xl border border-neutral-200/90 bg-white shadow-handhold overflow-hidden">
      {/* 1. Handhold-Style Minimal Window Bar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-100 bg-neutral-50/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          </div>
          <span className="text-xs font-mono text-neutral-500 pl-2.5 border-l border-neutral-200">
            jagausaha.app/guardian — {businessName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Real-Time Monitor
          </span>
        </div>
      </div>

      {/* 2. Studio Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Scenario Selector Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-neutral-400" />
              Pilih Skenario Keputusan:
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              Uji dampak pengeluaran terhadap jadwal kas 30 hari
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {presets.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset.id, preset.outflow)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-150 active:scale-[0.98] ${
                    isSelected
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                      : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 hover:border-neutral-300 text-neutral-800'
                  }`}
                >
                  <div className="text-xs font-semibold tracking-tight truncate">
                    {preset.label}
                  </div>
                  <div className={`text-[11px] font-mono mt-0.5 ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
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

        {/* 5. Voice AI Companion Bar (Rare UI MatrixOrb) */}
        <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              onClick={onTriggerVoiceSim}
              className="cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95"
              title="Klik untuk Simulasi Pesan Suara"
            >
              <MatrixOrb
                state={orbState}
                size={52}
                color={!isSafe ? '#E11D48' : '#059669'}
                dots={9}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-900">
                  Konsultasi Suara (WhatsApp Voice Note)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-neutral-200/70 text-neutral-700">
                  Whisper AI
                </span>
              </div>
              <p className="text-xs text-neutral-600 italic mt-0.5 line-clamp-1">
                {voiceTranscript}
              </p>
            </div>
          </div>

          <button
            onClick={onTriggerVoiceSim}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-5 py-2 text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <Mic className="h-3.5 w-3.5 text-emerald-400" />
            <span>Simulasi Voice Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};
