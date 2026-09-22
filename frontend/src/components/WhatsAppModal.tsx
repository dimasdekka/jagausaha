import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, QrCode } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SPRING_PRESS, EASE_OUT } from '../lib/ease';

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
  const reduce = useReducedMotion();

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Solid Frosted Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: EASE_OUT }}
            onClick={onClose}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            className="fixed inset-0 backdrop-blur-sm cursor-pointer"
          />

          {/* 100% Opaque Modal Surface (Never Semi-Transparent) */}
          <motion.div
            initial={
              reduce
                ? undefined
                : { scale: 0.96, y: 8 }
            }
            animate={{
              scale: 1,
              y: 0,
            }}
            exit={
              reduce
                ? undefined
                : { scale: 0.96, y: 8 }
            }
            transition={{ duration: 0.18, ease: EASE_OUT }}
            style={{ backgroundColor: '#FFFFFF', opacity: 1 }}
            className="relative z-10 w-full max-w-md rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-neutral-950">{title}</h3>
                  <p className="text-[11px] text-neutral-500 font-normal">
                    Penerima: {recipientName}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Simulated Phone / WhatsApp Viewport */}
            <div
              style={{ backgroundColor: '#F0F2F5' }}
              className="flex-1 overflow-y-auto p-5 text-neutral-900 space-y-3.5"
            >
              <div className="flex justify-center">
                <span className="bg-white border border-neutral-200/70 text-[10px] text-neutral-600 px-3 py-1 rounded-full font-medium shadow-xs">
                  Draf Pesan Santun · Siap Kirim
                </span>
              </div>

              {/* WhatsApp Message Bubble */}
              <div
                style={{ backgroundColor: '#DCF8C6' }}
                className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm border border-emerald-200/60 p-3.5 text-xs text-neutral-900 shadow-sm leading-relaxed whitespace-pre-wrap"
              >
                {whatsappText}
                <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-neutral-500 font-normal">
                  <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="text-emerald-600 font-bold">✓✓</span>
                </div>
              </div>

              {/* QRIS Card Simulation if debt collection */}
              {type === 'debt_collection' && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-3.5 flex items-center gap-3 shadow-xs">
                  <div className="h-12 w-12 rounded-xl bg-neutral-50 border border-neutral-200 p-1 flex items-center justify-center shrink-0">
                    <QrCode className="h-9 w-9 text-neutral-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      QRIS Standar Pembayaran Nasional
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium truncate">
                      {qrisUrl}
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      Scan via BCA, Mandiri, GoPay, OVO, ShopeePay
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-neutral-100 bg-white p-4 flex items-center gap-2.5">
              <motion.button
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={SPRING_PRESS}
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 px-4 py-2.5 text-xs font-medium transition-colors border border-neutral-200/80 cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-neutral-500" />}
                <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Pesan'}</span>
              </motion.button>
              
              <motion.a
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={SPRING_PRESS}
                href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-2.5 text-xs font-medium transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>Kirim WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
