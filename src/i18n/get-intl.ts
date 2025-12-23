import { cache } from "react";
import { createIntl, createIntlCache, IntlShape } from "react-intl";
import { Locale, defaultLocale, isValidLocale } from "./config";

// react-intl 캐시 인스턴스 (메모리 최적화)
const intlCache = createIntlCache();

// 메시지 로딩 함수 (React cache로 요청 단위 캐싱)
export const getMessages = cache(
  async (locale: Locale): Promise<Record<string, string>> => {
    try {
      const messages = await import(`../messages/${locale}.json`);
      return messages.default;
    } catch {
      // 폴백: 기본 언어 메시지 로드
      const fallbackMessages = await import(
        `../messages/${defaultLocale}.json`
      );
      return fallbackMessages.default;
    }
  }
);

// Server Component용 intl 객체 생성 (React cache로 요청 단위 캐싱)
export const getIntl = cache(async (locale: string): Promise<IntlShape> => {
  const validLocale = isValidLocale(locale) ? locale : defaultLocale;
  const messages = await getMessages(validLocale);

  return createIntl(
    {
      locale: validLocale,
      messages,
      onError: (err) => {
        // 개발 환경에서만 에러 로깅
        if (process.env.NODE_ENV === "development") {
          console.error("Intl Error:", err);
        }
      },
    },
    intlCache
  );
});

