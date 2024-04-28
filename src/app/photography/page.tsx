import Link from "next/link";
import Nav from "../components/nav";
import styles from "./page.module.css";

export default async function Photography() {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.title}>photography</h1>

        <p>how would you like to browse?</p>

        <h2 className={styles.sectionTitle}>recently added</h2>
        <p>(coming soon) photos most recently added to the site.</p>

        <h2 className={styles.sectionTitle}><Link href="/photography/albums">albums</Link></h2>
        <p>photos grouped by location, most recent first.</p>

        <h2 className={styles.sectionTitle}><Link href="/photography/collections">collections</Link></h2>
        <p>photos grouped by concept, subject, etc.</p>

        <h2 className={styles.sectionTitle}>curated</h2>
        <p>(coming soon) smaller groups of photos selected to be displayed together.</p>

        <h2 className={styles.sectionTitle}><Link href="/photography/technical">technical</Link></h2>
        <p>grouped by camera.</p>

        <h2 className={styles.sectionTitle}>map</h2>
        <p>(coming soon) view geotagged photos on a map.</p>

        <h2 className={styles.sectionTitle}>random</h2>
        <p>(coming soon) show a random photo</p>
      </main>
    </>
  );
}
