import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  businessName: string;
  onReset: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ businessName, onReset, isLoading }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white font-bold text-sm shadow-sm">
            JU
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-neutral-900">JagaUsaha</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {businessName}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1 text-xs text-neutral-600 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>IDwebhost CloudBaik VPS</span>
          </div>

          <button
            onClick={onReset}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition-all shadow-sm active:scale-95"
            title="Reset Data Demo"
          >
            <RotateCcw className={`h-3 w-3 ${isLoading ? 'animate-spin text-amber-500' : 'text-neutral-500'}`} />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
