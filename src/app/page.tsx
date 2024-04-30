"use client";

import styles from "./page.module.css";
import Nav from "./components/nav";
import DefaultThemeRoot from "@styles/default/root";

export default function Home() {
  return (
    <DefaultThemeRoot>
      <Nav />
      <main className={styles.main}>
        <div className={styles.center}>
          claire freehafer
        </div>
      </main>
    </DefaultThemeRoot>
  );
}
