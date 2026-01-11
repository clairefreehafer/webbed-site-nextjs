import { Metadata } from "next";
import Link from "next/link";

import AlbumGrid from "@/components/photography/album-grid";
import technicalJson from "@/data/photography/technical.json";
import { CollectionConfig } from "@/types/photography";
import { slugify } from "@/utils";
import {
  Album,
  getCollectionCoverPhoto,
  getNumberOfTaggedImages,
} from "@/utils/digikam";

const technicalConfig: CollectionConfig = technicalJson;

export const metadata: Metadata = { title: "technical" };

// the cover images could be 3d models
// of the camera/lens/whatever each album is for.
export default async function Page() {
  const albums: Album[] = [];

  for (const tag of Object.keys(technicalConfig)) {
    const config = technicalConfig[tag];
    const numberOfPhotos = getNumberOfTaggedImages(tag);
    if (numberOfPhotos === 0) {
      // skip if there are no photos with that tag.
      console.warn(`😢 no photos with tag "${tag}"`);
      continue;
    }

    const mappedAlbum: Album = {
      displayName: config.displayName ?? tag,
      slug: slugify(tag),
      icon: config.icon,
      numberOfPhotos,
    };
    const coverPhoto = await getCollectionCoverPhoto(
      tag,
      config.coverPhotoName
    );

    albums.push({
      ...mappedAlbum,
      coverPhoto: {
        ...coverPhoto,
        position: config.coverPhotoPosition,
      },
    });
  }

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
