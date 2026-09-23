import React from 'react';

interface JagaUsahaLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

/**
 * JagaUsaha Official Emblem:
 * Interlocking geometric Guardian Shield & Rising Capital Curve (J-U Motif),
 * featuring an obsidian chassis with an emerald liquidity nexus.
 */
export const JagaUsahaLogo: React.FC<JagaUsahaLogoProps> = ({
  size = 36,
  className = '',
  showWordmark = false,
  wordmarkClassName = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Emblem SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <defs>
          {/* Obsidian Base Gradient */}
          <linearGradient id="ju-chassis" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Emerald Growth Trajectory Gradient */}
          <linearGradient id="ju-emerald" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Golden Safety Accent */}
          <linearGradient id="ju-gold" x1="20" y1="14" x2="32" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Subtle Specular Top Highlight */}
          <linearGradient id="ju-specular" x1="10" y1="6" x2="38" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Outer Hexagonal Shield Chassis */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="13"
          fill="url(#ju-chassis)"
          stroke="#334155"
          strokeWidth="1.2"
        />

        {/* Top Glass Specular Overlay */}
        <path
          d="M4 16C4 9.37 9.37 4 16 4H32C38.63 4 44 9.37 44 16V22C34 20 18 20 4 24V16Z"
          fill="url(#ju-specular)"
        />

        {/* 2. Guardian Shield Outer Wing (Left curve forming 'J') */}
        <path
          d="M14 15V27C14 32.52 18.48 37 24 37C27.31 37 30.25 35.39 32.06 32.9L28.18 29.8C27.17 31.2 25.68 32 24 32C21.24 32 19 29.76 19 27V21H24V16H15C14.45 16 14 15.55 14 15Z"
          fill="#F8FAFC"
        />

        {/* 3. Dynamic Rising Cash Curve / Forward Sentinel (Right wing forming 'U' nexus) */}
        <path
          d="M23 13L33 13C34.1 13 35 13.9 35 15V26C35 30.97 30.97 35 26 35L24 35C24 35 29 32 29 26V18L24 18C23.45 18 23 17.55 23 17V13Z"
          fill="url(#ju-emerald)"
        />

        {/* 4. Liquidity Core Diamond Spark (Safe-to-Spend Nexus) */}
        <path
          d="M24 19L27 23L24 27L21 23L24 19Z"
          fill="url(#ju-gold)"
        />
        <circle cx="24" cy="23" r="1.5" fill="#FFFFFF" />
      </svg>

      {/* Optional Wordmark */}
      {showWordmark && (
        <span className={`flex items-baseline tracking-tight font-sans ${wordmarkClassName}`}>
          <span className="font-extrabold text-neutral-950 text-base">Jaga</span>
          <span className="font-extrabold text-emerald-600 text-base">Usaha</span>
        </span>
      )}
    </div>
  );
};
