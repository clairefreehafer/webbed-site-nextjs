import Image from "next/image";
import Link from "next/link";

import SheikahUnderline from "@/components/zelda/sheikah-underline";
import { deslugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";

export default async function Page() {
  const games = await getAlbums("zelda");

  return (
    <div className="container">
      <Image
        src="/images/zelda/pad-line-1.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />

      <div className="game-links">
        {games.map((game) => (
          <SheikahUnderline
            key={game.slug}
            text={deslugify(game.slug)}
            textSize="0.9rem"
            gap="0.1rem"
          >
            <Link href={`/zelda/${game.slug}`}>
              <h2>{deslugify(game.slug)}</h2>
            </Link>
          </SheikahUnderline>
        ))}
      </div>

      <Image
        src="/images/zelda/pad-line-3.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />
    </div>
  );
}
