import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Layers,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  isLoading: boolean;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  isLoading,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
    setAgentDropdownOpen(false);
  };

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 pointer-events-none transition-all duration-300">
      <div
        className={`max-w-5xl mx-auto rounded-full border transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'border-neutral-300/80 bg-white/95 shadow-xl shadow-neutral-900/[0.06] backdrop-blur-xl py-2 px-4 sm:px-5'
            : 'border-neutral-200/90 bg-white/90 shadow-md shadow-neutral-900/[0.03] backdrop-blur-lg py-2.5 px-4 sm:px-6'
        } flex items-center justify-between`}
      >
        {/* Brand Left */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white font-bold text-xs shadow-sm transition-transform group-hover:scale-105">
              JU
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-neutral-950">
                JagaUsaha
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-neutral-600">
            {/* Simulator Link */}
            <button
              onClick={() => handleNavClick('demo-sandbox')}
              className="px-3 py-1.5 rounded-full hover:text-neutral-950 hover:bg-neutral-100 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="h-3 w-3 text-neutral-400" />
              <span>Simulator Kas</span>
            </button>

            {/* Agen & Arsitektur Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAgentDropdownOpen(true)}
              onMouseLeave={() => setAgentDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('feature-agents')}
                className="px-3 py-1.5 rounded-full hover:text-neutral-950 hover:bg-neutral-100 transition-colors flex items-center gap-1"
              >
                <Layers className="h-3 w-3 text-neutral-400" />
                <span>Arsitektur Agen</span>
                <ChevronDown className="h-3 w-3 text-neutral-400" />
              </button>

              {/* Mega Dropdown Menu */}
              {agentDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-72 animate-in fade-in zoom-in-95 duration-150">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-xl space-y-1">
                    <button
                      onClick={() => handleNavClick('feature-agents')}
                      className="w-full text-left p-2 rounded-xl hover:bg-neutral-50 transition-colors flex items-start gap-2.5 group"
                    >
                      <div className="h-7 w-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 text-xs font-bold">
                        1
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 group-hover:text-neutral-950">
                          Sensor Agent
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Ingesti mutasi BCA & voice note otomatis
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('feature-agents')}
                      className="w-full text-left p-2 rounded-xl hover:bg-neutral-50 transition-colors flex items-start gap-2.5 group"
                    >
                      <div className="h-7 w-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 text-xs font-bold">
                        2
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 group-hover:text-neutral-950">
                          Simulator Agent
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Sandbox kontrafaktual kas 30 hari
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('feature-agents')}
                      className="w-full text-left p-2 rounded-xl hover:bg-neutral-50 transition-colors flex items-start gap-2.5 group"
                    >
                      <div className="h-7 w-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 text-xs font-bold">
                        3
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 group-hover:text-neutral-950">
                          Advisor Agent
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Draf negosiasi tempo & bon santun QRIS
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cara Kerja */}
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="px-3 py-1.5 rounded-full hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
            >
              Cara Kerja
            </button>

            {/* Tanya Jawab */}
            <button
              onClick={() => handleNavClick('faq')}
              className="px-3 py-1.5 rounded-full hover:text-neutral-950 hover:bg-neutral-100 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="h-3 w-3 text-neutral-400" />
              <span>FAQ</span>
            </button>
          </nav>
        </div>

        {/* Right Actions Dock */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cloud VPS Status Pill */}
          <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/60 text-[11px] text-neutral-600 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>CloudBaik VPS</span>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={onReset}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-all active:scale-95 shadow-sm"
            title="Reset Data Skenario Demo"
          >
            <RotateCcw
              className={`h-3.5 w-3.5 ${
                isLoading ? 'animate-spin text-neutral-900' : 'text-neutral-500'
              }`}
            />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('demo-sandbox')}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-1.5 text-xs font-semibold transition-all shadow-sm active:scale-95"
          >
            <span>Uji Coba</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="rounded-3xl border border-neutral-200 bg-white/98 p-5 shadow-2xl backdrop-blur-2xl space-y-4">
            <div className="space-y-1 text-sm font-medium text-neutral-800">
              <button
                onClick={() => handleNavClick('demo-sandbox')}
                className="w-full text-left py-2 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  Simulator Kas
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              <button
                onClick={() => handleNavClick('feature-agents')}
                className="w-full text-left py-2 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-amber-600" />
                  Arsitektur Multi-Agent
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              <button
                onClick={() => handleNavClick('how-it-works')}
                className="w-full text-left py-2 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between"
              >
                <span>Cara Kerja</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              <button
                onClick={() => handleNavClick('faq')}
                className="w-full text-left py-2 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between"
              >
                <span>Tanya Jawab (FAQ)</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1.5 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                IDwebhost CloudBaik VPS
              </span>
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-950 font-medium"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
