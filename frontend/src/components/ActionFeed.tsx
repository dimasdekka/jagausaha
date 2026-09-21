import React from 'react';
import { ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';

interface ActionFeedProps {
  onOpenNudge: (debtor: string, amount: number) => void;
  onOpenNegotiate: () => void;
}

export const ActionFeed: React.FC<ActionFeedProps> = ({ onOpenNudge, onOpenNegotiate }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-100 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
            Proactive Decision Guard
          </span>
          <h3 className="font-serif font-extralight text-3xl sm:text-4xl text-neutral-950 tracking-[-0.02em] mt-1">
            Tindakan Taktis Terjadwal
          </h3>
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          3 Tindakan Perlu Perhatian
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Kolektor Bon Santun */}
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Piutang Cair H+16
              </span>
              <span className="text-xs font-semibold text-neutral-950 font-mono">Rp 5.000.000</span>
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
              Katering Kantor Pemda (Pak Budi)
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Arus kas butuh percepatan sebelum gajian 3 barista di H+6. Kirim pengingat santun ber-QRIS langsung.
            </p>
          </div>
          <button
            onClick={() => onOpenNudge('Pak Budi (Pemda)', 5000000)}
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white py-2.5 text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>Kirim WhatsApp Koleksi Santun</span>
          </button>
        </div>

        {/* Card 2: Restrukturisasi Tempo Supplier */}
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Tempo Supplier H+11
              </span>
              <span className="text-xs font-semibold text-neutral-950 font-mono">Rp 4.200.000</span>
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
              Toko Berkah (Biji Kopi Arabika)
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Jatuh tempo 5 hari setelah gaji karyawan. Siapkan penawaran cicil DP 50% + tempo 30 hari untuk menjaga likuiditas.
            </p>
          </div>
          <button
            onClick={onOpenNegotiate}
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 py-2.5 text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <span>Draf Negosiasi Tempo (DP 50%)</span>
            <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
          </button>
        </div>

        {/* Card 3: Kebocoran Uang Dapur */}
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                Bocor Halus Terdeteksi
              </span>
              <span className="text-xs font-semibold text-rose-600 font-mono">Rp 1.850.000/bln</span>
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
      </div>
    </div>
  );
};
