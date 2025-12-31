import { Metadata } from "next";
import Link from "next/link";

import Slideshow from "@/components/slideshow";
import { deslugify } from "@/utils";
import { getAlbumImages, getAlbums } from "@/utils/digikam";

type Params = { game: string; album: string };

export async function generateStaticParams() {
  const pages = [];
  const games = await getAlbums("zelda");

  for (const game of games) {
    const albums = await getAlbums(game.slug);

    for (const album of albums) {
      pages.push({ game: game.slug, album: album.slug });
    }
  }

  return pages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { game, album } = await params;
  return { title: `${deslugify(album)}, ${deslugify(game)}` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { album, game } = await params;
  const images = await getAlbumImages(album, game);

  return (
    <div style={{ height: "100svh", display: "flex", flexDirection: "column" }}>
      <div className="breadcrumbs-container">
        <div className="breadcrumbs">
          <Link href="/zelda">zelda</Link>
          <span>/</span>
          <Link href={`/zelda/${game}`}>{deslugify(game)}</Link>
          <span>/</span>
          {/* add icon */}
          <h2 style={{ fontWeight: 200 }}>{deslugify(album)}</h2>
        </div>
      </div>
      <Slideshow images={images} />
    </div>
  );
}
