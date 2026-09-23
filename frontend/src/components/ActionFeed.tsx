import React, { useEffect, useRef } from 'react';
import { ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedBadge } from './motion/animated-badge';
import { MotionButton } from './motion/button';
import { TiltCard } from './motion/tilt-card';

gsap.registerPlugin(ScrollTrigger);

interface ActionFeedProps {
  onOpenNudge: (debtor: string, amount: number) => void;
  onOpenNegotiate: () => void;
}

export const ActionFeed: React.FC<ActionFeedProps> = ({ onOpenNudge, onOpenNegotiate }) => {
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-100 pb-4">
        <div>
          <span className="text-xs font-medium text-neutral-500">
            Proactive Decision Guard
          </span>
          <h3 className="font-serif font-extralight text-3xl sm:text-4xl text-neutral-950 tracking-[-0.02em] mt-1">
            Tindakan Taktis Terjadwal
          </h3>
        </div>
        <span className="text-xs text-neutral-500">
          3 Tindakan Perlu Perhatian
        </span>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Kolektor Bon Santun */}
        <TiltCard max={6} glare={true}>
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <AnimatedBadge status="warning" size="sm">
                  Piutang Cair H+16
                </AnimatedBadge>
                <span className="text-xs font-semibold text-neutral-950 tabular-nums">Rp 5.000.000</span>
              </div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
                Katering Kantor Pemda (Pak Budi)
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Arus kas butuh percepatan sebelum gajian 3 barista di H+6. Kirim pengingat santun ber-QRIS langsung.
              </p>
            </div>
            <MotionButton
              variant="primary"
              size="md"
              onClick={() => onOpenNudge('Pak Budi (Pemda)', 5000000)}
              className="mt-5 w-full h-10"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>Kirim WhatsApp Koleksi Santun</span>
            </MotionButton>
          </div>
        </TiltCard>

        {/* Card 2: Restrukturisasi Tempo Supplier */}
        <TiltCard max={6} glare={true}>
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <AnimatedBadge status="info" size="sm">
                  Tempo Supplier H+11
                </AnimatedBadge>
                <span className="text-xs font-semibold text-neutral-950 tabular-nums">Rp 4.200.000</span>
              </div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
                Toko Berkah (Biji Kopi Arabika)
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Jatuh tempo 5 hari setelah gaji karyawan. Siapkan penawaran cicil DP 50% + tempo 30 hari untuk menjaga likuiditas.
              </p>
            </div>
            <MotionButton
              variant="outline"
              size="md"
              onClick={onOpenNegotiate}
              className="mt-5 w-full h-10 border-neutral-200"
            >
              <span>Draf Negosiasi Tempo (DP 50%)</span>
              <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
            </MotionButton>
          </div>
        </TiltCard>

        {/* Card 3: Kebocoran Uang Dapur */}
        <TiltCard max={6} glare={true}>
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <AnimatedBadge status="danger" size="sm" pulse={true}>
                  Bocor Halus Terdeteksi
                </AnimatedBadge>
                <span className="text-xs font-semibold text-rose-600 tabular-nums">Rp 1.850.000/bln</span>
              </div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
                Prive Pribadi di Rekening Bisnis
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Terdeteksi 9 transaksi debet non-operasional (Indomaret, SPK Sekolah, E-Wallet) dari rekening usaha BCA.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-600" />
              <span className="truncate">Penarikan prive melebihi 10% laba operasional</span>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
};
