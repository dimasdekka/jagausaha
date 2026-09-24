import React, { useState } from 'react';
import {
  Inbox,
  X,
  CheckCircle2,
  ShieldCheck,
  Building2,
  User,
  ShoppingBag,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DataInboxItem {
  id: string;
  date: string;
  rawText: string;
  counterparty: string;
  amount: number;
  type: 'OUTFLOW' | 'INFLOW';
  suggestedCategory: string;
  confidence: number;
  status: 'UNRESOLVED' | 'RESOLVED';
  resolvedCategory?: string;
}

interface DataInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResolved: (item: DataInboxItem, chosenCategory: string) => void;
}

export const DataInboxModal: React.FC<DataInboxModalProps> = ({
  isOpen,
  onClose,
  onResolved,
}) => {
  const [items, setItems] = useState<DataInboxItem[]>([
    {
      id: 'inbox-1',
      date: '24 Sep 2026',
      rawText: 'TRSF E-BANKING DB 2409/FTSCY/WS95011 450.000,00',
      counterparty: 'Transfer Antar Rekening Pribadi',
      amount: 450000,
      type: 'OUTFLOW',
      suggestedCategory: 'PRIVE',
      confidence: 72,
      status: 'UNRESOLVED',
    },
    {
      id: 'inbox-2',
      date: '23 Sep 2026',
      rawText: 'QRIS 00019283 TOKO PLASTIK MAKMUR 380.000,00',
      counterparty: 'Toko Plastik Makmur',
      amount: 380000,
      type: 'OUTFLOW',
      suggestedCategory: 'COGS_PACKAGING',
      confidence: 81,
      status: 'UNRESOLVED',
    },
  ]);

  const unresolvedCount = items.filter((i) => i.status === 'UNRESOLVED').length;

  const handleResolve = (id: string, category: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: 'RESOLVED', resolvedCategory: category } : i
      )
    );
    const targetItem = items.find((i) => i.id === id);
    if (targetItem) {
      onResolved({ ...targetItem, status: 'RESOLVED', resolvedCategory: category }, category);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark Frosted Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 cursor-pointer"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}
        />

        {/* Modal Surface */}
        <motion.div
          initial={{ scale: 0.96, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#ffffff', opacity: 1 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_24px_64px_rgba(0,0,0,0.25)] overflow-hidden z-10 my-auto text-slate-900"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                <Inbox className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-950">
                    Data Inbox: Rekonsiliasi Ragu-Ragu
                  </h2>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    {unresolvedCount} Perlu Verifikasi
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Transaksi mutasi bank dengan tingkat keyakinan AI di bawah 85%. Tentukan kategori dengan 1-klik agar perhitungan HPP dan Prive tetap 100% presisi.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* List of Ambiguous Items */}
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.status === 'RESOLVED'
                    ? 'border-emerald-200 bg-emerald-50/30 opacity-75'
                    : 'border-slate-200/90 bg-white shadow-2xs hover:border-slate-300'
                }`}
              >
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <div className="text-xs font-mono font-semibold text-slate-600">
                      {item.rawText}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {item.date} · Counterparty: <strong className="text-slate-700">{item.counterparty}</strong>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold text-slate-950 tabular-nums">
                      -Rp {item.amount.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Confidence AI: <strong className="text-amber-700">{item.confidence}%</strong>
                    </span>
                  </div>
                </div>

                {/* Resolution Action Row */}
                {item.status === 'UNRESOLVED' ? (
                  <div className="pt-3 space-y-2">
                    <div className="text-[11px] text-slate-600 font-medium flex items-center justify-between">
                      <span>Pilih Kategori Sebenarnya (1-Klik):</span>
                      <span className="text-amber-800 font-bold text-[10.5px]">
                        Rekomendasi AI: {item.suggestedCategory}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => handleResolve(item.id, 'PRIVE')}
                        className="py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <User className="h-3.5 w-3.5 text-amber-600" />
                        <span>Prive Pribadi</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResolve(item.id, 'COGS')}
                        className="py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Bahan Baku / Stok</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResolve(item.id, 'OPEX')}
                        className="py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Building2 className="h-3.5 w-3.5 text-blue-600" />
                        <span>Operasional Toko</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResolve(item.id, 'TRANSFER')}
                        className="py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="h-3.5 w-3.5 text-slate-600" />
                        <span>Transfer Rekening</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between text-xs text-emerald-800 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Terverifikasi: Dialokasikan sebagai {item.resolvedCategory}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Aturan tersimpan untuk mutasi berikutnya
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Pemisahan uang pribadi menjamin HPP toko tidak terdistorsi</span>
            </span>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
