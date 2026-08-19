export { LocaleProvider, useDict, useLocale } from "./locale-provider";
export { defaultLocale, dictionaries, getDictionary } from "./dictionaries";
export type { Dict, Locale } from "./dictionaries";

export const LOCALE_COOKIE = "locale";

export function isLocale(value: unknown): value is Locale {
  return value === "th" || value === "en";
}
