import { getAlbumGridData, getStaticParams } from "@utils/prisma";
import IconList from "@components/animal-crossing/icon-list";

export async function generateStaticParams() {
  const albums = await getStaticParams("new-horizons");

  return albums.map((album) => ({
    section: album.section?.name
  }));
}

export const dynamicParams = false;

export default async function Section(
  { params }: { params: { section: string }}
) {
  const { section } = params;
  const albums = await getAlbumGridData(section);

  return (
    <>
      <h4>{section}</h4>
      <IconList albums={albums} />
    </>
  )
}