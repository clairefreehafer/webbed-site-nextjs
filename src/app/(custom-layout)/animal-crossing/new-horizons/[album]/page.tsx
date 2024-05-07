import { PrismaClient } from "@prisma/client";
import { displayName, slugName } from "@utils/albums";
import Slideshow from "./slideshow";
import { getAlbumPhotos } from "@utils/animal-crossing";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const albums = await prisma.album.findMany({
    where: { section: "new horizons" }
  });

  return albums.map((album) => ({
    album: slugName(album.name),
  }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: { album: string }}) {
  const albumName = displayName(params.album);
  const photos = await getAlbumPhotos(albumName);

  if (!photos) {
    return "❌ no photos";
  }

  const albumDate = photos[0].album?.date || new Date();

  return (
    <Slideshow photos={photos} albumDate={albumDate} />
  );
}
