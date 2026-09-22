import React, { useState } from 'react';
import { Terminal, ChevronDown, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AnimatedBadge } from './motion/animated-badge';
import { EASE_OUT } from '../lib/ease';

interface TerminalDrawerProps {
  logs: string[];
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({ logs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm text-xs">
      {/* Header Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-neutral-50/80 hover:bg-neutral-100 text-neutral-700 transition-colors border-b border-neutral-200/80 cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <Terminal className="h-4 w-4 text-neutral-950" />
          <span className="font-semibold text-xs text-neutral-900 tracking-tight">
            Aktivitas Eksekusi Agen & Telemetri CloudBaik VPS
          </span>
          <AnimatedBadge status="success" size="sm" pulse={true}>
            RAM: 142MB / 4GB
          </AnimatedBadge>
        </div>
        <div className="flex items-center gap-2 text-neutral-500">
          <span className="text-[11px] font-medium">{logs.length} eksekusi tercatat</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </button>

      {/* beUI Animated Agent Activity Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="p-4 max-h-64 overflow-y-auto space-y-2 bg-[#0D1117] text-neutral-200 font-mono text-xs select-text">
              <div className="text-neutral-500 pb-2 border-b border-neutral-800 text-[11px] flex items-center justify-between">
                <span>[IDwebhost AI Hosting] Hermes Agent Runtime v0.21.2 on CloudBaik VPS (4 vCPU / 4GB RAM)</span>
                <span className="text-emerald-500">● Live Execution</span>
              </div>
              {logs.map((log, idx) => {
                const isAlert = log.includes('BAHAYA') || log.includes('CRASH') || log.includes('Defisit') || log.includes('RISIKO');
                const isSuccess = log.includes('SUCCESS') || log.includes('AMAN');
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 py-0.5 leading-relaxed ${
                      isAlert ? 'text-rose-400 font-medium' : isSuccess ? 'text-emerald-400' : 'text-neutral-300'
                    }`}
                  >
                    <span className="text-neutral-600 select-none text-[11px] pt-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {isAlert && <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5 text-rose-400" />}
                    {isSuccess && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-400" />}
                    {!isAlert && !isSuccess && <Cpu className="h-3.5 w-3.5 shrink-0 mt-0.5 text-neutral-500" />}
                    <span className="break-all">{log}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
