"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formatFormError } from "./utils/format-form-error";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  className?: string;
  error?: boolean;
  labelClassName?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      name,
      label,
      helperText,
      min = 0,
      max = 100,
      step = 1,
      required,
      className = "",
      error,
      labelClassName = "",
      ...props
    },
    ref
  ) => {
    const { control } = useFormContext();
    const t = useTranslations("forms");

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error: fieldError } }) => {
          const sliderValue = field.value ?? min;
          const percentage = ((sliderValue - min) / (max - min)) * 100;
          return (
            <div className={cn("w-full", className)}>
              {label && (
                <label
                  htmlFor={name}
                  className={cn(
                    "block text-sm font-medium mb-1",
                    labelClassName
                  )}
                >
                  {t(label)}
                  {required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </label>
              )}
              <div className="relative flex w-full touch-none select-none items-center">
                <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                  <div
                    className="absolute h-full bg-primary"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <input
                  type="range"
                  ref={ref}
                  id={name}
                  min={min}
                  max={max}
                  step={step}
                  value={sliderValue}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className={cn(
                    "absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:ring-offset-background [&::-webkit-slider-thumb]:transition-colors [&::-webkit-slider-thumb]:focus-visible:outline-none [&::-webkit-slider-thumb]:focus-visible:ring-2 [&::-webkit-slider-thumb]:focus-visible:ring-ring [&::-webkit-slider-thumb]:focus-visible:ring-offset-2 [&::-webkit-slider-thumb]:disabled:pointer-events-none [&::-webkit-slider-thumb]:disabled:opacity-50",
                    error || fieldError
                      ? "border-destructive focus:ring-destructive focus:border-destructive"
                      : ""
                  )}
                  {...props}
                />
              </div>
              {(error || fieldError) && (
                <p className="mt-1 text-sm text-destructive">
                  {fieldError?.message
                    ? formatFormError(t, fieldError.message)
                    : helperText}
                </p>
              )}
              {!error && !fieldError && helperText && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {helperText}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  }
);
Slider.displayName = "Slider";
