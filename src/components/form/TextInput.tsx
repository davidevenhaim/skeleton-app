"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { formatFormError } from "./utils/format-form-error";
import { Label } from "@/components/ui/label";

interface TextInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "name"
> {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  error?: boolean;
  labelClassName?: string;
  /** "text" | "number" - use number for numeric inputs */
  inputType?: "text" | "number";
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      name,
      label,
      helperText,
      required,
      className = "",
      error,
      labelClassName = "",
      inputType = "text",
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
          const { ref: fieldRef, ...fieldRest } = field;
          return (
            <div className={cn("w-full", className)}>
              {label && (
                <Label htmlFor={name} className={cn("mb-1", labelClassName)}>
                  {t(label)}
                  {required && <span className='text-destructive ml-1'>*</span>}
                </Label>
              )}
              <Input
                ref={(el) => {
                  fieldRef(el);
                  if (typeof ref === "function") ref(el);
                  else if (ref) ref.current = el;
                }}
                id={name}
                type={inputType}
                aria-invalid={!!(error || fieldError)}
                className={cn(
                  error || fieldError
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                )}
                {...fieldRest}
                value={field.value ?? ""}
                placeholder={placeholder ? t(placeholder) : ""}
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
TextInput.displayName = "TextInput";
