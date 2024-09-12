import { displayName, slugName } from "@utils/album";
import Slideshow from "@components/slideshow/index";
import { getAncestorSections } from "@utils/section";
import { getAlbumPhotos } from "@utils/prisma/photo";
import { getAlbumsInSections } from "@utils/prisma/album";
import { getAllDescendants } from "@utils/prisma/section";
import ZeldaThemeRoot from "@styles/zelda/theme";

export async function generateStaticParams() {
  // TODO: extract
  const descendantSections = await getAllDescendants("zelda");
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

  return (
    <ZeldaThemeRoot>
      <Slideshow
        photos={photos}
        albumName={albumName}
        albumSection="zelda"
        theme="zelda"
      />
    </ZeldaThemeRoot>
  );
}
