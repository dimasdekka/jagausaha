import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '../lib/ease';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reduce = useReducedMotion();

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
    <section className="py-20 sm:py-28 border-t border-neutral-100 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-medium text-neutral-500">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-[-0.03em] leading-tight">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal">
            Segala hal yang perlu Anda ketahui tentang arsitektur dan cara kerja JagaUsaha.
          </p>
        </div>

        <div className="divide-y divide-neutral-200/80 border-y border-neutral-200/80">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <span className="text-base font-medium text-neutral-900 group-hover:text-neutral-950 transition-colors">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    className="shrink-0 text-neutral-400 group-hover:text-neutral-900"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`faq-content-${idx}`}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
