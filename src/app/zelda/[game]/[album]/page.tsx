import Slideshow from "@/components/slideshow";
import { getAlbumImages, getAlbums } from "@/utils/digikam";

const GAMES = ["breath-of-the-wild", "tears-of-the kingdom"] as const;

export async function generateStaticParams() {
  const pages = [];

  for (const game of GAMES) {
    const albums = await getAlbums(game);

    for (const album of albums) {
      console.log(`⚔️ generating /zelda/${game}/${album.slug}`);
      pages.push({ game, album: album.slug });
    }
  }

  return pages;
}

export default async function Page({
  params,
}: {
  params: Promise<{ game: (typeof GAMES)[number]; album: string }>;
}) {
  const { album } = await params;
  const images = await getAlbumImages(album);

  return <Slideshow images={images} />;
}
