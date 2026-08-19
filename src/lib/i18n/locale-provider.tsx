"use client";

import { createContext, useContext } from "react";
import { getDictionary, type Dict, type Locale } from "./dictionaries";

const LocaleContext = createContext<{ locale: Locale; dict: Dict }>({
  locale: "th",
  dict: getDictionary("th"),
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dict: getDictionary(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useDict(): Dict {
  return useContext(LocaleContext).dict;
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}
