import React from 'react';
import { Sequence, staticFile } from 'remotion';
import { Audio } from '@remotion/media';

import { AfterEffectsWatermark } from './components/AfterEffectsWatermark';
import { KineticAnimatedSubtitles } from './components/KineticAnimatedSubtitles';
import { IntroScene } from './scenes/IntroScene';
import { Scene2Vps } from './scenes/Scene2Vps';
import { Scene3Onboarding } from './scenes/Scene3Onboarding';
import { Scene4Simulation } from './scenes/Scene4Simulation';
import { Scene5Closing } from './scenes/Scene5Closing';

export const MainVideo: React.FC = () => {
  // Exact frame timing synced with master George ElevenLabs voiceover + broadcast audio bed (385.13s / 6m 25.13s)
  const ACT1_FRAMES = 2107; // 70.22s
  const ACT2_FRAMES = 2505; // 83.50s
  const ACT3_FRAMES = 2515; // 83.82s
  const ACT4_FRAMES = 2074; // 69.15s
  const ACT5_FRAMES = 2353; // 78.44s

  const act1Start = 0;
  const act2Start = act1Start + ACT1_FRAMES;
  const act3Start = act2Start + ACT2_FRAMES;
  const act4Start = act3Start + ACT3_FRAMES;
  const act5Start = act4Start + ACT4_FRAMES;

  return (
    <div className="w-full h-full bg-neutral-950 relative overflow-hidden">
      {/* 1. Global Persistent Overlays (IDwebhost Watermark & Bottom Progress Line) */}
      <AfterEffectsWatermark />

      {/* 1b. Kinetic Animated Subtitles (Word-by-word motion blur highlight, non-intrusive bottom pill) */}
      <KineticAnimatedSubtitles />

      {/* 2. Global Master Voiceover with Ambient Music Bed */}
      <Audio src={staticFile('audio/engaging_master_voiceover.mp3')} volume={1} />

      {/* 3. Act Sequences */}
      {/* Act 1: Kinetic Hero Hook + 3D Landing Page */}
      <Sequence from={act1Start} durationInFrames={ACT1_FRAMES}>
        <IntroScene />
      </Sequence>

      {/* Act 2: Live SSH Terminal CloudBaik VPS & AI Infrastructure */}
      <Sequence from={act2Start} durationInFrames={ACT2_FRAMES}>
        <Scene2Vps />
      </Sequence>

      {/* Act 3: Unified Multi-Modal Onboarding & Digital Twin */}
      <Sequence from={act3Start} durationInFrames={ACT3_FRAMES}>
        <Scene3Onboarding />
      </Sequence>

      {/* Act 4: Decision Studio, DLMM FastMath & Deficit Alert */}
      <Sequence from={act4Start} durationInFrames={ACT4_FRAMES}>
        <Scene4Simulation />
      </Sequence>

      {/* Act 5: WhatsApp Negotiation & Grand Closing Showcase */}
      <Sequence from={act5Start} durationInFrames={ACT5_FRAMES}>
        <Scene5Closing />
      </Sequence>
    </div>
  );
};
