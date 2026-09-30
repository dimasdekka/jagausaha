import React, { useState, useEffect, useRef } from 'react';
import { PulseCards } from './PulseCards';
import { BoardUIAreaChart } from './BoardUIAreaChart';
import { DecisionIntelligenceCard } from './DecisionIntelligenceCard';
import { SimulationChatModal } from './SimulationChatModal';
import { VoiceBeam, useMicrophone } from 'voice-glow';
import { ThinkingOrb } from 'thinking-orbs';
import { BorderBeam } from 'border-beam';
import { Mic, Send, Sparkles, Lightbulb, ArrowUpRight, Bot, X } from 'lucide-react';

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
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState('Beli mesin espresso 14 juta tunai aman nggak?');

  const customIdeaChips = [
    { label: 'Sewa Ruko Tambahan', amount: 20000000 },
    { label: 'Beli Grinder Kopi Baru', amount: 4500000 },
    { label: 'Renovasi Bar Espresso', amount: 8000000 },
  ];

  const mic = useMicrophone();
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const silenceTimerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  const resetSilenceTimer = (durationMs = 5000) => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
      stopVoiceSession();
    }, durationMs);
  };

  const stopVoiceSession = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (mic.state === 'live') {
      try { mic.stop(); } catch {}
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsVoiceActive(false);
  };

  // Setup Web Speech API for Real Voice Input
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          setPromptText(currentTranscript.trim());
          // Voice detected! Reset silence timer to 3.5 seconds
          resetSilenceTimer(3500);
        }
      };

      recognition.onspeechstart = () => {
        resetSilenceTimer(6000);
      };

      recognition.onspeechend = () => {
        resetSilenceTimer(2500);
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition notice:', event?.error);
        if (event?.error === 'no-speech') {
          // Keep listening until silence timer finishes
          return;
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  const handleToggleVoice = async () => {
    if (isVoiceActive) {
      stopVoiceSession();
      return;
    }

    setIsVoiceActive(true);
    setPromptText('');
    // Start silence timer: if no voice input for 5 seconds, auto-stop
    resetSilenceTimer(5000);

    // Try starting physical microphone stream for VoiceBeam
    try {
      if (mic.supported) {
        await mic.start();
      }
    } catch (e) {
      console.warn('Microphone stream error:', e);
    }

    // Try starting SpeechRecognition for real-time Indonesian transcription
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('SpeechRecognition start error:', e);
      }
    }
  };

  const handleRunSimulation = (queryToRun?: string) => {
    const text = queryToRun || promptText || 'Beli mesin espresso 14 juta tunai aman nggak?';
    setActiveQuery(text);
    setIsThinking(true);

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
      setIsThinking(false);
      setIsChatModalOpen(true);
    }, 400);
  };

  const handleVoiceTest = () => {
    setActiveQuery('Pesan Suara WhatsApp: "Beli mesin espresso 14 juta tunai aman nggak buat gajian barista minggu depan?"');
    onTriggerVoiceSim();
    setTimeout(() => {
      setIsChatModalOpen(true);
    }, 400);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      {/* 1. Authentic Header (No Fake Chrome / Anti-Slop Rule) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-neutral-200 bg-neutral-50/60">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
            Sandbox Simulasi Kas & Keputusan Bisnis
          </h2>
          <p className="text-xs text-neutral-500 font-normal">
            Uji dampak belanja modal terhadap likuiditas kas operasional 30 hari ke depan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            DLMM Safe-to-Spend Aktif
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
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-150 active:scale-[0.98] cursor-pointer flex flex-col justify-between h-full ${
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
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
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
            <BorderBeam
              size="md"
              colorVariant="ocean"
              strength={isThinking ? 0.85 : 0}
              active={isThinking}
            >
              <DecisionIntelligenceCard
                isSafe={isSafe}
                insolvencyDay={insolvencyDay}
                minCash={minCash}
                safeToSpend={safeToSpend}
                scenarioName={scenarioName}
                onOpenNegotiate={onOpenNegotiate}
                onApplySafeSolution={onApplySafeSolution}
              />
            </BorderBeam>
          </div>
        </div>

        {/* 5. Clean, High-Trust AI Financial Command Bar */}
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 sm:p-5 space-y-4 shadow-xs">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-neutral-950 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                <ThinkingOrb
                  state={isVoiceActive ? 'listening' : isThinking ? 'solving' : 'breathing'}
                  size={20}
                  speed={1}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-950 tracking-tight">
                    Konsultasi Keputusan Finansial AI
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    DLMM Safe-to-Spend
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 font-normal">
                  Simulasikan dampak pengeluaran modal kustom terhadap ketahanan kas 30 hari ke depan
                </p>
              </div>
            </div>

            {/* Quick status pill */}
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 bg-neutral-50 border border-neutral-200/70 px-2.5 py-1 rounded-lg">
              <Bot className="h-3.5 w-3.5 text-neutral-400" />
              <span>Hermes Agent Ready</span>
            </div>
          </div>

          {/* VoiceBeam wrapping the Input Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
            <div className="relative flex-1">
              <VoiceBeam
                stream={mic.stream || undefined}
                level={!mic.stream && isVoiceActive ? 0.65 : undefined}
                processing={isThinking}
                colorVariant="ocean"
                theme="light"
              >
                <div className={`relative flex items-center w-full bg-white rounded-xl border transition-all ${
                  isVoiceActive
                    ? 'border-emerald-500 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300 focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900/10'
                }`}>
                  <input
                    type="text"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder={
                      isVoiceActive
                        ? '🔴 Mendengarkan suara Anda... (Bicaralah sekarang)'
                        : 'Tanyakan skenario custom... (cth: "Sewa ruko 20 juta per tahun aman?")'
                    }
                    spellCheck={false}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleRunSimulation();
                      }
                    }}
                    className="w-full h-11 px-4 bg-transparent text-xs sm:text-sm font-normal text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                  {promptText && !isVoiceActive && (
                    <button
                      type="button"
                      onClick={() => setPromptText('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
                      title="Hapus teks"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </VoiceBeam>
            </div>

            {/* Clear, Unmistakable Voice Input Button using ThinkingOrb */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`h-11 px-4 rounded-xl border inline-flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                isVoiceActive
                  ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-700 animate-pulse shadow-md'
                  : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-neutral-300 shadow-2xs active:scale-[0.98]'
              }`}
              title={isVoiceActive ? 'Klik untuk berhenti merekam' : 'Gunakan Voice Input (Bicara langsung via Mikrofon)'}
            >
              <ThinkingOrb
                state={isVoiceActive ? 'listening' : 'breathing'}
                size={20}
                speed={1}
              />
              <span>{isVoiceActive ? 'Berhenti Bicara' : 'Voice Input'}</span>
            </button>

            {/* Simulasikan Action Button */}
            <button
              type="button"
              onClick={() => handleRunSimulation()}
              disabled={isThinking}
              className="h-11 px-5 rounded-xl bg-neutral-950 hover:bg-neutral-850 active:scale-[0.98] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isThinking ? (
                <>
                  <ThinkingOrb state="working" size={20} speed={1} />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Simulasikan</span>
                </>
              )}
            </button>
          </div>

          {/* Clean Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-neutral-100">
            <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
              <Lightbulb className="h-3 w-3 text-amber-500" />
              <span>Eksplorasi Ide:</span>
            </span>
            {customIdeaChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPromptText(chip.label);
                  onSelectPreset('custom', chip.amount);
                  handleRunSimulation(chip.label);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-100/90 text-neutral-700 hover:text-neutral-950 border border-neutral-200/70 hover:border-neutral-300 text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-95 group"
              >
                <span>{chip.label}</span>
                <span className="text-[10px] font-semibold text-neutral-400 group-hover:text-emerald-600 transition-colors">
                  Rp {(chip.amount / 1000000).toLocaleString('id-ID')} Jt
                </span>
                <ArrowUpRight className="h-3 w-3 text-neutral-400 group-hover:text-neutral-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            ))}
            <button
              type="button"
              onClick={handleVoiceTest}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/80 text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-95 group"
            >
              <Mic className="h-3 w-3 text-emerald-600" />
              <span>Simulasi Voice Note Barista</span>
              <ArrowUpRight className="h-3 w-3 text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
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
