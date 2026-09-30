import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { AlertTriangle, ShieldCheck, TrendingDown } from 'lucide-react';

interface AnimatedCashChartProps {
  startFrame?: number;
  showMitigationAt?: number;
  width?: number;
  height?: number;
}

export const AnimatedCashChart: React.FC<AnimatedCashChartProps> = ({
  startFrame = 20,
  showMitigationAt = 160,
  width = 960,
  height = 420,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation progress for the first (deficit) curve: frames 20 to 120
  const drawDeficit = interpolate(frame, [startFrame, startFrame + 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animation progress for the mitigation (green) curve: frames showMitigationAt to showMitigationAt + 70
  const drawMitigation = interpolate(
    frame,
    [showMitigationAt, showMitigationAt + 70],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Deficit marker beacon pulse at Day 6
  const beaconSpring = spring({
    frame: frame - (startFrame + 50),
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const beaconPulse = frame >= startFrame + 50 ? 1 + Math.sin(frame * 0.3) * 0.25 : 0;

  // Mitigation badge spring
  const mitBadgeSpring = spring({
    frame: frame - (showMitigationAt + 35),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Chart coordinates (width: 960, height: 420, padding: 60)
  // X mapping: Day 0 = 80px, Day 6 = 380px, Day 14 = 880px
  // Y mapping: +18.5 Jt = 60px, +10 Jt = 120px, +3 Jt (cadangan) = 175px, Rp 0 = 210px, -5 Jt = 280px
  const zeroY = 210;
  const reserveY = 175;

  // Deficit curve SVG path (Total length ~1100) - Elevated safely above bottom card border
  // Day 0: (80, 60) [18.5 Jt]
  // Day 3: (220, 75) [17.0 Jt]
  // Day 6: (380, 265) [-3.37 Jt DEFISIT!]
  // Day 9: (540, 245) [-2.1 Jt]
  // Day 14: (880, 190) [+1.8 Jt]
  const deficitPath = 'M 80,60 C 160,65 220,75 280,105 C 330,140 350,230 380,265 C 430,290 500,245 580,235 C 680,225 780,200 880,190';
  const pathTotalLength = 1100;
  const deficitDashoffset = pathTotalLength * (1 - drawDeficit);

  // Mitigation curve SVG path (DP 50% applied):
  // Day 0: (80, 60) [18.5 Jt]
  // Day 3: (220, 95) [14.0 Jt]
  // Day 6: (380, 150) [+7.2 Jt AMAN!]
  // Day 10: (600, 135) [+8.5 Jt]
  // Day 14: (880, 125) [+9.5 Jt]
  const mitigationPath = 'M 80,60 C 160,75 240,95 300,120 C 350,140 365,150 380,150 C 440,150 520,140 640,135 C 740,130 820,128 880,125';
  const mitDashoffset = pathTotalLength * (1 - drawMitigation);

  return (
    <div
      className="relative rounded-3xl p-6 bg-neutral-950/95 border border-neutral-800 shadow-2xl backdrop-blur-2xl overflow-hidden text-white"
      style={{ width, height }}
    >
      {/* Chart Top Header & KPI summary */}
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <TrendingDown className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Simulasi Deterministik DLMM FastMath
            </div>
            <div className="text-sm font-extrabold text-white">
              Proyeksi Arus Kas 14 Hari — Kopi Teras Barokah
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-6 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            <span className="text-rose-400">Beli Mesin Kopi Tunai (Rp 14 Jt)</span>
          </div>
          {frame >= showMitigationAt && (
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-6 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
              <span className="text-emerald-400 font-bold">Mitigasi: DP 50%</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG Canvas for High-End Motion Graphics Chart */}
      <div className="relative w-full h-[320px]">
        <svg width="100%" height="100%" viewBox="0 0 920 360" className="overflow-visible">
          <defs>
            {/* Deficit Crimson Gradient Glow */}
            <linearGradient id="deficitGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>

            {/* Recovery Emerald Gradient Glow */}
            <linearGradient id="recoveryGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="80" y1="60" x2="880" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <line x1="80" y1="120" x2="880" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          {/* Cadangan Kas Line (+Rp 3 Jt) */}
          <line x1="80" y1={reserveY} x2="880" y2={reserveY} stroke="#f59e0b" strokeOpacity="0.4" strokeDasharray="3 3" />
          <text x="890" y={reserveY + 4} fill="#f59e0b" fontSize="10" fontWeight="bold">
            Cadangan Rp 3 Jt
          </text>

          {/* Neutral Rp 0 Line (Threshold between profit and bankruptcy) */}
          <line x1="80" y1={zeroY} x2="880" y2={zeroY} stroke="#94a3b8" strokeWidth="1.5" strokeOpacity="0.6" />
          <text x="35" y={zeroY + 4} fill="#94a3b8" fontSize="11" fontWeight="bold">
            Rp 0
          </text>

          {/* Y-axis Labels */}
          <text x="25" y="64" fill="#64748b" fontSize="10" fontWeight="bold">+18.5 Jt</text>
          <text x="25" y="124" fill="#64748b" fontSize="10" fontWeight="bold">+10.0 Jt</text>
          <text x="25" y="284" fill="#f43f5e" fontSize="10" fontWeight="bold">-5.0 Jt</text>

          {/* X-axis Days Labels */}
          <text x="80" y="300" fill="#64748b" fontSize="10">H+0 (Hari ini)</text>
          <text x="220" y="300" fill="#64748b" fontSize="10">H+3</text>
          <text x="380" y="300" fill="#f43f5e" fontSize="11" fontWeight="extrabold">H+6 (Gajian)</text>
          <text x="540" y="300" fill="#64748b" fontSize="10">H+9</text>
          <text x="700" y="300" fill="#64748b" fontSize="10">H+11</text>
          <text x="850" y="300" fill="#64748b" fontSize="10">H+14</text>

          {/* Day 6 Vertical Marker Line */}
          <line x1="380" y1="40" x2="380" y2="285" stroke="#f43f5e" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />

          {/* 1. Animated Deficit Line (Red) */}
          <path
            d={deficitPath}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3.5"
            strokeDasharray={pathTotalLength}
            strokeDashoffset={deficitDashoffset}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.7))',
            }}
          />

          {/* 2. Animated Mitigation Recovery Line (Green DP 50%) */}
          {frame >= showMitigationAt && (
            <path
              d={mitigationPath}
              fill="none"
              stroke="#34d399"
              strokeWidth="4"
              strokeDasharray={pathTotalLength}
              strokeDashoffset={mitDashoffset}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 12px rgba(52, 211, 153, 0.9))',
              }}
            />
          )}

          {/* Day 6 Pulsating Danger Beacon */}
          {frame >= startFrame + 50 && (
            <g transform="translate(380, 265)">
              {/* Outer Shockwave Ripple */}
              <circle
                r={16 * beaconPulse}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="1.5"
                opacity={0.6 / beaconPulse}
              />
              {/* Inner Pulsing Circle */}
              <circle r="7" fill="#f43f5e" stroke="#fff" strokeWidth="2" />
            </g>
          )}

          {/* Mitigation Point at Day 6 */}
          {frame >= showMitigationAt + 40 && (
            <g transform="translate(380, 150)">
              <circle r="8" fill="#34d399" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px #34d399)' }} />
            </g>
          )}
        </svg>

        {/* Floating Callout Tag: Day 6 Deficit Danger (Elevated with ample room below) */}
        {frame >= startFrame + 55 && (
          <div
            className="absolute z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-950/95 border border-rose-500/60 shadow-xl shadow-rose-950/60"
            style={{
              top: '210px',
              left: '400px',
              transform: `scale(${interpolate(beaconSpring, [0, 1], [0.75, 1])})`,
              opacity: beaconSpring,
            }}
          >
            <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
            <div>
              <div className="text-[10px] font-black text-rose-300 uppercase tracking-wider">
                Defisit Gaji Barista H+6
              </div>
              <div className="text-xs font-black text-white">
                -Rp 3.374.640
              </div>
            </div>
          </div>
        )}

        {/* Floating Callout Tag: DP 50% Recovery */}
        {frame >= showMitigationAt + 45 && (
          <div
            className="absolute z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/95 border border-emerald-400/80 shadow-xl shadow-emerald-950/60"
            style={{
              top: '95px',
              left: '400px',
              transform: `scale(${interpolate(mitBadgeSpring, [0, 1], [0.75, 1])})`,
              opacity: mitBadgeSpring,
            }}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] font-black text-emerald-300 uppercase tracking-wider">
                Saldo Kas Pulih Aman
              </div>
              <div className="text-xs font-black text-white">
                +Rp 4.200.000 di atas cadangan
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
