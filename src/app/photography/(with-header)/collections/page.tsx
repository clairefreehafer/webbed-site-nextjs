import { Metadata } from "next";
import Link from "next/link";

import AlbumGrid from "@/components/photography/album-grid";
import collectionsJson from "@/data/photography/collections.json";
import { CollectionConfig } from "@/types/photography";
import { slugify } from "@/utils";
import {
  Album,
  getCollectionCoverPhoto,
  getNumberOfTaggedImages,
} from "@/utils/digikam";

export const metadata: Metadata = { title: "collections" };

const collections: CollectionConfig = collectionsJson;

export default async function Page() {
  const albums: Album[] = [];

  for (const collection of Object.keys(collections)) {
    const numberOfPhotos = getNumberOfTaggedImages(collection);
    if (numberOfPhotos === 0) {
      // skip if there are no photos with that tag.
      console.warn(`😢 no photos with tag "${collection}"`);
      continue;
    }

    const config = collections[collection];
    const mappedAlbum: Album = {
      displayName: config.displayName ?? collection,
      slug: slugify(collection),
      icon: config.icon,
      numberOfPhotos,
    };
    const coverPhoto = await getCollectionCoverPhoto(
      collection,
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
        <h2>collections</h2>
      </div>
      <p className="page-description">photos grouped by subject matter.</p>
      <AlbumGrid linkPrefix="collections" albums={albums} maxCols={maxCols} />
    </>
  );
}
