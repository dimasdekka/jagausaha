import React, { useState } from 'react';
import { Terminal, ChevronUp, ChevronDown, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TerminalDrawerProps {
  logs: string[];
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({ logs }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm text-xs">
      {/* Header Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-neutral-50/80 hover:bg-neutral-100 text-neutral-700 transition-colors border-b border-neutral-200/80"
      >
        <div className="flex items-center gap-2.5">
          <Terminal className="h-4 w-4 text-neutral-950" />
          <span className="font-semibold text-xs text-neutral-900 tracking-tight">
            Terminal Telemetri IDwebhost CloudBaik VPS & Hermes Agent
          </span>
          <span className="text-[10px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            RAM: 142MB / 4GB
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <span className="text-[11px] font-mono">{logs.length} events</span>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </div>
      </button>

      {/* Terminal Body */}
      {isOpen && (
        <div className="p-4 max-h-64 overflow-y-auto space-y-1.5 bg-[#0D1117] text-neutral-200 font-mono text-xs select-text">
          <div className="text-neutral-500 pb-2 border-b border-neutral-800 text-[11px]">
            [IDwebhost AI Hosting] Hermes Agent Runtime v0.21.2 on CloudBaik VPS (4 vCPU / 4GB RAM / 20GB SSD)
          </div>
          {logs.map((log, idx) => {
            const isAlert = log.includes('BAHAYA') || log.includes('CRASH') || log.includes('Defisit') || log.includes('RISIKO');
            const isSuccess = log.includes('SUCCESS') || log.includes('AMAN');
            return (
              <div
                key={idx}
                className={`flex items-start gap-2 leading-relaxed ${
                  isAlert ? 'text-rose-400 font-medium' : isSuccess ? 'text-emerald-400' : 'text-neutral-300'
                }`}
              >
                <span className="text-neutral-600 select-none">{String(idx + 1).padStart(2, '0')}</span>
                {isAlert && <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5 text-rose-400" />}
                {isSuccess && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-400" />}
                <span className="break-all">{log}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
