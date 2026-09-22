import React, { useState, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Cpu,
  CornerDownLeft,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AnimatedBadge } from './motion/animated-badge';
import { MotionButton } from './motion/button';
import { Input } from './motion/input';
import { MatrixOrb, type MatrixOrbState } from './ui/matrix-orb';
import { SPRING_PANEL, EASE_OUT } from '../lib/ease';

interface SimulationChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  isSafe: boolean;
  insolvencyDay: number | null;
  minCash: number;
  safeToSpend: number;
  scenarioName: string;
  onApplySafeSolution: () => void;
  onOpenNegotiate: () => void;
  onNewSimulation: (queryText: string) => void;
}

export const SimulationChatModal: React.FC<SimulationChatModalProps> = ({
  isOpen,
  onClose,
  query,
  isSafe,
  insolvencyDay,
  minCash,
  safeToSpend,
  scenarioName,
  onApplySafeSolution,
  onOpenNegotiate,
  onNewSimulation,
}) => {
  const [orbState, setOrbState] = useState<MatrixOrbState>('thinking');
  const [followUpText, setFollowUpText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setOrbState('thinking');
      const timer = setTimeout(() => {
        setOrbState('idle');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, query]);

  const handleSendFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpText.trim()) return;
    setIsProcessing(true);
    setOrbState('thinking');
    onNewSimulation(followUpText);
    setTimeout(() => {
      setIsProcessing(false);
      setOrbState('idle');
      setFollowUpText('');
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            onClick={onClose}
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.7)' }}
            className="fixed inset-0 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Surface */}
          <motion.div
            initial={
              reduce
                ? undefined
                : { scale: 0.96, y: 10 }
            }
            animate={{
              scale: 1,
              y: 0,
            }}
            exit={
              reduce
                ? undefined
                : { scale: 0.96, y: 10 }
            }
            transition={SPRING_PANEL}
            style={{ backgroundColor: '#FFFFFF' }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-neutral-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/90 px-4 py-3">
              <div className="flex items-center gap-2.5">
                {/* Compact Reactive Orb in Header */}
                <div className="h-8 w-8 rounded-full overflow-hidden bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <MatrixOrb
                    state={orbState}
                    size={36}
                    dots={12}
                    color={isSafe ? "#10B981" : "#E11D48"}
                    className="[&_span]:hidden"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-neutral-950 flex items-center gap-1.5">
                    <span>Simulasi Finansial AI</span>
                    <span className="text-[10px] text-neutral-400 font-normal">· CloudBaik VPS</span>
                  </h3>
                  <div className="text-[11px] text-neutral-500 font-normal">
                    {isProcessing ? 'Menganalisis kas...' : 'Hermes Agent Active'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AnimatedBadge
                  status={isSafe ? "success" : "danger"}
                  size="sm"
                  pulse={!isSafe}
                >
                  {isSafe ? 'Kas Aman' : `Defisit H+${insolvencyDay || 6}`}
                </AnimatedBadge>

                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Conversation Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FBFBFC]">
              {/* User Query Message Bubble */}
              <div className="flex flex-col items-end space-y-1">
                <span className="text-[10px] text-neutral-400 px-1 font-medium">Pemilik Usaha</span>
                <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-neutral-950 text-white px-3.5 py-2.5 text-xs leading-relaxed shadow-xs">
                  {query || 'Beli mesin espresso 14 juta tunai aman nggak?'}
                </div>
              </div>

              {/* AI Agent Execution & Reasoning Trace */}
              <div className="rounded-2xl border border-neutral-200/80 bg-white p-3.5 space-y-2 shadow-xs text-xs">
                <div className="flex items-center justify-between font-semibold text-neutral-900 pb-1.5 border-b border-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-neutral-500" />
                    Analisis Deterministik DLMM Core
                  </span>
                  <span className="text-[10px] text-neutral-400 font-normal">Horizon 30 Hari</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600 pt-0.5">
                  <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100">
                    <div className="text-neutral-400">Duit Dingin Aman:</div>
                    <div className="font-semibold text-neutral-900 mt-0.5">Rp {safeToSpend.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100">
                    <div className="text-neutral-400">Proyeksi Terendah:</div>
                    <div className={`font-semibold mt-0.5 ${minCash < 0 ? 'text-rose-600' : 'text-neutral-900'}`}>
                      {minCash < 0 ? `-Rp ${Math.abs(minCash).toLocaleString('id-ID')}` : `Rp ${minCash.toLocaleString('id-ID')}`}
                    </div>
                  </div>
                </div>

                {/* Verdict Box */}
                {!isSafe ? (
                  <div className="mt-2 p-3 rounded-xl bg-rose-50 border border-rose-200/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-rose-800 font-semibold text-xs">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-600" />
                      <span>PERINGATAN: Defisit Kas Hari ke-{insolvencyDay || 6}</span>
                    </div>
                    <p className="text-[11px] text-rose-700 leading-relaxed">
                      Pengeluaran <strong>{scenarioName}</strong> akan menyebabkan kas defisit{' '}
                      <strong>-Rp {Math.abs(minCash).toLocaleString('id-ID')}</strong> saat jadwal gaji barista (H+6) dan tempo kopi (H+11).
                    </p>
                    
                    {/* Action Solutions */}
                    <div className="pt-1 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => {
                          onApplySafeSolution();
                          onClose();
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white py-2 px-3 text-xs font-medium transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <span>Terapkan DP 50%</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>

                      <button
                        onClick={() => {
                          onOpenNegotiate();
                          onClose();
                        }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 py-2 px-3 text-xs font-medium transition-all cursor-pointer active:scale-95"
                      >
                        <MessageSquare className="h-3 w-3 text-neutral-500" />
                        <span>Draf WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      <span>TERVERIFIKASI AMAN</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 leading-relaxed">
                      Pengeluaran <strong>{scenarioName}</strong> tidak mengganggu komitmen gaji & tempo. Saldo kas tetap di atas cadangan Rp 3.000.000.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Persistent Follow-Up Input Composer */}
            <div className="border-t border-neutral-100 bg-white p-3">
              <form onSubmit={handleSendFollowUp} className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={followUpText}
                    onChange={(val) => setFollowUpText(val)}
                    placeholder='Tanyakan alternatif lain... (cth: "Kalau beli 7 jt?")'
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
                <MotionButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!followUpText.trim() || isProcessing}
                  className="h-10 px-4 shrink-0 text-xs"
                >
                  <span>Kirim</span>
                  <CornerDownLeft className="h-3 w-3 opacity-60" />
                </MotionButton>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
