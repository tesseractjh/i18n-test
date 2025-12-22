import { I18nProvider } from "@/i18n/I18nProvider";
import { getTranslation } from "@/i18n/server";
import { fallbackLng, languages, type Locale } from "@/i18n/settings";
import type { Metadata } from "next";
import { geistMono, geistSans } from "../layout";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

function isValidLocale(locale: string): locale is Locale {
  return languages.includes(locale as Locale);
}

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : fallbackLng;
  const { t } = await getTranslation(locale);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        en: "/en",
        "x-default": "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : fallbackLng;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
