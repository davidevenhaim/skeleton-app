"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  delay?: number;
  formatter?: (value: number) => string;
  className?: string;
};

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const AnimatedNumber = ({
  value,
  duration = 700,
  delay = 0,
  formatter,
  className
}: AnimatedNumberProps) => {
  const [display, setDisplay] = useState(formatter ? formatter(0) : "0");
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = easedProgress * value;

        setDisplay(
          formatter ? formatter(current) : String(Math.round(current))
        );

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      startTimeRef.current = null;
    };
  }, [value, duration, delay, formatter]);

  return <span className={className}>{display}</span>;
};

export default AnimatedNumber;
