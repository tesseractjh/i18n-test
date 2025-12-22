import { createInstance, type i18n } from "i18next";
import ICU from "i18next-icu";
import resourcesToBackend from "i18next-resources-to-backend";
import { cache } from "react";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, type Locale, type Namespace } from "./settings";

const initI18next = async (lng: Locale, ns: Namespace): Promise<i18n> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(ICU)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

// React cache로 요청 단위 캐싱
export const getTranslation = cache(
  async <NS extends Namespace = "common">(
    lng: Locale,
    ns: NS = "common" as NS
  ) => {
    const i18nextInstance = await initI18next(lng, ns);
    return {
      t: i18nextInstance.getFixedT(lng, ns),
      i18n: i18nextInstance,
    };
  }
);
