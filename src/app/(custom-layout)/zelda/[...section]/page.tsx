import { displayName } from "@utils/albums";
import Slideshow from "@components/slideshow";
import { getAlbumPhotos } from "@utils/animal-crossing";
import { getStaticParams } from "@utils/prisma";
import { getAncestorSections } from "@utils/section";

export async function generateStaticParams() {
  const albums = await getStaticParams("zelda");

  const params = [];

  for (let album of albums) {
    const sectionArray = await getAncestorSections(album.section);
    params.push({ section: sectionArray.push(album.name) });
  }

  return params;
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