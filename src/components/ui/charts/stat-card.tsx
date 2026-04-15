"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedNumber from "@/components/ui/animations/animated-number";
import Iconify from "@/components/ui/iconify";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

export type StatCardProps = {
  /** KPI label */
  title: string;
  /** Numeric value to animate to */
  value: number;
  /** Optional formatter applied to the animated number */
  formatter?: (value: number) => string;
  /** Trend delta e.g. +12.5 or -3.2 */
  delta?: number;
  /** Label shown next to the delta (e.g. "vs last month") */
  deltaLabel?: string;
  /** Icon name from Iconify (e.g. "lucide:users") */
  icon?: string;
  className?: string;
};

/**
 * KPI stat card with an animated number, optional trend badge, and icon.
 *
 * @example
 * <StatCard
 *   title="Total Revenue"
 *   value={48520}
 *   formatter={(v) => `$${v.toLocaleString()}`}
 *   delta={12.5}
 *   deltaLabel="vs last month"
 *   icon="lucide:dollar-sign"
 * />
 */
const StatCard = ({
  title,
  value,
  formatter,
  delta,
  deltaLabel,
  icon,
  className
}: StatCardProps) => {
  const isPositive = delta !== undefined && delta >= 0;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && (
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <Iconify icon={icon} className="size-5 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold tracking-tight">
          <AnimatedNumber
            value={value}
            formatter={formatter ? (v) => formatter(v) : undefined}
          />
        </div>
        {delta !== undefined && (
          <div className="flex items-center gap-2">
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className={cn(
                "gap-1 px-1.5 py-0.5 text-xs",
                isPositive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              <Iconify
                icon={isPositive ? "lucide:trending-up" : "lucide:trending-down"}
                className="size-3"
              />
              {isPositive ? "+" : ""}
              {delta.toFixed(1)}%
            </Badge>
            {deltaLabel && (
              <span className="text-xs text-muted-foreground">{deltaLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
