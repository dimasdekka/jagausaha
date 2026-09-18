import React from 'react';
import { Check, CircleDashed, AlertTriangle } from 'lucide-react';

export interface ThinkingStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  detail?: string;
}

interface AgentThinkingProps {
  steps: ThinkingStep[];
  className?: string;
}

export const AgentThinking: React.FC<AgentThinkingProps> = ({ steps, className = '' }) => {
  return (
    <div className={`rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
        <span className="text-xs font-semibold text-neutral-800 tracking-tight">
          Hermes Agent Reasoning
        </span>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          DLMM Core
        </span>
      </div>

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
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5 leading-normal truncate">
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
