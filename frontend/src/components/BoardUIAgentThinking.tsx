import React, { useEffect, useState } from 'react';
import { Check, CircleDashed, AlertTriangle } from 'lucide-react';

export interface ThinkingStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  detail?: string;
}

interface BoardUIAgentThinkingProps {
  steps: ThinkingStep[];
  label?: string;
  className?: string;
}

// BoardUI Dot Wave Indicator
function DotWaveIndicator() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 8);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-1 w-4 h-4 shrink-0">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const isLit = (i + phase) % 3 === 0;
        return (
          <span
            key={i}
            className={`w-1 h-1 rounded-full transition-opacity duration-200 ${
              isLit ? 'bg-emerald-600 opacity-100' : 'bg-neutral-300 opacity-30'
            }`}
          />
        );
      })}
    </div>
  );
}

// BoardUI Elapsed Timer
function ElapsedTimer() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const started = performance.now();
    const id = setInterval(() => {
      setElapsed((performance.now() - started) / 1000);
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[11px] text-neutral-400 tabular-nums">
      {elapsed.toFixed(1)}s
    </span>
  );
}

export const BoardUIAgentThinking: React.FC<BoardUIAgentThinkingProps> = ({
  steps,
  label = 'Hermes Agent Thinking',
  className = '',
}) => {
  return (
    <div className={`rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm ${className}`}>
      {/* BoardUI Header Bar */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 mb-3.5">
        <div className="flex items-center gap-2.5">
          <DotWaveIndicator />
          <span className="text-xs font-semibold text-neutral-900 tracking-tight">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ElapsedTimer />
          <span className="text-[10px] font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            DLMM Core
          </span>
        </div>
      </div>

      {/* Step Breakdown */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isDone = step.status === 'completed';
          const isRunning = step.status === 'running';
          const isFailed = step.status === 'failed';

          return (
            <div key={step.id} className="flex items-start gap-2.5 text-xs">
              <div className="mt-0.5 shrink-0">
                {isDone && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
                {isRunning && (
                  <CircleDashed className="w-4 h-4 text-amber-600 animate-spin" />
                )}
                {isFailed && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <AlertTriangle className="w-2.5 h-2.5" />
                  </div>
                )}
                {!isDone && !isRunning && !isFailed && (
                  <div className="w-4 h-4 rounded-full border border-neutral-300 bg-neutral-50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium tracking-tight ${isDone ? 'text-neutral-800' : isRunning ? 'text-amber-700' : 'text-neutral-400'}`}>
                  {step.label}
                </p>
                {step.detail && (
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5 leading-relaxed break-words">
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
