import Link from "next/link";

export function generateMetadata() {
  return { title: "photography — claire freehafer" };
}

export default async function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <h2>photography</h2>
      <nav className="nav">
        <ul>
          <li>
            <Link href="/photography/today">today</Link>
          </li>
          <li>
            <Link href="/photography/albums">albums</Link>
          </li>
          <li>
            <Link href="/photography/collections">collections</Link>
          </li>
          <li>
            <s>curated</s>
          </li>
          <li>
            <s>map</s>
          </li>
          <li>
            <Link href="/photography/random">random</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
