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
        <li>
          <Link href="collections">collections</Link>
        </li>
        <li>
          <s>curated</s>
        </li>
        <li>
          <Link href="technical">technical</Link>
        </li>
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
