"use client";
// beui.dev/components/motion/button

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { SPRING_PRESS } from "../../lib/ease";
import { cn } from "../../lib/utils";

export interface MotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  function MotionButton(
    {
      children,
      variant = "primary",
      size = "md",
      className,
      disabled,
      ...props
    },
    ref,
  ) {
    const reduce = useReducedMotion();

    const variants = {
      primary:
        "bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm border border-neutral-950",
      secondary:
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200/80 border border-neutral-200/60",
      outline:
        "bg-white text-neutral-900 hover:bg-neutral-50 border border-neutral-300 shadow-sm",
      ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-full h-8",
      md: "px-5 py-2 text-xs font-medium rounded-full h-10",
      lg: "px-7 py-3 text-sm font-medium rounded-full h-12",
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        whileTap={reduce || disabled ? undefined : { scale: 0.97 }}
        transition={SPRING_PRESS}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-sans transition-colors outline-none select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variants[variant],
          sizes[size],
          className,
        )}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  },
);
