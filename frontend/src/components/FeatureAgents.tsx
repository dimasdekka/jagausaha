import React from 'react';
import { Eye, Cpu, MessageSquare } from 'lucide-react';

export const FeatureAgents: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo font-mono">
            Arsitektur Agen Terkoordinasi
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-navy-900">
            Tiga agen otonom untuk menjaga setiap titik kritis usaha
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            Bekerja secara terisolasi dan deterministik di IDwebhost CloudBaik VPS untuk memastikan akurasi finansial 100%.
          </p>
        </div>

        {/* 3 Stripe-Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent 1: Sensor Agent */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-stripe-card flex flex-col justify-between hover:shadow-stripe hover:border-slate-300 transition-all">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  Perception & Ingestion
                </span>
                <h3 className="text-lg font-bold text-navy-900 tracking-tight mt-1">
                  Sensor Agent
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Nol pencatatan manual. Mengonversi mutasi e-banking BCA, rekap QRIS, dan voice note WhatsApp menjadi model kas harian.
              </p>
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Parser regex mutasi bank tanpa halusinasi</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Deteksi otomatis kebocoran uang dapur (*prive*)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Mengingat pola siklus omset bulanan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agent 2: Simulator Agent */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-stripe-card flex flex-col justify-between hover:shadow-stripe hover:border-slate-300 transition-all">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-brand-indigo flex items-center justify-center font-bold">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-brand-indigo uppercase tracking-wider">
                  Deterministic Math Core
                </span>
                <h3 className="text-lg font-bold text-navy-900 tracking-tight mt-1">
                  Simulator Agent
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sandbox kontrafaktual. Menyimulasikan dampak belanja modal terhadap runway kas 30 hari dalam hitungan milidetik.
              </p>
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-2">
                  <span className="text-brand-indigo font-bold">✓</span>
                  <span>Kalkulasi murni Python tanpa LLM math</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-brand-indigo font-bold">✓</span>
                  <span>Deteksi benturan jadwal gaji & tempo</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-brand-indigo font-bold">✓</span>
                  <span>Pengujian skenario multi-horizon (14H / 30H)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agent 3: Advisor Agent */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7 shadow-stripe-card flex flex-col justify-between hover:shadow-stripe hover:border-slate-300 transition-all">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-teal-800 uppercase tracking-wider">
                  Action & Negotiation
                </span>
                <h3 className="text-lg font-bold text-navy-900 tracking-tight mt-1">
                  Advisor Agent
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Kolektor bon santun dan negosiator tempo supplier dengan bahasa Indonesia beretika dan QRIS dinamis.
              </p>
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-2">
                  <span className="text-teal-800 font-bold">✓</span>
                  <span>Draf WhatsApp penagihan piutang sopan</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal-800 font-bold">✓</span>
                  <span>Skema restrukturisasi DP 50% ke supplier</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal-800 font-bold">✓</span>
                  <span>Menjaga relasi bisnis tetap harmonis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
