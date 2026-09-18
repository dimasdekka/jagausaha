import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, QrCode } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  recipientName: string;
  whatsappText: string;
  qrisUrl?: string;
  type?: 'debt_collection' | 'supplier_negotiation';
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  title,
  recipientName,
  whatsappText,
  qrisUrl = "https://qris.id/pay/ID102003882910",
  type = 'debt_collection',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
              <p className="text-[11px] text-slate-400 font-mono">Penerima: {recipientName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Simulated Phone / WhatsApp Viewport */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#0B141A] text-slate-100 space-y-3">
          <div className="flex justify-center">
            <span className="bg-[#182229] text-[10px] text-slate-400 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Draft Pesan Santun · Siap Kirim
            </span>
          </div>

          {/* WhatsApp Message Bubble */}
          <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#005C4B] p-3 text-xs text-white shadow-md leading-relaxed whitespace-pre-wrap">
            {whatsappText}
            <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-200/60 font-mono">
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>✓✓</span>
            </div>
          </div>

          {/* QRIS Card Simulation if debt collection */}
          {type === 'debt_collection' && (
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/90 p-3 flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <QrCode className="h-10 w-10 text-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-200 truncate">QRIS Standar Pembayaran Nasional</p>
                <p className="text-[11px] text-emerald-400 font-mono truncate">{qrisUrl}</p>
                <p className="text-[10px] text-slate-400">Scan via BCA, Mandiri, GoPay, OVO, ShopeePay</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 bg-slate-950 p-3.5 flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2.5 text-xs font-medium transition-colors border border-slate-700"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Pesan'}</span>
          </button>
          
          <a
            href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2.5 text-xs font-bold transition-colors shadow-lg shadow-emerald-950/50"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Kirim via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
