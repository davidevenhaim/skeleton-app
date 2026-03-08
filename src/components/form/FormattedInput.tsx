"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { formatFormError } from "./utils/format-form-error";
import { Label } from "@/components/ui/label";
import type { FormatterFn } from "@/utils/formatters";

interface FormattedInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "name" | "value" | "onChange"
> {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  error?: boolean;
  labelClassName?: string;
  /** Formatter from @/utils/formatters (e.g. dollarFormatter, percentFormatter) */
  formatter: FormatterFn;
}

export const FormattedInput = React.forwardRef<
  HTMLInputElement,
  FormattedInputProps
>(
  (
    {
      name,
      label,
      helperText,
      required,
      className = "",
      error,
      labelClassName = "",
      formatter,
      placeholder,
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
          const raw = field.value ?? "";
          const displayValue = formatter.format(raw);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = formatter.parse(e.target.value);
            field.onChange(rawValue);
          };

          return (
            <div className={cn("w-full", className)}>
              {label && (
                <Label htmlFor={name} className={cn("mb-1", labelClassName)}>
                  {t(label)}
                  {required && <span className='text-destructive ml-1'>*</span>}
                </Label>
              )}
              <Input
                ref={ref}
                id={name}
                type='text'
                inputMode='decimal'
                aria-invalid={!!(error || fieldError)}
                className={cn(
                  error || fieldError
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                )}
                value={displayValue}
                placeholder={placeholder ? t(placeholder) : ""}
                onChange={handleChange}
                onBlur={field.onBlur}
                {...props}
              />
              {(error || fieldError) && (
                <p className='mt-1 text-sm text-destructive'>
                  {fieldError?.message
                    ? formatFormError(t, fieldError.message)
                    : helperText}
                </p>
              )}
              {!error && !fieldError && helperText && (
                <p className='mt-1 text-sm text-muted-foreground'>
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
FormattedInput.displayName = "FormattedInput";
