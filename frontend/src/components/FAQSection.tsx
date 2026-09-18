import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apakah JagaUsaha menggantikan software akuntansi seperti Mekari atau Accurate?",
      a: "Tidak. Software akuntansi konvensional mencatat transaksi masa lalu untuk keperluan pembukuan dan pajak. JagaUsaha adalah sandbox simulasi masa depan yang menguji 'Apakah uang kas saya cukup?' sebelum Anda mengeksekusi pembelian atau keputusan bisnis."
    },
    {
      q: "Bagaimana cara JagaUsaha membaca data tanpa perlu input manual yang merepotkan?",
      a: "JagaUsaha beroperasi dari data yang sudah ada (exhaust data): cukup upload PDF mutasi rekening bank (BCA, Mandiri, BRI), tangkapan layar rekap harian QRIS, atau kirim voice note WhatsApp sederhana seperti 'Hari ini beli susu 450rb tempo 2 minggu'. Sensor Agent akan mengonversinya otomatis."
    },
    {
      q: "Apakah aman mempercayakan perhitungan finansial pada kecerdasan buatan (AI)?",
      a: "Sangat aman. JagaUsaha menerapkan pemisahan ketat: seluruh kalkulasi penambahan saldo, runway, dan batas defisit kas dijalankan oleh mesin deterministik Python murni di CloudBaik VPS tanpa keterlibatan LLM (zero-hallucination math). AI hanya bertugas memahami bahasa dan menyusun draf komunikasi santun."
    },
    {
      q: "Bagaimana cara kerja perhitungan 'Duit Dingin' (Safe-to-Spend)?",
      a: "Duit Dingin adalah saldo bank aktif Anda dikurangi seluruh kewajiban tetap 14 hari ke depan (gaji karyawan, sewa, cicilan pinjaman, dan tempo bahan baku supplier), ditambah proyeksi piutang aman yang cair, dikurangi cadangan darurat minimum. Sisanya adalah uang unencumbered yang benar-benar aman dibelanjakan."
    },
    {
      q: "Apakah JagaUsaha bisa langsung mengeksekusi transfer uang dari rekening saya?",
      a: "Tidak pernah. Demi keamanan absolut (Responsible AI Framework), JagaUsaha berada pada Tier Rekomendasi Murni. Keputusan pengeluaran, transfer uang, atau persetujuan pinjaman 100% tetap berada di tangan pemilik usaha secara sadar."
    }
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-neutral-200/80 bg-neutral-50/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-600">
            Tanya Jawab
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-neutral-950">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Segala hal yang perlu Anda ketahui tentang arsitektur dan cara kerja JagaUsaha.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-base font-medium text-neutral-900 group-hover:text-neutral-950 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed pr-8 animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
