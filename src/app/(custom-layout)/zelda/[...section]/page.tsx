import { displayName } from "@utils/albums";
import Slideshow from "@components/slideshow";
import { getAncestorSections } from "@utils/section";
import { getAlbumPhotos } from "@utils/prisma/photo";
import { getStaticParams } from "@utils/prisma/album";

export async function generateStaticParams() {
  const albums = await getStaticParams("zelda");

  const params = [];

  for (let album of albums) {
    const sectionArray = await getAncestorSections(album.sectionName);
    params.push({ section: sectionArray.push(album.name) });
  }

  return params;
}

export const dynamicParams = false;

export default async function Page({ params }: { params: { section: string[] }}) {
  const albumName = displayName(params.section[params.section.length - 1]);
  const photos = await getAlbumPhotos(albumName);

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
