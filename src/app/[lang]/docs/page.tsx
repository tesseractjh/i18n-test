import { getI18nInstance } from "@/i18n/request";
import { Plural, Trans } from "@lingui/react/macro";
import { setI18n } from "@lingui/react/server";

export default async function DocsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const i18n = await getI18nInstance(lang);
  setI18n(i18n);

  const itemCount = 2;
  const variableName = "test";

  return (
    <div>
      <div>
        <Trans>This is the documentation page.</Trans>
      </div>
      <div>
        <Plural value={0} zero="No items" one="# item" other="# items" />
      </div>
      <div>
        <Plural value={1} zero="No items" one="# item" other="# items" />
      </div>
      <div>
        <Plural
          value={itemCount}
          zero="No items"
          one="# item"
          other="# items"
        />
      </div>
      <div>
        <Trans>Variable: {variableName}</Trans>
      </div>
    </div>
  );
}
