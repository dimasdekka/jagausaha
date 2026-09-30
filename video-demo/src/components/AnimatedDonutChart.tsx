import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface AnimatedDonutProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  delay?: number;
}

export const AnimatedDonutChart: React.FC<AnimatedDonutProps> = ({
  percentage = 82,
  size = 180,
  strokeWidth = 14,
  color = '#f43f5e',
  label = 'Krisis Kas',
  delay = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Spring animation for drawing the circle - Silky smooth broadcast ease
  const progressSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 24, stiffness: 50, mass: 0.9 },
  });

  const animatedPercent = Math.min(percentage, Math.round(interpolate(progressSpring, [0, 1], [0, percentage])));
  const strokeDashoffset = circumference - (circumference * (animatedPercent / 100));

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Glowing Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 12px ${color}88)`,
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-white tracking-tight">
            {animatedPercent}%
          </span>
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
