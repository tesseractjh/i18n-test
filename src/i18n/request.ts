import { setupI18n } from "@lingui/core";
import { cache } from "react";
import { defaultLocale, locales, type Locale } from "./index";

async function loadCatalog(locale: Locale) {
  const catalog = await import(`../locales/${locale}.js`);
  return catalog.messages ?? catalog.default?.messages ?? {};
}

const i18nInstances = new Map<Locale, ReturnType<typeof setupI18n>>();

export const getI18nInstance = cache(async (locale: string) => {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  if (!i18nInstances.has(validLocale)) {
    const messages = await loadCatalog(validLocale);
    const i18n = setupI18n({
      locale: validLocale,
      messages: { [validLocale]: messages },
    });
    i18nInstances.set(validLocale, i18n);
  }

  const i18n = i18nInstances.get(validLocale)!;
  i18n.activate(validLocale);
  return i18n;
});
