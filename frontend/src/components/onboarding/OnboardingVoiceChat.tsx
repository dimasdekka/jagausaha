import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  CheckCircle2,
  ArrowRight,
  Bot,
  User,
  ShieldCheck,
  Building,
  CreditCard,
  Calendar,
  AlertTriangle,
  Edit2,
  Check,
} from 'lucide-react';
import { ThinkingOrb, type OrbState } from 'thinking-orbs';
import { MotionButton } from '../motion/button';
import type { BusinessContextData } from '../OnboardingModal';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

interface OnboardingVoiceChatProps {
  onComplete: (data: BusinessContextData) => void;
}

export const OnboardingVoiceChat: React.FC<OnboardingVoiceChatProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      role: 'assistant',
      content:
        'Halo! Saya AI Guardian JagaUsaha. Mari kita siapkan radar keuangan usaha Anda secara santai. Boleh sebutkan, bidang usaha apa yang sedang Anda jalankan?',
      timestamp: 'Baru saja',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [orbState, setOrbState] = useState<OrbState>('breathing');
  const [isTyping, setIsTyping] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const [extractedData, setExtractedData] = useState<any>({
    business_name: '',
    archetype: 'fnb',
    bank_name: 'BCA',
    initial_cash: 0,
    safety_buffer: 0,
    payroll_amount: 0,
    payroll_day: 30,
    fixed_rent_amount: 0,
    daily_gross: 0,
    safe_to_spend: 0,
  });

  const [quickReplies, setQuickReplies] = useState<string[]>([
    'Kafe, Resto & F&B',
    'Retail Fashion & Olshop',
    'Warung & Toko Sembako',
    'Jasa & Agensi Kreatif',
  ]);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Check for Web Speech API support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = true;
      recog.lang = 'id-ID';

      recog.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputVal(transcript);
      };

      recog.onerror = () => {
        setIsListening(false);
        setOrbState('breathing');
        clearInterval(timerRef.current);
      };

      recog.onend = () => {
        setIsListening(false);
        setOrbState('breathing');
        clearInterval(timerRef.current);
      };

      recognitionRef.current = recog;
    }
  }, []);

  // Text to Speech playback for AI assistant
  const speakText = (text: string) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch {
      // silent fallback
    }
  };

  // Toggle voice recognition
  const toggleListening = () => {
    if (!speechSupported) {
      // Browser doesn't support Web Speech API, use prompt simulation
      setInputVal(
        'Usaha saya kedai kopi Kopi Nusa di Serang, saldo kas BCA 25 juta, omset 1,2 juta/hari, gaji 4 barista 8 juta tiap tgl 30.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setOrbState('breathing');
      clearInterval(timerRef.current);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        setOrbState('listening');
        setRecordingSeconds(0);
        timerRef.current = setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
      } catch {
        setIsListening(false);
      }
    }
  };

  // Send message and get AI response
  const sendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      clearInterval(timerRef.current);
    }

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputVal('');
    setIsTyping(true);
    setOrbState('solving');

    try {
      const res = await fetch('/api/ai/onboarding-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, aiMsg]);
        if (data.extracted_data) {
          setExtractedData(data.extracted_data);
        }
        if (data.quick_replies && data.quick_replies.length > 0) {
          setQuickReplies(data.quick_replies);
        }
        speakText(data.reply);
      } else {
        throw new Error('Fallback required');
      }
    } catch {
      // Local graceful fallback
      const fallbackReply =
        'Profil usaha tercatat! AI memetakan parameter operasional bisnis Anda untuk Digital Twin kas.';
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      speakText(fallbackReply);
    } finally {
      setIsTyping(false);
      setOrbState('breathing');
    }
  };

  // Inline editing states for rapid correction
  const [isEditingNameInline, setIsEditingNameInline] = useState(false);
  const [inlineNameVal, setInlineNameVal] = useState('');
  const [isEditingCashInline, setIsEditingCashInline] = useState(false);
  const [inlineCashVal, setInlineCashVal] = useState('');

  // Minimum required data validation
  const isNameReady = Boolean(
    extractedData.business_name &&
    extractedData.business_name.trim() !== '' &&
    extractedData.business_name !== 'Menunggu nama usaha...'
  );
  const isCashReady = Boolean(extractedData.initial_cash && extractedData.initial_cash > 0);
  const isMinimumDataReady = isNameReady && isCashReady;

  const handleApplyToDashboard = () => {
    if (!isMinimumDataReady) return;
    onComplete({
      businessName: extractedData.business_name.trim(),
      archetype: extractedData.archetype || 'fnb',
      bankName: extractedData.bank_name || 'BCA',
      initialCash: extractedData.initial_cash,
      safetyBuffer: extractedData.safety_buffer || Math.round(extractedData.initial_cash * 0.15),
      payrollAmount: extractedData.payroll_amount || 0,
      payrollDay: extractedData.payroll_day || 30,
      fixedRentAmount: extractedData.fixed_rent_amount || 0,
      dailyGross: extractedData.daily_gross || 0,
    });
  };

  const handleSaveInlineName = () => {
    if (inlineNameVal.trim()) {
      setExtractedData((prev: any) => ({
        ...prev,
        business_name: inlineNameVal.trim(),
      }));
    }
    setIsEditingNameInline(false);
  };

  const handleSaveInlineCash = () => {
    const parsed = parseFloat(inlineCashVal.replace(/\D/g, ''));
    if (parsed > 0) {
      setExtractedData((prev: any) => {
        const buffer = Math.round(parsed * 0.15);
        const safe = Math.max(0, parsed - (prev.payroll_amount || 0) - buffer);
        return {
          ...prev,
          initial_cash: parsed,
          safety_buffer: buffer,
          safe_to_spend: safe,
        };
      });
    }
    setIsEditingCashInline(false);
  };

  return (
    <div className="flex flex-col h-[580px] max-h-[82vh]">
      {/* Top Bar inside Voice Chat */}
      <div className="px-6 py-3 border-b border-[#e5e5e5] bg-[#fafafa] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-[6px] bg-[#0a0a0a] text-white flex items-center justify-center">
            <ThinkingOrb state={orbState} size={20} theme="dark" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0a0a0a] flex items-center gap-1.5">
              <span>Konsultasi AI Guardian (Percakapan Suara & Teks)</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
            </div>
            <div className="text-[10px] text-[#737373]">
              Bicara santai dalam Bahasa Indonesia — parameter terkalibrasi otomatis
            </div>
          </div>
        </div>

        {/* Audio Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-1.5 rounded-[6px] border text-xs cursor-pointer transition-colors flex items-center gap-1 ${
              audioEnabled
                ? 'bg-[#dcfce7] border-[#bbf7d0] text-[#166534]'
                : 'bg-white border-[#e5e5e5] text-[#737373] hover:text-[#0a0a0a]'
            }`}
            title={audioEnabled ? 'Suara AI Aktif' : 'Nyalakan Suara AI'}
          >
            {audioEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="text-[10px] font-semibold">{audioEnabled ? 'Audio On' : 'Audio Off'}</span>
          </button>
        </div>
      </div>

      {/* Main Body: Split View (Chat Messages Left, Live Digital Twin Right) */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left: Interactive Chat Stream */}
        <div className="flex-1 flex flex-col justify-between p-4 min-h-0 bg-[#ffffff]">
          {/* Scrollable Message History */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m) => {
              const isAi = m.role === 'assistant';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="h-6 w-6 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-dub-subtle">
                      <Bot className="h-3.5 w-3.5 text-[#2563eb]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-[12px] p-3 text-xs leading-relaxed shadow-dub-subtle ${
                      isAi
                        ? 'bg-[#f5f5f5] text-[#171717] border border-[#e5e5e5]'
                        : 'bg-[#0a0a0a] text-white'
                    }`}
                  >
                    <p>{m.content}</p>
                    <div
                      className={`text-[9.5px] mt-1 text-right font-mono ${
                        isAi ? 'text-[#737373]' : 'text-slate-400'
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>

                  {!isAi && (
                    <div className="h-6 w-6 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-dub-subtle">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#737373] p-2 bg-[#f5f5f5] rounded-[8px] border border-[#e5e5e5] w-fit">
                <ThinkingOrb state="solving" size={20} />
                <span>AI sedang mencatat dan menghitung parameter kas...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Suggestions */}
          <div className="pt-2 pb-1.5 flex flex-wrap gap-1.5 shrink-0 border-t border-[#f5f5f5]">
            <span className="text-[10px] text-[#737373] self-center mr-1">Rekomendasi Respons:</span>
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(qr)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[#e5e5e5] bg-white hover:bg-[#f5f5f5] text-[#171717] cursor-pointer transition-all shadow-dub-subtle"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Voice & Text Input Box */}
          <div className="pt-1 flex items-center gap-2 shrink-0">
            {/* Real Mic Record Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`h-10 px-3 rounded-[8px] border flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-all shrink-0 shadow-dub-subtle ${
                isListening
                  ? 'bg-[#ea580c] border-[#ea580c] text-white animate-pulse'
                  : 'bg-white border-[#e5e5e5] text-[#171717] hover:bg-[#f5f5f5]'
              }`}
              title={isListening ? 'Hentikan rekaman suara' : 'Bicara dengan Mikrofon'}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4 text-[#2563eb]" />}
              <span className="hidden sm:inline">
                {isListening ? `Merekam (${recordingSeconds}s)...` : 'Bicara'}
              </span>
            </button>

            {/* Text Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage(inputVal);
                  }
                }}
                placeholder={
                  isListening
                    ? 'Mendengarkan suara Anda...'
                    : 'Ketik pesan atau klik Bicara (contoh: "Kopi Nusa, kas 25jt, gaji 8jt")...'
                }
                className="w-full h-10 px-3.5 pr-10 rounded-[8px] border border-[#e5e5e5] text-xs font-medium text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-all bg-[#fafafa] shadow-dub-subtle"
              />
              <button
                type="button"
                onClick={() => sendMessage(inputVal)}
                disabled={!inputVal.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-[6px] bg-[#0a0a0a] text-white flex items-center justify-center disabled:opacity-30 cursor-pointer shadow-dub-subtle transition-opacity"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Digital Twin Parameter Card */}
        <div className="w-full md:w-80 lg:w-88 border-t md:border-t-0 md:border-l border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <span className="text-[11px] font-bold text-neutral-950 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Digital Twin Terpetakan
              </span>
              <span
                className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                  isMinimumDataReady
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {isMinimumDataReady ? '✓ Siap Aktif' : 'Memetakan...'}
              </span>
            </div>

            {/* Parameter Fields */}
            <div className="space-y-2 text-xs">
              {/* Card 1: Nama Usaha & Bidang */}
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs space-y-1">
                <div className="text-[10px] text-neutral-500 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Building className="h-3 w-3 text-neutral-600" />
                    <span className="font-semibold">Nama Usaha:</span>
                  </div>
                  {!isEditingNameInline && (
                    <button
                      type="button"
                      onClick={() => {
                        setInlineNameVal(extractedData.business_name || '');
                        setIsEditingNameInline(true);
                      }}
                      className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer inline-flex items-center gap-0.5"
                    >
                      <Edit2 className="h-2.5 w-2.5" />
                      <span>{isNameReady ? 'Ubah' : 'Isi Langsung'}</span>
                    </button>
                  )}
                </div>

                {isEditingNameInline ? (
                  <div className="flex items-center gap-1 pt-0.5">
                    <input
                      type="text"
                      value={inlineNameVal}
                      onChange={(e) => setInlineNameVal(e.target.value)}
                      placeholder="Nama usaha..."
                      className="flex-1 text-xs font-bold p-1 rounded-lg border border-blue-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSaveInlineName}
                      className="h-6 w-6 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="font-bold text-neutral-950 truncate">
                    {isNameReady ? (
                      extractedData.business_name
                    ) : (
                      <span className="text-amber-700 font-normal italic text-[11px]">
                        ⚠️ Menunggu nama usaha...
                      </span>
                    )}
                  </div>
                )}

                <div className="text-[10.5px] text-emerald-700 font-medium capitalize">
                  {extractedData.archetype === 'fnb'
                    ? 'Kafe, Resto & F&B'
                    : extractedData.archetype === 'retail'
                    ? 'Retail / Olshop'
                    : extractedData.archetype === 'grocery'
                    ? 'Warung & Toko Sembako'
                    : 'Jasa & Agensi Kreatif'}
                </div>
              </div>

              {/* Card 2: Akun Bank & Kas Riil */}
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs space-y-1">
                <div className="text-[10px] text-neutral-500 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3 text-neutral-600" />
                    <span className="font-semibold">Akun Bank & Kas Riil:</span>
                  </div>
                  {!isEditingCashInline && (
                    <button
                      type="button"
                      onClick={() => {
                        setInlineCashVal(extractedData.initial_cash > 0 ? String(extractedData.initial_cash) : '');
                        setIsEditingCashInline(true);
                      }}
                      className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer inline-flex items-center gap-0.5"
                    >
                      <Edit2 className="h-2.5 w-2.5" />
                      <span>{isCashReady ? 'Ubah' : 'Isi Kas'}</span>
                    </button>
                  )}
                </div>

                {isEditingCashInline ? (
                  <div className="flex items-center gap-1 pt-0.5">
                    <input
                      type="number"
                      value={inlineCashVal}
                      onChange={(e) => setInlineCashVal(e.target.value)}
                      placeholder="Saldo kas (Rp)..."
                      className="flex-1 text-xs font-bold p-1 rounded-lg border border-blue-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSaveInlineCash}
                      className="h-6 w-6 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-neutral-800">
                      {isCashReady ? extractedData.bank_name || 'Kas Utama' : '-'}
                    </span>
                    <span className="font-bold text-neutral-950 tabular-nums">
                      {isCashReady ? (
                        `Rp ${extractedData.initial_cash.toLocaleString('id-ID')}`
                      ) : (
                        <span className="text-amber-700 font-normal italic text-[11px]">
                          ⚠️ Belum diisi
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Card 3: Komitmen Gaji & Jadwal */}
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs space-y-0.5">
                <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-neutral-600" />
                  <span className="font-semibold">Komitmen Gaji & Jadwal:</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10.5px] text-neutral-600">
                    Tgl {extractedData.payroll_day || 30}
                  </span>
                  <span className="font-bold text-neutral-950 tabular-nums">
                    Rp {(extractedData.payroll_amount || 0).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Card 4: Safe to Spend Highlight */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1 shadow-2xs">
                <div className="text-[10px] uppercase font-bold text-emerald-900 flex items-center justify-between">
                  <span>Duit Dingin Aman</span>
                  <Sparkles className="h-3 w-3 text-emerald-600" />
                </div>
                <div className="text-base font-extrabold text-emerald-800 tabular-nums">
                  Rp {(extractedData.safe_to_spend || 0).toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] text-emerald-700 leading-snug">
                  Bebas dipakai belanja modal tanpa mengorbankan gajian
                </div>
              </div>
            </div>
          </div>

          {/* Action Button & Minimum Data Guard */}
          <div className="pt-3 border-t border-neutral-200 space-y-2">
            {!isMinimumDataReady && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-snug space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  <span>Data Minimal Belum Lengkap:</span>
                </div>
                <div className="text-[10.5px] text-amber-800 space-y-0.5 pl-3">
                  {!isNameReady && <div>• Nama usaha belum diisi</div>}
                  {!isCashReady && <div>• Saldo kas awal belum diisi (&gt; Rp 0)</div>}
                </div>
              </div>
            )}

            <MotionButton
              type="button"
              variant="primary"
              size="md"
              disabled={!isMinimumDataReady}
              onClick={handleApplyToDashboard}
              className={`w-full text-xs font-bold rounded-xl justify-center py-2.5 transition-all shadow-xs ${
                isMinimumDataReady
                  ? 'bg-neutral-950 hover:bg-neutral-850 text-white cursor-pointer active:scale-[0.99]'
                  : 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed opacity-60'
              }`}
            >
              <CheckCircle2 className={`h-3.5 w-3.5 ${isMinimumDataReady ? 'text-emerald-400' : 'text-neutral-300'}`} />
              <span>{isMinimumDataReady ? 'Terapkan ke Dashboard' : 'Lengkapi Data Usaha Dulu'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </MotionButton>
          </div>
        </div>
      </div>
    </div>
  );
};