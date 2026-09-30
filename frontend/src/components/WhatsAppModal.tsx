import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  MessageSquare,
  QrCode,
  Edit3,
  Eye,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
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
  const [currentText, setCurrentText] = useState(whatsappText);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setCurrentText(whatsappText);
    setIsEditing(false);
  }, [whatsappText, isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetToDefault = () => {
    setCurrentText(whatsappText);
  };

  const applyPreset = (presetKey: string) => {
    if (type === 'supplier_negotiation') {
      if (presetKey === 'budgeting') {
        setCurrentText(
          `Selamat siang Bapak/Ibu ${recipientName}, salam hangat dari kami 🙏\n\nTerkait rencana pesanan bahan baku berjalan, sesuai dengan alur budgeting dan jadwal administrasi pengadaan operasional kami bulan ini, apakah memungkinkan jika kami lakukan pembayaran bertahap dengan skema DP 50% di muka dan pelunasan sisanya tempo 30 hari?\n\nTerima kasih banyak atas kemitraan dan kerjasamanya Pak/Bu! 🙏`
        );
      } else if (presetKey === 'kemitraan') {
        setCurrentText(
          `Halo Pak/Bu ${recipientName}, semoga bisnisnya semakin lancar dan berkah 🙏\n\nUntuk pesanan kali ini, kami ingin mengajukan termin pembayaran DP 50% dan sisa pelunasan tempo 30 hari sebagai bagian dari rencana kontinuitas repeat order rutin kami ke depan.\n\nMohon pertimbangannya ya Pak/Bu, terima kasih banyak atas dukungannya! 😊`
        );
      } else if (presetKey === 'ringkas') {
        setCurrentText(
          `Selamat siang ${recipientName} 🙏\n\nIzin konfirmasi untuk pembayaran tagihan pemesanan, kami jadwalkan bertahap: DP 50% hari ini dan sisa pelunasan tempo 30 hari sesuai prosedur pengadaan toko kami.\n\nTerima kasih atas pengertian dan kerjasamanya! 🙏`
        );
      }
    } else {
      if (presetKey === 'qris_ramah') {
        setCurrentText(
          `Halo Kak dari ${recipientName}, salam hangat dari kami 🙏\n\nSekadar mengingatkan untuk invoice berjalan yang jatuh tempo hari ini. Agar praktis, pembayaran dapat diselesaikan melalui tautan QRIS resmi berikut:\n${qrisUrl}\n\nTerima kasih atas kepercayaannya! 😊`
        );
      } else if (presetKey === 'formal_kasir') {
        setCurrentText(
          `Selamat siang Kak, berikut konfirmasi tagihan pesanan yang jatuh tempo periode ini. Mohon berkenan menyelesaikan pelunasan via QRIS resmi kami: ${qrisUrl}. Bukti transfer dapat dikirimkan ke chat ini. Terima kasih banyak 🙏`
        );
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          {/* Solid Frosted Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: EASE_OUT }}
            onClick={onClose}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            className="fixed inset-0 backdrop-blur-xs cursor-pointer"
          />

          {/* 100% Opaque Modal Surface */}
          <motion.div
            initial={reduce ? undefined : { scale: 0.96, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={reduce ? undefined : { scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            style={{ backgroundColor: '#FFFFFF', opacity: 1 }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/80 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-2xs">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-950">{title}</h3>
                  <p className="text-[11px] text-neutral-500 font-normal">
                    Penerima: <span className="font-semibold text-neutral-700">{recipientName}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Mode Toggle: Pratinjau vs Edit */}
                <div className="flex items-center gap-1 bg-neutral-200/70 p-0.5 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      !isEditing
                        ? 'bg-white text-neutral-950 shadow-2xs font-bold'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span className="text-[11px]">Pratinjau</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      isEditing
                        ? 'bg-white text-neutral-950 shadow-2xs font-bold'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Edit3 className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-[11px]">Edit Template</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Presets Ribbon */}
            <div className="bg-neutral-100/70 border-b border-neutral-200/70 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10.5px] font-bold text-neutral-500 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span>Preset:</span>
                </span>
                {type === 'supplier_negotiation' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => applyPreset('budgeting')}
                      className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 hover:border-neutral-300 text-[10.5px] font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
                    >
                      Standar Budgeting
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('kemitraan')}
                      className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 hover:border-neutral-300 text-[10.5px] font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
                    >
                      Kemitraan Kontinu
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('ringkas')}
                      className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 hover:border-neutral-300 text-[10.5px] font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
                    >
                      Ringkas Lugas
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => applyPreset('qris_ramah')}
                      className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 hover:border-neutral-300 text-[10.5px] font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
                    >
                      QRIS Ramah
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('formal_kasir')}
                      className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 hover:border-neutral-300 text-[10.5px] font-semibold text-neutral-800 transition-colors cursor-pointer shadow-2xs"
                    >
                      Formal Rekapitulasi
                    </button>
                  </>
                )}
              </div>

              {currentText !== whatsappText && (
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="inline-flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer shrink-0"
                  title="Kembalikan ke draf awal"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset Draf</span>
                </button>
              )}
            </div>

            {/* Main Content: Edit Mode or WhatsApp Viewport */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {isEditing ? (
                /* Editable Textarea View */
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500">
                    <span className="font-semibold text-neutral-700">Sesuaikan Kata & Redaksi Pesan:</span>
                    <span className="font-mono text-[10px]">{currentText.length} karakter</span>
                  </div>

                  <textarea
                    rows={8}
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    placeholder="Tuliskan draf pesan WhatsApp..."
                    className="w-full p-3.5 rounded-2xl border border-neutral-300 text-xs text-neutral-950 font-normal leading-relaxed focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 shadow-2xs resize-none"
                  />

                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                    <span className="text-amber-600 font-bold shrink-0">💡 Etika Negosiasi:</span>
                    <span>
                      Hindari menyebut kondisi kas sedang tipis. Gunakan narasi berwibawa seperti <em>"sesuai jadwal budgeting berkala"</em> atau <em>"prosedur administrasi pengadaan toko"</em>.
                    </span>
                  </div>
                </div>
              ) : (
                /* Simulated WhatsApp Phone Viewport */
                <div
                  style={{ backgroundColor: '#ECE5DD' }}
                  className="rounded-2xl p-4 sm:p-5 text-neutral-900 space-y-3 shadow-inner"
                >
                  <div className="flex justify-center">
                    <span className="bg-white/90 border border-neutral-300 text-[10px] text-neutral-600 px-3 py-0.5 rounded-full font-medium shadow-2xs">
                      Draf Pesan Siap Kirim
                    </span>
                  </div>

                  {/* WhatsApp Message Bubble */}
                  <div
                    style={{ backgroundColor: '#DCF8C6' }}
                    className="ml-auto max-w-[92%] sm:max-w-[88%] rounded-2xl rounded-tr-xs border border-emerald-300/60 p-3.5 text-xs text-neutral-950 shadow-xs leading-relaxed whitespace-pre-wrap select-text"
                  >
                    {currentText}
                    <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-neutral-500 font-normal">
                      <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="text-emerald-700 font-bold">✓✓</span>
                    </div>
                  </div>

                  {/* QRIS Card Simulation if debt collection */}
                  {type === 'debt_collection' && (
                    <div className="rounded-2xl border border-neutral-200 bg-white p-3 flex items-center gap-3 shadow-xs">
                      <div className="h-11 w-11 rounded-xl bg-neutral-50 border border-neutral-200 p-1 flex items-center justify-center shrink-0">
                        <QrCode className="h-8 w-8 text-neutral-900" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-900 truncate">
                          QRIS Standar Pembayaran Nasional
                        </p>
                        <p className="text-[11px] text-emerald-700 font-medium truncate">
                          {qrisUrl}
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          Scan via BCA, Mandiri, BRI, GoPay, OVO, ShopeePay
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-neutral-100 bg-white p-3.5 sm:p-4 flex items-center gap-2.5">
              <motion.button
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={SPRING_PRESS}
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 px-4 py-2.5 text-xs font-bold transition-colors border border-neutral-200/80 cursor-pointer shadow-2xs"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-neutral-600" />}
                <span>{copied ? 'Tersalin!' : 'Salin Pesan'}</span>
              </motion.button>

              <motion.a
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={SPRING_PRESS}
                href={`https://wa.me/?text=${encodeURIComponent(currentText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-[0.98]"
              >
                <MessageSquare className="h-4 w-4 text-white" />
                <span>Kirim ke WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
