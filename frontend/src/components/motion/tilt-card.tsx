"use client";
// beui.dev/components/motion/tilt-card

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { SPRING_MOUSE } from "../../lib/ease";
import { useHoverCapable } from "../../lib/hooks/use-hover-capable";
import { cn } from "../../lib/utils";

export interface TiltCardProps {
  children: ReactNode;
  max?: number;
  glare?: boolean;
  className?: string;
}

export function TiltCard({
  children,
  max = 8,
  glare = true,
  className,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const enabled = !reduce && canHover;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const srx = useSpring(rx, SPRING_MOUSE);
  const sry = useSpring(ry, SPRING_MOUSE);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max);
    rx.set((0.5 - py) * max);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.08), transparent 65%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        enabled
          ? {
              transformStyle: "preserve-3d",
              rotateX: srx,
              rotateY: sry,
            }
          : undefined
      }
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && enabled ? (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
        />
      ) : null}
    </motion.div>
  );
}
