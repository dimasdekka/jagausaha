import React from 'react';
import { Eye, Cpu, MessageSquare } from 'lucide-react';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const FeatureAgents: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-neutral-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
            Deploy agents across your business
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-950">
            Pasang agen di setiap titik kritis usaha
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Tiga agen otonom yang bekerja bersamaan di CloudBaik VPS untuk menjaga likuiditas usaha Anda 24/7.
          </p>
        </div>

        {/* 3 Agent Cards Grid with ReactBits SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent 1: Sensor Agent */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="border-neutral-200 bg-[#FBFBFC]"
          >
            <div className="space-y-4">
              <div className="h-9 w-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  Inbound Perception Agent
                </span>
                <h3 className="text-lg font-semibold text-neutral-950 tracking-tight mt-1">
                  Sensor Agent
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Nol pencatatan manual. Mengubah data mutasi rekening dan voice note menjadi model kas harian.
              </p>
              <div className="pt-3 border-t border-neutral-200/80 space-y-2 text-xs text-neutral-600 font-normal">
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Ingesti mutasi BCA, QRIS, & nota kertas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Deteksi otomatis uang dapur (*prive*)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Mengingat pola musiman omset gajian</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Agent 2: Simulator Agent */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.12)"
            className="border-neutral-200 bg-[#FBFBFC]"
          >
            <div className="space-y-4">
              <div className="h-9 w-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  Simulation & Sandbox Agent
                </span>
                <h3 className="text-lg font-semibold text-neutral-950 tracking-tight mt-1">
                  Simulator Agent
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Sandbox kontrafaktual. Menyimulasikan dampak belanja modal sebelum uang keluar dari bank.
              </p>
              <div className="pt-3 border-t border-neutral-200/80 space-y-2 text-xs text-neutral-600 font-normal">
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Proyeksi saldo kas 30 hari dalam milidetik</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Deteksi tabrakan jadwal gaji & tempo</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Kalkulasi matematis cadangan kas aman</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Agent 3: Advisor Agent */}
          <SpotlightCard
            spotlightColor="rgba(6, 182, 212, 0.12)"
            className="border-neutral-200 bg-[#FBFBFC]"
          >
            <div className="space-y-4">
              <div className="h-9 w-9 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  Negotiation & Action Agent
                </span>
                <h3 className="text-lg font-semibold text-neutral-950 tracking-tight mt-1">
                  Advisor Agent
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Kolektor bon santun & negosiator tempo dengan etika komunikasi bisnis Indonesia.
              </p>
              <div className="pt-3 border-t border-neutral-200/80 space-y-2 text-xs text-neutral-600 font-normal">
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Draf WhatsApp penagihan piutang ber-QRIS</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Draf negosiasi tempo DP 50% ke supplier</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold">✓</span>
                  <span>Percepat arus kas tanpa merusak relasi</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
