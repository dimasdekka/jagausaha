"use client";
// beui.dev/components/motion/animated-toast-stack

import {
  AlertCircle,
  Bell,
  Check,
  Info,
  LoaderCircle,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

export type ToastStatus = "neutral" | "info" | "loading" | "success" | "error";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type AnimatedToastAction = {
  label: ReactNode;
  onClick: (toast: AnimatedToast) => void;
};

export type AnimatedToast = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  status?: ToastStatus;
  icon?: ReactNode;
  action?: AnimatedToastAction;
  duration?: number;
  dismissible?: boolean;
  createdAt?: number;
};

export type ToastInput = Omit<AnimatedToast, "id" | "createdAt"> & {
  id?: string;
};

export type ToastClassNames = {
  root?: string;
  item?: string;
  surface?: string;
  iconWrap?: string;
  content?: string;
  title?: string;
  description?: string;
  action?: string;
  close?: string;
  progress?: string;
};

export interface AnimatedToastStackProps {
  toasts: AnimatedToast[];
  onDismiss?: (id: string) => void;
  position?: ToastPosition;
  placement?: "static" | "fixed" | "absolute";
  fixed?: boolean;
  portal?: boolean;
  portalRoot?: Element | null;
  maxVisible?: number;
  className?: string;
  classNames?: ToastClassNames;
  icons?: Partial<Record<ToastStatus, LucideIcon>>;
  renderToast?: (toast: AnimatedToast) => ReactNode;
}

export interface UseAnimatedToastStackOptions {
  initialToasts?: ToastInput[];
  defaultDuration?: number;
  limit?: number;
}

const STACK_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.75,
};

const STATUS_ICON: Record<ToastStatus, LucideIcon> = {
  neutral: Bell,
  info: Info,
  loading: LoaderCircle,
  success: Check,
  error: AlertCircle,
};

const STATUS_CLASS: Record<ToastStatus, string> = {
  neutral: "text-neutral-600 bg-neutral-100",
  info: "text-neutral-900 bg-neutral-100",
  loading: "text-neutral-900 bg-neutral-100",
  success: "text-emerald-700 bg-emerald-50 border border-emerald-200/80",
  error: "text-rose-700 bg-rose-50 border border-rose-200/80",
};

const POSITION_CLASS: Record<ToastPosition, string> = {
  "top-left": "left-4 top-4",
  "top-center": "left-1/2 top-4 -translate-x-1/2",
  "top-right": "right-4 top-4",
  "bottom-left": "bottom-6 left-4",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-6 right-4 sm:right-6",
};

let idSeed = 0;

function createToast(input: ToastInput, defaultDuration: number): AnimatedToast {
  return {
    duration: defaultDuration,
    dismissible: true,
    ...input,
    id: input.id ?? `toast-${Date.now()}-${idSeed++}`,
    createdAt: Date.now(),
  };
}

export function useAnimatedToastStack({
  initialToasts = [],
  defaultDuration = 4200,
  limit,
}: UseAnimatedToastStackOptions = {}) {
  const toastTimers = useRef<Map<string, { timer: number; signature: string }>>(new Map());
  const [toasts, setToasts] = useState<AnimatedToast[]>(() =>
    initialToasts.map((toast) => createToast(toast, defaultDuration)),
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (input: ToastInput) => {
      const toast = createToast(input, defaultDuration);
      setToasts((current) => {
        const next = [...current, toast];
        return typeof limit === "number" ? next.slice(-limit) : next;
      });
      return toast.id;
    },
    [defaultDuration, limit],
  );

  const updateToast = useCallback((id: string, patch: Partial<AnimatedToast>) => {
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              ...patch,
              id,
              createdAt: patch.duration === undefined ? toast.createdAt : Date.now(),
            }
          : toast,
      ),
    );
  }, []);

  useEffect(() => {
    const activeIds = new Set(toasts.map((toast) => toast.id));

    toastTimers.current.forEach((entry, id) => {
      if (!activeIds.has(id)) {
        window.clearTimeout(entry.timer);
        toastTimers.current.delete(id);
      }
    });

    toasts.forEach((toast) => {
      const duration = toast.duration ?? defaultDuration;
      const existing = toastTimers.current.get(toast.id);

      if (duration <= 0) {
        if (existing) {
          window.clearTimeout(existing.timer);
          toastTimers.current.delete(toast.id);
        }
        return;
      }

      const createdAt = toast.createdAt ?? Date.now();
      const signature = `${createdAt}:${duration}`;

      if (existing?.signature === signature) {
        return;
      }

      if (existing) {
        window.clearTimeout(existing.timer);
      }

      const elapsed = Date.now() - createdAt;
      const remaining = Math.max(duration - elapsed, 0);
      const timer = window.setTimeout(() => {
        toastTimers.current.delete(toast.id);
        dismissToast(toast.id);
      }, remaining);

      toastTimers.current.set(toast.id, { timer, signature });
    });
  }, [defaultDuration, dismissToast, toasts]);

  useEffect(() => {
    const timers = toastTimers.current;

    return () => {
      timers.forEach((entry) => {
        window.clearTimeout(entry.timer);
      });
      timers.clear();
    };
  }, []);

  return useMemo(
    () => ({
      toasts,
      showToast,
      updateToast,
      dismissToast,
      clearToasts,
      setToasts,
    }),
    [clearToasts, dismissToast, showToast, toasts, updateToast],
  );
}

