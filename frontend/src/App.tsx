import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DecisionStudio } from './components/DecisionStudio';
import { FeatureAgents } from './components/FeatureAgents';
import { ActionFeed } from './components/ActionFeed';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { TerminalDrawer } from './components/TerminalDrawer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { useAnimatedToastStack, AnimatedToastStack } from './components/motion/animated-toast-stack';
import { CommandPalette, type CommandItem } from './components/motion/command-palette';
import {
  SlidersHorizontal,
  TrendingUp,
  Activity,
  Shield,
  MessageSquareCode,
  HelpCircle,
  FileSpreadsheet,
  Volume2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PulseData {
  business_name: string;
  current_cash: number;
  safe_to_spend: number;
  safety_buffer: number;
  runway_days: number;
  daily_gross: number;
  baseline_trajectory: {
    days: number[];
    cash: number[];
  };
}

const PRESETS = [
  { id: 'espresso_cash', label: 'Beli Mesin Kopi Tunai', outflow: 14000000, dangerous: true },
  { id: 'hire_barista', label: 'Rekrut 1 Karyawan Baru', outflow: 0, dangerous: false },
  { id: 'bulk_coffee_discount', label: 'Ambil Promo Biji Kopi', outflow: 6000000, dangerous: true },
  { id: 'espresso_restructured', label: 'Mesin Kopi (DP 50% + Tempo)', outflow: 7000000, dangerous: false }
];

export function App() {
  const { toasts, showToast, dismissToast } = useAnimatedToastStack();

  const [pulse] = useState<PulseData>({
    business_name: 'Usaha Retail & F&B',
    current_cash: 18500000,
    safe_to_spend: 3800000,
    safety_buffer: 3000000,
    runway_days: 26,
    daily_gross: 900000,
    baseline_trajectory: {
      days: Array.from({ length: 31 }, (_, i) => i),
      cash: [18500000, 18860000, 19220000, 19580000, 19940000, 20300000, 13160000, 13520000, 13880000, 14240000, 14600000, 10760000, 11120000, 11480000, 11840000, 12200000, 17060000, 17420000, 17780000, 18140000, 18500000, 18860000, 19220000, 19580000, 19940000, 16300000, 16660000, 17020000, 17380000, 17740000, 18100000]
    }
  });

  const [activePreset, setActivePreset] = useState<string>('espresso_cash');
  const [scenarioCurve, setScenarioCurve] = useState<number[] | undefined>(undefined);
  const [insolvencyDay, setInsolvencyDay] = useState<number | null>(null);
  const [scenarioName, setScenarioName] = useState<string>('Beli Mesin Kopi Tunai (Rp 14 Jt)');

  const [voiceTranscript, setVoiceTranscript] = useState<string>(
    'Contoh: "Beli mesin espresso 14 juta tunai aman nggak?"'
  );

  // Terminal Logs
  const [logs, setLogs] = useState<string[]>([
    '[INIT] JagaUsaha runtime deployed on IDwebhost CloudBaik VPS.',
    '[DLMM] Loaded business ledger profile. Cash: Rp 18.500.000.',
    '[INVARIANT] Safe-to-Spend ("Duit Dingin") computed: Rp 3.800.000.',
    '[HERMES AGENT] Sensor & Guardian ready for real-time simulation.'
  ]);

  // WhatsApp Modal State
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title: string;
    recipient: string;
    text: string;
    type?: 'debt_collection' | 'supplier_negotiation';
  }>({
    isOpen: false,
    title: '',
    recipient: '',
    text: '',
    type: 'debt_collection'
  });

  const demoSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const runSimulation = async (presetId: string, amount?: number) => {
    setActivePreset(presetId);

    const match = PRESETS.find(p => p.id === presetId);
    const chosenAmount = amount !== undefined ? amount : (match ? match.outflow : 14000000);
    const currentName = match ? match.label : `Pengeluaran Rp ${chosenAmount.toLocaleString('id-ID')}`;
    setScenarioName(currentName);

    try {
      const res = await fetch('http://localhost:8000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preset_id: presetId, one_time_outflow: chosenAmount })
      });

      if (res.ok) {
        const data = await res.json();
        setScenarioCurve(data.trajectory.scenario);
        setInsolvencyDay(data.metrics.insolvency_day);

        if (data.metrics.is_safe) {
          showToast({
            title: 'Skenario Kas Terverifikasi Aman',
            description: `${currentName} aman dieksekusi tanpa risiko insolvensi.`,
            status: 'success',
          });
        } else {
          showToast({
            title: `Peringatan: Defisit Hari ke-${data.metrics.insolvency_day}`,
            description: `${currentName} memicu defisit sebelum jadwal gaji/tempo.`,
            status: 'error',
          });
        }

        const logMsg = data.metrics.is_safe
          ? `[AMAN] Skenario '${currentName}' lulus uji kas.`
          : `[RISIKO] Defisit kas pada Hari ke-${data.metrics.insolvency_day}! Min: Rp ${data.metrics.min_scenario_cash.toLocaleString('id-ID')}`;
        
        setLogs(prev => [logMsg, ...prev]);
        return;
      }
    } catch {
      // Fallback
    }

    setTimeout(() => {
      const base = pulse.baseline_trajectory.cash;
      const scen = base.map((c, idx) => idx === 0 ? c : Math.round(c - chosenAmount + (idx > 6 ? 100000 * idx : 0)));
      const crashIdx = scen.findIndex(c => c < 0);
      const crashDay = crashIdx !== -1 ? crashIdx : null;

      setScenarioCurve(scen);
      setInsolvencyDay(crashDay);
    }, 300);
  };

  useEffect(() => {
    runSimulation('espresso_cash', 14000000);
  }, []);

  // GSAP Smooth Scroll Progress & Sandbox Scrub
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Top Luminous Scroll Progress Bar
      gsap.to('#scroll-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.25,
        },
      });

      // 2. Decision Studio Sandbox Scrub Parallax Entrance
      gsap.fromTo(
        '#demo-sandbox',
        { y: 60, scale: 0.97, opacity: 0.75 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#demo-sandbox',
            start: 'top 88%',
            end: 'top 48%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleVoiceSim = () => {
    setVoiceTranscript('Memproses: "Beli mesin espresso 14 juta tunai aman nggak?"');
    setTimeout(() => {
      runSimulation('espresso_cash', 14000000);
    }, 600);
  };

  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#dashboard' || window.location.pathname === '/dashboard') return 'dashboard';
      if (window.location.hash === '#login' || window.location.pathname === '/login') return 'login';
    }
    return 'landing';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#dashboard') {
        setCurrentView('dashboard');
      } else if (window.location.hash === '#login') {
        setCurrentView('login');
      } else {
        setCurrentView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const goToLogin = () => {
    setCurrentView('login');
    window.location.hash = '#login';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goToDashboard = () => {
    setCurrentView('dashboard');
    window.location.hash = '#dashboard';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goToLanding = () => {
    setCurrentView('landing');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsAppNudge = (debtor: string, amount: number) => {
    setModalData({
      isOpen: true,
      title: 'Kolektor Bon Santun',
      recipient: debtor,
      text: `Halo Kak ${debtor}, semoga lancar selalu usahanya yaa 🙏\n\nSekadar mengingatkan rekonsiliasi kas mingguan dari tim operasional kami, ada catatan invoice tertunda sebesar *Rp ${amount.toLocaleString('id-ID')}* yang sudah jatuh tempo.\n\nBisa langsung transfer via QRIS: https://qris.id/pay/ID102003882910?amt=${amount}\n\nTerima kasih banyak atas kerjasamanya! 😊`,
      type: 'debt_collection'
    });
  };

  const openSupplierNegotiate = () => {
    setModalData({
      isOpen: true,
      title: 'Negosiasi Tempo Supplier',
      recipient: 'Toko Mesin Berkah',
      text: `Selamat siang Pak/Bu Toko Mesin Berkah, salam hangat dari kami 🙏\n\nTerkait penawaran unit *Mesin Espresso 2-Group* seharga *Rp 14.000.000*, kami sangat berminat ambil. Namun untuk menjaga likuiditas kas operasional kami, apakah memungkinkan jika kami bayarkan dengan skema *DP 50% (Rp 7.000.000) hari ini*, dan pelunasan sisanya tempo 30 hari?\n\nTerima kasih banyak atas pertimbangannya Pak/Bu! 🙏`,
      type: 'supplier_negotiation'
    });
  };

  const commandItems: CommandItem[] = [
    // Skenario Simulasi
    {
      id: 'cmd-espresso-cash',
      label: 'Beli Mesin Kopi Tunai (Rp 14 Jt)',
      group: 'Skenario Simulasi Kas',
      badge: 'Risiko Defisit',
      icon: SlidersHorizontal,
      keywords: ['mesin kopi', 'tunai', 'cash', '14 jt', 'defisit', 'beli'],
      onSelect: () => {
        runSimulation('espresso_cash', 14000000);
        scrollToDemo();
      },
    },
    {
      id: 'cmd-hire-barista',
      label: 'Rekrut 1 Karyawan Baru',
      group: 'Skenario Simulasi Kas',
      badge: 'Beban Rutin',
      icon: SlidersHorizontal,
      keywords: ['karyawan', 'barista', 'gaji', 'beban rutin', 'rekrut'],
      onSelect: () => {
        runSimulation('hire_barista', 0);
        scrollToDemo();
      },
    },
    {
      id: 'cmd-bulk-coffee',
      label: 'Ambil Promo Biji Kopi (Rp 6 Jt)',
      group: 'Skenario Simulasi Kas',
      badge: 'Risiko Defisit',
      icon: SlidersHorizontal,
      keywords: ['biji kopi', 'bahan baku', 'promo', 'supplier', '6 jt'],
      onSelect: () => {
        runSimulation('bulk_coffee_discount', 6000000);
        scrollToDemo();
      },
    },
    {
      id: 'cmd-espresso-restructure',
      label: 'Mesin Kopi DP 50% + Tempo (Rp 7 Jt)',
      group: 'Skenario Simulasi Kas',
      badge: 'Solusi Aman',
      icon: SlidersHorizontal,
      keywords: ['dp 50%', 'tempo', 'restrukturisasi', 'aman', 'solusi'],
      onSelect: () => {
        runSimulation('espresso_restructured', 7000000);
        scrollToDemo();
      },
    },
    {
      id: 'cmd-sewa-ruko',
      label: 'Sewa Ruko Tambahan (Rp 20 Jt)',
      group: 'Skenario Simulasi Kas',
      badge: 'Custom',
      icon: SlidersHorizontal,
      keywords: ['sewa', 'ruko', 'cabang', '20 jt'],
      onSelect: () => {
        runSimulation('custom', 20000000);
        scrollToDemo();
      },
    },
    {
      id: 'cmd-beli-grinder',
      label: 'Beli Grinder Kopi Baru (Rp 4.5 Jt)',
      group: 'Skenario Simulasi Kas',
      badge: 'Custom',
      icon: SlidersHorizontal,
      keywords: ['grinder', 'alat', '4.5 jt', 'belanja'],
      onSelect: () => {
        runSimulation('custom', 4500000);
        scrollToDemo();
      },
    },

    // Navigasi Bagian
    {
      id: 'cmd-nav-agents',
      label: 'Arsitektur 3 Agen (Sensor, Simulator, Advisor)',
      group: 'Navigasi Langsung',
      icon: Activity,
      keywords: ['agent', 'arsitektur', 'sensor', 'simulator', 'advisor', 'cara kerja'],
      onSelect: () => scrollToSection('feature-agents'),
    },
    {
      id: 'cmd-nav-sandbox',
      label: 'Simulator Kas (Decision Sandbox)',
      group: 'Navigasi Langsung',
      icon: TrendingUp,
      keywords: ['simulator', 'sandbox', 'chart', 'grafik', 'kas'],
      onSelect: () => scrollToSection('demo-sandbox'),
    },
    {
      id: 'cmd-nav-action-feed',
      label: 'Tindakan Taktis & Tagihan Bon',
      group: 'Navigasi Langsung',
      icon: FileSpreadsheet,
      keywords: ['tindakan', 'tagihan', 'bon', 'tempo', 'supplier'],
      onSelect: () => scrollToSection('action-feed'),
    },
    {
      id: 'cmd-nav-faq',
      label: 'Tanya Jawab & Keamanan (FAQ)',
      group: 'Navigasi Langsung',
      icon: HelpCircle,
      keywords: ['faq', 'pertanyaan', 'keamanan', 'software', 'akuntansi'],
      onSelect: () => scrollToSection('faq'),
    },

    // Aksi Cepat
    {
      id: 'cmd-act-voice',
      label: 'Uji Voice Note WhatsApp',
      group: 'Aksi Cepat',
      badge: 'Voice AI',
      icon: Volume2,
      keywords: ['voice', 'suara', 'whatsapp', 'audio', 'rekam'],
      onSelect: () => handleVoiceSim(),
    },
    {
      id: 'cmd-act-negotiate',
      label: 'Draf Negosiasi Supplier WhatsApp',
      group: 'Aksi Cepat',
      badge: 'WhatsApp',
      icon: MessageSquareCode,
      keywords: ['whatsapp', 'negosiasi', 'supplier', 'chat'],
      onSelect: () => openSupplierNegotiate(),
    },
    {
      id: 'cmd-act-reset',
      label: 'Reset Parameter Simulasi ke Default',
      group: 'Aksi Cepat',
      icon: Shield,
      keywords: ['reset', 'kembali', 'default'],
      onSelect: () => runSimulation('espresso_cash', 14000000),
    },
  ];

  if (currentView === 'login') {
    return (
      <>
        <LoginPage
          onBackToHome={goToLanding}
          onLoginSuccess={(email) => {
            showToast({
              title: 'Login Berhasil!',
              description: `Selamat datang di Dashboard JagaUsaha, ${email}!`,
              status: 'success',
            });
            goToDashboard();
          }}
        />
        <AnimatedToastStack
          toasts={toasts}
          onDismiss={dismissToast}
          position="bottom-right"
        />
      </>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <>
        <DashboardPage
          onLogout={() => {
            showToast({
              title: 'Logout Berhasil',
              description: 'Sesi aman berakhir. Kembali ke beranda.',
              status: 'info',
            });
            goToLanding();
          }}
          onOpenWhatsAppModal={(data) => setModalData({ isOpen: true, ...data })}
          currentCash={pulse.current_cash}
          safeToSpend={pulse.safe_to_spend}
          safetyBuffer={pulse.safety_buffer}
          runwayDays={pulse.runway_days}
          dailyGross={pulse.daily_gross}
          baselineDays={pulse.baseline_trajectory.days}
          baselineCash={pulse.baseline_trajectory.cash}
          scenarioCash={scenarioCurve}
          insolvencyDay={insolvencyDay}
          scenarioName={scenarioName}
          activePreset={activePreset}
          presets={PRESETS}
          onSelectPreset={runSimulation}
          onOpenCommandPalette={() => setIsCommandOpen(true)}
        />
        <WhatsAppModal
          isOpen={modalData.isOpen}
          onClose={() => setModalData((prev) => ({ ...prev, isOpen: false }))}
          title={modalData.title}
          recipientName={modalData.recipient}
          whatsappText={modalData.text}
          type={modalData.type}
        />
        <AnimatedToastStack
          toasts={toasts}
          onDismiss={dismissToast}
          position="bottom-right"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 antialiased relative">
      {/* Top Luminous GSAP Scroll Progress Bar */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 z-[100] w-full scale-x-0 origin-left pointer-events-none shadow-xs shadow-emerald-500/20"
      />

      <Header
        onReset={() => runSimulation('espresso_cash', 14000000)}
        isLoading={false}
        onScrollToSection={scrollToSection}
        onOpenCommandPalette={() => setIsCommandOpen(true)}
        onOpenLogin={goToLogin}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        open={isCommandOpen}
        onOpenChange={setIsCommandOpen}
        items={commandItems}
      />

      <main className="flex-1 w-full space-y-12 sm:space-y-16">
        {/* 1. Hero Section (Hook & Problem/Solution Context) */}
        <HeroSection
          onScrollToDemo={() => scrollToSection('demo-sandbox')}
          onStartTrial={goToLogin}
        />

        {/* 2. Closed-Loop Multi-Agent Architecture (01 Ingest -> 02 Simulate -> 03 Act) */}
        <FeatureAgents />

        {/* 3. Live Interactive Decision Studio Sandbox */}
        <section ref={demoSectionRef} id="demo-sandbox" className="max-w-5xl mx-auto px-4 sm:px-6 scroll-mt-24">
          <DecisionStudio
            currentCash={pulse.current_cash}
            safeToSpend={pulse.safe_to_spend}
            safetyBuffer={pulse.safety_buffer}
            runwayDays={pulse.runway_days}
            dailyGross={pulse.daily_gross}
            baselineDays={pulse.baseline_trajectory.days}
            baselineCash={pulse.baseline_trajectory.cash}
            scenarioCash={scenarioCurve}
            insolvencyDay={insolvencyDay}
            scenarioName={scenarioName}
            activePreset={activePreset}
            presets={PRESETS}
            voiceTranscript={voiceTranscript}
            onSelectPreset={runSimulation}
            onTriggerVoiceSim={handleVoiceSim}
            onOpenNegotiate={openSupplierNegotiate}
            onApplySafeSolution={() => runSimulation('espresso_restructured', 7000000)}
          />
        </section>

        {/* 4. Priority Tactical Actions (Real Daily Interventions) */}
        <section id="action-feed" className="max-w-5xl mx-auto px-4 sm:px-6 scroll-mt-24">
          <ActionFeed
            onOpenNudge={openWhatsAppNudge}
            onOpenNegotiate={openSupplierNegotiate}
            onOpenAuditPrive={() => {
              showToast({
                title: 'Audit Prive Terjadwal',
                description: 'Aturan pemisahan rekening pribadi & operasional BCA telah diaktifkan.',
                status: 'info',
              });
            }}
          />
        </section>

        {/* 5. Transparansi Arsitektur & Keamanan (FAQ) */}
        <FAQSection />

        {/* 6. Final Call to Action */}
        <FinalCTA onStart={goToLogin} />

        {/* 7. VPS Telemetry & Audit Logs */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <TerminalDrawer logs={logs} />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Action Modal */}
      <WhatsAppModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
        title={modalData.title}
        recipientName={modalData.recipient}
        whatsappText={modalData.text}
        type={modalData.type}
      />

      {/* beUI Animated Toast Stack Notifications */}
      <AnimatedToastStack
        toasts={toasts}
        onDismiss={dismissToast}
        position="bottom-right"
      />
    </div>
  );
}

export default App;
