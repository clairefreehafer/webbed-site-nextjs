import ImageGrid from "@/components/photography/image-grid";
import { deslugify, slugify } from "@/utils";
import { getTagImages } from "@/utils/photography/digikam";
import TAGS from "./tags";

export async function generateStaticParams() {
  return TAGS.map((tag) => ({ collection: slugify(tag) }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const collection = deslugify((await params).collection);
  const images = getTagImages(collection);
  return <ImageGrid images={images} />;
}
