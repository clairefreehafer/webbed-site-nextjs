import { displayName, slugName } from "@utils/albums";
import { getAlbum, getPhotosWithTag, getStaticParams } from "@utils/prisma";

export async function generateStaticParams() {
  const albums = await getStaticParams("photography");

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
  const album = await getAlbum(albumName);

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
