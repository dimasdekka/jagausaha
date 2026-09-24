import React from 'react';
import {
  Bot,
  Cpu,
  Database,
  Terminal,
  Zap,
} from 'lucide-react';
import { AnimatedBadge } from '../motion/animated-badge';

export const DashboardAgentsView: React.FC = () => {
  const telemetryLogs = [
    {
      time: '10:14:02',
      agent: 'Sensor Agent',
      type: 'bca_sync',
      message: 'Sinkronisasi mutasi rekening BCA harian selesai: 12 transaksi terverifikasi (net inflow +Rp 950.000).',
    },
    {
      time: '10:14:03',
      agent: 'Sensor Agent',
      type: 'prive_detect',
      message: 'Deteksi pengeluaran non-operasional: Pengambilan kas prive Rp 450.000 dialihkan & diisolasi dari HPP toko.',
    },
    {
      time: '10:14:03',
      agent: 'Simulator Agent',
      type: 'dlmm_eval',
      message: 'DLMM menghitung ulang Safe-to-Spend harian: Nilai Rp 3.800.000 diverifikasi 100% aman untuk komitmen gajian H+6.',
    },
    {
      time: '10:14:04',
      agent: 'Advisor Agent',
      type: 'draft_ready',
      message: 'Menyiapkan draft WhatsApp penagihan piutang ramah untuk katering Pemda Rp 5.000.000 (Jatuh tempo H+3).',
    },
    {
      time: '10:14:04',
      agent: 'Guardian Core',
      type: 'audit_pass',
      message: 'Seluruh formula arus kas berstatus HIJAU. Integritas ledger deterministik tanpa halusinasi LLM.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
              <Bot className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-950">Log Sensor & Arsitektur AI Guardian</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Telemetri kerja 3 agen otonom: Sensor mutasi & invoice, Simulator deterministik kas (DLMM), dan Advisor intervensi santun.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AnimatedBadge status="success" size="sm" pulse={true}>
            3 Agen Aktif Terkoneksi
          </AnimatedBadge>
        </div>
      </div>

      {/* 3 Agents Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Agent 1: Sensor */}
        <div className="rounded-2xl border border-blue-200/80 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-blue-600" />
              1. Sensor Agent
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Mutasi BCA:</span>
              <strong className="text-slate-900">104 Transaksi</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">OCR Faktur & Bon:</span>
              <strong className="text-slate-900">18 Dokumen</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Kebocoran Kas / Prive:</span>
              <span className="font-bold text-emerald-700">Terisolasi</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-1">
            Latency: 14ms · BCA Open API Ready
          </div>
        </div>

        {/* Agent 2: Simulator */}
        <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-emerald-600" />
              2. Simulator Agent
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Metode Hitung:</span>
              <strong className="text-slate-900">Deterministik DLMM</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Halusinasi LLM:</span>
              <strong className="text-emerald-700">0% (Zero Hallucination)</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Horizon Proyeksi:</span>
              <strong className="text-slate-900">30 Hari Penuh</strong>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-1">
            Engine: Python 3.11 Core FastMath
          </div>
        </div>

        {/* Agent 3: Advisor */}
        <div className="rounded-2xl border border-indigo-200/80 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-indigo-600" />
              3. Advisor Agent
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Saluran Intervensi:</span>
              <strong className="text-slate-900">WhatsApp Webhook</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Tone Komunikasi:</span>
              <strong className="text-slate-900">Santun & Konstruktif</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Draf Aksi Aktif:</span>
              <span className="font-bold text-indigo-700">2 Draf Siap Kirim</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-1">
            Integrasi: QRIS Instant Paylink
          </div>
        </div>
      </div>

      {/* Live Mini-Terminal Audit Trail */}
      <div className="rounded-2xl border border-slate-900 bg-slate-950 text-slate-200 p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold font-mono tracking-wider text-slate-100">
              LIVE TELEMETRY AUDIT TRAIL
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-Time Stream Active</span>
          </div>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          {telemetryLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-3 leading-relaxed">
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span
                className={`font-semibold shrink-0 ${
                  log.agent === 'Sensor Agent'
                    ? 'text-blue-400'
                    : log.agent === 'Simulator Agent'
                    ? 'text-emerald-400'
                    : log.agent === 'Advisor Agent'
                    ? 'text-amber-400'
                    : 'text-indigo-400'
                }`}
              >
                {log.agent}:
              </span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Integritas Audit: Lolos Validasi Kriptografis SHA-256</span>
          <span>Zero Human Error Risk</span>
        </div>
      </div>
    </div>
  );
};
