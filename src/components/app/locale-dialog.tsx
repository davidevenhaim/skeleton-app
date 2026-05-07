"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import Iconify from "@/components/ui/iconify";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  SUPPORTED_LOCALES,
  isAppLocale,
  type AppLocale,
} from "@/constants/locale";
import Cookies from "js-cookie";

const LOCALE_ICON: Record<AppLocale, string> = {
  en: "ri:english-input",
  he: "tabler:alphabet-hebrew",
  ar: "tabler:alphabet-arabic",
  es: "tabler:language",
};

/**
 * Globe trigger opens a compact popover to pick the app locale.
 * Sets `NEXT_LOCALE` and reloads so the server picks up the new locale.
 */
export function LocaleDialog() {
  const t = useTranslations();
  const rawLocale = useLocale();
  const locale: AppLocale = isAppLocale(rawLocale) ? rawLocale : "en";
  const [open, setOpen] = React.useState(false);

  const select = (code: AppLocale) => {
    if (code === locale) {
      setOpen(false);
      return;
    }
    Cookies.set(LOCALE_COOKIE, code, {
      path: "/",
      expires: LOCALE_COOKIE_MAX_AGE / (60 * 60 * 24),
      sameSite: "lax",
    });
    window.location.reload();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t("languageDialogTriggerAria")}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <Iconify icon="lucide:languages" className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 rounded-xl p-2" sideOffset={8}>
        <PopoverHeader className="px-2 pt-1 pb-2">
          <PopoverTitle className="text-left">{t("languageDialogTitle")}</PopoverTitle>
        </PopoverHeader>
        <ul className="flex flex-col gap-0.5" role="menu">
          {SUPPORTED_LOCALES.map((code) => {
            const active = code === locale;
            return (
              <li key={code} role="none">
                <Button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  variant="ghost"
                  className={cn(
                    "relative flex h-auto w-full items-center justify-start rounded-lg px-3 py-3 text-left transition-all outline-none",
                    "hover:bg-accent/80 hover:text-accent-foreground",
                    "focus-visible:bg-accent/80 focus-visible:text-accent-foreground",
                    active && "bg-accent text-accent-foreground shadow-sm"
                  )}
                  onClick={() => select(code)}
                >
                  {active ? (
                    <span
                      className="bg-primary absolute inset-y-2 left-1 w-0.5 rounded-full"
                      aria-hidden
                    />
                  ) : null}
                  <div className="flex min-w-0 flex-1 items-center gap-3 pr-7 pl-2">
                    <div
                      className={cn(
                        "bg-muted/60 text-foreground flex size-8 shrink-0 items-center justify-center rounded-md",
                        active && "bg-background/75"
                      )}
                    >
                      <Iconify icon={LOCALE_ICON[code]} className="size-5" aria-hidden />
                    </div>
                    <Typography
                      variant="label2"
                      as="span"
                      className="min-w-0 flex-1 truncate text-left font-medium"
                    >
                      {t(`languages.${code}`)}
                    </Typography>
                  </div>
                  {active ? (
                    <Iconify
                      icon="lucide:check"
                      className="absolute right-2.5 size-4 shrink-0"
                      aria-hidden
                    />
                  ) : null}
                </Button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
