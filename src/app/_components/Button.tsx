"use client";

import { useTranslation } from "react-i18next";
import styles from "../[locale]/page.module.css";

function Button() {
  const { t } = useTranslation();

  const handleClick = () => {
    console.log("click");
  };

  return (
    <button type="button" className={styles.primary} onClick={handleClick}>
      {t("home.deploy")}
    </button>
  );
}

export default Button;
