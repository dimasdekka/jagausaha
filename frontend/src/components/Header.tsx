import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionButton } from './motion/button';
import { SharedLayoutBg } from './motion/shared-layout-bg';
import { JagaUsahaLogo } from './ui/JagaUsahaLogo';
import { EASE_OUT } from '../lib/ease';

interface HeaderProps {
  onReset: () => void;
  isLoading: boolean;
  onScrollToSection: (sectionId: string) => void;
  onOpenCommandPalette?: () => void;
  onOpenLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToSection,
  onOpenCommandPalette,
  onOpenLogin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 transition-all duration-300">
      <div
        className={`max-w-4xl mx-auto rounded-full border transition-all duration-300 ${
          isScrolled
            ? 'border-neutral-300/80 bg-white/95 shadow-[0_12px_36px_rgba(0,0,0,0.08)] backdrop-blur-2xl h-16 px-5 sm:px-6'
            : 'border-neutral-200/90 bg-white/85 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl h-16 px-5 sm:px-6'
        } flex items-center justify-between`}
      >
        {/* Brand Left */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <JagaUsahaLogo size={36} showWordmark={true} />
          </button>

          {/* Desktop Navigation Links with beUI SharedLayoutBg (Clean, Frictionless Anchors) */}
          <SharedLayoutBg as="nav" className="hidden md:flex items-center gap-1 text-xs font-medium text-neutral-600">
            {/* Arsitektur Agen */}
            <button
              onClick={() => handleNavClick('feature-agents')}
              className="px-3.5 py-2 rounded-full hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Arsitektur Agen
            </button>

            {/* Simulator Kas */}
            <button
              onClick={() => handleNavClick('demo-sandbox')}
              className="px-3.5 py-2 rounded-full hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Simulator Kas
            </button>

            {/* Tindakan Taktis */}
            <button
              onClick={() => handleNavClick('action-feed')}
              className="px-3.5 py-2 rounded-full hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Tindakan Taktis
            </button>

            {/* FAQ */}
            <button
              onClick={() => handleNavClick('faq')}
              className="px-3.5 py-2 rounded-full hover:text-neutral-950 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </SharedLayoutBg>
        </div>

        {/* Right Actions Dock */}
        <div className="flex items-center gap-3">
          {/* Quick Command Palette Search Button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 h-9 px-3.5 rounded-full bg-neutral-100/90 hover:bg-neutral-200/80 border border-neutral-200/70 text-xs text-neutral-500 hover:text-neutral-900 transition-all cursor-pointer shadow-2xs group"
            title="Buka Command Palette (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-neutral-400 group-hover:text-neutral-700" />
            <span className="font-medium">Cari...</span>
            <kbd className="inline-flex items-center rounded-md border border-neutral-300/80 bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-neutral-600 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Primary Action Button -> Direct Login */}
          <MotionButton
            variant="primary"
            size="sm"
            onClick={onOpenLogin || (() => handleNavClick('demo-sandbox'))}
            className="h-9 px-5 text-xs font-semibold rounded-full shadow-xs cursor-pointer"
          >
            <span>Uji Coba</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </MotionButton>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
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
              {/* Quick Search in Mobile */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette?.();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-neutral-100/90 text-neutral-800 text-xs font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-neutral-500" />
                  <span>Cari skenario, agen, data...</span>
                </div>
                <kbd className="rounded border border-neutral-300/80 bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-neutral-600 shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              <div className="space-y-1 text-sm font-medium text-neutral-800">
                <button
                  onClick={() => handleNavClick('feature-agents')}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>Arsitektur Agen</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => handleNavClick('demo-sandbox')}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>Simulator Kas</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => handleNavClick('action-feed')}
                  className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span>Tindakan Taktis</span>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
