"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { formatFormError } from "./utils/format-form-error";
import { Label } from "@/components/ui/label";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import { Typography } from "../ui/typography";

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
  placeholderText?: string;
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
      type: typeProp,
      placeholder,
      placeholderText,
      ...restProps
    },
    ref
  ) => {
    const { control } = useFormContext();
    const t = useTranslations("forms");
    const [showPassword, setShowPassword] = React.useState(false);
    const resolvedType = typeProp ?? inputType;
    const isPassword = resolvedType === "password";
    const inputTypeResolved = isPassword
      ? showPassword
        ? "text"
        : "password"
      : resolvedType;

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
                  <Typography variant='caption1'>{t(label)}</Typography>
                  {required && <span className='text-destructive'>*</span>}
                </Label>
              )}
              <div className='relative'>
                <Input
                  ref={(el) => {
                    fieldRef(el);
                    if (typeof ref === "function") ref(el);
                    else if (ref) ref.current = el;
                  }}
                  id={name}
                  type={inputTypeResolved}
                  aria-invalid={!!(error || fieldError)}
                  className={cn(
                    error || fieldError
                      ? "border-destructive focus-visible:ring-destructive"
                      : "",
                    isPassword && "pr-10"
                  )}
                  {...fieldRest}
                  value={field.value ?? ""}
                  placeholder={
                    placeholderText ?? (placeholder ? t(placeholder) : "")
                  }
                  {...restProps}
                />
                {isPassword && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowPassword((p) => !p)}
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <Iconify
                      icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                      className='size-4 text-muted-foreground'
                    />
                  </Button>
                )}
              </div>
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
