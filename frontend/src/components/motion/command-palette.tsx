"use client";
// beui.dev/components/blocks/command-palette adapted for JagaUsaha (Linear / Raycast Tier)

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  ArrowRight,
} from "lucide-react";
import { EASE_OUT } from "../../lib/ease";
import { cn } from "../../lib/utils";

export type CommandItem = {
  id: string;
  label: string;
  group?: string;
  hint?: string;
  keywords?: string[];
  icon?: React.ElementType;
  badge?: React.ReactNode;
  onSelect: () => void;
};

export interface CommandPaletteProps {
  items: CommandItem[];
  shortcut?: string;
  placeholder?: string;
  emptyMessage?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PANEL_SPRING = {
  type: "spring",
  stiffness: 560,
  damping: 40,
  mass: 0.5,
} as const;

export function CommandPalette({
  items,
  shortcut = "k",
  placeholder = "Cari skenario, arsitektur agen, kalkulasi kas...",
  emptyMessage = "Tidak ada hasil pencarian ditemukan.",
  open: controlledOpen,
  onOpenChange,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = controlledOpen !== undefined;
  const open = controlled ? controlledOpen : internalOpen;

  const setOpen = (v: boolean) => {
    if (!controlled) setInternalOpen(v);
    onOpenChange?.(v);
  };

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  // Listen to Cmd/Ctrl + K and ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === shortcut.toLowerCase()
      ) {
        e.preventDefault();
        setOpen(!open);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shortcut]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const frame = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }
  }, [open]);

  // Filter items based on query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      const matchLabel = it.label.toLowerCase().includes(q);
      const matchGroup = it.group?.toLowerCase().includes(q);
      const matchKeywords = it.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchLabel || matchGroup || matchKeywords;
    });
  }, [items, query]);

  // Group items
  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((it) => {
      const g = it.group ?? "Menu Cepat";
      const list = map.get(g) ?? [];
      list.push(it);
      map.set(g, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const flatRows = useMemo(() => grouped.flatMap(([, list]) => list), [grouped]);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(1, flatRows.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + flatRows.length) % Math.max(1, flatRows.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatRows[activeIndex];
      if (item) {
        item.onSelect();
        setOpen(false);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-[14vh] px-4">
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12, ease: EASE_OUT } }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-neutral-950/50 backdrop-blur-md cursor-pointer"
          />

          {/* Panel Container (Crisp Solid White Surface) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette JagaUsaha"
            initial={{
              opacity: 0,
              y: reduce ? 0 : -10,
              scale: reduce ? 1 : 0.96,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: reduce ? 0 : -8,
              scale: reduce ? 1 : 0.96,
              transition: { duration: 0.12, ease: EASE_OUT },
            }}
            transition={reduce ? { duration: 0.1 } : PANEL_SPRING}
            onKeyDown={onKeyDown}
            style={{ backgroundColor: '#FFFFFF' }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl will-change-transform flex flex-col"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-neutral-100 bg-white px-4 py-3.5">
              <Search className="h-4 w-4 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent text-sm font-medium text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-500 shadow-2xs">
                ESC
              </kbd>
            </div>

            {/* Listbox with Smooth Bottom Fade Mask */}
            <div
              ref={listRef}
              role="listbox"
              className="max-h-[50vh] overflow-y-auto p-3 space-y-4 bg-white"
            >
              {flatRows.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500">
                  {emptyMessage}
                </div>
              ) : (
                grouped.map(([group, list]) => (
                  <div key={group} className="space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      {group}
                    </div>
                    <div className="space-y-1">
                      {list.map((it) => {
                        const idx = flatRows.indexOf(it);
                        const isActive = idx === activeIndex;
                        const Icon = it.icon;
                        return (
                          <button
                            key={it.id}
                            type="button"
                            data-index={idx}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => {
                              it.onSelect();
                              setOpen(false);
                            }}
                            className={cn(
                              "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-colors cursor-pointer",
                              isActive
                                ? "bg-neutral-950 text-white font-medium shadow-xs"
                                : "text-neutral-700 hover:bg-neutral-100/70",
                            )}
                          >
                            {Icon && (
                              <Icon
                                className={cn(
                                  "h-4 w-4 shrink-0",
                                  isActive ? "text-emerald-400" : "text-neutral-500",
                                )}
                              />
                            )}
                            <span className="flex-1 truncate">{it.label}</span>
                            {it.badge && (
                              <span
                                className={cn(
                                  "shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium border",
                                  isActive
                                    ? "bg-neutral-800 text-neutral-200 border-neutral-700"
                                    : "bg-neutral-100 text-neutral-600 border-neutral-200/70",
                                )}
                              >
                                {it.badge}
                              </span>
                            )}
                            {it.hint && (
                              <span
                                className={cn(
                                  "shrink-0 text-[10px]",
                                  isActive ? "text-neutral-400" : "text-neutral-400",
                                )}
                              >
                                {it.hint}
                              </span>
                            )}
                            {isActive && (
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Hint */}
            <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-4 py-2.5 text-[11px] text-neutral-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.2 font-mono text-[9px] font-semibold text-neutral-700 shadow-2xs">↑↓</kbd> Navigasi
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.2 font-mono text-[9px] font-semibold text-neutral-700 shadow-2xs">↵</kbd> Pilih
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                JagaUsaha AI Suite
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
