import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Coffee,
  ShoppingBag,
  Store,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionButton } from './motion/button';

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
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [businessName, setBusinessName] = useState(initialData?.businessName || 'Kopi Teras Barokah');
  const [archetype, setArchetype] = useState<'fnb' | 'retail' | 'grocery' | 'services'>(
    initialData?.archetype || 'fnb'
  );
  const [bankName, setBankName] = useState(initialData?.bankName || 'BCA');
  const [initialCashStr, setInitialCashStr] = useState(
    initialData?.initialCash ? initialData.initialCash.toString() : '18500000'
  );
  const [safetyBufferStr, setSafetyBufferStr] = useState(
    initialData?.safetyBuffer ? initialData.safetyBuffer.toString() : '3000000'
  );
  const [payrollAmountStr, setPayrollAmountStr] = useState(
    initialData?.payrollAmount ? initialData.payrollAmount.toString() : '7500000'
  );
  const [payrollDay, setPayrollDay] = useState<number>(initialData?.payrollDay || 30);
  const [fixedRentAmountStr, setFixedRentAmountStr] = useState(
    initialData?.fixedRentAmount ? initialData.fixedRentAmount.toString() : '4200000'
  );
  const [dailyGrossStr, setDailyGrossStr] = useState(
    initialData?.dailyGross ? initialData.dailyGross.toString() : '900000'
  );

  const parsedCash = parseInt(initialCashStr, 10) || 0;
  const parsedBuffer = parseInt(safetyBufferStr, 10) || 0;
  const parsedPayroll = parseInt(payrollAmountStr, 10) || 0;
  const parsedRent = parseInt(fixedRentAmountStr, 10) || 0;
  const parsedDaily = parseInt(dailyGrossStr, 10) || 0;

  // Immediate deterministic formula for Safe-to-Spend
  const instantSafeToSpend = Math.max(0, parsedCash - parsedPayroll - parsedBuffer);

  const archetypes = [
    {
      id: 'fnb',
      label: 'Kafe, Resto & F&B',
      desc: 'Bahan baku harian, perputaran kas cepat, gajian barista tgl 25-30',
      icon: Coffee,
      defaultCash: 18500000,
      defaultBuffer: 3000000,
      defaultPayroll: 7500000,
      defaultRent: 4200000,
      defaultDaily: 900000,
    },
    {
      id: 'retail',
      label: 'Retail & Fashion / Olshop',
      desc: 'Pencairan COD marketplace H+3, belanja stok musiman',
      icon: ShoppingBag,
      defaultCash: 25000000,
      defaultBuffer: 5000000,
      defaultPayroll: 9000000,
      defaultRent: 5000000,
      defaultDaily: 1200000,
    },
    {
      id: 'grocery',
      label: 'Warung & Toko Kelontong',
      desc: 'Margin tipis 10-15%, tempo supplier sembako 7-14 hari',
      icon: Store,
      defaultCash: 12000000,
      defaultBuffer: 2500000,
      defaultPayroll: 4500000,
      defaultRent: 3000000,
      defaultDaily: 1100000,
    },
    {
      id: 'services',
      label: 'Jasa & Agensi Kreatif',
      desc: 'Termin invoice DP 50% + Pelunasan H+30, beban utama gaji tim',
      icon: Briefcase,
      defaultCash: 35000000,
      defaultBuffer: 8000000,
      defaultPayroll: 18000000,
      defaultRent: 6000000,
      defaultDaily: 1500000,
    },
  ];

  const handleSelectArchetype = (arc: (typeof archetypes)[0]) => {
    setArchetype(arc.id as any);
    setInitialCashStr(arc.defaultCash.toString());
    setSafetyBufferStr(arc.defaultBuffer.toString());
    setPayrollAmountStr(arc.defaultPayroll.toString());
    setFixedRentAmountStr(arc.defaultRent.toString());
    setDailyGrossStr(arc.defaultDaily.toString());
  };

  const handleFinish = () => {
    onComplete({
      businessName,
      archetype,
      bankName,
      initialCash: parsedCash,
      safetyBuffer: parsedBuffer,
      payrollAmount: parsedPayroll,
      payrollDay,
      fixedRentAmount: parsedRent,
      dailyGross: parsedDaily,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Scrim (100% Guaranteed Dark Frosted) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 cursor-pointer"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}
        />

        {/* Modal Surface (100% Solid Pure White, Zero Bleed-Through) */}
        <motion.div
          initial={{ scale: 0.96, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#ffffff', opacity: 1 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_24px_64px_rgba(0,0,0,0.25)] overflow-hidden z-10 my-auto text-slate-900"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-950">
                  Inisialisasi Konteks Usaha Baru
                </h2>
                <p className="text-xs text-slate-500">
                  Bagaimana AI memahami peta likuiditas bisnismu sejak Hari ke-1 (Zero Historical Data)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="px-6 pt-4 pb-2 bg-white">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span className={step >= 1 ? 'text-slate-950 font-bold' : ''}>1. Profil & Model Usaha</span>
              <span className={step >= 2 ? 'text-slate-950 font-bold' : ''}>2. Modal Kas & Buffer</span>
              <span className={step >= 3 ? 'text-slate-950 font-bold' : ''}>3. Komitmen Wajib Bulanan</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-950 transition-all duration-300"
                style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
              />
            </div>
          </div>

          {/* Step 1: Profil & Archetype Industri */}
          {step === 1 && (
            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Nama Usaha / Toko</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                  placeholder="Contoh: Kopi Teras Barokah, Toko Roti Sedap"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Pilih Archetype Industri Terdekat (AI Memuat Standar Parameter Otomatis):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {archetypes.map((arc) => {
                    const Icon = arc.icon;
                    const isSelected = archetype === arc.id;
                    return (
                      <button
                        key={arc.id}
                        type="button"
                        onClick={() => handleSelectArchetype(arc)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className={`h-4 w-4 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                          <span className="text-xs font-bold">{arc.label}</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {arc.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Modal Kas & Buffer */}
          {step === 2 && (
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Rekening Bank Operasional</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-slate-400"
                  >
                    <option value="BCA">BCA (Bank Central Asia)</option>
                    <option value="Mandiri">Bank Mandiri</option>
                    <option value="BRI">Bank BRI</option>
                    <option value="BNI">Bank BNI</option>
                    <option value="Cash">Kas Tunai / Laci Toko</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Saldo Kas Riil Saat Ini (Rp)</label>
                  <input
                    type="number"
                    value={initialCashStr}
                    onChange={(e) => setInitialCashStr(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 tabular-nums focus:outline-none focus:border-slate-400"
                    placeholder="18500000"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-700" />
                    Cadangan Darurat Minimum (Safety Buffer)
                  </span>
                  <span className="text-xs font-extrabold text-emerald-900 tabular-nums">
                    Rp {parsedBuffer.toLocaleString('id-ID')}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Batas saldo yang <strong>dilarang disentuh sama sekali</strong> oleh AI untuk belanja modal. Menjamin toko tidak gulung tikar jika terjadi darurat operasional.
                </p>
                <div className="flex gap-2 pt-1">
                  {[2000000, 3000000, 5000000, 10000000].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSafetyBufferStr(b.toString())}
                      className="px-2.5 py-1 rounded-lg border border-emerald-300 bg-white text-[11px] font-semibold text-emerald-900 cursor-pointer hover:bg-emerald-100"
                    >
                      {b / 1000000} Jt
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Komitmen Rutin Wajib Bulanan */}
          {step === 3 && (
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">Total Gaji Karyawan Bulanan</label>
                    <div className="flex items-center gap-1">
                      <span className="text-[10.5px] text-slate-500 font-medium">Jadwal:</span>
                      <select
                        value={payrollDay}
                        onChange={(e) => setPayrollDay(parseInt(e.target.value, 10))}
                        className="text-[11px] font-bold text-slate-800 border border-slate-200 rounded px-1.5 py-0.5 bg-white cursor-pointer"
                      >
                        <option value={25}>Tgl 25</option>
                        <option value={28}>Tgl 28</option>
                        <option value={30}>Tgl 30</option>
                        <option value={1}>Tgl 1</option>
                      </select>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={payrollAmountStr}
                    onChange={(e) => setPayrollAmountStr(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 tabular-nums focus:outline-none focus:border-slate-400"
                    placeholder="7500000"
                  />
                  <div className="text-[10.5px] text-slate-500">Komitmen gaji terlindungi otomatis oleh Safe-to-Spend</div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Sewa / Tempo Supplier Rutin (Rp)</label>
                  <input
                    type="number"
                    value={fixedRentAmountStr}
                    onChange={(e) => setFixedRentAmountStr(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 tabular-nums focus:outline-none focus:border-slate-400"
                    placeholder="4200000"
                  />
                  <div className="text-[10.5px] text-slate-500">Estimasi jatuh tempo: Tanggal 5-10</div>
                </div>
              </div>

              {/* Instant DLMM Safe-to-Spend Computation Preview */}
              <div className="p-4 rounded-2xl bg-neutral-950 text-white space-y-2.5 shadow-md">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Hasil Kalibrasi Awal Safe-to-Spend (Duit Dingin Aman):</span>
                  <span className="text-emerald-400 font-bold">● DLMM Siap Aktif</span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-extrabold text-white tracking-tight tabular-nums">
                    Rp {instantSafeToSpend.toLocaleString('id-ID')}
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                    Bebas Belanja CapEx
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between font-mono">
                  <span>Kas Rp {(parsedCash / 1000000).toFixed(1)}M - Gaji Rp {(parsedPayroll / 1000000).toFixed(1)}M - Buffer Rp {(parsedBuffer / 1000000).toFixed(1)}M</span>
                  <strong className="text-white">Aman Gajian</strong>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Sebelumnya</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <MotionButton
                type="button"
                variant="primary"
                size="md"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold"
              >
                <span>Lanjutkan</span>
                <ArrowRight className="h-4 w-4" />
              </MotionButton>
            ) : (
              <MotionButton
                type="button"
                variant="primary"
                size="md"
                onClick={handleFinish}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
              >
                <Sparkles className="h-4 w-4" />
                <span>Aktifkan Radar Finansial JagaUsaha</span>
              </MotionButton>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
