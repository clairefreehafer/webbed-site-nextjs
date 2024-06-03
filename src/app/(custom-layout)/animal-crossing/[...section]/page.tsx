import { displayName } from "@utils/albums";
import Slideshow from "@components/slideshow/index";
import { getAncestorSections } from "@utils/section";
import { getStaticParams } from "@utils/prisma/album";
import AnimalCrossingThemeRoot from "@styles/animal-crossing/theme";
import "@styles/animal-crossing/theme.css";
import { getAlbumPhotos } from "@utils/prisma/photo";

export async function generateStaticParams() {
  const albums = await getStaticParams("animal-crossing");

  const params = [];

  for (let album of albums) {
    const sectionArray = await getAncestorSections(album.sectionName);
    params.push({ section: sectionArray.push(album.name) });
  }

  return params;
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: { section: string[] };
}) {
  const albumName = displayName(params.section[params.section.length - 1]);
  // const section = params.section[params.section.length - 2];
  const photos = await getAlbumPhotos(albumName);

  if (!photos.length) {
    return "❌ no photos";
  }

  const albumDate = photos[0].album?.date || new Date();

  return (
    <AnimalCrossingThemeRoot shape="triangle" date={albumDate}>
      <Slideshow
        photos={photos}
        albumName={albumName}
        albumSection={params.section}
        theme="animalCrossing"
      />
    </AnimalCrossingThemeRoot>
  );
}
