import Link from "next/link";

import ImageGrid from "@/components/image-grid";
import collectionsJson from "@/data/collections.json";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";
import { CollectionConfig } from "@/utils/types";

const collections: CollectionConfig = collectionsJson;

export async function generateStaticParams() {
  return Object.keys(collections).map((collection) => {
    const slug = slugify(collection);
    console.log(`├ generating /collections/${slug}`);
    return {
      collection: slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const collection = deslugify((await params).collection);
  const { displayName } = collections[collection];
  return { title: `${displayName ?? collection} — claire freehafer` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const collection = deslugify((await params).collection);
  const images = await getTagImages(collection);
  const { background, displayName } = collections[collection];
  return (
    <>
      <div className="breadcrumbs">
        <Link href="/photography">photography</Link>
        <span>/</span>
        <Link href="/photography/collections">collections</Link>
        <span>/</span>
        <h2>{displayName ?? collection}</h2>
      </div>
      <ImageGrid images={images} background={background} maxCols={3} />
    </>
  );
}
