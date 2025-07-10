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
          <Link href="today">today</Link>
        </li>
        <li>
          <Link href="recently-added">recently added</Link>
        </li>
        <li>
          <Link href="albums">albums</Link>
        </li>
        <li>
          <Link href="chronological">chronological</Link>
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
          <Link href="random">random</Link>
        </li>
      </ul>
    </nav>
  );
}
