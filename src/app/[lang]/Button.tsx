"use client";

import styles from "./page.module.css";

function Button() {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <button type="button" className={styles.primary} onClick={handleClick}>
      Deploy Now
    </button>
  );
}

export default Button;
