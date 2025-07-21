import ImageGrid from "@/components/photography/image-grid";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/digikam";
import TAGS from "./tags";

export async function generateStaticParams() {
  return TAGS.map((tag) => ({ collection: slugify(tag) }));
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
  return <ImageGrid images={images} />;
}
