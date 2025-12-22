import { getTranslation } from "@/i18n/server";
import { fallbackLng, languages, Locale } from "@/i18n/settings";

interface PageProps {
  params: Promise<{ locale: string }>;
}

function isValidLocale(locale: string): locale is Locale {
  return languages.includes(locale as Locale);
}

export default async function DocsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : fallbackLng;
  const { t } = await getTranslation(locale, "docs");

  return (
    <div>
      <div>{t("content")}</div>
      <div>{t("items", { count: 0 })}</div>
      <div>{t("items", { count: 1 })}</div>
      <div>{t("items", { count: 2 })}</div>
      <div>{t("variables", { my_variable: "test" })}</div>
    </div>
  );
}
