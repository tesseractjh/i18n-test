import { defaultLocale, isValidLocale, Locale } from "@/i18n/config";
import { getIntl } from "@/i18n/get-intl";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import Button from "./Button";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const { formatMessage } = await getIntl(validLocale);

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
          <h1>{formatMessage({ id: "home.title" })}</h1>
          <p>
            {formatMessage(
              { id: "home.description" },
              {
                templatesLink: (
                  <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formatMessage({ id: "home.templates" })}
                  </a>
                ),
                learningLink: (
                  <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formatMessage({ id: "home.learning" })}
                  </a>
                ),
              }
            )}
          </p>
        </div>
        <div className={styles.ctas}>
          <Button locale={validLocale} />
          <Link className={styles.secondary} href={`/${validLocale}/docs`}>
            {formatMessage({ id: "home.documentation" })}
          </Link>
        </div>
      </main>
    </div>
  );
}
