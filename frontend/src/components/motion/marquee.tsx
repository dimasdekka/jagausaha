import { Children, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string;
  className?: string;
  fade?: boolean;
}

export function Marquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  gap = "2rem",
  className,
  fade = true,
}: MarqueeProps) {
  const reverse = direction === "right";
  const items = Children.toArray(children);

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden w-full select-none",
        fade && "[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        className,
      )}
      style={{ "--gap": gap, gap } as React.CSSProperties}
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          aria-hidden={dup === 1}
          inert={dup === 1 ? true : undefined}
          style={{
            animationDuration: `${speed}s`,
            animationDirection: reverse ? "reverse" : "normal",
            gap,
          }}
          className={cn(
            "flex shrink-0 items-center animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {items.map((child, i) => (
            <div key={i} className="shrink-0 flex items-center">
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