export function AnimatedToastStack({
  toasts,
  onDismiss,
  position = "bottom-right",
  placement,
  fixed = true,
  portal = true,
  portalRoot,
  maxVisible = 4,
  className,
  classNames,
  icons,
  renderToast,
}: AnimatedToastStackProps) {
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  const visibleToasts = toasts.slice(-maxVisible);
  const isBottom = position.startsWith("bottom");
  const resolvedPlacement = placement ?? (fixed ? "fixed" : "static");
  const shouldPortal = portal ?? resolvedPlacement === "fixed";

  useEffect(() => {
    setPortalTarget(shouldPortal ? (portalRoot ?? document.body) : null);
  }, [portalRoot, shouldPortal]);

  const stack = (
    <div
      role="region"
      aria-label="Notifications"
      className={cn(
        "z-50 flex w-full max-w-sm flex-col gap-2.5 pointer-events-none p-4",
        resolvedPlacement === "fixed" && "fixed",
        resolvedPlacement === "absolute" && "absolute",
        POSITION_CLASS[position],
        isBottom ? "justify-end" : "justify-start",
        className,
        classNames?.root,
      )}
    >
      <AnimatePresence initial={false}>
        {visibleToasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            index={visibleToasts.length - 1 - index}
            onDismiss={onDismiss}
            classNames={classNames}
            icons={icons}
            renderToast={renderToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  if (shouldPortal && !portalTarget) {
    return null;
  }

  if (shouldPortal && portalTarget) {
    return createPortal(stack, portalTarget);
  }

  return stack;
}

const ToastItem = memo(function ToastItem({
  toast,
  index,
  onDismiss,
  classNames,
  icons,
}: {
  toast: AnimatedToast;
  index: number;
  onDismiss?: (id: string) => void;
  classNames?: ToastClassNames;
  icons?: Partial<Record<ToastStatus, LucideIcon>>;
  renderToast?: (toast: AnimatedToast) => ReactNode;
}) {
  const reduce = useReducedMotion();
  const status = toast.status ?? "neutral";
  const Icon = STATUS_ICON[status];
  const iconNode = icons?.[status] ? React.createElement(icons[status]!, { className: "h-4 w-4" }) : toast.icon ?? <Icon className="h-4 w-4" />;
  const canDismiss = toast.dismissible !== false && Boolean(onDismiss);

  return (
    <motion.div
      layout
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 16, scale: 0.94, filter: "blur(4px)" }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1 - index * 0.03,
        filter: "blur(0px)",
      }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.9, y: 12, filter: "blur(4px)" }
      }
      transition={STACK_SPRING}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.4}
      onDragEnd={(_, info) => {
        if (!canDismiss || !onDismiss) return;
        if (Math.abs(info.offset.x) > 72 || Math.abs(info.velocity.x) > 520) {
          onDismiss(toast.id);
        }
      }}
      className={cn("pointer-events-auto relative will-change-transform", classNames?.item)}
      style={{ zIndex: 20 - index }}
    >
      <div
        className={cn(
          "flex w-full items-start gap-3 rounded-2xl border border-neutral-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-md",
          classNames?.surface,
        )}
      >
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            STATUS_CLASS[status],
            classNames?.iconWrap,
          )}
        >
          {iconNode}
        </div>

        <div className={cn("flex-1 min-w-0 pt-0.5", classNames?.content)}>
          <div className={cn("text-xs font-semibold text-neutral-950", classNames?.title)}>
            {toast.title}
          </div>
          {toast.description ? (
            <div className={cn("text-xs text-neutral-600 mt-0.5 leading-relaxed", classNames?.description)}>
              {toast.description}
            </div>
          ) : null}

          {toast.action ? (
            <button
              type="button"
              onClick={() => toast.action?.onClick(toast)}
              className={cn(
                "mt-2.5 inline-flex h-7 items-center rounded-full bg-neutral-900 px-3 text-[11px] font-medium text-white transition-colors hover:bg-neutral-800 active:scale-95",
                classNames?.action,
              )}
            >
              {toast.action.label}
            </button>
          ) : null}
        </div>

        {canDismiss ? (
          <button
            type="button"
            onClick={() => onDismiss?.(toast.id)}
            aria-label="Dismiss toast"
            className={cn(
              "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900",
              classNames?.close,
            )}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    </motion.div>
  );
});
