import { defaultLocale, isValidLocale, Locale } from "@/i18n/config";
import { getIntl } from "@/i18n/get-intl";

interface DocsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const { formatMessage } = await getIntl(validLocale);

  return (
    <div>
      <div>{formatMessage({ id: "docs.title" })}</div>
      <div>{formatMessage({ id: "docs.itemCount" }, { count: 0 })}</div>
      <div>{formatMessage({ id: "docs.itemCount" }, { count: 1 })}</div>
      <div>{formatMessage({ id: "docs.itemCount" }, { count: 2 })}</div>
      <div>{formatMessage({ id: "docs.variable" }, { value: "test" })}</div>
    </div>
  );
}
