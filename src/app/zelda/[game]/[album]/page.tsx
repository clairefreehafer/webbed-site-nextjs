import Slideshow from "@/components/slideshow";
import { getAlbumImages, getAlbums } from "@/utils/digikam";

export async function generateStaticParams() {
  const pages = [];
  const games = await getAlbums("zelda");

  for (const game of games) {
    const albums = await getAlbums(game.slug);

    for (const album of albums) {
      console.log(`⚔️ generating /zelda/${game.slug}/${album.slug}`);
      pages.push({ game: game.slug, album: album.slug });
    }
  }

  return pages;
}

export default async function Page({
  params,
}: {
  params: Promise<{ game: string; album: string }>;
}) {
  const { album, game } = await params;
  const images = await getAlbumImages(album, game);

  return <Slideshow images={images} />;
}
