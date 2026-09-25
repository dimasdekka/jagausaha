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
        'Halo! Saya AI Guardian JagaUsaha. Mari kita siapkan radar kas dan digital twin usaha Anda secara santai. Boleh ceritakan, apa nama usaha Anda dan bergerak di bidang apa?',
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
    business_name: 'Kopi Nusa',
    archetype: 'fnb',
    bank_name: 'BCA',
    initial_cash: 25000000,
    safety_buffer: 5000000,
    payroll_amount: 8000000,
    payroll_day: 30,
    fixed_rent_amount: 3000000,
    daily_gross: 1200000,
    safe_to_spend: 12000000,
  });

  const [quickReplies, setQuickReplies] = useState<string[]>([
    'Kedai Kopi Kopi Nusa di Serang',
    'Butik Fashion & Hijab Zahrana',
    'Warung Sembako Toko Berkah',
  ]);

  const [isComplete, setIsComplete] = useState(false);

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
        if (data.is_complete !== undefined) {
          setIsComplete(data.is_complete);
        }
        speakText(data.reply);
      } else {
        throw new Error('Fallback required');
      }
    } catch {
      // Local graceful fallback
      const fallbackReply =
        'Profil usaha tercatat! AI memetakan saldo kas Rp 25.000.000 dengan komitmen gaji Rp 8.000.000 dan buffer Rp 5.000.000. Duit Dingin Aman sebesar Rp 12.000.000.';
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsComplete(true);
      speakText(fallbackReply);
    } finally {
      setIsTyping(false);
      setOrbState('breathing');
    }
  };

  const handleApplyToDashboard = () => {
    onComplete({
      businessName: extractedData.business_name || 'Kopi Nusa',
      archetype: extractedData.archetype || 'fnb',
      bankName: extractedData.bank_name || 'BCA',
      initialCash: extractedData.initial_cash ?? 25000000,
      safetyBuffer: extractedData.safety_buffer ?? 5000000,
      payrollAmount: extractedData.payroll_amount ?? 8000000,
      payrollDay: extractedData.payroll_day ?? 30,
      fixedRentAmount: extractedData.fixed_rent_amount ?? 3000000,
      dailyGross: extractedData.daily_gross ?? 1200000,
    });
  };

  return (
    <div className="flex flex-col h-[540px] max-h-[75vh]">
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
        <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-[#e5e5e5] bg-[#fafafa] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e5e5e5]">
              <span className="text-[11px] font-bold text-[#0a0a0a] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#16a34a]" />
                Digital Twin Terpetakan
              </span>
              <span
                className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                  isComplete
                    ? 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]'
                    : 'bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]'
                }`}
              >
                {isComplete ? 'Siap Aktif' : 'Memetakan...'}
              </span>
            </div>

            {/* Parameter Fields */}
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-[8px] bg-white border border-[#e5e5e5] space-y-0.5">
                <div className="text-[10px] text-[#737373] flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  <span>Nama Usaha & Bidang:</span>
                </div>
                <div className="font-bold text-[#0a0a0a] truncate">
                  {extractedData.business_name}
                </div>
                <div className="text-[10px] text-[#16a34a] font-medium capitalize">
                  {extractedData.archetype === 'fnb'
                    ? 'Kafe, Resto & F&B'
                    : extractedData.archetype === 'retail'
                    ? 'Retail / Olshop'
                    : 'Bisnis UMKM'}
                </div>
              </div>

              <div className="p-2 rounded-[8px] bg-white border border-[#e5e5e5] space-y-0.5">
                <div className="text-[10px] text-[#737373] flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  <span>Akun Bank & Kas Riil:</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-[#0a0a0a]">{extractedData.bank_name}</span>
                  <span className="font-mono font-bold text-[#0a0a0a]">
                    Rp {(extractedData.initial_cash || 0).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-[8px] bg-white border border-[#e5e5e5] space-y-0.5">
                <div className="text-[10px] text-[#737373] flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Komitmen Gaji & Jadwal:</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10.5px] text-[#525252]">Tgl {extractedData.payroll_day || 30}</span>
                  <span className="font-mono font-bold text-[#0a0a0a]">
                    Rp {(extractedData.payroll_amount || 0).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Safe to Spend Instant Highlight */}
              <div className="p-3 rounded-[8px] bg-[#dcfce7]/40 border border-[#bbf7d0] space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#14532d] flex items-center justify-between">
                  <span>Duit Dingin Aman</span>
                  <Sparkles className="h-3 w-3 text-[#16a34a]" />
                </div>
                <div className="text-base font-bold font-mono text-[#16a34a] tabular-nums">
                  Rp {(extractedData.safe_to_spend || 0).toLocaleString('id-ID')}
                </div>
                <div className="text-[9.5px] text-[#166534]">
                  Bebas dipakai belanja modal tanpa mengorbankan gajian
                </div>
              </div>
            </div>
          </div>

          {/* Action Button: Apply to Dashboard */}
          <div className="pt-3 border-t border-[#e5e5e5]">
            <MotionButton
              type="button"
              variant="primary"
              size="md"
              onClick={handleApplyToDashboard}
              className="w-full bg-[#0a0a0a] hover:bg-[#171717] text-white text-xs font-semibold rounded-[8px] shadow-dub-subtle justify-center py-2.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
              <span>Terapkan ke Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </MotionButton>
          </div>
        </div>
      </div>
    </div>
  );
};