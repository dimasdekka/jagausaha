import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PulseCards } from './components/PulseCards';
import { BoardUIAreaChart } from './components/BoardUIAreaChart';
import { BoardUIAgentThinking, type ThinkingStep } from './components/BoardUIAgentThinking';
import { FeatureAgents } from './components/FeatureAgents';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { ActionFeed } from './components/ActionFeed';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { TerminalDrawer } from './components/TerminalDrawer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { MatrixOrb, type MatrixOrbState } from './components/ui/matrix-orb';
import { Mic, ArrowRight, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

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
  { id: 'espresso_cash', label: 'Beli Mesin Espresso Rp 14 Jt', outflow: 14000000, dangerous: true },
  { id: 'hire_barista', label: 'Rekrut 1 Barista Rp 2.2 Jt/bln', outflow: 0, delta: 2200000, dangerous: false },
  { id: 'bulk_coffee_discount', label: 'Promo Biji Kopi 10 Sak Rp 6 Jt', outflow: 6000000, dangerous: true },
  { id: 'espresso_restructured', label: 'Mesin Espresso (DP 50% + Tempo)', outflow: 7000000, dangerous: false }
];

export function App() {
  const [pulse] = useState<PulseData>({
    business_name: 'Kopi Teras Barokah',
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
  const [scenarioName, setScenarioName] = useState<string>('Beli Mesin Espresso Rp 14 Jt');

  // Matrix Orb Voice States
  const [orbState, setOrbState] = useState<MatrixOrbState>('idle');
  const [voiceTranscript, setVoiceTranscript] = useState<string>('Tanyakan keputusan bisnis kepada JagaUsaha...');

  // Thinking Steps
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([
    { id: '1', label: 'Normalisasi Arus Kas & Estimasi HPP (60%)', status: 'completed', detail: 'Net inflow harian: Rp 360.000/hari' },
    { id: '2', label: 'Verifikasi Komitmen Terjadwal (H+6 Gaji, H+11 Tempo)', status: 'completed', detail: 'Komitmen 14 hari: Rp 11.700.000' },
    { id: '3', label: 'Evaluasi Invariant Safe-to-Spend & Kebangkrutan', status: 'completed', detail: 'Duit Dingin aman: Rp 3.800.000' }
  ]);

  // Terminal Logs
  const [logs, setLogs] = useState<string[]>([
    '[INIT] JagaUsaha runtime deployed on IDwebhost CloudBaik VPS.',
    '[DLMM] Loaded business profile: Kopi Teras Barokah. Cash: Rp 18.500.000.',
    '[INVARIANT] Safe-to-Spend ("Duit Dingin") computed: Rp 3.800.000.',
    '[HERMES AGENT] Sensor & Guardian ready for real-time simulation.'
  ]);

  // WhatsApp Modal
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

  const runSimulation = async (presetId: string, amount?: number) => {
    setActivePreset(presetId);
    setOrbState('thinking');

    const match = PRESETS.find(p => p.id === presetId);
    const chosenAmount = amount !== undefined ? amount : (match ? match.outflow : 14000000);
    const currentName = match ? match.label : `Pengeluaran Rp ${chosenAmount.toLocaleString('id-ID')}`;
    setScenarioName(currentName);

    setThinkingSteps([
      { id: '1', label: 'Mengisolasi State Vector Kas...', status: 'running' },
      { id: '2', label: 'Mencabangkan Horizon 30 Hari...', status: 'pending' },
      { id: '3', label: 'Mengevaluasi Batas Defisit Kas...', status: 'pending' }
    ]);

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

        setThinkingSteps([
          { id: '1', label: 'State Vector Normalisasi Selesai', status: 'completed', detail: `Kas awal: Rp ${pulse.current_cash.toLocaleString('id-ID')}` },
          { id: '2', label: 'Proyeksi 30 Hari Selesai Dihitung', status: 'completed', detail: `Kas minimum: Rp ${data.metrics.min_scenario_cash.toLocaleString('id-ID')}` },
          { id: '3', label: data.metrics.is_safe ? 'Invariant Terpenuhi: Kas Aman' : 'ALARM: Invariant Kebangkrutan Terlanggar!', status: data.metrics.is_safe ? 'completed' : 'failed', detail: data.metrics.breaches.join(' | ') || 'Tidak ada pelanggaran' }
        ]);

        const logMsg = data.metrics.is_safe
          ? `[AMAN] Skenario '${currentName}' lulus simulasi kas.`
          : `[CRASH DETECTED] Defisit kas pada Hari ke-${data.metrics.insolvency_day}! Min: Rp ${data.metrics.min_scenario_cash.toLocaleString('id-ID')}`;
        
        setLogs(prev => [logMsg, ...prev]);
        setOrbState('idle');
        return;
      }
    } catch {
      // Local fallback
    }

    setTimeout(() => {
      const isBad = chosenAmount > pulse.safe_to_spend;
      const base = pulse.baseline_trajectory.cash;
      const scen = base.map((c, idx) => idx === 0 ? c : Math.round(c - chosenAmount + (idx > 6 ? 100000 * idx : 0)));
      const crashIdx = scen.findIndex(c => c < 0);
      const crashDay = crashIdx !== -1 ? crashIdx : null;

      setScenarioCurve(scen);
      setInsolvencyDay(crashDay);
      setThinkingSteps([
        { id: '1', label: 'State Vector Normalisasi Selesai', status: 'completed', detail: 'Local DLMM Core v1.0' },
        { id: '2', label: 'Proyeksi 30 Hari Selesai Dihitung', status: 'completed', detail: `Pengeluaran: Rp ${chosenAmount.toLocaleString('id-ID')}` },
        { id: '3', label: !isBad ? 'Kas Aman' : 'Defisit Terdeteksi!', status: !isBad ? 'completed' : 'failed', detail: crashDay ? `Kas minus pada Hari ke-${crashDay}` : 'Cadangan aman tergerus' }
      ]);
      setOrbState('idle');
    }, 500);
  };

  useEffect(() => {
    runSimulation('espresso_cash', 14000000);
  }, []);

  const handleVoiceSim = () => {
    setOrbState('listening');
    setVoiceTranscript('"Mas JagaUsaha, kalau beli mesin espresso Rp 14 juta cash aman nggak?"');
    setTimeout(() => {
      runSimulation('espresso_cash', 14000000);
    }, 1800);
  };

  const openWhatsAppNudge = (debtor: string, amount: number) => {
    setModalData({
      isOpen: true,
      title: 'Kolektor Bon Santun',
      recipient: debtor,
      text: `Halo Kak ${debtor}, semoga lancar selalu usahanya yaa 🙏\n\nSekadar mengingatkan rekonsiliasi kas mingguan dari Kopi Teras Barokah, ada catatan invoice tertunda sebesar *Rp ${amount.toLocaleString('id-ID')}* yang sudah jatuh tempo.\n\nBisa langsung transfer via QRIS: https://qris.id/pay/ID102003882910?amt=${amount}\n\nTerima kasih banyak atas kerjasamanya! 😊`,
      type: 'debt_collection'
    });
  };

  const openSupplierNegotiate = (supplier: string, item: string, amount: number) => {
    setModalData({
      isOpen: true,
      title: 'Negosiasi Tempo Supplier',
      recipient: supplier,
      text: `Selamat siang Pak/Bu ${supplier}, salam dari Kopi Teras Barokah 🙏\n\nTerkait penawaran *${item}* seharga *Rp ${amount.toLocaleString('id-ID')}*, kami berminat ambil. Namun untuk menjaga likuiditas operasional kami, apakah memungkinkan jika *DP 50% (Rp ${(amount/2).toLocaleString('id-ID')}) hari ini*, dan pelunasan sisanya tempo 30 hari?\n\nTerima kasih banyak atas pertimbangannya Pak/Bu! 🙏`,
      type: 'supplier_negotiation'
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-neutral-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased">
      <Header businessName={pulse.business_name} onReset={() => runSimulation('espresso_cash', 14000000)} isLoading={false} />

      <main className="flex-1 w-full space-y-16">
        {/* 1. Hero Section */}
        <HeroSection onScrollToDemo={scrollToDemo} />

        {/* 2. Interactive Product Demo (Handhold "See in action") */}
        <section ref={demoSectionRef} className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-card space-y-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-100">
              <div className="space-y-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>See JagaUsaha in Action</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">
                  Kotak Simulasi: "Bisa Beli Nggak?"
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Uji skenario belanja terhadap komitmen gaji dan tempo supplier secara instan.
                </p>
              </div>

              {/* Matrix Orb Voice Core */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3 sm:px-4 sm:py-2.5 shadow-sm">
                <div
                  onClick={handleVoiceSim}
                  className="cursor-pointer group flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                  title="Klik untuk Simulasi Suara"
                >
                  <MatrixOrb
                    state={orbState}
                    size={76}
                    color={insolvencyDay ? '#E11D48' : '#059669'}
                    dots={10}
                  />
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xs text-neutral-700 font-medium max-w-xs truncate">
                    {voiceTranscript}
                  </p>
                  <button
                    onClick={handleVoiceSim}
                    className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-1 text-[11px] font-medium transition-all shadow-sm active:scale-95"
                  >
                    <Mic className="h-3 w-3 text-emerald-400" />
                    <span>Coba Voice Note</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Vitals */}
            <PulseCards
              safeToSpend={pulse.safe_to_spend}
              currentCash={pulse.current_cash}
              runwayDays={pulse.runway_days}
              dailyGross={pulse.daily_gross}
              safetyBuffer={pulse.safety_buffer}
            />

            {/* Presets */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Pilih Skenario Keputusan:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => runSimulation(preset.id, preset.outflow)}
                    className={`text-xs px-4 py-2.5 rounded-full border transition-all duration-150 active:scale-95 font-medium ${
                      activePreset === preset.id
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Danger / Safe Banner */}
            {insolvencyDay ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 text-rose-600">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-rose-900 tracking-tight">
                      Jangan eksekusi pembelian tunai sekarang
                    </h4>
                    <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                      Kas diproyeksikan <b>minus pada Hari ke-{insolvencyDay}</b> akibat benturan gaji karyawan (H+6 Rp 7.5M) dan tempo supplier (H+11 Rp 4.2M).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => runSimulation('espresso_restructured', 7000000)}
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 text-xs font-semibold transition-all shadow-sm active:scale-95"
                >
                  <span>Pilih Rekomendasi Aman (DP 50%)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0" />
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  <b>Keputusan Aman:</b> Cadangan kas minimum tetap terjaga di atas buffer Rp 3.000.000 sepanjang 30 hari ke depan.
                </p>
              </div>
            )}

            {/* BoardUI Chart & AgentThinking */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <BoardUIAreaChart
                  days={pulse.baseline_trajectory.days}
                  baseline={pulse.baseline_trajectory.cash}
                  scenario={scenarioCurve}
                  insolvencyDay={insolvencyDay}
                  scenarioName={scenarioName}
                  safetyBuffer={pulse.safety_buffer}
                  safeToSpend={pulse.safe_to_spend}
                />
              </div>
              <div className="lg:col-span-4">
                <BoardUIAgentThinking steps={thinkingSteps} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Feature Agents */}
        <FeatureAgents />

        {/* 4. How It Works + Custom Simulator Generator */}
        <HowItWorks onSimulateCustom={(_name) => runSimulation('espresso_cash', 14000000)} />

        {/* 5. Customer Testimonials */}
        <Testimonials />

        {/* 6. Action Feed Deck */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <ActionFeed onOpenNudge={openWhatsAppNudge} onOpenNegotiate={openSupplierNegotiate} />
        </section>

        {/* 7. FAQ Accordion */}
        <FAQSection />

        {/* 8. White-Glove Final CTA */}
        <FinalCTA onStart={scrollToDemo} />

        {/* 9. Telemetry Drawer */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <TerminalDrawer logs={logs} />
        </section>
      </main>

      {/* 10. Handhold-Style Clean Footer */}
      <Footer />

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
        title={modalData.title}
        recipientName={modalData.recipient}
        whatsappText={modalData.text}
        type={modalData.type}
      />
    </div>
  );
}

export default App;
