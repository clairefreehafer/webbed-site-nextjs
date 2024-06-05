import { displayName, slugName } from "@utils/albums";
import { getPhotosWithTag } from "@utils/prisma";
import {
  getAlbumsInSections,
  getPhotographyAlbumPhotos,
} from "@utils/prisma/album";
import { getAllDescendants } from "@utils/prisma/section";
import { getAncestorSections } from "@utils/section";

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
  const albumName = displayName(params.section[params.section.length - 1]);
  const album = await getPhotographyAlbumPhotos(albumName);

  let photos = album.photos;

  if (album.type === "tag") {
    photos = await getPhotosWithTag(albumName);
  }

  return (
    <>
      <h3>{albumName}</h3>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.url?.replaceAll("#size#", "L")} />
        </div>
      ))}
    </>
  );
}
