import Link from "next/link";

import { deslugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";

export default async function Page() {
  const games = await getAlbums("animal-crossing");
  return (
    <ul>
      {games.map((game) => (
        <li key={game.slug}>
          <Link href={`/animal-crossing/${game.slug}`}>
            {deslugify(game.slug)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
