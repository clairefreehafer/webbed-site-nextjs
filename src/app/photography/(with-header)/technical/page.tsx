import { Metadata } from "next";
import Link from "next/link";

import AlbumGrid from "@/components/photography/album-grid";
import technicalJson from "@/data/photography/technical.json";
import { TagConfig } from "@/types/photography";
import { generateTagAlbum } from "@/utils/digikam";

const technicalConfig: TagConfig = technicalJson;

export const metadata: Metadata = { title: "technical" };

// the cover images could be 3d models
// of the camera/lens/whatever each album is for.
export default async function Page() {
  const albums = await generateTagAlbum(technicalConfig);

  const maxCols =
    albums.length === 1 || albums.length === 2 ? albums.length : 3;

  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <h2>technical</h2>
      </div>
      <p className="page-description">photos grouped by how they were made.</p>

      <AlbumGrid albums={albums} linkPrefix="technical" maxCols={maxCols} />
    </>
  );
}
