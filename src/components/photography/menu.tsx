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
          <s>recently added</s>
        </li>
        <li>
          <Link href="/photography/albums">albums</Link>
        </li>
        <li>
          <s>chronological</s>
        </li>
        <li>
          <Link href="/photography/collections">collections</Link>
        </li>
        <li>
          <s>curated</s>
        </li>
        <li>
          <s>technical</s>
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
