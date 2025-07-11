import Link from "next/link";

// TODO: parallel routing?
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
        <li>
          <Link href="/photography/recently-added">recently added</Link>
        </li>
        <li>
          <Link href="/photography/albums">albums</Link>
        </li>
        <li>
          <Link href="/photography/chronological">chronological</Link>
        </li>
        <li>
          <Link href="/photography/collections">collections</Link>
        </li>
        <li>
          <s>curated</s>
        </li>
        <li>
          <Link href="/photography/technical">technical</Link>
        </li>
        <li>
          <s>map</s>
        </li>
        <li>
          <Link href="/photography/random">random</Link>
        </li>
      </ul>
    </nav>
  );
}
