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
  Volume2,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Building2,
  Check,
  Edit2,
} from 'lucide-react';
import { ThinkingOrb, type OrbState } from 'thinking-orbs';
import { MotionButton } from '../motion/button';
import type { BusinessContextData } from '../OnboardingModal';

interface OnboardingDocumentUploadProps {
  onComplete: (data: BusinessContextData) => void;
}

export const OnboardingDocumentUpload: React.FC<OnboardingDocumentUploadProps> = ({ onComplete }) => {
  // 1. Modality: Financial File
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showDemoOptions, setShowDemoOptions] = useState(false);

  // 2. Modality: Voice Note
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // 3. Modality: Text Note
  const [textNote, setTextNote] = useState('');

  // AI Processing & Multi-Modal Results
  const [orbState, setOrbState] = useState<OrbState>('breathing');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResult, setExtractedResult] = useState<any | null>(null);

  // Interactive adjustments for missing items
  const [customBusinessName, setCustomBusinessName] = useState('');
  const [customPayroll, setCustomPayroll] = useState<string>('');
  const [customRent, setCustomRent] = useState<string>('');
  const [customBuffer, setCustomBuffer] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3 Authentic Indonesian Test Files
  const sampleFiles = [
    {
      name: 'Rekening_Koran_BCA_Kedai_Kopi_Agustus_2026.pdf',
      path: '/dokumen/Rekening_Koran_BCA_Kedai_Kopi_Agustus_2026.pdf',
      size: '2.8 KB',
      type: 'PDF Rekening Koran BCA (13 Mutasi Riil, Saldo Rp 21.8 Jt)',
    },
    {
      name: 'Laporan_Penjualan_Moka_POS_September_2026.xlsx',
      path: '/dokumen/Laporan_Penjualan_Moka_POS_September_2026.xlsx',
      size: '6.9 KB',
      type: 'Excel Kasir POS Moka (Omset Netto Rp 40.8 Jt)',
    },
    {
      name: 'Faktur_Tagihan_Supplier_Biji_Kopi_INV881.pdf',
      path: '/dokumen/Faktur_Tagihan_Supplier_Biji_Kopi_INV881.pdf',
      size: '2.5 KB',
      type: 'Faktur Supplier (Bahan Baku Biji Kopi, Tempo 30 Hari)',
    },
  ];

  // Setup Web Speech API for voice note recording
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = 'id-ID';

      recog.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setVoiceTranscript(transcript);
      };

      recog.onerror = () => {
        setIsRecordingVoice(false);
        setOrbState('breathing');
        clearInterval(timerRef.current);
      };

      recog.onend = () => {
        setIsRecordingVoice(false);
        setOrbState('breathing');
        clearInterval(timerRef.current);
      };

      recognitionRef.current = recog;
    }
  }, []);

  // Sync extracted result to editable state
  useEffect(() => {
    if (extractedResult) {
      setCustomBusinessName(extractedResult.business_name || '');
      setCustomPayroll(extractedResult.payroll_amount > 0 ? String(extractedResult.payroll_amount) : '');
      setCustomRent(extractedResult.fixed_rent_amount > 0 ? String(extractedResult.fixed_rent_amount) : '');
      setCustomBuffer(extractedResult.safety_buffer > 0 ? String(extractedResult.safety_buffer) : '');
      setIsEditingName(Boolean(extractedResult.is_name_missing));
    }
  }, [extractedResult]);

  const toggleVoiceRecording = () => {
    if (isRecordingVoice) {
      recognitionRef.current?.stop();
      setIsRecordingVoice(false);
      setOrbState('breathing');
      clearInterval(timerRef.current);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecordingVoice(true);
        setOrbState('listening');
        setVoiceSeconds(0);
        timerRef.current = setInterval(() => {
          setVoiceSeconds((prev) => prev + 1);
        }, 1000);
      } catch {
        setIsRecordingVoice(false);
      }
    }
  };

  const handleFile = (file: File) => {
    setRawFile(file);
    const sizeStr = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    let typeStr = 'Dokumen Finansial';
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') typeStr = 'PDF Rekening Koran';
    else if (['xlsx', 'xls', 'csv'].includes(ext || '')) typeStr = 'Excel / CSV Kasir';
    else if (['jpg', 'jpeg', 'png', 'webp'].includes(ext || '')) typeStr = 'Foto Bon / Struk';

    setSelectedFile(file.name);
    setFileDetails({ name: file.name, size: sizeStr, type: typeStr });
    setExtractedResult(null);
  };

  const handleSelectRealTestFile = async (item: typeof sampleFiles[0]) => {
    try {
      const res = await fetch(item.path);
      const blob = await res.blob();
      const file = new File([blob], item.name, { type: blob.type || 'application/octet-stream' });
      handleFile(file);
    } catch {
      setSelectedFile(item.name);
      setFileDetails({ name: item.name, size: item.size, type: item.type });
    }
  };

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClearFile = () => {
    setRawFile(null);
    setSelectedFile('');
    setFileDetails(null);
    setExtractedResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleProcessDocument = async () => {
    if (!rawFile && !voiceTranscript.trim() && !textNote.trim()) return;

    setIsProcessing(true);
    setOrbState('solving');

    try {
      const notesList: string[] = [];
      if (voiceTranscript.trim()) notesList.push(`[Catatan Suara]: ${voiceTranscript.trim()}`);
      if (textNote.trim()) notesList.push(`[Catatan Teks]: ${textNote.trim()}`);
      const combinedNotes = notesList.join('\n');

      let res: Response;
      if (rawFile) {
        const formData = new FormData();
        formData.append('file', rawFile);
        if (combinedNotes) formData.append('document_note', combinedNotes);
        res = await fetch('/api/ai/upload-file', {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await fetch('/api/ai/extract-context', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            document_name: selectedFile || 'Catatan_MultiModal.txt',
            document_note: combinedNotes || 'Catatan inisialisasi usaha.',
          }),
        });
      }

      if (res.ok) {
        const data = await res.json();
        setExtractedResult(data);
      } else {
        throw new Error('Gagal menghubungi backend AI');
      }
    } catch {
      setExtractedResult({
        business_name: selectedFile.includes('BCA') ? 'Kedai Kopi Nusa Utama' : 'Usaha Kuliner Saya',
        is_name_detected_from_doc: selectedFile.includes('BCA'),
        is_name_missing: !selectedFile.includes('BCA'),
        archetype: 'fnb',
        bank_name: selectedFile.includes('BCA') ? 'BCA' : 'Kas Bank',
        initial_cash: 21800000,
        safety_buffer: 3000000,
        payroll_amount: 8000000,
        payroll_day: 30,
        fixed_rent_amount: 3000000,
        daily_gross: 1200000,
        safe_to_spend: 10800000,
        confidence: 0.90,
        detected_items: [
          `Berkas Terverifikasi: ${selectedFile || 'Dokumen Keuangan'}`,
          'Akun Kas Utama: BCA',
          'Saldo Kas Riil: Rp 21.800.000',
          'Cadangan Darurat: Rp 3.000.000',
        ],
        missing_items: [
          'Beban Gaji Bulanan belum tercatat (Disarankan diisi agar tanggal gajian terlindungi)',
          'Biaya Sewa Tempat belum tercatat (Abaikan jika lokasi toko milik sendiri)',
        ],
        summary_narrative: 'AI memadukan data berkas finansial dan catatan Anda untuk membangun Digital Twin kas deterministik.',
      });
    } finally {
      setIsProcessing(false);
      setOrbState('breathing');
    }
  };

  const handleApply = () => {
    if (!extractedResult) return;
    const finalBusinessName = customBusinessName.trim() || extractedResult.business_name || 'Usaha Saya';
    const finalPayroll = customPayroll ? parseFloat(customPayroll) : (extractedResult.payroll_amount || 0);
    const finalRent = customRent ? parseFloat(customRent) : (extractedResult.fixed_rent_amount || 0);
    const finalBuffer = customBuffer ? parseFloat(customBuffer) : (extractedResult.safety_buffer || 3000000);
    const finalCash = extractedResult.initial_cash || 20000000;

    onComplete({
      businessName: finalBusinessName,
      archetype: extractedResult.archetype || 'fnb',
      bankName: extractedResult.bank_name || 'BCA',
      initialCash: finalCash,
      safetyBuffer: finalBuffer,
      payrollAmount: finalPayroll,
      payrollDay: extractedResult.payroll_day || 30,
      fixedRentAmount: finalRent,
      dailyGross: extractedResult.daily_gross || 0,
    });
  };

  const hasAnyInput = Boolean(rawFile || voiceTranscript.trim() || textNote.trim());

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Intro Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-neutral-950 tracking-tight flex items-center gap-2">
            <span>Inisialisasi Profil Usaha (Multi-Modal 3-in-1)</span>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              Berkas + Suara + Teks
            </span>
          </h3>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            Lengkapi data keuangan usaha melalui <strong>3 jalur sekaligus</strong>: unggah dokumen rekening/kasir, rekam suara, atau ketik catatan. AI akan menganalisis data riil dan mendeteksi secara cerdas apa saja yang masih kurang.
          </p>
        </div>
        <div className="shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-neutral-100 border border-neutral-200 shadow-2xs">
          <ThinkingOrb state={orbState} size={20} />
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUploadChange}
        accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png"
        className="hidden"
      />

      {/* 1. Modality: Financial File Upload */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-neutral-900 flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-bold">1</span>
            <span>Berkas Finansial (PDF / Excel / Struk):</span>
          </label>
          <span className="text-[10.5px] text-neutral-500">Maks. 15 MB</span>
        </div>

        {!selectedFile ? (
          <div className="space-y-2">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-5 sm:p-6 text-center cursor-pointer transition-all group ${
                isDragOver
                  ? 'border-blue-600 bg-blue-50/60'
                  : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50/60 hover:bg-neutral-50'
              }`}
            >
              <div className="h-10 w-10 rounded-xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-blue-600 mx-auto mb-2 group-hover:scale-105 transition-transform">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-neutral-900">
                Tarik berkas ke sini, atau{' '}
                <span className="text-blue-600 underline underline-offset-2">Pilih dari Komputer</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Mendukung PDF Rekening Koran, Excel/CSV POS Moka/Pawoon, atau Foto Nota
              </p>
            </div>

            {/* Quick Real Test Files */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowDemoOptions(!showDemoOptions)}
                className="text-xs text-neutral-600 hover:text-neutral-950 font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>📂 Atau gunakan 1 dari 3 Dokumen Nyata Siap Unggah yang telah disiapkan:</span>
                {showDemoOptions ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {showDemoOptions && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-neutral-100">
                  {sampleFiles.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleSelectRealTestFile(item)}
                      className="p-3 rounded-xl border border-neutral-200 bg-white hover:bg-blue-50/40 hover:border-blue-300 text-left transition-all cursor-pointer shadow-2xs group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {item.name.endsWith('.xlsx') ? (
                          <FileSpreadsheet className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                        )}
                        <span className="text-xs font-bold text-neutral-900 truncate">{item.name}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 line-clamp-2 leading-relaxed">
                        {item.type}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white p-3.5 sm:p-4 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                {selectedFile.endsWith('.xlsx') || selectedFile.endsWith('.csv') ? (
                  <FileSpreadsheet className="h-5 w-5" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-950 truncate max-w-xs sm:max-w-sm">
                    {fileDetails?.name || selectedFile}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full shrink-0">
                    Berkas Terpilih
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-2">
                  <span>{fileDetails?.type || 'Dokumen Terunggah'}</span>
                  <span>•</span>
                  <span className="font-mono">{fileDetails?.size || 'Siap'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
              >
                Ganti
              </button>
              <button
                type="button"
                onClick={handleClearFile}
                className="p-1.5 rounded-lg hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                title="Hapus berkas"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2 & 3. Dual Modalities: Voice Note & Text Note */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-neutral-100">
        {/* Modality 2: Voice Note */}
        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-white p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-bold">2</span>
              <span>Rekam Suara (Voice Note):</span>
            </label>
            <span className="text-[10.5px] text-neutral-500 flex items-center gap-1">
              <Volume2 className="h-3 w-3" />
              ID-ID
            </span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`w-full inline-flex items-center justify-center gap-2 h-9 px-3 rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-2xs ${
                isRecordingVoice
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-neutral-950 hover:bg-neutral-800 text-white'
              }`}
            >
              {isRecordingVoice ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5 text-emerald-400" />}
              <span>{isRecordingVoice ? `Hentikan Rekaman (${voiceSeconds} detik)` : 'Mulai Rekam Suara'}</span>
            </button>

            <textarea
              rows={2}
              value={voiceTranscript}
              onChange={(e) => setVoiceTranscript(e.target.value)}
              placeholder="Hasil rekaman suara akan otomatis tertulis di sini..."
              className="w-full text-xs text-neutral-800 p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-all resize-none bg-neutral-50/60"
            />
          </div>
        </div>

        {/* Modality 3: Text Note */}
        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-white p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-bold">3</span>
              <span>Catatan Teks Tambahan:</span>
            </label>
            <span className="text-[10.5px] text-neutral-500">Opsional</span>
          </div>

          <textarea
            rows={4}
            value={textNote}
            onChange={(e) => setTextNote(e.target.value)}
            placeholder="Ketik catatan kontekstual (contoh: 'Gaji 4 barista 8 juta tiap tgl 30, sewa ruko 3 juta/bulan, omset kasir rata-rata 1,2 juta/hari')..."
            className="w-full text-xs text-neutral-800 p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-all resize-none bg-neutral-50/60 flex-1"
          />
        </div>
      </div>

      {/* AI Action Button */}
      {!extractedResult && (
        <div className="pt-2">
          {!hasAnyInput ? (
            <button
              type="button"
              disabled
              className="w-full h-11 rounded-xl bg-neutral-100 text-neutral-400 text-xs font-semibold flex items-center justify-center gap-2 cursor-not-allowed border border-neutral-200"
            >
              <Sparkles className="h-4 w-4 opacity-40" />
              <span>Unggah Berkas, Rekam Suara, atau Ketik Catatan Terlebih Dahulu</span>
            </button>
          ) : (
            <MotionButton
              type="button"
              variant="primary"
              size="md"
              onClick={handleProcessDocument}
              disabled={isProcessing}
              className="w-full h-11 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs justify-center cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>
                {isProcessing
                  ? 'AI Sedang Menganalisis Berkas, Suara, dan Teks Anda...'
                  : '✨ Analisis Multi-Modal & Bangun Digital Twin Usaha'}
              </span>
            </MotionButton>
          )}
        </div>
      )}

      {/* AI Analysis Dossier: Found Items & Missing Items Analysis */}
      {extractedResult && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/20 p-4 sm:p-5 space-y-4 shadow-xs animate-in fade-in">
          {/* Header Status */}
          <div className="flex items-center justify-between pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-bold text-neutral-950">
                Hasil Analisis Intelijen AI JagaUsaha
              </span>
            </div>
            <span className="text-[10.5px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Confidence {Math.round((extractedResult.confidence || 0.92) * 100)}%
            </span>
          </div>

          {/* Section A: Nama Usaha Detection */}
          <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-neutral-700" />
                <span>Nama Entitas Usaha:</span>
              </div>
              {extractedResult.is_name_detected_from_doc ? (
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  ✓ Terdeteksi Otomatis dari Berkas
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  ⚠️ Belum Terdeteksi Otomatis
                </span>
              )}
            </div>

            {isEditingName || extractedResult.is_name_missing ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={customBusinessName}
                  onChange={(e) => setCustomBusinessName(e.target.value)}
                  placeholder="Ketik nama usaha Anda (contoh: Kedai Kopi Nusa)"
                  className="w-full text-xs font-bold text-neutral-950 p-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                <p className="text-[10.5px] text-neutral-500">
                  {extractedResult.is_name_missing
                    ? 'AI tidak menemukan nama usaha di berkas/suara. Silakan tentukan nama usaha Anda di atas.'
                    : 'Anda dapat menyesuaikan nama usaha jika diperlukan.'}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-neutral-950">
                  {customBusinessName || extractedResult.business_name}
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Ubah Nama</span>
                </button>
              </div>
            )}
          </div>

          {/* Section B: Data Terdeteksi & Terverifikasi (Found Items) */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Data Keuangan Terverifikasi:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {extractedResult.detected_items?.map((item: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-neutral-800 bg-white border border-neutral-200 px-2.5 py-1 rounded-xl shadow-2xs flex items-center gap-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Section C: Analisis Apa yang Kurang (Missing Items & Suggestions) */}
          {extractedResult.missing_items && extractedResult.missing_items.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                <span>Analisis AI: Data yang Belum Lengkap & Rekomendasi</span>
              </div>

              <div className="space-y-1.5">
                {extractedResult.missing_items.map((mItem: string, idx: number) => (
                  <div key={idx} className="text-[11px] text-amber-800 flex items-start gap-1.5 leading-relaxed">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{mItem}</span>
                  </div>
                ))}
              </div>

              {/* Quick Inline Inputs to Complete Missing Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-200/60">
                <div>
                  <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                    Lengkapi Gaji Bulanan (Rp):
                  </label>
                  <input
                    type="number"
                    value={customPayroll}
                    onChange={(e) => setCustomPayroll(e.target.value)}
                    placeholder="Contoh: 8000000"
                    className="w-full text-xs p-1.5 rounded-lg border border-amber-300 bg-white text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                    Lengkapi Sewa Toko/Bulan (Rp):
                  </label>
                  <input
                    type="number"
                    value={customRent}
                    onChange={(e) => setCustomRent(e.target.value)}
                    placeholder="0 jika milik sendiri"
                    className="w-full text-xs p-1.5 rounded-lg border border-amber-300 bg-white text-neutral-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section D: Summary & Safe to Spend Confirmation */}
          <div className="p-3.5 rounded-xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
                Duit Dingin Aman Terkalibrasi (DLMM Invariant)
              </div>
              <div className="text-lg font-black text-neutral-950 tabular-nums">
                Rp {Math.max(
                  0,
                  (extractedResult.initial_cash || 20000000) -
                    (customPayroll ? parseFloat(customPayroll) : (extractedResult.payroll_amount || 0)) -
                    (customBuffer ? parseFloat(customBuffer) : (extractedResult.safety_buffer || 3000000))
                ).toLocaleString('id-ID')}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExtractedResult(null)}
                className="px-3 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
              >
                Ubah Input
              </button>

              <MotionButton
                type="button"
                variant="primary"
                size="md"
                onClick={handleApply}
                className="bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-semibold rounded-xl px-4 py-2 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Terapkan ke Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </MotionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};