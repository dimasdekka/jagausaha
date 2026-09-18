import React from 'react';
import { ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';

interface ActionFeedProps {
  onOpenNudge: (debtor: string, amount: number) => void;
  onOpenNegotiate: (supplier: string, item: string, amount: number) => void;
}

export const ActionFeed: React.FC<ActionFeedProps> = ({ onOpenNudge, onOpenNegotiate }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
            Tindakan Prioritas
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Rekomendasi taktis untuk mengamankan arus kas sebelum jatuh tempo.
          </p>
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          3 Tindakan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Kolektor Bon Santun */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-card flex flex-col justify-between hover:border-neutral-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Piutang H+16
              </span>
              <span className="text-xs font-semibold text-neutral-900">Rp 5.000.000</span>
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
              Katering Kantor Pemda (Pak Budi)
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Arus kas butuh percepatan sebelum gajian karyawan di H+6. Kirim pengingat santun dengan QRIS instan.
            </p>
          </div>
          <button
            onClick={() => onOpenNudge('Pak Budi (Pemda)', 5000000)}
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>Kirim WhatsApp Koleksi Santun</span>
          </button>
        </div>

        {/* Card 2: Restrukturisasi Tempo Supplier */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-card flex flex-col justify-between hover:border-neutral-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                Tempo H+11
              </span>
              <span className="text-xs font-semibold text-neutral-900">Rp 4.200.000</span>
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
              Toko Berkah (Biji Kopi Arabika)
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Jatuh tempo 5 hari setelah gajian. Siapkan penawaran cicil tempo 30 hari untuk amankan likuiditas.
            </p>
          </div>
          <button
            onClick={() => onOpenNegotiate('Toko Berkah', 'Biji Kopi Arabika 20kg', 4200000)}
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 py-2.5 text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <span>Draft Negosiasi Tempo (DP 50%)</span>
            <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
          </button>
        </div>

        {/* Card 3: Kebocoran Uang Dapur */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-card flex flex-col justify-between hover:border-neutral-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                Bocor Halus
              </span>
              <span className="text-xs font-semibold text-rose-600">Rp 1.850.000/bln</span>
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
              Prive Pribadi di Rekening Bisnis
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Terdeteksi 9 transaksi debit non-operasional (Indomaret, SPK Sekolah, E-Wallet) dari rekening usaha BCA.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-xs text-rose-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-600" />
            <span className="truncate">Penarikan prive melebihi 10% laba bersih</span>
          </div>
        </div>
      </div>
    </div>
  );
};
