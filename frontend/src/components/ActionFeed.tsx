import React, { useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare, AlertCircle, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedBadge } from './motion/animated-badge';
import { MotionButton } from './motion/button';
import { TiltCard } from './motion/tilt-card';

gsap.registerPlugin(ScrollTrigger);

interface ActionFeedProps {
  onOpenNudge: (debtor: string, amount: number) => void;
  onOpenNegotiate: () => void;
  onOpenAuditPrive?: () => void;
}

export const ActionFeed: React.FC<ActionFeedProps> = ({
  onOpenNudge,
  onOpenNegotiate,
  onOpenAuditPrive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/80 pb-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            Proactive Decision Guard
          </span>
          <h3 className="font-serif font-extralight text-3xl sm:text-4xl text-neutral-950 tracking-[-0.02em] mt-2">
            Tindakan Taktis Terjadwal
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          3 Intervensi Kas Butuh Keputusan
        </span>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Kolektor Bon Santun */}
        <TiltCard max={5} glare={true} className="h-full">
          <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/20 via-white to-white p-6 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all h-full space-y-4">
            <div className="space-y-3">
              {/* Header: Short Badge & Clear Amount */}
              <div className="flex items-center justify-between gap-2">
                <AnimatedBadge status="warning" size="sm">
                  Piutang H+16
                </AnimatedBadge>
                <span className="text-xs font-bold text-neutral-950 tabular-nums whitespace-nowrap">
                  Rp 5.000.000
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-neutral-900 tracking-tight">
                  Katering Kantor Pemda (Pak Budi)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                  Arus kas butuh percepatan sebelum jadwal gajian barista di H+6. Kirim pengingat santun dengan tautan bayar QRIS langsung.
                </p>
              </div>

              {/* Informative Callout Box (Full Width, No Truncation) */}
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed flex items-center gap-1.5 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>Potensi percepatan likuiditas: +Rp 5 Jt</span>
              </div>
            </div>

            {/* Action CTA */}
            <MotionButton
              variant="primary"
              size="md"
              onClick={() => onOpenNudge('Pak Budi (Pemda)', 5000000)}
              className="w-full h-10 rounded-xl gap-2 text-xs font-semibold"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>Kirim WhatsApp Koleksi Santun</span>
            </MotionButton>
          </div>
        </TiltCard>

        {/* Card 2: Restrukturisasi Tempo Supplier */}
        <TiltCard max={5} glare={true} className="h-full">
          <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-b from-blue-50/20 via-white to-white p-6 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all h-full space-y-4">
            <div className="space-y-3">
              {/* Header: Short Badge & Clear Amount */}
              <div className="flex items-center justify-between gap-2">
                <AnimatedBadge status="info" size="sm">
                  Tempo H+11
                </AnimatedBadge>
                <span className="text-xs font-bold text-neutral-950 tabular-nums whitespace-nowrap">
                  Rp 4.200.000
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-neutral-900 tracking-tight">
                  Toko Berkah (Biji Kopi Arabika)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                  Jatuh tempo 5 hari setelah gaji karyawan. Tawarkan skema cicil DP 50% + sisa tempo 30 hari untuk menjaga stabilitas kas.
                </p>
              </div>

              {/* Informative Callout Box (Full Width, No Truncation) */}
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 text-[11px] text-blue-900 leading-relaxed flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>Penghematan kas keluar awal: Rp 2.100.000</span>
              </div>
            </div>

            {/* Action CTA */}
            <MotionButton
              variant="outline"
              size="md"
              onClick={onOpenNegotiate}
              className="w-full h-10 rounded-xl gap-2 text-xs font-semibold border-neutral-300 hover:bg-neutral-100"
            >
              <span>Draf Negosiasi Tempo (DP 50%)</span>
              <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
            </MotionButton>
          </div>
        </TiltCard>

        {/* Card 3: Kebocoran Uang Dapur (Prive) - Redesigned, No Clipping, Full Width Multi-line */}
        <TiltCard max={5} glare={true} className="h-full">
          <div className="rounded-2xl border border-rose-200/90 bg-gradient-to-b from-rose-50/20 via-white to-white p-6 shadow-sm flex flex-col justify-between hover:border-rose-300 transition-all h-full space-y-4">
            <div className="space-y-3">
              {/* Header: Clean Short Badge & Properly Formatted Amount */}
              <div className="flex items-center justify-between gap-2">
                <AnimatedBadge status="danger" size="sm" pulse={true}>
                  Prive Bocor
                </AnimatedBadge>
                <div className="text-right">
                  <span className="text-xs font-bold text-rose-600 tabular-nums whitespace-nowrap block">
                    Rp 1.850.000
                  </span>
                  <span className="text-[10px] font-semibold text-rose-500 block -mt-0.5">
                    /bulan
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-neutral-900 tracking-tight">
                  Prive Pribadi di Rekening Bisnis
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">
                  Terdeteksi 9 transaksi debet non-operasional (e-wallet, belanja dapur, SPP) bercampur di rekening operasional BCA.
                </p>
              </div>

              {/* Informative Callout Box (Full Width, Multi-line, NO TRUNCATION) */}
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 text-[11px] text-rose-800 leading-relaxed flex items-start gap-1.5 font-medium">
                <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  Penarikan pribadi melebihi batas 10% laba operasional bersih.
                </span>
              </div>
            </div>

            {/* Consistent Action CTA matching Cards 1 & 2 */}
            <MotionButton
              variant="outline"
              size="md"
              onClick={
                onOpenAuditPrive ||
                (() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('jagausaha-toast', {
                        detail: {
                          title: 'Audit Prive Terjadwal',
                          description: 'Aturan pemisahan rekening pribadi & operasional BCA telah diaktifkan.',
                          status: 'info',
                        },
                      })
                    );
                  }
                })
              }
              className="w-full h-10 rounded-xl gap-2 text-xs font-semibold border-rose-200 text-rose-900 hover:bg-rose-50"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
              <span>Audit & Pisahkan Rekening</span>
            </MotionButton>
          </div>
        </TiltCard>
      </div>
    </div>
  );
};
