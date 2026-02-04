import Breadcrumbs from "@/components/photography/breadcrumbs";
import LinkList from "@/components/photography/link-list";
import albumGroupsJson from "@/data/photography/album-groups.json";
import { AlbumGroupConfig } from "@/types/photography";
import { deslugify } from "@/utils";
import { getAlbums } from "@/utils/digikam";

const albumGroups: Record<string, AlbumGroupConfig> = albumGroupsJson;

export default async function Page() {
  const albums = await getAlbums("photography");

  const numberOfAlbums: Record<string, number> = {};

  for (const album of albums) {
    for (const group of album.groups) {
      if (numberOfAlbums[group]) {
        numberOfAlbums[group]++;
      } else {
        numberOfAlbums[group] = 1;
      }
    }
  }

  const links = Object.keys(albumGroups).map((group) => ({
    href: `/albums/groups/${group}`,
    display: albumGroups[group].displayName ?? deslugify(group),
    description:
      numberOfAlbums[group] === 1
        ? `${numberOfAlbums[group]} album`
        : `${numberOfAlbums[group]} albums`,
  }));

  return (
    <>
      <Breadcrumbs />
      <LinkList links={links} />;
    </>
  );
}
