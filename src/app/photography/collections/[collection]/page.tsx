import ImageGrid from "@/components/photography/image-grid";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";
import collectionsJson from "@/data/collections.json";
import { CollectionConfig } from "@/utils/types";
import Link from "next/link";

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
  const collectionSlug = (await params).collection;
  return { title: `${deslugify(collectionSlug)} — claire freehafer` };
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
