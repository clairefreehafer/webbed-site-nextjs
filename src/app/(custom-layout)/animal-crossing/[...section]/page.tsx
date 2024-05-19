import { displayName, slugName } from "@utils/albums";
import Slideshow from "./slideshow";
import { getAlbumPhotos } from "@utils/animal-crossing";
import { getStaticParams } from "@utils/prisma";

export async function generateStaticParams() {
  const albums = await getStaticParams("animal-crossing");

  if (typeof albums === "string") {
    return [];
  }

  return albums.map((album) => ({
    section: album.section.slice(1).concat([slugName(album.name)])
  }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: { section: string[] }}) {
  const albumName = displayName(params.section[params.section.length - 1]);
  const section = params.section[params.section.length - 2];
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
      albumSection={params.section}
    />
  );
}
