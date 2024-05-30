import IconList from "@components/animal-crossing/icon-list";
import { getStaticParams } from "@utils/prisma/album";
import { getPolaroidGridData } from "@utils/prisma/photo";

export async function generateStaticParams() {
  const albums = await getStaticParams("new-horizons");

  return albums.map((album) => ({
    section: album.sectionName
  }));
}

export const dynamicParams = false;

export default async function Section(
  { params }: { params: { section: string }}
) {
  const { section } = params;
  const albums = await getPolaroidGridData(section);

  return (
    <>
      <h4>{section}</h4>
      <IconList albums={albums} />
    </>
  )
}