import Link from "next/link";

import AlbumGrid from "@/components/photography/album-grid";
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
  return { title: group };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { group } = await params;
  const albums = await getAlbums(`photography/${group}`);

  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <Link href="/photography/albums">albums</Link>
        <span>/</span>
        <Link href="/photography/albums/groups">groups</Link>
        <span>/</span>
        <h2>{group}</h2>
      </div>
      <AlbumGrid albums={albums} linkPrefix="albums" />
    </>
  );
}
