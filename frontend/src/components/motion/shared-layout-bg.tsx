"use client";
// beui.dev/components/motion/shared-layout-bg

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Children,
  cloneElement,
  forwardRef,
  type HTMLAttributes,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
  useId,
  useState,
} from "react";
import { SPRING_LAYOUT } from "../../lib/ease";
import { cn } from "../../lib/utils";

export interface SharedLayoutBgProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children: ReactNode;
  as?: "div" | "nav" | "ul";
  pillClassName?: string;
  pillContainerClassName?: string;
}

const variants: Variants = {
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(4px)" },
};

const reducedVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const SharedLayoutBg = forwardRef<HTMLElement, SharedLayoutBgProps>(
  function SharedLayoutBg(
    {
      children,
      as = "nav",
      className,
      onMouseLeave,
      pillClassName,
      pillContainerClassName,
      ...props
    },
    forwardedRef,
  ) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const uid = useId();
    const reduce = useReducedMotion();

    const renderedChildren = Children.toArray(children)
      .filter(isValidElement)
      .map((child, index) => {
        const el = child as ReactElement<{
          className?: string;
          onMouseEnter?: () => void;
          children?: ReactNode;
        }>;
        const childKey = el.key ? String(el.key) : `nav-item-${index}`;
        return cloneElement(
          el,
          {
            key: childKey,
            className: cn("relative z-10", el.props.className),
            onMouseEnter: () => {
              el.props.onMouseEnter?.();
              setActiveId(childKey);
            },
          },
          <>
            <AnimatePresence>
              {activeId === childKey && (
                <motion.div
                  variants={reduce ? reducedVariants : variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10",
                    pillContainerClassName,
                  )}
                >
                  <motion.div
                    layoutId={`shared-nav-pill-${uid}`}
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                    className={cn(
                      "pointer-events-none h-full w-full rounded-full bg-neutral-100/90 border border-neutral-200/50",
                      pillClassName,
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative z-10 flex items-center">{el.props.children}</div>
          </>,
        );
      });

    const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
      setActiveId(null);
      onMouseLeave?.(event);
    };

    const Comp = motion[as as keyof typeof motion] as any;

    return (
      <Comp
        ref={forwardedRef as Ref<any>}
        layoutRoot
        onMouseLeave={handleMouseLeave}
        className={cn("flex items-center", className)}
        {...(props as HTMLMotionProps<any>)}
      >
        {renderedChildren}
      </Comp>
    );
  },
);
