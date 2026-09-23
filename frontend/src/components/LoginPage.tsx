import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { JagaUsahaLogo } from './ui/JagaUsahaLogo';
import { Input } from './motion/input';
import { MotionButton } from './motion/button';

interface LoginPageProps {
  onBackToHome: () => void;
  onLoginSuccess: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackToHome, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFillDemo = () => {
    setEmail('owner@kopiteras.id');
    setPassword('jagausaha2026');
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Masukkan alamat email bisnis yang valid.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setErrorMsg('Password minimal terdiri dari 6 karakter.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950 relative overflow-hidden">
      {/* Ambient Coordinate Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient Aurora Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-emerald-500/10 via-teal-400/8 to-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between relative z-10">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <JagaUsahaLogo size={36} showWordmark={true} />
        </button>

        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-neutral-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-all shadow-2xs cursor-pointer active:scale-95"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (Brand Showcase on Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col space-y-6 pr-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-bold text-emerald-800">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>Autonomous Financial Guardian</span>
              </span>
              <h2 className="font-serif font-extralight text-3xl sm:text-4xl text-neutral-950 tracking-[-0.02em] leading-tight">
                Keamanan kas sebelum uang keluar
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Masuk ke portal JagaUsaha untuk memantau Duit Dingin operasional dan menyimulasikan keputusan belanja bisnis Anda secara deterministik.
              </p>
            </div>

            {/* Institutional Security Highlights */}
            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>Kalkulasi kas murni Python tanpa halusinasi matematika LLM.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>Deteksi dini benturan jadwal gaji barista & tempo supplier.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>Draf penagihan piutang bon santun terintegrasi QRIS dinamis.</span>
              </div>
            </div>

            {/* Quick Demo Fill Button */}
            <div className="pt-3 border-t border-slate-200/80">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full inline-flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/90 text-left cursor-pointer hover:border-emerald-300 transition-all shadow-2xs group"
              >
                <div>
                  <div className="text-[11px] font-bold text-emerald-950 flex items-center gap-1.5">
                    <span>⚡ Akun Demo Penilai HackFest</span>
                    <span className="text-[9px] bg-emerald-200/70 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">1-Klik</span>
                  </div>
                  <div className="text-[10.5px] text-slate-600 mt-0.5">
                    owner@kopiteras.id (Auto-fill)
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Modern High-Contrast Login Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/[0.06] space-y-6">
              {/* Card Header */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Portal Masuk
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight pt-1">
                  Masuk ke Akun Usaha Anda
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Lanjutkan untuk mengakses dashboard pemantauan kas harian.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field with beUI Input */}
                <Input
                  label="Email Bisnis"
                  type="email"
                  value={email}
                  onChange={(val) => setEmail(val)}
                  placeholder="owner@usaha.id"
                  leftIcon={<Mail className="h-4 w-4 text-slate-500" />}
                  error={Boolean(errorMsg && !email)}
                  spellCheck={false}
                  autoComplete="email"
                />

                {/* Password Field with beUI Input & Toggle */}
                <div className="space-y-1">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(val) => setPassword(val)}
                    placeholder="••••••••"
                    leftIcon={<Lock className="h-4 w-4 text-slate-500" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    error={Boolean(errorMsg && password.length < 6)}
                  />
                  <div className="flex items-center justify-between text-xs pt-1 px-1">
                    <label className="flex items-center gap-1.5 text-slate-700 font-medium cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-neutral-950 focus:ring-0" />
                      <span>Ingat saya</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Link reset password telah dikirim ke email terdaftar.')}
                      className="text-emerald-800 hover:underline font-semibold cursor-pointer"
                    >
                      Lupa password?
                    </button>
                  </div>
                </div>

                {/* Error Notification */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <MotionButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold gap-2 shadow-md bg-neutral-950 hover:bg-neutral-800 text-white cursor-pointer"
                >
                  <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
                  <ArrowRight className="h-4 w-4" />
                </MotionButton>
              </form>

              {/* Mobile Demo Account Button */}
              <div className="lg:hidden pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="w-full inline-flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-950 cursor-pointer"
                >
                  <span>⚡ Gunakan Kredensial Demo (1-Klik)</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
                </button>
              </div>

              {/* Footer terms */}
              <div className="pt-2 text-center text-xs text-slate-500 font-medium">
                Belum memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setEmail('owner@kopiteras.id');
                    setPassword('jagausaha2026');
                    onLoginSuccess('owner@kopiteras.id');
                  }}
                  className="text-emerald-800 font-bold hover:underline cursor-pointer"
                >
                  Daftar Uji Coba Gratis
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center text-[11px] text-slate-400 relative z-10 border-t border-slate-200/60">
        <p>© 2026 JagaUsaha. Hak Cipta Dilindungi. Dikembangkan untuk AI HackFest 2026.</p>
      </footer>
    </div>
  );
};
