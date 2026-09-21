import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-950 text-white font-bold text-xs">
              JU
            </div>
            <span className="font-bold text-navy-900 text-sm">JagaUsaha</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600">AI Autonomous Financial Guardian untuk UMKM Indonesia</span>
          </div>

          <div className="flex items-center gap-5 text-slate-700 font-semibold">
            <a
              href="https://idwebhost.com/ai-hosting/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-indigo underline underline-offset-4 transition-colors"
            >
              AI Hosting
            </a>
            <span className="text-slate-300">/</span>
            <a
              href="https://cloudbaik.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-indigo underline underline-offset-4 transition-colors"
            >
              Cloud VPS
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
          <p>© 2026 JagaUsaha. Hak Cipta Dilindungi. Dikembangkan untuk AI HackFest 2026.</p>
          <p>Infrastruktur: IDwebhost CloudBaik VPS (4 Core CPU / 4GB RAM / 20GB SSD).</p>
        </div>
      </div>
    </footer>
  );
};
