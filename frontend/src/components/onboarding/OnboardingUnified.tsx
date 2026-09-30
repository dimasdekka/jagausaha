import React, { useState, useEffect, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Building2,
  Calendar,
  Coffee,
  ShoppingBag,
  Store,
  Briefcase,
  Trash2,
  SlidersHorizontal,
  TrendingUp,
  Zap,
  Percent,
  ShieldCheck,
} from 'lucide-react';
import { MotionButton } from '../motion/button';
import type { BusinessContextData } from '../OnboardingModal';

interface OnboardingUnifiedProps {
  initialData?: Partial<BusinessContextData>;
  onComplete: (data: BusinessContextData) => void;
}

export const OnboardingUnified: React.FC<OnboardingUnifiedProps> = ({
  initialData,
  onComplete,
}) => {
  // Input Mode Switcher ('file' vs 'text')
  const [inputTab, setInputTab] = useState<'file' | 'text'>('file');

  // Input states (Modality 1: File)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Input states (Modality 2: Voice & Modality 3: Text)
  const [textNote, setTextNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Processing & AI Status
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    detectedItems: string[];
    missingItems: string[];
    summaryNarrative?: string;
  } | null>(null);

  // Digital Twin Editable Parameters
  const [businessName, setBusinessName] = useState(initialData?.businessName || '');
  const [archetype, setArchetype] = useState<'fnb' | 'retail' | 'grocery' | 'services'>(
    initialData?.archetype || 'fnb'
  );
  const [bankName, setBankName] = useState(initialData?.bankName || 'BCA');
  const [initialCash, setInitialCash] = useState<number>(initialData?.initialCash || 0);
  const [safetyBuffer, setSafetyBuffer] = useState<number>(initialData?.safetyBuffer || 3000000);
  const [payrollAmount, setPayrollAmount] = useState<number>(initialData?.payrollAmount || 0);
  const [payrollDay, setPayrollDay] = useState<number>(initialData?.payrollDay || 30);
  const [payrollDateStr, setPayrollDateStr] = useState<string>(
    `2026-09-${String(initialData?.payrollDay || 30).padStart(2, '0')}`
  );
  const [fixedRentAmount, setFixedRentAmount] = useState<number>(initialData?.fixedRentAmount || 0);
  const [dailyGross, setDailyGross] = useState<number>(initialData?.dailyGross || 0);

  const handlePayrollDateChange = (val: string) => {
    setPayrollDateStr(val);
    if (val) {
      const parts = val.split('-');
      const day = parseInt(parts[2], 10);
      if (!isNaN(day) && day >= 1 && day <= 31) {
        setPayrollDay(day);
      }
    }
  };

  // Advanced Calibration Parameters (Opsional untuk Presisi AI Lebih Lanjut)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [weekdayGross, setWeekdayGross] = useState<number>(initialData?.weekdayGross || 1200000);
  const [weekendGross, setWeekendGross] = useState<number>(initialData?.weekendGross || 2400000);
  const [qrisSharePct, setQrisSharePct] = useState<number>(initialData?.qrisSharePct || 65);
  const [utilityExpense, setUtilityExpense] = useState<number>(initialData?.utilityExpense || 850000);
  const [cogsMarginPct] = useState<number>(initialData?.cogsMarginPct || 35);
  const [vendorTempoDays, setVendorTempoDays] = useState<number>(initialData?.vendorTempoDays || 14);

  // Safe-to-Spend Computation (Deterministic DLMM invariant)
  const safeToSpend = Math.max(0, initialCash - payrollAmount - safetyBuffer);

  // Minimum validation criteria
  const isNameReady = businessName.trim().length >= 3;
  const isCashReady = initialCash > 0;
  const isMinimumDataReady = isNameReady && isCashReady;

  // Real Test Files available for 1-click test
  const sampleFiles = [
    {
      name: 'Rekening_Koran_BCA_Kedai_Kopi_Agustus_2026.pdf',
      type: 'e-Statement BCA (Saldo Rp 21.800.000, 13 mutasi riil)',
      url: '/dokumen/Rekening_Koran_BCA_Kedai_Kopi_Agustus_2026.pdf',
    },
    {
      name: 'Laporan_Penjualan_Moka_POS_September_2026.xlsx',
      type: 'Laporan POS Moka (Net Revenue Rp 40.821.600)',
      url: '/dokumen/Laporan_Penjualan_Moka_POS_September_2026.xlsx',
    },
    {
      name: 'Faktur_Tagihan_Supplier_Biji_Kopi_INV881.pdf',
      type: 'Faktur Supplier Roastery (Sisa Tagihan Rp 3.897.500)',
      url: '/dokumen/Faktur_Tagihan_Supplier_Biji_Kopi_INV881.pdf',
    },
  ];

  // Quick Preset Prompts
  const quickPresets = [
    {
      label: 'Kafe Kopi Nusa (Lengkap)',
      text: 'Kedai Kopi Nusa bergerak di bidang F&B. Saldo kas saat ini di rekening BCA ada Rp 21.800.000. Komitmen gaji 4 barista total Rp 8.000.000 dibayar tgl 30, sewa ruko Rp 3.000.000, omset harian rata-rata Rp 1.200.000, dan buffer darurat Rp 3.000.000.',
    },
    {
      label: 'Retail / Fashion Olshop',
      text: 'Usaha Butik Hijab Aura di bidang retail fashion. Saldo kas rekening Mandiri Rp 25.000.000. Gaji tim admin dan packing Rp 5.000.000 tgl 28, sewa ruko Rp 4.000.000, omset harian Rp 1.500.000.',
    },
    {
      label: 'Warung & Sembako',
      text: 'Toko Sembako Berkah. Saldo kas BRI Rp 15.000.000. Gaji 2 pegawai Rp 4.000.000 tgl 25, sewa tempat Rp 2.000.000, omset harian Rp 2.000.000.',
    },
  ];

  // Setup Web Speech API for voice note recording
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTextNote((prev) => {
          const cleaned = prev.replace(/\s*\(sedang merekam.*?\)/g, '');
          return (cleaned ? cleaned + ' ' : '') + currentTranscript.trim();
        });
      };

      recognition.onerror = () => {
        setIsRecording(false);
        clearInterval(timerRef.current);
      };

      recognition.onend = () => {
        setIsRecording(false);
        clearInterval(timerRef.current);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.stop();
      clearInterval(timerRef.current);
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    } else {
      setTextNote((prev) => prev.trim());
      setRecordingSeconds(0);
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
        timerRef.current = setInterval(() => {
          setRecordingSeconds((s) => s + 1);
        }, 1000);
      } catch {
        setIsRecording(false);
      }
    }
  };

  const handleSelectRealTestFile = async (item: (typeof sampleFiles)[0]) => {
    try {
      const response = await fetch(item.url);
      const blob = await response.blob();
      const file = new File([blob], item.name, {
        type: item.name.endsWith('.xlsx')
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          : 'application/pdf',
      });
      setSelectedFile(file);
    } catch {
      // fallback mock file
      const file = new File(['mock content'], item.name, { type: 'application/pdf' });
      setSelectedFile(file);
    }
  };

  const handleProcessData = async () => {
    setIsProcessingAI(true);
    try {
      let resultData: any = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        if (textNote.trim()) {
          formData.append('document_note', textNote.trim());
        }
        const resp = await fetch('/api/ai/upload-file', {
          method: 'POST',
          body: formData,
        });
        if (resp.ok) {
          resultData = await resp.json();
        }
      } else if (textNote.trim()) {
        const resp = await fetch('/api/ai/extract-context', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textNote.trim() }),
        });
        if (resp.ok) {
          resultData = await resp.json();
        }
      }

      if (resultData) {
        if (resultData.business_name && resultData.business_name !== 'Menunggu nama usaha...') {
          setBusinessName(resultData.business_name);
        }
        if (resultData.archetype) setArchetype(resultData.archetype);
        if (resultData.bank_name) setBankName(resultData.bank_name);
        if (resultData.initial_cash > 0) setInitialCash(resultData.initial_cash);
        if (resultData.safety_buffer > 0) setSafetyBuffer(resultData.safety_buffer);
        if (resultData.payroll_amount > 0) setPayrollAmount(resultData.payroll_amount);
        if (resultData.payroll_day) {
          setPayrollDay(resultData.payroll_day);
          setPayrollDateStr(`2026-09-${String(resultData.payroll_day).padStart(2, '0')}`);
        }
        if (resultData.fixed_rent_amount > 0) setFixedRentAmount(resultData.fixed_rent_amount);
        if (resultData.daily_gross > 0) setDailyGross(resultData.daily_gross);

        setAiAnalysisResult({
          detectedItems: resultData.detected_items || [],
          missingItems: resultData.missing_items || [],
          summaryNarrative: resultData.summary_narrative,
        });
      }
    } catch (err) {
      console.error('Extraction error:', err);
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleApply = () => {
    if (!isMinimumDataReady) return;
    onComplete({
      businessName: businessName.trim(),
      archetype,
      bankName,
      initialCash,
      safetyBuffer,
      payrollAmount,
      payrollDay,
      fixedRentAmount,
      dailyGross,
      weekdayGross,
      weekendGross,
      qrisSharePct,
      utilityExpense,
      cogsMarginPct,
      vendorTempoDays,
    });
  };

  const hasAnyInput = Boolean(selectedFile || textNote.trim());

  return (
    <div className="p-4 sm:p-6 overflow-y-auto">
      {/* Top Banner Guide */}
      <div className="mb-4 p-3 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600 gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
          <span>
            <strong>Panduan Cepat:</strong> Masukkan berkas atau rekam suara di sisi kiri, atau langsung lengkapi angka kas pada panel Digital Twin di sisi kanan.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================================================================= */}
        {/* LEFT COLUMN: SOURCE DATA INTAKE (FILE OR VOICE/TEXT)             */}
        {/* ================================================================= */}
        <div className="lg:col-span-6 space-y-3.5">
          <div className="space-y-0.5 pb-0.5">
            <h3 className="text-xs font-bold text-neutral-950 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white shrink-0">
                1
              </span>
              <span>Sumber Data Usaha</span>
            </h3>
            <p className="text-[10.5px] text-neutral-500 pl-7">
              Pilih metode masukan ternyaman Anda di bawah:
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200/70">
            <button
              type="button"
              onClick={() => setInputTab('file')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                inputTab === 'file'
                  ? 'bg-white text-neutral-950 shadow-2xs border border-neutral-200/80'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <FileText className={`h-3.5 w-3.5 ${inputTab === 'file' ? 'text-blue-600' : 'text-neutral-400'}`} />
              <span>Unggah Berkas</span>
              {selectedFile && (
                <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setInputTab('text')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                inputTab === 'text'
                  ? 'bg-white text-neutral-950 shadow-2xs border border-neutral-200/80'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Mic className={`h-3.5 w-3.5 ${inputTab === 'text' ? 'text-emerald-600' : 'text-neutral-400'}`} />
              <span>Suara & Catatan Teks</span>
              {textNote.trim() && (
                <span className="h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
              )}
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
            }}
          />

          {/* Tab 1: File Upload */}
          {inputTab === 'file' && (
            <div className="space-y-3">
              {selectedFile ? (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-2xs">
                  <div className="flex items-center gap-3 truncate">
                    <div className="h-10 w-10 rounded-xl bg-white border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                      {selectedFile.name.endsWith('.xlsx') ? (
                        <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <FileText className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-neutral-900 truncate">
                        {selectedFile.name}
                      </div>
                      <div className="text-[10.5px] text-blue-700 font-medium">
                        {(selectedFile.size / 1024).toFixed(1)} KB • Siap dipetakan oleh AI
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Hapus berkas"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      if (e.dataTransfer.files?.[0]) setSelectedFile(e.dataTransfer.files[0]);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? 'border-blue-500 bg-blue-50/70'
                        : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/50 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="h-10 w-10 rounded-xl bg-white border border-neutral-200 text-blue-600 flex items-center justify-center mx-auto mb-2 shadow-2xs">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-neutral-900">
                      Tarik berkas keuangan ke sini, atau{' '}
                      <span className="text-blue-600 underline underline-offset-2">Pilih Berkas</span>
                    </div>
                    <p className="text-[10.5px] text-neutral-400 mt-1">
                      Mendukung Rekening Koran BCA (PDF), POS Moka (Excel), dan Faktur Dagang
                    </p>
                  </div>

                  {/* 1-Click Real Test Files */}
                  <div className="space-y-1.5">
                    <span className="text-[10.5px] font-semibold text-neutral-500 block">
                      Atau gunakan berkas pengujian nyata UMKM siap pakai:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {sampleFiles.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => handleSelectRealTestFile(item)}
                          className="p-2.5 rounded-xl border border-neutral-200/90 bg-white hover:bg-blue-50/50 hover:border-blue-300 text-left transition-all cursor-pointer shadow-2xs group"
                        >
                          <div className="flex items-center gap-1.5 mb-0.5">
                            {item.name.endsWith('.xlsx') ? (
                              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <FileText className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                            )}
                            <span className="text-[11px] font-bold text-neutral-900 truncate">
                              {item.name.split('_')[0]}
                            </span>
                          </div>
                          <div className="text-[10px] text-neutral-500 line-clamp-1">
                            {item.type}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Voice & Text Note */}
          {inputTab === 'text' && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-2xs overflow-hidden focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900/10 transition-all">
                <textarea
                  value={textNote}
                  onChange={(e) => setTextNote(e.target.value)}
                  rows={4}
                  className="w-full p-3.5 text-xs text-neutral-950 placeholder-neutral-400 resize-none focus:outline-none leading-relaxed"
                  placeholder="Ketik rincian usaha Anda atau tekan tombol rekam di bawah (contoh: 'Kedai Kopi Nusa, saldo rekening BCA Rp 21.800.000, komitmen gaji 4 barista Rp 8.000.000 tgl 30, sewa ruko Rp 3.000.000, omset harian Rp 1.200.000')..."
                />

                <div className="px-3 py-2 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-3.5 w-3.5" />
                        <span>Berhenti Merekam ({recordingSeconds}s)</span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Rekam Suara (Speech-to-Text)</span>
                      </>
                    )}
                  </button>

                  {textNote.trim() && (
                    <button
                      type="button"
                      onClick={() => setTextNote('')}
                      className="text-[11px] text-neutral-400 hover:text-neutral-700 font-medium cursor-pointer"
                    >
                      Bersihkan
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Narrative Prompt Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Saran Narasi Cepat 1-Klik:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPresets.map((pr) => (
                    <button
                      key={pr.label}
                      type="button"
                      onClick={() => setTextNote(pr.text)}
                      className="px-2.5 py-1 rounded-lg text-[10.5px] font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Trigger Button */}
          <div className="pt-1">
            <MotionButton
              type="button"
              variant="primary"
              size="md"
              disabled={!hasAnyInput || isProcessingAI}
              onClick={handleProcessData}
              className={`w-full text-xs font-bold rounded-xl justify-center py-3 shadow-xs transition-all ${
                hasAnyInput && !isProcessingAI
                  ? 'bg-neutral-950 hover:bg-neutral-850 text-white cursor-pointer active:scale-[0.99]'
                  : 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed opacity-60'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>
                {isProcessingAI
                  ? 'AI Sedang Menganalisis Dokumen & Suara...'
                  : '✨ Ekstrak & Sinkronkan ke Digital Twin'}
              </span>
            </MotionButton>
          </div>

          {/* AI Analysis Findings Dossier (if extracted) */}
          {aiAnalysisResult && (
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
              <div className="font-bold text-neutral-950 flex items-center justify-between">
                <span>Temuan Evaluasi Sensor AI:</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Terverifikasi
                </span>
              </div>

              {aiAnalysisResult.detectedItems.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {aiAnalysisResult.detectedItems.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-[10.5px] font-medium text-neutral-700"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              )}

              {aiAnalysisResult.missingItems.length > 0 && (
                <div className="pt-1 space-y-1">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    Kekurangan yang Terdeteksi:
                  </span>
                  {aiAnalysisResult.missingItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-[10.5px] text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200/80 flex items-start gap-1.5"
                    >
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: DIGITAL TWIN PARAMETER REVIEW & DIRECT EDITOR       */}
        {/* ================================================================= */}
        <div className="lg:col-span-6 space-y-3.5 bg-neutral-50/70 p-4 sm:p-5 rounded-3xl border border-neutral-200/90 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="space-y-0.5 pb-0.5">
                <h3 className="text-xs font-bold text-neutral-950 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white shrink-0">
                    2
                  </span>
                  <span>Digital Twin Terpetakan</span>
                </h3>
                <p className="text-[10.5px] text-neutral-500 pl-7">
                  Parameter terisi otomatis dari input kiri atau sesuaikan langsung
                </p>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isMinimumDataReady
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {isMinimumDataReady ? '✓ Siap Diterapkan' : '⚠️ Perlu Dilengkapi'}
              </span>
            </div>

            {/* Structured Financial Profile Card */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
              {/* Bagian 1: Identitas Usaha */}
              <div className="p-3.5 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-neutral-500" />
                      <span>Nama Entitas Usaha <span className="text-rose-500">*</span></span>
                    </span>
                    {isNameReady ? (
                      <span className="text-[10px] font-bold text-emerald-700">✓ Sesuai</span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700">⚠️ Wajib diisi</span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Contoh: Kedai Kopi Nusa"
                    className="w-full h-9 px-3 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-950 focus:outline-none focus:border-neutral-900 shadow-2xs"
                  />
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10.5px] font-semibold text-neutral-500 block">Kategori Industri:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'fnb', label: 'Kafe & F&B', icon: Coffee },
                      { id: 'retail', label: 'Retail / Olshop', icon: ShoppingBag },
                      { id: 'grocery', label: 'Warung Sembako', icon: Store },
                      { id: 'services', label: 'Jasa & Agensi', icon: Briefcase },
                    ].map((cat) => {
                      const isSelected = archetype === cat.id;
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setArchetype(cat.id as any)}
                          className={`h-9 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bagian 2: Likuiditas Kas Operasional */}
              <div className="p-3.5 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                    <span>Saldo Kas Riil Operasional <span className="text-rose-500">*</span></span>
                    {isCashReady ? (
                      <span className="text-[10.5px] font-bold text-emerald-700">
                        Rp {initialCash.toLocaleString('id-ID')}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700">⚠️ Wajib &gt; Rp 0</span>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                      Rp
                    </div>
                    <input
                      type="number"
                      value={initialCash > 0 ? initialCash : ''}
                      onChange={(e) => setInitialCash(parseFloat(e.target.value) || 0)}
                      placeholder="Contoh: 21800000"
                      className="w-full h-9 pl-9 pr-3 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10.5px] font-semibold text-neutral-500 block">Akun Kas Utama:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {['BCA', 'Mandiri', 'BRI', 'Kas Tunai'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBankName(b)}
                        className={`h-9 rounded-xl text-xs font-bold border flex items-center justify-center text-center cursor-pointer transition-all ${
                          bankName === b
                            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bagian 3: Komitmen Beban Wajib */}
              <div className="p-3.5 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Total Gaji Bulanan */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                      <span>Total Gaji Bulanan</span>
                      {payrollAmount > 0 && (
                        <span className="text-[10.5px] font-bold text-emerald-700">
                          Rp {payrollAmount.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                        Rp
                      </div>
                      <input
                        type="number"
                        value={payrollAmount > 0 ? payrollAmount : ''}
                        onChange={(e) => setPayrollAmount(parseFloat(e.target.value) || 0)}
                        placeholder="Contoh: 8000000"
                        className="w-full h-9 pl-9 pr-3 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Tanggal Gajian (Datepicker) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                        <span>Tanggal Gajian</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                        Tgl {payrollDay}
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        value={payrollDateStr}
                        onChange={(e) => handlePayrollDateChange(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-950 bg-white focus:outline-none focus:border-neutral-900 shadow-2xs cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-1 border-t border-neutral-100">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                    <span>Sewa Ruko / Tempo Supplier Rutin:</span>
                    {fixedRentAmount > 0 && (
                      <span className="text-[10.5px] font-bold text-neutral-700">
                        Rp {fixedRentAmount.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                      Rp
                    </div>
                    <input
                      type="number"
                      value={fixedRentAmount > 0 ? fixedRentAmount : ''}
                      onChange={(e) => setFixedRentAmount(parseFloat(e.target.value) || 0)}
                      placeholder="Contoh: 3000000"
                      className="w-full h-9 pl-9 pr-3 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bagian 4: Cadangan Kas Darurat (Safety Buffer) */}
              <div className="p-3.5 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Cadangan Kas Darurat (Safety Buffer)</span>
                    </span>
                    {safetyBuffer > 0 && (
                      <span className="text-[10.5px] font-bold text-emerald-700">
                        Rp {safetyBuffer.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                      Rp
                    </div>
                    <input
                      type="number"
                      value={safetyBuffer > 0 ? safetyBuffer : ''}
                      onChange={(e) => setSafetyBuffer(parseFloat(e.target.value) || 0)}
                      placeholder="Contoh: 3000000"
                      className="w-full h-9 pl-9 pr-3 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 shadow-2xs"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-tight">
                    Batas saldo kas aman yang tidak boleh dipakai belanja agar usaha tidak gagal bayar.
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion: Kalibrasi Presisi AI (Data Lanjutan — Opsional) */}
            <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full p-3 bg-neutral-50/70 hover:bg-neutral-100/70 transition-colors flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-6 w-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/80">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 group-hover:text-purple-700 transition-colors flex items-center gap-1.5">
                      <span>Kalibrasi Presisi AI (Data Lanjutan)</span>
                      <span className="text-[9.5px] font-semibold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded-md">
                        Opsional
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      Omset musiman (weekday/weekend), porsi QRIS, utilitas & tempo
                    </div>
                  </div>
                </div>
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4 text-neutral-400 group-hover:text-neutral-700" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-neutral-400 group-hover:text-neutral-700" />
                )}
              </button>

              {showAdvanced && (
                <div className="p-3.5 space-y-3 border-t border-neutral-200/80 bg-white animate-in fade-in duration-150">
                  {/* Pola Omset Musiman */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                      <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                      <span>Pola Omset Mingguan (Weekday vs Weekend):</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-semibold text-neutral-600">
                          Hari Biasa (Sen–Kam)
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[11px] font-bold text-neutral-400">
                            Rp
                          </span>
                          <input
                            type="number"
                            value={weekdayGross}
                            onChange={(e) => setWeekdayGross(parseFloat(e.target.value) || 0)}
                            className="w-full h-8 pl-8 pr-2 rounded-lg border border-neutral-200 text-xs font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 shadow-2xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10.5px] font-semibold text-neutral-600">
                          Akhir Pekan (Jum–Min)
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[11px] font-bold text-neutral-400">
                            Rp
                          </span>
                          <input
                            type="number"
                            value={weekendGross}
                            onChange={(e) => setWeekendGross(parseFloat(e.target.value) || 0)}
                            className="w-full h-8 pl-8 pr-2 rounded-lg border border-neutral-200 text-xs font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400">
                      💡 Membantu DLMM memproyeksikan lonjakan likuiditas kas masuk tiap akhir pekan.
                    </p>
                  </div>

                  {/* Porsi Transaksi QRIS */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                      <span className="flex items-center gap-1.5">
                        <Percent className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Estimasi Porsi Transaksi via QRIS (%):</span>
                      </span>
                      <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {qrisSharePct}% QRIS
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[30, 50, 65, 80].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setQrisSharePct(pct)}
                          className={`py-1 rounded-lg text-[10.5px] font-bold border transition-all ${
                            qrisSharePct === pct
                              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-neutral-400">
                      ⚡ Menghitung jeda waktu settlement perbankan H+1 agar simulasi Safe-to-Spend presisi.
                    </p>
                  </div>

                  {/* Utilitas & Tempo Supplier */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-neutral-800 flex items-center gap-1">
                        <Zap className="h-3 w-3 text-amber-500" />
                        <span>Biaya Listrik/WiFi/Air</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[11px] font-bold text-neutral-400">
                          Rp
                        </span>
                        <input
                          type="number"
                          value={utilityExpense}
                          onChange={(e) => setUtilityExpense(parseFloat(e.target.value) || 0)}
                          className="w-full h-8 pl-8 pr-2 rounded-lg border border-neutral-200 text-xs font-bold text-neutral-950 tabular-nums focus:outline-none focus:border-neutral-900 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-neutral-800 block truncate">
                        Tempo Supplier Rata-rata
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { d: 0, label: 'Tunai' },
                          { d: 14, label: 'H+14' },
                          { d: 30, label: 'H+30' },
                        ].map((tp) => (
                          <button
                            key={tp.d}
                            type="button"
                            onClick={() => setVendorTempoDays(tp.d)}
                            className={`py-1 rounded-md text-[9.5px] font-bold border transition-all ${
                              vendorTempoDays === tp.d
                                ? 'bg-neutral-950 text-white border-neutral-950'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                            }`}
                          >
                            {tp.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Duit Dingin Aman Highlight Card */}
            <div className="p-4 rounded-2xl bg-neutral-950 text-white space-y-2 shadow-md">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-400">
                <span>Duit Dingin Aman (Safe-to-Spend):</span>
                <span className="text-emerald-400 text-[10.5px] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DLMM Aktif
                </span>
              </div>
              <div className="text-2xl font-extrabold text-white tracking-tight tabular-nums">
                Rp {safeToSpend.toLocaleString('id-ID')}
              </div>
              <p className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-800 leading-snug font-mono">
                Kas Rp {initialCash.toLocaleString('id-ID')} - Gaji Rp {payrollAmount.toLocaleString('id-ID')} - Buffer Rp {safetyBuffer.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Action / Apply Button */}
          <div className="pt-2 space-y-2">
            {!isMinimumDataReady && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-snug space-y-0.5">
                <span className="font-bold flex items-center gap-1 text-amber-950">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  Data Minimal Belum Lengkap:
                </span>
                <div className="text-[10.5px] text-amber-800 pl-4">
                  {!isNameReady && <div>• Nama usaha belum diisi (min. 3 karakter)</div>}
                  {!isCashReady && <div>• Saldo kas operasional belum diisi (&gt; Rp 0)</div>}
                </div>
              </div>
            )}

            <MotionButton
              type="button"
              variant="primary"
              size="md"
              disabled={!isMinimumDataReady}
              onClick={handleApply}
              className={`w-full text-xs font-bold rounded-xl justify-center py-3 shadow-xs transition-all ${
                isMinimumDataReady
                  ? 'bg-neutral-950 hover:bg-neutral-850 text-white cursor-pointer active:scale-[0.99]'
                  : 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed opacity-60'
              }`}
            >
              <CheckCircle2 className={`h-4 w-4 ${isMinimumDataReady ? 'text-emerald-400' : 'text-neutral-300'}`} />
              <span>{isMinimumDataReady ? 'Terapkan ke Dashboard' : 'Lengkapi Data Usaha Dulu'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </MotionButton>
          </div>
        </div>
      </div>
    </div>
  );
};
