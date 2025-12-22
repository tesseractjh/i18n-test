import { getTranslation } from "@/i18n/server";
import { fallbackLng, languages, type Locale } from "@/i18n/settings";
import Image from "next/image";
import Link from "next/link";
import Button from "../_components/Button";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ locale: string }>;
}

function isValidLocale(locale: string): locale is Locale {
  return languages.includes(locale as Locale);
}

export default async function Home({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : fallbackLng;
  const { t } = await getTranslation(locale);

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
          <h1>{t("home.getStarted")}</h1>
          <p>
            {t("home.lookingFor")}{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("home.templates")}
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("home.templates")}
            </a>{" "}
            {t("home.center")}
          </p>
        </div>
        <div className={styles.ctas}>
          <Button />
          <Link
            className={styles.secondary}
            href={`/${locale}/docs`}
            rel="noopener noreferrer"
          >
            {t("home.documentation")}
          </Link>
        </div>
      </main>
    </div>
  );
}
