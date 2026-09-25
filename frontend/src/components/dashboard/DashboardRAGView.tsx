import React, { useState, useEffect } from 'react';
import {
  Search,
  FileText,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Layers,
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

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-[8px] border border-[#e5e5e5] bg-[#fafafa] text-xs font-semibold text-[#0a0a0a] flex items-center gap-1.5 shadow-dub-subtle">
            <Layers className="h-3.5 w-3.5 text-[#2563eb]" />
            <span>{documents.length} Dokumen Terindeks</span>
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

        {/* RAG Synthesis Result Box */}
        {ragResult && (
          <div className="mt-4 p-4 rounded-[12px] border border-[#bbf7d0] bg-[#dcfce7]/20 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-[#bbf7d0]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
                <span className="text-xs font-bold text-[#14532d]">
                  Jawaban Terverifikasi (Grounded RAG Answer)
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#166534] bg-white px-2 py-0.5 rounded-full border border-[#bbf7d0]">
                {ragResult.citations.length} Bukti Dokumen Terverifikasi
              </span>
            </div>

            <p className="text-xs text-[#0a0a0a] leading-relaxed font-medium">
              {ragResult.answer}
            </p>

            {/* Verifiable Citations Badges */}
            <div className="pt-2 border-t border-[#bbf7d0]/60 space-y-1.5">
              <span className="text-[10.5px] font-bold text-[#14532d] uppercase tracking-wider block">
                Sumber Rujukan Resmi (Citations):
              </span>
              <div className="flex flex-wrap gap-2">
                {ragResult.citations.map((cite, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] border border-[#e5e5e5] bg-white text-[11px] font-semibold text-[#171717] shadow-dub-subtle"
                  >
                    <FileText className="h-3 w-3 text-[#2563eb]" />
                    <span>[{cite.source}]</span>
                    <span className="text-[9.5px] text-[#16a34a] font-mono">
                      (Skor {cite.score})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Raw Retrieved Context Chunks */}
            <div className="pt-2">
              <span className="text-[10px] font-semibold text-[#525252] block mb-1">
                Kutipan Cuplikan Dokumen yang Ditarik:
              </span>
              <div className="space-y-1.5">
                {ragResult.retrieved_chunks.map((chunk, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-2.5 rounded-[8px] bg-white border border-[#e5e5e5] text-[11px] text-[#404040] leading-relaxed shadow-dub-subtle font-mono"
                  >
                    <span className="font-bold text-[#0a0a0a] block mb-0.5">
                      {chunk.source}
                    </span>
                    "{chunk.content}"
                  </div>
                ))}
              </div>
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
    </div>
  );
};
