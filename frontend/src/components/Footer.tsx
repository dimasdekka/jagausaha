import React from 'react';
import { JagaUsahaLogo } from './ui/JagaUsahaLogo';
import { ArrowUpRight, Server, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200/90 bg-neutral-50/70 text-xs text-neutral-600 mt-16 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* Main Grid: 4 Logical Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Mission (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <JagaUsahaLogo size={32} showWordmark={true} />
            </div>
            <p className="text-neutral-500 text-xs leading-relaxed max-w-sm">
              Sistem perlindungan likuiditas kas deterministik untuk UMKM Indonesia. Memadukan Digital Twin arus kas, kalkulator Safe-to-Spend DLMM, dan otomasi negosiasi WhatsApp.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live on CloudBaik VPS · 103.30.146.174
              </span>
            </div>
          </div>

          {/* Col 2: Fitur Platform */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">
              Fitur Platform
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <a href="#digital-twin" className="hover:text-neutral-950 transition-colors">
                  Digital Twin Arus Kas
                </a>
              </li>
              <li>
                <a href="#dlmm" className="hover:text-neutral-950 transition-colors">
                  Safe-to-Spend DLMM
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-neutral-950 transition-colors">
                  Agenda Kas 30 Hari
                </a>
              </li>
              <li>
                <a href="#whatsapp" className="hover:text-neutral-950 transition-colors">
                  Generator Draf WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: IDwebhost & CloudBaik (Competition Compliance) */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-neutral-500" />
              <span>Infrastruktur Resmi</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://idwebhost.com/ai-hosting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-semibold text-neutral-800 hover:text-emerald-700 transition-colors"
                >
                  <span>AI Hosting</span>
                  <ArrowUpRight className="h-3 w-3 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://cloudbaik.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-semibold text-neutral-800 hover:text-emerald-700 transition-colors"
                >
                  <span>Cloud VPS</span>
                  <ArrowUpRight className="h-3 w-3 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                </a>
              </li>
              <li className="text-[11px] text-neutral-500 flex items-center gap-1">
                <Cpu className="h-3 w-3 text-neutral-400" />
                <span>4 Core CPU / 4GB RAM</span>
              </li>
              <li className="text-[11px] text-neutral-500 flex items-center gap-1">
                <Terminal className="h-3 w-3 text-neutral-400" />
                <span>Ubuntu 24.04 LTS</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Keamanan & Integritas */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-neutral-500" />
              <span>Keamanan & Data</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                <span>Deterministic Math Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                <span>PBKDF2-HMAC-SHA256 Auth</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                <span>Zero Hallucination Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                <span>Privasi Data UMKM Mandiri</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Competition Legal */}
        <div className="pt-8 border-t border-neutral-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            <p className="font-semibold text-neutral-800">
              © 2026 JagaUsaha · Hak Cipta Dilindungi.
            </p>
            <p className="text-neutral-400 mt-0.5">
              Dikembangkan oleh Dimas Dekananta untuk ajang resmi IDwebhost AI Competition.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 font-mono text-neutral-700 shadow-2xs">
              VPS IP: 103.30.146.174
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-600 shadow-2xs">
              Stack: React · Vite · Tailwind · FastAPI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
