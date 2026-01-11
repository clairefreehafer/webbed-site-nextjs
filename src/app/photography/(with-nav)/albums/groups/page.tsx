import Breadcrumbs from "@/components/photography/breadcrumbs";
import LinkList from "@/components/photography/link-list";
import { deslugify } from "@/utils";
import { getAlbumGroups } from "@/utils/digikam";

export default async function Page() {
  const albumGroups = getAlbumGroups("photography");
  const links = albumGroups.map((group) => ({
    href: `/albums/groups/${group}`,
    display: deslugify(group),
  }));

  return (
    <>
      <Breadcrumbs />
      <LinkList links={links} />;
    </>
  );
}
