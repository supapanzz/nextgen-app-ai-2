"use client";

import { LOCALE_COOKIE, useLocale, type Locale } from "@/lib/i18n";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();

  const setLocale = (next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };

  const next: Locale = locale === "th" ? "en" : "th";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-transparent px-3 text-sm font-medium text-stone-600 transition-colors hover:bg-accent"
      aria-label="Switch language / เปลี่ยนภาษา"
    >
      <Languages className="size-4" />
      <span>{locale === "th" ? "EN" : "ไทย"}</span>
    </button>
  );
}
