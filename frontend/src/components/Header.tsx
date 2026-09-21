import React from 'react';
import { RotateCcw, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  businessName: string;
  onReset: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ businessName, onReset, isLoading }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-indigo to-brand-violet text-white font-bold text-sm shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-navy-900 font-sans">JagaUsaha</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {businessName}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs text-slate-700 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>IDwebhost · CloudBaik VPS</span>
          </div>

          <button
            onClick={onReset}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-4 py-1.5 text-xs font-semibold text-navy-900 transition-all shadow-sm active:scale-95"
            title="Reset Data Demo"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-brand-indigo' : 'text-slate-500'}`} />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
