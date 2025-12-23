"use client";

import { useIntl } from "react-intl";
import styles from "../page.module.css";

interface ButtonProps {
  locale: string;
}

function Button({ locale }: ButtonProps) {
  const { formatMessage } = useIntl();

  const handleClick = () => {
    console.log("click", locale);
  };

  return (
    <button type="button" className={styles.primary} onClick={handleClick}>
      {formatMessage({ id: "home.deployNow" })}
    </button>
  );
}

export default Button;
