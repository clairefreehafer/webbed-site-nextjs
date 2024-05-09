import { PrismaClient } from "@prisma/client";
import { displayName, slugName } from "@utils/albums";
import Slideshow from "./slideshow";
import { getAlbumPhotos } from "@utils/animal-crossing";

const prisma = new PrismaClient();

// TODO: find a better way to handle this
const tagAlbums = {
  residents: [],
  visitors: [
    "rover",
    "k.k. slider"
  ]
}

export async function generateStaticParams() {
  const albums = await prisma.album.findMany({
    where: { section: { startsWith: "new-horizons" }}
  });

  const residents = tagAlbums.residents.map((resident) => ({
    page: ["new-horizions", "residents", resident]
  }));
  const visitors = tagAlbums.visitors.map((visitor) => ({
    page: ["new-horizions", "visitors", visitor]
  }));
  const rest = albums.map((album) => ({
    page: [...album.section.split("/"), slugName(album.name)]
  }));

  return [...residents, ...visitors, ...rest]
}

export const dynamicParams = false;

export default async function Page({ params }: { params: { page: string[] }}) {
  const albumName = displayName(params.page[params.page.length - 1]);
  const section = params.page[params.page.length - 2];
  const photos = await getAlbumPhotos(albumName, section);

  if (!photos.length) {
    return "❌ no photos";
  }

  const albumDate = photos[0].album?.date || new Date();

  return (
    <Slideshow
      photos={photos}
      albumDate={albumDate}
      albumName={albumName}
      albumSection={params.page}
    />
  );
}
