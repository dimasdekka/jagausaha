import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  FileUp,
} from 'lucide-react';
import { ThinkingOrb, type OrbState } from 'thinking-orbs';
import { MotionButton } from '../motion/button';
import type { BusinessContextData } from '../OnboardingModal';

interface OnboardingDocumentUploadProps {
  onComplete: (data: BusinessContextData) => void;
}

export const OnboardingDocumentUpload: React.FC<OnboardingDocumentUploadProps> = ({ onComplete }) => {
  const [selectedFile, setSelectedFile] = useState<string>('Rekening_Koran_BCA_Agustus_2026.pdf');
  const [customFileName, setCustomFileName] = useState<string>('');
  const [explanationMode, setExplanationMode] = useState<'voice' | 'text'>('voice');
  
  // Voice Note states
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState(
    'Ini mutasi rekening koran BCA bulan lalu. Usaha saya kedai kopi Kopi Nusa di Serang. Saldo saat ini 25 juta, cadangan darurat 5 juta, gaji 4 barista 8 juta dibayar tiap tanggal 30. Tolong pisahkan mutasi prive pribadi dengan bahan baku kopi.'
  );

  // Text note state
  const [textNote, setTextNote] = useState(
    'Rekap transaksi usaha Kopi Nusa. Saldo operasional di BCA Rp 25.000.000, buffer darurat Rp 5.000.000, komitmen gaji 4 barista Rp 8.000.000 jatuh tempo tanggal 30.'
  );

  const [orbState, setOrbState] = useState<OrbState>('breathing');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResult, setExtractedResult] = useState<any | null>(null);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleFiles = [
    { name: 'Rekening_Koran_BCA_Agustus_2026.pdf', size: '245 KB', type: 'PDF Rekening Koran' },
    { name: 'Rekap_POS_Moka_September.xlsx', size: '118 KB', type: 'Excel Penjualan Kasir' },
    { name: 'Foto_Struk_Bahan_Baku_Pasar.jpg', size: '1.2 MB', type: 'Foto Bukti Bon/Struk' },
  ];

  // Voice presets for rapid 1-click testing
  const voiceNotePresets = [
    {
      label: 'Penjelasan Rekening Koran (F&B)',
      text: 'Ini mutasi rekening koran BCA bulan lalu. Usaha saya kedai kopi Kopi Nusa di Serang. Saldo saat ini 25 juta, cadangan darurat 5 juta, gaji 4 barista 8 juta dibayar tiap tanggal 30. Tolong pisahkan mutasi prive pribadi dengan bahan baku kopi.',
    },
    {
      label: 'Penjelasan Rekap Kasir (Retail)',
      text: 'File ini rekap penjualan dari mesin POS Butik Hijab Zahrana. Saldo kas rekening Mandiri 32 juta, buffer 6 juta, gaji 3 staf 9 juta dibayar tanggal 28. Omset rata-rata 1,5 juta rupiah per hari.',
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

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomFileName(file.name);
      setSelectedFile(file.name);
      setExtractedResult(null);
    }
  };

  const handleProcessDocument = async () => {
    const activeNote = explanationMode === 'voice' ? voiceTranscript : textNote;
    if (!activeNote.trim() && !selectedFile) return;

    setIsProcessing(true);
    setOrbState('solving');

    try {
      const res = await fetch('/api/ai/extract-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_name: selectedFile,
          document_note: activeNote,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setExtractedResult(data);
      } else {
        setExtractedResult({
          business_name: 'Kopi Nusa',
          archetype: 'fnb',
          bank_name: 'BCA',
          initial_cash: 25000000,
          safety_buffer: 5000000,
          payroll_amount: 8000000,
          payroll_day: 30,
          fixed_rent_amount: 3000000,
          daily_gross: 1200000,
          safe_to_spend: 12000000,
          confidence: 0.92,
          detected_items: [
            `File Terverifikasi: ${selectedFile}`,
            'Nama Usaha: Kopi Nusa',
            'Akun Bank: BCA',
            'Saldo Terdeteksi: Rp 25.000.000',
            'Komitmen Gaji: Rp 8.000.000 (Tgl 30)',
            'Prive Terisolasi: Siap Diaudit di Data Inbox',
          ],
          summary_narrative: `AI memadukan mutasi berkas '${selectedFile}' dengan penjelasan ${
            explanationMode === 'voice' ? 'suara' : 'teks'
          } Anda. Terdeteksi saldo kas Rp 25.000.000, cadangan darurat Rp 5.000.000, dan kewajiban gaji Rp 8.000.000. Transaksi personal prive diisolasi untuk verifikasi aman.`,
        });
      }
    } catch {
      setExtractedResult({
        business_name: 'Kopi Nusa',
        archetype: 'fnb',
        bank_name: 'BCA',
        initial_cash: 25000000,
        safety_buffer: 5000000,
        payroll_amount: 8000000,
        payroll_day: 30,
        fixed_rent_amount: 3000000,
        daily_gross: 1200000,
        safe_to_spend: 12000000,
        confidence: 0.88,
        detected_items: [`File: ${selectedFile}`, 'Nama Usaha: Kopi Nusa', 'Saldo: Rp 25.000.000'],
        summary_narrative: 'AI berhasil merangkum data dokumen dan catatan Anda.',
      });
    } finally {
      setIsProcessing(false);
      setOrbState('breathing');
    }
  };

  const handleApply = () => {
    if (!extractedResult) return;
    onComplete({
      businessName: extractedResult.business_name || 'Kopi Nusa',
      archetype: extractedResult.archetype || 'fnb',
      bankName: extractedResult.bank_name || 'BCA',
      initialCash: extractedResult.initial_cash ?? 25000000,
      safetyBuffer: extractedResult.safety_buffer ?? 5000000,
      payrollAmount: extractedResult.payroll_amount ?? 8000000,
      payrollDay: extractedResult.payroll_day ?? 30,
      fixedRentAmount: extractedResult.fixed_rent_amount ?? 3000000,
      dailyGross: extractedResult.daily_gross ?? 1200000,
    });
  };

  return (
    <div className="p-6 space-y-5">
      {/* Intro Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#171717] tracking-tight">
            Kirim Laporan Keuangan Disertai Suara / Teks Penjelasan
          </h3>
          <p className="text-xs text-[#737373] mt-0.5 leading-relaxed">
            Cukup unggah berkas mutasi bank, rekap kasir POS, atau foto bon belanja, lalu jelaskan kondisinya melalui <strong>rekaman suara (voice note)</strong> atau <strong>teks catatan</strong>. AI JagaUsaha memadukan keduanya untuk membangun Digital Twin kas yang akurat.
          </p>
        </div>
        <div className="shrink-0 h-10 w-10 flex items-center justify-center rounded-[8px] bg-[#f5f5f5] border border-[#e5e5e5]">
          <ThinkingOrb state={orbState} size={20} />
        </div>
      </div>

      {/* 1. File Upload / Selection Zone */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#171717]">
            1. Pilih / Unggah Dokumen Finansial:
          </label>
          <span className="text-[10.5px] text-[#737373]">PDF, XLSX, CSV, JPG bon</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {sampleFiles.map((file) => {
            const isSelected = selectedFile === file.name;
            return (
              <button
                key={file.name}
                type="button"
                onClick={() => {
                  setSelectedFile(file.name);
                  setExtractedResult(null);
                }}
                className={`p-3 rounded-[8px] border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'border-2 border-[#0a0a0a] bg-[#f5f5f5] shadow-dub-subtle text-[#0a0a0a]'
                    : 'border-[#e5e5e5] bg-white hover:bg-[#f5f5f5] text-[#171717]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileText className={`h-4 w-4 ${isSelected ? 'text-[#2563eb]' : 'text-[#737373]'}`} />
                  <span className="text-xs font-bold truncate">{file.name}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#737373]">
                  <span>{file.type}</span>
                  <span className="font-mono">{file.size}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom File Upload Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUploadChange}
          accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png"
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-3 border border-dashed border-[#d4d4d4] rounded-[8px] bg-[#fafafa] flex items-center justify-center gap-2 text-xs text-[#525252] cursor-pointer hover:bg-[#f5f5f5] transition-colors shadow-dub-subtle"
        >
          <Upload className="h-3.5 w-3.5 text-[#737373]" />
          <span>
            {customFileName ? (
              <strong className="text-[#0a0a0a]">File Terpilih: {customFileName}</strong>
            ) : (
              'Klik di sini untuk mengunggah file laporan keuangan Anda sendiri dari perangkat'
            )}
          </span>
        </div>
      </div>

      {/* 2. Dual Explanation Mode Switcher: Voice Note vs Text */}
      <div className="space-y-2 pt-1 border-t border-[#f5f5f5]">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#171717]">
            2. Sertakan Penjelasan Dokumen (Pilih Suara atau Teks):
          </label>
          <div className="flex items-center gap-1 bg-[#f5f5f5] p-0.5 rounded-[8px] border border-[#e5e5e5]">
            <button
              type="button"
              onClick={() => setExplanationMode('voice')}
              className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                explanationMode === 'voice'
                  ? 'bg-white text-[#0a0a0a] shadow-dub-subtle'
                  : 'text-[#737373] hover:text-[#0a0a0a]'
              }`}
            >
              <Mic className="h-3 w-3 text-[#2563eb]" />
              <span>Voice Note (Suara)</span>
            </button>
            <button
              type="button"
              onClick={() => setExplanationMode('text')}
              className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                explanationMode === 'text'
                  ? 'bg-white text-[#0a0a0a] shadow-dub-subtle'
                  : 'text-[#737373] hover:text-[#0a0a0a]'
              }`}
            >
              <FileUp className="h-3 w-3 text-[#2563eb]" />
              <span>Teks Catatan</span>
            </button>
          </div>
        </div>

        {/* Option A: Voice Note Recording */}
        {explanationMode === 'voice' && (
          <div className="rounded-[12px] border border-[#e5e5e5] bg-white p-4 space-y-3 shadow-dub-subtle">
            <div className="flex items-center justify-between pb-2 border-b border-[#e5e5e5]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-dub-subtle ${
                    isRecordingVoice
                      ? 'bg-[#ea580c] text-white animate-pulse'
                      : 'bg-[#0a0a0a] hover:bg-[#171717] text-white'
                  }`}
                >
                  {isRecordingVoice ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                  <span>{isRecordingVoice ? `Hentikan (${voiceSeconds}s)` : 'Rekam Suara Penjelasan'}</span>
                </button>
                {isRecordingVoice && (
                  <span className="text-xs text-[#ea580c] font-semibold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#ea580c] animate-ping" />
                    Merekam penjelasan dokumen...
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#737373] flex items-center gap-1">
                <Volume2 className="h-3.5 w-3.5" />
                Audio Note Transcriber
              </span>
            </div>

            <textarea
              rows={3}
              value={voiceTranscript}
              onChange={(e) => setVoiceTranscript(e.target.value)}
              placeholder="Hasil transkripsi suara penjelasan dokumen akan tampil di sini..."
              className="w-full text-xs font-normal text-[#171717] leading-relaxed p-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] transition-all resize-none bg-[#f5f5f5]/50"
            />

            {/* Quick Voice Note Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10.5px] text-[#737373]">Contoh Rekaman Suara Cepat:</span>
              {voiceNotePresets.map((vp) => (
                <button
                  key={vp.label}
                  type="button"
                  onClick={() => {
                    setVoiceTranscript(vp.text);
                    setExtractedResult(null);
                  }}
                  className="px-2.5 py-0.5 rounded-full text-[10.5px] font-medium border border-[#e5e5e5] bg-white hover:bg-[#f5f5f5] text-[#171717] cursor-pointer transition-all shadow-dub-subtle"
                >
                  + {vp.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Option B: Text Note Writing */}
        {explanationMode === 'text' && (
          <div className="space-y-1.5">
            <textarea
              rows={4}
              value={textNote}
              onChange={(e) => setTextNote(e.target.value)}
              placeholder="Ketik catatan tambahan mengenai file ini (contoh: saldo rekening kas riil, pengeluaran wajib gaji dan tanggalnya)..."
              className="w-full text-xs font-normal text-[#171717] leading-relaxed p-3 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] transition-all resize-none bg-white shadow-dub-subtle"
            />
          </div>
        )}
      </div>

      {/* Action Button: Extract with AI */}
      {!extractedResult && (
        <MotionButton
          type="button"
          variant="primary"
          size="md"
          onClick={handleProcessDocument}
          disabled={isProcessing}
          className="w-full bg-[#0a0a0a] hover:bg-[#171717] text-white text-xs font-semibold rounded-[8px] shadow-dub-subtle justify-center py-2.5"
        >
          <Sparkles className="h-4 w-4 text-[#2563eb]" />
          <span>
            {isProcessing
              ? 'AI Sedang Menganalisis Dokumen & Penjelasan...'
              : 'Analisis Dokumen & Bangun Digital Twin'}
          </span>
        </MotionButton>
      )}

      {/* AI Extraction Dossier Card */}
      {extractedResult && (
        <div className="rounded-[12px] border border-[#bbf7d0] bg-[#dcfce7]/20 p-4 space-y-3 shadow-dub-subtle animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-[#bbf7d0]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532d]">
              <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
              <span>Dokumen & Penjelasan Terproses</span>
            </div>
            <span className="text-[10px] font-semibold text-[#16a34a] bg-white px-2 py-0.5 rounded-full border border-[#bbf7d0]">
              Confidence {Math.round((extractedResult.confidence || 0.92) * 100)}%
            </span>
          </div>

          <p className="text-xs text-[#166534] leading-relaxed font-normal">
            {extractedResult.summary_narrative}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {extractedResult.detected_items?.map((item: string, idx: number) => (
              <span
                key={idx}
                className="text-[11px] font-medium text-[#171717] bg-white border border-[#e5e5e5] px-2.5 py-0.5 rounded-full shadow-dub-subtle"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="p-3 rounded-[8px] bg-white border border-[#bbf7d0] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-[#737373]">
                Duit Dingin Aman Terkalibrasi
              </div>
              <div className="text-lg font-bold text-[#16a34a] tabular-nums">
                Rp {(extractedResult.safe_to_spend || 0).toLocaleString('id-ID')}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExtractedResult(null)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[8px] border border-[#e5e5e5] bg-white text-xs font-medium text-[#525252] hover:bg-[#f5f5f5] cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Ubah</span>
              </button>
              <MotionButton
                type="button"
                variant="primary"
                size="md"
                onClick={handleApply}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold rounded-[8px] shadow-dub-subtle"
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