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
} from 'lucide-react';
import { JagaUsahaLogo } from './ui/JagaUsahaLogo';
import { BoardUIAreaChart } from './BoardUIAreaChart';
import { AnimatedNumber } from './motion/number';
import { AnimatedBadge } from './motion/animated-badge';
import { DashboardSimulatorView } from './dashboard/DashboardSimulatorView';
import { DashboardAgendaView } from './dashboard/DashboardAgendaView';
import { DashboardAgentsView } from './dashboard/DashboardAgentsView';
import { DashboardMemoryView } from './dashboard/DashboardMemoryView';
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
  const [activeNav, setActiveNav] = useState<'overview' | 'simulator' | 'agenda' | 'agents' | 'memory'>('overview');
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row font-sans selection:bg-emerald-200 selection:text-emerald-950 antialiased">
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR NAVIGATION (Linear / Stripe / Mercury Grade Layout)       */}
      {/* ========================================================================= */}
      <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 md:h-screen md:sticky md:top-0 z-30">
        {/* Top Workspace Header */}
        <div className="p-5 border-b border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <JagaUsahaLogo size={32} showWordmark={true} />
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              v1.0
            </span>
          </div>

          {/* Workspace Identity Card (Linear / Stripe Standard) */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <div className="h-7 w-7 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-2xs">
                  {businessProfile.businessName.slice(0, 2).toUpperCase()}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {businessProfile.businessName}
                  </div>
                  <div className="text-[10.5px] text-slate-500 font-medium capitalize">
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

              <span className="text-[10px] font-bold text-slate-600 bg-slate-200/70 px-1.5 py-0.5 rounded-md shrink-0">
                UMKM
              </span>
            </div>

            {/* Ubah Parameter Usaha Trigger */}
            <button
              type="button"
              onClick={() => setIsOnboardingOpen(true)}
              className="w-full py-1.5 px-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/90 text-[10.5px] font-semibold text-slate-700 hover:text-slate-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="h-3 w-3 text-emerald-600" />
              <span>Ubah Parameter Usaha</span>
            </button>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Main Views */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama
            </div>

            <button
              onClick={() => setActiveNav('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeNav === 'overview'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              <LayoutDashboard className={`h-4 w-4 ${activeNav === 'overview' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Ringkasan Kas & Sandbox</span>
            </button>

            <button
              onClick={() => setActiveNav('simulator')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeNav === 'simulator'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              <SlidersHorizontal className={`h-4 w-4 ${activeNav === 'simulator' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Simulasi Keputusan</span>
            </button>

            <button
              onClick={() => setActiveNav('agenda')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeNav === 'agenda'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              <Receipt className={`h-4 w-4 ${activeNav === 'agenda' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Agenda Kas 14H</span>
            </button>

            <button
              onClick={() => setActiveNav('agents')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeNav === 'agents'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              <Bot className={`h-4 w-4 ${activeNav === 'agents' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Log Sensor & AI Guardian</span>
            </button>

            <button
              onClick={() => setActiveNav('memory')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeNav === 'memory'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              <History className={`h-4 w-4 ${activeNav === 'memory' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Memori Keputusan & Outcome</span>
            </button>
          </div>

          {/* Data Inbox Quick Review Card */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsDataInboxOpen(true)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 text-amber-950 transition-all cursor-pointer shadow-2xs"
            >
              <span className="flex items-center gap-2 text-xs font-bold">
                <Inbox className="h-4 w-4 text-amber-700" />
                <span>Data Inbox (2 Transaksi)</span>
              </span>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                Review
              </span>
            </button>
          </div>

          {/* Quick Scenario Sidebar Shortlist */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Uji Skenario Belanja</span>
              <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1 rounded font-bold">Instan</span>
            </div>

            <div className="space-y-1">
              {presets.map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setActiveNav('overview');
                      onSelectPreset(preset.id, preset.outflow);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border border-emerald-300/80 text-emerald-950 font-bold shadow-2xs'
                        : 'hover:bg-slate-100/70 border border-transparent text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{preset.label}</span>
                      {preset.dangerous && (
                        <span className="text-[9px] font-bold text-rose-700 bg-rose-100 px-1 py-0.2 rounded">
                          Risiko
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {preset.outflow > 0 ? `Rp ${(preset.outflow / 1_000_000).toFixed(1)} Jt` : 'Beban Rutin'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sidebar User Profile & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 truncate">
              <div className="h-8 w-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                OB
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-slate-900 leading-tight">Owner Bisnis</div>
                <div className="text-[10.5px] text-slate-500 truncate">owner@kopiteras.id</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
        {/* Sticky Top Bar for Content */}
        <header className="sticky top-0 z-20 h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl px-5 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
              {activeNav === 'overview' && 'Ringkasan Keamanan Kas & Sandbox'}
              {activeNav === 'simulator' && 'Simulasi Keputusan Belanja Modal'}
              {activeNav === 'agenda' && 'Agenda Arus Kas Kritis 14 Hari'}
              {activeNav === 'agents' && 'Log Sensor & Arsitektur Guardian'}
              {activeNav === 'memory' && 'Memori Keputusan & Hasil Nyata (Business Memory)'}
            </h1>
            <span className="hidden sm:inline-block text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live Real-Time
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs text-slate-500 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>Cari...</span>
              <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold text-slate-600">
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

            {/* Parameter Usaha Quick Action */}
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-all cursor-pointer shadow-2xs"
              title="Atur parameter profil usaha (archetype, kas awal, komitmen rutin)"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Parameter Usaha</span>
            </button>

            {/* Back to Home Shortcut */}
            <button
              onClick={onLogout}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Beranda</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-5 sm:p-8 space-y-6 sm:space-y-8 flex-1">
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

          {activeNav === 'overview' && (
            <>
              {/* A. Top 4-Pillar Financial KPI Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Saldo Kas Aktif */}
            <div className="rounded-2xl border border-blue-200/90 bg-gradient-to-br from-blue-50/60 via-white to-white p-5 shadow-xs flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-blue-100 text-blue-700">
                    <Wallet className="h-3.5 w-3.5" />
                  </div>
                  Kas Rekening BCA
                </span>
                <AnimatedBadge status="info" size="sm">
                  Live Sinkron
                </AnimatedBadge>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight flex items-baseline gap-1">
                <span className="text-base font-semibold text-slate-500">Rp</span>
                <AnimatedNumber value={currentCash} duration={0.8} />
              </div>
              <div className="text-[11.5px] text-slate-700 font-medium border-t border-blue-100/80 pt-2 flex justify-between">
                <span>Cadangan Darurat:</span>
                <strong className="text-slate-900 font-bold">Rp {safetyBuffer.toLocaleString('id-ID')}</strong>
              </div>
            </div>

            {/* Card 2: Duit Dingin Aman (Safe-to-Spend) */}
            <div className="rounded-2xl border border-emerald-300/90 bg-gradient-to-br from-emerald-50/70 via-white to-white p-5 shadow-xs flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  Duit Dingin Aman
                </span>
                <AnimatedBadge status="success" size="sm">
                  Safe-to-Spend
                </AnimatedBadge>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight flex items-baseline gap-1">
                <span className="text-base font-semibold text-emerald-700">Rp</span>
                <AnimatedNumber value={safeToSpend} duration={0.8} />
              </div>
              <div className="text-[11.5px] text-emerald-950 font-medium border-t border-emerald-200/70 pt-2 flex justify-between">
                <span>Batas Belanja Bebas:</span>
                <strong className="text-emerald-900 font-bold">100% Aman Gaji</strong>
              </div>
            </div>

            {/* Card 3: Runway Kas Operasional */}
            <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/50 via-white to-white p-5 shadow-xs flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-indigo-100 text-indigo-700">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  Runway Kas
                </span>
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                  Horizon 30H
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 tracking-tight flex items-baseline gap-1">
                <span>{runwayDays}</span>
                <span className="text-sm font-semibold text-slate-500">Hari Aman</span>
              </div>
              <div className="text-[11px] text-slate-600 font-normal border-t border-indigo-100/60 pt-2 flex justify-between">
                <span>Ketahanan Operasional:</span>
                <strong className="text-indigo-900">Optimal</strong>
              </div>
            </div>

            {/* Card 4: Net Inflow Harian */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-slate-100 text-slate-700">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  Omset Rata-Rata
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Inflow Stabil
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1">
                <span className="text-base font-semibold text-slate-400">Rp</span>
                <AnimatedNumber value={dailyGross} duration={0.8} />
                <span className="text-xs font-medium text-slate-400">/hari</span>
              </div>
              <div className="text-[11px] text-slate-500 font-normal border-t border-slate-100 pt-2 flex justify-between">
                <span>Margin Bersih:</span>
                <strong className="text-slate-800">51.1% Operasional</strong>
              </div>
            </div>
          </div>

          {/* B. Skenario Belanja Quick Selector Strip */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                  <span>Uji Skenario Belanja Modal (Interactive Sandbox)</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Pilih skenario di bawah ini untuk melihat simulasi dampaknya terhadap saldo kas dan hari gajian:
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Status Hasil:</span>
                <AnimatedBadge status={isSafe ? 'success' : 'danger'} size="sm" pulse={!isSafe}>
                  {isSafe ? 'Kas Aman' : `Peringatan Defisit H+${insolvencyDay || 6}`}
                </AnimatedBadge>
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
                    className={`p-3.5 rounded-xl border text-left transition-all duration-150 active:scale-[0.98] cursor-pointer flex flex-col justify-between h-full ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-md ring-2 ring-neutral-900/10'
                        : isDangerous
                        ? 'border-rose-200/80 bg-rose-50/20 hover:bg-rose-50/50 hover:border-rose-300 text-slate-900'
                        : isRecommended
                        ? 'border-emerald-200/80 bg-emerald-50/20 hover:bg-emerald-50/50 hover:border-emerald-300 text-slate-900'
                        : 'border-slate-200/80 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            isSelected
                              ? 'bg-neutral-800 text-neutral-200 border-neutral-700'
                              : isDangerous
                              ? 'bg-rose-100 text-rose-800 border-rose-200'
                              : isRecommended
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {isDangerous ? 'Risiko Defisit' : isRecommended ? 'Solusi Aman' : 'Beban Rutin'}
                        </span>
                      </div>

                      <div className="text-xs font-bold tracking-tight">{preset.label}</div>
                    </div>

                    <div
                      className={`text-xs tabular-nums mt-2.5 font-semibold ${
                        isSelected ? 'text-neutral-300' : 'text-slate-600'
                      }`}
                    >
                      {preset.outflow > 0 ? `Rp ${(preset.outflow / 1_000_000).toFixed(1)} Jt` : 'Beban Rutin'}
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
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    Analisis Risiko Deterministik
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">DLMM Core v1.0</span>
                </div>

                {!isSafe ? (
                  <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs">
                      <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                      <span>PERINGATAN: Defisit Kas Hari ke-{insolvencyDay || 6}</span>
                    </div>
                    <p className="text-xs text-rose-800 leading-relaxed font-normal">
                      Pengeluaran <strong>{scenarioName}</strong> akan menyebabkan kas defisit{' '}
                      <strong className="text-rose-950 font-bold">
                        -Rp {Math.abs(minCash).toLocaleString('id-ID')}
                      </strong>{' '}
                      saat jadwal gajian barista (H+6) dan tempo kopi (H+11).
                    </p>
                    <div className="pt-1 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => onSelectPreset('espresso_restructured', 7000000)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white py-2 px-3 text-xs font-semibold shadow-xs cursor-pointer active:scale-95"
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
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 py-2 px-3 text-xs font-semibold cursor-pointer active:scale-95"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Draf WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Keputusan Aman: Likuiditas Terlindungi</span>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed font-normal">
                      Keputusan <strong>{scenarioName}</strong> sepenuhnya aman dieksekusi. Saldo kas terendah Anda tetap
                      berada di atas batas aman cadangan Rp {safetyBuffer.toLocaleString('id-ID')}.
                    </p>
                  </div>
                )}
              </div>

              {/* Box B: Scheduled Cash Events Timeline */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    Agenda Kas Kritis 14 Hari ke Depan
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">4 Komitmen</span>
                </div>

                <div className="space-y-2">
                  {scheduledEvents.map((evt, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors ${
                        evt.warning
                          ? 'border-rose-300 bg-rose-50/60'
                          : evt.type === 'inflow'
                          ? 'border-emerald-200/70 bg-emerald-50/20'
                          : 'border-slate-200 bg-slate-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] font-bold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {evt.day}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 tracking-tight">{evt.title}</div>
                          <div className="text-[10.5px] text-slate-500 font-medium">
                            {evt.date} · {evt.status}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div
                          className={`font-bold tabular-nums ${
                            evt.type === 'inflow' ? 'text-emerald-700' : 'text-slate-900'
                          }`}
                        >
                          {evt.type === 'inflow' ? '+Rp ' : '-Rp '}
                          {evt.amount.toLocaleString('id-ID')}
                        </div>

                        {evt.action && evt.actionHandler && (
                          <button
                            onClick={evt.actionHandler}
                            className="mt-0.5 text-[10px] font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
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
