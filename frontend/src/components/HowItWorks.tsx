import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Input } from './motion/input';

gsap.registerPlugin(ScrollTrigger);

interface HowItWorksProps {
  onSimulateCustom: (amount: number) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onSimulateCustom }) => {
  const [customNominal, setCustomNominal] = useState('10.000.000');
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const simCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (stepsRef.current) {
        ScrollTrigger.create({
          trigger: stepsRef.current,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              stepsRef.current!.children,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                clearProps: 'all',
              }
            );
          },
        });
      }

      if (simCardRef.current) {
        ScrollTrigger.create({
          trigger: simCardRef.current,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              simCardRef.current!,
              { y: 24, opacity: 0, scale: 0.98 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
                clearProps: 'all',
              }
            );
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cleanNum = parseFloat(customNominal.replace(/[^0-9]/g, ''));
  const isValid = !isNaN(cleanNum) && cleanNum > 0;

  const handleNominalChange = (val: string) => {
    const raw = val.replace(/[^0-9]/g, '');
    if (!raw) {
      setCustomNominal('');
      return;
    }
    const num = parseInt(raw, 10);
    setCustomNominal(num.toLocaleString('id-ID'));
    if (errorMsg) setErrorMsg(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMsg('Masukkan nominal valid lebih dari Rp 0');
      return;
    }
    setErrorMsg(undefined);
    onSimulateCustom(cleanNum);
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 sm:py-28 border-t border-neutral-100 bg-neutral-50/50 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Step-by-Step Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-medium text-neutral-500">
            Get started in minutes
          </span>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-[-0.03em] leading-tight">
            Mulai dalam hitungan menit
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal">
            Tanpa perlu keahlian akuntansi atau konfigurasi software pembukuan yang rumit.
          </p>
        </div>

        {/* 3 Step Cards with GSAP Stagger */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-sm space-y-3">
            <span className="text-3xl font-extralight font-serif text-neutral-400">1.</span>
            <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
              Kirim Rekap Transaksi
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Upload file mutasi PDF KlikBCA/Mandiri atau kirim voice note pengeluaran ke bot WhatsApp JagaUsaha.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-sm space-y-3">
            <span className="text-3xl font-extralight font-serif text-neutral-400">2.</span>
            <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
              Hitung "Duit Dingin"
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Algoritma DLMM otomatis memisahkan saldo bank Anda dari komitmen gaji dan tempo supplier 14 hari ke depan.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-sm space-y-3">
            <span className="text-3xl font-extralight font-serif text-neutral-400">3.</span>
            <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
              Simulasi Sebelum Belanja
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Ketik atau ucapkan rencana belanja modal untuk melihat apakah uang kas Anda aman hingga hari gajian berikutnya.
            </p>
          </div>
        </div>

        {/* Custom Spend Simulator Input Box */}
        <div
          ref={simCardRef}
          className="rounded-3xl border border-neutral-200/90 bg-white p-8 sm:p-10 shadow-sm text-center space-y-6 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 text-xs font-medium text-neutral-700 border border-neutral-200/60">
            <Zap className="h-3.5 w-3.5 text-neutral-900" />
            <span>Simulasi Instan Bisnis Anda</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-extralight text-3xl sm:text-4xl text-neutral-950 tracking-[-0.02em]">
              Punya rencana belanja berapa minggu ini?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              Masukkan nominal rencana belanja untuk melihat proyeksi dampaknya terhadap arus kas usaha Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 max-w-md mx-auto w-full">
            <div className="flex-1 w-full">
              <Input
                type="text"
                value={customNominal}
                onChange={handleNominalChange}
                placeholder="10.000.000"
                leftIcon={<span className="text-xs font-semibold text-neutral-400">Rp</span>}
                error={errorMsg}
                success={isValid && !errorMsg}
                reserveErrorLine
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-6 h-11 text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95 mb-4 sm:mb-0 cursor-pointer"
            >
              <span>Uji Simulasi</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* 3 Value Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Real-Time di CloudBaik VPS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Bahasa Indonesia Beretika</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>100% Data Anda Aman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
