import React, { useState, useEffect } from 'react';
import { PulseCards } from './PulseCards';
import { BoardUIAreaChart } from './BoardUIAreaChart';
import { DecisionIntelligenceCard } from './DecisionIntelligenceCard';
import { Mic, Sparkles, Send } from 'lucide-react';
import { Input } from './motion/input';

interface PresetScenario {
  id: string;
  label: string;
  outflow: number;
  dangerous: boolean;
}

interface DecisionStudioProps {
  businessName?: string;
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
  voiceTranscript: string;
  onSelectPreset: (id: string, amount: number) => void;
  onTriggerVoiceSim: () => void;
  onOpenNegotiate: () => void;
  onApplySafeSolution: () => void;
}

export const DecisionStudio: React.FC<DecisionStudioProps> = ({
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
  voiceTranscript,
  onSelectPreset,
  onTriggerVoiceSim,
  onOpenNegotiate,
  onApplySafeSolution,
}) => {
  const isSafe = insolvencyDay === null;
  const minCash = scenarioCash ? Math.min(...scenarioCash) : Math.min(...baselineCash);
  const [promptText, setPromptText] = useState(voiceTranscript);

  useEffect(() => {
    setPromptText(voiceTranscript);
  }, [voiceTranscript]);

  return (
    <div className="rounded-3xl border border-neutral-200/90 bg-white shadow-handhold overflow-hidden">
      {/* 1. Window Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-100 bg-neutral-50/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          </div>
          <span className="text-xs font-medium text-neutral-500 pl-2.5 border-l border-neutral-200">
            jagausaha.app/sandbox
          </span>
        </div>

        <span className="text-xs font-medium text-neutral-500">
          Simulasi Kas 30 Hari
        </span>
      </div>

      {/* 2. Studio Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Scenario Selector Tabs */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-700 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-neutral-400" />
              Pilih Skenario Belanja Modal:
            </span>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Uji dampak pengeluaran terhadap saldo kas operasional
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
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                      : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/80 hover:border-neutral-300 text-neutral-800'
                  }`}
                >
                  <div className="text-xs font-semibold tracking-tight truncate">
                    {preset.label}
                  </div>
                  <div className={`text-xs tabular-nums mt-0.5 font-normal ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {preset.outflow > 0 ? `Rp ${(preset.outflow / 1_000_000).toFixed(1)} Jt` : 'Beban Rutin'}
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

        {/* 5. Interactive Simulation Prompt & Voice Bar with beUI Input */}
        <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-700">
              Konsultasi Pengeluaran (Teks / Pesan Suara):
            </span>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Ketik keputusan atau uji pesan suara WhatsApp
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="flex-1 w-full">
              <Input
                type="text"
                value={promptText}
                onChange={(val) => setPromptText(val)}
                placeholder='Contoh: "Beli mesin espresso 14 juta tunai"'
                leftIcon={<Mic className="h-4 w-4 text-neutral-400" />}
                success={promptText.length > 5}
              />
            </div>

            <button
              onClick={() => {
                const match = promptText.match(/(\d+([\.,]\d+)?)\s*(juta|jt)/i);
                if (match) {
                  const num = parseFloat(match[1].replace(',', '.')) * 1_000_000;
                  onSelectPreset('custom', num);
                } else {
                  onTriggerVoiceSim();
                }
              }}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-5 h-11 text-xs font-medium transition-all shadow-sm active:scale-95 mb-4 sm:mb-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Simulasikan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
