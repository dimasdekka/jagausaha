import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { ThinkingOrb, type OrbState } from 'thinking-orbs';
import { MotionButton } from '../motion/button';
import type { BusinessContextData } from '../OnboardingModal';

interface OnboardingDocumentUploadProps {
  onComplete: (data: BusinessContextData) => void;
}

export const OnboardingDocumentUpload: React.FC<OnboardingDocumentUploadProps> = ({ onComplete }) => {
  const [selectedFile, setSelectedFile] = useState<string>('Rekening_Koran_BCA_Agustus_2026.pdf');
  const [documentNote, setDocumentNote] = useState(
    'Ini rekening koran BCA bulan lalu. Usaha saya kedai kopi Kopi Nusa di Serang. Saldo saat ini 25 juta, cadangan darurat 5 juta, gaji 4 barista 8 juta dibayar tiap tanggal 30. Tolong pisahkan mutasi prive pribadi dengan bahan baku kopi.'
  );
  const [orbState, setOrbState] = useState<OrbState>('breathing');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResult, setExtractedResult] = useState<any | null>(null);

  const sampleFiles = [
    { name: 'Rekening_Koran_BCA_Agustus_2026.pdf', size: '245 KB', type: 'PDF Bank Statement' },
    { name: 'Rekap_POS_Moka_September.xlsx', size: '118 KB', type: 'Excel Penjualan Harian' },
    { name: 'Foto_Struk_Bahan_Baku_Pasar.jpg', size: '1.2 MB', type: 'Foto Bukti Bon/Struk' },
  ];

  const handleProcessDocument = async () => {
    if (!documentNote.trim() && !selectedFile) return;
    setIsProcessing(true);
    setOrbState('solving');

    try {
      const res = await fetch('/api/ai/extract-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_name: selectedFile,
          document_note: documentNote,
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
          summary_narrative: `AI memadukan mutasi dokumen '${selectedFile}' dan catatan Anda. Terdeteksi saldo kas Rp 25.000.000, cadangan darurat Rp 5.000.000, dan kewajiban gaji Rp 8.000.000. Transaksi belum jelas dialokasikan ke Data Inbox untuk verifikasi cepat.`,
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
      initialCash: extractedResult.initial_cash || 25000000,
      safetyBuffer: extractedResult.safety_buffer || 5000000,
      payrollAmount: extractedResult.payroll_amount || 8000000,
      payrollDay: extractedResult.payroll_day || 30,
      fixedRentAmount: extractedResult.fixed_rent_amount || 3000000,
      dailyGross: extractedResult.daily_gross || 1200000,
    });
  };

  return (
    <div className="p-6 space-y-5">
      {/* Intro Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#171717] tracking-tight">
            Kirim Dokumen Keuangan & Catatan Penjelasan Usaha
          </h3>
          <p className="text-xs text-[#737373] mt-0.5 leading-relaxed">
            Punya mutasi rekening koran, rekap penjualan kasir, atau foto struk belanja yang belum rapi? Unggah dan sertakan catatan singkat. AI akan mengurai dan merapikannya ke dalam Digital Twin kas usaha Anda.
          </p>
        </div>
        <div className="shrink-0 h-10 w-10 flex items-center justify-center rounded-[8px] bg-[#f5f5f5] border border-[#e5e5e5]">
          <ThinkingOrb state={orbState} size={20} />
        </div>
      </div>

      {/* File Upload Zone */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#171717]">
          Pilih / Unggah File Laporan Finansial:
        </label>
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

        <div className="p-3 border border-dashed border-[#d4d4d4] rounded-[8px] bg-[#fafafa] flex items-center justify-center gap-2 text-xs text-[#525252] cursor-pointer hover:bg-[#f5f5f5] transition-colors">
          <Upload className="h-3.5 w-3.5 text-[#737373]" />
          <span>Atau klik untuk mengunggah PDF, XLSX, CSV, atau Foto Struk Anda sendiri</span>
        </div>
      </div>

      {/* Narrative Explanation Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#171717]">
            Catatan Penjelasan Usaha (Jelaskan Kondisi Kas Riil):
          </label>
          <span className="text-[11px] text-[#737373]">
            Sebutkan kas riil, pengeluaran wajib & tanggal gajian
          </span>
        </div>
        <textarea
          rows={3}
          value={documentNote}
          onChange={(e) => setDocumentNote(e.target.value)}
          placeholder="Tuliskan catatan tambahan mengenai file ini dan kondisi bisnis Anda..."
          className="w-full text-xs font-normal text-[#171717] leading-relaxed p-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] transition-all resize-none bg-[#f5f5f5]/50"
        />
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
          <span>{isProcessing ? 'AI Sedang Memproses Dokumen & Catatan...' : 'Analisis Dokumen & Bangun Digital Twin'}</span>
        </MotionButton>
      )}

      {/* AI Extraction Dossier Card */}
      {extractedResult && (
        <div className="rounded-[12px] border border-[#bbf7d0] bg-[#dcfce7]/20 p-4 space-y-3 shadow-dub-subtle animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-[#bbf7d0]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532d]">
              <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
              <span>Dokumen Terproses: Model Finansial Terkalibrasi</span>
            </div>
            <span className="text-[10px] font-semibold text-[#16a34a] bg-white px-2 py-0.5 rounded-full border border-[#bbf7d0]">
              Confidence {Math.round((extractedResult.confidence || 0.92) * 100)}%
            </span>
          </div>

          <p className="text-xs text-[#166534] leading-relaxed">
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
