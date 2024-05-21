import { displayName, slugName } from "@utils/albums";
import { getAlbum, getPhotosWithTag, getStaticParams } from "@utils/prisma";
import { getAncestorSections } from "@utils/section";

export async function generateStaticParams() {
  const albums = await getStaticParams("photography");

  const params = [];

  for (let album of albums) {
    const sectionArray = await getAncestorSections(album.section);
    params.push({ section: sectionArray });
  }

  return params;
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
