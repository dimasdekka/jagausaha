import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
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

  const handleGoogleLogin = () => {
    setEmail('owner@kopiteras.id');
    setPassword('jagausaha2026');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('owner@kopiteras.id');
    }, 600);
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
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950 relative overflow-hidden">
      {/* Subtle Coordinate Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Header Navigation */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between relative z-10">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sistem Keuangan Aktif</span>
        </div>
      </header>

      {/* Main Centered Single-Axis Authentication Card (Linear / Stripe Grade) */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-[400px] mx-auto space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <JagaUsahaLogo size={44} showWordmark={false} />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                Masuk ke JagaUsaha
              </h1>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Portal intelijen likuiditas kas & manajemen arus kas bisnis.
              </p>
            </div>
          </div>

          {/* Core Authentication Surface */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.05)] space-y-5">
            {/* Email & Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Bisnis"
                type="email"
                value={email}
                onChange={(val) => setEmail(val)}
                placeholder="name@company.com"
                leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
                error={Boolean(errorMsg && !email)}
                spellCheck={false}
                autoComplete="email"
              />

              <div className="space-y-1">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(val) => setPassword(val)}
                  placeholder="••••••••"
                  leftIcon={<Lock className="h-4 w-4 text-slate-400" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                  error={Boolean(errorMsg && password.length < 6)}
                />

                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  <label className="flex items-center gap-1.5 text-slate-600 font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-neutral-950 focus:ring-0" />
                    <span>Ingat saya</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Link reset password telah dikirim ke email terdaftar.')}
                    className="text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                  >
                    Lupa password?
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Primary Submit Button */}
              <MotionButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full h-10 rounded-xl text-xs font-bold gap-2 shadow-sm bg-neutral-950 hover:bg-neutral-800 text-white cursor-pointer"
              >
                <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
                <ArrowRight className="h-4 w-4" />
              </MotionButton>

              {/* Google Workspace Direct Action */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
                <span>Lanjutkan dengan Google Workspace</span>
              </button>
            </form>

            {/* Bottom Link */}
            <div className="pt-2 text-center text-xs text-slate-500 font-medium border-t border-slate-100">
              Belum memiliki akun?{' '}
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Daftar Uji Coba Gratis
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Discrete Development Dock for HackFest Judges (Fixed Bottom, Unobtrusive) */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none px-4">
        <button
          type="button"
          onClick={handleFillDemo}
          className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg backdrop-blur-md text-[11px] font-medium transition-all hover:scale-105 cursor-pointer"
          title="Klik untuk mengisi akun demo evaluator"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>Kredensial Penilai Demo: <strong className="text-white">owner@kopiteras.id</strong> (1-Klik)</span>
        </button>
      </div>

      {/* Institutional Security Compliance Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center text-[11px] text-slate-400 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200/60">
        <span>Enkripsi TLS 256-bit & Proteksi Data Finansial Bank</span>
        <span>© 2026 JagaUsaha · Hak Cipta Dilindungi</span>
        <span>Status Sistem: Normal (100%)</span>
      </footer>
    </div>
  );
};
