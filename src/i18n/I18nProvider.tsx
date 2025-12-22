"use client";

import i18next from "i18next";
import ICU from "i18next-icu";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { getOptions, languages, type Locale } from "./settings";

// 클라이언트에서 i18next 초기화 (한 번만 실행)
const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(ICU)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // I18nProvider에서 설정
    detection: {
      order: ["htmlTag"],
    },
    preload: runsOnServerSide ? languages : [],
  });

interface I18nProviderProps {
  children: React.ReactNode;
  locale: Locale;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  useEffect(() => {
    if (i18next.language !== locale) {
      i18next.changeLanguage(locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
