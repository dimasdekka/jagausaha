import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Shield,
  Activity,
  MessageSquareCode,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionButton } from './motion/button';
import { SharedLayoutBg } from './motion/shared-layout-bg';
import { SPRING_PANEL, EASE_OUT } from '../lib/ease';

interface HeaderProps {
  onReset: () => void;
  isLoading: boolean;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
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
    <header className="sticky top-3.5 z-50 w-full px-4 sm:px-6 transition-all duration-300">
      <div
        className={`max-w-4xl mx-auto rounded-full border transition-all duration-300 ${
          isScrolled
            ? 'border-neutral-300/80 bg-white/95 shadow-xl shadow-neutral-900/[0.06] backdrop-blur-xl h-13 px-4 sm:px-5'
            : 'border-neutral-200/80 bg-white/80 shadow-md shadow-neutral-900/[0.03] backdrop-blur-lg h-14 px-4 sm:px-6'
        } flex items-center justify-between`}
      >
        {/* Brand Left */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white font-bold text-xs shadow-xs transition-transform group-hover:scale-105">
              JU
            </div>
            <span className="text-sm font-bold tracking-tight text-neutral-950">
              JagaUsaha
            </span>
          </button>

          {/* Desktop Navigation Links with beUI SharedLayoutBg (Clean, No Random Icon Clutter) */}
          <SharedLayoutBg as="nav" className="hidden md:flex items-center gap-0.5 text-xs font-medium text-neutral-600">
            {/* Simulator Link */}
            <button
              onClick={() => handleNavClick('demo-sandbox')}
              className="px-3.5 py-1.5 rounded-full hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Simulator Kas
            </button>

            {/* Agen & Arsitektur Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAgentDropdownOpen(true)}
              onMouseLeave={() => setAgentDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('feature-agents')}
                className="px-3.5 py-1.5 rounded-full hover:text-neutral-950 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Arsitektur Agen</span>
                <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform duration-150 ${agentDropdownOpen ? 'rotate-180 text-neutral-950' : ''}`} />
              </button>

              {/* Mega Dropdown Menu with beUI Spring Motion */}
              <AnimatePresence>
                {agentDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={SPRING_PANEL}
                    className="absolute top-full left-0 pt-2 w-80 z-50"
                  >
                    <div className="rounded-2xl border border-neutral-200/90 bg-white/98 p-3 shadow-2xl backdrop-blur-xl space-y-1.5">
                      <button
                        onClick={() => handleNavClick('feature-agents')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="h-8 w-8 rounded-lg bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0 border border-neutral-200/60">
                          <Activity className="h-4 w-4 text-neutral-700" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-950 group-hover:text-neutral-900 flex items-center gap-1.5">
                            <span>Sensor Agent</span>
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-normal">Perception</span>
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                            Ingesti otomatis mutasi BCA & voice note WhatsApp tanpa input manual.
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('feature-agents')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="h-8 w-8 rounded-lg bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0 border border-neutral-200/60">
                          <Shield className="h-4 w-4 text-neutral-700" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-950 group-hover:text-neutral-900 flex items-center gap-1.5">
                            <span>Simulator Agent</span>
                            <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded font-normal">Core DLMM</span>
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                            Kalkulasi matematis Python 30 hari kas & deteksi defisit sebelum jatuh tempo.
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('feature-agents')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="h-8 w-8 rounded-lg bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0 border border-neutral-200/60">
                          <MessageSquareCode className="h-4 w-4 text-neutral-700" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-950 group-hover:text-neutral-900 flex items-center gap-1.5">
                            <span>Advisor Agent</span>
                            <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded font-normal">Negotiator</span>
                          </div>
                          <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                            Koleksi piutang bon santun QRIS & negosiasi skema restrukturisasi tempo supplier.
                          </div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cara Kerja */}
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="px-3.5 py-1.5 rounded-full hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Cara Kerja
            </button>

            {/* Tanya Jawab */}
            <button
              onClick={() => handleNavClick('faq')}
              className="px-3.5 py-1.5 rounded-full hover:text-neutral-950 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </SharedLayoutBg>
        </div>

        {/* Right Actions Dock (Linear / Apple Tier: Clean, No Nested Pill Clutter) */}
        <div className="flex items-center gap-3">
          {/* Subtle Server Ping */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 px-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>CloudBaik VPS</span>
          </div>

          {/* Primary Action Button */}
          <MotionButton
            variant="primary"
            size="sm"
            onClick={() => handleNavClick('demo-sandbox')}
            className="px-4.5 h-8.5 text-xs font-semibold rounded-full shadow-xs"
          >
            <span>Uji Coba</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </MotionButton>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="md:hidden max-w-4xl mx-auto mt-2"
          >
            <div className="rounded-3xl border border-neutral-200 bg-white/98 p-5 shadow-2xl backdrop-blur-2xl space-y-4">
              <div className="space-y-1 text-sm font-medium text-neutral-800">
                <button
                  onClick={() => handleNavClick('demo-sandbox')}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>Simulator Kas</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => handleNavClick('feature-agents')}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>Arsitektur Multi-Agent</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => handleNavClick('how-it-works')}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>Cara Kerja</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => handleNavClick('faq')}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>Tanya Jawab (FAQ)</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  IDwebhost CloudBaik VPS
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
