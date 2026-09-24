import React, { useState } from 'react';
import {
  Coffee,
  ShoppingBag,
  Store,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { MotionButton } from '../motion/button';
import type { BusinessContextData } from '../OnboardingModal';

interface OnboardingManualFormProps {
  initialData?: Partial<BusinessContextData>;
  onComplete: (data: BusinessContextData) => void;
}

export const OnboardingManualForm: React.FC<OnboardingManualFormProps> = ({
  initialData,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

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

  const instantSafeToSpend = Math.max(0, parsedCash - parsedPayroll - parsedBuffer);

  const archetypes = [
    {
      id: 'fnb',
      label: 'Kafe, Resto & F&B',
      desc: 'Bahan baku harian, perputaran kas cepat, gajian barista tgl 25–30',
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
      desc: 'Margin tipis 10–15%, tempo supplier sembako 7–14 hari',
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

  // Custom Bank Options without native HTML select
  const bankOptions = [
    { id: 'BCA', name: 'BCA', desc: 'Bank Central Asia', tag: 'Swasta' },
    { id: 'Mandiri', name: 'Bank Mandiri', desc: 'Bank Mandiri BUMN', tag: 'BUMN' },
    { id: 'BRI', name: 'Bank BRI', desc: 'Bank Rakyat Indonesia', tag: 'BUMN' },
    { id: 'BNI', name: 'Bank BNI', desc: 'Bank Negara Indonesia', tag: 'BUMN' },
    { id: 'Cash', name: 'Kas Tunai', desc: 'Laci Kasir Toko / Fisik', tag: 'Tunai' },
  ];

  const payrollDays = [
    { day: 25, label: 'Tgl 25' },
    { day: 28, label: 'Tgl 28' },
    { day: 30, label: 'Tgl 30' },
    { day: 1, label: 'Tgl 1' },
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
  };

  return (
    <div className="space-y-5">
      {/* Stepper Progress Bar */}
      <div className="px-6 pt-4 pb-1">
        <div className="flex items-center justify-between text-xs font-semibold text-[#737373] mb-2">
          <span className={step >= 1 ? 'text-[#0a0a0a] font-bold' : ''}>1. Profil & Model Usaha</span>
          <span className={step >= 2 ? 'text-[#0a0a0a] font-bold' : ''}>2. Modal Kas & Buffer</span>
          <span className={step >= 3 ? 'text-[#0a0a0a] font-bold' : ''}>3. Komitmen Wajib</span>
        </div>
        <div className="h-1.5 w-full bg-[#f5f5f5] rounded-full overflow-hidden border border-[#e5e5e5]">
          <div
            className="h-full bg-[#0a0a0a] transition-all duration-300"
            style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
          />
        </div>
      </div>

      {/* Step 1: Profil & Archetype Industri */}
      {step === 1 && (
        <div className="p-6 pt-2 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171717]">Nama Usaha / Toko</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-[8px] border border-[#e5e5e5] text-xs font-semibold text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a]/10 transition-all shadow-dub-subtle"
              placeholder="Contoh: Kopi Teras Barokah, Toko Roti Sedap"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#171717]">
              Pilih Archetype Industri (AI Memuat Standar Parameter Otomatis):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {archetypes.map((arc) => {
                const Icon = arc.icon;
                const isSelected = archetype === arc.id;
                return (
                  <button
                    key={arc.id}
                    type="button"
                    onClick={() => handleSelectArchetype(arc)}
                    className={`p-3 rounded-[12px] border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-[#0a0a0a] bg-[#f5f5f5] text-[#0a0a0a] shadow-dub-subtle'
                        : 'border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] text-[#171717]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-[#16a34a]' : 'text-[#525252]'}`} />
                        <span className="text-xs font-bold">{arc.label}</span>
                      </div>
                      {isSelected && (
                        <span className="h-4 w-4 rounded-full bg-[#0a0a0a] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#737373]">
                      {arc.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Modal Kas & Buffer (Custom UI without native <select>) */}
      {step === 2 && (
        <div className="p-6 pt-2 space-y-4">
          {/* Custom Interactive Bank Cards */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171717]">
              Rekening Bank Operasional Utama (Pilih Salah Satu):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {bankOptions.map((bank) => {
                const isSelected = bankName === bank.id;
                return (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => setBankName(bank.id)}
                    className={`p-2.5 rounded-[8px] border text-left cursor-pointer transition-all relative ${
                      isSelected
                        ? 'border-2 border-[#0a0a0a] bg-[#f5f5f5] shadow-dub-subtle font-bold text-[#0a0a0a]'
                        : 'border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] text-[#171717]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{bank.name}</span>
                      <span className="text-[9.5px] font-medium text-[#737373] bg-[#f5f5f5] px-1.5 py-0.5 rounded border border-[#e5e5e5]">
                        {bank.tag}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#737373] mt-0.5 truncate">{bank.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171717]">Saldo Kas Riil Saat Ini (Rp)</label>
            <input
              type="number"
              value={initialCashStr}
              onChange={(e) => setInitialCashStr(e.target.value)}
              className="w-full h-10 px-3.5 rounded-[8px] border border-[#e5e5e5] text-xs font-semibold text-[#0a0a0a] tabular-nums focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a]/10 transition-all shadow-dub-subtle"
              placeholder="18500000"
            />
          </div>

          {/* Safety Buffer Card */}
          <div className="p-4 rounded-[12px] bg-[#dcfce7]/30 border border-[#bbf7d0] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#166534] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#16a34a]" />
                Cadangan Darurat Minimum (Safety Buffer)
              </span>
              <span className="text-xs font-extrabold text-[#14532d] tabular-nums">
                Rp {parsedBuffer.toLocaleString('id-ID')}
              </span>
            </div>
            <p className="text-[11px] text-[#166534] leading-relaxed">
              Batas saldo yang <strong>dilarang disentuh sama sekali</strong> oleh AI untuk belanja modal. Menjamin toko tidak gulung tikar jika terjadi darurat operasional.
            </p>
            <div className="flex gap-2 pt-1">
              {[2000000, 3000000, 5000000, 10000000].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSafetyBufferStr(b.toString())}
                  className={`px-3 py-1 rounded-full border text-[11px] font-semibold cursor-pointer transition-all ${
                    parsedBuffer === b
                      ? 'bg-[#16a34a] text-white border-[#16a34a] shadow-dub-subtle'
                      : 'border-[#bbf7d0] bg-white text-[#166534] hover:bg-[#dcfce7]'
                  }`}
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
        <div className="p-6 pt-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#171717]">Total Gaji Karyawan</label>
                <div className="flex items-center gap-1">
                  <span className="text-[10.5px] text-[#737373]">Jadwal:</span>
                  <div className="flex gap-1">
                    {payrollDays.map((pd) => (
                      <button
                        key={pd.day}
                        type="button"
                        onClick={() => setPayrollDay(pd.day)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border cursor-pointer transition-all ${
                          payrollDay === pd.day
                            ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                            : 'bg-[#ffffff] text-[#525252] border-[#e5e5e5] hover:bg-[#f5f5f5]'
                        }`}
                      >
                        {pd.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <input
                type="number"
                value={payrollAmountStr}
                onChange={(e) => setPayrollAmountStr(e.target.value)}
                className="w-full h-10 px-3.5 rounded-[8px] border border-[#e5e5e5] text-xs font-semibold text-[#0a0a0a] tabular-nums focus:outline-none focus:border-[#0a0a0a] shadow-dub-subtle"
                placeholder="7500000"
              />
              <div className="text-[10.5px] text-[#737373]">Komitmen gaji terlindungi otomatis oleh Safe-to-Spend</div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#171717]">Sewa / Tempo Supplier Rutin</label>
              <input
                type="number"
                value={fixedRentAmountStr}
                onChange={(e) => setFixedRentAmountStr(e.target.value)}
                className="w-full h-10 px-3.5 rounded-[8px] border border-[#e5e5e5] text-xs font-semibold text-[#0a0a0a] tabular-nums focus:outline-none focus:border-[#0a0a0a] shadow-dub-subtle"
                placeholder="4200000"
              />
              <div className="text-[10.5px] text-[#737373]">Estimasi jatuh tempo: Tanggal 5–10 tiap bulan</div>
            </div>
          </div>

          {/* Instant DLMM Safe-to-Spend Computation Preview */}
          <div className="p-4 rounded-[12px] bg-[#0a0a0a] text-white space-y-2.5 shadow-dub-subtle">
            <div className="flex items-center justify-between text-xs font-medium text-[#a3a3a3]">
              <span>Hasil Kalibrasi Awal Safe-to-Spend (Duit Dingin Aman):</span>
              <span className="text-[#16a34a] font-semibold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                DLMM Siap Aktif
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-extrabold text-white tracking-tight tabular-nums">
                Rp {instantSafeToSpend.toLocaleString('id-ID')}
              </div>
              <span className="text-xs text-[#16a34a] bg-[#dcfce7]/10 px-2.5 py-0.5 rounded-full border border-[#16a34a]/30">
                Bebas Belanja CapEx
              </span>
            </div>

            <div className="text-[11px] text-[#a3a3a3] pt-2 border-t border-[#262626] flex justify-between font-mono">
              <span>Kas Rp {(parsedCash / 1000000).toFixed(1)}M - Gaji Rp {(parsedPayroll / 1000000).toFixed(1)}M - Buffer Rp {(parsedBuffer / 1000000).toFixed(1)}M</span>
              <strong className="text-white">Aman Gajian</strong>
            </div>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="p-5 border-t border-[#e5e5e5] flex items-center justify-between bg-[#f5f5f5]">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as any)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] border border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] text-xs font-semibold text-[#171717] cursor-pointer shadow-dub-subtle transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
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
            className="bg-[#0a0a0a] hover:bg-[#171717] text-white text-xs font-semibold rounded-[8px] shadow-dub-subtle"
          >
            <span>Lanjutkan</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </MotionButton>
        ) : (
          <MotionButton
            type="button"
            variant="primary"
            size="md"
            onClick={handleFinish}
            className="bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold rounded-[8px] shadow-dub-subtle"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Aktifkan Radar Finansial JagaUsaha</span>
          </MotionButton>
        )}
      </div>
    </div>
  );
};
