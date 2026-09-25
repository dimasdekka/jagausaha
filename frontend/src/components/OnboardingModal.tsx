import React, { useState } from 'react';
import { Sparkles, Mic, FileText, Settings2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingVoiceChat } from './onboarding/OnboardingVoiceChat';
import { OnboardingDocumentUpload } from './onboarding/OnboardingDocumentUpload';
import { OnboardingManualForm } from './onboarding/OnboardingManualForm';

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
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: BusinessContextData) => void;
  initialData?: Partial<BusinessContextData>;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialData,
}) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'document' | 'manual'>('voice');

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
          className="fixed inset-0 backdrop-blur-md cursor-pointer"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-[16px] shadow-2xl border border-[#e5e5e5] z-10 overflow-hidden flex flex-col my-auto max-h-[92vh]"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Top Modal Header */}
          <div className="px-6 py-4 border-b border-[#e5e5e5] bg-[#ffffff] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[8px] bg-[#0a0a0a] text-white flex items-center justify-center shadow-dub-subtle">
                <Sparkles className="h-4 w-4 text-[#2563eb]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#171717] tracking-tight">
                  Inisialisasi Konteks Usaha Baru
                </h2>
                <p className="text-[11px] text-[#737373]">
                  Pilih metode termudah untuk mengenalkan kondisi riil bisnis Anda ke JagaUsaha
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-[8px] border border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] flex items-center justify-center text-[#737373] hover:text-[#171717] cursor-pointer transition-colors shadow-dub-subtle"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mode Switcher Tabs (Dub Style Pills) */}
          <div className="px-6 py-2.5 bg-[#f5f5f5] border-b border-[#e5e5e5] flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('voice')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-dub-subtle ${
                activeTab === 'voice'
                  ? 'bg-[#0a0a0a] text-white'
                  : 'bg-[#ffffff] text-[#525252] hover:text-[#171717] border border-[#e5e5e5]'
              }`}
            >
              <Mic className={`h-3.5 w-3.5 ${activeTab === 'voice' ? 'text-[#2563eb]' : ''}`} />
              <span>1. Ngobrol via Suara / AI</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('document')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-dub-subtle ${
                activeTab === 'document'
                  ? 'bg-[#0a0a0a] text-white'
                  : 'bg-[#ffffff] text-[#525252] hover:text-[#171717] border border-[#e5e5e5]'
              }`}
            >
              <FileText className={`h-3.5 w-3.5 ${activeTab === 'document' ? 'text-[#2563eb]' : ''}`} />
              <span>2. Kirim Laporan Keuangan + Suara/Teks</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('manual')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-dub-subtle ${
                activeTab === 'manual'
                  ? 'bg-[#0a0a0a] text-white'
                  : 'bg-[#ffffff] text-[#525252] hover:text-[#171717] border border-[#e5e5e5]'
              }`}
            >
              <Settings2 className={`h-3.5 w-3.5 ${activeTab === 'manual' ? 'text-[#2563eb]' : ''}`} />
              <span>3. Form Cepat Terpandu</span>
            </button>
          </div>

          {/* Modal Tab Content Area */}
          <div className="overflow-y-auto flex-1 bg-[#ffffff]">
            {activeTab === 'voice' && (
              <OnboardingVoiceChat onComplete={onComplete} />
            )}
            {activeTab === 'document' && (
              <OnboardingDocumentUpload onComplete={onComplete} />
            )}
            {activeTab === 'manual' && (
              <OnboardingManualForm initialData={initialData} onComplete={onComplete} />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
