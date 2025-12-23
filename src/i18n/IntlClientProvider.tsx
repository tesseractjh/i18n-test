"use client";

import { IntlProvider } from "react-intl";
import { ReactNode } from "react";
import { Locale } from "./config";

interface IntlClientProviderProps {
  locale: Locale;
  messages: Record<string, string>;
  children: ReactNode;
}

export default function IntlClientProvider({
  locale,
  messages,
  children,
}: IntlClientProviderProps) {
  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      onError={(err) => {
        // 개발 환경에서만 에러 로깅
        if (process.env.NODE_ENV === "development") {
          console.error("Intl Error:", err);
        }
      }}
    >
      {children}
    </IntlProvider>
  );
}

