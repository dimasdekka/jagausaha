"use client";
// beui.dev/components/motion/animated-badge

import {
  AlertTriangle,
  Check,
  Circle,
  Info,
  LoaderCircle,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "../../lib/ease";
import { cn } from "../../lib/utils";

export type AnimatedBadgeStatus =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "loading";

export type AnimatedBadgeSize = "sm" | "md";

export interface AnimatedBadgeProps
  extends Omit<HTMLMotionProps<"span">, "children"> {
  status?: AnimatedBadgeStatus;
  size?: AnimatedBadgeSize;
  children?: ReactNode;
  icon?: ReactNode;
  showIcon?: boolean;
  pulse?: boolean;
  contentKey?: string | number;
}

const STATUS_CLASS: Record<AnimatedBadgeStatus, string> = {
  neutral: "border-neutral-200 bg-neutral-50 text-neutral-600",
  info: "border-neutral-300 bg-neutral-100 text-neutral-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  loading: "border-neutral-300 bg-neutral-100 text-neutral-900",
};

const SIZE_CLASS: Record<AnimatedBadgeSize, string> = {
  sm: "h-6 gap-1.5 px-2.5 text-[11px]",
  md: "h-7 gap-2 px-3 text-xs",
};

const ICON_CLASS: Record<AnimatedBadgeSize, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
};

const ICONS: Record<AnimatedBadgeStatus, LucideIcon> = {
  neutral: Circle,
  info: Info,
  success: Check,
  warning: AlertTriangle,
  danger: X,
  loading: LoaderCircle,
};

const ICON_ROLL_VARIANTS: Variants = {
  initial: {
    opacity: 0.72,
    y: "80%",
    scale: 0.92,
    rotate: -8,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: "0%",
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      y: { type: "spring", stiffness: 260, damping: 24, mass: 0.85 },
      scale: { type: "spring", stiffness: 280, damping: 24, mass: 0.75 },
      rotate: { duration: 0.22, ease: EASE_OUT },
      opacity: { duration: 0.22, ease: EASE_OUT },
      filter: { duration: 0.3, ease: EASE_OUT },
    },
  },
  exit: {
    opacity: 0.5,
    y: "-80%",
    scale: 0.96,
    rotate: 8,
    filter: "blur(4px)",
    transition: { duration: 0.18, ease: EASE_OUT },
  },
};

const TEXT_ROLL_VARIANTS: Variants = {
  initial: { opacity: 0.76, y: "85%", filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: {
      y: { type: "spring", stiffness: 260, damping: 24, mass: 0.85 },
      opacity: { duration: 0.22, ease: EASE_OUT },
      filter: { duration: 0.3, ease: EASE_OUT },
    },
  },
  exit: {
    opacity: 0.5,
    y: "-85%",
    filter: "blur(4px)",
    transition: { duration: 0.18, ease: EASE_OUT },
  },
};

export function AnimatedBadge({
  status = "neutral",
  size = "sm",
  children,
  icon,
  showIcon = true,
  pulse = status === "loading",
  contentKey,
  className,
  ...rest
}: AnimatedBadgeProps) {
  const reduce = useReducedMotion();
  const Icon = ICONS[status];
  const resolvedContentKey =
    contentKey ??
    (typeof children === "string" || typeof children === "number"
      ? children
      : status);

  return (
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.7 }}
      className={cn(
        "relative inline-flex shrink-0 items-center overflow-hidden whitespace-nowrap rounded-full border font-medium",
        "transition-colors duration-200",
        STATUS_CLASS[status],
        SIZE_CLASS[size],
        className,
      )}
      {...rest}
    >
      {pulse && !reduce ? (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-current opacity-10"
          animate={{ scale: [0.95, 1.06, 0.95], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      {showIcon ? (
        <span className="relative z-10 inline-flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={status}
              aria-hidden
              data-badge-icon
              variants={ICON_ROLL_VARIANTS}
              initial={reduce ? false : "initial"}
              animate={reduce ? { opacity: 1 } : "animate"}
              exit={reduce ? undefined : "exit"}
              className="inline-flex will-change-transform"
            >
              {status === "loading" && !reduce && !icon ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-flex"
                >
                  <Icon className={ICON_CLASS[size]} />
                </motion.span>
              ) : (
                (icon ?? <Icon className={ICON_CLASS[size]} />)
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      ) : null}
      {children != null ? (
        <span className="relative z-10 inline-flex overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={resolvedContentKey}
              data-badge-label
              variants={TEXT_ROLL_VARIANTS}
              initial={reduce ? false : "initial"}
              animate={reduce ? { opacity: 1 } : "animate"}
              exit={reduce ? undefined : "exit"}
              className="inline-block will-change-transform"
            >
              {children}
            </motion.span>
          </AnimatePresence>
        </span>
      ) : null}
    </motion.span>
  );
}
