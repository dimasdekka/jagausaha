import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingUnified } from './onboarding/OnboardingUnified';

export interface BusinessContextData {
  businessName: string;
  archetype: 'fnb' | 'retail' | 'grocery' | 'services';
  bankName: string;
  initialCash: number;
  safetyBuffer: number;
  payrollAmount: number;
  payrollDay: number;
  fixedRentAmount: number;
  dailyGross: number;
  // Advanced Calibration Data (Opsional untuk Presisi AI)
  weekdayGross?: number;
  weekendGross?: number;
  qrisSharePct?: number;
  utilityExpense?: number;
  cogsMarginPct?: number;
  vendorTempoDays?: number;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: BusinessContextData) => void;
  initialData?: Partial<BusinessContextData>;
  initialTab?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialData,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Scrim Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 backdrop-blur-2xl backdrop-saturate-150 cursor-pointer"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl lg:max-w-5xl rounded-3xl shadow-2xl border border-neutral-200/90 z-10 overflow-hidden flex flex-col my-auto max-h-[92vh]"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Top Modal Header */}
          <div className="px-5 sm:px-6 py-4 border-b border-neutral-200/80 bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center shadow-xs shrink-0">
                <Sparkles className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-950 tracking-tight">
                  Inisialisasi Profil & Radar Usaha
                </h2>
                <p className="text-[11px] text-neutral-500">
                  Satu pintu terpadu: unggah berkas, rekam suara, atau ketik catatan untuk membangun Digital Twin kas Anda
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-xl border border-neutral-200/90 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors shadow-2xs"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Unified Content Area */}
          <div className="overflow-y-auto flex-1 bg-[#ffffff]">
            <OnboardingUnified initialData={initialData} onComplete={onComplete} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
