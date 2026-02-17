import Link from "next/link";

import Logo from "@/components/animal-crossing/logo";
import Wave from "@/components/animal-crossing/wave";

// TODO: SVGs for each game?
export default function Page() {
  return (
    <ul className="game-list">
      <li>
        <Link href="/animal-crossing/pocket-camp" className="game-list-link">
          <Logo text="pocket" width={200} />
          <Logo text="camp" width={150} />
        </Link>

        <Wave
          color="rgb(87, 72, 66)"
          thickness="2px"
          size="0.5rem"
          height="2rem"
        />
      </li>

      <li>
        <Link
          href="/animal-crossing/happy-home-paradise"
          className="game-list-link"
        >
          <Logo text="happy" width={150} />
          <Logo text="home" width={150} />
          <Logo text="paradise" width={200} />
        </Link>

        <Wave
          color="rgb(87, 72, 66)"
          thickness="2px"
          size="0.5rem"
          height="2rem"
        />
      </li>

      <li>
        <Link href="/animal-crossing/new-horizons" className="game-list-link">
          <Logo text="new" width={110} />
          <Logo text="horizons" width={200} />
        </Link>

        <Wave
          color="rgb(87, 72, 66)"
          thickness="2px"
          size="0.5rem"
          height="2rem"
        />
      </li>

      <li>
        <Link href="/animal-crossing/new-leaf" className="game-list-link">
          <Logo text="new" width={110} />
          <Logo text="leaf" width={150} />
        </Link>

        <Wave
          color="rgb(87, 72, 66)"
          thickness="2px"
          size="0.5rem"
          height="2rem"
        />
      </li>
    </ul>
  );
}
