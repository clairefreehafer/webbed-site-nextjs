import Slideshow from "@components/photography/Slideshow";
import { AlbumTypes, displayName, slugName } from "@utils/album";
import { getPhotosWithTag } from "@utils/prisma/tag";
import {
  getAlbumsInSections,
  getPhotographyAlbumPhotos,
} from "@utils/prisma/album";
import { getAllDescendants } from "@utils/prisma/section";
import { getAncestorSections } from "@utils/section";
import { getSmugmugPhotos } from "@utils/smugmug";

export async function generateStaticParams() {
  // TODO: extract
  const descendantSections = await getAllDescendants("photography");
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
  const albumName = displayName(
    decodeURIComponent(params.section[params.section.length - 1]),
  );
  const album = await getPhotographyAlbumPhotos(albumName);

  let photos = album.photos;

  if (album.type === AlbumTypes.Tag) {
    photos = await getPhotosWithTag(albumName);
  } else if (album.type === AlbumTypes.Smugmug) {
    photos = await getSmugmugPhotos(albumName);
  }

  return <Slideshow photos={photos} />;
}
