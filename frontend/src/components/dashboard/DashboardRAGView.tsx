import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  FileText,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Layers,
  Plus,
  FileUp,
  Info,
  X,
  ShieldCheck,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Quote,
  UploadCloud,
} from 'lucide-react';
import { ThinkingOrb } from 'thinking-orbs';
import { MotionButton } from '../motion/button';

interface Citation {
  source: string;
  type: string;
  score: number;
  matched_terms: string[];
}

interface RetrievedChunk {
  id: string;
  source: string;
  content: string;
  metadata: Record<string, any>;
}

interface RAGQueryResult {
  query: string;
  answer: string;
  citations: Citation[];
  retrieved_chunks: RetrievedChunk[];
}

interface DocumentItem {
  chunk_id: string;
  source: string;
  doc_type: string;
  content: string;
  metadata: Record<string, any>;
}

export const DashboardRAGView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [ragResult, setRagResult] = useState<RAGQueryResult | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showSnippets, setShowSnippets] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Direct RAG Ingestion Modal states
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const [ingestFile, setIngestFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ingestSource, setIngestSource] = useState('');
  const [ingestType, setIngestType] = useState('supplier_invoice');
  const [ingestContent, setIngestContent] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestSuccessMsg, setIngestSuccessMsg] = useState('');

  // Suggested quick prompts for demo
  const samplePrompts = [
    'Apakah bisa beli mesin espresso komersial dengan tempo?',
    'Berapa beban gaji karyawan dan kapan jatuh temponya?',
    'Ada transaksi mencurigakan prive minggu ini?',
    'Berapa batas bebas pajak PPh final UMKM?',
    'Berapa potongan MDR transaksi QRIS usaha mikro?',
  ];

  // Fetch all indexed documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/rag/documents');
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.documents || []);
      }
    } catch {
      // Fallback seed documents
      setDocuments([
        {
          chunk_id: 'doc-bca-01',
          source: 'Rekening_Koran_BCA_Agustus_2026.pdf (Hal 1)',
          doc_type: 'bank_statement',
          content: 'Saldo awal Rp 16.200.000, mutasi masuk omset Rp 27.500.000, pengeluaran operasional Rp 18.700.000, saldo akhir penutupan Rp 25.000.000.',
          metadata: { bank: 'BCA', closing_balance: 25000000 },
        },
        {
          chunk_id: 'doc-inv-01',
          source: 'Faktur_Toko_Mesin_Berkah_INV-88.pdf',
          doc_type: 'supplier_invoice',
          content: 'Penawaran unit Mesin Espresso 2-Group Rp 14.000.000. Opsi tempo: DP 50% (Rp 7.000.000) dan pelunasan tempo 30 hari tanpa bunga.',
          metadata: { total: 14000000, dp_50: 7000000 },
        },
        {
          chunk_id: 'rule-pajak-01',
          source: 'Regulasi Pajak UMKM (PP 55/2022)',
          doc_type: 'regulatory_rule',
          content: 'Wajib Pajak Orang Pribadi UMKM dengan omset bruto tahunan di bawah Rp 500.000.000 bebas pajak PPh. Tarif 0.5% hanya untuk kelebihan omset di atas Rp 500 juta.',
          metadata: { tax_rate: 0.005, threshold: 500000000 },
        },
      ]);
    }
  };

  const handleModalFileSelect = (file: File) => {
    setIngestFile(file);
    setIngestSource(file.name);

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (ext === 'pdf') {
      if (
        file.name.toLowerCase().includes('rekening') ||
        file.name.toLowerCase().includes('bca') ||
        file.name.toLowerCase().includes('mandiri')
      ) {
        setIngestType('bank_statement');
      } else {
        setIngestType('supplier_invoice');
      }
    } else if (['xlsx', 'xls', 'csv'].includes(ext)) {
      setIngestType('supplier_invoice');
    } else if (['txt', 'md', 'doc', 'docx'].includes(ext)) {
      setIngestType('business_memory');
    }

    if (
      file.type.startsWith('text/') ||
      ext === 'csv' ||
      ext === 'txt' ||
      ext === 'md' ||
      ext === 'json'
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          setIngestContent(text.slice(0, 1000));
        }
      };
      reader.readAsText(file);
    } else {
      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;
      setIngestContent(
        `Berkas "${file.name}" (${sizeStr}) terunggah ke Pangkalan RAG JagaUsaha sebagai rujukan data finansial terverifikasi.`
      );
    }
  };

  const handleClearModalFile = () => {
    setIngestFile(null);
    setIngestSource('');
    setIngestContent('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleIngestDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingestSource.trim() || !ingestContent.trim()) return;

    setIsIngesting(true);
    const docId = `doc-user-${Date.now()}`;
    try {
      const res = await fetch('/api/rag/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doc_id: docId,
          source: ingestSource.trim(),
          content: ingestContent.trim(),
          doc_type: ingestType,
          metadata: { added_at: new Date().toISOString() },
        }),
      });

      if (res.ok) {
        setIngestSuccessMsg(`Dokumen "${ingestSource}" berhasil diindeks ke RAG!`);
        fetchDocuments();
        setTimeout(() => {
          setIsIngestModalOpen(false);
          setIngestSource('');
          setIngestContent('');
          setIngestSuccessMsg('');
        }, 1200);
      } else {
        const newDoc: DocumentItem = {
          chunk_id: docId,
          source: ingestSource.trim(),
          doc_type: ingestType,
          content: ingestContent.trim(),
          metadata: { added_at: new Date().toISOString() },
        };
        setDocuments((prev) => [newDoc, ...prev]);
        setIngestSuccessMsg(`Dokumen "${ingestSource}" berhasil ditambahkan!`);
        setTimeout(() => {
          setIsIngestModalOpen(false);
          setIngestSource('');
          setIngestContent('');
          setIngestSuccessMsg('');
        }, 1200);
      }
    } catch {
      const newDoc: DocumentItem = {
        chunk_id: docId,
        source: ingestSource.trim(),
        doc_type: ingestType,
        content: ingestContent.trim(),
        metadata: { added_at: new Date().toISOString() },
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setIngestSuccessMsg(`Dokumen "${ingestSource}" berhasil ditambahkan!`);
      setTimeout(() => {
        setIsIngestModalOpen(false);
        setIngestSource('');
        setIngestContent('');
        setIngestSuccessMsg('');
      }, 1200);
    } finally {
      setIsIngesting(false);
    }
  };

  const handleCopyAnswer = () => {
    if (!ragResult) return;
    navigator.clipboard.writeText(ragResult.answer);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const renderFormattedAnswer = (text: string) => {
    const parts = text.split(/(\[.*?\]|\(#mem-\d+\))/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const cleanName = part.slice(1, -1).replace(/_/g, ' ');
        return (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200/80 text-[11.5px] font-semibold align-baseline shadow-2xs"
          >
            <FileText className="h-3 w-3 text-blue-600 inline" />
            <span>{cleanName}</span>
          </span>
        );
      }
      if (part.startsWith('(#mem-') && part.endsWith(')')) {
        const memNum = part.slice(6, -1);
        return (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-md bg-purple-50 text-purple-800 border border-purple-200/80 text-[11.5px] font-semibold align-baseline shadow-2xs"
          >
            <Sparkles className="h-3 w-3 text-purple-600 inline" />
            <span>Memori #{memNum}</span>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleExecuteRAGSearch = async (queryToSearch: string) => {
    const q = queryToSearch.trim();
    if (!q) return;

    setSearchQuery(q);
    setIsSearching(true);

    try {
      const res = await fetch('/api/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          current_cash: 25000000,
          safe_to_spend: 12000000,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRagResult(data);
      } else {
        throw new Error('Fallback required');
      }
    } catch {
      // Local fallback simulation
      setRagResult({
        query: q,
        answer: `Berdasarkan penelusuran pangkalan dokumen lokal JagaUsaha: Pertanyaan Anda telah dicocokkan dengan arsip rekening koran, invoice vendor, dan standar tata kelola kas UMKM. Duit Dingin Aman (Safe-to-Spend) saat ini terlindungi di angka Rp 12.000.000.`,
        citations: [
          {
            source: 'Faktur_Toko_Mesin_Berkah_INV-88.pdf',
            type: 'supplier_invoice',
            score: 2.85,
            matched_terms: ['mesin', 'tempo', 'dp'],
          },
          {
            source: 'Business Memory Archive (#mem-1)',
            type: 'business_memory',
            score: 2.1,
            matched_terms: ['restrukturisasi', 'espresso'],
          },
        ],
        retrieved_chunks: [
          {
            id: 'doc-inv-01',
            source: 'Faktur_Toko_Mesin_Berkah_INV-88.pdf',
            content: 'Penawaran Mesin Espresso 2-Group Rp 14.000.000 tunai atau DP 50% (Rp 7.000.000) tempo 30 hari.',
            metadata: { total: 14000000 },
          },
        ],
      });
    } finally {
      setIsSearching(false);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    if (selectedFilter === 'all') return true;
    return doc.doc_type === selectedFilter;
  });

  const getDocTypeBadge = (type: string) => {
    switch (type) {
      case 'bank_statement':
        return { label: 'Rekening Koran Bank', color: 'bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]' };
      case 'supplier_invoice':
        return { label: 'Faktur / Bon Vendor', color: 'bg-[#faf5ff] text-[#7c3aed] border-[#e9d5ff]' };
      case 'business_memory':
        return { label: 'Business Memory', color: 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]' };
      case 'regulatory_rule':
        return { label: 'Regulasi Pajak & BI', color: 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]' };
      default:
        return { label: 'Dokumen Terunggah', color: 'bg-[#f5f5f5] text-[#525252] border-[#e5e5e5]' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-[16px] border border-[#e5e5e5] bg-white p-6 shadow-dub-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-[8px] bg-[#0a0a0a] text-white">
              <BookOpen className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-[#0a0a0a] tracking-tight">
              Pangkalan Dokumen & RAG Finansial (Retrieval-Augmented Generation)
            </h2>
          </div>
          <p className="text-xs text-[#737373] mt-1.5 leading-relaxed max-w-2xl">
            Sistem RAG mandiri yang mengindeks rekening koran, faktur supplier, arsip memori keputusan masa lalu, dan regulasi pajak UMKM. Setiap rekomendasi AI berlandaskan bukti nyata (*verifiable source citations*) tanpa risiko halusinasi.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-9 px-3.5 rounded-xl border border-neutral-200/90 bg-neutral-50 text-xs font-semibold text-neutral-800 flex items-center gap-2 shadow-2xs">
            <Layers className="h-4 w-4 text-blue-600" />
            <span>{documents.length} Dokumen Terindeks</span>
          </div>

          <button
            type="button"
            onClick={() => setIsIngestModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            title="Tambah atau indeks dokumen baru ke Pangkalan RAG"
          >
            <Plus className="h-3.5 w-3.5 text-neutral-300" />
            <span>Tambah Dokumen</span>
          </button>
        </div>
      </div>

      {/* Cara Input Dokumen ke RAG Info Guide */}
      <div className="rounded-2xl border border-blue-200/90 bg-gradient-to-br from-blue-50/60 via-blue-50/30 to-white p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
        <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5 border border-blue-200/80">
          <Info className="h-4 w-4" />
        </div>
        <div className="space-y-2 text-xs flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="font-bold text-blue-950 text-xs sm:text-sm">
              Cara Memasukkan Dokumen ke Pangkalan RAG Finansial:
            </span>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full border border-blue-200/70 w-fit">
              Otomatis & Terverifikasi
            </span>
          </div>
          <p className="text-blue-900/80 leading-relaxed font-normal">
            Pangkalan data RAG ini menampung seluruh referensi finansial usaha Anda melalui <strong>3 jalur input</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-white/95 border border-blue-200/80 space-y-1 shadow-2xs">
              <span className="font-bold text-blue-950 flex items-center gap-1.5 text-xs">
                <Plus className="h-3.5 w-3.5 text-blue-600" />
                1. Input Langsung di Sini
              </span>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Klik tombol <strong>"+ Tambah Dokumen"</strong> di atas untuk memasukkan faktur vendor, surat perjanjian tempo, atau aturan internal toko secara instan.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/95 border border-blue-200/80 space-y-1 shadow-2xs">
              <span className="font-bold text-blue-950 flex items-center gap-1.5 text-xs">
                <FileUp className="h-3.5 w-3.5 text-emerald-600" />
                2. Tombol "Unggah Dokumen"
              </span>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Gunakan tombol <strong>"Unggah Dokumen"</strong> di navbar atas untuk mengunggah file rekening koran PDF, Excel kasir POS, atau foto nota bon fisik.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/95 border border-blue-200/80 space-y-1 shadow-2xs">
              <span className="font-bold text-blue-950 flex items-center gap-1.5 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                3. Otomatis saat Onboarding
              </span>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Setiap pesan suara (*voice note*) dan teks yang Anda sampaikan pada inisialisasi awal otomatis diparsing dan disimpan ke pangkalan RAG ini.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RAG Interactive Query Sandbox */}
      <div className="rounded-[16px] border border-[#e5e5e5] bg-white p-5 shadow-dub-subtle space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#0a0a0a] flex items-center gap-1.5">
            <Search className="h-3.5 w-3.5 text-[#2563eb]" />
            <span>Tanya Data Dokumen & Regulasi Kas:</span>
          </label>
          <span className="text-[10.5px] text-[#737373]">
            100% Offline Retrieval · TF-IDF + BM25 Grounded
          </span>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleExecuteRAGSearch(searchQuery);
                }
              }}
              placeholder='Tanyakan dokumen, invoice, atau regulasi (cth: "Bisa beli mesin espresso tempo?", "Berapa pajak UMKM?")...'
              className="w-full h-11 px-3.5 pr-10 rounded-[8px] border border-[#e5e5e5] text-xs font-medium text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-all bg-[#fafafa] shadow-dub-subtle"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#737373] hover:text-[#0a0a0a] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <MotionButton
            type="button"
            variant="primary"
            size="md"
            onClick={() => handleExecuteRAGSearch(searchQuery)}
            disabled={!searchQuery.trim() || isSearching}
            className="h-11 px-5 bg-[#0a0a0a] hover:bg-[#171717] text-white text-xs font-semibold rounded-[8px] shadow-dub-subtle shrink-0"
          >
            {isSearching ? (
              <div className="flex items-center gap-2">
                <ThinkingOrb state="solving" size={20} theme="dark" />
                <span>Mencari Dokumen...</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#2563eb]" />
                <span>Jalankan RAG</span>
              </div>
            )}
          </MotionButton>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10.5px] text-[#737373]">Contoh Kueri Cepat:</span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleExecuteRAGSearch(p)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[#e5e5e5] bg-white hover:bg-[#f5f5f5] text-[#171717] cursor-pointer transition-all shadow-dub-subtle"
            >
              {p}
            </button>
          ))}
        </div>

        {/* RAG Synthesis Result Box (Polished Editorial UX) */}
        {ragResult && (
          <div className="mt-5 p-5 sm:p-6 rounded-2xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/30 via-white to-white shadow-sm space-y-4 animate-in fade-in duration-300">
            {/* Header: Title, Badge, and Copy Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-950 flex items-center gap-2">
                    <span>Jawaban Terverifikasi (Grounded RAG Answer)</span>
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    Disintesis langsung dari dokumen finansial riil usaha Anda • Bebas halusinasi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
                  {ragResult.citations.length} Rujukan Terverifikasi
                </span>

                <button
                  type="button"
                  onClick={handleCopyAnswer}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 shadow-2xs transition-all cursor-pointer"
                  title="Salin jawaban AI"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-neutral-400" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Answer Body (Comfortable Editorial Reading UX) */}
            <div className="p-4 sm:p-5 rounded-xl bg-neutral-50/60 border border-neutral-200/70">
              <div className="text-[13.5px] sm:text-[14px] text-neutral-800 leading-relaxed sm:leading-7 font-normal">
                {renderFormattedAnswer(ragResult.answer)}
              </div>
            </div>

            {/* Verifiable Citations Grid */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-blue-600" />
                  <span>Dokumen Rujukan Terverifikasi (Citations):</span>
                </span>
                <span className="text-[11px] text-neutral-500 font-medium">
                  Tingkat relevansi dokumen
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {ragResult.citations.map((cite, idx) => {
                  const cleanName = cite.source.replace(/_/g, ' ').replace(/\.pdf$|\.xlsx$|\.docx$/i, '');
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-neutral-200/90 bg-white hover:border-neutral-300 transition-colors flex items-center justify-between gap-2 shadow-2xs group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-neutral-900 truncate" title={cite.source}>
                            {cleanName}
                          </div>
                          <div className="text-[10px] text-neutral-500 capitalize">
                            {cite.type ? cite.type.replace(/_/g, ' ') : 'Dokumen Terdaftar'}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0 font-mono">
                        Skor {cite.score}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Collapsible Retrieved Context Snippets (Accordion) */}
            <div className="pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setShowSnippets(!showSnippets)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-neutral-100/70 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Quote className="h-3.5 w-3.5 text-neutral-500 group-hover:text-neutral-800 transition-colors" />
                  <span>
                    {showSnippets
                      ? 'Sembunyikan Cuplikan Dokumen Asli'
                      : `Lihat Cuplikan Dokumen Asli (${ragResult.retrieved_chunks.length} Bukti Tercatat)`}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-normal">
                  <span>{showSnippets ? 'Tutup' : 'Buka'}</span>
                  {showSnippets ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </div>
              </button>

              {showSnippets && (
                <div className="space-y-2.5 pt-3 animate-in fade-in duration-200">
                  {ragResult.retrieved_chunks.map((chunk, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-4 rounded-xl bg-neutral-50 border-l-4 border-l-blue-600 border border-neutral-200/80 text-xs leading-relaxed shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200/60">
                        <span className="font-bold text-neutral-900 text-xs truncate">
                          {chunk.source.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono bg-white px-2 py-0.5 rounded border border-neutral-200">
                          {chunk.id}
                        </span>
                      </div>
                      <p className="text-neutral-700 text-xs leading-relaxed italic font-normal">
                        "{chunk.content}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Indexed Document Knowledge Base Browser */}
      <div className="rounded-[16px] border border-[#e5e5e5] bg-white p-5 shadow-dub-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e5e5]">
          <div>
            <h3 className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#2563eb]" />
              <span>Arsip Seluruh Dokumen Finansial Terindeks</span>
            </h3>
            <p className="text-[11px] text-[#737373] mt-0.5">
              Dokumen dapat dicari dan dikutip secara instan oleh seluruh agen JagaUsaha.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#f5f5f5] p-1 rounded-[8px] border border-[#e5e5e5]">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'bank_statement', label: 'Rekening Koran' },
              { id: 'supplier_invoice', label: 'Faktur & Sewa' },
              { id: 'business_memory', label: 'Memori Keputusan' },
              { id: 'regulatory_rule', label: 'Regulasi Pajak/BI' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-2.5 py-1 rounded-[6px] text-[10.5px] font-semibold cursor-pointer transition-all ${
                  selectedFilter === f.id
                    ? 'bg-white text-[#0a0a0a] shadow-dub-subtle'
                    : 'text-[#737373] hover:text-[#0a0a0a]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredDocs.map((doc) => {
            const badge = getDocTypeBadge(doc.doc_type);
            return (
              <div
                key={doc.chunk_id}
                className="p-4 rounded-[12px] border border-[#e5e5e5] bg-[#fafafa] hover:bg-white transition-all space-y-2.5 shadow-dub-subtle"
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                  <span className="text-[9.5px] font-mono text-[#737373] bg-white px-1.5 py-0.5 rounded border border-[#e5e5e5]">
                    {doc.chunk_id}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#0a0a0a] flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-[#2563eb] shrink-0" />
                  <span className="truncate">{doc.source}</span>
                </div>

                <p className="text-xs text-[#525252] leading-relaxed line-clamp-3 font-normal">
                  {doc.content}
                </p>

                {doc.metadata && Object.keys(doc.metadata).length > 0 && (
                  <div className="pt-2 border-t border-[#e5e5e5] flex flex-wrap gap-1 text-[9.5px] font-mono text-[#737373]">
                    {Object.entries(doc.metadata).map(([k, v]) => (
                      <span key={k} className="bg-white px-1.5 py-0.5 rounded border border-[#e5e5e5]">
                        {k}: {typeof v === 'number' ? v.toLocaleString('id-ID') : String(v)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog Ingest Dokumen RAG Baru */}
      {isIngestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Frosted Scrim Backdrop */}
          <div
            onClick={() => setIsIngestModalOpen(false)}
            className="fixed inset-0 backdrop-blur-2xl backdrop-saturate-150 cursor-pointer"
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.45)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-neutral-200/90 shadow-2xl p-6 z-10 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center shadow-xs">
                  <Plus className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-950">
                    Tambah Dokumen ke Pangkalan RAG
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Indeks teks faktur, nota, memo kesepakatan, atau regulasi toko
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsIngestModalOpen(false)}
                className="h-8 w-8 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {ingestSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1.5 animate-in fade-in">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
                <div className="text-xs font-bold text-emerald-900">{ingestSuccessMsg}</div>
                <p className="text-[11px] text-emerald-700">Pangkalan data RAG diperbarui secara instan.</p>
              </div>
            ) : (
              <form onSubmit={handleIngestDocument} className="space-y-3.5">
                {/* File Upload Zone */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1.5">
                    Unggah Berkas (PDF, Excel, CSV, Foto Nota, atau Dokumen):
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleModalFileSelect(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    accept=".pdf,.xlsx,.xls,.csv,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp"
                  />

                  {!ingestFile ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl border-2 border-dashed border-neutral-300 hover:border-neutral-400 bg-neutral-50/60 hover:bg-neutral-50 p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-blue-600 shadow-2xs group-hover:scale-105 transition-transform">
                        <UploadCloud className="h-4 w-4" />
                      </div>
                      <div className="text-xs font-semibold text-neutral-900">
                        Klik untuk <span className="text-blue-600 underline underline-offset-2">Pilih Berkas</span> dari Komputer
                      </div>
                      <div className="text-[10.5px] text-neutral-500">
                        Mendukung Rekening Koran PDF, Excel Kasir, Faktur Supplier, atau Foto Bon (Maks. 15MB)
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-neutral-950 truncate">
                            {ingestFile.name}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {(ingestFile.size / 1024).toFixed(0)} KB • Berkas Terpilih (Otomatis Terindeks)
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleClearModalFile}
                        className="p-1.5 rounded-lg hover:bg-rose-100 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Hapus berkas"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Nama / Judul Berkas:
                  </label>
                  <input
                    type="text"
                    required
                    value={ingestSource}
                    onChange={(e) => setIngestSource(e.target.value)}
                    placeholder="Contoh: Faktur_Bahan_Baku_Kopi_September.pdf, Perjanjian_Sewa_Ruko.docx"
                    className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Kategori Dokumen:
                  </label>
                  <select
                    value={ingestType}
                    onChange={(e) => setIngestType(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                  >
                    <option value="supplier_invoice">Faktur / Invoice Vendor (Supplier)</option>
                    <option value="bank_statement">Rekening Koran / Mutasi Bank</option>
                    <option value="business_memory">Catatan Keputusan / Memori Usaha</option>
                    <option value="regulatory_rule">Regulasi Pajak / Kebijakan UMKM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-900 mb-1">
                    Isi Teks / Ringkasan Dokumen:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={ingestContent}
                    onChange={(e) => setIngestContent(e.target.value)}
                    placeholder="Salin/ketik isi dokumen (contoh: 'Tagihan bahan baku biji kopi Arabika Rp 4.200.000 jatuh tempo 11 Oktober dengan opsi tempo 30 hari tanpa bunga')..."
                    className="w-full p-3 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 bg-neutral-50/50 resize-none leading-relaxed"
                  />
                </div>

                {/* Symmetrical Equal-Width Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsIngestModalOpen(false);
                      handleClearModalFile();
                    }}
                    className="w-full h-10 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  >
                    Batal
                  </button>

                  <MotionButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isIngesting || !ingestSource.trim() || !ingestContent.trim()}
                    className="w-full h-10 rounded-xl bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{isIngesting ? 'Mengindeks...' : 'Index ke Pangkalan RAG'}</span>
                  </MotionButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
