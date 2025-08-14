import Image from "next/image";
import Link from "next/link";

import SheikahUnderline from "@/components/zelda/sheikah-underline";
import { deslugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";

export async function generateStaticParams() {
  const games = await getAlbums("zelda");
  return games.map((game) => ({
    game: game.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;
  const botwAlbums = await getAlbums(game);

  return (
    <div className="container">
      <Image
        src="/images/zelda/pad-line-1.png"
        className="splitter"
        alt=""
        width={1920}
        height={120}
      />
      <h2>{deslugify(game)}</h2>
      <ul className="album-links">
        {botwAlbums.map((album) => (
          <li
            key={album.slug}
            className="album-link"
            style={{
              backgroundImage: `url("/images/zelda/icons/${album.icon}.svg")`,
            }}
          >
            <SheikahUnderline
              text={album.displayName ?? deslugify(album.slug)}
              textSize="0.6rem"
              gap="0.1rem"
            >
              <Link href={`/zelda/${game}/${album.slug}`}>
                {album.displayName ?? deslugify(album.slug)}
              </Link>
            </SheikahUnderline>
          </li>
        ))}
      </ul>
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
