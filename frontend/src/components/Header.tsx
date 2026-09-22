import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  businessName?: string;
  onReset: () => void;
  isLoading: boolean;
  onTryFree?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, isLoading, onTryFree }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Brand Left */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-neutral-950">JagaUsaha</span>
        </div>

        {/* Navigation & CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition-all active:scale-95"
            title="Reset Data Demo"
          >
            <RotateCcw className={`h-3 w-3 ${isLoading ? 'animate-spin text-neutral-900' : 'text-neutral-400'}`} />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={onTryFree}
            className="inline-flex items-center justify-center rounded-full bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-2 text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95"
          >
            <span>Uji Coba Gratis</span>
          </button>
        </div>
      </div>
    </header>
  );
};
