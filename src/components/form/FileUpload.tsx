"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import Iconify from "@/components/ui/iconify";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  error?: boolean;
  labelClassName?: string;
  /** Max file size in bytes */
  maxSize?: number;
  /** Accepted MIME types, e.g. ["image/*", "application/pdf"] */
  accept?: string | string[];
  /** Allow multiple files */
  multiple?: boolean;
  disabled?: boolean;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      name,
      label,
      helperText,
      required,
      className = "",
      error,
      labelClassName = "",
      maxSize,
      accept,
      multiple = false,
      disabled,
    },
    ref
  ) => {
    const { control } = useFormContext();
    const t = useTranslations("forms");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const acceptStr = Array.isArray(accept) ? accept.join(",") : accept;

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error: fieldError } }) => {
          const files = field.value as File[] | File | undefined;
          const fileList = Array.isArray(files)
            ? files
            : files
              ? [files]
              : [];

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const selected = e.target.files;
            if (!selected?.length) {
              field.onChange(multiple ? [] : undefined);
              return;
            }
            const arr = Array.from(selected);
            if (maxSize) {
              const oversized = arr.find((f) => f.size > maxSize);
              if (oversized) return; // validation will catch
            }
            field.onChange(multiple ? arr : arr[0]);
          };

          const removeFile = (index: number) => {
            const next = fileList.filter((_, i) => i !== index);
            field.onChange(multiple ? next : next[0]);
          };

          const clearAll = () => {
            field.onChange(multiple ? [] : undefined);
            if (inputRef.current) inputRef.current.value = "";
          };

          return (
            <div className={cn("w-full", className)}>
              {label && (
                <Label
                  htmlFor={name}
                  className={cn("mb-1", labelClassName)}
                >
                  {t(label)}
                  {required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>
              )}
              <div
                className={cn(
                  "flex flex-col gap-2 rounded-md border border-dashed p-4 transition-colors",
                  "hover:bg-muted/50",
                  error || fieldError
                    ? "border-destructive"
                    : "border-input"
                )}
              >
                <input
                  ref={(el) => {
                    (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                    if (typeof ref === "function") ref(el);
                    else if (ref) ref.current = el;
                  }}
                  id={name}
                  type="file"
                  accept={acceptStr}
                  multiple={multiple}
                  disabled={disabled}
                  onChange={handleChange}
                  className="hidden"
                  aria-invalid={!!(error || fieldError)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled}
                  onClick={() => inputRef.current?.click()}
                  className="w-fit"
                >
                  <Iconify icon="lucide:upload" className="mr-2 size-4" />
                  {t("placeholders.upload")}
                </Button>
                {fileList.length > 0 && (
                  <ul className="space-y-1">
                    {fileList.map((file, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between rounded bg-muted px-2 py-1 text-sm"
                      >
                        <span className="truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-6"
                          onClick={() => removeFile(i)}
                          aria-label="Remove file"
                        >
                          <Iconify icon="lucide:x" className="size-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
                {fileList.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="w-fit text-muted-foreground"
                  >
                    {t("helpers.clearFiles")}
                  </Button>
                )}
              </div>
              {(error || fieldError) && (
                <p className="mt-1 text-sm text-destructive">
                  {fieldError?.message
                    ? t(`errors.${fieldError.message}` as "errors.required")
                    : helperText}
                </p>
              )}
              {!error && !fieldError && helperText && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {helperText}
                </p>
              )}
              {!error && !fieldError && maxSize && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("helpers.maxSize", {
                    size: `${(maxSize / 1024).toFixed(0)} KB`,
                  })}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  }
);
FileUpload.displayName = "FileUpload";
