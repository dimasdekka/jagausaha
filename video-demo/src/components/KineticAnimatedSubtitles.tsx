import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { KINETIC_SUBTITLES, SubtitleCue } from '../data/kineticSubtitles';

export const KineticAnimatedSubtitles: React.FC = () => {
  const frame = useCurrentFrame();

  // Find active subtitle cue
  const activeCue: SubtitleCue | undefined = KINETIC_SUBTITLES.find(
    (cue) => frame >= cue.startFrame && frame <= cue.endFrame
  );

  if (!activeCue) return null;

  // Gentle fade transition, absolutely NO vertical jumping/jitter
  const opacity = interpolate(
    frame - activeCue.startFrame,
    [0, 6],
    [0.75, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      className="absolute bottom-12 left-0 right-0 flex items-center justify-center z-50 pointer-events-none px-6"
      style={{ opacity }}
    >
      {/* Sleek Ultra-Compact Frosted Glass Pill (Grounded & Stable, No Vertical Jumping) */}
      <div className="inline-flex items-center px-6 py-2 rounded-full bg-neutral-950/90 backdrop-blur-xl border border-neutral-700/60 shadow-[0_15px_35px_rgba(0,0,0,0.85)] max-w-3xl">
        {/* Word-by-Word Motion Blur & Highlight (Clean, no weird dots) */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center text-center">
          {activeCue.words.map((w, idx) => {
            const isSpoken = frame >= w.startFrame && frame <= w.endFrame;
            const hasPassed = frame > w.endFrame;

            let wordColor = '#cbd5e1'; // upcoming clean readable slate-300
            let wordBlur = 'none';
            let wordOpacity = 0.70;
            let wordShadow = 'none';

            if (isSpoken) {
              wordColor = '#34d399'; // Active glowing emerald
              wordBlur = 'none';
              wordOpacity = 1.0;
              wordShadow = '0 0 16px rgba(52, 211, 153, 0.9)';
            } else if (hasPassed) {
              wordColor = '#ffffff'; // Passed bright white
              wordBlur = 'none';
              wordOpacity = 1.0;
            }

            return (
              <span
                key={`${w.word}-${idx}`}
                className="text-lg sm:text-xl font-extrabold tracking-normal transition-all duration-150 inline-block"
                style={{
                  color: wordColor,
                  filter: wordBlur,
                  opacity: wordOpacity,
                  textShadow: wordShadow,
                }}
              >
                {w.word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
