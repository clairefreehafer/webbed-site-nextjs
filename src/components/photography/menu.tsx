import Link from "next/link";

// TODO: parallel routing?
export default function Menu({ menuOpen }: { menuOpen: boolean }) {
  const hasPiwigo = !process.env.PIWIGO_HOST;
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
          <Link
            href={
              hasPiwigo
                ? "/photography/recently-added"
                : "https://clairefreehafer.smugmug.com/Photography/Recent-Uploads"
            }
          >
            recently added
          </Link>
        </li>
        <li>
          <Link
            href={
              hasPiwigo
                ? "/photography/albums"
                : "https://clairefreehafer.smugmug.com/Photography/Albums"
            }
          >
            albums
          </Link>
        </li>
        <li>
          <Link href="/photography/chronological">chronological</Link>
        </li>
        <li>
          <Link
            href={
              hasPiwigo
                ? "/photography/collections"
                : "https://clairefreehafer.smugmug.com/Photography/Collections"
            }
          >
            collections
          </Link>
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
