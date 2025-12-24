import { getI18nInstance } from "@/i18n/request";
import { Trans } from "@lingui/react/macro";
import { setI18n } from "@lingui/react/server";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import styles from "./page.module.css";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const i18n = await getI18nInstance(lang);
  setI18n(i18n);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>
            <Trans>To get started, edit the page.tsx file.</Trans>
          </h1>
          <Trans>
            <p>
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learning
              </a>{" "}
              center.
            </p>
          </Trans>
        </div>
        <div className={styles.ctas}>
          <Button />
          <Link className={styles.secondary} href={`/${lang}/docs`}>
            <Trans>Documentation</Trans>
          </Link>
        </div>
      </main>
    </div>
  );
}
