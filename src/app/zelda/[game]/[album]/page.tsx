import { slugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";

const GAMES = ["breath of the wild", "tears of the kingdom"] as const;

export async function generateStaticParams() {
  const pages = [];

  for (const game of GAMES) {
    const albums = getAlbums(game);
    const slugifiedGame = slugify(game);

    for (const album of albums) {
      console.log(`├ generating /zelda/${slugifiedGame}/${album.slug}`);
      pages.push({ game: slugifiedGame, album: album.slug });
    }
  }

  return pages;
}

export default async function Page({
  params,
}: {
  params: Promise<{ game: (typeof GAMES)[number]; album: string }>;
}) {
  const { game, album } = await params;
  return game + album;
}
