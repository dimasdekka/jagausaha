import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apakah JagaUsaha menggantikan software akuntansi seperti Mekari Jurnal atau Accurate?",
      a: "Tidak. Software akuntansi konvensional mencatat transaksi historis masa lalu untuk kepatuhan pembukuan dan pajak. JagaUsaha adalah sandbox simulasi masa depan yang menguji 'Apakah uang kas saya cukup?' sebelum Anda mengeksekusi pembelian atau komitmen baru."
    },
    {
      q: "Bagaimana cara JagaUsaha membaca data tanpa perlu input manual yang merepotkan?",
      a: "JagaUsaha beroperasi dari data yang sudah ada (exhaust data): cukup upload PDF mutasi rekening bank (BCA, Mandiri, BRI), tangkapan layar rekap harian QRIS, atau kirim voice note WhatsApp sederhana seperti 'Hari ini beli susu 450rb tempo 2 minggu'. Sensor Agent akan mengonversinya secara otomatis."
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
      q: "Apakah JagaUsaha bisa langsung mengeksekusi pemindahan uang dari rekening bank saya?",
      a: "Tidak pernah. Demi kepatuhan keamanan absolut (Responsible AI Framework), JagaUsaha berada pada Tier Rekomendasi Murni. Keputusan pengeluaran, transfer uang, atau persetujuan pinjaman 100% tetap berada di tangan pemilik usaha secara sadar."
    }
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-slate-200 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo font-mono">
            Tanya Jawab Teknis
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-navy-900">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="text-sm sm:text-base text-slate-700">
            Segala hal yang perlu Anda ketahui tentang arsitektur dan cara kerja JagaUsaha.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-base font-bold text-navy-900 group-hover:text-brand-indigo transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-indigo' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed pr-8 animate-in fade-in duration-150">
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
