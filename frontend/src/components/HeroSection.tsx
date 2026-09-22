import React from 'react';
import {
  Play,
  Building2,
  Wallet,
  CreditCard,
  QrCode,
  Zap,
  MessageSquare,
  Server,
  Cpu,
} from 'lucide-react';
import { ExpandingArrowButton } from './motion/expanding-arrow-button';
import { MotionButton } from './motion/button';
import { Marquee } from './motion/marquee';

interface HeroSectionProps {
  onScrollToDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToDemo }) => {
  const ecosystemPartners = [
    {
      name: "Bank Central Asia (BCA)",
      desc: "Mutasi e-Banking & Giro Usaha",
      icon: <Building2 className="h-4 w-4 text-neutral-800" />,
    },
    {
      name: "Bank Mandiri",
      desc: "Sinkronisasi Rekening Livin & MCM",
      icon: <Wallet className="h-4 w-4 text-neutral-800" />,
    },
    {
      name: "Bank BRI",
      desc: "Rekap Mutasi Transaksi BRImo",
      icon: <CreditCard className="h-4 w-4 text-neutral-800" />,
    },
    {
      name: "QRIS Standar Nasional",
      desc: "Generasi QR Pembayaran Dinamis",
      icon: <QrCode className="h-4 w-4 text-neutral-800" />,
    },
    {
      name: "BI-FAST Bank Indonesia",
      desc: "Kliring Arus Kas Real-Time",
      icon: <Zap className="h-4 w-4 text-neutral-800" />,
    },
    {
      name: "WhatsApp Business API",
      desc: "Draf Negosiasi & Bon Santun",
      icon: <MessageSquare className="h-4 w-4 text-neutral-800" />,
    },
    {
      name: "IDwebhost CloudBaik",
      desc: "Hosting Dedicated VPS Terisolasi",
      icon: <Server className="h-4 w-4 text-neutral-800" />,
    },
    {
      name: "Hermes Agent Framework",
      desc: "Kalkulasi Deterministik Python",
      icon: <Cpu className="h-4 w-4 text-neutral-800" />,
    },
  ];

  return (
    <section className="relative w-full pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7">
        {/* Headline */}
        <h1 className="font-serif font-extralight text-5xl sm:text-7xl lg:text-[80px] leading-[1.04] tracking-[-0.03em] text-neutral-950 max-w-3xl mx-auto text-balance">
          Ketahui <span className="italic font-normal">keamanan arus kas</span> sebelum uang keluar
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal text-balance">
          Simulasikan dampak keputusan belanja modal terhadap jadwal gaji dan tempo supplier hingga 30 hari ke depan secara deterministik.
        </p>

        {/* beUI Expanding CTA & Secondary Button */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <ExpandingArrowButton
            onClick={onScrollToDemo}
            className="h-12 min-w-60 shadow-md"
          >
            Mulai Uji Coba Gratis
          </ExpandingArrowButton>

          <MotionButton
            variant="outline"
            size="lg"
            onClick={onScrollToDemo}
            className="h-12 border-neutral-300"
          >
            <Play className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
            <span>Lihat Demo Interaktif</span>
          </MotionButton>
        </div>

        {/* Handhold-Style Metrics Display */}
        <div className="pt-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-neutral-100 pt-8">
            <div className="text-center sm:text-left space-y-1">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums">
                14 Hari
              </div>
              <div className="text-xs text-neutral-500 leading-normal font-normal">
                Deteksi dini defisit kas sebelum jatuh tempo
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums">
                100%
              </div>
              <div className="text-xs text-neutral-500 leading-normal font-normal">
                Kalkulasi matematis deterministik tanpa halusinasi
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 tabular-nums">
                0 Beban
              </div>
              <div className="text-xs text-neutral-500 leading-normal font-normal">
                Ekstraksi otomatis dari mutasi bank & audio
              </div>
            </div>
          </div>
        </div>

        {/* High-End Fintech Ecosystem Integration Strip */}
        <div className="pt-10 max-w-4xl mx-auto border-t border-neutral-100">
          <div className="text-xs font-medium text-neutral-500 mb-4 tracking-normal">
            Kompatibel dengan perbankan & sistem pembayaran resmi Indonesia
          </div>
          <Marquee speed={28} gap="1.5rem" className="py-2" fade={true}>
            {ecosystemPartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-all text-left group"
              >
                <div className="h-7 w-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200/60 group-hover:bg-neutral-200/60 transition-colors">
                  {partner.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-neutral-900 tracking-tight whitespace-nowrap">
                    {partner.name}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-normal whitespace-nowrap">
                    {partner.desc}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
