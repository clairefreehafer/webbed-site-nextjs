import Link from "next/link";
import styles from "./page.module.css";

export default async function Photography() {
  return (
    <>
      <h3 className={styles.sectionTitle}>recently added</h3>
      <p>(coming soon) photos most recently added to the site.</p>

      <h3 className={styles.sectionTitle}><Link href="/photography/albums">albums</Link></h3>
      <p>photos grouped by location, most recent first.</p>

      <h3 className={styles.sectionTitle}><Link href="/photography/collections">collections</Link></h3>
      <p>photos grouped by concept, subject, etc.</p>

      <h3 className={styles.sectionTitle}>curated</h3>
      <p>(coming soon) smaller groups of photos selected to be displayed together.</p>

      <h3 className={styles.sectionTitle}><Link href="/photography/technical">technical</Link></h3>
      <p>grouped by camera.</p>

      <h3 className={styles.sectionTitle}>map</h3>
      <p>(coming soon) view geotagged photos on a map.</p>

      <h3 className={styles.sectionTitle}>random</h3>
      <p>(coming soon) show a random photo</p>
    </>
  );
}
