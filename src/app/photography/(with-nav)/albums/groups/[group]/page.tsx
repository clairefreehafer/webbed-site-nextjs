import AlbumGrid from "@/components/photography/album-grid";
import Breadcrumbs from "@/components/photography/breadcrumbs";
import albumGroupsJson from "@/data/photography/album-groups.json";
import { AlbumGroupConfig } from "@/types/photography";
import { deslugify } from "@/utils";
import { generateAlbumGroupMapData, getAlbums } from "@/utils/digikam";

import Map from "./map";

const albumGroups: Record<string, AlbumGroupConfig> = albumGroupsJson;

type Params = { group: string };

export async function generateStaticParams() {
  return Object.keys(albumGroups).map((group) => ({
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
  const albums = await getAlbums("photography");
  const albumsInGroup = albums.filter((album) => album.groups.includes(group));

  const mapData = generateAlbumGroupMapData(group);

  return (
    <>
      <Breadcrumbs />
      <AlbumGrid albums={albumsInGroup} linkPrefix="albums" />
      {mapData.features.length > 0 && (
        <div
          style={{
            minHeight: "50svh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Map mapData={mapData} albumGroupConfig={albumGroups[group]} />
        </div>
      )}
    </>
  );
}
