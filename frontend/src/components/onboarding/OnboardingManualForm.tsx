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
  Building2,
  Calendar,
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

  const [businessName, setBusinessName] = useState(initialData?.businessName || '');
  const [archetype, setArchetype] = useState<'fnb' | 'retail' | 'grocery' | 'services'>(
    initialData?.archetype || 'fnb'
  );
  const [bankName, setBankName] = useState(initialData?.bankName || 'BCA');
  const [initialCashStr, setInitialCashStr] = useState(
    initialData?.initialCash ? initialData.initialCash.toString() : ''
  );
  const [safetyBufferStr, setSafetyBufferStr] = useState(
    initialData?.safetyBuffer ? initialData.safetyBuffer.toString() : '3000000'
  );
  const [payrollAmountStr, setPayrollAmountStr] = useState(
    initialData?.payrollAmount ? initialData.payrollAmount.toString() : ''
  );
  const [payrollDay, setPayrollDay] = useState<number>(initialData?.payrollDay || 30);
  const [fixedRentAmountStr, setFixedRentAmountStr] = useState(
    initialData?.fixedRentAmount ? initialData.fixedRentAmount.toString() : ''
  );
  const [dailyGrossStr, setDailyGrossStr] = useState(
    initialData?.dailyGross ? initialData.dailyGross.toString() : ''
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
    <div className="flex flex-col min-h-[520px] justify-between">
      <div>
        {/* Stepper Progress Bar */}
        <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-neutral-100 bg-neutral-50/50">
          <div className="grid grid-cols-3 gap-2">
            {[
              { num: 1, title: 'Profil Usaha', subtitle: 'Nama & Sektor' },
              { num: 2, title: 'Kas & Buffer', subtitle: 'Saldo Operasional' },
              { num: 3, title: 'Komitmen Rutin', subtitle: 'Gaji & Sewa' },
            ].map((s) => {
              const isCurrent = step === s.num;
              const isCompleted = step > s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => {
                    if (s.num <= step) setStep(s.num as any);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'bg-white border-neutral-900 shadow-2xs'
                      : isCompleted
                      ? 'bg-white/80 border-emerald-300 text-neutral-700 cursor-pointer'
                      : 'bg-neutral-100/70 border-neutral-200/80 text-neutral-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`h-5 w-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-neutral-950 text-white'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {isCompleted ? '✓' : s.num}
                    </span>
                    <span
                      className={`text-xs font-bold truncate ${
                        isCurrent ? 'text-neutral-950' : isCompleted ? 'text-neutral-900' : 'text-neutral-500'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-500 pl-7 hidden sm:block truncate">
                    {s.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 1: Profil & Archetype Industri */}
        {step === 1 && (
          <div className="p-5 sm:p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-900">
                Nama Entitas Usaha / Toko <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Building2 className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-950 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-all shadow-2xs"
                  placeholder="Contoh: Kedai Kopi Nusa, Toko Roti Sedap"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-900">
                Pilih Kategori Industri (AI Menyesuaikan Karakteristik Perputaran Kas):
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
                          ? 'border-2 border-neutral-950 bg-neutral-50/80 text-neutral-950 shadow-xs'
                          : 'border-neutral-200 bg-white hover:bg-neutral-50/60 text-neutral-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-700'}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-bold text-neutral-950">{arc.label}</span>
                        </div>
                        {isSelected && (
                          <span className="h-4 w-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed text-neutral-500">
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
          <div className="p-5 sm:p-6 space-y-5">
            {/* Custom Interactive Bank Cards */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-900">
                Rekening Bank Operasional Utama:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {bankOptions.map((bank) => {
                  const isSelected = bankName === bank.id;
                  return (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setBankName(bank.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative ${
                        isSelected
                          ? 'border-2 border-neutral-950 bg-neutral-50/80 shadow-xs font-bold text-neutral-950'
                          : 'border-neutral-200 bg-white hover:bg-neutral-50/60 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{bank.name}</span>
                        <span className="text-[9.5px] font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">
                          {bank.tag}
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-1 truncate">{bank.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-900">
                Saldo Kas Riil Saat Ini <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                  Rp
                </div>
                <input
                  type="number"
                  value={initialCashStr}
                  onChange={(e) => setInitialCashStr(e.target.value)}
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-neutral-200 text-xs sm:text-sm font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-all shadow-2xs"
                  placeholder="Contoh: 21800000"
                />
              </div>
              {parsedCash > 0 && (
                <div className="text-[11px] font-bold text-emerald-700">
                  Terbaca: Rp {parsedCash.toLocaleString('id-ID')}
                </div>
              )}
            </div>

            {/* Safety Buffer Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Cadangan Darurat Minimum (Safety Buffer)
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-900 tabular-nums">
                  Rp {parsedBuffer.toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Batas saldo yang <strong>dilarang disentuh sama sekali</strong> untuk belanja modal. Menjamin kelangsungan toko jika terjadi penurunan omset mendadak.
              </p>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                  Rp
                </div>
                <input
                  type="number"
                  value={safetyBufferStr}
                  onChange={(e) => setSafetyBufferStr(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 shadow-2xs"
                  placeholder="Contoh: 3000000"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {[2000000, 3000000, 5000000, 10000000].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSafetyBufferStr(b.toString())}
                    className={`h-9 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      parsedBuffer === b
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-100/60'
                    }`}
                  >
                    Rp {b / 1000000} Jt
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Komitmen Rutin Wajib Bulanan */}
        {step === 3 && (
          <div className="p-5 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
              {/* Left Column: Total Gaji Karyawan */}
              <div className="space-y-3 p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/90">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-900">
                    Total Gaji Karyawan Bulanan
                  </label>
                  <p className="text-[11px] text-neutral-500">
                    Nominal seluruh gaji tim/barista yang harus dibayarkan tiap bulan
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                    Rp
                  </div>
                  <input
                    type="number"
                    value={payrollAmountStr}
                    onChange={(e) => setPayrollAmountStr(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 shadow-2xs"
                    placeholder="Contoh: 7500000"
                  />
                </div>

                {parsedPayroll > 0 && (
                  <div className="text-[11px] font-bold text-emerald-700">
                    Terbaca: Rp {parsedPayroll.toLocaleString('id-ID')}
                  </div>
                )}

                {/* Jadwal Gajian Datepicker Row */}
                <div className="pt-2 border-t border-neutral-200/70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                      <span>Jadwal Tanggal Gajian:</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                      Tgl {payrollDay} tiap bulan
                    </span>
                  </div>
                  <input
                    type="date"
                    value={`2026-09-${String(payrollDay).padStart(2, '0')}`}
                    onChange={(e) => {
                      if (e.target.value) {
                        const parts = e.target.value.split('-');
                        const day = parseInt(parts[2], 10);
                        if (!isNaN(day) && day >= 1 && day <= 31) {
                          setPayrollDay(day);
                        }
                      }
                    }}
                    className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-semibold text-neutral-950 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 shadow-2xs cursor-pointer"
                  />
                </div>
              </div>

              {/* Right Column: Sewa & Tempo Supplier */}
              <div className="space-y-3 p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/90">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-900">
                    Sewa Tempat / Tempo Supplier Rutin
                  </label>
                  <p className="text-[11px] text-neutral-500">
                    Biaya sewa ruko/outlet atau kewajiban supplier per bulan (isi 0 jika milik sendiri)
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                    Rp
                  </div>
                  <input
                    type="number"
                    value={fixedRentAmountStr}
                    onChange={(e) => setFixedRentAmountStr(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 shadow-2xs"
                    placeholder="Contoh: 4200000"
                  />
                </div>

                {parsedRent > 0 ? (
                  <div className="text-[11px] font-bold text-emerald-700">
                    Terbaca: Rp {parsedRent.toLocaleString('id-ID')}
                  </div>
                ) : (
                  <div className="text-[11px] text-neutral-400">Rp 0 (Tidak ada beban sewa tetap)</div>
                )}

                {/* Info Note Box */}
                <div className="pt-2 border-t border-neutral-200/70 space-y-1">
                  <span className="text-[11px] font-semibold text-neutral-700 block">
                    Estimasi Jatuh Tempo:
                  </span>
                  <div className="p-2 rounded-xl bg-white border border-neutral-200 text-[11px] text-neutral-600 leading-snug">
                    📅 Dialokasikan pada tanggal 5–10 tiap awal bulan di proyeksi arus kas 14 hari JagaUsaha.
                  </div>
                </div>
              </div>
            </div>

            {/* Instant DLMM Safe-to-Spend Computation Preview */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 text-white space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-400">
                <span className="font-semibold text-neutral-300">Hasil Kalibrasi Safe-to-Spend (Duit Dingin Aman):</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full text-[10.5px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DLMM Siap Aktif
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  Rp {instantSafeToSpend.toLocaleString('id-ID')}
                </div>
                <span className="text-xs text-emerald-300 font-semibold bg-emerald-900/50 px-2.5 py-0.5 rounded-full border border-emerald-700/60 self-start sm:self-auto">
                  Bebas Dipakai Belanja Modal
                </span>
              </div>

              <div className="text-[11px] text-neutral-400 pt-2.5 border-t border-neutral-800 flex flex-col sm:flex-row justify-between gap-1 font-mono">
                <span>
                  Kas Rp {parsedCash.toLocaleString('id-ID')} - Gaji Rp {parsedPayroll.toLocaleString('id-ID')} - Buffer Rp {parsedBuffer.toLocaleString('id-ID')}
                </span>
                <strong className="text-emerald-400">✓ Aman Gajian Karyawan</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-4 sm:p-5 border-t border-neutral-200 flex items-center justify-between bg-neutral-50/70 shrink-0">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as any)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-800 cursor-pointer shadow-2xs transition-all active:scale-[0.98]"
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
            disabled={step === 1 ? !businessName.trim() : parsedCash <= 0}
            onClick={() => setStep((s) => (s + 1) as any)}
            className={`text-xs font-bold rounded-xl shadow-xs py-2.5 px-5 transition-all ${
              (step === 1 ? businessName.trim() : parsedCash > 0)
                ? 'bg-neutral-950 hover:bg-neutral-850 text-white cursor-pointer active:scale-[0.98]'
                : 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed opacity-50'
            }`}
          >
            <span>Lanjutkan</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </MotionButton>
        ) : (
          <MotionButton
            type="button"
            variant="primary"
            size="md"
            disabled={!businessName.trim() || parsedCash <= 0}
            onClick={handleFinish}
            className={`text-xs font-bold rounded-xl shadow-xs py-2.5 px-5 transition-all ${
              businessName.trim() && parsedCash > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-[0.98]'
                : 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed opacity-50'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Aktifkan Radar Finansial JagaUsaha</span>
          </MotionButton>
        )}
      </div>
    </div>
  );
};
