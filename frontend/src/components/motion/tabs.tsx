"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";

type Variant = "pill" | "segment";

type TabsContextType = {
  value: string;
  onValueChange: (val: string) => void;
  layoutId: string;
  variant: Variant;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs compound components must be used within <Tabs>");
  return context;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  variant = "pill",
  children,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const layoutId = useId();
  const current = value !== undefined ? value : internal;

  const handleValueChange = (val: string) => {
    if (value === undefined) setInternal(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider
      value={{
        value: current,
        onValueChange: handleValueChange,
        layoutId,
        variant,
      }}
    >
      <div className={cn("inline-flex items-center", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { variant } = useTabsContext();

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center p-1 gap-1",
        variant === "pill" ? "rounded-full bg-neutral-100/90 border border-neutral-200/80" : "rounded-lg bg-neutral-100",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: current, onValueChange, layoutId, variant } = useTabsContext();
  const active = current === value;
  const reduce = useReducedMotion();

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative z-10 inline-flex items-center justify-center px-3.5 py-1 text-xs font-medium transition-colors outline-none",
        active ? "text-neutral-950 font-semibold" : "text-neutral-500 hover:text-neutral-800",
        variant === "pill" ? "rounded-full" : "rounded-md",
        className,
      )}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 450, damping: 35 }
          }
          className={cn(
            "absolute inset-0 bg-white shadow-sm border border-neutral-200/70 -z-10",
            variant === "pill" ? "rounded-full" : "rounded-md",
          )}
        />
      )}
      <span>{children}</span>
    </button>
  );
}
