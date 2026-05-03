"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type TermTipProps = {
  term: string;
  explanation: string;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
};

export function TermTip({ term, explanation, className, side = "top" }: TermTipProps) {
  const [open, setOpen] = React.useState(false);
  const touchedRef = React.useRef(false);

  const handleTouchStart = React.useCallback(() => {
    touchedRef.current = true;
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    if (!touchedRef.current) setOpen(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    if (!touchedRef.current) setOpen(false);
  }, []);

  const handleClick = React.useCallback(() => {
    if (touchedRef.current) setOpen((v) => !v);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-help bg-transparent p-0",
            "underline decoration-dotted underline-offset-2",
            "font-[inherit] text-[inherit] hover:decoration-solid",
            "transition-[text-decoration-style] duration-150",
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onClick={handleClick}
        >
          {term}
        </button>
      </PopoverTrigger>
      <PopoverContent side={side} sideOffset={6} className="w-64 space-y-1.5 p-3">
        <Typography variant="label1" className="text-foreground text-sm font-semibold">
          {term}
        </Typography>
        <Typography
          variant="caption1"
          className="text-muted-foreground text-sm leading-relaxed"
        >
          {explanation}
        </Typography>
      </PopoverContent>
    </Popover>
  );
}
