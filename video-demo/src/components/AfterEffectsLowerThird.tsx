import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { LucideIcon, Sparkles } from 'lucide-react';

interface LowerThirdProps {
  title: string;
  subtitle: string;
  badge: string;
  badgeColor?: 'emerald' | 'amber' | 'blue' | 'rose' | 'purple';
  icon?: LucideIcon;
  enterFrame?: number;
  exitFrame?: number;
}

export const AfterEffectsLowerThird: React.FC<LowerThirdProps> = ({
  title,
  subtitle,
  badge,
  badgeColor = 'emerald',
  icon: Icon = Sparkles,
  enterFrame = 15,
  exitFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring with smooth elegant ease
  const enterSpring = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 26, stiffness: 45, mass: 0.9 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [25, 0]);
  const exitOpacity = exitFrame
    ? interpolate(frame, [exitFrame - 20, exitFrame], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]) * exitOpacity;

  const colorStyles = {
    emerald: 'from-emerald-400 to-teal-500 text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    amber: 'from-amber-400 to-orange-500 text-amber-400 bg-amber-500/15 border-amber-500/30',
    blue: 'from-sky-400 to-blue-500 text-sky-400 bg-sky-500/15 border-sky-500/30',
    rose: 'from-rose-400 to-pink-500 text-rose-400 bg-rose-500/15 border-rose-500/30',
    purple: 'from-purple-400 to-indigo-500 text-purple-400 bg-purple-500/15 border-purple-500/30',
  }[badgeColor];

  return (
    <div
      className="absolute bottom-12 left-12 z-40 flex items-center shadow-2xl rounded-2xl overflow-hidden border border-neutral-700/80 bg-neutral-950/95 backdrop-blur-xl text-white pointer-events-none max-w-2xl"
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* Gradient Accent Bar on the Left */}
      <div className={`w-2.5 self-stretch bg-gradient-to-b ${colorStyles.split(' ')[0]} ${colorStyles.split(' ')[1]}`} />

      <div className="py-4 px-6 flex items-center gap-5">
        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br ${colorStyles.split(' ')[0]} ${colorStyles.split(' ')[1]} shadow-lg`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded border tracking-wider ${colorStyles.split(' ').slice(2).join(' ')}`}
            >
              {badge}
            </span>
            <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-emerald-400" /> JagaUsaha Showcase
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">
            {title}
          </h3>
          <p className="text-xs text-neutral-300 font-medium leading-relaxed mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
