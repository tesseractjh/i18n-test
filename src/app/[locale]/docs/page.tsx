import { getTranslations } from "next-intl/server";

export default async function DocsPage() {
  const t = await getTranslations("DocsPage");

  return (
    <div>
      <div>{t("title")}</div>
      <div>{t("noItems")}</div>
      <div>{t("oneItem")}</div>
      <div>{t("twoItems")}</div>
      <div>{t("variable", { value: "test" })}</div>
    </div>
  );
}

