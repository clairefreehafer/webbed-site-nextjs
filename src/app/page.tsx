import styles from "./page.module.css";
import Nav from "./components/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.center}>
          claire freehafer
        </div>
      </main>
    </>
  );
}
