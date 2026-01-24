import AlbumGrid from "@/components/photography/album-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import { deslugify } from "@/utils";
import { getAlbumGroups, getAlbums } from "@/utils/digikam";

type Params = { group: string };

export async function generateStaticParams() {
  const albumGroups = getAlbumGroups("photography");
  return albumGroups.map((group) => ({
    group,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { group } = await params;
  return { title: deslugify(group) };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { group } = await params;
  const albums = await getAlbums(`photography/${group}`);

  return (
    <>
      <Breadcrumbs />
      <AlbumGrid albums={albums} linkPrefix="albums" />
    </>
  );
}
