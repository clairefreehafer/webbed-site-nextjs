import Link from "next/link";

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
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <Link href="/photography/albums">albums</Link>
        <span>/</span>
        <h2>groups</h2>
      </div>
      <LinkList links={links} />;
    </>
  );
}
