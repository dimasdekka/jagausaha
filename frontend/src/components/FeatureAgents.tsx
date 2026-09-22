import React, { useEffect, useRef } from 'react';
import { Eye, Cpu, MessageSquare } from 'lucide-react';
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
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              cardsRef.current!.children,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="feature-agents"
      className="py-20 sm:py-28 border-t border-neutral-100 bg-white scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14">
        {/* Handhold Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-medium text-neutral-500">
            Autonomous Multi-Agent Architecture
          </span>
          <h2 className="font-serif font-extralight text-4xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-[-0.03em] leading-tight">
            Pasang agen di setiap titik kritis usaha
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Tiga agen terspesialisasi yang bekerja secara terkoordinasi di CloudBaik VPS untuk menjaga ketahanan kas Anda 24/7.
          </p>
        </div>

        {/* 3 Handhold-Style Cards Grid with GSAP Stagger Wrappers & beUI TiltCard */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent 1: Sensor Agent */}
          <div className="h-full">
            <TiltCard max={6} glare={true} className="h-full">
              <div className="rounded-2xl border border-neutral-200/90 bg-[#FBFBFC] p-7 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all h-full">
                <div className="space-y-4">
                  <div className="h-9 w-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-neutral-500">
                      Inbound Perception Agent
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-950 tracking-tight mt-1">
                      Sensor Agent
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Nol pencatatan manual. Mengonversi mutasi e-banking BCA, rekap QRIS, dan voice note WhatsApp menjadi model kas harian.
                  </p>
                  <div className="pt-3 border-t border-neutral-200/80 space-y-2 text-xs text-neutral-600 font-normal">
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
                      <span>Parser regex mutasi bank tanpa halusinasi</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
                      <span>Deteksi otomatis kebocoran uang dapur (*prive*)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
                      <span>Mengingat pola siklus omset bulanan</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Agent 2: Simulator Agent */}
          <div className="h-full">
            <TiltCard max={6} glare={true} className="h-full">
              <div className="rounded-2xl border border-neutral-200/90 bg-[#FBFBFC] p-7 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all h-full">
                <div className="space-y-4">
                  <div className="h-9 w-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-neutral-500">
                      Simulation & Sandbox Agent
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-950 tracking-tight mt-1">
                      Simulator Agent
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Sandbox kontrafaktual. Menyimulasikan dampak belanja modal terhadap runway kas 30 hari dalam hitungan milidetik.
                  </p>
                  <div className="pt-3 border-t border-neutral-200/80 space-y-2 text-xs text-neutral-600 font-normal">
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
                      <span>Kalkulasi murni Python tanpa LLM math</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
                      <span>Deteksi benturan jadwal gaji & tempo</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
                      <span>Pengujian skenario multi-horizon (14H / 30H)</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Agent 3: Advisor Agent */}
          <div className="h-full">
            <TiltCard max={6} glare={true} className="h-full">
              <div className="rounded-2xl border border-neutral-200/90 bg-[#FBFBFC] p-7 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all h-full">
                <div className="space-y-4">
                  <div className="h-9 w-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-neutral-500">
                      Action & Negotiation Agent
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-950 tracking-tight mt-1">
                      Advisor Agent
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Kolektor bon santun dan negosiator tempo supplier dengan bahasa Indonesia beretika dan QRIS dinamis.
                  </p>
                  <div className="pt-3 border-t border-neutral-200/80 space-y-2 text-xs text-neutral-600 font-normal">
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
                      <span>Draf WhatsApp penagihan piutang sopan</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
                      <span>Skema restrukturisasi DP 50% ke supplier</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">✓</span>
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
