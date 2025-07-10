import Link from "next/link";

export default function Menu({ menuOpen }: { menuOpen: boolean }) {
  return (
    <nav
      style={{
        display: menuOpen ? "flex" : "none",
      }}
    >
      <ul>
        <li>
          <Link href="/photography/today">today</Link>
        </li>
        <li>recently added</li>
        <li>
          <Link href="/photography/albums">albums</Link>
        </li>
        <li>
          <s>chronological</s>
        </li>
        <li>collections</li>
        <li>
          <s>curated</s>
        </li>
        <li>technical</li>
        <li>
          <s>map</s>
        </li>
        <li>
          <s>random</s>
        </li>
      </ul>
    </nav>
  );
}
