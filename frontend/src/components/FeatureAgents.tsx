import React, { useEffect, useRef } from 'react';
import { Eye, Cpu, MessageSquare, CheckCircle2 } from 'lucide-react';
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14">
        {/* Handhold Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70">
            Autonomous Multi-Agent Architecture
          </span>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-[-0.03em] leading-tight">
            Pasang agen di setiap titik kritis usaha
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Tiga agen terspesialisasi yang bekerja secara terkoordinasi dan otonom untuk menjaga ketahanan kas Anda 24/7.
          </p>
        </div>

        {/* 3 Handhold-Style Cards Grid with GSAP Stagger & Rich Chromatic Persona */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent 1: Sensor Agent (Emerald/Mint Persona) */}
          <div className="h-full">
            <TiltCard max={6} glare={true} className="h-full">
              <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/30 via-white to-white p-7 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      Inbound Perception Agent
                    </span>
                    <h3 className="text-xl font-bold text-neutral-950 tracking-tight mt-2">
                      Sensor Agent
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Nol pencatatan manual. Mengonversi mutasi e-banking BCA, rekap QRIS, dan voice note WhatsApp menjadi model kas harian.
                  </p>
                  <div className="pt-3 border-t border-emerald-100/70 space-y-2 text-xs text-slate-700 font-normal">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Parser regex mutasi bank tanpa halusinasi</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Deteksi otomatis kebocoran uang dapur (*prive*)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Mengingat pola siklus omset bulanan</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Agent 2: Simulator Agent (Indigo/Cobalt Persona) */}
          <div className="h-full">
            <TiltCard max={6} glare={true} className="h-full">
              <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-b from-indigo-50/30 via-white to-white p-7 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-800 bg-indigo-100/70 px-2 py-0.5 rounded-md border border-indigo-200/60">
                      Simulation & Sandbox Agent
                    </span>
                    <h3 className="text-xl font-bold text-neutral-950 tracking-tight mt-2">
                      Simulator Agent
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Sandbox kontrafaktual. Menyimulasikan dampak belanja modal terhadap runway kas 30 hari dalam hitungan milidetik.
                  </p>
                  <div className="pt-3 border-t border-indigo-100/70 space-y-2 text-xs text-slate-700 font-normal">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>Kalkulasi murni Python tanpa LLM math</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>Deteksi benturan jadwal gaji & tempo</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>Pengujian skenario multi-horizon (14H / 30H)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Agent 3: Advisor Agent (Amber/Gold Persona) */}
          <div className="h-full">
            <TiltCard max={6} glare={true} className="h-full">
              <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/30 via-white to-white p-7 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md border border-amber-200/60">
                      Action & Negotiation Agent
                    </span>
                    <h3 className="text-xl font-bold text-neutral-950 tracking-tight mt-2">
                      Advisor Agent
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Kolektor bon santun dan negosiator tempo supplier dengan bahasa Indonesia beretika dan QRIS dinamis.
                  </p>
                  <div className="pt-3 border-t border-amber-100/70 space-y-2 text-xs text-slate-700 font-normal">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Draf WhatsApp penagihan piutang sopan</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Skema restrukturisasi DP 50% ke supplier</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Menjaga relasi bisnis tetap harmonis</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
