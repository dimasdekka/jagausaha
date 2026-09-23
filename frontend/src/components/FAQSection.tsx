import React from 'react';
import { BouncyAccordion } from './motion/bouncy-accordion';
import { HelpCircle, FileText, Shield, Sparkles, Lock } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      id: "faq-1",
      icon: <HelpCircle className="h-4 w-4 text-emerald-600" />,
      title: "Apakah JagaUsaha menggantikan software akuntansi seperti Mekari Jurnal atau Accurate?",
      description: "Tidak. Software akuntansi konvensional mencatat transaksi historis masa lalu untuk kepatuhan pembukuan dan pajak. JagaUsaha adalah sandbox simulasi masa depan yang menguji 'Apakah uang kas saya cukup?' sebelum Anda mengeksekusi pembelian atau komitmen baru."
    },
    {
      id: "faq-2",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: "Bagaimana cara JagaUsaha membaca data tanpa perlu input manual yang merepotkan?",
      description: "JagaUsaha beroperasi dari data yang sudah ada (exhaust data): cukup upload PDF mutasi rekening bank (BCA, Mandiri, BRI), tangkapan layar rekap harian QRIS, atau kirim voice note WhatsApp sederhana seperti 'Hari ini beli susu 450rb tempo 2 minggu'. Sensor Agent akan mengonversinya secara otomatis."
    },
    {
      id: "faq-3",
      icon: <Shield className="h-4 w-4 text-indigo-600" />,
      title: "Apakah aman mempercayakan perhitungan finansial pada kecerdasan buatan (AI)?",
      description: "Sangat aman. JagaUsaha menerapkan pemisahan ketat: seluruh kalkulasi penambahan saldo, runway, dan batas defisit kas dijalankan oleh mesin deterministik Python murni di CloudBaik VPS tanpa keterlibatan LLM (zero-hallucination math). AI hanya bertugas memahami bahasa dan menyusun draf komunikasi santun."
    },
    {
      id: "faq-4",
      icon: <Sparkles className="h-4 w-4 text-amber-600" />,
      title: "Bagaimana cara kerja perhitungan 'Duit Dingin' (Safe-to-Spend)?",
      description: "Duit Dingin adalah saldo bank aktif Anda dikurangi seluruh kewajiban tetap 14 hari ke depan (gaji karyawan, sewa, cicilan pinjaman, dan tempo bahan baku supplier), ditambah proyeksi piutang aman yang cair, dikurangi cadangan darurat minimum. Sisanya adalah uang unencumbered yang benar-benar aman dibelanjakan."
    },
    {
      id: "faq-5",
      icon: <Lock className="h-4 w-4 text-rose-600" />,
      title: "Apakah JagaUsaha bisa langsung mengeksekusi pemindahan uang dari rekening bank saya?",
      description: "Tidak pernah. Demi kepatuhan keamanan absolut (Responsible AI Framework), JagaUsaha berada pada Tier Rekomendasi Murni. Keputusan pengeluaran, transfer uang, atau persetujuan pinjaman 100% tetap berada di tangan pemilik usaha secara sadar."
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 border-t border-neutral-100 bg-neutral-50/50 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            Pertanyaan yang Sering Diajukan
          </span>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-[-0.03em] leading-tight">
            Transparansi Arsitektur & Keamanan
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal max-w-xl mx-auto">
            Pelajari bagaimana mesin deterministik Python dan agen otonom menjaga likuiditas bisnis Anda.
          </p>
        </div>

        <BouncyAccordion
          items={faqs}
          defaultValue="faq-1"
          collapsible={true}
        />
      </div>
    </section>
  );
};
