import Link from "next/link";

// TODO: SVGs for each game
export default function Page() {
  return (
    <ul>
      <li>
        <Link href="/animal-crossing/pocket-camp">pocket camp</Link>
      </li>
      <li>
        <Link href="/animal-crossing/new-horizons">new horizons</Link>
      </li>
      <li>
        <Link href="/animal-crossing/new-leaf">new leaf</Link>
      </li>
    </ul>
  );
}
