import { displayName, slugName } from "@utils/albums";
import Slideshow from "@components/slideshow/index";
import { getAncestorSections } from "@utils/section";
import { getAlbumsInSections } from "@utils/prisma/album";
import AnimalCrossingThemeRoot from "@styles/animal-crossing/theme";
import "@styles/animal-crossing/theme.css";
import { getAlbumPhotos } from "@utils/prisma/photo";
import { getAllDescendants } from "@utils/prisma/section";

export async function generateStaticParams() {
  // TODO: extract
  const descendantSections = await getAllDescendants("animal-crossing");
  const albums = await getAlbumsInSections(descendantSections);

  const params = [];

  for (let album of albums) {
    const sectionArray = await getAncestorSections(album.sectionName);
    sectionArray.shift();
    sectionArray.push(slugName(album.name));
    params.push({ section: sectionArray });
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
        albumSection="animal-crossing"
        theme="animalCrossing"
      />
    </AnimalCrossingThemeRoot>
  );
}
