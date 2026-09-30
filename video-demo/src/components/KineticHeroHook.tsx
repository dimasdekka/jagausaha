import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, OffthreadVideo, staticFile, Sequence } from 'remotion';
import { ShieldCheck, Sparkles, TrendingDown, Coffee, Server, AlertTriangle } from 'lucide-react';
import { AnimatedDonutChart } from './AnimatedDonutChart';

export const KineticHeroHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // If frame >= 1728 (57.6s), unmount completely so it NEVER collides with 3D Landing Page Window!
  if (frame >= 1728) return null;

  // PHASE 0: Welcome & Hackathon Showcase Card (Frames 0 - 220 / 0s - 7.3s)
  const p0Spring = spring({
    frame,
    fps,
    config: { damping: 26, stiffness: 45, mass: 0.9 },
  });
  const p0TranslateY = interpolate(p0Spring, [0, 1], [40, 0]);
  const p0Scale = interpolate(p0Spring, [0, 1], [0.94, 1.0]);
  const p0Opacity = interpolate(frame, [0, 20, 200, 220], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // PHASE 1: Realita Lapangan Kedai Kopi (Frames 220 - 710 / 7.3s - 23.7s)
  const p1Spring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 26, stiffness: 45, mass: 0.9 },
  });
  const p1TranslateY = interpolate(p1Spring, [0, 1], [40, 0]);
  const p1Scale = interpolate(p1Spring, [0, 1], [0.94, 1.0]);

  // PHASE 2: 82% & Terjebak dalam Ilusi Saldo Kas Operasional (Frames 710 - 1405 / 23.7s - 46.8s)
  const p2Spring = spring({
    frame: frame - 710,
    fps,
    config: { damping: 26, stiffness: 45, mass: 0.9 },
  });
  const p2TranslateY = interpolate(p2Spring, [0, 1], [48, 0]);
  const p2Scale = interpolate(p2Spring, [0, 1], [0.94, 1.0]);
  const p2Opacity = interpolate(frame, [710, 740, 1370, 1405], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // PHASE 3: Grand Solution Reveal JagaUsaha (Frames 1405 - 1728 / 46.8s - 57.6s)
  const p3Spring = spring({
    frame: frame - 1405,
    fps,
    config: { damping: 26, stiffness: 45, mass: 0.9 },
  });
  const p3TranslateY = interpolate(p3Spring, [0, 1], [40, 0]);
  const p3Scale = interpolate(p3Spring, [0, 1], [0.94, 1.0]);
  const p3Opacity = interpolate(frame, [1405, 1435, 1700, 1728], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-16 text-center">
      {/* ------------------------------------------------------------- */}
      {/* PHASE 0: Welcome Showcase Card (0s - 7.3s / Frames 0 - 220)   */}
      {/* ------------------------------------------------------------- */}
      {frame < 220 && (
        <div
          className="flex flex-col items-center max-w-5xl"
          style={{
            opacity: p0Opacity,
            transform: `translateY(${p0TranslateY}px) scale(${p0Scale})`,
          }}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-widest mb-6 shadow-xl shadow-emerald-950/40">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>IDwebhost AI Competition 2026 Showcase</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 whitespace-nowrap">
            Selamat Datang, Dewan Juri!
          </h1>

          <p className="text-xl text-neutral-300 font-medium leading-relaxed mb-6 max-w-3xl">
            Inilah presentasi resmi <span className="text-emerald-400 font-bold">JagaUsaha</span> — Autonomous Financial Guardian untuk jutaan UMKM Indonesia.
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 text-xs text-neutral-400">
            <Server className="h-3.5 w-3.5 text-sky-400" />
            <span>Infrastruktur Komputasi: CloudBaik Cloud VPS (103.30.146.174)</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 1A: Fast-Cut B-Roll UMKM Realita (7.3s - 17.3s / Frames 220 - 520) */}
      {/* ------------------------------------------------------------- */}
      {frame >= 220 && frame < 520 && (
        <div
          className="flex flex-col items-center w-full max-w-4xl"
          style={{
            opacity: interpolate(frame, [220, 240, 500, 520], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${p1TranslateY}px) scale(${p1Scale})`,
          }}
        >
          {/* Header pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-4">
            <Coffee className="h-4 w-4" />
            <span>Studi Kasus Nyata: Kedai Kopi & UMKM Indonesia</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-5">
            Kedai Kopi Ramai Pembeli... Tapi Saldo Kasnya?
          </h2>

          {/* Cinematic 16:9 Video Player Card */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-neutral-700/80 shadow-2xl shadow-emerald-950/30 bg-black">
            <Sequence from={220} durationInFrames={300} layout="none">
              <OffthreadVideo
                src={staticFile('footage/hook_montage_umkm.mp4')}
                className="w-full h-full object-cover"
              />
            </Sequence>

            {/* Gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />

            {/* Top Bar Badges */}
            <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {frame < 295 && '☕ 1. Kedai Kopi Ramai Pembeli & Pelanggan Nongkrong'}
                {frame >= 295 && frame < 370 && '🔥 2. Pesanan Menumpuk • Barista Menuang Latte Art'}
                {frame >= 370 && frame < 445 && '⚡ 3. Ekstraksi 100+ Cup / Hari • Jam Sibuk Bar'}
                {frame >= 445 && '💰 4. Saldo Kas Rekening BCA Terlihat Belasan Juta'}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/80 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>B-ROLL LAPANGAN UMKM</span>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-5 right-5 p-3.5 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-neutral-700/70 text-left pointer-events-none flex items-center justify-between">
              <div>
                <div className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider">
                  Realita Usaha Kecil Indonesia
                </div>
                <div className="text-sm font-bold text-white">
                  {frame < 445
                    ? 'Toko ramai bukan jaminan bisnis aman — arus kas riil sering menipu mata.'
                    : 'Saldo rekening tebal di awal bulan kerap memicu belanja modal tanpa kalkulasi.'}
                </div>
              </div>
              <div className="text-xs font-mono font-bold text-neutral-400 bg-black/40 px-3 py-1.5 rounded-xl border border-neutral-800">
                {frame < 445 ? 'KASIR: RAMAI' : 'SALDO: SEMU'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 1B: Realita Krisis Kas (17.3s - 23.7s / Frames 520 - 710) */}
      {/* ------------------------------------------------------------- */}
      {frame >= 520 && frame < 710 && (
        <div
          className="flex flex-col items-center max-w-4xl"
          style={{
            opacity: interpolate(frame, [520, 545, 680, 710], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${p1TranslateY}px) scale(${p1Scale})`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-black uppercase tracking-wider mb-5">
            <AlertTriangle className="h-4 w-4" />
            <span>Krisis Likuiditas di Balik Kedai yang Ramai</span>
          </div>

          <h2 className="text-5xl font-black text-white leading-tight tracking-tight mb-8">
            Krisis Likuiditas di Balik Kedai yang Ramai
          </h2>

          <div className="grid grid-cols-2 gap-6 w-full text-left">
            <div className="p-7 rounded-3xl bg-neutral-900/85 border border-neutral-800 backdrop-blur-xl shadow-2xl">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Kondisi Kas Awal Bulan
              </div>
              <div className="text-xl font-extrabold text-white mb-2">Saldo BCA Terlihat Belasan Juta</div>
              <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                Pemilik melihat rekening masih tebal, lalu tergoda belanja modal membeli mesin espresso baru secara tunai.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-neutral-900/85 border border-rose-500/40 backdrop-blur-xl shadow-2xl shadow-rose-950/30">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                Bencana Finansial (H+6)
              </div>
              <div className="text-xl font-extrabold text-rose-300 mb-2">Panik Gagal Bayar Gaji Barista</div>
              <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                Kas mendadak defisit karena uang tunai terserap mesin, sementara tanggal gajian dan tempo sewa tiba bersamaan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 2: 82% & Terjebak dalam Ilusi Saldo Kas (23.7s - 46.8s / Frames 710 - 1405) */}
      {/* ------------------------------------------------------------- */}
      {frame >= 710 && frame < 1405 && (
        <div
          className="flex flex-col items-center w-full max-w-6xl px-4"
          style={{
            opacity: p2Opacity,
            transform: `translateY(${p2TranslateY}px) scale(${p2Scale})`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-wider mb-5 shadow-lg shadow-rose-950/40">
            <TrendingDown className="h-4 w-4" />
            <span>Fakta Nyata Kementerian Koperasi & UKM RI</span>
          </div>

          {/* Chart & 82% Impact Number */}
          <div className="flex items-center justify-center gap-8 mb-5">
            <AnimatedDonutChart percentage={82} size={150} color="#f43f5e" label="Krisis Kas" delay={710} />
            <div className="text-left">
              <div className="text-7xl font-black text-white tracking-tight leading-none">
                82%
              </div>
              <div className="text-lg font-bold text-rose-400 mt-1">
                Kegagalan Usaha Kecil
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[40px] font-black text-white tracking-tight mb-4 whitespace-nowrap text-center">
            Terjebak dalam{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-orange-400 underline decoration-amber-500/50 underline-offset-8">
              "Ilusi Saldo Kas Operasional"
            </span>
          </h2>

          <p className="text-base text-neutral-300 font-medium max-w-3xl leading-relaxed text-center">
            Bukan karena sepi pelanggan, melainkan karena uang dianggap bebas dibelanjakan tanpa memperhitungkan komitmen jatuh tempo minggu depan.
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 3: Grand Solution Reveal JagaUsaha (46.8s - 57.6s / Frames 1405 - 1728) */}
      {/* ------------------------------------------------------------- */}
      {frame >= 1405 && frame < 1728 && (
        <div
          className="flex flex-col items-center max-w-4xl"
          style={{
            opacity: p3Opacity,
            transform: `translateY(${p3TranslateY}px) scale(${p3Scale})`,
          }}
        >
          {/* Glowing Shield Beacon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-2xl animate-pulse" />
            <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/50 border border-emerald-300/40">
              <ShieldCheck className="h-10 w-10" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Solusi Nyata Likuiditas UMKM</span>
          </div>

          <h1 className="text-6xl font-black text-white tracking-tight leading-none mb-4">
            JagaUsaha
          </h1>

          <p className="text-2xl text-emerald-400 font-bold tracking-tight mb-6">
            Autonomous Financial Guardian untuk UMKM Indonesia
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-neutral-300">
            <span className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700">
              🛡️ Proteksi Kas H-14
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700">
              ⚡ 0% Halusinasi DLMM Math
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700">
              🖥️ CloudBaik Cloud VPS (103.30.146.174)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
