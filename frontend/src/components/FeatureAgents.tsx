import React, { useEffect, useRef } from 'react';
import { Eye, Cpu, MessageSquare, Terminal, AlertTriangle, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltCard } from './motion/tilt-card';

gsap.registerPlugin(ScrollTrigger);

export const FeatureAgents: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="feature-agents"
      className="py-20 sm:py-28 border-t border-neutral-100 bg-[#FAFAFC] scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header: The Closed-Loop Autonomous Pipeline */}
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/70">
            Sistem Finansial Tertutup 24/7
          </span>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-[-0.03em] leading-tight">
            Dari mutasi mentah ke tindakan nyata
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Tiga agen otonom terintegrasi yang memastikan transaksi tercatat tanpa input manual, arus kas teruji secara matematis, dan piutang tertagih dengan santun.
          </p>
        </div>

        {/* 3 Concrete Architectural Cards Grid (No AI-Slop Checkmarks, Concrete Telemetry & UI Previews) */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01: Sensor Agent (Perception & Normalization) */}
          <div className="h-full">
            <TiltCard max={5} glare={true} className="h-full">
              <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-white p-6 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all h-full space-y-5">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                      <Eye className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                      TAHAP 01 / SENSOR
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-950 tracking-tight">
                      Sensor Agent
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Mengonversi mutasi e-banking BCA, rekap QRIS, dan voice note WhatsApp menjadi model kas harian terstruktur.
                    </p>
                  </div>

                  {/* Concrete UI Preview: Raw Stream -> Normalized Ledger */}
                  <div className="rounded-xl border border-neutral-200/80 bg-neutral-900 p-3 space-y-2 text-white">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 border-b border-neutral-800 pb-1 font-mono">
                      <span className="flex items-center gap-1">
                        <Terminal className="h-3 w-3 text-emerald-400" />
                        Inbound Parser
                      </span>
                      <span className="text-emerald-400">● Live (120ms)</span>
                    </div>

                    <div className="font-mono text-[10.5px] text-neutral-300 space-y-1">
                      <div className="text-neutral-400 truncate">
                        [BCA CR] 24/09 TRSF E-BANKING Rp 14.500.000
                      </div>
                      <div className="text-emerald-300 truncate">
                        [VOICE WA] "Beli susu 450rb tempo 2 minggu"
                      </div>
                    </div>

                    <div className="rounded-lg bg-neutral-800/90 p-2 text-[10.5px] border border-neutral-700/80 space-y-1">
                      <div className="text-neutral-300 flex items-center justify-between">
                        <span>Ledger Inflow:</span>
                        <strong className="text-emerald-400">+Rp 14.500.000</strong>
                      </div>
                      <div className="text-neutral-300 flex items-center justify-between">
                        <span>Komitmen H+14:</span>
                        <strong className="text-amber-400">-Rp 450.000</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Telemetry Footprint */}
                <div className="pt-2 border-t border-emerald-100 flex flex-wrap gap-1.5 text-[10px] font-semibold text-emerald-900">
                  <span className="bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">BCA & Mandiri Parser</span>
                  <span className="bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">Auto-Prive Split</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Card 02: Simulator Agent (Deterministic 30-Day Engine) */}
          <div className="h-full">
            <TiltCard max={5} glare={true} className="h-full">
              <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-b from-indigo-50/40 via-white to-white p-6 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all h-full space-y-5">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100/80 px-2 py-0.5 rounded-full border border-indigo-200">
                      TAHAP 02 / SIMULASI
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-950 tracking-tight">
                      Simulator Agent
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Mesin deterministik Python menguji belanja modal terhadap runway 30 hari dalam hitungan milidetik tanpa matematika LLM.
                    </p>
                  </div>

                  {/* Concrete UI Preview: Cash Runway Telemetry */}
                  <div className="rounded-xl border border-indigo-200/90 bg-indigo-50/40 p-3 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-950">
                      <span>Proyeksi Kas 30 Hari</span>
                      <span className="text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded text-[10px]">Safe-to-Spend</span>
                    </div>

                    <div className="p-2 rounded-lg bg-white border border-indigo-100 text-[11px] space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Duit Dingin Aman:</span>
                        <strong className="text-indigo-950">Rp 3.800.000</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Horizon Runway:</span>
                        <strong className="text-slate-900">26 Hari Operasional</strong>
                      </div>
                    </div>

                    {/* Early Clashing Alert Chip */}
                    <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-[10.5px] text-rose-800 flex items-start gap-1.5 leading-snug">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Deteksi Benturan H+6:</strong> Belanja Rp 14 Jt memicu kas minus saat gajian barista & tempo kopi.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Telemetry Footprint */}
                <div className="pt-2 border-t border-indigo-100 flex flex-wrap gap-1.5 text-[10px] font-semibold text-indigo-900">
                  <span className="bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md">Python Core DLMM</span>
                  <span className="bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md">0% Math Hallucination</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Card 03: Advisor Agent (Action & Negotiation Console) */}
          <div className="h-full">
            <TiltCard max={5} glare={true} className="h-full">
              <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/40 via-white to-white p-6 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all h-full space-y-5">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                      TAHAP 03 / EKSEKUSI
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-950 tracking-tight">
                      Advisor Agent
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Kolektor bon santun dan negosiator tempo supplier dengan bahasa Indonesia beretika dan tautan bayar QRIS dinamis.
                    </p>
                  </div>

                  {/* Concrete UI Preview: WhatsApp Negotiation Card */}
                  <div className="rounded-xl border border-amber-200/90 bg-amber-50/40 p-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-amber-950">
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Draf WhatsApp Supplier
                      </span>
                      <span className="text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded text-[10px]">DP 50%</span>
                    </div>

                    <div className="rounded-lg bg-white p-2.5 border border-amber-100 text-[10.5px] text-slate-700 leading-relaxed shadow-2xs">
                      "Selamat siang Toko Mesin Berkah... apakah bisa jika kami bayar <strong>DP 50% (Rp 7 Jt) hari ini</strong>, sisa tempo 30 hari? Terima kasih banyak 🙏"
                    </div>

                    <div className="flex items-center justify-between text-[10.5px] pt-0.5 text-amber-900 font-medium">
                      <span className="flex items-center gap-1 text-emerald-700">
                        <Send className="h-3 w-3" />
                        1-Klik Persetujuan Owner
                      </span>
                      <span className="text-slate-500">QRIS Terlampir</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry Footprint */}
                <div className="pt-2 border-t border-amber-100 flex flex-wrap gap-1.5 text-[10px] font-semibold text-amber-900">
                  <span className="bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">Bahasa Santun Adaptif</span>
                  <span className="bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">Human-in-the-Loop</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
