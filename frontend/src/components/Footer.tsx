import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200/80 bg-neutral-50 py-12 text-xs text-neutral-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-900 text-white font-bold text-[10px]">
              JU
            </div>
            <span className="font-semibold text-neutral-900 text-sm">JagaUsaha</span>
            <span className="text-neutral-400">·</span>
            <span>AI Business Guardian untuk UMKM Indonesia</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-600">
            <a
              href="https://idwebhost.com/ai-hosting/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 underline underline-offset-4 transition-colors"
            >
              AI Hosting
            </a>
            <span className="text-neutral-300">/</span>
            <a
              href="https://cloudbaik.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 underline underline-offset-4 transition-colors"
            >
              Cloud VPS
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400 text-[11px]">
          <p>© 2026 JagaUsaha. Hak Cipta Dilindungi. Dikembangkan untuk AI HackFest 2026.</p>
          <p>Infrastruktur: IDwebhost CloudBaik VPS (4 Core CPU / 4GB RAM / 20GB SSD).</p>
        </div>
      </div>
    </footer>
  );
};
