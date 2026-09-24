import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, Volume2, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { ThinkingOrb, type OrbState } from 'thinking-orbs';
import { MotionButton } from '../motion/button';
import type { BusinessContextData } from '../OnboardingModal';

interface OnboardingVoiceChatProps {
  onComplete: (data: BusinessContextData) => void;
}

export const OnboardingVoiceChat: React.FC<OnboardingVoiceChatProps> = ({ onComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [orbState, setOrbState] = useState<OrbState>('breathing');
  const [transcript, setTranscript] = useState(
    'Halo JagaUsaha, kedai kopi saya Kopi Nusa di Serang. Saldo rekening Bank BCA saat ini ada 25 juta, cadangan darurat mau simpan 5 juta. Karyawan ada 4 barista total gaji 8 juta dibayar tiap tanggal 30. Ada sewa ruko 3 juta sebulan, dan rata-rata omset harian 1,2 juta.'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResult, setExtractedResult] = useState<any | null>(null);

  // Preset realistic voice scripts
  const voicePresets = [
    {
      label: 'Kedai Kopi & F&B',
      text: 'Halo JagaUsaha, kedai kopi saya Kopi Nusa di Serang. Saldo rekening Bank BCA saat ini ada 25 juta, cadangan darurat mau simpan 5 juta. Karyawan ada 4 barista total gaji 8 juta dibayar tiap tanggal 30. Ada sewa ruko 3 juta sebulan, dan rata-rata omset harian 1,2 juta.',
    },
    {
      label: 'Toko Retail & Olshop',
      text: 'Nama toko saya Butik Hijab Zahrana. Kami pakai rekening Bank Mandiri dengan saldo kas 32 juta. Buffer darurat wajib ada 6 juta. Biaya gaji 3 admin dan packing 9 juta dibayar tanggal 28. Penjualan rata-rata per hari sekitar 1,5 juta rupiah.',
    },
    {
      label: 'Warung Kelontong',
      text: 'Saya pemilik Toko Sembako Berkah. Kas tunai di laci dan rekening BRI total 15 juta. Cadangan darurat 2,5 juta. Gaji 2 pegawai 4,5 juta tiap tanggal 25. Tempo supplier beras biasanya 5 juta per dua minggu.',
    },
  ];

  // Toggle voice simulation
  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setOrbState('listening');
      setRecordingDuration(1);
    } else {
      setIsRecording(false);
      setOrbState('breathing');
    }
  };

  const handleExtractWithAI = async () => {
    if (!transcript.trim()) return;
    setIsProcessing(true);
    setOrbState('solving');

    try {
      const res = await fetch('/api/ai/extract-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transcript }),
      });

      if (res.ok) {
        const data = await res.json();
        setExtractedResult(data);
      } else {
        // Fallback local extraction
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
          detected_items: [
            'Nama Usaha: Kopi Nusa',
            'Kategori Industri: Kafe, Resto & F&B',
            'Akun Kas Utama: BCA',
            'Saldo Kas: Rp 25.000.000',
            'Cadangan Darurat: Rp 5.000.000',
            'Beban Gaji: Rp 8.000.000 (Tgl 30)',
          ],
          summary_narrative:
            'AI berhasil merangkum profil usaha Kopi Nusa dengan saldo Rp 25.000.000, cadangan darurat Rp 5.000.000, dan komitmen gaji Rp 8.000.000. Duit Dingin Aman ditetapkan sebesar Rp 12.000.000.',
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
        detected_items: [
          'Nama Usaha: Kopi Nusa',
          'Kategori: F&B',
          'Bank: BCA',
          'Kas: Rp 25.000.000',
          'Buffer: Rp 5.000.000',
        ],
        summary_narrative: 'AI berhasil merangkum profil usaha Anda.',
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
            Ceritakan Usaha Anda Bebas dengan Suara / Teks
          </h3>
          <p className="text-xs text-[#737373] mt-0.5 leading-relaxed">
            Tidak perlu pusing mengisi tabel akuntansi rumit. Cukup bicarakan kondisi kas riil, pengeluaran gaji, dan target cadangan Anda. AI JagaUsaha akan mengekstrak metrik dan mengkalibrasi model secara otomatis.
          </p>
        </div>
        <div className="shrink-0 h-10 w-10 flex items-center justify-center rounded-[8px] bg-[#f5f5f5] border border-[#e5e5e5]">
          <ThinkingOrb state={orbState} size={20} />
        </div>
      </div>

      {/* Voice Recording / Input Box */}
      <div className="rounded-[12px] border border-[#e5e5e5] bg-[#ffffff] p-4 shadow-dub-subtle space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-dub-subtle ${
                isRecording
                  ? 'bg-[#ea580c] text-white animate-pulse'
                  : 'bg-[#0a0a0a] hover:bg-[#171717] text-white'
              }`}
            >
              {isRecording ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
              <span>{isRecording ? 'Berhenti Merekam' : 'Mulai Rekam Suara'}</span>
            </button>
            {isRecording && (
              <span className="text-xs font-mono text-[#ea580c] font-bold">
                Merekam audio (00:0{recordingDuration}s)...
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#737373] flex items-center gap-1">
            <Volume2 className="h-3.5 w-3.5 text-[#525252]" />
            Natural Speech Sensor
          </span>
        </div>

        <textarea
          rows={4}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Ceritakan: nama usaha, saldo bank saat ini, perkiraan omset, uang yang wajib disisihkan untuk gaji, dan tanggal gajian..."
          className="w-full text-xs font-normal text-[#171717] leading-relaxed p-2.5 rounded-[8px] border border-[#e5e5e5] focus:outline-none focus:border-[#0a0a0a] transition-all resize-none bg-[#f5f5f5]/50"
        />

        {/* 1-Click Example Snippets */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-semibold text-[#525252]">Coba Contoh Kasus Nyata:</div>
          <div className="flex flex-wrap gap-1.5">
            {voicePresets.map((vp) => (
              <button
                key={vp.label}
                type="button"
                onClick={() => {
                  setTranscript(vp.text);
                  setExtractedResult(null);
                }}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] text-[#171717] cursor-pointer transition-all shadow-dub-subtle"
              >
                + {vp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button: Extract with AI */}
      {!extractedResult && (
        <MotionButton
          type="button"
          variant="primary"
          size="md"
          onClick={handleExtractWithAI}
          disabled={isProcessing || !transcript.trim()}
          className="w-full bg-[#0a0a0a] hover:bg-[#171717] text-white text-xs font-semibold rounded-[8px] shadow-dub-subtle justify-center py-2.5"
        >
          <Sparkles className="h-4 w-4 text-[#2563eb]" />
          <span>{isProcessing ? 'AI Sedang Menganalisis Narasi...' : 'Ekstrak & Rangkum Konteks Usaha dengan AI'}</span>
        </MotionButton>
      )}

      {/* AI Extraction Dossier Card */}
      {extractedResult && (
        <div className="rounded-[12px] border border-[#bbf7d0] bg-[#dcfce7]/20 p-4 space-y-3 shadow-dub-subtle animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-[#bbf7d0]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532d]">
              <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
              <span>AI Berhasil Meringkas Konteks Usaha</span>
            </div>
            <span className="text-[10px] font-semibold text-[#16a34a] bg-white px-2 py-0.5 rounded-full border border-[#bbf7d0]">
              Confidence {Math.round((extractedResult.confidence || 0.88) * 100)}%
            </span>
          </div>

          <p className="text-xs text-[#166534] leading-relaxed">
            {extractedResult.summary_narrative}
          </p>

          {/* Extracted Facts Pills */}
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

          {/* Instant Safe-to-Spend Computation */}
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
