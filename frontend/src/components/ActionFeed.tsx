import React from 'react';
import { ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';

interface ActionFeedProps {
  onOpenNudge: (debtor: string, amount: number) => void;
  onOpenNegotiate: () => void;
}

export const ActionFeed: React.FC<ActionFeedProps> = ({ onOpenNudge, onOpenNegotiate }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-navy-900 tracking-tight">
            Tindakan Taktis Terjadwal
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rekomendasi tindakan proaktif untuk mengamankan arus kas sebelum jatuh tempo.
          </p>
        </div>
        <span className="text-xs text-slate-500 font-mono font-medium">
          3 Tindakan Perlu Perhatian
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Kolektor Bon Santun */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-stripe-card flex flex-col justify-between hover:shadow-stripe hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Piutang Cair H+16
              </span>
              <span className="text-xs font-bold text-navy-950 font-mono">Rp 5.000.000</span>
            </div>
            <h4 className="text-sm font-bold text-navy-900 mb-1.5 tracking-tight">
              Katering Kantor Pemda (Pak Budi)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Arus kas butuh percepatan sebelum gajian 3 barista di H+6. Kirim pengingat santun dengan QRIS dinamis.
            </p>
          </div>
          <button
            onClick={() => onOpenNudge('Pak Budi (Pemda)', 5000000)}
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-brand-indigo hover:bg-brand-violet text-white py-2.5 text-xs font-bold transition-all shadow-stripe-card active:scale-95"
          >
            <MessageSquare className="h-3.5 w-3.5 text-brand-teal" />
            <span>Kirim WhatsApp Koleksi Santun</span>
          </button>
        </div>

        {/* Card 2: Restrukturisasi Tempo Supplier */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-stripe-card flex flex-col justify-between hover:shadow-stripe hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Tempo Supplier H+11
              </span>
              <span className="text-xs font-bold text-navy-950 font-mono">Rp 4.200.000</span>
            </div>
            <h4 className="text-sm font-bold text-navy-900 mb-1.5 tracking-tight">
              Toko Berkah (Biji Kopi Arabika)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jatuh tempo 5 hari setelah gaji karyawan. Siapkan penawaran cicil DP 50% + tempo 30 hari untuk menjaga likuiditas.
            </p>
          </div>
          <button
            onClick={onOpenNegotiate}
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-navy-900 py-2.5 text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <span>Draf Negosiasi Tempo (DP 50%)</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
          </button>
        </div>

        {/* Card 3: Kebocoran Uang Dapur */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-stripe-card flex flex-col justify-between hover:shadow-stripe hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-brand-crimson border border-rose-200">
                Bocor Halus Terdeteksi
              </span>
              <span className="text-xs font-bold text-brand-crimson font-mono">Rp 1.850.000/bln</span>
            </div>
            <h4 className="text-sm font-bold text-navy-900 mb-1.5 tracking-tight">
              Prive Pribadi di Rekening Bisnis
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Terdeteksi 9 transaksi debet non-operasional (Indomaret, SPK Sekolah, E-Wallet) dari rekening usaha BCA.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-rose-50/80 border border-rose-200 text-xs font-semibold text-rose-900">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-brand-crimson" />
            <span className="truncate">Penarikan prive melebihi 10% laba operasional</span>
          </div>
        </div>
      </div>
    </div>
  );
};
