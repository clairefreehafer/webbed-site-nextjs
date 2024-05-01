import Link from "next/link";

export default async function Photography() {
  return (
    <>
      <h3>recently added</h3>
      <p>(coming soon) photos most recently added to the site.</p>

      <h3><Link href="/photography/albums">albums</Link></h3>
      <p>photos grouped by location, most recent first.</p>

      <h3><Link href="/photography/collections">collections</Link></h3>
      <p>photos grouped by concept, subject, etc.</p>

      <h3>curated</h3>
      <p>(coming soon) smaller groups of photos selected to be displayed together.</p>

      <h3><Link href="/photography/technical">technical</Link></h3>
      <p>grouped by camera.</p>

      <h3>map</h3>
      <p>(coming soon) view geotagged photos on a map.</p>

      <h3>random</h3>
      <p>(coming soon) show a random photo</p>
    </>
  );
}
