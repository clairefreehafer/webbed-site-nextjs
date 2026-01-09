import Link from "next/link";

import LinkList from "@/components/photography/link-list";
import { deslugify } from "@/utils";
import { getAlbumGroups } from "@/utils/digikam";

export default async function Page() {
  const albumGroups = getAlbumGroups("photography");
  const links = albumGroups.map((group) => ({
    display: deslugify(group),
  }));

  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <Link href="/photography/albums">albums</Link>
        <span>/</span>
        <h2>grouped</h2>
      </div>
      <p className="page-description">🚧 in progress 🚧</p>
      <LinkList links={links} />;
    </>
  );
}
