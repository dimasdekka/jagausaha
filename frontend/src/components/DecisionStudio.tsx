import React, { useState } from 'react';
import { PulseCards } from './PulseCards';
import { BoardUIAreaChart } from './BoardUIAreaChart';
import { DecisionIntelligenceCard } from './DecisionIntelligenceCard';
import { SimulationChatModal } from './SimulationChatModal';
import { ThinkingOrb, type OrbState } from 'thinking-orbs';
import { BorderBeam } from 'border-beam';
import { Mic, Sparkles, Send } from 'lucide-react';
import { Input } from './motion/input';
import { MotionButton } from './motion/button';

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
  onSelectPreset,
  onTriggerVoiceSim,
  onOpenNegotiate,
  onApplySafeSolution,
}) => {
  const isSafe = insolvencyDay === null;
  const minCash = scenarioCash ? Math.min(...scenarioCash) : Math.min(...baselineCash);
  const [promptText, setPromptText] = useState('');
  const [orbState, setOrbState] = useState<OrbState>('breathing');
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState('Beli mesin espresso 14 juta tunai aman nggak?');

  const customIdeaChips = [
    { label: 'Sewa Ruko Tambahan (20 Jt)', amount: 20000000 },
    { label: 'Beli Grinder Kopi Baru (4.5 Jt)', amount: 4500000 },
    { label: 'Renovasi Bar Espresso (8 Jt)', amount: 8000000 },
  ];

  const handleRunSimulation = (queryToRun?: string) => {
    const text = queryToRun || promptText || 'Beli mesin espresso 14 juta tunai aman nggak?';
    setActiveQuery(text);
    setOrbState('solving');

    // Parse amount from text if custom
    const match = text.match(/(\d+([\.,]\d+)?)\s*(juta|jt)/i);
    if (match) {
      const num = parseFloat(match[1].replace(',', '.')) * 1_000_000;
      onSelectPreset('custom', num);
    } else {
      const found = presets.find(p => text.toLowerCase().includes(p.label.toLowerCase()));
      if (found) {
        onSelectPreset(found.id, found.outflow);
      }
    }

    setTimeout(() => {
      setOrbState('breathing');
      setIsChatModalOpen(true);
    }, 350);
  };

  const handleVoiceTest = () => {
    setOrbState('listening');
    setActiveQuery('Pesan Suara WhatsApp: "Beli mesin espresso 14 juta tunai aman nggak buat gajian barista minggu depan?"');
    onTriggerVoiceSim();
    setTimeout(() => {
      setOrbState('solving');
      setTimeout(() => {
        setOrbState('breathing');
        setIsChatModalOpen(true);
      }, 400);
    }, 600);
  };

  return (
    <div className="rounded-3xl border border-neutral-200/90 bg-white shadow-handhold overflow-hidden">
      {/* 1. Window Header (macOS Terminal / Studio Top Bar) */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-100 bg-neutral-50/70">
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

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-neutral-600">
            Simulasi Kas 30 Hari · DLMM Engine
          </span>
        </div>
      </div>

      {/* 2. Studio Body */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Scenario Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Pilih Skenario Keputusan Bisnis:
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Uji dampak belanja modal terhadap likuiditas kas operasional
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {presets.map((preset) => {
              const isSelected = activePreset === preset.id;
              const isDangerous = preset.dangerous;
              const isRecommended = preset.id === 'espresso_restructured';

              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset.id, preset.outflow)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-150 active:scale-[0.98] cursor-pointer flex flex-col justify-between h-full ${
                    isSelected
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-md ring-2 ring-neutral-900/10'
                      : isDangerous
                      ? 'border-rose-200/80 bg-rose-50/20 hover:bg-rose-50/50 hover:border-rose-300 text-slate-900'
                      : isRecommended
                      ? 'border-emerald-200/80 bg-emerald-50/20 hover:bg-emerald-50/50 hover:border-emerald-300 text-slate-900'
                      : 'border-slate-200/80 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        isSelected
                          ? 'bg-neutral-800 text-neutral-200 border-neutral-700'
                          : isDangerous
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : isRecommended
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {isDangerous ? 'Risiko Defisit' : isRecommended ? 'Solusi Aman' : 'Beban Rutin'}
                      </span>
                    </div>

                    <div className="text-xs font-bold tracking-tight">
                      {preset.label}
                    </div>
                  </div>

                  <div className={`text-xs tabular-nums mt-2.5 font-semibold ${isSelected ? 'text-neutral-300' : 'text-slate-600'}`}>
                    {preset.outflow > 0 ? `Rp ${(preset.outflow / 1_000_000).toFixed(1)} Jt` : 'Beban Rutin'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Three Clean Financial Metric Cards with Real-time Delta Impact */}
        <PulseCards
          safeToSpend={safeToSpend}
          currentCash={currentCash}
          runwayDays={runwayDays}
          dailyGross={dailyGross}
          safetyBuffer={safetyBuffer}
          minCash={minCash}
          isSafe={isSafe}
          insolvencyDay={insolvencyDay}
        />

        {/* 4. Main Two-Column View (Chart + Decision Intelligence) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Recharts Area Chart */}
          <div className="lg:col-span-7 flex flex-col">
            <BoardUIAreaChart
              days={baselineDays}
              baseline={baselineCash}
              scenario={scenarioCash}
              insolvencyDay={insolvencyDay}
              scenarioName={scenarioName}
              safetyBuffer={safeToSpend}
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

        {/* 5. Raycast-Style Ambient AI Command Bar */}
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 sm:p-5 space-y-3.5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white overflow-hidden shadow-xs">
                <ThinkingOrb
                  state={orbState === 'listening' ? 'listening' : 'breathing'}
                  size={20}
                  speed={1}
                  theme="dark"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-950">
                    Konsultasi Keputusan Finansial AI
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 border border-emerald-200/60 px-2 py-0.2 rounded-full">
                    DLMM Engine
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 font-normal">
                  Simulasi dampak pengeluaran modal kustom terhadap arus kas 30 hari ke depan
                </div>
              </div>
            </div>
          </div>

          {/* Input Row with Reactive ThinkingOrb & Input Wrapped in BorderBeam */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Live Interactive ThinkingOrb Avatar Scale (64px) */}
            <div
              onClick={handleVoiceTest}
              className="hidden sm:flex items-center justify-center h-11 w-11 rounded-xl bg-neutral-50 border border-neutral-200/90 shadow-2xs cursor-pointer hover:border-neutral-400 hover:scale-105 transition-all shrink-0 overflow-hidden"
              title="ThinkingOrb AI Voice Simulation - Klik untuk uji suara"
            >
              <ThinkingOrb
                state={orbState === 'listening' ? 'listening' : (promptText ? 'composing' : 'searching')}
                size={64}
                speed={1}
                theme="light"
              />
            </div>

            {/* Input Bar with RGB BorderBeam (Around Input Field Itself) */}
            <div className="flex-1 w-full relative">
              <BorderBeam
                size="sm"
                colorVariant="colorful"
                strength={0.85}
                theme="light"
                borderRadius={9999}
              >
                <Input
                  type="text"
                  value={promptText}
                  onChange={(val) => setPromptText(val)}
                  placeholder='Tanyakan skenario custom... (cth: "Sewa ruko 20 juta per tahun aman?")'
                  leftIcon={
                    <button
                      type="button"
                      onClick={handleVoiceTest}
                      title="Klik untuk uji simulasi pesan suara WhatsApp"
                      className="p-0.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                  }
                  spellCheck={false}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleRunSimulation();
                    }
                  }}
                />
              </BorderBeam>
            </div>

            {/* Simulate Action Button */}
            <MotionButton
              type="button"
              variant="primary"
              size="md"
              onClick={() => handleRunSimulation()}
              className="w-full sm:w-auto shrink-0 h-10 px-5 rounded-xl gap-2 text-xs font-semibold"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Simulasikan</span>
            </MotionButton>
          </div>

          {/* Custom Exploratory Idea Chips (No Redundancy) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[11px] font-medium text-neutral-400">Eksplorasi Ide Lain:</span>
            {customIdeaChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPromptText(chip.label);
                  onSelectPreset('custom', chip.amount);
                  handleRunSimulation(chip.label);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-[11px] font-medium text-neutral-700 transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Smooth beUI Simulation Chat Modal */}
      <SimulationChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        query={activeQuery}
        isSafe={isSafe}
        insolvencyDay={insolvencyDay}
        minCash={minCash}
        safeToSpend={safeToSpend}
        scenarioName={scenarioName}
        onApplySafeSolution={onApplySafeSolution}
        onOpenNegotiate={onOpenNegotiate}
        onNewSimulation={(text) => handleRunSimulation(text)}
      />
    </div>
  );
};
