"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Iconify from "@/components/ui/iconify";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export type AutocompleteOption = {
  value: string;
  label: string;
};

export type AutocompleteInputProps = {
  options: AutocompleteOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyLabel?: string;
  className?: string;
};

export function AutocompleteInput({
  options,
  value,
  onValueChange,
  placeholder,
  emptyLabel,
  className,
}: AutocompleteInputProps) {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const listboxId = React.useId();

  const selected = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={open}
          className={cn(
            "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-start font-sans text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <Typography variant="caption1" as="span" className="truncate text-sm">
            {selected?.label ?? placeholder ?? t("select")}
          </Typography>
          <Iconify icon="lucide:chevrons-up-down" className="ms-2 size-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder ?? t("search")} />
          <CommandList id={listboxId}>
            <CommandEmpty>{emptyLabel ?? t("noResults")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onValueChange?.(option.value);
                    setOpen(false);
                  }}
                >
                  <Iconify
                    icon={value === option.value ? "lucide:check" : "lucide:circle"}
                    className={cn(
                      "size-4 shrink-0",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden
                  />
                  <Typography variant="caption1" as="span">
                    {option.label}
                  </Typography>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
