import React, { useState } from 'react';
import {
  Wallet,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight,
  LogOut,
  SlidersHorizontal,
  Bell,
  Search,
  Clock,
  Zap,
  LayoutDashboard,
  Receipt,
  Bot,
  ExternalLink,
  History,
  Inbox,
  Mic,
  BookOpen,
} from 'lucide-react';
import { JagaUsahaLogo } from './ui/JagaUsahaLogo';
import { BoardUIAreaChart } from './BoardUIAreaChart';
import { AnimatedNumber } from './motion/number';
import { DashboardSimulatorView } from './dashboard/DashboardSimulatorView';
import { DashboardAgendaView } from './dashboard/DashboardAgendaView';
import { DashboardAgentsView } from './dashboard/DashboardAgentsView';
import { DashboardMemoryView } from './dashboard/DashboardMemoryView';
import { DashboardRAGView } from './dashboard/DashboardRAGView';
import { OnboardingModal, type BusinessContextData } from './OnboardingModal';
import { DataInboxModal } from './DataInboxModal';

interface DashboardPageProps {
  onLogout: () => void;
  onOpenWhatsAppModal: (data: {
    title: string;
    recipient: string;
    text: string;
    type?: 'debt_collection' | 'supplier_negotiation';
  }) => void;
  currentCash: number;
  safeToSpend: number;
  safetyBuffer: number;
  runwayDays: number;
  dailyGross: number;
  baselineDays: number[];
  baselineCash: number[];
  scenarioCash?: number[];
  insolvencyDay: number | null;
  scenarioName: string;
  activePreset: string;
  presets: Array<{ id: string; label: string; outflow: number; dangerous: boolean }>;
  onSelectPreset: (id: string, amount: number) => void;
  onOpenCommandPalette: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onLogout,
  onOpenWhatsAppModal,
  currentCash,
  safeToSpend,
  safetyBuffer,
  runwayDays,
  dailyGross,
  baselineDays,
  baselineCash,
  scenarioCash,
  insolvencyDay,
  scenarioName,
  activePreset,
  presets,
  onSelectPreset,
  onOpenCommandPalette,
}) => {
  const [activeNav, setActiveNav] = useState<'overview' | 'simulator' | 'agenda' | 'agents' | 'memory' | 'rag'>('overview');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDataInboxOpen, setIsDataInboxOpen] = useState(false);
  const [businessProfile, setBusinessProfile] = useState<BusinessContextData>({
    businessName: 'Kopi Teras Barokah',
    archetype: 'fnb',
    bankName: 'BCA',
    initialCash: currentCash,
    safetyBuffer: safetyBuffer,
    payrollAmount: 7500000,
    payrollDay: 30,
    fixedRentAmount: 4200000,
    dailyGross: dailyGross,
  });

  const isSafe = insolvencyDay === null;
  const minCash = scenarioCash ? Math.min(...scenarioCash) : Math.min(...baselineCash);

  // Scheduled Cash Events (Next 14 Days)
  const scheduledEvents = [
    {
      day: 'H+3',
      date: '27 Sep',
      title: 'Piutang Katering Kantor Pemda',
      type: 'inflow',
      amount: 5000000,
      status: 'Menunggu Cair',
      action: 'Tagih QRIS',
      actionHandler: () =>
        onOpenWhatsAppModal({
          title: 'Kolektor Bon Santun',
          recipient: 'Pak Budi (Katering Pemda)',
          text: `Halo Kak Budi, semoga lancar selalu usahanya yaa 🙏\n\nSekadar mengingatkan rekonsiliasi kas mingguan dari tim operasional kami, ada catatan invoice tertunda sebesar *Rp 5.000.000* yang sudah jatuh tempo.\n\nBisa langsung transfer via QRIS: https://qris.id/pay/ID102003882910?amt=5000000\n\nTerima kasih banyak atas kerjasamanya! 😊`,
          type: 'debt_collection',
        }),
    },
    {
      day: 'H+6',
      date: '30 Sep',
      title: 'Gaji Karyawan & 3 Barista',
      type: 'outflow',
      amount: 7500000,
      status: 'Komitmen Pasti',
      warning: !isSafe && activePreset === 'espresso_cash' ? 'Benturan Kas!' : undefined,
    },
    {
      day: 'H+11',
      date: '05 Okt',
      title: 'Tempo Biji Kopi Toko Berkah',
      type: 'outflow',
      amount: 4200000,
      status: 'Jatuh Tempo',
      action: 'Draf DP 50%',
      actionHandler: () =>
        onOpenWhatsAppModal({
          title: 'Negosiasi Tempo Supplier',
          recipient: 'Toko Berkah (Supplier Kopi)',
          text: `Selamat siang Pak/Bu Toko Berkah, salam hangat dari kami 🙏\n\nTerkait tagihan bahan baku seharga *Rp 4.200.000*, untuk menjaga kestabilan likuiditas kas operasional kami, apakah memungkinkan jika kami bayarkan dengan skema *DP 50% (Rp 2.100.000) hari ini*, dan pelunasan sisanya tempo 30 hari?\n\nTerima kasih banyak atas pertimbangannya Pak/Bu! 🙏`,
          type: 'supplier_negotiation',
        }),
    },
    {
      day: 'H+16',
      date: '10 Okt',
      title: 'Piutang Langganan Kafe Kantor',
      type: 'inflow',
      amount: 2800000,
      status: 'Terjadwal',
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#171717] flex flex-col md:flex-row font-sans selection:bg-[#dcfce7] selection:text-[#16a34a] antialiased">
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR NAVIGATION (Dub / Linear Hairline Aesthetic)              */}
      {/* ========================================================================= */}
      <aside className="w-full md:w-64 lg:w-72 bg-[#ffffff] border-r border-[#e5e5e5] flex flex-col justify-between shrink-0 md:h-screen md:sticky md:top-0 z-30">
        {/* Top Workspace Header */}
        <div className="p-5 border-b border-[#e5e5e5] space-y-3.5">
          <div className="flex items-center justify-between">
            <JagaUsahaLogo size={32} showWordmark={true} />
            <span className="text-[10.5px] font-mono font-medium text-[#737373] bg-[#f5f5f5] px-2 py-0.5 rounded-full border border-[#e5e5e5]">
              v1.0
            </span>
          </div>

          {/* Workspace Identity Card (Dub Card Standard) */}
          <div className="p-3 rounded-[12px] bg-[#f5f5f5] border border-[#e5e5e5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 truncate">
                <div className="h-8 w-8 rounded-[8px] bg-[#0a0a0a] text-white flex items-center justify-center font-bold font-mono text-xs shrink-0 shadow-dub-subtle">
                  {businessProfile.businessName.slice(0, 2).toUpperCase()}
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-[#171717] truncate">
                    {businessProfile.businessName}
                  </div>
                  <div className="text-[11px] text-[#737373] font-medium capitalize">
                    {businessProfile.archetype === 'fnb'
                      ? 'Kafe, Resto & F&B'
                      : businessProfile.archetype === 'retail'
                      ? 'Retail & Fashion'
                      : businessProfile.archetype === 'grocery'
                      ? 'Warung & Kelontong'
                      : 'Jasa & Agensi'}
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-medium text-[#525252] bg-[#ffffff] border border-[#e5e5e5] px-2 py-0.5 rounded-full shrink-0 shadow-dub-subtle">
                UMKM
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex-1 p-4 space-y-5 overflow-y-auto">
          {/* Main Views */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10.5px] font-medium uppercase tracking-wider text-[#737373]">
              Menu Utama
            </div>

            <button
              onClick={() => setActiveNav('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-xs transition-all cursor-pointer ${
                activeNav === 'overview'
                  ? 'bg-[#0a0a0a] text-white font-semibold shadow-dub-subtle'
                  : 'text-[#404040] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] font-medium'
              }`}
            >
              <LayoutDashboard className={`h-4 w-4 ${activeNav === 'overview' ? 'text-[#16a34a]' : 'text-[#737373]'}`} />
              <span>Ringkasan Kas & Sandbox</span>
            </button>

            <button
              onClick={() => setActiveNav('simulator')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-xs transition-all cursor-pointer ${
                activeNav === 'simulator'
                  ? 'bg-[#0a0a0a] text-white font-semibold shadow-dub-subtle'
                  : 'text-[#404040] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] font-medium'
              }`}
            >
              <SlidersHorizontal className={`h-4 w-4 ${activeNav === 'simulator' ? 'text-[#2563eb]' : 'text-[#737373]'}`} />
              <span>Simulasi Keputusan</span>
            </button>

            <button
              onClick={() => setActiveNav('agenda')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-xs transition-all cursor-pointer ${
                activeNav === 'agenda'
                  ? 'bg-[#0a0a0a] text-white font-semibold shadow-dub-subtle'
                  : 'text-[#404040] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] font-medium'
              }`}
            >
              <Receipt className={`h-4 w-4 ${activeNav === 'agenda' ? 'text-[#7c3aed]' : 'text-[#737373]'}`} />
              <span>Agenda Kas 14H</span>
            </button>

            <button
              onClick={() => setActiveNav('agents')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-xs transition-all cursor-pointer ${
                activeNav === 'agents'
                  ? 'bg-[#0a0a0a] text-white font-semibold shadow-dub-subtle'
                  : 'text-[#404040] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] font-medium'
              }`}
            >
              <Bot className={`h-4 w-4 ${activeNav === 'agents' ? 'text-[#ea580c]' : 'text-[#737373]'}`} />
              <span>Log Sensor & AI Guardian</span>
            </button>

            <button
              onClick={() => setActiveNav('memory')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-xs transition-all cursor-pointer ${
                activeNav === 'memory'
                  ? 'bg-[#0a0a0a] text-white font-semibold shadow-dub-subtle'
                  : 'text-[#404040] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] font-medium'
              }`}
            >
              <History className={`h-4 w-4 ${activeNav === 'memory' ? 'text-[#16a34a]' : 'text-[#737373]'}`} />
              <span>Memori Keputusan & Outcome</span>
            </button>

            <button
              onClick={() => setActiveNav('rag')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-xs transition-all cursor-pointer ${
                activeNav === 'rag'
                  ? 'bg-[#0a0a0a] text-white font-semibold shadow-dub-subtle'
                  : 'text-[#404040] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] font-medium'
              }`}
            >
              <BookOpen className={`h-4 w-4 ${activeNav === 'rag' ? 'text-[#2563eb]' : 'text-[#737373]'}`} />
              <span>Pangkalan Dokumen & RAG</span>
            </button>
          </div>

          {/* Data Inbox Quick Review Card */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsDataInboxOpen(true)}
              className="w-full flex items-center justify-between p-3 rounded-[12px] bg-[#ffffff] hover:bg-[#f5f5f5] border border-[#e5e5e5] text-[#171717] transition-all cursor-pointer shadow-dub-subtle"
            >
              <span className="flex items-center gap-2 text-xs font-semibold">
                <Inbox className="h-4 w-4 text-[#ea580c]" />
                <span>Data Inbox (2 Transaksi)</span>
              </span>
              <span className="text-[10px] font-bold bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa] px-2 py-0.5 rounded-full">
                Review
              </span>
            </button>
          </div>

          {/* Engine Status Widget */}
          <div className="pt-2 border-t border-[#e5e5e5]">
            <div className="p-3 rounded-[12px] bg-[#f5f5f5] border border-[#e5e5e5] space-y-1">
              <div className="text-[11px] font-semibold text-[#171717] flex items-center justify-between">
                <span>Integritas DLMM</span>
                <span className="text-[#16a34a] font-bold text-[10px] bg-[#dcfce7] px-1.5 py-0.2 rounded-full border border-[#bbf7d0]">
                  100% Deterministik
                </span>
              </div>
              <p className="text-[10px] text-[#737373] leading-relaxed font-normal">
                Formula matematika native Python. Bebas halusinasi LLM untuk perlindungan kas harian.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sidebar User Profile & Logout */}
        <div className="p-4 border-t border-[#e5e5e5] bg-[#ffffff] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 truncate">
              <div className="h-8 w-8 rounded-[8px] bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-dub-subtle">
                OB
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-[#171717] leading-tight">Owner Bisnis</div>
                <div className="text-[10.5px] text-[#737373] truncate">owner@kopiteras.id</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-[8px] text-[#737373] hover:text-[#ea580c] hover:bg-[#fff7ed] transition-colors cursor-pointer"
              title="Keluar ke Landing Page"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. RIGHT MAIN CONTENT AREA                                                */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto">
        {/* Sticky Top Bar for Content with Generous Padding & Centered Rhythm */}
        <header className="sticky top-0 z-20 h-18 sm:h-20 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl px-6 sm:px-10 flex items-center justify-between gap-4 sm:gap-6 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight truncate">
              {activeNav === 'overview' && 'Ringkasan Kas & Sandbox'}
              {activeNav === 'simulator' && 'Simulasi Keputusan Belanja'}
              {activeNav === 'agenda' && 'Agenda Arus Kas 14H'}
              {activeNav === 'agents' && 'Log Sensor & AI Guardian'}
              {activeNav === 'memory' && 'Memori Keputusan & Outcome'}
              {activeNav === 'rag' && 'Pangkalan Dokumen & RAG Finansial'}
            </h1>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Real-Time</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Quick Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 h-9 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs text-slate-600 hover:text-slate-950 transition-all cursor-pointer shadow-2xs"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>Cari...</span>
              <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() =>
                onOpenWhatsAppModal({
                  title: 'Notifikasi AI Guardian',
                  recipient: 'Notifikasi Otomatis',
                  text: 'Tindakan prioritas hari ini: Tagihan katering Pemda Rp 5.000.000 siap dikirim melalui WhatsApp QRIS.',
                  type: 'debt_collection',
                })
              }
              className="h-9 w-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer relative shadow-2xs"
              title="Notifikasi"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500" />
            </button>

            {/* Input Data Perusahaan via Voice / Dokumen Quick Action */}
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[8px] bg-[#0a0a0a] hover:bg-[#171717] text-white text-xs font-semibold transition-all cursor-pointer shadow-dub-subtle"
              title="Input data usaha via percakapan suara atau kirim dokumen laporan keuangan"
            >
              <Mic className="h-3.5 w-3.5 text-[#2563eb]" />
              <span className="hidden sm:inline">Input Data via Suara / Dokumen</span>
              <span className="sm:hidden">Input Data</span>
            </button>

            {/* Back to Home Shortcut */}
            <button
              onClick={onLogout}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ml-1 pl-3 border-l border-slate-200"
            >
              <span>Beranda</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </header>

        {/* Content Body with Generous Padding */}
        <main className="p-6 sm:p-10 space-y-6 sm:space-y-8 flex-1">
          {activeNav === 'simulator' && (
            <DashboardSimulatorView
              currentCash={currentCash}
              safeToSpend={safeToSpend}
              safetyBuffer={safetyBuffer}
              dailyGross={dailyGross}
              onOpenWhatsAppModal={onOpenWhatsAppModal}
            />
          )}

          {activeNav === 'agenda' && (
            <DashboardAgendaView
              onOpenWhatsAppModal={onOpenWhatsAppModal}
            />
          )}

          {activeNav === 'agents' && (
            <DashboardAgentsView />
          )}

          {activeNav === 'memory' && (
            <DashboardMemoryView />
          )}

          {activeNav === 'rag' && (
            <DashboardRAGView />
          )}

          {activeNav === 'overview' && (
            <>
              {/* A. Top 4-Pillar Financial KPI Strip (Dub Border-First Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Saldo Kas Aktif */}
                <div className="rounded-[12px] border border-[#e5e5e5] bg-[#ffffff] p-5 shadow-dub-subtle flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#171717] flex items-center gap-1.5">
                      <div className="p-1 rounded-[6px] bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]">
                        <Wallet className="h-3.5 w-3.5" />
                      </div>
                      Kas Rekening {businessProfile.bankName}
                    </span>
                    <span className="text-[10px] font-medium text-[#2563eb] bg-[#eff6ff] px-2 py-0.5 rounded-full border border-[#dbeafe]">
                      Live Sinkron
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] tracking-tight flex items-baseline tabular-nums">
                    <span className="text-xs font-semibold text-[#737373] mr-1">Rp</span>
                    <AnimatedNumber value={currentCash} duration={0.8} />
                  </div>
                  <div className="text-[11px] text-[#737373] font-medium border-t border-[#e5e5e5] pt-2.5 mt-2 flex items-center justify-between">
                    <span>Cadangan Darurat</span>
                    <span className="h-3 w-px bg-[#e5e5e5]" />
                    <strong className="text-[#171717] font-semibold tabular-nums">Rp {safetyBuffer.toLocaleString('id-ID')}</strong>
                  </div>
                </div>

                {/* Card 2: Duit Dingin Aman (Safe-to-Spend) — DUB VIVID GREEN ACCENT */}
                <div className="rounded-[12px] border border-[#16a34a]/30 bg-[#dcfce7]/20 p-5 shadow-dub-subtle flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#16a34a] flex items-center gap-1.5">
                      <div className="p-1 rounded-[6px] bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                      Duit Dingin Aman
                    </span>
                    <span className="text-[10px] font-bold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full border border-[#bbf7d0]">
                      Safe-to-Spend
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] tracking-tight flex items-baseline tabular-nums">
                    <span className="text-xs font-semibold text-[#16a34a] mr-1">Rp</span>
                    <AnimatedNumber value={safeToSpend} duration={0.8} />
                  </div>
                  <div className="text-[11px] text-[#16a34a] font-medium border-t border-[#bbf7d0]/60 pt-2.5 mt-2 flex items-center justify-between">
                    <span>Batas Belanja Bebas</span>
                    <span className="h-3 w-px bg-[#bbf7d0]" />
                    <strong className="text-[#14532d] font-bold">100% Aman Gaji</strong>
                  </div>
                </div>

                {/* Card 3: Runway Kas Operasional */}
                <div className="rounded-[12px] border border-[#e5e5e5] bg-[#ffffff] p-5 shadow-dub-subtle flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#171717] flex items-center gap-1.5">
                      <div className="p-1 rounded-[6px] bg-[#f5f3ff] text-[#7c3aed] border border-[#ede9fe]">
                        <Clock className="h-3.5 w-3.5" />
                      </div>
                      Runway Kas
                    </span>
                    <span className="text-[10px] font-medium text-[#7c3aed] bg-[#f5f3ff] border border-[#ede9fe] px-2 py-0.5 rounded-full">
                      Horizon 30H
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] tracking-tight flex items-baseline gap-1.5 tabular-nums">
                    <span>{runwayDays}</span>
                    <span className="text-xs font-semibold text-[#7c3aed]">Hari Aman</span>
                  </div>
                  <div className="text-[11px] text-[#737373] font-medium border-t border-[#e5e5e5] pt-2.5 mt-2 flex items-center justify-between">
                    <span>Ketahanan Operasional</span>
                    <span className="h-3 w-px bg-[#e5e5e5]" />
                    <strong className="text-[#171717] font-semibold">Optimal</strong>
                  </div>
                </div>

                {/* Card 4: Net Inflow Harian */}
                <div className="rounded-[12px] border border-[#e5e5e5] bg-[#ffffff] p-5 shadow-dub-subtle flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#171717] flex items-center gap-1.5">
                      <div className="p-1 rounded-[6px] bg-[#f5f5f5] text-[#525252] border border-[#e5e5e5]">
                        <TrendingUp className="h-3.5 w-3.5" />
                      </div>
                      Omset Rata-Rata
                    </span>
                    <span className="text-[10px] font-medium text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full border border-[#bbf7d0]">
                      Inflow Stabil
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] tracking-tight flex items-baseline tabular-nums">
                    <span className="text-xs font-semibold text-[#737373] mr-1">Rp</span>
                    <AnimatedNumber value={dailyGross} duration={0.8} />
                    <span className="text-xs font-medium text-[#737373] ml-1">/hari</span>
                  </div>
                  <div className="text-[11px] text-[#737373] font-medium border-t border-[#e5e5e5] pt-2.5 mt-2 flex items-center justify-between">
                    <span>Margin Bersih</span>
                    <span className="h-3 w-px bg-[#e5e5e5]" />
                    <strong className="text-[#171717] font-semibold">51.1% Operasional</strong>
                  </div>
                </div>
              </div>

          {/* B. Skenario Belanja Quick Selector Strip (Dub Large Card) */}
          <div className="rounded-[16px] border border-[#e5e5e5] bg-[#ffffff] p-5 sm:p-6 shadow-dub-subtle space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#e5e5e5] pb-3.5">
              <div>
                <h3 className="text-base font-semibold text-[#171717] flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#2563eb]" />
                  <span>Uji Skenario Belanja Modal (Interactive Sandbox)</span>
                </h3>
                <p className="text-xs text-[#737373] mt-0.5 font-normal">
                  Pilih skenario di bawah ini untuk melihat simulasi dampaknya terhadap saldo kas dan hari gajian:
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#737373] font-medium">Status Hasil:</span>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    isSafe
                      ? 'bg-[#dcfce7] text-[#16a34a] border-[#bbf7d0]'
                      : 'bg-[#fff1f2] text-[#e11d48] border-[#fecdd3]'
                  }`}
                >
                  {isSafe ? 'Kas Aman' : `Peringatan Defisit H+${insolvencyDay || 6}`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {presets.map((preset) => {
                const isSelected = activePreset === preset.id;
                const isDangerous = preset.dangerous;
                const isRecommended = preset.id === 'espresso_restructured';

                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset.id, preset.outflow)}
                    className={`p-3.5 rounded-[12px] border text-left transition-all duration-150 active:scale-[0.98] cursor-pointer flex flex-col justify-between h-full relative ${
                      isSelected
                        ? 'border-2 border-[#0a0a0a] bg-[#f5f5f5] shadow-dub-subtle text-[#0a0a0a] font-semibold'
                        : isDangerous
                        ? 'border border-[#fecdd3] bg-[#fff1f2]/40 hover:bg-[#fff1f2]/80 text-[#171717]'
                        : isRecommended
                        ? 'border border-[#bbf7d0] bg-[#dcfce7]/30 hover:bg-[#dcfce7]/60 text-[#171717]'
                        : 'border border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] text-[#171717]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            isDangerous
                              ? 'bg-[#fff1f2] text-[#e11d48] border-[#fecdd3]'
                              : isRecommended
                              ? 'bg-[#dcfce7] text-[#16a34a] border-[#bbf7d0]'
                              : 'bg-[#f5f5f5] text-[#525252] border-[#e5e5e5]'
                          }`}
                        >
                          {isDangerous ? 'Risiko Defisit' : isRecommended ? 'Solusi Aman' : 'Beban Rutin'}
                        </span>

                        {isSelected && (
                          <span className="h-4 w-4 rounded-full bg-[#0a0a0a] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            ✓
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold tracking-tight">{preset.label}</div>
                    </div>

                    <div
                      className={`text-xs tabular-nums mt-2.5 font-semibold ${
                        isSelected ? 'text-[#0a0a0a] font-bold' : 'text-[#737373]'
                      }`}
                    >
                      {preset.outflow > 0
                        ? `Rp ${(preset.outflow / 1_000_000).toFixed(1)} Jt`
                        : 'Rp 2.5 Jt/bln'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* C. Main Two-Column View: Recharts 30-Day Curve + Tactical Operations Cockpit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column (7 cols): Natural Spline Area Chart */}
            <div className="lg:col-span-7 flex flex-col">
              <BoardUIAreaChart
                days={baselineDays}
                baseline={baselineCash}
                scenario={scenarioCash}
                insolvencyDay={insolvencyDay}
                scenarioName={scenarioName}
                safetyBuffer={safeToSpend}
              />
            </div>

            {/* Right Column (5 cols): Operational Cockpit & Mitigation Feed */}
            <div className="lg:col-span-5 flex flex-col space-y-5 justify-between">
              {/* Box A: Real-Time Intelligence & Clashing Alert */}
              <div className="rounded-[16px] border border-[#e5e5e5] bg-[#ffffff] p-5 shadow-dub-subtle space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-2.5">
                  <span className="text-sm font-semibold text-[#171717] tracking-tight flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-[#ea580c]" />
                    Analisis Risiko Deterministik
                  </span>
                  <span className="text-[10px] font-mono font-medium text-[#737373] bg-[#f5f5f5] px-2 py-0.5 rounded-full border border-[#e5e5e5]">
                    DLMM FastMath v1.0
                  </span>
                </div>

                {!isSafe ? (
                  <div className="p-3.5 rounded-[12px] bg-[#fff1f2] border border-[#fecdd3] space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[#e11d48] font-semibold text-xs">
                      <AlertTriangle className="h-4 w-4 text-[#e11d48] shrink-0" />
                      <span>PERINGATAN: Defisit Kas Hari ke-{insolvencyDay || 6}</span>
                    </div>
                    <p className="text-xs text-[#9f1239] leading-relaxed font-normal">
                      Pengeluaran <strong>{scenarioName}</strong> akan menyebabkan kas defisit{' '}
                      <strong className="text-[#881337] font-bold">
                        -Rp {Math.abs(minCash).toLocaleString('id-ID')}
                      </strong>{' '}
                      saat jadwal gajian barista (H+6) dan tempo kopi (H+11).
                    </p>
                    <div className="pt-1 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => onSelectPreset('espresso_restructured', 7000000)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#0a0a0a] hover:bg-[#171717] text-white py-2 px-3 text-xs font-semibold shadow-dub-subtle cursor-pointer active:scale-95"
                      >
                        <span>Terapkan DP 50%</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          onOpenWhatsAppModal({
                            title: 'Negosiasi Tempo Supplier',
                            recipient: 'Toko Mesin Berkah',
                            text: `Selamat siang Pak/Bu Toko Mesin Berkah, salam hangat dari kami 🙏\n\nTerkait penawaran unit *Mesin Espresso 2-Group* seharga *Rp 14.000.000*, kami sangat berminat ambil. Namun untuk menjaga likuiditas kas operasional kami, apakah memungkinkan jika kami bayarkan dengan skema *DP 50% (Rp 7.000.000) hari ini*, dan pelunasan sisanya tempo 30 hari?\n\nTerima kasih banyak atas pertimbangannya Pak/Bu! 🙏`,
                            type: 'supplier_negotiation',
                          })
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-[8px] border border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] text-[#171717] py-2 px-3 text-xs font-semibold cursor-pointer active:scale-95 shadow-dub-subtle"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-[#16a34a]" />
                        <span>Draf WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-[12px] bg-[#dcfce7]/60 border border-[#bbf7d0] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[#14532d] font-semibold text-xs">
                      <CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0" />
                      <span>Keputusan Aman: Likuiditas Terlindungi</span>
                    </div>
                    <p className="text-xs text-[#166534] leading-relaxed font-normal">
                      Keputusan <strong>{scenarioName}</strong> sepenuhnya aman dieksekusi. Saldo kas terendah Anda tetap
                      berada di atas batas aman cadangan Rp {safetyBuffer.toLocaleString('id-ID')}.
                    </p>
                  </div>
                )}
              </div>

              {/* Box B: Scheduled Cash Events Timeline */}
              <div className="rounded-[16px] border border-[#e5e5e5] bg-[#ffffff] p-5 shadow-dub-subtle space-y-3">
                <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-2">
                  <span className="text-sm font-semibold text-[#171717] tracking-tight flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[#2563eb]" />
                    Agenda Kas Kritis 14 Hari ke Depan
                  </span>
                  <span className="text-[10px] font-medium text-[#737373] bg-[#f5f5f5] px-2 py-0.5 rounded-full border border-[#e5e5e5]">
                    4 Komitmen
                  </span>
                </div>

                <div className="space-y-2">
                  {scheduledEvents.map((evt, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-[8px] border flex items-center justify-between gap-3 text-xs transition-colors ${
                        evt.warning
                          ? 'border-[#fecdd3] bg-[#fff1f2]/60'
                          : evt.type === 'inflow'
                          ? 'border-[#bbf7d0] bg-[#dcfce7]/20'
                          : 'border-[#e5e5e5] bg-[#f5f5f5]/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] font-semibold text-[#525252] bg-[#ffffff] px-1.5 py-0.5 rounded border border-[#e5e5e5]">
                          {evt.day}
                        </span>
                        <div>
                          <div className="font-semibold text-[#171717] tracking-tight">{evt.title}</div>
                          <div className="text-[10.5px] text-[#737373] font-medium">
                            {evt.date} · {evt.status}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div
                          className={`font-semibold tabular-nums ${
                            evt.type === 'inflow' ? 'text-[#16a34a]' : 'text-[#171717]'
                          }`}
                        >
                          {evt.type === 'inflow' ? '+Rp ' : '-Rp '}
                          {evt.amount.toLocaleString('id-ID')}
                        </div>

                        {evt.action && evt.actionHandler && (
                          <button
                            onClick={evt.actionHandler}
                            className="mt-0.5 text-[10px] font-semibold text-[#16a34a] hover:text-[#14532d] underline underline-offset-2 cursor-pointer"
                          >
                            {evt.action} →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            </>
          )}
        </main>
      </div>

      {/* Onboarding / Setup Context Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(data) => {
          setBusinessProfile(data);
          try {
            fetch('/api/onboard', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                business_name: data.businessName,
                archetype: data.archetype,
                bank_name: data.bankName,
                initial_cash: data.initialCash,
                safety_buffer: data.safetyBuffer,
                payroll_amount: data.payrollAmount,
                payroll_day: data.payrollDay,
                fixed_rent_amount: data.fixedRentAmount,
                daily_gross: data.dailyGross,
              }),
            }).catch(() => {});
          } catch (e) {
            // silent catch
          }
        }}
        initialData={businessProfile}
      />

      {/* Data Inbox Modal (Resolving Uncertain Mutations) */}
      <DataInboxModal
        isOpen={isDataInboxOpen}
        onClose={() => setIsDataInboxOpen(false)}
        onResolved={(item, category) => {
          try {
            fetch('/api/data-inbox/resolve', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ item_id: item.id, category }),
            }).catch(() => {});
          } catch (e) {
            // silent catch
          }
        }}
      />
    </div>
  );
};
