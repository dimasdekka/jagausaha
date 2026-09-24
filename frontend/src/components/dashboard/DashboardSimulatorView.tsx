import React, { useState } from 'react';
import {
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { Input } from '../motion/input';
import { MotionButton } from '../motion/button';
import { AnimatedBadge } from '../motion/animated-badge';

interface DashboardSimulatorViewProps {
  currentCash: number;
  safeToSpend: number;
  safetyBuffer: number;
  dailyGross: number;
  onOpenWhatsAppModal: (data: {
    title: string;
    recipient: string;
    text: string;
    type?: 'debt_collection' | 'supplier_negotiation';
  }) => void;
}

export const DashboardSimulatorView: React.FC<DashboardSimulatorViewProps> = ({
  currentCash,
  safeToSpend,
  safetyBuffer,
  dailyGross,
  onOpenWhatsAppModal,
}) => {
  const [expenseName, setExpenseName] = useState('Mesin Espresso 2-Group');
  const [amountStr, setAmountStr] = useState('14000000');
  const [paymentScheme, setPaymentScheme] = useState<'cash' | 'dp50' | 'install3'>('cash');
  const [executionDay, setExecutionDay] = useState<number>(0);

  const parsedAmount = parseInt(amountStr, 10) || 0;

  // Calculate effective immediate outflow
  const immediateOutflow =
    paymentScheme === 'cash'
      ? parsedAmount
      : paymentScheme === 'dp50'
      ? Math.round(parsedAmount * 0.5)
      : Math.round(parsedAmount / 3);

  // Deterministic checks
  const postCash = currentCash - immediateOutflow;
  const isDeficitRisk = immediateOutflow > safeToSpend;
  const lowestProjected = postCash - 7500000; // factoring payroll H+6
  const deficitAmount = lowestProjected < safetyBuffer ? safetyBuffer - lowestProjected : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-950">Laboratorium Simulasi Keputusan Belanja</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Uji dampak rencana belanja modal (CapEx/OpEx) terhadap ketahanan likuiditas 30 hari ke depan sebelum uang keluar dari rekening.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-slate-500 font-medium">Batas Duit Dingin Bebas:</div>
            <div className="text-base font-extrabold text-emerald-700 tabular-nums">
              Rp {safeToSpend.toLocaleString('id-ID')}
            </div>
          </div>
          <AnimatedBadge status="success" size="sm">
            100% Aman Gaji
          </AnimatedBadge>
        </div>
      </div>

      {/* Two Column Simulator Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Input Parameters */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            1. Parameter Rencana Pengeluaran
          </h3>

          <div className="space-y-4">
            <Input
              label="Nama Pengeluaran / Aset"
              type="text"
              value={expenseName}
              onChange={(val) => setExpenseName(val)}
              placeholder="Contoh: Mesin Espresso, Renovasi Bar, Stok Biji Kopi"
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimasi Nominal Biaya (Rp)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 tabular-nums transition-all"
                  placeholder="0"
                />
              </div>

              {/* Quick Preset Pills */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] text-slate-400">Cepat:</span>
                {[
                  { label: '5 Jt', val: 5000000 },
                  { label: '7 Jt', val: 7000000 },
                  { label: '14 Jt', val: 14000000 },
                  { label: '20 Jt', val: 20000000 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setAmountStr(item.val.toString())}
                    className="px-2 py-0.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-semibold text-slate-700 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Scheme Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Pilihan Skema Pembayaran
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentScheme('cash')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentScheme === 'cash'
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold">Tunai 100%</div>
                  <div className="text-[10.5px] opacity-80 mt-0.5">Keluar hari ini</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentScheme('dp50')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentScheme === 'dp50'
                      ? 'border-emerald-600 bg-emerald-900 text-white shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-400">DP 50% + Tempo</div>
                  <div className="text-[10.5px] opacity-80 mt-0.5">Sisa tempo 30 hari</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentScheme('install3')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentScheme === 'install3'
                      ? 'border-indigo-600 bg-indigo-950 text-white shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold">Cicilan 3x</div>
                  <div className="text-[10.5px] opacity-80 mt-0.5">Bagi 3 bulan</div>
                </button>
              </div>
            </div>

            {/* Target Execution Day */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Jadwal Eksekusi Belanja
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Hari Ini (H+0)', day: 0 },
                  { label: 'H+5', day: 5 },
                  { label: 'H+10', day: 10 },
                  { label: 'H+15', day: 15 },
                ].map((d) => (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => setExecutionDay(d.day)}
                    className={`py-2 px-2 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                      executionDay === d.day
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Real-Time Sandbox Evaluation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Outcome Assessment Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              2. Hasil Audit Deterministik DLMM
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                <span className="text-slate-500">Inflow Harian Toko:</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  +Rp {dailyGross.toLocaleString('id-ID')}/hari
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                <span className="text-slate-500">Beban Keluar Langsung:</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  Rp {immediateOutflow.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                <span className="text-slate-500">Estimasi Saldo Setelah Belanja:</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  Rp {postCash.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                <span className="text-slate-500">Titik Kas Terendah (H+6 Gajian):</span>
                <span
                  className={`font-bold tabular-nums ${
                    lowestProjected < safetyBuffer ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  Rp {lowestProjected.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Verdict Box */}
            {isDeficitRisk ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                  <span>PERINGATAN: Berisiko Benturan Kas!</span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Pengeluaran tunai sebesar Rp {immediateOutflow.toLocaleString('id-ID')} melebihi batas aman Duit Dingin (Rp {safeToSpend.toLocaleString('id-ID')}). Kas diproyeksikan defisit sekitar{' '}
                  <strong>Rp {deficitAmount.toLocaleString('id-ID')}</strong> menjelang tanggal pembayaran gaji karyawan.
                </p>

                <div className="pt-2">
                  <MotionButton
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setPaymentScheme('dp50');
                    }}
                    className="w-full text-xs font-bold bg-neutral-900 text-white"
                  >
                    <span>Ubah ke Skema DP 50% (Rekomendasi Aman)</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </MotionButton>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Skenario Aman Dieksekusi</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Beban pengeluaran berada di bawah Duit Dingin Aman. Kas operasional tetap memiliki cadangan darurat Rp {safetyBuffer.toLocaleString('id-ID')} dan komitmen gajian tetap terjamin aman.
                </p>
              </div>
            )}

            {/* WhatsApp Negotiation Trigger */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() =>
                  onOpenWhatsAppModal({
                    title: `Negosiasi Tempo ${expenseName}`,
                    recipient: 'Supplier / Vendor Terkait',
                    text: `Halo Pak/Bu Vendor, salam hangat dari kami 🙏\n\nTerkait rencana pengadaan *${expenseName}* senilai *Rp ${parsedAmount.toLocaleString('id-ID')}*, kami sangat tertarik untuk bekerjasama. Untuk menjaga kestabilan likuiditas kas operasional kami, apakah memungkinkan jika transaksi ini dibayarkan secara bertahap (skema DP 50% dan pelunasan tempo 30 hari)?\n\nTerima kasih atas pengertian dan kerjasamanya! 😊`,
                    type: 'supplier_negotiation',
                  })
                }
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                <span>Siapkan Draf WhatsApp Negosiasi Supplier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
