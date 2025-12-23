export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

