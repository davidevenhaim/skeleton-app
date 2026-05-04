"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarqueeRowProps = {
  children: ReactNode;
  /** Seconds for one full cycle. Default: 20 */
  speed?: number;
  direction?: "left" | "right";
  /** Pause animation on hover. Default: true */
  pauseOnHover?: boolean;
  /** Gap between items in rem. Default: 2 */
  gap?: number;
  className?: string;
};

export function MarqueeRow({
  children,
  speed = 20,
  direction = "left",
  pauseOnHover = true,
  gap = 2,
  className,
}: MarqueeRowProps) {
  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  return (
    <div className={cn("overflow-hidden", className)}>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <div
        className={cn("flex w-max", pauseOnHover && "hover:[animation-play-state:paused]")}
        style={{ gap: `${gap}rem`, animation: `${animName} ${speed}s linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
